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
  MessageSquare,
  ArrowDown
} from "lucide-react";

const steps = [
  {
    number: "01",
    title: "Create Your Account",
    description: "Sign up with your work email and set up your professional profile. Our streamlined verification process takes less than 2 minutes, getting you access to the platform quickly and securely.",
    icon: UserPlus,
    features: [
      "Instant account activation",
      "Secure 256-bit encryption",
      "Multi-factor authentication available",
      "SSO integration for enterprise"
    ]
  },
  {
    number: "02", 
    title: "Choose Your Subscription",
    description: "Select the plan that fits your needs - from individual analysts seeking daily briefings to enterprise teams requiring comprehensive coverage. All plans include access to core intelligence features.",
    icon: BarChart3,
    features: [
      "Flexible pricing tiers",
      "No long-term contracts required",
      "Enterprise custom solutions",
      "Team license management"
    ]
  },
  {
    number: "03",
    title: "Customize Your Feed",
    description: "Configure your news preferences, market alerts, and sector focus areas. Our AI-powered system learns from your reading patterns to surface the most relevant intelligence for your work.",
    icon: Newspaper,
    features: [
      "AI-powered personalization",
      "Sector-specific filters",
      "Custom keyword alerts",
      "Watchlist management"
    ]
  },
  {
    number: "04",
    title: "Set Up Alerts",
    description: "Never miss market-moving news again. Configure real-time alerts delivered via your preferred channels - email, SMS, Telegram, or WhatsApp. Set price thresholds and breaking news triggers.",
    icon: Bell,
    features: [
      "Multi-channel delivery",
      "Price threshold alerts",
      "Breaking news notifications",
      "Custom alert scheduling"
    ]
  },
  {
    number: "05",
    title: "Start Trading Smarter",
    description: "Access the full terminal, consume intelligence, and make data-driven decisions with confidence. Integrate with your existing workflows and start benefiting from MENA's premier financial intelligence.",
    icon: Zap,
    features: [
      "Real-time data streams",
      "Historical analysis tools",
      "Portfolio integration",
      "API access for automation"
    ]
  }
];

const deliveryChannels = [
  { icon: Monitor, name: "Web Terminal", description: "Full-featured browser access with customizable dashboards" },
  { icon: Smartphone, name: "Mobile App", description: "Native iOS & Android apps for intelligence on the go" },
  { icon: MessageSquare, name: "Telegram", description: "Instant alerts & briefings via secure messaging" },
  { icon: MessageSquare, name: "WhatsApp", description: "Direct delivery to your phone when you need it" },
];

export const metadata = {
  title: "Get Started | CapitalIssuesIQ",
  description: "Learn how to get started with CapitalIssuesIQ - MENA's premier financial intelligence platform.",
};

