import { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Users, Globe, Shield, Zap } from "lucide-react";

export const metadata: Metadata = {
  title: "About | Capital Issues",
  description: "Learn about Capital Issues and our mission to provide institutional-grade financial intelligence.",
};

const stats = [
  { label: "Research Analysts", value: "350+" },
  { label: "Markets Covered", value: "150+" },
  { label: "Institutional Clients", value: "2,500+" },
  { label: "Data Points Daily", value: "10M+" },
];

const values = [
  {
    icon: Users,
    title: "Client-First",
    description: "Every feature we build starts with understanding our clients' needs.",
  },
  {
    icon: Globe,
    title: "Global Perspective",
    description: "Coverage across every major market and region worldwide.",
  },
  {
    icon: Shield,
    title: "Trust & Accuracy",
    description: "Verified intelligence you can rely on for critical decisions.",
  },
  {
    icon: Zap,
    title: "Speed & Innovation",
    description: "Cutting-edge AI technology delivering insights in real-time.",
  },
];

export default function AboutPage() {
  return (
    <div className="bg-background">
      {/* Hero */}
      <section className="border-b border-border py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
              About Capital Issues
            </h1>
            <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
              We are building the next generation of financial intelligence, 
              combining AI-powered analysis with expert human insight to give 
              institutional investors the edge they need.
            </p>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-card py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-4xl font-bold text-primary">{stat.value}</p>
                <p className="mt-2 text-sm text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-16 lg:grid-cols-2 lg:items-center">
            <div>
              <h2 className="text-3xl font-bold text-foreground sm:text-4xl">
                Our Mission
              </h2>
              <p className="mt-6 text-muted-foreground leading-relaxed">
                Capital Issues was founded with a simple belief: financial 
                professionals deserve better tools. Traditional terminals show 
                you what happened. We show you what&apos;s about to happen.
              </p>
              <p className="mt-4 text-muted-foreground leading-relaxed">
                By combining real-time sentiment analysis, verified news 
                intelligence, and the expertise of over 350 independent 
                analysts, we provide the comprehensive view that modern 
                markets demand.
              </p>
              <p className="mt-4 text-muted-foreground leading-relaxed">
                Our integration with the 961AI Network represents the next 
                evolution: AI agents that don&apos;t just show data, but act on 
                your behalf with full transparency and control.
              </p>
            </div>
            <div className="relative aspect-square rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 p-8">
              <div className="flex h-full items-center justify-center rounded-xl border border-border bg-card">
                <div className="text-center">
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-primary">
                    <span className="text-2xl font-bold text-primary-foreground">CI</span>
                  </div>
                  <p className="mt-4 text-xl font-semibold text-foreground">Capital Issues</p>
                  <p className="text-sm text-muted-foreground">Since 2020</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-muted py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-foreground sm:text-4xl">
              Our Values
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
              The principles that guide everything we do.
            </p>
          </div>

          <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((value) => (
              <div
                key={value.title}
                className="rounded-2xl border border-border bg-card p-6"
              >
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                  <value.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground">
                  {value.title}
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold text-foreground">
              Join Us
            </h2>
            <p className="mt-4 text-muted-foreground">
              Be part of the future of financial intelligence.
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
                href="/contact"
                className="inline-flex items-center gap-2 rounded-lg border border-border px-8 py-3 text-sm font-semibold text-foreground transition-colors hover:bg-secondary"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
