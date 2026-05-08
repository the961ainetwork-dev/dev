import type { Metadata } from "next";
import Link from "next/link";
import { Megaphone, Crown, Newspaper, Layers, Monitor, Sidebar as SidebarIcon, Sparkles, ArrowRight, Check, Mail } from "lucide-react";
import { LeadersGrid } from "@/components/advertise/leaders-grid";

export const metadata: Metadata = {
  title: "Advertise | Capital Issues IQ",
  description: "Reach executive decision-makers, family offices, and institutional investors across MENA. Premium advertising opportunities on the Capital Issues IQ intelligence terminal.",
};

const adFormats = [
  {
    icon: Crown,
    code: "LEAD",
    name: "Leader Cards",
    description: "Featured sponsor cards with logo, headline, and call-to-action displayed on the home page and section landings. Highest visibility placement.",
    impressions: "100K+ monthly",
    tier: "Platinum",
    features: ["Featured logo placement", "Custom CTA button", "Multi-screen rotation", "Priority sort order", "Performance analytics"],
  },
  {
    icon: Megaphone,
    code: "BANR",
    name: "Display Banners",
    description: "Standard banner ads placed across news terminal feeds, intelligence reports, and market indicator pages. High frequency placement.",
    impressions: "500K+ monthly",
    tier: "Premium",
    features: ["Above-fold positions", "Mobile + desktop responsive", "A/B variant testing", "Geographic targeting", "Click-through tracking"],
  },
  {
    icon: Newspaper,
    code: "SPON",
    name: "Sponsored Content",
    description: "Native sponsored articles, research notes, and thought leadership integrated directly into the news terminal stream with clear sponsor attribution.",
    impressions: "Targeted",
    tier: "Premium",
    features: ["Editorial-style format", "Sponsor byline & disclosure", "Pinned to relevant topics", "Cross-channel distribution", "Engagement metrics"],
  },
  {
    icon: Mail,
    code: "MAIL",
    name: "Newsletter Sponsorship",
    description: "Be the headline sponsor of our daily and weekly intelligence newsletters delivered to executives, family offices, and institutional readers.",
    impressions: "10K+ subscribers",
    tier: "Platinum",
    features: ["Top-of-newsletter placement", "Dedicated sponsor block", "Weekly or monthly cadence", "Subscriber demographics report", "Call-to-action embed"],
  },
  {
    icon: Monitor,
    code: "TAKE",
    name: "Terminal Takeover",
    description: "Exclusive full-screen takeover of the news terminal landing for a single day. Maximum exclusivity, no competing advertisers.",
    impressions: "Day-exclusive",
    tier: "Enterprise",
    features: ["Single-day exclusivity", "Custom-designed unit", "Full-screen interstitial", "Branded loading state", "Dedicated success report"],
  },
  {
    icon: SidebarIcon,
    code: "SIDE",
    name: "Sidebar Widgets",
    description: "Persistent sidebar placements across all platform screens. Perfect for sustained brand presence with passive engagement.",
    impressions: "Persistent",
    tier: "Standard",
    features: ["All-screen presence", "Compact widget format", "Logo + tagline", "Click-through link", "Monthly rotation"],
  },
];

const tiers = [
  {
    name: "Standard",
    code: "STD",
    audience: "Brands building presence",
    features: ["Sidebar widgets", "Display banners", "Up to 100K monthly impressions", "Self-serve dashboard", "Monthly performance report"],
  },
  {
    name: "Premium",
    code: "PRM",
    audience: "Established institutions",
    features: ["All Standard formats", "Sponsored content", "Up to 500K monthly impressions", "Dedicated account manager", "Bi-weekly analytics"],
    featured: true,
  },
  {
    name: "Platinum",
    code: "PLT",
    audience: "Market leaders",
    features: ["All Premium formats", "Leader Cards", "Newsletter sponsorship", "Unlimited impressions", "Real-time dashboard", "Custom creative production"],
  },
  {
    name: "Enterprise",
    code: "ENT",
    audience: "Strategic partners",
    features: ["All Platinum formats", "Terminal takeover days", "Co-branded research", "Multi-quarter campaigns", "Strategic advisory", "C-suite introductions"],
  },
];

