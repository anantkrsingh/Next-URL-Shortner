// PhonePe Payment Gateway — Standard Checkout v2 (OAuth client-credentials
// flow). Docs: https://developer.phonepe.com/payment-gateway/website-integration/standard-checkout/api-integration/
//
// All calls go through this module so the OAuth token lifecycle (fetch +
// cache + refresh) and the UAT/production base URLs live in one place.

type PhonePeEnv = "UAT" | "PRODUCTION";

function getEnv(): PhonePeEnv {
  return process.env.PHONEPE_ENV === "PRODUCTION" ? "PRODUCTION" : "UAT";
}

const BASE_URLS: Record<PhonePeEnv, { auth: string; pg: string }> = {
  UAT: {
    auth: "https://api-preprod.phonepe.com/apis/pg-sandbox/v1/oauth/token",
    pg: "https://api-preprod.phonepe.com/apis/pg-sandbox/checkout/v2",
  },
  PRODUCTION: {
    auth: "https://api.phonepe.com/apis/identity-manager/v1/oauth/token",
    pg: "https://api.phonepe.com/apis/pg/checkout/v2",
  },
};

export function isPhonePeConfigured() {
  const secret = process.env.PHONEPE_CLIENT_SECRET;
  return Boolean(
    process.env.PHONEPE_CLIENT_ID && secret && !secret.trim().endsWith("=") // catches the known-truncated base64-looking value
  );
}

function getCredentials() {
  const clientId = process.env.PHONEPE_CLIENT_ID;
  const clientSecret = process.env.PHONEPE_CLIENT_SECRET;
  const clientVersion = process.env.PHONEPE_CLIENT_VERSION || "1";

  if (!clientId || !clientSecret) {
    throw new Error("PhonePe is not configured (missing PHONEPE_CLIENT_ID/SECRET).");
  }

  return { clientId, clientSecret, clientVersion };
}

// Cached in-process; a fresh Node/serverless instance just fetches again.
let cachedToken: { accessToken: string; expiresAtMs: number } | null = null;

async function getAccessToken(): Promise<string> {
  if (cachedToken && cachedToken.expiresAtMs - 60_000 > Date.now()) {
    return cachedToken.accessToken;
  }

  const { clientId, clientSecret, clientVersion } = getCredentials();
  const { auth } = BASE_URLS[getEnv()];

  const res = await fetch(auth, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      client_id: clientId,
      client_version: clientVersion,
      client_secret: clientSecret,
      grant_type: "client_credentials",
    }),
  });

  const data = await res.json().catch(() => null);

  if (!res.ok || !data?.access_token) {
    throw new Error(
      `PhonePe auth failed (${res.status}): ${data?.message || data?.code || "unknown error"}`
    );
  }

  const expiresAtMs = data.expires_at
    ? data.expires_at * 1000
    : Date.now() + (data.expires_in ?? 3600) * 1000;

  cachedToken = { accessToken: data.access_token, expiresAtMs };
  return cachedToken.accessToken;
}

export type CreateOrderParams = {
  merchantOrderId: string;
  amountPaise: number;
  redirectUrl: string;
  metaInfo?: Record<string, string>;
};

export type CreateOrderResult = {
  orderId: string;
  state: string;
  redirectUrl: string;
};

export async function createOrder(params: CreateOrderParams): Promise<CreateOrderResult> {
  const token = await getAccessToken();
  const { pg } = BASE_URLS[getEnv()];

  const res = await fetch(`${pg}/pay`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `O-Bearer ${token}`,
    },
    body: JSON.stringify({
      merchantOrderId: params.merchantOrderId,
      amount: params.amountPaise,
      expireAfter: 1200,
      metaInfo: params.metaInfo,
      paymentFlow: {
        type: "PG_CHECKOUT",
        message: "TinyUR plan upgrade",
        merchantUrls: {
          redirectUrl: params.redirectUrl,
        },
      },
    }),
  });

  const data = await res.json().catch(() => null);

  if (!res.ok || !data?.redirectUrl) {
    throw new Error(
      `PhonePe order creation failed (${res.status}): ${data?.message || data?.code || "unknown error"}`
    );
  }

  return { orderId: data.orderId, state: data.state, redirectUrl: data.redirectUrl };
}

export type OrderStatusResult = {
  orderId: string;
  state: "PENDING" | "COMPLETED" | "FAILED" | string;
  amount: number;
};

export async function getOrderStatus(merchantOrderId: string): Promise<OrderStatusResult> {
  const token = await getAccessToken();
  const { pg } = BASE_URLS[getEnv()];

  const res = await fetch(`${pg}/order/${merchantOrderId}/status`, {
    headers: { Authorization: `O-Bearer ${token}` },
  });

  const data = await res.json().catch(() => null);

  if (!res.ok || !data) {
    throw new Error(`PhonePe order status check failed (${res.status}).`);
  }

  return { orderId: data.orderId, state: data.state, amount: data.amount };
}
