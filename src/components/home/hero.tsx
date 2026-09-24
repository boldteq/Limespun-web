import React from "react";
import { AlertTriangle, ArrowRight, HandCoins } from "lucide-react";
import { CTA } from "@/lib/brand";
import { FOUNDING_OFFER_OPEN, FOUNDING_OFFER_SIZE, MONEY_BACK_DAYS } from "@/lib/data/plans";
import {
  AppWindow,
  CheckRow,
  Chip,
  Display,
  PrimaryButton,
  SampleTag,
  SecondaryButton,
  StripedFrame,
  Toast,
  Underlined,
} from "./ui";

interface ChairRow {
  time: string;
  end: string;
  client: string;
  piece: string;
  artist: string;
  status: React.ReactNode;
  flagged?: boolean;
  live?: boolean;
}

/* Canonical sample studio, Thu Oct 8: four of today's six sessions. Nobody is double-booked. */
const rows: ChairRow[] = [
  {
    time: "10:00",
    end: "1:00",
    client: "Asha M.",
    piece: "Koi sleeve · session 4 of 5",
    artist: "Dev",
    status: <Chip tone="ink">In the chair</Chip>,
    live: true,
  },
  {
    time: "11:00",
    end: "12:00",
    client: "Jo K.",
    piece: "Consult · fine-line florals",
    artist: "Mara",
    status: <Chip tone="paid">$100 deposit paid</Chip>,
  },
  {
    time: "1:30",
    end: "4:00",
    client: "Elena R.",
    piece: "Back piece · session 2 of 3",
    artist: "Dev",
    status: <Chip tone="flag">Red ink allergy</Chip>,
    flagged: true,
  },
  {
    time: "4:30",
    end: "5:00",
    client: "Sam T.",
    piece: "Touch-up · forearm script",
    artist: "Mara",
    status: <Chip tone="quiet">Consent signed</Chip>,
  },
];

function TodayPanel() {
  return (
    <AppWindow active="Today">
      <div className="flex h-full flex-col">
        <div className="flex items-center justify-between gap-3 border-b border-hair px-5 py-4">
          <div>
            <p className="text-[15px] font-semibold text-graphite">Today</p>
            <p className="text-[12px] text-mute">
              <span className="whitespace-nowrap">6 sessions ·</span> <span className="whitespace-nowrap">3 artists</span>
            </p>
          </div>
          <SampleTag />
        </div>
        <ul>
          {rows.map((r) => (
            <li
              key={r.client}
              className={`grid grid-cols-[52px_1fr] items-center gap-3 border-b border-hair px-5 py-3 last:border-b-0 sm:grid-cols-[60px_1fr_auto] ${
                r.flagged ? "bg-flag-soft/60" : ""
              }`}
            >
              <div className="text-[12px] leading-tight tabular-nums">
                <p className="font-semibold text-graphite">{r.time}</p>
                <p className="text-mute">to {r.end}</p>
              </div>
              <div className="min-w-0">
                <p className="truncate text-[13px] font-semibold text-graphite">
                  {r.client} <span className="font-normal text-mute">· {r.artist}</span>
                </p>
                <p className="text-[12px] text-graphite-soft sm:truncate">
                  {/* On narrow phones the line wraps at a "·", never mid-phrase */}
                  {r.piece.split(" · ").map((part, i, all) => (
                    <React.Fragment key={part}>
                      <span className="whitespace-nowrap">
                        {part}
                        {i < all.length - 1 ? " ·" : ""}
                      </span>
                      {i < all.length - 1 ? " " : ""}
                    </React.Fragment>
                  ))}
                </p>
                <div className="mt-1 sm:hidden">{r.status}</div>
              </div>
              <div className="hidden sm:block">{r.status}</div>
            </li>
          ))}
        </ul>
        {/* Accounts for the 2 sessions not listed so the rows agree with the header; on sm+ it also closes the pane under the sidebar's height */}
        <div className="mt-auto flex items-center justify-between gap-3 border-t border-hair bg-canvas/60 px-5 py-3 text-[12px]">
          <span className="truncate text-mute">
            +2 more · Priya S.<span className="sm:hidden">, Rio (guest)</span>
            <span className="hidden sm:inline"> · Rio (guest) walk-ins</span>
          </span>
          <span className="hidden shrink-0 font-semibold text-graphite tabular-nums sm:inline">$340 deposits held</span>
        </div>
      </div>
    </AppWindow>
  );
}

