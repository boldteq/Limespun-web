"use client";

import React, { useLayoutEffect, useRef } from "react";
import { REVEAL_STAGGER_CAP, REVEAL_STAGGER_MS, prefersReducedMotion } from "@/lib/motion";
import { cn } from "./cn";

type RevealTag = "div" | "section" | "article" | "li" | "ul" | "ol" | "span" | "figure" | "header" | "footer" | "p";

/* One observer for every Reveal on the page. */
let observer: IntersectionObserver | null = null;

function markRevealed(el: Element) {
  el.setAttribute("data-revealed", "");
}

function getObserver(): IntersectionObserver {
  if (!observer) {
    observer = new IntersectionObserver(
      (entries, io) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          markRevealed(entry.target);
          io.unobserve(entry.target);
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.01 },
    );
  }
  return observer;
}

/**
 * Fades its content up once as it scrolls into view. Visible in the server HTML and without
 * scripts: anything already on screen (or above it) when the page mounts is marked revealed
 * first, and only then does html.ls-motion hide what is still below the fold. Reduced motion
 * shows everything at once. `index` staggers siblings (60ms each, capped at 5).
 * Never wrap the first-viewport h1/lead/CTA, nav, tables, forms or mockup interiors.
 */
export function Reveal({
  as = "div",
  index = 0,
  className,
  children,
}: {
  as?: RevealTag;
  index?: number;
  className?: string;
  children: React.ReactNode;
}) {
  const ref = useRef<HTMLElement>(null);

  // Layout effect: runs before the first paint, so nothing on screen ever flashes hidden.
  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (prefersReducedMotion() || typeof IntersectionObserver === "undefined") {
      markRevealed(el);
      return;
    }
    if (el.getBoundingClientRect().top < window.innerHeight) markRevealed(el);
    document.documentElement.classList.add("ls-motion");
    if (el.hasAttribute("data-revealed")) return;
    const io = getObserver();
    io.observe(el);
    return () => io.unobserve(el);
  }, []);

  const delay = Math.min(Math.max(index, 0), REVEAL_STAGGER_CAP) * REVEAL_STAGGER_MS;
  return React.createElement(
    as,
    {
      ref,
      className: cn("ls-reveal", className),
      style: delay > 0 ? ({ "--reveal-delay": `${delay}ms` } as React.CSSProperties) : undefined,
    },
    children,
  );
}
