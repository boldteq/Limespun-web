import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { CTA } from "@/lib/brand";
import { cn, isInternalHref } from "./cn";

/** next/link for routes on this site, a plain anchor for the app and other origins. */
export function SmartLink({
  href,
  className,
  children,
  ...rest
}: Omit<React.ComponentPropsWithoutRef<"a">, "href"> & { href: string }) {
  if (isInternalHref(href)) {
    return (
      <Link href={href} className={className} {...rest}>
        {children}
      </Link>
    );
  }
  return (
    <a href={href} className={className} {...rest}>
      {children}
    </a>
  );
}

export type ButtonVariant = "primary" | "secondary" | "ghost";
/** default = on canvas or white; ink = on the dark closing band */
export type ButtonTone = "default" | "ink";

const pill =
  "inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-6 text-[16px] font-semibold transition-[background-color,border-color,color,transform] duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 active:scale-[0.98]";

const variantClass: Record<ButtonTone, Record<ButtonVariant, string>> = {
  default: {
    primary: cn(pill, "bg-graphite text-white hover:bg-graphite-soft focus-visible:outline-graphite"),
    secondary: cn(pill, "border border-graphite/80 text-graphite hover:bg-white focus-visible:outline-graphite"),
    ghost:
      "inline-flex min-h-11 items-center gap-1.5 text-[16px] font-semibold text-graphite underline decoration-ember decoration-2 underline-offset-[6px] transition-colors hover:text-ember-deep focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-graphite",
  },
  ink: {
    primary: cn(pill, "bg-canvas text-graphite hover:bg-white focus-visible:outline-canvas"),
    secondary: cn(
      pill,
      "border-[1.5px] border-ink-line text-ink-text hover:border-ink-muted/50 hover:bg-ink-pill focus-visible:outline-canvas",
    ),
    ghost:
      "inline-flex min-h-11 items-center gap-1.5 text-[16px] font-semibold text-ink-text underline decoration-ember decoration-2 underline-offset-[6px] transition-colors hover:text-white focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-canvas",
  },
};

/** Pill button (primary black, secondary outline) or an underlined ghost link. */
export function Button({
  href,
  variant = "primary",
  tone = "default",
  arrow = false,
  className,
  children,
}: {
  href: string;
  variant?: ButtonVariant;
  tone?: ButtonTone;
  arrow?: boolean;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <SmartLink href={href} className={cn("group", variantClass[tone][variant], className)}>
      {children}
      {arrow && (
        <ArrowRight
          size={16}
          strokeWidth={2.4}
          aria-hidden="true"
          className="shrink-0 transition-transform duration-200 group-hover:translate-x-0.5"
        />
      )}
    </SmartLink>
  );
}

/** Class string for a <button> that must look like Button (forms, Retry). */
export function buttonClass(variant: ButtonVariant = "primary", tone: ButtonTone = "default"): string {
  return variantClass[tone][variant];
}

/** The homepage's black pill. Defaults to Create account. `tone="white"` is the pill for dark or striped surfaces. */
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
    <SmartLink
      href={href}
      className={cn(
        "inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-6 text-[16px] font-semibold transition-[background-color,transform] duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-graphite active:scale-[0.98]",
        tone === "ink" ? "bg-graphite text-white hover:bg-graphite-soft" : "bg-white text-graphite hover:bg-canvas",
        className,
      )}
    >
      {children}
    </SmartLink>
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
    <SmartLink
      href={href}
      className={cn(
        "inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-graphite/80 bg-transparent px-6 text-[16px] font-semibold text-graphite transition-colors duration-200 hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-graphite",
        className,
      )}
    >
      {children}
    </SmartLink>
  );
}
