import React from "react";
import { cn } from "./cn";

/** Floating notification, the way the app confirms something happened. Decorative. */
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
  const toneClass =
    tone === "flag" ? "bg-flag-soft text-flag" : tone === "paid" ? "bg-paid-soft text-paid" : "bg-ember-soft text-ember-deep";
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
        {body && <span className="block text-[12px] leading-snug text-pretty text-graphite-soft">{body}</span>}
      </span>
    </div>
  );
}
