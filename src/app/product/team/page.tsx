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
import { TeamScreen } from "@/components/mockups";
import { BRAND } from "@/lib/brand";
import {
  Users,
  DollarSign,
  Plane,
  Star,
  Heart,
  Briefcase,
  LayoutGrid,
  Calendar,
  BarChart3,
} from "lucide-react";

export default function TeamPage() {
  return (
    <div style={{ minHeight: "100vh", background: BRAND.bone, overflow: "hidden" } as React.CSSProperties}>
      <Nav />
      <main>
        <ProductHero
          feature="Team"
          headline="Your roster, paid right."
          italicWord="paid right"
          subhead="Residents, guest artists and the front desk on one roster. A split per artist, guest spots with their own dates, and roles that decide who sees what. Up to 5 artists on Studio, 15 on Pro."
          dashboard={<TeamScreen />}
        />

        <ProductPillars
          eyebrow="The premise"
          heading="Every role. Every split. One roster."
          italicWord="One roster"
          intro="Residents, guests and the front desk, each with their own rules. Limespun works out every artist's split on each paid session and keeps the record for payroll."
          pillars={[
            {
              icon: Users,
              accent: BRAND.rust,
              eyebrow: "Per-artist roster",
              title: "Per-artist roster",
              desc: "Resident or guest, artist or front desk. Each with its own rules.",
              bullets: [
                "A split per artist",
                "Resident or guest",
                "Active, pending, on leave",
                "Payroll records on Pro",
              ],
            },
            {
              icon: DollarSign,
              accent: BRAND.amber,
              eyebrow: "Splits per session",
              title: "Splits worked out per session",
              desc: "60%, 70/30 or booth rent, on every paid session.",
              bullets: [
                "Commission or booth rent",
                "Studio share shown per session",
                "Tips counted in artist pay",
                "No Friday spreadsheet",
              ],
            },
            {
              icon: Plane,
              accent: BRAND.sage,
              eyebrow: "Guest artists",
              title: "Guest artists",
              desc: "Their own dates, link and split. Pro and up.",
              bullets: [
                "Own booking link per guest",
                "Guest-spot dates on the calendar",
                "Split set per guest",
                "Deactivates when the spot ends",
              ],
            },
          ]}
        />

        <ProductAnatomy
          eyebrow="Anatomy"
          heading="One screen. Every artist. Every status."
          italicWord="Every status"
          intro="Active artists, guests, pending invites and people on leave, in one roster. Tap anyone to see their split and commission history."
          dashboard={<TeamScreen />}
          callouts={[
            {
              n: 1,
              title: "Filters",
              desc: "Active, guests, pending invites and on leave. Switch with one tap.",
              position: { top: "14%", left: "32%" },
            },
            {
              n: 2,
              title: "Avatar + name",
              desc: "Initials avatar with role-based color. Click to drill into artist profile.",
              position: { top: "34%", left: "22%" },
            },
            {
              n: 3,
              title: "Role pill",
              desc: "Resident or Guest, plus the role that sets what they can see.",
              position: { top: "34%", left: "40%" },
            },
            {
              n: 4,
              title: "Commission split",
              desc: "Mono number for clarity. Tap to edit per-artist or per-piece overrides.",
              position: { top: "46%", left: "64%" },
            },
            {
              n: 5,
              title: "Status",
              desc: "Active, pending invite or on leave, at a glance.",
              position: { top: "46%", left: "82%" },
            },
          ]}
        />

        <ProductItemTypes
          eyebrow="Roster categories"
          heading="Six member types, each with their own rules."
          italicWord="their own rules"
          intro="A resident and a guest artist have completely different financial relationships with your studio. Limespun handles each with the right default rules — so you never apply a resident split to a guest by mistake."
          columns={3}
          items={[
            {
              icon: Star,
              accent: BRAND.rust,
              duration: "Resident",
              title: "Resident artists",
              desc: "Full-time, dedicated chair, default split.",
              example: '"Dev · resident · 60% commission"',
            },
            {
              icon: Plane,
              accent: BRAND.amber,
              duration: "Guest",
              title: "Guest artists",
              desc: "Time-boxed, own booking page, custom split.",
              example: '"Rio · guest spot Oct 2–9 · 70/30"',
            },
            {
              icon: Users,
              accent: BRAND.sage,
              duration: "Booth rent",
              title: "Booth renters",
              desc: "Pay weekly booth rent instead of a commission.",
              example: '"Mara · resident · $250 a week"',
            },
            {
              icon: Heart,
              accent: BRAND.stoneDark,
              duration: "Admin",
              title: "Front desk + admin",
              desc: "Booking and reception roles. No commission. Roles and permissions on Pro.",
              example: '"Front desk · takes payments, never sees payroll"',
            },
            {
              icon: Briefcase,
              accent: BRAND.rust,
              duration: "Owner",
              title: "Owner / partner",
              desc: "Sees every artist, payment and report. Reports across locations on Pro.",
              example: '"Owner · Sample studio · 1 location"',
            },
            {
              icon: DollarSign,
              accent: BRAND.amber,
              duration: "Payroll",
              title: "Payroll",
              desc: "Payroll runs and 1099-K forms for your contractors. Pro plan.",
              example: '"3 artists in this week\'s run"',
            },
          ]}
        />

        <ProductDayInLife
          eyebrow="Friday at 5 PM"
          heading="Friday, 5 PM. Three artists, one review."
          italicWord="one review"
          intro="Dev and Mara are residents, and Rio is in on a guest spot. Friday at 5 used to mean a commission spreadsheet. Now it doesn't."
          paragraphs={[
            <React.Fragment key="p1">
              <strong>The splits have been worked out all week.</strong>{" "}Each paid session added to the artist&apos;s commissions: Dev at 60%, Rio at 70/30, and Mara&apos;s $250 booth rent taken off her pay.
            </React.Fragment>,
            <React.Fragment key="p2">
              <strong>5:02 PM.</strong> The owner opens Commissions:{" "}
              <em>$7,630 gross · $5,622 to the artists.</em>
            </React.Fragment>,
            <React.Fragment key="p3">
              <strong>5:04 PM.</strong> Approved. On Pro, the payroll run records it, and the year-end 1099-K data builds up as it goes.
            </React.Fragment>,
            <React.Fragment key="p4">
              Laptop closed. <em>The old way: an evening with a spreadsheet and a mistake to apologise for.</em>
            </React.Fragment>,
          ]}
          quote="Splits are worked out as each session is paid, so payday doesn't eat the weekend."
          takeawayLabel="What this means for your studio"
        />

        <ProductRelated
          eyebrow="One of fifteen"
          heading="Team links every part of the studio together."
          italicWord="every part"
          modules={[
            { icon: DollarSign, label: "Payments", desc: "Card payments, deposits, splits", href: "/product/payments" },
            { icon: Calendar, label: "Calendar", desc: "Sessions, guest spots, clash checks", href: "/product/calendar" },
            { icon: LayoutGrid, label: "Pricing", desc: "Plan comparison and upgrade", href: "/pricing" },
            { icon: BarChart3, label: "Analytics", desc: "Revenue, utilisation, artist metrics", href: "/product/analytics" },
          ]}
        />

        <ProductCTA
          headline="Pay the team. Get the weekend."
          italicWord="Get the weekend"
          subhead={`${MONEY_BACK_DAYS}-day money-back guarantee. Add your first artist, set the split, and the first paid session works it out.`}
        />
      </main>
      <Footer />
    </div>
  );
}
