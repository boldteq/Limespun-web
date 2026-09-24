import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowUpRight, Check, Plus } from "lucide-react";
import {
  Button,
  Container,
  Display,
  Eyebrow,
  FAQ,
  InkBand,
  PageIntro,
  RelatedGrid,
  Section,
  Title,
  buttonClass,
  cn,
  type FaqItem,
  type RelatedItem,
} from "@/components/system";
import { PageShell } from "@/components/templates/page-shell";
import { SectionHeader } from "@/components/templates/parts";
import { HeadToHead } from "@/components/compare/compare-tables";
import { AnnouncementKit, Guarantees, SourceNote, SwitchSteps } from "@/components/compare/switching";
import { FaqMore } from "@/components/compare/faq-more";
import { ACCOUNT } from "@/lib/brand";
import {
  CHECKED_ON,
  LIMESPUN_PRICING,
  categoryPhrase,
  competitors,
  differentiators,
  getCompetitor,
  possessive,
  shortName,
  type Competitor,
} from "@/lib/data/competitors";
import { featureHref, getFeature } from "@/lib/data/features";
import { MONEY_BACK_DAYS, PLANS, formatPrice } from "@/lib/data/plans";
import { pageMetadata } from "@/lib/seo";

export function generateStaticParams() {
  return competitors.map((c) => ({ slug: c.slug }));
}

export const dynamicParams = false;

const SUFFIX = " | Limespun";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const c = getCompetitor(slug);
  if (!c) return {};
  // Every title keeps " | Limespun" inside 60 characters: a long vendor name says "tattoo shops"
  // ("Limespun vs Square Appointments for tattoo shops | Limespun", 59).
  const title = [`Limespun vs ${c.name} for tattoo studios`, `Limespun vs ${c.name} for tattoo shops`, `Limespun vs ${c.name}`].find(
    (t) => `${t}${SUFFIX}`.length <= 60,
  ) ?? `Limespun vs ${shortName(c)}`;
  const long = `Limespun vs ${c.name} for tattoo studios: projects, deposits, consent forms, payouts, pricing and switching, sourced from ${possessive(c.name)} own pages.`;
  const description =
    long.length <= 160
      ? long
      : `Limespun vs ${c.name} for tattoo studios: projects, deposits, consent forms, payouts, pricing and switching. Sourced and dated.`;
  return pageMetadata({ title, description, path: `/compare/${c.slug}`, type: "article" });
}

const CONTACT_SWITCHING = { label: "Contact us about switching", href: "/contact?topic=switching" };

const inlineLink =
  "font-semibold whitespace-nowrap text-graphite underline decoration-ember decoration-2 underline-offset-4 hover:text-ember-deep focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-graphite";

/**
 * Eight honest questions. Phones show the first four (FaqMore), so the order is what a studio
 * weighing a move asks first; the JSON-LD keeps all eight.
 */
function faqsFor(c: Competitor): FaqItem[] {
  const short = shortName(c);
  const multi = c.features.multiSession.value;
  const ask = c.switching.exports.startsWith("Ask ");
  return [
    {
      q: `Is ${c.name} built for tattoo studios?`,
      a:
        c.category === "Tattoo studio software"
          ? `Yes. ${c.name} is made for tattoo studios. The table above shows where the two differ on the details.`
          : `${c.name} is ${categoryPhrase(c)} that also markets to tattoo studios. Limespun is built only for tattoo, around projects that run across several sessions.`,
    },
    {
      q: `Does ${short} track a sleeve as one project?`,
      a:
        multi === "yes"
          ? `Yes, ${c.name} publishes project-based booking. Limespun does too, with the deposit carried across every session.`
          : multi === "partial"
            ? `Partly. ${c.name} supports multi-session bookings but doesn’t describe tracking them as one project. In Limespun every session, photo and note sits under one project.`
            : `${c.name} doesn’t describe project tracking on its public pages. In Limespun a sleeve is one project, with the deposit carried across every session.`,
    },
    {
      q: `How do I get my clients out of ${short}?`,
      a: ask
        ? `${c.switching.exports} A spreadsheet or photos of your paper records work too, and our team does the rest.`
        : [c.switching.exports, ...c.switching.watchouts, "Send us the file and our team does the rest."].join(" "),
    },
    {
      q: `Do the deposits I hold in ${short} come across?`,
      a: "Yes. We record each deposit you’re holding on the right client and project, so it’s applied at the session it’s for. Clients aren’t charged again.",
    },
    {
      q: "What if Limespun isn’t right for us?",
      a: `Every plan has a ${MONEY_BACK_DAYS}-day money-back guarantee. There’s no free trial, and ${short} keeps working until you cancel it, so nothing is lost if you stop.`,
    },
    {
      q: `Can I keep ${short} running while you move us?`,
      a: `Yes. On every plan our team moves your clients, upcoming bookings, deposits held and signed consent forms while ${short} keeps taking bookings. When the counts match, you decide when to switch.`,
    },
    {
      q: "Do my clients have to do anything?",
      a: "No. Their bookings, deposits and signed forms come across. Saved cards don’t, so clients add a card with their next deposit. The text, email and story above tell them what changed.",
    },
    {
      q: `Where does ${short} do better?`,
      a: `${c.strengths.join(". ")}. If those matter most to your shop, ${c.name} may suit you better.`,
    },
  ];
}

