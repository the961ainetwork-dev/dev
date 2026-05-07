import Link from "next/link";
import {
  FileText,
  Network,
  Users,
  LineChart,
  MessageSquare,
  ArrowRight,
  Sparkles,
  TrendingUp,
  AlertTriangle,
  Lightbulb,
} from "lucide-react";

export const metadata = {
  title: "What is Simulator | CapitalIssuesIQ",
  description:
    "Simulator watches narrative, incentives, and sentiment interact on events. From seed material to a world you can question.",
};

const STEPS = [
  {
    step: "01",
    title: "Seed Material",
    icon: FileText,
    description:
      "Start from a plain-language question, report, policy draft, market note, or story fragment.",
    detail:
      "Drop in anything — a research note, a regulatory filing, a tweet, an earnings transcript. The simulator treats it as the seed event around which a synthetic discourse will grow.",
  },
  {
    step: "02",
    title: "Knowledge Graph",
    icon: Network,
    description:
      "Extract actors, relationships, pressures, and factual anchors so agents reason from structure.",
    detail:
      "Entities, incentives, alliances, and constraints are pulled into a structured graph. Agents will operate against this skeleton instead of free-floating context.",
  },
  {
    step: "03",
    title: "Agent Simulation",
    icon: Users,
    description:
      "Let personas interact across short-form and threaded social surfaces over multiple rounds.",
    detail:
      "Analysts, retail investors, journalists, regulators, and contrarians act in turns. Posts, replies, and reactions accumulate across simulated platforms over several rounds.",
  },
  {
    step: "04",
    title: "Prediction Report",
    icon: LineChart,
    description:
      "Condense emergent behavior into turning points, risks, confidence signals, and follow-up paths.",
    detail:
      "The synthesized report flags inflection moments, divergent narratives, sentiment swings, and risk asymmetries — all anchored back to the discourse that produced them.",
  },
  {
    step: "05",
    title: "Deep Interaction",
    icon: MessageSquare,
    description:
      "Continue asking questions against the generated world instead of stopping at a static answer.",
    detail:
      "The simulated environment stays live. Ask follow-ups, run counterfactuals, replay specific personas, or branch into a new scenario — the world keeps responding.",
  },
];

const SCENARIOS = [
  {
    icon: TrendingUp,
    title: "Earnings Surprise",
    body: "An upbeat earnings beat collides with skeptical analyst threads. Where does the narrative settle by day three?",
  },
  {
    icon: AlertTriangle,
    title: "Sovereign Headline",
    body: "A central bank signals an unconventional move. Watch retail attention, FX desks, and policy commentary collide.",
  },
  {
    icon: Lightbulb,
    title: "Policy Draft",
    body: "A regulator publishes a working paper. Simulate how lobby groups, lawyers, and trading desks reframe it within 48 hours.",
  },
];

