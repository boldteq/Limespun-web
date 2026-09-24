import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "./section";
import { Title } from "./type";
import { cn } from "./cn";
import { lastSpansTwo, lgRowSpan } from "./grid";

export interface RelatedItem {
  title: string;
  body: string;
  href: string;
  /** What kind of page this is: "Feature", "For solo artists", "Compare", "Free tool"… */
  eyebrow?: string;
}

/**
 * The link mesh before the closing band: neighbouring features, segments, a comparison, a
 * post or tool (4–8 links; titles are nav nouns). Two across below lg; on phones each card
 * shows its eyebrow and title only (the one-line summaries join from sm, where cards have
 * room), so eight links cost four short rows. An odd last card spans the row.
 */
export function RelatedGrid({
  heading = "Related",
  items,
  tone = "canvas",
  id = "related-heading",
  phoneBody = false,
  containerClassName,
}: {
  heading?: string;
  items: RelatedItem[];
  tone?: "canvas" | "white";
  /** Heading id, when a page renders two grids. */
  id?: string;
  /** Keep the summaries on phones (a grid of two or three long-titled posts). */
  phoneBody?: boolean;
  /** Width of the grid's container, e.g. "max-w-[1040px]" under a reading column. */
  containerClassName?: string;
}) {
  if (items.length === 0) return null;
  const card = tone === "white" ? "bg-canvas" : "bg-white";
  const n = items.length;
  return (
    <section aria-labelledby={id} className={cn("py-section-y-tight", tone === "white" ? "bg-white" : "bg-canvas")}>
      <Container className={containerClassName}>
        <Title as="h2" size="lg" id={id}>
          {heading}
        </Title>
        <ul className="mt-5 grid grid-cols-2 gap-3 sm:mt-8 sm:gap-4 lg:grid-cols-12">
          {items.map((it, i) => (
            <li
              key={it.href}
              className={cn("min-w-0", lastSpansTwo(n, i), lgRowSpan(n, i))}
            >
              <Link
                href={it.href}
                className={cn(
                  "group flex h-full flex-col rounded-card p-4 ring-1 ring-hair transition-[box-shadow] duration-200 hover:shadow-[var(--shadow-lift)] hover:ring-hair-strong focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-graphite sm:p-6",
                  card,
                )}
              >
                <span className="flex min-w-0 flex-1 flex-col">
                  {it.eyebrow && <span className="text-label text-mute uppercase">{it.eyebrow}</span>}
                  <span className={cn("text-title-sm text-balance text-graphite", it.eyebrow && "mt-1.5 sm:mt-2")}>
                    {it.title}
                  </span>
                  <span
                    className={cn(
                      "mt-2 text-[15px] leading-[1.55] text-pretty text-mute",
                      phoneBody ? "block" : "hidden sm:block",
                    )}
                  >
                    {it.body}
                  </span>
                </span>
                <ArrowRight
                  size={17}
                  strokeWidth={2.2}
                  aria-hidden="true"
                  className="mt-3 text-graphite transition-transform duration-200 group-hover:translate-x-1 sm:mt-5"
                />
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
