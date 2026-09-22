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
import { AnalyticsMockup } from "@/components/product/mockups/analytics-mockup";
import { BRAND } from "@/lib/brand";
import {
  TrendingUp,
  AlertCircle,
  BarChart3,
  Users,
  DollarSign,
  Heart,
  LayoutGrid,
  RefreshCw,
  Calendar,
} from "lucide-react";

export default function AnalyticsPage() {
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
          feature="Analytics"
          headline="Numbers that decide what you'd do tomorrow."
          italicWord="decide"
          subhead="Studio P&L by artist, by chair, by month. No-show risk for the next 14 days. Retention by client cohort. Ink-color mix and seasonal heat. The numbers most studio software doesn't even calculate."
          dashboard={<AnalyticsMockup />}
        />

        <ProductPillars
          eyebrow="How analytics work in Limespun"
          heading="Three reports most studios build in spreadsheets."
          italicWord="most studios build in spreadsheets"
          intro="Live P&L, predictive no-show scoring, and cohort retention — calculated automatically from the data already in your studio."
          pillars={[
            {
              icon: TrendingUp,
              accent: BRAND.rust,
              eyebrow: "Live studio P&L",
              title: "Per-artist + per-chair, in real time.",
              desc: "Revenue split by every artist and every chair, updated as sessions close. No export, no formula — the margin is just there.",
              bullets: [
                "Revenue split by artist",
                "Margin per chair",
                "Cost-of-ink per session",
                "Trailing 30/60/90 day cohorts",
              ],
            },
            {
              icon: AlertCircle,
              accent: BRAND.amber,
              eyebrow: "Predictive no-show risk",
              title: "Score for the next 14 days.",
              desc: "Each upcoming appointment gets a risk score based on client behaviour history — deposit posted, reminders replied to, past no-shows.",
              bullets: [
                "Per-client behaviour history",
                "Deposit posted boost",
                "Reminder reply boost",
                "Auto-trigger reminders at risk threshold",
              ],
            },
            {
              icon: BarChart3,
              accent: BRAND.sage,
              eyebrow: "Retention + cohort",
              title: "Who comes back, who churns.",
              desc: "Clients grouped by acquisition month. Retention curve shows who's still booking at 30, 60, and 90 days — and who's gone quiet.",
              bullets: [
                "Per-cohort retention curve",
                "Average sessions per client",
                "Lifetime value by acquisition source",
                "Win-back trigger thresholds",
              ],
            },
          ]}
        />

        <ProductAnatomy
          eyebrow="Inside the dashboard"
          heading="Five panels, one decision surface."
          italicWord="one decision surface"
          intro="Every number in the analytics dashboard links to a decision. Range selector, KPI cards, daily revenue, artist ranking, and no-show risk — in one view."
          dashboard={<AnalyticsMockup />}
          callouts={[
            {
              n: 1,
              title: "Range selector",
              desc: "30 / 90 / 365 days. Compare-mode toggles a second range overlay.",
              position: { top: "14%", left: "76%" },
            },
            {
              n: 2,
              title: "KPI cards w/ sparklines",
              desc: "Four headline metrics with trailing trend lines. Tap to drill in.",
              position: { top: "24%", left: "36%" },
            },
            {
              n: 3,
              title: "Daily revenue bars",
              desc: "30 days, hover any bar for tooltip with breakdown by service type.",
              position: { top: "50%", left: "40%" },
            },
            {
              n: 4,
              title: "Top artists",
              desc: "Revenue ranking with horizontal bars. Click to filter the whole dashboard by that artist.",
              position: { top: "74%", left: "24%" },
            },
            {
              n: 5,
              title: "No-show risk panel",
              desc: "Three risk tiers, one tap to send reminder. Auto-fires at high-risk threshold.",
              position: { top: "74%", left: "76%" },
            },
          ]}
        />

        <ProductItemTypes
          eyebrow="What you can measure"
          heading="Twelve studio numbers, all live."
          italicWord="all live"
          intro="Revenue, retention, risk, margin — every metric calculated from the data your studio already generates."
          columns={4}
          items={[
            {
              icon: TrendingUp,
              accent: BRAND.rust,
              severity: "Revenue",
              title: "Studio revenue",
              desc: "Daily, weekly, monthly, YTD.",
              example: '"April: $84,210 · +18% YoY"',
            },
            {
              icon: Users,
              accent: BRAND.amber,
              severity: "New clients",
              title: "Acquisition",
              desc: "By referral source.",
              example: '"32 new · 12 from Instagram, 8 walk-in"',
            },
            {
              icon: Heart,
              accent: BRAND.sage,
              severity: "Retention",
              title: "Cohort retention",
              desc: "Who comes back at 30/60/90.",
              example: '"Jan cohort · 84% at 60 days"',
            },
            {
              icon: DollarSign,
              accent: BRAND.rust,
              severity: "AOV",
              title: "Average ticket",
              desc: "Session size in dollars.",
              example: '"$620 · +$40 vs March"',
            },
            {
              icon: AlertCircle,
              accent: BRAND.danger,
              severity: "Risk",
              title: "No-show risk",
              desc: "Per-client, next 14 days.",
              example: '"3 high · 8 medium · 21 low"',
            },
            {
              icon: LayoutGrid,
              accent: BRAND.amber,
              severity: "Mix",
              title: "Service mix",
              desc: "Sessions vs touch-ups vs consults.",
              example: '"68% sessions · 22% touch-ups · 10% consults"',
            },
            {
              icon: BarChart3,
              accent: BRAND.sage,
              severity: "Margin",
              title: "Margin per chair",
              desc: "After ink, supplies, commissions.",
              example: '"Chair 1 (Miles) · 64% margin"',
            },
            {
              icon: RefreshCw,
              accent: BRAND.stoneDark,
              severity: "Churn",
              title: "Churn rate",
              desc: "Clients silent 6+ months.",
              example: '"23 clients silent · 4 already winning back"',
            },
          ]}
        />

        <ProductVsTable
          eyebrow="How it compares"
          heading="The P&L most software won't touch."
          italicWord="most software won't touch"
          competitors={["Limespun Analytics", "DaySmart", "Mangomint", "Excel"]}
          rows={[
            {
              feature: "Live per-artist P&L",
              values: [true, false, true, false],
            },
            {
              feature: "Predictive no-show risk score",
              values: [true, false, false, false],
            },
            {
              feature: "Cost-of-ink per session",
              values: [true, false, false, false],
            },
            {
              feature: "Cohort retention curves",
              values: [true, false, false, false],
            },
            {
              feature: "Margin per chair (after splits)",
              values: [true, false, false, false],
            },
            {
              feature: "Compare-mode (range vs range)",
              values: [true, false, true, false],
            },
            {
              feature: "Auto-export to CSV / accountant",
              values: [true, true, true, true],
            },
            {
              feature: "Per-location roll-up",
              values: [true, true, false, false],
            },
          ]}
          caption="Based on published features as of Q1 2025. Limespun first column."
        />

        <ProductDayInLife
          eyebrow="End of month"
          heading="April 30, 9:14 PM. Twenty minutes for the month."
          italicWord="Twenty minutes"
          intro="Picture Elena, running a three-location group in Madrid with 22 artists. End of month used to be a full Sunday with QuickBooks and three spreadsheets. Now it isn't."
          paragraphs={[
            <React.Fragment key="p1">
              <strong>9:14 PM.</strong> Elena opens Analytics. Studio P&L for
              April, all three locations: <em>€61,800 net.</em> Down 4% vs
              March, but up 22% YoY. She drills into March vs April compare
              mode.
            </React.Fragment>,
            <React.Fragment key="p2">
              <strong>9:18 PM.</strong> The ink-cost line spiked 11% in April.
              Why? She filters by ink color. Crimson Lake jumped — Madrid Centro
              went through 3 bottles last week.
            </React.Fragment>,
            <React.Fragment key="p3">
              <strong>9:24 PM.</strong> One click — she&apos;s looking at Madrid
              Centro alone. Two artists drove the crimson spike: Pablo and
              Lucia. She messages the location manager via Inbox:{" "}
              &ldquo;Reorder window for Crimson — adjust threshold.&rdquo;
            </React.Fragment>,
            <React.Fragment key="p4">
              Twenty minutes total.{" "}
              <em>The full studio, three locations, one decision.</em> The old
              way: three Excel files, two coffee refills, half a Sunday.
            </React.Fragment>,
          ]}
          quote="Per-location P&L in one dashboard shows which shop is healthy and which one needs help."
          takeawayLabel="Why it matters"
        />

        <ProductRelated
          eyebrow="Connects directly to"
          heading="Analytics runs on the whole studio."
          italicWord="the whole studio"
          modules={[
            {
              icon: DollarSign,
              label: "Payments",
              desc: "Every transaction feeds the P&L — commission splits, deposits, and refunds included.",
              href: "/product/payments",
            },
            {
              icon: Calendar,
              label: "Today",
              desc: "No-show risk scores surface in the daily view so you can act before the appointment.",
              href: "/product/today",
            },
            {
              icon: TrendingUp,
              label: "Marketing",
              desc: "Cohort retention curves feed win-back and loyalty campaign triggers automatically.",
              href: "/product/marketing",
            },
            {
              icon: BarChart3,
              label: "Pricing",
              desc: "Service mix and average ticket guide pricing decisions without a separate report.",
              href: "/pricing",
            },
          ]}
        />

        <ProductCTA
          headline="Make the call before the spreadsheet does."
          italicWord="before the spreadsheet does"
          subhead={`${MONEY_BACK_DAYS}-day money-back guarantee. Live P&L, no-show risk, and cohort retention from day one.`}
        />
      </main>
      <Footer />
    </div>
  );
}
