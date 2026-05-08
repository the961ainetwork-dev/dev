"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Newspaper, LayoutGrid, Briefcase, Users, Mail, FileText } from "lucide-react";

const items = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard, code: "DASH" },
  { href: "/admin/news", label: "News Stories", icon: Newspaper, code: "NEWS" },
  { href: "/admin/reports", label: "Intel Reports", icon: FileText, code: "RPTS" },
  { href: "/admin/sections", label: "Sections", icon: LayoutGrid, code: "SECT" },
  { href: "/admin/services", label: "Services", icon: Briefcase, code: "SVCS" },
  { href: "/admin/subscribers", label: "Subscribers", icon: Users, code: "SUBS" },
  { href: "/admin/contacts", label: "Contacts", icon: Mail, code: "MAIL" },
];

export function AdminNav() {
  const pathname = usePathname();
  return (
    <nav className="space-y-1">
      {items.map((item) => {
        const Icon = item.icon;
        const active = pathname === item.href || (item.href !== "/admin" && pathname.startsWith(item.href));
        return (
          <Link
            key={item.href}
            href={item.href}
            className={`flex items-center justify-between border-l-2 px-3 py-2 text-xs transition-colors ${
              active
                ? "border-primary bg-primary/10 text-primary"
                : "border-transparent text-foreground hover:border-primary/50 hover:bg-secondary hover:text-primary"
            }`}
          >
            <span className="flex items-center gap-2">
              <Icon className="h-4 w-4" />
              <span>{item.label}</span>
            </span>
            <span className="font-mono text-[10px] text-muted-foreground/60">[{item.code}]</span>
          </Link>
        );
      })}
    </nav>
  );
}
