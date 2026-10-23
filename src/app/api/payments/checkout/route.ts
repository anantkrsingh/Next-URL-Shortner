import { NextRequest, NextResponse } from "next/server";
import { randomUUID } from "crypto";
import { prisma } from "@/lib/prisma";
import { getAppUrl, getCurrentUser } from "@/lib/auth";
import { chargeAmount, getPlan } from "@/lib/plans";
import { createCheckoutSession, isDodoConfigured } from "@/lib/dodo";

export async function POST(request: NextRequest) {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ error: "Not authenticated." }, { status: 401 });
  }

  if (!isDodoConfigured()) {
    return NextResponse.json(
      { error: "Payments aren't configured yet. Please try again shortly." },
      { status: 503 }
    );
  }

  const body = await request.json().catch(() => null);
  const planId = typeof body?.planId === "string" ? body.planId : "";
  const billingCycle: "monthly" | "yearly" = body?.billingCycle === "monthly" ? "monthly" : "yearly";

  const plan = getPlan(planId);
  if (!plan || !plan.payable || !plan.inr) {
    return NextResponse.json({ error: "That plan can't be purchased online." }, { status: 400 });
  }

  const billingDetails = await prisma.billingDetails.findUnique({ where: { userId: user.id } });
  if (!billingDetails) {
    return NextResponse.json(
      { error: "Please add your billing details before checking out." },
      { status: 400 }
    );
  }

  // Yearly billing is charged as a single upfront payment for all 12
  // months (plan.inr.yearlyMonthly * 12), not the per-month display figure.
  const amountRupees = chargeAmount(plan, billingCycle)!;
  const amountPaise = Math.round(amountRupees * 100);
  const merchantOrderId = `tur_${randomUUID().replace(/-/g, "")}`;

  await prisma.order.create({
    data: {
      userId: user.id,
      merchantOrderId,
      plan: plan.id,
      billingCycle,
      amount: amountPaise,
      status: "pending",
      // Snapshot billing details as they stand right now — later edits to
      // the user's saved details shouldn't rewrite past invoices.
      billingName: billingDetails.fullName,
      billingEmail: billingDetails.email,
      billingPhone: billingDetails.phone,
      billingAddressLine1: billingDetails.addressLine1,
      billingAddressLine2: billingDetails.addressLine2,
      billingCity: billingDetails.city,
      billingState: billingDetails.state,
      billingPostalCode: billingDetails.postalCode,
      billingCountry: billingDetails.country,
      isBusiness: billingDetails.isBusiness,
      gstNumber: billingDetails.gstNumber,
    },
  });

  try {
    const result = await createCheckoutSession({
      merchantOrderId,
      amountPaise,
      returnUrl: `${getAppUrl()}/api/payments/callback?orderId=${merchantOrderId}`,
      customer: {
        name: billingDetails.fullName,
        email: billingDetails.email,
        phone: billingDetails.phone,
      },
      billing: {
        city: billingDetails.city,
        state: billingDetails.state,
        street: [billingDetails.addressLine1, billingDetails.addressLine2].filter(Boolean).join(", "),
        zipcode: billingDetails.postalCode,
        // Dodo requires an ISO alpha-2 country code; every plan here is
        // priced (and billed) in INR regardless of the free-text country
        // on file, which is only used for display/GST on the invoice.
        country: "IN",
      },
      metadata: { userId: user.id, plan: plan.id, billingCycle },
    });

    await prisma.order.update({
      where: { merchantOrderId },
      data: { gateway: "dodo", dodoSessionId: result.sessionId },
    });

    return NextResponse.json({ gateway: "dodo" as const, redirectUrl: result.checkoutUrl });
  } catch (error) {
    console.error("Dodo checkout error:", error);
  }

  await prisma.order.update({
    where: { merchantOrderId },
    data: { status: "failed" },
  });
  return NextResponse.json(
    { error: "Could not start checkout. Please try again." },
    { status: 502 }
  );
}
