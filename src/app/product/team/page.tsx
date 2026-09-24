import React from "react";
import { Briefcase, Check, ChevronDown, Mail, Minus, Palette, Phone, Send, X } from "lucide-react";
import { cn } from "@/components/system";
import { FeaturePage } from "@/components/templates/feature-page";
import { AppFrame } from "@/components/mockups/app-frame";
import { AppAvatar, AppButton, AppLabel, AppStatus, type AppStatusTone } from "@/components/mockups/app-parts";
import { GuestArtistsScreen } from "@/components/mockups/guest-artists";
import { ToolbarPill } from "@/components/mockups/projects";
import { TeamScreen } from "@/components/mockups/team";
import {
  ARTISTS,
  PERMISSIONS,
  STUDIO_LABEL,
  TEAM,
  payRuleLabel,
  type TeamMember,
  type TeamRole,
} from "@/components/mockups/sample-data";
import { getFeature } from "@/lib/data/features";
import { PLANS, type PlanTier } from "@/lib/data/plans";
import { pageMetadata } from "@/lib/seo";

const feature = getFeature("team");
const planName = (tier: PlanTier): string => PLANS.find((p) => p.tier === tier)?.name ?? tier;

/* features.ts's team description names only Studio and Pro; Team is on Studio and every
   plan above it, so the description says so (158 characters). */
export const metadata = pageMetadata({
  title: feature.seo.title,
  description: `Residents, front desk and guest artists on one roster, with schedules, time off and guest spots that end on time. On ${planName("studio")} and up; guests and roles from ${planName("pro")}.`,
  path: "/product/team",
});

/* ─── Moment 1: Rio's invite, then Rio on the roster ─────────────────────────
   The invite modal (team/_proto/ScrTeamLifecycle.tsx) asks for an email, a role and,
   for artists, an arrangement: Resident or Guest (guest maps to the guest-artist
   role). Rio joined Tue, Sep 29; Cam's invite, sent Tue, Oct 6, is still pending. */
const RIO = TEAM.find((m) => m.artist === "rio");

/** One short line per person, so rows stay one line in a half-width frame. */
function rosterLine(m: TeamMember): string {
  if (m === RIO) return "Joined Tue, Sep 29";
  if (m.status === "Pending") return m.detail.replace(/^Invite sent \w+, /, "Invited ");
  if (m.artist) return payRuleLabel(ARTISTS[m.artist].pay);
  return `Active ${m.lastActive}`;
}

function Field({ label, icon: Icon, value, hint, select }: {
  label: string;
  icon?: typeof Palette;
  value: string;
  hint?: string;
  select?: boolean;
}) {
  return (
    <div className="min-w-0">
      <AppLabel className="mb-1.5">{label}</AppLabel>
      <span className="flex h-9 items-center gap-2 rounded-app border border-app-border bg-app-surface px-2.5 text-ui-sm text-app-text shadow-[0_1px_2px_rgba(28,25,23,0.05)]">
        {Icon && <Icon size={14} strokeWidth={1.9} className="shrink-0 text-app-mute @max-[17rem]:hidden" />}
        <span className="min-w-0 flex-1 truncate font-medium">{value}</span>
        {select && <ChevronDown size={14} strokeWidth={1.9} className="shrink-0 text-app-mute" />}
      </span>
      {hint && <p className="mt-1 text-ui-xs leading-snug text-app-mute">{hint}</p>}
    </div>
  );
}

function InviteSheet() {
  return (
    <AppFrame active="team" sidebar={false} title="Team" className="shadow-none" bodyClassName="bg-graphite/[0.05]">
      {/* Phones: the modal fills the frame (no backdrop margin), so the pair stays short */}
      <div className="p-3 max-sm:p-0 @md:p-5">
        <div className="mx-auto max-w-[400px] overflow-hidden rounded-app-lg bg-app-surface shadow-[0_12px_32px_-12px_rgba(28,25,23,0.25)] ring-1 ring-app-border max-sm:rounded-none max-sm:shadow-none max-sm:ring-0">
          <div className="flex items-start justify-between gap-3 px-4 pt-4">
            <p className="text-[16px] leading-tight font-extrabold tracking-[-0.025em] text-app-text">Invite to {STUDIO_LABEL}</p>
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-app border border-app-border text-app-mute">
              <X size={14} strokeWidth={1.9} />
            </span>
          </div>
          <div className="flex flex-col gap-3.5 px-4 pt-3.5 pb-4">
            <Field label="Email" value="rio@example.com" hint="We’ll email them a link to join." />
            <div className="grid grid-cols-2 gap-3">
              <Field label="Role" icon={Palette} value="Artist" select />
              <Field label="Arrangement" icon={Briefcase} value="Guest" select />
            </div>
            <p className="-mt-1 text-ui-xs leading-snug text-app-mute">Temporary residency, invited as a guest artist.</p>
          </div>
          <div className="flex justify-end gap-2 border-t border-app-border bg-graphite/[0.03] px-4 py-3">
            <AppButton>Cancel</AppButton>
            <AppButton variant="primary" icon={Send}>
              Send invite
            </AppButton>
          </div>
        </div>
      </div>
    </AppFrame>
  );
}

