import Link from "next/link";
import { ArrowRight, CheckCircle, Terminal } from "lucide-react";
import { services } from "@/lib/services";

export function ServiceBanners() {
  return (
    <section className="bg-card py-16">
      <div className="mx-auto max-w-7xl px-4">
        {/* Section Header */}
        <div className="mb-8 border border-border">
          <div className="border-b border-border bg-secondary/50 px-4 py-2">
            <span className="text-[10px] font-semibold uppercase tracking-widest text-primary">
              Module Details
            </span>
          </div>
          <div className="p-4">
            <h2 className="text-xl font-bold text-foreground sm:text-2xl">
              PLATFORM CAPABILITIES
            </h2>
            <p className="mt-1 text-xs text-muted-foreground">
              Deep dive into each of our specialized intelligence services.
            </p>
          </div>
        </div>

        {/* Service Details */}
        <div className="space-y-6">
          {services.map((service, index) => (
            <div
              key={service.id}
              className="border border-border bg-background transition-colors hover:border-primary/30"
            >
              {/* Service Header */}
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border bg-secondary/30 px-4 py-3">
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center border border-primary/50 bg-primary/10">
                    <service.icon className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold tabular-nums text-muted-foreground">
                        MODULE {String(index + 1).padStart(2, "0")}
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
                <Link
                  href={service.href}
                  className="flex items-center gap-1 border border-primary bg-primary px-3 py-1.5 text-[10px] font-bold uppercase tracking-wide text-primary-foreground transition-colors hover:bg-primary/90"
                >
                  Access Module
                  <ArrowRight className="h-3 w-3" />
                </Link>
              </div>

              {/* Service Content */}
              <div className="grid gap-6 p-4 lg:grid-cols-2">
                {/* Description */}
                <div>
                  <p className="text-xs leading-relaxed text-muted-foreground">
                    {service.description}
                  </p>
                  
                  {/* Features List */}
                  <div className="mt-4 space-y-2">
                    {service.features.slice(0, 4).map((feature) => (
                      <div key={feature} className="flex items-start gap-2">
                        <CheckCircle className="mt-0.5 h-3 w-3 flex-shrink-0 text-[#3fb950]" />
                        <span className="text-xs text-foreground">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Terminal Preview */}
                <div className="border border-border bg-card">
                  <div className="flex items-center gap-2 border-b border-border bg-background px-3 py-1.5">
                    <Terminal className="h-3 w-3 text-muted-foreground" />
                    <span className="text-[10px] font-medium uppercase tracking-widest text-muted-foreground">
                      {service.shortName} Preview
                    </span>
                  </div>
                  <div className="p-3">
                    <div className="space-y-1.5 text-xs">
                      <div className="text-[#3fb950]">
                        <span className="text-primary">&gt;</span> Loading {service.shortName.toLowerCase().replace(/\s/g, "_")}_module...
                      </div>
                      <div className="text-muted-foreground">
                        <span className="text-primary">&gt;</span> Initializing data streams...
                      </div>
                      <div className="text-muted-foreground">
                        <span className="text-primary">&gt;</span> Connecting to {service.features.length} data sources...
                      </div>
                      <div className="text-[#3fb950]">
                        <span className="text-primary">&gt;</span> Module ready. Status: ACTIVE
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
          ))}
        </div>
      </div>
    </section>
  );
}
