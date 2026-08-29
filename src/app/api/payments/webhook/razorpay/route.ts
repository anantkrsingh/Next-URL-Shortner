import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifyWebhookSignature } from "@/lib/razorpay";
import { applyRazorpayPayment } from "@/lib/subscriptions";

// Server-to-server webhook Razorpay calls once configured in the dashboard
// (Settings > Webhooks, event: payment.captured). Belt-and-braces alongside
// the client-side verify call (api/payments/razorpay/verify) — this is the
// one that still lands if the shopper closes the tab before that fires.
export async function POST(request: NextRequest) {
  const secret = process.env.RAZORPAY_WEBHOOK_SECRET;
  if (!secret) {
    // Not configured on our side yet. Acknowledge rather than error so
    // Razorpay doesn't retry forever — the client-side verify call still
    // covers the normal checkout flow in the meantime.
    return NextResponse.json({ ok: true, ignored: true });
  }

  const rawBody = await request.text();
  const signature = request.headers.get("x-razorpay-signature") || "";

  if (!verifyWebhookSignature(rawBody, signature)) {
    return NextResponse.json({ error: "Invalid signature." }, { status: 401 });
  }

  const body = JSON.parse(rawBody);
  if (body?.event !== "payment.captured") {
    return NextResponse.json({ ok: true, ignored: true });
  }

  const payment = body?.payload?.payment?.entity;
  const razorpayOrderId: string | undefined = payment?.order_id;
  const razorpayPaymentId: string | undefined = payment?.id;

  if (!razorpayOrderId || !razorpayPaymentId) {
    return NextResponse.json({ error: "Malformed payload." }, { status: 400 });
  }

  const order = await prisma.order.findUnique({ where: { razorpayOrderId } });
  if (!order) {
    return NextResponse.json({ ok: true, ignored: true });
  }

  await applyRazorpayPayment(order.merchantOrderId, razorpayOrderId, razorpayPaymentId);

  return NextResponse.json({ ok: true });
}
