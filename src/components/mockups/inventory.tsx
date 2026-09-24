import { ArrowUpDown, Columns3, ListFilter, Plus, ScanLine, ShieldCheck } from "lucide-react";
import { AppFrame } from "./app-frame";
import { AppButton, AppCard, AppKpiStrip, AppStatus, AppTable, AppTabs, type AppStatusTone, type AppTableRow } from "./app-parts";
import { ToolbarListRow, ToolbarPill, ToolbarSearch, ToolbarSelect } from "./projects";
import {
  INVENTORY,
  INVENTORY_INKS,
  INVENTORY_LOW,
  INVENTORY_REACH,
  INVENTORY_SKU,
  INVENTORY_VALUE_CENTS,
  usd,
  type InventoryItem,
} from "./sample-data";

export type InventoryTab = "items" | "movements" | "purchase-orders";

/** SKUs from sample-data; suppliers as this studio set them up, named by what they sell. */
const SKU = INVENTORY_SKU;
const SUPPLIER: Record<InventoryItem["category"], string> = {
  Ink: "Ink distributor",
  Needles: "Needle supplier",
  Supplies: "Medical supply",
};

/** Stock chips from inventory/_proto/data.ts: In stock · Low · Out. */
function stock(i: InventoryItem): { tone: AppStatusTone; label: string } {
  if (i.onHand === 0) return { tone: "danger", label: "Out" };
  if (i.onHand <= i.reorderAt) return { tone: "warning", label: "Low" };
  return { tone: "success", label: "In stock" };
}

const byName = (name: string) => INVENTORY.find((i) => i.name === name);

/* Movements: today's use at the chair, last week's delivery and Monday's stocktake. */
const MOVEMENTS: { item: string; type: "Used" | "Received" | "Adjustment"; by: string; qty: number; when: string }[] = [
  { item: "Black lining ink, 8 oz", type: "Used", by: "Dev", qty: -1, when: "Today, 10:05" },
  { item: "Cartridges 3RL", type: "Used", by: "Dev", qty: -2, when: "Today, 10:02" },
  { item: "Nitrile gloves, M", type: "Used", by: "Mara", qty: -1, when: "Wed, Oct 7" },
  { item: "Black shading ink, 4 oz", type: "Received", by: "Noor", qty: 4, when: "Tue, Oct 6" },
  { item: "Sky blue, 1 oz", type: "Adjustment", by: "Dev", qty: -1, when: "Mon, Oct 5" },
];

/* Purchase orders: two drafts raised from the low-stock items, one received delivery. */
const PURCHASE_ORDERS: { ref: string; lines: { item: string; qty: number }[]; state: "Draft" | "Ordered" | "Received"; eta: string }[] = [
  { ref: "PO-0015", lines: [{ item: "Black lining ink, 8 oz", qty: 2 }], state: "Draft", eta: "Raised from low stock" },
  { ref: "PO-0014", lines: [{ item: "Cartridges 3RL", qty: 5 }], state: "Draft", eta: "Raised from low stock" },
  { ref: "PO-0012", lines: [{ item: "Black shading ink, 4 oz", qty: 4 }], state: "Received", eta: "Received Tue, Oct 6" },
];

const PO_TONE: Record<"Draft" | "Ordered" | "Received", AppStatusTone> = { Draft: "neutral", Ordered: "info", Received: "success" };

function poTotalCents(lines: { item: string; qty: number }[]): number {
  return lines.reduce((total, l) => total + l.qty * (byName(l.item)?.unitCostCents ?? 0), 0);
}

/** Rows the phone list shows: every ink plus the low needles. */
const PHONE_ROWS = 6;

