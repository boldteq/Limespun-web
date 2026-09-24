import React from "react";
import {
  Building2,
  Check,
  CreditCard,
  FileText,
  FlaskConical,
  Globe,
  Grid2x2,
  MessageSquare,
  Percent,
  Plus,
  Receipt,
  Scale,
  ShieldCheck,
  SlidersHorizontal,
  Sparkles,
  Tags,
  Users,
  Wallet,
  X,
  type LucideIcon,
} from "lucide-react";
import { LimespunMark } from "@/components/brand/limespun-mark";
import { AppShellPhone, SampleTag, cn } from "@/components/system";
import {
  AppButton,
  AppFrame,
  AppKpiStrip,
  AppLabel,
  AppStatus,
  INVENTORY,
  INVENTORY_INKS,
  INVENTORY_REACH,
  TODAY_SESSIONS,
  ToolbarPill,
  type InventoryItem,
} from "@/components/mockups";

/*
 * The screens the REACH hub walks through, drawn from the app (InkOS):
 *   Settings › Ink registry    (app/(app)/settings/_proto/nav-meta.tsx NAV_GROUPS,
 *                               panels-studio.tsx SetInkRegistry + InkFormModal)
 *   Inventory, REACH filter    (app/(app)/inventory/_proto/ScrInventory.tsx, filters.tsx)
 *   Consent form on the phone  (app/consent/_proto/ProtoSectionRenderer.tsx ink_disclosure
 *                               and reach_batch_record, labelled as in forms/_proto/data.ts)
 * Decorative (AppFrame and the phone are aria-hidden); every value comes from sample-data.
 */

/** Product codes as the inventory mockup sets them (mockups/inventory.tsx SKU). */
const PRODUCT_CODE: Record<string, string> = {
  "Black lining ink, 8 oz": "INK-BLK-L8",
  "Black shading ink, 4 oz": "INK-BLK-S4",
  "Red, 1 oz": "INK-RED-1",
  "White highlight, 1 oz": "INK-WHT-1",
  "Sky blue, 1 oz": "INK-BLU-1",
};

/** The registry's Color field for each bottle. The sample studio names no ink maker. */
const COLOR: Record<string, string> = {
  "Black lining ink, 8 oz": "Lining black",
  "Black shading ink, 4 oz": "Shading black",
  "Red, 1 oz": "Red",
  "White highlight, 1 oz": "White highlight",
  "Sky blue, 1 oz": "Sky blue",
};

/** A swatch for the ink's color: warm neutrals for black and white, the app's status hues otherwise. */
const SWATCH: Record<string, string> = {
  "Black lining ink, 8 oz": "bg-graphite",
  "Black shading ink, 4 oz": "bg-graphite/70",
  "Red, 1 oz": "bg-app-danger",
  "White highlight, 1 oz": "bg-white ring-1 ring-app-border ring-inset",
  "Sky blue, 1 oz": "bg-app-info",
};

function Swatch({ item }: { item: InventoryItem }) {
  return <span className={cn("h-3.5 w-3.5 shrink-0 rounded-full", SWATCH[item.name] ?? "bg-graphite/40")} />;
}

function ReachChip() {
  return (
    <span className="inline-flex h-[18px] shrink-0 items-center gap-0.5 rounded-[5px] bg-app-active px-1.5 text-[10px] font-bold tracking-[0.04em] text-app-active-fg">
      <ShieldCheck size={10} strokeWidth={2.4} />
      REACH
    </span>
  );
}

/* ─── Hero · Settings › Ink registry ─────────────────────────────────────────
   The settings rail (the Studio and Billing groups, in the app's order and icons) with
   Ink registry open: a row per ink with its product code and batch, and a Compliant or
   Pending chip from the "REACH compliant" switch, then the count under the list. Below
   a 42rem frame the rail goes and the registry fills the window. */
const RAIL: { label: string; items: [string, LucideIcon][] }[] = [
  {
    label: "Studio",
    items: [
      ["Studio profile", Building2],
      ["Booking page", Globe],
      ["Booking policies", FileText],
      ["Compliance", Scale],
      ["Ink registry", FlaskConical],
      ["Tags", Tags],
      ["Team", Users],
      ["Messaging", MessageSquare],
      ["AI templates", Sparkles],
    ],
  },
  {
    label: "Billing",
    items: [
      ["Billing", CreditCard],
      ["Explore plans", Grid2x2],
      ["Plan limits", SlidersHorizontal],
      ["In-studio payments", Wallet],
      ["Tax registrations", Receipt],
      ["Commissions", Percent],
    ],
  },
];

