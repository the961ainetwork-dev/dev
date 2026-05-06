import Link from "next/link";
import { Terminal, AlertTriangle } from "lucide-react";

export default function AuthErrorPage() {
  return (
    <div className="flex min-h-[calc(100vh-8rem)] items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        {/* Terminal Header */}
        <div className="border border-border bg-card">
          <div className="flex items-center justify-between border-b border-border bg-secondary/50 px-4 py-2">
            <div className="flex items-center gap-2">
              <Terminal className="h-4 w-4 text-destructive" />
              <span className="text-xs font-semibold uppercase tracking-wider text-destructive">
                Authentication Error
              </span>
            </div>
            <span className="text-[10px] text-muted-foreground">ERROR</span>
          </div>

          <div className="p-6 text-center">
            {/* Error Icon */}
            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center border border-destructive bg-destructive/10">
              <AlertTriangle className="h-10 w-10 text-destructive" />
            </div>

            <h1 className="mb-2 text-xl font-bold text-foreground">
              Authentication Failed
            </h1>
            <p className="mb-6 text-sm text-muted-foreground">
              There was an error processing your authentication request. This could be due to an expired link or invalid credentials.
            </p>

            {/* Error Details */}
            <div className="mb-6 border border-destructive/30 bg-destructive/5 p-4 text-left font-mono text-xs text-destructive">
              <p>ERROR_CODE: AUTH_CALLBACK_FAILED</p>
              <p>STATUS: INVALID_OR_EXPIRED_TOKEN</p>
            </div>

            {/* Actions */}
            <div className="space-y-3">
              <Link
                href="/auth/login"
                className="flex w-full items-center justify-center gap-2 border border-primary bg-primary px-4 py-3 text-sm font-bold uppercase tracking-wider text-primary-foreground transition-colors hover:bg-primary/90"
              >
                Try Again
              </Link>
              <Link
                href="/contact"
                className="block w-full border border-border px-4 py-3 text-sm font-medium uppercase tracking-wider text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
              >
                Contact Support
              </Link>
            </div>
          </div>
        </div>

        {/* Terminal Footer */}
        <div className="mt-4 text-center">
          <p className="font-mono text-[10px] text-muted-foreground">
            If this issue persists, please contact support@capitalissuesiq.xyz
          </p>
        </div>
      </div>
    </div>
  );
}
