import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import {
  EMAIL_REGEX,
  createSessionToken,
  normalizeEmail,
  normalizePassword,
  SESSION_COOKIE,
  sessionCookieOptions,
  verifyPassword,
} from "@/lib/auth";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const email = normalizeEmail(body.email);
    const password = normalizePassword(body.password);

    if (!email || !password || !EMAIL_REGEX.test(email)) {
      return NextResponse.json(
        { error: "Invalid email or password." },
        { status: 401 }
      );
    }

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return NextResponse.json(
        { error: "Invalid email or password." },
        { status: 401 }
      );
    }

    if (!user.passwordHash) {
      return NextResponse.json(
        { error: "This account uses Google sign-in. Continue with Google." },
        { status: 401 }
      );
    }

    const valid = await verifyPassword(password, user.passwordHash);
    if (!valid) {
      return NextResponse.json(
        { error: "Invalid email or password." },
        { status: 401 }
      );
    }

    const sessionUser = { id: user.id, name: user.name, email: user.email };
    const token = await createSessionToken(sessionUser);
    const response = NextResponse.json({ user: sessionUser });
    response.cookies.set(SESSION_COOKIE, token, sessionCookieOptions());
    return response;
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { error: "Could not log in. Please try again." },
      { status: 500 }
    );
  }
}
