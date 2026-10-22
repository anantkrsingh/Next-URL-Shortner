// Dodo Payments — Checkout Sessions API (hosted, redirect-based checkout).
// Docs: https://docs.dodopayments.com/api-reference/checkout-sessions/create
//
// Dodo is the primary gateway. PhonePe (see phonepe.ts) is only used as a
// fallback when session creation here fails — see the checkout route.
//
// Unlike Razorpay's Orders API + embedded Checkout.js widget, Dodo's
// checkout is a hosted page: we create a session, redirect the shopper to
// its checkout_url, and they land back on our own callback route
// (api/payments/callback) afterwards — the same redirect shape already
// used for PhonePe. We never trust that redirect alone; the callback
// re-fetches the payment server-to-server before activating anything, and
// the `payment.succeeded` webhook (webhook/dodo) is the belt-and-braces
// path alongside it.
//
// Pricing is dynamic per checkout (Pay-What-You-Want on Dodo's side), so a
// single PWYW product (DODO_PRODUCT_ID) is reused for every plan/billing
// cycle — the actual price is set per-session via `product_cart[0].amount`.

import crypto from "crypto";

type DodoEnv = "test" | "live";

function getEnv(): DodoEnv {
  return process.env.DODO_ENV === "live" ? "live" : "test";
}

const BASE_URLS: Record<DodoEnv, string> = {
  test: "https://test.dodopayments.com",
  live: "https://live.dodopayments.com",
};

export function isDodoConfigured() {
  return Boolean(process.env.DODO_API_KEY && process.env.DODO_PRODUCT_ID);
}

function getCredentials() {
  const apiKey = process.env.DODO_API_KEY;
  const productId = process.env.DODO_PRODUCT_ID;

  if (!apiKey || !productId) {
    throw new Error("Dodo Payments is not configured (missing DODO_API_KEY/DODO_PRODUCT_ID).");
  }

  return { apiKey, productId };
}

export type CreateCheckoutSessionParams = {
  merchantOrderId: string;
  amountPaise: number; // Dodo takes the lowest currency denomination too — paise for INR.
  returnUrl: string;
  customer: { name: string; email: string; phone?: string };
  billing: {
    city: string;
    state: string;
    street: string;
    zipcode: string;
    country: string; // ISO alpha-2, e.g. "IN"
  };
  metadata?: Record<string, string>;
};

export type CreateCheckoutSessionResult = {
  sessionId: string;
  checkoutUrl: string;
};

export async function createCheckoutSession(
  params: CreateCheckoutSessionParams
): Promise<CreateCheckoutSessionResult> {
  const { apiKey, productId } = getCredentials();

  const res = await fetch(`${BASE_URLS[getEnv()]}/checkouts`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      product_cart: [{ product_id: productId, quantity: 1, amount: params.amountPaise }],
      customer: { email: params.customer.email, name: params.customer.name },
      billing_address: {
        country: params.billing.country,
        city: params.billing.city,
        state: params.billing.state,
        street: params.billing.street,
        zipcode: params.billing.zipcode,
      },
      return_url: params.returnUrl,
      metadata: { merchantOrderId: params.merchantOrderId, ...params.metadata },
    }),
  });

  const data = await res.json().catch(() => null);

  if (!res.ok || !data?.checkout_url) {
    throw new Error(
      `Dodo checkout session creation failed (${res.status}): ${data?.message || data?.code || "unknown error"}`
    );
  }

  return { sessionId: data.session_id, checkoutUrl: data.checkout_url };
}

export type DodoPaymentStatus = {
  paymentId: string;
  status: string; // "succeeded" | "failed" | "processing" | ...
  merchantOrderId?: string;
};

/**
 * Server-to-server re-check used by the redirect callback — we never trust
 * the redirect's own `status` query param alone, only what this returns.
 */
export async function getPaymentStatus(paymentId: string): Promise<DodoPaymentStatus> {
  const { apiKey } = getCredentials();

  const res = await fetch(`${BASE_URLS[getEnv()]}/payments/${paymentId}`, {
    headers: { Authorization: `Bearer ${apiKey}` },
  });

  const data = await res.json().catch(() => null);

  if (!res.ok || !data?.payment_id) {
    throw new Error(`Dodo payment status check failed (${res.status}).`);
  }

  return {
    paymentId: data.payment_id,
    status: data.status,
    merchantOrderId:
      typeof data.metadata?.merchantOrderId === "string" ? data.metadata.merchantOrderId : undefined,
  };
}

export function mapDodoStatus(status: string): "pending" | "completed" | "failed" {
  if (status === "succeeded") return "completed";
  if (status === "failed" || status === "cancelled") return "failed";
  return "pending";
}

/**
 * Verifies the Standard Webhooks signature Dodo sends on S2S webhooks
 * (`webhook-id` / `webhook-timestamp` / `webhook-signature` headers), per
 * https://www.standardwebhooks.com/. The secret is a `whsec_`-prefixed,
 * base64-encoded key; the signed content is `{id}.{timestamp}.{rawBody}`,
 * HMAC-SHA256'd and base64-encoded. `webhook-signature` carries one or more
 * space-separated `v1,<base64>` values (for secret rotation) — a match on
 * any of them is valid.
 */
export function verifyWebhookSignature(
  rawBody: string,
  headers: { id: string; timestamp: string; signature: string }
): boolean {
  const secret = process.env.DODO_WEBHOOK_SECRET;
  if (!secret || !headers.id || !headers.timestamp || !headers.signature) return false;

  // Reject stale deliveries/replays outside a 5 minute tolerance.
  const timestampSec = Number(headers.timestamp);
  if (!Number.isFinite(timestampSec) || Math.abs(Date.now() / 1000 - timestampSec) > 300) {
    return false;
  }

  const key = Buffer.from(secret.replace(/^whsec_/, ""), "base64");
  const signedContent = `${headers.id}.${headers.timestamp}.${rawBody}`;
  const expected = crypto.createHmac("sha256", key).update(signedContent).digest("base64");

  return headers.signature
    .split(" ")
    .map((part) => part.split(",")[1])
    .filter((candidate): candidate is string => Boolean(candidate))
    .some((candidate) => timingSafeEqualBase64(expected, candidate));
}

function timingSafeEqualBase64(expectedB64: string, actualB64: string): boolean {
  const expected = Buffer.from(expectedB64, "base64");
  const actual = Buffer.from(actualB64, "base64");
  if (expected.length !== actual.length) return false;
  return crypto.timingSafeEqual(expected, actual);
}
