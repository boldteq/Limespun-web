import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container, InkBand, PageIntro, RelatedGrid, Title, cn, type RelatedItem } from "@/components/system";
import { PageShell } from "@/components/templates/page-shell";
import { getFeature } from "@/lib/data/features";
import { PLANS, formatPrice } from "@/lib/data/plans";
import { TOOLS_INDEX } from "@/lib/site-links";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Free tools for tattoo studios",
  description:
    "Free calculators and templates for tattoo studios: deposit and no-show calculator, artist payout calculator and a printable tattoo consent form.",
  path: "/tools",
});

type ToolSlug = (typeof TOOLS_INDEX)[number]["slug"];

/** Card titles never end on one word or break after a hyphen ("no-" / "show"). */
const wholeEnding = (title: string) => title.replace(/-/g, "-\u2060").replace(/\s+(\S+)$/, "\u00a0$1");

const usd = (n: number) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(Math.round(n));

/* Each preview shows the tool as it opens, from the same starting numbers the tool uses. */

/** Deposit calculator defaults: $400 sessions, 40 a month, 8% no-shows, 25% deposit. */
const DEP = { price: 400, sessions: 40, noShowPct: 8, depositPct: 25 };
const depMissed = (DEP.sessions * DEP.noShowPct) / 100;
const depLost = depMissed * DEP.price;
const depKept = depLost * (DEP.depositPct / 100);

/** Payout calculator defaults: commission, $350 sessions, 10 this week, artist keeps 60%. */
const PAY = { ticket: 350, sessions: 10, artistPct: 60 };
const payGross = PAY.ticket * PAY.sessions;
const payArtist = payGross * (PAY.artistPct / 100);

function ResultLine({ label, value, strong = false }: { label: string; value: string; strong?: boolean }) {
  return (
    <div className="flex items-baseline justify-between gap-4 border-b border-hair py-2.5 last:border-b-0">
      <span className={strong ? "text-[14px] font-semibold text-graphite" : "text-[14px] text-graphite-soft"}>{label}</span>
      <span
        className={cn(
          "text-graphite tabular-nums",
          strong ? "text-[24px] font-medium tracking-[-0.02em]" : "text-[15px] font-semibold",
        )}
      >
        {value}
      </span>
    </div>
  );
}

function PreviewCard({ label, children, className }: { label: string; children: React.ReactNode; className?: string }) {
  return (
    <div className={cn("rounded-card bg-white p-4 shadow-[var(--shadow-lift)] ring-1 ring-graphite/5 sm:p-5", className)}>
      <p className="text-label text-mute uppercase">{label}</p>
      <div className="mt-1.5">{children}</div>
    </div>
  );
}

function DepositPreview() {
  return (
    <PreviewCard label="Each month">
      <ResultLine label="Sessions missed" value={depMissed.toFixed(1)} />
      <ResultLine label="Lost with no deposit" value={usd(depLost)} />
      <ResultLine label="Kept by your deposit" value={usd(depKept)} strong />
    </PreviewCard>
  );
}

function PayoutPreview() {
  return (
    <PreviewCard label="This week">
      {/* The three pay models, as the tool's switch; a narrow card keeps the first two */}
      <div className="@container mt-1 mb-2">
        <div className="flex gap-1 rounded-full bg-canvas p-1 text-center text-[11px] font-semibold whitespace-nowrap">
          <span className="flex-auto rounded-full bg-graphite px-1.5 py-1 text-white">Commission</span>
          <span className="flex-auto px-1.5 py-1 text-graphite-soft">Booth rent</span>
          <span className="hidden flex-auto px-1.5 py-1 text-graphite-soft @[15rem]:block">Guest split</span>
        </div>
      </div>
      <ResultLine label="Takings" value={usd(payGross)} />
      <ResultLine label="Studio keeps" value={usd(payGross - payArtist)} />
      <ResultLine label="Artist is paid" value={usd(payArtist)} strong />
    </PreviewCard>
  );
}

function ConsentPreview() {
  const box = <span className="mt-[3px] h-3.5 w-3.5 shrink-0 rounded-[4px] ring-1 ring-hair-strong ring-inset" />;
  return (
    <PreviewCard label="Consent and release form">
      <p className="mt-1 font-serif text-[20px] leading-tight text-graphite">[Studio name]</p>
      <p className="mt-3 text-[11px] font-semibold tracking-[0.08em] text-mute uppercase">Health questions</p>
      <ul className="mt-2 flex flex-col gap-1.5 text-[13px] leading-snug text-graphite">
        <li className="flex gap-2">
          {box}
          Allergies (inks, pigments, latex): Yes / No
        </li>
        <li className="flex gap-2">
          {box}
          Blood thinners or medication: Yes / No
        </li>
        <li className="flex gap-2">
          {box}
          Pregnant or breastfeeding: Yes / No
        </li>
      </ul>
      <div className="mt-4 flex items-end gap-3 border-t border-hair pt-3">
        <span className="text-[12px] text-mute">Client signature</span>
        <span className="h-px flex-1 translate-y-[-3px] bg-hair-strong" />
      </div>
    </PreviewCard>
  );
}

