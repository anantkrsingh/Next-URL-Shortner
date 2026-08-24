import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";

export async function GET() {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ error: "Not authenticated." }, { status: 401 });
  }

  const subscription = await prisma.subscription.findUnique({ where: { userId: user.id } });

  return NextResponse.json({
    subscription: subscription
      ? {
          plan: subscription.plan,
          billingCycle: subscription.billingCycle,
          status: subscription.status,
          currentPeriodEnd: subscription.currentPeriodEnd,
        }
      : { plan: "free", billingCycle: null, status: "active", currentPeriodEnd: null },
  });
}
