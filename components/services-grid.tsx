import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { services } from "@/lib/services";
import { cn } from "@/lib/utils";

export function ServicesGrid() {
  return (
    <section className="bg-background py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Our Services
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
            Comprehensive financial intelligence tools designed for institutional-grade decision making.
          </p>
        </div>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service) => (
            <Link
              key={service.id}
              href={service.href}
              className="group relative overflow-hidden rounded-2xl border border-border bg-card p-6 transition-all hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5"
            >
              {/* Gradient background on hover */}
              <div
                className={cn(
                  "absolute inset-0 opacity-0 transition-opacity group-hover:opacity-5 bg-gradient-to-br",
                  service.gradient
                )}
              />

              <div className="relative">
                {/* Icon */}
                <div
                  className={cn(
                    "mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br",
                    service.gradient
                  )}
                >
                  <service.icon className="h-6 w-6 text-white" />
                </div>

                {/* Content */}
                <h3 className="text-lg font-semibold text-foreground">
                  {service.shortName}
                </h3>
                <p className="mt-1 text-sm font-medium text-primary">
                  {service.tagline}
                </p>
                <p className="mt-3 text-sm text-muted-foreground line-clamp-3">
                  {service.description}
                </p>

                {/* Arrow */}
                <div className="mt-4 flex items-center text-sm font-medium text-primary">
                  Learn more
                  <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
