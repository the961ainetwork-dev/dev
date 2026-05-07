import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { services } from "@/lib/services";
import { AskAi } from "@/components/ask-ai";

export function ServicesGrid() {
  return (
    <section className="bg-card py-16">
      <div className="mx-auto max-w-7xl px-4">
        {/* Section Header */}
        <div className="mb-8 border border-border">
          <div className="border-b border-border bg-secondary/50 px-4 py-2">
            <span className="text-[10px] font-semibold uppercase tracking-widest text-primary">
              Platform Services
            </span>
          </div>
          <div className="p-4">
            <h2 className="text-xl font-bold text-foreground sm:text-2xl">
              INTELLIGENCE MODULES
            </h2>
            <p className="mt-1 text-xs text-muted-foreground">
              Comprehensive financial intelligence tools for institutional-grade decision making.
            </p>
          </div>
        </div>

        {/* Ask AI - natural language entry into the modules */}
        <AskAi />

        {/* Services Grid */}
        <div className="grid gap-px bg-border sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service, index) => (
            <Link
              key={service.id}
              href={service.href}
              className="group relative bg-card p-4 transition-colors hover:bg-secondary"
            >
              {/* Index Number */}
              <div className="absolute right-4 top-4 text-2xl font-bold tabular-nums text-border">
                {String(index + 1).padStart(2, "0")}
              </div>

              {/* Icon */}
              <div className="mb-4 inline-flex h-10 w-10 items-center justify-center border border-primary/50 bg-primary/10">
                <service.icon className="h-5 w-5 text-primary" />
              </div>

              {/* Content */}
              <h3 className="text-sm font-bold uppercase tracking-wide text-foreground">
                {service.shortName}
              </h3>
              <p className="mt-1 text-[10px] font-medium uppercase tracking-wide text-[#58a6ff]">
                {service.tagline}
              </p>
              <p className="mt-3 text-xs leading-relaxed text-muted-foreground line-clamp-3">
                {service.description}
              </p>

              {/* Arrow */}
              <div className="mt-4 flex items-center text-xs font-medium uppercase tracking-wide text-primary opacity-0 transition-opacity group-hover:opacity-100">
                Access Module
                <ArrowRight className="ml-1 h-3 w-3" />
              </div>

              {/* Bottom border indicator */}
              <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-primary transition-all group-hover:w-full" />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
