import {
  Newspaper,
  Brain,
  LineChart,
  Globe,
  Leaf,
  PieChart,
  Shield,
  BookOpen,
  type LucideIcon,
} from "lucide-react";

export interface Service {
  id: string;
  name: string;
  shortName: string;
  tagline: string;
  description: string;
  features: string[];
  icon: LucideIcon;
  gradient: string;
  href: string;
}

export const services: Service[] = [
  {
    id: "ci-exclusive-news",
    name: "CI Exclusive News",
    shortName: "News",
    tagline: "Breaking News Before It Breaks Markets",
    description:
      "Real-time access to our global news network, including 'CI First' market-moving scoops and exclusive investigative reporting. Get ahead of the curve with verified, actionable intelligence.",
    features: [
      "CI First - Market-moving exclusive scoops",
      "Real-time global news coverage",
      "Investigative reporting",
      "AI-powered news verification",
      "Regional news trust layer",
    ],
    icon: Newspaper,
    gradient: "from-emerald-500 to-teal-600",
    href: "/services/ci-exclusive-news",
  },
  {
    id: "market-sentiment",
    name: "Market Sentiment",
    shortName: "Sentiment",
    tagline: "Feel the Market Before It Moves",
    description:
      "A specialized sentiment engine applying algorithmic analysis, risk modeling, and psychological profiling to news and social media. Quantitative indices measure emotions like fear, trust, and uncertainty in real-time.",
    features: [
      "Real-time sentiment indices",
      "Fear & Greed analysis",
      "Trust & Uncertainty metrics",
      "Social media monitoring",
      "Event-driven alpha signals",
    ],
    icon: Brain,
    gradient: "from-sky-500 to-blue-600",
    href: "/services/market-sentiment",
  },
  {
    id: "ci-intelligence",
    name: "CapitalIssuesIQ Intelligence",
    shortName: "Intelligence",
    tagline: "350+ Analysts. One Decisive Edge.",
    description:
      "Direct access to our team of over 350 independent research professionals providing data-driven analysis across industries, companies, and regions worldwide.",
    features: [
      "350+ independent analysts",
      "Industry deep-dives",
      "Company research reports",
      "Regional market analysis",
      "Data-driven insights",
    ],
    icon: LineChart,
    gradient: "from-amber-500 to-orange-600",
    href: "/services/ci-intelligence",
  },
  {
    id: "ci-economics",
    name: "CapitalIssuesIQ Economics",
    shortName: "Economics",
    tagline: "Macro Intelligence for Global Markets",
    description:
      "Specialized macroeconomic research and predictive modeling for major global economies. Understand central bank moves, policy shifts, and economic cycles before they impact your portfolio.",
    features: [
      "Macroeconomic forecasting",
      "Central bank analysis",
      "Policy impact modeling",
      "Economic cycle tracking",
      "Global GDP predictions",
    ],
    icon: Globe,
    gradient: "from-rose-500 to-pink-600",
    href: "/services/ci-economics",
  },
  {
    id: "ci-nef",
    name: "CapitalIssuesIQ NEF",
    shortName: "NEF",
    tagline: "The Future of Energy, Today",
    description:
      "Strategic research focused on the energy transition, including clean energy, advanced transport, and digital industry. Navigate the sustainable investment landscape with confidence.",
    features: [
      "Clean energy analysis",
      "EV & transport research",
      "Carbon market insights",
      "Renewable forecasting",
      "ESG integration",
    ],
    icon: Leaf,
    gradient: "from-green-500 to-emerald-600",
    href: "/services/ci-nef",
  },
  {
    id: "port-analytics",
    name: "PORT Analytics",
    shortName: "PORT",
    tagline: "Know Your Risk. Own Your Alpha.",
    description:
      "A comprehensive suite for performance attribution, factor risk modeling, and 'what-if' scenario analysis. See exactly how potential market shifts would impact your portfolio.",
    features: [
      "Performance attribution",
      "Factor risk modeling",
      "What-if scenarios",
      "Benchmark comparison",
      "Real-time monitoring",
    ],
    icon: PieChart,
    gradient: "from-violet-500 to-purple-600",
    href: "/services/port-analytics",
  },
  {
    id: "mars-risk",
    name: "MARS Risk System",
    shortName: "MARS",
    tagline: "Multi-Asset Risk. Single View.",
    description:
      "Provides a unified view of risk across various asset classes, including stress testing and regulatory reporting tools for Basel III compliance and beyond.",
    features: [
      "Multi-asset risk view",
      "Stress testing",
      "Basel III compliance",
      "Regulatory reporting",
      "VaR calculations",
    ],
    icon: Shield,
    gradient: "from-cyan-500 to-teal-600",
    href: "/services/mars-risk",
  },
  {
    id: "publications",
    name: "Capital Issues Publications",
    shortName: "Publications",
    tagline: "Deep Research. Delivered.",
    description:
      "Access our comprehensive library of research publications, white papers, and in-depth market studies. Expert analysis distilled into actionable investment intelligence.",
    features: [
      "Research publications",
      "White papers",
      "Market studies",
      "Sector reports",
      "Investment guides",
    ],
    icon: BookOpen,
    gradient: "from-slate-500 to-zinc-600",
    href: "/services/publications",
  },
];
