import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";

export const runtime = "nodejs";

export async function GET() {
  const sb = createAdminClient();
  const counts = await Promise.all([
    sb.from("news_stories").select("id", { count: "exact", head: true }),
    sb.from("services").select("id", { count: "exact", head: true }),
    sb.from("sections").select("id", { count: "exact", head: true }),
    sb.from("newsletter_subscriptions").select("id", { count: "exact", head: true }),
    sb.from("contact_submissions").select("id", { count: "exact", head: true }),
  ]);
  return NextResponse.json({
    news: counts[0].count ?? 0,
    services: counts[1].count ?? 0,
    sections: counts[2].count ?? 0,
    subscribers: counts[3].count ?? 0,
    contacts: counts[4].count ?? 0,
  });
}
