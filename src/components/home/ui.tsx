import React from "react";
import { Check } from "lucide-react";
import { HOME, CTA } from "@/lib/brand";
import { LimespunMark } from "@/components/brand/limespun-mark";
import { cn } from "@/lib/utils";

/* Irregular angled ember stripes — the frame every product view sits in. */
const STRIPES = `linear-gradient(118deg,
  ${HOME.emberMid} 0 7%, ${HOME.emberLight} 7% 9%, ${HOME.emberMid} 9% 15%,
  ${HOME.emberLight} 15% 19%, ${HOME.emberMid} 19% 31%, ${HOME.emberLight} 31% 33%,
  ${HOME.emberMid} 33% 46%, ${HOME.emberLight} 46% 51%, ${HOME.emberMid} 51% 58%,
  ${HOME.emberLight} 58% 60%, ${HOME.emberMid} 60% 72%, ${HOME.emberLight} 72% 77%,
  ${HOME.emberMid} 77% 88%, ${HOME.emberLight} 88% 90%, ${HOME.emberMid} 90% 100%)`;

export function StripedFrame({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn("relative overflow-hidden rounded-[24px]", className)}
      style={{ backgroundImage: STRIPES }}
    >
      {children}
    </div>
  );
}

/** A Limespun app window: slim sidebar + content. Always labelled as sample data. */
export function AppWindow({
  active,
  children,
  className,
}: {
  active: string;
  children: React.ReactNode;
  className?: string;
}) {
  const groups: { label: string; items: string[] }[] = [
    { label: "Studio", items: ["Today", "Calendar", "Messages"] },
    { label: "Work", items: ["Projects", "Clients", "Consent forms"] },
    { label: "Money", items: ["Deposits", "Payouts"] },
  ];
  return (
    <div
      className={cn(
        "flex overflow-hidden rounded-[16px] bg-white text-left shadow-[var(--shadow-lift)] ring-1 ring-graphite/5",
        className,
      )}
    >
      <div className="hidden w-[168px] shrink-0 flex-col gap-4 border-r border-hair bg-canvas px-3 py-4 sm:flex">
        <div className="flex items-center gap-2 px-1.5">
          <LimespunMark size={18} />
          <span className="text-[13px] font-semibold text-graphite">Limespun</span>
        </div>
        {groups.map((g) => (
          <div key={g.label} className="flex flex-col gap-0.5">
            <span className="px-1.5 pb-1 text-[10px] font-medium text-mute">{g.label}</span>
            {g.items.map((it) => (
              <span
                key={it}
                className={cn(
                  "rounded-[8px] px-1.5 py-1 text-[12px]",
                  it === active ? "bg-ember-soft font-semibold text-graphite" : "text-graphite-soft",
                )}
              >
                {it}
              </span>
            ))}
          </div>
        ))}
      </div>
      <div className="min-w-0 flex-1">{children}</div>
    </div>
  );
}

export function SampleTag({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "shrink-0 rounded-full border border-hair px-2 py-0.5 text-[10px] font-medium tracking-[0.04em] whitespace-nowrap text-mute uppercase",
        className,
      )}
    >
      Sample studio
    </span>
  );
}

type ChipTone = "flag" | "paid" | "ember" | "ink" | "quiet";
const chipTone: Record<ChipTone, string> = {
  flag: "bg-flag-soft text-flag",
  paid: "bg-paid-soft text-paid",
  ember: "bg-ember-soft text-ember-deep",
  ink: "bg-graphite text-white",
  quiet: "bg-canvas-deep text-graphite-soft",
};

export function Chip({
  tone,
  children,
  className,
}: {
  tone: ChipTone;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-semibold whitespace-nowrap",
        chipTone[tone],
        className,
      )}
    >
      {children}
    </span>
  );
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

/** Floating notification, the way the app confirms something happened. */
export function Toast({
  icon,
  title,
  body,
  tone = "ember",
  className,
}: {
  icon: React.ReactNode;
  title: string;
  body?: string;
  tone?: "ember" | "flag" | "paid";
  className?: string;
}) {
  const toneClass = tone === "flag" ? "bg-flag-soft text-flag" : tone === "paid" ? "bg-paid-soft text-paid" : "bg-ember-soft text-ember-deep";
  return (
    <div
      aria-hidden="true"
      className={cn(
        "flex max-w-[300px] items-start gap-3 rounded-[16px] bg-white p-3.5 pr-5 text-left shadow-[var(--shadow-lift)] ring-1 ring-graphite/5",
        className,
      )}
    >
      <span className={cn("flex h-8 w-8 shrink-0 items-center justify-center rounded-full", toneClass)}>{icon}</span>
      <span>
        <span className="block text-[13px] font-semibold text-graphite">{title}</span>
        {body && <span className="block text-[12px] leading-snug text-graphite-soft">{body}</span>}
      </span>
    </div>
  );
}

export function CheckRow({ items, className }: { items: string[]; className?: string }) {
  return (
    <ul className={cn("flex flex-wrap items-center gap-x-6 gap-y-2", className)}>
      {items.map((it) => (
        <li key={it} className="flex items-center gap-2 text-[15px] text-graphite-soft">
          <Check size={16} strokeWidth={2.6} className="text-ember" aria-hidden="true" />
          {it}
        </li>
      ))}
    </ul>
  );
}

export function PrimaryButton({
  children = CTA.primaryLabel,
  href = CTA.primaryHref,
  className,
  tone = "ink",
}: {
  children?: React.ReactNode;
  href?: string;
  className?: string;
  tone?: "ink" | "white";
}) {
  return (
    <a
      href={href}
      className={cn(
        "inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-6 text-[16px] font-semibold transition-[background-color,transform] duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-graphite active:scale-[0.98]",
        tone === "ink" ? "bg-graphite text-white hover:bg-graphite-soft" : "bg-white text-graphite hover:bg-canvas",
        className,
      )}
    >
      {children}
    </a>
  );
}

export function SecondaryButton({
  children,
  href,
  className,
}: {
  children: React.ReactNode;
  href: string;
  className?: string;
}) {
  return (
    <a
      href={href}
      className={cn(
        "inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-graphite/80 bg-transparent px-6 text-[16px] font-semibold text-graphite transition-colors duration-200 hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-graphite",
        className,
      )}
    >
      {children}
    </a>
  );
}

/** Serif section heading, sized like the reference system. */
export function Display({
  as: Tag = "h2",
  children,
  className,
}: {
  as?: "h1" | "h2" | "h3";
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <Tag
      className={cn(
        "font-serif font-normal tracking-[-0.01em] text-balance text-graphite",
        Tag === "h1" ? "text-[52px] leading-[1.02] sm:text-[72px] lg:text-[84px]" : "text-[40px] leading-[1.06] sm:text-[56px]",
        className,
      )}
    >
      {children}
    </Tag>
  );
}
