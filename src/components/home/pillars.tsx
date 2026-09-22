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
    body: "Consults, long sessions, guest spots and touch-ups, with the full project attached to every booking.",
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
    body: "Clients sign on their phone or the front-desk iPad. Allergies and skin notes surface on the day.",
  },
  {
    art: <PayoutIllustration />,
    title: "Pay artists",
    lead: "Splits worked out for you",
    body: "Commission, booth rent and guest splits calculated per session, ready for payday.",
  },
];

export function Pillars() {
  return (
    <>
      {/* The seven apps it replaces — honest stand-in for a logo wall */}
      <section aria-labelledby="replaces-heading" className="bg-canvas pb-20">
        <div className="mx-auto max-w-[1280px] px-5 sm:px-8">
          <div className="flex flex-col items-center gap-5 rounded-[24px] bg-canvas-deep px-6 py-8 text-center sm:px-10">
            <h2 id="replaces-heading" className="text-[16px] leading-snug font-semibold text-graphite">
              One place for the seven apps you open before 10:30
            </h2>
            <ul className="flex max-w-[1040px] flex-wrap items-center justify-center gap-x-5 gap-y-3 sm:gap-x-7">
              {replaced.map((name) => (
                <li
                  key={name}
                  className="text-[15px] font-semibold tracking-[-0.01em] text-graphite/45 line-through decoration-ember/70 decoration-2 sm:text-[17px]"
                >
                  {name}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="bg-white py-24 sm:py-28">
        <div className="mx-auto grid max-w-[1280px] gap-14 px-5 sm:px-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.5fr)] lg:gap-20">
          <div className="lg:sticky lg:top-32 lg:self-start">
            <Display>Everything the shop runs on, in one place</Display>
            <p className="mt-6 max-w-[400px] text-[18px] leading-[1.6] text-mute">
              Four jobs that used to live in four different apps. In Limespun they share one client file, so nothing
              gets typed twice.
            </p>
          </div>
          <div className="grid gap-px overflow-hidden rounded-[24px] bg-hair ring-1 ring-hair sm:grid-cols-2">
            {pillars.map((p) => (
              <article key={p.title} className="flex flex-col bg-white p-8 sm:p-10">
                {p.art}
                <h3 className="mt-7 text-[24px] leading-[1.25] font-medium tracking-[-0.01em] text-graphite">{p.title}</h3>
                <p className="mt-2 text-[16px] font-medium text-graphite">{p.lead}</p>
                <p className="mt-3 text-[16px] leading-[1.55] text-mute">{p.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
