import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";
import { generateRawApiKey, hashApiKey, maskApiKey } from "@/lib/apiKeys";

export async function GET() {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ error: "Not authenticated." }, { status: 401 });
  }

  const apiKey = await prisma.apiKey.findUnique({ where: { userId: user.id } });

  return NextResponse.json({
    apiKey: apiKey
      ? {
          maskedKey: `${apiKey.prefix}${"•".repeat(8)}`,
          createdAt: apiKey.createdAt,
          lastUsedAt: apiKey.lastUsedAt,
        }
      : null,
  });
}

// Generates a new key, replacing any existing one — there's only ever one
// valid key per account. The raw key is only ever returned from this call.
export async function POST() {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ error: "Not authenticated." }, { status: 401 });
  }

  const rawKey = generateRawApiKey();
  const keyHash = hashApiKey(rawKey);
  const prefix = maskApiKey(rawKey).slice(0, -8);

  const apiKey = await prisma.apiKey.upsert({
    where: { userId: user.id },
    create: { userId: user.id, keyHash, prefix },
    update: { keyHash, prefix, lastUsedAt: null },
  });

  return NextResponse.json({
    key: rawKey,
    apiKey: {
      maskedKey: `${apiKey.prefix}${"•".repeat(8)}`,
      createdAt: apiKey.createdAt,
      lastUsedAt: apiKey.lastUsedAt,
    },
  });
}

export async function DELETE() {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ error: "Not authenticated." }, { status: 401 });
  }

  await prisma.apiKey.deleteMany({ where: { userId: user.id } });
  return NextResponse.json({ ok: true });
}
