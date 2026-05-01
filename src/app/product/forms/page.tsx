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
  FileText,
  Shield,
  CheckCircle2,
  Users,
  AlertCircle,
  MapPin,
  Heart,
  ImageIcon,
  RefreshCw,
  Calendar,
  Clipboard,
} from "lucide-react";

export default function FormsPage() {
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
          feature="Forms"
          headline="The paperwork, finally not paperwork."
          italicWord="finally not paperwork"
          subhead="Hand a client the iPad and walk away. Kiosk consent flows, REACH 2022 EU ink waivers, and a SHA-256 hashed PDF audit trail that holds up in any room."
          dashboard={<DashboardMockup />}
        />

        <ProductPillars
          eyebrow="How forms work in InkOS"
          heading="Three layers that replace the clipboard."
          italicWord="replace the clipboard"
          intro="Tablet kiosk, legal compliance, and tamper-proof audit trail — baked into one form system. Nothing to bolt on."
          pillars={[
            {
              icon: FileText,
              accent: BRAND.rust,
              eyebrow: "Tablet kiosk mode",
              title: "Hand them the iPad. Forget the clipboard.",
              desc: "Lock the screen to consent mode. Client fills, signs, and hands it back. No app download, no login, no friction.",
              bullets: [
                "Single-screen kiosk — nothing else accessible",
                "Pre-filled from booking: name, date, artist",
                "Signature capture with touch or Apple Pencil",
                "Auto-exits kiosk on submission",
              ],
            },
            {
              icon: Shield,
              accent: BRAND.amber,
              eyebrow: "REACH-compliant waivers",
              title: "EU 2022 ink registry baked in.",
              desc: "REACH Annex XVII EU ink regulation fields built into the waiver template. Colour index numbers, CI references, supplier batch data — all captured.",
              bullets: [
                "REACH Annex XVII compliant fields",
                "CI number field per ink used",
                "Supplier batch reference captured",
                "Inspector-ready export in one click",
              ],
            },
            {
              icon: CheckCircle2,
              accent: BRAND.sage,
              eyebrow: "Hashed PDF audit trail",
              title: "SHA-256 signed, court-admissible.",
              desc: "Every submitted form is hashed, timestamped, and sealed. The PDF cannot be altered post-signature. eIDAS and ESIGN compliant.",
              bullets: [
                "SHA-256 hash on every PDF",
                "eIDAS and ESIGN Act compliant",
                "Timestamp locked at submission",
                "Hash watermark visible on all PDF exports",
              ],
            },
          ]}
        />

        <ProductAnatomy
          eyebrow="Inside the form flow"
          heading="Five moments between arrival and chair."
          italicWord="Five moments"
          intro="From kiosk launch to audit PDF — the form flow handles every step. The artist sees the result before the client sits."
          dashboard={<DashboardMockup />}
          callouts={[
            {
              n: 1,
              title: "Kiosk header",
              desc: "Studio logo, session date, and artist name — pre-filled from the booking. Client sees exactly what they're signing for.",
              position: { top: "10%", left: "32%" },
            },
            {
              n: 2,
              title: "Signature capture",
              desc: "Touch or Apple Pencil signature drawn directly on screen. Locked to the form — not a separate step.",
              position: { top: "30%", left: "58%" },
            },
            {
              n: 3,
              title: "Photo upload",
              desc: "Client uploads ID photo or reference image in the same flow. Attached to the client record automatically.",
              position: { top: "50%", left: "38%" },
            },
            {
              n: 4,
              title: "Ink batch CI ref",
              desc: "REACH-required CI number and supplier batch captured per ink. Populates the waiver and the inventory record simultaneously.",
              position: { top: "66%", left: "64%" },
            },
            {
              n: 5,
              title: "Audit hash watermark",
              desc: "SHA-256 hash printed on the PDF footer at submission. Verifiable externally — proof the document hasn't changed.",
              position: { top: "82%", left: "44%" },
            },
          ]}
        />

        <ProductItemTypes
          eyebrow="Form library"
          heading="Eight templates, all yours to brand."
          italicWord="Eight templates"
          intro="Every form a tattoo studio needs — pre-built, legally structured, and fully branded to your studio. Edit the copy, keep the compliance."
          columns={4}
          items={[
            {
              icon: FileText,
              accent: BRAND.rust,
              severity: "Standard",
              title: "General consent",
              desc: "The baseline waiver every client signs. Covers procedure, aftercare acknowledgement, and liability.",
              example: "Pre-filled with client name and session date",
            },
            {
              icon: Users,
              accent: BRAND.amber,
              severity: "Under 18",
              title: "Minor consent",
              desc: "Guardian signature required. Age verification flow built in. Separate from adult consent records.",
              example: "Guardian co-sign + ID upload required",
            },
            {
              icon: AlertCircle,
              accent: BRAND.rust,
              severity: "Medical",
              title: "Allergy questionnaire",
              desc: "Structured allergen and medical history capture. Feeds directly into the client allergy record.",
              example: "Results surface on booking card and Today view",
            },
            {
              icon: MapPin,
              accent: BRAND.sage,
              severity: "Location",
              title: "Body location waiver",
              desc: "Covers sensitive placement areas — neck, face, hands. Risk acknowledgement per zone.",
              example: "Zone-specific risk language pre-populated",
            },
            {
              icon: Shield,
              accent: BRAND.amber,
              severity: "EU required",
              title: "REACH ink waiver",
              desc: "EU 2022 Annex XVII compliant. CI numbers, batch references, and supplier data captured at session.",
              example: "Inspector-ready PDF generated automatically",
            },
            {
              icon: Heart,
              accent: BRAND.sage,
              title: "Aftercare acknowledgement",
              desc: "Client confirms they've received and understood aftercare instructions. Timestamped.",
              example: "Auto-sent with post-session summary email",
            },
            {
              icon: ImageIcon,
              accent: BRAND.rust,
              title: "Photo release",
              desc: "Explicit consent for studio photography and social media use. Scoped by platform and use case.",
              example: "Instagram, portfolio, press — per-channel checkboxes",
            },
            {
              icon: RefreshCw,
              accent: BRAND.amber,
              title: "Cancellation policy",
              desc: "Client signs the deposit forfeiture and rescheduling terms before booking is confirmed.",
              example: "48-hour policy enforced at booking, signed at intake",
            },
          ]}
        />

        <ProductVsTable
          eyebrow="How it compares"
          heading="The form system built for the studio."
          italicWord="built for the studio"
          competitors={["InkOS Forms", "DaySmart", "Mangomint", "Paper"]}
          rows={[
            {
              feature: "iPad kiosk mode (locked screen)",
              values: [true, false, false, false],
            },
            {
              feature: "eIDAS / ESIGN compliant signatures",
              values: [true, false, false, false],
            },
            {
              feature: "SHA-256 hashed PDF at submission",
              values: [true, false, false, false],
            },
            {
              feature: "REACH 2022 Annex XVII aware fields",
              values: [true, false, false, false],
            },
            {
              feature: "Studio-branded form templates",
              values: [true, true, true, true],
            },
            {
              feature: "Auto-attached to client record",
              values: [true, false, false, false],
            },
            {
              feature: "Pre-filled from appointment booking",
              values: [true, false, false, false],
            },
          ]}
          caption="Based on published features as of Q1 2025. InkOS first column."
        />

        <ProductDayInLife
          eyebrow="A day in the studio"
          heading="Ninety seconds from door to chair."
          italicWord="Ninety seconds"
          intro="The client arrives. The iPad is already waiting with their booking loaded."
          paragraphs={[
            "The kiosk screen shows the studio logo, today's date, and the artist's name. No typing, no searching. The booking data pre-fills the form.",
            <React.Fragment key="p2">
              The client works through consent, allergy questionnaire, and photo release in under two minutes. <strong>They sign with a finger.</strong> They hand back the iPad.
            </React.Fragment>,
            "The SHA-256 hash generates. The PDF seals. The form auto-attaches to the client record and the project card. The artist sees a green tick on the session card — ready to go.",
            "No clipboard. No filing. No scanning at end of day. The form is done before the artist finishes setting up their station.",
          ]}
          quote="I used to spend 20 minutes at the end of every day scanning and filing consent forms. InkOS killed that completely."
          person={{
            name: "Priya Nair",
            role: "Owner, Seventh Skin Studio",
            gradient: `linear-gradient(135deg, ${BRAND.amber} 0%, ${BRAND.sage} 100%)`,
          }}
        />

        <ProductRelated
          eyebrow="Connects directly to"
          heading="Forms feed the whole record."
          italicWord="the whole record"
          modules={[
            {
              icon: Users,
              label: "Clients",
              desc: "Every signed form auto-attaches to the client record. Consent history in one place.",
              href: "/product/clients",
            },
            {
              icon: Calendar,
              label: "Calendar",
              desc: "Form status shows on the booking card. Green tick before the client sits.",
              href: "/product/calendar",
            },
            {
              icon: Clipboard,
              label: "Inventory",
              desc: "REACH waiver CI numbers sync to the ink batch record in inventory.",
              href: "/product/inventory",
            },
            {
              icon: Shield,
              label: "Compliance hub",
              desc: "All REACH and consent data rolls into the compliance dashboard for inspections.",
              href: "/reach-compliance",
            },
          ]}
        />

        <ProductCTA
          headline="Consent in 90 seconds."
          italicWord="90 seconds"
          subhead="14-day free trial. No card required. Kiosk mode, hashed PDFs, and REACH waivers from day one."
        />
      </main>
      <Footer />
    </div>
  );
}
