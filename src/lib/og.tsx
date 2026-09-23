import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { HOME } from "@/lib/brand";
import { LimespunMarkOG } from "@/components/brand/limespun-mark-og";
import { PLANS, formatPrice } from "@/lib/data/plans";

/**
 * The one share card (1200x630) behind every opengraph-image route.
 * Fonts are the site's own, bundled as static TTFs (OFL) in src/app/_og-fonts:
 * Satori can't read woff2 or pick weights from a variable font.
 */

export const OG_SIZE = { width: 1200, height: 630 };
export const OG_CONTENT_TYPE = "image/png";

const monthly = PLANS.map((p) => p.monthlyCents);
export const OG_FROM_PRICE = `From ${formatPrice(Math.min(...monthly))}/mo`;
export const OG_PRICE_RANGE = `${formatPrice(Math.min(...monthly))}–${formatPrice(Math.max(...monthly))}`;

type OgFont = { name: string; data: Buffer; weight: 400 | 600 | 700; style: "normal" };

const FONT_DIR = join(process.cwd(), "src/app/_og-fonts");
const FONT_FILES: ReadonlyArray<Omit<OgFont, "data"> & { file: string }> = [
  { name: "Instrument Serif", file: "InstrumentSerif-Regular.ttf", weight: 400, style: "normal" },
  { name: "Inter", file: "Inter-Regular.ttf", weight: 400, style: "normal" },
  { name: "Inter", file: "Inter-SemiBold.ttf", weight: 600, style: "normal" },
  { name: "Inter", file: "Inter-Bold.ttf", weight: 700, style: "normal" },
];

let fonts: Promise<OgFont[]> | null = null;
function loadFonts(): Promise<OgFont[]> {
  fonts ??= Promise.all(
    FONT_FILES.map(async ({ file, ...font }) => ({ ...font, data: await readFile(join(FONT_DIR, file)) })),
  );
  return fonts;
}

/* Same irregular ember stripes as StripedFrame in components/home/ui.tsx. */
const STRIPE_STOPS: ReadonlyArray<[string, number, number]> = [
  [HOME.emberMid, 0, 7], [HOME.emberLight, 7, 9], [HOME.emberMid, 9, 15], [HOME.emberLight, 15, 19],
  [HOME.emberMid, 19, 31], [HOME.emberLight, 31, 33], [HOME.emberMid, 33, 46], [HOME.emberLight, 46, 51],
  [HOME.emberMid, 51, 58], [HOME.emberLight, 58, 60], [HOME.emberMid, 60, 72], [HOME.emberLight, 72, 77],
  [HOME.emberMid, 77, 88], [HOME.emberLight, 88, 90], [HOME.emberMid, 90, 100],
];
const STRIPES = `linear-gradient(118deg, ${STRIPE_STOPS.map(([c, a, b]) => `${c} ${a}%, ${c} ${b}%`).join(", ")})`;

export interface OgCardProps {
  /** One sentence per line, set in Instrument Serif. */
  lines: string[];
  /** Trailing words of one line to underline in ember, as in the hero. */
  underline?: string;
  /** One plain Inter line under the headline. */
  subline: string;
  /** Bottom-right fact. Defaults to the entry price. */
  meta?: string;
  /** Headline size; lower it for long lines so nothing runs off the card. */
  headlineSize?: number;
}

function Headline({ lines, underline, size }: { lines: string[]; underline?: string; size: number }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", fontFamily: "Instrument Serif", fontSize: size, lineHeight: 1.04, letterSpacing: "-0.01em" }}>
      {lines.map((line, i) => {
        const marked = underline && line.endsWith(underline) && lines.findIndex((l) => l.endsWith(underline)) === i;
        if (!marked) {
          return <div key={line} style={{ display: "flex" }}>{line}</div>;
        }
        const lead = line.slice(0, line.length - underline.length).trimEnd();
        return (
          <div key={line} style={{ display: "flex" }}>
            {lead ? <span style={{ marginRight: Math.round(size * 0.17) }}>{lead}</span> : null}
            <span style={{ position: "relative", display: "flex" }}>
              {underline}
              <svg
                viewBox="0 0 300 14"
                preserveAspectRatio="none"
                style={{ position: "absolute", left: "-1%", bottom: -Math.round(size * 0.06), width: "102%", height: Math.round(size * 0.18) }}
              >
                <path d="M3 9.5C58 4.5 121 3 186 4.2c38 .7 76 2.4 111 5.3" fill="none" stroke={HOME.ember} strokeWidth="5" strokeLinecap="round" />
              </svg>
            </span>
          </div>
        );
      })}
    </div>
  );
}

export async function ogImage({ lines, underline, subline, meta = OG_FROM_PRICE, headlineSize = 88 }: OgCardProps) {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", position: "relative", background: HOME.canvas, color: HOME.graphite, fontFamily: "Inter" }}>
        {/* The edge of a striped product frame, peeking in from the right. */}
        <div style={{ position: "absolute", top: 56, bottom: 56, right: -48, width: 196, display: "flex", borderRadius: 28, backgroundImage: STRIPES }} />

        <div style={{ display: "flex", flexDirection: "column", width: 1020, height: "100%", padding: "60px 64px 52px 80px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <LimespunMarkOG size={44} />
            <span style={{ fontSize: 32, fontWeight: 700, letterSpacing: "-0.03em", lineHeight: 1 }}>Limespun</span>
          </div>

          <div style={{ display: "flex", flexDirection: "column", marginTop: "auto", marginBottom: "auto" }}>
            <Headline lines={lines} underline={underline} size={headlineSize} />
            <div style={{ display: "flex", marginTop: 30, fontSize: 24, lineHeight: 1.45, color: HOME.graphiteSoft }}>
              {subline}
            </div>
          </div>

          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", paddingTop: 24, borderTop: `1px solid ${HOME.hair}`, fontSize: 22, fontWeight: 600 }}>
            <span style={{ color: HOME.mute }}>limespun.com</span>
            <span>{meta}</span>
          </div>
        </div>
      </div>
    ),
    { ...OG_SIZE, fonts: await loadFonts() },
  );
}
