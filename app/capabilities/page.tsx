import { ServicesGrid } from "@/components/services-grid";
import { FeaturesSection } from "@/components/features-section";

export const metadata = {
  title: "Capabilities | Capital Issues IQ",
  description:
    "Platform Services and Competitive Advantages — the full intelligence module suite and the edge that sets Capital Issues apart from traditional financial terminals.",
};

export default function CapabilitiesPage() {
  return (
    <main className="bg-background">
      {/* Page header */}
      <section className="border-b border-border bg-card">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:py-16">
          <div className="flex items-center gap-3 text-[10px] font-semibold uppercase tracking-widest text-primary">
            <span className="h-2 w-2 animate-pulse rounded-full bg-[#3fb950]" />
            <span>System / Capabilities</span>
          </div>
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
            CAPABILITIES
          </h1>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground">
            Explore the intelligence modules powering Capital Issues IQ and the
            competitive advantages that distinguish our terminal from traditional
            financial platforms.
          </p>
        </div>
      </section>

      {/* Platform Services / Intelligence Modules */}
      <ServicesGrid />

      {/* Competitive Advantages / The Edge */}
      <FeaturesSection />
    </main>
  );
}
