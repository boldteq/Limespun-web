import React from "react";
import { SegmentPage } from "@/components/templates/segment-page";
import { BookingFlowPhone } from "@/components/mockups/booking-flow";
import { BriefingPhone } from "@/components/mockups/briefing";
import { ClientPortalPhone } from "@/components/mockups/client-portal";
import { ConsentSignPhone } from "@/components/mockups/forms";
import { getSegment } from "@/lib/data/segments";
import { pageMetadata } from "@/lib/seo";

const segment = getSegment("solo-artists");

export const metadata = pageMetadata({
  title: segment.seo.title,
  description: segment.seo.description,
  path: "/for/solo-artists",
});

/*
 * Every screen here is Dev's: one artist, one chair, as on Solo. With one artist the app
 * skips choosing an artist, so the hero never shows that step: Time, and from lg Details.
 */
function BookingHero() {
  return (
    <div className="flex items-start justify-center gap-10 lg:gap-14">
      <BookingFlowPhone step={2} />
      <BookingFlowPhone step={3} className="hidden translate-y-10 lg:flex" />
    </div>
  );
}

export default function SoloArtistsPage() {
  return (
    <SegmentPage
      segment={segment}
      headings={{ faq: "Questions solo artists ask" }}
      visuals={{
        hero: <BookingHero />,
        // Phones: the phone runs off the frame's foot between the deposit card and Continue
        heroCropAt: 395,
        week: [
          <BookingFlowPhone key="book" step={4} />,
          <BriefingPhone key="briefing" />,
          <ClientPortalPhone key="portal" view="project" />,
        ],
      }}
      beforeAfter={{
        title: "Consent done before the client sits down",
        italicWord: "before",
        lead: "The form goes out with the booking. Elena R. notes her red ink reaction, signs on her phone at 9:42 and can download a PDF copy.",
        visual: {
          before: <ConsentSignPhone state="form" />,
          after: <ConsentSignPhone state="done" />,
          beforeLabel: "On her phone",
          afterLabel: "Signed at 9:42",
        },
      }}
      inkBand={{ headline: "Your chair, booked from one link.", italicWord: "link" }}
    />
  );
}
