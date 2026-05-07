"use client";

import { useEffect, useState } from "react";
import { Rocket, CheckCircle2, AlertTriangle, Loader2 } from "lucide-react";

type Status = "idle" | "loading" | "success" | "error";

export function PublishButton() {
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState<string>("");
  const [configured, setConfigured] = useState<boolean | null>(null);

  useEffect(() => {
    fetch("/api/admin/deploy")
      .then((r) => r.json())
      .then((d) => setConfigured(Boolean(d.configured)))
      .catch(() => setConfigured(null));
  }, []);

  const handlePublish = async () => {
    if (status === "loading") return;
    if (
      !window.confirm(
        "This will trigger a production deployment of the live site. Continue?"
      )
    ) {
      return;
    }
    setStatus("loading");
    setMessage("Triggering production deployment...");
    try {
      const res = await fetch("/api/admin/deploy", { method: "POST" });
      const data = await res.json();
      if (res.ok) {
        setStatus("success");
        setMessage(data.message ?? "Deployment triggered");
        setTimeout(() => {
          setStatus("idle");
          setMessage("");
        }, 6000);
      } else {
        setStatus("error");
        setMessage(data.message ?? data.error ?? "Failed to trigger deploy");
      }
    } catch {
      setStatus("error");
      setMessage("Network error. Please try again.");
    }
  };

  const isLoading = status === "loading";
  const isSuccess = status === "success";
  const isError = status === "error";

  return (
    <div className="space-y-2">
      <button
        type="button"
        onClick={handlePublish}
        disabled={isLoading || configured === false}
        className={`flex w-full items-center justify-center gap-2 border px-3 py-2 text-xs font-semibold uppercase tracking-widest transition-colors disabled:cursor-not-allowed disabled:opacity-50 ${
          isSuccess
            ? "border-[#3fb950] bg-[#3fb950]/10 text-[#3fb950]"
            : isError
            ? "border-destructive bg-destructive/10 text-destructive"
            : "border-primary bg-primary text-primary-foreground hover:bg-primary/90"
        }`}
        title={
          configured === false
            ? "VERCEL_DEPLOY_HOOK_URL is not configured"
            : "Publish all changes to production"
        }
      >
        {isLoading ? (
          <>
            <Loader2 className="h-3.5 w-3.5 animate-spin" />
            Publishing...
          </>
        ) : isSuccess ? (
          <>
            <CheckCircle2 className="h-3.5 w-3.5" />
            Triggered
          </>
        ) : isError ? (
          <>
            <AlertTriangle className="h-3.5 w-3.5" />
            Retry
          </>
        ) : (
          <>
            <Rocket className="h-3.5 w-3.5" />
            Publish &amp; Update
          </>
        )}
      </button>

      {message && (
        <p
          className={`text-[10px] leading-relaxed ${
            isError
              ? "text-destructive"
              : isSuccess
              ? "text-[#3fb950]"
              : "text-muted-foreground"
          }`}
        >
          {message}
        </p>
      )}

      {configured === false && (
        <p className="text-[10px] leading-relaxed text-muted-foreground">
          Configure <code className="text-primary">VERCEL_DEPLOY_HOOK_URL</code>{" "}
          in Vars to enable.
        </p>
      )}
    </div>
  );
}
