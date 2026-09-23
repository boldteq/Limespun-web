"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, Check, LifeBuoy, ShieldCheck } from "lucide-react";
import { ACCOUNT } from "@/lib/brand";
import {
  ALWAYS_INCLUDED,
  ANNUAL_DISCOUNT_PERCENT,
  FOUNDING_OFFER_OPEN,
  FOUNDING_OFFER_SIZE,
  MONEY_BACK_DAYS,
  ONBOARDING_SUPPORT_DAYS,
  PLAN_CAPS,
  PLANS,
  priceFor,
  type BillingOption,
  type Plan,
} from "@/lib/data/plans";
import { PrimaryButton, SecondaryButton } from "@/components/home/ui";

const cn = (...c: (string | false | undefined)[]) => c.filter(Boolean).join(" ");

/** `wideOnly` chips hide below sm, and below 380px chips stack under the label, so the options fit a phone column. */
const OPTIONS: { key: BillingOption; label: string; chip?: string; wideOnly?: boolean }[] = [
  { key: "monthly", label: "Monthly" },
  { key: "annual", label: "Annual", chip: `−${ANNUAL_DISCOUNT_PERCENT}%` },
  ...(FOUNDING_OFFER_OPEN ? [{ key: "lifetime" as const, label: "Lifetime", chip: "Founding", wideOnly: true }] : []),
];

const OPTION_NOTE: Record<BillingOption, string> = {
  lifetime: `Founding offer for the first ${FOUNDING_OFFER_SIZE} studios. Pay once, never a monthly bill.`,
  monthly: "Switch plans any time. Changes are prorated to your next invoice.",
  annual: `Pay yearly and save ${ANNUAL_DISCOUNT_PERCENT}% on every plan.`,
};

function BillingToggle({ value, onChange }: { value: BillingOption; onChange: (v: BillingOption) => void }) {
  return (
    <div className="flex flex-col items-center gap-3">
      <div
        role="radiogroup"
        aria-label="Billing"
        className={cn(
          "grid w-full max-w-[400px] rounded-full bg-canvas p-1 ring-1 ring-hair sm:inline-flex sm:w-auto sm:max-w-none",
          OPTIONS.length === 3 ? "grid-cols-3" : "grid-cols-2",
        )}
      >
        {OPTIONS.map((o) => {
          const active = o.key === value;
          return (
            <button
              key={o.key}
              type="button"
              role="radio"
              aria-checked={active}
              onClick={() => onChange(o.key)}
              className={cn(
                "inline-flex h-11 min-w-0 items-center justify-center gap-1 rounded-full px-1.5 max-[379px]:flex-col max-[379px]:gap-0.5 text-[14px] font-semibold whitespace-nowrap transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-graphite sm:gap-2 sm:px-5",
                active ? "bg-graphite text-white" : "text-graphite-soft hover:text-graphite",
              )}
            >
              {o.label}
              {o.chip && (
                <span
                  className={cn(
                    "rounded-full px-1.5 py-0.5 text-[11px] leading-none font-semibold",
                    o.wideOnly && "hidden sm:inline",
                    active ? "bg-white/15 text-white" : "bg-ember-soft text-ember-deep",
                  )}
                >
                  {o.chip}
                </span>
              )}
            </button>
          );
        })}
      </div>
      <p aria-live="polite" className="min-h-5 text-center text-[14px] text-mute">
        {OPTION_NOTE[value]}
      </p>
    </div>
  );
}