function Items() {
  const rows: AppTableRow[] = INVENTORY.map((i) => {
    const s = stock(i);
    return {
      key: i.name,
      tone: s.label === "In stock" ? "default" : "active",
      cells: [
        <span key="n" className="flex items-center gap-2">
          <span className="min-w-0">
            <span className="block font-semibold text-app-text">{i.name}</span>
            {i.batch && <span className="block text-ui-xs text-app-mute">Batch {i.batch}</span>}
          </span>
          {i.reach && (
            <span className="inline-flex h-[18px] items-center gap-0.5 rounded-[5px] bg-app-active px-1.5 text-[10px] font-bold tracking-[0.04em] text-app-active-fg">
              <ShieldCheck size={10} strokeWidth={2.4} />
              REACH
            </span>
          )}
        </span>,
        <span key="s" className="text-ui-xs tracking-[0.02em] text-app-soft">
          {SKU[i.name]}
        </span>,
        i.category,
        <span key="q" className="inline-flex items-center gap-2">
          <span className="font-semibold">{i.onHand}</span>
          <AppStatus tone={s.tone} dot>
            {s.label}
          </AppStatus>
        </span>,
        i.reorderAt,
        usd(i.unitCostCents, true),
        <span key="p" className="text-app-soft">
          {SUPPLIER[i.category]}
        </span>,
      ],
    };
  });
  return (
    <>
      {/* ItemsTab toolbar: the search, then Filter · Sort · Columns (no preset pills). */}
      <div className="flex items-center gap-2">
        {/* The app's full placeholder, a size smaller in phone frames so it reads whole. */}
        <ToolbarSearch placeholder="Search by name, SKU, or supplier…" className="min-w-0 flex-1 text-[11px] @sm:text-ui-sm @xl:max-w-[320px]" />
        <span className="ml-auto hidden items-center gap-1.5 @xl:flex">
          <ToolbarSelect icon={ListFilter} label="Filter" />
          <ToolbarSelect icon={ArrowUpDown} label="Sort" />
          <ToolbarSelect icon={Columns3} label="Columns" />
        </span>
      </div>
      <AppCard padded={false}>
        <div className="@xl:hidden">
          {INVENTORY.slice(0, PHONE_ROWS).map((i, n) => {
            const s = stock(i);
            return (
              <ToolbarListRow
                key={i.name}
                /* The name wraps rather than cut beside the quantity in a phone frame. */
                title={<span className="whitespace-normal">{i.name}</span>}
                sub={`${i.category} · par ${i.reorderAt}${i.reach ? " · REACH" : ""}`}
                value={`${i.onHand} ${i.onHand === 1 ? i.unit : `${i.unit}${i.unit === "box" ? "es" : "s"}`}`}
                status={
                  <AppStatus tone={s.tone} dot>
                    {s.label}
                  </AppStatus>
                }
                last={n === PHONE_ROWS - 1}
              />
            );
          })}
        </div>
        <AppTable
          className="hidden @xl:block"
          columns={[
            { label: "Item" },
            { label: "SKU" },
            { label: "Category" },
            { label: "Qty" },
            { label: "Par", align: "right" },
            { label: "Unit cost", align: "right" },
            { label: "Supplier" },
          ]}
          rows={rows}
          minWidth={840}
        />
      </AppCard>
    </>
  );
}

const MOVEMENT_TONE: Record<(typeof MOVEMENTS)[number]["type"], AppStatusTone> = { Received: "success", Used: "neutral", Adjustment: "info" };
const qtyLabel = (qty: number) => (qty > 0 ? `+${qty}` : `−${Math.abs(qty)}`);

function Movements() {
  return (
    <>
      <div className="flex flex-wrap gap-2">
        <ToolbarPill active>All</ToolbarPill>
        <ToolbarPill>Received</ToolbarPill>
        <ToolbarPill>Used</ToolbarPill>
        <ToolbarPill>Adjustments</ToolbarPill>
      </div>
      <AppCard padded={false}>
        {/* Narrow frames: a stacked list, as the Items tab has, so no Type pill is cut. */}
        <div className="@xl:hidden">
          {MOVEMENTS.map((m, i) => (
            <ToolbarListRow
              key={`${m.item}-${m.when}`}
              /* The item wraps rather than cut beside a long chip ("Received") at 320. */
              title={<span className="whitespace-normal">{m.item}</span>}
              sub={`${m.by} · ${m.when}`}
              value={<span className={m.qty > 0 ? "text-app-success" : undefined}>{qtyLabel(m.qty)}</span>}
              status={<AppStatus tone={MOVEMENT_TONE[m.type]}>{m.type}</AppStatus>}
              last={i === MOVEMENTS.length - 1}
            />
          ))}
        </div>
        <AppTable
          className="hidden @xl:block"
          columns={[{ label: "Item" }, { label: "Type" }, { label: "By" }, { label: "Quantity", align: "right" }, { label: "When", align: "right" }]}
          rows={MOVEMENTS.map((m) => ({
            key: `${m.item}-${m.when}`,
            cells: [
              <span key="i" className="font-semibold">
                {m.item}
              </span>,
              <AppStatus key="t" tone={MOVEMENT_TONE[m.type]}>
                {m.type}
              </AppStatus>,
              m.by,
              <span key="q" className={m.qty > 0 ? "font-semibold text-app-success" : "font-semibold"}>
                {qtyLabel(m.qty)}
              </span>,
              <span key="w" className="text-app-mute">
                {m.when}
              </span>,
            ],
          }))}
          minWidth={640}
        />
      </AppCard>
    </>
  );
}

