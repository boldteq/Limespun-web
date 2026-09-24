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
import { AnalyticsScreen } from "@/components/mockups";
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
          subhead="Revenue by artist and by month. No-show rate, cancellations and fill rate. New, returning and lapsed clients. Stock value and low stock. Reports across locations on Pro."
          dashboard={<AnalyticsScreen />}
        />

        <ProductPillars
          eyebrow="How analytics work in Limespun"
          heading="Three reports most studios build in spreadsheets."
          italicWord="most studios build in spreadsheets"
          intro="Revenue, bookings and clients, worked out from the data already in your studio."
          pillars={[
            {
              icon: TrendingUp,
              accent: BRAND.rust,
              eyebrow: "Revenue",
              title: "Per artist, per month, as sessions close.",
              desc: "Revenue split by every artist, with deposits and tips collected alongside. No export, no formula.",
              bullets: [
                "Revenue by artist",
                "Deposits and tips collected",
                "Average sale",
                "Guest revenue",
              ],
            },
            {
              icon: AlertCircle,
              accent: BRAND.amber,
              eyebrow: "Bookings",
              title: "No-shows, cancellations, fill rate.",
              desc: "See how full the chairs were and how many bookings didn't happen, per artist, over 7, 30 or 90 days.",
              bullets: [
                "No-show rate",
                "Cancellations",
                "Fill rate",
                "Sessions and bookings",
              ],
            },
            {
              icon: BarChart3,
              accent: BRAND.sage,
              eyebrow: "Clients",
              title: "Who comes back, who's gone quiet.",
              desc: "New, returning and lapsed clients, with average lifetime value. Lapsed clients are the ones to win back with a campaign from Marketing.",
              bullets: [
                "New clients",
                "Returning clients",
                "Lapsed clients",
                "Average lifetime value",
              ],
            },
          ]}
        />

        <ProductAnatomy
          eyebrow="Inside the dashboard"
          heading="Five panels, one decision surface."
          italicWord="one decision surface"
          intro="Every number in the analytics dashboard links to a decision. Range selector, KPI cards, daily revenue, artist ranking and no-show rate, in one view."
          dashboard={<AnalyticsScreen />}
          callouts={[
            {
              n: 1,
              title: "Range selector",
              desc: "7, 30 or 90 days.",
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
              desc: "Revenue by day across the range you picked.",
              position: { top: "50%", left: "40%" },
            },
            {
              n: 4,
              title: "Top artists",
              desc: "Revenue ranking by artist, with horizontal bars.",
              position: { top: "74%", left: "24%" },
            },
            {
              n: 5,
              title: "No-show rate",
              desc: "No-shows and cancellations over the range, per artist.",
              position: { top: "74%", left: "76%" },
            },
          ]}
        />

        <ProductItemTypes
          eyebrow="What you can measure"
          heading="Eight studio numbers, kept current."
          italicWord="kept current"
          intro="Revenue, bookings and clients, from the data your studio already generates."
          columns={4}
          items={[
            {
              icon: TrendingUp,
              accent: BRAND.rust,
              severity: "Revenue",
              title: "Studio revenue",
              desc: "By artist, over 7, 30 or 90 days.",
              example: '"Dev · $3,420 this week"',
            },
            {
              icon: Users,
              accent: BRAND.amber,
              severity: "Clients",
              title: "New clients",
              desc: "First-time clients over the range.",
              example: '"New vs returning, per week"',
            },
            {
              icon: Heart,
              accent: BRAND.sage,
              severity: "Clients",
              title: "Returning clients",
              desc: "Clients who booked again.",
              example: '"Share of bookings from regulars"',
            },
            {
              icon: DollarSign,
              accent: BRAND.rust,
              severity: "Revenue",
              title: "Average sale",
              desc: "Average payment per paid session.",
              example: '"Per artist and overall"',
            },
            {
              icon: AlertCircle,
              accent: BRAND.danger,
              severity: "Bookings",
              title: "No-show rate",
              desc: "No-shows as a share of bookings, per artist.",
              example: '"7, 30 or 90 days"',
            },
            {
              icon: LayoutGrid,
              accent: BRAND.amber,
              severity: "Bookings",
              title: "Fill rate",
              desc: "How much of each chair's time was booked.",
              example: '"Per artist, per week"',
            },
            {
              icon: BarChart3,
              accent: BRAND.sage,
              severity: "Revenue",
              title: "Deposits collected",
              desc: "Deposits taken over the range.",
              example: '"$340 held for today\'s sessions"',
            },
            {
              icon: RefreshCw,
              accent: BRAND.stoneDark,
              severity: "Clients",
              title: "Lapsed clients",
              desc: "Clients who haven't booked in a while.",
              example: '"Ready for a win-back campaign"',
            },
          ]}
        />

        <ProductDayInLife
          eyebrow="End of month"
          heading="Sunday, 9:14 PM. The month in twenty minutes."
          italicWord="twenty minutes"
          intro="Picture an owner with two shops on Pro. End of month used to be a full Sunday with three spreadsheets. Now it isn't."
          paragraphs={[
            <React.Fragment key="p1">
              <strong>9:14 PM.</strong> Analytics, last 30 days, both locations: revenue by artist, deposits collected and tips.
            </React.Fragment>,
            <React.Fragment key="p2">
              <strong>9:18 PM.</strong>{" "}One shop&apos;s no-show rate is up. The Bookings tab shows it&apos;s one artist&apos;s Saturday slots, booked without a deposit.
            </React.Fragment>,
            <React.Fragment key="p3">
              <strong>9:24 PM.</strong> She checks the lapsed clients on the Clients tab and plans a win-back campaign in Marketing for next week.
            </React.Fragment>,
            <React.Fragment key="p4">
              Twenty minutes. <em>Two shops, one view.</em> The old way: three spreadsheets and half a Sunday.
            </React.Fragment>,
          ]}
          quote="Reports across locations show which shop is healthy and which one needs help."
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
              desc: "Every payment feeds the revenue numbers, deposits and tips included.",
              href: "/product/payments",
            },
            {
              icon: Calendar,
              label: "Today",
              desc: "Today's numbers: deposits held and commissions owed.",
              href: "/product/today",
            },
            {
              icon: TrendingUp,
              label: "Marketing",
              desc: "Lapsed clients become a win-back campaign.",
              href: "/product/marketing",
            },
            {
              icon: BarChart3,
              label: "Pricing",
              desc: "Reports on every plan; across locations on Pro.",
              href: "/pricing",
            },
          ]}
        />

        <ProductCTA
          headline="Make the call before the spreadsheet does."
          italicWord="before the spreadsheet does"
          subhead={`${MONEY_BACK_DAYS}-day money-back guarantee. Revenue, no-show rate and client numbers from day one.`}
        />
      </main>
      <Footer />
    </div>
  );
}
