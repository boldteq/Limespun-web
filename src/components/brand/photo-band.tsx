import { BRAND, SHADOW } from "@/lib/brand";
import type React from "react";

interface PhotoBandProps {
  height?: number;
  label?: string;
  gradient?: string;
  overlay?: boolean;
}

export function PhotoBand({ height = 240, label, gradient, overlay = true }: PhotoBandProps) {
  const grad = gradient ?? `linear-gradient(135deg, ${BRAND.rust} 0%, ${BRAND.rustGlow} 50%, ${BRAND.amber} 100%)`;
  return (
    <div style={{
      height, borderRadius: 16, overflow: 'hidden', position: 'relative',
      background: grad, boxShadow: SHADOW.card,
    } as React.CSSProperties}>
      {overlay && (
        <div aria-hidden="true" style={{
          position: 'absolute', inset: 0,
          background: `url("data:image/svg+xml;charset=utf-8,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.4'/%3E%3C/svg%3E")`,
          opacity: 0.25, mixBlendMode: 'multiply',
        } as React.CSSProperties} />
      )}
      <div aria-hidden="true" style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(180deg, transparent 50%, rgba(15,15,15,0.5) 100%)',
      } as React.CSSProperties} />
      {label && (
        <div style={{
          position: 'absolute', bottom: 16, left: 18, right: 18,
          fontFamily: "'Inter', sans-serif", fontSize: 13, fontWeight: 500,
          color: BRAND.bone, letterSpacing: '-0.005em',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        } as React.CSSProperties}>
          <span>{label}</span>
          <span style={{
            fontFamily: "'JetBrains Mono', monospace", fontSize: 10, opacity: 0.7,
            padding: '3px 8px', borderRadius: 100,
            background: 'rgba(247,247,245,0.15)',
            backdropFilter: 'blur(4px)',
          } as React.CSSProperties}>PHOTO</span>
        </div>
      )}
    </div>
  );
}
