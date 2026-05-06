import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ArrowRight, CheckCircle } from "lucide-react";
import { services } from "@/lib/services";
import { cn } from "@/lib/utils";

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
    return { title: "Service Not Found" };
  }

  return {
    title: `${service.name} | Capital Issues`,
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
      <section className="relative overflow-hidden border-b border-border">
        <div
          className={cn(
            "absolute inset-0 opacity-10 bg-gradient-to-br",
            service.gradient
          )}
        />
        <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
          <Link
            href="/#services"
            className="mb-8 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Services
          </Link>

          <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:gap-16">
            <div className="flex-1">
              <div
                className={cn(
                  "mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br",
                  service.gradient
                )}
              >
                <service.icon className="h-8 w-8 text-white" />
              </div>

              <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
                {service.name}
              </h1>
              <p className="mt-2 text-xl font-medium text-primary">
                {service.tagline}
              </p>
              <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
                {service.description}
              </p>

              <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                <Link
                  href="/signup"
                  className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
                >
                  Get Started
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 rounded-lg border border-border px-6 py-3 text-sm font-semibold text-foreground transition-colors hover:bg-secondary"
                >
                  Contact Sales
                </Link>
              </div>
            </div>

            <div className="flex-1">
              <div
                className={cn(
                  "relative aspect-video overflow-hidden rounded-2xl bg-gradient-to-br p-px",
                  service.gradient
                )}
              >
                <div className="absolute inset-px rounded-2xl bg-card">
                  <div className="flex h-full flex-col items-center justify-center p-8">
                    <service.icon className="h-20 w-20 text-muted-foreground/20" />
                    <p className="mt-4 text-center text-muted-foreground">
                      {service.shortName} Dashboard
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-foreground sm:text-3xl">
            Key Features
          </h2>
          <p className="mt-2 text-muted-foreground">
            Everything you need for comprehensive {service.shortName.toLowerCase()} analysis.
          </p>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {service.features.map((feature, index) => (
              <div
                key={feature}
                className="rounded-xl border border-border bg-card p-6"
              >
                <div
                  className={cn(
                    "mb-4 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br text-lg font-bold text-white",
                    service.gradient
                  )}
                >
                  {index + 1}
                </div>
                <h3 className="text-lg font-semibold text-foreground">
                  {feature}
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Leverage our advanced {feature.toLowerCase()} capabilities to gain deeper insights and make better decisions.
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="bg-card py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-2xl font-bold text-foreground sm:text-3xl">
              Why Choose {service.shortName}?
            </h2>
            <p className="mt-4 text-muted-foreground">
              Institutional-grade tools designed for modern financial professionals.
            </p>
          </div>

          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {[
              "Real-time data updates",
              "AI-powered insights",
              "Customizable dashboards",
              "API access available",
              "Enterprise security",
              "24/7 support",
            ].map((benefit) => (
              <div key={benefit} className="flex items-start gap-3">
                <CheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
                <span className="text-foreground">{benefit}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Navigation */}
      <section className="border-t border-border py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {prevService ? (
              <Link
                href={prevService.href}
                className="group flex items-center gap-3"
              >
                <ArrowLeft className="h-5 w-5 text-muted-foreground transition-transform group-hover:-translate-x-1" />
                <div>
                  <p className="text-sm text-muted-foreground">Previous</p>
                  <p className="font-medium text-foreground">
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
                className="group flex items-center gap-3 text-right"
              >
                <div>
                  <p className="text-sm text-muted-foreground">Next</p>
                  <p className="font-medium text-foreground">
                    {nextService.shortName}
                  </p>
                </div>
                <ArrowRight className="h-5 w-5 text-muted-foreground transition-transform group-hover:translate-x-1" />
              </Link>
            ) : (
              <div />
            )}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-muted py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-2xl font-bold text-foreground sm:text-3xl">
              Ready to Get Started?
            </h2>
            <p className="mt-4 text-muted-foreground">
              Join leading institutions using {service.shortName} to gain a competitive edge.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link
                href="/signup"
                className="inline-flex items-center gap-2 rounded-lg bg-primary px-8 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
              >
                Request Access
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/demo"
                className="inline-flex items-center gap-2 rounded-lg border border-border px-8 py-3 text-sm font-semibold text-foreground transition-colors hover:bg-secondary"
              >
                Schedule a Demo
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
