import { NextResponse } from "next/server";
import { ADMIN_COOKIE, buildSessionToken, checkAdminPassword } from "@/lib/admin-auth";

export const runtime = "nodejs";

export async function POST(request: Request) {
  let body: { password?: string } = {};
  try {
    body = await request.json();
  } catch {}

  const password = (body.password || "").trim();
  if (!checkAdminPassword(password)) {
    // Slow down brute force attempts
    await new Promise((r) => setTimeout(r, 600));
    return NextResponse.json({ error: "Invalid password" }, { status: 401 });
  }

  const token = await buildSessionToken();
  const res = NextResponse.json({ ok: true });
  res.cookies.set(ADMIN_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 30 * 24 * 60 * 60,
  });
  return res;
}
