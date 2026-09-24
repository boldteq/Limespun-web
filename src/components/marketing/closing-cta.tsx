import React from "react";
import { InkBand } from "@/components/system";

interface Action {
  label: string;
  href: string;
}

/**
 * The end of a content page: the dark InkBand. `title` and `body` map to its headline and sub;
 * leave them out for the band's defaults ("Run the shop in one place.").
 */
export function ClosingCta({
  title,
  italicWord,
  body,
  eyebrow,
  secondary,
}: {
  title?: string;
  italicWord?: string;
  body?: string;
  eyebrow?: string;
  secondary?: Action | null;
}) {
  return (
    <InkBand
      eyebrow={eyebrow}
      {...(title ? { headline: title, italicWord } : {})}
      {...(body ? { sub: body } : {})}
      {...(secondary !== undefined ? { secondary } : {})}
    />
  );
}
