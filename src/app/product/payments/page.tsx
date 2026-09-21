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
import { DashboardMockup } from "@/components/dashboard/dashboard-mockup";
import { BRAND } from "@/lib/brand";
import {
  DollarSign,
  Package,
  BarChart3,
  CreditCard,
  RefreshCw,
  Heart,
  Users,
  Star,
  FileText,
  TrendingUp,
  Tag,
} from "lucide-react";

export default function PaymentsPage() {
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
          feature="Payments"
          headline="Payouts the day they're earned."
          italicWord="the day they're earned"
          subhead="Stripe Connect on every invoice. Commission splits route at checkout — 60/40, 70/30, or custom. Deposit pools live at the project level. No Friday reconciling, no spreadsheet, no arguments."
          dashboard={<DashboardMockup />}
        />

        <ProductPillars
          eyebrow="How payments work in Limespun"
          heading="Three rails most studios still do by hand."
          italicWord="still do by hand"
          intro="Commission splits, deposit management, and payroll exports — automated at the point of payment. Not at the end of the month."
          pillars={[
            {
              icon: DollarSign,
              accent: BRAND.rust,
              eyebrow: "Commission auto-splits",
              title: "60/40, 70/30, custom — routed at checkout.",
              desc: "Set the split per artist or per tier. Limespun routes the correct amount to each Stripe Connect account at the point of payment. No manual calculation.",
              bullets: [
                "Per-artist split configured once",
                "Splits route at checkout — not at month end",
                "Custom percentage or fixed retain per booking",
                "Tip routing included — separate from commission",
              ],
            },
            {
              icon: Package,
              accent: BRAND.amber,
              eyebrow: "Deposit pools",
              title: "Project-level balance, not per-booking.",
              desc: "Deposits accumulate at the project level. When a session is added, the balance draws from the pool. Refunds rebalance automatically.",
              bullets: [
                "Deposit assigned to project, not individual session",
                "Balance visible on every booking card",
                "Refund re-balances pool without manual entry",
                "Cancellation policy enforced automatically",
              ],
            },
            {
              icon: BarChart3,
              accent: BRAND.sage,
              eyebrow: "Payroll-ready",
              title: "1099-K (US), P11D (UK), MV (FR) at year end.",
              desc: "Tax form data is aggregated as payments are processed. Year-end export is a single click — already formatted for the relevant jurisdiction.",
              bullets: [
                "1099-K for US independent contractors",
                "P11D for UK employee benefits",
                "MV for French TVA declarations",
                "CSV export for any payroll provider",
              ],
            },
          ]}
        />

        <ProductAnatomy
          eyebrow="Inside the payment flow"
          heading="Five things settled at checkout."
          italicWord="Five things settled"
          intro="The invoice does the work. Commission, deposit, refund logic, and tax data — resolved at the moment of payment."
          dashboard={<DashboardMockup />}
          callouts={[
            {
              n: 1,
              title: "Invoice split breakdown",
              desc: "Studio retain and artist payout shown line by line before the client pays. Transparent for every party.",
              position: { top: "12%", left: "30%" },
            },
            {
              n: 2,
              title: "Deposit balance",
              desc: "Project pool balance shown on the invoice. Client sees how much of their deposit is being drawn down.",
              position: { top: "30%", left: "58%" },
            },
            {
              n: 3,
              title: "Refund re-balance",
              desc: "When a session is cancelled, the refund amount is calculated from the pool and the commission split reverses automatically.",
              position: { top: "48%", left: "36%" },
            },
            {
              n: 4,
              title: "Stripe Connect status",
              desc: "Live payout status for each artist. Green when connected and verified. Orange when action required.",
              position: { top: "64%", left: "62%" },
            },
            {
              n: 5,
              title: "Year-end export",
              desc: "One click generates the tax form data for every artist — formatted for the correct jurisdiction.",
              position: { top: "80%", left: "44%" },
            },
          ]}
        />

        <ProductItemTypes
          eyebrow="Money on the rails"
          heading="Eight ways Limespun handles money."
          italicWord="Eight ways"
          intro="Every payment type a studio takes — structured, tracked, and reconciled without a spreadsheet."
          columns={4}
          items={[
            {
              icon: CreditCard,
              accent: BRAND.rust,
              severity: "Stripe Connect",
              title: "Card payments",
              desc: "Stripe Connect on every transaction. Funds route to studio and artist accounts at checkout.",
              example: "£320 session — £224 artist, £96 studio",
            },
            {
              icon: DollarSign,
              accent: BRAND.amber,
              title: "Cash logging",
              desc: "Cash sessions logged manually. Commission still calculated and attributed. Appears in artist ledger.",
              example: "£200 cash — split logged, not processed",
            },
            {
              icon: Package,
              accent: BRAND.sage,
              title: "Deposits",
              desc: "Project-level deposit pool. Draws down per session. Refund-eligible until artist begins work.",
              example: "£150 deposit — balance clears at final session",
            },
            {
              icon: RefreshCw,
              accent: BRAND.rust,
              title: "Refunds",
              desc: "Refund processed in Stripe. Commission split reverses. Deposit pool rebalanced. Zero manual steps.",
              example: "Cancellation inside 48h — deposit retained",
            },
            {
              icon: Heart,
              accent: BRAND.amber,
              title: "Tips",
              desc: "Tip added at checkout, routed entirely to the artist. Never pooled with studio commission.",
              example: "£20 tip — 100% to artist, logged separately",
            },
            {
              icon: Users,
              accent: BRAND.sage,
              severity: "Per artist",
              title: "Commission auto-split",
              desc: "Configured once per artist or tier. Routes at point of payment — no month-end calculation.",
              example: "70/30 — Mia gets 70% on every invoice",
            },
            {
              icon: Star,
              accent: BRAND.rust,
              severity: "Studio retain",
              title: "Studio percentage",
              desc: "Studio retain held in the business Stripe account. Separate from artist payouts on every transaction.",
              example: "30% on all sessions — £1,200/month auto-retained",
            },
            {
              icon: FileText,
              accent: BRAND.amber,
              severity: "Year-end",
              title: "Tax forms",
              desc: "1099-K, P11D, and MV data aggregated as payments process. One-click export at year end.",
              example: "All 8 artists — tax export in under 60 seconds",
            },
          ]}
        />

        <ProductVsTable
          eyebrow="How it compares"
          heading="The split everyone else charges extra for."
          italicWord="everyone else charges extra for"
          competitors={[
            "Limespun Payments",
            "DaySmart",
            "Mangomint",
            "Fresha",
          ]}
          rows={[
            {
              feature: "Commission auto-splits at checkout",
              values: [true, false, true, false],
            },
            {
              feature: "Per-booking transaction fee",
              values: [false, false, false, true],
            },
            {
              feature: "Stripe Connect native integration",
              values: [true, true, true, true],
            },
            {
              feature: "Multi-currency support",
              values: [true, true, true, true],
            },
            {
              feature: "1099-K auto-export (US)",
              values: [true, false, false, false],
            },
            {
              feature: "Deposit pool per project",
              values: [true, false, false, false],
            },
            {
              feature: "Tip routing per artist",
              values: [true, false, true, true],
            },
            {
              feature: "Cash payments logged and attributed",
              values: [true, true, true, true],
            },
          ]}
          caption="Based on published features as of Q1 2025. Limespun first column."
        />

        <ProductDayInLife
          eyebrow="A day in the studio"
          heading="Friday in six minutes."
          italicWord="six minutes"
          intro="Marcus runs commissions for 8 artists every Friday. It used to take the morning."
          paragraphs={[
            "Before Limespun, Marcus was exporting Stripe reports, matching artist IDs to sessions in a spreadsheet, calculating splits manually, and sending individual bank transfers. Two hours, minimum.",
            <React.Fragment key="p2">
              Now he opens the <strong>Payments</strong> tab on Friday afternoon. The commission dashboard shows every artist, every session, and the exact payout amount — already calculated.
            </React.Fragment>,
            "He reviews the numbers in two minutes. Clicks approve. Stripe Connect routes every payout simultaneously. Artists get their money before they leave for the weekend.",
            "Eight artists. Forty-three sessions across the week. £11,400 processed. Six minutes start to finish.",
          ]}
          quote="I get my Fridays back. That's not a small thing when you're running a studio with eight artists."
          person={{
            name: "Marcus Lane",
            role: "Owner, Iron + Ash, Austin TX",
            gradient: `linear-gradient(135deg, ${BRAND.rust} 0%, ${BRAND.rustGlow} 100%)`,
          }}
        />

        <ProductRelated
          eyebrow="Connects directly to"
          heading="Payments move through the whole studio."
          italicWord="the whole studio"
          modules={[
            {
              icon: Tag,
              label: "Pricing",
              desc: "Session pricing and deposit rules set here — flow through to every invoice automatically.",
              href: "/product/pricing",
            },
            {
              icon: Package,
              label: "Projects",
              desc: "Deposit pool lives on the project. Every session draws down from the same balance.",
              href: "/product/projects",
            },
            {
              icon: RefreshCw,
              label: "Inventory",
              desc: "Supply costs logged per session — deducted from revenue in the studio P&L view.",
              href: "/product/inventory",
            },
            {
              icon: TrendingUp,
              label: "Analytics",
              desc: "MRR, artist revenue, and session value — built from the same payment data.",
              href: "/product/analytics",
            },
          ]}
        />

        <ProductCTA
          headline="Auto-pay your artists."
          italicWord="Auto-pay"
          subhead="14-day free trial. No card required. Commission splits, deposit pools, and tax exports from day one."
        />
      </main>
      <Footer />
    </div>
  );
}
