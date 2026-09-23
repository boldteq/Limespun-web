import React from "react";
import { Plus } from "lucide-react";
import { CTA } from "@/lib/brand";
import { FOUNDING_OFFER_OPEN, MONEY_BACK_DAYS, ONBOARDING_SUPPORT_DAYS } from "@/lib/data/plans";
import { Display } from "./ui";

export const faqs: { q: string; a: string }[] = [
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
    a: "The deposit sits on the project, not the date. If a session moves, the deposit moves with it. If a client cancels inside your window, your policy decides what happens, and Limespun applies it the same way every time.",
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

export function Faq({
  items = faqs,
  title = "Questions studio owners ask",
  tone = "canvas",
}: {
  items?: { q: string; a: string }[];
  title?: string;
  tone?: "canvas" | "white";
} = {}) {
  return (
    <section className={`${tone === "white" ? "bg-white" : "bg-canvas"} py-24 sm:py-28`}>
      <div className="mx-auto grid max-w-[1280px] gap-12 px-5 sm:px-8 xl:grid-cols-[minmax(0,0.8fr)_minmax(0,1.4fr)]">
        <div className="xl:sticky xl:top-32 xl:self-start">
          <Display>{title}</Display>
          <p className="mt-5 max-w-[360px] text-[18px] leading-[1.6] text-pretty text-mute">
            Anything else?{" "}
            <a
              href={CTA.demoHref}
              className="font-semibold whitespace-nowrap text-graphite underline decoration-ember decoration-2 underline-offset-4 hover:text-ember-deep"
            >
              {CTA.demoLabel}
            </a>{" "}
            and ask a real person.
          </p>
        </div>
        <div className="border-t border-hair-strong">
          {items.map((f) => (
            <details key={f.q} className="group border-b border-hair-strong">
              <summary className="flex min-h-16 cursor-pointer list-none items-center justify-between gap-6 py-5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-graphite [&::-webkit-details-marker]:hidden">
                <h3 className="text-[18px] font-medium text-graphite">{f.q}</h3>
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white text-graphite ring-1 ring-hair transition-transform duration-200 group-open:rotate-45">
                  <Plus size={16} strokeWidth={2.2} aria-hidden="true" />
                </span>
              </summary>
              <p className="max-w-[640px] pb-6 text-[16px] leading-[1.65] text-graphite-soft">{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
