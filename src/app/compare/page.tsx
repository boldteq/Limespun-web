import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container, InkBand, PageIntro, RelatedGrid, Section, type RelatedItem } from "@/components/system";
import { PageShell } from "@/components/templates/page-shell";
import { SectionHeader, SwitchingBand } from "@/components/templates/parts";
import { CompareMatrix } from "@/components/compare/compare-tables";
import { ACCOUNT, SITE_URL } from "@/lib/brand";
import { CHECKED_ON, competitors, differentiators, shortName } from "@/lib/data/competitors";
import { PLANS, formatPrice } from "@/lib/data/plans";
import { getSegment, segmentHref } from "@/lib/data/segments";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Compare tattoo studio software",
  description:
    "How Limespun compares with Square, Vagaro, Fresha, GlossGenius, TattooGenda, DaySmart and Mangomint for tattoo studios. Sourced from each vendor's own pages.",
  path: "/compare",
});

const RELATED: RelatedItem[] = [
  {
    eyebrow: "Plans",
    title: "Pricing",
    body: `Flat monthly plans from ${formatPrice(PLANS[0].monthlyCents)}. No cut of bookings.`,
    href: "/pricing",
  },
  { eyebrow: "Product", title: "All features", body: "Every screen, from the calendar to payouts.", href: "/product" },
  ...(["solo-artists", "small-studios"] as const).map((slug) => {
    const s = getSegment(slug);
    return { eyebrow: "Who it’s for", title: s.name, body: s.card, href: segmentHref(slug) };
  }),
];

export default function ComparePage() {
  return (
    <PageShell
      jsonLd={[
        {
          "@context": "https://schema.org",
          "@type": "ItemList",
          name: "Limespun comparisons",
          itemListElement: competitors.map((c, i) => ({
            "@type": "ListItem",
            position: i + 1,
            url: `${SITE_URL}/compare/${c.slug}`,
            name: `Limespun vs ${c.name}`,
          })),
        },
      ]}
    >
      <PageIntro
        crumbs={[{ label: "Home", href: "/" }, { label: "Compare" }]}
        eyebrow="Compare"
        title="How Limespun compares for tattoo studios"
        italicWord="tattoo"
        lead={
          <>
            Limespun side by side with seven booking tools that market to tattoo studios. Every detail comes from that
            vendor’s own public pages, checked on {CHECKED_ON}. Where a vendor doesn’t say, we write “not published”
            rather than guess.
          </>
        }
        primary={{ label: ACCOUNT.signUpLabel, href: ACCOUNT.signUpHref }}
        secondary={{ label: "Switching guide", href: "/migrate" }}
      />

      <Section tone="white" labelledBy="glance-heading">
        <Container>
          <SectionHeader
            id="glance-heading"
            title="At a glance"
            lead="Tap a name for the full comparison and its sources. On a phone the table scrolls sideways."
          />
          <CompareMatrix competitors={competitors} className="mt-block-gap" />
        </Container>
      </Section>

      <Section tone="canvas" labelledBy="pick-heading">
        <Container className="grid gap-8 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.4fr)] lg:gap-16">
          <SectionHeader id="pick-heading" title="Pick a comparison" className="lg:self-start" />
          {/* Rows, not cards: name, kind of tool, what they lead on, then what Limespun adds */}
          <ul className="border-t border-hair-strong">
            {competitors.map((c) => {
              const adds = differentiators(c)
                .slice(0, 2)
                .map((d) => d.label.toLowerCase());
              return (
                <li key={c.slug} className="border-b border-hair-strong">
                  <Link
                    href={`/compare/${c.slug}`}
                    className="group flex items-center justify-between gap-5 py-4 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-graphite sm:py-6"
                  >
                    <span className="min-w-0">
                      <span className="flex flex-wrap items-baseline gap-x-3 gap-y-0.5">
                        <span className="text-title-md text-graphite">vs {c.name}</span>
                        <span className="text-[14px] text-mute">{c.category}</span>
                      </span>
                      <span className="mt-1.5 block max-w-[560px] text-[15px] leading-[1.55] text-pretty text-mute sm:text-[16px]">
                        {/* Their lead first, from their own pages, then what Limespun adds */}
                        {`${c.strengths[0]}. `}
                        {adds.length > 0 ? `Limespun adds ${adds.join(" and ")}.` : `Compare pricing and support with ${shortName(c)}.`}
                      </span>
                    </span>
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white text-graphite ring-1 ring-hair transition-[background-color,color] duration-200 group-hover:bg-graphite group-hover:text-white">
                      <ArrowRight
                        size={17}
                        strokeWidth={2.2}
                        aria-hidden="true"
                        className="transition-transform duration-200 group-hover:translate-x-0.5"
                      />
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </Container>
      </Section>

      <SwitchingBand />

      <RelatedGrid heading="Related" items={RELATED} tone="white" />

      <InkBand
        headline="Move the whole studio, not just the calendar."
        italicWord="studio"
        sub="Clients, bookings, deposits and signed forms come across on every plan, moved by our team."
      />
    </PageShell>
  );
}
