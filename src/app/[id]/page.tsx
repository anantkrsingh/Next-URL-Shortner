import { prisma } from "@/lib/prisma";
import cache from "@/lib/cache";
import { notFound, redirect } from "next/navigation";
import type { Metadata } from "next";
export const dynamic = "force-dynamic";

// Runs before the response starts streaming, so notFound() here returns a
// real 404 status; inside the page it would stream after a 200 header.
export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;

  const cachedUrl = await cache.get(id);
  if (!cachedUrl) {
    const urlData = await prisma.url.findUnique({
      where: { shortCode: id },
    });

    if (!urlData) {
      notFound();
    }

    await cache.set(id, urlData.originalUrl);
  }

  return { robots: { index: false, follow: false } };
}
function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const [_, cachedUrl] = await Promise.all([delay(5000), cache.get(id)]);

  if (cachedUrl) {
    await prisma.url.update({
      where: { shortCode: id },
      data: {
        clicks: {
          increment: 1,
        },
      },
    });

    redirect(cachedUrl as string);
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

  redirect(urlData.originalUrl);
}
