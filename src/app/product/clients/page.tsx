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
import { DashboardMockup } from "@/components/dashboard/dashboard-mockup";
import { BRAND } from "@/lib/brand";
import {
  AlertCircle,
  ImageIcon,
  MessageSquare,
  Users,
  FileText,
  Star,
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
          subhead="Photo timelines, allergy intelligence, consent history, and a full communications thread — all on the client card. The CRM that knows the difference between a touch-up and a sleeve."
          dashboard={<DashboardMockup />}
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
                "Patch test log per ink batch attached",
              ],
            },
            {
              icon: ImageIcon,
              accent: BRAND.amber,
              eyebrow: "Photo timeline",
              title: "Reference, fresh, healing, healed.",
              desc: "Every stage of the tattoo process is documented and auto-organised. The portfolio builds itself.",
              bullets: [
                "REF / FRESH / HEAL / HEALED stages tracked",
                "Auto-organised by project",
                "Studio portfolio synced automatically",
                "Healed photo close-out required before archive",
              ],
            },
            {
              icon: MessageSquare,
              accent: BRAND.sage,
              eyebrow: "Communications thread",
              title: "Every channel, one record.",
              desc: "SMS, email, Instagram DMs — all threaded into a single client timeline. Internal notes kept separate from client-visible comms.",
              bullets: [
                "SMS via Twilio — inbound and outbound",
                "Email via Resend — templated and ad-hoc",
                "Instagram DMs synced to the thread",
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
          dashboard={<DashboardMockup />}
          callouts={[
            {
              n: 1,
              title: "Profile header",
              desc: "Name, pronouns, contact info, preferred artist, and account age — the quick read before you call.",
              position: { top: "12%", left: "28%" },
            },
            {
              n: 2,
              title: "Allergy banner pulse",
              desc: "Amber pulse when allergens are on record. Red when a patch test is overdue. Impossible to miss.",
              position: { top: "28%", left: "55%" },
            },
            {
              n: 3,
              title: "Photo timeline stripe",
              desc: "Thumbnail rail of every stage — REF, FRESH, HEAL, HEALED — in chronological order across all projects.",
              position: { top: "48%", left: "35%" },
            },
            {
              n: 4,
              title: "Communications thread",
              desc: "Every SMS, email, and DM logged in sequence. Internal notes visually separated with a different treatment.",
              position: { top: "64%", left: "62%" },
            },
            {
              n: 5,
              title: "Consent history dropdown",
              desc: "Every signed form, timestamped and SHA-256 sealed. One click opens the PDF. Audit-ready in seconds.",
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
              severity: "Surfaces 4x",
              title: "Allergy field",
              desc: "Active allergens flagged across Today, schedule card, artist brief, and patch test log.",
              example: "Nickel, sulphates, Eternal Ink series — all recorded",
            },
            {
              icon: Shield,
              accent: BRAND.amber,
              severity: "GDPR-ready",
              title: "Medical history",
              desc: "Conditions, medications, and contraindications. Exported on client data request in one click.",
              example: "Blood thinners updated Tuesday — surfaces Wednesday",
            },
            {
              icon: FileText,
              accent: BRAND.sage,
              severity: "Signed & sealed",
              title: "Consent log",
              desc: "Every waiver hashed and attached. eIDAS-compliant digital signatures. PDF on demand.",
              example: "General consent, REACH waiver, photo release",
            },
            {
              icon: ImageIcon,
              accent: BRAND.amber,
              severity: "Auto-organised",
              title: "Photo gallery",
              desc: "REF, FRESH, HEAL, HEALED stages per project. Studio portfolio syncs from here.",
              example: "48 photos across 6 projects, sorted by stage",
            },
            {
              icon: MessageSquare,
              accent: BRAND.sage,
              severity: "Per-channel",
              title: "Communications",
              desc: "SMS, email, Instagram DMs — threaded chronologically. Internal notes separated.",
              example: "DM about touch-up → internal note → SMS confirmation",
            },
            {
              icon: Calendar,
              accent: BRAND.rust,
              title: "Project list",
              desc: "Every session, every artist, every piece — linked to the calendar card and invoice.",
              example: "Sleeve (ongoing), Cover-up Jan 2025, Flash drop",
            },
            {
              icon: DollarSign,
              accent: BRAND.amber,
              title: "Payment ledger",
              desc: "Deposits, balances, tips, and invoice history per client. Reconciled to the penny.",
              example: "£200 deposit on sleeve — £800 balance remaining",
            },
            {
              icon: Star,
              accent: BRAND.sage,
              title: "Loyalty status",
              desc: "Visit count, total spend, referrals, and custom loyalty tier. Rewards surface at checkout.",
              example: "Gold tier — 12 visits — 3 referrals",
            },
          ]}
        />

        <ProductVsTable
          eyebrow="How it compares"
          heading="The client record others forgot to build."
          italicWord="others forgot to build"
          competitors={["Limespun Clients", "DaySmart", "Mangomint", "Spreadsheet"]}
          rows={[
            {
              feature: "Per-client allergy fields surfaced in 4 places",
              values: [true, false, false, false],
            },
            {
              feature: "Photo timeline with REF/FRESH/HEAL/HEALED stages",
              values: [true, false, false, false],
            },
            {
              feature: "Consent history attached to client record",
              values: [true, false, false, false],
            },
            {
              feature: "Communications thread (SMS + email + DMs)",
              values: [true, false, false, false],
            },
            {
              feature: "GDPR data export on request",
              values: [true, false, false, false],
            },
            {
              feature: "Per-artist client scoping",
              values: [true, false, false, false],
            },
            {
              feature: "Patch test log per ink batch",
              values: [true, false, false, false],
            },
            {
              feature: "Healed photo close-out required",
              values: [true, false, false, false],
            },
          ]}
          caption="Based on published features as of Q1 2025. Limespun first column."
        />

        <ProductDayInLife
          eyebrow="A day in the studio"
          heading="The update that could have been missed."
          italicWord="could have been missed"
          intro="Asha changes her medication on Tuesday. The allergy banner pulses Wednesday morning."
          paragraphs={[
            "Asha books a touch-up for Thursday. Between Tuesday and Thursday she updates her GP record — new blood thinner, started post-surgery.",
            <React.Fragment key="p2">
              <strong>Wednesday morning</strong>, the artist opens Limespun to review their day. The allergy banner on Asha&apos;s card is amber — pulsing. Not a static label. A live signal.
            </React.Fragment>,
            "The artist taps through to the medical history. Blood thinner flagged. They move the appointment by two weeks, per studio protocol, and send Asha an SMS from the comms thread — logged automatically.",
            "Thursday comes and goes without incident. The near-miss is logged, the session is rescheduled, and the patch test note is updated. No clipboard. No phone call to check.",
          ]}
          quote="We caught an allergy update on Wednesday that would have been a problem Thursday. That doesn't happen with any other system we've used."
          person={{
            name: "Miles Verena",
            role: "Studio Manager, Sable & Sparrow",
            gradient: `linear-gradient(135deg, ${BRAND.rust} 0%, ${BRAND.amber} 100%)`,
          }}
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
              desc: "Consent and waivers auto-attach to the client record on signature.",
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
          subhead="14-day free trial. No card required. Every client record, every allergy flag, every photo — from day one."
        />
      </main>
      <Footer />
    </div>
  );
}
