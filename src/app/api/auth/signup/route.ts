import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import {
  EMAIL_REGEX,
  createSessionToken,
  hashPassword,
  normalizeEmail,
  normalizeName,
  normalizePassword,
  SESSION_COOKIE,
  sessionCookieOptions,
} from "@/lib/auth";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const name = normalizeName(body.name);
    const email = normalizeEmail(body.email);
    const password = normalizePassword(body.password);

    if (!name || !email || !password) {
      return NextResponse.json(
        { error: "Name, email, and password are required." },
        { status: 400 }
      );
    }

    if (!EMAIL_REGEX.test(email)) {
      return NextResponse.json(
        { error: "Please enter a valid email address." },
        { status: 400 }
      );
    }

    if (password.length < 8) {
      return NextResponse.json(
        { error: "Password must be at least 8 characters." },
        { status: 400 }
      );
    }

    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
      return NextResponse.json(
        { error: "An account with this email already exists." },
        { status: 409 }
      );
    }

    const user = await prisma.user.create({
      data: {
        name,
        email,
        passwordHash: await hashPassword(password),
      },
      select: { id: true, name: true, email: true },
    });

    const token = await createSessionToken(user);
    const response = NextResponse.json({ user }, { status: 201 });
    response.cookies.set(SESSION_COOKIE, token, sessionCookieOptions());
    return response;
  } catch (error) {
    console.error("Signup error:", error);
    return NextResponse.json(
      { error: "Could not create your account. Please try again." },
      { status: 500 }
    );
  }
}
