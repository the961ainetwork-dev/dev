import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

interface Props {
  ad: {
    id: string;
    title: string;
    sponsor_name: string;
    description: string | null;
    image_url: string | null;
    link_url: string | null;
    cta_text: string | null;
    tier: string;
  };
}

export function LeaderCard({ ad }: Props) {
  const Wrapper = ad.link_url
    ? ({ children }: { children: React.ReactNode }) => (
        <a
          href={ad.link_url ?? "#"}
          target="_blank"
          rel="noopener noreferrer"
          className="group block border-b border-r border-border bg-card transition-colors hover:bg-card/70"
        >
          {children}
        </a>
      )
    : ({ children }: { children: React.ReactNode }) => (
        <div className="border-b border-r border-border bg-card">{children}</div>
      );

  return (
    <Wrapper>
      {ad.image_url && (
        <div className="aspect-[3/1.6] w-full overflow-hidden border-b border-border bg-background">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={ad.image_url}
            alt={`${ad.sponsor_name} sponsorship`}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>
      )}
      <div className="p-5">
        <div className="flex items-center justify-between">
          <span className="text-[10px] uppercase tracking-widest text-primary">
            {ad.tier} sponsor
          </span>
          {ad.link_url && (
            <ArrowUpRight className="h-3.5 w-3.5 text-muted-foreground transition-colors group-hover:text-primary" />
          )}
        </div>
        <p className="mt-2 font-serif text-xl text-foreground">{ad.sponsor_name}</p>
        <p className="mt-1 text-sm text-foreground">{ad.title}</p>
        {ad.description && (
          <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{ad.description}</p>
        )}
        {ad.cta_text && ad.link_url && (
          <span className="mt-4 inline-block border border-primary px-3 py-1.5 text-[10px] uppercase tracking-widest text-primary">
            {ad.cta_text}
          </span>
        )}
      </div>
    </Wrapper>
  );
}

export function LeaderCardCompact({ ad }: Props) {
  const inner = (
    <div className="group flex items-center gap-3 border border-border bg-card p-3 transition-colors hover:border-primary/60">
      {ad.image_url ? (
        <div className="h-12 w-12 flex-shrink-0 overflow-hidden border border-border bg-background">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={ad.image_url} alt={ad.sponsor_name} className="h-full w-full object-cover" />
        </div>
      ) : (
        <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center border border-border bg-background font-mono text-[10px] text-muted-foreground">
          AD
        </div>
      )}
      <div className="min-w-0 flex-1">
        <p className="truncate text-[10px] uppercase tracking-widest text-primary">
          {ad.tier} sponsor
        </p>
        <p className="truncate text-sm text-foreground">{ad.sponsor_name}</p>
      </div>
    </div>
  );
  if (!ad.link_url) return inner;
  return (
    <a href={ad.link_url} target="_blank" rel="noopener noreferrer" className="block">
      {inner}
    </a>
  );
}
