import type { NextRequest } from "next/server";

import { NextResponse } from "next/server";

export const middleware = (request: NextRequest) => {
  const { cookies } = request;
  const token = cookies.get("token");

  if (!request.nextUrl.pathname.includes("signin") && !token) {
    return NextResponse.redirect(new URL("/signin", request.url));
  }

  if (request.nextUrl.pathname === "/admin/artists/new" || request.nextUrl.pathname === "/admin/albums/new") {
    // health check와 같은 유저 정보  api 요청 로직 추가
  }

  return NextResponse.next();
};

export const config = {
  matcher: "/((?!api|_next/static|_next/image|images|favicon.ico).*)",
};
