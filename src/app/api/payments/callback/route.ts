import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAppUrl } from "@/lib/auth";
import { getOrderStatus, isPhonePeConfigured } from "@/lib/phonepe";
import { applyOrderStatus } from "@/lib/subscriptions";

// PhonePe redirects the shopper's browser here after checkout. We never
// trust the redirect itself as proof of payment — it just tells us which
// order to look up, and we independently re-check status server-to-server.
export async function GET(request: NextRequest) {
  const appUrl = getAppUrl();
  const orderId = new URL(request.url).searchParams.get("orderId");

  if (!orderId || !isPhonePeConfigured()) {
    return NextResponse.redirect(`${appUrl}/account?tab=subscription&payment=error`);
  }

  const order = await prisma.order.findUnique({ where: { merchantOrderId: orderId } });
  if (!order) {
    return NextResponse.redirect(`${appUrl}/account?tab=subscription&payment=error`);
  }

  try {
    const result = await getOrderStatus(orderId);
    const updated = await applyOrderStatus(orderId, result.state, result.orderId);

    const outcome =
      updated?.status === "completed" ? "success" : updated?.status === "failed" ? "failed" : "pending";

    return NextResponse.redirect(`${appUrl}/account?tab=subscription&payment=${outcome}`);
  } catch (error) {
    console.error("PhonePe callback error:", error);
    return NextResponse.redirect(`${appUrl}/account?tab=subscription&payment=error`);
  }
}
