import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import cache from "@/lib/cache";

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const cachedUrl = await cache.get(id);

  if (cachedUrl) {
    prisma.url.update({
      where: { shortCode: id },
      data: {
        clicks: { increment: 1 },
      },
    });

    redirect(cachedUrl as string);
  }

  const urlData = await prisma.url.findUnique({
    where: { shortCode: id },
  });

  if (!urlData) {
    return <div>Short URL not found</div>;
  }

  prisma.url.update({
    where: { id: urlData.id },
    data: {
      clicks: { increment: 1 },
    },
  });

  await cache.set(id, urlData.originalUrl);

  redirect(urlData.originalUrl);
}
