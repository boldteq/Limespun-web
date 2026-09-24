import React from "react";
import {
  Button,
  Chip,
  Container,
  Display,
  Eyebrow,
  Lead,
  Reveal,
  SampleTag,
  Section,
  StripedFrame,
  Title,
  cn,
  type RelatedItem,
} from "@/components/system";
import { ContentPage } from "@/components/templates/content-page";
import { ClientFileScreen } from "@/components/mockups/client-file";
import { SITE_URL } from "@/lib/brand";
import { FOUNDING_OFFER_OPEN, FOUNDING_OFFER_SIZE, PLANS, formatPrice } from "@/lib/data/plans";
import { absoluteUrl, pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "About: studio software built only for tattoo",
  description:
    "Boldteq builds Limespun, studio software made only for tattoo. Founded in 2024 and live today, with flat monthly plans and no cut of bookings or deposits.",
  path: "/about",
});

/* Confirmed fields only: no social profiles or legal details until they're signed off. The founder
   belongs to Boldteq, not to this Limespun record, so he is named on the page only. */
const ORGANIZATION_JSON_LD: Record<string, unknown> = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Limespun",
  url: SITE_URL,
  logo: absoluteUrl("/icon.svg"),
};

const fromPrice = formatPrice(Math.min(...PLANS.map((p) => p.monthlyCents)));

/* ─── Origin ─────────────────────────────────────────────────────────────────
   Three short paragraphs. No file, sprint or customer counts. */
const ORIGIN = [
  "We started Boldteq in 2024 after watching tattoo studios make do with software built for salons and spas. A sleeve was booked as a string of unrelated appointments, the allergy note sat three screens deep, and deposits lived in a notebook.",
  "So Limespun is built for tattoo from the first screen. A sleeve is one project, and its deposit pool follows it from session to session. An allergy tops the client file and every booking. Consent is signed on the client’s phone before they sit down.",
  "Boldteq is a small, independent team. We take no cut of bookings, so we only grow when studios choose to keep paying.",
];

/* ─── Milestones ──────────────────────────────────────────────────────────── */
interface Milestone {
  when: string;
  title: string;
  body: string;
  action?: { label: string; href: string };
}

const MILESTONES: Milestone[] = [
  { when: "2024", title: "Boldteq founded", body: "We start building Limespun, for tattoo studios only." },
  {
    when: "2026",
    title: "Limespun goes live",
    body: "Studios sign up, pay monthly or yearly, and we move their data over on every plan.",
  },
  FOUNDING_OFFER_OPEN
    ? {
        when: "Now",
        title: "Founding offer open",
        body: `A one-time lifetime price for the first ${FOUNDING_OFFER_SIZE} studios, beside the monthly and yearly plans.`,
        action: { label: "See pricing", href: "/pricing" },
      }
    : {
        when: "Now",
        title: "Building with studios",
        body: "What ships next comes from the studios using Limespun.",
        action: { label: "See the roadmap", href: "/roadmap" },
      },
];

/* ─── Principles ──────────────────────────────────────────────────────────── */
interface Principle {
  title: string;
  body: string;
  /** The proof under the words: an app label, a price, the sample tag or the pages to check. */
  proof: React.ReactNode;
}

const PRINCIPLES: Principle[] = [
  {
    title: "Built only for tattoo",
    body: "Sessions, deposits, consent and artist splits are the foundation, not add-ons to salon software. If it doesn’t fit a tattoo studio, we don’t build it.",
    proof: (
      // The labels the app prints on Elena R.'s file and Asha M.'s project (decorative: the text says it)
      <div aria-hidden="true" className="hidden flex-wrap gap-2 sm:flex">
        <Chip tone="quiet" className="px-2.5 py-1 text-[12px]">
          Session 2 of 3
        </Chip>
        <Chip tone="ember" className="px-2.5 py-1 text-[12px]">
          Deposit pool
        </Chip>
        <Chip tone="flag" className="px-2.5 py-1 text-[12px]">
          Red ink allergy
        </Chip>
      </div>
    ),
  },
  {
    title: "Flat price, no cut",
    body: `One monthly price per plan, from ${fromPrice}. No Limespun fee on bookings or deposits; card payments carry the provider’s standard fee.`,
    proof: (
      <ul aria-label="Monthly plan prices" className="flex flex-wrap gap-x-3.5 gap-y-1.5 text-[14px] text-graphite-soft sm:gap-x-5 sm:text-[15px]">
        {PLANS.map((p) => (
          <li key={p.tier} className="whitespace-nowrap">
            <span className="font-semibold text-graphite">{p.name}</span>{" "}
            <span className="tabular-nums">{formatPrice(p.monthlyCents)}</span>
          </li>
        ))}
      </ul>
    ),
  },
  {
    title: "Say what’s true",
    body: "No invented reviews, studios or numbers. If something isn’t in the app yet, we say so.",
    proof: (
      <p className="flex flex-wrap items-center gap-2 text-[15px] text-graphite-soft">
        <SampleTag className="bg-white" />
        <span>on every product screen</span>
      </p>
    ),
  },
  {
    title: "Ship with studios",
    body: "What we build next comes from the studios using Limespun. The changelog shows what shipped and the roadmap shows what’s next.",
    proof: (
      <div className="flex flex-wrap gap-x-7">
        <Button href="/changelog" variant="ghost" arrow>
          Changelog
        </Button>
        <Button href="/roadmap" variant="ghost" arrow>
          Roadmap
        </Button>
      </div>
    ),
  },
];

