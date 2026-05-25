import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";

export const runtime = "nodejs";

export async function GET() {
  try {
    const sb = createAdminClient();
    const { data, error } = await sb
      .from("news_stories")
      .select("*")
      .eq("is_editor_pick", true)
      .eq("published", true)
      .order("featured_order", { ascending: true })
      .order("timestamp", { ascending: false });
    
    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    
    return NextResponse.json({ items: data ?? [] });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to fetch editor picks" },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { id, is_editor_pick, featured_image_url, featured_order } = body;

    const sb = createAdminClient();
    const { data, error } = await sb
      .from("news_stories")
      .update({
        is_editor_pick,
        featured_image_url,
        featured_order,
      })
      .eq("id", id)
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ item: data });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Update failed" },
      { status: 500 }
    );
  }
}
