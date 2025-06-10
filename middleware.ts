import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const referer = request.headers.get("referer");
  const { pathname } = request.nextUrl;

  // URL에서 파라미터 추출
  const params: Record<string, string> = {};
  request.nextUrl.href.replace(
    /[?&]+([^=&]+)=([^&]*)/gi,
    (str: string, key: string, value: string) => {
      params[key] = decodeURIComponent(value);
      return "";
    },
  );

  // 기존 쿠키에서 값 가져오기
  let memberNo = request.cookies.get("memberNo")?.value || "";
  let shopbySSID = request.cookies.get("SHOPBY_SSID")?.value || "";

  // ✅ 1. URL에 memberNo, SHOPBY_SSID가 존재하면 무조건 진행!
  if (params.memberNo && params.SHOPBY_SSID) {
    let response = NextResponse.redirect(
      new URL("/online-mock-test", request.url),
    );

    if (pathname.includes("/result/personal")) {
      response = NextResponse.redirect(
        new URL("/result/personal", request.url),
      );
    }

    // 쿠키 저장 (덮어쓰기)
    response.cookies.set("memberNo", params.memberNo, {
      httpOnly: false,
      secure: false,
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24,
    });

    response.cookies.set("SHOPBY_SSID", params.SHOPBY_SSID, {
      httpOnly: false,
      secure: false,
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24,
    });

    console.log("✅ URL에 memberNo와 SHOPBY_SSID가 있어서 진행!");
    return response;
  }

  // ✅ 2. 모든 페이지에서 쿠키 없으면 로그인 페이지로 튕김
  if (!memberNo || !shopbySSID) {
    console.log("쿠키도 없어서 로그인 페이지로 이동!");
    return NextResponse.redirect(new URL("https://dsdo.co.kr/"));
  }

  // ✅ 3. / 경로는 online-mock-test로 리디렉트
  if (pathname === "/") {
    return NextResponse.redirect(new URL("/online-mock-test", request.url));
  }

  const isFromSuccess = referer?.includes("/success");

  // manual 페이지로 접근하려는 경우
  if (request.nextUrl.pathname.includes("/personal/manual") && isFromSuccess) {
    // 홈페이지나 다른 페이지로 리다이렉트
    return NextResponse.redirect(new URL("/", request.url));
  }

  // ✅ 4. 나머지 페이지는 그대로 진행
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|static|_next|logout|isbn|icon).*)", "/personal/manual"], // 특정 경로 제외
};
