import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Layers } from "lucide-react";
import { ServiceBanners } from "@/components/service-banners";

export const metadata: Metadata = {
  title: "Platform Capabilities | CapitalIssuesIQ",
  description:
    "Deep dive into each of CapitalIssuesIQ's specialized intelligence modules: news, sentiment, research, economics, energy, portfolio analytics, risk, and publications.",
};

export default function PlatformCapabilitiesPage() {
  return (
    <>
      {/* Page Header */}
      <section className="border-b border-border bg-card">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 md:py-20 lg:px-8">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-primary">
            <Layers className="h-4 w-4" />
            <span>Platform Overview</span>
            <span className="text-border">|</span>
            <span className="font-mono text-muted-foreground">PLATFORM_CAPABILITIES.MD</span>
          </div>

          <h1 className="mt-6 text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
            <span className="text-primary">PLATFORM</span>{" "}
            <span className="text-foreground">CAPABILITIES</span>
          </h1>

          <p className="mt-6 max-w-3xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            Eight specialized intelligence modules engineered for institutional traders, asset managers, and corporate strategists. Each module operates independently or as part of an integrated workflow, delivering verified data, original research, and actionable signals across global markets.
          </p>

          {/* Key Stats */}
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div className="border border-border bg-background p-4">
              <div className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
                Modules
              </div>
              <div className="mt-2 text-2xl font-bold tabular-nums text-primary">08</div>
              <p className="mt-1 text-xs text-muted-foreground">Active intelligence services</p>
            </div>
            <div className="border border-border bg-background p-4">
              <div className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
                Data Sources
              </div>
              <div className="mt-2 text-2xl font-bold tabular-nums text-primary">2,400+</div>
              <p className="mt-1 text-xs text-muted-foreground">Verified feeds &amp; partners</p>
            </div>
            <div className="border border-border bg-background p-4">
              <div className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
                Coverage
              </div>
              <div className="mt-2 text-2xl font-bold tabular-nums text-primary">120</div>
              <p className="mt-1 text-xs text-muted-foreground">Markets &amp; jurisdictions</p>
            </div>
            <div className="border border-border bg-background p-4">
              <div className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
                Uptime
              </div>
              <div className="mt-2 text-2xl font-bold tabular-nums text-[#3fb950]">99.98%</div>
              <p className="mt-1 text-xs text-muted-foreground">Last 12 months SLA</p>
            </div>
          </div>
        </div>
      </section>

      {/* Module Detail Banners (reused) */}
      <ServiceBanners />

      {/* CTA */}
      <section className="border-t border-border bg-background py-16">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            Ready to deploy CapitalIssuesIQ?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
            Book a guided walkthrough or start a free trial of any module. Our solutions team will tailor the deployment to your trading desk, research workflow, or risk function.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/get-started"
              className="inline-flex items-center gap-2 border border-primary bg-primary px-5 py-2.5 text-xs font-bold uppercase tracking-widest text-primary-foreground transition-colors hover:bg-primary/90"
            >
              Get Started
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
            <Link
              href="/subscriptions"
              className="inline-flex items-center gap-2 border border-border bg-card px-5 py-2.5 text-xs font-bold uppercase tracking-widest text-foreground transition-colors hover:border-primary hover:text-primary"
            >
              View Subscriptions
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 border border-border bg-card px-5 py-2.5 text-xs font-bold uppercase tracking-widest text-foreground transition-colors hover:border-primary hover:text-primary"
            >
              Talk to Sales
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
