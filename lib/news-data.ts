export interface NewsItem {
  id: string;
  headline: string;
  summary: string;
  category: "breaking" | "markets" | "banking" | "economy" | "politics" | "energy" | "technology" | "analysis";
  region: "lebanon" | "gcc" | "mena" | "global";
  timestamp: string;
  source: string;
  priority: "urgent" | "high" | "normal";
  tags: string[];
}

export const newsItems: NewsItem[] = [
  // BREAKING NEWS - Urgent
  {
    id: "news-001",
    headline: "BREAKING: Central Bank of Lebanon Announces Emergency Dollar Auction",
    summary: "BDL to inject $50M into market following sharp lira depreciation. Intervention aims to stabilize parallel market rate ahead of IMF review deadline.",
    category: "breaking",
    region: "lebanon",
    timestamp: "2024-01-15T08:32:00Z",
    source: "CI First",
    priority: "urgent",
    tags: ["BDL", "USD/LBP", "Intervention", "IMF"]
  },
  {
    id: "news-002",
    headline: "URGENT: Saudi Aramco Reports Q4 Earnings Beat, Dividend Maintained",
    summary: "Net income of $32.6B exceeds estimates by 4.2%. Board confirms $19.5B quarterly dividend despite oil price volatility concerns.",
    category: "breaking",
    region: "gcc",
    timestamp: "2024-01-15T07:45:00Z",
    source: "CI Markets",
    priority: "urgent",
    tags: ["Aramco", "Earnings", "Dividends", "Oil"]
  },
  {
    id: "news-003",
    headline: "FLASH: UAE Central Bank Raises Interest Rate by 25bps to 5.40%",
    summary: "Move follows Fed decision, marks sixth consecutive hike. Banking sector expects margin compression in H1 2024.",
    category: "breaking",
    region: "gcc",
    timestamp: "2024-01-15T06:15:00Z",
    source: "CI First",
    priority: "urgent",
    tags: ["CBUAE", "Interest Rates", "Monetary Policy"]
  },
  {
    id: "news-004",
    headline: "BREAKING: Egyptian Pound Hits Record Low Against Dollar",
    summary: "EGP falls to 50.85 per dollar in parallel market. CBE expected to announce further devaluation ahead of $3B IMF tranche release.",
    category: "breaking",
    region: "mena",
    timestamp: "2024-01-15T05:22:00Z",
    source: "CI First",
    priority: "urgent",
    tags: ["Egypt", "EGP", "Devaluation", "IMF"]
  },
  {
    id: "news-005",
    headline: "URGENT: Qatar Investment Authority Acquires 5% Stake in European Bank",
    summary: "QIA purchases €2.3B position in major European lender. Deal marks largest GCC sovereign wealth fund investment in EU banking sector since 2022.",
    category: "breaking",
    region: "gcc",
    timestamp: "2024-01-15T04:58:00Z",
    source: "CI First",
    priority: "urgent",
    tags: ["QIA", "Banking", "M&A", "Europe"]
  },

  // MARKETS - High Priority
  {
    id: "news-006",
    headline: "Dubai Financial Market Index Closes at 18-Month High",
    summary: "DFM General Index rises 2.3% to 4,215 points. Real estate and banking sectors lead gains on strong Q4 earnings expectations.",
    category: "markets",
    region: "gcc",
    timestamp: "2024-01-15T14:30:00Z",
    source: "CI Markets",
    priority: "high",
    tags: ["DFM", "Dubai", "Equities", "Real Estate"]
  },
  {
    id: "news-007",
    headline: "Beirut Stock Exchange Records Highest Daily Volume in 3 Years",
    summary: "BSE sees $12.4M in trading volume. Solidere shares surge 8.2% on reconstruction contract announcements.",
    category: "markets",
    region: "lebanon",
    timestamp: "2024-01-15T14:15:00Z",
    source: "CI Markets",
    priority: "high",
    tags: ["BSE", "Solidere", "Volume", "Reconstruction"]
  },
  {
    id: "news-008",
    headline: "Saudi Tadawul All Share Index Tests Key Resistance Level",
    summary: "TASI approaches 12,500 psychological barrier. Technical analysts eye breakout potential on petrochemical sector strength.",
    category: "markets",
    region: "gcc",
    timestamp: "2024-01-15T13:45:00Z",
    source: "CI Markets",
    priority: "high",
    tags: ["TASI", "Tadawul", "Technical Analysis"]
  },
  {
    id: "news-009",
    headline: "Kuwait Investment Authority Increases Emerging Market Allocation",
    summary: "KIA shifts 3% of portfolio from developed to emerging markets. India and Vietnam identified as primary beneficiaries.",
    category: "markets",
    region: "gcc",
    timestamp: "2024-01-15T12:30:00Z",
    source: "CI Intelligence",
    priority: "high",
    tags: ["KIA", "Asset Allocation", "Emerging Markets"]
  },
  {
    id: "news-010",
    headline: "Abu Dhabi Securities Exchange Launches New ESG Index",
    summary: "ADX introduces sustainability-focused benchmark tracking 30 companies. Launch aligns with UAE Net Zero 2050 initiative.",
    category: "markets",
    region: "gcc",
    timestamp: "2024-01-15T11:20:00Z",
    source: "CI Markets",
    priority: "high",
    tags: ["ADX", "ESG", "Sustainability", "Index"]
  },

  // BANKING - High Priority
  {
    id: "news-011",
    headline: "Bank Audi Reports First Profitable Quarter Since 2019",
    summary: "Lebanon's largest bank posts $23M net income in Q4. Management credits debt restructuring and regional expansion.",
    category: "banking",
    region: "lebanon",
    timestamp: "2024-01-15T10:45:00Z",
    source: "CI Banking",
    priority: "high",
    tags: ["Bank Audi", "Earnings", "Restructuring"]
  },
  {
    id: "news-012",
    headline: "Emirates NBD Completes $1.5B Tier 2 Bond Issuance",
    summary: "Dubai's largest bank prices 10-year notes at 5.875%. Strong investor demand results in 3x oversubscription.",
    category: "banking",
    region: "gcc",
    timestamp: "2024-01-15T10:15:00Z",
    source: "CI Banking",
    priority: "high",
    tags: ["Emirates NBD", "Bonds", "Capital Markets"]
  },
  {
    id: "news-013",
    headline: "Saudi National Bank Announces Digital Banking Unit Spinoff",
    summary: "SNB to separate digital operations into standalone entity. IPO planned for 2025 with $2B valuation target.",
    category: "banking",
    region: "gcc",
    timestamp: "2024-01-15T09:30:00Z",
    source: "CI Banking",
    priority: "high",
    tags: ["SNB", "Digital Banking", "IPO"]
  },
  {
    id: "news-014",
    headline: "Blom Bank Receives Regulatory Approval for Capital Increase",
    summary: "BDL greenlights $500M rights issue for Lebanon's second-largest bank. Proceeds to strengthen Tier 1 capital ratio.",
    category: "banking",
    region: "lebanon",
    timestamp: "2024-01-15T09:00:00Z",
    source: "CI Banking",
    priority: "high",
    tags: ["Blom Bank", "Capital Raise", "Regulation"]
  },
  {
    id: "news-015",
    headline: "Qatar National Bank Expands African Operations",
    summary: "QNB acquires majority stake in East African lender for $340M. Deal extends network to 12 African countries.",
    category: "banking",
    region: "gcc",
    timestamp: "2024-01-15T08:45:00Z",
    source: "CI Banking",
    priority: "high",
    tags: ["QNB", "M&A", "Africa", "Expansion"]
  },

  // ECONOMY - Normal Priority
  {
    id: "news-016",
    headline: "Lebanon GDP Contracts 2.1% in 2023, IMF Estimates",
    summary: "Economic output continues decline amid political deadlock. Fund projects modest 0.5% growth in 2024 if reforms implemented.",
    category: "economy",
    region: "lebanon",
    timestamp: "2024-01-15T08:00:00Z",
    source: "CI Economics",
    priority: "normal",
    tags: ["GDP", "IMF", "Economic Growth", "Forecast"]
  },
  {
    id: "news-017",
    headline: "Saudi Arabia Non-Oil GDP Growth Accelerates to 4.8%",
    summary: "Vision 2030 diversification gains momentum. Tourism and entertainment sectors drive expansion in Q4.",
    category: "economy",
    region: "gcc",
    timestamp: "2024-01-15T07:30:00Z",
    source: "CI Economics",
    priority: "normal",
    tags: ["Saudi Arabia", "GDP", "Vision 2030", "Diversification"]
  },
  {
    id: "news-018",
    headline: "UAE Inflation Falls to 2.3% in December",
    summary: "Consumer prices moderate on housing cost stabilization. Central bank maintains accommodative stance on inflation outlook.",
    category: "economy",
    region: "gcc",
    timestamp: "2024-01-15T07:00:00Z",
    source: "CI Economics",
    priority: "normal",
    tags: ["UAE", "Inflation", "CPI", "Housing"]
  },
  {
    id: "news-019",
    headline: "Jordan Receives $1.2B World Bank Development Loan",
    summary: "Funding targets infrastructure and social protection programs. Disbursement conditional on fiscal reform progress.",
    category: "economy",
    region: "mena",
    timestamp: "2024-01-15T06:45:00Z",
    source: "CI Economics",
    priority: "normal",
    tags: ["Jordan", "World Bank", "Loan", "Infrastructure"]
  },
  {
    id: "news-020",
    headline: "Oman Budget Deficit Narrows to 3.2% of GDP",
    summary: "Fiscal consolidation efforts yield results. Oil revenues exceed projections on higher-than-expected prices.",
    category: "economy",
    region: "gcc",
    timestamp: "2024-01-15T06:30:00Z",
    source: "CI Economics",
    priority: "normal",
    tags: ["Oman", "Budget", "Fiscal Policy", "Oil"]
  },

  // POLITICS - High Priority
  {
    id: "news-021",
    headline: "Lebanese Parliament Fails to Elect President in 14th Session",
    summary: "Political deadlock continues as no candidate secures required majority. Next session scheduled for February 8.",
    category: "politics",
    region: "lebanon",
    timestamp: "2024-01-15T16:00:00Z",
    source: "CI Politics",
    priority: "high",
    tags: ["Lebanon", "Presidential Election", "Parliament"]
  },
  {
    id: "news-022",
    headline: "Saudi-Iran Diplomatic Normalization Reaches One-Year Milestone",
    summary: "Beijing-brokered agreement reshapes regional dynamics. Trade volume between kingdoms up 340% since restoration of ties.",
    category: "politics",
    region: "mena",
    timestamp: "2024-01-15T15:30:00Z",
    source: "CI Politics",
    priority: "high",
    tags: ["Saudi Arabia", "Iran", "Diplomacy", "China"]
  },
  {
    id: "news-023",
    headline: "UAE Signs Comprehensive Economic Partnership with Indonesia",
    summary: "Agreement eliminates tariffs on 90% of goods. Bilateral trade expected to reach $10B by 2026.",
    category: "politics",
    region: "gcc",
    timestamp: "2024-01-15T14:45:00Z",
    source: "CI Politics",
    priority: "normal",
    tags: ["UAE", "Indonesia", "Trade Agreement", "CEPA"]
  },
  {
    id: "news-024",
    headline: "Tunisia Secures EU Migration Cooperation Agreement",
    summary: "Brussels commits €900M in aid package. Deal includes border management support and economic development funding.",
    category: "politics",
    region: "mena",
    timestamp: "2024-01-15T14:00:00Z",
    source: "CI Politics",
    priority: "normal",
    tags: ["Tunisia", "EU", "Migration", "Aid"]
  },
  {
    id: "news-025",
    headline: "Bahrain Announces Municipal Elections for March 2024",
    summary: "First local polls since 2018 constitutional reforms. Participation seen as test of political liberalization efforts.",
    category: "politics",
    region: "gcc",
    timestamp: "2024-01-15T13:30:00Z",
    source: "CI Politics",
    priority: "normal",
    tags: ["Bahrain", "Elections", "Politics"]
  },

  // ENERGY - Normal Priority
  {
    id: "news-026",
    headline: "ADNOC Discovers New Offshore Gas Field in Abu Dhabi",
    summary: "Estimated reserves of 2.5 trillion cubic feet. Development expected to boost UAE's gas self-sufficiency targets.",
    category: "energy",
    region: "gcc",
    timestamp: "2024-01-15T12:00:00Z",
    source: "CI NEF",
    priority: "high",
    tags: ["ADNOC", "Gas", "Discovery", "Abu Dhabi"]
  },
  {
    id: "news-027",
    headline: "Lebanon Signs 25-Year LNG Import Agreement with Qatar",
    summary: "Deal valued at $3.2B addresses chronic power shortages. First shipment expected by Q3 2024.",
    category: "energy",
    region: "lebanon",
    timestamp: "2024-01-15T11:45:00Z",
    source: "CI NEF",
    priority: "high",
    tags: ["Lebanon", "Qatar", "LNG", "Energy"]
  },
  {
    id: "news-028",
    headline: "Saudi Arabia Targets 50% Renewable Energy by 2030",
    summary: "Kingdom accelerates clean energy transition. $50B investment planned for solar and wind projects.",
    category: "energy",
    region: "gcc",
    timestamp: "2024-01-15T11:00:00Z",
    source: "CI NEF",
    priority: "normal",
    tags: ["Saudi Arabia", "Renewables", "Solar", "Wind"]
  },
  {
    id: "news-029",
    headline: "Egypt Inaugurates Africa's Largest Solar Park",
    summary: "Benban complex reaches full 1.65GW capacity. Project reduces country's carbon emissions by 2M tons annually.",
    category: "energy",
    region: "mena",
    timestamp: "2024-01-15T10:30:00Z",
    source: "CI NEF",
    priority: "normal",
    tags: ["Egypt", "Solar", "Benban", "Clean Energy"]
  },
  {
    id: "news-030",
    headline: "Kuwait Oil Company Announces $40B Upstream Investment Plan",
    summary: "Five-year program targets 3.5M barrels per day capacity. Focus on heavy oil development and EOR technologies.",
    category: "energy",
    region: "gcc",
    timestamp: "2024-01-15T10:00:00Z",
    source: "CI NEF",
    priority: "normal",
    tags: ["Kuwait", "KOC", "Oil", "Investment"]
  },

  // TECHNOLOGY - Normal Priority
  {
    id: "news-031",
    headline: "Dubai Launches Blockchain-Based Trade Finance Platform",
    summary: "Initiative targets $500B annual trade flows through emirate. Major banks sign on as founding partners.",
    category: "technology",
    region: "gcc",
    timestamp: "2024-01-15T09:45:00Z",
    source: "CI Technology",
    priority: "normal",
    tags: ["Dubai", "Blockchain", "Trade Finance", "Fintech"]
  },
  {
    id: "news-032",
    headline: "Saudi Arabia's NEOM Announces AI Research Hub",
    summary: "$1B facility to focus on autonomous systems and robotics. Partnerships with MIT and Stanford confirmed.",
    category: "technology",
    region: "gcc",
    timestamp: "2024-01-15T09:15:00Z",
    source: "CI Technology",
    priority: "normal",
    tags: ["NEOM", "AI", "Research", "Technology"]
  },
  {
    id: "news-033",
    headline: "Lebanese Fintech Startup Raises $15M Series A",
    summary: "Payment platform targets unbanked population across MENA. Investors include regional VCs and European family offices.",
    category: "technology",
    region: "lebanon",
    timestamp: "2024-01-15T08:30:00Z",
    source: "CI Technology",
    priority: "normal",
    tags: ["Lebanon", "Fintech", "Startup", "Venture Capital"]
  },
  {
    id: "news-034",
    headline: "Abu Dhabi Global Market Grants First Crypto Exchange License",
    summary: "Regulatory milestone for UAE's digital asset ambitions. Licensed entity to offer spot and derivatives trading.",
    category: "technology",
    region: "gcc",
    timestamp: "2024-01-15T08:00:00Z",
    source: "CI Technology",
    priority: "normal",
    tags: ["ADGM", "Crypto", "Regulation", "Digital Assets"]
  },
  {
    id: "news-035",
    headline: "Qatar Invests $500M in Global Cybersecurity Ventures",
    summary: "QIA-backed fund targets enterprise security startups. Investment thesis centers on critical infrastructure protection.",
    category: "technology",
    region: "gcc",
    timestamp: "2024-01-15T07:45:00Z",
    source: "CI Technology",
    priority: "normal",
    tags: ["Qatar", "Cybersecurity", "Investment", "QIA"]
  },

  // ANALYSIS - Normal Priority
  {
    id: "news-036",
    headline: "ANALYSIS: Lebanon's Parallel Economy Now Exceeds Formal Sector",
    summary: "CI Economics estimates shadow economy at 55% of GDP. Cash-based transactions dominate as banking system remains paralyzed.",
    category: "analysis",
    region: "lebanon",
    timestamp: "2024-01-15T07:15:00Z",
    source: "CI Intelligence",
    priority: "normal",
    tags: ["Lebanon", "Economy", "Analysis", "Informal Sector"]
  },
  {
    id: "news-037",
    headline: "SPECIAL REPORT: GCC Banking Sector 2024 Outlook",
    summary: "Regional banks face margin pressure amid rate plateau. Asset quality remains robust with NPL ratios below 3%.",
    category: "analysis",
    region: "gcc",
    timestamp: "2024-01-15T06:45:00Z",
    source: "CI Intelligence",
    priority: "normal",
    tags: ["GCC", "Banking", "Outlook", "Analysis"]
  },
  {
    id: "news-038",
    headline: "DEEP DIVE: Saudi Arabia's Giga-Projects - Progress Report",
    summary: "Comprehensive assessment of NEOM, Red Sea, and Qiddiya developments. Combined investment now exceeds $1 trillion.",
    category: "analysis",
    region: "gcc",
    timestamp: "2024-01-15T06:30:00Z",
    source: "CI Intelligence",
    priority: "normal",
    tags: ["Saudi Arabia", "NEOM", "Mega Projects", "Investment"]
  },
  {
    id: "news-039",
    headline: "OPINION: Why MENA Sovereign Wealth Funds Are Pivoting to Asia",
    summary: "Regional SWFs shift allocation from Europe to Indo-Pacific. Demographic trends and growth differentials drive rebalancing.",
    category: "analysis",
    region: "mena",
    timestamp: "2024-01-15T06:15:00Z",
    source: "CI Intelligence",
    priority: "normal",
    tags: ["SWF", "Asia", "Investment", "Strategy"]
  },
  {
    id: "news-040",
    headline: "EXPLAINER: Understanding Lebanon's Multiple Exchange Rates",
    summary: "Guide to official, Sayrafa, and parallel market rates. Impact on importers, exporters, and ordinary citizens analyzed.",
    category: "analysis",
    region: "lebanon",
    timestamp: "2024-01-15T06:00:00Z",
    source: "CI Intelligence",
    priority: "normal",
    tags: ["Lebanon", "Exchange Rate", "Currency", "Analysis"]
  },

  // Additional Breaking/Markets
  {
    id: "news-041",
    headline: "BREAKING: Moody's Upgrades Oman Sovereign Rating to Ba1",
    summary: "Outlook revised to positive from stable. Fiscal reforms and reduced debt burden cited as key factors.",
    category: "breaking",
    region: "gcc",
    timestamp: "2024-01-15T17:00:00Z",
    source: "CI First",
    priority: "urgent",
    tags: ["Oman", "Moody's", "Credit Rating", "Sovereign"]
  },
  {
    id: "news-042",
    headline: "Abu Dhabi Investment Authority Reports 12.8% Returns for 2023",
    summary: "ADIA outperforms global peers on private equity gains. Real estate and infrastructure allocations exceed benchmarks.",
    category: "markets",
    region: "gcc",
    timestamp: "2024-01-15T16:30:00Z",
    source: "CI Markets",
    priority: "high",
    tags: ["ADIA", "Returns", "Investment", "Performance"]
  },
  {
    id: "news-043",
    headline: "MENA IPO Market Sees Strongest Start Since 2022",
    summary: "January listings raise $3.2B across region. Saudi Arabia accounts for 60% of issuance volume.",
    category: "markets",
    region: "mena",
    timestamp: "2024-01-15T15:45:00Z",
    source: "CI Markets",
    priority: "high",
    tags: ["IPO", "Capital Markets", "Saudi Arabia", "Listings"]
  },
  {
    id: "news-044",
    headline: "Brent Crude Rises Above $80 on Red Sea Shipping Concerns",
    summary: "Geopolitical tensions push oil higher. Analysts warn of sustained premium if disruptions continue.",
    category: "markets",
    region: "global",
    timestamp: "2024-01-15T15:15:00Z",
    source: "CI Markets",
    priority: "high",
    tags: ["Oil", "Brent", "Red Sea", "Geopolitics"]
  },
  {
    id: "news-045",
    headline: "Gold Hits Three-Week High as Dollar Weakens",
    summary: "Safe-haven demand supports precious metals. MENA central banks continue accumulation trend.",
    category: "markets",
    region: "global",
    timestamp: "2024-01-15T14:30:00Z",
    source: "CI Markets",
    priority: "normal",
    tags: ["Gold", "Commodities", "Dollar", "Central Banks"]
  },

  // More Banking
  {
    id: "news-046",
    headline: "First Abu Dhabi Bank Completes EG Bank Acquisition",
    summary: "FAB finalizes $425M deal for Egyptian lender. Merger creates largest foreign bank in Egypt by assets.",
    category: "banking",
    region: "mena",
    timestamp: "2024-01-15T13:00:00Z",
    source: "CI Banking",
    priority: "high",
    tags: ["FAB", "Egypt", "M&A", "Acquisition"]
  },
  {
    id: "news-047",
    headline: "Lebanon's Association of Banks Proposes Depositor Compensation Plan",
    summary: "Framework targets partial recovery for small depositors. Implementation requires parliamentary approval and IMF endorsement.",
    category: "banking",
    region: "lebanon",
    timestamp: "2024-01-15T12:30:00Z",
    source: "CI Banking",
    priority: "high",
    tags: ["Lebanon", "Banks", "Deposits", "Restructuring"]
  },
  {
    id: "news-048",
    headline: "Mashreq Bank Launches Open Banking Platform",
    summary: "UAE lender enables third-party API access. Initiative positions bank as fintech enabler in region.",
    category: "banking",
    region: "gcc",
    timestamp: "2024-01-15T11:30:00Z",
    source: "CI Banking",
    priority: "normal",
    tags: ["Mashreq", "Open Banking", "API", "Fintech"]
  },
  {
    id: "news-049",
    headline: "Arab Banking Corporation Reports Record Trade Finance Volumes",
    summary: "ABC processes $28B in trade transactions in 2023. Growth driven by GCC-Asia corridor expansion.",
    category: "banking",
    region: "mena",
    timestamp: "2024-01-15T10:00:00Z",
    source: "CI Banking",
    priority: "normal",
    tags: ["ABC", "Trade Finance", "Growth", "Asia"]
  },
  {
    id: "news-050",
    headline: "Riyad Bank Announces Management Reshuffle",
    summary: "Saudi lender appoints new CEO from internal ranks. Strategy refresh expected to focus on digital transformation.",
    category: "banking",
    region: "gcc",
    timestamp: "2024-01-15T09:00:00Z",
    source: "CI Banking",
    priority: "normal",
    tags: ["Riyad Bank", "Management", "CEO", "Strategy"]
  },

  // More Economy
  {
    id: "news-051",
    headline: "Morocco Attracts Record FDI in 2023",
    summary: "Kingdom receives $3.8B in foreign investment. Automotive and renewable energy sectors lead inflows.",
    category: "economy",
    region: "mena",
    timestamp: "2024-01-15T08:30:00Z",
    source: "CI Economics",
    priority: "normal",
    tags: ["Morocco", "FDI", "Investment", "Automotive"]
  },
  {
    id: "news-052",
    headline: "Iraq Signs $27B Development Agreement with China",
    summary: "Infrastructure-for-oil deal covers ports, railways, and housing. Implementation over 20-year period.",
    category: "economy",
    region: "mena",
    timestamp: "2024-01-15T08:15:00Z",
    source: "CI Economics",
    priority: "high",
    tags: ["Iraq", "China", "Infrastructure", "BRI"]
  },
  {
    id: "news-053",
    headline: "Bahrain Unemployment Falls to Historic Low of 4.2%",
    summary: "Job creation programs show results. National employment in private sector rises 15% year-on-year.",
    category: "economy",
    region: "gcc",
    timestamp: "2024-01-15T07:45:00Z",
    source: "CI Economics",
    priority: "normal",
    tags: ["Bahrain", "Employment", "Jobs", "Labor Market"]
  },
  {
    id: "news-054",
    headline: "Algeria Foreign Reserves Rise to $64B",
    summary: "Hydrocarbon exports boost forex holdings. Central bank maintains comfortable import cover of 15 months.",
    category: "economy",
    region: "mena",
    timestamp: "2024-01-15T07:30:00Z",
    source: "CI Economics",
    priority: "normal",
    tags: ["Algeria", "Reserves", "Forex", "Oil"]
  },
  {
    id: "news-055",
    headline: "Qatar Economic Growth Projected at 2.5% for 2024",
    summary: "Post-World Cup transition stabilizes. LNG expansion projects to drive medium-term acceleration.",
    category: "economy",
    region: "gcc",
    timestamp: "2024-01-15T07:15:00Z",
    source: "CI Economics",
    priority: "normal",
    tags: ["Qatar", "GDP", "LNG", "Growth"]
  },

  // More Energy
  {
    id: "news-056",
    headline: "TotalEnergies Expands Qatar LNG Partnership",
    summary: "French major takes 6.25% stake in North Field South. Investment valued at $1.5B over project life.",
    category: "energy",
    region: "gcc",
    timestamp: "2024-01-15T09:30:00Z",
    source: "CI NEF",
    priority: "high",
    tags: ["TotalEnergies", "Qatar", "LNG", "North Field"]
  },
  {
    id: "news-057",
    headline: "Jordan Approves Nuclear Power Plant Feasibility Study",
    summary: "Kingdom advances plans for 1GW facility. Russian and Chinese firms shortlisted as potential partners.",
    category: "energy",
    region: "mena",
    timestamp: "2024-01-15T09:15:00Z",
    source: "CI NEF",
    priority: "normal",
    tags: ["Jordan", "Nuclear", "Energy", "Power"]
  },
  {
    id: "news-058",
    headline: "OPEC+ Maintains Production Cuts Through Q1 2024",
    summary: "Alliance extends voluntary reductions of 2.2M bpd. Market awaits guidance on second quarter policy.",
    category: "energy",
    region: "global",
    timestamp: "2024-01-15T08:45:00Z",
    source: "CI NEF",
    priority: "high",
    tags: ["OPEC+", "Oil", "Production", "Cuts"]
  },
  {
    id: "news-059",
    headline: "Green Hydrogen Project Launches in Moroccan Desert",
    summary: "€1.4B facility targets European export market. Initial capacity of 100,000 tons annually.",
    category: "energy",
    region: "mena",
    timestamp: "2024-01-15T08:00:00Z",
    source: "CI NEF",
    priority: "normal",
    tags: ["Morocco", "Hydrogen", "Green Energy", "Export"]
  },
  {
    id: "news-060",
    headline: "Iraq Oil Exports Reach 3.45M Barrels Per Day",
    summary: "January shipments hit post-2003 record. Southern ports operating at maximum capacity.",
    category: "energy",
    region: "mena",
    timestamp: "2024-01-15T07:30:00Z",
    source: "CI NEF",
    priority: "normal",
    tags: ["Iraq", "Oil", "Exports", "OPEC"]
  },

  // More Technology
  {
    id: "news-061",
    headline: "Careem Super App Reaches 100 Million Users",
    summary: "Middle East's leading ride-hailing platform expands services. Food delivery and payments drive engagement growth.",
    category: "technology",
    region: "mena",
    timestamp: "2024-01-15T11:30:00Z",
    source: "CI Technology",
    priority: "normal",
    tags: ["Careem", "Super App", "Ride-hailing", "Growth"]
  },
  {
    id: "news-062",
    headline: "Saudi Arabia Launches Government Cloud Initiative",
    summary: "Kingdom mandates local data storage for public sector. AWS and Microsoft establish in-country data centers.",
    category: "technology",
    region: "gcc",
    timestamp: "2024-01-15T10:45:00Z",
    source: "CI Technology",
    priority: "normal",
    tags: ["Saudi Arabia", "Cloud", "Data", "Government"]
  },
  {
    id: "news-063",
    headline: "Egyptian E-commerce Market Surpasses $10B",
    summary: "Online retail penetration reaches 5% of total. Mobile commerce accounts for 70% of transactions.",
    category: "technology",
    region: "mena",
    timestamp: "2024-01-15T10:15:00Z",
    source: "CI Technology",
    priority: "normal",
    tags: ["Egypt", "E-commerce", "Retail", "Mobile"]
  },
  {
    id: "news-064",
    headline: "Dubai Police Deploys AI-Powered Crime Prevention System",
    summary: "Predictive policing platform reduces response times by 40%. Privacy safeguards implemented per UAE data law.",
    category: "technology",
    region: "gcc",
    timestamp: "2024-01-15T09:45:00Z",
    source: "CI Technology",
    priority: "normal",
    tags: ["Dubai", "AI", "Police", "Smart City"]
  },
  {
    id: "news-065",
    headline: "Lebanese Tech Diaspora Launches $100M Investment Fund",
    summary: "Expatriate entrepreneurs pool resources for homeland startups. Focus on fintech and healthtech sectors.",
    category: "technology",
    region: "lebanon",
    timestamp: "2024-01-15T09:00:00Z",
    source: "CI Technology",
    priority: "normal",
    tags: ["Lebanon", "Diaspora", "VC", "Startups"]
  },

  // More Analysis
  {
    id: "news-066",
    headline: "ANALYSIS: The New Saudi-Russian Energy Axis",
    summary: "Strategic coordination reshapes global oil markets. Price stability takes precedence over market share competition.",
    category: "analysis",
    region: "global",
    timestamp: "2024-01-15T06:00:00Z",
    source: "CI Intelligence",
    priority: "normal",
    tags: ["Saudi Arabia", "Russia", "OPEC+", "Strategy"]
  },
  {
    id: "news-067",
    headline: "DEEP DIVE: Lebanon's Brain Drain Crisis Quantified",
    summary: "600,000 professionals emigrated since 2019. Economic cost estimated at $16B in human capital loss.",
    category: "analysis",
    region: "lebanon",
    timestamp: "2024-01-15T05:45:00Z",
    source: "CI Intelligence",
    priority: "normal",
    tags: ["Lebanon", "Migration", "Brain Drain", "Demographics"]
  },
  {
    id: "news-068",
    headline: "OUTLOOK: GCC Real Estate Markets 2024",
    summary: "Dubai and Riyadh lead regional recovery. Office sector faces headwinds from hybrid work adoption.",
    category: "analysis",
    region: "gcc",
    timestamp: "2024-01-15T05:30:00Z",
    source: "CI Intelligence",
    priority: "normal",
    tags: ["Real Estate", "GCC", "Dubai", "Riyadh"]
  },
  {
    id: "news-069",
    headline: "SPECIAL REPORT: Islamic Finance Assets Cross $4 Trillion",
    summary: "Sukuk issuance reaches record levels. Malaysia and Saudi Arabia dominate global market share.",
    category: "analysis",
    region: "global",
    timestamp: "2024-01-15T05:15:00Z",
    source: "CI Intelligence",
    priority: "normal",
    tags: ["Islamic Finance", "Sukuk", "Growth", "Malaysia"]
  },
  {
    id: "news-070",
    headline: "OPINION: Why Arab Tech IPOs Are Moving to Abu Dhabi",
    summary: "ADX emerges as regional listing destination. Regulatory flexibility and valuation premiums attract founders.",
    category: "analysis",
    region: "gcc",
    timestamp: "2024-01-15T05:00:00Z",
    source: "CI Intelligence",
    priority: "normal",
    tags: ["IPO", "Abu Dhabi", "Tech", "Capital Markets"]
  },

  // Additional mixed news
  {
    id: "news-071",
    headline: "BREAKING: S&P Affirms Saudi Arabia at A/A-1 with Stable Outlook",
    summary: "Sovereign rating supported by fiscal buffers and reform momentum. Net asset position remains key credit strength.",
    category: "breaking",
    region: "gcc",
    timestamp: "2024-01-15T18:00:00Z",
    source: "CI First",
    priority: "urgent",
    tags: ["Saudi Arabia", "S&P", "Rating", "Sovereign"]
  },
  {
    id: "news-072",
    headline: "Dubai International Airport Handles Record 87M Passengers",
    summary: "DXB surpasses 2019 pre-pandemic levels. India, UK, and Saudi Arabia top origin markets.",
    category: "economy",
    region: "gcc",
    timestamp: "2024-01-15T17:30:00Z",
    source: "CI Economics",
    priority: "normal",
    tags: ["Dubai", "Aviation", "Tourism", "DXB"]
  },
  {
    id: "news-073",
    headline: "Egyptian Steel Prices Surge 15% on Construction Demand",
    summary: "New capital projects drive material costs higher. Developers warn of profit margin compression.",
    category: "markets",
    region: "mena",
    timestamp: "2024-01-15T17:00:00Z",
    source: "CI Markets",
    priority: "normal",
    tags: ["Egypt", "Steel", "Construction", "Commodities"]
  },
  {
    id: "news-074",
    headline: "Bank of Israel Holds Rate at 4.75% Despite Inflation Decline",
    summary: "Central bank cites geopolitical uncertainty. Shekel strengthens on carry trade appeal.",
    category: "economy",
    region: "mena",
    timestamp: "2024-01-15T16:45:00Z",
    source: "CI Economics",
    priority: "normal",
    tags: ["Israel", "Interest Rates", "Inflation", "Shekel"]
  },
  {
    id: "news-075",
    headline: "Saudi PIF Invests $3.5B in Egyptian Tourism Sector",
    summary: "Fund targets Red Sea resort development. Joint venture with Egyptian sovereign fund announced.",
    category: "markets",
    region: "mena",
    timestamp: "2024-01-15T16:15:00Z",
    source: "CI Markets",
    priority: "high",
    tags: ["PIF", "Egypt", "Tourism", "Investment"]
  },
  {
    id: "news-076",
    headline: "Lebanon Central Bank Governor Tenure Extended by Parliament",
    summary: "Riad Salameh to remain in post pending successor appointment. Markets react cautiously to continuity.",
    category: "politics",
    region: "lebanon",
    timestamp: "2024-01-15T15:45:00Z",
    source: "CI Politics",
    priority: "high",
    tags: ["Lebanon", "BDL", "Central Bank", "Salameh"]
  },
  {
    id: "news-077",
    headline: "Emirati Dirham Peg to Dollar Reaffirmed by Central Bank",
    summary: "CBUAE dismisses speculation on currency regime change. Peg unchanged since 1997 provides anchor for region.",
    category: "economy",
    region: "gcc",
    timestamp: "2024-01-15T15:00:00Z",
    source: "CI Economics",
    priority: "normal",
    tags: ["UAE", "Dirham", "Currency", "Peg"]
  },
  {
    id: "news-078",
    headline: "Kuwaiti Parliament Debates Investment Authority Reform",
    summary: "Lawmakers seek greater oversight of KIA operations. Sovereign fund resists transparency demands.",
    category: "politics",
    region: "gcc",
    timestamp: "2024-01-15T14:30:00Z",
    source: "CI Politics",
    priority: "normal",
    tags: ["Kuwait", "KIA", "Parliament", "Governance"]
  },
  {
    id: "news-079",
    headline: "Red Sea Attacks Disrupt 15% of Global Container Traffic",
    summary: "Houthi strikes force ships around Cape of Good Hope. Insurance costs for regional routes triple.",
    category: "markets",
    region: "global",
    timestamp: "2024-01-15T14:00:00Z",
    source: "CI Markets",
    priority: "urgent",
    tags: ["Red Sea", "Shipping", "Houthi", "Trade"]
  },
  {
    id: "news-080",
    headline: "Qatar Sovereign Fund Reports $475B in Assets Under Management",
    summary: "QIA discloses holdings for first time since 2018. International portfolio dominates allocation.",
    category: "markets",
    region: "gcc",
    timestamp: "2024-01-15T13:30:00Z",
    source: "CI Markets",
    priority: "high",
    tags: ["QIA", "Sovereign Wealth", "Assets", "Qatar"]
  },

  // Final batch
  {
    id: "news-081",
    headline: "Lebanese Diaspora Remittances Hit $6.5B in 2023",
    summary: "Transfers remain lifeline for struggling economy. Western Union and OMT report record transaction volumes.",
    category: "economy",
    region: "lebanon",
    timestamp: "2024-01-15T13:00:00Z",
    source: "CI Economics",
    priority: "normal",
    tags: ["Lebanon", "Remittances", "Diaspora", "Economy"]
  },
  {
    id: "news-082",
    headline: "Abu Dhabi National Oil Company Prices $4B Bond Issue",
    summary: "ADNOC raises capital at competitive rates. Proceeds fund upstream expansion program.",
    category: "banking",
    region: "gcc",
    timestamp: "2024-01-15T12:45:00Z",
    source: "CI Banking",
    priority: "normal",
    tags: ["ADNOC", "Bonds", "Capital Markets", "Oil"]
  },
  {
    id: "news-083",
    headline: "Saudi Entertainment Authority Projects $64B Industry by 2030",
    summary: "Kingdom's leisure sector transforms under Vision 2030. Cinema and live events drive growth trajectory.",
    category: "economy",
    region: "gcc",
    timestamp: "2024-01-15T12:15:00Z",
    source: "CI Economics",
    priority: "normal",
    tags: ["Saudi Arabia", "Entertainment", "Vision 2030", "Growth"]
  },
  {
    id: "news-084",
    headline: "Beirut Port Reconstruction Contract Awarded to Turkish Consortium",
    summary: "€1.2B agreement covers terminal modernization. Completion targeted for 2027.",
    category: "economy",
    region: "lebanon",
    timestamp: "2024-01-15T11:45:00Z",
    source: "CI Economics",
    priority: "high",
    tags: ["Lebanon", "Beirut Port", "Reconstruction", "Turkey"]
  },
  {
    id: "news-085",
    headline: "Oman Investment Authority Increases Infrastructure Allocation",
    summary: "OIA shifts 10% of portfolio to infrastructure assets. Transportation and utilities sectors targeted.",
    category: "markets",
    region: "gcc",
    timestamp: "2024-01-15T11:15:00Z",
    source: "CI Markets",
    priority: "normal",
    tags: ["OIA", "Infrastructure", "Investment", "Oman"]
  },
  {
    id: "news-086",
    headline: "Egyptian Pound Stabilizes After Central Bank Intervention",
    summary: "CBE sells $1.2B in spot market. Parallel rate premium narrows to 8% from 15%.",
    category: "markets",
    region: "mena",
    timestamp: "2024-01-15T10:45:00Z",
    source: "CI Markets",
    priority: "high",
    tags: ["Egypt", "Currency", "CBE", "Intervention"]
  },
  {
    id: "news-087",
    headline: "Saudi Telecom Acquires Middle East Fiber Network Operator",
    summary: "STC pays $800M for regional connectivity provider. Deal enhances enterprise services portfolio.",
    category: "technology",
    region: "gcc",
    timestamp: "2024-01-15T10:15:00Z",
    source: "CI Technology",
    priority: "normal",
    tags: ["STC", "Telecom", "M&A", "Fiber"]
  },
  {
    id: "news-088",
    headline: "Lebanon Electricity Production Falls to 4-Hour Daily Average",
    summary: "EDL output at historic low amid fuel shortages. Private generators fill gap at premium cost.",
    category: "energy",
    region: "lebanon",
    timestamp: "2024-01-15T09:45:00Z",
    source: "CI NEF",
    priority: "high",
    tags: ["Lebanon", "Electricity", "Energy Crisis", "EDL"]
  },
  {
    id: "news-089",
    headline: "Dubai Real Estate Transactions Reach AED 500B",
    summary: "2023 marks record year for property market. Off-plan sales dominate investor activity.",
    category: "markets",
    region: "gcc",
    timestamp: "2024-01-15T09:15:00Z",
    source: "CI Markets",
    priority: "normal",
    tags: ["Dubai", "Real Estate", "Property", "Investment"]
  },
  {
    id: "news-090",
    headline: "Bahrain Fintech Bay Attracts 100th Member Company",
    summary: "Kingdom's financial technology hub expands ecosystem. International fintechs seek MENA base.",
    category: "technology",
    region: "gcc",
    timestamp: "2024-01-15T08:45:00Z",
    source: "CI Technology",
    priority: "normal",
    tags: ["Bahrain", "Fintech", "Hub", "Startups"]
  },
  {
    id: "news-091",
    headline: "Jordan Central Bank Maintains Rate at 7.5%",
    summary: "CBJ holds despite inflation moderation. Dinar peg to dollar constrains policy flexibility.",
    category: "economy",
    region: "mena",
    timestamp: "2024-01-15T08:15:00Z",
    source: "CI Economics",
    priority: "normal",
    tags: ["Jordan", "Interest Rates", "Inflation", "CBJ"]
  },
  {
    id: "news-092",
    headline: "Qatar Airways Orders 25 Additional Boeing 777X Aircraft",
    summary: "Deal valued at $8B at list prices. Delivery begins 2025 for fleet modernization program.",
    category: "economy",
    region: "gcc",
    timestamp: "2024-01-15T07:45:00Z",
    source: "CI Economics",
    priority: "normal",
    tags: ["Qatar Airways", "Boeing", "Aviation", "Fleet"]
  },
  {
    id: "news-093",
    headline: "Tunisian Olive Oil Exports Hit Record on European Demand",
    summary: "North African producer benefits from Spanish drought. Export revenues rise 45% year-on-year.",
    category: "economy",
    region: "mena",
    timestamp: "2024-01-15T07:15:00Z",
    source: "CI Economics",
    priority: "normal",
    tags: ["Tunisia", "Agriculture", "Exports", "Olive Oil"]
  },
  {
    id: "news-094",
    headline: "ANALYSIS: The Transformation of GCC Pension Systems",
    summary: "Regional funds shift from defined benefit to hybrid models. Sustainability concerns drive structural reform.",
    category: "analysis",
    region: "gcc",
    timestamp: "2024-01-15T06:45:00Z",
    source: "CI Intelligence",
    priority: "normal",
    tags: ["GCC", "Pensions", "Reform", "Analysis"]
  },
  {
    id: "news-095",
    headline: "Saudi Aramco Unveils Carbon Capture Expansion Plans",
    summary: "Oil giant targets 11M tons CO2 capture annually by 2035. Technology deployment across refining operations.",
    category: "energy",
    region: "gcc",
    timestamp: "2024-01-15T06:15:00Z",
    source: "CI NEF",
    priority: "normal",
    tags: ["Aramco", "Carbon Capture", "Climate", "Technology"]
  },
  {
    id: "news-096",
    headline: "Lebanese Banks Resume Limited Dollar Withdrawals",
    summary: "Monthly limit raised to $400 from $300. Depositor protests continue demanding full access.",
    category: "banking",
    region: "lebanon",
    timestamp: "2024-01-15T05:45:00Z",
    source: "CI Banking",
    priority: "high",
    tags: ["Lebanon", "Banks", "Withdrawals", "Crisis"]
  },
  {
    id: "news-097",
    headline: "Mubadala Investment Company Enters Indian Data Center Market",
    summary: "Abu Dhabi fund commits $500M to digital infrastructure. Partnership with local conglomerate announced.",
    category: "technology",
    region: "gcc",
    timestamp: "2024-01-15T05:15:00Z",
    source: "CI Technology",
    priority: "normal",
    tags: ["Mubadala", "Data Centers", "India", "Investment"]
  },
  {
    id: "news-098",
    headline: "DEEP DIVE: Water Scarcity and MENA Food Security",
    summary: "Region faces 50% reduction in renewable water by 2050. Desalination investments insufficient to close gap.",
    category: "analysis",
    region: "mena",
    timestamp: "2024-01-15T04:45:00Z",
    source: "CI Intelligence",
    priority: "normal",
    tags: ["Water", "Food Security", "Climate", "MENA"]
  },
  {
    id: "news-099",
    headline: "Abu Dhabi Completes Midfield Terminal at AUH Airport",
    summary: "$3B facility increases capacity to 45M passengers. Operations begin February 2024.",
    category: "economy",
    region: "gcc",
    timestamp: "2024-01-15T04:15:00Z",
    source: "CI Economics",
    priority: "normal",
    tags: ["Abu Dhabi", "Airport", "Infrastructure", "Aviation"]
  },
  {
    id: "news-100",
    headline: "OUTLOOK: MENA Private Equity Fundraising Trends 2024",
    summary: "Regional PE firms target $15B in new commitments. Healthcare and education sectors attract most interest.",
    category: "analysis",
    region: "mena",
    timestamp: "2024-01-15T04:00:00Z",
    source: "CI Intelligence",
    priority: "normal",
    tags: ["Private Equity", "Fundraising", "MENA", "Investment"]
  }
];

export const getNewsByCategory = (category: NewsItem["category"]) => 
  newsItems.filter(item => item.category === category);

export const getNewsByRegion = (region: NewsItem["region"]) => 
  newsItems.filter(item => item.region === region);

export const getNewsByPriority = (priority: NewsItem["priority"]) => 
  newsItems.filter(item => item.priority === priority);

export const getBreakingNews = () => 
  newsItems.filter(item => item.priority === "urgent" || item.category === "breaking");

export const searchNews = (query: string) => 
  newsItems.filter(item => 
    item.headline.toLowerCase().includes(query.toLowerCase()) ||
    item.summary.toLowerCase().includes(query.toLowerCase()) ||
    item.tags.some(tag => tag.toLowerCase().includes(query.toLowerCase()))
  );
