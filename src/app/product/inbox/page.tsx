"use client";

import React from "react";
import {
  Sparkles,
  Zap,
  Inbox,
  AlertCircle,
  Calendar,
  DollarSign,
  FileText,
  CreditCard,
  RefreshCw,
  Star,
  Shield,
  Package,
  MessageSquare,
  Users,
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
import { InboxMockup } from "@/components/product/mockups/inbox-mockup";
import { BRAND } from "@/lib/brand";

export default function InboxPage() {
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
          feature="Inbox"
          headline="Open loops, closed in order."
          italicWord="closed in order"
          subhead="Inbox is the action feed. Booking requests, deposit follow-ups, allergy flags, consent expiries, disputes, reviews — sorted by priority, resolved in place, archived when done. Triage your studio in five minutes, not five hours."
          dashboard={<InboxMockup />}
        />

        <ProductPillars
          eyebrow="The premise"
          heading="The morning triage, five minutes flat."
          italicWord="five minutes flat"
          intro="Most salon software treats notifications chronologically — a timestamp dump you have to decode yourself. InkOS triages by impact, surfaces what's blocking, and lets you close loops without leaving the feed."
          pillars={[
            {
              icon: Sparkles,
              accent: BRAND.rust,
              eyebrow: "Sorted, not chronological",
              title: "AI ranks by impact.",
              desc: "Every item is scored by two variables: how bad is this if ignored, and how long will it take to fix. The most expensive problems rise to the top, always.",
              bullets: [
                "Priority by impact × time-to-fix",
                "Allergy & medical always first",
                "Snoozed items return on schedule",
                "Per-role priority weighting",
              ],
            },
            {
              icon: Zap,
              accent: BRAND.success,
              eyebrow: "Resolve in place",
              title: "No tab-switching.",
              desc: "Approve a booking, send a deposit reminder, countersign a consent form, or submit dispute evidence — all from a single action button in the feed row. You never leave Inbox.",
              bullets: [
                "One-tap approve, send, sign, refund",
                "Dispute evidence pre-built from session records",
                "Consent re-send in two taps",
                "Inventory reorder triggered from the item",
              ],
            },
            {
              icon: Inbox,
              accent: BRAND.onyx,
              eyebrow: "One feed, every loop",
              title: "Stripe to kiosk to REACH.",
              desc: "Every system that generates action items — Stripe, the consent kiosk, REACH compliance, review platforms, your booking flow — feeds into one ranked queue. Nothing lives in a separate notification panel.",
              bullets: [
                "Stripe disputes & refund requests inline",
                "Kiosk consent submissions auto-queued",
                "REACH compliance deadlines surfaced",
                "Review replies from inside the feed",
              ],
            },
          ]}
        />

        <ProductAnatomy
          eyebrow="Anatomy"
          heading="Built to be cleared, not scrolled."
          italicWord="cleared, not scrolled"
          intro="Every element in Inbox earns its place by reducing the time from 'open' to 'resolved'. Nothing is there for display."
          dashboard={<InboxMockup />}
          callouts={[
            {
              n: 1,
              title: "Filter chips",
              desc: "Slice the queue by category — bookings, payments, forms, reviews, compliance — without losing the priority sort.",
              position: { top: "15%", left: "34%" },
            },
            {
              n: 2,
              title: "Smart sort",
              desc: "AI ranks by impact and time-to-fix. Allergy alerts and disputes always rise to the top, no matter when they came in.",
              position: { top: "30%", left: "40%" },
            },
            {
              n: 3,
              title: "Grouped urgency",
              desc: "Three buckets: Urgent (today, blocking), Today (today, non-blocking), This week. Each one auto-collapses when empty.",
              position: { top: "46%", left: "32%" },
            },
            {
              n: 4,
              title: "Item type icons",
              desc: "Color-coded by domain. Red is medical or financial risk. Amber is time-sensitive. Green is housekeeping.",
              position: { top: "60%", left: "36%" },
            },
            {
              n: 5,
              title: "Resolve in place",
              desc: "One-tap actions for every item. Approve, send, sign, refund — without ever leaving the feed.",
              position: { top: "60%", left: "78%" },
            },
          ]}
        />

        <ProductItemTypes
          eyebrow="What lands here"
          heading="Nine streams. One feed."
          italicWord="One feed"
          intro="Every action item your studio generates — from the moment a client books to the day a review lands — routes into the same ranked queue."
          columns={3}
          items={[
            {
              icon: AlertCircle,
              accent: BRAND.danger,
              severity: "Urgent",
              title: "Allergy & medical",
              desc: "Flags from client intake forms and kiosk updates. Surfaces on today's book the moment a medical note is added or changed.",
              example:
                '"Elena Ruiz — red ink allergy added · session 4 hours away"',
            },
            {
              icon: Calendar,
              accent: BRAND.warn,
              severity: "Today",
              title: "Booking requests",
              desc: "New requests with conflict detection built in. InkOS flags double-bookings and chair conflicts before you approve.",
              example:
                '"Asha Mehra — Tue 5 PM · conflicts with Miles\' lunch"',
            },
            {
              icon: DollarSign,
              accent: BRAND.warn,
              severity: "Today",
              title: "Deposit follow-ups",
              desc: "Projects with sessions approaching and no deposit collected. Ranked by days until session — the most urgent ones surface first.",
              example: '"Tomas Vega — $200 owed · session in 7 days"',
            },
            {
              icon: FileText,
              accent: BRAND.warn,
              severity: "Today",
              title: "Consent forms",
              desc: "Unsigned consents, expiring forms, and countersign requests. One tap to re-send or countersign inline.",
              example: '"Marcus Lane — consent expires in 4 days"',
            },
            {
              icon: CreditCard,
              accent: BRAND.danger,
              severity: "Urgent",
              title: "Stripe disputes",
              desc: "Chargebacks with evidence pre-built from session records. Respond directly from the item, no dashboard login required.",
              example: '"Jonah Park — $300 chargeback · respond by Friday"',
            },
            {
              icon: RefreshCw,
              accent: BRAND.warn,
              severity: "Today",
              title: "Refund requests",
              desc: "Client-initiated refunds with session history attached. Approve partial or full refunds with a single confirmation.",
              example: '"Jonah Park — $80 partial on touch-up"',
            },
            {
              icon: Star,
              accent: BRAND.success,
              severity: "This week",
              title: "Reviews",
              desc: "New reviews from Google, Yelp, and Instagram — ranked by recency and whether they need a thoughtful reply.",
              example:
                '"3 new 5-star reviews · 1 needing a thoughtful reply"',
            },
            {
              icon: Shield,
              accent: BRAND.success,
              severity: "This week",
              title: "REACH compliance",
              desc: "Ink colors approaching MSDS expiry or flagged by recent regulation updates. Update records directly from the item.",
              example:
                '"2 ink colors require MSDS update by 30 April"',
            },
            {
              icon: Package,
              accent: BRAND.success,
              severity: "This week",
              title: "Inventory & orders",
              desc: "Stock levels below your reorder threshold, ranked by how many sessions depend on them in the next 14 days.",
              example:
                '"Eternal Crimson Lake — below 20% · reorder window 3 days"',
            },
          ]}
        />

        <ProductVsTable
          eyebrow="vs the rest"
          heading="What no one else shows you in the morning."
          italicWord="in the morning"
          competitors={[
            "InkOS Inbox",
            "DaySmart",
            "Mangomint",
            "Spreadsheet",
          ]}
          rows={[
            {
              feature: "AI priority sort (impact × urgency)",
              values: [true, false, false, false],
            },
            {
              feature: "Resolve in place (no tab-switching)",
              values: [true, false, false, false],
            },
            {
              feature: "Allergy & medical alerts inline",
              values: [true, false, false, false],
            },
            {
              feature: "Booking conflict detection",
              values: [true, false, true, false],
            },
            {
              feature: "Stripe dispute evidence pre-built",
              values: [true, false, false, false],
            },
            {
              feature: "REACH compliance triage",
              values: [true, false, false, false],
            },
            {
              feature: "Snooze with scheduled return",
              values: [true, false, false, false],
            },
            {
              feature: "Role-filtered queue (artist / owner)",
              values: [true, false, false, false],
            },
          ]}
          caption="Sources: vendor product pages, public help docs, and pilot studio reports · 2026"
        />

        <ProductDayInLife
          eyebrow="The triage"
          heading="7:14 AM. Twelve open. Six minutes."
          italicWord="Six minutes"
          intro="Kaia opens InkOS at the kitchen table. Inbox is the first tab. Twelve open items, three urgent. The order tells her exactly what to do, in what order."
          paragraphs={[
            <>
              <strong>The Stripe dispute is at the top.</strong> $300
              chargeback, evidence pre-built from Jonah&apos;s session record
              and consent form. She taps Respond, reviews the pre-filled
              submission, and sends it. Twenty seconds.
            </>,
            <>
              <strong>Item 2 is an allergy update.</strong> Elena Ruiz changed
              her medication over the weekend and updated her intake form on the
              kiosk. Her session is at 1 PM. Kaia sends the patch-test request
              directly from the inbox thread — no app switching, no copy-paste.
              One minute.
            </>,
            <>
              <strong>
                Item 3 is a booking request from Asha Mehra
              </strong>{" "}
              for Tuesday at 5 PM. InkOS flagged a conflict with her own lunch
              block. She moves the booking to 5:30, approves, and the
              confirmation fires automatically. Ninety seconds.
            </>,
            <>
              Three urgent items closed.{" "}
              <em>Six minutes total.</em> The remaining nine items are
              housekeeping — consents, compliance, reviews — due later in the
              week. The queue is clear enough that she pours a second coffee
              before the studio opens.
            </>,
          ]}
          quote="I used to dread Monday mornings — three apps, three notification piles, and the thing I was missing was always the most expensive one. Now my whole week starts with a six-minute triage."
          person={{
            name: "Kaia Osei",
            role: "Solo artist · Nine Lives Tattoo · London",
            gradient:
              "linear-gradient(135deg, #B91C1C 0%, #DC2626 50%, #F97316 100%)",
          }}
        />

        <ProductRelated
          eyebrow="One of fifteen"
          heading="Inbox is where the day gets answered. What's next."
          italicWord="answered"
          modules={[
            {
              icon: Sparkles,
              label: "Today",
              desc: "The morning launchpad",
              href: "/product/today",
            },
            {
              icon: Calendar,
              label: "Calendar",
              desc: "Multi-chair scheduling",
              href: "/product/calendar",
            },
            {
              icon: MessageSquare,
              label: "Messages",
              desc: "Client threads in one place",
              href: "/product/messages",
            },
            {
              icon: FileText,
              label: "Forms",
              desc: "Consent & intake, digital",
              href: "/product/forms",
            },
          ]}
        />

        <ProductCTA
          headline="Triage by lunch. Not after dinner."
          italicWord="Not after dinner"
          subhead="14-day free trial. No credit card. White-glove migration from any tool you're on."
        />
      </main>
      <Footer />
    </div>
  );
}
