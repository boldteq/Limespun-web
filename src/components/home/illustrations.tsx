import React from "react";
import { HOME } from "@/lib/brand";

/* Line illustrations: graphite outline, warm paper fill, one ember accent each. */
const ink = { stroke: HOME.graphite, strokeWidth: 1.6, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
const paper = HOME.white;
const warm = HOME.canvasDeep;

function Frame({ children, label }: { children: React.ReactNode; label: string }) {
  return (
    <svg viewBox="0 0 120 88" className="h-[88px] w-[120px]" role="img" aria-label={label}>
      {children}
    </svg>
  );
}

/** Book: a calendar page with a session block and a flash star. */
export function BookIllustration() {
  return (
    <Frame label="Calendar with a booked session">
      <rect x="18" y="16" width="62" height="60" rx="6" fill={paper} {...ink} />
      <path d="M18 30h62" {...ink} />
      <path d="M32 11v10M66 11v10" {...ink} />
      {[40, 52, 64].map((y) => (
        <path key={y} d={`M26 ${y}h46`} stroke={HOME.hairStrong} strokeWidth="1.2" strokeLinecap="round" />
      ))}
      <rect x="34" y="36" width="30" height="20" rx="3" fill={HOME.emberLight} stroke={HOME.graphite} strokeWidth="1.4" />
      <path d="M38 42h14M38 48h9" stroke={HOME.graphite} strokeWidth="1.3" strokeLinecap="round" />
      <path
        d="m96 22 3.2 6.6 7.3 1-5.3 5.1 1.3 7.2-6.5-3.4-6.5 3.4 1.3-7.2-5.3-5.1 7.3-1z"
        fill={warm}
        {...ink}
      />
      <rect x="84" y="54" width="28" height="14" rx="7" fill={paper} {...ink} />
      <path d="M91 61h14" stroke={HOME.graphite} strokeWidth="1.3" strokeLinecap="round" />
    </Frame>
  );
}

/** Deposits: a receipt that carries across sessions, with a coin. */
export function DepositIllustration() {
  return (
    <Frame label="Deposit receipt split across sessions">
      <path d="M24 12h48v62l-6-4-6 4-6-4-6 4-6-4-6 4-6-4z" fill={paper} {...ink} />
      <path d="M32 24h32M32 32h22" {...ink} />
      {[44, 52, 60].map((y, i) => (
        <g key={y}>
          <circle cx="35" cy={y} r="2.6" fill={i < 2 ? HOME.graphite : paper} stroke={HOME.graphite} strokeWidth="1.3" />
          <path d={`M42 ${y}h20`} stroke={HOME.hairStrong} strokeWidth="1.3" strokeLinecap="round" />
        </g>
      ))}
      <circle cx="88" cy="56" r="15" fill={HOME.emberLight} {...ink} />
      <path d="M88 47v18M92 51.5c-1-1.6-2.6-2.2-4.4-2.2-2.4 0-4.1 1.3-4.1 3.2 0 4.6 8.9 2.3 8.9 7 0 2-1.9 3.4-4.5 3.4-2 0-3.7-.8-4.7-2.4" {...ink} />
      <path d="M78 22c6 0 11 3 13 9" fill="none" {...ink} strokeDasharray="3 4" />
      <path d="m89 27 2.4 4.4 4.2-2.6" fill="none" {...ink} />
    </Frame>
  );
}

/** Consent: clipboard with a signature and an allergy tick. */
export function ConsentIllustration() {
  return (
    <Frame label="Consent form with signature">
      <rect x="22" y="14" width="56" height="64" rx="6" fill={paper} {...ink} />
      <rect x="38" y="9" width="24" height="10" rx="3" fill={warm} {...ink} />
      <path d="M32 30h36M32 38h28" {...ink} />
      <rect x="32" y="46" width="9" height="9" rx="2" fill={HOME.emberLight} stroke={HOME.graphite} strokeWidth="1.4" />
      <path d="m34 50.5 2 2 3.4-4" stroke={HOME.graphite} strokeWidth="1.4" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M46 50.5h18" stroke={HOME.hairStrong} strokeWidth="1.3" strokeLinecap="round" />
      <path d="M32 68c4-6 7-6 8-1s4 3 7-2 5-3 6 0 3 2 7-1" fill="none" {...ink} />
      <path d="M86 30 102 46 92 76 80 64z" fill={warm} {...ink} />
      <path d="m86 30 6 30M92 60l-12 4" {...ink} />
    </Frame>
  );
}

/** Payouts: one payment splitting to studio and artist. */
export function PayoutIllustration() {
  return (
    <Frame label="Payment splitting between studio and artist">
      <rect x="10" y="30" width="38" height="26" rx="5" fill={paper} {...ink} />
      <path d="M10 38h38" {...ink} />
      <path d="M17 48h12" {...ink} />
      <path d="M50 43h10c6 0 8-4 12-12M60 43c6 0 8 4 12 12" fill="none" {...ink} />
      <path d="m68 29 5 2-1 5M68 57l5-2-1-5" fill="none" {...ink} />
      <rect x="76" y="14" width="34" height="22" rx="5" fill={HOME.emberLight} {...ink} />
      <path d="M83 25h16" {...ink} />
      <rect x="76" y="50" width="34" height="22" rx="5" fill={paper} {...ink} />
      <path d="M83 61h12" {...ink} />
      <circle cx="104" cy="61" r="2.4" fill={HOME.graphite} />
    </Frame>
  );
}

