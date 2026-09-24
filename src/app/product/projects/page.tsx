import React from "react";
import { FeaturePage } from "@/components/templates/feature-page";
import {
  AppAvatar,
  AppFrame,
  AppLabel,
  AppProjectStatus,
  AppStatus,
  ARTISTS,
  ASHA_PROJECT,
  ClientPortalPhone,
  PhotoTile,
  PROJECTS,
  ProjectsScreen,
  ToolbarSegmented,
  usd,
} from "@/components/mockups";
import { cn } from "@/components/system";
import { getFeature } from "@/lib/data/features";
import { pageMetadata } from "@/lib/seo";

const feature = getFeature("projects");

export const metadata = pageMetadata({
  title: feature.seo.title,
  description: feature.seo.description,
  path: "/product/projects",
});

/* ─── Hero on phones: the Gallery's first cards ─────────────────────────────
   In a phone-width frame the Projects screen's KPI strip fills the whole crop, so
   phones get the same screen's head, view switch and first three project cards
   (progress, status, the deposit pill as ProjectsScreen draws them). */
const PHONE_PROJECTS = PROJECTS.filter((p) => p.pool.availableCents > 0 && p.status === "active");

function ProjectsPhoneHero() {
  return (
    <AppFrame active="projects" greeting="Multi-session work" meta="Sleeves, back pieces, and the long commitments." className="sm:hidden">
      <div className="flex flex-col gap-3 px-4 pb-5">
        <ToolbarSegmented options={["Gallery", "Board", "List"]} active="Gallery" className="self-start" />
        {PHONE_PROJECTS.map((p) => {
          const done = p.sessions.filter((x) => x.state === "done").length;
          const pct = Math.round((done / p.sessions.length) * 100);
          const artist = ARTISTS[p.artist];
          return (
            <div key={p.id} className="flex flex-col gap-2 rounded-app-lg bg-app-surface p-3 ring-1 ring-app-border">
              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0">
                  <span className="block font-serif text-[13px] leading-tight text-app-mute italic">{p.client}</span>
                  <span className="block truncate text-ui font-semibold text-app-text">{p.title}</span>
                </div>
                <AppAvatar initials={artist.initials} tone={artist.tone} size="sm" />
              </div>
              <div>
                <div className="h-0.5 overflow-hidden rounded-full bg-graphite/[0.07]">
                  <div className="h-full bg-app-active-fg" style={{ width: `${pct}%` }} />
                </div>
                <span className="mt-1.5 block text-ui-xs text-app-mute tabular-nums">
                  {done}/{p.sessions.length} sessions
                </span>
              </div>
              <div className="flex flex-wrap items-center justify-between gap-1.5">
                <AppProjectStatus status={p.status} />
                <AppStatus tone="success">{usd(p.pool.availableCents)} in pool</AppStatus>
              </div>
            </div>
          );
        })}
      </div>
    </AppFrame>
  );
}

/* ─── Moment 1: Asha M.'s koi sleeve, one project with one pool ─────────────
   The project screen: five sessions, each drawing on one pool. It fades out under
   the sessions (under the KPI strip on phones), which already carry the pool
   balance ("$240 of $300 paid in"); moment 2 opens the pool itself. */
function AshaProject() {
  return (
    <div className="max-h-[470px] overflow-hidden [mask-image:linear-gradient(to_bottom,#000_calc(100%-90px),transparent)] sm:max-h-[780px] sm:[mask-image:linear-gradient(to_bottom,#000_calc(100%-140px),transparent)]">
      <ProjectsScreen view="detail" />
    </div>
  );
}

/* ─── Moment 2: the same pool, in the studio and in Asha's portal ────────────
   $300 paid in on ASHA_PROJECT.poolPaidOn (Thu, Jun 4, before session 1); $60
   applied to session 3 on Thu, Sep 10; $240 left for sessions 4 and 5. The studio card mirrors the project's Deposit pool card
   (Paid in · Applied · Available · Refundable and its ledger, projects.tsx); the
   portal prints the same pool as In · Applied · Forfeited · Available. Narrow
   stages keep the portal: it's the client's side of the story. */
const POOL = ASHA_PROJECT.pool;
const S3 = ASHA_PROJECT.sessions.find((s) => s.n === 3);
const POOL_LEDGER = [
  { label: "Deposit paid", when: ASHA_PROJECT.poolPaidOn ?? "", cents: POOL.paidInCents },
  { label: `Applied to S${S3?.n ?? 3}`, when: S3?.date ?? "", cents: -(S3?.appliedCents ?? 0) },
];