function PlanCard({ plan, option }: { plan: Plan; option: BillingOption }) {
  const price = priceFor(plan, option);
  const cta = option === "lifetime" ? "Get lifetime access" : `Choose ${plan.name}`;
  // Carries the choice into signup; the app ignores params it doesn't read yet.
  const href = `${ACCOUNT.signUpHref}?plan=${plan.tier}&billing=${option}`;

  return (
    <article
      className={cn(
        "relative flex flex-col rounded-[20px] bg-white p-6",
        plan.recommended ? "shadow-[var(--shadow-warm)] ring-2 ring-ember" : "ring-1 ring-hair",
      )}
    >
      {plan.recommended && (
        <span className="absolute -top-3 left-6 rounded-full bg-ember-deep px-3 py-1 text-[12px] font-semibold text-white">
          Recommended
        </span>
      )}

      <h3 className="text-[20px] leading-[1.25] font-semibold text-graphite">{plan.name}</h3>
      <p className="mt-1 text-[15px] leading-snug text-mute">{plan.fit}</p>

      <div className="mt-6">
        <p className="flex items-baseline gap-1.5">
          <span className="text-[44px] leading-none font-semibold tracking-[-0.03em] text-graphite tabular-nums">
            {price.amount}
          </span>
          <span className="text-[15px] text-mute">{price.suffix}</span>
        </p>
        <p className={cn("mt-2 text-[13px]", option === "lifetime" ? "font-medium text-ember-deep" : "text-mute")}>
          {price.note}
        </p>
      </div>

      {plan.recommended ? (
        <PrimaryButton href={href} className="mt-6 w-full">
          {cta}
        </PrimaryButton>
      ) : (
        <SecondaryButton href={href} className="mt-6 w-full">
          {cta}
        </SecondaryButton>
      )}

      <p className="mt-6 text-[13px] font-semibold text-graphite">{plan.listIntro}</p>
      <ul className="mt-3 mb-6 flex flex-col gap-2.5">
        {plan.lines.map((l) => (
          <li key={l} className="flex gap-2.5 text-[15px] leading-snug text-graphite-soft">
            <Check size={16} strokeWidth={2.6} className="mt-0.5 shrink-0 text-ember" aria-hidden="true" />
            {l}
          </li>
        ))}
      </ul>

      {/* Caps are pinned to the foot of the card (mt-auto), so every card in a row ends on the
          same four rows and the shorter lists breathe above them instead of leaving a blank bottom. */}
      <dl className="mt-auto divide-y divide-hair rounded-[14px] bg-canvas px-4 py-1">
        {PLAN_CAPS.map((c) => (
          <div key={c.label} className="flex items-center justify-between gap-3 py-2">
            <dt className="text-[13px] text-mute">{c.label}</dt>
            <dd className="text-[13px] font-semibold text-graphite tabular-nums">{c.values[plan.tier]}</dd>
          </div>
        ))}
      </dl>
    </article>
  );
}

/** Billing toggle, the four plans and the every-plan strip. Used on the homepage and /pricing. */
export function PlanCards({ compareHref }: { compareHref?: string }) {
  const [option, setOption] = useState<BillingOption>("monthly");

  // "#pricing-lifetime" (the hero's founding-offer pill) opens the Lifetime tab and scrolls to the plans.
  useEffect(() => {
    if (!FOUNDING_OFFER_OPEN) return;
    const apply = () => {
      if (window.location.hash !== "#pricing-lifetime") return;
      setOption("lifetime");
      document.getElementById("pricing")?.scrollIntoView({ behavior: "smooth", block: "start" });
    };
    apply();
    window.addEventListener("hashchange", apply);
    return () => window.removeEventListener("hashchange", apply);
  }, []);

  return (
    <div>
      <BillingToggle value={option} onChange={setOption} />

      <div className="mt-10 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {PLANS.map((p) => (
          <PlanCard key={p.tier} plan={p} option={option} />
        ))}
      </div>

      <div className="mt-6 grid gap-8 rounded-[20px] bg-canvas p-6 sm:p-8 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)] lg:gap-12">
        <div>
          <p className="text-[13px] font-semibold text-graphite">On every plan</p>
          <ul className="mt-4 grid gap-x-8 gap-y-3 sm:grid-cols-2">
            {ALWAYS_INCLUDED.map((i) => (
              <li key={i} className="flex items-center gap-2.5 text-[15px] text-graphite-soft">
                <Check size={16} strokeWidth={2.6} className="shrink-0 text-ember" aria-hidden="true" />
                {i}
              </li>
            ))}
          </ul>
        </div>
        <div className="flex flex-col gap-4 border-t border-hair pt-6 lg:border-t-0 lg:border-l lg:pt-0 lg:pl-12">
          <p className="flex gap-3 text-[15px] leading-snug text-pretty text-graphite-soft">
            <ShieldCheck size={20} strokeWidth={1.8} className="shrink-0 text-graphite" aria-hidden="true" />
            <span>
              <span className="font-semibold text-graphite">{MONEY_BACK_DAYS}-day money-back guarantee.</span> Not right for
              your shop? Get your money back.
            </span>
          </p>
          <p className="flex gap-3 text-[15px] leading-snug text-pretty text-graphite-soft">
            <LifeBuoy size={20} strokeWidth={1.8} className="shrink-0 text-graphite" aria-hidden="true" />
            <span>
              <span className="font-semibold text-graphite">{ONBOARDING_SUPPORT_DAYS} days of onboarding help</span> from
              the founding team.
            </span>
          </p>
          {compareHref && (
            <Link
              href={compareHref}
              className="group inline-flex items-center gap-1.5 text-[15px] font-semibold text-graphite underline decoration-ember decoration-2 underline-offset-[6px] hover:text-ember-deep"
            >
              Compare every feature
              <ArrowRight size={15} className="transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
