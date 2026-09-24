import { clsx, type ClassValue } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

/**
 * cn() that knows the system tokens in globals.css. Stock tailwind-merge reads text-display-2
 * as a colour, so cn("text-display-2", "text-graphite") would silently drop the size.
 */
const twMerge = extendTailwindMerge({
  extend: {
    theme: {
      text: [
        "display-1",
        "display-2",
        "display-3",
        "title-lg",
        "title-md",
        "title-sm",
        "lead",
        "body",
        "small",
        "label",
        "figure",
        "ui",
        "ui-sm",
        "ui-xs",
        "kpi-label",
        "kpi-value",
      ],
      radius: ["inner", "window", "card", "tile", "field", "app", "app-lg"],
      spacing: ["section-y", "section-y-tight", "block-gap"],
    },
  },
});

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Internal routes and in-page anchors go through next/link; everything else is a plain <a>. */
export function isInternalHref(href: string): boolean {
  return (href.startsWith("/") && !href.startsWith("//")) || href.startsWith("#");
}
