"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

type DropdownKey = "live" | "platform" | "services" | "engage" | null;

const liveItems = [
  { href: "/news-terminal", title: "News Terminal", desc: "Live newswire feed" },
  { href: "/market-indicators", title: "Market Indicators", desc: "Macro dashboard" },
  { href: "/intelligence-reports", title: "Intel Reports", desc: "Daily PDF research" },
];

const platformItems = [
  { href: "/capabilities", title: "Capabilities", desc: "Platform overview" },
  { href: "/what-is-simulator", title: "What is Simulator", desc: "Predictive engine" },
  { href: "/platform-capabilities", title: "Platform Tour", desc: "Modules in detail" },
];

const engageItems = [
  { href: "/newsletters", title: "Newsletters", desc: "Daily & weekly intelligence" },
  { href: "/subscriptions", title: "Subscriptions", desc: "Plans & pricing" },
  { href: "/advertise", title: "Advertise", desc: "Sponsorship opportunities" },
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
    <header className="sticky top-0 z-50 w-full bg-background border-b border-border backdrop-blur-sm">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 font-bold">
          <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center text-xs font-bold">CI</div>
          <span className="hidden sm:inline text-lg">CapitalIssues</span>
        </Link>

        {/* Desktop Navigation */}
        <nav ref={navRef} className="hidden lg:flex items-center gap-8">
          <Link href="/" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            Home
          </Link>

          <DropdownMenuButton
            label="Live"
            isOpen={openDropdown === "live"}
            onToggle={() => setOpenDropdown(openDropdown === "live" ? null : "live")}
          >
            <div className="grid gap-2">
              <div className="px-3 py-2 border-b border-border">
                <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Live Intelligence</p>
              </div>
              {liveItems.map((it) => (
                <Link
                  key={it.href}
                  href={it.href}
                  onClick={closeAll}
                  className="px-3 py-2 hover:bg-secondary rounded transition-colors"
                >
                  <p className="text-sm font-medium text-foreground">{it.title}</p>
                  <p className="text-xs text-muted-foreground">{it.desc}</p>
                </Link>
              ))}
            </div>
          </DropdownMenuButton>

          <DropdownMenuButton
            label="Platform"
            isOpen={openDropdown === "platform"}
            onToggle={() => setOpenDropdown(openDropdown === "platform" ? null : "platform")}
          >
            <div className="grid gap-2">
              <div className="px-3 py-2 border-b border-border">
                <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Platform</p>
              </div>
              {platformItems.map((it) => (
                <Link
                  key={it.href}
                  href={it.href}
                  onClick={closeAll}
                  className="px-3 py-2 hover:bg-secondary rounded transition-colors"
                >
                  <p className="text-sm font-medium text-foreground">{it.title}</p>
                  <p className="text-xs text-muted-foreground">{it.desc}</p>
                </Link>
              ))}
            </div>
          </DropdownMenuButton>

          <DropdownMenuButton
            label="Services"
            isOpen={openDropdown === "services"}
            onToggle={() => setOpenDropdown(openDropdown === "services" ? null : "services")}
          >
            <div className="px-3 py-2 border-b border-border">
              <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Services</p>
            </div>
          </DropdownMenuButton>

          <DropdownMenuButton
            label="Engage"
            isOpen={openDropdown === "engage"}
            onToggle={() => setOpenDropdown(openDropdown === "engage" ? null : "engage")}
          >
            <div className="grid gap-2">
              <div className="px-3 py-2 border-b border-border">
                <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Engage</p>
              </div>
              {engageItems.map((it) => (
                <Link
                  key={it.href}
                  href={it.href}
                  onClick={closeAll}
                  className="px-3 py-2 hover:bg-secondary rounded transition-colors"
                >
                  <p className="text-sm font-medium text-foreground">{it.title}</p>
                  <p className="text-xs text-muted-foreground">{it.desc}</p>
                </Link>
              ))}
            </div>
          </DropdownMenuButton>

          <Link href="/about" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            About
          </Link>
        </nav>

        {/* Right Side Actions */}
        <div className="hidden lg:flex items-center gap-3">
          <Link
            href="/auth/login"
            className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            Login
          </Link>
          <Link
            href="/auth/signup"
            className="px-4 py-2 bg-accent text-accent-foreground rounded-lg text-sm font-semibold hover:bg-accent/90 transition-colors"
          >
            Get Access
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          type="button"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="lg:hidden p-2 hover:bg-secondary rounded transition-colors"
        >
          {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden border-t border-border bg-card">
          <div className="px-4 py-4 space-y-2">
            <Link href="/" className="block px-3 py-2 rounded hover:bg-secondary text-sm font-medium">
              Home
            </Link>
            
            {liveItems.map((it) => (
              <Link
                key={it.href}
                href={it.href}
                className="block px-3 py-2 rounded hover:bg-secondary text-sm"
              >
                {it.title}
              </Link>
            ))}

            <Link href="/about" className="block px-3 py-2 rounded hover:bg-secondary text-sm font-medium">
              About
            </Link>

            <div className="border-t border-border pt-4 mt-4 space-y-2">
              <Link
                href="/auth/login"
                className="block px-4 py-2 rounded text-center text-sm font-medium hover:bg-secondary"
              >
                Login
              </Link>
              <Link
                href="/auth/signup"
                className="block px-4 py-2 bg-accent text-accent-foreground rounded text-center text-sm font-semibold"
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

function DropdownMenuButton({
  label,
  isOpen,
  onToggle,
  children,
}: {
  label: string;
  isOpen: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}) {
  return (
    <div className="relative">
      <button
        type="button"
        onClick={onToggle}
        className="flex items-center gap-1 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
      >
        {label}
        <ChevronDown className={cn("w-4 h-4 transition-transform", isOpen && "rotate-180")} />
      </button>
      {isOpen && (
        <div className="absolute left-0 top-full mt-2 w-64 bg-card border border-border rounded-lg shadow-xl py-2">
          {children}
        </div>
      )}
    </div>
  );
}
