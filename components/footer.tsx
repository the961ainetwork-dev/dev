import Link from "next/link";
import { services } from "@/lib/services";
import { Activity } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-border bg-card">
      <div className="mx-auto max-w-7xl px-4 py-8">
        {/* Main Footer Content */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-7 w-7 items-center justify-center border border-primary bg-primary/10">
                <span className="text-xs font-bold text-primary">CI</span>
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-bold tracking-wider text-primary">CAPITALISSUES</span>
                <span className="text-[8px] uppercase tracking-widest text-muted-foreground">Intelligence Terminal</span>
              </div>
            </Link>
            <p className="text-xs text-muted-foreground">
              Real-time market intelligence and research for institutional investors.
            </p>
            <div className="flex items-center gap-2 text-xs">
              <Activity className="h-3 w-3 text-[#3fb950]" />
              <span className="text-[#3fb950]">All Systems Operational</span>
            </div>
          </div>

          {/* Services */}
          <div>
            <div className="mb-4 border-b border-border pb-2">
              <h3 className="text-[10px] font-semibold uppercase tracking-widest text-primary">
                Platform Modules
              </h3>
            </div>
            <ul className="space-y-2">
              {services.slice(0, 5).map((service, index) => (
                <li key={service.id}>
                  <Link
                    href={service.href}
                    className="flex items-center gap-2 text-xs text-muted-foreground transition-colors hover:text-foreground"
                  >
                    <span className="text-[10px] tabular-nums text-border">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    {service.shortName}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* More Services */}
          <div>
            <div className="mb-4 border-b border-border pb-2">
              <h3 className="text-[10px] font-semibold uppercase tracking-widest text-primary">
                Solutions
              </h3>
            </div>
            <ul className="space-y-2">
              {services.slice(5).map((service, index) => (
                <li key={service.id}>
                  <Link
                    href={service.href}
                    className="flex items-center gap-2 text-xs text-muted-foreground transition-colors hover:text-foreground"
                  >
                    <span className="text-[10px] tabular-nums text-border">
                      {String(index + 6).padStart(2, "0")}
                    </span>
                    {service.shortName}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/about"
                  className="text-xs text-muted-foreground transition-colors hover:text-foreground"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-xs text-muted-foreground transition-colors hover:text-foreground"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <div className="mb-4 border-b border-border pb-2">
              <h3 className="text-[10px] font-semibold uppercase tracking-widest text-primary">
                Legal & Compliance
              </h3>
            </div>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/privacy"
                  className="text-xs text-muted-foreground transition-colors hover:text-foreground"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="text-xs text-muted-foreground transition-colors hover:text-foreground"
                >
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link
                  href="/compliance"
                  className="text-xs text-muted-foreground transition-colors hover:text-foreground"
                >
                  Regulatory Compliance
                </Link>
              </li>
              <li>
                <Link
                  href="/security"
                  className="text-xs text-muted-foreground transition-colors hover:text-foreground"
                >
                  Security
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 border-t border-border pt-6">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <p className="text-[10px] uppercase tracking-wide text-muted-foreground">
              &copy; {new Date().getFullYear()} Capital Issues. All rights reserved.
            </p>
            <div className="flex items-center gap-4 text-[10px] text-muted-foreground">
              <span>Version 4.2.1</span>
              <span className="text-border">|</span>
              <span>Build 2024.05.06</span>
              <span className="text-border">|</span>
              <span className="text-[#3fb950]">Connected</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
