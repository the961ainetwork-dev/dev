"use client";

import Link from "next/link";
import { ArrowRight, Zap, Globe } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative min-h-screen bg-background overflow-hidden flex items-center">
      {/* Subtle background grid */}
      <div className="absolute inset-0 opacity-5">
        <div 
          className="h-full w-full"
          style={{
            backgroundImage: 'linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)',
            backgroundSize: '50px 50px'
          }}
        />
      </div>

      {/* Gradient accent blur elements */}
      <div className="absolute top-20 left-10 w-96 h-96 bg-accent/10 rounded-full blur-3xl opacity-50 -z-10" />
      <div className="absolute bottom-40 right-20 w-80 h-80 bg-accent-blue/10 rounded-full blur-3xl opacity-50 -z-10" />

      <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
          {/* Left Column */}
          <div className="space-y-8">
            {/* Status Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-secondary/60 border border-accent/20 rounded-full hover:border-accent/40 transition-colors">
              <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
              <span className="text-sm font-medium text-accent">Live Intelligence</span>
            </div>

            {/* Heading */}
            <div className="space-y-4">
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight text-balance">
                Financial <span className="bg-gradient-to-r from-accent via-accent-blue to-accent-cyan bg-clip-text text-transparent">Intelligence</span> Terminal
              </h1>
              <p className="text-lg sm:text-xl text-muted-foreground max-w-xl leading-relaxed">
                Real-time market sentiment, exclusive research feeds, and AI-powered institutional-grade analysis. Move before the market moves.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link
                href="/signup"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-colors group"
              >
                Get Started
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/demo"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-border bg-card hover:bg-secondary text-foreground rounded-lg font-semibold transition-colors"
              >
                Watch Demo
              </Link>
            </div>

            {/* Stats Row */}
            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-border">
              <div>
                <div className="text-2xl sm:text-3xl font-bold">350+</div>
                <p className="text-sm text-muted-foreground mt-1">Research Analysts</p>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-bold text-accent">&lt;50ms</div>
                <p className="text-sm text-muted-foreground mt-1">Data Latency</p>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-bold">24/7</div>
                <p className="text-sm text-muted-foreground mt-1">Global Coverage</p>
              </div>
            </div>
          </div>

          {/* Right Column - Feature Cards */}
          <div className="hidden lg:grid grid-rows-2 gap-6">
            {/* Large card */}
            <div className="bg-card border border-border rounded-xl p-6 hover:border-accent/40 transition-colors">
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 bg-secondary rounded-lg flex items-center justify-center">
                  <Zap className="w-6 h-6 text-accent" />
                </div>
              </div>
              <h3 className="text-lg font-semibold mb-2">Sentiment Analysis</h3>
              <p className="text-sm text-muted-foreground">Real-time market sentiment with AI-powered indicators across 10k+ data sources</p>
            </div>

            {/* Two smaller cards */}
            <div className="grid grid-cols-2 gap-6">
              <div className="bg-card border border-border rounded-xl p-5 hover:border-accent/40 transition-colors">
                <div className="w-10 h-10 bg-secondary rounded-lg flex items-center justify-center mb-3">
                  <Globe className="w-5 h-5 text-accent-blue" />
                </div>
                <h4 className="font-semibold text-sm mb-1">Global Markets</h4>
                <p className="text-xs text-muted-foreground">24 markets, 50+ exchanges</p>
              </div>
              <div className="bg-card border border-border rounded-xl p-5 hover:border-accent/40 transition-colors">
                <div className="w-10 h-10 bg-secondary rounded-lg flex items-center justify-center mb-3">
                  <ArrowRight className="w-5 h-5 text-accent-green" />
                </div>
                <h4 className="font-semibold text-sm mb-1">Instant Alerts</h4>
                <p className="text-xs text-muted-foreground">Real-time notifications</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
