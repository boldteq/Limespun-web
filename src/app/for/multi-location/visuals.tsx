import type React from "react";
import { Check, ChevronDown, ChevronLeft, Ellipsis, MapPin, Menu, Plus } from "lucide-react";
import { AppShellPhone, SampleTag, cn } from "@/components/system";
import { AppAvatar, AppButton, AppStatus } from "@/components/mockups/app-parts";
import { LocationsScreen } from "@/components/mockups/locations";
import { ARTISTS, ARTIST_ORDER, LOCATIONS, TODAY_SESSIONS, VIEWER, usd } from "@/components/mockups/sample-data";

/*
 * Screens for /for/multi-location, from the sample studio's two locations: Downtown (open,
 * every artist assigned) and Eastside (Setting up). Labels are the app's (InkOS
 * locations/_proto/ScrLocations.tsx, ScrLocationDetail.tsx, detail-parts.tsx
 * LocationStatStrip / ArtistAssignments / ServiceOverrides, LocationFormProto.tsx).
 */

/*
 * This calendar month, Oct 1 – today, as the app's Locations rollup counts it: each
 * location's own figures from sample-data's LOCATIONS (the same numbers LocationsScreen
 * prints), and the rollup is their sum.
 */
const [DOWNTOWN_ROW, EASTSIDE_ROW] = LOCATIONS;
const MONTH_BOOKINGS = DOWNTOWN_ROW?.bookings ?? 0;
const MONTH_REVENUE_CENTS = DOWNTOWN_ROW?.revenueCents ?? 0;
const TOTAL_ARTISTS = LOCATIONS.reduce((total, l) => total + l.artists, 0);
const TOTAL_BOOKINGS = LOCATIONS.reduce((total, l) => total + l.bookings, 0);
const TOTAL_REVENUE_CENTS = LOCATIONS.reduce((total, l) => total + l.revenueCents, 0);

const DOWNTOWN = { name: DOWNTOWN_ROW?.name ?? "Downtown", address: "118 Market St" };
const EASTSIDE = { name: EASTSIDE_ROW?.name ?? "Eastside", address: "2240 East Ave, Unit B" };

/** The app's top bar over the work area, as the app lays a screen out behind its drawer. */
function StaffPhone({ title, children, bodyClassName }: { title: string; children: React.ReactNode; bodyClassName?: string }) {
  return (
    <AppShellPhone>
      <div className="flex h-[440px] flex-col text-left">
        <div className="flex h-10 shrink-0 items-center gap-2 border-b border-app-border px-3">
          <Menu size={14} strokeWidth={1.8} className="shrink-0 text-app-mute" />
          <span className="min-w-0 flex-1 truncate text-[12px] font-semibold text-app-text">{title}</span>
          <SampleTag className="px-1.5 text-[10px]" />
        </div>
        <div className={cn("flex min-h-0 flex-1 flex-col gap-2.5 overflow-hidden px-3 pt-3 pb-3.5", bodyClassName)}>{children}</div>
      </div>
    </AppShellPhone>
  );
}

function SmallLabel({ children, className }: { children: React.ReactNode; className?: string }) {
  return <p className={cn("text-[10px] font-bold tracking-[0.08em] text-app-mute uppercase", className)}>{children}</p>;
}

/** "← Locations", the location name and its street line, with the status chip. */
function DetailHead({ name, address, status }: { name: string; address: string; status: "Active" | "Setting up" }) {
  return (
    <div>
      <p className="flex items-center gap-0.5 text-[10px] font-semibold text-app-mute">
        <ChevronLeft size={11} strokeWidth={2.2} />
        Locations
      </p>
      <div className="mt-1.5 flex items-start justify-between gap-2">
        <div className="min-w-0">
          <p className="truncate text-[17px] leading-tight font-bold text-app-text">{name}</p>
          <p className="truncate text-[10px] text-app-mute">{address}</p>
        </div>
        <AppStatus tone={status === "Active" ? "success" : "warning"} dot className="mt-0.5 h-[18px] px-1.5 text-[10px]">
          {status}
        </AppStatus>
      </div>
    </div>
  );
}