export default function WhatIsSimulatorPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Status bar */}
      <div className="border-b border-border bg-secondary/30 px-4 py-2">
        <div className="mx-auto flex max-w-6xl items-center justify-between text-xs">
          <div className="flex items-center gap-6">
            <span className="font-mono text-[10px] uppercase tracking-widest text-primary">
              [SIM]
            </span>
            <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
              MODULE / SIMULATOR
            </span>
          </div>
          <div className="flex items-center gap-6 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
            <span>5 STEP SEQUENCE</span>
            <span className="text-[#3fb950]">SYSTEM ONLINE</span>
          </div>
        </div>
      </div>

      {/* Hero */}
      <section className="border-b border-border bg-card">
        <div className="mx-auto max-w-6xl px-4 py-20 md:py-28">
          <div className="mb-6 inline-flex items-center gap-2 border border-primary/40 bg-primary/5 px-3 py-1.5">
            <Sparkles className="h-3.5 w-3.5 text-primary" />
            <span className="font-mono text-[10px] uppercase tracking-widest text-primary">
              WHAT IS SIMULATOR
            </span>
          </div>

          <h1 className="text-balance text-3xl font-bold leading-tight tracking-tight text-foreground sm:text-4xl md:text-5xl">
            Watch narrative, incentives, and sentiment{" "}
            <span className="text-primary">interact on events</span>
            <br className="hidden md:block" /> From seed material to a world you
            can question.
          </h1>

          <p className="mt-8 max-w-3xl text-pretty text-base leading-relaxed text-muted-foreground md:text-lg">
            Simulator is useful because it keeps structure, personas, social
            dynamics, and report synthesis in <span className="text-foreground">one sequence</span> instead of
            giving a single isolated answer.
          </p>

          <div className="mt-10 flex flex-wrap gap-3">
            <Link
              href="/get-started"
              className="inline-flex items-center gap-2 border border-primary bg-primary px-6 py-3 text-xs font-semibold uppercase tracking-widest text-primary-foreground transition-colors hover:bg-primary/90"
            >
              Run a simulation
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/services/market-sentiment"
              className="inline-flex items-center gap-2 border border-border bg-background px-6 py-3 text-xs font-semibold uppercase tracking-widest text-foreground transition-colors hover:border-primary hover:text-primary"
            >
              View related modules
            </Link>
          </div>
        </div>
      </section>

      {/* 5-step sequence */}
      <section className="border-b border-border bg-background">
        <div className="mx-auto max-w-6xl px-4 py-20 md:py-24">
          <div className="mb-12 flex items-baseline justify-between gap-4">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-widest text-primary">
                [SEQUENCE]
              </p>
              <h2 className="mt-2 text-2xl font-bold tracking-tight text-foreground md:text-3xl">
                Five steps. One continuous loop.
              </h2>
            </div>
            <span className="hidden font-mono text-[10px] uppercase tracking-widest text-muted-foreground md:inline">
              01 → 05
            </span>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {STEPS.map((s, i) => {
              const Icon = s.icon;
              const isLast = i === STEPS.length - 1;
              return (
                <div
                  key={s.step}
                  className={`group relative border border-border bg-card p-7 transition-colors hover:border-primary/60 ${
                    isLast ? "md:col-span-2" : ""
                  }`}
                >
                  <div className="mb-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="flex h-12 w-12 items-center justify-center border border-primary/40 bg-primary/5">
                        <Icon className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                          Step {s.step}
                        </p>
                        <h3 className="text-lg font-bold uppercase tracking-wide text-foreground">
                          {s.title}
                        </h3>
                      </div>
                    </div>
                    <span className="font-mono text-3xl font-bold tabular-nums text-border">
                      {s.step}
                    </span>
                  </div>

                  <p className="text-sm leading-relaxed text-foreground">
                    {s.description}
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    {s.detail}
                  </p>

                  <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-primary transition-all duration-300 group-hover:w-full" />
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Use case */}
      <section className="border-b border-border bg-card">
        <div className="mx-auto max-w-6xl px-4 py-20 md:py-24">
          <div className="grid gap-10 md:grid-cols-[2fr_3fr] md:gap-16">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-widest text-primary">
                [USE CASE]
              </p>
              <h2 className="mt-2 text-balance text-2xl font-bold leading-tight tracking-tight text-foreground md:text-3xl">
                Stress-test market stories where spreadsheets miss the feedback
                loop.
              </h2>
              <p className="mt-6 text-base leading-relaxed text-muted-foreground">
                Models price what is. Simulator probes what reactions do —
                between analysts, retail attention, and public discourse — when
                a story is set in motion.
              </p>

              <div className="mt-8 border border-primary/40 bg-primary/5 p-5">
                <p className="font-mono text-[10px] uppercase tracking-widest text-primary">
                  &gt; PROMPT
                </p>
                <p className="mt-3 text-base leading-relaxed text-foreground">
                  &quot;What if positive news meets coordinated skepticism on
                  social channels?&quot;
                </p>
              </div>
            </div>

            <div className="space-y-4">
              {SCENARIOS.map((sc) => {
                const Icon = sc.icon;
                return (
                  <div
                    key={sc.title}
                    className="border border-border bg-background p-5 transition-colors hover:border-primary/60"
                  >
                    <div className="mb-2 flex items-center gap-3">
                      <Icon className="h-4 w-4 text-primary" />
                      <h3 className="text-sm font-bold uppercase tracking-wide text-foreground">
                        {sc.title}
                      </h3>
                    </div>
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      {sc.body}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-background">
        <div className="mx-auto max-w-6xl px-4 py-20 md:py-24">
          <div className="border border-border bg-card p-8 md:p-12">
            <p className="font-mono text-[10px] uppercase tracking-widest text-primary">
              [BEGIN]
            </p>
            <h2 className="mt-2 text-balance text-2xl font-bold tracking-tight text-foreground md:text-3xl">
              Stop accepting one isolated answer. Step into the simulation.
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground">
              Bring a question, a draft, or a market note. Simulator turns it
              into a structured world you can keep questioning.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/auth/signup"
                className="inline-flex items-center gap-2 border border-primary bg-primary px-6 py-3 text-xs font-semibold uppercase tracking-widest text-primary-foreground transition-colors hover:bg-primary/90"
              >
                Start a simulation
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 border border-border bg-background px-6 py-3 text-xs font-semibold uppercase tracking-widest text-foreground transition-colors hover:border-primary hover:text-primary"
              >
                Talk to the team
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
