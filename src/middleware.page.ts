import { NextRequest, NextResponse } from "next/server";

import { withAuthorityCheck } from "./utils/withAuthorityCheck";

const middleware = (request: NextRequest) => {
  const { pathname } = request.nextUrl;
  const cookie = request.cookies.get("token");

  let token;

  if (cookie) {
    token = cookie.value;
  }

  if (!token && pathname !== "/admin/signin" && pathname !== "/signin") {
    return NextResponse.rewrite(new URL("/signin", request.url));
  }

  return NextResponse.next();
};

export default withAuthorityCheck(middleware);

export const config = {
  matcher: "/((?!api|_next/static|_next/image|images|favicon.ico).*)",
};