const ROLE_TONE: Record<TeamRole, AppStatusTone> = {
  Owner: "active",
  Admin: "info",
  Artist: "neutral",
  "Front desk": "neutral",
  Guest: "warning",
};

function MemberLead({ m }: { m: TeamMember }) {
  if (m.status === "Pending") {
    return (
      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-graphite/[0.05] text-app-mute">
        <Mail size={14} strokeWidth={1.9} />
      </span>
    );
  }
  return <AppAvatar initials={m.initials} tone={m.artist ? ARTISTS[m.artist].tone : "neutral"} size="md" />;
}

function RosterWithRio() {
  const guests = TEAM.filter((m) => m.role === "Guest").length;
  const pending = TEAM.filter((m) => m.status === "Pending").length;
  return (
    <AppFrame active="team" sidebar={false} title="Team" meta={`${TEAM.length} members`} className="shadow-none">
      <div className="flex flex-col gap-3 p-3 @md:p-4">
        <div className="flex h-7 flex-wrap gap-2 overflow-hidden">
          <ToolbarPill active count={TEAM.length}>
            All members
          </ToolbarPill>
          <ToolbarPill count={guests}>Guests</ToolbarPill>
          <ToolbarPill count={pending}>Pending invites</ToolbarPill>
        </div>
        <div className="overflow-hidden rounded-app-lg bg-app-surface ring-1 ring-app-border">
          {TEAM.map((m, i) => (
            <div
              key={m.name}
              className={cn(
                m === RIO && "bg-app-sidebar shadow-[inset_2px_0_0_var(--color-app-active-fg)]",
                // Phones keep the owner, the new guest and the pending invite.
                (m.role === "Artist" || m.role === "Front desk") && "max-sm:hidden",
              )}
            >
              {/* The role chip sits beside the name, so the line under it keeps the full row width */}
              <div className={cn("flex items-center gap-3 px-3.5 py-2.5", i < TEAM.length - 1 && "border-b border-app-border")}>
                <MemberLead m={m} />
                <span className="min-w-0 flex-1">
                  <span className="flex items-center gap-2">
                    <span className="truncate text-ui-sm font-semibold text-app-text">{m.name}</span>
                    <AppStatus tone={m.status === "Pending" ? "info" : ROLE_TONE[m.role]}>
                      {m.status === "Pending" ? "Pending" : m.role}
                    </AppStatus>
                  </span>
                  <span className="block truncate text-ui-xs text-app-mute">{rosterLine(m)}</span>
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AppFrame>
  );
}

/* ─── Moment 3: what the front desk can and can't do ──────────────────────────
   The Front desk role card as the Team screen prints it (team/_proto/ScrTeam.tsx
   PRESET_ROLE_COLUMNS: "Booking only, no financials", phone icon) beside the Owner,
   from the Pro permissions matrix (components/settings/team/PermissionsMatrix.tsx). */
const NOOR = TEAM.find((m) => m.role === "Front desk");
const MATRIX_COLS: { role: TeamRole; grant: number }[] = [
  { role: "Owner", grant: 0 },
  { role: "Front desk", grant: 3 },
];

function Tick({ on }: { on: boolean }) {
  return on ? (
    <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-app-success-bg text-app-success">
      <Check size={11} strokeWidth={3} />
    </span>
  ) : (
    <Minus size={13} strokeWidth={2} className="inline text-app-mute/60" />
  );
}

function DeskPermissions() {
  const groups = [...new Set(PERMISSIONS.map((p) => p.group))];
  return (
    <AppFrame active="team" sidebar={false} title="Team" meta="Roles & permissions" className="shadow-none">
      <div className="flex flex-col gap-3 p-3 @md:p-4">
        <div className="flex items-start gap-3 rounded-app-lg bg-app-active/40 p-3 ring-1 ring-app-active-fg/25">
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-app bg-app-surface text-app-active-fg ring-1 ring-app-active-fg/20">
            <Phone size={15} strokeWidth={1.9} />
          </span>
          <span className="min-w-0 flex-1">
            <span className="flex flex-wrap items-center gap-x-2 gap-y-1">
              <span className="text-ui font-bold text-app-text">Front desk</span>
              {NOOR && (
                <span className="inline-flex items-center gap-1 text-ui-xs text-app-soft">
                  <AppAvatar initials={NOOR.initials} size="xs" />
                  {NOOR.name}
                </span>
              )}
            </span>
            <span className="mt-0.5 block text-ui-xs leading-snug text-app-soft">
              Booking only, no financials
            </span>
          </span>
        </div>

        <div className="overflow-hidden rounded-app-lg bg-app-surface ring-1 ring-app-border">
          <div className="flex items-center justify-between gap-3 border-b border-app-border px-3.5 py-2.5">
            <span className="text-ui-sm font-semibold text-app-text">Permissions matrix</span>
            <span className="rounded-[4px] border border-app-active bg-white px-1.5 text-[10px] leading-4 font-bold tracking-[0.08em] text-app-active-fg">
              PRO
            </span>
          </div>
          <table className="w-full border-collapse text-ui-sm text-app-text">
            <thead>
              <tr className="border-b border-app-border">
                <th scope="col" className="h-9 pr-2 pl-3.5 text-left text-kpi-label font-bold text-app-mute uppercase">
                  Permission
                </th>
                {MATRIX_COLS.map((c) => (
                  <th
                    key={c.role}
                    scope="col"
                    className={cn(
                      "h-9 w-[3.75rem] px-1 text-center text-kpi-label leading-tight font-bold uppercase @md:w-24 @md:whitespace-nowrap",
                      c.role === "Front desk" ? "bg-app-active/40 text-app-active-fg" : "text-app-mute",
                    )}
                  >
                    {c.role}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {groups.map((g) => (
                <React.Fragment key={g}>
                  <tr>
                    <td colSpan={MATRIX_COLS.length + 1} className="bg-app-sidebar px-3.5 py-0.5 text-kpi-label sm:py-1 font-bold text-app-mute uppercase">
                      {g}
                    </td>
                  </tr>
                  {PERMISSIONS.filter((p) => p.group === g).map((p) => (
                    <tr key={p.label} className="border-b border-app-border last:border-b-0">
                      <td className="h-8 pr-2 pl-3.5 text-ui-xs leading-tight sm:h-9 @sm:text-ui-sm">{p.label}</td>
                      {MATRIX_COLS.map((c) => (
                        <td key={c.role} className={cn("px-1 text-center", c.role === "Front desk" && "bg-app-active/25")}>
                          <Tick on={p.grants[c.grant]} />
                        </td>
                      ))}
                    </tr>
                  ))}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AppFrame>
  );
}

export default function TeamPage() {
  return (
    <FeaturePage
      feature={feature}
      headings={{
        moments: "Invite, host and set access",
        details: "What else it does",
        worksWith: "Joined to payouts and the calendar",
        worksWithLead: "Each person’s split feeds Payments and their hours shape the calendar, so the roster is set up once.",
      }}
      visuals={{
        hero: <TeamScreen view="roster" />,
        moments: [
          { before: <InviteSheet />, after: <RosterWithRio />, beforeLabel: "Invite sent", afterLabel: "On the roster" },
          /* Phones: Rio's spot, dates and split, faded out above the Access tab, so the moments swipe at one height */
          <div
            key="guest"
            className="max-sm:max-h-[520px] max-sm:overflow-hidden max-sm:[mask-image:linear-gradient(to_bottom,#000_calc(100%-90px),transparent)]"
          >
            <GuestArtistsScreen />
          </div>,
          <DeskPermissions key="desk" />,
        ],
        detailLabels: [
          { label: "Front desk", tone: "quiet" },
          { label: "Pending invites", tone: "info" },
          { label: "Time off", tone: "ember" },
          { label: "View client history", tone: "quiet" },
          { label: "Visible", tone: "success" },
          { label: "Permissions matrix", tone: "quiet" },
        ],
      }}
      planRows={[
        { label: "Residents and front desk on one roster", from: "studio" },
        { label: "Invites, schedules and time off", from: "studio" },
        { label: "Guest-artist seats with end dates", from: "pro" },
        { label: "Roles and permissions matrix", from: "pro" },
      ]}
      inkBand={{ headline: "Guest spots that end on time.", italicWord: "time" }}
    />
  );
}
