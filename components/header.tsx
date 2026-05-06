"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu, X, ChevronDown, Activity, Clock, Newspaper, BookOpen, Terminal } from "lucide-react";
import { services } from "@/lib/services";
import { cn } from "@/lib/utils";

function LiveClock() {
  const [time, setTime] = useState<string>("");
  
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString("en-US", { 
        hour12: false, 
        hour: "2-digit", 
        minute: "2-digit", 
        second: "2-digit" 
      }));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return <span className="tabular-nums">{time || "00:00:00"}</span>;
}

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [isResourcesOpen, setIsResourcesOpen] = useState(false);

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
            <span className="text-[10px] uppercase tracking-widest text-muted-foreground">Intelligence Terminal</span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-0.5 lg:flex">
          <Link
            href="/"
            className="border border-transparent px-3 py-1.5 text-xs font-medium uppercase tracking-wide text-muted-foreground transition-colors hover:border-border hover:bg-secondary hover:text-foreground"
          >
            Home
          </Link>

          {/* Services Dropdown */}
          <div className="relative">
            <button
              onClick={() => {
                setIsServicesOpen(!isServicesOpen);
                setIsResourcesOpen(false);
              }}
              className="flex items-center gap-1 border border-transparent px-3 py-1.5 text-xs font-medium uppercase tracking-wide text-muted-foreground transition-colors hover:border-border hover:bg-secondary hover:text-foreground"
            >
              Services
              <ChevronDown
                className={cn(
                  "h-3 w-3 transition-transform",
                  isServicesOpen && "rotate-180"
                )}
              />
            </button>

            {isServicesOpen && (
              <>
                <div
                  className="fixed inset-0 z-40"
                  onClick={() => setIsServicesOpen(false)}
                />
                <div className="absolute left-0 top-full z-50 mt-1 w-72 border border-border bg-card shadow-xl">
                  <div className="border-b border-border bg-secondary/50 px-3 py-2">
                    <span className="text-[10px] font-semibold uppercase tracking-widest text-primary">
                      Platform Services
                    </span>
                  </div>
                  <div className="max-h-80 overflow-y-auto">
                    {services.map((service, index) => (
                      <Link
                        key={service.id}
                        href={service.href}
                        onClick={() => setIsServicesOpen(false)}
                        className="flex items-center gap-3 border-b border-border/50 px-3 py-2 transition-colors hover:bg-secondary last:border-b-0"
                      >
                        <span className="text-[10px] font-bold text-muted-foreground">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        <div>
                          <p className="text-xs font-medium text-foreground">
                            {service.shortName}
                          </p>
                          <p className="text-[10px] text-muted-foreground">
                            {service.tagline}
                          </p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Resources Dropdown */}
          <div className="relative">
            <button
              onClick={() => {
                setIsResourcesOpen(!isResourcesOpen);
                setIsServicesOpen(false);
              }}
              className="flex items-center gap-1 border border-transparent px-3 py-1.5 text-xs font-medium uppercase tracking-wide text-muted-foreground transition-colors hover:border-border hover:bg-secondary hover:text-foreground"
            >
              Resources
              <ChevronDown
                className={cn(
                  "h-3 w-3 transition-transform",
                  isResourcesOpen && "rotate-180"
                )}
              />
            </button>

            {isResourcesOpen && (
              <>
                <div
                  className="fixed inset-0 z-40"
                  onClick={() => setIsResourcesOpen(false)}
                />
                <div className="absolute left-0 top-full z-50 mt-1 w-64 border border-border bg-card shadow-xl">
                  <div className="border-b border-border bg-secondary/50 px-3 py-2">
                    <span className="text-[10px] font-semibold uppercase tracking-widest text-primary">
                      Resources & Info
                    </span>
                  </div>
                  <div>
                    <Link
                      href="/news-terminal"
                      onClick={() => setIsResourcesOpen(false)}
                      className="flex items-center gap-3 border-b border-border/50 px-3 py-2.5 transition-colors hover:bg-secondary"
                    >
                      <Terminal className="h-4 w-4 text-primary" />
                      <div>
                        <p className="text-xs font-medium text-foreground">News Terminal</p>
                        <p className="text-[10px] text-muted-foreground">Live newswire feed</p>
                      </div>
                    </Link>
                    <Link
                      href="/newsletters"
                      onClick={() => setIsResourcesOpen(false)}
                      className="flex items-center gap-3 border-b border-border/50 px-3 py-2.5 transition-colors hover:bg-secondary"
                    >
                      <Newspaper className="h-4 w-4 text-primary" />
                      <div>
                        <p className="text-xs font-medium text-foreground">Newsletters</p>
                        <p className="text-[10px] text-muted-foreground">Daily & weekly intelligence</p>
                      </div>
                    </Link>
                    <Link
                      href="/subscriptions"
                      onClick={() => setIsResourcesOpen(false)}
                      className="flex items-center gap-3 border-b border-border/50 px-3 py-2.5 transition-colors hover:bg-secondary"
                    >
                      <BookOpen className="h-4 w-4 text-primary" />
                      <div>
                        <p className="text-xs font-medium text-foreground">Subscriptions</p>
                        <p className="text-[10px] text-muted-foreground">Plans & pricing</p>
                      </div>
                    </Link>
                    <Link
                      href="/get-started"
                      onClick={() => setIsResourcesOpen(false)}
                      className="flex items-center gap-3 px-3 py-2.5 transition-colors hover:bg-secondary"
                    >
                      <Activity className="h-4 w-4 text-primary" />
                      <div>
                        <p className="text-xs font-medium text-foreground">Get Started</p>
                        <p className="text-[10px] text-muted-foreground">How it works</p>
                      </div>
                    </Link>
                  </div>
                </div>
              </>
            )}
          </div>

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
          onClick={() => setIsMenuOpen(!isMenuOpen)}
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

            {/* Mobile Services */}
            <div className="py-1">
              <p className="px-3 text-[10px] font-semibold uppercase tracking-widest text-primary">
                Services
              </p>
              <div className="mt-1 space-y-0.5">
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
              </div>
            </div>

            {/* Mobile Resources */}
            <div className="py-1">
              <p className="px-3 text-[10px] font-semibold uppercase tracking-widest text-primary">
                Resources
              </p>
              <div className="mt-1 space-y-0.5">
                <Link
                  href="/news-terminal"
                  onClick={() => setIsMenuOpen(false)}
                  className="block px-3 py-1.5 text-xs text-foreground transition-colors hover:bg-secondary"
                >
                  News Terminal
                </Link>
                <Link
                  href="/newsletters"
                  onClick={() => setIsMenuOpen(false)}
                  className="block px-3 py-1.5 text-xs text-foreground transition-colors hover:bg-secondary"
                >
                  Newsletters
                </Link>
                <Link
                  href="/subscriptions"
                  onClick={() => setIsMenuOpen(false)}
                  className="block px-3 py-1.5 text-xs text-foreground transition-colors hover:bg-secondary"
                >
                  Subscriptions
                </Link>
                <Link
                  href="/get-started"
                  onClick={() => setIsMenuOpen(false)}
                  className="block px-3 py-1.5 text-xs text-foreground transition-colors hover:bg-secondary"
                >
                  Get Started
                </Link>
              </div>
            </div>

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
