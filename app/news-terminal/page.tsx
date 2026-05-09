"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { 
  Terminal, 
  AlertTriangle,
  Clock,
  Filter,
  Search,
  ChevronRight,
  Globe,
  TrendingUp,
  Building2,
  Zap,
  BarChart3,
  Landmark,
  Cpu,
  FileText,
  RefreshCw
} from "lucide-react";
import { newsItems, NewsItem } from "@/lib/news-data";

const categories = [
  { id: "all", label: "All News", icon: Globe },
  { id: "breaking", label: "Breaking", icon: AlertTriangle },
  { id: "markets", label: "Markets", icon: TrendingUp },
  { id: "banking", label: "Banking", icon: Building2 },
  { id: "economy", label: "Economy", icon: BarChart3 },
  { id: "politics", label: "Politics", icon: Landmark },
  { id: "energy", label: "Energy", icon: Zap },
  { id: "technology", label: "Technology", icon: Cpu },
  { id: "analysis", label: "Analysis", icon: FileText },
];

const regions = [
  { id: "all", label: "All Regions" },
  { id: "lebanon", label: "Lebanon" },
  { id: "gcc", label: "GCC" },
  { id: "mena", label: "MENA" },
  { id: "global", label: "Global" },
];

const priorityColors = {
  urgent: "text-[#f85149] bg-[#f85149]/10 border-[#f85149]/30",
  high: "text-primary bg-primary/10 border-primary/30",
  normal: "text-muted-foreground bg-secondary/50 border-border",
};

const categoryColors: Record<string, string> = {
  breaking: "text-[#f85149]",
  markets: "text-[#58a6ff]",
  banking: "text-[#3fb950]",
  economy: "text-primary",
  politics: "text-[#bc8cff]",
  energy: "text-[#f0883e]",
  technology: "text-[#58a6ff]",
  analysis: "text-[#8b949e]",
};

function formatTimestamp(timestamp: string, nowMs: number) {
  const date = new Date(timestamp);
  const diffMs = nowMs - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMins / 60);
  
  if (diffMins < 1) return "just now";
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  // Use UTC formatters to ensure server/client consistency
  const month = date.toLocaleDateString("en-US", { month: "short", timeZone: "UTC" });
  const day = date.getUTCDate();
  return `${month} ${day}`;
}

function formatTime(timestamp: string) {
  // Use UTC to ensure server/client consistency
  const date = new Date(timestamp);
  const hours = String(date.getUTCHours()).padStart(2, "0");
  const minutes = String(date.getUTCMinutes()).padStart(2, "0");
  return `${hours}:${minutes}`;
}

