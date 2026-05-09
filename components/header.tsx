"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import {
  Menu,
  X,
  ChevronDown,
  Activity,
  Clock,
  Newspaper,
  BookOpen,
  Terminal,
  TrendingUp,
  FileText,
  Sparkles,
  LayoutGrid,
  Zap,
  Megaphone,
  CreditCard,
  HelpCircle,
} from "lucide-react";
import { services } from "@/lib/services";
import { cn } from "@/lib/utils";

function LiveClock() {
  const [mounted, setMounted] = useState(false);
  const [time, setTime] = useState("--:--:--");

  useEffect(() => {
    setMounted(true);
    const updateTime = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString("en-US", {
          hour12: false,
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  if (!mounted) return <span className="tabular-nums">--:--:--</span>;
  return <span className="tabular-nums">{time}</span>;
}

type DropdownKey = "live" | "platform" | "services" | "engage" | null;

const liveItems = [
  { href: "/news-terminal", title: "News Terminal", desc: "Live newswire feed", icon: Terminal },
  { href: "/market-indicators", title: "Market Indicators", desc: "Macro dashboard", icon: TrendingUp },
  { href: "/intelligence-reports", title: "Intel Reports", desc: "Daily PDF research", icon: FileText },
];

const platformItems = [
  { href: "/capabilities", title: "Capabilities", desc: "Platform overview", icon: Zap },
  { href: "/what-is-simulator", title: "What is Simulator", desc: "Predictive engine", icon: Sparkles },
  { href: "/platform-capabilities", title: "Platform Tour", desc: "Modules in detail", icon: LayoutGrid },
];

const engageItems = [
  { href: "/newsletters", title: "Newsletters", desc: "Daily & weekly intelligence", icon: Newspaper },
  { href: "/subscriptions", title: "Subscriptions", desc: "Plans & pricing", icon: CreditCard },
  { href: "/advertise", title: "Advertise", desc: "Sponsorship opportunities", icon: Megaphone },
  { href: "/get-started", title: "Get Started", desc: "How it works", icon: HelpCircle },
];

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<DropdownKey>(null);
  const navRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const closeAll = () => setOpenDropdown(null);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-card">
      {/* Top Status Bar */}
      <div className="border-b border-border bg-background px-4 py-1">
        <div className="mx-auto flex max-w-7xl items-center justify-between text-xs">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 text-[#3fb950]">
              <Activity className="h-3 w-3" />
              LIVE
            </span>
            <span className="hidden text-muted-foreground sm:inline">
              NYSE: OPEN | NASDAQ: OPEN | LSE: CLOSED
            </span>
          </div>
          <div className="flex items-center gap-4 text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <Clock className="h-3 w-3" />
              <LiveClock /> UTC
            </span>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <div className="mx-auto flex h-12 max-w-7xl items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center border border-primary bg-primary/10">
            <span className="text-xs font-bold text-primary">CI</span>
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-bold tracking-wider text-primary">CAPITALISSUES</span>
            <span className="text-[10px] uppercase tracking-widest text-muted-foreground">
              Intelligence Terminal
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav ref={navRef} className="hidden items-center gap-0.5 lg:flex">
          <Link
            href="/"
            className="border border-transparent px-3 py-1.5 text-xs font-medium uppercase tracking-wide text-muted-foreground transition-colors hover:border-border hover:bg-secondary hover:text-foreground"
          >
            Home
          </Link>

          <DropdownMenu
            label="Live"
            isOpen={openDropdown === "live"}
            onToggle={() => setOpenDropdown(openDropdown === "live" ? null : "live")}
            heading="Live Intelligence"
            width="w-72"
          >
            {liveItems.map((it) => (
              <DropdownLink key={it.href} {...it} onClick={closeAll} />
            ))}
          </DropdownMenu>

          <DropdownMenu
            label="Platform"
            isOpen={openDropdown === "platform"}
            onToggle={() => setOpenDropdown(openDropdown === "platform" ? null : "platform")}
            heading="Platform & Capabilities"
            width="w-72"
          >
            {platformItems.map((it) => (
              <DropdownLink key={it.href} {...it} onClick={closeAll} />
            ))}
          </DropdownMenu>

          <DropdownMenu
            label="Services"
            isOpen={openDropdown === "services"}
            onToggle={() => setOpenDropdown(openDropdown === "services" ? null : "services")}
            heading="Platform Services"
            width="w-72"
          >
            <div className="max-h-80 overflow-y-auto">
              {services.map((service, index) => (
                <Link
                  key={service.id}
                  href={service.href}
                  onClick={closeAll}
                  className="flex items-center gap-3 border-b border-border/50 px-3 py-2 transition-colors last:border-b-0 hover:bg-secondary"
                >
                  <span className="text-[10px] font-bold text-muted-foreground">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <p className="text-xs font-medium text-foreground">{service.shortName}</p>
                    <p className="text-[10px] text-muted-foreground">{service.tagline}</p>
                  </div>
                </Link>
              ))}
            </div>
          </DropdownMenu>

          <DropdownMenu
            label="Engage"
            isOpen={openDropdown === "engage"}
            onToggle={() => setOpenDropdown(openDropdown === "engage" ? null : "engage")}
            heading="Engage & Subscribe"
            width="w-72"
          >
            {engageItems.map((it) => (
              <DropdownLink key={it.href} {...it} onClick={closeAll} />
            ))}
          </DropdownMenu>

          <Link
            href="/about"
            className="border border-transparent px-3 py-1.5 text-xs font-medium uppercase tracking-wide text-muted-foreground transition-colors hover:border-border hover:bg-secondary hover:text-foreground"
          >
            About
          </Link>
          <Link
            href="/contact"
            className="border border-transparent px-3 py-1.5 text-xs font-medium uppercase tracking-wide text-muted-foreground transition-colors hover:border-border hover:bg-secondary hover:text-foreground"
          >
            Contact
          </Link>
        </nav>

        <div className="hidden items-center gap-2 lg:flex">
          <Link
            href="/auth/login"
            className="border border-border px-3 py-1.5 text-xs font-medium uppercase tracking-wide text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
          >
            Login
          </Link>
          <Link
            href="/auth/signup"
            className="border border-primary bg-primary px-3 py-1.5 text-xs font-bold uppercase tracking-wide text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Get Access
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          type="button"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="border border-border p-1.5 text-muted-foreground transition-colors hover:bg-secondary lg:hidden"
        >
          {isMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="border-t border-border bg-card lg:hidden">
          <div className="mx-auto max-w-7xl space-y-0.5 p-2">
            <Link
              href="/"
              onClick={() => setIsMenuOpen(false)}
              className="block border border-transparent px-3 py-2 text-xs font-medium uppercase tracking-wide text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
            >
              Home
            </Link>

            <MobileGroup label="Live Intelligence">
              {liveItems.map((it) => (
                <Link
                  key={it.href}
                  href={it.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="block px-3 py-1.5 text-xs text-foreground transition-colors hover:bg-secondary"
                >
                  {it.title}
                </Link>
              ))}
            </MobileGroup>

            <MobileGroup label="Platform">
              {platformItems.map((it) => (
                <Link
                  key={it.href}
                  href={it.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="block px-3 py-1.5 text-xs text-foreground transition-colors hover:bg-secondary"
                >
                  {it.title}
                </Link>
              ))}
            </MobileGroup>

            <MobileGroup label="Services">
              {services.map((service, index) => (
                <Link
                  key={service.id}
                  href={service.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-center gap-2 px-3 py-1.5 transition-colors hover:bg-secondary"
                >
                  <span className="text-[10px] font-bold text-muted-foreground">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="text-xs text-foreground">{service.shortName}</span>
                </Link>
              ))}
            </MobileGroup>

            <MobileGroup label="Engage">
              {engageItems.map((it) => (
                <Link
                  key={it.href}
                  href={it.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="block px-3 py-1.5 text-xs text-foreground transition-colors hover:bg-secondary"
                >
                  {it.title}
                </Link>
              ))}
            </MobileGroup>

            <Link
              href="/about"
              onClick={() => setIsMenuOpen(false)}
              className="block border border-transparent px-3 py-2 text-xs font-medium uppercase tracking-wide text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
            >
              About
            </Link>
            <Link
              href="/contact"
              onClick={() => setIsMenuOpen(false)}
              className="block border border-transparent px-3 py-2 text-xs font-medium uppercase tracking-wide text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
            >
              Contact
            </Link>

            <div className="flex gap-2 pt-2">
              <Link
                href="/auth/login"
                onClick={() => setIsMenuOpen(false)}
                className="flex-1 border border-border py-2 text-center text-xs font-medium uppercase tracking-wide text-foreground transition-colors hover:bg-secondary"
              >
                Login
              </Link>
              <Link
                href="/auth/signup"
                onClick={() => setIsMenuOpen(false)}
                className="flex-1 border border-primary bg-primary py-2 text-center text-xs font-bold uppercase tracking-wide text-primary-foreground transition-colors hover:bg-primary/90"
              >
                Get Access
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

function DropdownMenu({
  label,
  isOpen,
  onToggle,
  heading,
  width,
  children,
}: {
  label: string;
  isOpen: boolean;
  onToggle: () => void;
  heading: string;
  width: string;
  children: React.ReactNode;
}) {
  return (
    <div className="relative">
      <button
        type="button"
        onClick={onToggle}
        aria-haspopup="menu"
        aria-expanded={isOpen}
        className="flex items-center gap-1 border border-transparent px-3 py-1.5 text-xs font-medium uppercase tracking-wide text-muted-foreground transition-colors hover:border-border hover:bg-secondary hover:text-foreground"
      >
        {label}
        <ChevronDown className={cn("h-3 w-3 transition-transform", isOpen && "rotate-180")} />
      </button>
      {isOpen && (
        <div className={cn("absolute left-0 top-full z-50 mt-1 border border-border bg-card shadow-xl", width)}>
          <div className="border-b border-border bg-secondary/50 px-3 py-2">
            <span className="text-[10px] font-semibold uppercase tracking-widest text-primary">
              {heading}
            </span>
          </div>
          <div>{children}</div>
        </div>
      )}
    </div>
  );
}

function DropdownLink({
  href,
  title,
  desc,
  icon: Icon,
  onClick,
}: {
  href: string;
  title: string;
  desc: string;
  icon: React.ComponentType<{ className?: string }>;
  onClick?: () => void;
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className="flex items-center gap-3 border-b border-border/50 px-3 py-2.5 transition-colors last:border-b-0 hover:bg-secondary"
    >
      <Icon className="h-4 w-4 text-primary" />
      <div>
        <p className="text-xs font-medium text-foreground">{title}</p>
        <p className="text-[10px] text-muted-foreground">{desc}</p>
      </div>
    </Link>
  );
}

function MobileGroup({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="py-1">
      <p className="px-3 text-[10px] font-semibold uppercase tracking-widest text-primary">
        {label}
      </p>
      <div className="mt-1 space-y-0.5">{children}</div>
    </div>
  );
}
