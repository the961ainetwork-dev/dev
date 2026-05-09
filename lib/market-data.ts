// Static deterministic market dataset (no Math.random / Date.now to avoid SSR/CSR drift).
// Values are illustrative and shaped to look like a Sisense-style terminal dashboard.

export type IndexKpi = {
  symbol: string;
  name: string;
  region: string;
  value: number;
  change: number;
  changePct: number;
  high: number;
  low: number;
  volume: string;
};

export const indexKpis: IndexKpi[] = [
  { symbol: "SPX",   name: "S&P 500",     region: "US",    value: 5234.18, change: 23.55, changePct: 0.45, high: 5241.20, low: 5198.40, volume: "3.21B" },
  { symbol: "DJI",   name: "Dow Jones",   region: "US",    value: 39127.80, change: -47.21, changePct: -0.12, high: 39220.10, low: 39044.55, volume: "412M" },
  { symbol: "IXIC",  name: "Nasdaq",      region: "US",    value: 16439.22, change: 127.42, changePct: 0.78, high: 16472.88, low: 16312.40, volume: "5.18B" },
  { symbol: "FTSE",  name: "FTSE 100",    region: "UK",    value: 8144.13, change: 26.81, changePct: 0.33, high: 8157.20, low: 8112.45, volume: "780M" },
  { symbol: "DAX",   name: "DAX",         region: "DE",    value: 18233.45, change: 81.20, changePct: 0.45, high: 18260.10, low: 18180.55, volume: "92M" },
  { symbol: "N225",  name: "Nikkei 225",  region: "JP",    value: 39098.68, change: -218.40, changePct: -0.56, high: 39320.55, low: 39001.20, volume: "1.84B" },
  { symbol: "HSI",   name: "Hang Seng",   region: "HK",    value: 17621.40, change: 153.20, changePct: 0.88, high: 17680.10, low: 17480.30, volume: "2.10B" },
  { symbol: "SSE",   name: "SSE Comp.",   region: "CN",    value: 3104.82, change: -12.35, changePct: -0.40, high: 3120.20, low: 3092.10, volume: "—" },
];

export type IndexTrendPoint = {
  t: string; // HH:MM (UTC)
  spx: number;
  ndx: number;
  dji: number;
};

// Intraday-style (15-minute increments) — handcrafted to look realistic
export const indexTrend: IndexTrendPoint[] = [
  { t: "09:30", spx: 5210.40, ndx: 16280.10, dji: 39160.00 },
  { t: "09:45", spx: 5215.20, ndx: 16295.40, dji: 39150.20 },
  { t: "10:00", spx: 5220.10, ndx: 16310.55, dji: 39142.80 },
  { t: "10:15", spx: 5218.40, ndx: 16320.20, dji: 39130.10 },
  { t: "10:30", spx: 5222.85, ndx: 16335.60, dji: 39145.40 },
  { t: "10:45", spx: 5225.30, ndx: 16348.20, dji: 39158.20 },
  { t: "11:00", spx: 5228.60, ndx: 16360.10, dji: 39172.40 },
  { t: "11:15", spx: 5226.10, ndx: 16352.20, dji: 39160.10 },
  { t: "11:30", spx: 5230.40, ndx: 16370.55, dji: 39148.20 },
  { t: "11:45", spx: 5232.20, ndx: 16385.20, dji: 39140.40 },
  { t: "12:00", spx: 5235.10, ndx: 16400.40, dji: 39135.20 },
  { t: "12:15", spx: 5234.55, ndx: 16410.20, dji: 39130.40 },
  { t: "12:30", spx: 5232.20, ndx: 16415.40, dji: 39122.10 },
  { t: "12:45", spx: 5230.10, ndx: 16420.10, dji: 39118.20 },
  { t: "13:00", spx: 5234.18, ndx: 16439.22, dji: 39127.80 },
];

export type SectorPerf = {
  name: string;
  pct: number;
};

export const sectorPerformance: SectorPerf[] = [
  { name: "Energy",        pct: 1.84 },
  { name: "Technology",    pct: 1.42 },
  { name: "Financials",    pct: 0.78 },
  { name: "Industrials",   pct: 0.45 },
  { name: "Healthcare",    pct: 0.22 },
  { name: "Materials",     pct: 0.10 },
  { name: "Cons. Staples", pct: -0.18 },
  { name: "Utilities",     pct: -0.34 },
  { name: "Real Estate",   pct: -0.55 },
  { name: "Cons. Discr.",  pct: -0.92 },
];

export type CurrencyRow = {
  pair: string;
  bid: number;
  ask: number;
  changePct: number;
};

