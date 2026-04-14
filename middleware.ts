import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token;
    const isAuth = !!token;
    const pathname = req.nextUrl.pathname.replace(/\/$/, "");
    const isAdminPage = pathname.startsWith("/admin");
    const isDashboardPage = pathname.startsWith("/dashboard");
    const isLoginPage = pathname === "/admin/login";
    const isUserLoginPage = pathname === "/login";
    const userRole = token?.role as string;
    const isAnyAdmin = userRole === "admin" || userRole === "super-admin";

    // Role-based access control
    if (isAdminPage && !isLoginPage) {
      if (!isAuth) {
        return NextResponse.redirect(new URL("/admin/login", req.url));
      }
      if (userRole && !isAnyAdmin) {
        return NextResponse.redirect(new URL("/login", req.url));
      }
    }

    if (isDashboardPage) {
      if (!isAuth) {
        return NextResponse.redirect(new URL("/login", req.url));
      }
      // Redirect admins to admin dashboard
      if (isAnyAdmin) {
        return NextResponse.redirect(new URL("/admin", req.url));
      }
    }

    if (isLoginPage && isAuth) {
      return NextResponse.redirect(new URL("/admin", req.url));
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        const path = req.nextUrl.pathname.replace(/\/$/, "");
        if (path === "/admin/login" || path === "/login") return true;
        return !!token;
      },
    },
  }
);

export const config = {
  matcher: ["/admin/:path*", "/dashboard/:path*", "/login"],
};
