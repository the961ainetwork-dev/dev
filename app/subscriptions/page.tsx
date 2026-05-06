import Link from "next/link";
import { Terminal, Check, ArrowRight, Zap, Building, Crown } from "lucide-react";

const plans = [
  {
    id: "analyst",
    name: "Analyst",
    price: "$299",
    period: "/month",
    description: "For individual professionals seeking MENA market intelligence",
    icon: Zap,
    featured: false,
    features: [
      "CI News real-time access",
      "Lebanon Daily Report",
      "Market Sentiment Index",
      "Email alerts & notifications",
      "Mobile app access",
      "Basic API access (1,000 calls/month)",
      "Standard support"
    ],
    limitations: [
      "Single user license",
      "Limited historical data (1 year)"
    ]
  },
  {
    id: "professional",
    name: "Professional",
    price: "$799",
    period: "/month",
    description: "For serious traders and analysts requiring deeper insights",
    icon: Crown,
    featured: true,
    features: [
      "Everything in Analyst, plus:",
      "CapitalIssuesIQ Intelligence access",
      "Bi-Daily Market Alerts & Risk Update",
      "Arab Finance & Banking Monitor",
      "Weekly New Economy Insights",
      "Full historical data access",
      "Advanced API access (10,000 calls/month)",
      "Telegram & WhatsApp delivery",
      "Priority support"
    ],
    limitations: [
      "Up to 3 users per license"
    ]
  },
  {
    id: "enterprise",
    name: "Enterprise",
    price: "Custom",
    period: "",
    description: "For institutions requiring comprehensive coverage and integration",
    icon: Building,
    featured: false,
    features: [
      "Everything in Professional, plus:",
      "CapitalIssuesIQ Economics access",
      "CapitalIssuesIQ NEF (Energy Finance)",
      "PORT Analytics integration",
      "MARS Risk System access",
      "Custom data feeds",
      "Unlimited API access",
      "Dedicated account manager",
      "Custom reporting & analytics",
      "On-site training available"
    ],
    limitations: []
  }
];

const addOns = [
  {
    name: "Capital Issues Publications",
    price: "$49/month",
    description: "Access to our research library including The Lebanon Ponzi Scheme, The Hormuz World Order, and Ecostats 2026"
  },
  {
    name: "Daily Infographics",
    price: "$29/month", 
    description: "Proprietary visual data narratives delivered daily to your inbox"
  },
  {
    name: "Premium Podcasts",
    price: "$19/month",
    description: "Audio briefings and expert interviews in an interactive format"
  }
];

export const metadata = {
  title: "Subscriptions | CapitalIssuesIQ",
  description: "Choose your CapitalIssuesIQ subscription plan and get access to MENA's premier financial intelligence platform.",
};

