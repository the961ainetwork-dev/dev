import Link from "next/link";
import { createAdminClient } from "@/lib/supabase/admin";
import { Newspaper, LayoutGrid, Briefcase, Users, Mail, Rocket, Star } from "lucide-react";
import { PublishButton } from "@/components/admin/publish-button";

export const dynamic = "force-dynamic";

async function getStats() {
  try {
    const sb = createAdminClient();
    const counts = await Promise.all([
      sb.from("news_stories").select("id", { count: "exact", head: true }),
      sb.from("services").select("id", { count: "exact", head: true }),
      sb.from("sections").select("id", { count: "exact", head: true }),
      sb.from("newsletter_subscriptions").select("id", { count: "exact", head: true }),
      sb.from("contact_submissions").select("id", { count: "exact", head: true }),
      sb.from("news_stories").select("id", { count: "exact", head: true }).eq("is_editor_pick", true),
    ]);
    return {
      news: counts[0].count ?? 0,
      services: counts[1].count ?? 0,
      sections: counts[2].count ?? 0,
      subscribers: counts[3].count ?? 0,
      contacts: counts[4].count ?? 0,
      editorPicks: counts[5].count ?? 0,
    };
  } catch {
    return { news: 0, services: 0, sections: 0, subscribers: 0, contacts: 0, editorPicks: 0 };
  }
}

export default async function AdminDashboardPage() {
  const stats = await getStats();

  const tiles = [
    { href: "/admin/news", label: "News Stories", value: stats.news, icon: Newspaper, code: "NEWS" },
    { href: "/admin/editor-picks", label: "Editor Picks", value: stats.editorPicks, icon: Star, code: "PICK" },
    { href: "/admin/sections", label: "Sections", value: stats.sections, icon: LayoutGrid, code: "SECT" },
    { href: "/admin/services", label: "Services", value: stats.services, icon: Briefcase, code: "SVCS" },
    { href: "/admin/subscribers", label: "Newsletter Subscribers", value: stats.subscribers, icon: Users, code: "SUBS" },
    { href: "/admin/contacts", label: "Contact Submissions", value: stats.contacts, icon: Mail, code: "MAIL" },
  ];

  return (
    <div className="space-y-6">
      <div className="bbg-header text-xs">
        <div>ADMIN <span style={{ color: "var(--bbg-amber)" }}>Console</span> - Dashboard</div>
        <div>OVERVIEW</div>
      </div>

      <div>
        <h1 className="text-2xl font-bold uppercase tracking-widest text-white">Dashboard</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Manage news, sections, services, subscribers, and contact submissions.
        </p>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {tiles.map((t) => {
          const Icon = t.icon;
          return (
            <Link
              key={t.href}
              href={t.href}
              className="border border-border bg-card p-4 transition-colors hover:border-primary"
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] uppercase tracking-widest text-muted-foreground">
                  [{t.code}]
                </span>
                <Icon className="h-4 w-4 text-primary" />
              </div>
              <p className="mt-3 font-mono text-3xl font-bold text-white">{t.value}</p>
              <p className="mt-1 text-xs uppercase tracking-widest text-muted-foreground">
                {t.label}
              </p>
            </Link>
          );
        })}
      </div>

      <div className="grid gap-3 lg:grid-cols-[1fr_360px]">
        <div className="border border-border bg-card p-4">
          <p className="text-[10px] uppercase tracking-widest text-muted-foreground">Quick Actions</p>
          <div className="mt-3 flex flex-wrap gap-2">
            <Link href="/admin/news" className="border border-primary px-3 py-2 text-xs uppercase tracking-widest text-primary hover:bg-primary hover:text-primary-foreground">
              + New Story
            </Link>
            <Link href="/admin/sections" className="border border-border px-3 py-2 text-xs uppercase tracking-widest text-foreground hover:border-primary hover:text-primary">
              + New Section
            </Link>
            <Link href="/admin/services" className="border border-border px-3 py-2 text-xs uppercase tracking-widest text-foreground hover:border-primary hover:text-primary">
              + New Service
            </Link>
          </div>
        </div>

        <div className="border border-primary/40 bg-card p-4">
          <div className="flex items-center justify-between">
            <p className="text-[10px] uppercase tracking-widest text-muted-foreground">
              Publish to Production
            </p>
            <Rocket className="h-4 w-4 text-primary" />
          </div>
          <p className="mt-2 text-xs leading-relaxed text-foreground">
            Trigger a fresh production build and deploy the live site at
            capitalissuesiq.xyz with all your latest content changes.
          </p>
          <div className="mt-3">
            <PublishButton />
          </div>
        </div>
      </div>

    </div>
  );
}
