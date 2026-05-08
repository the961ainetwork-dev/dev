"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Lock, Mail, ArrowRight, Terminal, Eye, EyeOff } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const supabase = createClient();
    if (!supabase) {
      setError("Authentication service is not available. Please try again later.");
      setLoading(false);
      return;
    }
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError(error.message);
      setLoading(false);
    } else {
      const params = new URLSearchParams(window.location.search);
      const redirect = params.get("redirect") || "/intelligence-reports";
      router.push(redirect);
      router.refresh();
    }
  };

  return (
    <div className="flex min-h-[calc(100vh-8rem)] items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        {/* Terminal Header */}
        <div className="border border-border bg-card">
          <div className="flex items-center justify-between border-b border-border bg-secondary/50 px-4 py-2">
            <div className="flex items-center gap-2">
              <Terminal className="h-4 w-4 text-primary" />
              <span className="text-xs font-semibold uppercase tracking-wider text-primary">
                Authentication Portal
              </span>
            </div>
            <span className="text-[10px] text-muted-foreground">v2.4.1</span>
          </div>

          <div className="p-6">
            {/* Welcome Message */}
            <div className="mb-6 border-l-2 border-primary bg-primary/5 p-4">
              <p className="font-mono text-xs text-muted-foreground">
                <span className="text-primary">$</span> SYSTEM.AUTH.LOGIN
              </p>
              <p className="mt-2 text-sm text-foreground">
                Welcome back to CapitalIssuesIQ. Enter your credentials to access the terminal.
              </p>
            </div>

            {error && (
              <div className="mb-4 border border-destructive/50 bg-destructive/10 p-3">
                <p className="font-mono text-xs text-destructive">
                  ERROR: {error}
                </p>
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-4">
              {/* Email Field */}
              <div>
                <label className="mb-1.5 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  <Mail className="h-3 w-3" />
                  Email Address
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full border border-border bg-background px-4 py-2.5 font-mono text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                  placeholder="trader@firm.com"
                />
              </div>

              {/* Password Field */}
              <div>
                <label className="mb-1.5 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  <Lock className="h-3 w-3" />
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full border border-border bg-background px-4 py-2.5 pr-10 font-mono text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                    placeholder="Enter password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </div>

              {/* Forgot Password Link */}
              <div className="flex justify-end">
                <Link
                  href="/auth/forgot-password"
                  className="text-xs text-primary hover:underline"
                >
                  Forgot password?
                </Link>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="flex w-full items-center justify-center gap-2 border border-primary bg-primary px-4 py-3 text-sm font-bold uppercase tracking-wider text-primary-foreground transition-colors hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <span className="animate-pulse">Authenticating...</span>
                  </>
                ) : (
                  <>
                    Access Terminal
                    <ArrowRight className="h-4 w-4" />
                  </>
                )}
              </button>
            </form>

            {/* Sign Up Link */}
            <div className="mt-6 border-t border-border pt-4 text-center">
              <p className="text-xs text-muted-foreground">
                New to CapitalIssuesIQ?{" "}
                <Link href="/auth/signup" className="font-semibold text-primary hover:underline">
                  Create an account
                </Link>
              </p>
            </div>
          </div>
        </div>

        {/* Terminal Footer */}
        <div className="mt-4 text-center">
          <p className="font-mono text-[10px] text-muted-foreground">
            SECURE CONNECTION ESTABLISHED | TLS 1.3 | 256-BIT ENCRYPTION
          </p>
        </div>
      </div>
    </div>
  );
}
