import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import {
  createSessionToken,
  getAppUrl,
  getGoogleRedirectUri,
  SESSION_COOKIE,
  sessionCookieOptions,
} from "@/lib/auth";

const STATE_COOKIE = "tinyur_oauth_state";

type GoogleTokenResponse = {
  access_token?: string;
  error?: string;
};

type GoogleUserInfo = {
  id?: string;
  email?: string;
  verified_email?: boolean;
  name?: string;
  picture?: string;
};

export async function GET(request: NextRequest) {
  const appUrl = getAppUrl();
  const fail = (message: string) =>
    NextResponse.redirect(`${appUrl}/login?error=${encodeURIComponent(message)}`);

  const clientId = process.env.GOOGLE_CLIENT_ID;
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
  if (!clientId || !clientSecret) {
    return fail("Google login is not configured.");
  }

  const code = request.nextUrl.searchParams.get("code");
  const state = request.nextUrl.searchParams.get("state");
  const storedState = request.cookies.get(STATE_COOKIE)?.value;

  if (!code || !state || !storedState || state !== storedState) {
    return fail("Google sign-in was cancelled or could not be verified.");
  }

  try {
    const tokenRes = await fetch("https://oauth2.googleapis.com/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        code,
        client_id: clientId,
        client_secret: clientSecret,
        redirect_uri: getGoogleRedirectUri(),
        grant_type: "authorization_code",
      }),
    });

    const tokenJson = (await tokenRes.json()) as GoogleTokenResponse;
    if (!tokenRes.ok || !tokenJson.access_token) {
      console.error("Google token error:", tokenJson);
      return fail("Could not complete Google sign-in.");
    }

    const userRes = await fetch("https://www.googleapis.com/oauth2/v2/userinfo", {
      headers: { Authorization: `Bearer ${tokenJson.access_token}` },
    });
    const profile = (await userRes.json()) as GoogleUserInfo;

    if (!userRes.ok || !profile.id || !profile.email) {
      return fail("Could not read your Google account.");
    }

    const email = profile.email.trim().toLowerCase();
    const name = (profile.name || email.split("@")[0]).slice(0, 120);
    const image = profile.picture || null;

    const existingByGoogle = await prisma.user.findUnique({
      where: { googleId: profile.id },
    });

    let user = existingByGoogle;

    if (!user) {
      const existingByEmail = await prisma.user.findUnique({
        where: { email },
      });

      if (existingByEmail) {
        user = await prisma.user.update({
          where: { id: existingByEmail.id },
          data: { googleId: profile.id, image: image ?? existingByEmail.image },
        });
      } else {
        user = await prisma.user.create({
          data: {
            name,
            email,
            googleId: profile.id,
            image,
          },
        });
      }
    }

    const sessionUser = { id: user.id, name: user.name, email: user.email };
    const token = await createSessionToken(sessionUser);
    const response = NextResponse.redirect(`${appUrl}/`);
    response.cookies.set(SESSION_COOKIE, token, sessionCookieOptions());
    response.cookies.set(STATE_COOKIE, "", { path: "/", maxAge: 0 });
    return response;
  } catch (error) {
    console.error("Google callback error:", error);
    return fail("Could not complete Google sign-in.");
  }
}
