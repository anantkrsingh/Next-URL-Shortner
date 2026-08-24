import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";

export async function GET() {
  const sessionUser = await getCurrentUser();
  if (!sessionUser) {
    return NextResponse.json({ error: "Not authenticated." }, { status: 401 });
  }

  const startOfMonth = new Date();
  startOfMonth.setDate(1);
  startOfMonth.setHours(0, 0, 0, 0);

  const [totalLinks, linksThisMonth, clicksAgg, recentLinks] = await Promise.all([
    prisma.url.count({ where: { userId: sessionUser.id } }),
    prisma.url.count({
      where: { userId: sessionUser.id, createdAt: { gte: startOfMonth } },
    }),
    prisma.url.aggregate({
      where: { userId: sessionUser.id },
      _sum: { clicks: true },
    }),
    prisma.url.findMany({
      where: { userId: sessionUser.id },
      orderBy: { createdAt: "desc" },
      take: 5,
      select: {
        id: true,
        shortCode: true,
        originalUrl: true,
        clicks: true,
        createdAt: true,
      },
    }),
  ]);

  return NextResponse.json({
    totalLinks,
    linksThisMonth,
    totalClicks: clicksAgg._sum.clicks ?? 0,
    recentLinks,
  });
}
