import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";

export const runtime = "nodejs";

export async function GET() {
  const sb = createAdminClient();
  const { data, error } = await sb
    .from("news_stories")
    .select("*")
    .order("timestamp", { ascending: false })
    .limit(500);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ items: data ?? [] });
}

export async function POST(request: Request) {
  const body = await request.json();
  const sb = createAdminClient();
  const { data, error } = await sb
    .from("news_stories")
    .insert({
      headline: body.headline,
      summary: body.summary,
      content: body.content || null,
      category: body.category || "markets",
      region: body.region || "global",
      priority: body.priority || "normal",
      source: body.source || null,
      tags: body.tags ?? [],
      published: body.published ?? true,
      timestamp: body.timestamp || new Date().toISOString(),
    })
    .select()
    .single();
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ item: data });
}
