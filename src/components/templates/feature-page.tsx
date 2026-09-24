import React from "react";
import {
  Container,
  FAQ,
  FeatureRow,
  InkBand,
  PageIntro,
  PlanChip,
  RelatedGrid,
  Reveal,
  Section,
  StripedFrame,
  cn,
  type ChipTone,
  type RelatedItem,
} from "@/components/system";
import { ACCOUNT } from "@/lib/brand";
import { featureHref, getFeature, type Feature, type FeatureSlug } from "@/lib/data/features";
import { PLANS, formatPrice } from "@/lib/data/plans";
import { getSegment, segmentHref } from "@/lib/data/segments";
import { TOOLS_INDEX } from "@/lib/site-links";
import { PageShell } from "./page-shell";
import {
  MiniGrid,
  PlanLadder,
  ProductStage,
  SectionHeader,
  SwitchingBand,
  WorksWith,
  type MomentVisual,
  type PlanRow,
  type SwitchingCopy,
  type TemplateInkBand,
} from "./parts";

export interface FeatureVisuals {
  /** The feature's home screen, full width in the striped frame. */
  hero: React.ReactNode;
  /**
   * Phones only: show the top of a tall hero screen and fade it out into the frame's foot,
   * so a long list costs one screen of scroll and no row is cut mid-line. Leave off for
   * phone mockups.
   */
  heroCrop?: boolean;
  /**
   * One per moment, in order. Pass { before, after } for a state change. A moment without a
   * visual (fewer visuals than moments, or null) is left out; with none the section is too.
   */
  moments: MomentVisual[];
  /**
   * The app label each of the six details lives behind (a button, tab or status as the
   * app prints it), shown as a chip over the detail. Same order as feature.miniFeatures.
   */
  detailLabels?: { label: string; tone?: ChipTone }[];
}

/** Section headings a page may set; the defaults are plain and safe for any feature. */
export interface FeatureHeadings {
  moments?: string;
  momentsLead?: string;
  details?: string;
  worksWith?: string;
  worksWithLead?: string;
}

/**
 * One row of four link cards: the related features not already linked under "Works with",
 * the page's free tool in place of the last of those, then the two segments. The comparisons
 * sit in the switching band (where a page has one), so the grid never leaves an orphan card.
 */
export function featureRelated(feature: Feature): RelatedItem[] {
  const neighbours = new Set<string>(feature.worksWith.map((w) => w.slug));
  const features: RelatedItem[] = feature.related
    .filter((slug) => !neighbours.has(slug))
    .map((slug) => {
      const r = getFeature(slug);
      return { eyebrow: "Feature", title: r.name, body: r.card, href: featureHref(slug) };
    });
  const tool = feature.tool ? TOOLS_INDEX.find((t) => t.slug === feature.tool) : undefined;
  if (tool) features.splice(Math.max(features.length - 1, 0), 1, { eyebrow: "Free tool", title: tool.name, body: tool.blurb, href: `/tools/${tool.slug}` });
  const segments: RelatedItem[] = feature.segments.map((slug) => {
    const s = getSegment(slug);
    return { eyebrow: "Who it's for", title: s.name, body: s.card, href: segmentHref(slug) };
  });
  return [...features.slice(0, 2), ...segments, ...features.slice(2)].slice(0, 4);
}

/** Comparisons named in the switching band: the two tools studios most often leave, then all of them. */
const FEATURE_COMPARE = [
  { label: "Vagaro", href: "/compare/vagaro" },
  { label: "Fresha", href: "/compare/fresha" },
  { label: "every comparison", href: "/compare" },
];

/**
 * The switching band, per feature: what this page's reader brings across, in the words the
 * /migrate page uses for the five things our team moves (clients and their notes, upcoming
 * bookings, deposits held, signed consent PDFs, project notes and photos). Pages where
 * migration isn't the question (Portfolio & flash, Design moodboards, Team, Inventory,
 * Reports, Marketing) leave the band out. A page can override with `switching`.
 * (Candidate for a `switching` field in src/lib/data/features.ts; kept here for now.)
 */
