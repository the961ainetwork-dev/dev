import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";

export const runtime = "nodejs";

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const body = await request.json();
  const sb = createAdminClient();
  const { data, error } = await sb
    .from("sections")
    .update({
      slug: body.slug,
      title: body.title,
      subtitle: body.subtitle,
      body: body.body,
      page: body.page,
      position: body.position,
      visible: body.visible,
      metadata: body.metadata,
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
  const { error } = await sb.from("sections").delete().eq("id", id);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true });
}
