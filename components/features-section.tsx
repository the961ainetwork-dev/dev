import { Zap, Lock, Globe, Bot } from "lucide-react";

const features = [
  {
    icon: Zap,
    title: "Event-Driven Alpha",
    description:
      "Know how the market mood is shifting in real-time, not just that a stock is falling. Get ahead with sentiment-based signals.",
  },
  {
    icon: Lock,
    title: "Verified Intelligence",
    description:
      "AI-powered news verification cuts through bot-generated noise, providing a trust layer that institutional feeds lack.",
  },
  {
    icon: Globe,
    title: "Global Coverage",
    description:
      "350+ independent analysts covering every major market, industry, and region with data-driven insights.",
  },
  {
    icon: Bot,
    title: "Agentic AI",
    description:
      "Beyond showing data, our autonomous AI agents act on insights through the 961AI Network integration.",
  },
];

export function FeaturesSection() {
  return (
    <section className="bg-muted py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            The Competitive Edge
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
            What sets Capital Issues apart from traditional financial terminals.
          </p>
        </div>

        <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="rounded-2xl border border-border bg-card p-6"
            >
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                <feature.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-foreground">
                {feature.title}
              </h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
