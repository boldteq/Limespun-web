import { Ellipsis, MapPin, Plus } from "lucide-react";
import { cn } from "@/components/system/cn";
import { PLAN_CAPS } from "@/lib/data/plans";
import { AppFrame } from "./app-frame";
import { AppButton, AppKpiStrip, AppLabel, AppStatus } from "./app-parts";
import { DAILY_REVENUE } from "./analytics";
import { PAYMENTS_LEDGER } from "./payments";
import { ARTIST_ORDER, SAMPLE_PLAN, usd, VIEWER } from "./sample-data";

const PLAN_LOCATIONS = PLAN_CAPS.find((c) => c.label === "Locations")?.values[SAMPLE_PLAN] ?? "";
const MONTH_NOTE = "This calendar month";

/*
 * October so far, the way the app's rollup counts it (lib/locations/queries.ts:
 * the current calendar month). Revenue is succeeded payments on October
 * bookings: Analytics' daily revenue from Thu, Oct 1 (Dev and Mara's share of
 * the payout week's last four days, all of Rio's guest weekend, then the
 * Payments ledger from Mon, Oct 5), less today's two deposits for November
 * bookings. Bookings are every October booking at the location, today's and
 * those still ahead.
 */
const NOVEMBER_DEPOSITS_CENTS = PAYMENTS_LEDGER.filter((t) => t.day === "Oct 8" && ["Kira N.", "Bea L."].includes(t.client)).reduce(
  (total, t) => total + t.cents,
  0,
);
const MONTH_REVENUE_CENTS =
  DAILY_REVENUE.filter((d) => d.label.startsWith("Oct ")).reduce(
    (total, d) => total + ARTIST_ORDER.reduce((t, id) => t + d.cents[id], 0),
    0,
  ) - NOVEMBER_DEPOSITS_CENTS;
const MONTH_BOOKINGS = 51;

interface LocationCardData {
  name: string;
  /** Street line, as the app's addressLine() builds it. */
  address: string;
  status: "Active" | "Setting up";
  primary: boolean;
  artists: number;
  bookings: number;
}

const LOCATIONS: LocationCardData[] = [
  { name: "Downtown", address: "118 Market St", status: "Active", primary: true, artists: ARTIST_ORDER.length, bookings: MONTH_BOOKINGS },
  { name: "Eastside", address: "2240 East Ave, Unit B", status: "Setting up", primary: false, artists: 0, bookings: 0 },
];

/** Status chip (locations/_proto/adapt.ts STATUS_CONFIG): the primary location shows Primary instead. */
function statusChip(loc: LocationCardData) {
  if (loc.primary) {
    return (
      <AppStatus tone="active" dot>
        Primary
      </AppStatus>
    );
  }
  return loc.status === "Active" ? (
    <AppStatus tone="success" dot>
      Active
    </AppStatus>
  ) : (
    <AppStatus tone="warning" dot>
      Setting up
    </AppStatus>
  );
}

function LocationCard({ loc }: { loc: LocationCardData }) {
  /* Card stats (adapt.ts cardStats): Artists, Bookings (this month), then Manager, falling back to Status. */
  const stats = [
    { label: "Artists", value: String(loc.artists) },
    { label: "Bookings", value: String(loc.bookings) },
    loc.primary ? { label: "Manager", value: VIEWER.name } : { label: "Status", value: loc.status },
  ];
  return (
    <div className="@container overflow-hidden rounded-app-lg bg-app-surface ring-1 ring-app-border">
      {/* Onyx banner with a light diagonal hatch, as ScrLocations draws it. Decorative. */}
      <div
        className="relative h-20"
        style={{
          background:
            "linear-gradient(120deg, color-mix(in oklch, var(--color-app-text) 88%, black), var(--color-app-text))",
        }}
      >
        <span
          className="absolute inset-0"
          style={{
            backgroundImage: "repeating-linear-gradient(135deg, rgb(250 245 241 / 0.08) 0 2px, transparent 2px 10px)",
          }}
        />
        <span className="absolute top-2.5 right-2.5 flex items-center gap-2">
          {statusChip(loc)}
          <span className="flex h-[30px] w-[30px] items-center justify-center rounded-full border border-white/40 bg-app-text/60 text-app-sidebar">
            <Ellipsis size={15} strokeWidth={2} />
          </span>
        </span>
      </div>
      <div className="p-[18px]">
        <span className="block truncate text-[15px] font-semibold text-app-text">{loc.name}</span>
        <span className="mt-[3px] flex min-w-0 items-center gap-1.5 text-[12.5px] text-app-mute">
          <MapPin size={13} strokeWidth={1.9} className="shrink-0" />
          <span className="truncate">{loc.address}</span>
        </span>
        {/* Two columns on a narrow card so labels never run together; three once there is room. */}
        <div className="mt-4 grid grid-cols-2 gap-x-2.5 gap-y-3 border-t border-app-border pt-3.5 @min-[18rem]:grid-cols-3">
          {stats.map((s) => (
            <div key={s.label} className="min-w-0">
              <AppLabel>{s.label}</AppLabel>
              <span
                className={cn(
                  "mt-0.5 block truncate text-[18px] leading-tight font-extrabold tracking-[-0.02em] text-app-text tabular-nums",
                  s.label === "Status" && "text-[15px] font-bold",
                )}
              >
                {s.value}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/**
 * Locations (app: /locations, locations/_proto/ScrLocations.tsx). A Pro studio
 * with its primary location open and a second one setting up; the strip at the
 * top reports across every location for the calendar month.
 */
export function LocationsScreen({ className }: { className?: string }) {
  const artists = LOCATIONS.reduce((total, l) => total + l.artists, 0);
  const bookings = LOCATIONS.reduce((total, l) => total + l.bookings, 0);
  return (
    <AppFrame
      active="locations"
      className={className}
      meta={`${LOCATIONS.length} of ${PLAN_LOCATIONS} locations on Pro`}
      actions={
        <AppButton variant="primary" icon={Plus}>
          Add location
        </AppButton>
      }
    >
      <div className="flex flex-col gap-4 p-4 @lg:p-6">
        <AppKpiStrip
          items={[
            { label: "Total locations", value: String(LOCATIONS.length), note: "Across all sites" },
            { label: "Total artists", value: String(artists), note: "Assigned to locations" },
            { label: "Bookings (month)", value: String(bookings), note: MONTH_NOTE },
            { label: "Revenue (month)", value: usd(MONTH_REVENUE_CENTS), note: MONTH_NOTE, accent: true },
          ]}
        />
        <div className="grid gap-4 @xl:grid-cols-2">
          {LOCATIONS.map((loc) => (
            <LocationCard key={loc.name} loc={loc} />
          ))}
        </div>
      </div>
    </AppFrame>
  );
}
