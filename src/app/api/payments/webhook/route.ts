import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { applyOrderStatus } from "@/lib/subscriptions";

// Server-to-server webhook PhonePe calls once its own configured in the
// merchant dashboard (Developer Settings > Webhook). Belt-and-braces
// alongside the redirect callback — this is the one that still lands if the
// shopper closes the tab before the redirect fires.
export async function POST(request: NextRequest) {
  const username = process.env.PHONEPE_WEBHOOK_USERNAME;
  const password = process.env.PHONEPE_WEBHOOK_PASSWORD;

  if (!username || !password) {
    // Not configured on our side yet. Acknowledge rather than error so
    // PhonePe doesn't retry forever — the redirect callback still covers
    // the normal checkout flow in the meantime.
    return NextResponse.json({ ok: true, ignored: true });
  }

  const authHeader = request.headers.get("authorization") || "";
  const expected = crypto.createHash("sha256").update(`${username}:${password}`).digest("hex");

  if (authHeader !== expected) {
    return NextResponse.json({ error: "Invalid signature." }, { status: 401 });
  }

  const body = await request.json().catch(() => null);
  const payload = body?.payload;
  const merchantOrderId: string | undefined = payload?.merchantOrderId;
  const state: string | undefined = payload?.state;
  const phonePeOrderId: string | undefined = payload?.orderId;

  if (!merchantOrderId || !state) {
    return NextResponse.json({ error: "Malformed payload." }, { status: 400 });
  }

  await applyOrderStatus(merchantOrderId, state, phonePeOrderId);

  return NextResponse.json({ ok: true });
}
