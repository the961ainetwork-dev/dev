"use client";

import { useState } from "react";
import Link from "next/link";
import { 
  Terminal, 
  Newspaper, 
  Clock, 
  Calendar,
  ArrowRight,
  CheckCircle,
  Mail,
  MessageSquare,
  Linkedin,
  BookOpen
} from "lucide-react";

const newsletters = [
  {
    id: "lebanon-daily",
    name: "Lebanon Daily Report",
    frequency: "Daily",
    time: "6:00 AM BRT",
    description: "Comprehensive daily briefing covering Lebanese financial markets, banking sector updates, currency movements, and economic policy developments. Essential reading for anyone with exposure to Lebanese assets.",
    topics: ["Banking sector", "Currency markets", "Fiscal policy", "Economic indicators", "Political risk"],
    subscribers: "12,000+",
    featured: true
  },
  {
    id: "market-alerts",
    name: "Market Alerts & Risk Update",
    frequency: "Bi-Daily",
    time: "9:00 AM & 4:00 PM BRT",
    description: "Time-sensitive market intelligence and risk analysis. Receive breaking alerts on significant market moves, policy announcements, and emerging risks across the MENA region.",
    topics: ["Breaking alerts", "Risk analysis", "Market moves", "Policy changes", "Geopolitical events"],
    subscribers: "8,500+",
    featured: true
  },
  {
    id: "arab-finance",
    name: "Arab Finance & Banking Monitor",
    frequency: "Weekly",
    time: "Sundays, 8:00 AM BRT",
    description: "Deep-dive analysis of the Arab banking and finance sector. Covers regulatory changes, M&A activity, fintech developments, and performance metrics across GCC and Levant banks.",
    topics: ["Banking analysis", "Regulatory updates", "M&A activity", "Fintech", "Credit markets"],
    subscribers: "6,200+",
    featured: false
  },
  {
    id: "new-economy",
    name: "New Economy Insights Report",
    frequency: "Weekly",
    time: "Wednesdays, 10:00 AM BRT",
    description: "Forward-looking coverage of digital transformation, emerging sectors, and the new economy across MENA. Technology, startups, venture capital, and innovation trends.",
    topics: ["Digital transformation", "Startups & VC", "Technology", "Innovation", "ESG trends"],
    subscribers: "4,800+",
    featured: false
  }
];

const deliveryChannels = [
  { icon: Mail, name: "Email", description: "Direct to your inbox" },
  { icon: MessageSquare, name: "Telegram", description: "Instant delivery" },
  { icon: MessageSquare, name: "WhatsApp", description: "Mobile alerts" },
  { icon: Linkedin, name: "LinkedIn", description: "Premium articles" },
  { icon: BookOpen, name: "Substack", description: "Long-form content" }
];

