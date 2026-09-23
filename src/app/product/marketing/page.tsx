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
import { MONEY_BACK_DAYS } from "@/lib/data/plans";
import { MarketingMockup } from "@/components/product/mockups/marketing-mockup";
import { BRAND } from "@/lib/brand";
import {
  Megaphone,
  Star,
  RefreshCw,
  Heart,
  Users,
  DollarSign,
  BarChart3,
} from "lucide-react";

export default function MarketingPage() {
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
          feature="Marketing"
          headline="Campaigns that book, not blast."
          italicWord="not blast"
          subhead="Targeted touch-up windows. Loyalty milestones routed via Stripe Connect. Auto win-back for clients silent six months. Studio marketing that sounds like the artist, not the spam folder."
          dashboard={<MarketingMockup />}
        />

        <ProductPillars
          eyebrow="How marketing works in Limespun"
          heading="Three mechanics worth automating."
          italicWord="worth automating"
          intro="Campaigns, loyalty, and win-back — running in the background while the studio focuses on the work."
          pillars={[
            {
              icon: Megaphone,
              accent: BRAND.rust,
              eyebrow: "Targeted campaigns",
              title: "Slice your client list by behaviour.",
              desc: "Filter by last session date, project completed, artist, or service type. Send to exactly the right clients — not everyone.",
              bullets: [
                "Last session date filter",
                "Project completed cohort",
                "By artist",
                "By service type",
              ],
            },
            {
              icon: Star,
              accent: BRAND.amber,
              eyebrow: "Loyalty + milestones",
              title: "Auto-trigger on session counts.",
              desc: "3rd, 5th, and 10th session milestones fire automatically. Rewards route via Stripe Connect. No manual tracking.",
              bullets: [
                "3rd / 5th / 10th session rewards",
                "Stripe Connect routing",
                "Aftercare bundle gift",
                "Per-client tracking",
              ],
            },
            {
              icon: RefreshCw,
              accent: BRAND.sage,
              eyebrow: "Win-back sequences",
              title: "14-day SMS + email for the silent.",
              desc: "Clients silent six months get a three-step sequence. Pauses automatically the moment they book.",
              bullets: [
                "Auto-trigger at 6mo silent",
                "3-step sequence",
                "Reply detection",
                "Pause if booked",
              ],
            },
          ]}
        />

        <ProductAnatomy
          eyebrow="Inside the campaign view"
          heading="Five signals per campaign, live."
          italicWord="live"
          intro="Tab strip, campaign cards, conversion funnel, loyalty progress, and attribution — everything needed to know if a campaign is working."
          dashboard={<MarketingMockup />}
          callouts={[
            {
              n: 1,
              title: "Tab strip",
              desc: "Live · Scheduled · Drafts · Completed. Each campaign owns its tab.",
              position: { top: "14%", left: "32%" },
            },
            {
              n: 2,
              title: "Campaign card",
              desc: "Title, channel, sent, conversions — at a glance per row.",
              position: { top: "34%", left: "36%" },
            },
            {
              n: 3,
              title: "Stat row",
              desc: "Sent / Open / Click / Booked — the conversion funnel for every campaign.",
              position: { top: "50%", left: "36%" },
            },
            {
              n: 4,
              title: "Loyalty progress",
              desc: "Member tiers tracked across the studio. Auto-rewards via Stripe.",
              position: { top: "74%", left: "40%" },
            },
            {
              n: 5,
              title: "Attribution footer",
              desc: "Real revenue tied to campaigns. Not vanity metrics.",
              position: { top: "90%", left: "42%" },
            },
          ]}
        />

        <ProductItemTypes
          eyebrow="Campaign types"
          heading="Six mechanics worth running."
          italicWord="worth running"
          intro="Automated campaigns that fit how tattoo studios actually work — not generic email blasts."
          columns={3}
          items={[
            {
              icon: RefreshCw,
              accent: BRAND.rust,
              severity: "Auto",
              title: "Touch-up window",
              desc: "Targeted at clients with 1+ year since last session.",
              example: '"47 sent · 12 booked"',
            },
            {
              icon: Star,
              accent: BRAND.amber,
              severity: "Auto",
              title: "Loyalty milestone",
              desc: "Auto-trigger on 5th session, free aftercare.",
              example: '"8 triggered · 6 redeemed"',
            },
            {
              icon: Heart,
              accent: BRAND.sage,
              severity: "Auto",
              title: "Win-back · 6mo silent",
              desc: "14-day SMS + email sequence.",
              example: '"23 triggered · 4 re-booked · $1,860"',
            },
            {
              icon: Megaphone,
              accent: BRAND.rust,
              severity: "Manual",
              title: "Studio announcement",
              desc: "New artist, new flash sheet, holiday hours.",
              example: '"Spring flash drop · 1,240 sent"',
            },
            {
              icon: Users,
              accent: BRAND.amber,
              severity: "Targeted",
              title: "By artist · cohort",
              desc: "Just Miles' clients, just sleeve projects.",
              example: '"Miles · sleeve cohort · 84 clients"',
            },
            {
              icon: DollarSign,
              accent: BRAND.sage,
              severity: "Auto",
              title: "Deposit reminder",
              desc: "Slot held but deposit not posted.",
              example: '"4 sent · 4 deposits posted"',
            },
          ]}
        />

        <ProductVsTable
          eyebrow="How it compares"
          heading="The win-back no one else automates."
          italicWord="no one else automates"
          competitors={[
            "Limespun Marketing",
            "Mailchimp",
            "Klaviyo",
            "Booksy",
          ]}
          rows={[
            {
              feature: "Targeted by client behaviour",
              values: [true, true, true, false],
            },
            {
              feature: "Loyalty milestone auto-rewards",
              values: [true, false, false, false],
            },
            {
              feature: "Win-back sequences",
              values: [true, true, true, false],
            },
            {
              feature: "Stripe Connect routing on rewards",
              values: [true, false, false, false],
            },
            {
              feature: "Per-artist cohort filter",
              values: [true, false, false, false],
            },
            {
              feature: "Reply detection auto-pause",
              values: [true, true, true, false],
            },
            {
              feature: "Attribution to actual bookings",
              values: [true, false, true, false],
            },
            {
              feature: "SMS + email + IG unified",
              values: [true, false, false, false],
            },
          ]}
          caption="Based on published features as of Q1 2025. Limespun first column."
        />

        <ProductDayInLife
          eyebrow="The win-back"
          heading="Tuesday, 11:42 AM. Tomas comes back."
          italicWord="Tomas comes back"
          intro="Tomas booked a half-sleeve in October 2025. Did session 1, paid the deposit, and went silent for seven months."
          paragraphs={[
            <React.Fragment key="p1">
              <strong>Day 180 of silence.</strong> Limespun auto-triggers the
              win-back sequence. Day 1 SMS:{" "}
              <em>
                &ldquo;Hey Tomas, the half-sleeve is waiting. We saved your
                deposit. — Miles&rdquo;
              </em>
            </React.Fragment>,
            <React.Fragment key="p2">
              <strong>Day 5 email.</strong> Healed photo of his session 1, the
              agreed continuation plan, a single CTA: pick a day. No deals, no
              urgency. Just the work.
            </React.Fragment>,
            <React.Fragment key="p3">
              <strong>Day 9 final SMS.</strong> &ldquo;If life&apos;s just busy,
              no rush — we&apos;ll keep your deposit on file. Reply when
              you&apos;re ready.&rdquo;
            </React.Fragment>,
            <React.Fragment key="p4">
              <strong>Day 11.</strong> Tomas replies. Books May 3 from his
              phone.{" "}
              <em>$200 booked from a $0.04 SMS.</em> The win-back closes itself
              the moment he books.
            </React.Fragment>,
          ]}
          quote="Win-back, rebook and aftercare campaigns run quietly in the background — no twice-a-year mass blast."
          takeawayLabel="The upshot"
        />

        <ProductRelated
          eyebrow="Connects directly to"
          heading="Marketing runs on the whole client record."
          italicWord="the whole client record"
          modules={[
            {
              icon: BarChart3,
              label: "Today",
              desc: "Deposit reminders fire from appointment data — no manual list building.",
              href: "/product/today",
            },
            {
              icon: Users,
              label: "Clients",
              desc: "Behavioural filters pull from the full client history — session count, project type, silence period.",
              href: "/product/clients",
            },
            {
              icon: RefreshCw,
              label: "Analytics",
              desc: "Cohort retention data feeds win-back triggers. Campaign revenue feeds the P&L.",
              href: "/product/analytics",
            },
          ]}
        />

        <ProductCTA
          headline="Speak like the artist, not the algorithm."
          italicWord="the algorithm"
          subhead={`${MONEY_BACK_DAYS}-day money-back guarantee. Targeted campaigns, loyalty milestones, and win-back sequences from day one.`}
        />
      </main>
      <Footer />
    </div>
  );
}
