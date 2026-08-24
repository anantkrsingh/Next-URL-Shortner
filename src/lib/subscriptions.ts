import { prisma } from "@/lib/prisma";
import type { OrderStatus } from "../../generated/prisma";

export function mapPhonePeState(state: string): OrderStatus {
  if (state === "COMPLETED") return "completed";
  if (state === "FAILED") return "failed";
  return "pending";
}

/**
 * Shared by the redirect callback and the S2S webhook so both paths update
 * the Order + Subscription the same way, idempotently.
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
    data: { status, phonePeOrderId: phonePeOrderId ?? order.phonePeOrderId },
  });

  if (status === "completed") {
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

  return updated;
}
