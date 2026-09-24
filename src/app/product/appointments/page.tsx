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
import { AppointmentsScreen, CalendarScreen } from "@/components/mockups";
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
          subhead="Salon software books an appointment. Limespun books an appointment AND a deposit AND an allergy check AND a multi-session link — all locked at the same moment. The chair only commits when the money does."
          dashboard={<AppointmentsScreen />}
        />

        {/* ── Pillars ─────────────────────────────────────────────────────── */}
        <ProductPillars
          eyebrow="The mechanics"
          heading="Three locks, one tap."
          italicWord="one tap"
          intro="Most booking tools treat the appointment and the deposit as separate steps. Limespun treats them as one action: the booking is confirmed when the deposit is paid."
          pillars={[
            {
              icon: Lock,
              accent: BRAND.rust,
              eyebrow: "Deposit-required gating",
              title: "No deposit, no lock.",
              desc: "The booking stays Pending until the deposit is paid, then flips to Confirmed. Your Booking policies set the amount and what happens on a late cancel.",
              bullets: [
                "Pending until the deposit is paid",
                "Confirmed the moment it clears",
                "Late-cancel rules from your Booking policies",
                "Deposit added to the project's pool",
              ],
            },
            {
              icon: LayoutGrid,
              accent: BRAND.amber,
              eyebrow: "Multi-session linking",
              title: "Session 4 of 5, automatic.",
              desc: "When a client with an active project books a new slot, Limespun offers to link it. One tap chains the booking to the project, and the deposit pool and artist notes carry forward.",
              bullets: [
                "Link to the active project",
                "Draws on the deposit pool",
                "Carries artist notes",
                "Session counter moves on (4 of 5)",
              ],
            },
            {
              icon: AlertCircle,
              accent: BRAND.sage,
              eyebrow: "Allergy + medical at booking",
              title: "See the allergy before you book.",
              desc: "Allergy and medical notes surface when you book, not after the appointment is already in the calendar.",
              bullets: [
                "Allergy notes shown at booking",
                "Allergy flag on the booking card",
                "Medical history form before the session",
                "Shown again on Today",
              ],
            },
          ]}
        />

        {/* ── Anatomy ─────────────────────────────────────────────────────── */}
        <ProductAnatomy
          eyebrow="Inside the booking flow"
          heading="Five checks, one slot."
          italicWord="one slot"
          intro="The calendar mockup above shows a live appointment grid. Here's what happens behind every slot before it's confirmed."
          dashboard={<CalendarScreen view="day" />}
          callouts={[
            {
              n: 1,
              title: "Time selection",
              desc: "Day, Week and Agenda views. Slot height matches the length of the service.",
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
              desc: "The booking stays Pending until the deposit is paid, then flips to Confirmed.",
              position: { top: "38%", left: "52%" },
            },
            {
              n: 4,
              title: "Clash check",
              desc: "Two bookings on one chair are blocked before they save. Studio plan and up.",
              position: { top: "52%", left: "24%" },
            },
            {
              n: 5,
              title: "Confirm sequence",
              desc: "Email and text confirmations once the deposit clears, in your studio's words. Merge tags fill in the details.",
              position: { top: "60%", left: "50%" },
            },
          ]}
        />

        {/* ── Item Types ──────────────────────────────────────────────────── */}
        <ProductItemTypes
          eyebrow="Booking flow"
          heading="Five steps before a chair is held."
          italicWord="Five steps"
          intro="A booked slot in Limespun passes five steps, in order, before it's confirmed."
          columns={3}
          items={[
            {
              icon: Calendar,
              accent: BRAND.rust,
              severity: "Step 1",
              title: "Slot selection",
              desc: "Client picks a time. Times already taken don't show.",
              example: '"Sat Nov 7 · 11:00 · Dev"',
            },
            {
              icon: Heart,
              accent: BRAND.amber,
              severity: "Step 2",
              title: "Project link prompt",
              desc: "An active project is found and offered as the link for this session.",
              example:
                '"Asha M. · Koi sleeve · link as session 5 of 5"',
            },
            {
              icon: AlertCircle,
              accent: BRAND.danger,
              severity: "Step 3",
              title: "Medical check",
              desc: "Allergy and medical notes shown to the artist on the booking.",
              example:
                '"Elena R. · red ink allergy on file · patch test first"',
            },
            {
              icon: DollarSign,
              accent: BRAND.amber,
              severity: "Step 4",
              title: "Deposit collection",
              desc: "Client pays the deposit by card. The booking stays Pending until it clears.",
              example: '"$300 deposit · added to the project\'s deposit pool"',
            },
            {
              icon: Lock,
              accent: BRAND.success,
              severity: "Step 5",
              title: "Confirmed",
              desc: "The booking flips to Confirmed. Email and text confirmations go out.",
              example: '"Confirmed · Sat Nov 7 · 11:00"',
            },
            {
              icon: RefreshCw,
              accent: BRAND.stoneDark,
              severity: "Lifecycle",
              title: "Reschedule + refund",
              desc: "Drag to a new time and the deposit moves with it. Late cancels follow your policy.",
              example: '"Leo B. · late cancel · $150 deposit kept"',
            },
          ]}
        />

        {/* ── Day in Life ─────────────────────────────────────────────────── */}
        <ProductDayInLife
          eyebrow="A booking, confirmed"
          heading="Tuesday, 2:14 PM. From a text to a confirmed session."
          italicWord="a confirmed session"
          intro="Asha M. texts the studio: 'When can we book the last session of the koi sleeve?' The owner replies with the booking link from a saved reply."
          paragraphs={[
            <React.Fragment key="p1">
              <strong>Asha picks Sat Nov 7, 11:00.</strong> The booking page only shows times Dev has free, sized to his sleeve sessions.
            </React.Fragment>,
            <React.Fragment key="p2">
              <strong>Limespun recognises Asha&apos;s active project.</strong> The booking links to Koi sleeve as session 5 of 5. Her deposit pool still holds $240 of the $300 she paid in, set aside for the last two sessions.
            </React.Fragment>,
            <React.Fragment key="p3">
              <strong>Dev sees the notes before the day.</strong> Anything on her medical form shows on the booking card, not buried in a file.
            </React.Fragment>,
            <React.Fragment key="p4">
              <strong>The pool already covers it, so the booking is Confirmed.</strong> Email and text confirmations go out, and Dev&apos;s calendar updates. <em>A few minutes, one tap on each side.</em>
            </React.Fragment>,
          ]}
          quote="One tap books the slot, takes the deposit, and brings the project, allergy and payment history along with it."
          takeawayLabel="What changes"
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
              desc: "Every booking lives on the multi-chair calendar. Drag to reschedule; the deposit stays with it.",
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
              desc: "Deposits are taken by card when the client books. No Limespun fee on bookings or deposits.",
              href: "/product/payments",
            },
          ]}
        />

        {/* ── CTA ─────────────────────────────────────────────────────────── */}
        <ProductCTA
          headline="Lock the chair. Lock the money."
          italicWord="the money"
          subhead={`${MONEY_BACK_DAYS}-day money-back guarantee. Deposits lock at booking, so a no-show stops being a free cancellation.`}
        />
      </main>
      <Footer />
    </div>
  );
}
