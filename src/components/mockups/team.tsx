import type { LucideIcon } from "lucide-react";
import { Check, Crown, Mail, Minus, Phone, Plane, Shield, UserPlus, UserRound } from "lucide-react";
import { cn } from "@/components/system/cn";
import { AppFrame } from "./app-frame";
import { AppAvatar, AppButton, AppCard, AppStatus, AppTable, type AppStatusTone, type AppTableRow } from "./app-parts";
import { ToolbarListRow, ToolbarPill, ToolbarSearch } from "./projects";
import { ARTISTS, PERMISSIONS, TEAM, type TeamMember, type TeamRole } from "./sample-data";

/** Preset roles as the Team page names them (team/_proto/ScrTeam.tsx PRESET_ROLE_COLUMNS). */
const PRESET_ROLES: { role: TeamRole; note: string; icon: LucideIcon }[] = [
  { role: "Owner", note: "Everything", icon: Crown },
  { role: "Admin", note: "All but billing", icon: Shield },
  { role: "Artist", note: "Own work & pay", icon: UserRound },
  { role: "Front desk", note: "Booking only, no financials", icon: Phone },
  { role: "Guest", note: "Own work · end-dated", icon: Plane },
];

const ROLE_TONE: Record<TeamRole, AppStatusTone> = {
  Owner: "active",
  Admin: "info",
  Artist: "neutral",
  "Front desk": "neutral",
  Guest: "warning",
};

/** Sign-in emails on the reserved example.com domain, and when each person joined the workspace. */
const EMAIL: Record<string, string> = {
  Dev: "dev@example.com",
  Mara: "mara@example.com",
  Rio: "rio@example.com",
  Noor: "noor@example.com",
  Cam: "cam@example.com",
};
const JOINED: Record<string, string> = {
  Dev: "May 2026",
  Mara: "May 2026",
  Rio: "Tue, Sep 29",
  Noor: "Jun 2026",
  Cam: "—",
};

const residents = TEAM.filter((m) => m.artist && ARTISTS[m.artist].kind === "Resident").length;
const guests = TEAM.filter((m) => m.role === "Guest").length;
const pendingInvites = TEAM.filter((m) => m.status === "Pending").length;
const staff = TEAM.filter((m) => !m.artist && m.status === "Active").length;

function MemberCell({ m }: { m: TeamMember }) {
  const tone = m.artist ? ARTISTS[m.artist].tone : "neutral";
  if (m.status === "Pending") {
    return (
      <span className="flex items-center gap-2.5">
        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-graphite/[0.05] text-app-mute">
          <Mail size={14} strokeWidth={1.9} />
        </span>
        <span className="min-w-0">
          <span className="flex items-center gap-1.5 font-semibold text-app-text">
            {m.name}
            <AppStatus tone="info" dot>
              Pending
            </AppStatus>
          </span>
          <span className="block text-ui-xs text-app-mute">{m.detail}</span>
        </span>
      </span>
    );
  }
  return (
    <span className="flex items-center gap-2.5">
      <AppAvatar initials={m.initials} tone={tone} size="md" />
      <span className="min-w-0">
        <span className="block font-semibold text-app-text">{m.name}</span>
        <span className="block text-ui-xs text-app-mute">{m.detail}</span>
      </span>
    </span>
  );
}

function Roster() {
  const rows: AppTableRow[] = TEAM.map((m) => ({
    key: m.name,
    tone: m.status === "Pending" ? "muted" : "default",
    cells: [
      <MemberCell key="n" m={m} />,
      <span key="e" className="text-app-soft">
        {EMAIL[m.name]}
      </span>,
      <AppStatus key="r" tone={ROLE_TONE[m.role]}>
        {m.role}
      </AppStatus>,
      <span key="l" className="text-app-soft">
        {m.lastActive}
      </span>,
      <span key="j" className="text-app-soft">
        {m.status === "Pending" ? "Invited" : JOINED[m.name]}
      </span>,
    ],
  }));

  return (
    <>
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex flex-wrap gap-2">
          <ToolbarPill active count={TEAM.length}>
            All members
          </ToolbarPill>
          <ToolbarPill count={residents}>Residents</ToolbarPill>
          <ToolbarPill count={guests}>Guests</ToolbarPill>
          <span className="hidden @xl:contents">
            <ToolbarPill count={staff}>Staff</ToolbarPill>
            <ToolbarPill count={pendingInvites}>Pending invites</ToolbarPill>
          </span>
        </div>
        <ToolbarSearch placeholder="Search team" className="hidden w-[200px] @3xl:flex" />
      </div>
      <AppCard padded={false}>
        <div className="@xl:hidden">
          {TEAM.map((m, i) => (
            <ToolbarListRow
              key={m.name}
              lead={<AppAvatar initials={m.initials} tone={m.artist ? ARTISTS[m.artist].tone : "neutral"} size="md" />}
              title={m.name}
              sub={m.detail}
              value={<span className="text-ui-xs font-medium text-app-mute">{m.status === "Pending" ? "Invited" : m.lastActive}</span>}
              status={<AppStatus tone={m.status === "Pending" ? "info" : ROLE_TONE[m.role]}>{m.status === "Pending" ? "Pending" : m.role}</AppStatus>}
              last={i === TEAM.length - 1}
            />
          ))}
        </div>
        <AppTable
          className="hidden @xl:block"
          columns={[{ label: "Name" }, { label: "Email" }, { label: "Role" }, { label: "Last active" }, { label: "Joined" }]}
          rows={rows}
          minWidth={720}
        />
      </AppCard>
    </>
  );
}

