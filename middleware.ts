import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // In mock mode, we'll check localStorage on client side
  // For now, allow all admin routes in development
  // The pages will handle auth checks themselves

  // Redirect from root to login
  if (pathname === "/") {
    return NextResponse.redirect(new URL("/auth/admin/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/"],
};
