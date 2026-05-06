import Link from "next/link";
import { 
  Terminal, 
  ArrowRight, 
  UserPlus, 
  Newspaper, 
  BarChart3, 
  Bell, 
  Zap,
  CheckCircle,
  Monitor,
  Smartphone,
  MessageSquare
} from "lucide-react";

const steps = [
  {
    number: "01",
    title: "Create Your Account",
    description: "Sign up with your work email and set up your professional profile. Verification takes less than 2 minutes.",
    icon: UserPlus,
    features: ["Instant account activation", "Secure 256-bit encryption", "Multi-factor authentication available"]
  },
  {
    number: "02", 
    title: "Choose Your Subscription",
    description: "Select the plan that fits your needs - from individual analysts to enterprise teams. All plans include core features.",
    icon: BarChart3,
    features: ["Flexible pricing tiers", "No long-term contracts", "Enterprise custom solutions"]
  },
  {
    number: "03",
    title: "Customize Your Feed",
    description: "Configure your news preferences, market alerts, and sector focus. Our AI learns from your reading patterns.",
    icon: Newspaper,
    features: ["AI-powered personalization", "Sector-specific filters", "Custom keyword alerts"]
  },
  {
    number: "04",
    title: "Set Up Alerts",
    description: "Never miss market-moving news. Configure real-time alerts via email, SMS, Telegram, or WhatsApp.",
    icon: Bell,
    features: ["Multi-channel delivery", "Price threshold alerts", "Breaking news notifications"]
  },
  {
    number: "05",
    title: "Start Trading Smarter",
    description: "Access the terminal, consume intelligence, and make data-driven decisions with confidence.",
    icon: Zap,
    features: ["Real-time data streams", "Historical analysis tools", "Portfolio integration"]
  }
];

const deliveryChannels = [
  { icon: Monitor, name: "Web Terminal", description: "Full-featured browser access" },
  { icon: Smartphone, name: "Mobile App", description: "iOS & Android apps" },
  { icon: MessageSquare, name: "Telegram", description: "Instant alerts & briefings" },
  { icon: MessageSquare, name: "WhatsApp", description: "Direct to your phone" },
];

export const metadata = {
  title: "Get Started | CapitalIssuesIQ",
  description: "Learn how to get started with CapitalIssuesIQ - MENA's premier financial intelligence platform.",
};

