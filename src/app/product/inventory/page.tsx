import React from "react";
import { ArrowDownLeft, ArrowUpRight, Check, CheckCircle2, FlaskConical, Pencil, Scale, ShieldCheck, ShoppingCart, TrendingDown, X } from "lucide-react";
import { LimespunMark } from "@/components/brand/limespun-mark";
import { SampleTag, cn } from "@/components/system";
import { FeaturePage } from "@/components/templates/feature-page";
import { AppFrame } from "@/components/mockups/app-frame";
import { AppButton, AppKpiStrip, AppLabel, AppStatus, type AppStatusTone } from "@/components/mockups/app-parts";
import { InventoryScreen } from "@/components/mockups/inventory";
import {
  INVENTORY,
  INVENTORY_INKS,
  INVENTORY_REACH,
  SUBMISSIONS,
  TODAY_SESSIONS,
  usd,
  type InventoryItem,
} from "@/components/mockups/sample-data";
import { getFeature } from "@/lib/data/features";
import { pageMetadata } from "@/lib/seo";

const feature = getFeature("inventory");

export const metadata = pageMetadata({
  title: feature.seo.title,
  description: feature.seo.description,
  path: "/product/inventory",
});

const item = (name: string): InventoryItem | undefined => INVENTORY.find((i) => i.name === name);
const LINING = item("Black lining ink, 8 oz");
const SHADING = item("Black shading ink, 4 oz");
const RED = item("Red, 1 oz");
/** SKUs as the inventory mockup sets them (mockups/inventory.tsx). */
const SKU: Record<string, string> = {
  "Black lining ink, 8 oz": "INK-BLK-L8",
  "Black shading ink, 4 oz": "INK-BLK-S4",
  "Red, 1 oz": "INK-RED-1",
};
/** Bottle swatches on the batch record. */
const SWATCH: Record<string, string> = {
  "Black lining ink, 8 oz": "bg-graphite",
  "Black shading ink, 4 oz": "bg-graphite",
  "Red, 1 oz": "bg-app-danger",
};

/* ─── Moment 1: register an ink, and it joins the Items list with its batch ───
   Settings › Ink registry "Register ink" (settings/_proto/panels-studio.tsx
   InkFormModal): Brand, Color, Product code, Batch number and the REACH compliant
   toggle ("EU 2020/2081 conformity confirmed"). The sample names no ink maker. */
function FormField({ label, value }: { label: string; value: string }) {
  return (
    <div className="min-w-0">
      <AppLabel className="mb-1.5">{label}</AppLabel>
      <span className="flex h-9 items-center rounded-app border border-app-border bg-app-surface px-2.5 text-ui-sm font-medium text-app-text shadow-[0_1px_2px_rgba(28,25,23,0.05)]">
        <span className="truncate">{value}</span>
      </span>
    </div>
  );
}

function RegisterInk() {
  return (
    <AppFrame active="inventory" sidebar={false} title="Ink registry" className="shadow-none" bodyClassName="bg-graphite/[0.05]">
      {/* Phones: the modal fills the frame (no backdrop margin), so the pair stays short */}
      <div className="p-3 max-sm:p-0 @md:p-5">
        <div className="mx-auto max-w-[400px] overflow-hidden rounded-app-lg bg-app-surface shadow-[0_12px_32px_-12px_rgba(28,25,23,0.25)] ring-1 ring-app-border max-sm:rounded-none max-sm:shadow-none max-sm:ring-0">
          <div className="flex items-center justify-between gap-3 border-b border-app-border px-4 py-3">
            <p className="text-ui font-semibold text-app-text">Register ink</p>
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-app border border-app-border text-app-mute">
              <X size={14} strokeWidth={1.9} />
            </span>
          </div>
          <div className="flex flex-col gap-3 px-4 pt-3.5 pb-4">
            <div className="grid gap-3 @[17rem]:grid-cols-2">
              <FormField label="Brand" value="Sample brand" />
              <FormField label="Color" value="Lining black" />
              <FormField label="Product code" value={SKU["Black lining ink, 8 oz"]} />
              <FormField label="Batch number" value={LINING?.batch ?? ""} />
            </div>
            <div className="flex items-center gap-3 rounded-app bg-app-active/40 px-3 py-2.5 ring-1 ring-app-active-fg/20">
              <span className="min-w-0 flex-1">
                <span className="block text-ui-sm font-semibold text-app-text">REACH compliant</span>
                <span className="block text-ui-xs text-app-mute">EU 2020/2081 conformity confirmed</span>
              </span>
              <span className="relative h-5 w-9 shrink-0 rounded-full bg-app-active-fg">
                <span className="absolute top-0.5 left-[18px] h-4 w-4 rounded-full bg-white shadow-[0_1px_2px_rgba(28,25,23,0.2)]" />
              </span>
            </div>
          </div>
          <div className="flex justify-end gap-2 border-t border-app-border bg-graphite/[0.03] px-4 py-3">
            <AppButton>Cancel</AppButton>
            <AppButton variant="primary" icon={Check}>
              Register ink
            </AppButton>
          </div>
        </div>
      </div>
    </AppFrame>
  );
}

