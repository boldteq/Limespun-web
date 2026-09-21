import React from "react";
import { AlertTriangle, HandCoins } from "lucide-react";
import { CTA } from "@/lib/brand";
import { AppWindow, CheckRow, Chip, Display, SampleTag, StripedFrame, Toast, Underlined } from "./ui";

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
    time: "1:30",
    end: "4:00",
    client: "Elena R.",
    piece: "Back piece · session 2 of 3",
    artist: "Dev",
    status: <Chip tone="flag">Red-ink allergy</Chip>,
    flagged: true,
  },
  {
    time: "2:00",
    end: "3:00",
    client: "Jo K.",
    piece: "Consult · fine-line florals",
    artist: "Mara",
    status: <Chip tone="paid">$100 deposit paid</Chip>,
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
      <div className="flex items-center justify-between gap-3 border-b border-hair px-5 py-4">
        <div>
          <p className="text-[15px] font-semibold text-graphite">Today</p>
          <p className="text-[12px] text-mute">4 sessions · $1,840 booked</p>
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
              <p className="truncate text-[12px] text-graphite-soft">{r.piece}</p>
              <div className="mt-1 sm:hidden">{r.status}</div>
            </div>
            <div className="hidden sm:block">{r.status}</div>
          </li>
        ))}
      </ul>
    </AppWindow>
  );
}

export function Hero() {
  return (
    <section className="relative bg-canvas pt-10 pb-20 sm:pt-16 lg:pb-28">
      <div className="mx-auto max-w-[1280px] px-5 sm:px-8">
        {/* Copy — centered, stacked above the product */}
        <div className="mx-auto flex max-w-[920px] flex-col items-center text-center">
          <p className="mb-6 inline-flex items-center gap-2 rounded-full border border-hair bg-white/70 px-4 py-1.5 text-[14px] font-medium text-graphite-soft">
            <span className="h-2 w-2 rounded-full bg-ember" aria-hidden="true" />
            Tattoo studio software · now in private beta
          </p>
          <Display as="h1">
            Book the whole sleeve.
            <br className="hidden sm:block" /> Keep <Underlined>every deposit.</Underlined>
          </Display>
          <p className="mt-7 max-w-[600px] text-[18px] leading-[1.6] text-graphite-soft sm:text-[19px]">
            Limespun runs bookings, deposits, consent forms and artist payouts for tattoo studios. It is built
            around sessions that span months, not one-off salon appointments.
          </p>

          <form
            action={CTA.primaryHref}
            method="get"
            className="mt-9 flex w-full max-w-[520px] flex-col gap-2 rounded-[22px] border border-hair bg-canvas-deep p-2 sm:flex-row sm:items-center sm:rounded-full"
          >
            <label htmlFor="hero-email" className="sr-only">
              Your studio email
            </label>
            <input
              id="hero-email"
              name="email"
              type="email"
              autoComplete="email"
              required
              placeholder="Your studio email"
              className="min-h-12 flex-1 rounded-full bg-transparent px-5 text-[16px] text-graphite placeholder:text-mute focus:outline-none"
            />
            <button
              type="submit"
              className="min-h-12 rounded-full bg-graphite px-6 text-[16px] font-semibold text-white transition-colors duration-200 hover:bg-graphite-soft focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-graphite"
            >
              {CTA.primaryLabel}
            </button>
          </form>

          <CheckRow
            className="mt-5 justify-center"
            items={["No card to apply", "Migration done for you", "No per-booking fees"]}
          />
        </div>

        {/* Product — wide, with the app's own notifications either side */}
        <div className="relative mt-16 lg:mt-20">
          <StripedFrame className="px-4 pt-10 pb-10 sm:px-10 sm:pt-14 lg:px-24 lg:pt-16 lg:pb-0">
            <div className="mx-auto max-w-[720px]">
              <TodayPanel />
            </div>
            <Toast
              tone="flag"
              icon={<AlertTriangle size={16} strokeWidth={2.2} />}
              title="Flagged before 1:30"
              body="Elena reacted to red ink in session 1. Patch test booked for Dev."
              className="mx-auto mt-5 lg:absolute lg:right-5 lg:bottom-10 lg:mt-0 lg:max-w-[250px]"
            />
          </StripedFrame>
          <Toast
            tone="paid"
            icon={<HandCoins size={16} strokeWidth={2.2} />}
            title="Deposit carried to S4"
            body="$240 of Asha's $300 still held on the project."
            className="absolute top-28 left-5 hidden max-w-[250px] lg:flex"
          />
        </div>
      </div>
    </section>
  );
}
