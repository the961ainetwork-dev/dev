import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET(req: NextRequest) {
  const supabase = await createClient();
  
  // Check if user is authenticated
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: "Authentication required" }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const reportType = searchParams.get("type");

  let query = supabase
    .from("newsletter_reports")
    .select("id, title, executive_summary, report_type, report_date, html_file_url")
    .order("report_date", { ascending: false });

  if (reportType && reportType !== "all") {
    query = query.eq("report_type", reportType);
  }

  const { data, error } = await query;

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json(data);
}
