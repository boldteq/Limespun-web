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
  Sparkles,
} from "lucide-react";
import { Nav } from "@/components/layout/nav";
import { Footer } from "@/components/layout/footer";
import { BRAND } from "@/lib/brand";
import { MessagesScreen } from "@/components/mockups";
import { ProductHero } from "@/components/product/product-hero";
import { ProductPillars } from "@/components/product/product-pillars";
import type { Pillar } from "@/components/product/product-pillars";
import { ProductAnatomy } from "@/components/product/product-anatomy";
import type { AnatomyCallout } from "@/components/product/product-anatomy";
import { ProductItemTypes } from "@/components/product/product-item-types";
import type { ItemType } from "@/components/product/product-item-types";
import { ProductDayInLife } from "@/components/product/product-day-in-life";
import { ProductRelated } from "@/components/product/product-related";
import type { RelatedModule } from "@/components/product/product-related";
import { ProductCTA } from "@/components/product/product-cta";
import { MONEY_BACK_DAYS } from "@/lib/data/plans";

// ── Pillars ───────────────────────────────────────────────────────────────────

const pillars: Pillar[] = [
  {
    icon: MessageSquare,
    accent: BRAND.rust,
    eyebrow: "One thread per client",
    title: "SMS and email, one thread per client.",
    desc: "Texts and emails land in the same conversation, next to the client record. Sorted by client, not by app. Instagram and WhatsApp are coming next.",
    bullets: [
      "Text messages (SMS)",
      "Email",
      "Request a deposit from the thread",
      "Send a consent form from the thread",
      "Instagram and WhatsApp: coming next",
    ],
  },
  {
    icon: Zap,
    accent: BRAND.amber,
    eyebrow: "Saved replies + auto-replies",
    title: "The answers you type every day, saved.",
    desc: "Save the replies you send most and drop them in with one tap. Merge tags fill in the client's name and your booking link. Keyword auto-replies answer the common questions for you.",
    bullets: [
      "Saved replies",
      "Keyword auto-replies",
      "Merge tags: name, booking link",
      "Schedule a message for later",
    ],
  },
  {
    icon: Users,
    accent: BRAND.sage,
    eyebrow: "Internal notes + assignment",
    title: "Behind-the-scenes that clients never see.",
    desc: "Internal notes sit beside every client conversation. Assign a thread to a teammate and label it, without the client seeing a word.",
    bullets: [
      "Internal notes",
      "Assign a thread to a teammate",
      "Labels to sort threads",
      "Clients never see notes",
    ],
  },
];

// ── Anatomy callouts ──────────────────────────────────────────────────────────

const callouts: AnatomyCallout[] = [
  {
    n: 1,
    title: "Channel filter",
    desc: "Filter the conversation list by channel in one tap. Every channel shows by default.",
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
    desc: "Texts and emails in one timeline, oldest to newest, each tagged with its channel.",
    position: { top: "50%", left: "52%" },
  },
  {
    n: 4,
    title: "Internal notes column",
    desc: "Kept apart from the client thread. Clients never see these.",
    position: { top: "65%", left: "72%" },
  },
  {
    n: 5,
    title: "Auto-reply indicator",
    desc: "Auto-replies show in the thread, marked as automated, so you know what the client already got.",
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
    desc: "Client asks about availability. Reply with your booking link or a saved reply.",
    example: "Do you have anything free in March?",
  },
  {
    icon: DollarSign,
    accent: BRAND.amber,
    severity: "Inbound",
    title: "Pricing question",
    desc: "A keyword auto-reply sends your saved pricing answer.",
    example: "How much for a half sleeve?",
  },
  {
    icon: Heart,
    accent: BRAND.sage,
    severity: "Inbound",
    title: "Aftercare question",
    desc: "A saved aftercare reply answers the common questions.",
    example: "Should it still be peeling on day 4?",
  },
  {
    icon: RefreshCw,
    accent: BRAND.warn,
    severity: "Inbound",
    title: "Reschedule request",
    desc: "Check the calendar and reply with a new time, from the same thread.",
    example: "I need to move my Thursday appointment",
  },
  {
    icon: Bell,
    accent: BRAND.success,
    severity: "Outbound",
    title: "Reminder",
    desc: "Appointment reminders by text and email before each session.",
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
    desc: "Keyword-triggered, from your saved replies. In your studio's words.",
    example: "Thanks! Our prices start at…",
  },
  {
    icon: FileText,
    accent: BRAND.stoneLight,
    severity: "Internal",
    title: "Internal note",
    desc: "Visible to the studio team only.",
    example: "Prefers outer forearm. Patch test first.",
  },
  {
    icon: Megaphone,
    accent: BRAND.amber,
    severity: "Broadcast",
    title: "Mass announcement",
    desc: "A campaign from Marketing to your client list. Flash days, closures, new availability.",
    example: "We have 2 last-minute slots this Saturday",
  },
];

// ── Related ───────────────────────────────────────────────────────────────────

const related: RelatedModule[] = [
  {
    icon: FileText,
    label: "Forms",
    desc: "Send a consent form from the thread; it comes back signed.",
    href: "/product/forms",
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
    desc: "Bookings and messages share the same client record.",
    href: "/product/calendar",
  },
];

// ── Day in Life paragraphs ────────────────────────────────────────────────────

const dayInLifeParagraphs: React.ReactNode[] = [
  <>
    Picture a solo artist on a Saturday morning. She opens the app to{" "}
    <strong>23 new messages:</strong>{" "}texts and emails from clients, each one sitting in
    that client&apos;s thread.
  </>,
  <>
    <strong>Keyword auto-replies already answered the easy ones</strong>{" "}with her saved
    replies: prices, aftercare, opening hours. What&apos;s left needs her.
  </>,
  <>
    Three booking questions get her booking link. <em>Two reschedules</em>{" "}go on the
    calendar. A new client gets the consent form, sent from the thread.{" "}
    <strong>Done before the shop opens.</strong>
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
          subhead="SMS and email in one thread per client, with Instagram and WhatsApp coming next. Saved replies in your studio's words, and notes your clients never see."
          dashboard={<MessagesScreen />}
        />

        <ProductPillars
          eyebrow="Core channels"
          heading="Three layers of one inbox."
          intro="Channels, saved replies and team notes, in the same thread so nothing falls between apps."
          pillars={pillars}
        />

        <ProductAnatomy
          eyebrow="Inside Messages"
          heading="One pane, the whole conversation."
          intro="Channel filter, conversation list, thread, internal notes and auto-replies, without leaving the screen."
          dashboard={<MessagesScreen />}
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

        <ProductDayInLife
          eyebrow="A day in the life"
          heading="A solo artist's Saturday morning."
          italicWord="Saturday morning"
          intro="One artist, 23 overnight messages, one inbox."
          paragraphs={dayInLifeParagraphs}
          quote="Texts and email land in one thread per client, so Saturday morning is one app, not three."
          takeawayLabel="The difference"
        />

        <ProductRelated
          eyebrow="Works best with"
          heading="The full studio, connected."
          modules={related}
        />

        <ProductCTA
          headline="One inbox, every client."
          italicWord="every client"
          subhead={`${MONEY_BACK_DAYS}-day money-back guarantee. Texts and email, one thread per client.`}
        />
      </main>
      <Footer />
    </div>
  );
}
