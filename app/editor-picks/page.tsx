import { createAdminClient } from "@/lib/supabase/admin";
import { PinterestBlogGrid } from "@/components/pinterest-blog-grid";

export const metadata = {
  title: "Editor Picks | CapitalIssues Intelligence",
  description: "Hand-selected stories from our research team. Curated financial intelligence and market insights.",
};

export default async function EditorPicksPage() {
  let items = [];
  let error = null;

  try {
    const sb = createAdminClient();
    const { data, error: fetchError } = await sb
      .from("news_stories")
      .select("*")
      .eq("is_editor_pick", true)
      .eq("published", true)
      .order("featured_order", { ascending: true })
      .order("timestamp", { ascending: false });

    if (fetchError) {
      error = fetchError.message;
    } else {
      items = data || [];
    }
  } catch (err) {
    error = err instanceof Error ? err.message : "Failed to fetch editor picks";
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border">
        <div className="mx-auto max-w-7xl px-4 py-12">
          <div className="bbg-header text-xs mb-4">
            <div>FEATURED CONTENT</div>
            <div>GALLERY</div>
          </div>
          <h1 className="text-4xl font-bold uppercase tracking-widest text-white">
            Editor Picks
          </h1>
          <p className="mt-2 text-sm text-muted-foreground max-w-2xl">
            Curated stories hand-selected by our research team. Discover the most important market developments, analysis, and insights.
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="mx-auto max-w-7xl px-4 py-12">
        {error && (
          <div className="mb-6 border border-destructive/50 bg-destructive/10 px-4 py-3 text-sm text-destructive">
            {error}
          </div>
        )}

        {items.length === 0 ? (
          <div className="border border-border bg-card p-12 text-center">
            <p className="text-sm text-muted-foreground">
              No editor picks yet. Check back soon for curated stories.
            </p>
          </div>
        ) : (
          <>
            <div className="mb-6 flex items-center justify-between">
              <p className="text-sm text-muted-foreground">
                Showing {items.length} featured {items.length === 1 ? "story" : "stories"}
              </p>
            </div>
            <PinterestBlogGrid items={items} />
          </>
        )}
      </div>
    </div>
  );
}
