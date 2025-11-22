import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import redis from "../../../redis";

export default async function Page({ params }: { params: { id: string } }) {
  const { id } = params;

  const cachedUrl = await redis.get(id);

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

  await redis.set(id, urlData.originalUrl);

  redirect(urlData.originalUrl);
}
