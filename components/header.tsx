"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import { services } from "@/lib/services";
import { cn } from "@/lib/utils";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
            <span className="text-sm font-bold text-primary-foreground">CI</span>
          </div>
          <span className="text-lg font-semibold tracking-tight">Capital Issues</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-1 md:flex">
          <Link
            href="/"
            className="rounded-lg px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
          >
            Home
          </Link>

          {/* Services Dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsServicesOpen(!isServicesOpen)}
              className="flex items-center gap-1 rounded-lg px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
            >
              Services
              <ChevronDown
                className={cn(
                  "h-4 w-4 transition-transform",
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
                <div className="absolute left-0 top-full z-50 mt-2 w-80 rounded-xl border border-border bg-card p-2 shadow-xl">
                  {services.map((service) => (
                    <Link
                      key={service.id}
                      href={service.href}
                      onClick={() => setIsServicesOpen(false)}
                      className="flex items-center gap-3 rounded-lg px-3 py-2 transition-colors hover:bg-secondary"
                    >
                      <div
                        className={cn(
                          "flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br",
                          service.gradient
                        )}
                      >
                        <service.icon className="h-4 w-4 text-white" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-foreground">
                          {service.shortName}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {service.tagline}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              </>
            )}
          </div>

          <Link
            href="/about"
            className="rounded-lg px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
          >
            About
          </Link>
          <Link
            href="/contact"
            className="rounded-lg px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
          >
            Contact
          </Link>
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <Link
            href="/login"
            className="rounded-lg px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            Log in
          </Link>
          <Link
            href="/signup"
            className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Request Access
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="rounded-lg p-2 text-muted-foreground transition-colors hover:bg-secondary md:hidden"
        >
          {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="border-t border-border bg-background md:hidden">
          <div className="mx-auto max-w-7xl space-y-1 px-4 py-4">
            <Link
              href="/"
              onClick={() => setIsMenuOpen(false)}
              className="block rounded-lg px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
            >
              Home
            </Link>
            <div className="py-2">
              <p className="px-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Services
              </p>
              <div className="mt-2 space-y-1">
                {services.map((service) => (
                  <Link
                    key={service.id}
                    href={service.href}
                    onClick={() => setIsMenuOpen(false)}
                    className="flex items-center gap-3 rounded-lg px-4 py-2 transition-colors hover:bg-secondary"
                  >
                    <service.icon className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-foreground">{service.shortName}</span>
                  </Link>
                ))}
              </div>
            </div>
            <Link
              href="/about"
              onClick={() => setIsMenuOpen(false)}
              className="block rounded-lg px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
            >
              About
            </Link>
            <Link
              href="/contact"
              onClick={() => setIsMenuOpen(false)}
              className="block rounded-lg px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
            >
              Contact
            </Link>
            <div className="flex flex-col gap-2 pt-4">
              <Link
                href="/login"
                onClick={() => setIsMenuOpen(false)}
                className="rounded-lg border border-border px-4 py-2 text-center text-sm font-medium text-foreground transition-colors hover:bg-secondary"
              >
                Log in
              </Link>
              <Link
                href="/signup"
                onClick={() => setIsMenuOpen(false)}
                className="rounded-lg bg-primary px-4 py-2 text-center text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
              >
                Request Access
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
