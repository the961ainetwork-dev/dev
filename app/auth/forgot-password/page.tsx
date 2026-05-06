"use client";

import { useState } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { Mail, ArrowRight, ArrowLeft, Terminal, CheckCircle } from "lucide-react";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const supabase = createClient();
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/auth/reset-password`,
    });

    if (error) {
      setError(error.message);
      setLoading(false);
    } else {
      setSuccess(true);
      setLoading(false);
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
                Password Recovery
              </span>
            </div>
            <span className="text-[10px] text-muted-foreground">SECURE</span>
          </div>

          <div className="p-6">
            {success ? (
              /* Success State */
              <div className="text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center border border-[#3fb950] bg-[#3fb950]/10">
                  <CheckCircle className="h-8 w-8 text-[#3fb950]" />
                </div>
                <h2 className="mb-2 text-lg font-bold text-foreground">Check Your Email</h2>
                <p className="mb-6 text-sm text-muted-foreground">
                  We&apos;ve sent password reset instructions to <span className="font-mono text-primary">{email}</span>
                </p>
                <div className="space-y-3">
                  <Link
                    href="/auth/login"
                    className="flex w-full items-center justify-center gap-2 border border-primary bg-primary px-4 py-3 text-sm font-bold uppercase tracking-wider text-primary-foreground transition-colors hover:bg-primary/90"
                  >
                    Back to Login
                  </Link>
                  <button
                    onClick={() => {
                      setSuccess(false);
                      setEmail("");
                    }}
                    className="w-full border border-border px-4 py-3 text-sm font-medium uppercase tracking-wider text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
                  >
                    Try Different Email
                  </button>
                </div>
              </div>
            ) : (
              /* Form State */
              <>
                {/* Info Message */}
                <div className="mb-6 border-l-2 border-primary bg-primary/5 p-4">
                  <p className="font-mono text-xs text-muted-foreground">
                    <span className="text-primary">$</span> SYSTEM.AUTH.RECOVER
                  </p>
                  <p className="mt-2 text-sm text-foreground">
                    Enter your email address and we&apos;ll send you instructions to reset your password.
                  </p>
                </div>

                {error && (
                  <div className="mb-4 border border-destructive/50 bg-destructive/10 p-3">
                    <p className="font-mono text-xs text-destructive">ERROR: {error}</p>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
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

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={loading}
                    className="flex w-full items-center justify-center gap-2 border border-primary bg-primary px-4 py-3 text-sm font-bold uppercase tracking-wider text-primary-foreground transition-colors hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {loading ? (
                      <span className="animate-pulse">Sending...</span>
                    ) : (
                      <>
                        Send Reset Link
                        <ArrowRight className="h-4 w-4" />
                      </>
                    )}
                  </button>
                </form>

                {/* Back to Login */}
                <div className="mt-6 border-t border-border pt-4">
                  <Link
                    href="/auth/login"
                    className="flex items-center justify-center gap-2 text-xs text-muted-foreground hover:text-foreground"
                  >
                    <ArrowLeft className="h-3 w-3" />
                    Back to Login
                  </Link>
                </div>
              </>
            )}
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
