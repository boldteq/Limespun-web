import React from "react";
import { Plane, TriangleAlert } from "lucide-react";
import { Toast } from "@/components/system";
import { FeaturePage } from "@/components/templates/feature-page";
import { AppFrame } from "@/components/mockups/app-frame";
import { AppAvatar, AppLabel, AppStatus } from "@/components/mockups/app-parts";
import { CalendarScreen } from "@/components/mockups/calendar";
import { ARTISTS, ARTIST_ORDER, DEPOSITS, usd, type ArtistId } from "@/components/mockups/sample-data";
import { getFeature } from "@/lib/data/features";
import { pageMetadata } from "@/lib/seo";

const feature = getFeature("calendar");

export const metadata = pageMetadata({
  title: feature.seo.title,
  description: feature.seo.description,
  path: "/product/calendar",
  ogImage: "/product/opengraph-image",
});

/* ─── Moment 1: a move onto a taken chair is refused ────────────────────────
   Priya S. (Mara, 1:00) dragged onto Dev at 12:00 lands on Asha M.'s koi session
   (10:00–1:00). The app's move check prints "Clashes with <client> on <chair>".
   The app's toasts rise from the bottom; this one overlaps only the grid's empty
   5–6 PM row and the frame's foot, to the right of the sidebar. On phones the day
   fades out after Priya's 1:00 and the toast sits over the fade. */
function ClashRefused() {
  return (
    <div className="flex flex-col">
      <div className="max-sm:max-h-[450px] max-sm:overflow-hidden max-sm:[mask-image:linear-gradient(to_bottom,#000_calc(100%-90px),transparent)]">
        <CalendarScreen view="day" />
      </div>
      <Toast
        tone="flag"
        icon={<TriangleAlert size={16} strokeWidth={2.2} />}
        title="Clashes with Asha M. on Dev"
        body="Move refused. Priya S. stays with Mara at 1:00."
        className="relative z-10 mx-auto -mt-10 w-[calc(100%-1.5rem)] sm:mr-6 sm:ml-auto sm:w-full"
      />
    </div>
  );
}

/* ─── Moment 2: Owen P.'s booking, before and after the deposit ───────────────
   Requested Wed 7:30 PM, so under the 24-hour default it is still Pending today. */
const OWEN = DEPOSITS.find((d) => d.client === "Owen P." && d.state === "Pending");

function OwenBooking({ paid }: { paid: boolean }) {
  const dev = ARTISTS.dev;
  return (
    <AppFrame active="calendar" sidebar={false} title="Booking" className="shadow-none">
      <div className="flex flex-col gap-3 p-4">
        <div className="flex items-center justify-between gap-3">
          <div className="flex min-w-0 items-center gap-2.5">
            <AppAvatar initials="OP" size="md" />
            <div className="min-w-0">
              <p className="truncate text-ui font-semibold text-app-text">Owen P.</p>
              <p className="truncate text-ui-xs text-app-mute">New piece, calf</p>
            </div>
          </div>
          {paid ? <AppStatus tone="neutral" dot>Confirmed</AppStatus> : <AppStatus tone="warning" dot>Pending</AppStatus>}
        </div>
        <div className="grid grid-cols-2 gap-3 rounded-app bg-graphite/[0.03] p-3">
          <div className="min-w-0">
            <AppLabel>When</AppLabel>
            <p className="mt-1 text-ui-sm font-semibold text-app-text">Sat, Oct 10</p>
            <p className="text-ui-xs text-app-mute">1:00–4:00 PM · {dev.name}</p>
          </div>
          <div className="min-w-0">
            <AppLabel>Deposit</AppLabel>
            <p className="mt-1 text-ui-sm font-semibold text-app-text tabular-nums">{usd(OWEN?.cents ?? 0)}</p>
            <p className={paid ? "text-ui-xs font-semibold text-app-success" : "text-ui-xs text-app-warning"}>
              {paid ? "Paid" : `Requested ${OWEN?.requestedAt ?? ""}`}
            </p>
          </div>
        </div>
      </div>
    </AppFrame>
  );
}

/* ─── Moment 3: Friday, Oct 9. Dev is off, Mara has a break, Rio's walk-ins ───
   Mirrors the day grid: the chair header prints "Time off" (ScrCalendar
   chairDayLineText), a break is hatched, a walk-in hold is dashed. */
const FRIDAY: Record<ArtistId, { line: string; block?: { from: number; to: number; kind: "break" | "hold"; label: string } }> = {
  dev: { line: "Time off" },
  mara: { line: "11 AM–6 PM", block: { from: 13 * 60, to: 14 * 60, kind: "break", label: "Break" } },
  rio: { line: "12 PM–5 PM", block: { from: 12 * 60, to: 17 * 60, kind: "hold", label: "Walk-in hold" } },
};
const FRI_START = 10 * 60;
const FRI_END = 18 * 60;
const FRI_HOURS = [10, 11, 12, 13, 14, 15, 16, 17];
const pct = (min: number) => `${((min - FRI_START) / (FRI_END - FRI_START)) * 100}%`;