export default function AdvertisePage() {
  return (
    <div className="min-h-screen bg-background pb-24">
      <div className="border-b border-border bg-card">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-2 px-4 py-2 text-[10px] uppercase tracking-widest text-muted-foreground">
          <span>ADV.001 | ADVERTISE</span>
          <span className="hidden sm:inline">CAPITAL ISSUES IQ // SPONSORSHIP DESK</span>
          <span className="text-primary">EXECUTIVE REACH</span>
        </div>
      </div>

      <section className="border-b border-border bg-background">
        <div className="mx-auto max-w-7xl px-4 pt-16 pb-20 lg:pt-24 lg:pb-28">
          <div className="inline-flex items-center gap-2 border border-primary/40 bg-primary/5 px-3 py-1 text-[10px] uppercase tracking-widest text-primary">
            <Sparkles className="h-3 w-3" />
            Advertising opportunities
          </div>
          <h1 className="mt-5 max-w-4xl text-balance font-serif text-4xl leading-tight text-foreground md:text-5xl lg:text-6xl">
            Reach the executives shaping MENA capital markets.
          </h1>
          <p className="mt-5 max-w-2xl text-pretty text-base leading-relaxed text-muted-foreground md:text-lg">
            Capital Issues IQ is the intelligence terminal trusted by family offices,
            institutional investors, banking executives, and policy advisors across
            Lebanon, the GCC, and the wider Arab world. Our placements deliver
            qualified attention &mdash; not impressions.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/contact" className="inline-flex items-center gap-2 border border-primary bg-primary px-5 py-3 text-xs uppercase tracking-widest text-primary-foreground hover:bg-primary/90">
              Request media kit
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
            <a href="#formats" className="inline-flex items-center gap-2 border border-border px-5 py-3 text-xs uppercase tracking-widest text-foreground hover:border-primary hover:text-primary">
              Browse formats
            </a>
          </div>

          <div className="mt-12 grid gap-3 border-t border-border pt-8 md:grid-cols-4">
            <div>
              <p className="text-[10px] uppercase tracking-widest text-muted-foreground">Monthly visitors</p>
              <p className="mt-1 font-mono text-2xl text-foreground">120K+</p>
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-widest text-muted-foreground">Newsletter subs</p>
              <p className="mt-1 font-mono text-2xl text-foreground">10K+</p>
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-widest text-muted-foreground">Avg. session time</p>
              <p className="mt-1 font-mono text-2xl text-foreground">7m 32s</p>
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-widest text-muted-foreground">Decision-maker share</p>
              <p className="mt-1 font-mono text-2xl text-foreground">68%</p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-border bg-card">
        <div className="mx-auto max-w-7xl px-4 py-20 lg:py-24">
          <div className="flex flex-wrap items-end justify-between gap-4 border-b border-border pb-6">
            <div>
              <p className="text-[10px] uppercase tracking-widest text-primary">CURRENT SPONSORS // LEAD.001</p>
              <h2 className="mt-2 font-serif text-3xl text-foreground md:text-4xl">Strategic Leaders</h2>
              <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
                Active leader card sponsors featured across the Capital Issues IQ
                intelligence terminal.
              </p>
            </div>
            <Link href="/contact" className="text-xs uppercase tracking-widest text-primary hover:underline">
              Become a leader &rarr;
            </Link>
          </div>
          <LeadersGrid />
        </div>
      </section>

      <section id="formats" className="border-b border-border bg-background">
        <div className="mx-auto max-w-7xl px-4 py-20 lg:py-24">
          <div className="border-b border-border pb-6">
            <p className="text-[10px] uppercase tracking-widest text-primary">FORMATS // FMT.001</p>
            <h2 className="mt-2 font-serif text-3xl text-foreground md:text-4xl">
              Six placement formats. One intelligence audience.
            </h2>
            <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
              From subtle sidebar widgets to full-day terminal takeovers, every
              format is designed to integrate naturally with the platform&apos;s
              editorial aesthetic.
            </p>
          </div>

          <div className="mt-8 grid gap-px border-l border-t border-border bg-border md:grid-cols-2 lg:grid-cols-3">
            {adFormats.map((f) => (
              <article key={f.code} className="border-b border-r border-border bg-card p-6">
                <div className="flex items-start justify-between">
                  <div className="flex h-10 w-10 items-center justify-center border border-primary/40 bg-primary/5">
                    <f.icon className="h-5 w-5 text-primary" />
                  </div>
                  <span className="text-[10px] uppercase tracking-widest text-muted-foreground">
                    {f.code}
                  </span>
                </div>
                <div className="mt-4 flex items-center gap-2">
                  <span className="text-[10px] uppercase tracking-widest text-primary">
                    {f.tier}
                  </span>
                  <span className="text-[10px] text-muted-foreground">|</span>
                  <span className="text-[10px] uppercase tracking-widest text-muted-foreground">
                    {f.impressions}
                  </span>
                </div>
                <h3 className="mt-2 font-serif text-xl text-foreground">{f.name}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{f.description}</p>
                <ul className="mt-4 space-y-1.5">
                  {f.features.map((feat) => (
                    <li key={feat} className="flex items-start gap-2 text-xs text-foreground">
                      <Check className="mt-0.5 h-3 w-3 flex-shrink-0 text-primary" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-border bg-card">
        <div className="mx-auto max-w-7xl px-4 py-20 lg:py-24">
          <div className="border-b border-border pb-6">
            <p className="text-[10px] uppercase tracking-widest text-primary">TIERS // TIER.001</p>
            <h2 className="mt-2 font-serif text-3xl text-foreground md:text-4xl">
              Sponsorship tiers
            </h2>
          </div>

          <div className="mt-8 grid gap-px border-l border-t border-border bg-border md:grid-cols-2 lg:grid-cols-4">
            {tiers.map((t) => (
              <article
                key={t.code}
                className={`relative border-b border-r border-border bg-card p-6 ${t.featured ? "ring-1 ring-primary" : ""}`}
              >
                {t.featured && (
                  <span className="absolute right-3 top-3 border border-primary bg-primary/10 px-2 py-0.5 text-[9px] uppercase tracking-widest text-primary">
                    Most Common
                  </span>
                )}
                <span className="text-[10px] uppercase tracking-widest text-muted-foreground">{t.code}</span>
                <h3 className="mt-1 font-serif text-2xl text-foreground">{t.name}</h3>
                <p className="mt-1 text-xs uppercase tracking-widest text-muted-foreground">{t.audience}</p>
                <ul className="mt-5 space-y-2">
                  {t.features.map((feat) => (
                    <li key={feat} className="flex items-start gap-2 text-xs text-foreground">
                      <Check className="mt-0.5 h-3 w-3 flex-shrink-0 text-primary" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-background">
        <div className="mx-auto max-w-7xl px-4 py-20 lg:py-24">
          <div className="border border-primary/30 bg-card p-8 md:p-12">
            <div className="grid gap-8 md:grid-cols-[1.5fr_1fr] md:items-center">
              <div>
                <div className="inline-flex items-center gap-2 border border-primary/40 bg-primary/5 px-3 py-1 text-[10px] uppercase tracking-widest text-primary">
                  <Layers className="h-3 w-3" />
                  Custom campaigns
                </div>
                <h2 className="mt-4 font-serif text-3xl text-foreground md:text-4xl">
                  Build a campaign that fits your brand.
                </h2>
                <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground">
                  Tell us about your goals and audience. Our team will design a
                  custom placement plan combining the formats above &mdash; or build
                  something entirely new for your campaign.
                </p>
              </div>
              <div className="flex flex-col gap-3">
                <Link href="/contact" className="inline-flex items-center justify-center gap-2 border border-primary bg-primary px-5 py-3 text-xs uppercase tracking-widest text-primary-foreground hover:bg-primary/90">
                  Talk to sponsorship
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
                <a href="mailto:partners@capitalissuesiq.xyz" className="inline-flex items-center justify-center gap-2 border border-border bg-background px-5 py-3 text-xs uppercase tracking-widest text-foreground hover:border-primary hover:text-primary">
                  partners@capitalissuesiq.xyz
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
