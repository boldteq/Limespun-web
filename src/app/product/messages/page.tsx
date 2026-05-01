"use client";

import React from "react";
import {
  MessageSquare,
  Zap,
  Users,
  Calendar,
  DollarSign,
  Heart,
  RefreshCw,
  Bell,
  CheckCircle2,
  FileText,
  Megaphone,
  Inbox,
  Sparkles,
} from "lucide-react";
import { Nav } from "@/components/layout/nav";
import { Footer } from "@/components/layout/footer";
import { BRAND } from "@/lib/brand";
import { DashboardMockup } from "@/components/dashboard/dashboard-mockup";
import { ProductHero } from "@/components/product/product-hero";
import { ProductPillars } from "@/components/product/product-pillars";
import type { Pillar } from "@/components/product/product-pillars";
import { ProductAnatomy } from "@/components/product/product-anatomy";
import type { AnatomyCallout } from "@/components/product/product-anatomy";
import { ProductItemTypes } from "@/components/product/product-item-types";
import type { ItemType } from "@/components/product/product-item-types";
import { ProductVsTable } from "@/components/product/product-vs-table";
import type { VsTableRow } from "@/components/product/product-vs-table";
import { ProductDayInLife } from "@/components/product/product-day-in-life";
import { ProductRelated } from "@/components/product/product-related";
import type { RelatedModule } from "@/components/product/product-related";
import { ProductCTA } from "@/components/product/product-cta";

// ── Pillars ───────────────────────────────────────────────────────────────────

const pillars: Pillar[] = [
  {
    icon: MessageSquare,
    accent: BRAND.rust,
    eyebrow: "Omnichannel routing",
    title: "5 channels, one thread per client.",
    desc: "SMS, email, Instagram, WhatsApp, and in-app all land in the same conversation thread — sorted by client, not by platform.",
    bullets: [
      "SMS via Twilio",
      "Email via Resend",
      "IG/Messenger via Meta",
      "WhatsApp Business",
      "In-app push",
    ],
  },
  {
    icon: Zap,
    accent: BRAND.amber,
    eyebrow: "Auto-replies + templates",
    title: "Off-hours triage. 7 standard tokens.",
    desc: "Auto-replies handle the inbox while you sleep. Templates inject your studio voice — client name, booking link, studio hours — automatically.",
    bullets: [
      "Off-hours auto-reply",
      "Pricing inquiry templates",
      "Aftercare DM templates",
      "Tokenised studio voice",
    ],
  },
  {
    icon: Users,
    accent: BRAND.sage,
    eyebrow: "Internal notes + assignment",
    title: "Behind-the-scenes that clients never see.",
    desc: "A separate internal thread lives beside every client conversation. Assign, @mention, and update status without clients seeing a word.",
    bullets: [
      "Internal-only thread",
      "@mention teammates",
      "Conversation status",
      "Per-message assignment",
    ],
  },
];

// ── Anatomy callouts ──────────────────────────────────────────────────────────

const callouts: AnatomyCallout[] = [
  {
    n: 1,
    title: "Channel filter chips",
    desc: "Filter the conversation list by SMS, email, IG, WhatsApp, or in-app in one tap. All channels default-visible.",
    position: { top: "12%", left: "25%" },
  },
  {
    n: 2,
    title: "Conversation list",
    desc: "Every client thread sorted by last message. Unread badge, channel icon, and assignment chip visible at a glance.",
    position: { top: "35%", left: "18%" },
  },
  {
    n: 3,
    title: "Thread pane",
    desc: "All messages from all channels in chronological order. Each message carries its source channel tag.",
    position: { top: "50%", left: "52%" },
  },
  {
    n: 4,
    title: "Internal notes column",
    desc: "Separated from the client thread. Server-enforced — clients never see this. Supports @mentions and file attachments.",
    position: { top: "65%", left: "72%" },
  },
  {
    n: 5,
    title: "Auto-reply indicator",
    desc: "Shows when an auto-reply fired, which template was sent, and at what time. Auditable trail per conversation.",
    position: { top: "82%", left: "38%" },
  },
];

// ── Item types ────────────────────────────────────────────────────────────────

const itemTypes: ItemType[] = [
  {
    icon: Calendar,
    accent: BRAND.rust,
    severity: "Inbound",
    title: "Booking inquiry",
    desc: "Client asks about availability or slots. Auto-routing to booking link if off-hours.",
    example: "Do you have anything free in March?",
  },
  {
    icon: DollarSign,
    accent: BRAND.amber,
    severity: "Inbound",
    title: "Pricing question",
    desc: "Pricing template fires automatically on keyword match.",
    example: "How much for a half sleeve?",
  },
  {
    icon: Heart,
    accent: BRAND.sage,
    severity: "Inbound",
    title: "Aftercare question",
    desc: "Aftercare DM template handles common questions. Links to aftercare guide.",
    example: "Should it still be peeling on day 4?",
  },
  {
    icon: RefreshCw,
    accent: BRAND.warn,
    severity: "Inbound",
    title: "Reschedule request",
    desc: "Calendar slot suggestion fires from the thread. No back-and-forth.",
    example: "I need to move my Thursday appointment",
  },
  {
    icon: Bell,
    accent: BRAND.success,
    severity: "Outbound",
    title: "Reminder",
    desc: "48h and 24h appointment reminders. SMS and email in parallel.",
    example: "Your session is tomorrow at 2pm",
  },
  {
    icon: CheckCircle2,
    accent: BRAND.success,
    severity: "Outbound",
    title: "Confirmation",
    desc: "Booking confirmed notification with deposit receipt link.",
    example: "You're booked. Here's your confirmation.",
  },
  {
    icon: Zap,
    accent: BRAND.stoneDark,
    severity: "Auto",
    title: "Auto-reply",
    desc: "Off-hours or keyword-triggered. Studio voice, tokenised. No manual action needed.",
    example: "Thanks — we'll be back online at 9am",
  },
  {
    icon: FileText,
    accent: BRAND.stoneLight,
    severity: "Internal",
    title: "Internal note",
    desc: "Visible to studio team only. Supports @mentions and file attachments.",
    example: "@asha — this client prefers arm placement",
  },
  {
    icon: Megaphone,
    accent: BRAND.amber,
    severity: "Broadcast",
    title: "Mass announcement",
    desc: "Send to all clients or a tagged segment. Flash bookings, studio closures, new availability.",
    example: "We have 2 last-minute slots this Saturday",
  },
];

