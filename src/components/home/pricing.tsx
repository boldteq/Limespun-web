import React from "react";
import { Check } from "lucide-react";
import { CTA } from "@/lib/brand";
import { Display, PrimaryButton, SecondaryButton } from "./ui";

interface Tier {
  name: string;
  fit: string;
  price: string;
  period: string;
  lines: string[];
  recommended?: boolean;
  cta: { label: string; href: string };
}

const tiers: Tier[] = [
  {
    name: "Solo",
    fit: "One artist, one chair",
    price: "$29",
    period: "/mo",
    cta: { label: CTA.primaryLabel, href: CTA.primaryHref },
    lines: [
      "Calendar, messages and client files",
      "Unlimited bookings, deposits and consent forms",
      "Multi-session projects",
      "Email support",
    ],
  },
  {
    name: "Studio",
    fit: "2–5 chairs",
    price: "$59",
    period: "/mo",
    recommended: true,
    cta: { label: CTA.primaryLabel, href: CTA.primaryHref },
    lines: [
      "Everything in Solo",
      "Up to 5 artists",
      "Commission and booth-rent payouts",
      "Guest artist dates and splits",
      "Migration done for you",
    ],
  },
  {
    name: "Pro",
    fit: "6+ chairs and guest-heavy shops",
    price: "$99",
    period: "/mo",
    cta: { label: CTA.primaryLabel, href: CTA.primaryHref },
    lines: [
      "Everything in Studio",
      "Unlimited artists",
      "EU REACH ink inventory",
      "Public guest booking pages",
      "Priority support",
    ],
  },
  {
    name: "Multi-location",
    fit: "Shops with more than one address",
    price: "$199",
    period: "/mo per location",
    cta: { label: "Talk to us", href: CTA.demoHref },
    lines: [
      "Everything in Pro",
      "Reporting across locations",
      "Per-location payouts and tax",
      "A dedicated migration lead",
    ],
  },
];

export function Pricing() {
  return (
    <section id="pricing" className="bg-white py-24 sm:py-28">
      <div className="mx-auto max-w-[1280px] px-5 sm:px-8">
        <div className="flex flex-col items-center text-center">
          <Display className="max-w-[820px]">Priced per shop, never per booking</Display>
          <p className="mt-5 max-w-[560px] text-[18px] leading-[1.6] text-mute">
            One monthly price. No cut of your bookings or deposits. Card processing is charged at the provider&apos;s
            standard rate.
          </p>
        </div>

        <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {tiers.map((t) => (
            <article
              key={t.name}
              className={`relative flex flex-col rounded-[20px] p-7 ${
                t.recommended ? "bg-white shadow-[var(--shadow-warm)] ring-2 ring-ember" : "bg-canvas"
              }`}
            >
              {t.recommended && (
                <span className="absolute -top-3 left-7 rounded-full bg-ember px-3 py-1 text-[12px] font-semibold text-white">
                  Best for 2–5 chairs
                </span>
              )}
              <h3 className="text-[22px] font-semibold text-graphite">{t.name}</h3>
              <p className="mt-1 min-h-[44px] text-[15px] leading-snug text-mute">{t.fit}</p>
              <p className="mt-6 flex items-baseline gap-1">
                <span className="text-[44px] font-medium tracking-[-0.02em] text-graphite tabular-nums">{t.price}</span>
                <span className="text-[15px] text-mute">{t.period}</span>
              </p>
              {t.recommended ? (
                <PrimaryButton href={t.cta.href} className="mt-6 w-full">
                  {t.cta.label}
                </PrimaryButton>
              ) : (
                <SecondaryButton href={t.cta.href} className="mt-6 w-full">
                  {t.cta.label}
                </SecondaryButton>
              )}
              <ul className="mt-7 flex flex-col gap-3 border-t border-hair pt-6">
                {t.lines.map((l) => (
                  <li key={l} className="flex gap-2.5 text-[15px] leading-snug text-graphite-soft">
                    <Check size={16} strokeWidth={2.6} className="mt-0.5 shrink-0 text-ember" aria-hidden="true" />
                    {l}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
