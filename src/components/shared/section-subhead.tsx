import { BRAND, FONT } from "@/lib/brand";
import type React from "react";

interface SectionSubheadProps {
  children: React.ReactNode;
  dark?: boolean;
  max?: number;
}

export function SectionSubhead({ children, dark = false, max = 600 }: SectionSubheadProps) {
  return (
    <p style={{
      fontFamily: FONT.sans, fontSize: 17, fontWeight: 400,
      lineHeight: 1.6, color: dark ? BRAND.stoneLight : BRAND.stoneDark,
      maxWidth: max,
    } as React.CSSProperties}>{children}</p>
  );
}