export const fxRates: CurrencyRow[] = [
  { pair: "EUR/USD", bid: 1.0847, ask: 1.0848, changePct: 0.15 },
  { pair: "GBP/USD", bid: 1.2718, ask: 1.2720, changePct: 0.32 },
  { pair: "USD/JPY", bid: 153.42, ask: 153.44, changePct: -0.21 },
  { pair: "USD/CHF", bid: 0.9054, ask: 0.9056, changePct: -0.18 },
  { pair: "AUD/USD", bid: 0.6612, ask: 0.6614, changePct: 0.45 },
  { pair: "USD/CAD", bid: 1.3624, ask: 1.3626, changePct: -0.10 },
  { pair: "USD/CNY", bid: 7.2345, ask: 7.2348, changePct: 0.05 },
  { pair: "USD/AED", bid: 3.6725, ask: 3.6730, changePct: 0.00 },
  { pair: "USD/SAR", bid: 3.7505, ask: 3.7510, changePct: 0.00 },
];

export type CommodityRow = {
  symbol: string;
  name: string;
  value: number;
  changePct: number;
  unit: string;
};

export const commodities: CommodityRow[] = [
  { symbol: "CL",  name: "WTI Crude",     value: 81.23,  changePct: 1.42, unit: "USD/bbl" },
  { symbol: "BZ",  name: "Brent Crude",   value: 85.18,  changePct: 1.18, unit: "USD/bbl" },
  { symbol: "NG",  name: "Natural Gas",   value: 2.78,   changePct: -0.35, unit: "USD/MMBtu" },
  { symbol: "GC",  name: "Gold",          value: 2338.40, changePct: 0.21, unit: "USD/oz" },
  { symbol: "SI",  name: "Silver",        value: 27.45,  changePct: 0.62, unit: "USD/oz" },
  { symbol: "HG",  name: "Copper",        value: 4.18,   changePct: 0.84, unit: "USD/lb" },
  { symbol: "PL",  name: "Platinum",      value: 928.40, changePct: -0.18, unit: "USD/oz" },
  { symbol: "ZW",  name: "Wheat",         value: 612.25, changePct: 1.05, unit: "USc/bu" },
];

export type YieldPoint = {
  tenor: string;
  us: number;
  uk: number;
  de: number;
};

export const yieldCurve: YieldPoint[] = [
  { tenor: "1M",  us: 5.42, uk: 5.18, de: 3.65 },
  { tenor: "3M",  us: 5.38, uk: 5.22, de: 3.70 },
  { tenor: "6M",  us: 5.28, uk: 5.10, de: 3.72 },
  { tenor: "1Y",  us: 4.95, uk: 4.85, de: 3.55 },
  { tenor: "2Y",  us: 4.62, uk: 4.42, de: 2.95 },
  { tenor: "5Y",  us: 4.32, uk: 4.05, de: 2.42 },
  { tenor: "10Y", us: 4.42, uk: 4.18, de: 2.48 },
  { tenor: "30Y", us: 4.58, uk: 4.55, de: 2.62 },
];

export type RegionalIndex = {
  market: string;
  index: string;
  value: number;
  changePct: number;
  status: "open" | "closed" | "pre" | "post";
};

export const regionalMarkets: RegionalIndex[] = [
  { market: "Lebanon",      index: "BLOM Stock Index", value: 1842.50, changePct: 0.42, status: "open" },
  { market: "Saudi Arabia", index: "TASI",             value: 12184.40, changePct: 0.85, status: "open" },
  { market: "UAE (Dubai)",  index: "DFM General",      value: 4218.60,  changePct: 0.32, status: "open" },
  { market: "UAE (Abu D.)", index: "ADX General",      value: 9342.10,  changePct: 0.22, status: "open" },
  { market: "Qatar",        index: "QE General",       value: 10240.40, changePct: -0.18, status: "open" },
  { market: "Kuwait",       index: "BKP All Share",    value: 7124.55,  changePct: 0.41, status: "open" },
  { market: "Egypt",        index: "EGX 30",           value: 28412.80, changePct: 1.24, status: "open" },
  { market: "Morocco",      index: "MASI",             value: 13218.40, changePct: 0.18, status: "closed" },
];

export type SentimentSlice = {
  label: string;
  value: number;
  color: string;
};

export const sentimentBreakdown: SentimentSlice[] = [
  { label: "Bullish",   value: 42, color: "#3fb950" },
  { label: "Neutral",   value: 33, color: "#58a6ff" },
  { label: "Bearish",   value: 25, color: "#f85149" },
];

export const fearGreedIndex = 64; // 0..100, "Greed"

export type VolumePoint = {
  hour: string;
  volume: number;
};

export const volumeProfile: VolumePoint[] = [
  { hour: "09", volume: 412 },
  { hour: "10", volume: 685 },
  { hour: "11", volume: 524 },
  { hour: "12", volume: 388 },
  { hour: "13", volume: 462 },
  { hour: "14", volume: 591 },
  { hour: "15", volume: 728 },
  { hour: "16", volume: 845 },
];
