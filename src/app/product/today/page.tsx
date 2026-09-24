"use client";

import React from "react";
import {
  TrendingUp,
  AlertCircle,
  Clock,
  Inbox,
  Calendar,
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
import { ProductDayInLife } from "@/components/product/product-day-in-life";
import { ProductRelated } from "@/components/product/product-related";
import { ProductCTA } from "@/components/product/product-cta";
import { MONEY_BACK_DAYS } from "@/lib/data/plans";
import { TodayScreen } from "@/components/mockups";
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
          subhead="Open Limespun. The day's already loaded — what's running, what's at risk, what's next — sized to your role. Owner sees the studio. Artist sees their chair. Front-desk sees the schedule. Same data, three brains."
          dashboard={<TodayScreen />}
        />

        <ProductPillars
          eyebrow="The premise"
          heading="Three questions, one screen."
          italicWord="one screen"
          intro="Every studio owner walks into work asking the same three questions before coffee. Today is the answer to all three — built into the screen that loads when Limespun opens."
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
                "Deposits held for today's sessions",
                "Commissions owed, paid, due",
              ],
            },
            {
              icon: AlertCircle,
              accent: BRAND.danger,
              eyebrow: "What's at risk",
              title: "Surfaced before it bites.",
              desc: "Allergies for clients on today's book. Consent not yet signed. Projects with deposits not collected. Stock running low. In the order you should fix them.",
              bullets: [
                "Allergy & medical alerts on today's book",
                "Consent forms not yet signed",
                "Projects with deposits past due",
                "Stock below the level you set",
              ],
            },
            {
              icon: Clock,
              accent: BRAND.rust,
              eyebrow: "What's next",
              title: "The next chair-up, in one tap.",
              desc: "The full day, by chair. The next client up. The session in progress. The deposits held for today's bookings.",
              bullets: [
                "Today's schedule, multi-chair view",
                "Who's in the chair, and who's next",
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
          dashboard={<TodayScreen />}
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
              desc: "Shows the moment a client on today's book has an allergy on their record.",
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
          intro="Today opens on the view that fits your role: Studio for the owner, Artist for an artist's own chair, Desk for the front desk. No setup."
          columns={3}
          items={[
            {
              icon: Briefcase,
              accent: BRAND.rust,
              severity: "Owner",
              title: "The studio in one glance.",
              desc: "Revenue across every artist and chair, deposits held, commissions owed.",
              example:
                '"This week: $7,630 gross · $5,622 paid out · $340 deposits held"',
            },
            {
              icon: Heart,
              accent: BRAND.amber,
              severity: "Artist",
              title: "Just your chair, your day.",
              desc: "Your bookings, your commissions, your projects. Nothing about the artist next to you.",
              example:
                '"Dev · 2 sessions today · 60% commission · $2,052 this week"',
            },
            {
              icon: Inbox,
              accent: BRAND.sage,
              severity: "Front desk",
              title: "The flow at the door.",
              desc: "Walk-ins, check-ins, deposits to collect, forms to sign. Everything that happens at the counter.",
              example:
                '"6 bookings today · 3 walk-in flash slots · 1 consent to sign"',
            },
          ]}
        />

        <ProductDayInLife
          eyebrow="A morning"
          heading="8:47 AM. A three-chair studio."
          italicWord="A three-chair studio"
          intro="The owner unlocks the studio, drops the keys and, before the coffee finishes, opens Limespun on their phone."
          paragraphs={[
            <>
              The screen knows what day it is.{" "}
              <strong>Elena R.&apos;s allergy flag is already on the page.</strong>{" "}She
              reacted to red ink after session 1 in August. Her back piece, session 2 of 3,
              is at 1:30 with Dev: no red today, and a patch test before session 3.
            </>,
            <>
              The numbers at the top show <strong>$340 in deposits held</strong>{" "}for
              today&apos;s sessions. <strong>The project pulse</strong>{" "}shows Asha M.&apos;s
              koi sleeve at session 4 of 5, with $240 of her deposit pool held for the last
              two sessions.
            </>,
            <>
              Rio&apos;s guest day starts at noon with three walk-in flash slots.{" "}
              <em>The whole day, read before the coffee&apos;s done.</em>
            </>,
          ]}
          quote="The first half hour stops being detective work. Today has the answers loaded before the coffee is."
          takeawayLabel="The point"
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
              desc: "Multi-session work",
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
          subhead={`${MONEY_BACK_DAYS}-day money-back guarantee. We move your data over from the tool you're on, on every plan.`}
        />
      </main>
      <Footer />
    </div>
  );
}