export default function SubscriptionsPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="border-b border-border bg-card px-4 py-16">
        <div className="mx-auto max-w-5xl text-center">
          <div className="mb-4 inline-flex items-center gap-2 border border-primary/30 bg-primary/10 px-3 py-1">
            <Terminal className="h-4 w-4 text-primary" />
            <span className="font-mono text-xs font-semibold uppercase tracking-wider text-primary">
              Subscription Plans
            </span>
          </div>
          <h1 className="mb-4 text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            Choose Your <span className="text-primary">Intelligence Level</span>
          </h1>
          <p className="mx-auto max-w-2xl text-muted-foreground">
            Flexible plans designed for every type of financial professional. 
            From individual analysts to enterprise teams, we have a solution for you.
          </p>
        </div>
      </section>

      {/* Pricing Grid */}
      <section className="px-4 py-16">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-6 md:grid-cols-3">
            {plans.map((plan) => (
              <div 
                key={plan.id} 
                className={`relative border bg-card ${
                  plan.featured 
                    ? "border-primary" 
                    : "border-border"
                }`}
              >
                {plan.featured && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="bg-primary px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-primary-foreground">
                      Most Popular
                    </span>
                  </div>
                )}

                {/* Plan Header */}
                <div className={`border-b px-6 py-4 ${
                  plan.featured 
                    ? "border-primary/30 bg-primary/10" 
                    : "border-border bg-secondary/50"
                }`}>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                        {plan.name}
                      </p>
                      <div className="mt-1 flex items-baseline gap-1">
                        <span className="text-3xl font-bold text-foreground">{plan.price}</span>
                        <span className="text-sm text-muted-foreground">{plan.period}</span>
                      </div>
                    </div>
                    <plan.icon className={`h-8 w-8 ${plan.featured ? "text-primary" : "text-muted-foreground"}`} />
                  </div>
                  <p className="mt-2 text-xs text-muted-foreground">{plan.description}</p>
                </div>

                {/* Features */}
                <div className="p-6">
                  <p className="mb-3 text-[10px] font-semibold uppercase tracking-wider text-primary">
                    Included Features
                  </p>
                  <ul className="space-y-2">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-2 text-xs text-foreground">
                        <Check className="mt-0.5 h-3 w-3 shrink-0 text-[#3fb950]" />
                        {feature}
                      </li>
                    ))}
                  </ul>

                  {plan.limitations.length > 0 && (
                    <>
                      <p className="mb-2 mt-4 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                        Limitations
                      </p>
                      <ul className="space-y-1">
                        {plan.limitations.map((limitation, i) => (
                          <li key={i} className="text-xs text-muted-foreground">
                            • {limitation}
                          </li>
                        ))}
                      </ul>
                    </>
                  )}
                </div>

                {/* CTA */}
                <div className="border-t border-border p-6">
                  <Link
                    href={plan.id === "enterprise" ? "/contact" : "/auth/signup"}
                    className={`flex w-full items-center justify-center gap-2 px-4 py-3 text-sm font-bold uppercase tracking-wider transition-colors ${
                      plan.featured
                        ? "border border-primary bg-primary text-primary-foreground hover:bg-primary/90"
                        : "border border-border bg-secondary text-foreground hover:bg-secondary/80"
                    }`}
                  >
                    {plan.id === "enterprise" ? "Contact Sales" : "Get Started"}
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Add-ons Section */}
      <section className="border-t border-border bg-card px-4 py-16">
        <div className="mx-auto max-w-5xl">
          <div className="mb-8 text-center">
            <h2 className="mb-2 text-2xl font-bold text-foreground">Optional Add-ons</h2>
            <p className="text-sm text-muted-foreground">
              Enhance your subscription with additional intelligence products
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {addOns.map((addon) => (
              <div key={addon.name} className="border border-border bg-background p-6">
                <div className="mb-2 flex items-center justify-between">
                  <h3 className="text-sm font-semibold text-foreground">{addon.name}</h3>
                  <span className="font-mono text-sm text-primary">{addon.price}</span>
                </div>
                <p className="text-xs text-muted-foreground">{addon.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Deliverables Section */}
      <section className="border-t border-border px-4 py-16">
        <div className="mx-auto max-w-5xl">
          <div className="mb-8 text-center">
            <h2 className="mb-2 text-2xl font-bold text-foreground">Premium Dispatches</h2>
            <p className="text-sm text-muted-foreground">
              Specialized reports and insights delivered on your schedule
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {[
              { name: "Lebanon Daily Report", frequency: "Daily", description: "Comprehensive daily briefing on Lebanese markets and economy" },
              { name: "Market Alerts & Risk Update", frequency: "Bi-Daily", description: "Specialized risk analysis and market-moving alerts" },
              { name: "Arab Finance & Banking Monitor", frequency: "Weekly", description: "Banking sector analysis across the Arab region" },
              { name: "New Economy Insights Report", frequency: "Weekly", description: "Coverage of digital transformation and emerging sectors" }
            ].map((report) => (
              <div key={report.name} className="flex items-start gap-4 border border-border bg-card p-4">
                <div className="shrink-0 border border-primary/30 bg-primary/10 px-2 py-1">
                  <span className="font-mono text-[10px] font-bold text-primary">{report.frequency}</span>
                </div>
                <div>
                  <h3 className="mb-1 text-sm font-semibold text-foreground">{report.name}</h3>
                  <p className="text-xs text-muted-foreground">{report.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ / CTA */}
      <section className="border-t border-border bg-primary/5 px-4 py-16">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="mb-4 text-2xl font-bold text-foreground">
            Questions About Plans?
          </h2>
          <p className="mb-8 text-muted-foreground">
            Our team is ready to help you choose the right plan for your needs. 
            Schedule a demo or contact our sales team.
          </p>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/contact"
              className="flex items-center gap-2 border border-primary bg-primary px-8 py-3 text-sm font-bold uppercase tracking-wider text-primary-foreground transition-colors hover:bg-primary/90"
            >
              Contact Sales
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/get-started"
              className="border border-border bg-background px-8 py-3 text-sm font-medium uppercase tracking-wider text-foreground transition-colors hover:bg-secondary"
            >
              How It Works
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
