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
import { MarketingScreen } from "@/components/mockups";
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
          subhead="Campaigns to your own client list by text and email. Segments like 'healed, not rebooked' on Studio. A waitlist that fills cancellations, and referrals you can track. Studio marketing that sounds like the artist, not the spam folder."
          dashboard={<MarketingScreen />}
        />

        <ProductPillars
          eyebrow="How marketing works in Limespun"
          heading="Three ways to fill quiet weeks."
          italicWord="quiet weeks"
          intro="Campaigns to your own list, a waitlist for cancellations, and referrals, all from the client records you already have."
          pillars={[
            {
              icon: Megaphone,
              accent: BRAND.rust,
              eyebrow: "Campaigns",
              title: "Send to the right clients, not everyone.",
              desc: "Pick a segment of your client list and send a campaign by text or email. Build your own segments on Studio and up.",
              bullets: [
                "Text or email",
                "Ready-made segments",
                "Custom segments on Studio and up",
                "Your own list, no rented audience",
              ],
            },
            {
              icon: RefreshCw,
              accent: BRAND.amber,
              eyebrow: "Waitlist",
              title: "A cancellation, filled from the waitlist.",
              desc: "Clients waiting for a gap sit on the waitlist. When a slot opens, offer it to the next person, or set rules to promote them for you.",
              bullets: [
                "Filter the waitlist",
                "Offer an opened slot",
                "Auto-promote rules",
                "Waitlist numbers at a glance",
              ],
            },
            {
              icon: Heart,
              accent: BRAND.sage,
              eyebrow: "Referral program",
              title: "Know who sent who.",
              desc: "Clients refer friends, and you can see which bookings came from a referral. No points or tiers to manage.",
              bullets: [
                "On every plan, Solo included",
                "Referred bookings tracked",
                "No points to manage",
              ],
            },
          ]}
        />

        <ProductAnatomy
          eyebrow="Inside the campaign view"
          heading="Everything a campaign needs, one screen."
          italicWord="one screen"
          intro="Tabs, the campaign list, the headline numbers and the waitlist, without leaving Marketing."
          dashboard={<MarketingScreen tab="campaigns" />}
          callouts={[
            {
              n: 1,
              title: "Tab strip",
              desc: "Audience, Campaigns, Waitlist and Referral.",
              position: { top: "14%", left: "32%" },
            },
            {
              n: 2,
              title: "Campaign card",
              desc: "Title, channel and who it went to, at a glance per row.",
              position: { top: "34%", left: "36%" },
            },
            {
              n: 3,
              title: "Headline numbers",
              desc: "The marketing KPIs at the top of the screen.",
              position: { top: "50%", left: "36%" },
            },
            {
              n: 4,
              title: "Waitlist",
              desc: "Clients waiting for a slot, ready to be offered a gap.",
              position: { top: "74%", left: "40%" },
            },
            {
              n: 5,
              title: "Segments",
              desc: "Ready-made segments, plus your own on Studio and up.",
              position: { top: "90%", left: "42%" },
            },
          ]}
        />

        <ProductItemTypes
          eyebrow="Campaign types"
          heading="Six mechanics worth running."
          italicWord="worth running"
          intro="Campaigns that fit how tattoo studios actually work, not generic email blasts."
          columns={3}
          items={[
            {
              icon: RefreshCw,
              accent: BRAND.rust,
              severity: "Studio +",
              title: "Healed, not rebooked",
              desc: "Clients whose work has healed but who haven't booked again.",
              example: '"Segment · text + email"',
            },
            {
              icon: Star,
              accent: BRAND.amber,
              severity: "Waitlist",
              title: "Waitlist fill",
              desc: "A cancellation offered to the next client waiting.",
              example: '"Saturday 1:00 opened · offered to the waitlist"',
            },
            {
              icon: Heart,
              accent: BRAND.sage,
              severity: "Segment",
              title: "Lapsed clients",
              desc: "Clients who haven't booked in a while, sent one campaign.",
              example: '"One text · one email"',
            },
            {
              icon: Megaphone,
              accent: BRAND.rust,
              severity: "Everyone",
              title: "Studio announcement",
              desc: "New artist, new flash, holiday hours.",
              example: '"Walk-in flash day · Rio\'s guest spot"',
            },
            {
              icon: Users,
              accent: BRAND.amber,
              severity: "Studio +",
              title: "By artist",
              desc: "Just one artist's clients, or just multi-session projects.",
              example: '"Mara\'s clients · fine-line"',
            },
            {
              icon: DollarSign,
              accent: BRAND.sage,
              severity: "Referral",
              title: "Referrals",
              desc: "Track the bookings that came from a client's referral.",
              example: '"Referred by Asha M."',
            },
          ]}
        />

        <ProductDayInLife
          eyebrow="A cancellation"
          heading="Tuesday, 11:42 AM. A quiet Saturday, filled."
          italicWord="filled"
          intro="Leo B. cancels Saturday's session late. His $150 deposit is kept under the studio's policy, and the chair is empty."
          paragraphs={[
            <React.Fragment key="p1">
              <strong>11:42 AM.</strong> The slot opens on the calendar. Two clients are on the waitlist for a Saturday.
            </React.Fragment>,
            <React.Fragment key="p2">
              <strong>11:45 AM.</strong> The owner offers the slot to the first one on the waitlist, by text.
            </React.Fragment>,
            <React.Fragment key="p3">
              <strong>12:10 PM.</strong> She takes it and pays the deposit. The booking is Confirmed.
            </React.Fragment>,
            <React.Fragment key="p4">
              Then one campaign for the rest of the week: the &ldquo;healed, not rebooked&rdquo; segment gets a text about Thursday&apos;s walk-in flash day with Rio.{" "}
              <em>No mass blast, just the clients it fits.</em>
            </React.Fragment>,
          ]}
          quote="Campaigns go to the clients they fit, from your own list. No twice-a-year mass blast."
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
              desc: "Where a cancellation shows up first.",
              href: "/product/today",
            },
            {
              icon: Users,
              label: "Clients",
              desc: "Segments pull from the client record: projects, artists, last visit.",
              href: "/product/clients",
            },
            {
              icon: RefreshCw,
              label: "Analytics",
              desc: "Lapsed and returning clients, counted.",
              href: "/product/analytics",
            },
          ]}
        />

        <ProductCTA
          headline="Speak like the artist, not the algorithm."
          italicWord="the algorithm"
          subhead={`${MONEY_BACK_DAYS}-day money-back guarantee. Campaigns, a waitlist and referrals from day one; custom segments on Studio.`}
        />
      </main>
      <Footer />
    </div>
  );
}
