import React from "react";
import { Check } from "lucide-react";
import {
  Button,
  Chip,
  Container,
  Display,
  Eyebrow,
  FAQ,
  Lead,
  PlanChip,
  Reveal,
  Section,
  StripedFrame,
  Title,
  cn,
  type FaqItem,
  type RelatedItem,
} from "@/components/system";
import { ContentPage } from "@/components/templates/content-page";
import { ACCOUNT } from "@/lib/brand";
import { MONEY_BACK_DAYS, PLANS, formatPrice } from "@/lib/data/plans";
import { featureHref, getFeature } from "@/lib/data/features";
import { TOOLS_INDEX } from "@/lib/site-links";
import { pageMetadata } from "@/lib/seo";
import { InkRegistryScreen, ReachDisclosurePhone, ReachInventory, RegisterInkPanel } from "./reach-screens";

export const metadata = pageMetadata({
  title: "EU REACH ink tracking for tattoo studios",
  description:
    "EU REACH ink records for tattoo studios: an Ink registry in Settings, a REACH-registered count on Inventory and a disclosure on the consent form. Every plan.",
  path: "/reach-compliance",
});

const SOLO = PLANS.find((p) => p.tier === "solo") ?? PLANS[0];
const SOLO_PRICE = formatPrice(SOLO.monthlyCents);
const REACH_POST = "/blog/eu-reach-2022-what-tattoo-studios-need-to-know";

/* ─── What the restriction asks ───────────────────────────────────────────────
   Three plain obligations, each paired with the app label that covers it. No fines,
   no legal advice; the note under the heading says so. */
interface Obligation {
  title: string;
  body: string;
  /** Where Limespun keeps it, as the app labels it. */
  where: string;
}

const OBLIGATIONS: Obligation[] = [
  {
    title: "Use only inks that meet it",
    body: "A compliant bottle lists its ingredients on the label. If a supplier can’t say what’s in a color, leave it on the shelf.",
    where: "Ink registry",
  },
  {
    title: "Tell the client what’s in it",
    body: "The information on the ink’s label goes to the person being tattooed, and the form they sign before the session is the place for it.",
    where: "REACH ink disclosure",
  },
  {
    title: "Keep the batch on record",
    body: "Note which ink and batch went into each session, so a recall or a reaction leads you to the right clients.",
    where: "Ink batch record",
  },
];

/* ─── How Limespun does it ────────────────────────────────────────────────────
   A real order: an ink is registered before Inventory counts it or a form discloses it. */
interface Step {
  where: string;
  title: string;
  body: string;
  visual: React.ReactNode;
}

const STEPS: Step[] = [
  {
    where: "Settings › Ink registry",
    title: "Register each ink",
    body: "Brand, color, product code and batch number. Switch on REACH compliant once you’ve confirmed the bottle; until then it stays Pending.",
    visual: <RegisterInkPanel />,
  },
  {
    where: "Inventory",
    title: "See the compliant inks",
    body: "Inventory’s REACH-registered count takes only the inks your registry marks compliant, and one filter lists them. Pending inks stay out.",
    visual: <ReachInventory />,
  },
  {
    where: "Forms › consent form",
    title: "Disclose it before they sign",
    body: "Add the REACH ink disclosure to your consent form. The client acknowledges it before signing; the artist adds the batch record after.",
    visual: <ReachDisclosurePhone />,
  },
];

const FAQS: FaqItem[] = [
  {
    q: "Does Limespun make me REACH compliant?",
    a: "No software can do that for you. The restriction is about what’s in the ink, so it rests on the inks you buy and use. Limespun keeps the record: the inks in your registry, the count on Inventory and the disclosure your clients acknowledge. It doesn’t test or certify inks, and it isn’t legal advice; your national authority has the rules for your country.",
  },
  {
    q: "What does the client see on the form?",
    a: "A REACH ink disclosure section in your own wording, which they acknowledge before they sign. The artist fills in the ink batch record, with the brand, color and batch of each ink, after the session. Signed copies can’t be edited and are stored as PDFs.",
  },
  {
    q: "Does Limespun warn me about recalls?",
    a: "No. Limespun doesn’t match supplier recalls for you. Keep your supplier’s notices and check their batch numbers against your Ink registry.",
  },
];

const inventory = getFeature("inventory");
const forms = getFeature("forms");
const consentTool = TOOLS_INDEX.find((t) => t.slug === "consent-form-template");

const RELATED: RelatedItem[] = [
  { eyebrow: "Feature", title: inventory.name, body: inventory.card, href: featureHref("inventory") },
  { eyebrow: "Feature", title: forms.name, body: forms.card, href: featureHref("forms") },
  ...(consentTool
    ? [{ eyebrow: "Free tool", title: consentTool.short, body: consentTool.blurb, href: `/tools/${consentTool.slug}` }]
    : []),
  {
    eyebrow: "Blog",
    title: "EU REACH guide",
    body: "A plain checklist: ingredient lists, safety data sheets and batch records.",
    href: REACH_POST,
  },
];

