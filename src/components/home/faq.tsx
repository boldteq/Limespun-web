import React from "react";
import { CONTACT_EMAIL } from "@/lib/brand";
import { FOUNDING_OFFER_OPEN, MONEY_BACK_DAYS, ONBOARDING_SUPPORT_DAYS } from "@/lib/data/plans";
import { FAQ, type FaqItem } from "@/components/system";

const faqs: FaqItem[] = [
  {
    q: "How is Limespun different from Vagaro, Fresha or GlossGenius?",
    a: "Those tools were built for salons and adapted for tattoo. Limespun starts from how tattooing works: pieces that take several sessions, deposits that carry across them, consent and allergy notes that matter on the day, and artists paid by commission, booth rent or guest split.",
  },
  {
    q: "Will I lose my clients, deposits or consent forms when I switch?",
    a: "No. On every plan our team moves your clients, upcoming bookings, deposits and signed forms for you. You keep using your old tool until everything has been checked.",
  },
  {
    q: "What happens to a deposit when a client reschedules or cancels?",
    a: "The deposit sits on the project, not the date. If a session moves, the deposit moves with it. If a client cancels, you decide whether the deposit is kept or refunded, and the record shows what happened.",
  },
  {
    q: "Can guest artists take their own bookings?",
    a: "Yes, on the Pro and Multi-Location plans. Each guest gets their own dates, booking link and split, and their sessions are paid out with the rest of your artists.",
  },
  {
    q: "Do you take a fee on bookings or deposits?",
    // "Once" is the founding lifetime offer, so it only shows while that offer is open.
    a: `No. You pay for your plan, ${FOUNDING_OFFER_OPEN ? "monthly, yearly or once" : "monthly or yearly"}. Card payments are charged at the payment provider's standard rate, and Limespun adds nothing on top.`,
  },
  {
    q: "Is there a free trial?",
    a: `No. Every plan has a ${MONEY_BACK_DAYS}-day money-back guarantee instead, and our team moves your data over for you.`,
  },
  {
    q: "Can I cancel any time?",
    a: "Yes. Cancel from your settings whenever you like, and export your clients and signed consent forms first.",
  },
  {
    q: "Does it work on iPad and phone?",
    a: "Yes. Limespun runs in the browser on a computer, iPad or phone, and clients sign consent forms on their own phone or a front-desk tablet.",
  },
  {
    q: "How do I get help?",
    a: `Email support on every plan, priority support on Pro and Multi-Location, and ${ONBOARDING_SUPPORT_DAYS} days of onboarding help from the founding team when you start.`,
  },
  {
    q: "Who is behind Limespun?",
    a: "Limespun is built by Boldteq, a small software team that works directly with the tattoo artists and studio owners using it.",
  },
];

/** The homepage FAQ (also used on /pricing) on the system FAQ, which emits the FAQPage JSON-LD. */
export function Faq({
  items = faqs,
  title = "Questions studio owners ask",
  tone = "canvas",
}: {
  items?: FaqItem[];
  title?: string;
  tone?: "canvas" | "white";
} = {}) {
  return (
    <FAQ
      items={items}
      title={title}
      tone={tone}
      intro={
        <>
          Anything else? Email{" "}
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="font-semibold whitespace-nowrap text-graphite underline decoration-ember decoration-2 underline-offset-4 hover:text-ember-deep focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-graphite"
          >
            {CONTACT_EMAIL}
          </a>{" "}
          and a real person replies.
        </>
      }
    />
  );
}
