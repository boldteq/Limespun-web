import React from "react";
import { BookingFlowPhone } from "@/components/mockups/booking-flow";
import { SegmentPage } from "@/components/templates/segment-page";
import { getSegment, type Segment } from "@/lib/data/segments";
import { pageMetadata } from "@/lib/seo";
import { formatPrice, PLANS } from "@/lib/data/plans";
import { AddLocationPhone, EastsideSetupPhone, LocationMonthPhone, LocationsHero, LocationsPhone } from "./visuals";

const data = getSegment("multi-location");
const price = formatPrice(PLANS.find((p) => p.tier === data.plan)?.monthlyCents ?? 0);

/*
 * Reports in the app have no location filter (InkOS analytics/_proto/ScrAnalytics.tsx: "There
 * is no locations dimension on any analytics query"). The roll-up across shops is the
 * Locations screen: totals for the month, and each location's own month on its page. The
 * data's body for this job says Reports filter by location, so the page carries the
 * corrected line until src/lib/data/segments.ts does.
 */
const segment: Segment = {
  ...data,
  jobs: [
    {
      ...data.jobs[0],
      body: "Locations adds up artists, bookings and revenue for the month across every shop. Open one location for its own month: revenue, bookings and the artists who work there.",
    },
    data.jobs[1],
    data.jobs[2],
  ],
};

export const metadata = pageMetadata({
  title: segment.seo.title,
  description: segment.seo.description,
  path: "/for/multi-location",
});

export default function MultiLocationPage() {
  return (
    <SegmentPage
      segment={segment}
      headings={{ week: segment.week.title, faq: "Questions studio groups ask" }}
      visuals={{
        hero: <LocationsHero />,
        // Phones: the totals and Downtown's card, then Eastside's card fades out at the frame's
        // foot (LocationsHero masks the last 120px, so the cut never lands on a line of text).
        heroCropAt: 700,
        week: [<LocationMonthPhone key="month" />, <EastsideSetupPhone key="setup" />, <BookingFlowPhone key="booking" step={1} />],
      }}
      beforeAfter={{
        title: "A second shop, the same account",
        lead: `Add a second location and it gets its own card, hours and artists, and Locations starts adding up artists, bookings and revenue across both. On Multi-Location the price stays ${price} a month however many shops you open.`,
        visual: {
          before: <AddLocationPhone />,
          after: <LocationsPhone />,
          beforeLabel: "Adding Eastside",
          afterLabel: "Eastside added",
        },
      }}
      inkBand={{ headline: "Open the next shop on the same account.", italicWord: "next" }}
    />
  );
}
