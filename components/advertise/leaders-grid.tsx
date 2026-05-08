import { createAdminClient } from "@/lib/supabase/admin";
import { LeaderCard } from "./leader-card";

export async function LeadersGrid() {
  let ads: Array<{
    id: string;
    title: string;
    sponsor_name: string;
    description: string | null;
    image_url: string | null;
    link_url: string | null;
    cta_text: string | null;
    tier: string;
  }> = [];

  try {
    const supabase = createAdminClient();
    const { data } = await supabase
      .from("advertisements")
      .select("id, title, sponsor_name, description, image_url, link_url, cta_text, tier")
      .eq("status", "active")
      .eq("ad_type", "leader_card")
      .order("priority", { ascending: false });
    ads = data ?? [];
  } catch (e) {
    console.error("[v0] LeadersGrid load failed:", e);
  }

  if (!ads.length) {
    return (
      <div className="mt-8 border border-dashed border-border bg-card p-10 text-center">
        <p className="text-sm text-muted-foreground">
          Leader card slots are open. Be the first to claim one.
        </p>
      </div>
    );
  }

  return (
    <div className="mt-8 grid gap-px border-l border-t border-border bg-border md:grid-cols-2 lg:grid-cols-3">
      {ads.map((ad) => (
        <LeaderCard key={ad.id} ad={ad} />
      ))}
    </div>
  );
}
