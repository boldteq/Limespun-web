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
import { ClientFileScreen } from "@/components/mockups";
import { BRAND } from "@/lib/brand";
import {
  AlertCircle,
  ImageIcon,
  MessageSquare,
  Users,
  FileText,
  Calendar,
  Clock,
  DollarSign,
  Shield,
} from "lucide-react";

export default function ClientsPage() {
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
          feature="Clients"
          headline="Every client. Every session. One quiet record."
          italicWord="One quiet record"
          subhead="Photo timelines, allergy notes, consent history and the full text and email thread, all on the client card. The client record that knows the difference between a touch-up and a sleeve."
          dashboard={<ClientFileScreen />}
        />

        <ProductPillars
          eyebrow="What the client record knows"
          heading="Three systems that used to be scattered."
          italicWord="used to be scattered"
          intro="Allergy intel, photo history, and comms have always existed — just never in one place. The client record in Limespun is the place."
          pillars={[
            {
              icon: AlertCircle,
              accent: BRAND.rust,
              eyebrow: "Allergy intelligence",
              title: "Surfaces 4 places, never buried.",
              desc: "Client allergens are flagged proactively across every touchpoint where a bad session could happen. Not filed away — surfaced.",
              bullets: [
                "Surfaces in Today — daily artist brief",
                "Surfaces on schedule card before appointment",
                "Surfaces in artist briefing modal",
                "Noted once, shown on every booking",
              ],
            },
            {
              icon: ImageIcon,
              accent: BRAND.amber,
              eyebrow: "Photo timeline",
              title: "Before, reference, fresh, healed.",
              desc: "Every stage of the work, filed by project and session. You choose which healed photos go in the portfolio.",
              bullets: [
                "Before, reference, fresh and healed photos",
                "Organised by project and session",
                "You pick what goes in the portfolio",
                "Healed photo added before the project closes",
              ],
            },
            {
              icon: MessageSquare,
              accent: BRAND.sage,
              eyebrow: "Communications thread",
              title: "Texts and email, one record.",
              desc: "SMS and email in a single client timeline. Internal notes kept separate from what the client sees. Instagram and WhatsApp are coming next.",
              bullets: [
                "Texts, sent and received",
                "Email, from a saved reply or written fresh",
                "Instagram and WhatsApp: coming next",
                "Internal-only notes separated from client view",
              ],
            },
          ]}
        />

        <ProductAnatomy
          eyebrow="Inside the record"
          heading="Five signals on one card."
          italicWord="Five signals"
          intro="The client card surfaces the most important intel above the fold. No digging, no tab-switching."
          dashboard={<ClientFileScreen />}
          callouts={[
            {
              n: 1,
              title: "Profile header",
              desc: "Name, pronouns, contact info, preferred artist, and account age — the quick read before you call.",
              position: { top: "12%", left: "28%" },
            },
            {
              n: 2,
              title: "Allergy banner",
              desc: "Shows whenever an allergy is on record. Impossible to miss.",
              position: { top: "28%", left: "55%" },
            },
            {
              n: 3,
              title: "Photo timeline",
              desc: "Thumbnails of every stage (before, reference, fresh, healed) in order across all projects.",
              position: { top: "48%", left: "35%" },
            },
            {
              n: 4,
              title: "Communications thread",
              desc: "Every text and email logged in sequence. Internal notes shown apart, with a different treatment.",
              position: { top: "64%", left: "62%" },
            },
            {
              n: 5,
              title: "Consent history dropdown",
              desc: "Every signed form with its signing time. One click opens the signed PDF.",
              position: { top: "80%", left: "42%" },
            },
          ]}
        />

        <ProductItemTypes
          eyebrow="What's on the client record"
          heading="Eight columns of intel."
          italicWord="Eight columns"
          intro="Everything the studio needs to know about a client, in one structured record. No spreadsheet. No sticky notes."
          columns={4}
          items={[
            {
              icon: AlertCircle,
              accent: BRAND.rust,
              severity: "Shown on the day",
              title: "Allergy field",
              desc: "Allergies flagged on Today, the booking card and the artist brief.",
              example: "Red ink reaction after session 1 — no red, patch test first",
            },
            {
              icon: Shield,
              accent: BRAND.amber,
              severity: "Private",
              title: "Medical history",
              desc: "Conditions, medications and anything the artist should know, from the medical history form.",
              example: "Blood thinners updated Tuesday — surfaces Wednesday",
            },
            {
              icon: FileText,
              accent: BRAND.sage,
              severity: "Signed",
              title: "Consent log",
              desc: "Every signed form stored as a PDF. Signed copies can't be edited.",
              example: "General consent, medical history, photo release",
            },
            {
              icon: ImageIcon,
              accent: BRAND.amber,
              severity: "By project",
              title: "Photo gallery",
              desc: "Before, reference, fresh and healed photos per project. You pick what goes in the portfolio.",
              example: "48 photos across 6 projects, sorted by stage",
            },
            {
              icon: MessageSquare,
              accent: BRAND.sage,
              severity: "SMS + email",
              title: "Communications",
              desc: "Texts and email, threaded in order. Internal notes kept separate.",
              example: "Text about a touch-up → internal note → confirmation",
            },
            {
              icon: Calendar,
              accent: BRAND.rust,
              title: "Project list",
              desc: "Every session, every artist, every piece — linked to the calendar card and invoice.",
              example: "Koi sleeve (session 4 of 5), flash piece, touch-up",
            },
            {
              icon: DollarSign,
              accent: BRAND.amber,
              title: "Payment ledger",
              desc: "Deposits, balances, tips, and invoice history per client. Reconciled to the penny.",
              example: "$300 deposit pool — $60 applied, $240 held",
            },
            {
              icon: Clock,
              accent: BRAND.sage,
              title: "Upcoming bookings",
              desc: "Next session, deposit status and consent status, straight from the calendar.",
              example: "Sat Nov 7 · 11:00 · Confirmed",
            },
          ]}
        />

        <ProductDayInLife
          eyebrow="A day in the studio"
          heading="The update that could have been missed."
          italicWord="could have been missed"
          intro="A client updates her medical form on Tuesday. The flag is on her booking by Wednesday morning."
          paragraphs={[
            "She's booked for a touch-up on Thursday. Between Tuesday and Thursday she updates her medical history form: a new blood thinner, started after surgery.",
            <React.Fragment key="p2">
              <strong>Wednesday morning</strong>, the artist opens Limespun to review the day. The medical note is flagged on her card and on the booking. Not buried in a file.
            </React.Fragment>,
            "The artist taps through to the medical history, moves the appointment by two weeks per studio policy, and texts her from the client thread. The message is logged on her record.",
            "Thursday comes and goes without incident. The session is rescheduled and the note is on her record for next time. No clipboard. No phone call to check.",
          ]}
          quote="A medical change made between bookings reaches the artist before the needle does, not after."
          takeawayLabel="What this means for your studio"
        />

        <ProductRelated
          eyebrow="Connects directly to"
          heading="The record is the hub."
          italicWord="the hub"
          modules={[
            {
              icon: Clock,
              label: "Today",
              desc: "Allergy banners surface in the daily brief before the first client sits.",
              href: "/product/today",
            },
            {
              icon: FileText,
              label: "Forms",
              desc: "Signed consent and waivers are stored on the client record.",
              href: "/product/forms",
            },
            {
              icon: Users,
              label: "Projects",
              desc: "Every session links back to the client — photos, invoices, and notes included.",
              href: "/product/projects",
            },
            {
              icon: MessageSquare,
              label: "Messages",
              desc: "The client comms thread lives here and in the inbox — same record, both views.",
              href: "/product/messages",
            },
          ]}
        />

        <ProductCTA
          headline="The client, fully held."
          italicWord="fully held"
          subhead={`${MONEY_BACK_DAYS}-day money-back guarantee. Every client record, every allergy flag, every photo — from day one.`}
        />
      </main>
      <Footer />
    </div>
  );
}
