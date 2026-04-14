import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token;
    const isAuth = !!token;
    const isAdminPage = req.nextUrl.pathname.startsWith("/admin");
    const isLoginPage = req.nextUrl.pathname === "/admin/login";

    if (isAdminPage && !isLoginPage && !isAuth) {
      return NextResponse.redirect(new URL("/admin/login", req.url));
    }

    if (isLoginPage && isAuth) {
      return NextResponse.redirect(new URL("/admin", req.url));
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        // Just check if we are on the login page, then always true
        if (req.nextUrl.pathname === "/admin/login") return true;
        // Otherwise require a token
        return !!token;
      },
    },
  }
);

export const config = {
  matcher: ["/admin/:path*"],
};
