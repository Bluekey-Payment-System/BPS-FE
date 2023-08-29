import {
  NextFetchEvent, NextMiddleware, NextRequest, NextResponse,
} from "next/server";

import { MiddlewareFactory } from "@/types/middleware.type";

export const withAuthorityCheck: MiddlewareFactory = (next: NextMiddleware) => {
  return async (request: NextRequest, _next: NextFetchEvent) => {
    const res = await next(request, _next);
    const { pathname } = request.nextUrl;
    const cookie = request.cookies.get("token");

    let token;
    if (cookie) {
      token = cookie.value;
    }

    if (pathname === "/admin/albums/new" || pathname === "/admin/artists/new") {
      try {
        const response = await fetch(`${process.env.BASE_URL}/admin/authority-check`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.status !== 200) {
          return NextResponse.redirect(new URL("/404", request.url));
        }
        // eslint-disable-next-line no-empty
      } catch (error) {
        return NextResponse.redirect(new URL("/404", request.url));
      }
    }

    return res;
  };
};
