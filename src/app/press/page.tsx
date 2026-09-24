import React from "react";
import { Download } from "lucide-react";
import { LimespunMark } from "@/components/brand/limespun-mark";
import {
  Container,
  Display,
  Lead,
  Section,
  Title,
  buttonClass,
  cn,
  type RelatedItem,
} from "@/components/system";
import { ContentPage } from "@/components/templates/content-page";
import { CONTACT_EMAIL, HOME, SITE_URL } from "@/lib/brand";
import {
  ANNUAL_DISCOUNT_PERCENT,
  FOUNDING_OFFER_OPEN,
  FOUNDING_OFFER_SIZE,
  MONEY_BACK_DAYS,
  PLANS,
  formatPrice,
} from "@/lib/data/plans";
import { pageMetadata } from "@/lib/seo";
import { CopyButton } from "./copy-button";

export const metadata = pageMetadata({
  title: "Press kit: facts, logo and brand colors",
  description:
    "The Limespun press kit: company facts and plan prices, the mark and wordmark as SVG files, brand colors with hex values, and a 50-word boilerplate to quote.",
  path: "/press",
});

/** Press questions go to the main inbox; the subject line marks them as press. */
const PRESS_MAIL = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent("Press question")}`;

const fromPrice = formatPrice(Math.min(...PLANS.map((p) => p.monthlyCents)));

/* ─── Boilerplate ─────────────────────────────────────────────────────────────
   Quotable as written. The count is computed, so the label stays true if the copy changes. */
const BOILERPLATE = `Limespun is studio software built only for tattoo. Bookings, deposits, consent forms, multi-session projects and artist payouts live in one client record. Studios pay a flat monthly price from ${fromPrice}, with no cut of their bookings or deposits. Limespun is made by Boldteq, an independent team founded in 2024. limespun.com`;
const BOILERPLATE_WORDS = BOILERPLATE.split(/\s+/).filter(Boolean).length;

/* ─── Facts ───────────────────────────────────────────────────────────────────
   Every value is confirmed or read from plans.ts. No customer counts, no coverage. */
const inlineLink =
  "font-semibold text-graphite underline decoration-ember decoration-2 underline-offset-4 hover:text-ember-deep focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-graphite";
/* A link that stands alone in a table cell gets the full 44px target (links inside sentences don't need it) */
const cellLink = cn(inlineLink, "-my-2.5 inline-flex min-h-11 items-center");

const FACTS: { label: string; value: React.ReactNode }[] = [
  { label: "Product", value: "Limespun, studio software built only for tattoo" },
  { label: "Company", value: "Boldteq Holdings Ltd" },
  { label: "Founded", value: "2024" },
  { label: "Founder", value: "Yash Baldha" },
  {
    label: "Status",
    value: `Live. Studios pay monthly or yearly${
      FOUNDING_OFFER_OPEN ? `, or once on the founding offer for the first ${FOUNDING_OFFER_SIZE} studios` : ""
    }.`,
  },
  {
    label: "Plans",
    value: (
      <>
        {PLANS.map((p, i) => (
          <React.Fragment key={p.tier}>
            {i > 0 && ", "}
            <span className="whitespace-nowrap">
              {p.name} <span className="tabular-nums">{formatPrice(p.monthlyCents)}</span>
            </span>
          </React.Fragment>
        ))}{" "}
        a month, flat. {ANNUAL_DISCOUNT_PERCENT}% off billed yearly.
      </>
    ),
  },
  {
    label: "Fees",
    value: "No Limespun fee on bookings or deposits. Card payments carry the provider’s standard fee.",
  },
  {
    label: "Guarantee",
    value: `${MONEY_BACK_DAYS}-day money-back guarantee, no free trial. We move each studio’s data over on every plan.`,
  },
  {
    label: "Website",
    value: (
      <a href={SITE_URL} className={cellLink}>
        limespun.com
      </a>
    ),
  },
  {
    label: "Press contact",
    value: (
      <a href={PRESS_MAIL} className={cellLink}>
        {CONTACT_EMAIL}
      </a>
    ),
  },
];

/* ─── Brand assets ────────────────────────────────────────────────────────── */

/** The token swatches, with the hex values from brand.ts (the same values as globals.css). */
const COLORS: { name: string; hex: string; swatch: string; role: string }[] = [
  { name: "Ember", hex: HOME.ember, swatch: "bg-ember", role: "The one accent: the mark, links, one word per headline." },
  { name: "Graphite", hex: HOME.graphite, swatch: "bg-graphite", role: "Text and the primary button." },
  { name: "Canvas", hex: HOME.canvas, swatch: "bg-canvas", role: "The warm off-white behind every page." },
  { name: "Canvas deep", hex: HOME.canvasDeep, swatch: "bg-canvas-deep", role: "Panels, stages and quiet bands." },
];

const downloadLink = cn(buttonClass("ghost"), "text-[15px]");

function DownloadLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a href={href} download className={downloadLink}>
      <Download size={16} strokeWidth={2.2} aria-hidden="true" className="shrink-0" />
      {children}
    </a>
  );
}

/** The wordmark as the nav sets it: the mark, then Limespun in Inter bold. A live preview of the SVG files. */
function WordmarkPreview({ tone }: { tone: "dark" | "light" }) {
  return (
    <span aria-hidden="true" className="inline-flex items-center gap-2.5">
      <LimespunMark size={32} />
      <span
        className={cn(
          "text-[26px] leading-none font-bold tracking-[-0.03em]",
          tone === "dark" ? "text-graphite" : "text-ink-text",
        )}
      >
        Limespun
      </span>
    </span>
  );
}

const RELATED: RelatedItem[] = [
  { eyebrow: "Company", title: "About", body: "Why Limespun is built only for tattoo, and the rules we build by.", href: "/about" },
  {
    eyebrow: "Plans",
    title: "Pricing",
    body: `Flat monthly plans from ${fromPrice}. No cut of bookings or deposits.`,
    href: "/pricing",
  },
  { eyebrow: "Updates", title: "Changelog", body: "What shipped in Limespun, newest first.", href: "/changelog" },
  { eyebrow: "Company", title: "Contact", body: "Questions about switching, plans or your account.", href: "/contact" },
];

/* ─── Sections ────────────────────────────────────────────────────────────── */

function Facts() {
  return (
    <Section tone="white" labelledBy="facts-heading">
      {/* Phones read heading → facts → boilerplate; from lg the boilerplate sits under the heading */}
      <Container className="grid gap-8 sm:gap-10 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:grid-rows-[auto_1fr] lg:gap-x-20 lg:gap-y-10">
        <div className="lg:col-start-1 lg:row-start-1">
          <Display id="facts-heading" className="max-w-[520px]">
            Limespun at a glance
          </Display>
          {/* Phones go straight from the heading to the facts */}
          <Lead className="mt-5 hidden max-w-[480px] text-mute sm:block">
            Confirmed facts only. The prices are the plans studios buy today.
          </Lead>
        </div>

        <dl className="border-t border-hair-strong lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:self-start">
          {FACTS.map((f) => (
            <div
              key={f.label}
              className="grid grid-cols-[104px_minmax(0,1fr)] gap-x-4 border-b border-hair py-3.5 sm:grid-cols-[160px_minmax(0,1fr)] sm:gap-x-6 sm:py-4"
            >
              <dt className="pt-0.5 text-[13px] font-semibold text-mute sm:text-[14px]">{f.label}</dt>
              <dd className="text-[15px] leading-[1.55] text-pretty text-graphite sm:text-[16px]">{f.value}</dd>
            </div>
          ))}
        </dl>

        <figure className="rounded-card bg-canvas p-5 ring-1 ring-hair sm:p-7 lg:col-start-1 lg:row-start-2 lg:self-start">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <figcaption className="text-label text-ember-deep uppercase">Boilerplate · {BOILERPLATE_WORDS} words</figcaption>
            <CopyButton text={BOILERPLATE} label="Copy text" />
          </div>
          <blockquote className="mt-4 text-[16px] leading-[1.65] text-pretty text-graphite sm:text-[17px]">
            <p>{BOILERPLATE}</p>
          </blockquote>
        </figure>
      </Container>
    </Section>
  );
}

function Assets() {
  return (
    <Section tone="canvas" id="assets" labelledBy="assets-heading">
      <Container>
        <div className="grid gap-4 sm:gap-5 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.9fr)] lg:items-end lg:gap-16">
          <Display id="assets-heading" className="max-w-[640px]">
            Logo, wordmark and colors
          </Display>
          <Lead className="text-mute lg:justify-self-end lg:pb-1 lg:text-[18px]">
            Vector files for print and screen. Keep the mark in its ember square, and don’t recolor, stretch or
            outline it.
          </Lead>
        </div>

        {/* Logo files */}
        <Title as="h3" size="sm" className="mt-10 sm:mt-14">
          Logo files
        </Title>
        <ul className="mt-4 grid gap-4 sm:grid-cols-[minmax(0,0.75fr)_minmax(0,1.25fr)] sm:gap-5">
          {/* Phones set the mark beside its copy; from sm it stands over it like the wordmark */}
          <li className="flex overflow-hidden rounded-card bg-white ring-1 ring-hair sm:flex-col">
            <div className="flex w-28 shrink-0 items-center justify-center border-r border-hair sm:h-44 sm:w-auto sm:border-r-0 sm:border-b">
              <LimespunMark size={56} />
            </div>
            <div className="flex flex-1 flex-col p-5 sm:p-6">
              <p className="text-[16px] font-semibold text-graphite">Mark</p>
              <p className="mt-1 text-[14px] leading-[1.5] text-mute">Full color, square. For icons and avatars.</p>
              <div className="mt-auto pt-2">
                <DownloadLink href="/brand/limespun-mark.svg">Mark SVG</DownloadLink>
              </div>
            </div>
          </li>
          <li className="flex flex-col overflow-hidden rounded-card bg-white ring-1 ring-hair">
            <div className="grid h-32 grid-cols-2 border-b border-hair sm:h-44">
              <div className="flex items-center justify-center bg-canvas px-3">
                <span className="origin-center scale-[0.72] sm:scale-100">
                  <WordmarkPreview tone="dark" />
                </span>
              </div>
              <div className="flex items-center justify-center bg-ink px-3">
                <span className="origin-center scale-[0.72] sm:scale-100">
                  <WordmarkPreview tone="light" />
                </span>
              </div>
            </div>
            <div className="flex flex-1 flex-col p-5 sm:p-6">
              <p className="text-[16px] font-semibold text-graphite">Wordmark</p>
              <p className="mt-1 text-[14px] leading-[1.5] text-mute">
                Outlined, so it needs no fonts. Dark text for light backgrounds, light text for dark ones.
              </p>
              <div className="mt-auto flex flex-wrap gap-x-6 pt-2">
                <DownloadLink href="/press/limespun-wordmark.svg">Dark SVG</DownloadLink>
                <DownloadLink href="/press/limespun-wordmark-light.svg">Light SVG</DownloadLink>
              </div>
            </div>
          </li>
        </ul>

        {/* Colors */}
        <Title as="h3" size="sm" className="mt-10 sm:mt-14">
          Colors
        </Title>
        <ul className="mt-4 grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">
          {COLORS.map((c) => (
            <li key={c.name} className="flex flex-col overflow-hidden rounded-card bg-white ring-1 ring-hair">
              <span aria-hidden="true" className={cn("h-16 border-b border-hair sm:h-24", c.swatch)} />
              <div className="p-4 sm:p-5">
                <p className="text-[15px] font-semibold text-graphite sm:text-[16px]">{c.name}</p>
                <p className="mt-0.5 text-[14px] text-graphite-soft tabular-nums select-all">{c.hex}</p>
                <p className="mt-2 hidden text-[14px] leading-[1.5] text-pretty text-mute sm:block">{c.role}</p>
              </div>
            </li>
          ))}
        </ul>

        {/* Type */}
        <Title as="h3" size="sm" className="mt-10 sm:mt-14">
          Type
        </Title>
        <ul className="mt-4 grid grid-cols-2 gap-3 sm:gap-5">
          <li className="rounded-card bg-white p-4 ring-1 ring-hair sm:p-6">
            <p aria-hidden="true" className="font-serif text-[48px] leading-none text-graphite sm:text-[64px]">
              Aa
            </p>
            <p className="mt-3 text-[15px] font-semibold text-graphite sm:mt-4 sm:text-[16px]">Instrument Serif</p>
            <p className="mt-0.5 text-[14px] text-mute">Headlines</p>
          </li>
          <li className="rounded-card bg-white p-4 ring-1 ring-hair sm:p-6">
            <p aria-hidden="true" className="text-[48px] leading-none font-semibold tracking-[-0.03em] text-graphite sm:text-[64px]">
              Aa
            </p>
            <p className="mt-3 text-[15px] font-semibold text-graphite sm:mt-4 sm:text-[16px]">Inter</p>
            <p className="mt-0.5 text-[14px] text-mute">Text and interface</p>
          </li>
        </ul>

        <p className="mt-8 max-w-[640px] text-[15px] leading-[1.6] text-pretty text-graphite-soft sm:mt-10 sm:text-[16px]">
          Need product screens?{" "}
          <a href={PRESS_MAIL} className={inlineLink}>
            Email us
          </a>{" "}
          and say where they’ll run.
        </p>
      </Container>
    </Section>
  );
}

export default function PressPage() {
  return (
    <ContentPage
      layout="sections"
      crumbs={[{ label: "Home", href: "/" }, { label: "Press kit" }]}
      eyebrow="Press kit"
      title="Facts and files for the press."
      italicWord="press"
      lead={
        <>
          Company facts, the Limespun mark and wordmark, brand colors and a {BOILERPLATE_WORDS}-word description you
          can quote. Questions go to{" "}
          <a href={PRESS_MAIL} className={inlineLink}>
            {CONTACT_EMAIL}
          </a>
          .
        </>
      }
      primary={{ label: "Email us", href: PRESS_MAIL }}
      secondary={{ label: "Brand assets", href: "#assets" }}
      related={{ items: RELATED }}
      inkBand={{
        headline: "See the screens behind the story.",
        italicWord: "story",
        secondary: { label: "Product", href: "/product" },
      }}
    >
      <Facts />
      <Assets />
    </ContentPage>
  );
}
