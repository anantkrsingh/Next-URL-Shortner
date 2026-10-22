import { NextRequest, NextResponse } from "next/server";
import { verifyWebhookSignature } from "@/lib/dodo";
import { applyDodoPayment } from "@/lib/subscriptions";

// Server-to-server webhook Dodo Payments calls once configured in the
// dashboard (events: payment.succeeded, payment.failed). Belt-and-braces
// alongside the redirect callback (api/payments/callback) — this is the one
// that still lands if the shopper closes the tab before that fires.
export async function POST(request: NextRequest) {
  const secret = process.env.DODO_WEBHOOK_SECRET;
  if (!secret) {
    // Not configured on our side yet. Acknowledge rather than error so Dodo
    // doesn't retry forever — the redirect callback still covers the normal
    // checkout flow in the meantime.
    return NextResponse.json({ ok: true, ignored: true });
  }

  const rawBody = await request.text();
  const id = request.headers.get("webhook-id") || "";
  const timestamp = request.headers.get("webhook-timestamp") || "";
  const signature = request.headers.get("webhook-signature") || "";

  if (!verifyWebhookSignature(rawBody, { id, timestamp, signature })) {
    return NextResponse.json({ error: "Invalid signature." }, { status: 401 });
  }

  const body = JSON.parse(rawBody);
  if (body?.type !== "payment.succeeded" && body?.type !== "payment.failed") {
    return NextResponse.json({ ok: true, ignored: true });
  }

  const payment = body?.data;
  const dodoPaymentId: string | undefined = payment?.payment_id;
  const merchantOrderId: string | undefined = payment?.metadata?.merchantOrderId;

  if (!dodoPaymentId || !merchantOrderId) {
    return NextResponse.json({ error: "Malformed payload." }, { status: 400 });
  }

  const status = body.type === "payment.succeeded" ? "completed" : "failed";
  await applyDodoPayment(merchantOrderId, dodoPaymentId, status);

  return NextResponse.json({ ok: true });
}
