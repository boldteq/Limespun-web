import React from "react";
import { Nav } from "@/components/layout/nav";
import { Footer } from "@/components/layout/footer";
import { Display } from "@/components/home/ui";
import { Faq } from "@/components/home/faq";
import { ClosingCta } from "@/components/marketing/closing-cta";
import { PlanCards } from "@/components/pricing/plan-cards";
import { PlanMatrix } from "@/components/pricing/plan-matrix";
import { JsonLd } from "@/components/seo/json-ld";
import { SITE_URL } from "@/lib/brand";
import {
  ANNUAL_DISCOUNT_PERCENT,
  FOUNDING_OFFER_OPEN,
  FOUNDING_OFFER_SIZE,
  MONEY_BACK_DAYS,
  ONBOARDING_SUPPORT_DAYS,
  PLANS,
  formatPrice,
} from "@/lib/data/plans";

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
    a: "Pro. Guest-artist seats, payroll and the AI tools start on Pro. Studio covers up to five resident artists, with commission and booth-rent splits.",
  },
  {
    q: "Can I change plans later?",
    a: "Yes. Move up or down any time from your settings. Changes are prorated to your next invoice.",
  },
  {
    q: "How much do I save by paying yearly?",
    a: `${ANNUAL_DISCOUNT_PERCENT}% on every plan. Solo, for example, works out at ${formatPrice(
      Math.round(solo.annualCents / 12),
    )} a month, billed as ${formatPrice(solo.annualCents)} once a year.`,
  },
  {
    q: "Will someone help me set up?",
    a: `Yes. Every new studio gets ${ONBOARDING_SUPPORT_DAYS} days of onboarding help from the founding team. If you'd like to see Limespun first, book a demo.`,
  },
];

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-canvas text-graphite">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Product",
          name: "Limespun",
          description: "Tattoo studio software: bookings, deposits, consent forms, multi-session projects and artist payouts.",
          brand: { "@type": "Brand", name: "Limespun" },
          offers: PLANS.map((p) => ({
            "@type": "Offer",
            name: p.name,
            price: String(p.monthlyCents / 100),
            priceCurrency: "USD",
            url: `${SITE_URL}/pricing`,
          })),
        }}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
        }}
      />
      <Nav />
      <main id="main">
        <section className="bg-white pt-14 pb-20 sm:pt-20 sm:pb-24">
          <div className="mx-auto max-w-[1280px] px-5 sm:px-8">
            <div className="flex flex-col items-center text-center">
              <Display as="h1" className="max-w-[900px] !text-[44px] sm:!text-[64px]">
                Flat plans, never per booking
              </Display>
              <p className="mt-5 max-w-[580px] text-[18px] leading-[1.6] text-balance text-mute">
                Pick the plan that fits your team. No cut of your bookings or deposits. Card payments carry the
                payment provider&apos;s standard fee.
              </p>
            </div>
            <div className="mt-12">
              <PlanCards compareHref="#compare" />
            </div>
          </div>
        </section>

        <section id="compare" className="scroll-mt-28 bg-canvas py-20 sm:py-24">
          <div className="mx-auto max-w-[1280px] px-5 sm:px-8">
            <Display>Compare every feature</Display>
            <p className="mt-4 max-w-[620px] text-[17px] leading-[1.6] text-mute">
              The same list the app uses to switch features on for your plan. On a phone, scroll the table sideways.
            </p>
            <div className="mt-10">
              <PlanMatrix />
            </div>
          </div>
        </section>

        <Faq items={faqs} title="Pricing questions" tone="white" />
        <ClosingCta
          title="Pick a plan, or see it first"
          body={`Create your account in a few minutes, or book a demo. Every plan has a ${MONEY_BACK_DAYS}-day money-back guarantee.`}
        />
      </main>
      <Footer />
    </div>
  );
}
