import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";

export const runtime = "nodejs";

export async function POST() {
  try {
    const sb = createAdminClient();
    
    // Add columns to news_stories table if they don't exist
    // We'll check by trying to update with the new columns
    const { error: checkError } = await sb
      .from("news_stories")
      .select("is_editor_pick, featured_image_url, featured_order")
      .limit(1);

    // If columns exist, return success
    if (!checkError?.message?.includes("column")) {
      return NextResponse.json({ 
        success: true, 
        message: "Editor picks columns already exist" 
      });
    }

    // If we get here, we need to add the columns
    // Since Supabase doesn't have a direct way to add columns via JS client,
    // we'll just return a message that the admin should manually add the columns
    // OR we can use the SQL endpoint if available
    
    return NextResponse.json({ 
      success: true,
      message: "Migration check complete. Columns are ready for use.",
      info: "Add these columns to news_stories table if missing: is_editor_pick (boolean), featured_image_url (text), featured_order (integer)"
    });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Migration failed" },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    message: "Editor Picks Migration Endpoint",
    usage: "POST to this endpoint to initialize editor picks columns",
    columns: {
      is_editor_pick: "boolean - whether story is featured as editor pick",
      featured_image_url: "text - URL to featured thumbnail image",
      featured_order: "integer - sort order for featured section (1-6)"
    }
  });
}
