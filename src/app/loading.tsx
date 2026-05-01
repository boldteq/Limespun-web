import { BRAND } from "@/lib/brand";

export default function Loading() {
  return (
    <div style={{
      minHeight: '100vh', display: 'flex', alignItems: 'center',
      justifyContent: 'center', background: BRAND.bone,
    } as React.CSSProperties}>
      <div style={{
        width: 6, height: 6, borderRadius: '50%',
        background: BRAND.rust,
        animation: 'inkos-pulse 1.5s ease-in-out infinite',
      } as React.CSSProperties} />
    </div>
  );
}
