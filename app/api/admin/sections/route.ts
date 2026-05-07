import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";

export const runtime = "nodejs";

export async function GET() {
  const sb = createAdminClient();
  const { data, error } = await sb
    .from("sections")
    .select("*")
    .order("page", { ascending: true })
    .order("position", { ascending: true });
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ items: data ?? [] });
}

export async function POST(request: Request) {
  const body = await request.json();
  const sb = createAdminClient();
  const { data, error } = await sb
    .from("sections")
    .insert({
      slug: body.slug,
      title: body.title,
      subtitle: body.subtitle || null,
      body: body.body || null,
      page: body.page || "home",
      position: body.position ?? 0,
      visible: body.visible ?? true,
      metadata: body.metadata ?? {},
    })
    .select()
    .single();
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ item: data });
}
