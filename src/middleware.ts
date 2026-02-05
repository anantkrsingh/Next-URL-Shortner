import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  console.log("REQ:", {
    method: request.method,
    path: request.nextUrl.pathname,
    ip: request.ip,
    ua: request.headers.get("user-agent"),
  });
  return NextResponse.next();


}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
