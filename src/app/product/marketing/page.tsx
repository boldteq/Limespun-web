import React from "react";
import { Send } from "lucide-react";
import { cn } from "@/components/system";
import { FeaturePage } from "@/components/templates/feature-page";
import { AppFrame } from "@/components/mockups/app-frame";
import { AppAvatar, AppButton, AppStatus, type AppStatusTone } from "@/components/mockups/app-parts";
import { MarketingScreen } from "@/components/mockups/marketing";
import { ToolbarPill } from "@/components/mockups/projects";
import { ARTISTS, CAMPAIGNS, REFERRAL, SEGMENTS, WAITLIST, type WaitlistEntry } from "@/components/mockups/sample-data";
import { getFeature } from "@/lib/data/features";
import { PLAN_CAPS, PLANS } from "@/lib/data/plans";
import { pageMetadata } from "@/lib/seo";

const feature = getFeature("marketing");

export const metadata = pageMetadata({
  title: feature.seo.title,
  description: feature.seo.description,
  path: "/product/marketing",
});

/*
 * Marketing (app: /marketing?tab=, marketing/_components/*):
 *   hero      the Campaigns tab: open rate and bookings driven over 30 days, list hygiene,
 *             recent campaigns
 *   moment 1  the campaign editor (components/marketing/CampaignEditor.tsx and its four
 *             sections) on the "Openings this month" draft to Inactive 90 days
 *   moment 2  the Audience tab: preset segments and the custom "Healed, not rebooked" one
 *   moment 3  the waitlist before and after Leo B.'s Friday slot frees up: Nadia H. is offered it
 */

/**
 * A tall screen shows its top and fades into the stage: on phones so the moments swipe at
 * one height, and from sm for the Audience tab, which stops after its segments.
 */
const CROP = {
  phone: "max-sm:max-h-[636px] max-sm:overflow-hidden max-sm:[mask-image:linear-gradient(to_bottom,#000_calc(100%-90px),transparent)]",
  all: "max-h-[636px] overflow-hidden [mask-image:linear-gradient(to_bottom,#000_calc(100%-90px),transparent)] sm:max-h-[700px]",
} as const;

function Crop({ all = false, children }: { all?: boolean; children: React.ReactNode }) {
  return <div className={all ? CROP.all : CROP.phone}>{children}</div>;
}

/* ─── Moment 1: the campaign editor ─────────────────────────────────────────── */

const DRAFT = CAMPAIGNS.find((c) => c.status === "Draft") ?? CAMPAIGNS[0];
const DRAFT_SEGMENT = SEGMENTS.find((s) => s.label === DRAFT.audience);
/** Mon, Oct 12 (Thu Oct 8 + 4). The editor's button reads "Schedule for <Mon D>". */
const SEND_AT = { day: "Mon, Oct 12", time: "10:00 AM", short: "Oct 12" } as const;

/** The editor's numbered section heads: an onyx number disc and an uppercase title. */
function SectionHead({ n, title, aside }: { n: number; title: string; aside?: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between gap-3">
      <span className="flex items-center gap-2">
        <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-app-text text-[10px] font-semibold text-white tabular-nums">
          {n}
        </span>
        <span className="text-ui-sm font-semibold tracking-[0.08em] text-app-text uppercase">{title}</span>
      </span>
      {aside}
    </div>
  );
}

function Input({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex min-w-0 flex-col gap-1.5">
      <span className="text-ui-sm font-medium text-app-text">{label}</span>
      <span className="flex h-9 min-w-0 items-center rounded-app border border-app-border bg-app-surface px-2.5 text-ui-sm text-app-text">
        <span className="truncate">{children}</span>
      </span>
    </div>
  );
}

function Radio({ on, children }: { on: boolean; children: React.ReactNode }) {
  return (
    <span className="flex items-center gap-2 text-ui-sm text-app-text">
      <span
        className={cn(
          "flex h-4 w-4 shrink-0 items-center justify-center rounded-full border",
          on ? "border-app-text" : "border-app-border",
        )}
      >
        {on && <span className="h-2 w-2 rounded-full bg-app-text" />}
      </span>
      {children}
    </span>
  );
}

const EMAIL_BODY = `, it’s been a while. ${ARTISTS.mara.name} and ${ARTISTS.dev.name} have a few openings this month. Reply to this email and we’ll hold one for you.`;

function MergeTag({ children }: { children: React.ReactNode }) {
  return <span className="rounded-[4px] bg-app-active px-1 font-mono text-[11px] text-app-active-fg">{children}</span>;
}

