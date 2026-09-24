import React from "react";
import {
  Container,
  Eyebrow,
  FAQ,
  InkBand,
  PageIntro,
  RelatedGrid,
  Section,
  StripedFrame,
  type FaqItem,
  type RelatedItem,
} from "@/components/system";
import { PageShell } from "@/components/templates/page-shell";
import { SectionHeader } from "@/components/templates/parts";
import { CountCheck } from "@/components/compare/count-check";
import { Guarantees, SwitchFromGrid, SwitchSteps } from "@/components/compare/switching";
import { ACCOUNT } from "@/lib/brand";
import { featureHref, getFeature, type FeatureSlug } from "@/lib/data/features";
import { MONEY_BACK_DAYS, PLANS, formatPrice } from "@/lib/data/plans";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Switching to Limespun: migration on every plan",
  description: `Leaving Vagaro, Fresha, Square or a spreadsheet? Our team moves your clients, bookings, deposits and signed consent forms on every plan. ${MONEY_BACK_DAYS}-day money-back.`,
  path: "/migrate",
});

const CONTACT_SWITCHING = { label: "Contact us about switching", href: "/contact?topic=switching" };

const FAQS: FaqItem[] = [
  {
    q: "What if my current tool has a field Limespun doesn’t?",
    a: "We carry it across. Custom fields come over as notes on the client record, so nothing you wrote down is lost.",
  },
  {
    q: "What about client photos in my current tool?",
    a: "If your current tool lets you export them, we bring them across and file them on the client and the project.",
  },
  {
    q: "Can I keep using my old tool while you move us?",
    a: "Yes. It keeps working until you cancel it. When the counts match, point your booking link at Limespun.",
  },
  {
    q: "What if the move takes longer than expected?",
    a: `We keep going until you’re moved. Migration costs nothing extra, however long it takes, and every plan has a ${MONEY_BACK_DAYS}-day money-back guarantee.`,
  },
  {
    q: "Is migration included on the Solo plan?",
    a: "Yes. Done-for-you migration is on every plan, Solo too: our team moves your clients, bookings, deposits and signed forms for you.",
  },
];

/** Where the moved data lives: the record, the project, the forms. Plus the price. */
const RELATED_FEATURES: FeatureSlug[] = ["clients", "projects", "forms"];
const RELATED: RelatedItem[] = [
  ...RELATED_FEATURES.map((slug) => {
    const f = getFeature(slug);
    return { eyebrow: "Feature", title: f.name, body: f.card, href: featureHref(slug) };
  }),
  { eyebrow: "Plans", title: "Pricing", body: `Flat monthly plans from ${formatPrice(PLANS[0].monthlyCents)}. Migration on every one.`, href: "/pricing" },
];

/*
 * The move itself: the count check from step two, the old tool's figures against what landed in
 * Limespun, with records to spot-check beside it from lg. Phones see the four counts.
 */
function TheCountCheck() {
  return (
    <StripedFrame inset="md" className="max-sm:pt-6 max-sm:pb-6">
      <CountCheck className="mx-auto max-w-[1040px]" />
    </StripedFrame>
  );
}

export default function MigratePage() {
  return (
    <PageShell>
      <PageIntro
        crumbs={[{ label: "Home", href: "/" }, { label: "Switching guide" }]}
        eyebrow="Switching to Limespun"
        title="Switch to Limespun without starting over."
        italicWord="Switch"
        lead="On every plan, our team moves your clients, upcoming bookings, deposits held and signed consent forms. Your old tool keeps running until the counts match."
        primary={{ label: ACCOUNT.signUpLabel, href: ACCOUNT.signUpHref }}
        secondary={CONTACT_SWITCHING}
        visual={<TheCountCheck />}
      />

      <Section tone="white" labelledBy="from-heading">
        <Container>
          <SectionHeader
            id="from-heading"
            title="Pick the tool you’re leaving"
            lead="Each guide shows how to get your clients out, from that tool’s own help pages where it publishes them. Where it doesn’t, ask them for an export."
          />
          <SwitchFromGrid className="mt-block-gap" />
        </Container>
      </Section>

      <Section tone="canvas" labelledBy="steps-heading">
        <Container>
          <SectionHeader
            id="steps-heading"
            title="Your old tool runs until the counts match"
            lead="No deadline, and no day you have to stop taking bookings. Here’s what comes across, and what stays behind."
          />
          <SwitchSteps surface="canvas" className="mt-8 sm:mt-block-gap" />
          <div className="mt-10 sm:mt-block-gap">
            <Eyebrow>On every plan</Eyebrow>
            <Guarantees tone="white" className="mt-3 sm:mt-4" />
          </div>
        </Container>
      </Section>

      <FAQ items={FAQS} title="Questions about switching" tone="white" compact />

      <RelatedGrid heading="Related" items={RELATED} tone="canvas" />

      <InkBand
        headline="Bring the whole book over."
        italicWord="book"
        sub={
          <>
            Create your account, send us your export, and keep your old tool until the counts match.{" "}
            <span className="whitespace-nowrap">{MONEY_BACK_DAYS}-day money-back</span> guarantee.
          </>
        }
        secondary={CONTACT_SWITCHING}
      />
    </PageShell>
  );
}
