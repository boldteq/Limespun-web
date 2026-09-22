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
import { TeamMockup } from "@/components/product/mockups/team-mockup";
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
          subhead="Eight artists, three guest residencies, one apprentice. Custom splits per artist. Guest residency bands. Stripe Connect routing. 1099-K, P11D, MV at year-end. The roster file that ends commission spreadsheets forever."
          dashboard={<TeamMockup />}
        />

        <ProductPillars
          eyebrow="The premise"
          heading="Every role. Every split. Every payout — automatic."
          italicWord="automatic"
          intro="Residents, guests, apprentices — each with different default rules. Limespun routes every invoice split at checkout via Stripe Connect and builds the year-end payroll record without a spreadsheet in sight."
          pillars={[
            {
              icon: Users,
              accent: BRAND.rust,
              eyebrow: "Per-artist roster",
              title: "Per-artist roster",
              desc: "Resident, guest, apprentice — different rules.",
              bullets: [
                "Custom commission splits",
                "Stripe Connect per artist",
                "Auto payroll year-end",
                "Guest residency bands",
              ],
            },
            {
              icon: DollarSign,
              accent: BRAND.amber,
              eyebrow: "Splits route at checkout",
              title: "Splits route at checkout",
              desc: "60/40, 70/30, custom — auto on every invoice.",
              bullets: [
                "Routes via Stripe Connect",
                "Studio retain percentage",
                "Tip routing per artist",
                "No Friday spreadsheet",
              ],
            },
            {
              icon: Plane,
              accent: BRAND.sage,
              eyebrow: "Guest residencies",
              title: "Guest residencies",
              desc: "Time-boxed, auto-archive.",
              bullets: [
                "Per-guest booking page slug",
                "Time-boxed band on calendar",
                "Email approval — no account",
                "Auto-archive on departure",
              ],
            },
          ]}
        />

        <ProductAnatomy
          eyebrow="Anatomy"
          heading="One screen. Every artist. Every status."
          italicWord="Every status"
          intro="Active residents, incoming guests, pending onboarding, archived alumni — all in one roster view. Tap any member to drill into splits, Stripe status, and commission history."
          dashboard={<TeamMockup />}
          callouts={[
            {
              n: 1,
              title: "Tab strip",
              desc: "Active, Guests, Pending, Archived. Switch with one tap.",
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
              desc: "Resident / Guest / Apprentice — each has different default rules.",
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
              title: "Stripe Connect status",
              desc: "Green dot = ready to receive payouts. Red dot = onboarding incomplete.",
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
              example: '"Miles Verena · 70/30 · 7 active projects"',
            },
            {
              icon: Plane,
              accent: BRAND.amber,
              duration: "Guest",
              title: "Guest artists",
              desc: "Time-boxed, own booking page, custom split.",
              example: '"Nina Yates · 22-29 Apr · 60/40 · 1 active"',
            },
            {
              icon: Users,
              accent: BRAND.sage,
              duration: "Apprentice",
              title: "Apprentices",
              desc: "Inverted split, mentorship lock, supervised bookings.",
              example: '"Zoe Hall · 0/100 · supervised by Miles"',
            },
            {
              icon: Heart,
              accent: BRAND.stoneDark,
              duration: "Admin",
              title: "Front desk + admin",
              desc: "Booking + reception roles. No commission.",
              example: '"Diana Park · admin · permissions: bookings, reviews"',
            },
            {
              icon: Briefcase,
              accent: BRAND.rust,
              duration: "Owner",
              title: "Owner / partner",
              desc: "Studio P&L access. Multi-location overview.",
              example: '"Miles Verena · Owner · 1 location"',
            },
            {
              icon: DollarSign,
              accent: BRAND.amber,
              duration: "Payroll",
              title: "Payroll subjects",
              desc: "W-2 hybrid for some, 1099 for others.",
              example: '"6 contractors + 1 apprentice on payroll"',
            },
          ]}
        />

        <ProductVsTable
          eyebrow="vs the rest"
          heading="Other tools handle commissions like a spreadsheet would."
          italicWord="like a spreadsheet would"
          intro="DaySmart has routing but no residency bands. Mangomint has splits but no year-end exports. Spreadsheets have nothing. Limespun is the only studio tool that routes at checkout, tracks residency windows, and generates 1099-K at year-end."
          competitors={["Limespun Team", "DaySmart", "Mangomint", "Spreadsheet"]}
          rows={[
            { feature: "Per-artist Stripe Connect routing", values: [true, true, true, false] },
            { feature: "Custom split per artist + per piece", values: [true, false, true, false] },
            { feature: "Guest residency band on calendar", values: [true, false, false, false] },
            { feature: "Apprentice inverted-split mode", values: [true, false, false, false] },
            { feature: "1099-K / P11D / MV at year-end", values: [true, false, false, false] },
            { feature: "Permissions per role", values: [true, true, true, false] },
            { feature: "Stripe onboarding tracked in roster", values: [true, false, true, false] },
            { feature: "Multi-location roster sync", values: [true, true, false, false] },
          ]}
          caption="Sources: vendor product pages, public help docs, and pilot studio reports · 2026"
        />

        <ProductDayInLife
          eyebrow="Friday at 5 PM"
          heading="Friday, 5 PM. Eight artists paid, weekend started."
          italicWord="weekend started"
          intro="Picture Marcus, running eight artists across two floors. Friday at 5 used to mean three hours of commission spreadsheet wrangling. Now it doesn't."
          paragraphs={[
            <React.Fragment key="p1">
              <strong>The week&apos;s invoices have been routing all week.</strong> Each session at checkout split 65/35 to the artist via Stripe Connect — automatically.
            </React.Fragment>,
            <React.Fragment key="p2">
              <strong>5:02 PM.</strong> Marcus opens Team. Hits &quot;Run weekly payroll.&quot; Limespun surfaces a one-pager:{" "}
              <em>$24,400 total · $15,860 to artists · $8,540 to studio · 0 disputes · 0 manual adjustments.</em>
            </React.Fragment>,
            <React.Fragment key="p3">
              <strong>5:04 PM.</strong> He confirms. Stripe Connect already paid the artists during the week — payroll just records the books and queues the year-end 1099-K data.
            </React.Fragment>,
            <React.Fragment key="p4">
              Marcus closes the laptop. Total time: <em>two minutes.</em> The old way: three hours, one mistake every two weeks, one apologetic Slack message a month.
            </React.Fragment>,
          ]}
          quote="Splits land in Stripe Connect as each invoice is paid, so payday doesn't eat the weekend."
          takeawayLabel="What this means for your studio"
        />

        <ProductRelated
          eyebrow="One of fifteen"
          heading="Team links every part of the studio together."
          italicWord="every part"
          modules={[
            { icon: DollarSign, label: "Payments", desc: "Stripe Connect, invoices, deposits", href: "/product/payments" },
            { icon: Calendar, label: "Calendar", desc: "Sessions, residencies, healing blocks", href: "/product/calendar" },
            { icon: LayoutGrid, label: "Pricing", desc: "Plan comparison and upgrade", href: "/pricing" },
            { icon: BarChart3, label: "Analytics", desc: "Revenue, utilisation, artist metrics", href: "/product/analytics" },
          ]}
        />

        <ProductCTA
          headline="Pay the team. Get the weekend."
          italicWord="Get the weekend"
          subhead={`${MONEY_BACK_DAYS}-day money-back guarantee. Add your first artist, set the split, and watch the first invoice route automatically.`}
        />
      </main>
      <Footer />
    </div>
  );
}
