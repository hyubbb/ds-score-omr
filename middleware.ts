import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const referer = request.headers.get("referer");
  const { pathname } = request.nextUrl;

  if (pathname === "/") {
    return NextResponse.redirect(new URL("/personal/omr/list", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|static|_next|logout|isbn|icon).*)", "/personal/manual"], // 특정 경로 제외
};
