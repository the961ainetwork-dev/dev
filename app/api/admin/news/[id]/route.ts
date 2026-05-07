import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";

export const runtime = "nodejs";

export async function GET(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const sb = createAdminClient();
  const { data, error } = await sb.from("news_stories").select("*").eq("id", id).single();
  if (error) return NextResponse.json({ error: error.message }, { status: 404 });
  return NextResponse.json({ item: data });
}

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const body = await request.json();
  const sb = createAdminClient();
  const { data, error } = await sb
    .from("news_stories")
    .update({
      headline: body.headline,
      summary: body.summary,
      content: body.content,
      category: body.category,
      region: body.region,
      priority: body.priority,
      source: body.source,
      tags: body.tags,
      published: body.published,
      timestamp: body.timestamp,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id)
    .select()
    .single();
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ item: data });
}

export async function DELETE(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const sb = createAdminClient();
  const { error } = await sb.from("news_stories").delete().eq("id", id);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true });
}