/* ─── Hero: every shop, and the totals across them ─────────────────────────
   Reports in the app have no location dimension (ScrAnalytics: "There is no
   locations dimension on any analytics query"), so the report across shops is
   Locations itself: the rollup strip over every site, then one card per shop,
   Downtown open and Eastside setting up. Nothing sits over the screen, so both
   shops stay in view at every width.
   The Locations mockup is the sample studio on Pro and prints "2 of 5 locations
   on Pro" beside the title. This page sells Multi-Location, where there is no
   cap, so that line is hidden here until the screen takes a plan (NEEDS.md). */

export function LocationsHero() {
  return (
    /* Phones: the page's heroCropAt (--hero-crop, inherited from the template's wrapper)
       stops the screen, and the last 120px fade out like the feature heroes. Below 640px the
       screen is fluid, so Eastside's card starts anywhere from 527px (430 wide) to 617px
       (320 wide) down; at a 700px crop Downtown's card is always whole above the fade and
       Eastside's banner and name dissolve into the frame's foot. */
    <div className="max-sm:max-h-(--hero-crop) max-sm:overflow-hidden max-sm:[mask-image:linear-gradient(to_bottom,#000_calc(100%-120px),transparent_calc(100%-8px))]">
      <LocationsScreen className="[&_[data-frame-title]+span]:hidden!" />
    </div>
  );
}

/** Location detail › This month (LocationStatStrip): the dark revenue tile, then artists and bookings. */
function MonthStrip() {
  const tiles = [
    { label: "Artists", value: String(DOWNTOWN_ROW?.artists ?? 0), note: "assigned to location" },
    { label: "Bookings · MTD", value: String(MONTH_BOOKINGS), note: "this calendar month" },
  ];
  return (
    <div className="grid grid-cols-2 gap-px overflow-hidden rounded-app-lg bg-app-border ring-1 ring-app-border">
      <div className="col-span-2 bg-app-text px-2.5 pt-2 pb-2.5 text-white">
        <p className="text-[10px] leading-tight font-bold tracking-[0.06em] text-white/65 uppercase">Revenue · MTD</p>
        <p className="mt-1 text-[20px] leading-none font-extrabold tracking-[-0.02em] tabular-nums">{usd(MONTH_REVENUE_CENTS)}</p>
        <p className="mt-1.5 text-[10px] leading-tight text-white/65">this calendar month</p>
      </div>
      {tiles.map((t) => (
        <div key={t.label} className="min-w-0 bg-app-surface px-2.5 pt-2 pb-2.5">
          {/* A phone tile is ~75px of text: labels take two lines there, so both values sit level */}
          <p className="min-h-6 text-[10px] leading-[1.2] font-bold tracking-[0.02em] text-app-mute uppercase">{t.label}</p>
          <p className="mt-1 text-[17px] leading-none font-extrabold text-app-text tabular-nums">{t.value}</p>
          <p className="mt-1.5 text-[10px] leading-tight text-app-mute">{t.note}</p>
        </div>
      ))}
    </div>
  );
}

/* ─── Week 1: one location's month ──────────────────────────────────────────
   Location detail › This month (LocationStatStrip): Revenue · MTD on the dark tile,
   the artists assigned, bookings this calendar month; then the Artists list. */

