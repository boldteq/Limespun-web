import React from "react";
import { HOME } from "@/lib/brand";
import { cn } from "./cn";

type EyebrowTone = "ember" | "mute" | "ink";
const eyebrowTone: Record<EyebrowTone, string> = {
  ember: "text-ember-deep",
  mute: "text-mute",
  ink: "text-ink-muted",
};

/** Small uppercase label above a heading. The dot is the ember dot from the hero's offer pill. */
export function Eyebrow({
  children,
  tone = "ember",
  dot = false,
  className,
}: {
  children: React.ReactNode;
  tone?: EyebrowTone;
  dot?: boolean;
  className?: string;
}) {
  return (
    <p className={cn("inline-flex items-center gap-2 text-label uppercase", eyebrowTone[tone], className)}>
      {dot && <span className="h-2 w-2 shrink-0 rounded-full bg-ember" aria-hidden="true" />}
      {children}
    </p>
  );
}

/** Wraps the first match of `word` in the ember italic. Only plain-string headings are split. */
function withItalic(children: React.ReactNode, word?: string): React.ReactNode {
  if (!word || typeof children !== "string") return children;
  const at = children.indexOf(word);
  if (at === -1) return children;
  return (
    <>
      {children.slice(0, at)}
      <em className="text-ember italic">{word}</em>
      {children.slice(at + word.length)}
    </>
  );
}

const displaySize = {
  1: "text-display-1",
  2: "text-display-2",
  3: "text-display-3",
} as const;

/**
 * Serif headline. Sizes: 1 = homepage hero (84px), 2 = page title and closing band (64px),
 * 3 = section heading (56px). Without `size`, an h1 is 1 and anything else is 3, which is
 * exactly what the homepage has always rendered.
 */
export function Display({
  as: Tag = "h2",
  size,
  italicWord,
  id,
  className,
  children,
}: {
  as?: "h1" | "h2" | "h3";
  size?: 1 | 2 | 3;
  italicWord?: string;
  id?: string;
  className?: string;
  children: React.ReactNode;
}) {
  const step = size ?? (Tag === "h1" ? 1 : 3);
  return (
    <Tag id={id} className={cn("font-serif font-normal text-balance text-graphite", displaySize[step], className)}>
      {withItalic(children, italicWord)}
    </Tag>
  );
}

const titleSize = {
  lg: "text-title-lg",
  md: "text-title-md",
  sm: "text-title-sm",
} as const;

/** Sans heading for rows, cards and tiles: lg 34px, md 24px, sm 20px (desktop). */
export function Title({
  as: Tag = "h3",
  size = "md",
  id,
  className,
  children,
}: {
  as?: "h2" | "h3" | "h4" | "p";
  size?: keyof typeof titleSize;
  id?: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <Tag id={id} className={cn("text-balance text-graphite", titleSize[size], className)}>
      {children}
    </Tag>
  );
}

/** The paragraph under a headline: 18px on phones, 19px from sm. */
export function Lead({ className, children }: { className?: string; children: React.ReactNode }) {
  return <p className={cn("max-w-[640px] text-lead text-pretty text-graphite-soft", className)}>{children}</p>;
}

/** Long-form text (legal pages, posts). Put it inside <Container width="prose">. */
export function Prose({ className, children }: { className?: string; children: React.ReactNode }) {
  return <div className={cn("ls-prose", className)}>{children}</div>;
}

/** Hand-drawn ember underline for one phrase in a display headline. */
export function Underlined({ children }: { children: React.ReactNode }) {
  return (
    <span className="relative inline-block whitespace-nowrap">
      {children}
      <svg
        aria-hidden="true"
        viewBox="0 0 300 14"
        preserveAspectRatio="none"
        className="ls-underline pointer-events-none absolute -bottom-[0.08em] left-[-1%] h-[0.2em] w-[102%]"
      >
        <path
          d="M3 9.5C58 4.5 121 3 186 4.2c38 .7 76 2.4 111 5.3"
          pathLength={1}
          fill="none"
          stroke={HOME.ember}
          strokeWidth="5"
          strokeLinecap="round"
        />
      </svg>
    </span>
  );
}
