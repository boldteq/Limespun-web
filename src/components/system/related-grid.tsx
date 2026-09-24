import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "./section";
import { Title } from "./type";
import { cn } from "./cn";

export interface RelatedItem {
  title: string;
  body: string;
  href: string;
  /** What kind of page this is: "Feature", "For solo artists", "Compare", "Free tool"… */
  eyebrow?: string;
}

/** The link mesh before the closing band: neighbouring features, segments, a comparison, a post or tool. */
export function RelatedGrid({
  heading = "Related",
  items,
  tone = "canvas",
}: {
  heading?: string;
  items: RelatedItem[];
  tone?: "canvas" | "white";
}) {
  const card = tone === "white" ? "bg-canvas" : "bg-white";
  return (
    <section aria-labelledby="related-heading" className={cn("py-section-y-tight", tone === "white" ? "bg-white" : "bg-canvas")}>
      <Container>
        <Title as="h2" size="lg" id="related-heading">
          {heading}
        </Title>
        <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((it) => (
            <li key={it.href} className="min-w-0">
              <Link
                href={it.href}
                className={cn(
                  "group flex h-full flex-col rounded-card p-6 ring-1 ring-hair transition-[box-shadow] duration-200 hover:shadow-[var(--shadow-lift)] hover:ring-hair-strong focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-graphite",
                  card,
                )}
              >
                {it.eyebrow && <span className="text-label text-mute uppercase">{it.eyebrow}</span>}
                <span className={cn("text-title-sm text-balance text-graphite", it.eyebrow && "mt-2")}>{it.title}</span>
                <span className="mt-2 text-[15px] leading-[1.55] text-pretty text-mute">{it.body}</span>
                <span className="mt-auto pt-5">
                  <ArrowRight
                    size={18}
                    strokeWidth={2.2}
                    aria-hidden="true"
                    className="text-graphite transition-transform duration-200 group-hover:translate-x-1"
                  />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