const FEATURE_SWITCHING: Partial<Record<FeatureSlug, SwitchingCopy>> = {
  calendar: {
    title: "Your booked weeks come across",
    line: "Our team moves every upcoming booking onto the right artist’s calendar at the same time, so no client has to rebook. Included on every plan.",
    moves: ["Upcoming bookings", "Clients and their notes", "Deposits you hold", "Signed consent forms"],
  },
  appointments: {
    title: "Deposits you already hold come across",
    line: "Paid deposits land on the client and the project, ready to apply at the session. Our team does the move on every plan.",
    moves: ["Deposits you hold", "Upcoming bookings", "Clients and their notes", "Signed consent forms"],
  },
  messages: {
    title: "Every client’s number comes across",
    line: "Phone numbers and emails land on each client’s record, so the first text you send from Limespun reaches the right person.",
    moves: ["Phone numbers and emails", "Clients and their notes", "Upcoming bookings", "Deposits you hold"],
  },
  clients: {
    title: "Your client list comes across, duplicates merged",
    line: "Our team moves contact details and notes onto each client’s record, and anyone your old tool listed twice becomes one client.",
    moves: ["Clients and their notes", "Upcoming bookings", "Deposits you hold", "Signed consent forms"],
  },
  forms: {
    title: "Forms clients already signed come across",
    line: "Signed consent forms land on each client’s record as PDFs, next to the ones they sign in Limespun.",
    moves: ["Signed consent forms", "Clients and their notes", "Upcoming bookings", "Deposits you hold"],
  },
  projects: {
    title: "Sleeves in progress come across mid-way",
    line: "Project notes and photos land under each project next to its sessions, with the deposit already held ready for the next one.",
    moves: ["Project notes and photos", "Deposits you hold", "Upcoming bookings", "Clients and their notes"],
  },
  payments: {
    title: "Deposits come across, card history stays behind",
    line: "We move the deposits you hold. Past card payments and payouts stay in your old tool’s reports, so download what you need before you close it.",
    moves: ["Deposits you hold", "Clients and their notes", "Upcoming bookings", "Signed consent forms"],
  },
};

const COUNT_WORDS: Record<number, string> = { 2: "two", 3: "three", 4: "four" };

/** A moment only renders with a screen; null, undefined and false mean "no screen". */
function hasVisual(v: MomentVisual | undefined): v is MomentVisual {
  return v !== null && v !== undefined && v !== false;
}

/**
 * Feature template: the screen → three moments → six details → the two features it feeds →
 * switching (features where migration matters) → what each plan gets → questions → related →
 * closing band.
 * Copy comes from src/lib/data/features.ts; the page passes the screens.
 *
 * Every list degrades on its own: fewer moments drop the swipe row (one moment is a plain
 * row), the details grid fills its rows for any count, "Works with" takes one or two
 * neighbours, the plan section turns into one compact "every plan" card when no higher plan
 * adds anything, and an empty list leaves its section out.
 */
