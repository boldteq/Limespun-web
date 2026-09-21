import { LIMESPUN_MARK_PATHS } from "@/components/brand/limespun-mark";

export function LimespunMarkOG({ size = 56 }: { size?: number }) {
  return (
    <svg width={size} height={size * 1.04} viewBox="0 0 50 52" xmlns="http://www.w3.org/2000/svg">
      <path d={LIMESPUN_MARK_PATHS.body} fill="#EC5C2D" />
      <path d={LIMESPUN_MARK_PATHS.glyph} fill="#FFFFFF" />
    </svg>
  );
}
