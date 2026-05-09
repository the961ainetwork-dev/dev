import Link from "next/link";
import { Terminal, CheckCircle, Mail } from "lucide-react";

export default function SignUpSuccessPage() {
  return (
    <div className="flex min-h-[calc(100vh-8rem)] items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        {/* Terminal Header */}
        <div className="border border-border bg-card">
          <div className="flex items-center justify-between border-b border-border bg-secondary/50 px-4 py-2">
            <div className="flex items-center gap-2">
              <Terminal className="h-4 w-4 text-[#3fb950]" />
              <span className="text-xs font-semibold uppercase tracking-wider text-[#3fb950]">
                Registration Complete
              </span>
            </div>
            <span className="text-[10px] text-muted-foreground">SUCCESS</span>
          </div>

          <div className="p-6 text-center">
            {/* Success Icon */}
            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center border border-[#3fb950] bg-[#3fb950]/10">
              <CheckCircle className="h-10 w-10 text-[#3fb950]" />
            </div>

            <h1 className="mb-2 text-xl font-bold text-foreground">
              Account Created Successfully
            </h1>
            <p className="mb-6 text-sm text-muted-foreground">
              Welcome to the CapitalIssuesIQ network. Your account is ready to be activated.
            </p>

            {/* Email Verification Notice */}
            <div className="mb-6 border border-border bg-secondary/30 p-4 text-left">
              <div className="mb-2 flex items-center gap-2">
                <Mail className="h-4 w-4 text-primary" />
                <span className="text-xs font-semibold uppercase tracking-wider text-primary">
                  Verify Your Email
                </span>
              </div>
              <p className="text-xs text-muted-foreground">
                We&apos;ve sent a verification link to your email address. Please check your inbox and click the link to activate your account.
              </p>
            </div>

            {/* Next Steps */}
            <div className="mb-6 space-y-2 text-left">
              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Next Steps:
              </p>
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-xs text-foreground">
                  <span className="font-mono text-primary">01</span>
                  Check your email inbox
                </div>
                <div className="flex items-center gap-2 text-xs text-foreground">
                  <span className="font-mono text-primary">02</span>
                  Click the verification link
                </div>
                <div className="flex items-center gap-2 text-xs text-foreground">
                  <span className="font-mono text-primary">03</span>
                  Sign in to access the terminal
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-3">
              <Link
                href="/auth/login"
                className="flex w-full items-center justify-center gap-2 border border-primary bg-primary px-4 py-3 text-sm font-bold uppercase tracking-wider text-primary-foreground transition-colors hover:bg-primary/90"
              >
                Go to Login
              </Link>
              <Link
                href="/get-started"
                className="block w-full border border-border px-4 py-3 text-sm font-medium uppercase tracking-wider text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
              >
                Learn How It Works
              </Link>
            </div>
          </div>
        </div>

        {/* Terminal Footer */}
        <div className="mt-4 text-center">
          <p className="font-mono text-[10px] text-muted-foreground">
            Didn&apos;t receive the email? Check your spam folder or contact support@capitalissuesiq.xyz
          </p>
        </div>
      </div>
    </div>
  );
}
