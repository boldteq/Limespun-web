import React from "react";
import { Check } from "lucide-react";
import { SampleTag, cn } from "@/components/system";
import { AppAvatar } from "@/components/mockups/app-parts";
import {
  ARTISTS,
  ASHA_PROJECT,
  DEPOSITS,
  ELENA_ALLERGY,
  IN_DEPOSIT_POOLS_CENTS,
  PROJECTS,
  SEGMENTS,
  usd,
} from "@/components/mockups/sample-data";

/*
 * The count check from step two of a move: what the old tool holds against what landed in
 * Limespun, then records to open and check. It's the sheet our team and the studio go through
 * before the switch, not an app screen, so it uses the site's surfaces rather than app chrome.
 * Decorative (aria-hidden) and always the sample studio.
 *
 * Clients and deposits read the sample studio's own figures ("All clients" 412; deposits held
 * $750 = $600 in project deposit pools + Kira N.'s $150 held against a single booking). Upcoming
 * bookings and signed forms aren't in sample-data.ts yet, so their sample figures sit here.
 */
const SAMPLE_UPCOMING_BOOKINGS = 58;
const SAMPLE_SIGNED_FORMS = 836;

const ALL_CLIENTS = SEGMENTS.find((s) => s.label === "All clients")?.clients ?? 0;

/** Every deposit the studio holds: the project pools, plus held deposits on clients without a pool (Kira N.). */
const POOLED_CLIENTS = new Set(PROJECTS.filter((p) => p.pool.availableCents > 0).map((p) => p.client));
const DEPOSITS_HELD_CENTS =
  IN_DEPOSIT_POOLS_CENTS +
  DEPOSITS.filter((d) => d.state === "Held" && !POOLED_CLIENTS.has(d.client)).reduce((total, d) => total + d.cents, 0);
const JO = PROJECTS.find((p) => p.id === "jo-florals");
const ASHA_NEXT = ASHA_PROJECT.sessions.find((s) => s.state === "booked");

/** `short` is the label in the narrowest frames (phones under ~375px). */
const COUNTS: { label: string; short?: string; value: string }[] = [
  { label: "Clients", value: ALL_CLIENTS.toLocaleString("en-US") },
  { label: "Upcoming bookings", short: "Bookings ahead", value: String(SAMPLE_UPCOMING_BOOKINGS) },
  { label: "Deposits held", value: usd(DEPOSITS_HELD_CENTS) },
  { label: "Signed consent forms", short: "Signed forms", value: SAMPLE_SIGNED_FORMS.toLocaleString("en-US") },
];

const SPOT_CHECKS: { initials: string; name: string; detail: string }[] = [
  {
    initials: "AM",
    name: ASHA_PROJECT.client,
    detail: `${ASHA_PROJECT.title} · ${usd(ASHA_PROJECT.pool.availableCents)} in the deposit pool · session 5 ${ASHA_NEXT?.date ?? ""}`,
  },
  { initials: "ER", name: ELENA_ALLERGY.client, detail: `${ELENA_ALLERGY.flag} on the record · consent PDFs on file` },
  {
    initials: "JK",
    name: JO?.client ?? "Jo K.",
    detail: `Consult today, 11:00 with ${ARTISTS.mara.name} · ${usd(JO?.pool.paidInCents ?? 0)} deposit`,
  },
];

function Tick({ className }: { className?: string }) {
  return (
    <span className={cn("inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-paid-soft text-paid", className)}>
      <Check size={12} strokeWidth={3} />
    </span>
  );
}

export function CountCheck({ className }: { className?: string }) {
  const cols =
    "grid grid-cols-[minmax(0,1fr)_2.75rem_3.25rem_1.25rem] items-center gap-x-2 @2xs:grid-cols-[minmax(0,1fr)_4rem_4.25rem_1.25rem] @2xs:gap-x-3 @md:grid-cols-[minmax(0,1fr)_6rem_6rem_1.25rem]";
  return (
    <div
      aria-hidden="true"
      className={cn(
        "@container overflow-hidden rounded-[16px] bg-white text-left shadow-[var(--shadow-lift)] ring-1 ring-graphite/5",
        className,
      )}
    >
      <div className="border-b border-hair px-4 py-3.5 @md:px-6 @md:py-4">
        <div className="flex items-center justify-between gap-3">
          <p className="text-[15px] font-semibold text-graphite @md:text-[16px]">Count check</p>
          <SampleTag />
        </div>
        <p className="mt-0.5 text-[12px] text-mute @md:text-[13px]">Your old tool against Limespun, before you switch</p>
      </div>

      <div className="grid @3xl:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)]">
        <div className="px-4 pt-2 pb-1 @md:px-6 @md:pt-3 @md:pb-2">
          <div className={cn(cols, "py-2 text-[10px] font-semibold tracking-[0.06em] whitespace-nowrap text-mute uppercase @2xs:text-[11px] @md:text-[12px]")}>
            <span />
            <span className="text-right">
              Old<span className="hidden @2xs:inline"> tool</span>
            </span>
            <span className="text-right">
              <span className="@2xs:hidden">New</span>
              <span className="hidden @2xs:inline">Limespun</span>
            </span>
            <span />
          </div>
          {COUNTS.map((c) => (
            <div key={c.label} className={cn(cols, "border-t border-hair py-2.5 @md:py-3")}>
              <span className="min-w-0 text-[13px] leading-snug text-graphite @md:text-[15px]">
                {c.short ? (
                  <>
                    <span className="@2xs:hidden">{c.short}</span>
                    <span className="hidden @2xs:inline">{c.label}</span>
                  </>
                ) : (
                  c.label
                )}
              </span>
              <span className="text-right text-[13px] text-graphite-soft tabular-nums @md:text-[15px]">{c.value}</span>
              <span className="text-right text-[13px] font-semibold text-graphite tabular-nums @md:text-[15px]">{c.value}</span>
              <Tick />
            </div>
          ))}
        </div>

        <div className="hidden border-l border-hair bg-canvas/60 px-6 pt-4 pb-5 @3xl:block">
          <p className="text-[12px] font-semibold tracking-[0.06em] text-mute uppercase">Spot checks</p>
          <ul className="mt-2">
            {SPOT_CHECKS.map((s) => (
              <li key={s.name} className="flex items-center gap-3 border-t border-hair py-3 first:border-t-0">
                <AppAvatar initials={s.initials} size="md" />
                <span className="min-w-0 flex-1">
                  <span className="block text-[14px] font-semibold text-graphite">{s.name}</span>
                  <span className="block text-[13px] leading-snug text-mute">{s.detail}</span>
                </span>
                <Tick />
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="flex items-center gap-2 border-t border-hair bg-canvas/60 px-4 py-3 text-[12px] text-graphite-soft @md:px-6 @md:text-[13px]">
        <Tick />
        Every count matches. Point your booking link at Limespun when you’re ready.
      </div>
    </div>
  );
}