// ── Vs table ──────────────────────────────────────────────────────────────────

const vsCompetitors = [
  "InkOS Messages",
  "DaySmart",
  "Mangomint",
  "SMS app",
];

const vsRows: VsTableRow[] = [
  { feature: "5+ channels unified per client", values: [true, false, false, false] },
  { feature: "Auto-reply off-hours triage", values: [true, false, true, true] },
  { feature: "Templates with tokens", values: [true, true, true, false] },
  { feature: "Internal notes separated", values: [true, false, false, false] },
  { feature: "Real-time presence", values: [true, false, false, false] },
  { feature: "Per-conversation assignment", values: [true, false, false, false] },
  { feature: "Read receipts cross-channel", values: [true, false, false, false] },
  { feature: "Mass announcement", values: [true, true, true, true] },
];

// ── Related ───────────────────────────────────────────────────────────────────

const related: RelatedModule[] = [
  {
    icon: Inbox,
    label: "Inbox",
    desc: "The unified view of all conversations, assignments, and statuses.",
    href: "/product/inbox",
  },
  {
    icon: Sparkles,
    label: "Today",
    desc: "Daily brief: sessions, messages queued, and what needs action.",
    href: "/product/today",
  },
  {
    icon: Users,
    label: "Clients",
    desc: "Every client's full message history, linked to their profile.",
    href: "/product/clients",
  },
  {
    icon: Calendar,
    label: "Calendar",
    desc: "Slot suggestions fire directly from the conversation thread.",
    href: "/product/calendar",
  },
];

// ── Day in Life paragraphs ────────────────────────────────────────────────────

const dayInLifeParagraphs: React.ReactNode[] = [
  <>
    Kaia Osei runs Nine Lives Tattoo solo in East London. Saturday morning she opens
    the app to{" "}
    <strong>23 messages across 4 channels overnight.</strong> Instagram DMs, two WhatsApp
    threads, a handful of SMS, and three emails.
  </>,
  <>
    <strong>Auto-replies handled 14 of them</strong> — off-hours triage, pricing templates,
    an aftercare question answered with a link to the guide. Kaia&apos;s queue has 9
    left.
  </>,
  <>
    Three booking inquiries: templates fire with her calendar link.{" "}
    <em>Two reschedules</em>: slot suggestions surface from the thread. Four aftercare
    questions: handled inline with the aftercare template. Nine conversations cleared in{" "}
    <strong>8 minutes.</strong>
  </>,
];

// ── Page ──────────────────────────────────────────────────────────────────────

export default function MessagesPage() {
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
          feature="Messages"
          headline="Every conversation, one inbox."
          italicWord="one inbox"
          subhead="SMS, email, Instagram, WhatsApp, and in-app — unified per client. Auto-replies during off-hours. Templates that keep your studio voice. The phone-tag, eliminated."
          dashboard={<DashboardMockup />}
        />

        <ProductPillars
          eyebrow="Core channels"
          heading="Three layers of one inbox."
          intro="Routing, automation, and team coordination — built into the same thread so nothing falls between channels."
          pillars={pillars}
        />

        <ProductAnatomy
          eyebrow="Inside Messages"
          heading="One pane, every channel."
          intro="Channel chips, conversation list, thread, internal notes, and auto-reply audit — all visible without leaving the screen."
          dashboard={<DashboardMockup />}
          callouts={callouts}
        />

        <ProductItemTypes
          eyebrow="Conversation types"
          heading="Nine ways studios talk to clients."
          italicWord="Nine ways"
          intro="Every message type a studio handles — inbound, outbound, automated, and internal — tracked in one thread."
          items={itemTypes}
          columns={3}
        />

        <ProductVsTable
          eyebrow="Why InkOS"
          heading="Five channels. Zero app-switching."
          intro="Most tools handle one channel well. InkOS routes all five into a single thread per client."
          competitors={vsCompetitors}
          rows={vsRows}
          caption="Comparison based on publicly available features as of 2025."
        />

        <ProductDayInLife
          eyebrow="A day in the life"
          heading="Kaia's Saturday morning."
          italicWord="Saturday morning"
          intro="Nine Lives Tattoo, East London. 23 overnight messages. 8 minutes to clear them."
          paragraphs={dayInLifeParagraphs}
          quote="I used to chase three apps to keep up with my Sunday inbox. Now I just open InkOS."
          person={{
            name: "Kaia Osei",
            role: "Solo · Nine Lives Tattoo · East London",
            gradient:
              "linear-gradient(135deg, #B91C1C 0%, #DC2626 50%, #F97316 100%)",
          }}
        />

        <ProductRelated
          eyebrow="Works best with"
          heading="The full studio, connected."
          modules={related}
        />

        <ProductCTA
          headline="One inbox, every channel."
          italicWord="every channel"
          subhead="14-day trial. Connect SMS or email and watch threads merge by client."
        />
      </main>
      <Footer />
    </div>
  );
}
