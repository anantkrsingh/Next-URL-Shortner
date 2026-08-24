import { NextRequest, NextResponse } from "next/server";
import { randomUUID } from "crypto";
import { prisma } from "@/lib/prisma";
import { getAppUrl, getCurrentUser } from "@/lib/auth";
import { getPlan } from "@/lib/plans";
import { createOrder, isPhonePeConfigured } from "@/lib/phonepe";

export async function POST(request: NextRequest) {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ error: "Not authenticated." }, { status: 401 });
  }

  if (!isPhonePeConfigured()) {
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

  const amountRupees = billingCycle === "monthly" ? plan.inr.monthly : plan.inr.yearly;
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
    },
  });

  try {
    const result = await createOrder({
      merchantOrderId,
      amountPaise,
      redirectUrl: `${getAppUrl()}/api/payments/callback?orderId=${merchantOrderId}`,
      metaInfo: { userId: user.id, plan: plan.id, billingCycle },
    });

    return NextResponse.json({ redirectUrl: result.redirectUrl });
  } catch (error) {
    console.error("PhonePe checkout error:", error);
    await prisma.order.update({
      where: { merchantOrderId },
      data: { status: "failed" },
    });
    return NextResponse.json(
      { error: "Could not start checkout. Please try again." },
      { status: 502 }
    );
  }
}
