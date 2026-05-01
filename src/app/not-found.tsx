import Link from "next/link";
import { BRAND, FONT } from "@/lib/brand";

export default function NotFound() {
  return (
    <div style={{
      minHeight: '100vh', display: 'flex', alignItems: 'center',
      justifyContent: 'center', flexDirection: 'column', gap: 16,
      background: BRAND.bone, padding: '0 32px',
    } as React.CSSProperties}>
      <div style={{ fontFamily: FONT.sans, fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', color: BRAND.rust }}>404</div>
      <h2 style={{ fontFamily: FONT.sans, fontSize: 32, fontWeight: 600, color: BRAND.onyx, letterSpacing: '-0.02em' }}>
        Page not found
      </h2>
      <Link href="/" style={{
        background: BRAND.onyx, color: BRAND.bone,
        fontFamily: FONT.sans, fontSize: 14, fontWeight: 500,
        padding: '10px 20px', borderRadius: 100, textDecoration: 'none',
      } as React.CSSProperties}>
        Back home
      </Link>
    </div>
  );
}