function CampaignEditor() {
  return (
    <AppFrame active="marketing" sidebar={false} title="Edit campaign" className="shadow-none">
      <div className="flex flex-col divide-y divide-app-border">
        <div className="flex flex-col gap-3 px-4 py-3.5">
          <SectionHead
            n={1}
            title="Details"
            aside={
              <span className="flex items-center gap-2 text-ui-xs text-app-mute">
                Channel:
                <span className="rounded-full border border-app-border px-2 py-0.5 font-semibold text-app-text">Email</span>
              </span>
            }
          />
          <Input label="Campaign name *">{DRAFT.name}</Input>
        </div>

        <div className="flex flex-col gap-3 px-4 py-3.5">
          <SectionHead
            n={2}
            title="Audience"
            aside={
              <span className="text-ui-xs text-app-mute">
                Sending to <span className="font-semibold text-app-text tabular-nums">{DRAFT_SEGMENT?.clients ?? DRAFT.recipients}</span>{" "}
                recipients
              </span>
            }
          />
          <div className="flex flex-wrap gap-1.5">
            {SEGMENTS.map((s, i) => (
              <span key={s.label} className={cn(i >= 3 && "hidden @xl:contents")}>
                <ToolbarPill active={s.label === DRAFT.audience}>{s.label}</ToolbarPill>
              </span>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-3 px-4 py-3.5">
          <SectionHead n={3} title="Template" />
          <Input label="Email subject">A few openings this month, &#123;first_name&#125;</Input>
          <div className="flex flex-col gap-1.5">
            <span className="flex items-center justify-between gap-2">
              <span className="text-ui-sm font-medium text-app-text">Email body</span>
              <AppButton icon={Send} className="h-7">
                Send test to me
              </AppButton>
            </span>
            <p className="rounded-app border border-app-border bg-app-surface px-3 py-2.5 text-ui-sm leading-relaxed text-app-text">
              Hi <MergeTag>&#123;first_name&#125;</MergeTag>
              {EMAIL_BODY}
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-3 px-4 py-3.5">
          <SectionHead n={4} title="Schedule" />
          <div className="grid gap-3 @lg:grid-cols-[auto_minmax(0,1fr)] @lg:items-end @lg:gap-6">
            <div className="flex flex-wrap gap-x-5 gap-y-2 @lg:flex-col @lg:pb-0.5">
              <Radio on={false}>Send now</Radio>
              <Radio on>Schedule for later</Radio>
            </div>
            <Input label="Send at">
              {SEND_AT.day}, {SEND_AT.time}
            </Input>
          </div>
        </div>

        <div className="flex justify-end gap-2 px-4 py-3">
          <AppButton>Cancel</AppButton>
          <AppButton variant="primary">Schedule for {SEND_AT.short}</AppButton>
        </div>
      </div>
    </AppFrame>
  );
}

/* ─── Moment 3: the waitlist, before and after the offer ────────────────────── */

const NADIA = WAITLIST.find((w) => w.status === "Offered");
const WAITLIST_TONE: Record<WaitlistEntry["status"], AppStatusTone> = {
  Active: "neutral",
  Offered: "warning",
  Booked: "success",
  Expired: "neutral",
  Cancelled: "neutral",
};

function WaitlistCard({ offered }: { offered: boolean }) {
  const rows = WAITLIST.map((w) => (w === NADIA && !offered ? { ...w, status: "Active" as const } : w));
  return (
    <AppFrame active="waitlist" sidebar={false} title="Waitlist" className="shadow-none">
      {rows.map((w, i) => {
        const artist = ARTISTS[w.artist];
        const isOffer = w.status === "Offered";
        return (
          <div
            key={w.client}
            className={cn("flex items-start gap-3 px-4 py-3", i < rows.length - 1 && "border-b border-app-border", isOffer && "bg-app-sidebar")}
          >
            <AppAvatar initials={w.client.replace(/[^A-Z]/g, "")} size="md" />
            <div className="min-w-0 flex-1">
              <span className="flex flex-wrap items-center gap-1.5">
                <span className="text-ui font-semibold text-app-text">{w.client}</span>
                <AppStatus tone={WAITLIST_TONE[w.status]} dot>
                  {w.status}
                </AppStatus>
              </span>
              <span className="mt-0.5 block text-ui-sm text-app-mute">
                {w.wants} with {artist.name} · {w.when}
              </span>
              {isOffer && <span className="mt-0.5 block text-ui-xs font-medium text-app-warning">{w.note}</span>}
            </div>
          </div>
        );
      })}
    </AppFrame>
  );
}

/* ─── Plan facts ────────────────────────────────────────────────────────────── */

const TEXTS = PLAN_CAPS.find((c) => c.label === "Texts a month")?.values;

export default function MarketingPage() {
  return (
    <FeaturePage
      feature={feature}
      headings={{
        moments: "Campaigns, segments and the waitlist",
        details: "What else Marketing does",
        worksWith: "Joined to Messages and client records",
        worksWithLead: "Campaigns go to the clients already on file, and a client who replies lands back in Messages.",
      }}
      visuals={{
        hero: <MarketingScreen tab="campaigns" />,
        heroCrop: true,
        moments: [
          <Crop key="editor">
            <CampaignEditor />
          </Crop>,
          <Crop key="audience" all>
            <MarketingScreen tab="audience" />
          </Crop>,
          {
            before: <WaitlistCard offered={false} />,
            after: <WaitlistCard offered />,
            beforeLabel: "Friday 11:00 opens up",
            afterLabel: `Offered to ${NADIA?.client ?? "the next client"}`,
          },
        ],
        detailLabels: [
          { label: "Campaigns", tone: "quiet" },
          { label: "Offered", tone: "warning" },
          { label: "Auto-promote", tone: "quiet" },
          { label: REFERRAL.referrerReward, tone: "success" },
          { label: "Review & remove", tone: "ember" },
          { label: "Texts a month", tone: "quiet" },
        ],
      }}
      planRows={[
        { label: "Campaigns to segments of your clients", from: "solo" },
        { label: "Waitlist and referral program", from: "solo" },
        ...PLANS.map((p) => ({ label: `${TEXTS?.[p.tier] ?? ""} texts a month`, from: p.tier })),
      ]}
      inkBand={{ headline: "Quiet weeks, filled from your list.", italicWord: "list" }}
    />
  );
}