export function Hero() {
  return (
    <section className="relative bg-canvas pt-10 pb-20 sm:pt-16 lg:pb-28">
      <div className="mx-auto max-w-[1280px] px-5 sm:px-8">
        {/* Copy — centered, stacked above the product */}
        <div className="mx-auto flex max-w-[920px] flex-col items-center text-center">
          {FOUNDING_OFFER_OPEN ? (
            /* The link is a 44px-tall hit area (tap-target minimum); the visible pill inside keeps
               its 35px height, and the negative top margin keeps it exactly where it sat. */
            <a
              href="#pricing-lifetime"
              className="group -mt-[5px] mb-5 inline-flex min-h-11 items-center rounded-full focus-visible:outline-none"
            >
              <span className="inline-flex items-center gap-2 rounded-full border border-hair bg-white/70 px-4 py-1.5 text-[14px] font-medium text-graphite-soft transition-colors group-hover:border-hair-strong group-hover:text-graphite group-focus-visible:outline-2 group-focus-visible:outline-offset-2 group-focus-visible:outline-graphite max-[359px]:gap-1.5 max-[359px]:px-3 max-[359px]:text-[13px]">
                <span className="h-2 w-2 rounded-full bg-ember" aria-hidden="true" />
                <span className="font-semibold text-graphite">Founding offer</span>
                <span className="hidden sm:inline">· Lifetime access for the first {FOUNDING_OFFER_SIZE} studios</span>
                <span className="sm:hidden">· First {FOUNDING_OFFER_SIZE} studios</span>
                <ArrowRight size={14} strokeWidth={2.2} className="transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
              </span>
            </a>
          ) : (
            <p className="mb-6 inline-flex items-center gap-2 rounded-full border border-hair bg-white/70 px-4 py-1.5 text-[14px] font-medium text-graphite-soft">
              <span className="h-2 w-2 rounded-full bg-ember" aria-hidden="true" />
              Tattoo studio software
            </p>
          )}
          <Display as="h1">
            Book the whole sleeve.
            <br /> Keep <Underlined>every deposit.</Underlined>
          </Display>
          <p className="mt-7 max-w-[600px] text-[18px] leading-[1.6] text-graphite-soft sm:text-[19px]">
            Limespun runs bookings, deposits, consent forms and artist payouts for tattoo studios. It is built
            around sessions that span months, not one-off salon appointments.
          </p>

          <div className="mt-9 flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
            <PrimaryButton>
              {CTA.primaryLabel} <ArrowRight size={17} strokeWidth={2.4} aria-hidden="true" />
            </PrimaryButton>
            <SecondaryButton href="#pricing">{CTA.secondaryLabel}</SecondaryButton>
          </div>

          <CheckRow
            className="mt-6 justify-center"
            items={[`${MONEY_BACK_DAYS}-day money-back guarantee`, "We move your data over for you", "No per-booking fees"]}
          />
        </div>

        {/* Product — wide, with the app's own notifications either side */}
        <div className="relative mt-16 lg:mt-20">
          <StripedFrame className="px-4 pt-10 pb-10 sm:px-10 sm:pt-14 lg:px-24 lg:pt-16 xl:pb-0">
            <div className="mx-auto max-w-[720px]">
              <TodayPanel />
            </div>
            <Toast
              tone="flag"
              icon={<AlertTriangle size={16} strokeWidth={2.2} />}
              title="Flagged before 1:30"
              body="Elena reacted to red ink after session 1. No red today; patch test booked before session 3."
              className="mx-auto mt-5 xl:absolute xl:right-4 xl:bottom-10 xl:mt-0 xl:max-w-[212px]"
            />
          </StripedFrame>
          <Toast
            tone="paid"
            icon={<HandCoins size={16} strokeWidth={2.2} />}
            title="Deposit carried to S4"
            body="$240 of Asha's $300 still held on the project."
            className="absolute top-28 left-4 hidden max-w-[212px] xl:flex"
          />
        </div>
      </div>
    </section>
  );
}