function SettingsRail() {
  return (
    // The rail scrolls in the app; here it runs to the window's edge and fades out
    <div className="relative hidden w-[212px] shrink-0 border-r border-app-border bg-app-sidebar @2xl:block">
      <div className="absolute inset-0 overflow-hidden px-2.5 pt-4 [mask-image:linear-gradient(to_bottom,#000_calc(100%-56px),transparent)]">
        {RAIL.map((g) => (
          <div key={g.label} className="mb-3">
            <AppLabel className="px-3 pb-1.5">{g.label}</AppLabel>
            {g.items.map(([label, Icon]) => {
              const on = label === "Ink registry";
              return (
                <span
                  key={label}
                  className={cn(
                    "flex h-[33px] items-center gap-2.5 rounded-app-lg px-3 text-ui",
                    on ? "bg-app-surface font-semibold text-app-text ring-1 ring-app-border" : "font-medium text-app-mute",
                  )}
                >
                  <Icon size={15} strokeWidth={1.8} className={cn("shrink-0", on ? "text-app-active-fg" : "text-app-mute")} />
                  {label}
                </span>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}

export function InkRegistryScreen({ className }: { className?: string }) {
  const compliant = INVENTORY_INKS.filter((i) => i.reach).length;
  return (
    <AppFrame active="inventory" sidebar={false} title="Settings" meta="Studio › Ink registry" className={className}>
      <div className="flex min-w-0">
        <SettingsRail />
        <div className="flex min-w-0 flex-1 flex-col gap-3 p-3 @md:p-4 @2xl:gap-4 @2xl:px-8 @2xl:pt-6 @2xl:pb-7">
          <div className="flex items-start justify-between gap-3">
            <span className="min-w-0">
              <AppLabel>Studio</AppLabel>
              <span className="mt-0.5 block text-ui font-semibold text-app-text @2xl:mt-1.5 @2xl:text-[22px] @2xl:leading-tight @2xl:font-bold">
                Ink registry
              </span>
              <span className="mt-1 hidden text-ui-xs leading-snug text-app-mute @md:block @2xl:text-ui-sm">
                EU REACH pigment tracking: brands, batches, disclosure.
              </span>
            </span>
            {/* The narrowest frames (phones under 375) keep the list whole and drop the action */}
            <AppButton icon={Plus} className="shrink-0 @max-[15rem]:hidden">
              Register ink
            </AppButton>
          </div>
          {/* Phone-width frames give each ink one line (color, batch, chip) so all five fit, the
              Pending one included; from @md each row adds the flask and product code, and wide
              frames move the batch into its own column. */}
          <div className="overflow-hidden rounded-app-lg bg-app-surface ring-1 ring-app-border">
            {INVENTORY_INKS.map((i, n) => (
              <div
                key={i.name}
                className={cn(
                  "flex items-center gap-2.5 px-3 py-2 @2xl:gap-3.5 @2xl:px-4 @2xl:py-3",
                  n < INVENTORY_INKS.length - 1 && "border-b border-app-border",
                )}
              >
                <span className="hidden h-7 w-7 shrink-0 items-center justify-center rounded-app bg-graphite/[0.05] text-app-mute @md:flex @2xl:h-8 @2xl:w-8">
                  <FlaskConical size={14} strokeWidth={1.8} />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-ui-sm font-semibold text-app-text @2xl:text-ui">{COLOR[i.name]}</span>
                  <span className="hidden truncate text-ui-xs text-app-mute tabular-nums @md:block">
                    {PRODUCT_CODE[i.name]}
                    <span className="@2xl:hidden"> · Batch {i.batch}</span>
                  </span>
                </span>
                <span className="shrink-0 text-ui-xs text-app-mute tabular-nums @max-[17.5rem]:hidden @md:hidden">
                  Batch {i.batch}
                </span>
                <span className="hidden w-[112px] shrink-0 text-ui-sm text-app-soft tabular-nums @2xl:block">Batch {i.batch}</span>
                <AppStatus tone={i.reach ? "success" : "warning"} dot className="min-w-[5.25rem] justify-center @2xl:w-[98px]">
                  {i.reach ? "Compliant" : "Pending"}
                </AppStatus>
              </div>
            ))}
          </div>
          <p className="px-1 text-ui-xs text-app-mute @2xl:text-ui-sm">
            {INVENTORY_INKS.length} inks logged · {compliant} REACH-compliant.
          </p>
        </div>
      </div>
    </AppFrame>
  );
}

/* ─── 1 · Register ink ───────────────────────────────────────────────────────
   The registry's "Register ink" modal (InkFormModal) for the sky blue: brand, color,
   product code and batch, with the "REACH compliant" switch still off, so it lands in
   the registry as Pending (the hero's last row) and Inventory leaves it out of its count. */
const SKY = INVENTORY_INKS.find((i) => !i.reach);

function Field({ label, value, className }: { label: string; value: string; className?: string }) {
  return (
    <span className={cn("block min-w-0", className)}>
      <span className="block text-ui-xs font-medium text-app-soft">{label}</span>
      <span className="mt-1 flex h-8 items-center truncate rounded-app bg-app-surface px-2.5 text-ui-sm text-app-text tabular-nums ring-1 ring-app-border">
        {value}
      </span>
    </span>
  );
}

export function RegisterInkPanel({ className }: { className?: string }) {
  return (
    <AppFrame
      active="inventory"
      sidebar={false}
      title="Settings"
      meta="Ink registry"
      className={cn("shadow-none", className)}
      bodyClassName="bg-graphite/[0.05]"
    >
      {/* Frames under 15rem (phones under 375): the modal fills the window, and it keeps the
          color and batch, the switch and the primary action */}
      <div className="p-3 @max-[15rem]:p-0 @md:p-4">
        <div className="overflow-hidden rounded-app-lg bg-app-surface shadow-[0_12px_32px_-12px_rgba(28,25,23,0.25)] ring-1 ring-app-border @max-[15rem]:rounded-none @max-[15rem]:shadow-none @max-[15rem]:ring-0">
          <div className="flex items-center justify-between gap-3 border-b border-app-border px-3.5 py-2.5 @max-[15rem]:px-3">
            <p className="text-ui font-semibold text-app-text">Register ink</p>
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-app border border-app-border text-app-mute">
              <X size={14} strokeWidth={1.9} />
            </span>
          </div>
          <div className="flex flex-col gap-3 px-3.5 pt-3 pb-3.5 @max-[15rem]:px-3">
            <div className="grid grid-cols-2 gap-2.5">
              <Field label="Brand" value="Sample brand" className="@max-[15rem]:hidden" />
              <Field label="Color" value={SKY ? COLOR[SKY.name] : "Sky blue"} />
              <Field label="Product code" value={SKY ? PRODUCT_CODE[SKY.name] : ""} className="@max-[15rem]:hidden" />
              <Field label="Batch number" value={SKY?.batch ?? ""} />
            </div>
            <div className="flex items-center gap-3 rounded-app px-3 py-2.5 ring-1 ring-app-border @max-[15rem]:gap-2 @max-[15rem]:px-2.5">
              <span className="min-w-0 flex-1">
                <span className="block text-ui-sm font-semibold text-app-text">REACH compliant</span>
                <span className="block text-ui-xs text-app-mute">EU 2020/2081 conformity confirmed</span>
              </span>
              {/* Off: nobody has confirmed this bottle yet */}
              <span className="relative h-5 w-9 shrink-0 rounded-full bg-graphite/15">
                <span className="absolute top-0.5 left-0.5 h-4 w-4 rounded-full bg-white shadow-[0_1px_2px_rgba(28,25,23,0.2)]" />
              </span>
            </div>
          </div>
          <div className="flex justify-end gap-2 border-t border-app-border bg-graphite/[0.03] px-3.5 py-2.5 @max-[15rem]:px-3">
            <AppButton className="@max-[15rem]:hidden">Cancel</AppButton>
            <AppButton variant="primary" icon={Check}>
              Register ink
            </AppButton>
          </div>
        </div>
      </div>
    </AppFrame>
  );
}

/* ─── 2 · Inventory, filtered to REACH-registered ────────────────────────────
   The KPI counts inks linked to a compliant registry entry; the filter pill lists them. */
export function ReachInventory({ className }: { className?: string }) {
  const categories = new Set(INVENTORY.map((i) => i.category)).size;
  return (
    <AppFrame active="inventory" sidebar={false} title="Inventory" meta="Items" className={cn("shadow-none", className)}>
      <div className="flex flex-col gap-3 p-3 @md:p-4">
        <AppKpiStrip
          items={[
            { label: "REACH-registered", value: String(INVENTORY_REACH.length), note: `of ${INVENTORY_INKS.length} inks tracked`, accent: true },
            { label: "Items tracked", value: String(INVENTORY.length), note: `across ${categories} categories` },
          ]}
        />
        <div className="flex flex-wrap gap-2">
          <ToolbarPill>All</ToolbarPill>
          <ToolbarPill active count={INVENTORY_REACH.length}>
            REACH-registered
          </ToolbarPill>
        </div>
        <div className="overflow-hidden rounded-app-lg bg-app-surface ring-1 ring-app-border">
          {INVENTORY_REACH.map((i, n) => (
            <div
              key={i.name}
              className={cn(
                "flex items-center gap-2.5 px-3 py-2",
                n < INVENTORY_REACH.length - 1 && "border-b border-app-border",
                // Narrow frames list three and let the count say the rest
                n === INVENTORY_REACH.length - 2 && "@max-[20rem]:border-b-0",
                n === INVENTORY_REACH.length - 1 && "@max-[20rem]:hidden",
              )}
            >
              <Swatch item={i} />
              <span className="min-w-0 flex-1">
                <span className="block truncate text-ui-sm font-semibold text-app-text">{i.name}</span>
                <span className="block truncate text-ui-xs text-app-mute tabular-nums">Batch {i.batch}</span>
              </span>
              <ReachChip />
            </div>
          ))}
        </div>
      </div>
    </AppFrame>
  );
}

/* ─── 3 · The consent form on the client's phone ─────────────────────────────
   Priya S., whose "Tattoo consent — general" for her 1:00 session is sent and not yet
   signed (sample-data SUBMISSIONS): the "EU REACH ink disclosure" section, acknowledged
   (rust border and wash when ticked, as in the app), then the "Ink batch record" the
   artist completes after the session. The disclosure line is the one /product/inventory
   shows on Asha's kiosk form: one template, one wording. */
const PRIYA = TODAY_SESSIONS.find((s) => s.id === "priya-florals");

/** The sample studio's wording for the disclosure section, shared with the Inventory page. */
const REACH_DISCLOSURE_TEXT =
  "The inks for this session are REACH-registered. Their brand, color and batch go on your signed form.";

export function ReachDisclosurePhone({ className }: { className?: string }) {
  return (
    <AppShellPhone className={className}>
      <div className="flex h-[364px] flex-col text-left max-sm:h-[356px]">
        <div className="flex flex-col items-center gap-1.5 border-b border-app-border bg-app-sidebar px-3 pt-2.5 pb-2.5">
          <div className="flex w-full items-center justify-between">
            <LimespunMark size={20} />
            <SampleTag className="px-1.5 text-[10px]" />
          </div>
          <p className="font-serif text-[22px] leading-none text-app-text">Tattoo consent</p>
          <p className="max-w-full truncate text-[10px] text-app-mute">
            {PRIYA ? `${PRIYA.piece} · Oct 8, ${PRIYA.start}` : ""}
          </p>
        </div>

        <div className="flex flex-1 flex-col gap-2 px-3 pt-2.5 pb-3">
          <div className="rounded-app bg-app-active/50 p-2 ring-1 ring-app-active-fg/45">
            <div className="flex items-start gap-1.5">
              <Scale size={13} strokeWidth={1.9} className="mt-px shrink-0 text-app-active-fg" />
              <span className="min-w-0">
                <span className="block text-[10px] leading-snug font-bold tracking-[0.04em] text-app-soft uppercase">
                  EU REACH ink disclosure
                </span>
                <span className="mt-1 block text-[11px] leading-snug text-app-text">{REACH_DISCLOSURE_TEXT}</span>
              </span>
            </div>
            <div className="mt-2 flex items-center justify-between gap-1.5 border-t border-app-active-fg/20 pt-2">
              <span className="text-[10.5px] font-semibold whitespace-nowrap text-app-text">I acknowledge this disclosure</span>
              <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-[4px] bg-app-active-fg text-white">
                <Check size={10} strokeWidth={3} />
              </span>
            </div>
          </div>

          <div className="flex items-start gap-1.5 rounded-app bg-graphite/[0.04] p-2 ring-1 ring-app-border">
            <FlaskConical size={13} strokeWidth={1.8} className="mt-px shrink-0 text-app-mute" />
            <span className="min-w-0">
              <span className="block text-[10px] font-bold tracking-[0.04em] text-app-soft uppercase">Ink batch record</span>
              <span className="mt-0.5 block text-[10.5px] leading-snug text-app-mute italic">
                Completed by the artist after the session.
              </span>
            </span>
          </div>

          <span className="mt-auto flex h-9 shrink-0 items-center justify-center rounded-app bg-app-text text-[12px] font-semibold text-white">
            Sign &amp; submit
          </span>
        </div>
      </div>
    </AppShellPhone>
  );
}