/** Ask an assistant the same neutral question about this pair (ASK_AI_LINKS asks about Limespun alone). */
function askAiLinks(c: Competitor): { label: string; href: string }[] {
  const q = encodeURIComponent(
    `Compare Limespun (limespun.com) and ${c.name} for a tattoo studio: multi-session projects, deposits, consent forms, artist payouts, pricing, and moving client data from ${c.name}.`,
  );
  return [
    { label: "ChatGPT", href: `https://chatgpt.com/?q=${q}` },
    { label: "Claude", href: `https://claude.ai/new?q=${q}` },
    { label: "Perplexity", href: `https://www.perplexity.ai/search?q=${q}` },
  ];
}

/** The switching guide, pricing, and the two features a switch hinges on (the comparisons sit in the footer). */
function relatedFor(): RelatedItem[] {
  const projects = getFeature("projects");
  const deposits = getFeature("appointments");
  return [
    { eyebrow: "Switching", title: "Switching guide", body: "How the move works, whichever tool you use now.", href: "/migrate" },
    {
      eyebrow: "Plans",
      title: "Pricing",
      body: `Flat monthly plans from ${formatPrice(PLANS[0].monthlyCents)}. No cut of bookings.`,
      href: "/pricing",
    },
    { eyebrow: "Feature", title: projects.name, body: projects.card, href: featureHref("projects") },
    { eyebrow: "Feature", title: deposits.name, body: deposits.card, href: featureHref("appointments") },
  ];
}

