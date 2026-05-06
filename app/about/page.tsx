import { Metadata } from "next";
import Link from "next/link";
import { 
  ArrowRight, 
  Users, 
  Globe, 
  Shield, 
  Zap, 
  Terminal,
  Newspaper,
  Brain,
  BarChart3,
  BookOpen,
  CheckCircle
} from "lucide-react";

export const metadata: Metadata = {
  title: "About | CapitalIssuesIQ",
  description: "MENA's premier financial intelligence platform - macroeconomic analysis, fiscal policy, and financial developments across Lebanon and the region.",
};

const stats = [
  { label: "Research Analysts", value: "350+" },
  { label: "News Sources", value: "1,000+" },
  { label: "Daily Stories", value: "100+" },
  { label: "Topics Covered", value: "200+" },
];

const competitiveEdges = [
  {
    title: "The Sentiment-Action Gap",
    description: "Traditional terminals tell a trader that a stock is falling. The Pulse tells them how the population's mood is shifting in real-time, allowing for \"Event-Driven Alpha\" before the price fully corrects.",
  },
  {
    title: "The Information Verification Gap",
    description: "While Reuters is a news giant, our focus on AI-Powered News Verification specifically for regional news provides a \"trust layer\" that institutional feeds—which are often flooded with bot-generated noise—currently lack.",
  },
  {
    title: "The \"Agentic AI\" Integration",
    description: "While Bloomberg is just beginning to integrate Python/BQuant, our push toward autonomous digital ecosystems (like the 961AI Network) suggests a move toward AI agents that don't just show data, but act on it.",
  },
];

const serviceCategories = [
  {
    icon: Newspaper,
    title: "Unmatched News & Social Intel",
    services: [
      "CINews: Real-time access to global news network, including \"CI First\" market-moving scoops",
      "MarketSentiment: Algorithmic sentiment analysis with psychological modeling"
    ]
  },
  {
    icon: Brain,
    title: "Proprietary Research & Insights",
    services: [
      "CapitalIssuesIQ Intelligence (BI): Team of 350+ independent research professionals",
      "CapitalIssuesIQ Economics: Macroeconomic research and predictive modeling",
      "CapitalIssuesIQ NEF: Strategic research on energy transition and clean tech"
    ]
  },
  {
    icon: BarChart3,
    title: "Risk & Portfolio Management",
    services: [
      "PORT Analytics: Performance attribution and factor risk modeling",
      "MARS Risk System: Multi-asset risk view with Basel III compliance"
    ]
  },
  {
    icon: BookOpen,
    title: "Publications & Reports",
    services: [
      "The Lebanon Ponzi Scheme (Bestseller)",
      "The Hormuz World Order: Geopolitical deep dive",
      "South Lebanon: The Story of a Nation",
      "Ecostats 2026: Quarterly data compendium"
    ]
  }
];

const deliverables = [
  { name: "Lebanon Daily Report", frequency: "Daily" },
  { name: "Market Alerts & Risk Update", frequency: "Bi-Daily" },
  { name: "Arab Finance & Banking Monitor", frequency: "Weekly" },
  { name: "New Economy Insights Report", frequency: "Weekly" },
];

