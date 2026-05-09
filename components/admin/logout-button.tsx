"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";

export function AdminLogoutButton() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function logout() {
    setLoading(true);
    await fetch("/api/admin/logout", { method: "POST" });
    router.replace("/admin/login");
    router.refresh();
  }

  return (
    <button
      type="button"
      onClick={logout}
      disabled={loading}
      className="flex w-full items-center gap-2 border border-border bg-background px-3 py-2 text-xs uppercase tracking-widest text-foreground transition-colors hover:border-destructive hover:text-destructive disabled:opacity-60"
    >
      <LogOut className="h-3.5 w-3.5" />
      {loading ? "..." : "Sign Out"}
    </button>
  );
}
