import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAppUrl } from "@/lib/auth";
import { getPaymentStatus as getDodoPaymentStatus, mapDodoStatus } from "@/lib/dodo";
import { applyDodoPayment } from "@/lib/subscriptions";

// Dodo redirects the shopper's browser here after checkout
// (`orderId` is our own merchantOrderId, passed as the return/redirect URL
// at checkout-session creation time — Dodo appends its own `payment_id` and
// `status` query params alongside it). We never trust the redirect itself
// as proof of payment — it just tells us which order to look up, and we
// independently re-check status server-to-server before activating
// anything.
export async function GET(request: NextRequest) {
  const appUrl = getAppUrl();
  const url = new URL(request.url);
  const orderId = url.searchParams.get("orderId");
  const dodoPaymentId = url.searchParams.get("payment_id");

  if (!orderId || !dodoPaymentId) {
    return NextResponse.redirect(`${appUrl}/account?tab=subscription&payment=error`);
  }

  const order = await prisma.order.findUnique({ where: { merchantOrderId: orderId } });
  if (!order) {
    return NextResponse.redirect(`${appUrl}/account?tab=subscription&payment=error`);
  }

  try {
    const result = await getDodoPaymentStatus(dodoPaymentId);
    const updated = await applyDodoPayment(orderId, dodoPaymentId, mapDodoStatus(result.status));
    const outcome =
      updated?.status === "completed" ? "success" : updated?.status === "failed" ? "failed" : "pending";

    return NextResponse.redirect(`${appUrl}/account?tab=subscription&payment=${outcome}`);
  } catch (error) {
    console.error("Payment callback error:", error);
    return NextResponse.redirect(`${appUrl}/account?tab=subscription&payment=error`);
  }
}
