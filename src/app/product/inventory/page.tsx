"use client";

import React from "react";
import { Nav } from "@/components/layout/nav";
import { Footer } from "@/components/layout/footer";
import { ProductHero } from "@/components/product/product-hero";
import { ProductPillars } from "@/components/product/product-pillars";
import { ProductAnatomy } from "@/components/product/product-anatomy";
import { ProductItemTypes } from "@/components/product/product-item-types";
import { ProductDayInLife } from "@/components/product/product-day-in-life";
import { ProductRelated } from "@/components/product/product-related";
import { ProductCTA } from "@/components/product/product-cta";
import { MONEY_BACK_DAYS } from "@/lib/data/plans";
import { InventoryScreen } from "@/components/mockups";
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
          subhead="Every ink, every needle, every batch. Stock by item, every movement logged, purchase orders to your suppliers. REACH-registered inks marked, and each use logged to your Ink registry."
          dashboard={<InventoryScreen />}
        />

        <ProductPillars
          eyebrow="What Limespun tracks"
          heading="Three problems the cabinet can't solve."
          italicWord="the cabinet can't solve"
          intro="A physical cabinet tells you what you have. Limespun tells you what you have, where it came from, when it was used and whether the ink is REACH-registered."
          pillars={[
            {
              icon: Shield,
              accent: BRAND.rust,
              eyebrow: "EU REACH records",
              title: "REACH-registered inks, marked.",
              desc: "Keep each ink's brand and batch in the Ink registry. REACH-registered inks carry a REACH passport on their card, and each use is logged as proof for clients and inspectors.",
              bullets: [
                "Brand and batch in the Ink registry",
                "REACH passport on registered inks",
                "Each use logged to the registry",
                "On every plan, Solo included",
              ],
            },
            {
              icon: Package,
              accent: BRAND.amber,
              eyebrow: "Stock + batch tracking",
              title: "Every bottle, every needle, every reorder.",
              desc: "Stock levels, batches and supplier orders, tracked per item. Set a par level and low stock shows up before you run out mid-session.",
              bullets: [
                "Stock per item",
                "Par level and low-stock alerts",
                "Purchase orders to suppliers",
                "Supplier list in one place",
              ],
            },
            {
              icon: AlertCircle,
              accent: BRAND.sage,
              eyebrow: "Every movement",
              title: "Received, used, adjusted. Logged.",
              desc: "Every change to stock is a movement: a delivery in, a session's use, a count adjusted. The Movements tab shows what changed and when.",
              bullets: [
                "Deliveries in",
                "Use logged as it happens",
                "Stock adjustments",
                "Filter by item or date",
              ],
            },
          ]}
        />

        <ProductAnatomy
          eyebrow="Inside the inventory record"
          heading="Five things on every ink card."
          italicWord="Five things"
          intro="The ink card carries everything the studio and an inspector need to know — without opening a filing cabinet."
          dashboard={<InventoryScreen />}
          callouts={[
            {
              n: 1,
              title: "Ink card details",
              desc: "Brand, colour, volume and batch: the full record on one screen.",
              position: { top: "12%", left: "30%" },
            },
            {
              n: 2,
              title: "REACH passport",
              desc: "Shown on REACH-registered inks, with each use logged to your Ink registry.",
              position: { top: "28%", left: "60%" },
            },
            {
              n: 3,
              title: "Low-stock indicator",
              desc: "A warning when stock drops below the item's par level.",
              position: { top: "46%", left: "38%" },
            },
            {
              n: 4,
              title: "Recent movements",
              desc: "The last deliveries, uses and adjustments for this item.",
              position: { top: "62%", left: "64%" },
            },
            {
              n: 5,
              title: "Purchase orders",
              desc: "Orders to each supplier, tracked until they're received.",
              position: { top: "80%", left: "44%" },
            },
          ]}
        />

        <ProductItemTypes
          eyebrow="What Limespun tracks"
          heading="Eight inventory categories, one cabinet."
          italicWord="Eight inventory categories"
          intro="Every consumable a tattoo studio uses, tracked by item, with REACH records for ink."
          columns={4}
          items={[
            {
              icon: Sparkles,
              accent: BRAND.rust,
              severity: "REACH",
              title: "Tattoo inks",
              desc: "Brand, colour and batch per bottle. REACH-registered inks marked.",
              example: "Black · 2 bottles · REACH-registered",
            },
            {
              icon: Package,
              accent: BRAND.amber,
              severity: "Per gauge",
              title: "Needles",
              desc: "Configuration and size tracked per box. Low-stock alert per type.",
              example: "9RL, 11M1, 14RS — separate threshold per type",
            },
            {
              icon: Package,
              accent: BRAND.sage,
              severity: "Per type",
              title: "Cartridges",
              desc: "Needle type and box count tracked, reordered by what your artists use.",
              example: "Round liners · 3 boxes left",
            },
            {
              icon: Droplets,
              accent: BRAND.rust,
              title: "Cleaning supplies",
              desc: "Green soap, distilled water, barrier film, and stencil solution — quantity and reorder threshold per item.",
              example: "Green soap: 2 bottles — par level 4",
            },
            {
              icon: Heart,
              accent: BRAND.amber,
              title: "Aftercare products",
              desc: "Aftercare creams, balms and wraps, given per session or sold.",
              example: "Aftercare balm — 3 left",
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
              desc: "Single-use items, counted down as they're used.",
              example: "Barrier film — par level 10 rolls",
            },
            {
              icon: TrendingUp,
              accent: BRAND.amber,
              title: "Purchase orders",
              desc: "Orders to each supplier, from sent to received, logged per supplier.",
              example: "PO to your ink supplier — received",
            },
          ]}
        />

        <ProductDayInLife
          eyebrow="A day in the studio"
          heading="The inspector who arrived on a Tuesday."
          italicWord="arrived on a Tuesday"
          intro="A three-chair studio in the EU. An inspector walks in mid-morning, unannounced."
          paragraphs={[
            "The studio was mid-session across three chairs. No warning, no appointment.",
            <React.Fragment key="p2">
              The owner opened Limespun on the front-desk tablet, went to <strong>Inventory</strong> and filtered to inks: every bottle with its brand and batch, and the REACH-registered ones marked.
            </React.Fragment>,
            "For the inks used that morning, the Ink registry showed each use and the batch it came from.",
            "The inspector had what she asked for, and nobody opened a filing cabinet.",
          ]}
          quote="When an inspector walks in unannounced, the batch record is one search away."
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
              desc: "Allergy notes on the client record, shown on every booking.",
              href: "/product/clients",
            },
            {
              icon: Shield,
              label: "REACH hub",
              desc: "What the EU ink rules ask of a studio, and how Limespun records it.",
              href: "/reach-compliance",
            },
            {
              icon: FileText,
              label: "Forms",
              desc: "The REACH disclosure on the consent form uses the same Ink registry.",
              href: "/product/forms",
            },
            {
              icon: TrendingUp,
              label: "Payments",
              desc: "Card payments, deposits and artist splits.",
              href: "/product/payments",
            },
          ]}
        />

        <ProductCTA
          headline="Inventory, on the rails."
          italicWord="on the rails"
          subhead={`${MONEY_BACK_DAYS}-day money-back guarantee. Stock, batches and REACH records from day one, on every plan.`}
        />
      </main>
      <Footer />
    </div>
  );
}