export default function GetStartedPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="border-b border-border bg-card px-4 py-20 md:py-28">
        <div className="mx-auto max-w-4xl text-center">
          <div className="mb-6 inline-flex items-center gap-2 border border-primary/30 bg-primary/10 px-4 py-2">
            <Terminal className="h-4 w-4 text-primary" />
            <span className="font-mono text-xs font-semibold uppercase tracking-wider text-primary">
              Getting Started Guide
            </span>
          </div>
          
          <h1 className="mb-6 text-4xl font-bold tracking-tight text-foreground md:text-5xl">
            Your Path to <span className="text-primary">Financial Intelligence</span>
          </h1>
          
          <p className="mx-auto max-w-2xl text-lg leading-relaxed text-muted-foreground">
            From signup to actionable insights in under 5 minutes. Follow our simple 
            five-step workflow to unlock MENA&apos;s most comprehensive financial 
            intelligence platform.
          </p>

          <div className="mt-10 flex items-center justify-center gap-4">
            <Link
              href="/auth/signup"
              className="flex items-center gap-2 border border-primary bg-primary px-8 py-4 text-base font-bold uppercase tracking-wider text-primary-foreground transition-colors hover:bg-primary/90"
            >
              Create Account
              <ArrowRight className="h-5 w-5" />
            </Link>
            <Link
              href="#workflow"
              className="flex items-center gap-2 border border-border bg-background px-8 py-4 text-base font-medium uppercase tracking-wider text-foreground transition-colors hover:bg-secondary"
            >
              See Workflow
              <ArrowDown className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Workflow Steps */}
      <section id="workflow" className="px-4 py-20 md:py-28">
        <div className="mx-auto max-w-5xl">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-3xl font-bold text-foreground">The Workflow</h2>
            <p className="mx-auto max-w-xl text-base leading-relaxed text-muted-foreground">
              Five simple steps to transform how you consume financial intelligence. 
              Each step is designed to get you up and running quickly.
            </p>
          </div>

          <div className="space-y-8">
            {steps.map((step, index) => (
              <div key={step.number} className="border border-border bg-card">
                {/* Step Header */}
                <div className="flex items-center justify-between border-b border-border bg-secondary/50 px-6 py-4">
                  <div className="flex items-center gap-4">
                    <span className="font-mono text-2xl font-bold text-primary">{step.number}</span>
                    <span className="text-lg font-semibold text-foreground">
                      {step.title}
                    </span>
                  </div>
                  <step.icon className="h-6 w-6 text-primary" />
                </div>

                {/* Step Content */}
                <div className="p-8">
                  <div className="grid gap-8 md:grid-cols-2">
                    <div>
                      <p className="mb-6 text-base leading-relaxed text-muted-foreground">
                        {step.description}
                      </p>
                      <ul className="space-y-3">
                        {step.features.map((feature, i) => (
                          <li key={i} className="flex items-center gap-3 text-sm text-foreground">
                            <CheckCircle className="h-4 w-4 shrink-0 text-[#3fb950]" />
                            <span className="leading-relaxed">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="flex items-center justify-center">
                      {/* Visual representation */}
                      <div className="flex h-40 w-full items-center justify-center border border-dashed border-border bg-secondary/20">
                        <div className="text-center">
                          <step.icon className="mx-auto mb-3 h-12 w-12 text-primary/50" />
                          <p className="font-mono text-sm text-muted-foreground">STEP {step.number}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Arrow connector */}
                {index < steps.length - 1 && (
                  <div className="flex justify-center pb-6">
                    <ArrowDown className="h-6 w-6 text-primary" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Delivery Channels */}
      <section className="border-t border-border bg-card px-4 py-20 md:py-28">
        <div className="mx-auto max-w-5xl">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold text-foreground">Access Anywhere</h2>
            <p className="mx-auto max-w-xl text-base leading-relaxed text-muted-foreground">
              Receive intelligence through your preferred channels. 
              Stay connected to the markets wherever you are.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
            {deliveryChannels.map((channel) => (
              <div key={channel.name} className="border border-border bg-background p-6 text-center">
                <channel.icon className="mx-auto mb-4 h-10 w-10 text-primary" />
                <p className="mb-2 text-base font-semibold text-foreground">{channel.name}</p>
                <p className="text-sm leading-relaxed text-muted-foreground">{channel.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Platform Features */}
      <section className="border-t border-border px-4 py-20 md:py-28">
        <div className="mx-auto max-w-5xl">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold text-foreground">What You Get</h2>
            <p className="mx-auto max-w-xl text-base leading-relaxed text-muted-foreground">
              Comprehensive intelligence tools at your fingertips. 
              Everything you need to stay ahead of the markets.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
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
                <div className="border-b border-border bg-secondary/50 px-6 py-4">
                  <span className="text-sm font-semibold uppercase tracking-wider text-primary">
                    {category.title}
                  </span>
                </div>
                <div className="p-6">
                  <ul className="space-y-3">
                    {category.items.map((item, i) => (
                      <li key={i} className="flex items-center gap-3 text-sm text-foreground">
                        <span className="font-mono text-primary">-</span>
                        <span className="leading-relaxed">{item}</span>
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
      <section className="border-t border-border bg-primary/5 px-4 py-20 md:py-28">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="mb-4 text-3xl font-bold text-foreground">
            Ready to Get Started?
          </h2>
          <p className="mb-10 text-lg leading-relaxed text-muted-foreground">
            Join thousands of financial professionals who trust CapitalIssuesIQ 
            for their MENA market intelligence. Create your account today.
          </p>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/auth/signup"
              className="flex items-center gap-2 border border-primary bg-primary px-8 py-4 text-base font-bold uppercase tracking-wider text-primary-foreground transition-colors hover:bg-primary/90"
            >
              Create Free Account
              <ArrowRight className="h-5 w-5" />
            </Link>
            <Link
              href="/subscriptions"
              className="border border-border bg-background px-8 py-4 text-base font-medium uppercase tracking-wider text-foreground transition-colors hover:bg-secondary"
            >
              View Pricing
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
