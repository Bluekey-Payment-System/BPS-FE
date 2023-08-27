import { NextRequest, NextResponse } from "next/server";

import { withAuthorityCheck } from "./utils/withAuthorityCheck";

const middleware = (request: NextRequest) => {
  const { pathname } = request.nextUrl;
  const cookie = request.cookies.get("token");

  let token;

  if (cookie) {
    token = cookie.value;
  }

  if (pathname === "/admin/signin" || pathname.startsWith("/admin/dashboard")) {
    return NextResponse.next();
  }

  if (!pathname.includes("/sign") && !token) {
    return NextResponse.redirect(new URL("/signin", request.url));
  }

  return NextResponse.next();
};

export default withAuthorityCheck(middleware);

export const config = {
  matcher: "/((?!api|_next/static|_next/image|images|favicon.ico).*)",
};