export default function NewsTerminalPage() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedRegion, setSelectedRegion] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedNews, setSelectedNews] = useState<NewsItem | null>(null);
  const [currentTimeStr, setCurrentTimeStr] = useState("--:--:--");
  const [nowMs, setNowMs] = useState(0);
  const [mounted, setMounted] = useState(false);
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [refreshTick, setRefreshTick] = useState(0);
  const [lastRefreshMs, setLastRefreshMs] = useState(0);
  const [refreshing, setRefreshing] = useState(false);

  // 15 minute interval in ms
  const REFRESH_INTERVAL_MS = 15 * 60 * 1000;

  useEffect(() => {
    setMounted(true);
    setLastRefreshMs(Date.now());
    const update = () => {
      const now = new Date();
      setNowMs(now.getTime());
      const hours = String(now.getUTCHours()).padStart(2, "0");
      const minutes = String(now.getUTCMinutes()).padStart(2, "0");
      const seconds = String(now.getUTCSeconds()).padStart(2, "0");
      setCurrentTimeStr(`${hours}:${minutes}:${seconds}`);
    };
    update();
    const timer = setInterval(update, 1000);
    return () => clearInterval(timer);
  }, []);

  // Trigger an actual refresh: brief loading state + bump tick + reset countdown
  const triggerRefresh = () => {
    setRefreshing(true);
    setRefreshTick((t) => t + 1);
    setLastRefreshMs(Date.now());
    // brief visual cue
    setTimeout(() => setRefreshing(false), 800);
  };

  // Auto-refresh every 15 minutes when enabled
  useEffect(() => {
    if (!autoRefresh || !mounted) return;
    const id = setInterval(() => {
      triggerRefresh();
    }, REFRESH_INTERVAL_MS);
    return () => clearInterval(id);
  }, [autoRefresh, mounted, REFRESH_INTERVAL_MS]);

  // Countdown to next refresh
  const nextRefreshIn = (() => {
    if (!mounted || !autoRefresh || !lastRefreshMs) return "";
    const elapsed = nowMs - lastRefreshMs;
    const remaining = Math.max(0, REFRESH_INTERVAL_MS - elapsed);
    const m = Math.floor(remaining / 60000);
    const s = Math.floor((remaining % 60000) / 1000);
    return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
  })();

  const filteredNews = useMemo(() => {
    let filtered = [...newsItems];
    
    if (selectedCategory !== "all") {
      filtered = filtered.filter(item => item.category === selectedCategory);
    }
    
    if (selectedRegion !== "all") {
      filtered = filtered.filter(item => item.region === selectedRegion);
    }
    
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(item => 
        item.headline.toLowerCase().includes(query) ||
        item.summary.toLowerCase().includes(query) ||
        item.tags.some(tag => tag.toLowerCase().includes(query))
      );
    }
    
    // Sort by priority then timestamp
    return filtered.sort((a, b) => {
      const priorityOrder = { urgent: 0, high: 1, normal: 2 };
      if (priorityOrder[a.priority] !== priorityOrder[b.priority]) {
        return priorityOrder[a.priority] - priorityOrder[b.priority];
      }
      return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
    });
    // refreshTick included so the list re-evaluates on each 15-min refresh
  }, [selectedCategory, selectedRegion, searchQuery, refreshTick]);

  const breakingCount = newsItems.filter(n => n.priority === "urgent").length;
  const todayCount = newsItems.length;

  return (
    <div className="min-h-screen bg-background">
      {/* Terminal Header */}
      <div className="sticky top-0 z-50 border-b border-border bg-card">
        {/* Status Bar */}
        <div className="flex items-center justify-between border-b border-border bg-secondary/30 px-4 py-2">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 animate-pulse rounded-full bg-[#3fb950]" />
              <span className="font-mono text-xs text-[#3fb950]">LIVE FEED</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <AlertTriangle className="h-3 w-3 text-[#f85149]" />
              <span className="font-mono">{breakingCount} BREAKING</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <FileText className="h-3 w-3" />
              <span className="font-mono">{todayCount} STORIES</span>
            </div>
          </div>
          
          <div className="flex items-center gap-6">
            <button
              onClick={triggerRefresh}
              disabled={refreshing}
              title="Refresh now"
              className="flex items-center gap-2 font-mono text-xs text-muted-foreground transition-colors hover:text-primary disabled:opacity-50"
            >
              <RefreshCw className={`h-3 w-3 ${refreshing ? "animate-spin text-primary" : ""}`} />
              {refreshing ? "REFRESHING..." : "REFRESH NOW"}
            </button>
            <button
              onClick={() => setAutoRefresh(!autoRefresh)}
              className={`flex items-center gap-2 font-mono text-xs transition-colors ${
                autoRefresh ? "text-[#3fb950]" : "text-muted-foreground"
              }`}
            >
              <span
                className={`h-1.5 w-1.5 rounded-full ${
                  autoRefresh ? "animate-pulse bg-[#3fb950]" : "bg-muted-foreground"
                }`}
              />
              AUTO-REFRESH {autoRefresh ? "ON" : "OFF"}
              {autoRefresh && nextRefreshIn && (
                <span className="ml-1 text-muted-foreground" suppressHydrationWarning>
                  / NEXT {nextRefreshIn}
                </span>
              )}
            </button>
            <div className="flex items-center gap-2 font-mono text-xs text-muted-foreground">
              <Clock className="h-3 w-3" />
              <span suppressHydrationWarning>{currentTimeStr}</span>
              <span className="text-primary">UTC</span>
            </div>
          </div>
        </div>

        {/* Title Bar */}
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3">
              <Terminal className="h-6 w-6 text-primary" />
              <div>
                <h1 className="text-xl font-bold tracking-tight text-foreground">
                  CI News Terminal
                </h1>
                <p className="text-xs text-muted-foreground">
                  Real-time MENA financial intelligence
                </p>
              </div>
            </div>
          </div>

          {/* Search */}
          <div className="relative w-80">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search news, tags, topics..."
              className="w-full border border-border bg-background py-2.5 pl-10 pr-4 font-mono text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>
        </div>

        {/* Filter Bar */}
        <div className="flex items-center gap-4 border-t border-border px-6 py-3">
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-muted-foreground" />
            <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Filter:
            </span>
          </div>

          {/* Categories */}
          <div className="flex items-center gap-1">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium transition-colors ${
                  selectedCategory === cat.id
                    ? "border border-primary bg-primary/10 text-primary"
                    : "border border-transparent text-muted-foreground hover:bg-secondary hover:text-foreground"
                }`}
              >
                <cat.icon className="h-3 w-3" />
                {cat.label}
              </button>
            ))}
          </div>

          <div className="h-4 w-px bg-border" />

          {/* Regions */}
          <div className="flex items-center gap-1">
            {regions.map((region) => (
              <button
                key={region.id}
                onClick={() => setSelectedRegion(region.id)}
                className={`px-3 py-1.5 text-xs font-medium transition-colors ${
                  selectedRegion === region.id
                    ? "border border-primary bg-primary/10 text-primary"
                    : "border border-transparent text-muted-foreground hover:bg-secondary hover:text-foreground"
                }`}
              >
                {region.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex">
        {/* News Feed */}
        <div className={`flex-1 ${selectedNews ? "border-r border-border" : ""}`}>
          <div className="divide-y divide-border">
            {filteredNews.map((news) => (
              <article
                key={news.id}
                onClick={() => setSelectedNews(news)}
                className={`cursor-pointer px-6 py-5 transition-colors hover:bg-secondary/30 ${
                  selectedNews?.id === news.id ? "bg-secondary/50" : ""
                }`}
              >
                {/* News Header */}
                <div className="mb-3 flex items-start justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <span className={`border px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${priorityColors[news.priority]}`}>
                      {news.priority === "urgent" ? "URGENT" : news.priority === "high" ? "HIGH" : news.category}
                    </span>
                    <span className={`text-xs font-semibold uppercase ${categoryColors[news.category]}`}>
                      {news.category}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {news.region.toUpperCase()}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <span className="font-mono">{formatTime(news.timestamp)}</span>
                    <span className="text-primary" suppressHydrationWarning>
                      {mounted ? formatTimestamp(news.timestamp, nowMs) : ""}
                    </span>
                  </div>
                </div>

                {/* Headline */}
                <h2 className={`mb-3 text-base font-semibold leading-relaxed ${
                  news.priority === "urgent" ? "text-[#f85149]" : "text-foreground"
                }`}>
                  {news.headline}
                </h2>

                {/* Summary */}
                <p className="mb-4 text-sm leading-relaxed text-muted-foreground">
                  {news.summary}
                </p>

                {/* Footer */}
                <div className="flex items-center justify-between">
                  <div className="flex flex-wrap gap-2">
                    {news.tags.slice(0, 4).map((tag) => (
                      <span
                        key={tag}
                        className="border border-border bg-secondary/50 px-2 py-0.5 text-[10px] text-muted-foreground"
                      >
                        {tag}
                      </span>
                    ))}
                    {news.tags.length > 4 && (
                      <span className="text-[10px] text-muted-foreground">
                        +{news.tags.length - 4} more
                      </span>
                    )}
                  </div>
                  <span className="font-mono text-[10px] text-primary">
                    {news.source}
                  </span>
                </div>
              </article>
            ))}
          </div>

          {filteredNews.length === 0 && (
            <div className="flex flex-col items-center justify-center py-20">
              <Search className="mb-4 h-12 w-12 text-muted-foreground/50" />
              <p className="mb-2 text-lg font-semibold text-foreground">No news found</p>
              <p className="text-sm text-muted-foreground">
                Try adjusting your filters or search query
              </p>
            </div>
          )}
        </div>

        {/* Detail Panel */}
        {selectedNews && (
          <div className="sticky top-[180px] h-[calc(100vh-180px)] w-[500px] overflow-y-auto bg-card">
            <div className="border-b border-border bg-secondary/30 px-6 py-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold uppercase tracking-wider text-primary">
                  Story Detail
                </span>
                <button
                  onClick={() => setSelectedNews(null)}
                  className="text-xs text-muted-foreground hover:text-foreground"
                >
                  Close
                </button>
              </div>
            </div>

            <div className="p-6">
              {/* Priority Badge */}
              <div className="mb-4 flex items-center gap-3">
                <span className={`border px-2 py-1 text-xs font-bold uppercase tracking-wider ${priorityColors[selectedNews.priority]}`}>
                  {selectedNews.priority}
                </span>
                <span className={`text-sm font-semibold uppercase ${categoryColors[selectedNews.category]}`}>
                  {selectedNews.category}
                </span>
              </div>

              {/* Headline */}
              <h2 className={`mb-6 text-xl font-bold leading-relaxed ${
                selectedNews.priority === "urgent" ? "text-[#f85149]" : "text-foreground"
              }`}>
                {selectedNews.headline}
              </h2>

              {/* Meta */}
              <div className="mb-6 grid grid-cols-2 gap-4 border border-border bg-secondary/30 p-4">
                <div>
                  <p className="mb-1 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                    Source
                  </p>
                  <p className="font-mono text-sm text-primary">{selectedNews.source}</p>
                </div>
                <div>
                  <p className="mb-1 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                    Region
                  </p>
                  <p className="text-sm text-foreground">{selectedNews.region.toUpperCase()}</p>
                </div>
                <div>
                  <p className="mb-1 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                    Time
                  </p>
                  <p className="font-mono text-sm text-foreground">
                    {(() => {
                      const d = new Date(selectedNews.timestamp);
                      const month = d.toLocaleDateString("en-US", { month: "short", timeZone: "UTC" });
                      const day = d.getUTCDate();
                      const h = String(d.getUTCHours()).padStart(2, "0");
                      const m = String(d.getUTCMinutes()).padStart(2, "0");
                      return `${month} ${day}, ${h}:${m}`;
                    })()}
                  </p>
                </div>
                <div>
                  <p className="mb-1 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                    ID
                  </p>
                  <p className="font-mono text-sm text-muted-foreground">{selectedNews.id}</p>
                </div>
              </div>

              {/* Summary */}
              <div className="mb-6">
                <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Summary
                </p>
                <p className="text-sm leading-relaxed text-foreground">
                  {selectedNews.summary}
                </p>
              </div>

              {/* Tags */}
              <div className="mb-6">
                <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Related Tags
                </p>
                <div className="flex flex-wrap gap-2">
                  {selectedNews.tags.map((tag) => (
                    <button
                      key={tag}
                      onClick={() => {
                        setSearchQuery(tag);
                        setSelectedNews(null);
                      }}
                      className="border border-border bg-secondary/50 px-3 py-1.5 text-xs text-muted-foreground transition-colors hover:border-primary hover:text-primary"
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="space-y-3">
                <Link
                  href="/newsletters"
                  className="flex w-full items-center justify-center gap-2 border border-primary bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
                >
                  Subscribe for Full Coverage
                  <ChevronRight className="h-4 w-4" />
                </Link>
                <button className="flex w-full items-center justify-center gap-2 border border-border bg-secondary px-4 py-3 text-sm font-medium text-foreground transition-colors hover:bg-secondary/80">
                  Share Story
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
