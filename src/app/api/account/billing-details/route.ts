import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";

const GST_REGEX = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/;

function trimField(value: unknown, max: number) {
  if (typeof value !== "string") return "";
  return value.trim().slice(0, max);
}

export async function GET() {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ error: "Not authenticated." }, { status: 401 });
  }

  const billingDetails = await prisma.billingDetails.findUnique({ where: { userId: user.id } });
  return NextResponse.json({ billingDetails });
}

export async function PUT(request: NextRequest) {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ error: "Not authenticated." }, { status: 401 });
  }

  const body = await request.json().catch(() => null);

  const fullName = trimField(body?.fullName, 120);
  const email = trimField(body?.email, 254).toLowerCase();
  const phone = trimField(body?.phone, 20);
  const addressLine1 = trimField(body?.addressLine1, 200);
  const addressLine2 = trimField(body?.addressLine2, 200);
  const city = trimField(body?.city, 100);
  const state = trimField(body?.state, 100);
  const postalCode = trimField(body?.postalCode, 20);
  const country = trimField(body?.country, 100) || "India";
  const isBusiness = Boolean(body?.isBusiness);
  const gstNumber = trimField(body?.gstNumber, 15).toUpperCase();

  if (!fullName || !email || !phone || !addressLine1 || !city || !state || !postalCode) {
    return NextResponse.json(
      { error: "Please fill in name, email, phone, and address." },
      { status: 400 }
    );
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
  }

  if (!/^\+?[0-9]{7,15}$/.test(phone)) {
    return NextResponse.json({ error: "Please enter a valid phone number." }, { status: 400 });
  }

  if (isBusiness && !GST_REGEX.test(gstNumber)) {
    return NextResponse.json(
      { error: "Please enter a valid 15-character GST number." },
      { status: 400 }
    );
  }

  const billingDetails = await prisma.billingDetails.upsert({
    where: { userId: user.id },
    create: {
      userId: user.id,
      fullName,
      email,
      phone,
      addressLine1,
      addressLine2: addressLine2 || null,
      city,
      state,
      postalCode,
      country,
      isBusiness,
      gstNumber: isBusiness ? gstNumber : null,
    },
    update: {
      fullName,
      email,
      phone,
      addressLine1,
      addressLine2: addressLine2 || null,
      city,
      state,
      postalCode,
      country,
      isBusiness,
      gstNumber: isBusiness ? gstNumber : null,
    },
  });

  return NextResponse.json({ billingDetails });
}
