import crypto from "crypto";
import { prisma } from "@/lib/prisma";
import type { SessionUser } from "@/lib/auth";

const KEY_PREFIX = "tur_live_";

export function generateRawApiKey() {
  return `${KEY_PREFIX}${crypto.randomBytes(24).toString("hex")}`;
}

export function hashApiKey(rawKey: string) {
  return crypto.createHash("sha256").update(rawKey).digest("hex");
}

/** e.g. "tur_live_a1b2c3d4…" — enough to recognize the key, not enough to use it. */
export function maskApiKey(rawKey: string) {
  return `${rawKey.slice(0, KEY_PREFIX.length + 8)}${"•".repeat(8)}`;
}

/**
 * Resolves the Authorization header (`Bearer <key>` or the raw key) to the
 * account that owns it. Returns `undefined` when no header was sent at all
 * (caller should fall back to cookie-session auth), and `null` when a
 * header was sent but doesn't match any key (caller should reject).
 */
export async function getUserFromAuthHeader(
  authHeader: string | null
): Promise<SessionUser | null | undefined> {
  if (!authHeader) return undefined;

  const match = /^Bearer\s+(.+)$/i.exec(authHeader.trim());
  const rawKey = (match ? match[1] : authHeader).trim();
  if (!rawKey.startsWith(KEY_PREFIX)) return null;

  const keyHash = hashApiKey(rawKey);
  const apiKey = await prisma.apiKey.findUnique({
    where: { keyHash },
    include: { user: { select: { id: true, name: true, email: true } } },
  });
  if (!apiKey) return null;

  // Best-effort — don't block the request on this write.
  prisma.apiKey
    .update({ where: { id: apiKey.id }, data: { lastUsedAt: new Date() } })
    .catch(() => {});

  return apiKey.user;
}
