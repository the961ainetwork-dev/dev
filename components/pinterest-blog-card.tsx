"use client";

import { useState } from "react";
import Link from "next/link";
import { Calendar, Tag } from "lucide-react";

interface PinterestBlogCardProps {
  id: string;
  headline: string;
  summary: string;
  category: string;
  region: string;
  featured_image_url?: string;
  timestamp: string;
  tags?: string[];
}

export function PinterestBlogCard({
  id,
  headline,
  summary,
  category,
  region,
  featured_image_url,
  timestamp,
  tags = [],
}: PinterestBlogCardProps) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  const formattedDate = new Date(timestamp).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  const getCategoryColor = (cat: string) => {
    const colors: { [key: string]: string } = {
      breaking: "bg-[#f85149] text-white",
      markets: "bg-[#3fb950] text-white",
      banking: "bg-[#58a6ff] text-white",
      economy: "bg-[#d29922] text-black",
      politics: "bg-[#a371f7] text-white",
      energy: "bg-[#fb8500] text-white",
      technology: "bg-[#1f6feb] text-white",
      analysis: "bg-[#6e40c9] text-white",
    };
    return colors[cat] || "bg-primary text-primary-foreground";
  };

  return (
    <Link href={`/news/${id}`}>
      <div className="group relative overflow-hidden border border-border bg-card transition-all duration-300 hover:border-primary hover:shadow-lg">
        {/* Image Container */}
        <div className="relative aspect-video overflow-hidden bg-secondary">
          {featured_image_url && !imageError ? (
            <>
              <img
                src={featured_image_url}
                alt={headline}
                loading="lazy"
                onLoad={() => setImageLoaded(true)}
                onError={() => setImageError(true)}
                className={`h-full w-full object-cover transition-transform duration-300 group-hover:scale-105 ${
                  imageLoaded ? "opacity-100" : "opacity-0"
                }`}
              />
              {!imageLoaded && (
                <div className="absolute inset-0 animate-pulse bg-secondary" />
              )}
            </>
          ) : (
            <div className="flex h-full items-center justify-center">
              <div className="text-center text-muted-foreground">
                <div className="h-12 w-12 mx-auto mb-2 bg-border rounded-lg" />
                <span className="text-xs">No image</span>
              </div>
            </div>
          )}

          {/* Category Badge */}
          <div className={`absolute top-2 left-2 px-2 py-1 text-xs font-bold uppercase tracking-widest ${getCategoryColor(category)}`}>
            {category}
          </div>

          {/* Date Badge */}
          <div className="absolute top-2 right-2 flex items-center gap-1 bg-black/60 backdrop-blur-sm px-2 py-1 border border-white/10">
            <Calendar className="h-3 w-3 text-white" />
            <span className="text-xs text-white font-mono">{formattedDate}</span>
          </div>
        </div>

        {/* Content */}
        <div className="p-4 space-y-3">
          {/* Headline */}
          <h3 className="line-clamp-2 text-sm font-bold text-foreground group-hover:text-primary transition-colors">
            {headline}
          </h3>

          {/* Summary */}
          <p className="line-clamp-2 text-xs text-muted-foreground leading-relaxed">
            {summary}
          </p>

          {/* Region Badge & Tags */}
          <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-border">
            <span className="inline-block border border-border px-2 py-1 text-[10px] uppercase tracking-widest text-muted-foreground hover:border-primary hover:text-primary">
              {region}
            </span>

            {tags.slice(0, 1).map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center gap-1 text-[10px] uppercase tracking-widest text-muted-foreground hover:text-primary"
              >
                <Tag className="h-2.5 w-2.5" />
                {tag}
              </span>
            ))}

            {tags.length > 1 && (
              <span className="text-[10px] text-muted-foreground">
                +{tags.length - 1} more
              </span>
            )}
          </div>
        </div>

        {/* Hover Arrow */}
        <div className="absolute bottom-4 right-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <div className="text-primary text-xl">→</div>
        </div>
      </div>
    </Link>
  );
}