export function LocationMonthPhone() {
  return (
    <StaffPhone title="Locations">
      <DetailHead name={DOWNTOWN.name} address={DOWNTOWN.address} status="Active" />
      <div>
        <SmallLabel className="mb-1.5">This month</SmallLabel>
        <MonthStrip />
      </div>
      <div>
        <SmallLabel className="mb-1.5">Artists</SmallLabel>
        <div className="flex flex-wrap gap-1.5">
          {ARTIST_ORDER.map((id) => {
            const a = ARTISTS[id];
            return (
              <span key={id} className="inline-flex h-7 items-center gap-1.5 rounded-full pr-2.5 pl-1 ring-1 ring-app-border">
                <AppAvatar initials={a.initials} tone={a.tone} size="xs" className="text-[10px]" />
                <span className="text-[10.5px] font-semibold text-app-text">{a.name}</span>
                {a.kind === "Guest" && <span className="text-[10px] text-app-mute">guest</span>}
              </span>
            );
          })}
        </div>
      </div>
    </StaffPhone>
  );
}

/* ─── Week 2: setting up the second shop ────────────────────────────────────
   Eastside's own hours (Location settings), an artist being assigned
   (ArtistAssignments: Select artist · Assign) and the services it offers
   (ServiceOverrides: an availability switch per service, crossed out when off). */

const HOURS = [
  { day: "Thu", open: "12:00 PM", close: "8:00 PM" },
  { day: "Fri", open: "12:00 PM", close: "8:00 PM" },
  { day: "Sat", open: "11:00 AM", close: "7:00 PM" },
];

/** Eastside opens without the walk-in hold Rio runs at Downtown, so that service is off there. */
const OFF_AT_EASTSIDE = "Walk-in flash";

/** The studio's services, as today's sessions name them. */
const SERVICES = [
  ...new Set(TODAY_SESSIONS.filter((s) => s.kind !== "session").map((s) => s.piece)),
];

function ServiceRow({ name, on }: { name: string; on: boolean }) {
  return (
    <div className="flex items-center gap-2 border-b border-app-border px-2.5 py-1.5 last:border-b-0">
      <span className={cn("relative h-4 w-7 shrink-0 rounded-full", on ? "bg-app-active-fg" : "bg-graphite/15")}>
        <span className={cn("absolute top-0.5 h-3 w-3 rounded-full bg-white shadow-[0_1px_2px_rgba(28,25,23,0.2)]", on ? "left-[14px]" : "left-0.5")} />
      </span>
      <span className={cn("min-w-0 flex-1 truncate text-[11px] font-medium", on ? "text-app-text" : "text-app-mute line-through")}>{name}</span>
      {on ? (
        <Check size={12} strokeWidth={2.4} className="shrink-0 text-app-text" />
      ) : (
        <span className="shrink-0 text-[12px] leading-none text-app-mute">×</span>
      )}
    </div>
  );
}

export function EastsideSetupPhone() {
  return (
    <StaffPhone title="Locations">
      <DetailHead name={EASTSIDE.name} address={EASTSIDE.address} status="Setting up" />
      <div>
        <SmallLabel className="mb-1.5">Opening hours</SmallLabel>
        <div className="flex flex-col gap-1">
          {HOURS.map((h) => (
            <div key={h.day} className="grid grid-cols-[30px_minmax(0,1fr)_minmax(0,1fr)] items-center gap-1.5 text-[10.5px] text-app-text">
              <span className="font-semibold">{h.day}</span>
              <span className="rounded-[6px] px-1.5 py-1 text-center tabular-nums ring-1 ring-app-border">{h.open}</span>
              <span className="rounded-[6px] px-1.5 py-1 text-center tabular-nums ring-1 ring-app-border">{h.close}</span>
            </div>
          ))}
        </div>
      </div>
      <div>
        <SmallLabel className="mb-1.5">Artists</SmallLabel>
        <div className="flex gap-1.5">
          <span className="flex h-7 min-w-0 flex-1 items-center justify-between gap-1 rounded-app px-2 text-[10.5px] text-app-text ring-1 ring-app-border">
            <span className="truncate">{ARTISTS.mara.name}</span>
            <ChevronDown size={11} strokeWidth={2} className="shrink-0 text-app-mute" />
          </span>
          <AppButton variant="onyx" className="h-7 px-2.5 text-[10.5px]">
            Assign
          </AppButton>
        </div>
      </div>
      <div>
        <SmallLabel className="mb-1.5">Services</SmallLabel>
        <div className="overflow-hidden rounded-app-lg ring-1 ring-app-border">
          {SERVICES.map((name) => (
            <ServiceRow key={name} name={name} on={name !== OFF_AT_EASTSIDE} />
          ))}
        </div>
      </div>
    </StaffPhone>
  );
}

