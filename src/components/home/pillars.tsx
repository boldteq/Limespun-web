import React from "react";
import { BookIllustration, ConsentIllustration, DepositIllustration, PayoutIllustration } from "./illustrations";
import { Display } from "./ui";

const replaced = [
  "Google Calendar",
  "Square",
  "Instagram DMs",
  "Venmo",
  "Notes app",
  "Spreadsheets",
  "Paper consent",
];

const pillars = [
  {
    art: <BookIllustration />,
    title: "Book",
    lead: "Every chair, every artist, one calendar",
    body: "Consults, long sessions and touch-ups, with the full project attached to every booking. Guest\u00a0spots\u00a0on\u00a0Pro.",
  },
  {
    art: <DepositIllustration />,
    title: "Hold deposits",
    lead: "Deposits follow the piece, not the date",
    body: "Take the deposit once, apply it across sessions, and enforce your late-cancel policy automatically.",
  },
  {
    art: <ConsentIllustration />,
    title: "Sign consent",
    lead: "Forms signed before they sit down",
    body: "Clients sign on their phone or a front-desk tablet. Allergies and skin notes surface on the day.",
  },
  {
    art: <PayoutIllustration />,
    title: "Pay artists",
    lead: "Splits worked out for you",
    body: "Commission and booth rent calculated per session, ready for payday. Guest\u00a0splits\u00a0on\u00a0Pro.",
  },
];

export function Pillars() {
  return (
    <>
      {/* The seven apps it replaces — honest stand-in for a logo wall */}
      <section aria-labelledby="replaces-heading" className="bg-canvas pb-20">
        <div className="mx-auto max-w-[1280px] px-5 sm:px-8">
          <div className="flex flex-col items-center gap-5 rounded-[24px] bg-canvas-deep px-6 py-8 text-center sm:px-10">
            <h2 id="replaces-heading" className="text-[16px] leading-snug font-semibold text-balance text-graphite sm:text-[17px]">
              One place for the seven apps you open before 10:30
            </h2>
            <ul className="flex max-w-[1040px] flex-wrap items-center justify-center gap-x-5 gap-y-3 sm:gap-x-7">
              {replaced.map((name) => (
                <li
                  key={name}
                  className="text-[15px] font-medium tracking-[-0.01em] text-mute line-through decoration-ember/70 decoration-2 sm:text-[16px]"
                >
                  {name}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="bg-white py-24 sm:py-28">
        <div className="mx-auto grid max-w-[1280px] gap-14 px-5 sm:px-8 xl:grid-cols-[minmax(0,0.9fr)_minmax(0,1.5fr)] xl:gap-20">
          <div className="xl:sticky xl:top-32 xl:self-start">
            <Display>Everything the shop runs on, in one place</Display>
            <p className="mt-6 max-w-[560px] text-[18px] leading-[1.6] text-mute xl:max-w-[400px]">
              Four jobs that used to be spread across those apps. In Limespun they share one client file, so nothing
              gets typed twice.
            </p>
          </div>
          <div className="grid gap-px overflow-hidden rounded-[24px] bg-hair ring-1 ring-hair sm:grid-cols-2">
            {pillars.map((p) => (
              <article key={p.title} className="flex flex-col bg-white p-8 sm:p-10">
                {p.art}
                <h3 className="mt-7 text-[24px] leading-[1.25] font-medium tracking-[-0.01em] text-graphite">{p.title}</h3>
                <p className="mt-2 text-[17px] leading-snug font-medium text-pretty text-graphite">{p.lead}</p>
                <p className="mt-3 text-[16px] leading-[1.6] text-pretty text-mute">{p.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