/* ─── Founder ─────────────────────────────────────────────────────────────────
   Name and role only, the same fact as the press kit's facts table. No photo, no bio claims. */
const FOUNDER = { name: "Yash Baldha", initials: "YB", role: "Founder, Boldteq" } as const;

const RELATED: RelatedItem[] = [
  {
    eyebrow: "Product",
    title: "All features",
    body: "Bookings, deposits, consent forms, projects and artist payouts.",
    href: "/product",
  },
  {
    eyebrow: "Plans",
    title: "Pricing",
    body: `Flat monthly plans from ${fromPrice}. No cut of bookings or deposits.`,
    href: "/pricing",
  },
  {
    eyebrow: "Switching",
    title: "Switching guide",
    body: "We move your clients, bookings, deposits and signed forms on every plan.",
    href: "/migrate",
  },
  { eyebrow: "Company", title: "Contact", body: "Questions about switching, plans or your account.", href: "/contact" },
];

/* ─── Sections ────────────────────────────────────────────────────────────── */

function Origin() {
  return (
    <Section tone="white" density="story" labelledBy="origin-heading">
      <Container className="grid gap-10 sm:gap-14 xl:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] xl:items-center xl:gap-20">
        {/* Below xl the screen sits under the copy at full width (a side-by-side client file
            is too narrow at 1024); from lg to xl the heading and the story share the row. */}
        <div className="lg:grid lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-16 xl:block">
          <div>
            <Eyebrow>Where it started</Eyebrow>
            <Display id="origin-heading" className="mt-4 max-w-[560px]">
              Built for sessions, not appointments
            </Display>
          </div>
          <div className="mt-6 flex max-w-[560px] flex-col gap-4 text-[17px] leading-[1.65] text-pretty text-graphite-soft sm:mt-8 sm:gap-5 lg:mt-1 xl:mt-8">
            {ORIGIN.map((p) => (
              <p key={p.slice(0, 24)}>{p}</p>
            ))}
          </div>
        </div>

        {/* The product, once: the client file with the allergy first. It runs off the frame's
            foot and fades: phones keep the banner and Elena's card, wider frames add the
            briefing strip, tabs and pinned note. */}
        <figure className="min-w-0">
          <StripedFrame inset="md" className="pb-0 sm:pb-0">
            <div className="max-h-[300px] overflow-hidden [mask-image:linear-gradient(to_bottom,#000_calc(100%-64px),transparent)] sm:max-h-[600px] sm:[mask-image:linear-gradient(to_bottom,#000_calc(100%-120px),transparent)]">
              <ClientFileScreen tab="overview" />
            </div>
          </StripedFrame>
          <figcaption className="mt-4 max-w-[520px] text-[14px] leading-[1.5] text-pretty text-mute">
            Elena R.’s client file in the sample studio. Her red ink allergy is the first line on it.
          </figcaption>
        </figure>
      </Container>
    </Section>
  );
}

function Milestones() {
  const last = MILESTONES.length - 1;
  return (
    <Section tone="deep" density="proof" labelledBy="milestones-heading">
      <Container>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between sm:gap-10">
          <Display id="milestones-heading" className="max-w-[640px]">
            From 2024 to today
          </Display>
          <Button href="/changelog" variant="ghost" arrow className="hidden self-end sm:inline-flex">
            What’s shipped
          </Button>
        </div>

        {/* A real sequence in time: a rail down the side on phones, across the row from sm.
            The current step is the ember node. */}
        <ol className="mt-8 grid sm:mt-12 sm:grid-cols-3">
          {MILESTONES.map((m, i) => (
            <li key={m.title} className="grid grid-cols-[14px_minmax(0,1fr)] gap-x-5 sm:flex sm:flex-col sm:gap-0">
              <div aria-hidden="true" className="flex flex-col items-center sm:flex-row">
                <span
                  className={cn(
                    "mt-[11px] h-3.5 w-3.5 shrink-0 rounded-full sm:mt-0",
                    i === last ? "bg-ember ring-4 ring-ember-soft" : "bg-canvas ring-1 ring-hair-strong ring-inset",
                  )}
                />
                <span className={cn("mt-2 w-px flex-1 bg-hair-strong sm:mt-0 sm:ml-2 sm:h-px sm:w-auto", i === last && "hidden")} />
              </div>
              <div className={cn("min-w-0 sm:mt-7 sm:pr-8", i !== last && "pb-7 sm:pb-0")}>
                {/* Phones set the year beside the title; from sm it stands over it */}
                <div className="flex flex-wrap items-baseline gap-x-3 sm:block">
                  <p className="font-serif text-[34px] leading-none text-ember-deep tabular-nums sm:text-[52px]">{m.when}</p>
                  <Title as="h3" size="sm" className="sm:mt-4">
                    {m.title}
                  </Title>
                </div>
                <p className="mt-1.5 max-w-[340px] text-[16px] leading-[1.6] text-pretty text-mute">{m.body}</p>
                {m.action && (
                  <Button href={m.action.href} variant="ghost" arrow className="mt-2">
                    {m.action.label}
                  </Button>
                )}
              </div>
            </li>
          ))}
        </ol>
      </Container>
    </Section>
  );
}