export default function NewslettersPage() {
  const [email, setEmail] = useState("");
  const [selectedNewsletters, setSelectedNewsletters] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const toggleNewsletter = (id: string) => {
    setSelectedNewsletters(prev => 
      prev.includes(id) 
        ? prev.filter(n => n !== id) 
        : [...prev, id]
    );
  };

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          email, 
          newsletters: selectedNewsletters.length > 0 ? selectedNewsletters : ["lebanon-daily"]
        }),
      });

      if (res.ok) {
        setSuccess(true);
        setEmail("");
        setSelectedNewsletters([]);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="border-b border-border bg-card px-4 py-16">
        <div className="mx-auto max-w-5xl text-center">
          <div className="mb-4 inline-flex items-center gap-2 border border-primary/30 bg-primary/10 px-3 py-1">
            <Newspaper className="h-4 w-4 text-primary" />
            <span className="font-mono text-xs font-semibold uppercase tracking-wider text-primary">
              Intelligence Newsletters
            </span>
          </div>
          <h1 className="mb-4 text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            Stay Informed, <span className="text-primary">Stay Ahead</span>
          </h1>
          <p className="mx-auto max-w-2xl text-muted-foreground">
            Curated financial intelligence delivered to your preferred channels. 
            From daily market briefings to weekly deep-dives, never miss critical MENA market developments.
          </p>
        </div>
      </section>

      {/* Newsletter Grid */}
      <section className="px-4 py-16">
        <div className="mx-auto max-w-5xl">
          <div className="mb-8">
            <h2 className="mb-2 text-xl font-bold text-foreground">Our Newsletters</h2>
            <p className="text-sm text-muted-foreground">
              Select the newsletters that match your intelligence needs
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {newsletters.map((newsletter) => (
              <div 
                key={newsletter.id} 
                className={`border bg-card transition-colors ${
                  selectedNewsletters.includes(newsletter.id)
                    ? "border-primary"
                    : "border-border"
                }`}
              >
                {/* Newsletter Header */}
                <div className="flex items-start justify-between border-b border-border bg-secondary/50 p-4">
                  <div>
                    <div className="mb-1 flex items-center gap-2">
                      {newsletter.featured && (
                        <span className="bg-primary px-1.5 py-0.5 text-[8px] font-bold uppercase tracking-wider text-primary-foreground">
                          Popular
                        </span>
                      )}
                      <h3 className="text-sm font-semibold text-foreground">{newsletter.name}</h3>
                    </div>
                    <div className="flex items-center gap-3 text-[10px] text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {newsletter.frequency}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {newsletter.time}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => toggleNewsletter(newsletter.id)}
                    className={`flex h-6 w-6 items-center justify-center border transition-colors ${
                      selectedNewsletters.includes(newsletter.id)
                        ? "border-primary bg-primary text-primary-foreground"
                        : "border-border bg-background text-muted-foreground hover:border-primary"
                    }`}
                  >
                    {selectedNewsletters.includes(newsletter.id) && (
                      <CheckCircle className="h-4 w-4" />
                    )}
                  </button>
                </div>

                {/* Newsletter Content */}
                <div className="p-4">
                  <p className="mb-4 text-xs text-muted-foreground">{newsletter.description}</p>
                  
                  <div className="mb-3 flex flex-wrap gap-1">
                    {newsletter.topics.map((topic) => (
                      <span
                        key={topic}
                        className="border border-border bg-secondary/50 px-2 py-0.5 text-[10px] text-muted-foreground"
                      >
                        {topic}
                      </span>
                    ))}
                  </div>

                  <p className="font-mono text-[10px] text-primary">
                    {newsletter.subscribers} subscribers
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Subscribe Form */}
      <section className="border-t border-border bg-card px-4 py-16">
        <div className="mx-auto max-w-xl">
          <div className="border border-border bg-background">
            <div className="border-b border-border bg-secondary/50 px-4 py-2">
              <div className="flex items-center gap-2">
                <Terminal className="h-4 w-4 text-primary" />
                <span className="text-xs font-semibold uppercase tracking-wider text-primary">
                  Subscribe Now
                </span>
              </div>
            </div>

            <div className="p-6">
              {success ? (
                <div className="text-center">
                  <CheckCircle className="mx-auto mb-4 h-12 w-12 text-[#3fb950]" />
                  <h3 className="mb-2 text-lg font-bold text-foreground">Subscription Confirmed</h3>
                  <p className="mb-4 text-sm text-muted-foreground">
                    Welcome to CapitalIssuesIQ newsletters. Check your inbox for confirmation.
                  </p>
                  <button
                    onClick={() => setSuccess(false)}
                    className="text-xs text-primary hover:underline"
                  >
                    Subscribe to more newsletters
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="space-y-4">
                  <div>
                    <label className="mb-1.5 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      <Mail className="h-3 w-3" />
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="w-full border border-border bg-background px-4 py-2.5 font-mono text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                      placeholder="your@email.com"
                    />
                  </div>

                  {selectedNewsletters.length > 0 && (
                    <div className="rounded border border-primary/30 bg-primary/5 p-3">
                      <p className="mb-2 text-[10px] font-semibold uppercase tracking-wider text-primary">
                        Selected Newsletters ({selectedNewsletters.length})
                      </p>
                      <div className="flex flex-wrap gap-1">
                        {selectedNewsletters.map(id => {
                          const nl = newsletters.find(n => n.id === id);
                          return nl ? (
                            <span key={id} className="border border-primary/30 bg-primary/10 px-2 py-0.5 text-[10px] text-primary">
                              {nl.name}
                            </span>
                          ) : null;
                        })}
                      </div>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={loading}
                    className="flex w-full items-center justify-center gap-2 border border-primary bg-primary px-4 py-3 text-sm font-bold uppercase tracking-wider text-primary-foreground transition-colors hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {loading ? (
                      <span className="animate-pulse">Subscribing...</span>
                    ) : (
                      <>
                        Subscribe Now
                        <ArrowRight className="h-4 w-4" />
                      </>
                    )}
                  </button>

                  <p className="text-center text-[10px] text-muted-foreground">
                    Free subscription. Unsubscribe anytime. No spam.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Delivery Channels */}
      <section className="border-t border-border px-4 py-16">
        <div className="mx-auto max-w-5xl">
          <div className="mb-8 text-center">
            <h2 className="mb-2 text-xl font-bold text-foreground">Delivery Channels</h2>
            <p className="text-sm text-muted-foreground">
              Receive intelligence through your preferred platform
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-4">
            {deliveryChannels.map((channel) => (
              <div key={channel.name} className="flex items-center gap-3 border border-border bg-card px-4 py-3">
                <channel.icon className="h-5 w-5 text-primary" />
                <div>
                  <p className="text-sm font-semibold text-foreground">{channel.name}</p>
                  <p className="text-[10px] text-muted-foreground">{channel.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-border bg-primary/5 px-4 py-16">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="mb-4 text-2xl font-bold text-foreground">
            Want Full Platform Access?
          </h2>
          <p className="mb-8 text-muted-foreground">
            Newsletters are just the beginning. Unlock the full CapitalIssuesIQ 
            terminal for real-time data, analytics, and premium research.
          </p>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/subscriptions"
              className="flex items-center gap-2 border border-primary bg-primary px-8 py-3 text-sm font-bold uppercase tracking-wider text-primary-foreground transition-colors hover:bg-primary/90"
            >
              View Plans
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
