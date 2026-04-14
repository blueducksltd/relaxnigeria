import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token;
    const isAuth = !!token;
    const isAdminPage = req.nextUrl.pathname.startsWith("/admin");
    const isDashboardPage = req.nextUrl.pathname.startsWith("/dashboard");
    const isLoginPage = req.nextUrl.pathname === "/admin/login";
    const isUserLoginPage = req.nextUrl.pathname === "/login";

    if (isAdminPage && !isLoginPage && !isAuth) {
      return NextResponse.redirect(new URL("/admin/login", req.url));
    }

    if (isLoginPage && isAuth) {
      return NextResponse.redirect(new URL("/admin", req.url));
    }

    if (isDashboardPage && !isAuth) {
      return NextResponse.redirect(new URL("/login", req.url));
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        if (req.nextUrl.pathname === "/admin/login") return true;
        if (req.nextUrl.pathname === "/login") return true;
        return !!token;
      },
    },
  }
);

export const config = {
  matcher: ["/admin/:path*", "/dashboard/:path*"],
};
