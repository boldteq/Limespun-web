import { BRAND, FONT } from "@/lib/brand";
import type React from "react";

interface SectionHeadingProps {
  children: React.ReactNode;
  dark?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

const sizes = {
  sm: 'clamp(28px, 3.4vw, 38px)',
  md: 'clamp(34px, 4.2vw, 50px)',
  lg: 'clamp(42px, 5.2vw, 64px)',
} as const;

export function SectionHeading({ children, dark = false, size = 'md' }: SectionHeadingProps) {
  return (
    <h2 style={{
      fontFamily: FONT.sans, fontSize: sizes[size],
      lineHeight: 1.08, letterSpacing: '-0.025em',
      color: dark ? BRAND.bone : BRAND.onyx,
      fontWeight: 600, marginBottom: 18,
      maxWidth: 760,
    } as React.CSSProperties}>{children}</h2>
  );
}
