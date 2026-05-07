import { updateSession } from "@/lib/supabase/proxy";
import { ADMIN_COOKIE, verifySessionToken } from "@/lib/admin-auth";
import { NextResponse, type NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Protect /admin/* (except /admin/login) with the admin session cookie
  if (pathname.startsWith("/admin") && pathname !== "/admin/login") {
    const token = request.cookies.get(ADMIN_COOKIE)?.value;
    const ok = await verifySessionToken(token);
    if (!ok) {
      const url = request.nextUrl.clone();
      url.pathname = "/admin/login";
      url.searchParams.set("next", pathname);
      return NextResponse.redirect(url);
    }
  }

  // Protect /api/admin/* (except /api/admin/login) with the admin session cookie
  if (pathname.startsWith("/api/admin") && pathname !== "/api/admin/login") {
    const token = request.cookies.get(ADMIN_COOKIE)?.value;
    const ok = await verifySessionToken(token);
    if (!ok) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
  }

  return await updateSession(request);
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
