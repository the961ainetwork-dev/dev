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
  BookOpen,
  Users
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
  { icon: Mail, name: "Email", description: "Direct to your inbox with priority delivery" },
  { icon: MessageSquare, name: "Telegram", description: "Instant delivery via secure channels" },
  { icon: MessageSquare, name: "WhatsApp", description: "Mobile alerts when you need them" },
  { icon: Linkedin, name: "LinkedIn", description: "Premium articles and insights" },
  { icon: BookOpen, name: "Substack", description: "Long-form content and archives" }
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
      <section className="border-b border-border bg-card px-4 py-20 md:py-28">
        <div className="mx-auto max-w-4xl text-center">
          <div className="mb-6 inline-flex items-center gap-2 border border-primary/30 bg-primary/10 px-4 py-2">
            <Newspaper className="h-4 w-4 text-primary" />
            <span className="font-mono text-xs font-semibold uppercase tracking-wider text-primary">
              Intelligence Newsletters
            </span>
          </div>
          
          <h1 className="mb-6 text-4xl font-bold tracking-tight text-foreground md:text-5xl">
            Stay Informed, <span className="text-primary">Stay Ahead</span>
          </h1>
          
          <p className="mx-auto max-w-2xl text-lg leading-relaxed text-muted-foreground">
            Curated financial intelligence delivered to your preferred channels. 
            From daily market briefings to weekly deep-dives, never miss critical 
            MENA market developments.
          </p>

          <div className="mt-10 flex items-center justify-center gap-8">
            <div className="text-center">
              <p className="font-mono text-3xl font-bold text-primary">31,500+</p>
              <p className="mt-1 text-sm text-muted-foreground">Total Subscribers</p>
            </div>
            <div className="h-12 w-px bg-border" />
            <div className="text-center">
              <p className="font-mono text-3xl font-bold text-primary">4</p>
              <p className="mt-1 text-sm text-muted-foreground">Newsletter Types</p>
            </div>
            <div className="h-12 w-px bg-border" />
            <div className="text-center">
              <p className="font-mono text-3xl font-bold text-primary">5</p>
              <p className="mt-1 text-sm text-muted-foreground">Delivery Channels</p>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Grid */}
      <section className="px-4 py-20 md:py-28">
        <div className="mx-auto max-w-6xl">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold text-foreground">Our Newsletters</h2>
            <p className="mx-auto max-w-xl text-base leading-relaxed text-muted-foreground">
              Select the newsletters that match your intelligence needs. 
              Each publication is crafted by our team of expert analysts.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            {newsletters.map((newsletter) => (
              <div 
                key={newsletter.id} 
                className={`border bg-card transition-all duration-200 ${
                  selectedNewsletters.includes(newsletter.id)
                    ? "border-primary shadow-lg shadow-primary/10"
                    : "border-border hover:border-primary/50"
                }`}
              >
                {/* Newsletter Header */}
                <div className="flex items-start justify-between border-b border-border bg-secondary/50 p-6">
                  <div>
                    <div className="mb-2 flex items-center gap-3">
                      {newsletter.featured && (
                        <span className="bg-primary px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-primary-foreground">
                          Popular
                        </span>
                      )}
                      <h3 className="text-lg font-semibold text-foreground">{newsletter.name}</h3>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        {newsletter.frequency}
                      </span>
                      <span className="flex items-center gap-2">
                        <Clock className="h-4 w-4" />
                        {newsletter.time}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => toggleNewsletter(newsletter.id)}
                    className={`flex h-8 w-8 items-center justify-center border transition-all ${
                      selectedNewsletters.includes(newsletter.id)
                        ? "border-primary bg-primary text-primary-foreground"
                        : "border-border bg-background text-muted-foreground hover:border-primary"
                    }`}
                  >
                    {selectedNewsletters.includes(newsletter.id) && (
                      <CheckCircle className="h-5 w-5" />
                    )}
                  </button>
                </div>

                {/* Newsletter Content */}
                <div className="p-6">
                  <p className="mb-6 text-base leading-relaxed text-muted-foreground">
                    {newsletter.description}
                  </p>
                  
                  <div className="mb-6 flex flex-wrap gap-2">
                    {newsletter.topics.map((topic) => (
                      <span
                        key={topic}
                        className="border border-border bg-secondary/50 px-3 py-1 text-xs text-muted-foreground"
                      >
                        {topic}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-primary" />
                    <span className="font-mono text-sm text-primary">
                      {newsletter.subscribers} subscribers
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Subscribe Form */}
      <section className="border-t border-border bg-card px-4 py-20 md:py-28">
        <div className="mx-auto max-w-xl">
          <div className="border border-border bg-background">
            <div className="border-b border-border bg-secondary/50 px-6 py-4">
              <div className="flex items-center gap-3">
                <Terminal className="h-5 w-5 text-primary" />
                <span className="text-sm font-semibold uppercase tracking-wider text-primary">
                  Subscribe Now
                </span>
              </div>
            </div>

            <div className="p-8">
              {success ? (
                <div className="py-8 text-center">
                  <CheckCircle className="mx-auto mb-6 h-16 w-16 text-[#3fb950]" />
                  <h3 className="mb-3 text-2xl font-bold text-foreground">Subscription Confirmed</h3>
                  <p className="mb-6 text-base leading-relaxed text-muted-foreground">
                    Welcome to CapitalIssuesIQ newsletters. Check your inbox for confirmation 
                    and your first briefing.
                  </p>
                  <button
                    onClick={() => setSuccess(false)}
                    className="text-sm text-primary hover:underline"
                  >
                    Subscribe to more newsletters
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="space-y-6">
                  <div>
                    <label className="mb-2 flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                      <Mail className="h-4 w-4" />
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="w-full border border-border bg-background px-4 py-3 font-mono text-base text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                      placeholder="your@email.com"
                    />
                  </div>

                  {selectedNewsletters.length > 0 && (
                    <div className="rounded border border-primary/30 bg-primary/5 p-4">
                      <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-primary">
                        Selected Newsletters ({selectedNewsletters.length})
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {selectedNewsletters.map(id => {
                          const nl = newsletters.find(n => n.id === id);
                          return nl ? (
                            <span key={id} className="border border-primary/30 bg-primary/10 px-3 py-1 text-sm text-primary">
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
                    className="flex w-full items-center justify-center gap-2 border border-primary bg-primary px-6 py-4 text-base font-bold uppercase tracking-wider text-primary-foreground transition-colors hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {loading ? (
                      <span className="animate-pulse">Subscribing...</span>
                    ) : (
                      <>
                        Subscribe Now
                        <ArrowRight className="h-5 w-5" />
                      </>
                    )}
                  </button>

                  <p className="text-center text-sm text-muted-foreground">
                    Free subscription. Unsubscribe anytime. No spam, ever.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Delivery Channels */}
      <section className="border-t border-border px-4 py-20 md:py-28">
        <div className="mx-auto max-w-6xl">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold text-foreground">Delivery Channels</h2>
            <p className="mx-auto max-w-xl text-base leading-relaxed text-muted-foreground">
              Receive intelligence through your preferred platform. 
              Choose one or multiple channels to stay informed.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-6">
            {deliveryChannels.map((channel) => (
              <div key={channel.name} className="flex items-center gap-4 border border-border bg-card px-6 py-5">
                <channel.icon className="h-6 w-6 text-primary" />
                <div>
                  <p className="text-base font-semibold text-foreground">{channel.name}</p>
                  <p className="text-sm text-muted-foreground">{channel.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* News Terminal CTA */}
      <section className="border-t border-border bg-primary/5 px-4 py-20 md:py-28">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="mb-4 text-3xl font-bold text-foreground">
            Want Real-Time News?
          </h2>
          <p className="mb-10 text-lg leading-relaxed text-muted-foreground">
            Access our live news terminal for real-time market intelligence. 
            100+ stories updated throughout the day with breaking alerts and deep analysis.
          </p>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/news-terminal"
              className="flex items-center gap-2 border border-primary bg-primary px-8 py-4 text-base font-bold uppercase tracking-wider text-primary-foreground transition-colors hover:bg-primary/90"
            >
              <Terminal className="h-5 w-5" />
              Open News Terminal
            </Link>
            <Link
              href="/subscriptions"
              className="border border-border bg-background px-8 py-4 text-base font-medium uppercase tracking-wider text-foreground transition-colors hover:bg-secondary"
            >
              View Full Plans
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
