import { BRAND } from "@/lib/brand";
import type React from "react";

type BlobVariant = 'hero' | 'soft' | 'cta';

interface BlobConfig {
  cx: string;
  cy: string;
  size: number;
  color: string;
  opacity: number;
}

interface MangomintBlobsProps {
  variant?: BlobVariant;
}

const blobVariants: Record<BlobVariant, BlobConfig[]> = {
  hero: [
    { cx: '85%', cy: '15%', size: 700, color: BRAND.rust,       opacity: 0.18 },
    { cx: '10%', cy: '70%', size: 600, color: BRAND.amber,      opacity: 0.15 },
    { cx: '60%', cy: '85%', size: 500, color: BRAND.rustBright, opacity: 0.12 },
    { cx: '40%', cy: '10%', size: 400, color: BRAND.sage,       opacity: 0.10 },
  ],
  soft: [
    { cx: '90%', cy: '20%', size: 500, color: BRAND.rust,  opacity: 0.10 },
    { cx: '15%', cy: '85%', size: 450, color: BRAND.amber, opacity: 0.10 },
    { cx: '50%', cy: '50%', size: 400, color: BRAND.sage,  opacity: 0.08 },
  ],
  cta: [
    { cx: '50%', cy: '0%',  size: 800, color: BRAND.rust,       opacity: 0.35 },
    { cx: '15%', cy: '90%', size: 600, color: BRAND.rustBright, opacity: 0.25 },
    { cx: '85%', cy: '90%', size: 600, color: BRAND.amber,      opacity: 0.20 },
  ],
};

export function MangomintBlobs({ variant = 'soft' }: MangomintBlobsProps) {
  const blobs = blobVariants[variant];
  return (
    <div aria-hidden="true" style={{
      position: 'absolute', inset: 0, pointerEvents: 'none',
      mixBlendMode: variant === 'cta' ? 'screen' : 'multiply',
      overflow: 'hidden',
    } as React.CSSProperties}>
      {blobs.map((b, i) => (
        <div key={i} style={{
          position: 'absolute',
          left: b.cx, top: b.cy,
          width: b.size, height: b.size,
          transform: 'translate(-50%, -50%)',
          background: `radial-gradient(circle, ${b.color} 0%, transparent 70%)`,
          opacity: b.opacity,
          filter: 'blur(40px)',
          borderRadius: '50%',
        } as React.CSSProperties} />
      ))}
    </div>
  );
}