export function FeaturePage({
  feature,
  visuals,
  headings,
  planRows,
  inkBand,
  related,
  relatedExtra,
  switching,
  jsonLd,
}: {
  feature: Feature;
  visuals: FeatureVisuals;
  headings?: FeatureHeadings;
  /**
   * The switching band's copy. Defaults to the feature's entry above; `false` leaves the band
   * out (so does a feature without an entry).
   */
  switching?: SwitchingCopy | false;
  /** What the feature adds on each plan, from the app's feature gate. Defaults to the feature on its first plan. */
  planRows?: PlanRow[];
  /** Closing band: a feature-specific headline with one italic word, and an optional contextual second link. */
  inkBand?: TemplateInkBand;
  /** Replaces the related mesh built from features.ts (4–8 links, nav nouns as titles). */
  related?: RelatedItem[];
  /** Added after the built mesh (a hub, a guide), up to 8 links in all. */
  relatedExtra?: RelatedItem[];
  jsonLd?: Record<string, unknown>[];
}) {
  const f = feature;
  const plan = PLANS.find((p) => p.tier === f.plan.min) ?? PLANS[0];
  const price = formatPrice(plan.monthlyCents);
  // Read the data's fixed-length tuples as plain lists so a shorter list still renders.
  const momentCopy: readonly Feature["moments"][number][] = f.moments;
  const moments = momentCopy.flatMap((m, i) => {
    const visual = visuals.moments[i];
    return hasVisual(visual) ? [{ ...m, visual }] : [];
  });
  const swipe = moments.length > 1;
  const details: readonly Feature["miniFeatures"][number][] = f.miniFeatures;
  const neighbourList: readonly Feature["worksWith"][number][] = f.worksWith;
  const neighbours = neighbourList.slice(0, 2).map((w) => ({ ...w, feature: getFeature(w.slug) }));
  const built = featureRelated(f);
  const relatedItems = (
    related ?? [...built, ...(relatedExtra ?? []).filter((x) => !built.some((r) => r.href === x.href))]
  ).slice(0, 8);
  const switchingCopy = switching === false ? undefined : (switching ?? FEATURE_SWITCHING[f.slug]);
  const worksWithTitle =
    neighbours.length === 2
      ? `Works with ${neighbours[0].feature.name} and ${neighbours[1].feature.name}`
      : neighbours.length === 1
        ? `Works with ${neighbours[0].feature.name}`
        : "";

  return (
    <PageShell jsonLd={jsonLd}>
      <PageIntro
        crumbs={[{ label: "Home", href: "/" }, { label: "Features", href: "/product" }, { label: f.name }]}
        eyebrow={<PlanChip plan={f.plan.min} andUp price />}
        title={f.h1}
        italicWord={f.italicWord}
        lead={f.sub}
        primary={{ label: ACCOUNT.signUpLabel, href: ACCOUNT.signUpHref }}
        secondary={{ label: "See pricing", href: "/pricing" }}
        visual={
          <StripedFrame inset="md" className={cn("max-sm:px-2.5 max-sm:py-6", visuals.heroCrop && "max-sm:pb-0")}>
            <div
              className={cn(
                "mx-auto max-w-[1040px]",
                visuals.heroCrop &&
                  "max-sm:max-h-[400px] max-sm:overflow-hidden max-sm:[mask-image:linear-gradient(to_bottom,#000_calc(100%-120px),transparent_calc(100%-8px))]",
              )}
            >
              {visuals.hero}
            </div>
          </StripedFrame>
        }
      />

      {moments.length > 0 && (
        <Section tone="white" labelledBy="moments-heading">
          <Container>
            <SectionHeader
              id="moments-heading"
              title={headings?.moments ?? `${f.name}, in use`}
              lead={headings?.momentsLead}
            />
            {/* Phones: the moments sit side by side and swipe (the next one peeks in), which keeps
                the page inside its mobile height budget. From sm they stack as alternating rows. */}
            <div
              role={swipe ? "region" : undefined}
              aria-label={swipe ? `${f.name} in ${COUNT_WORDS[moments.length] ?? moments.length} moments` : undefined}
              tabIndex={swipe ? 0 : undefined}
              className={cn(
                "mt-block-gap flex flex-col gap-16 lg:gap-24",
                swipe &&
                  "-mx-5 snap-x snap-mandatory scroll-px-5 flex-row gap-4 overflow-x-auto px-5 pb-1 [scrollbar-width:none] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-graphite sm:mx-0 sm:snap-none sm:flex-col sm:gap-16 sm:overflow-visible sm:px-0 sm:pb-0 lg:gap-24 [&::-webkit-scrollbar]:hidden",
              )}
            >
              {moments.map((m, i) => (
                <div key={m.title} className={cn("min-w-0", swipe && "w-[calc(100%-2.25rem)] shrink-0 snap-start sm:w-auto")}>
                  <FeatureRow
                    title={m.title}
                    body={m.body}
                    flip={i % 2 === 1}
                    className={cn(
                      // The screen gets the wider share (app frames carry a sidebar); flipped rows mirror it.
                      "gap-6 sm:gap-10 lg:gap-12 xl:gap-16",
                      i % 2 === 1
                        ? "lg:grid-cols-[minmax(0,1.3fr)_minmax(0,0.7fr)] xl:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)]"
                        : "lg:grid-cols-[minmax(0,0.7fr)_minmax(0,1.3fr)] xl:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)]",
                    )}
                    visual={<ProductStage visual={m.visual} />}
                  />
                </div>
              ))}
            </div>
          </Container>
        </Section>
      )}

      {details.length > 0 && (
        <Section tone="canvas" labelledBy="details-heading">
          <Container>
            <SectionHeader id="details-heading" title={headings?.details ?? `More in ${f.name}`} />
            <Reveal className="mt-block-gap">
              <MiniGrid
                label={headings?.details ?? `More in ${f.name}`}
                items={details.map((m, i) => ({
                  ...m,
                  label: visuals.detailLabels?.[i]?.label,
                  tone: visuals.detailLabels?.[i]?.tone,
                }))}
              />
            </Reveal>
          </Container>
        </Section>
      )}

      <WorksWith
        title={headings?.worksWith ?? worksWithTitle}
        lead={headings?.worksWithLead ?? "They read the same bookings and client records, so nothing is typed twice."}
        items={neighbours.map((n) => ({ name: n.feature.name, href: featureHref(n.slug), body: n.line }))}
      />

      {switchingCopy && <SwitchingBand compare={FEATURE_COMPARE} {...switchingCopy} />}

      <PlanLadder
        title={f.plan.min === "solo" ? `On every plan, from ${price} a month` : `From ${plan.name}, ${price} a month`}
        lead={f.plan.note}
        rows={planRows ?? [{ label: f.name, from: f.plan.min }]}
        start={f.plan.min}
      />

      <FAQ items={f.faqs} title={`${f.name} questions`} tone="white" compact />

      <RelatedGrid heading="Related" items={relatedItems} />

      <InkBand {...(inkBand ?? {})} />
    </PageShell>
  );
}
