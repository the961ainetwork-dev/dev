import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const screen = searchParams.get("screen");
  const adType = searchParams.get("type");

  const supabase = createAdminClient();
  let query = supabase
    .from("advertisements")
    .select("id, title, sponsor_name, description, ad_type, tier, image_url, logo_url, link_url, cta_text, placement_screens, priority")
    .eq("status", "active")
    .order("priority", { ascending: false });

  if (adType) query = query.eq("ad_type", adType);

  const { data, error } = await query;
  if (error) return NextResponse.json({ error: error.message, ads: [] }, { status: 500 });

  const ads = (data ?? []).filter((ad) => {
    if (!screen) return true;
    const screens = (ad.placement_screens as string[]) ?? [];
    return screens.length === 0 || screens.includes(screen) || screens.includes("all");
  });

  return NextResponse.json({ ads });
}
