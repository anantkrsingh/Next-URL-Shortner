import { SignJWT, jwtVerify } from "jose";
import bcrypt from "bcryptjs";
import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";

export const SESSION_COOKIE = "tinyur_session";
const SESSION_MAX_AGE = 60 * 60 * 24 * 7;

export type SessionUser = {
  id: string;
  name: string;
  email: string;
};

function getSecret() {
  const secret = process.env.AUTH_SECRET;
  if (secret && secret.length >= 16) {
    return new TextEncoder().encode(secret);
  }

  if (process.env.NODE_ENV !== "production") {
    return new TextEncoder().encode("tinyur-dev-auth-secret-change-me");
  }

  throw new Error("AUTH_SECRET must be set to a string of at least 16 characters");
}

export async function hashPassword(password: string) {
  return bcrypt.hash(password, 12);
}

export async function verifyPassword(password: string, passwordHash: string) {
  return bcrypt.compare(password, passwordHash);
}

export async function createSessionToken(user: SessionUser) {
  return new SignJWT({ email: user.email, name: user.name })
    .setProtectedHeader({ alg: "HS256" })
    .setSubject(user.id)
    .setIssuedAt()
    .setExpirationTime(`${SESSION_MAX_AGE}s`)
    .sign(getSecret());
}

export async function readSessionToken(token: string): Promise<SessionUser | null> {
  try {
    const { payload } = await jwtVerify(token, getSecret());
    if (typeof payload.sub !== "string") return null;
    if (typeof payload.email !== "string") return null;
    if (typeof payload.name !== "string") return null;
    return { id: payload.sub, email: payload.email, name: payload.name };
  } catch {
    return null;
  }
}

export function sessionCookieOptions() {
  return {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax" as const,
    path: "/",
    maxAge: SESSION_MAX_AGE,
  };
}

export async function getCurrentUser(): Promise<SessionUser | null> {
  const jar = await cookies();
  const token = jar.get(SESSION_COOKIE)?.value;
  if (!token) return null;

  const session = await readSessionToken(token);
  if (!session) return null;

  const user = await prisma.user.findUnique({
    where: { id: session.id },
    select: { id: true, name: true, email: true },
  });

  return user;
}

export function getAppUrl() {
  return (process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000").replace(/\/$/, "");
}

export function getGoogleRedirectUri() {
  return process.env.GOOGLE_REDIRECT_URI || `${getAppUrl()}/api/auth/google/callback`;
}

export const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function normalizeEmail(value: unknown) {
  if (typeof value !== "string") return "";
  return value.trim().toLowerCase().slice(0, 254);
}

export function normalizeName(value: unknown) {
  if (typeof value !== "string") return "";
  return value.trim().slice(0, 120);
}

export function normalizePassword(value: unknown) {
  if (typeof value !== "string") return "";
  return value.slice(0, 128);
}