function ReachChip() {
  return (
    <span className="inline-flex h-[18px] shrink-0 items-center gap-0.5 rounded-[5px] bg-app-active px-1.5 text-[10px] font-bold tracking-[0.04em] text-app-active-fg">
      <ShieldCheck size={10} strokeWidth={2.4} />
      REACH
    </span>
  );
}

/** Every ink plus the needles and gloves: one list, the new ink first. */
const LIST_ROWS = [...INVENTORY_INKS, ...INVENTORY.filter((i) => i.category !== "Ink")].slice(0, 6);
/** Phones show the first four inks. */
const PHONE_ROWS = 4;

function ItemsWithInk() {
  return (
    <AppFrame active="inventory" sidebar={false} title="Inventory" meta="Items" className="shadow-none">
      <div className="flex flex-col gap-3 p-3 @md:p-4">
        <div className="hidden sm:block">
          <AppKpiStrip
            items={[
              { label: "REACH-registered", value: String(INVENTORY_REACH.length), note: `of ${INVENTORY_INKS.length} inks tracked`, accent: true },
              { label: "Items tracked", value: String(INVENTORY.length), note: "ink, needles, supplies" },
            ]}
          />
        </div>
        <div className="overflow-hidden rounded-app-lg bg-app-surface ring-1 ring-app-border">
          {LIST_ROWS.map((i, n) => (
            <div
              key={i.name}
              className={cn(
                "flex items-center gap-2.5 px-3 py-2",
                n < LIST_ROWS.length - 1 && "border-b border-app-border",
                n === PHONE_ROWS - 1 && "max-sm:border-b-0",
                n >= PHONE_ROWS && "max-sm:hidden",
                i === LINING && "bg-app-sidebar shadow-[inset_2px_0_0_var(--color-app-active-fg)]",
              )}
            >
              <span className="min-w-0 flex-1">
                <span className="block text-ui-sm leading-snug font-semibold text-app-text">{i.name}</span>
                <span className="block truncate text-ui-xs text-app-mute">{i.batch ? `Batch ${i.batch}` : i.category}</span>
              </span>
              {i.reach && <ReachChip />}
            </div>
          ))}
        </div>
      </div>
    </AppFrame>
  );
}

/* ─── Moment 2: logged movements take a bottle below par, then Reorder ────────
   The item drawer (inventory/_proto/drawers.tsx InvItemDrawer): stock, "Below par —
   reorder N to reach par", Recent movements (MoveTimeline: the reason as adapt.ts
   REASON_LABEL prints it, then who · when), then Reorder, which drafts a purchase
   order ("Draft purchase order created", ScrInventory.tsx). Only reasons the app
   writes today: "Received PO" from a PO receipt and "Stock adjustment" from the
   manual adjust route (lib/inventory/schemas.ts AdjustStockBodySchema). Session use
   is never shown: stock doesn't move itself when a session completes. The orders
   are the inventory mockup's: two drafts raised from low stock, one received. */
const MOVES: { type: string; who: string; when: string; qty: number }[] = [
  { type: "Stock adjustment", who: "Dev", when: "Today", qty: -1 },
  { type: "Received PO", who: "Noor", when: "Sep 29", qty: 2 },
];
const qtyLabel = (qty: number) => (qty > 0 ? `+${qty}` : `−${Math.abs(qty)}`);
const ORDERS: { ref: string; supplier: string; line: string; qty: number; state: "Draft" | "Received" }[] = [
  { ref: "PO-0015", supplier: "Ink distributor", line: "Black lining ink, 8 oz", qty: 2, state: "Draft" },
  { ref: "PO-0014", supplier: "Needle supplier", line: "Cartridges 3RL", qty: 5, state: "Draft" },
  { ref: "PO-0012", supplier: "Ink distributor", line: "Black shading ink, 4 oz", qty: 4, state: "Received" },
];
const PO_TONE: Record<"Draft" | "Received", AppStatusTone> = { Draft: "neutral", Received: "success" };