/* ─── Before / after: the second shop joins the account ─────────────────────
   Before: Add location (app: /locations/new, ScrNewLocation + LocationFormProto) with
   Eastside typed in. The form opens on Basic information: Location name (required),
   Status (Active · Inactive · Coming Soon), Timezone (the studio's own by default),
   Phone, Instagram handle and Description; Address, Opening hours and Create location
   come further down, so the phone shows the top of the form and fades where it scrolls.
   After: Locations with Eastside added. The app renders the rollup strip (Total
   locations · Total artists · Bookings (month) · Revenue (month)) only once there is
   more than one location (ScrLocations: "rendered ONLY with a real overview AND >1
   location"), so adding the second shop is what starts the totals. The count sits
   beside Add location, as the app's header carries it. Eastside was saved as Coming
   Soon, which its card shows as Setting up (adapt.ts STATUS_CONFIG), with no artists
   or bookings yet. */

function FormField({
  label,
  value,
  placeholder,
  required,
  select,
}: {
  label: string;
  value?: string;
  /** Shown muted when the field is left empty, as the app's input placeholders are. */
  placeholder?: string;
  required?: boolean;
  select?: boolean;
}) {
  return (
    <div className="min-w-0">
      <p className="flex items-center gap-0.5 text-[10px] leading-tight font-semibold text-app-text">
        {label}
        {required && <span className="font-bold text-app-active-fg">*</span>}
      </p>
      <span className="mt-1 flex h-7 items-center justify-between gap-1 rounded-app bg-app-surface px-2 text-[10.5px] ring-1 ring-app-border">
        <span className={cn("truncate", value ? "text-app-text" : "text-app-mute")}>{value ?? placeholder}</span>
        {select && <ChevronDown size={11} strokeWidth={2} className="shrink-0 text-app-mute" />}
      </span>
    </div>
  );
}

export function AddLocationPhone() {
  return (
    <StaffPhone title="Locations" bodyClassName="[mask-image:linear-gradient(to_bottom,#000_calc(100%-44px),transparent_calc(100%-6px))]">
      <div>
        <SmallLabel>Studio · Locations</SmallLabel>
        <p className="mt-1 text-[17px] leading-tight font-bold text-app-text">Add location</p>
        <p className="mt-0.5 text-[10px] leading-snug text-app-mute">
          Create a new studio location with its own artists, services, and schedule.
        </p>
      </div>
      <div className="shrink-0 overflow-hidden rounded-app-lg ring-1 ring-app-border">
        <p className="border-b border-app-border px-2.5 py-2 text-[11.5px] font-bold text-app-text">Basic information</p>
        <div className="flex flex-col gap-2 px-2.5 pt-2.5 pb-3">
          <FormField label="Location name" value={EASTSIDE.name} required />
          <FormField label="Status" value="Coming Soon" select />
          <FormField label="Timezone" value="Eastern Time (ET)" select />
          {/* Optional fields left empty show the app's placeholders */}
          <FormField label="Phone" placeholder="+1 (555) 000-0000" />
          <FormField label="Instagram handle" placeholder="@mystudio" />
        </div>
      </div>
    </StaffPhone>
  );
}

function Kpi({ label, value, accent }: { label: string; value: string; accent?: boolean }) {
  return (
    <div className="flex min-w-0 flex-col bg-app-surface px-2.5 pt-1.5 pb-2">
      <p className="min-h-[23px] text-[10px] leading-[1.15] font-bold tracking-[0.02em] text-app-mute uppercase">{label}</p>
      <p
        className={cn(
          "mt-1 text-[16px] leading-none font-extrabold tracking-[-0.02em] tabular-nums",
          accent ? "text-app-active-fg" : "text-app-text",
        )}
      >
        {value}
      </p>
    </div>
  );
}

