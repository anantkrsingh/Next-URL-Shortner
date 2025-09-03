
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
    let url: string = "/";
  try {
    const { id } = await params;


    const urlData = await prisma.url.findUnique({
      where: { shortCode: id },
    });

    if (!urlData) {
      return <div>Short URL not found</div>;
    }

    await prisma.url.update({
      where: { id: urlData.id },
      data: { clicks: urlData.clicks + 1 },
    });

    url = urlData.originalUrl;
  } catch (error) {
    console.error("Error redirecting:", error);
    return <div>Internal server error</div>;
  }finally {
    redirect(url);
  }
}