function ItemDrawer() {
  if (!LINING) return null;
  return (
    <AppFrame active="inventory" sidebar={false} title="Inventory" meta="Items" className="shadow-none">
      <div className="flex flex-col">
        <div className="flex items-center gap-3 border-b border-app-border px-4 py-3">
          <span className="h-9 w-9 shrink-0 rounded-full bg-graphite ring-2 ring-white ring-offset-1 ring-offset-app-border" />
          <span className="min-w-0">
            <span className="block truncate text-ui font-semibold text-app-text">{LINING.name}</span>
            <span className="block text-ui-xs text-app-mute">
              <span className="tabular-nums">{SKU[LINING.name]}</span> · {LINING.category}
            </span>
          </span>
        </div>
        <div className="flex flex-col gap-3 px-4 pt-3.5 pb-4">
          <div className="flex items-end justify-between gap-3">
            <span className="flex items-baseline gap-2">
              <span className="font-serif text-[40px] leading-[0.9] text-app-text italic">{LINING.onHand}</span>
              <span className="text-ui-sm text-app-mute">on hand · par {LINING.reorderAt}</span>
            </span>
            <AppStatus tone="warning" dot>
              Low
            </AppStatus>
          </div>
          <div className="flex items-center gap-2 rounded-app bg-app-warning-bg px-3 py-2">
            <TrendingDown size={14} strokeWidth={2} className="shrink-0 text-app-warning" />
            <span className="text-ui-xs font-medium text-app-text">
              Below par, reorder <b className="font-bold tabular-nums">{LINING.reorderAt - LINING.onHand}</b> to reach par.
            </span>
          </div>
          <div>
            <AppLabel className="mb-2">Recent movements</AppLabel>
            {MOVES.map((m, n) => {
              const into = m.qty > 0;
              return (
                <div key={`${m.type}-${m.when}`} className={cn("relative flex items-center gap-2.5", n < MOVES.length - 1 && "pb-3")}>
                  {/* The timeline's connector, as the app draws it between movements */}
                  {n < MOVES.length - 1 && <span className="absolute top-7 bottom-0 left-[13px] w-px bg-app-border" />}
                  <span
                    className={cn(
                      "relative flex h-7 w-7 shrink-0 items-center justify-center rounded-app",
                      into ? "bg-app-success-bg text-app-success" : "bg-graphite/[0.05] text-app-mute",
                    )}
                  >
                    {into ? <ArrowDownLeft size={14} strokeWidth={2} /> : <ArrowUpRight size={14} strokeWidth={2} />}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-ui-sm font-semibold text-app-text">{m.type}</span>
                    <span className="block truncate text-ui-xs text-app-mute">
                      {m.who} · {m.when}
                    </span>
                  </span>
                  <span className={cn("text-ui-sm font-bold tabular-nums", into ? "text-app-success" : "text-app-text")}>{qtyLabel(m.qty)}</span>
                </div>
              );
            })}
          </div>
        </div>
        <div className="flex gap-2 border-t border-app-border px-4 py-3">
          <AppButton variant="primary" icon={ShoppingCart} className="flex-1">
            Reorder
          </AppButton>
          <AppButton icon={Pencil} className="flex-1">
            Adjust stock
          </AppButton>
        </div>
      </div>
    </AppFrame>
  );
}

