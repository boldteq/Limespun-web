"use client";

import React, { useId, useState } from "react";
import Link from "next/link";
import { cn } from "@/components/system/cn";

export interface PostCardData {
  slug: string;
  title: string;
  summary: string;
  category: string;
  categoryLabel: string;
  date: string;
  dateTime: string;
  readTime: string;
  /** A crop of the screen the post walks through (server-rendered, decorative). */
  thumb?: React.ReactNode;
}

/**
 * A post in the grid: a crop of its screen, then category, serif title, one line, date and
 * read time. The whole card is the link (named by its title, described by its summary), like
 * the system RelatedGrid.
 */
function PostCard({ post, className }: { post: PostCardData; className?: string }) {
  const id = `post-${post.slug}`;
  return (
    <li className={cn("min-w-0", className)}>
      <Link
        href={`/blog/${post.slug}`}
        aria-labelledby={`${id}-title`}
        aria-describedby={`${id}-summary`}
        className="group flex h-full flex-col overflow-hidden rounded-card bg-white ring-1 ring-hair transition-[box-shadow] duration-200 hover:shadow-[var(--shadow-lift)] hover:ring-hair-strong focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-graphite"
      >
        {post.thumb}
        <div className="flex flex-1 flex-col p-5 sm:p-6">
          <span className="text-label text-ember-deep uppercase">{post.categoryLabel}</span>
          <h3
            id={`${id}-title`}
            className="mt-3 font-serif text-[26px] leading-[1.1] tracking-[-0.01em] text-balance text-graphite sm:text-[28px]"
          >
            {post.title}
          </h3>
          <span id={`${id}-summary`} className="mt-2.5 block text-[15px] leading-[1.55] text-pretty text-mute">
            {post.summary}
          </span>
          <span className="mt-auto flex flex-wrap items-center gap-x-2.5 pt-5 text-[13px] text-mute">
            <time dateTime={post.dateTime} className="whitespace-nowrap">
              {post.date}
            </time>
            <span aria-hidden="true" className="text-hair-strong">
              ·
            </span>
            <span className="whitespace-nowrap">{post.readTime}</span>
          </span>
        </div>
      </Link>
    </li>
  );
}

/**
 * Category chips over the post grid. "All" lists every post but the featured one above it; a
 * category lists all of its posts, the featured one included. Without JavaScript the grid
 * shows "All", which is every post. `after` (the newsletter card) takes the next cell of the
 * grid from sm, whichever category is showing, and sits under the swipe row on phones.
 */
export function PostIndex({
  posts,
  featuredSlug,
  categories,
  headingId,
  after,
}: {
  posts: PostCardData[];
  featuredSlug: string;
  categories: { key: string; label: string; count: number }[];
  headingId: string;
  after?: React.ReactNode;
}) {
  const [active, setActive] = useState<string>("all");
  const statusId = useId();
  const shown = active === "all" ? posts.filter((p) => p.slug !== featuredSlug) : posts.filter((p) => p.category === active);
  const chips = [{ key: "all", label: "All", count: posts.length }, ...categories];
  const activeLabel = chips.find((c) => c.key === active)?.label ?? "All";
  const n = shown.length;

  return (
    <div>
      <div className="flex flex-col gap-4 sm:gap-5 lg:flex-row lg:items-end lg:justify-between">
        <h2 id={headingId} className="text-title-lg text-graphite">
          {active === "all" ? "More posts" : activeLabel}
        </h2>
        {/* One row that swipes on phones (the next chip peeks in); wraps from sm */}
        <div
          role="group"
          aria-label="Show posts by category"
          className="-mx-5 flex gap-2 overflow-x-auto px-5 pb-1 [scrollbar-width:none] sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0 sm:pb-0 [&::-webkit-scrollbar]:hidden"
        >
          {chips.map((c) => {
            const on = c.key === active;
            return (
              <button
                key={c.key}
                type="button"
                aria-pressed={on}
                aria-controls={`${headingId}-grid`}
                onClick={() => setActive(c.key)}
                className={cn(
                  "inline-flex min-h-11 shrink-0 cursor-pointer items-center gap-2 rounded-full px-4 text-[15px] font-medium whitespace-nowrap transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-graphite",
                  on ? "bg-graphite text-white" : "bg-white text-graphite-soft ring-1 ring-hair hover:ring-hair-strong hover:text-graphite",
                )}
              >
                {c.label}
                <span className={cn("text-[13px] tabular-nums", on ? "text-white/70" : "text-mute")}>{c.count}</span>
              </button>
            );
          })}
        </div>
      </div>

      <p id={statusId} role="status" className="sr-only">
        {active === "all" ? "" : `Showing ${n} ${n === 1 ? "post" : "posts"} in ${activeLabel}`}
      </p>

      {/* Three columns from lg, two from sm, the last row left-aligned; the list's items and
          `after` share one grid there (the list itself is display: contents, role kept). With
          "All" that's five posts and the newsletter card: two full rows. On phones the cards sit
          in one row that swipes, the next card peeking in, so the list costs one card of height. */}
      <div className="mt-6 sm:mt-8 sm:grid sm:grid-cols-2 sm:gap-4 lg:grid-cols-3">
        <ul
          id={`${headingId}-grid`}
          role="list"
          className="-mx-5 flex snap-x snap-mandatory scroll-px-5 gap-3 overflow-x-auto px-5 pb-1 [scrollbar-width:none] sm:contents [&::-webkit-scrollbar]:hidden"
        >
          {shown.map((p) => (
            <PostCard
              key={p.slug}
              post={p}
              className={cn("shrink-0 snap-start sm:w-auto", n === 1 ? "w-full" : "w-[calc(100vw-5rem)]")}
            />
          ))}
        </ul>
        {after && <div className="mt-4 min-w-0 sm:mt-0">{after}</div>}
      </div>
    </div>
  );
}
