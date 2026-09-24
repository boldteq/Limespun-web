import React from "react";
import { SegmentPage } from "@/components/templates/segment-page";
import { getSegment } from "@/lib/data/segments";
import { pageMetadata } from "@/lib/seo";
import { CommissionsPhone, InboxPhone, KiraThreadPhone, ReschedulePhone, StudioDayHero } from "./visuals";

const segment = getSegment("small-studios");

export const metadata = pageMetadata({
  title: segment.seo.title,
  description: segment.seo.description,
  path: "/for/small-studios",
});

/*
 * Studio is two to five residents on one calendar, so every screen here is Dev and Mara's:
 * Rio's guest seat needs Pro and stays off this page. The hero is the day with both chairs
 * and a drag refused; the week shows the other clash check (the Reschedule sheet), the
 * split each artist is on, and the shared inbox.
 */
export default function SmallStudiosPage() {
  return (
    <SegmentPage
      segment={segment}
      headings={{ week: segment.week.title, faq: "Questions small studios ask" }}
      visuals={{
        hero: <StudioDayHero />,
        week: [<ReschedulePhone key="move" />, <CommissionsPhone key="splits" />, <InboxPhone key="inbox" />],
      }}
      beforeAfter={{
        title: "Every thread lands with its artist",
        lead: "Kira N. emails the shop at 9:48 for an earlier slot. Dev hands the thread to Mara and leaves a note only the team can read: Kira is already on Mara’s waitlist.",
        visual: {
          before: <KiraThreadPhone assigned={false} />,
          after: <KiraThreadPhone assigned />,
          beforeLabel: "9:48, unassigned",
          afterLabel: "With Mara",
        },
      }}
      inkBand={{ headline: "One book for every artist.", italicWord: "book" }}
    />
  );
}
