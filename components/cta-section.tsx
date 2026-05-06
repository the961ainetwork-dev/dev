"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowRight, Mail, CheckCircle, Loader2 } from "lucide-react";

export function CTASection() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (!response.ok) {
        if (response.status === 409) {
          setError("EMAIL ALREADY REGISTERED IN SYSTEM");
        } else {
          throw new Error(data.error || "Failed to subscribe");
        }
        return;
      }

      setIsSubscribed(true);
      setEmail("");
    } catch {
      setError("CONNECTION ERROR. RETRY TRANSMISSION.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="bg-background py-16">
      <div className="mx-auto max-w-7xl px-4">
        <div className="border border-primary bg-card">
          {/* Header */}
          <div className="border-b border-primary bg-primary/10 px-4 py-2">
            <span className="text-[10px] font-semibold uppercase tracking-widest text-primary">
              System Access Request
            </span>
          </div>

          {/* Content */}
          <div className="p-6 sm:p-8">
            <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
              {/* Left - Main CTA */}
              <div className="space-y-4">
                <h2 className="text-2xl font-bold text-foreground sm:text-3xl">
                  READY TO TRANSFORM
                  <br />
                  <span className="text-primary">YOUR TRADING EDGE?</span>
                </h2>
                <p className="text-xs leading-relaxed text-muted-foreground">
                  Join leading institutions using Capital Issues for real-time market intelligence. 
                  Request terminal access to unlock institutional-grade research, sentiment analysis, 
                  and AI-powered insights.
                </p>
                <div className="flex flex-col gap-3 sm:flex-row">
                  <Link
                    href="/signup"
                    className="inline-flex items-center justify-center gap-2 border border-primary bg-primary px-5 py-2.5 text-xs font-bold uppercase tracking-wide text-primary-foreground transition-colors hover:bg-primary/90"
                  >
                    Request Terminal Access
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                  <Link
                    href="/contact"
                    className="inline-flex items-center justify-center gap-2 border border-border px-5 py-2.5 text-xs font-medium uppercase tracking-wide text-foreground transition-colors hover:bg-secondary"
                  >
                    Contact Sales
                  </Link>
                </div>
              </div>

              {/* Right - Newsletter */}
              <div className="border border-border bg-background p-4">
                <div className="mb-4 flex items-center gap-2">
                  <Mail className="h-4 w-4 text-primary" />
                  <span className="text-xs font-bold uppercase tracking-wide text-foreground">
                    Intelligence Briefing
                  </span>
                </div>
                <p className="mb-4 text-xs text-muted-foreground">
                  Subscribe to receive weekly market intelligence briefings and platform updates.
                </p>

                {isSubscribed ? (
                  <div className="flex items-center gap-2 border border-[#3fb950] bg-[#3fb950]/10 p-3 text-[#3fb950]">
                    <CheckCircle className="h-4 w-4" />
                    <span className="text-xs font-bold uppercase tracking-wide">
                      Subscription Confirmed. Welcome to the Network.
                    </span>
                  </div>
                ) : (
                  <form onSubmit={handleSubscribe} className="space-y-3">
                    <div className="flex gap-2">
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email address"
                        className="flex-1 border border-border bg-card px-3 py-2 text-xs text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none"
                        required
                      />
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="border border-[#3fb950] bg-[#3fb950]/10 px-4 py-2 text-xs font-bold uppercase tracking-wide text-[#3fb950] transition-colors hover:bg-[#3fb950]/20 disabled:opacity-50"
                      >
                        {isSubmitting ? (
                          <Loader2 className="h-3.5 w-3.5 animate-spin" />
                        ) : (
                          "Subscribe"
                        )}
                      </button>
                    </div>
                    {error && (
                      <p className="text-[10px] font-medium uppercase tracking-wide text-[#f85149]">
                        {error}
                      </p>
                    )}
                  </form>
                )}
                <p className="mt-3 text-[10px] text-muted-foreground">
                  By subscribing, you agree to receive market intelligence communications.
                </p>
              </div>
            </div>

            {/* Bottom Stats */}
            <div className="mt-8 grid grid-cols-2 gap-4 border-t border-border pt-6 sm:grid-cols-4">
              <div className="text-center">
                <p className="text-xl font-bold tabular-nums text-primary">500+</p>
                <p className="text-[10px] uppercase tracking-wide text-muted-foreground">
                  Institutions
                </p>
              </div>
              <div className="text-center">
                <p className="text-xl font-bold tabular-nums text-[#3fb950]">$2.5T</p>
                <p className="text-[10px] uppercase tracking-wide text-muted-foreground">
                  AUM Covered
                </p>
              </div>
              <div className="text-center">
                <p className="text-xl font-bold tabular-nums text-[#58a6ff]">150+</p>
                <p className="text-[10px] uppercase tracking-wide text-muted-foreground">
                  Markets
                </p>
              </div>
              <div className="text-center">
                <p className="text-xl font-bold tabular-nums text-[#d29922]">99.9%</p>
                <p className="text-[10px] uppercase tracking-wide text-muted-foreground">
                  Uptime
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
