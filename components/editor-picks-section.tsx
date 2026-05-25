import Link from "next/link";
import { PinterestBlogGrid } from "./pinterest-blog-grid";
import { createAdminClient } from "@/lib/supabase/admin";

export async function EditorPicksSection() {
  try {
    const sb = createAdminClient();
    const { data } = await sb
      .from("news_stories")
      .select("*")
      .eq("is_editor_pick", true)
      .eq("published", true)
      .order("featured_order", { ascending: true })
      .order("timestamp", { ascending: false })
      .limit(6);

    if (!data || data.length === 0) {
      return null;
    }

    return (
      <section className="border-y border-border bg-background py-12">
        <div className="mx-auto max-w-7xl px-4">
          {/* Header */}
          <div className="mb-8 space-y-2">
            <div className="bbg-header text-xs">
              <div>FEATURED CONTENT</div>
              <div>CURATED</div>
            </div>
            <h2 className="text-2xl font-bold uppercase tracking-widest text-white">
              Editor Picks
            </h2>
            <p className="text-sm text-muted-foreground">
              Hand-selected stories from our research team.
            </p>
          </div>

          {/* Grid */}
          <PinterestBlogGrid items={data} maxItems={6} />

          {/* View All Link */}
          <div className="mt-8 flex justify-center">
            <Link
              href="/editor-picks"
              className="inline-flex items-center justify-center gap-2 border border-primary bg-primary px-5 py-2.5 text-xs font-bold uppercase tracking-wide text-primary-foreground transition-colors hover:bg-primary/90"
            >
              View All Picks →
            </Link>
          </div>
        </div>
      </section>
    );
  } catch (error) {
    console.error("Failed to fetch editor picks:", error);
    return null;
  }
}
