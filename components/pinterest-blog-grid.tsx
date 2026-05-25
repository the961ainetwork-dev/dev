"use client";

import { PinterestBlogCard } from "./pinterest-blog-card";

interface NewsStory {
  id: string;
  headline: string;
  summary: string;
  category: string;
  region: string;
  featured_image_url?: string;
  timestamp: string;
  tags?: string[];
}

interface PinterestBlogGridProps {
  items: NewsStory[];
  maxItems?: number;
  className?: string;
}

export function PinterestBlogGrid({
  items,
  maxItems,
  className = "",
}: PinterestBlogGridProps) {
  const displayItems = maxItems ? items.slice(0, maxItems) : items;

  if (displayItems.length === 0) {
    return (
      <div className={`py-12 text-center ${className}`}>
        <p className="text-sm text-muted-foreground">
          No featured stories available yet.
        </p>
      </div>
    );
  }

  return (
    <div className={`grid gap-4 md:grid-cols-2 lg:grid-cols-3 ${className}`}>
      {displayItems.map((item) => (
        <PinterestBlogCard
          key={item.id}
          {...item}
        />
      ))}
    </div>
  );
}
