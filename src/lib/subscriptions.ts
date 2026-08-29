import { prisma } from "@/lib/prisma";
import type { Order, OrderStatus } from "../../generated/prisma";

export function mapPhonePeState(state: string): OrderStatus {
  if (state === "COMPLETED") return "completed";
  if (state === "FAILED") return "failed";
  return "pending";
}

/** Activates (or extends) the user's subscription once an order completes. */
async function activateSubscriptionFor(order: Order) {
  const periodDays = order.billingCycle === "monthly" ? 30 : 365;
  const currentPeriodEnd = new Date(Date.now() + periodDays * 24 * 60 * 60 * 1000);

  await prisma.subscription.upsert({
    where: { userId: order.userId },
    create: {
      userId: order.userId,
      plan: order.plan,
      billingCycle: order.billingCycle,
      status: "active",
      currentPeriodEnd,
    },
    update: {
      plan: order.plan,
      billingCycle: order.billingCycle,
      status: "active",
      currentPeriodEnd,
    },
  });
}

/**
 * Shared by the PhonePe redirect callback and its S2S webhook so both paths
 * update the Order + Subscription the same way, idempotently.
 */
export async function applyOrderStatus(
  merchantOrderId: string,
  phonePeState: string,
  phonePeOrderId?: string
) {
  const order = await prisma.order.findUnique({ where: { merchantOrderId } });
  if (!order) return null;

  const status = mapPhonePeState(phonePeState);

  const updated = await prisma.order.update({
    where: { merchantOrderId },
    data: {
      status,
      gateway: "phonepe",
      phonePeOrderId: phonePeOrderId ?? order.phonePeOrderId,
    },
  });

  if (status === "completed") {
    await activateSubscriptionFor(updated);
  }

  return updated;
}

/**
 * Shared by the Razorpay Checkout.js success handler (payments/razorpay/verify)
 * and the Razorpay webhook, once the caller has already verified the payment
 * signature. Idempotent — a webhook and the client-side handler can both
 * land for the same payment.
 */
export async function applyRazorpayPayment(
  merchantOrderId: string,
  razorpayOrderId: string,
  razorpayPaymentId: string
) {
  const order = await prisma.order.findUnique({ where: { merchantOrderId } });
  if (!order) return null;
  if (order.status === "completed") return order;

  const updated = await prisma.order.update({
    where: { merchantOrderId },
    data: {
      status: "completed",
      gateway: "razorpay",
      razorpayOrderId,
      razorpayPaymentId,
    },
  });

  await activateSubscriptionFor(updated);

  return updated;
}
