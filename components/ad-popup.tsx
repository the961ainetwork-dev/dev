"use client";

import { useEffect, useState } from "react";
import { X, ArrowUpRight, Sparkles } from "lucide-react";
import Link from "next/link";

type Ad = {
  id: string;
  title: string;
  sponsor_name: string;
  description: string | null;
  ad_type: string;
  image_url: string | null;
  logo_url: string | null;
  link_url: string | null;
  cta_text: string | null;
  tier: string;
};

interface Props {
  screen: string;
  delayMs?: number;
}

const STORAGE_PREFIX = "ad_popup_dismissed_";
const DISMISS_HOURS = 24;

export function AdPopup({ screen, delayMs = 8000 }: Props) {
  const [ad, setAd] = useState<Ad | null>(null);
  const [open, setOpen] = useState(false);
  const [adding, setAdding] = useState(false);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    let cancelled = false;
    let timeoutId: ReturnType<typeof setTimeout> | undefined;

    const load = async () => {
      try {
        const res = await fetch(`/api/ads?screen=${encodeURIComponent(screen)}`);
        if (!res.ok) return;
        const json = await res.json();
        const ads: Ad[] = json.ads ?? [];
        if (!ads.length) return;

        const candidate =
          ads.find((a) => a.ad_type === "leader_card" || a.ad_type === "newsletter_sponsor") ??
          ads[0];

        const dismissedKey = `${STORAGE_PREFIX}${candidate.id}`;
        const dismissedAt =
          typeof window !== "undefined" ? window.localStorage.getItem(dismissedKey) : null;
        if (dismissedAt) {
          const ageHours = (Date.now() - Number(dismissedAt)) / (1000 * 60 * 60);
          if (ageHours < DISMISS_HOURS) return;
        }

        if (cancelled) return;
        setAd(candidate);
        timeoutId = setTimeout(() => {
          if (!cancelled) setOpen(true);
        }, delayMs);
      } catch (e) {
        console.error("[v0] AdPopup load failed:", e);
      }
    };

    load();
    return () => {
      cancelled = true;
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [screen, delayMs]);

  const dismiss = () => {
    if (ad && typeof window !== "undefined") {
      window.localStorage.setItem(`${STORAGE_PREFIX}${ad.id}`, String(Date.now()));
    }
    setOpen(false);
  };

  const addToScreen = async () => {
    if (!ad) return;
    setAdding(true);
    try {
      const data = {
        title: `Capital Issues IQ — ${ad.sponsor_name}`,
        text: `${ad.title}: ${ad.description ?? ""}`,
        url: ad.link_url ?? window.location.href,
      };
      // Try Web Share API first (mobile).
      if (typeof navigator !== "undefined" && (navigator as Navigator & { share?: (data: ShareData) => Promise<void> }).share) {
        try {
          await (navigator as Navigator & { share: (data: ShareData) => Promise<void> }).share(data);
          setAdded(true);
          return;
        } catch {
          // user cancelled or unsupported, fall through
        }
      }
      // Fallback: copy link to clipboard so user can pin/save.
      if (navigator.clipboard && ad.link_url) {
        await navigator.clipboard.writeText(ad.link_url);
      }
      setAdded(true);
    } catch (e) {
      console.error("[v0] addToScreen failed:", e);
    } finally {
      setAdding(false);
      setTimeout(() => {
        setAdded(false);
        dismiss();
      }, 2200);
    }
  };

  if (!open || !ad) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center p-4 sm:items-center" role="dialog" aria-modal="true" aria-labelledby="ad-popup-title">
      <button
        type="button"
        aria-label="Close advertisement"
        onClick={dismiss}
        className="absolute inset-0 bg-background/80 backdrop-blur-sm"
      />
      <div className="relative z-10 w-full max-w-md border border-primary/40 bg-card shadow-2xl">
        <div className="flex items-center justify-between border-b border-border bg-background px-3 py-2">
          <div className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-primary">
            <Sparkles className="h-3 w-3" />
            Sponsored
            <span className="text-muted-foreground">| {ad.tier}</span>
          </div>
          <button
            type="button"
            onClick={dismiss}
            aria-label="Dismiss"
            className="text-muted-foreground hover:text-foreground"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {ad.image_url && (
          <div className="aspect-[16/8] w-full overflow-hidden bg-background">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={ad.image_url} alt={ad.sponsor_name} className="h-full w-full object-cover" />
          </div>
        )}

        <div className="p-5">
          <p className="text-[10px] uppercase tracking-widest text-muted-foreground">
            {ad.sponsor_name}
          </p>
          <h3 id="ad-popup-title" className="mt-1 font-serif text-xl text-foreground">
            {ad.title}
          </h3>
          {ad.description && (
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{ad.description}</p>
          )}

          <div className="mt-5 flex flex-col gap-2 sm:flex-row">
            {ad.link_url && (
              <Link
                href={ad.link_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex flex-1 items-center justify-center gap-2 border border-primary bg-primary px-4 py-2.5 text-xs uppercase tracking-widest text-primary-foreground hover:bg-primary/90"
                onClick={dismiss}
              >
                {ad.cta_text ?? "Visit"}
                <ArrowUpRight className="h-3.5 w-3.5" />
              </Link>
            )}
            <button
              type="button"
              onClick={addToScreen}
              disabled={adding}
              className="inline-flex flex-1 items-center justify-center gap-2 border border-border bg-background px-4 py-2.5 text-xs uppercase tracking-widest text-foreground hover:border-primary hover:text-primary disabled:opacity-50"
            >
              {added ? "Added" : adding ? "Adding..." : "Add to screen"}
            </button>
          </div>
          <p className="mt-3 text-[10px] uppercase tracking-widest text-muted-foreground">
            We don&apos;t show this again for 24 hours.
          </p>
        </div>
      </div>
    </div>
  );
}
