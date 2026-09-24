import { AlertCircle, ChevronDown, Gift, Mail, MessageSquare, Plus, Users } from "lucide-react";
import { cn } from "@/components/system/cn";
import { AppFrame } from "./app-frame";
import { AppAvatar, AppButton, AppCard, AppKpi, AppKpiStrip, AppLabel, AppStatus, AppTabs, type AppStatusTone } from "./app-parts";
import { ToolbarPill } from "./projects";
import { ARTISTS, CAMPAIGNS, REFERRAL, SEGMENTS, usd, WAITLIST, type Campaign, type WaitlistEntry } from "./sample-data";

export type MarketingTab = "audience" | "campaigns" | "waitlist" | "referral";

const TAB_LABEL: Record<MarketingTab, string> = {
  audience: "Audience",
  campaigns: "Campaigns",
  waitlist: "Waitlist",
  referral: "Referral program",
};

/**
 * Opens per sent campaign, and the custom segment behind "Healed, not rebooked"
 * (built from the app's audience conditions: Has tag + No visit in (days)).
 */
const OPENS: Record<string, number> = { "Healed, not rebooked": 34 };
const HEALED_SEGMENT = { label: "Healed, not rebooked", rules: ["Has tag: Healed", "No visit in 42 days"] };

/** The last 30 days run from Wed, Sep 9; only sent campaigns count. */
const SENT = CAMPAIGNS.filter((c) => c.status === "Sent");
const SENT_RECIPIENTS = SENT.reduce((total, c) => total + c.recipients, 0);
const SENT_OPENS = SENT.reduce((total, c) => total + (OPENS[c.name] ?? 0), 0);
const OPEN_RATE = ((SENT_OPENS / SENT_RECIPIENTS) * 100).toFixed(1);
const BOOKINGS_DRIVEN = SENT.reduce((total, c) => total + (c.booked ?? 0), 0);
const HEALED_CAMPAIGN = CAMPAIGNS.find((c) => c.name === HEALED_SEGMENT.label);

/**
 * List hygiene over the same 30 days (MarketingKPIs.tsx, the third tile):
 * suppressions waiting for review after the "Healed, not rebooked" send.
 */
const HYGIENE = [
  { label: "Bounces", count: 2 },
  { label: "Unsubscribes", count: 1 },
  { label: "Complaints", count: 0 },
] as const;
const HYGIENE_ISSUES = HYGIENE.reduce((total, h) => total + h.count, 0);

const CAMPAIGN_TONE: Record<Campaign["status"], AppStatusTone> = { Sent: "success", Scheduled: "info", Draft: "neutral" };
const WAITLIST_TONE: Record<WaitlistEntry["status"], AppStatusTone> = {
  Active: "neutral",
  Offered: "warning",
  Booked: "success",
  Expired: "neutral",
  Cancelled: "neutral",
};

function ChannelIcon({ channel }: { channel: Campaign["channel"] }) {
  const Icon = channel === "Email" ? Mail : MessageSquare;
  return (
    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-app bg-graphite/[0.05] text-app-soft">
      <Icon size={14} strokeWidth={1.9} />
    </span>
  );
}

function CampaignList({ limit }: { limit?: number }) {
  const rows = limit ? CAMPAIGNS.slice(0, limit) : CAMPAIGNS;
  return (
    <AppCard
      title="Recent campaigns"
      meta={<span className="hidden @min-[19rem]:inline">{CAMPAIGNS.length} campaigns</span>}
      padded={false}
    >
      {rows.map((c, i) => (
        <div key={c.name} className={cn("flex items-center gap-3 px-4 py-3", i < rows.length - 1 && "border-b border-app-border")}>
          <ChannelIcon channel={c.channel} />
          <div className="min-w-0 flex-1">
            <span className="flex flex-wrap items-center gap-1.5">
              <span className="truncate text-ui font-semibold text-app-text">{c.name}</span>
              <AppStatus tone={CAMPAIGN_TONE[c.status]} dot>
                {c.status}
              </AppStatus>
            </span>
            <span className="mt-0.5 block text-ui-sm text-app-mute">
              {c.channel} · {c.audience} · {c.recipients.toLocaleString("en-US")} clients
              {c.when !== "—" ? ` · ${c.when}` : ""}
            </span>
          </div>
          <div className="hidden shrink-0 grid-cols-3 gap-5 text-right @xl:grid">
            {[
              ["Recipients", c.status === "Sent" ? c.recipients.toLocaleString("en-US") : "—"],
              ["Open rate", OPENS[c.name] ? `${((OPENS[c.name] / c.recipients) * 100).toFixed(1)}%` : "—"],
              ["Bookings", c.booked !== undefined ? String(c.booked) : "—"],
            ].map(([k, v]) => (
              <span key={k} className="flex flex-col">
                <span className="text-[10.5px] font-semibold text-app-mute">{k}</span>
                <span className="text-ui font-bold text-app-text tabular-nums">{v}</span>
              </span>
            ))}
          </div>
        </div>
      ))}
    </AppCard>
  );
}