function StudioPool() {
  const figures: [string, number, boolean?][] = [
    ["Paid in", POOL.paidInCents],
    ["Applied", POOL.appliedCents],
    ["Available", POOL.availableCents, true],
    ["Refundable", POOL.refundableCents],
  ];
  return (
    <AppFrame active="projects" sidebar={false} title={ASHA_PROJECT.title} meta={ASHA_PROJECT.client} className="shadow-none">
      <div className="p-4">
        <div className="flex items-center justify-between gap-2">
          <span className="text-ui font-semibold text-app-text">Deposit pool</span>
          <AppStatus tone="success">{usd(POOL.availableCents)} in pool</AppStatus>
        </div>
        <div className="mt-3 grid grid-cols-2 gap-x-3 gap-y-3">
          {figures.map(([label, cents, strong]) => (
            <div key={label} className="flex flex-col gap-0.5">
              <AppLabel>{label}</AppLabel>
              <span className={cn("text-[18px] leading-tight font-extrabold tabular-nums", strong ? "text-app-success" : "text-app-text")}>
                {usd(cents)}
              </span>
            </div>
          ))}
        </div>
        <div className="mt-3.5 flex flex-col border-t border-app-border pt-2.5">
          {POOL_LEDGER.map((row) => (
            <div key={row.label} className="flex items-center justify-between gap-2 py-1 text-ui-sm">
              <span className="min-w-0 truncate text-app-text">
                {row.label}
                <span className="text-app-mute"> · {row.when}</span>
              </span>
              <span className={cn("shrink-0 font-semibold tabular-nums", row.cents > 0 ? "text-app-success" : "text-app-text")}>
                {row.cents > 0 ? "+" : ""}
                {usd(row.cents)}
              </span>
            </div>
          ))}
        </div>
      </div>
    </AppFrame>
  );
}

function PoolBothSides() {
  return (
    <div className="flex items-center justify-center gap-8">
      <div className="hidden w-full max-w-[290px] min-w-0 @xl:block">
        <StudioPool />
      </div>
      <ClientPortalPhone view="project" />
    </div>
  );
}

/* ─── Moment 3: Owen P.'s panther, Healing then Complete ─────────────────────
   One session, Sat, Aug 15. While it heals the photo timeline holds an empty
   "S1 Healed" slot that reads "Healed photo due" with a rust dot
   (components/projects/PhotoProgressionTimeline.tsx); once the healed photo is
   in, the project completes. Both states are before today. */
const PANTHER = PROJECTS.find((p) => p.id === "owen-panther");
const PANTHER_S1 = PANTHER?.sessions[0];

function PantherProject({ complete }: { complete: boolean }) {
  return (
    <AppFrame active="projects" sidebar={false} title="Projects" meta={PANTHER?.title} className="shadow-none">
      <div className="flex flex-col gap-3 p-4">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <span className="block font-serif text-[13px] leading-tight text-app-mute italic">{PANTHER?.client}</span>
            <span className="block truncate text-ui font-semibold text-app-text">{PANTHER?.title}</span>
          </div>
          <AppProjectStatus status={complete ? "completed" : "healing"} />
        </div>
        <p className="text-ui-xs text-app-mute">
          1 of 1 sessions · {PANTHER_S1?.date} · {PANTHER?.placement}
        </p>
        <div className="flex flex-col gap-1.5">
          <AppLabel>Photos</AppLabel>
          <div className="grid max-w-[272px] grid-cols-2 gap-2">
            <PhotoTile label="S1" caption="S1 Fresh" aspect="landscape" />
            {complete ? (
              <PhotoTile label="S1" caption="S1 Healed" aspect="landscape" />
            ) : (
              <div className="flex aspect-[4/3] flex-col items-center justify-center gap-1.5 rounded-app border border-dashed border-app-border px-2 text-center">
                <span className="h-2 w-2 rounded-full bg-app-active-fg" />
                <span className="text-[10px] leading-tight text-app-soft">Healed photo due</span>
              </div>
            )}
          </div>
        </div>
        <AppStatus tone="success" className="self-start">
          Paid in full
        </AppStatus>
      </div>
    </AppFrame>
  );
}

export default function ProjectsPage() {
  return (
    <FeaturePage
      feature={feature}
      headings={{
        moments: "From one deposit to the healed photo",
        details: "What else it does",
        worksWith: "Joined to deposits and client records",
        worksWithLead: "The project deposit is paid once, and the whole piece sits on the client’s record.",
      }}
      visuals={{
        hero: (
          <>
            <ProjectsPhoneHero />
            <ProjectsScreen view="gallery" className="hidden sm:flex" />
          </>
        ),
        heroCrop: true,
        moments: [
          <AshaProject key="project" />,
          <PoolBothSides key="pool" />,
          {
            before: <PantherProject complete={false} />,
            after: <PantherProject complete />,
            beforeLabel: "Healing",
            afterLabel: "Complete",
          },
        ],
        detailLabels: [
          { label: "Healing", tone: "info" },
          { label: "Board", tone: "quiet" },
          { label: "In deposit pools", tone: "quiet" },
          { label: "Active", tone: "ember" },
          { label: "Healed photo due", tone: "warning" },
          { label: "Moodboard", tone: "quiet" },
        ],
      }}
      planRows={[
        { label: "Projects with a deposit pool", from: "solo" },
        { label: "Client portal with Applied and Available", from: "solo" },
        { label: "Gallery, Board and List views", from: "solo" },
        { label: "Healed photo reminders", from: "solo" },
        { label: "Every artist’s projects on one board", from: "studio" },
        { label: "White-label client portal", from: "pro" },
      ]}
      inkBand={{ headline: "Book the next session before they leave.", italicWord: "next" }}
    />
  );
}
