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
          setError("You're already subscribed!");
        } else {
          throw new Error(data.error || "Failed to subscribe");
        }
        return;
      }

      setIsSubscribed(true);
      setEmail("");
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="bg-background py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary to-accent p-px">
          <div className="relative rounded-3xl bg-background px-8 py-16 sm:px-16 sm:py-20">
            <div className="absolute inset-0 overflow-hidden">
              <div className="absolute -right-1/4 -top-1/4 h-[500px] w-[500px] rounded-full bg-primary/5 blur-3xl" />
              <div className="absolute -bottom-1/4 -left-1/4 h-[500px] w-[500px] rounded-full bg-accent/5 blur-3xl" />
            </div>

            <div className="relative mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                Ready to Transform Your Trading Edge?
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-lg text-muted-foreground">
                Join the institutions already using Capital Issues to stay ahead of the market.
                Request early access today.
              </p>

              <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Link
                  href="/signup"
                  className="inline-flex items-center gap-2 rounded-lg bg-primary px-8 py-3.5 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/25 transition-all hover:bg-primary/90 hover:shadow-xl hover:shadow-primary/30"
                >
                  Request Access
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 rounded-lg border border-border px-8 py-3.5 text-sm font-semibold text-foreground transition-colors hover:bg-secondary"
                >
                  Contact Sales
                </Link>
              </div>

              {/* Newsletter Signup */}
              <div className="mt-12 border-t border-border pt-10">
                <h3 className="text-lg font-semibold text-foreground">
                  Stay Updated
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Subscribe to our newsletter for market insights and platform updates.
                </p>

                {isSubscribed ? (
                  <div className="mt-6 flex items-center justify-center gap-2 text-primary">
                    <CheckCircle className="h-5 w-5" />
                    <span className="font-medium">Thanks for subscribing!</span>
                  </div>
                ) : (
                  <form onSubmit={handleSubscribe} className="mt-6">
                    <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
                      <div className="relative">
                        <Mail className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="Enter your email"
                          required
                          className="w-full rounded-lg border border-border bg-background py-3 pl-11 pr-4 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary sm:w-72"
                        />
                      </div>
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-50"
                      >
                        {isSubmitting ? (
                          <>
                            <Loader2 className="h-4 w-4 animate-spin" />
                            Subscribing...
                          </>
                        ) : (
                          "Subscribe"
                        )}
                      </button>
                    </div>
                    {error && (
                      <p className="mt-3 text-sm text-destructive">{error}</p>
                    )}
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
