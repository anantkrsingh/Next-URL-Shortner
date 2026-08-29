import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";
import { verifyPaymentSignature } from "@/lib/razorpay";
import { applyRazorpayPayment } from "@/lib/subscriptions";

// Called by the client right after Razorpay Checkout.js reports a
// successful payment. We never trust that report alone — the signature is
// re-verified server-side before the subscription is activated. The
// Razorpay webhook (api/payments/webhook/razorpay) is the belt-and-braces
// path that still lands if the shopper closes the tab before this fires.
export async function POST(request: NextRequest) {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ error: "Not authenticated." }, { status: 401 });
  }

  const body = await request.json().catch(() => null);
  const merchantOrderId = typeof body?.merchantOrderId === "string" ? body.merchantOrderId : "";
  const razorpayOrderId = typeof body?.razorpayOrderId === "string" ? body.razorpayOrderId : "";
  const razorpayPaymentId = typeof body?.razorpayPaymentId === "string" ? body.razorpayPaymentId : "";
  const razorpaySignature = typeof body?.razorpaySignature === "string" ? body.razorpaySignature : "";

  if (!merchantOrderId || !razorpayOrderId || !razorpayPaymentId || !razorpaySignature) {
    return NextResponse.json({ error: "Malformed payload." }, { status: 400 });
  }

  const order = await prisma.order.findUnique({ where: { merchantOrderId } });
  if (!order || order.userId !== user.id || order.razorpayOrderId !== razorpayOrderId) {
    return NextResponse.json({ error: "Order not found." }, { status: 404 });
  }

  let valid = false;
  try {
    valid = verifyPaymentSignature(razorpayOrderId, razorpayPaymentId, razorpaySignature);
  } catch (error) {
    console.error("Razorpay signature verification error:", error);
  }

  if (!valid) {
    return NextResponse.json({ error: "Invalid payment signature." }, { status: 400 });
  }

  const updated = await applyRazorpayPayment(merchantOrderId, razorpayOrderId, razorpayPaymentId);
  return NextResponse.json({ ok: true, status: updated?.status ?? "pending" });
}
