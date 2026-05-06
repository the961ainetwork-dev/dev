"use client";

import Link from "next/link";
import { ArrowRight, TrendingUp, TrendingDown, Activity } from "lucide-react";
import { useEffect, useState } from "react";

const marketData = [
  { symbol: "SPX", name: "S&P 500", value: 5234.18, change: 0.45, positive: true },
  { symbol: "DJI", name: "DOW", value: 39127.80, change: -0.12, positive: false },
  { symbol: "IXIC", name: "NASDAQ", value: 16439.22, change: 0.78, positive: true },
  { symbol: "FTSE", name: "FTSE 100", value: 8144.13, change: 0.33, positive: true },
  { symbol: "N225", name: "NIKKEI", value: 39098.68, change: -0.56, positive: false },
  { symbol: "EUR/USD", name: "EUR/USD", value: 1.0847, change: 0.15, positive: true },
  { symbol: "BTC", name: "BITCOIN", value: 67432.50, change: 2.34, positive: true },
  { symbol: "GOLD", name: "GOLD", value: 2338.40, change: 0.21, positive: true },
];

function TickerBar() {
  return (
    <div className="overflow-hidden border-y border-border bg-card">
      <div className="flex animate-[tickerScroll_30s_linear_infinite]">
        {[...marketData, ...marketData].map((item, index) => (
          <div
            key={`${item.symbol}-${index}`}
            className="flex shrink-0 items-center gap-3 border-r border-border px-4 py-2"
          >
            <span className="text-xs font-bold text-foreground">{item.symbol}</span>
            <span className="tabular-nums text-xs text-foreground">
              {item.value.toLocaleString(undefined, { minimumFractionDigits: 2 })}
            </span>
            <span
              className={`flex items-center gap-0.5 tabular-nums text-xs font-medium ${
                item.positive ? "text-[#3fb950]" : "text-[#f85149]"
              }`}
            >
              {item.positive ? (
                <TrendingUp className="h-3 w-3" />
              ) : (
                <TrendingDown className="h-3 w-3" />
              )}
              {item.positive ? "+" : ""}
              {item.change}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function TerminalPrompt() {
  const [text, setText] = useState("");
  const fullText = "INITIALIZING MARKET INTELLIGENCE TERMINAL...";
  
  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      setText(fullText.slice(0, index));
      index++;
      if (index > fullText.length) {
        clearInterval(interval);
      }
    }, 50);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="font-mono text-xs text-[#3fb950]">
      <span className="text-primary">root@capitalissues:~$</span> {text}
      <span className="cursor-blink">_</span>
    </div>
  );
}

export function HeroSection() {
  return (
    <section className="bg-background">
      <TickerBar />
      
      <div className="mx-auto max-w-7xl px-4 py-12 sm:py-16 lg:py-20">
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
          {/* Left Column - Main Content */}
          <div className="space-y-6">
            {/* Status Badge */}
            <div className="inline-flex items-center gap-2 border border-[#3fb950]/30 bg-[#3fb950]/10 px-3 py-1">
              <Activity className="h-3 w-3 text-[#3fb950]" />
              <span className="text-xs font-medium uppercase tracking-wide text-[#3fb950]">
                961AI Network Active
              </span>
            </div>

            {/* Terminal Style Header */}
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
                <span className="text-primary">FINANCIAL</span>
                <br />
                INTELLIGENCE
                <br />
                <span className="text-[#58a6ff]">TERMINAL</span>
              </h1>
              <TerminalPrompt />
            </div>

            {/* Description */}
            <p className="max-w-lg text-sm leading-relaxed text-muted-foreground">
              Real-time market sentiment, exclusive news feeds, and AI-powered research. 
              Institutional-grade intelligence delivered with sub-second latency. 
              Move before the market.
            </p>

            {/* CTAs */}
            <div className="flex flex-col gap-3 sm:flex-row">
              <Link
                href="/signup"
                className="inline-flex items-center justify-center gap-2 border border-primary bg-primary px-5 py-2.5 text-xs font-bold uppercase tracking-wide text-primary-foreground transition-colors hover:bg-primary/90"
              >
                Request Terminal Access
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
              <Link
                href="/demo"
                className="inline-flex items-center justify-center gap-2 border border-border bg-secondary px-5 py-2.5 text-xs font-medium uppercase tracking-wide text-foreground transition-colors hover:bg-secondary/80"
              >
                View Live Demo
              </Link>
            </div>

            {/* Stats Row */}
            <div className="grid grid-cols-3 gap-4 border-t border-border pt-6">
              <div>
                <p className="text-2xl font-bold tabular-nums text-primary">350+</p>
                <p className="text-[10px] uppercase tracking-wide text-muted-foreground">
                  Research Analysts
                </p>
              </div>
              <div>
                <p className="text-2xl font-bold tabular-nums text-[#3fb950]">&lt;50ms</p>
                <p className="text-[10px] uppercase tracking-wide text-muted-foreground">
                  Data Latency
                </p>
              </div>
              <div>
                <p className="text-2xl font-bold tabular-nums text-[#58a6ff]">24/7</p>
                <p className="text-[10px] uppercase tracking-wide text-muted-foreground">
                  Global Coverage
                </p>
              </div>
            </div>
          </div>

          {/* Right Column - Terminal Preview */}
          <div className="hidden lg:block">
            <div className="border border-border bg-card">
              {/* Terminal Header */}
              <div className="flex items-center justify-between border-b border-border bg-secondary/50 px-4 py-2">
                <div className="flex items-center gap-2">
                  <div className="h-2.5 w-2.5 rounded-full bg-[#f85149]" />
                  <div className="h-2.5 w-2.5 rounded-full bg-[#d29922]" />
                  <div className="h-2.5 w-2.5 rounded-full bg-[#3fb950]" />
                </div>
                <span className="text-[10px] font-medium uppercase tracking-widest text-muted-foreground">
                  CAPITALISSUES TERMINAL v4.2.1
                </span>
              </div>
              
              {/* Terminal Content */}
              <div className="p-4 space-y-4">
                {/* Market Overview Panel */}
                <div className="border border-border">
                  <div className="border-b border-border bg-background px-3 py-1.5">
                    <span className="text-[10px] font-semibold uppercase tracking-widest text-primary">
                      Market Overview
                    </span>
                  </div>
                  <div className="p-3 space-y-2">
                    {marketData.slice(0, 4).map((item) => (
                      <div key={item.symbol} className="flex items-center justify-between text-xs">
                        <span className="text-muted-foreground">{item.name}</span>
                        <div className="flex items-center gap-3">
                          <span className="tabular-nums text-foreground">
                            {item.value.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                          </span>
                          <span
                            className={`tabular-nums font-medium ${
                              item.positive ? "text-[#3fb950]" : "text-[#f85149]"
                            }`}
                          >
                            {item.positive ? "+" : ""}{item.change}%
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* News Feed Panel */}
                <div className="border border-border">
                  <div className="border-b border-border bg-background px-3 py-1.5">
                    <span className="text-[10px] font-semibold uppercase tracking-widest text-primary">
                      CI First News Feed
                    </span>
                  </div>
                  <div className="p-3 space-y-2">
                    <div className="text-xs">
                      <span className="text-[#d29922]">[14:32:18]</span>
                      <span className="ml-2 text-foreground">Fed signals potential rate pause in Q3...</span>
                    </div>
                    <div className="text-xs">
                      <span className="text-[#d29922]">[14:31:45]</span>
                      <span className="ml-2 text-foreground">NVDA beats earnings, guidance raised...</span>
                    </div>
                    <div className="text-xs">
                      <span className="text-[#d29922]">[14:30:22]</span>
                      <span className="ml-2 text-foreground">Oil futures surge on supply concerns...</span>
                    </div>
                  </div>
                </div>

                {/* Sentiment Panel */}
                <div className="border border-border">
                  <div className="border-b border-border bg-background px-3 py-1.5">
                    <span className="text-[10px] font-semibold uppercase tracking-widest text-primary">
                      Market Sentiment
                    </span>
                  </div>
                  <div className="p-3">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-muted-foreground">Overall Index</span>
                      <span className="font-bold text-[#3fb950]">BULLISH (72)</span>
                    </div>
                    <div className="mt-2 h-2 w-full bg-background">
                      <div className="h-full w-[72%] bg-gradient-to-r from-[#f85149] via-[#d29922] to-[#3fb950]" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
