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
import { PortfolioScreen } from "@/components/mockups";
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
          headline="Show the work. Sell the flash."
          italicWord="Sell"
          subhead="Promote a healed photo from a project into the portfolio in one tap, or upload work directly. Flash pieces carry their own price and deposit. You choose what goes in; nothing posts on its own."
          dashboard={<PortfolioScreen />}
        />

        <ProductPillars
          eyebrow="The premise"
          heading="One studio. One gallery. Your pick."
          italicWord="Your pick"
          intro="Promote the healed photos you're proud of straight from a project, or upload them. Flash pieces carry their own price and deposit. You curate; nothing posts by itself."
          pillars={[
            {
              icon: RefreshCw,
              accent: BRAND.rust,
              eyebrow: "From projects",
              title: "Healed photos, one tap away",
              desc: "Promote a healed photo from a project into the portfolio. You decide which ones.",
              bullets: [
                "Promote from a project's healed photos",
                "Or upload work directly",
                "Per-artist + studio gallery",
                "Healed date shown on the piece",
              ],
            },
            {
              icon: ImageIcon,
              accent: BRAND.amber,
              eyebrow: "Flash sheets with bookings",
              title: "Flash sheets with bookings",
              desc: "Every flash piece has its own price and deposit.",
              bullets: [
                "Per-piece price and deposit",
                "Draft, Available, Reserved, Sold",
                "Watermarked as it's uploaded",
                "Run a Flash event with its own dates",
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
                "Public portfolio page",
              ],
            },
          ]}
        />

        <ProductAnatomy
          eyebrow="Anatomy"
          heading="Everything your gallery needs. Nothing it doesn't."
          italicWord="Nothing it doesn't"
          intro="Filter by type, see healed dates, pin featured pieces and spot every artist at a glance, all from one gallery view."
          dashboard={<PortfolioScreen />}
          callouts={[
            {
              n: 1,
              title: "Filter chips",
              desc: "Slice the gallery by status: All, Flash, Healed, Drafts, Featured.",
              position: { top: "12%", left: "34%" },
            },
            {
              n: 2,
              title: "Promote from projects",
              desc: "Healed photos from projects wait to be promoted. One tap and they're in.",
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
              title: "Healed date",
              desc: "Work promoted from a project shows when it healed.",
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
          intro="Not all gallery content is the same. Limespun handles each type differently, so flash pieces carry a price and deposit and healed work shows its healed date."
          columns={3}
          items={[
            {
              icon: Star,
              accent: BRAND.rust,
              duration: "Featured",
              title: "Featured pieces",
              desc: "Hand-picked, pinned to the top.",
              example: '"3 featured · pinned to the top"',
            },
            {
              icon: Sparkles,
              accent: BRAND.amber,
              duration: "Flash",
              title: "Flash sheets",
              desc: "Pre-designed, deposit-tied bookings.",
              example: '"Available · Reserved · Sold"',
            },
            {
              icon: Heart,
              accent: BRAND.sage,
              duration: "Healed",
              title: "Healed gallery",
              desc: "Promoted from project timelines.",
              example: '"Healed · Aug 2026"',
            },
            {
              icon: ImageIcon,
              accent: BRAND.stoneDark,
              duration: "Per-artist",
              title: "Artist galleries",
              desc: "Each artist gets their own slice.",
              example: '"Dev · Mara · Rio"',
            },
            {
              icon: LayoutGrid,
              accent: BRAND.rust,
              duration: "Studio",
              title: "Studio gallery",
              desc: "Combined view, branded as one shop.",
              example: '"Sample studio · public portfolio page"',
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

        <ProductDayInLife
          eyebrow="Healed"
          heading="The koi sleeve, healed."
          italicWord="healed"
          intro="Weeks after her last session, Asha M.'s koi sleeve is healed, and the healed photo goes on the project."
          paragraphs={[
            <React.Fragment key="p1">
              <strong>The project moves to Complete.</strong> The healed photo sits on the project and on her client record.
            </React.Fragment>,
            <React.Fragment key="p2">
              <strong>Dev promotes it to the portfolio.</strong> One tap from the project, with her photo release on file. It shows with his name and the healed date.
            </React.Fragment>,
            <React.Fragment key="p3">
              <strong>He pins it to featured.</strong> The public portfolio page now leads with the koi.
            </React.Fragment>,
            <React.Fragment key="p4">
              The portfolio used to be a Saturday-night chore. Now it&apos;s{" "}
              <em>one tap at the end of the work.</em>
            </React.Fragment>,
          ]}
          quote="Healed work reaches the portfolio in one tap, once the client has said yes."
          takeawayLabel="In short"
        />

        <ProductRelated
          eyebrow="One of fifteen"
          heading="Portfolio links every part of the studio together."
          italicWord="every part"
          modules={[
            { icon: RefreshCw, label: "Projects", desc: "Multi-session work & photo timelines", href: "/product/projects" },
            { icon: Users, label: "Clients", desc: "Full client records & history", href: "/product/clients" },
            { icon: ImageIcon, label: "Marketing", desc: "Flash days, campaigns, referrals", href: "/product/marketing" },
            { icon: LayoutGrid, label: "Forms", desc: "Consent and photo release", href: "/product/forms" },
          ]}
        />

        <ProductCTA
          headline="The work, the gallery, one feed."
          italicWord="one feed"
          subhead={`${MONEY_BACK_DAYS}-day money-back guarantee. Promote your first healed photo and it's in your studio gallery.`}
        />
      </main>
      <Footer />
    </div>
  );
}
