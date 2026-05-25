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
      breaking: "bg-destructive/80 text-white",
      markets: "bg-accent-green text-black",
      banking: "bg-accent-blue text-white",
      economy: "bg-warning text-black",
      politics: "bg-accent-purple text-white",
      energy: "bg-[#fb8500] text-white",
      technology: "bg-accent-cyan text-black",
      analysis: "bg-accent-purple text-white",
    };
    return colors[cat] || "bg-accent text-accent-foreground";
  };

  return (
    <Link href={`/news/${id}`}>
      <div className="group relative overflow-hidden border border-border bg-card rounded-xl transition-all duration-300 hover:border-accent/50 hover:shadow-xl">
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
                className={`h-full w-full object-cover transition-transform duration-500 group-hover:scale-110 ${
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
                <div className="h-12 w-12 mx-auto mb-2 bg-border rounded" />
                <span className="text-xs">No image</span>
              </div>
            </div>
          )}

          {/* Category Badge */}
          <div className={`absolute top-3 left-3 px-2 py-1 text-xs font-semibold rounded-md ${getCategoryColor(category)}`}>
            {category.toUpperCase()}
          </div>

          {/* Date Badge */}
          <div className="absolute top-3 right-3 flex items-center gap-1 bg-black/40 backdrop-blur px-2 py-1 rounded text-xs text-white">
            <Calendar className="h-3 w-3" />
            {formattedDate}
          </div>
        </div>

        {/* Content */}
        <div className="p-4 space-y-3">
          {/* Headline */}
          <h3 className="line-clamp-2 text-sm font-semibold text-foreground group-hover:text-accent transition-colors">
            {headline}
          </h3>

          {/* Summary */}
          <p className="line-clamp-2 text-xs text-muted-foreground leading-relaxed">
            {summary}
          </p>

          {/* Region Badge & Tags */}
          <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-border">
            <span className="inline-block px-2 py-1 text-[10px] font-medium rounded bg-secondary text-muted-foreground">
              {region}
            </span>

            {tags.slice(0, 1).map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center gap-1 text-[10px] text-muted-foreground"
              >
                <Tag className="h-3 w-3" />
                {tag}
              </span>
            ))}

            {tags.length > 1 && (
              <span className="text-[10px] text-muted-foreground">
                +{tags.length - 1}
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
