import React from "react";
import { Container, FAQ, InkBand, PageIntro, RelatedGrid, Section, type RelatedItem } from "@/components/system";
import { PageShell } from "@/components/templates/page-shell";
import { SectionHeader } from "@/components/templates/parts";
import { PlanCards } from "@/components/pricing/plan-cards";
import { PlanMatrix } from "@/components/pricing/plan-matrix";
import { SITE_URL } from "@/lib/brand";
import { COMPARE_INDEX } from "@/lib/site-links";
import {
  ANNUAL_DISCOUNT_PERCENT,
  FOUNDING_OFFER_OPEN,
  FOUNDING_OFFER_SIZE,
  MONEY_BACK_DAYS,
  ONBOARDING_SUPPORT_DAYS,
  PLANS,
  formatPrice,
} from "@/lib/data/plans";
import { SEGMENTS } from "@/lib/data/segments";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Pricing: flat plans, never per booking",
  description: `Flat plans for tattoo studios from ${formatPrice(PLANS[0].monthlyCents)}/mo: Solo, Studio, Pro and Multi-Location. No cut of bookings or deposits, ${ANNUAL_DISCOUNT_PERCENT}% off yearly, ${MONEY_BACK_DAYS}-day money-back guarantee.`,
  path: "/pricing",
  ogImage: "/pricing/opengraph-image",
});

const solo = PLANS[0];

const faqs: { q: string; a: string }[] = [
  {
    q: "Is there a free trial?",
    a: `No. Instead, every plan comes with a ${MONEY_BACK_DAYS}-day money-back guarantee. If Limespun isn't right for your shop, ask for a refund within ${MONEY_BACK_DAYS} days.`,
  },
  ...(FOUNDING_OFFER_OPEN
    ? [
        {
          q: "What is the founding lifetime offer?",
          a: `The first ${FOUNDING_OFFER_SIZE} studios can pay once instead of every month: ${PLANS.map(
            (p) => `${p.name} ${formatPrice(p.lifetimeCents)}`,
          ).join(", ")}. You keep that plan with no monthly bill. When the ${FOUNDING_OFFER_SIZE} places are gone, the offer closes.`,
        },
      ]
    : []),
  {
    q: "Do you take a cut of bookings or deposits?",
    a: "No. You pay for your plan and nothing per booking. Card payments carry the payment provider's standard processing fee, and Limespun adds nothing on top.",
  },
  {
    q: "Which plan do I need for guest artists?",
    a: "Pro. Guest-artist seats start there, along with roles and permissions, payroll and 1099s, and AI reply drafts, aftercare and consult summaries. Studio covers up to five resident artists, with commission and booth-rent splits and AI reply suggestions in Messages.",
  },
  {
    q: "Can I change plans later?",
    // InkOS lib/dodo/checkout.ts changeSubscriptionPlan: proration_billing_mode "difference_immediately"
    // (an upgrade charges the prorated difference and switches tier at once; a downgrade credits the
    // next renewal). app/api/billing/checkout/route.ts: owner only, from Settings.
    a: "Yes. The studio owner changes plans from Settings. An upgrade applies straight away and you pay the prorated difference. On a downgrade, the difference is credited to your next renewal. If your team has more artists than the smaller plan allows, remove them first.",
  },
  {
    q: "How much do I save by paying yearly?",
    a: `${ANNUAL_DISCOUNT_PERCENT}% on every plan. Solo, for example, works out at ${formatPrice(
      Math.round(solo.annualCents / 12),
    )} a month, billed as ${formatPrice(solo.annualCents)} once a year.`,
  },
  {
    q: "Will someone help me set up?",
    a: `Yes. Every new studio gets ${ONBOARDING_SUPPORT_DAYS} days of onboarding help from the founding team. Our team also moves your clients, bookings, deposits and signed forms over for you.`,
  },
];

/** Who each plan is for first (the question a pricing visitor is asking), then the wider site. */
const RELATED: RelatedItem[] = [
  ...SEGMENTS.map((s) => ({ eyebrow: "Who it’s for", title: s.name, body: s.card, href: s.href })),
  { eyebrow: "Product", title: "All features", body: "Every screen, from the calendar to payouts.", href: "/product" },
  {
    eyebrow: "Compare",
    title: "All comparisons",
    body: `Limespun next to ${COMPARE_INDEX.length} other tools, sourced from their own pages.`,
    href: "/compare",
  },
  {
    eyebrow: "Switching",
    title: "Switching guide",
    body: "What we move for you, and how the switch runs.",
    href: "/migrate",
  },
  { eyebrow: "Trust", title: "Security", body: "How your studio’s data is stored and protected.", href: "/legal/security" },
];

export default function PricingPage() {
  return (
    <PageShell
      jsonLd={[
        {
          "@context": "https://schema.org",
          "@type": "Product",
          name: "Limespun",
          description:
            "Tattoo studio software: bookings, deposits, consent forms, multi-session projects and artist payouts.",
          brand: { "@type": "Brand", name: "Limespun" },
          offers: PLANS.map((p) => ({
            "@type": "Offer",
            name: p.name,
            price: String(p.monthlyCents / 100),
            priceCurrency: "USD",
            url: `${SITE_URL}/pricing`,
          })),
        },
      ]}
    >
      <PageIntro
        align="center"
        crumbs={[{ label: "Home", href: "/" }, { label: "Pricing" }]}
        title="Flat plans, never per booking."
        italicWord="never"
        lead={
          <>
            Pick the plan that fits your team. No cut of your bookings or deposits. Card payments carry the payment
            provider&apos;s standard fee.
          </>
        }
        visual={<PlanCards compareHref="#compare" variant="page" />}
      />

      <Section tone="white" id="compare" labelledBy="compare-heading">
        <Container>
          <SectionHeader
            id="compare-heading"
            title="Compare every feature"
            lead="The same list the app uses to switch features on for your plan. On a phone, swipe it sideways."
          />
          <PlanMatrix className="mt-block-gap" />
        </Container>
      </Section>

      <FAQ items={faqs} title="Pricing questions" compact />

      <RelatedGrid heading="Related" items={RELATED} tone="white" />

      <InkBand
        headline="Pick a plan, start today."
        italicWord="today"
        secondary={{ label: "Contact us", href: "/contact" }}
      />
    </PageShell>
  );
}
