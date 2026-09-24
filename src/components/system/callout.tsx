import React from "react";
import { cn } from "./cn";

/**
 * A note set off from long-form text on the sand surface (posts, legal, REACH, about). One
 * optional label in the eyebrow style; `ember` adds the ember rule on the left for the one
 * note a reader must not miss. Works inside Prose and on its own.
 */
export function Callout({
  label,
  tone = "quiet",
  as: Tag = "aside",
  className,
  children,
}: {
  label?: string;
  tone?: "quiet" | "ember";
  as?: "aside" | "div";
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <Tag
      className={cn("ls-callout", className)}
      data-tone={tone === "ember" ? "ember" : undefined}
      aria-label={Tag === "aside" && label ? label : undefined}
    >
      {label && <p className="text-label text-ember-deep uppercase">{label}</p>}
      {typeof children === "string" ? <p>{children}</p> : children}
    </Tag>
  );
}
