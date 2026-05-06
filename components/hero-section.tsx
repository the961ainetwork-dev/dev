import Link from "next/link";
import { ArrowRight, Play } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-background">
      {/* Background gradient */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-1/2 left-1/2 h-[800px] w-[800px] -translate-x-1/2 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute -bottom-1/2 right-0 h-[600px] w-[600px] rounded-full bg-accent/10 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8 lg:py-40">
        <div className="mx-auto max-w-3xl text-center">
          {/* Badge */}
          <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5">
            <span className="h-2 w-2 rounded-full bg-primary animate-pulse" />
            <span className="text-sm font-medium text-primary">
              Announcing 961AI Network Integration
            </span>
            <ArrowRight className="h-4 w-4 text-primary" />
          </div>

          {/* Headline */}
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl text-balance">
            Financial Intelligence{" "}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Redefined
            </span>
          </h1>

          {/* Subheadline */}
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground text-pretty">
            Real-time market sentiment, exclusive news, and AI-powered research. 
            Get the edge that institutional investors rely on to move before the market.
          </p>

          {/* CTAs */}
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/signup"
              className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/25 transition-all hover:bg-primary/90 hover:shadow-xl hover:shadow-primary/30"
            >
              Request Access
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/demo"
              className="inline-flex items-center gap-2 rounded-lg border border-border bg-secondary px-6 py-3 text-sm font-semibold text-foreground transition-colors hover:bg-secondary/80"
            >
              <Play className="h-4 w-4" />
              Watch Demo
            </Link>
          </div>

          {/* Trust indicators */}
          <div className="mt-16">
            <p className="text-sm font-medium uppercase tracking-wider text-muted-foreground">
              Trusted by leading institutions
            </p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-x-8 gap-y-4">
              {["Goldman Sachs", "Morgan Stanley", "BlackRock", "Citadel", "Two Sigma"].map(
                (company) => (
                  <span
                    key={company}
                    className="text-lg font-semibold text-muted-foreground/50"
                  >
                    {company}
                  </span>
                )
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
