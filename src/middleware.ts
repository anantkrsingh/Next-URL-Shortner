import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "unknown";

  console.log("REQ:", {
    method: request.method,
    path: request.nextUrl.pathname,
    ip,
    ua: request.headers.get("user-agent"),
  });

  return NextResponse.next();


}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