/** Column order of the matrix, mapped to the grants in sample-data PERMISSIONS. */
const MATRIX_ROLES: TeamRole[] = ["Owner", "Admin", "Artist", "Front desk", "Guest"];

/**
 * Which role columns a frame shows, so every column is whole and the matrix
 * never scrolls: on phones Owner beside Front desk (the widest gap: bookings
 * yes, money no), then Artist, Admin and Guest join as the card widens.
 */
const MATRIX_COL: Record<TeamRole, string> = {
  Owner: "",
  Admin: "hidden @min-[500px]:table-cell",
  Artist: "hidden @min-[400px]:table-cell",
  "Front desk": "",
  Guest: "hidden @min-[580px]:table-cell",
};

function Permissions() {
  const groups = [...new Set(PERMISSIONS.map((p) => p.group))];
  return (
    <>
      <div className="grid grid-cols-2 gap-2.5 @2xl:grid-cols-3 @4xl:grid-cols-5">
        {PRESET_ROLES.map(({ role, note, icon: Icon }, i) => (
          <div
            key={role}
            className={cn("rounded-app-lg bg-app-surface p-3 ring-1 ring-app-border", i === 4 && "col-span-2 @2xl:col-span-1")}
          >
            <span className="mb-2 flex h-7 w-7 items-center justify-center rounded-app bg-graphite/[0.05] text-app-soft">
              <Icon size={14} strokeWidth={1.9} />
            </span>
            <span className="block text-ui font-bold text-app-text">{role}</span>
            <span className="block text-ui-xs text-app-mute">{note}</span>
          </div>
        ))}
      </div>
      <AppCard
        padded={false}
        title="Permissions matrix"
        meta={
          <span className="rounded-[4px] border border-app-active bg-white px-1.5 text-[10px] leading-4 font-bold tracking-[0.08em] text-app-active-fg">
            PRO
          </span>
        }
      >
        <p className="px-4 pt-3 text-ui-sm text-app-mute">The access each preset role starts with.</p>
        <div className="@container relative w-full min-w-0">
          <div className="overflow-x-auto overscroll-x-contain">
            <table className="w-full border-collapse text-ui-sm text-app-text">
              <thead>
                <tr className="border-b border-app-border">
                  <th scope="col" className="h-10 pr-2 pl-4 text-left text-kpi-label font-bold text-app-mute uppercase">
                    Permission
                  </th>
                  {MATRIX_ROLES.map((r) => (
                    <th
                      key={r}
                      scope="col"
                      className={cn(
                        /* Narrow: a slim column whose label may wrap ("Front / desk"), so the permission keeps the room. */
                        "h-10 w-[4.5rem] px-2 text-center text-kpi-label leading-tight font-bold text-app-mute uppercase @min-[400px]:w-auto @min-[400px]:whitespace-nowrap",
                        MATRIX_COL[r],
                      )}
                    >
                      {r}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {groups.map((g) => (
                  <GroupRows key={g} group={g} />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </AppCard>
    </>
  );
}

function GroupRows({ group }: { group: string }) {
  const rows = PERMISSIONS.filter((p) => p.group === group);
  return (
    <>
      <tr>
        <td colSpan={MATRIX_ROLES.length + 1} className="bg-app-sidebar px-4 py-1.5 text-kpi-label font-bold text-app-mute uppercase">
          {group}
        </td>
      </tr>
      {rows.map((p) => (
        <tr key={p.label} className="border-b border-app-border last:border-b-0">
          <td className="h-10 pr-2 pl-4 leading-snug @min-[400px]:whitespace-nowrap">{p.label}</td>
          {p.grants.map((on, i) => (
            <td key={MATRIX_ROLES[i]} className={cn("px-2 text-center", MATRIX_COL[MATRIX_ROLES[i] ?? "Owner"])}>
              {on ? (
                <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-app-success-bg text-app-success">
                  <Check size={11} strokeWidth={3} />
                </span>
              ) : (
                <Minus size={13} strokeWidth={2} className="inline text-app-border" />
              )}
            </td>
          ))}
        </tr>
      ))}
    </>
  );
}

/**
 * Team (app: /team, team/_proto/ScrTeam.tsx). Roster with the app's columns,
 * or the Roles & permissions view: preset roles and the permissions matrix,
 * which is on Pro.
 */
export function TeamScreen({ view = "roster", className }: { view?: "roster" | "permissions"; className?: string }) {
  return (
    <AppFrame
      active="team"
      className={className}
      title={view === "permissions" ? "Roles & permissions" : undefined}
      meta={view === "roster" ? `${TEAM.length} members` : undefined}
      actions={
        view === "roster" ? (
          <>
            <AppButton icon={Shield}>Roles &amp; permissions</AppButton>
            <AppButton variant="primary" icon={UserPlus}>
              Invite member
            </AppButton>
          </>
        ) : (
          <AppButton>Back to roster</AppButton>
        )
      }
    >
      <div className="flex flex-col gap-4 p-4 @lg:p-6">{view === "roster" ? <Roster /> : <Permissions />}</div>
    </AppFrame>
  );
}