function DraftOrders() {
  return (
    <AppFrame active="inventory" sidebar={false} title="Inventory" meta="Purchase orders" className="shadow-none">
      <div className="flex flex-col gap-3 p-3 @md:p-4">
        <div className="flex items-center gap-2 rounded-app bg-app-success-bg px-3 py-2 text-ui-xs font-semibold text-app-success">
          <CheckCircle2 size={14} strokeWidth={2.2} className="shrink-0" />
          Draft purchase order created
        </div>
        <div className="overflow-hidden rounded-app-lg bg-app-surface ring-1 ring-app-border">
          {ORDERS.map((po, n) => {
            const unit = item(po.line)?.unitCostCents ?? 0;
            return (
              <div
                key={po.ref}
                className={cn(
                  "flex items-center gap-2.5 px-3 py-2.5",
                  n < ORDERS.length - 1 && "border-b border-app-border",
                  // Phones keep the two drafts.
                  n === 1 && "max-sm:border-b-0",
                  n > 1 && "max-sm:hidden",
                  n === 0 && "bg-app-sidebar shadow-[inset_2px_0_0_var(--color-app-active-fg)]",
                )}
              >
                <span className="min-w-0 flex-1">
                  <span className="flex items-center gap-2">
                    <span className="text-ui-xs font-bold text-app-text tabular-nums">{po.ref}</span>
                    <span className="truncate text-ui-xs text-app-mute">{po.supplier}</span>
                  </span>
                  <span className="block truncate text-ui-sm text-app-text">
                    {po.line} × {po.qty}
                  </span>
                </span>
                <span className="flex shrink-0 flex-col items-end gap-1">
                  <span className="text-ui-sm font-bold text-app-text tabular-nums">{usd(po.qty * unit)}</span>
                  <AppStatus tone={PO_TONE[po.state]} dot>
                    {po.state}
                  </AppStatus>
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </AppFrame>
  );
}

/* ─── Moment 3: the disclosure on the front-desk kiosk, the batches on the form ─
   Asha M. signed "Tattoo consent — general" at 9:51 on the kiosk (sample-data
   SUBMISSIONS via "Kiosk"; Messages reads "Today, 9:51 · kiosk"): the front-desk iPad
   on its stand, running the kiosk link (forms/_proto/KioskFlow.tsx), which opens the
   same signing flow as a phone. The standard consent carries an "EU REACH Ink
   Disclosure" the client acknowledges (app/consent/_proto/ProtoSectionRenderer.tsx
   ink_disclosure) and an "Ink batch record" of brand, color and batch for the
   session's inks (reach_batch_record). Session 4 is "Color, forearm": the black
   lining and shading plus the red, all REACH-registered (Sky blue is not, so it
   stays off Asha's record). */
const ASHA = TODAY_SESSIONS.find((s) => s.id === "asha-s4");
const ASHA_FORM = SUBMISSIONS.find((s) => s.client === "Asha M.");
const SIGNED_AT = ASHA_FORM?.when.replace("Today, ", "") ?? "9:51";
const BATCH_INKS = [LINING, SHADING, RED].filter((i): i is InventoryItem => Boolean(i));

function KioskDisclosure() {
  return (
    <div aria-hidden="true" className="mx-auto flex w-full max-w-[400px] flex-col items-center">
      {/* A tablet, not a phone: even bezels, the camera in the top bezel, a stand under it */}
      <div className="relative w-full rounded-[22px] bg-graphite px-2.5 pt-4 pb-2.5 shadow-lift">
        <span className="absolute top-[6px] left-1/2 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-white/20" />
        <div className="overflow-hidden rounded-[12px] bg-white">
          <div className="flex items-center justify-between gap-2 border-b border-app-border bg-app-sidebar px-3.5 py-2.5">
            <LimespunMark size={18} />
            <SampleTag className="px-1.5 text-[10px]" />
          </div>
          <div className="flex flex-col gap-3 px-3.5 pt-3 pb-4">
            <div>
              <p className="font-serif text-[22px] leading-none text-app-text">Tattoo consent</p>
              <p className="mt-1 truncate text-ui-xs text-app-mute">
                {ASHA ? `${ASHA.client} · ${ASHA.piece}, session ${ASHA.session?.n} · Oct 8, ${ASHA.start}` : ""}
              </p>
            </div>
            <div className="flex items-center gap-1">
              {[0, 1, 2, 3, 4, 5].map((i) => (
                <span key={i} className={cn("h-1 flex-1 rounded-full", i < 5 ? "bg-app-text" : "bg-graphite/10")} />
              ))}
            </div>
            <div className="rounded-app-lg bg-app-active/40 p-3 ring-1 ring-app-active-fg/40">
              <div className="flex items-start gap-2">
                <Scale size={15} strokeWidth={1.9} className="mt-px shrink-0 text-app-active-fg" />
                <span className="min-w-0">
                  <span className="block text-kpi-label font-bold text-app-soft uppercase">EU REACH ink disclosure</span>
                  <span className="mt-1 block text-ui-xs leading-snug text-app-text">
                    The inks for this session are REACH-registered. Their brand, color and batch go on your signed form.
                  </span>
                </span>
              </div>
              <div className="mt-2.5 flex items-center justify-between gap-2 border-t border-app-active-fg/20 pt-2.5">
                <span className="text-ui-xs font-semibold text-app-text">I acknowledge this disclosure</span>
                <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-[4px] bg-app-active-fg text-white">
                  <Check size={10} strokeWidth={3} />
                </span>
              </div>
            </div>
            <span className="flex h-9 items-center justify-center gap-1.5 rounded-app bg-app-text text-ui-sm font-semibold text-white">
              Sign &amp; submit
            </span>
          </div>
        </div>
      </div>
      <span className="h-5 w-12 bg-graphite/85" />
      <span className="h-2.5 w-40 rounded-full bg-graphite" />
    </div>
  );
}

function SignedBatchRecord() {
  return (
    <AppFrame active="forms" sidebar={false} title="Forms" meta="Submissions" className="shadow-none">
      <div className="flex flex-col gap-3 p-3 @md:p-4">
        <div className="flex items-start justify-between gap-3">
          <span className="min-w-0">
            <span className="block truncate text-ui font-semibold text-app-text">{ASHA_FORM?.form}</span>
            <span className="block truncate text-ui-xs text-app-mute">
              {ASHA_FORM?.client} · {ASHA_FORM?.session}
            </span>
          </span>
          <AppStatus tone="success" dot>
            Signed {SIGNED_AT}
          </AppStatus>
        </div>
        <div className="flex items-center justify-between gap-2 rounded-app bg-graphite/[0.04] px-3 py-2">
          <span className="flex min-w-0 items-center gap-2 text-ui-xs text-app-text">
            <Scale size={13} strokeWidth={1.9} className="shrink-0 text-app-mute" />
            <span className="truncate">EU REACH ink disclosure</span>
          </span>
          <span className="shrink-0 text-ui-xs font-semibold text-app-success">Acknowledged</span>
        </div>
        <div className="overflow-hidden rounded-app-lg bg-app-surface ring-1 ring-app-border">
          <div className="flex items-center gap-2 border-b border-app-border px-3 py-2">
            <FlaskConical size={13} strokeWidth={1.9} className="text-app-mute" />
            <AppLabel>Ink batch record</AppLabel>
          </div>
          {BATCH_INKS.map((i, n) => (
            <div key={i.name} className={cn("flex items-center gap-2.5 px-3 py-2", n < BATCH_INKS.length - 1 && "border-b border-app-border")}>
              <span className={cn("h-4 w-4 shrink-0 rounded-full", SWATCH[i.name] ?? "bg-graphite")} />
              <span className="min-w-0 flex-1">
                <span className="block truncate text-ui-sm font-semibold text-app-text">{i.name}</span>
                <span className="block truncate text-ui-xs text-app-mute tabular-nums">
                  <span className="@max-[20rem]:hidden">{SKU[i.name]} · </span>Batch {i.batch}
                </span>
              </span>
              {i.reach && <ReachChip />}
            </div>
          ))}
        </div>
      </div>
    </AppFrame>
  );
}

export default function InventoryPage() {
  return (
    <FeaturePage
      feature={feature}
      headings={{
        moments: "Registered, logged and disclosed",
        details: "What else it does",
        worksWith: "Joined to consent and reports",
        worksWithLead: "Ink batches sit with the signed consent, and stock value and low items go straight into Reports.",
      }}
      visuals={{
        hero: <InventoryScreen tab="items" />,
        heroCrop: true,
        moments: [
          { before: <RegisterInk />, after: <ItemsWithInk />, beforeLabel: "Register ink", afterLabel: "In the list" },
          { before: <ItemDrawer />, after: <DraftOrders />, beforeLabel: "Below par", afterLabel: "Draft order" },
          { before: <KioskDisclosure />, after: <SignedBatchRecord />, beforeLabel: `On the kiosk, ${SIGNED_AT}`, afterLabel: "On the signed form" },
        ],
        detailLabels: [
          { label: "Items", tone: "quiet" },
          { label: "REACH", tone: "ember" },
          { label: "Low", tone: "warning" },
          { label: "Stocktake", tone: "quiet" },
          { label: "Stock adjustment", tone: "quiet" },
          { label: "Aftercare", tone: "quiet" },
        ],
      }}
      planRows={[
        { label: "Items, movements and purchase orders", from: "solo" },
        { label: "EU REACH ink registry", from: "solo" },
        { label: "Par levels and stocktake", from: "solo" },
        { label: "Ink disclosure on the consent form", from: "solo" },
      ]}
      inkBand={{ headline: "Log the batch when the box arrives.", italicWord: "batch" }}
    />
  );
}
