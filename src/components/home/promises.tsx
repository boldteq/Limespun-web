import React from "react";
import { CTA } from "@/lib/brand";
import { Display } from "./ui";

const policies = [
  { value: "$0", label: "per-booking or deposit fees" },
  { value: "Free", label: "migration on Studio and Pro" },
  { value: "100%", label: "of your data exportable, any time" },
  { value: "1 price", label: "per shop, not per artist seat" },
];

const promises = [
  {
    quote: "A real person sets up your studio with you, and stays your contact after launch.",
    who: "Onboarding",
    detail: "Every early-access studio",
  },
  {
    quote: "We move your clients, bookings, deposits and signed forms for you, so nothing gets retyped.",
    who: "Migration",
    detail: "Included on Studio and Pro",
  },
  {
    quote: "Tell us what your shop needs next. The roadmap is shaped by the studios using it.",
    who: "Roadmap",
    detail: "Monthly calls with beta studios",
  },
];

export function Promises() {
  return (
    <section className="bg-canvas py-24 sm:py-28">
      <div className="mx-auto grid max-w-[1280px] gap-14 px-5 sm:px-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:gap-20">
        <div>
          <Display>Built with tattooers, not adapted from salon software</Display>
          <dl className="mt-12 grid grid-cols-2 gap-px overflow-hidden rounded-[20px] bg-hair-strong/60 ring-1 ring-hair-strong/60">
            {policies.map((p) => (
              <div key={p.label} className="flex flex-col-reverse justify-end gap-1 bg-canvas p-6">
                <dt className="text-[15px] leading-snug text-mute">{p.label}</dt>
                <dd className="text-[34px] font-medium tracking-[-0.02em] text-graphite">{p.value}</dd>
              </div>
            ))}
          </dl>
          <p className="mt-8 text-[16px] text-graphite">
            Running more than one location?{" "}
            <a
              href={CTA.demoHref}
              className="font-semibold underline decoration-ember decoration-2 underline-offset-4 hover:text-ember-deep"
            >
              {CTA.demoLabel}
            </a>
          </p>
        </div>

        <ol className="flex flex-col rounded-[24px] bg-canvas-deep px-7 sm:px-10">
          {promises.map((p, i) => (
            <li key={p.who} className="flex gap-6 border-b border-hair-strong/70 py-9 last:border-b-0">
              <span className="font-serif text-[40px] leading-none text-ember tabular-nums">{i + 1}</span>
              <div>
                <p className="font-serif text-[25px] leading-[1.3] text-graphite">{p.quote}</p>
                <p className="mt-4 text-[15px]">
                  <span className="font-semibold text-graphite">{p.who}</span>
                  <span className="text-mute"> · {p.detail}</span>
                </p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