export default async function CompareDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const c = getCompetitor(slug);
  if (!c) notFound();

  const short = shortName(c);
  const diff = differentiators(c).slice(0, 4);
  const faqs = faqsFor(c);
  const ai = askAiLinks(c);

  return (
    <PageShell>
      <PageIntro
        crumbs={[{ label: "Home", href: "/" }, { label: "Compare", href: "/compare" }, { label: `vs ${short}` }]}
        eyebrow="Compare"
        title={`Limespun vs ${c.name} for tattoo studios`}
        italicWord="tattoo"
        lead={
          <>
            {c.category === "Tattoo studio software"
              ? `${c.name} is tattoo studio software, like Limespun.`
              : `${c.name} is ${categoryPhrase(c)}; Limespun is built only for tattoo.`}{" "}
            Compared from {possessive(short)} own pages, checked {CHECKED_ON}.
          </>
        }
        primary={{ label: ACCOUNT.signUpLabel, href: ACCOUNT.signUpHref }}
        secondary={{ label: `Switching from ${short}`, href: "#switching" }}
      />

      {/* Verdict, then the table it comes from */}
      <Section tone="white" labelledBy="table-heading">
        <Container>
          <div className="grid gap-3 md:grid-cols-2 md:gap-4 lg:gap-5">
            <div className="rounded-card bg-canvas p-5 sm:p-7">
              <Title as="h2" size="sm">
                Choose Limespun if you want
              </Title>
              <ul className="mt-3.5 flex flex-col gap-2.5 sm:mt-4 sm:gap-3">
                {[...diff, { key: "flat", label: "Flat plans, never per booking", why: "No cut of your bookings or deposits." }].map((d) => (
                  <li key={d.key} className="flex gap-2.5 text-[16px] leading-snug text-graphite">
                    <Check size={18} strokeWidth={2.6} className="mt-0.5 shrink-0 text-ember" aria-hidden="true" />
                    <span>
                      <span className="font-semibold">{d.label}.</span>{" "}
                      <span className="hidden text-graphite-soft sm:inline">{d.why}</span>
                    </span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-card p-5 ring-1 ring-hair sm:p-7">
              <Title as="h2" size="sm">
                Choose {short} if you want
              </Title>
              <ul className="mt-3.5 flex flex-col gap-2.5 sm:mt-4 sm:gap-3">
                {c.strengths.map((s) => (
                  <li key={s} className="flex gap-2.5 text-[16px] leading-snug text-graphite-soft">
                    <Plus size={18} strokeWidth={2.4} className="mt-0.5 shrink-0 text-graphite" aria-hidden="true" />
                    {s}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <SectionHeader
            id="table-heading"
            title="Feature by feature"
            lead={<>“Not published” means {possessive(c.name)} public pages don’t describe it. Check with them.</>}
            className="mt-12 sm:mt-block-gap"
          />
          <HeadToHead competitor={c} className="mt-6 sm:mt-10" />
          <SourceNote checkedOn={CHECKED_ON} urls={c.sources} className="mt-2 sm:mt-4" />

          {/* Pricing closes the comparison: one panel, the two ladders side by side from md */}
          <Display id="pricing-heading" className="mt-12 sm:mt-block-gap">
            Pricing
          </Display>
          <dl className="mt-6 grid overflow-hidden rounded-card bg-canvas sm:mt-8 md:grid-cols-2">
            {[
              {
                name: "Limespun",
                body: LIMESPUN_PRICING,
                link: (
                  <Button href="/pricing" variant="ghost" arrow>
                    See Limespun pricing
                  </Button>
                ),
              },
              {
                name: c.name,
                body: c.pricingSummary,
                link: (
                  <a href={c.sources[0]} target="_blank" rel="noopener noreferrer" className={buttonClass("ghost")}>
                    Check {short} pricing
                    <ArrowUpRight size={16} strokeWidth={2.4} aria-hidden="true" />
                    <span className="sr-only"> (opens in a new tab)</span>
                  </a>
                ),
              },
            ].map((row, i) => (
              <div
                key={row.name}
                className={cn(
                  "flex flex-col p-5 sm:p-7",
                  i > 0 && "border-t border-hair-strong/60 md:border-t-0 md:border-l",
                )}
              >
                <dt className="text-title-sm text-graphite">{row.name}</dt>
                <dd className="mt-2 flex-1 text-[15px] leading-[1.6] text-pretty text-graphite-soft sm:text-[16px]">{row.body}</dd>
                <dd className="mt-2 sm:mt-4">{row.link}</dd>
              </div>
            ))}
          </dl>
        </Container>
      </Section>

      {/* Switching: each step card carries its part (export steps, what comes across, what stays), then the promises */}
      <Section tone="canvas" id="switching" labelledBy="switching-heading">
        <Container>
          <SectionHeader
            id="switching-heading"
            title={`Switching from ${short}`}
            lead={`On every plan, our team moves your clients, bookings, deposits and signed forms while ${short} keeps running.`}
          />
          <SwitchSteps vendor={c} surface="canvas" className="mt-8 sm:mt-block-gap" />
          <div className="mt-10 sm:mt-block-gap">
            <Eyebrow>On every Limespun plan</Eyebrow>
            <Guarantees vendor={c} tone="white" className="mt-3 sm:mt-4" />
          </div>
        </Container>
      </Section>

      <Section tone="deep" labelledBy="announce-heading">
        <Container>
          <SectionHeader
            id="announce-heading"
            title="Tell your clients you’ve moved"
            lead="A text, an email and a story to paste the day you switch. Swap the words in brackets."
          />
          <AnnouncementKit className="mt-8 sm:mt-block-gap" />
        </Container>
      </Section>

      <FaqMore total={faqs.length} tone="white">
        <FAQ
          items={faqs}
          title={`Questions about ${short}`}
          tone="white"
          compact
          intro={
            <>
              Anything else?{" "}
              <Link href="/contact" className={inlineLink}>
                Contact us
              </Link>
              , or ask{" "}
              {ai.map((a, i) => (
                <React.Fragment key={a.label}>
                  {i > 0 && (i === ai.length - 1 ? " or " : ", ")}
                  <a href={a.href} target="_blank" rel="noopener noreferrer" className={inlineLink}>
                    {a.label}
                    <span className="sr-only"> (opens in a new tab)</span>
                  </a>
                </React.Fragment>
              ))}{" "}
              to compare the two.
            </>
          }
        />
      </FaqMore>

      <RelatedGrid heading="Related" items={relatedFor()} />

      <InkBand
        headline={`Leave ${short}, keep every client.`}
        italicWord="client"
        sub={
          <>
            Create your account in minutes. Keep {short} running until the counts match.{" "}
            <span className="whitespace-nowrap">{MONEY_BACK_DAYS}-day money-back</span> guarantee.
          </>
        }
        secondary={CONTACT_SWITCHING}
      />
    </PageShell>
  );
}
