import { NextResponse, type NextRequest } from "next/server";

// Fast gate: no session cookie → send to login. The real check (signature + admin claim)
// happens on the server in requireAdmin(), because firebase-admin can't run in middleware.
export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  if (pathname.startsWith("/admin") && pathname !== "/admin/login" && !req.cookies.get("__session")) {
    const url = req.nextUrl.clone();
    url.pathname = "/admin/login";
    return NextResponse.redirect(url);
  }
  return NextResponse.next();
}

export const config = { matcher: ["/admin/:path*"] };