function Audience() {
  return (
    <>
      <AppCard>
        <AppLabel className="mb-2">Segments</AppLabel>
        <div className="flex flex-wrap gap-2">
          {SEGMENTS.map((s, i) => (
            <span key={s.label} className={cn(i >= 3 && "hidden @xl:contents")}>
              <ToolbarPill count={s.clients}>{s.label}</ToolbarPill>
            </span>
          ))}
          <ToolbarPill active count={HEALED_CAMPAIGN?.recipients}>
            {HEALED_SEGMENT.label}
          </ToolbarPill>
          <span className="inline-flex h-7 items-center gap-1 rounded-full border border-dashed border-app-border px-3 text-ui-sm font-semibold text-app-mute">
            <Plus size={12} strokeWidth={2.2} />
            Custom segment
          </span>
        </div>
        <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 rounded-app bg-app-sidebar px-3.5 py-3">
          <span className="flex items-center gap-2">
            <Users size={15} strokeWidth={1.9} className="text-app-active-fg" />
            <span className="text-ui font-semibold text-app-text">{HEALED_CAMPAIGN?.recipients} clients</span>
          </span>
          <span className="flex flex-wrap gap-1.5">
            {HEALED_SEGMENT.rules.map((r) => (
              <span key={r} className="rounded-[5px] bg-app-surface px-2 py-0.5 text-ui-xs font-medium text-app-soft ring-1 ring-app-border">
                {r}
              </span>
            ))}
          </span>
          <AppButton variant="primary" className="ml-auto h-7">
            Email this segment
          </AppButton>
        </div>
      </AppCard>
      <CampaignList limit={2} />
    </>
  );
}

function Waitlist() {
  return (
    <>
      {/* WaitlistFilterPills.tsx: All, then Artist / Service / Status dropdowns. Nothing filtered. */}
      <div className="flex flex-wrap gap-2">
        <ToolbarPill active>All</ToolbarPill>
        {["Artist", "Service", "Status"].map((f) => (
          <ToolbarPill key={f}>
            {f}
            <ChevronDown size={12} strokeWidth={2.2} className="-mr-0.5" />
          </ToolbarPill>
        ))}
      </div>
      <AppCard title="Waitlist" meta={`${WAITLIST.length} clients`} padded={false}>
        {WAITLIST.map((w, i) => {
          const artist = ARTISTS[w.artist];
          return (
            <div
              key={w.client}
              className={cn(
                "flex items-start gap-3 px-4 py-3",
                i < WAITLIST.length - 1 && "border-b border-app-border",
                w.status === "Offered" && "bg-app-sidebar",
              )}
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
                <span className="mt-0.5 block text-ui-xs text-app-soft">{w.note}</span>
              </div>
              {w.status === "Active" && (
                <AppButton className="hidden h-7 @xl:inline-flex">Offer a slot</AppButton>
              )}
            </div>
          );
        })}
      </AppCard>
    </>
  );
}

