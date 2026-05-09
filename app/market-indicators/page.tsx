"use client";

import { useEffect, useState } from "react";
import {
  Activity,
  ArrowDown,
  ArrowUp,
  BarChart3,
  Clock,
  Database,
  Filter,
  Gauge,
  Globe2,
  LineChart as LineIcon,
  Maximize2,
  RefreshCw,
  Settings,
  TrendingUp,
} from "lucide-react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  commodities,
  fearGreedIndex,
  fxRates,
  indexKpis,
  indexTrend,
  regionalMarkets,
  sectorPerformance,
  sentimentBreakdown,
  volumeProfile,
  yieldCurve,
} from "@/lib/market-data";

const PRIMARY = "#f89820";
const CYAN = "#58a6ff";
const GREEN = "#3fb950";
const RED = "#f85149";
const VIOLET = "#a371f7";
const MUTED = "#8b949e";

function StatusBar() {
  const [mounted, setMounted] = useState(false);
  const [time, setTime] = useState("--:--:--");

  useEffect(() => {
    setMounted(true);
    const update = () => {
      const d = new Date();
      const hh = String(d.getUTCHours()).padStart(2, "0");
      const mm = String(d.getUTCMinutes()).padStart(2, "0");
      const ss = String(d.getUTCSeconds()).padStart(2, "0");
      setTime(`${hh}:${mm}:${ss}`);
    };
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="flex flex-wrap items-center justify-between gap-3 border border-border bg-card px-4 py-3">
      <div className="flex flex-wrap items-center gap-3 text-xs uppercase tracking-widest text-muted-foreground">
        <span className="flex items-center gap-2 text-primary">
          <Activity className="h-3.5 w-3.5" />
          MKT-IND-DASH
        </span>
        <span className="hidden h-3 w-px bg-border md:block" />
        <span className="flex items-center gap-1.5">
          <span className="h-2 w-2 animate-pulse rounded-full bg-[#3fb950]" />
          LIVE
        </span>
        <span className="hidden h-3 w-px bg-border md:block" />
        <span className="flex items-center gap-1.5">
          <Database className="h-3 w-3" />
          12 SOURCES
        </span>
      </div>
      <div className="flex items-center gap-3 font-mono text-xs text-muted-foreground">
        <span className="flex items-center gap-1.5" suppressHydrationWarning>
          <Clock className="h-3 w-3" />
          {mounted ? time : "--:--:--"}
          <span className="text-primary">UTC</span>
        </span>
        <button className="flex items-center gap-1.5 border border-border bg-background px-2 py-1 text-muted-foreground transition-colors hover:border-primary hover:text-primary">
          <RefreshCw className="h-3 w-3" />
          REFRESH
        </button>
        <button className="flex items-center gap-1.5 border border-border bg-background px-2 py-1 text-muted-foreground transition-colors hover:border-primary hover:text-primary">
          <Settings className="h-3 w-3" />
        </button>
      </div>
    </div>
  );
}

function PanelHeader({
  code,
  title,
  icon: Icon,
  hint,
}: {
  code: string;
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  hint?: string;
}) {
  return (
    <div className="flex items-center justify-between border-b border-border bg-secondary/40 px-4 py-2.5">
      <div className="flex items-center gap-2.5">
        <Icon className="h-3.5 w-3.5 text-primary" />
        <span className="font-mono text-[11px] text-primary">[{code}]</span>
        <span className="text-xs font-semibold uppercase tracking-widest text-foreground">
          {title}
        </span>
      </div>
      <div className="flex items-center gap-2">
        {hint && (
          <span className="hidden font-mono text-[10px] uppercase tracking-widest text-muted-foreground md:inline">
            {hint}
          </span>
        )}
        <button
          className="text-muted-foreground transition-colors hover:text-primary"
          aria-label="Maximize panel"
        >
          <Maximize2 className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  );
}

function KpiTile({ kpi }: { kpi: (typeof indexKpis)[number] }) {
  const positive = kpi.change >= 0;
  return (
    <div className="border border-border bg-card p-4 transition-colors hover:border-primary/60">
      <div className="flex items-center justify-between">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
            {kpi.region} / {kpi.symbol}
          </p>
          <p className="mt-1 text-sm font-semibold text-foreground">{kpi.name}</p>
        </div>
        <span
          className={`flex items-center gap-0.5 rounded border px-1.5 py-0.5 font-mono text-[10px] ${
            positive
              ? "border-[#3fb950]/40 bg-[#3fb950]/10 text-[#3fb950]"
              : "border-[#f85149]/40 bg-[#f85149]/10 text-[#f85149]"
          }`}
        >
          {positive ? <ArrowUp className="h-2.5 w-2.5" /> : <ArrowDown className="h-2.5 w-2.5" />}
          {positive ? "+" : ""}
          {kpi.changePct.toFixed(2)}%
        </span>
      </div>
      <p className="mt-3 font-mono text-2xl tabular-nums text-foreground">
        {kpi.value.toLocaleString("en-US", { minimumFractionDigits: 2 })}
      </p>
      <div className="mt-3 grid grid-cols-3 gap-2 border-t border-border pt-3 font-mono text-[10px] text-muted-foreground">
        <div>
          <p className="uppercase tracking-widest">High</p>
          <p className="text-foreground">{kpi.high.toLocaleString("en-US")}</p>
        </div>
        <div>
          <p className="uppercase tracking-widest">Low</p>
          <p className="text-foreground">{kpi.low.toLocaleString("en-US")}</p>
        </div>
        <div className="text-right">
          <p className="uppercase tracking-widest">Vol</p>
          <p className="text-foreground">{kpi.volume}</p>
        </div>
      </div>
    </div>
  );
}

const tooltipStyle = {
  backgroundColor: "#0d1117",
  border: "1px solid #30363d",
  borderRadius: 0,
  fontFamily: "var(--font-mono)",
  fontSize: 11,
  color: "#e6edf3",
};

const tooltipItemStyle = { color: "#e6edf3" };
const tooltipLabelStyle = { color: "#f89820", fontWeight: 600 };

export default function MarketIndicatorsPage() {
  return (
    <main className="min-h-screen bg-background">
      <div className="mx-auto max-w-[1600px] px-4 py-8 md:px-6 md:py-12">
        {/* Page header */}
        <div className="mb-6">
          <p className="font-mono text-[11px] uppercase tracking-widest text-primary">
            [DASH-001] / MARKET-INTELLIGENCE
          </p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            Market Indicators Dashboard
          </h1>
          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-muted-foreground">
            A consolidated view of global equity indices, currencies, commodities, fixed income,
            and sentiment indicators. Designed in the spirit of a Sisense analytics dashboard for
            real-time monitoring of capital markets.
          </p>
        </div>

        {/* Status bar */}
        <div className="mb-4">
          <StatusBar />
        </div>

        {/* Filter chips */}
        <div className="mb-6 flex flex-wrap items-center gap-2">
          <span className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
            <Filter className="h-3 w-3" />
            Filters
          </span>
          {["Global", "Americas", "EMEA", "APAC", "MENA", "Lebanon"].map((f, i) => (
            <button
              key={f}
              className={`border px-3 py-1 font-mono text-[11px] uppercase tracking-widest transition-colors ${
                i === 0
                  ? "border-primary bg-primary/10 text-primary"
                  : "border-border bg-card text-muted-foreground hover:border-primary/60 hover:text-primary"
              }`}
            >
              {f}
            </button>
          ))}
          <span className="ml-auto font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
            Last update <span className="text-foreground">2 sec ago</span>
          </span>
        </div>

        {/* KPI grid */}
        <section className="mb-6 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {indexKpis.map((kpi) => (
            <KpiTile key={kpi.symbol} kpi={kpi} />
          ))}
        </section>

        {/* Row 1: Index trend (large) + Sentiment + Fear & Greed */}
        <section className="mb-4 grid grid-cols-1 gap-4 lg:grid-cols-3">
          <div className="border border-border bg-card lg:col-span-2">
            <PanelHeader
              code="IDX-TRD"
              title="US Index Intraday Trend"
              icon={LineIcon}
              hint="15-min granularity"
            />
            <div className="p-4">
              <div className="mb-3 flex flex-wrap gap-4 font-mono text-[10px] uppercase tracking-widest">
                <span className="flex items-center gap-2 text-foreground">
                  <span className="h-2 w-2" style={{ backgroundColor: PRIMARY }} />
                  S&amp;P 500
                </span>
                <span className="flex items-center gap-2 text-foreground">
                  <span className="h-2 w-2" style={{ backgroundColor: CYAN }} />
                  NASDAQ
                </span>
                <span className="flex items-center gap-2 text-foreground">
                  <span className="h-2 w-2" style={{ backgroundColor: VIOLET }} />
                  DOW
                </span>
              </div>
              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={indexTrend} margin={{ top: 8, right: 12, bottom: 0, left: 0 }}>
                    <defs>
                      <linearGradient id="spxGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor={PRIMARY} stopOpacity={0.4} />
                        <stop offset="100%" stopColor={PRIMARY} stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid stroke="#30363d" strokeDasharray="2 4" vertical={false} />
                    <XAxis
                      dataKey="t"
                      stroke={MUTED}
                      tick={{ fill: MUTED, fontSize: 10, fontFamily: "var(--font-mono)" }}
                      tickLine={false}
                      axisLine={{ stroke: "#30363d" }}
                    />
                    <YAxis
                      yAxisId="spx"
                      stroke={MUTED}
                      tick={{ fill: MUTED, fontSize: 10, fontFamily: "var(--font-mono)" }}
                      tickLine={false}
                      axisLine={{ stroke: "#30363d" }}
                      domain={["dataMin - 5", "dataMax + 5"]}
                    />
                    <YAxis
                      yAxisId="ndx"
                      orientation="right"
                      stroke={MUTED}
                      tick={{ fill: MUTED, fontSize: 10, fontFamily: "var(--font-mono)" }}
                      tickLine={false}
                      axisLine={{ stroke: "#30363d" }}
                      domain={["dataMin - 30", "dataMax + 30"]}
                    />
                    <Tooltip
                      contentStyle={tooltipStyle}
                      itemStyle={tooltipItemStyle}
                      labelStyle={tooltipLabelStyle}
                    />
                    <Area
                      yAxisId="spx"
                      type="monotone"
                      dataKey="spx"
                      stroke={PRIMARY}
                      strokeWidth={1.8}
                      fill="url(#spxGrad)"
                      name="S&P 500"
                    />
                    <Line
                      yAxisId="ndx"
                      type="monotone"
                      dataKey="ndx"
                      stroke={CYAN}
                      strokeWidth={1.5}
                      dot={false}
                      name="NASDAQ"
                    />
                    <Line
                      yAxisId="spx"
                      type="monotone"
                      dataKey="dji"
                      stroke={VIOLET}
                      strokeWidth={1.2}
                      strokeDasharray="3 3"
                      dot={false}
                      name="DOW"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          <div className="border border-border bg-card">
            <PanelHeader code="SNT-MIX" title="Sentiment Mix" icon={Gauge} hint="Last 24h" />
            <div className="p-4">
              <div className="h-[180px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={sentimentBreakdown}
                      dataKey="value"
                      nameKey="label"
                      cx="50%"
                      cy="50%"
                      innerRadius={45}
                      outerRadius={70}
                      stroke="#0d1117"
                      strokeWidth={2}
                    >
                      {sentimentBreakdown.map((s) => (
                        <Cell key={s.label} fill={s.color} />
                      ))}
                    </Pie>
                    <Tooltip contentStyle={tooltipStyle} itemStyle={tooltipItemStyle} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <ul className="mt-2 space-y-1.5 font-mono text-[11px]">
                {sentimentBreakdown.map((s) => (
                  <li key={s.label} className="flex items-center justify-between">
                    <span className="flex items-center gap-2 text-foreground">
                      <span className="h-2 w-2" style={{ backgroundColor: s.color }} />
                      {s.label}
                    </span>
                    <span className="tabular-nums text-muted-foreground">{s.value}%</span>
                  </li>
                ))}
              </ul>

              <div className="mt-4 border-t border-border pt-4">
                <div className="flex items-center justify-between">
                  <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                    Fear &amp; Greed
                  </p>
                  <p className="font-mono text-[10px] uppercase tracking-widest text-[#3fb950]">
                    Greed
                  </p>
                </div>
                <div className="mt-2 h-2 w-full bg-secondary">
                  <div
                    className="h-full bg-gradient-to-r from-[#f85149] via-[#f89820] to-[#3fb950]"
                    style={{ width: `${fearGreedIndex}%` }}
                  />
                </div>
                <div className="mt-1 flex justify-between font-mono text-[9px] text-muted-foreground">
                  <span>0</span>
                  <span className="font-bold text-foreground">{fearGreedIndex}</span>
                  <span>100</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Row 2: Sector + Yield curve + Volume */}
        <section className="mb-4 grid grid-cols-1 gap-4 lg:grid-cols-3">
          <div className="border border-border bg-card">
            <PanelHeader code="SCT-PFM" title="Sector Performance" icon={BarChart3} hint="Daily %" />
            <div className="p-4">
              <div className="h-[280px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={sectorPerformance}
                    layout="vertical"
                    margin={{ top: 0, right: 24, bottom: 0, left: 8 }}
                  >
                    <CartesianGrid stroke="#30363d" strokeDasharray="2 4" horizontal={false} />
                    <XAxis
                      type="number"
                      stroke={MUTED}
                      tick={{ fill: MUTED, fontSize: 10, fontFamily: "var(--font-mono)" }}
                      tickLine={false}
                      axisLine={{ stroke: "#30363d" }}
                    />
                    <YAxis
                      type="category"
                      dataKey="name"
                      width={92}
                      stroke={MUTED}
                      tick={{ fill: MUTED, fontSize: 10, fontFamily: "var(--font-mono)" }}
                      tickLine={false}
                      axisLine={{ stroke: "#30363d" }}
                    />
                    <Tooltip
                      contentStyle={tooltipStyle}
                      itemStyle={tooltipItemStyle}
                      labelStyle={tooltipLabelStyle}
                      cursor={{ fill: "rgba(248, 152, 32, 0.06)" }}
                    />
                    <Bar dataKey="pct" radius={0}>
                      {sectorPerformance.map((s) => (
                        <Cell key={s.name} fill={s.pct >= 0 ? GREEN : RED} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          <div className="border border-border bg-card">
            <PanelHeader code="YLD-CRV" title="Sovereign Yield Curve" icon={TrendingUp} hint="%" />
            <div className="p-4">
              <div className="mb-3 flex flex-wrap gap-4 font-mono text-[10px] uppercase tracking-widest">
                <span className="flex items-center gap-2 text-foreground">
                  <span className="h-2 w-2" style={{ backgroundColor: PRIMARY }} />
                  US
                </span>
                <span className="flex items-center gap-2 text-foreground">
                  <span className="h-2 w-2" style={{ backgroundColor: CYAN }} />
                  UK
                </span>
                <span className="flex items-center gap-2 text-foreground">
                  <span className="h-2 w-2" style={{ backgroundColor: VIOLET }} />
                  DE
                </span>
              </div>
              <div className="h-[240px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={yieldCurve} margin={{ top: 8, right: 12, bottom: 0, left: 0 }}>
                    <CartesianGrid stroke="#30363d" strokeDasharray="2 4" vertical={false} />
                    <XAxis
                      dataKey="tenor"
                      stroke={MUTED}
                      tick={{ fill: MUTED, fontSize: 10, fontFamily: "var(--font-mono)" }}
                      tickLine={false}
                      axisLine={{ stroke: "#30363d" }}
                    />
                    <YAxis
                      stroke={MUTED}
                      tick={{ fill: MUTED, fontSize: 10, fontFamily: "var(--font-mono)" }}
                      tickLine={false}
                      axisLine={{ stroke: "#30363d" }}
                      domain={[2, 6]}
                    />
                    <Tooltip
                      contentStyle={tooltipStyle}
                      itemStyle={tooltipItemStyle}
                      labelStyle={tooltipLabelStyle}
                    />
                    <Line type="monotone" dataKey="us" stroke={PRIMARY} strokeWidth={1.8} dot={{ r: 3, fill: PRIMARY }} />
                    <Line type="monotone" dataKey="uk" stroke={CYAN} strokeWidth={1.5} dot={{ r: 3, fill: CYAN }} />
                    <Line type="monotone" dataKey="de" stroke={VIOLET} strokeWidth={1.5} dot={{ r: 3, fill: VIOLET }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          <div className="border border-border bg-card">
            <PanelHeader code="VOL-PRF" title="Trading Volume Profile" icon={BarChart3} hint="M shares" />
            <div className="p-4">
              <div className="h-[240px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={volumeProfile} margin={{ top: 8, right: 12, bottom: 0, left: 0 }}>
                    <CartesianGrid stroke="#30363d" strokeDasharray="2 4" vertical={false} />
                    <XAxis
                      dataKey="hour"
                      stroke={MUTED}
                      tick={{ fill: MUTED, fontSize: 10, fontFamily: "var(--font-mono)" }}
                      tickLine={false}
                      axisLine={{ stroke: "#30363d" }}
                    />
                    <YAxis
                      stroke={MUTED}
                      tick={{ fill: MUTED, fontSize: 10, fontFamily: "var(--font-mono)" }}
                      tickLine={false}
                      axisLine={{ stroke: "#30363d" }}
                    />
                    <Tooltip
                      contentStyle={tooltipStyle}
                      itemStyle={tooltipItemStyle}
                      labelStyle={tooltipLabelStyle}
                      cursor={{ fill: "rgba(88, 166, 255, 0.08)" }}
                    />
                    <Bar dataKey="volume" fill={CYAN} radius={0} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-3 grid grid-cols-3 gap-2 border-t border-border pt-3 font-mono text-[10px]">
                <div>
                  <p className="uppercase tracking-widest text-muted-foreground">Total</p>
                  <p className="text-foreground">4,635M</p>
                </div>
                <div>
                  <p className="uppercase tracking-widest text-muted-foreground">Avg/Hr</p>
                  <p className="text-foreground">579M</p>
                </div>
                <div className="text-right">
                  <p className="uppercase tracking-widest text-muted-foreground">Peak</p>
                  <p className="text-foreground">16:00 UTC</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Row 3: FX + Commodities + Regional */}
        <section className="mb-4 grid grid-cols-1 gap-4 lg:grid-cols-3">
          {/* FX */}
          <div className="border border-border bg-card">
            <PanelHeader code="FX-RTS" title="Currency Rates" icon={Globe2} hint="Spot bid / ask" />
            <div className="overflow-x-auto">
              <table className="w-full font-mono text-xs">
                <thead>
                  <tr className="border-b border-border bg-secondary/30 text-[10px] uppercase tracking-widest text-muted-foreground">
                    <th className="px-4 py-2 text-left">Pair</th>
                    <th className="px-4 py-2 text-right">Bid</th>
                    <th className="px-4 py-2 text-right">Ask</th>
                    <th className="px-4 py-2 text-right">Δ %</th>
                  </tr>
                </thead>
                <tbody>
                  {fxRates.map((fx) => (
                    <tr
                      key={fx.pair}
                      className="border-b border-border/60 transition-colors hover:bg-secondary/40"
                    >
                      <td className="px-4 py-2.5 text-foreground">{fx.pair}</td>
                      <td className="px-4 py-2.5 text-right tabular-nums text-foreground">
                        {fx.bid.toFixed(fx.pair.includes("JPY") ? 2 : 4)}
                      </td>
                      <td className="px-4 py-2.5 text-right tabular-nums text-foreground">
                        {fx.ask.toFixed(fx.pair.includes("JPY") ? 2 : 4)}
                      </td>
                      <td
                        className={`px-4 py-2.5 text-right tabular-nums ${
                          fx.changePct > 0
                            ? "text-[#3fb950]"
                            : fx.changePct < 0
                            ? "text-[#f85149]"
                            : "text-muted-foreground"
                        }`}
                      >
                        {fx.changePct > 0 ? "+" : ""}
                        {fx.changePct.toFixed(2)}%
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Commodities */}
          <div className="border border-border bg-card">
            <PanelHeader code="COM-RTS" title="Commodities" icon={Activity} hint="Spot" />
            <div className="overflow-x-auto">
              <table className="w-full font-mono text-xs">
                <thead>
                  <tr className="border-b border-border bg-secondary/30 text-[10px] uppercase tracking-widest text-muted-foreground">
                    <th className="px-4 py-2 text-left">Symbol</th>
                    <th className="px-4 py-2 text-left">Name</th>
                    <th className="px-4 py-2 text-right">Price</th>
                    <th className="px-4 py-2 text-right">Δ %</th>
                  </tr>
                </thead>
                <tbody>
                  {commodities.map((c) => (
                    <tr
                      key={c.symbol}
                      className="border-b border-border/60 transition-colors hover:bg-secondary/40"
                    >
                      <td className="px-4 py-2.5 text-primary">{c.symbol}</td>
                      <td className="px-4 py-2.5 text-foreground">{c.name}</td>
                      <td className="px-4 py-2.5 text-right tabular-nums text-foreground">
                        {c.value.toLocaleString("en-US", { minimumFractionDigits: 2 })}
                        <span className="ml-1 text-[10px] text-muted-foreground">{c.unit}</span>
                      </td>
                      <td
                        className={`px-4 py-2.5 text-right tabular-nums ${
                          c.changePct >= 0 ? "text-[#3fb950]" : "text-[#f85149]"
                        }`}
                      >
                        {c.changePct >= 0 ? "+" : ""}
                        {c.changePct.toFixed(2)}%
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Regional */}
          <div className="border border-border bg-card">
            <PanelHeader code="REG-MKT" title="MENA & Regional" icon={Globe2} hint="Local time" />
            <div className="overflow-x-auto">
              <table className="w-full font-mono text-xs">
                <thead>
                  <tr className="border-b border-border bg-secondary/30 text-[10px] uppercase tracking-widest text-muted-foreground">
                    <th className="px-4 py-2 text-left">Market</th>
                    <th className="px-4 py-2 text-left">Index</th>
                    <th className="px-4 py-2 text-right">Δ %</th>
                    <th className="px-4 py-2 text-center">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {regionalMarkets.map((r) => (
                    <tr
                      key={r.market}
                      className="border-b border-border/60 transition-colors hover:bg-secondary/40"
                    >
                      <td className="px-4 py-2.5 text-foreground">{r.market}</td>
                      <td className="px-4 py-2.5 text-muted-foreground">{r.index}</td>
                      <td
                        className={`px-4 py-2.5 text-right tabular-nums ${
                          r.changePct >= 0 ? "text-[#3fb950]" : "text-[#f85149]"
                        }`}
                      >
                        {r.changePct >= 0 ? "+" : ""}
                        {r.changePct.toFixed(2)}%
                      </td>
                      <td className="px-4 py-2.5 text-center">
                        <span
                          className={`inline-flex items-center gap-1 border px-1.5 py-0.5 text-[9px] uppercase tracking-widest ${
                            r.status === "open"
                              ? "border-[#3fb950]/40 bg-[#3fb950]/10 text-[#3fb950]"
                              : "border-border bg-secondary text-muted-foreground"
                          }`}
                        >
                          <span
                            className={`h-1.5 w-1.5 rounded-full ${
                              r.status === "open" ? "animate-pulse bg-[#3fb950]" : "bg-muted-foreground"
                            }`}
                          />
                          {r.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Footer note */}
        <p className="mt-6 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
          Data shown is illustrative for dashboard demonstration purposes. Production builds connect
          to real-time CapitalIssues market feeds.
        </p>
      </div>
    </main>
  );
}
