import { NextResponse } from "next/server";
import { getGoogleRedirectUri } from "@/lib/auth";

const STATE_COOKIE = "tinyur_oauth_state";

export async function GET() {
  const clientId = process.env.GOOGLE_CLIENT_ID;
  if (!clientId) {
    return NextResponse.json(
      { error: "Google login is not configured." },
      { status: 500 }
    );
  }

  const state = crypto.randomUUID();
  const params = new URLSearchParams({
    client_id: clientId,
    redirect_uri: getGoogleRedirectUri(),
    response_type: "code",
    scope: "openid email profile",
    state,
    access_type: "online",
    prompt: "select_account",
  });

  const url = `https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`;
  const response = NextResponse.redirect(url);
  response.cookies.set(STATE_COOKIE, state, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 10,
  });
  return response;
}