/* ─── Sections ────────────────────────────────────────────────────────────── */

/** Settings › Ink registry: every ink with its batch and a Compliant or Pending chip. Phones show
    the top of the list and fade into the frame. */
function Hero() {
  return (
    <StripedFrame inset="md" className="max-sm:px-2.5 max-sm:py-6 max-sm:pb-0">
      <div className="mx-auto max-w-[1040px] max-sm:max-h-[312px] max-sm:overflow-hidden max-sm:[mask-image:linear-gradient(to_bottom,#000_calc(100%-30px),transparent_calc(100%-2px))]">
        <InkRegistryScreen />
      </div>
    </StripedFrame>
  );
}

function Obligations() {
  return (
    <Section tone="canvas" labelledBy="asks-heading" className="border-t border-hair">
      <Container className="grid gap-8 sm:gap-12 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-20">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <Eyebrow className="max-sm:hidden">EU REACH, in plain words</Eyebrow>
          <Display id="asks-heading" className="max-w-[520px] sm:mt-4">
            What the restriction asks of a studio
          </Display>
          <Lead className="mt-4 max-w-[460px] text-mute sm:mt-5">
            Your supplier makes the ink. Three things sit with the studio that uses it.
          </Lead>
          <p className="mt-4 max-w-[440px] text-[14px] leading-[1.55] text-pretty text-mute sm:mt-6">
            A plain summary, not legal advice.
          </p>
        </div>
        <ul className="border-t border-hair-strong">
          {OBLIGATIONS.map((o, i) => (
            <Reveal
              as="li"
              key={o.title}
              index={i}
              className="grid gap-x-10 gap-y-3 border-b border-hair-strong py-5 sm:grid-cols-[minmax(0,1fr)_auto] sm:py-8"
            >
              <div className="min-w-0">
                <Title as="h3" size="md">
                  {o.title}
                </Title>
                <p className="mt-1.5 max-w-[520px] text-[16px] leading-[1.55] text-pretty text-mute sm:mt-2 sm:text-[17px] sm:leading-[1.6]">{o.body}</p>
              </div>
              {/* The app label that covers it; the next section shows the screens, so phones skip it */}
              <p className="hidden items-center gap-2 self-start text-[13px] text-mute sm:flex sm:flex-col sm:items-end sm:pt-1.5">
                <span>In Limespun</span>
                <Chip tone="ember" className="px-2.5 py-1 text-[12px]">
                  {o.where}
                </Chip>
              </p>
            </Reveal>
          ))}
        </ul>
      </Container>
    </Section>
  );
}