const values = [
  {
    icon: Users,
    title: "Expert Insights",
    description: "Breaking and in-depth coverage across 200+ topics with authoritative analysis.",
  },
  {
    icon: Globe,
    title: "MENA Focused",
    description: "Deep regional expertise bridging complex data and actionable market insights.",
  },
  {
    icon: Shield,
    title: "Data Integrity",
    description: "Comprehensive company profiles, market data, and verified intelligence.",
  },
  {
    icon: Zap,
    title: "Flexible Access",
    description: "Multiple signup options with simple onboarding and license management.",
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="border-b border-border bg-card px-4 py-16">
        <div className="mx-auto max-w-5xl">
          <div className="mb-4 inline-flex items-center gap-2 border border-primary/30 bg-primary/10 px-3 py-1">
            <Terminal className="h-4 w-4 text-primary" />
            <span className="font-mono text-xs font-semibold uppercase tracking-wider text-primary">
              About CapitalIssuesIQ
            </span>
          </div>
          <h1 className="mb-6 text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            The Intelligence of the <span className="text-primary">MENA Market</span>
          </h1>
          <div className="max-w-3xl">
            <p className="mb-4 text-muted-foreground">
              CapitalIssuesIQ is a specialized platform centered on macroeconomic analysis, fiscal policy, 
              and financial developments within Lebanon, the Middle East and North Africa (MENA) region.
            </p>
            <p className="text-muted-foreground">
              We serve as a hub for high-level commentary and investigative research, bridging the gap 
              between complex economic data and actionable market insights. Our platform functions as an 
              intellectual space for exploring the &quot;why&quot; and &quot;how&quot; behind economic shifts.
            </p>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-b border-border px-4 py-12">
        <div className="mx-auto max-w-5xl">
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.label} className="border border-border bg-card p-4 text-center">
                <p className="font-mono text-2xl font-bold text-primary">{stat.value}</p>
                <p className="mt-1 text-xs text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Competitive Edge */}
      <section className="border-b border-border px-4 py-16">
        <div className="mx-auto max-w-5xl">
          <div className="mb-8">
            <h2 className="mb-2 text-2xl font-bold text-foreground">The Competitive Edge</h2>
            <p className="max-w-3xl text-sm text-muted-foreground">
              &quot;While Bloomberg and Reuters provide the infrastructure of global finance, Capital Issues 
              provides the intelligence of the MENA market. By pioneering the LiveAll Consumer Sentiment 
              framework, we close the gap between cold market data and the warm reality of consumer behavior.&quot;
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {competitiveEdges.map((edge, index) => (
              <div key={edge.title} className="border border-border bg-card">
                <div className="border-b border-border bg-secondary/50 px-4 py-2">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-lg font-bold text-primary">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="text-xs font-semibold uppercase tracking-wider text-foreground">
                      {edge.title}
                    </span>
                  </div>
                </div>
                <div className="p-4">
                  <p className="text-xs text-muted-foreground">{edge.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Service Categories */}
      <section className="border-b border-border bg-card px-4 py-16">
        <div className="mx-auto max-w-5xl">
          <div className="mb-8">
            <h2 className="mb-2 text-2xl font-bold text-foreground">Our Services</h2>
            <p className="text-sm text-muted-foreground">
              Professional services categorized into specialized areas
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {serviceCategories.map((category) => (
              <div key={category.title} className="border border-border bg-background">
                <div className="flex items-center gap-3 border-b border-border bg-secondary/50 px-4 py-3">
                  <category.icon className="h-5 w-5 text-primary" />
                  <span className="text-sm font-semibold text-foreground">{category.title}</span>
                </div>
                <div className="p-4">
                  <ul className="space-y-2">
                    {category.services.map((service, i) => (
                      <li key={i} className="flex items-start gap-2 text-xs text-muted-foreground">
                        <CheckCircle className="mt-0.5 h-3 w-3 shrink-0 text-[#3fb950]" />
                        {service}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Deliverables */}
      <section className="border-b border-border px-4 py-16">
        <div className="mx-auto max-w-5xl">
          <div className="mb-8">
            <h2 className="mb-2 text-2xl font-bold text-foreground">Premium Dispatches</h2>
            <p className="text-sm text-muted-foreground">
              Specialized reports and insights delivered on schedule
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {deliverables.map((item) => (
              <div key={item.name} className="flex items-center justify-between border border-border bg-card p-4">
                <span className="text-sm font-medium text-foreground">{item.name}</span>
                <span className="border border-primary/30 bg-primary/10 px-2 py-0.5 font-mono text-[10px] font-semibold text-primary">
                  {item.frequency}
                </span>
              </div>
            ))}
          </div>

          <div className="mt-8 border border-border bg-card p-6">
            <h3 className="mb-4 text-sm font-semibold text-foreground">Add-On Delivery Channels</h3>
            <p className="mb-4 text-xs text-muted-foreground">
              To ensure a truly immersive experience, Capital Issues transcends traditional text-based 
              reporting by delivering:
            </p>
            <ul className="space-y-2">
              <li className="flex items-start gap-2 text-xs text-muted-foreground">
                <span className="font-mono text-primary">-</span>
                Daily proprietary infographics that allow readers to &quot;see&quot; and &quot;feel&quot; the data
              </li>
              <li className="flex items-start gap-2 text-xs text-muted-foreground">
                <span className="font-mono text-primary">-</span>
                Specialized podcasts that reimagine news as an interactive, conversational experience
              </li>
              <li className="flex items-start gap-2 text-xs text-muted-foreground">
                <span className="font-mono text-primary">-</span>
                Direct integration via Telegram, WhatsApp, Substack, and LinkedIn premium newsletters
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="border-b border-border bg-card px-4 py-16">
        <div className="mx-auto max-w-5xl">
          <div className="mb-8 text-center">
            <h2 className="mb-2 text-2xl font-bold text-foreground">Why CapitalIssuesIQ?</h2>
            <p className="text-sm text-muted-foreground">The principles that define our platform</p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((value) => (
              <div key={value.title} className="border border-border bg-background p-4">
                <value.icon className="mb-3 h-6 w-6 text-primary" />
                <h3 className="mb-2 text-sm font-semibold text-foreground">{value.title}</h3>
                <p className="text-xs text-muted-foreground">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* StarMine Integration */}
      <section className="border-b border-border px-4 py-16">
        <div className="mx-auto max-w-5xl">
          <div className="border border-primary/30 bg-primary/5 p-6">
            <div className="mb-4 flex items-center gap-2">
              <Terminal className="h-5 w-5 text-primary" />
              <span className="text-sm font-semibold uppercase tracking-wider text-primary">
                Our Edge
              </span>
            </div>
            <p className="text-sm text-foreground">
              Our edge lies in integration with the world&apos;s largest open directory of financial professionals 
              and specialized &quot;StarMine&quot; analytics. This combination enables us to deliver institutional-grade 
              intelligence with unmatched regional depth and accuracy.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-primary/5 px-4 py-16">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="mb-4 text-2xl font-bold text-foreground">
            Join the CapitalIssuesIQ Network
          </h2>
          <p className="mb-8 text-muted-foreground">
            Experience the intelligence of the MENA market. Start with our newsletters 
            or unlock the full terminal for comprehensive access.
          </p>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/auth/signup"
              className="flex items-center gap-2 border border-primary bg-primary px-8 py-3 text-sm font-bold uppercase tracking-wider text-primary-foreground transition-colors hover:bg-primary/90"
            >
              Get Started
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/contact"
              className="border border-border bg-background px-8 py-3 text-sm font-medium uppercase tracking-wider text-foreground transition-colors hover:bg-secondary"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
