import { prisma } from "@/lib/prisma";
import cache from "@/lib/cache";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import RedirectCountdown from "./RedirectCountdown";
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const cachedUrl = await cache.get(id);

  if (cachedUrl) {
    await prisma.url.update({
      where: { shortCode: id },
      data: {
        clicks: {
          increment: 1,
        },
      },
    });

    return <RedirectCountdown url={cachedUrl as string} />;
  }

  const urlData = await prisma.url.findUnique({
    where: {
      shortCode: id,
    },
  });

  if (!urlData) {
    notFound();
  }

  await prisma.url.update({
    where: {
      id: urlData.id,
    },
    data: {
      clicks: {
        increment: 1,
      },
    },
  });

  await cache.set(id, urlData.originalUrl);

  return <RedirectCountdown url={urlData.originalUrl} />;
}
