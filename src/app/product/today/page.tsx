"use client";

import React from "react";
import {
  TrendingUp,
  AlertCircle,
  Clock,
  Inbox,
  Calendar,
  MessageSquare,
  LayoutGrid,
  Users,
  Briefcase,
  Heart,
} from "lucide-react";
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
import { TodayMockup } from "@/components/product/mockups/today-mockup";
import { BRAND } from "@/lib/brand";

export default function TodayPage() {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: BRAND.bone,
        overflow: "hidden",
      }}
    >
      <Nav />
      <main>
        <ProductHero
          feature="Today"
          headline="Today, in thirty seconds."
          italicWord="in thirty seconds"
          subhead="Open InkOS. The day's already loaded — what's running, what's at risk, what's next — sized to your role. Owner sees the studio. Artist sees their chair. Front-desk sees the schedule. Same data, three brains."
          dashboard={<TodayMockup />}
        />

        <ProductPillars
          eyebrow="The premise"
          heading="Three questions, one screen."
          italicWord="one screen"
          intro="Every studio owner walks into work asking the same three questions before coffee. Today is the answer to all three — built into the screen that loads when InkOS opens."
          pillars={[
            {
              icon: TrendingUp,
              accent: BRAND.success,
              eyebrow: "What's running",
              title: "Live, not yesterday.",
              desc: "Today's revenue, deposits banked, bookings on the deck. No refresh button. The numbers move while you watch a client sign their consent.",
              bullets: [
                "Today's revenue, broken by artist",
                "Deposit pool balances by project",
                "No-show risk score for the next 14 days",
                "Commissions owed, paid, due",
              ],
            },
            {
              icon: AlertCircle,
              accent: BRAND.danger,
              eyebrow: "What's at risk",
              title: "Surfaced before it bites.",
              desc: "Allergies for clients on today's book. Expired consents. Projects with deposits not collected. Inventory that'll run out before noon. In the order you should fix them.",
              bullets: [
                "Allergy & medical alerts on today's book",
                "Consent forms expiring or unsigned",
                "Projects with deposits past due",
                "Ink colors below stock threshold",
              ],
            },
            {
              icon: Clock,
              accent: BRAND.rust,
              eyebrow: "What's next",
              title: "The next chair-up, in one tap.",
              desc: "The full day, by chair. The next client up. The current session in progress. The deposits sitting in escrow waiting for a session-complete signature.",
              bullets: [
                "Today's schedule, multi-chair view",
                "Live status: in chair · in deposit · in transit",
                "Tomorrow's deposits due",
                "Sessions with photos pending",
              ],
            },
          ]}
        />

        <ProductAnatomy
          eyebrow="Anatomy"
          heading="Every pixel earns its place."
          italicWord="earns its place"
          intro="Five components on one screen. Nothing decorative. Each one answers a question you'd ask in your first three minutes at the studio."
          dashboard={<TodayMockup />}
          callouts={[
            {
              n: 1,
              title: "The greeting",
              desc: "Time, day, role. So you know what page of the script you're on.",
              position: { top: "10%", left: "20%" },
            },
            {
              n: 2,
              title: "Live KPIs",
              desc: "Four numbers that move all morning. Tap any to drill into Analytics.",
              position: { top: "24%", left: "36%" },
            },
            {
              n: 3,
              title: "The allergy banner",
              desc: "Pulses red the moment a client on today's book has a flag. The thing competitors don't have.",
              position: { top: "44%", left: "38%" },
            },
            {
              n: 4,
              title: "Today's schedule",
              desc: "Multi-chair, multi-artist. LIVE means in the chair. Multi-session context shown inline.",
              position: { top: "67%", left: "32%" },
            },
            {
              n: 5,
              title: "Project pulse",
              desc: "The sleeves and back-pieces in motion this week, with deposit balance and progress.",
              position: { top: "67%", left: "78%" },
            },
          ]}
        />

        <ProductItemTypes
          eyebrow="Role-aware"
          heading="Same data. Three brains."
          italicWord="Three brains"
          intro="Today reads who you are when you sign in. The owner sees the studio. The artist sees their chair. The front desk sees the door. No setup. No view-switching."
          columns={3}
          items={[
            {
              icon: Briefcase,
              accent: BRAND.rust,
              severity: "Owner",
              title: "The studio in one glance.",
              desc: "Studio P&L, all artists, all chairs. The numbers that decide whether to hire.",
              example:
                '"Studio revenue · MTD: $84,210 · 6 active artists · $0 disputes 90d"',
            },
            {
              icon: Heart,
              accent: BRAND.amber,
              severity: "Artist",
              title: "Just your chair, your day.",
              desc: "Your bookings, your commissions, your projects. Nothing about the artist next to you.",
              example:
                '"Your revenue · this month: $11,840 · 4 sessions today · $2,300 commission ready"',
            },
            {
              icon: Inbox,
              accent: BRAND.sage,
              severity: "Front desk",
              title: "The flow at the door.",
              desc: "Walk-ins, check-ins, deposits to collect, IDs to scan. Everything that happens at the counter.",
              example:
                '"3 check-ins next hour · $840 deposits to collect · 2 IDs pending scan"',
            },
          ]}
        />

        <ProductVsTable
          eyebrow="vs the rest"
          heading="What no one else shows you on Monday morning."
          italicWord="on Monday morning"
          competitors={["InkOS Today", "DaySmart", "Mangomint", "Spreadsheet"]}
          rows={[
            {
              feature: "Multi-session project context",
              values: [true, false, false, false],
            },
            {
              feature: "Allergy & medical alerts inline",
              values: [true, false, false, false],
            },
            {
              feature: "Live commission preview",
              values: [true, false, true, false],
            },
            {
              feature: "Deposit pool balance per project",
              values: [true, false, false, false],
            },
            {
              feature: "Role-aware view (owner/artist/desk)",
              values: [true, false, false, false],
            },
            {
              feature: "REACH compliance check",
              values: [true, false, false, false],
            },
            {
              feature: "Single morning brief view",
              values: [true, false, false, false],
            },
          ]}
          caption="Sources: vendor product pages, public help docs, and pilot studio reports · 2026"
        />

        <ProductDayInLife
          eyebrow="A morning"
          heading="8:47 AM. Sable & Sparrow, Brooklyn."
          italicWord="Sable & Sparrow, Brooklyn"
          intro="Miles unlocks the studio, drops his keys, and before the coffee finishes, opens InkOS on his phone."
          paragraphs={[
            <>
              The screen knows what day it is.{" "}
              <strong>Asha&apos;s allergy banner is already pulsing red</strong>{" "}
              — she changed her medication last week and updated her form on the
              kiosk on Tuesday. Her session is at 1 PM. He texts her from the
              inline message thread, asks her to come in fifteen minutes early so
              they can patch-test the new ink.
            </>,
            <>
              The four KPIs at the top tell him the studio cleared{" "}
              <strong>$8,320</strong> on Wednesday — twelve points up over
              Tuesday — and that there are 26 bookings on the deck for the next
              two weeks. He scrolls down. <strong>The project pulse</strong>{" "}
              shows Elena&apos;s back piece is at session two of three, with the
              deposit fully paid. Tomas&apos;s half-sleeve is booked but no
              deposit yet — that&apos;s the call he&apos;ll make at 10.
            </>,
            <>
              He pours the coffee. Rafael walks in. Miles closes the app.{" "}
              <em>Total time on the screen: forty-two seconds.</em>
            </>,
          ]}
          quote="I used to spend the first thirty minutes flipping between three apps and a spreadsheet, just to figure out what the day looked like. Today does it before my coffee."
          person={{
            name: "Miles Verena",
            role: "Owner · Sable & Sparrow · Brooklyn",
            gradient:
              "linear-gradient(135deg, #0F0F0F 0%, #4B4842 50%, #9A9792 100%)",
          }}
        />

        <ProductRelated
          eyebrow="One of fifteen"
          heading="Today is where the day begins. What's next."
          italicWord="begins"
          modules={[
            {
              icon: Inbox,
              label: "Inbox",
              desc: "Action items in one feed",
              href: "/product/inbox",
            },
            {
              icon: Calendar,
              label: "Calendar",
              desc: "Multi-chair scheduling",
              href: "/product/calendar",
            },
            {
              icon: LayoutGrid,
              label: "Projects",
              desc: "Multi-session sleeves",
              href: "/product/projects",
              badge: "NEW",
            },
            {
              icon: Users,
              label: "Clients",
              desc: "CRM with allergy alerts",
              href: "/product/clients",
            },
          ]}
        />

        <ProductCTA
          headline="Start the morning differently."
          italicWord="differently"
          subhead="14-day free trial. No credit card. White-glove migration from any tool you're on."
        />
      </main>
      <Footer />
    </div>
  );
}