/**
 * POsTab: Reference · Supplier (with "N items" under it) · Status · Total. Four
 * columns that fit a 360px table; narrow frames get the same rows stacked.
 */
function PurchaseOrders() {
  const itemsLine = (po: (typeof PURCHASE_ORDERS)[number]) => `${po.lines.length} item${po.lines.length === 1 ? "" : "s"}`;
  const supplierOf = (po: (typeof PURCHASE_ORDERS)[number]) => {
    const first = byName(po.lines[0]?.item ?? "");
    return first ? SUPPLIER[first.category] : "—";
  };
  return (
    <AppCard padded={false}>
      <div className="@md:hidden">
        {PURCHASE_ORDERS.map((po, i) => (
          <ToolbarListRow
            key={po.ref}
            title={supplierOf(po)}
            sub={`${po.ref} · ${itemsLine(po)}`}
            value={usd(poTotalCents(po.lines))}
            status={
              <AppStatus tone={PO_TONE[po.state]} dot>
                {po.state}
              </AppStatus>
            }
            last={i === PURCHASE_ORDERS.length - 1}
          />
        ))}
      </div>
      <AppTable
        className="hidden @md:block"
        columns={[{ label: "Reference" }, { label: "Supplier" }, { label: "Status" }, { label: "Total", align: "right" }]}
        rows={PURCHASE_ORDERS.map((po) => ({
          key: po.ref,
          tone: po.state === "Draft" ? "active" : "default",
          cells: [
            <span key="r" className="text-ui-xs tracking-[0.02em] text-app-soft">
              {po.ref}
            </span>,
            <span key="s" className="flex flex-col leading-tight">
              <span className="font-semibold text-app-text">{supplierOf(po)}</span>
              <span className="text-ui-xs text-app-mute">{itemsLine(po)}</span>
            </span>,
            <AppStatus key="st" tone={PO_TONE[po.state]} dot>
              {po.state}
            </AppStatus>,
            <span key="t" className="font-bold">
              {usd(poTotalCents(po.lines))}
            </span>,
          ],
        }))}
        minWidth={360}
      />
    </AppCard>
  );
}

const TAB_LABEL: Record<InventoryTab, string> = { items: "Items", movements: "Movements", "purchase-orders": "Purchase orders" };

/**
 * Inventory (app: /inventory, inventory/_proto/ScrInventory.tsx, ItemsTab,
 * MovementsTab, POsTab). REACH-registered counts the inks in the studio's Ink
 * registry; low stock raises a draft purchase order.
 */
export function InventoryScreen({ tab = "items", className }: { tab?: InventoryTab; className?: string }) {
  const categories = new Set(INVENTORY.map((i) => i.category)).size;
  return (
    <AppFrame
      active="inventory"
      className={className}
      actions={
        <>
          <AppButton icon={ScanLine}>Stocktake</AppButton>
          <AppButton variant="primary" icon={Plus}>
            Add item
          </AppButton>
        </>
      }
    >
      <div className="flex flex-col gap-4 p-4 @lg:p-6">
        <AppKpiStrip
          items={[
            { label: "Items tracked", value: String(INVENTORY.length), note: `across ${categories} categories` },
            { label: "Low / out", value: String(INVENTORY_LOW.length), note: "reorder soon", accent: INVENTORY_LOW.length > 0 },
            { label: "REACH-registered", value: String(INVENTORY_REACH.length), note: `of ${INVENTORY_INKS.length} inks tracked` },
            { label: "Stock value", value: usd(INVENTORY_VALUE_CENTS), note: "at cost" },
          ]}
        />
        <AppTabs
          tabs={[
            { label: "Items", count: INVENTORY.length },
            { label: "Movements", count: MOVEMENTS.length },
            { label: "Purchase orders", count: PURCHASE_ORDERS.length },
            { label: "Suppliers", count: Object.keys(SUPPLIER).length },
          ]}
          active={TAB_LABEL[tab]}
          className="-mx-4 @lg:-mx-6 @lg:px-6"
        />
        {tab === "items" && <Items />}
        {tab === "movements" && <Movements />}
        {tab === "purchase-orders" && <PurchaseOrders />}
      </div>
    </AppFrame>
  );
}
