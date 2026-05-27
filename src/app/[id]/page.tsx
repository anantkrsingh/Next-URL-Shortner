import { prisma } from "@/lib/prisma";
import cache from "@/lib/cache";
import { redirect } from "next/navigation";

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
    prisma.url.update({
      where: { shortCode: id },
      data: {
        clicks: {
          increment: 1,
        },
      },
    });

    redirect(cachedUrl as string);
  }

  // Fetch DB data while loading.tsx is showing
  const urlData = await prisma.url.findUnique({
    where: {
      shortCode: id,
    },
  });

  if (!urlData) {
    return (
      <div>
        Short URL not found{" "}
        <a className="color-blue-400 cursor-pointer underline" href="/">
          Short New
        </a>
        <div id="container-9049c3c244f96a9f73fec77b523bbc33"></div>
      </div>
    );
  }

  prisma.url.update({
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
