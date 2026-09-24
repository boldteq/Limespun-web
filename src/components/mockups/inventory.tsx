import { Plus, ScanLine, ShieldCheck } from "lucide-react";
import { AppFrame } from "./app-frame";
import { AppButton, AppCard, AppKpiStrip, AppStatus, AppTable, AppTabs, type AppStatusTone, type AppTableRow } from "./app-parts";
import { ToolbarListRow, ToolbarPill, ToolbarSearch } from "./projects";
import {
  INVENTORY,
  INVENTORY_INKS,
  INVENTORY_LOW,
  INVENTORY_REACH,
  INVENTORY_VALUE_CENTS,
  usd,
  type InventoryItem,
} from "./sample-data";

export type InventoryTab = "items" | "movements" | "purchase-orders";

/** SKUs and suppliers as this studio set them up. Suppliers are named by what they sell. */
const SKU: Record<string, string> = {
  "Black lining ink, 8 oz": "INK-BLK-L8",
  "Black shading ink, 4 oz": "INK-BLK-S4",
  "Red, 1 oz": "INK-RED-1",
  "White highlight, 1 oz": "INK-WHT-1",
  "Sky blue, 1 oz": "INK-BLU-1",
  "Cartridges 3RL": "NDL-3RL",
  "Cartridges 9RM": "NDL-9RM",
  "Nitrile gloves, M": "SUP-GLV-M",
};
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
        <span key="s" className="text-ui-xs tracking-[0.02em] text-app-soft tabular-nums">
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
      <div className="flex flex-wrap items-center gap-2">
        <ToolbarSearch placeholder="Search items" className="w-full @xl:w-[220px]" />
        <span className="hidden flex-wrap gap-2 @xl:flex">
          <ToolbarPill active>All</ToolbarPill>
          <ToolbarPill count={INVENTORY_LOW.length}>Low &amp; out</ToolbarPill>
          <ToolbarPill count={INVENTORY_REACH.length}>REACH-registered</ToolbarPill>
        </span>
      </div>
      <AppCard padded={false}>
        <div className="@xl:hidden">
          {INVENTORY.slice(0, PHONE_ROWS).map((i, n) => {
            const s = stock(i);
            return (
              <ToolbarListRow
                key={i.name}
                title={i.name}
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
        <AppTable
          columns={[{ label: "Item" }, { label: "Type" }, { label: "By" }, { label: "Quantity", align: "right" }, { label: "When", align: "right" }]}
          rows={MOVEMENTS.map((m) => ({
            key: `${m.item}-${m.when}`,
            cells: [
              <span key="i" className="font-semibold">
                {m.item}
              </span>,
              <AppStatus key="t" tone={m.type === "Received" ? "success" : m.type === "Used" ? "neutral" : "info"}>
                {m.type}
              </AppStatus>,
              m.by,
              <span key="q" className={m.qty > 0 ? "font-semibold text-app-success" : "font-semibold"}>
                {m.qty > 0 ? `+${m.qty}` : `−${Math.abs(m.qty)}`}
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

function PurchaseOrders() {
  return (
    <AppCard padded={false}>
      <AppTable
        columns={[{ label: "Reference" }, { label: "Supplier" }, { label: "Items" }, { label: "Status" }, { label: "Total", align: "right" }]}
        rows={PURCHASE_ORDERS.map((po) => {
          const first = byName(po.lines[0]?.item ?? "");
          return {
            key: po.ref,
            tone: po.state === "Draft" ? "active" : "default",
            cells: [
              <span key="r" className="text-ui-xs font-semibold tracking-[0.02em] tabular-nums">
                {po.ref}
              </span>,
              first ? SUPPLIER[first.category] : "—",
              <span key="l" className="min-w-0">
                <span className="block">{po.lines.map((l) => `${l.item} × ${l.qty}`).join(", ")}</span>
                <span className="block text-ui-xs text-app-mute">{po.eta}</span>
              </span>,
              <AppStatus key="s" tone={PO_TONE[po.state]} dot>
                {po.state}
              </AppStatus>,
              <span key="t" className="font-semibold">
                {usd(poTotalCents(po.lines))}
              </span>,
            ],
          };
        })}
        minWidth={640}
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
