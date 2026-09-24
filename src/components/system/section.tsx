import React from "react";
import { cn } from "./cn";

export type SectionTone = "canvas" | "white" | "deep" | "ink";
/** dense = product screens · story = spacious narrative · proof = facts strip · conversion = the ask */
export type SectionDensity = "dense" | "story" | "proof" | "conversion";

const toneClass: Record<SectionTone, string> = {
  canvas: "bg-canvas text-graphite",
  white: "bg-white text-graphite",
  deep: "bg-canvas-deep text-graphite",
  ink: "bg-ink text-ink-text",
};

/* Inner-page rhythm: 64px on phones (80 for story), 112px from 1280px. The homepage keeps its own. */
const densityClass: Record<SectionDensity, string> = {
  dense: "py-section-y-inner",
  story: "py-[calc(var(--spacing-section-y-inner)*1.15)]",
  proof: "py-section-y-tight",
  conversion: "py-section-y-inner",
};

/** A full-width band. Tone sets the surface, density sets the vertical rhythm. */
export function Section({
  tone = "canvas",
  density = "dense",
  id,
  labelledBy,
  className,
  children,
}: {
  tone?: SectionTone;
  density?: SectionDensity;
  id?: string;
  labelledBy?: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      className={cn(toneClass[tone], densityClass[density], id && "scroll-mt-24", className)}
    >
      {children}
    </section>
  );
}

const widthClass = {
  default: "max-w-[1280px]",
  narrow: "max-w-[960px]",
  /* 68ch of text plus the side gutters */
  prose: "max-w-[calc(68ch+2.5rem)] sm:max-w-[calc(68ch+4rem)]",
} as const;

/** The page gutter: 1280px wide, 20px sides on phones, 32px from sm. */
export function Container({
  width = "default",
  className,
  children,
}: {
  width?: keyof typeof widthClass;
  className?: string;
  children: React.ReactNode;
}) {
  return <div className={cn("mx-auto w-full px-5 sm:px-8", widthClass[width], className)}>{children}</div>;
}