function Principles() {
  return (
    <Section tone="white" density="story" id="principles" labelledBy="principles-heading">
      <Container className="grid gap-8 sm:gap-12 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-20">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <Display id="principles-heading" className="max-w-[480px]">
            Four rules we build by
          </Display>
          <Lead className="mt-5 hidden max-w-[440px] text-mute sm:block">
            They decide what goes into Limespun, what stays out, and how we talk about it.
          </Lead>
        </div>
        <div className="min-w-0">
          <ul className="border-t border-hair-strong">
            {PRINCIPLES.map((p, i) => (
              <Reveal
                as="li"
                key={p.title}
                index={i}
                className="grid gap-x-10 gap-y-3 border-b border-hair-strong py-5 sm:grid-cols-[minmax(0,1fr)_minmax(0,0.85fr)] sm:py-9 lg:grid-cols-1 xl:grid-cols-[minmax(0,1fr)_minmax(0,0.85fr)]"
              >
                <div className="min-w-0">
                  <Title as="h3" size="md">
                    {p.title}
                  </Title>
                  <p className="mt-2 max-w-[460px] text-[16px] leading-[1.6] text-pretty text-mute sm:text-[17px]">{p.body}</p>
                </div>
                <div className="min-w-0 sm:self-center lg:self-auto xl:self-center">{p.proof}</div>
              </Reveal>
            ))}
          </ul>
          <Founder />
        </div>
      </Container>
    </Section>
  );
}

/* Signs off the four rules: who decides what goes in. A quiet canvas card so it doesn't read as a fifth rule. */
function Founder() {
  return (
    <div className="mt-8 rounded-card bg-canvas p-5 sm:mt-14 sm:p-8">
      <h2 id="founder-heading" className="text-label text-ember-deep uppercase">
        Who builds it
      </h2>
      <div className="mt-4 grid gap-4 sm:mt-5 sm:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] sm:items-center sm:gap-8 lg:grid-cols-1 lg:gap-4 xl:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] xl:gap-8">
        <div className="flex items-center gap-4">
          <span
            aria-hidden="true"
            className="grid h-14 w-14 shrink-0 place-items-center rounded-full bg-white font-serif text-[22px] text-graphite ring-1 ring-hair-strong"
          >
            {FOUNDER.initials}
          </span>
          <div className="min-w-0">
            <p className="text-[18px] leading-[1.3] font-semibold whitespace-nowrap text-graphite">{FOUNDER.name}</p>
            <p className="mt-0.5 text-[15px] whitespace-nowrap text-mute">{FOUNDER.role}</p>
          </div>
        </div>
        <p className="max-w-[460px] text-[16px] leading-[1.6] text-pretty text-mute">
          Runs Boldteq and decides what Limespun builds next, from what studios tell us.
        </p>
      </div>
    </div>
  );
}

export default function AboutPage() {
  return (
    <ContentPage
      layout="sections"
      crumbs={[{ label: "Home", href: "/" }, { label: "About" }]}
      eyebrow="About Limespun"
      title="A tattoo studio isn’t a salon."
      italicWord="salon"
      lead={
        <>
          So we build Limespun only for tattoo: bookings, deposits, consent, multi-session projects and artist payouts in
          one client record, for one <span className="whitespace-nowrap">flat monthly price.</span>
        </>
      }
      jsonLd={[ORGANIZATION_JSON_LD]}
      related={{ items: RELATED }}
      inkBand={{
        eyebrow: FOUNDING_OFFER_OPEN ? `Founding offer · first ${FOUNDING_OFFER_SIZE} studios` : undefined,
        headline: "Run the shop on software made for tattoo.",
        italicWord: "tattoo",
        secondary: { label: "Careers", href: "/careers" },
      }}
    >
      <Origin />
      <Milestones />
      <Principles />
    </ContentPage>
  );
}