function FridayTimeOff() {
  return (
    <AppFrame active="calendar" sidebar={false} title="Calendar" meta="Friday, October 9" className="shadow-none">
      <div className="m-4 overflow-hidden rounded-app-lg ring-1 ring-app-border">
        <div className="grid grid-cols-[40px_repeat(3,minmax(0,1fr))] border-b border-app-border">
          <span />
          {ARTIST_ORDER.map((id) => (
            <div key={id} className="min-w-0 border-l border-app-border px-2 py-2">
              <div className="flex items-center gap-1.5">
                <AppAvatar initials={ARTISTS[id].initials} tone={ARTISTS[id].tone} size="xs" />
                <span className="truncate text-ui-sm font-semibold text-app-text">{ARTISTS[id].name}</span>
              </div>
              <p className={FRIDAY[id].line === "Time off" ? "mt-1 text-ui-xs font-semibold text-app-active-fg" : "mt-1 truncate text-ui-xs text-app-mute"}>
                {FRIDAY[id].line}
              </p>
            </div>
          ))}
        </div>
        <div className="relative grid h-[248px] grid-cols-[40px_repeat(3,minmax(0,1fr))]">
          <div className="relative">
            {FRI_HOURS.slice(1).map((h) => (
              <span
                key={h}
                className="absolute right-1 -translate-y-1/2 text-[10px] text-app-mute tabular-nums"
                style={{ top: pct(h * 60) }}
              >
                {h % 12 === 0 ? 12 : h % 12} {h < 12 ? "AM" : "PM"}
              </span>
            ))}
          </div>
          {ARTIST_ORDER.map((id) => {
            const day = FRIDAY[id];
            return (
              <div
                key={id}
                className="relative border-l border-app-border bg-[repeating-linear-gradient(to_bottom,transparent_0,transparent_30px,var(--color-app-border)_30px,var(--color-app-border)_31px)]"
              >
                {day.line === "Time off" && (
                  <span className="absolute inset-x-1 top-2 inline-flex items-center justify-center gap-1 rounded-full bg-app-active-fg px-1.5 py-1 text-[10px] font-bold whitespace-nowrap text-white @md:inset-x-1.5 @md:px-2">
                    <Plane size={11} strokeWidth={2.2} className="hidden shrink-0 @md:block" />
                    Time off
                  </span>
                )}
                {day.block && (
                  <div
                    className={
                      day.block.kind === "break"
                        ? "absolute inset-x-1 rounded-app bg-[repeating-linear-gradient(135deg,rgb(107_101_96/0.14)_0,rgb(107_101_96/0.14)_4px,transparent_4px,transparent_8px)] px-1.5 py-1 ring-1 ring-app-mute/25 ring-inset"
                        : "absolute inset-x-1 rounded-app border border-dashed border-app-mute/45 bg-graphite/[0.03] px-1.5 py-1"
                    }
                    style={{ top: pct(day.block.from), height: `calc(${pct(day.block.to)} - ${pct(day.block.from)})` }}
                  >
                    <p className="truncate text-[10px] font-semibold text-app-soft">{day.block.label}</p>
                    {day.block.kind === "hold" && <p className="truncate text-[10px] text-app-mute">Guest day · 3 slots</p>}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </AppFrame>
  );
}

export default function CalendarPage() {
  return (
    <FeaturePage
      feature={feature}
      headings={{
        moments: "Moves, deposits and time off",
        details: "What else it does",
        worksWith: "Joined to deposits and projects",
        worksWithLead: "A booking carries its deposit and its place in the project, so none of it is typed twice.",
      }}
      visuals={{
        hero: (
          <>
            {/* The week needs room; on a phone the same days read as the Agenda list, cropped to today */}
            <CalendarScreen view="agenda" className="sm:hidden" />
            <CalendarScreen view="week" className="hidden sm:flex" />
          </>
        ),
        heroCrop: true,
        moments: [
          <ClashRefused key="clash" />,
          { before: <OwenBooking paid={false} />, after: <OwenBooking paid />, beforeLabel: "Deposit requested", afterLabel: "Deposit paid" },
          <FridayTimeOff key="off" />,
        ],
        detailLabels: [
          { label: "Agenda", tone: "quiet" },
          { label: "New booking", tone: "quiet" },
          { label: "Red ink allergy", tone: "danger" },
          { label: "Resolve", tone: "warning" },
          { label: "10:40", tone: "ember" },
          { label: "Export", tone: "quiet" },
        ],
      }}
      planRows={[
        { label: "Day, Week, Month and Agenda", from: "solo" },
        { label: "Allergy flags, now line, .ics export", from: "solo" },
        { label: "Every artist on one calendar", from: "studio" },
        { label: "Clash checks before anything double-books", from: "studio" },
        { label: "Guest artists on their own dates", from: "pro" },
        { label: "Roles decide who sees every booking", from: "pro" },
      ]}
      inkBand={{ headline: "Every chair, one calendar.", italicWord: "calendar" }}
    />
  );
}
