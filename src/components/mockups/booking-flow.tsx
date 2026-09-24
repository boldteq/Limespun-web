import type React from "react";
import { CalendarCheck2, Check, UserRound } from "lucide-react";
import { AppShellPhone, SampleTag } from "@/components/system";
import { cn } from "@/components/system/cn";
import { ARTISTS, ARTIST_ORDER, ASHA_PROJECT, STUDIO_LABEL, usd } from "./sample-data";

/**
 * The public booking page in a phone (app route /book/[studioSlug]/[serviceId]).
 * Mirrors the funnel's four stages (Artist · Time · Details · Intake), its step
 * rail (onyx done, ringed active, hairline ahead), serif stage headings and the
 * onyx primary the app's public pages use. Asha books session 5 of her koi
 * sleeve for Sat, Nov 7, 11:00; the deposit is already on her project.
 */

export type BookingStep = 1 | 2 | 3 | 4;

const STEPS = ["Artist", "Time", "Details", "Intake"] as const;
const SESSION = ASHA_PROJECT.sessions.find((s) => s.n === 5);
const ARTIST = ARTISTS[ASHA_PROJECT.artist];
/** "$240 already on your project": the deposit pool's available balance. */
const ON_PROJECT = `${usd(ASHA_PROJECT.pool.availableCents)} already on your project`;
const SERVICE_LINE = `${ASHA_PROJECT.title} · session ${SESSION?.n ?? 5}`;

/** November dates with openings. Every weekday checked against 2026. */
const DATES = [
  { dow: "Thu", day: 5 },
  { dow: "Sat", day: 7 },
  { dow: "Tue", day: 10 },
  { dow: "Sat", day: 14 },
];
const PICKED_DAY = 7;
const TIMES = ["11:00 AM", "2:30 PM"];

