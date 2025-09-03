import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  req: NextRequest,
  { params }: { params: { shortCode: string } }
) {
  try {
    const { shortCode } = params;

    const url = await prisma.url.findUnique({
      where: { shortCode },
    });

    if (!url) {
      return NextResponse.json(
        { error: "Short URL not found" },
        { status: 404 }
      );
    }

    await prisma.url.update({
      where: { id: url.id },
      data: { clicks: url.clicks + 1 },
    });

    return NextResponse.json({ redirectUrl: url.originalUrl });
  } catch (error) {
    console.error("Error fetching short URL:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
