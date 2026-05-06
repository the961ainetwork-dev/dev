import { Zap, Lock, Globe, Bot, BarChart3, Shield } from "lucide-react";

const features = [
  {
    icon: Zap,
    code: "EVT-DRV",
    title: "Event-Driven Alpha",
    description:
      "Real-time sentiment shifts and market psychology decoded before price action manifests.",
    metric: "<50ms",
    metricLabel: "Latency",
  },
  {
    icon: Lock,
    code: "VRF-INT",
    title: "Verified Intelligence",
    description:
      "AI-powered news verification cuts through bot-generated noise with institutional-grade trust layer.",
    metric: "99.7%",
    metricLabel: "Accuracy",
  },
  {
    icon: Globe,
    code: "GLB-COV",
    title: "Global Coverage",
    description:
      "350+ independent analysts covering every major market, industry, and region worldwide.",
    metric: "150+",
    metricLabel: "Markets",
  },
  {
    icon: Bot,
    code: "AGT-AI",
    title: "Agentic AI",
    description:
      "Autonomous AI agents that act on insights through the 961AI Network integration.",
    metric: "24/7",
    metricLabel: "Active",
  },
  {
    icon: BarChart3,
    code: "ADV-ANL",
    title: "Advanced Analytics",
    description:
      "Multi-factor attribution, risk decomposition, and performance analytics at your fingertips.",
    metric: "1M+",
    metricLabel: "Signals/Day",
  },
  {
    icon: Shield,
    code: "RSK-MGT",
    title: "Risk Management",
    description:
      "Enterprise-grade VaR, stress testing, and regulatory compliance tools built for scale.",
    metric: "Basel III",
    metricLabel: "Compliant",
  },
];

export function FeaturesSection() {
  return (
    <section className="bg-background py-16">
      <div className="mx-auto max-w-7xl px-4">
        {/* Section Header */}
        <div className="mb-8 border border-border">
          <div className="border-b border-border bg-secondary/50 px-4 py-2">
            <span className="text-[10px] font-semibold uppercase tracking-widest text-primary">
              Competitive Advantages
            </span>
          </div>
          <div className="p-4">
            <h2 className="text-xl font-bold text-foreground sm:text-2xl">
              THE EDGE
            </h2>
            <p className="mt-1 text-xs text-muted-foreground">
              What sets Capital Issues apart from traditional financial terminals.
            </p>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <div
              key={feature.code}
              className="border border-border bg-card transition-colors hover:border-primary/50"
            >
              {/* Feature Header */}
              <div className="flex items-center justify-between border-b border-border bg-secondary/30 px-4 py-2">
                <div className="flex items-center gap-2">
                  <feature.icon className="h-4 w-4 text-primary" />
                  <span className="text-[10px] font-bold uppercase tracking-widest text-primary">
                    {feature.code}
                  </span>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold tabular-nums text-[#3fb950]">
                    {feature.metric}
                  </p>
                  <p className="text-[8px] uppercase tracking-wide text-muted-foreground">
                    {feature.metricLabel}
                  </p>
                </div>
              </div>
              
              {/* Feature Content */}
              <div className="p-4">
                <h3 className="text-sm font-bold text-foreground">
                  {feature.title}
                </h3>
                <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
