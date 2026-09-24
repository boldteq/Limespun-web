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
import { FormsScreen } from "@/components/mockups";
import { BRAND } from "@/lib/brand";
import {
  FileText,
  Shield,
  CheckCircle2,
  Users,
  AlertCircle,
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
          subhead="Send the form to their phone before they arrive, or hand them the studio tablet in kiosk mode. EU REACH ink disclosure is built in. Signed copies can't be edited and are stored as PDFs."
          dashboard={<FormsScreen />}
        />

        <ProductPillars
          eyebrow="How forms work in Limespun"
          heading="Three layers that replace the clipboard."
          italicWord="replace the clipboard"
          intro="Tablet kiosk, EU REACH ink disclosure and a signed record, in one form system. Nothing to bolt on."
          pillars={[
            {
              icon: FileText,
              accent: BRAND.rust,
              eyebrow: "Tablet kiosk mode",
              title: "Hand them the tablet. Forget the clipboard.",
              desc: "Open kiosk mode from Forms. The client fills it in, signs and hands it back. No app to download, no login for them.",
              bullets: [
                "Kiosk mode for the front-desk tablet",
                "Pre-filled from the booking",
                "Sign with a finger or a stylus",
                "Opened by the owner or front desk",
              ],
            },
            {
              icon: Shield,
              accent: BRAND.amber,
              eyebrow: "EU REACH ink disclosure",
              title: "The inks, listed on the form.",
              desc: "Add a REACH disclosure block to any consent form. It pulls from the Ink registry in Settings, where you keep each ink's brand and batch.",
              bullets: [
                "REACH disclosure block in the form builder",
                "Brands and batches from your Ink registry",
                "REACH-registered inks marked in Inventory",
                "On every plan, Solo included",
              ],
            },
            {
              icon: CheckCircle2,
              accent: BRAND.sage,
              eyebrow: "Signed PDF record",
              title: "Signed copies can't be edited.",
              desc: "Signed copies can't be edited and are stored as PDFs, filed against the client and the session they were signed for.",
              bullets: [
                "Locked the moment it's signed",
                "Stored as a PDF on the client record",
                "Signing time saved with the form",
                "Resend the signed PDF to the client",
              ],
            },
          ]}
        />

        <ProductAnatomy
          eyebrow="Inside the form flow"
          heading="Five moments between arrival and chair."
          italicWord="Five moments"
          intro="From kiosk launch to signed PDF, the form flow handles every step. The artist sees the result before the client sits."
          dashboard={<FormsScreen tab="submissions" />}
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
              title: "REACH ink disclosure",
              desc: "The inks you plan to use, with brand and batch from your Ink registry, listed for the client before they sign.",
              position: { top: "66%", left: "64%" },
            },
            {
              n: 5,
              title: "Signed PDF",
              desc: "Once signed, the form locks. A PDF copy is stored with the client and the session.",
              position: { top: "82%", left: "44%" },
            },
          ]}
        />

        <ProductItemTypes
          eyebrow="Form library"
          heading="Six templates to start from."
          italicWord="Six templates"
          intro="Start from a template, change the wording, add your own fields. The forms a tattoo studio needs, ready on day one."
          columns={3}
          items={[
            {
              icon: FileText,
              accent: BRAND.rust,
              severity: "Required",
              title: "Tattoo consent — general",
              desc: "The standard signed consent: name, date of birth, over-18 confirmation, placement and design agreed, aftercare understood.",
              example: "Pre-filled with the client's name and session date",
            },
            {
              icon: AlertCircle,
              accent: BRAND.rust,
              severity: "Required",
              title: "Medical history",
              desc: "Allergies (latex, pigment, past ink reactions), medication, skin conditions. Allergies show on the client's bookings.",
              example: "Allergy notes surface on the booking and on Today",
            },
            {
              icon: ImageIcon,
              accent: BRAND.sage,
              title: "Photo & social release",
              desc: "Permission to photograph the work, and a separate yes or no for posting it on social.",
              example: "Two checkboxes, signed with the consent",
            },
            {
              icon: Heart,
              accent: BRAND.sage,
              title: "Aftercare acknowledgement",
              desc: "The client confirms they've received and understood the healing instructions.",
              example: "Signed at the end of the session",
            },
            {
              icon: Users,
              accent: BRAND.amber,
              severity: "Under 18",
              title: "Minor / guardian consent",
              desc: "A guardian co-signs for a client under 18.",
              example: "Guardian signature required",
            },
            {
              icon: RefreshCw,
              accent: BRAND.amber,
              title: "Touch-up waiver",
              desc: "Your touch-up policy and window, agreed before the touch-up session.",
              example: "Attached to the touch-up booking",
            },
          ]}
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
            "The form locks. A signed PDF is stored on the client record and against the session. The artist sees consent marked as signed on the booking, ready to go.",
            "No clipboard. No filing. No scanning at end of day. The form is done before the artist finishes setting up their station.",
          ]}
          quote="Consent is signed, stored and filed against the booking before the client sits down. No end-of-day scanning."
          takeawayLabel="What this means for your studio"
        />

        <ProductRelated
          eyebrow="Connects directly to"
          heading="Forms feed the whole record."
          italicWord="the whole record"
          modules={[
            {
              icon: Users,
              label: "Clients",
              desc: "Every signed form is stored on the client record. Consent history in one place.",
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
              desc: "REACH-registered inks are marked in Inventory, and the disclosure uses the same Ink registry.",
              href: "/product/inventory",
            },
            {
              icon: Shield,
              label: "EU REACH hub",
              desc: "What the EU ink rules ask of a studio, and how Limespun records it.",
              href: "/reach-compliance",
            },
          ]}
        />

        <ProductCTA
          headline="Consent in 90 seconds."
          italicWord="90 seconds"
          subhead={`${MONEY_BACK_DAYS}-day money-back guarantee. Kiosk mode, signed PDFs and REACH ink disclosure from day one.`}
        />
      </main>
      <Footer />
    </div>
  );
}
