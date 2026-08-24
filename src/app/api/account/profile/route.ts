import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getCurrentUser, normalizeName } from "@/lib/auth";

export async function PATCH(request: NextRequest) {
  const sessionUser = await getCurrentUser();
  if (!sessionUser) {
    return NextResponse.json({ error: "Not authenticated." }, { status: 401 });
  }

  const body = await request.json().catch(() => null);
  const name = normalizeName(body?.name);

  if (!name || name.length < 2) {
    return NextResponse.json(
      { error: "Name must be at least 2 characters." },
      { status: 400 }
    );
  }

  try {
    const user = await prisma.user.update({
      where: { id: sessionUser.id },
      data: { name },
      select: { id: true, name: true, email: true },
    });

    return NextResponse.json({ user });
  } catch (error) {
    console.error("Profile update error:", error);
    return NextResponse.json(
      { error: "Could not update profile. Please try again." },
      { status: 500 }
    );
  }
}
