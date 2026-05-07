"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Lock, Loader2 } from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();
  const params = useSearchParams();
  const next = params.get("next") || "/admin";

  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ password }),
      });
      if (!res.ok) {
        const j = await res.json().catch(() => ({}));
        throw new Error(j.error || "Login failed");
      }
      router.replace(next);
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed");
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center bg-background p-4">
      <div className="w-full max-w-md border border-border bg-card">
        <div className="bbg-header text-xs">
          <div>1) ADMIN <span style={{ color: "var(--bbg-amber)" }}>Console</span> - Authentication</div>
          <div>SECURE</div>
        </div>
        <div className="px-6 py-8">
          <div className="mb-6 flex items-center gap-3">
            <Lock className="h-6 w-6 text-primary" />
            <div>
              <h1 className="text-lg font-bold uppercase tracking-widest text-white">
                Restricted Access
              </h1>
              <p className="text-xs text-muted-foreground">
                Capital Issues IQ - Admin Console
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="mb-2 block text-xs uppercase tracking-widest text-muted-foreground">
                Master Password
              </label>
              <input
                type="password"
                autoFocus
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border border-border bg-background px-3 py-3 font-mono text-sm text-foreground outline-none focus:border-primary"
                placeholder="Enter master password"
              />
            </div>

            {error && (
              <div className="border border-destructive/50 bg-destructive/10 px-3 py-2 text-xs text-destructive">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="flex w-full items-center justify-center gap-2 border border-primary bg-primary px-4 py-3 text-sm font-bold uppercase tracking-widest text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-60"
            >
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Lock className="h-4 w-4" />}
              {loading ? "Authenticating" : "Authenticate"}
            </button>
          </form>

          <p className="mt-6 border-t border-border pt-4 text-[10px] uppercase tracking-widest text-muted-foreground">
            Authorized personnel only.
          </p>
        </div>
      </div>
    </div>
  );
}
