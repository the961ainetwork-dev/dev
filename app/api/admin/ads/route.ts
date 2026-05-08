import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import { createAdminClient } from "@/lib/supabase/admin";

export async function GET() {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from("advertisements")
    .select("*")
    .order("priority", { ascending: false })
    .order("created_at", { ascending: false });
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ads: data ?? [] });
}

export async function POST(request: Request) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const body = await request.json();
  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from("advertisements")
    .insert({
      title: body.title,
      sponsor_name: body.sponsor_name,
      description: body.description ?? null,
      ad_type: body.ad_type,
      tier: body.tier ?? "standard",
      image_url: body.image_url ?? null,
      logo_url: body.logo_url ?? null,
      link_url: body.link_url ?? null,
      cta_text: body.cta_text ?? null,
      placement_screens: body.placement_screens ?? [],
      status: body.status ?? "draft",
      start_date: body.start_date ?? null,
      end_date: body.end_date ?? null,
      priority: body.priority ?? 0,
      metadata: body.metadata ?? {},
    })
    .select()
    .single();
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ad: data });
}
