import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";

export const runtime = "nodejs";

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const body = await request.json();
  const sb = createAdminClient();
  const { data, error } = await sb
    .from("services")
    .update({
      slug: body.slug,
      title: body.title,
      short_description: body.short_description,
      long_description: body.long_description,
      icon: body.icon,
      color: body.color,
      features: body.features,
      benefits: body.benefits,
      use_cases: body.use_cases,
      is_featured: body.is_featured,
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
  const { error } = await sb.from("services").delete().eq("id", id);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true });
}
