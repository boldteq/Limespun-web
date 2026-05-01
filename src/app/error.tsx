"use client";
import { useEffect } from "react";
import { BRAND, FONT } from "@/lib/brand";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div style={{
      minHeight: '100vh', display: 'flex', alignItems: 'center',
      justifyContent: 'center', flexDirection: 'column', gap: 16,
      background: BRAND.bone, padding: '0 32px',
    } as React.CSSProperties}>
      <h2 style={{ fontFamily: FONT.sans, fontSize: 24, fontWeight: 600, color: BRAND.onyx }}>
        Something went wrong
      </h2>
      <button
        onClick={reset}
        style={{
          background: BRAND.onyx, color: BRAND.bone,
          fontFamily: FONT.sans, fontSize: 14, fontWeight: 500,
          padding: '10px 20px', borderRadius: 100, border: 'none', cursor: 'pointer',
        } as React.CSSProperties}
      >
        Try again
      </button>
    </div>
  );
}
