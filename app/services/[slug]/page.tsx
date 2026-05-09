import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ArrowRight, CheckCircle, Terminal, Activity } from "lucide-react";
import { services } from "@/lib/services";

interface ServicePageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return services.map((service) => ({
    slug: service.id,
  }));
}

export async function generateMetadata({ params }: ServicePageProps) {
  const { slug } = await params;
  const service = services.find((s) => s.id === slug);

  if (!service) {
    return { title: "Module Not Found | CAPITALISSUES" };
  }

  return {
    title: `${service.shortName} | CAPITALISSUES Terminal`,
    description: service.description,
  };
}

export default async function ServicePage({ params }: ServicePageProps) {
  const { slug } = await params;
  const service = services.find((s) => s.id === slug);

  if (!service) {
    notFound();
  }

  const currentIndex = services.findIndex((s) => s.id === slug);
  const prevService = currentIndex > 0 ? services[currentIndex - 1] : null;
  const nextService =
    currentIndex < services.length - 1 ? services[currentIndex + 1] : null;

  return (
    <div className="bg-background">
      {/* Hero */}
      <section className="border-b border-border">
        <div className="mx-auto max-w-7xl px-4 py-12">
          {/* Breadcrumb */}
          <Link
            href="/#services"
            className="mb-6 inline-flex items-center gap-2 text-xs uppercase tracking-wide text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="h-3 w-3" />
            Back to Modules
          </Link>

          {/* Module Header Panel */}
          <div className="border border-border bg-card">
            <div className="flex items-center justify-between border-b border-border bg-secondary/50 px-4 py-2">
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center border border-primary/50 bg-primary/10">
                  <service.icon className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold tabular-nums text-muted-foreground">
                      MODULE {String(currentIndex + 1).padStart(2, "0")}
                    </span>
                    <span className="text-xs text-border">|</span>
                    <span className="text-sm font-bold uppercase tracking-wide text-foreground">
                      {service.shortName}
                    </span>
                  </div>
                  <p className="text-[10px] uppercase tracking-wide text-[#58a6ff]">
                    {service.tagline}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Activity className="h-3 w-3 text-[#3fb950]" />
                <span className="text-[10px] font-medium uppercase tracking-wide text-[#3fb950]">
                  Active
                </span>
              </div>
            </div>

            <div className="grid gap-6 p-6 lg:grid-cols-2">
              {/* Left - Description */}
              <div className="space-y-4">
                <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                  {service.name}
                </h1>
                <p className="text-xs leading-relaxed text-muted-foreground">
                  {service.description}
                </p>

                <div className="flex flex-col gap-3 sm:flex-row">
                  <Link
                    href="/signup"
                    className="inline-flex items-center justify-center gap-2 border border-primary bg-primary px-5 py-2.5 text-xs font-bold uppercase tracking-wide text-primary-foreground transition-colors hover:bg-primary/90"
                  >
                    Access Module
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                  <Link
                    href="/contact"
                    className="inline-flex items-center justify-center gap-2 border border-border px-5 py-2.5 text-xs font-medium uppercase tracking-wide text-foreground transition-colors hover:bg-secondary"
                  >
                    Contact Sales
                  </Link>
                </div>
              </div>

              {/* Right - Terminal Preview */}
              <div className="border border-border bg-background">
                <div className="flex items-center gap-2 border-b border-border bg-secondary/30 px-3 py-1.5">
                  <Terminal className="h-3 w-3 text-muted-foreground" />
                  <span className="text-[10px] font-medium uppercase tracking-widest text-muted-foreground">
                    {service.shortName} Terminal
                  </span>
                </div>
                <div className="p-3">
                  <div className="space-y-1.5 text-xs">
                    <div className="text-[#3fb950]">
                      <span className="text-primary">&gt;</span> Initializing {service.shortName.toLowerCase().replace(/\s/g, "_")}...
                    </div>
                    <div className="text-muted-foreground">
                      <span className="text-primary">&gt;</span> Loading {service.features.length} data modules...
                    </div>
                    <div className="text-muted-foreground">
                      <span className="text-primary">&gt;</span> Connecting to real-time feeds...
                    </div>
                    <div className="text-[#3fb950]">
                      <span className="text-primary">&gt;</span> Status: READY
                    </div>
                    <div className="mt-2 flex items-center gap-2">
                      <span className="text-primary">$</span>
                      <span className="cursor-blink text-foreground">_</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="bg-card py-12">
        <div className="mx-auto max-w-7xl px-4">
          <div className="mb-6 border border-border">
            <div className="border-b border-border bg-secondary/50 px-4 py-2">
              <span className="text-[10px] font-semibold uppercase tracking-widest text-primary">
                Module Capabilities
              </span>
            </div>
            <div className="p-4">
              <h2 className="text-lg font-bold text-foreground">
                KEY FEATURES
              </h2>
              <p className="mt-1 text-xs text-muted-foreground">
                Comprehensive {service.shortName.toLowerCase()} tools for institutional-grade analysis.
              </p>
            </div>
          </div>

          <div className="grid gap-px bg-border sm:grid-cols-2 lg:grid-cols-3">
            {service.features.map((feature, index) => (
              <div
                key={feature}
                className="bg-card p-4"
              >
                <div className="mb-3 flex items-center gap-2">
                  <span className="flex h-6 w-6 items-center justify-center border border-primary/50 bg-primary/10 text-xs font-bold tabular-nums text-primary">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3 className="text-xs font-bold uppercase tracking-wide text-foreground">
                    {feature}
                  </h3>
                </div>
                <p className="text-xs text-muted-foreground">
                  Advanced {feature.toLowerCase()} capabilities delivering actionable insights.
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="bg-background py-12">
        <div className="mx-auto max-w-7xl px-4">
          <div className="mb-6 border border-border">
            <div className="border-b border-border bg-secondary/50 px-4 py-2">
              <span className="text-[10px] font-semibold uppercase tracking-widest text-primary">
                Platform Benefits
              </span>
            </div>
            <div className="p-4">
              <h2 className="text-lg font-bold text-foreground">
                WHY {service.shortName.toUpperCase()}?
              </h2>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { label: "Real-time Data", value: "<50ms", color: "text-[#3fb950]" },
              { label: "AI-Powered Insights", value: "24/7", color: "text-[#58a6ff]" },
              { label: "Custom Dashboards", value: "Unlimited", color: "text-primary" },
              { label: "API Access", value: "RESTful", color: "text-[#d29922]" },
              { label: "Enterprise Security", value: "SOC2", color: "text-[#3fb950]" },
              { label: "Support", value: "24/7", color: "text-[#58a6ff]" },
            ].map((benefit) => (
              <div key={benefit.label} className="flex items-center justify-between border border-border bg-card p-3">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-3.5 w-3.5 text-[#3fb950]" />
                  <span className="text-xs text-foreground">{benefit.label}</span>
                </div>
                <span className={`text-xs font-bold tabular-nums ${benefit.color}`}>
                  {benefit.value}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Navigation */}
      <section className="border-t border-border bg-card py-6">
        <div className="mx-auto max-w-7xl px-4">
          <div className="flex items-center justify-between">
            {prevService ? (
              <Link
                href={prevService.href}
                className="group flex items-center gap-3 border border-border bg-background px-4 py-2 transition-colors hover:border-primary/50"
              >
                <ArrowLeft className="h-4 w-4 text-muted-foreground transition-transform group-hover:-translate-x-1" />
                <div>
                  <p className="text-[10px] uppercase tracking-wide text-muted-foreground">Previous Module</p>
                  <p className="text-xs font-bold text-foreground">
                    {prevService.shortName}
                  </p>
                </div>
              </Link>
            ) : (
              <div />
            )}

            {nextService ? (
              <Link
                href={nextService.href}
                className="group flex items-center gap-3 border border-border bg-background px-4 py-2 text-right transition-colors hover:border-primary/50"
              >
                <div>
                  <p className="text-[10px] uppercase tracking-wide text-muted-foreground">Next Module</p>
                  <p className="text-xs font-bold text-foreground">
                    {nextService.shortName}
                  </p>
                </div>
                <ArrowRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-1" />
              </Link>
            ) : (
              <div />
            )}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-background py-12">
        <div className="mx-auto max-w-7xl px-4">
          <div className="border border-primary bg-card">
            <div className="border-b border-primary bg-primary/10 px-4 py-2">
              <span className="text-[10px] font-semibold uppercase tracking-widest text-primary">
                Access Request
              </span>
            </div>
            <div className="p-6 text-center">
              <h2 className="text-xl font-bold text-foreground">
                READY TO ACCESS {service.shortName.toUpperCase()}?
              </h2>
              <p className="mx-auto mt-2 max-w-lg text-xs text-muted-foreground">
                Join leading institutions using {service.shortName} for competitive advantage in financial markets.
              </p>
              <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <Link
                  href="/signup"
                  className="inline-flex items-center gap-2 border border-primary bg-primary px-6 py-2.5 text-xs font-bold uppercase tracking-wide text-primary-foreground transition-colors hover:bg-primary/90"
                >
                  Request Access
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
                <Link
                  href="/demo"
                  className="inline-flex items-center gap-2 border border-border px-6 py-2.5 text-xs font-medium uppercase tracking-wide text-foreground transition-colors hover:bg-secondary"
                >
                  Schedule Demo
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