function StepRail({ step }: { step: BookingStep }) {
  return (
    <div className="flex items-start justify-between px-1">
      {STEPS.map((label, i) => {
        const n = i + 1;
        const done = n < step;
        const active = n === step;
        return (
          <div key={label} className="flex flex-1 items-start">
            <div className="flex w-full flex-col items-center gap-1">
              <div className="flex w-full items-center">
                <span className={cn("h-px flex-1", i === 0 ? "bg-transparent" : n <= step ? "bg-app-text" : "bg-app-border")} />
                <span
                  className={cn(
                    "flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[10px] font-semibold",
                    done && "bg-app-text text-white",
                    active && "border-[1.5px] border-app-text text-app-text",
                    !done && !active && "border-[1.5px] border-app-border text-app-mute",
                  )}
                >
                  {done ? <Check size={11} strokeWidth={3} /> : n}
                </span>
                <span className={cn("h-px flex-1", i === STEPS.length - 1 ? "bg-transparent" : n < step ? "bg-app-text" : "bg-app-border")} />
              </div>
              <span className={cn("text-[10px] font-medium", active ? "text-app-text" : "text-app-mute")}>{label}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}

function Heading({ children }: { children: React.ReactNode }) {
  return <p className="font-serif text-[21px] leading-[1.1] text-app-text">{children}</p>;
}

function Cta({ children }: { children: React.ReactNode }) {
  return (
    <span className="mt-auto flex h-9 shrink-0 items-center justify-center gap-1.5 rounded-app bg-app-text text-[12px] font-semibold text-white">
      {children}
    </span>
  );
}

function DepositNote() {
  return (
    <div className="rounded-app bg-app-success-bg px-2.5 py-2">
      <p className="text-[10px] font-bold tracking-[0.08em] text-app-success uppercase">Deposit</p>
      <p className="text-[12px] leading-snug font-semibold text-app-text">{ON_PROJECT}</p>
    </div>
  );
}

function Summary() {
  return (
    <div className="rounded-app px-2.5 py-2 ring-1 ring-app-border">
      <p className="text-[10px] font-bold tracking-[0.08em] text-app-mute uppercase">Summary</p>
      <p className="text-[12px] font-semibold text-app-text">{SERVICE_LINE}</p>
      <p className="text-[11px] text-app-mute">with {ARTIST.name}</p>
      <p className="text-[11px] text-app-mute tabular-nums">Sat, Nov {PICKED_DAY} · 11:00 AM</p>
    </div>
  );
}

function Field({ label, value, muted }: { label: string; value: string; muted?: boolean }) {
  return (
    <div>
      <p className="mb-1 text-[10px] font-medium text-app-soft">{label}</p>
      <p className={cn("flex h-8 items-center rounded-app px-2.5 text-[12px] ring-1 ring-app-border", muted ? "text-app-mute" : "text-app-text")}>
        {value}
      </p>
    </div>
  );
}

function ArtistStage() {
  return (
    <>
      <Heading>Choose an artist</Heading>
      <div className="flex flex-col gap-1.5">
        {ARTIST_ORDER.map((id) => {
          const a = ARTISTS[id];
          const on = id === ASHA_PROJECT.artist;
          return (
            <div
              key={id}
              className={cn(
                "flex items-center gap-2.5 rounded-app p-2 ring-1",
                on ? "bg-graphite/[0.03] ring-app-text" : "ring-app-border",
              )}
            >
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-graphite/[0.06] text-app-mute">
                <UserRound size={14} strokeWidth={1.5} />
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-[12px] font-semibold text-app-text">{a.name}</p>
                <p className="truncate text-[10px] text-app-mute">
                  {a.guestSpot ? `Guest until ${a.guestSpot.to}` : a.specialties.join(", ")}
                </p>
              </div>
              {on && <Check size={14} strokeWidth={2.5} className="shrink-0 text-app-text" />}
            </div>
          );
        })}
      </div>
      <Cta>Continue</Cta>
    </>
  );
}

function TimeStage() {
  return (
    <>
      <Heading>Pick a time</Heading>
      <div>
        <p className="mb-1.5 text-[11px] font-medium text-app-mute">November</p>
        <div className="grid grid-cols-4 gap-1.5 text-center">
          {DATES.map((d) => (
            <span
              key={d.day}
              className={cn(
                "flex flex-col rounded-app py-1.5 leading-tight",
                d.day === PICKED_DAY ? "bg-app-text text-white" : "bg-graphite/[0.05] text-app-text",
              )}
            >
              <span className="text-[10px] opacity-75">{d.dow}</span>
              <span className="text-[13px] font-semibold tabular-nums">{d.day}</span>
            </span>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-2 gap-1.5">
        {TIMES.map((t, i) => (
          <span
            key={t}
            className={cn(
              "flex h-8 items-center justify-center rounded-app text-[12px] font-semibold tabular-nums",
              i === 0 ? "bg-app-text text-white" : "text-app-text ring-1 ring-app-border",
            )}
          >
            {t}
          </span>
        ))}
      </div>
      <DepositNote />
      <Cta>Continue</Cta>
    </>
  );
}

function DetailsStage() {
  return (
    <>
      <Heading>Your details</Heading>
      <Summary />
      <div className="grid grid-cols-2 gap-1.5">
        <Field label="First name" value="Asha" />
        <Field label="Last name" value="M." />
      </div>
      <Field label="Email" value="On file" muted />
      <Cta>Continue</Cta>
    </>
  );
}

function IntakeStage() {
  return (
    <>
      <Heading>Medical history</Heading>
      <p className="-mt-1.5 text-[10px] leading-snug text-app-mute">Required by {STUDIO_LABEL}. Only staff see it.</p>
      <div className="rounded-app px-2.5 py-2 ring-1 ring-app-border">
        <p className="text-[10px] leading-snug font-medium text-app-soft">Allergies (incl. latex, pigment, prior ink reactions)</p>
        <p className="mt-0.5 text-[12px] font-semibold text-app-text">None</p>
      </div>
      <div className="rounded-app px-2.5 pt-1 pb-1.5 ring-1 ring-app-border">
        <svg viewBox="0 0 160 34" className="h-6 w-auto text-app-text" fill="none" aria-hidden="true">
          <path
            d="M4 24c6-14 12-18 14-12s-4 14 0 12 8-16 12-14-2 12 2 12 6-8 9-8 1 8 5 7 5-9 9-9-1 8 3 8 8-6 12-7m6 5c10-2 26-4 40-3"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <p className="text-[10px] font-medium text-app-success">Signature captured</p>
      </div>
      <DepositNote />
      <Cta>
        <CalendarCheck2 size={13} strokeWidth={2.2} />
        Confirm Sat, Nov {PICKED_DAY}, 11:00
      </Cta>
    </>
  );
}

const STAGES: Record<BookingStep, () => React.ReactNode> = {
  1: ArtistStage,
  2: TimeStage,
  3: DetailsStage,
  4: IntakeStage,
};

export function BookingFlowPhone({ step = 2, label, className }: { step?: BookingStep; label?: string; className?: string }) {
  const Stage = STAGES[step];
  return (
    <AppShellPhone label={label} className={className}>
      <div className="flex h-[440px] flex-col gap-3 px-3.5 pt-3 pb-4 text-left">
        <div>
          <div className="flex items-center justify-between gap-2">
            <p className="text-[10px] text-app-mute">Book with {ARTIST.name}</p>
            <SampleTag className="px-1.5 text-[10px]" />
          </div>
          <p className="truncate text-[13px] font-semibold text-app-text">{SERVICE_LINE}</p>
        </div>
        <StepRail step={step} />
        <Stage />
      </div>
    </AppShellPhone>
  );
}