export default function GetStartedPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="border-b border-border bg-card px-4 py-16">
        <div className="mx-auto max-w-5xl text-center">
          <div className="mb-4 inline-flex items-center gap-2 border border-primary/30 bg-primary/10 px-3 py-1">
            <Terminal className="h-4 w-4 text-primary" />
            <span className="font-mono text-xs font-semibold uppercase tracking-wider text-primary">
              Getting Started Guide
            </span>
          </div>
          <h1 className="mb-4 text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            Your Path to <span className="text-primary">Financial Intelligence</span>
          </h1>
          <p className="mx-auto max-w-2xl text-muted-foreground">
            From signup to actionable insights in under 5 minutes. Follow our simple workflow to unlock 
            MENA&apos;s most comprehensive financial intelligence platform.
          </p>
        </div>
      </section>

      {/* Workflow Steps */}
      <section className="px-4 py-16">
        <div className="mx-auto max-w-5xl">
          <div className="mb-12 text-center">
            <h2 className="mb-2 text-2xl font-bold text-foreground">The Workflow</h2>
            <p className="text-sm text-muted-foreground">
              Five simple steps to transform how you consume financial intelligence
            </p>
          </div>

          <div className="space-y-6">
            {steps.map((step, index) => (
              <div key={step.number} className="border border-border bg-card">
                {/* Step Header */}
                <div className="flex items-center justify-between border-b border-border bg-secondary/50 px-4 py-2">
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-lg font-bold text-primary">{step.number}</span>
                    <span className="text-xs font-semibold uppercase tracking-wider text-foreground">
                      {step.title}
                    </span>
                  </div>
                  <step.icon className="h-5 w-5 text-primary" />
                </div>

                {/* Step Content */}
                <div className="p-6">
                  <div className="grid gap-6 md:grid-cols-2">
                    <div>
                      <p className="mb-4 text-sm text-muted-foreground">{step.description}</p>
                      <ul className="space-y-2">
                        {step.features.map((feature, i) => (
                          <li key={i} className="flex items-center gap-2 text-xs text-foreground">
                            <CheckCircle className="h-3 w-3 text-[#3fb950]" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="flex items-center justify-center">
                      {/* Visual representation */}
                      <div className="flex h-32 w-full items-center justify-center border border-dashed border-border bg-secondary/20">
                        <div className="text-center">
                          <step.icon className="mx-auto mb-2 h-10 w-10 text-primary/50" />
                          <p className="font-mono text-[10px] text-muted-foreground">STEP {step.number}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Arrow connector */}
                {index < steps.length - 1 && (
                  <div className="flex justify-center pb-4">
                    <ArrowRight className="h-5 w-5 rotate-90 text-primary" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Delivery Channels */}
      <section className="border-t border-border bg-card px-4 py-16">
        <div className="mx-auto max-w-5xl">
          <div className="mb-8 text-center">
            <h2 className="mb-2 text-2xl font-bold text-foreground">Access Anywhere</h2>
            <p className="text-sm text-muted-foreground">
              Receive intelligence through your preferred channels
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {deliveryChannels.map((channel) => (
              <div key={channel.name} className="border border-border bg-background p-4 text-center">
                <channel.icon className="mx-auto mb-3 h-8 w-8 text-primary" />
                <p className="mb-1 text-sm font-semibold text-foreground">{channel.name}</p>
                <p className="text-[10px] text-muted-foreground">{channel.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Platform Features */}
      <section className="border-t border-border px-4 py-16">
        <div className="mx-auto max-w-5xl">
          <div className="mb-8 text-center">
            <h2 className="mb-2 text-2xl font-bold text-foreground">What You Get</h2>
            <p className="text-sm text-muted-foreground">
              Comprehensive intelligence tools at your fingertips
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {[
              {
                title: "CI News",
                items: ["CI First market scoops", "Global news network", "Investigative reporting", "100+ daily stories"]
              },
              {
                title: "Market Sentiment",
                items: ["AI sentiment analysis", "Fear/Trust indices", "Social media scanning", "Real-time scoring"]
              },
              {
                title: "Research & Analytics",
                items: ["350+ analysts", "Macro forecasting", "Energy transition data", "Risk modeling"]
              }
            ].map((category) => (
              <div key={category.title} className="border border-border bg-card">
                <div className="border-b border-border bg-secondary/50 px-4 py-2">
                  <span className="text-xs font-semibold uppercase tracking-wider text-primary">
                    {category.title}
                  </span>
                </div>
                <div className="p-4">
                  <ul className="space-y-2">
                    {category.items.map((item, i) => (
                      <li key={i} className="flex items-center gap-2 text-xs text-foreground">
                        <span className="font-mono text-primary">-</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="border-t border-border bg-primary/5 px-4 py-16">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="mb-4 text-2xl font-bold text-foreground">
            Ready to Get Started?
          </h2>
          <p className="mb-8 text-muted-foreground">
            Join thousands of financial professionals who trust CapitalIssuesIQ 
            for their MENA market intelligence.
          </p>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/auth/signup"
              className="flex items-center gap-2 border border-primary bg-primary px-8 py-3 text-sm font-bold uppercase tracking-wider text-primary-foreground transition-colors hover:bg-primary/90"
            >
              Create Free Account
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/subscriptions"
              className="border border-border bg-background px-8 py-3 text-sm font-medium uppercase tracking-wider text-foreground transition-colors hover:bg-secondary"
            >
              View Pricing
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
