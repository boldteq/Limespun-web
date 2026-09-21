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
import { PortfolioMockup } from "@/components/product/mockups/portfolio-mockup";
import { BRAND } from "@/lib/brand";
import {
  RefreshCw,
  ImageIcon,
  Star,
  Sparkles,
  Heart,
  LayoutGrid,
  Users,
} from "lucide-react";

export default function PortfolioPage() {
  return (
    <div style={{ minHeight: "100vh", background: BRAND.bone, overflow: "hidden" } as React.CSSProperties}>
      <Nav />
      <main>
        <ProductHero
          feature="Portfolio"
          headline="The portfolio that builds itself."
          italicWord="builds itself"
          subhead="Stop manually uploading photos to Squarespace. Limespun auto-syncs every healed photo from your project timelines into a studio gallery. Flash sheets get deposit-tied booking links. The portfolio is finally a byproduct of the work, not another job."
          dashboard={<PortfolioMockup />}
        />

        <ProductPillars
          eyebrow="The premise"
          heading="One studio. One gallery. Zero manual uploads."
          italicWord="Zero manual uploads"
          intro="Every healed photo you tag in a project timeline finds its way to the gallery automatically. Flash sheets carry their own deposit-tied booking links. You curate once and the work does the rest."
          pillars={[
            {
              icon: RefreshCw,
              accent: BRAND.rust,
              eyebrow: "Auto-sync from projects",
              title: "Auto-sync from projects",
              desc: "HEALED photo posts to gallery the moment it's tagged.",
              bullets: [
                "Project timeline → gallery",
                "Per-artist + studio gallery",
                "Client-name privacy options",
                "Watermark on download",
              ],
            },
            {
              icon: ImageIcon,
              accent: BRAND.amber,
              eyebrow: "Flash sheets with bookings",
              title: "Flash sheets with bookings",
              desc: "Every flash design has its own slot price + deposit.",
              bullets: [
                "Per-flash deposit amount",
                "Booking link with project pre-fill",
                "Sold/available state",
                "Auto-archive when booked",
              ],
            },
            {
              icon: Star,
              accent: BRAND.sage,
              eyebrow: "Featured + curation",
              title: "Featured + curation",
              desc: "Pin your best. Order matters. Artist + studio views.",
              bullets: [
                "Drag-to-reorder",
                "Featured on top",
                "Per-artist filter",
                "Dark + light gallery themes",
              ],
            },
          ]}
        />

        <ProductAnatomy
          eyebrow="Anatomy"
          heading="Everything your gallery needs. Nothing it doesn't."
          italicWord="Nothing it doesn't"
          intro="Filter by type, see healed stages auto-tagged, pin featured pieces, and identify every artist at a glance — all from one gallery view."
          dashboard={<PortfolioMockup />}
          callouts={[
            {
              n: 1,
              title: "Filter chips",
              desc: "Slice the gallery by status: All, Flash, Healed, Drafts, Featured.",
              position: { top: "12%", left: "34%" },
            },
            {
              n: 2,
              title: "Auto-sync indicator",
              desc: "Footer reminds you: Auto-sync from Projects on. Photos flow without you lifting a finger.",
              position: { top: "85%", left: "64%" },
            },
            {
              n: 3,
              title: "Featured pin",
              desc: "Tap any thumbnail and pin it. Pinned pieces show first across all artists.",
              position: { top: "38%", left: "24%" },
            },
            {
              n: 4,
              title: "Healed-stage tag",
              desc: "Photos tagged HEALED in the project timeline auto-show with the day count.",
              position: { top: "38%", left: "60%" },
            },
            {
              n: 5,
              title: "Artist initial",
              desc: "Bottom-right of every thumb shows whose work it is. One studio, multiple voices.",
              position: { top: "52%", left: "74%" },
            },
          ]}
        />

        <ProductItemTypes
          eyebrow="Gallery types"
          heading="Six ways to show the work."
          italicWord="show the work"
          intro="Not all gallery content is the same. Limespun handles each type differently — so flash sheets get booking links and healed photos get their day count without you lifting a finger."
          columns={3}
          items={[
            {
              icon: Star,
              accent: BRAND.rust,
              duration: "Featured",
              title: "Featured pieces",
              desc: "Hand-picked, pinned to the top.",
              example: '"3 featured · auto-rotates weekly"',
            },
            {
              icon: Sparkles,
              accent: BRAND.amber,
              duration: "Flash",
              title: "Flash sheets",
              desc: "Pre-designed, deposit-tied bookings.",
              example: '"32 flash · 12 sold this quarter"',
            },
            {
              icon: Heart,
              accent: BRAND.sage,
              duration: "Healed",
              title: "Healed gallery",
              desc: "Auto-synced from project timelines.",
              example: '"28 healed · auto-tagged Day 45+"',
            },
            {
              icon: ImageIcon,
              accent: BRAND.stoneDark,
              duration: "Per-artist",
              title: "Artist galleries",
              desc: "Each artist gets their own slice.",
              example: '"Miles · Rafael · Yvette · Nina"',
            },
            {
              icon: LayoutGrid,
              accent: BRAND.rust,
              duration: "Studio",
              title: "Studio gallery",
              desc: "Combined view, branded as one shop.",
              example: '"sableandsparrow.studio gallery"',
            },
            {
              icon: RefreshCw,
              accent: BRAND.amber,
              duration: "Drafts",
              title: "Drafts + private",
              desc: "Work-in-progress, owner-only.",
              example: '"12 drafts · 3 client-private"',
            },
          ]}
        />

        <ProductVsTable
          eyebrow="vs the rest"
          heading="Other tools make the portfolio your job."
          italicWord="your job"
          intro="Squarespace needs manual uploads. Instagram has no booking layer. Booksy has no gallery at all. Limespun auto-syncs your healed photos and ties every flash sheet to a deposit-gated booking link."
          competitors={["Limespun Portfolio", "Squarespace", "Instagram", "Booksy"]}
          rows={[
            { feature: "Auto-sync from project sessions", values: [true, false, false, false] },
            { feature: "Per-flash deposit-tied booking", values: [true, false, false, true] },
            { feature: "Healed-stage auto-tagging", values: [true, false, false, false] },
            { feature: "Per-artist + studio gallery", values: [true, true, false, true] },
            { feature: "Watermark on download", values: [true, false, false, false] },
            { feature: "Drag-to-reorder featured", values: [true, true, false, false] },
            { feature: "Studio-branded URL slug", values: [true, true, false, true] },
            { feature: "Image storage included", values: [true, false, true, false] },
          ]}
          caption="Sources: vendor product pages, public help docs, and pilot studio reports · 2026"
        />

        <ProductDayInLife
          eyebrow="Day 45 healed"
          heading="Day 45. The koi sleeve closes itself."
          italicWord="closes itself"
          intro="Ten weeks after Asha's first session, her koi sleeve is finally healed. She uploads the final photo via the kiosk app at her checkup."
          paragraphs={[
            <React.Fragment key="p1">
              <strong>The HEALED tag fires.</strong> Limespun auto-tags her healed photo as Day 45 from the original session timestamp.
            </React.Fragment>,
            <React.Fragment key="p2">
              <strong>Three things happen at once.</strong> The project closes. The healed photo is archived to her client record. And — without Miles lifting a finger — it appears in the Sable &amp; Sparrow studio gallery, tagged &quot;MV&quot; for Miles Verena.
            </React.Fragment>,
            <React.Fragment key="p3">
              <strong>By Friday it&apos;s pinned.</strong> Miles drags it to featured. The studio&apos;s homepage gallery now leads with the koi. Two new booking inquiries by Sunday cite &quot;saw the koi sleeve.&quot;
            </React.Fragment>,
            <React.Fragment key="p4">
              The portfolio used to be a Saturday-night chore. Now it&apos;s a{" "}
              <em>byproduct of the work itself.</em>
            </React.Fragment>,
          ]}
          quote="I haven't manually uploaded a photo to my studio site in six months. The work just shows up there."
          person={{
            name: "Miles Verena",
            role: "Owner · Sable & Sparrow · Brooklyn",
            gradient: "linear-gradient(135deg, #0F0F0F 0%, #4B4842 50%, #9A9792 100%)",
          }}
        />

        <ProductRelated
          eyebrow="One of fifteen"
          heading="Portfolio links every part of the studio together."
          italicWord="every part"
          modules={[
            { icon: RefreshCw, label: "Projects", desc: "Multi-session sleeves & timelines", href: "/product/projects" },
            { icon: Users, label: "Clients", desc: "Full client records & history", href: "/product/clients" },
            { icon: ImageIcon, label: "Marketing", desc: "Social, flash drops, campaigns", href: "/product/marketing" },
            { icon: LayoutGrid, label: "Forms", desc: "Consents, deposits, intake", href: "/product/forms" },
          ]}
        />

        <ProductCTA
          headline="The work, the gallery, one feed."
          italicWord="one feed"
          subhead="14-day free trial. No credit card. Tag your first healed photo and watch it appear in your studio gallery — automatically."
        />
      </main>
      <Footer />
    </div>
  );
}
