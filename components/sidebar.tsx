"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Home,
  Terminal,
  Newspaper,
  Brain,
  Lightbulb,
  TrendingUp,
  Zap,
  PieChart,
  Shield,
  BookOpen,
  CreditCard,
  HelpCircle,
  Info,
  Mail,
  LogIn,
  UserPlus,
  LayoutGrid,
  ChevronDown,
} from "lucide-react";
import { cn } from "@/lib/utils";

type NavItem = {
  label: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  code?: string;
};

type NavSection = {
  label: string;
  code: string;
  items: NavItem[];
};

const sections: NavSection[] = [
  {
    label: "Main",
    code: "MAIN",
    items: [
      { label: "Home", href: "/", icon: Home, code: "HOME" },
      { label: "News Terminal", href: "/news-terminal", icon: Terminal, code: "NEWS" },
      { label: "Platform Capabilities", href: "/platform-capabilities", icon: LayoutGrid, code: "PCAP" },
    ],
  },
  {
    label: "Services",
    code: "SVCS",
    items: [
      { label: "CI Exclusive News", href: "/services/ci-exclusive-news", icon: Newspaper, code: "CIEN" },
      { label: "Market Sentiment", href: "/services/market-sentiment", icon: Brain, code: "MSEN" },
      { label: "CIQ Intelligence", href: "/services/capitalissuesiq-intelligence", icon: Lightbulb, code: "CIQI" },
      { label: "CIQ Economics", href: "/services/capitalissuesiq-economics", icon: TrendingUp, code: "CIQE" },
      { label: "CIQ NEF", href: "/services/capitalissuesiq-nef", icon: Zap, code: "CNEF" },
      { label: "PORT Analytics", href: "/services/port-analytics", icon: PieChart, code: "PORT" },
      { label: "MARS Risk", href: "/services/mars-risk-system", icon: Shield, code: "MARS" },
      { label: "Publications", href: "/services/capital-issues-publications", icon: BookOpen, code: "PUBS" },
    ],
  },
  {
    label: "Resources",
    code: "RSRC",
    items: [
      { label: "Newsletters", href: "/newsletters", icon: Newspaper, code: "NWSL" },
      { label: "Subscriptions", href: "/subscriptions", icon: CreditCard, code: "SUBS" },
      { label: "Get Started", href: "/get-started", icon: HelpCircle, code: "STRT" },
    ],
  },
  {
    label: "Company",
    code: "COMP",
    items: [
      { label: "About", href: "/about", icon: Info, code: "ABT" },
      { label: "Contact", href: "/contact", icon: Mail, code: "MAIL" },
    ],
  },
  {
    label: "Account",
    code: "ACCT",
    items: [
      { label: "Sign In", href: "/auth/login", icon: LogIn, code: "SIGN" },
      { label: "Sign Up", href: "/auth/signup", icon: UserPlus, code: "JOIN" },
    ],
  },
];

export function Sidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    MAIN: true,
    SVCS: true,
    RSRC: true,
    COMP: true,
    ACCT: false,
  });

  useEffect(() => {
    setMounted(true);
    try {
      const saved = localStorage.getItem("sidebar-collapsed");
      if (saved === "true") setCollapsed(true);
    } catch {}
  }, []);

  const toggleCollapsed = () => {
    const next = !collapsed;
    setCollapsed(next);
    try {
      localStorage.setItem("sidebar-collapsed", String(next));
    } catch {}
  };

  const toggleSection = (code: string) => {
    setOpenSections((prev) => ({ ...prev, [code]: !prev[code] }));
  };

  return (
    <aside
      className={cn(
        "sticky top-16 z-40 hidden h-[calc(100vh-4rem)] shrink-0 border-r border-border bg-card transition-[width] duration-300 ease-out md:block",
        mounted && collapsed ? "w-14" : "w-72"
      )}
      aria-label="Primary navigation"
    >
      {/* Sidebar Header with toggle */}
      <div className="flex h-12 items-center justify-between border-b border-border bg-secondary/50 px-3">
        {(!collapsed || !mounted) && (
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-primary">
            <Terminal className="h-4 w-4" />
            <span>Terminal Menu</span>
          </div>
        )}
        <button
          type="button"
          onClick={toggleCollapsed}
          className="ml-auto flex h-8 w-8 items-center justify-center rounded border border-border bg-background text-muted-foreground transition-colors hover:border-primary hover:text-primary"
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          aria-expanded={!collapsed}
        >
          {collapsed ? (
            <ChevronRight className="h-4 w-4" />
          ) : (
            <ChevronLeft className="h-4 w-4" />
          )}
        </button>
      </div>

      {/* Nav body */}
      <nav className="h-[calc(100%-3rem)] overflow-y-auto py-4">
        {sections.map((section) => {
          const isOpen = openSections[section.code] ?? true;
          return (
            <div key={section.code} className="mb-5">
              {!collapsed && (
                <button
                  type="button"
                  onClick={() => toggleSection(section.code)}
                  className="flex w-full items-center justify-between px-4 py-3 text-xs font-semibold uppercase tracking-widest text-muted-foreground transition-colors hover:text-primary"
                >
                  <span className="flex items-center gap-2.5">
                    <span className="text-primary">[{section.code}]</span>
                    <span>{section.label}</span>
                  </span>
                  <ChevronDown
                    className={cn(
                      "h-3.5 w-3.5 transition-transform duration-200",
                      isOpen ? "rotate-0" : "-rotate-90"
                    )}
                  />
                </button>
              )}

              {(isOpen || collapsed) && (
                <ul className="space-y-1.5">
                  {section.items.map((item) => {
                    const isActive =
                      item.href === pathname ||
                      (item.href !== "/" && pathname.startsWith(item.href));
                    const Icon = item.icon;
                    return (
                      <li key={item.href}>
                        <Link
                          href={item.href}
                          className={cn(
                            "group relative flex items-center gap-3 border-l-2 px-4 py-3 text-sm leading-relaxed transition-colors",
                            isActive
                              ? "border-primary bg-primary/10 text-primary"
                              : "border-transparent text-foreground hover:border-primary/50 hover:bg-secondary hover:text-primary",
                            collapsed && "justify-center px-2"
                          )}
                          title={collapsed ? item.label : undefined}
                        >
                          <Icon
                            className={cn(
                              "h-5 w-5 shrink-0",
                              isActive ? "text-primary" : "text-muted-foreground group-hover:text-primary"
                            )}
                          />
                          {!collapsed && (
                            <>
                              <span className="flex-1 truncate">{item.label}</span>
                              {item.code && (
                                <span className="font-mono text-[11px] text-muted-foreground/60">
                                  {item.code}
                                </span>
                              )}
                            </>
                          )}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>
          );
        })}

        {/* Footer status when expanded */}
        {!collapsed && (
          <div className="mt-6 border-t border-border px-4 py-4">
            <div className="flex items-center gap-2.5 text-xs uppercase tracking-widest text-muted-foreground">
              <span className="h-2 w-2 animate-pulse rounded-full bg-[#3fb950]" />
              <span>System Online</span>
            </div>
            <p className="mt-2 font-mono text-[11px] leading-relaxed text-muted-foreground/70">
              v2.0.0 / build 2026.05
            </p>
          </div>
        )}
      </nav>
    </aside>
  );
}
