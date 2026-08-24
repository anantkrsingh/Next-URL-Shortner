import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import {
  getCurrentUser,
  hashPassword,
  normalizePassword,
  verifyPassword,
} from "@/lib/auth";

export async function PATCH(request: NextRequest) {
  const sessionUser = await getCurrentUser();
  if (!sessionUser) {
    return NextResponse.json({ error: "Not authenticated." }, { status: 401 });
  }

  const body = await request.json().catch(() => null);
  const currentPassword = normalizePassword(body?.currentPassword);
  const newPassword = normalizePassword(body?.newPassword);

  if (!newPassword || newPassword.length < 8) {
    return NextResponse.json(
      { error: "New password must be at least 8 characters." },
      { status: 400 }
    );
  }

  const user = await prisma.user.findUnique({ where: { id: sessionUser.id } });
  if (!user) {
    return NextResponse.json({ error: "Account not found." }, { status: 404 });
  }

  if (!user.passwordHash) {
    return NextResponse.json(
      { error: "This account signs in with Google and has no password to change." },
      { status: 400 }
    );
  }

  if (!currentPassword) {
    return NextResponse.json(
      { error: "Current password is required." },
      { status: 400 }
    );
  }

  const valid = await verifyPassword(currentPassword, user.passwordHash);
  if (!valid) {
    return NextResponse.json(
      { error: "Current password is incorrect." },
      { status: 401 }
    );
  }

  try {
    const passwordHash = await hashPassword(newPassword);
    await prisma.user.update({ where: { id: user.id }, data: { passwordHash } });
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Password update error:", error);
    return NextResponse.json(
      { error: "Could not update password. Please try again." },
      { status: 500 }
    );
  }
}
