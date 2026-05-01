import { BRAND } from "@/lib/brand";

interface TriCircleMarkProps {
  size?: number;
  opacity?: number;
}

export function TriCircleMark({ size = 64, opacity = 1 }: TriCircleMarkProps) {
  const w = size;
  const h = size * 0.92;
  return (
    <svg
      width={w} height={h} viewBox="0 0 64 59"
      xmlns="http://www.w3.org/2000/svg"
      style={{ opacity }}
      aria-hidden="true"
    >
      <path
        d="M 30 0 a 30 30 0 0 0 -30 30 v -30 z"
        fill={BRAND.rust}
        transform="rotate(180 15 15)"
      />
      <path
        d="M 34 0 v 30 a 30 30 0 0 0 30 -30 z"
        fill={BRAND.amber}
        transform="rotate(180 49 15)"
      />
      <path
        d="M 17 30 a 15 15 0 1 0 30 0 a 15 15 0 1 0 -30 0 z"
        fill={BRAND.sage}
      />
    </svg>
  );
}

export function TriCircleMarkV2({ size = 80, opacity = 1 }: TriCircleMarkProps) {
  const r = size * 0.28;
  const cx1 = size * 0.32;
  const cy1 = size * 0.32;
  const cx2 = size * 0.68;
  const cy2 = size * 0.32;
  const cx3 = size * 0.50;
  const cy3 = size * 0.68;

  return (
    <svg
      width={size} height={size} viewBox={`0 0 ${size} ${size}`}
      xmlns="http://www.w3.org/2000/svg"
      style={{ opacity }}
      aria-hidden="true"
    >
      <circle cx={cx1} cy={cy1} r={r} fill={BRAND.rust} fillOpacity="0.92" />
      <circle cx={cx2} cy={cy2} r={r} fill={BRAND.amber} fillOpacity="0.92" />
      <circle cx={cx3} cy={cy3} r={r} fill={BRAND.sage} fillOpacity="0.92" />
    </svg>
  );
}