function LocationCard({ name, address, primary }: { name: string; address: string; primary: boolean }) {
  const row = primary ? DOWNTOWN_ROW : EASTSIDE_ROW;
  const stats = [
    { label: "Artists", value: String(row?.artists ?? 0) },
    { label: "Bookings", value: String(row?.bookings ?? 0) },
    primary ? { label: "Manager", value: VIEWER.name } : { label: "Status", value: row?.status ?? "Setting up" },
  ];
  return (
    <div className="shrink-0 overflow-hidden rounded-app-lg bg-app-surface ring-1 ring-app-border">
      <div
        className="relative h-[22px]"
        style={{ background: "linear-gradient(120deg, color-mix(in oklch, var(--color-app-text) 88%, black), var(--color-app-text))" }}
      >
        <span
          className="absolute inset-0"
          style={{ backgroundImage: "repeating-linear-gradient(135deg, rgb(250 245 241 / 0.08) 0 2px, transparent 2px 10px)" }}
        />
        <span className="absolute top-[3px] right-1.5 flex items-center gap-1">
          <AppStatus tone={primary ? "active" : "warning"} dot className="h-4 px-1.5 text-[10px]">
            {primary ? "Primary" : "Setting up"}
          </AppStatus>
          <Ellipsis size={12} strokeWidth={2} className="text-app-sidebar" />
        </span>
      </div>
      <div className="px-2.5 pt-1.5 pb-[7px]">
        <p className="truncate text-[11.5px] leading-tight font-semibold text-app-text">{name}</p>
        <p className="mt-0.5 flex items-center gap-1 truncate text-[10px] leading-tight text-app-mute">
          <MapPin size={10} strokeWidth={1.9} className="shrink-0" />
          {address}
        </p>
        {/* Columns sized to their labels, so ARTISTS · BOOKINGS · MANAGER never run together at 10px */}
        <div className="mt-1.5 flex justify-between gap-2 border-t border-app-border pt-1">
          {stats.map((st) => (
            <div key={st.label} className="min-w-0">
              <p className="text-[10px] leading-tight font-bold tracking-[0.01em] text-app-mute uppercase">{st.label}</p>
              <p
                className={cn(
                  "mt-0.5 truncate leading-tight font-extrabold text-app-text tabular-nums",
                  st.label === "Status" ? "text-[10.5px] font-bold" : "text-[13px]",
                )}
              >
                {st.value}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function LocationsPhone() {
  return (
    <StaffPhone title="Locations" bodyClassName="gap-2 pt-2.5">
      <div className="flex items-center justify-between gap-2">
        <span className="text-[11px] text-app-mute">
          <span className="font-semibold text-app-text tabular-nums">{LOCATIONS.length}</span> locations
        </span>
        <AppButton variant="primary" icon={Plus} className="h-6 px-2 text-[10.5px]">
          Add location
        </AppButton>
      </div>
      <div className="grid shrink-0 grid-cols-2 gap-px overflow-hidden rounded-app-lg bg-app-border ring-1 ring-app-border">
        <Kpi label="Total locations" value={String(LOCATIONS.length)} />
        <Kpi label="Total artists" value={String(TOTAL_ARTISTS)} />
        <Kpi label="Bookings (month)" value={String(TOTAL_BOOKINGS)} />
        <Kpi label="Revenue (month)" value={usd(TOTAL_REVENUE_CENTS)} accent />
      </div>
      <LocationCard name={DOWNTOWN.name} address={DOWNTOWN.address} primary />
      <LocationCard name={EASTSIDE.name} address={EASTSIDE.address} primary={false} />
    </StaffPhone>
  );
}
