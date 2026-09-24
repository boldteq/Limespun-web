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
  Star,
  Package,
  MessageSquare,
  UserPlus,
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
import { NeedsAttentionScreen } from "@/components/mockups";
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
          subhead="Needs attention is the action list. Unpaid deposits, unsigned forms, booking clashes, allergy flags, low stock and unread messages, sorted into Overdue, Today and This week. Resolve, assign or snooze each one where it sits."
          dashboard={<NeedsAttentionScreen />}
        />

        <ProductPillars
          eyebrow="The premise"
          heading="The morning check, in one list."
          italicWord="one list"
          intro="Most salon software gives you a pile of notifications in time order. Limespun sorts what needs doing by when it's due, and lets you close each item without leaving the list."
          pillars={[
            {
              icon: Sparkles,
              accent: BRAND.rust,
              eyebrow: "Sorted, not chronological",
              title: "Sorted by when it's due.",
              desc: "Items land in three lanes: Overdue, Today and This week. What blocks today's chairs sits at the top.",
              bullets: [
                "Overdue, Today, This week",
                "Allergy flags on today's bookings",
                "Snoozed items come back on time",
                "Filter by category",
              ],
            },
            {
              icon: Zap,
              accent: BRAND.success,
              eyebrow: "Resolve in place",
              title: "No tab-switching.",
              desc: "Chase a deposit, resend a form or hand the item to someone on the team, from the row itself. You never leave the list.",
              bullets: [
                "Resolve, assign or snooze",
                "Resend an unsigned form",
                "Chase an unpaid deposit",
                "Open the client or booking in one tap",
              ],
            },
            {
              icon: Inbox,
              accent: BRAND.onyx,
              eyebrow: "One feed, every loop",
              title: "Deposits to forms to stock.",
              desc: "Deposits, forms, bookings, client messages, stock and the waitlist all feed one list. Nothing lives in a separate notification panel.",
              bullets: [
                "Failed payments and unpaid deposits",
                "Unsigned consent forms",
                "Low stock",
                "Guest spots about to end",
              ],
            },
          ]}
        />

        <ProductAnatomy
          eyebrow="Anatomy"
          heading="Built to be cleared, not scrolled."
          italicWord="cleared, not scrolled"
          intro="Every element in Inbox earns its place by reducing the time from 'open' to 'resolved'. Nothing is there for display."
          dashboard={<NeedsAttentionScreen />}
          callouts={[
            {
              n: 1,
              title: "Filter chips",
              desc: "Slice the list by category: Deposits, Forms, Bookings, Inquiries, Inventory, Clients.",
              position: { top: "15%", left: "34%" },
            },
            {
              n: 2,
              title: "Sorted by due",
              desc: "Allergy flags and booking clashes for today rise to the top, no matter when they came in.",
              position: { top: "30%", left: "40%" },
            },
            {
              n: 3,
              title: "Grouped urgency",
              desc: "Three lanes: Overdue, Today and This week.",
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
              desc: "Resolve, assign or snooze every item without leaving the list.",
              position: { top: "60%", left: "78%" },
            },
          ]}
        />

        <ProductItemTypes
          eyebrow="What lands here"
          heading="Nine streams. One feed."
          italicWord="One feed"
          intro="Every open item your studio generates, from the moment a client books to the day a review lands, goes into the same list."
          columns={3}
          items={[
            {
              icon: AlertCircle,
              accent: BRAND.danger,
              severity: "Today",
              title: "Allergy flags",
              desc: "An allergy on a client's record shows on their bookings and here, before they sit down.",
              example: '"Elena R. — red ink allergy · back piece today 1:30"',
            },
            {
              icon: Calendar,
              accent: BRAND.warn,
              severity: "Today",
              title: "Booking clashes",
              desc: "Two bookings on one chair, flagged before the day starts.",
              example: '"Two sessions on one chair at 1:00"',
            },
            {
              icon: DollarSign,
              accent: BRAND.warn,
              severity: "Today",
              title: "Unpaid deposits",
              desc: "Bookings still waiting on a deposit. Send the payment link again from the row.",
              example: '"Deposit not paid · consult Saturday"',
            },
            {
              icon: FileText,
              accent: BRAND.warn,
              severity: "Today",
              title: "Consent forms",
              desc: "Consent not signed before a session. Resend it in one tap.",
              example: '"Consent not signed · session tomorrow"',
            },
            {
              icon: CreditCard,
              accent: BRAND.danger,
              severity: "Overdue",
              title: "Failed payments",
              desc: "A card payment that didn't go through. Send a new link or take it at the desk.",
              example: '"Card declined · deposit $100"',
            },
            {
              icon: MessageSquare,
              accent: BRAND.warn,
              severity: "Today",
              title: "Client messages",
              desc: "Unread texts and emails, and missed calls, until someone replies.",
              example: '"3 unread · 1 missed call"',
            },
            {
              icon: UserPlus,
              accent: BRAND.success,
              severity: "This week",
              title: "Waitlist",
              desc: "Clients waiting for a gap. When a slot opens, offer it.",
              example: '"2 waiting for a Saturday slot"',
            },
            {
              icon: Star,
              accent: BRAND.success,
              severity: "This week",
              title: "Reviews",
              desc: "A new review to answer, or a happy client to ask for one.",
              example: '"1 new review · 2 clients to ask"',
            },
            {
              icon: Package,
              accent: BRAND.success,
              severity: "This week",
              title: "Low stock",
              desc: "Stock below the level you set for it.",
              example: '"Black ink — 2 bottles left"',
            },
          ]}
        />

        <ProductDayInLife
          eyebrow="The morning check"
          heading="Before the shop opens, one list."
          italicWord="one list"
          intro="The owner opens Limespun at the kitchen table. Needs attention is the first stop: twelve open items, three for today. The lanes say what comes first."
          paragraphs={[
            <>
              <strong>The allergy flag is at the top.</strong>{" "}Elena R. is in at 1:30 for
              session 2 of her back piece. She reacted to red ink after session 1, so it&apos;s
              on her record and on the booking: no red today, patch test before session 3.
            </>,
            <>
              <strong>Item 2 is a booking clash.</strong>{" "}Two sessions landed on one chair
              at 1:00. She moves one to a free chair, and the client gets a text with the
              change.
            </>,
            <>
              <strong>Item 3 is an unsigned consent form</strong>{" "}for this afternoon&apos;s
              touch-up. She resends it from the row, and it comes back signed from the
              client&apos;s phone.
            </>,
            <>
              Today&apos;s items closed. <em>The rest can wait for later in the week:</em>{" "}a
              low-stock reorder, a waitlist offer and a review to answer.
            </>,
          ]}
          quote="Deposits, forms, bookings and messages in one ordered list, with what's overdue at the top."
          takeawayLabel="Why it matters"
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
          subhead={`${MONEY_BACK_DAYS}-day money-back guarantee. We move your data over from the tool you're on, on every plan.`}
        />
      </main>
      <Footer />
    </div>
  );
}