function HowItWorks() {
  return (
    <Section tone="white" labelledBy="how-heading">
      <Container>
        <div className="grid gap-4 sm:gap-5 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.9fr)] lg:items-end lg:gap-16">
          <Display id="how-heading" className="max-w-[640px]">
            Where it lives in Limespun
          </Display>
          {/* Phones go straight from the heading to the steps, which say the same thing in detail */}
          <Lead className="hidden text-mute sm:block lg:justify-self-end lg:pb-1 lg:text-[18px]">
            Register an ink once in Settings. Inventory counts it, and the consent form tells the client.
          </Lead>
        </div>

        {/* A real sequence, so it earns numerals. Phones swipe (the next step peeks in); from sm
            each step is a row, screen beside its copy; at lg they sit three across. The list is
            positioned so the sr-only step numbers are clipped by the swipe row, not the page. */}
        <div
          role="region"
          aria-label="Three steps, from registry to consent form"
          tabIndex={0}
          className="mt-block-gap -mx-5 snap-x snap-mandatory scroll-px-5 overflow-x-auto px-5 pb-1 [scrollbar-width:none] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-graphite sm:mx-0 sm:snap-none sm:overflow-visible sm:px-0 sm:pb-0 [&::-webkit-scrollbar]:hidden"
        >
          <ol className="relative flex gap-4 max-sm:after:block max-sm:after:w-1 max-sm:after:shrink-0 max-sm:after:content-[''] sm:flex-col sm:gap-12 lg:grid lg:grid-cols-3 lg:gap-8">
            {STEPS.map((s, n) => (
              <li
                key={s.title}
                className={cn(
                  "flex w-[calc(100vw-4.75rem)] max-w-[360px] shrink-0 snap-start flex-col sm:grid sm:w-auto sm:max-w-none sm:items-center sm:gap-10 lg:flex lg:items-stretch lg:gap-0",
                  n % 2 === 1 ? "sm:grid-cols-[minmax(0,1fr)_320px]" : "sm:grid-cols-[320px_minmax(0,1fr)]",
                )}
              >
                <div
                  className={cn(
                    "@container flex min-w-0 items-center justify-center rounded-tile bg-canvas-deep p-3 max-sm:min-h-[426px] sm:p-5 lg:h-[480px] lg:p-3.5 xl:p-5",
                    n % 2 === 1 && "sm:order-last lg:order-none",
                  )}
                >
                  <div className="w-full min-w-0">{s.visual}</div>
                </div>
                <div className="flex min-w-0 flex-1 flex-col">
                  <div className="mt-5 flex items-center gap-3 sm:mt-0 lg:mt-6">
                    <span className="font-serif text-[34px] leading-none text-ember-deep tabular-nums" aria-hidden="true">
                      {n + 1}
                    </span>
                    <span className="text-label text-mute uppercase">{s.where}</span>
                  </div>
                  <Title as="h3" size="sm" className="mt-3">
                    <span className="sr-only">Step {n + 1}: </span>
                    {s.title}
                  </Title>
                  <p className="mt-2 max-w-[440px] text-[16px] leading-[1.6] text-pretty text-mute">{s.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </Container>
    </Section>
  );
}

function EveryPlan() {
  return (
    <Section tone="deep" density="proof" labelledBy="plans-heading">
      <Container className="grid gap-6 sm:gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-center lg:gap-20">
        <div>
          <Display id="plans-heading" className="max-w-[520px]">
            On every plan, Solo included
          </Display>
          <p className="mt-4 max-w-[520px] text-[17px] leading-[1.6] text-pretty text-graphite-soft">
            REACH applies to a one-chair studio as much as a busy shop, so it isn’t sold as an upgrade.
          </p>
          <Button href="/pricing" variant="ghost" arrow className="mt-3 max-sm:hidden">
            Compare every plan
          </Button>
        </div>
        <div>
          {/* Phones: one chip per plan. From sm: the plans as rows, each with who it suits,
              its price and the same tick, which is the point: nothing changes from plan to plan. */}
          <ul aria-label="EU REACH ink tracking by plan" className="flex flex-wrap gap-2 sm:hidden">
            {PLANS.map((p) => (
              <li
                key={p.tier}
                className="flex min-w-0 items-center gap-1.5 rounded-full bg-white py-1.5 pr-3 pl-2.5 ring-1 ring-hair"
              >
                <Check size={14} strokeWidth={2.6} className="shrink-0 text-ember" aria-hidden="true" />
                <span className="text-[14px] font-semibold text-graphite">{p.name}</span>
                <span className="text-[13px] whitespace-nowrap text-mute tabular-nums">{formatPrice(p.monthlyCents)}/mo</span>
              </li>
            ))}
          </ul>
          <ul
            aria-label="EU REACH ink tracking by plan"
            className="hidden divide-y divide-hair overflow-hidden rounded-card bg-white ring-1 ring-hair sm:block"
          >
            {PLANS.map((p) => (
              <li key={p.tier} className="flex items-center gap-6 px-6 py-4">
                <span className="min-w-0 flex-1">
                  <span className="block text-[16px] font-semibold text-graphite">{p.name}</span>
                  <span className="block text-[14px] text-mute">{p.fit}</span>
                </span>
                <span className="text-[15px] whitespace-nowrap text-graphite-soft tabular-nums">
                  {formatPrice(p.monthlyCents)}/mo
                </span>
                <span className="flex w-[104px] shrink-0 items-center gap-1.5 text-[14px] font-medium text-graphite">
                  <Check size={16} strokeWidth={2.6} className="shrink-0 text-ember" aria-hidden="true" />
                  Included
                </span>
              </li>
            ))}
          </ul>
          <Button href="/pricing" variant="ghost" arrow className="mt-3 sm:hidden">
            Compare every plan
          </Button>
        </div>
      </Container>
    </Section>
  );
}

export default function ReachCompliancePage() {
  return (
    <ContentPage
      layout="sections"
      crumbs={[{ label: "Home", href: "/" }, { label: "EU REACH" }]}
      eyebrow={
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
          <Eyebrow>EU REACH ink tracking</Eyebrow>
          {/* Phones keep one line; the plan band says it further down */}
          <PlanChip plan="solo" andUp price className="max-sm:hidden" />
        </div>
      }
      title="Your inks registered, your clients told."
      italicWord="told"
      lead="The EU REACH restriction on tattoo inks, in force since January 2022, limits what goes in the bottle. Limespun keeps your side of it, from the ink shelf to the consent form."
      primary={{ label: ACCOUNT.signUpLabel, href: ACCOUNT.signUpHref }}
      secondary={{ label: "Read the REACH guide", href: REACH_POST }}
      visual={<Hero />}
      related={{ items: RELATED }}
      inkBand={{
        headline: "Your ink shelf, on record.",
        italicWord: "record",
        sub: (
          <>
            On every plan from {SOLO_PRICE} a month. We move your data over for you.{" "}
            <span className="whitespace-nowrap">{MONEY_BACK_DAYS}-day money-back</span> guarantee.
          </>
        ),
      }}
    >
      <Obligations />
      <HowItWorks />
      <EveryPlan />
      <FAQ items={FAQS} title="REACH questions" tone="white" compact />
    </ContentPage>
  );
}
