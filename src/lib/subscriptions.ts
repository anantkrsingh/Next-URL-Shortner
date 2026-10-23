import { prisma } from "@/lib/prisma";
import type { Order, OrderStatus } from "../../generated/prisma";

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
 * Shared by the Dodo redirect callback (payments/callback) and the Dodo
 * webhook (webhook/dodo), once the caller has already independently
 * verified the payment (server-to-server status check, or a
 * signature-verified webhook). Idempotent — both paths can land for the
 * same payment.
 */
export async function applyDodoPayment(
  merchantOrderId: string,
  dodoPaymentId: string,
  status: OrderStatus
) {
  const order = await prisma.order.findUnique({ where: { merchantOrderId } });
  if (!order) return null;
  if (order.status === "completed") return order;

  const updated = await prisma.order.update({
    where: { merchantOrderId },
    data: {
      status,
      gateway: "dodo",
      dodoPaymentId,
    },
  });

  if (status === "completed") {
    await activateSubscriptionFor(updated);
  }

  return updated;
}
