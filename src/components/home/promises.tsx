import React from "react";
import Link from "next/link";
import { MONEY_BACK_DAYS, ONBOARDING_SUPPORT_DAYS } from "@/lib/data/plans";
import { Display } from "./ui";

const linkClass =
  "font-semibold text-graphite underline decoration-ember decoration-2 underline-offset-4 hover:text-ember-deep";

const policies = [
  { value: "$0", label: "Limespun fee on bookings or deposits" },
  { value: "Free", label: "migration on every plan" },
  { value: "CSV", label: "export of your client list, any time" },
  { value: "Flat", label: "price for your whole team, no per-seat fees" },
];

const promises: { title: string; body: React.ReactNode }[] = [
  {
    title: "A real person sets you up",
    body: `We set up your studio with you, with ${ONBOARDING_SUPPORT_DAYS} days of onboarding help from the founding team.`,
  },
  {
    title: `Your money back for ${MONEY_BACK_DAYS} days`,
    body: `Not right for your shop in the first ${MONEY_BACK_DAYS} days? You get your money back.`,
  },
  {
    title: "You shape the roadmap",
    body: (
      <>
        Tell us what your shop needs next and follow it on the{" "}
        <Link href="/roadmap" className={linkClass}>
          public roadmap
        </Link>
        .
      </>
    ),
  },
];

export function Promises() {
  return (
    <section className="bg-canvas py-24 sm:py-28">
      <div className="mx-auto grid max-w-[1280px] gap-14 px-5 sm:px-8 xl:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] xl:gap-20">
        <div>
          <Display>What every studio gets from us</Display>
          <dl className="mt-12 grid grid-cols-2 gap-px overflow-hidden rounded-[20px] bg-hair-strong/60 ring-1 ring-hair-strong/60">
            {policies.map((p) => (
              <div key={p.label} className="flex flex-col-reverse justify-end gap-1 bg-canvas p-5 sm:p-6">
                <dt className="text-[15px] leading-snug text-pretty text-mute">{p.label}</dt>
                <dd className="text-[34px] leading-[1.15] font-medium tracking-[-0.02em] text-graphite">{p.value}</dd>
              </div>
            ))}
          </dl>
          <p className="mt-8 text-[16px] text-pretty text-graphite">
            Running more than one shop? Pro covers up to 5 locations.{" "}
            <a href="#pricing" className={`${linkClass} whitespace-nowrap`}>
              See pricing
            </a>
          </p>
        </div>

        <ol className="flex flex-col rounded-[24px] bg-canvas-deep px-6 sm:px-10">
          {promises.map((p, i) => (
            <li key={p.title} className="flex gap-4 border-b border-hair-strong/70 py-9 last:border-b-0 sm:gap-6">
              <span
                aria-hidden="true"
                className="w-6 shrink-0 font-serif text-[40px] leading-none text-ember-deep tabular-nums"
              >
                {i + 1}
              </span>
              <div className="pt-1">
                <h3 className="text-[18px] leading-[1.3] font-semibold text-balance text-graphite sm:text-[20px]">
                  {p.title}
                </h3>
                <p className="mt-2 text-[16px] leading-[1.6] text-pretty text-mute">{p.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
