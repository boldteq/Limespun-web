"use client";

import React from "react";
import { Nav } from "@/components/layout/nav";
import { Footer } from "@/components/layout/footer";
import { ProductHero } from "@/components/product/product-hero";
import { ProductPillars } from "@/components/product/product-pillars";
import { ProductAnatomy } from "@/components/product/product-anatomy";
import { ProductItemTypes } from "@/components/product/product-item-types";
import { ProductVsTable } from "@/components/product/product-vs-table";
import { ProductDayInLife } from "@/components/product/product-day-in-life";
import { ProductRelated } from "@/components/product/product-related";
import { ProductCTA } from "@/components/product/product-cta";
import { MONEY_BACK_DAYS } from "@/lib/data/plans";
import { DashboardMockup } from "@/components/dashboard/dashboard-mockup";
import { BRAND } from "@/lib/brand";
import {
  Shield,
  Package,
  AlertCircle,
  Sparkles,
  Droplets,
  Heart,
  LayoutGrid,
  RefreshCw,
  TrendingUp,
  FileText,
  Users,
} from "lucide-react";

export default function InventoryPage() {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: BRAND.bone,
        overflow: "hidden",
      } as React.CSSProperties}
    >
      <Nav />
      <main>
        <ProductHero
          feature="Inventory"
          headline="The cabinet, in software."
          italicWord="in software"
          subhead="Every ink, every needle, every batch. EU REACH 2022 compliance built in. Inspector-ready in 30 seconds. Cross-studio reaction logging when a batch causes a problem anywhere."
          dashboard={<DashboardMockup />}
        />

        <ProductPillars
          eyebrow="What Limespun tracks"
          heading="Three problems the cabinet can't solve."
          italicWord="the cabinet can't solve"
          intro="A physical cabinet tells you what you have. Limespun tells you what you have, where it came from, whether it's compliant, and if it's caused a reaction anywhere in your studio."
          pillars={[
            {
              icon: Shield,
              accent: BRAND.rust,
              eyebrow: "REACH 2022 compliance",
              title: "Inspector-ready in 30 seconds.",
              desc: "EU REACH Annex XVII regulation requires per-bottle CI numbers, MSDS documents, and supplier batch references. Limespun captures all of it at intake.",
              bullets: [
                "CI number per bottle at intake",
                "MSDS document attached per product",
                "REACH violation flag on non-compliant inks",
                "One-click inspector report — all 84 inks, one PDF",
              ],
            },
            {
              icon: Package,
              accent: BRAND.amber,
              eyebrow: "Stock + batch tracking",
              title: "Every bottle, every needle, every reorder.",
              desc: "Stock levels, batch numbers, expiry dates, and supplier order history — tracked per item. Auto-reorder thresholds prevent running out mid-session.",
              bullets: [
                "Per-bottle quantity and expiry tracking",
                "Supplier order history per product",
                "Auto-reorder threshold alerts",
                "Vendor cost tracking for studio P&L",
              ],
            },
            {
              icon: AlertCircle,
              accent: BRAND.sage,
              eyebrow: "Reaction logging",
              title: "Tied to client AND batch — cross-studio intel.",
              desc: "When a client has a reaction, the batch is flagged. If the same batch is in another studio location, a cross-studio warning fires automatically.",
              bullets: [
                "Reaction logged per client and per batch",
                "Batch flagged studio-wide on first reaction",
                "Cross-studio batch warning across locations",
                "Reaction history exportable for supplier claims",
              ],
            },
          ]}
        />

        <ProductAnatomy
          eyebrow="Inside the inventory record"
          heading="Five things on every ink card."
          italicWord="Five things"
          intro="The ink card carries everything the studio and an inspector need to know — without opening a filing cabinet."
          dashboard={<DashboardMockup />}
          callouts={[
            {
              n: 1,
              title: "Ink card details",
              desc: "Brand, colour name, CI number, volume, batch number, and expiry date — the full record on one screen.",
              position: { top: "12%", left: "30%" },
            },
            {
              n: 2,
              title: "MSDS attachment",
              desc: "Material Safety Data Sheet attached at intake. One click to open or download for inspection.",
              position: { top: "28%", left: "60%" },
            },
            {
              n: 3,
              title: "Low-stock indicator",
              desc: "Amber warning when stock drops below the reorder threshold. Red when critically low.",
              position: { top: "46%", left: "38%" },
            },
            {
              n: 4,
              title: "REACH violation flag",
              desc: "Red banner when an ink doesn't meet EU Annex XVII requirements. Flagged at intake, not at inspection.",
              position: { top: "62%", left: "64%" },
            },
            {
              n: 5,
              title: "Supplier order history",
              desc: "Every order from every supplier, with batch numbers and delivery dates. Cost per unit tracked for the studio P&L.",
              position: { top: "80%", left: "44%" },
            },
          ]}
        />

        <ProductItemTypes
          eyebrow="What Limespun tracks"
          heading="Eight inventory categories, one cabinet."
          italicWord="Eight inventory categories"
          intro="Every consumable a tattoo studio uses — tracked, batched, and REACH-compliant where required."
          columns={4}
          items={[
            {
              icon: Sparkles,
              accent: BRAND.rust,
              severity: "REACH required",
              title: "Tattoo inks",
              desc: "CI number, batch reference, MSDS, and expiry date per bottle. REACH compliance checked at intake.",
              example: "84 inks across 6 brands — all CI-logged",
            },
            {
              icon: Package,
              accent: BRAND.amber,
              severity: "Per gauge",
              title: "Needles",
              desc: "Gauge, configuration, and brand tracked per box. Sterile expiry date logged. Low-stock alert by gauge.",
              example: "9RL, 11M1, 14RS — separate threshold per type",
            },
            {
              icon: Package,
              accent: BRAND.sage,
              severity: "Per brand",
              title: "Cartridges",
              desc: "Cartridge brand, needle type, and box count tracked. Grouped by artist preference for reorder.",
              example: "Cheyenne, FK Irons — reorder by artist usage",
            },
            {
              icon: Droplets,
              accent: BRAND.rust,
              title: "Cleaning supplies",
              desc: "Green soap, distilled water, barrier film, and stencil solution — quantity and reorder threshold per item.",
              example: "Green soap: 2 bottles remaining — threshold 4",
            },
            {
              icon: Heart,
              accent: BRAND.amber,
              title: "Aftercare products",
              desc: "Studio-stocked aftercare creams, balms, and wraps. Sold at checkout or given per session.",
              example: "Hustle Butter 12-pack — 3 remaining",
            },
            {
              icon: LayoutGrid,
              accent: BRAND.sage,
              title: "Studio supplies",
              desc: "Paper towels, gloves, razors, and transfer paper — quantity tracked with low-stock alerts.",
              example: "Nitrile gloves S/M/L — tracked separately",
            },
            {
              icon: RefreshCw,
              accent: BRAND.rust,
              title: "Disposables",
              desc: "Single-use items tracked by session. Usage patterns surfaced to predict reorder timing.",
              example: "Avg 3.2 cartridges per session — auto-calculated",
            },
            {
              icon: TrendingUp,
              accent: BRAND.amber,
              title: "Vendor orders",
              desc: "Purchase orders, delivery confirmations, and supplier invoices — logged per vendor with cost history.",
              example: "Intenze order #441 — £320 — delivered Jan 14",
            },
          ]}
        />

        <ProductVsTable
          eyebrow="How it compares"
          heading="The only cabinet with REACH inside."
          italicWord="REACH inside"
          competitors={[
            "Limespun Inventory",
            "DaySmart",
            "TattooGenda",
            "Spreadsheet",
          ]}
          rows={[
            {
              feature: "EU REACH 2022 Annex XVII compliance",
              values: [true, false, true, false],
            },
            {
              feature: "Per-bottle CI number tracking",
              values: [true, false, true, false],
            },
            {
              feature: "MSDS document attachments",
              values: [true, false, false, false],
            },
            {
              feature: "Per-batch reaction logging",
              values: [true, false, false, false],
            },
            {
              feature: "One-click inspector report",
              values: [true, false, false, false],
            },
            {
              feature: "Cross-studio batch warning",
              values: [true, false, false, false],
            },
            {
              feature: "Auto-reorder thresholds",
              values: [true, true, false, false],
            },
            {
              feature: "Vendor cost tracking",
              values: [true, true, false, true],
            },
          ]}
          caption="Based on published features as of Q1 2025. Limespun first column."
        />

        <ProductDayInLife
          eyebrow="A day in the studio"
          heading="The inspector who arrived on a Tuesday."
          italicWord="arrived on a Tuesday"
          intro="A three-chair studio in Amsterdam. REACH inspector walk-in. She had 30 seconds."
          paragraphs={[
            "The inspector arrived unannounced at 11am on a Tuesday. No warning, no appointment. The studio was mid-session across three chairs.",
            <React.Fragment key="p2">
              Asha opened Limespun on the front desk iPad, tapped <strong>Inventory → REACH Report</strong>, and hit export. The PDF was on screen in 28 seconds.
            </React.Fragment>,
            "All 84 inks. CI numbers, batch references, MSDS links, expiry dates — every field the inspector needed. Two inks were flagged as non-compliant at intake six months earlier and had already been removed from service.",
            "The inspector spent four minutes reviewing the report. No findings. No follow-up required. The studio was back to full capacity before noon.",
          ]}
          quote="When an inspector walks in unannounced, the batch log and every SDS are one search away."
          takeawayLabel="What changes"
        />

        <ProductRelated
          eyebrow="Connects directly to"
          heading="Inventory feeds compliance and billing."
          italicWord="compliance and billing"
          modules={[
            {
              icon: Users,
              label: "Clients",
              desc: "Ink batch reactions tie back to the client record. Allergy flags surface when the same batch is reused.",
              href: "/product/clients",
            },
            {
              icon: Shield,
              label: "REACH hub",
              desc: "Compliance dashboard rolls up REACH status across all inks. Inspector report generated here.",
              href: "/reach-compliance",
            },
            {
              icon: FileText,
              label: "Forms",
              desc: "REACH ink waivers capture CI numbers per session — synced to the ink batch in inventory.",
              href: "/product/forms",
            },
            {
              icon: TrendingUp,
              label: "Payments",
              desc: "Supply costs per session deducted from studio revenue in the P&L view.",
              href: "/product/payments",
            },
          ]}
        />

        <ProductCTA
          headline="Inventory, on the rails."
          italicWord="on the rails"
          subhead={`${MONEY_BACK_DAYS}-day money-back guarantee. REACH compliance, batch tracking, and reaction logging from day one.`}
        />
      </main>
      <Footer />
    </div>
  );
}
