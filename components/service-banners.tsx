import Link from "next/link";
import { ArrowRight, CheckCircle } from "lucide-react";
import { services } from "@/lib/services";
import { cn } from "@/lib/utils";

export function ServiceBanners() {
  return (
    <section className="bg-card py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Platform Capabilities
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
            Deep dive into each of our specialized intelligence services.
          </p>
        </div>

        <div className="mt-16 space-y-16">
          {services.map((service, index) => (
            <div
              key={service.id}
              className={cn(
                "flex flex-col gap-8 lg:flex-row lg:items-center lg:gap-16",
                index % 2 === 1 && "lg:flex-row-reverse"
              )}
            >
              {/* Content */}
              <div className="flex-1 space-y-6">
                <div
                  className={cn(
                    "inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br",
                    service.gradient
                  )}
                >
                  <service.icon className="h-7 w-7 text-white" />
                </div>

                <div>
                  <h3 className="text-2xl font-bold text-foreground sm:text-3xl">
                    {service.name}
                  </h3>
                  <p className="mt-1 text-lg font-medium text-primary">
                    {service.tagline}
                  </p>
                </div>

                <p className="text-muted-foreground leading-relaxed">
                  {service.description}
                </p>

                <ul className="grid gap-3 sm:grid-cols-2">
                  {service.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 flex-shrink-0 text-primary" />
                      <span className="text-sm text-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Link
                  href={service.href}
                  className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline"
                >
                  Explore {service.shortName}
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>

              {/* Visual */}
              <div className="flex-1">
                <div
                  className={cn(
                    "relative aspect-[4/3] overflow-hidden rounded-2xl bg-gradient-to-br p-px",
                    service.gradient
                  )}
                >
                  <div className="absolute inset-px rounded-2xl bg-background">
                    <div className="flex h-full flex-col items-center justify-center p-8">
                      <service.icon className="h-16 w-16 text-muted-foreground/30" />
                      <p className="mt-4 text-center text-sm text-muted-foreground">
                        {service.shortName} Dashboard Preview
                      </p>
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
