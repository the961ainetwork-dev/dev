import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";

export const runtime = "nodejs";

export async function GET() {
  const sb = createAdminClient();
  const { data, error } = await sb
    .from("services")
    .select("*")
    .order("title", { ascending: true });
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ items: data ?? [] });
}

export async function POST(request: Request) {
  const body = await request.json();
  const sb = createAdminClient();
  const { data, error } = await sb
    .from("services")
    .insert({
      slug: body.slug,
      title: body.title,
      short_description: body.short_description,
      long_description: body.long_description || "",
      icon: body.icon || null,
      color: body.color || null,
      features: body.features ?? [],
      benefits: body.benefits ?? [],
      use_cases: body.use_cases ?? [],
      is_featured: body.is_featured ?? false,
    })
    .select()
    .single();
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ item: data });
}