function Referral() {
  return (
    <div className="grid gap-4 @3xl:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
      <AppCard title="Referral program" meta={<AppStatus tone="success" dot>On</AppStatus>}>
        <dl className="flex flex-col gap-3">
          {[
            ["Referrer reward", REFERRAL.referrerReward],
            ["New-client reward", REFERRAL.referredReward],
            ["Reward trigger", REFERRAL.trigger],
          ].map(([k, v]) => (
            <div key={k} className="flex items-center justify-between gap-3 border-b border-app-border pb-3 last:border-b-0 last:pb-0">
              <dt className="text-ui-sm text-app-mute">{k}</dt>
              <dd className="text-ui-sm font-semibold text-app-text">{v}</dd>
            </div>
          ))}
        </dl>
      </AppCard>
      <div className="flex flex-col gap-4">
        <AppKpiStrip
          items={[
            { label: "Total codes", value: String(REFERRAL.codesShared), note: "active referral codes" },
            { label: "Redemptions", value: String(REFERRAL.booked), note: "total uses across all codes", accent: true },
          ]}
        />
        <div className="flex items-start gap-2.5 rounded-app-lg bg-app-sidebar px-4 py-3 ring-1 ring-app-border">
          <Gift size={15} strokeWidth={1.9} className="mt-px shrink-0 text-app-active-fg" />
          <span className="text-ui-sm text-app-text">
            {usd(REFERRAL.creditIssuedCents)} in referrer credit issued for {REFERRAL.booked} completed bookings.
          </span>
        </div>
      </div>
    </div>
  );
}

/**
 * Marketing (app: /marketing?tab=, marketing/_components/*). Open rate and
 * bookings driven over 30 days with list hygiene, the segment chips with the
 * custom "Healed, not rebooked" segment, campaigns, the waitlist and the
 * referral program. Channels are the live ones: SMS and email. Every count
 * comes from sample-data (segments, campaigns, waitlist, referrals).
 */
export function MarketingScreen({ tab = "audience", className }: { tab?: MarketingTab; className?: string }) {
  return (
    <AppFrame
      active="marketing"
      className={className}
      actions={
        <AppButton variant="primary" icon={Plus}>
          New campaign
        </AppButton>
      }
    >
      <div className="flex flex-col gap-4 p-4 @lg:p-6">
        {/* MarketingKPIs.tsx: Open rate · 30d, Bookings driven · 30d, then Hygiene. */}
        <div className="grid grid-cols-2 gap-px overflow-hidden rounded-app-lg bg-app-border ring-1 ring-app-border @xl:grid-cols-3">
          <AppKpi
            label="Open rate · 30d"
            value={`${OPEN_RATE}%`}
            note={`${SENT_OPENS} of ${SENT_RECIPIENTS} opened`}
            accent
            className="bg-app-surface px-3 py-3 @sm:px-4 @sm:py-3.5 @lg:px-5 @lg:py-4"
          />
          <AppKpi
            label="Bookings driven · 30d"
            value={String(BOOKINGS_DRIVEN)}
            note={`from ${SENT.length} sent campaign${SENT.length === 1 ? "" : "s"}`}
            className="bg-app-surface px-3 py-3 @sm:px-4 @sm:py-3.5 @lg:px-5 @lg:py-4"
          />
          <div className="col-span-2 flex min-w-0 flex-col gap-2 bg-app-surface px-3 py-3 @sm:px-4 @sm:py-3.5 @lg:px-5 @lg:py-4 @xl:col-span-1">
            <AppLabel>Hygiene</AppLabel>
            <dl className="flex flex-col gap-0.5">
              {HYGIENE.map((h) => (
                <div key={h.label} className="flex items-center justify-between gap-3">
                  <dt className="text-ui-xs text-app-mute">{h.label}</dt>
                  <dd className="text-ui-sm font-semibold text-app-text tabular-nums">{h.count}</dd>
                </div>
              ))}
            </dl>
            {HYGIENE_ISSUES > 0 ? (
              <span className="flex items-center gap-1 text-ui-xs font-medium text-app-active-fg">
                <AlertCircle size={12} strokeWidth={2} />
                Review &amp; remove
              </span>
            ) : (
              <span className="text-ui-xs text-app-mute">List is clean.</span>
            )}
          </div>
        </div>
        <AppTabs tabs={Object.values(TAB_LABEL)} active={TAB_LABEL[tab]} className="-mx-4 @lg:-mx-6 @lg:px-6" />
        {tab === "audience" && <Audience />}
        {tab === "campaigns" && <CampaignList />}
        {tab === "waitlist" && <Waitlist />}
        {tab === "referral" && <Referral />}
      </div>
    </AppFrame>
  );
}