const TOOLS: Record<ToolSlug, { kind: string; body: string; cta: string; preview: React.ReactNode }> = {
  "deposit-calculator": {
    kind: "Calculator",
    body: "What no-shows and late cancels cost you each month, and how much of it a deposit keeps.",
    cta: "Open the calculator",
    preview: <DepositPreview />,
  },
  "payout-calculator": {
    kind: "Calculator",
    body: "What the artist and the studio each take home under commission, booth rent or a guest split.",
    cta: "Open the calculator",
    preview: <PayoutPreview />,
  },
  "consent-form-template": {
    kind: "Template",
    body: "A consent and release form with health questions and signatures. Add your studio name, then print it.",
    cta: "Open the template",
    preview: <ConsentPreview />,
  },
};

const RELATED: RelatedItem[] = [
  ...(["appointments", "payments", "forms"] as const).map((slug) => {
    const f = getFeature(slug);
    return { eyebrow: "Feature", title: f.navLabel, body: f.card, href: f.href };
  }),
  {
    eyebrow: "Plans",
    title: "Pricing",
    body: `Flat monthly plans from ${formatPrice(PLANS[0].monthlyCents)}. No cut of bookings.`,
    href: "/pricing",
  },
];

export default function ToolsPage() {
  return (
    <PageShell>
      <PageIntro
        crumbs={[{ label: "Home", href: "/" }, { label: "Free tools" }]}
        title="Free tools for tattoo studios"
        italicWord="Free"
        lead="The deposit math, the payout split and a consent form to print. No sign-up, and nothing you type leaves your browser."
      />

      <section aria-label="Free tools" className="border-t border-hair bg-white py-section-y-tight">
        <Container>
          {/* From sm each card is a two-row subgrid, so previews and titles line up across a row */}
          <ul className="grid gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
            {TOOLS_INDEX.map((t, i) => {
              const tool = TOOLS[t.slug];
              const last = i === TOOLS_INDEX.length - 1;
              return (
                <li key={t.slug} className={cn("min-w-0 sm:row-span-2 sm:grid sm:grid-rows-subgrid sm:gap-y-0", last && "sm:col-span-2 lg:col-span-1")}>
                  <Link
                    href={`/tools/${t.slug}`}
                    className="group flex h-full flex-col overflow-hidden rounded-card bg-canvas ring-1 ring-hair transition-[box-shadow] duration-200 hover:shadow-[var(--shadow-lift)] hover:ring-hair-strong focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-graphite sm:row-span-2 sm:grid sm:grid-rows-subgrid sm:gap-y-0"
                  >
                    {/* The tool as it opens: decorative, the copy below says the same */}
                    <div aria-hidden="true" className="flex items-center bg-canvas-deep px-5 py-6 sm:px-7 sm:py-8">
                      <div className={cn("mx-auto w-full max-w-[360px]", last && "sm:max-w-[400px] lg:max-w-[360px]")}>
                        {tool.preview}
                      </div>
                    </div>
                    <div className="flex flex-1 flex-col border-t border-hair p-5 sm:p-7">
                      <span className="text-label text-mute uppercase">{tool.kind}</span>
                      <Title as="h2" size="md" className="mt-2 text-pretty">
                        {wholeEnding(t.name)}
                      </Title>
                      <span className="mt-2 flex-1 text-[16px] leading-[1.55] text-pretty text-graphite-soft">{tool.body}</span>
                      <span className="mt-5 inline-flex items-center gap-1.5 text-[15px] font-semibold text-graphite">
                        {tool.cta}
                        <ArrowRight
                          size={16}
                          strokeWidth={2.2}
                          aria-hidden="true"
                          className="transition-transform duration-200 group-hover:translate-x-1"
                        />
                      </span>
                    </div>
                  </Link>
                </li>
              );
            })}
          </ul>
        </Container>
      </section>

      <RelatedGrid heading="Do it in Limespun" items={RELATED} tone="canvas" />

      <InkBand headline="Let Limespun do the math." italicWord="math" />
    </PageShell>
  );
}
