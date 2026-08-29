// Razorpay Payment Gateway — Orders API + Checkout.js (standard embedded
// checkout). Docs: https://razorpay.com/docs/payments/server-integration/nodejs/payment-gateway/build-integration/
//
// Razorpay is the primary gateway. PhonePe (see phonepe.ts) is only used as
// a fallback when order creation here fails — see the checkout route.

import crypto from "crypto";

const RAZORPAY_API = "https://api.razorpay.com/v1";

export function isRazorpayConfigured() {
  return Boolean(process.env.RAZORPAY_KEY_ID && process.env.RAZORPAY_KEY_SECRET);
}

function getCredentials() {
  const keyId = process.env.RAZORPAY_KEY_ID;
  const keySecret = process.env.RAZORPAY_KEY_SECRET;

  if (!keyId || !keySecret) {
    throw new Error("Razorpay is not configured (missing RAZORPAY_KEY_ID/SECRET).");
  }

  return { keyId, keySecret };
}

function authHeader(): string {
  const { keyId, keySecret } = getCredentials();
  return "Basic " + Buffer.from(`${keyId}:${keySecret}`).toString("base64");
}

export type CreateOrderParams = {
  merchantOrderId: string; // sent as Razorpay's `receipt`
  amountPaise: number;
  notes?: Record<string, string>;
};

export type CreateOrderResult = {
  orderId: string; // Razorpay's order id, e.g. "order_xxx"
  amount: number;
  currency: string;
  keyId: string;
};

export async function createOrder(params: CreateOrderParams): Promise<CreateOrderResult> {
  const { keyId } = getCredentials();

  const res = await fetch(`${RAZORPAY_API}/orders`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: authHeader(),
    },
    body: JSON.stringify({
      amount: params.amountPaise,
      currency: "INR",
      receipt: params.merchantOrderId,
      notes: params.notes,
    }),
  });

  const data = await res.json().catch(() => null);

  if (!res.ok || !data?.id) {
    throw new Error(
      `Razorpay order creation failed (${res.status}): ${data?.error?.description || data?.error?.code || "unknown error"}`
    );
  }

  return { orderId: data.id, amount: data.amount, currency: data.currency, keyId };
}

/**
 * Verifies the `razorpay_signature` Checkout.js hands back to the client on
 * a successful payment (HMAC-SHA256 of `orderId|paymentId`, keyed with the
 * account's key secret). Never trust the client-reported success alone.
 */
export function verifyPaymentSignature(
  razorpayOrderId: string,
  razorpayPaymentId: string,
  razorpaySignature: string
): boolean {
  const { keySecret } = getCredentials();
  const expected = crypto
    .createHmac("sha256", keySecret)
    .update(`${razorpayOrderId}|${razorpayPaymentId}`)
    .digest("hex");

  return timingSafeEqualHex(expected, razorpaySignature);
}

/** Verifies the `X-Razorpay-Signature` header on incoming dashboard webhooks. */
export function verifyWebhookSignature(rawBody: string, signature: string): boolean {
  const secret = process.env.RAZORPAY_WEBHOOK_SECRET;
  if (!secret) return false;

  const expected = crypto.createHmac("sha256", secret).update(rawBody).digest("hex");
  return timingSafeEqualHex(expected, signature);
}

function timingSafeEqualHex(expectedHex: string, actualHex: string): boolean {
  const expected = Buffer.from(expectedHex, "hex");
  const actual = Buffer.from(actualHex, "hex");
  if (expected.length !== actual.length) return false;
  return crypto.timingSafeEqual(expected, actual);
}
