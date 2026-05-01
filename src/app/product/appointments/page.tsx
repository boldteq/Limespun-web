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
import { CalendarMockup } from "@/components/product/mockups/calendar-mockup";
import { BRAND } from "@/lib/brand";
import {
  Lock,
  LayoutGrid,
  AlertCircle,
  Calendar,
  Heart,
  DollarSign,
  RefreshCw,
  Sparkles,
  Users,
} from "lucide-react";

export default function AppointmentsPage() {
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
        {/* ── Hero ────────────────────────────────────────────────────────── */}
        <ProductHero
          feature="Appointments"
          headline="Booking and deposit, finally one tap."
          italicWord="one tap"
          subhead="Salon software books an appointment. InkOS books an appointment AND a deposit AND an allergy check AND a multi-session link — all locked at the same moment. The chair only commits when the money does."
          dashboard={<CalendarMockup />}
        />

        {/* ── Pillars ─────────────────────────────────────────────────────── */}
        <ProductPillars
          eyebrow="The mechanics"
          heading="Three locks, one tap."
          italicWord="one tap"
          intro="Every other booking tool treats the appointment and the deposit as separate steps. InkOS treats them as one atomic action — both confirm together, or neither does."
          pillars={[
            {
              icon: Lock,
              accent: BRAND.rust,
              eyebrow: "Deposit-required gating",
              title: "No deposit, no lock.",
              desc: "The slot stays in HOLD state until Stripe confirms the deposit. If payment doesn't post within your studio's grace window, the slot auto-releases — no manual follow-up.",
              bullets: [
                "Lock at deposit clear",
                "Auto-cancel after grace",
                "Stripe Connect routing",
                "Refund logic preserves project pool",
              ],
            },
            {
              icon: LayoutGrid,
              accent: BRAND.amber,
              eyebrow: "Multi-session linking",
              title: "Session 4 of 5, automatic.",
              desc: "When a client with an active project books a new slot, InkOS surfaces a link prompt. One tap chains the booking to the project — deposit pool, artist notes, and healing windows all carry forward.",
              bullets: [
                "Auto-link to active project",
                "Inherit deposit pool",
                "Carry artist notes",
                "Healing window awareness",
              ],
            },
            {
              icon: AlertCircle,
              accent: BRAND.sage,
              eyebrow: "Allergy + medical at lock",
              title: "Refuse a booking that breaks the rules.",
              desc: "Allergy and medical fields surface at the moment of lock — not after the appointment is already in the calendar. Contraindications block the slot before it saves.",
              bullets: [
                "Allergy fields surface at lock",
                "Cross-contamination flagged",
                "REACH ink restrictions",
                "Sterilization buffer enforced",
              ],
            },
          ]}
        />

        {/* ── Anatomy ─────────────────────────────────────────────────────── */}
        <ProductAnatomy
          eyebrow="Inside the booking flow"
          heading="Five checks, one slot."
          italicWord="one slot"
          intro="The calendar mockup above shows a live appointment grid. Here's what happens behind every slot before it locks."
          dashboard={<CalendarMockup />}
          callouts={[
            {
              n: 1,
              title: "Time selection",
              desc: "Day · Week · Month picker. Slot height matches your studio's session length defaults.",
              position: { top: "15%", left: "70%" },
            },
            {
              n: 2,
              title: "Multi-session prompt",
              desc: "If client has an active project, a banner offers to link this booking as the next session.",
              position: { top: "28%", left: "34%" },
            },
            {
              n: 3,
              title: "Deposit gating",
              desc: "The slot stays HOLD until Stripe confirms. Auto-release if deposit doesn't post within your policy window.",
              position: { top: "38%", left: "52%" },
            },
            {
              n: 4,
              title: "Conflict refusal",
              desc: "Sterilization buffers, healing zones, and allergy contraindications all block conflicting bookings before they save.",
              position: { top: "52%", left: "24%" },
            },
            {
              n: 5,
              title: "Confirm sequence",
              desc: "Email + SMS + iCal sent on lock. Branded with your studio's voice. Tokens auto-fill.",
              position: { top: "60%", left: "50%" },
            },
          ]}
        />

        {/* ── Item Types ──────────────────────────────────────────────────── */}
        <ProductItemTypes
          eyebrow="Booking flow"
          heading="Five gates before a chair locks."
          italicWord="Five gates"
          intro="A booked slot in InkOS has passed five sequential checks. Each one is a reason another platform loses a dispute."
          columns={3}
          items={[
            {
              icon: Calendar,
              accent: BRAND.rust,
              severity: "Step 1",
              title: "Slot selection",
              desc: "Client picks a time. Conflicts and buffers refuse to show.",
              example: '"Apr 24 · 1:00 PM · 2.5 hr · Miles"',
            },
            {
              icon: Heart,
              accent: BRAND.amber,
              severity: "Step 2",
              title: "Project link prompt",
              desc: "Active project found? Auto-link as next session.",
              example:
                '"Asha Mehra has an active Koi sleeve project — link?"',
            },
            {
              icon: AlertCircle,
              accent: BRAND.danger,
              severity: "Step 3",
              title: "Medical check",
              desc: "Allergy + REACH + sterilization rules vetted.",
              example:
                '"Red ink allergy on file — incompatible with this slot\'s planned palette"',
            },
            {
              icon: DollarSign,
              accent: BRAND.amber,
              severity: "Step 4",
              title: "Deposit collection",
              desc: "Stripe Connect captures deposit. Slot stays HOLD.",
              example: '"$200 deposit · auto-applied to project pool"',
            },
            {
              icon: Lock,
              accent: BRAND.success,
              severity: "Step 5",
              title: "Lock confirm",
              desc: "Email + SMS + iCal go out. Slot is yours.",
              example: '"Confirmed — Apr 24 · 1:00 PM · code SS-4471"',
            },
            {
              icon: RefreshCw,
              accent: BRAND.stoneDark,
              severity: "Lifecycle",
              title: "Reschedule + refund",
              desc: "Drag to new slot. Pool re-balances. Refund routes auto.",
              example: '"Moved to Apr 28 · pool intact · $0 dispute"',
            },
          ]}
        />

        {/* ── Vs Table ────────────────────────────────────────────────────── */}
        <ProductVsTable
          eyebrow="The comparison"
          heading="Eight things no-shows cost you."
          italicWord="Eight things"
          intro="Every row is a scenario that ends a booking dispute in your favour — or against you."
          competitors={[
            "InkOS Appointments",
            "DaySmart",
            "Mangomint",
            "Calendly",
          ]}
          rows={[
            {
              feature: "Deposit-required slot gating",
              values: [true, false, true, false],
            },
            {
              feature: "Multi-session project link",
              values: [true, false, false, false],
            },
            {
              feature: "Allergy + medical check at lock",
              values: [true, false, false, false],
            },
            {
              feature: "REACH compliance check",
              values: [true, false, false, false],
            },
            {
              feature: "Auto-applied sterilization buffer",
              values: [true, false, false, false],
            },
            {
              feature: "Healing-zone block awareness",
              values: [true, false, false, false],
            },
            {
              feature: "Stripe Connect routing on lock",
              values: [true, false, true, false],
            },
            {
              feature: "Refund re-balances project pool",
              values: [true, false, false, false],
            },
          ]}
        />

        {/* ── Day in Life ─────────────────────────────────────────────────── */}
        <ProductDayInLife
          eyebrow="A booking, locked"
          heading="Tuesday, 2:14 PM. From inquiry to lock in three minutes."
          italicWord="three minutes"
          intro="Asha Mehra DMs Sable & Sparrow on Instagram: 'When can we start session 4 of the koi sleeve?' Miles taps the booking link in his templated reply."
          paragraphs={[
            <React.Fragment key="p1">
              <strong>Asha picks Apr 24, 1 PM.</strong> Calendar shows a 2.5-hour gap. Slot height matches Miles&apos; standard sleeve session.
            </React.Fragment>,
            <React.Fragment key="p2">
              <strong>InkOS recognises Asha&apos;s active project.</strong> A banner appears: &ldquo;Link this booking to Koi sleeve &middot; Session 4 of 5?&rdquo; Yes. Deposit pool already has $420 banked — Apr 24 will draw $120.
            </React.Fragment>,
            <React.Fragment key="p3">
              <strong>The medical check fires.</strong> Asha updated her allergy form last week — &ldquo;red ink, latex.&rdquo; Booking page surfaces a yellow note for Miles: &ldquo;patch-test new ink first.&rdquo; Asha sees nothing on her end. The slot accepts.
            </React.Fragment>,
            <React.Fragment key="p4">
              <strong>Stripe takes the $120 in 4 seconds.</strong> Slot flips from HOLD to LOCKED. Email + SMS + iCal go out. Miles&apos; calendar updates. Total time, end-to-end: <em>three minutes, one tap each side.</em>
            </React.Fragment>,
          ]}
          quote="Booking on DaySmart was four screens and a phone call. On InkOS it's a slot, a tap, and a Stripe receipt — and the booking already knows the project, the allergy, and the deposit history."
          person={{
            name: "Miles Verena",
            role: "Owner · Sable & Sparrow · Brooklyn",
            gradient:
              "linear-gradient(135deg, #0F0F0F 0%, #4B4842 50%, #9A9792 100%)",
          }}
        />

        {/* ── Related ─────────────────────────────────────────────────────── */}
        <ProductRelated
          eyebrow="Works with"
          heading="Appointments connect everything."
          italicWord="everything"
          modules={[
            {
              icon: Sparkles,
              label: "Today",
              desc: "Your booked appointments surface in the Today view — deposit status, allergy flags, and session counters at a glance.",
              href: "/product/today",
            },
            {
              icon: Calendar,
              label: "Calendar",
              desc: "Every locked appointment lives on the multi-chair calendar. Drag to reschedule — deposit pool re-balances automatically.",
              href: "/product/calendar",
            },
            {
              icon: LayoutGrid,
              label: "Projects",
              desc: "Linked appointments chain to their project automatically. Session counter increments, deposit pool draws down.",
              href: "/product/projects",
            },
            {
              icon: Users,
              label: "Payments",
              desc: "Deposits captured at lock route through Stripe Connect. Refunds re-balance the pool — no manual reconciliation.",
              href: "/product/payments",
            },
          ]}
        />

        {/* ── CTA ─────────────────────────────────────────────────────────── */}
        <ProductCTA
          headline="Lock the chair. Lock the money."
          italicWord="the money"
          subhead="14-day free trial. No card. Watch your no-show rate drop 60% in week one."
        />
      </main>
      <Footer />
    </div>
  );
}
