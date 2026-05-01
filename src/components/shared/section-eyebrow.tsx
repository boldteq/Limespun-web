import { BRAND, FONT, type AccentKey } from "@/lib/brand";
import type React from "react";

interface SectionEyebrowProps {
  label: string;
  dark?: boolean;
  accent?: AccentKey;
}

const accentColors: Record<AccentKey, string> = {
  rust:  BRAND.rust,
  sage:  BRAND.sage,
  amber: BRAND.amber,
};

export function SectionEyebrow({ label, dark = false, accent = 'rust' }: SectionEyebrowProps) {
  return (
    <div style={{
      display: 'inline-flex', alignItems: 'center', gap: 8,
      padding: '6px 14px', borderRadius: 100,
      background: dark ? 'rgba(247,247,245,0.08)' : BRAND.white,
      border: dark ? 'none' : `1px solid ${BRAND.border}`,
      fontFamily: FONT.sans, fontSize: 12, fontWeight: 500,
      color: dark ? BRAND.stoneLight : BRAND.stoneDark,
      letterSpacing: '0.02em', marginBottom: 22,
      boxShadow: dark ? 'none' : '0 1px 2px rgba(15,15,15,0.04)',
    } as React.CSSProperties}>
      <span style={{
        width: 6, height: 6, borderRadius: 100,
        background: dark ? accentColors[accent] : accentColors[accent],
      } as React.CSSProperties} />
      {label}
    </div>
  );
}
