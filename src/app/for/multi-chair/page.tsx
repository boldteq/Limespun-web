import React from "react";
import { TeamScreen } from "@/components/mockups/team";
import { SegmentPage } from "@/components/templates/segment-page";
import { getSegment, type Segment } from "@/lib/data/segments";
import { pageMetadata } from "@/lib/seo";
import { GuestSpotPhone, PayrollRunPhone, RolePhone, SuggestedReplyPhone } from "./visuals";

const data = getSegment("multi-chair");

/*
 * A payroll run holds artist pay only: commission and tips per artist, never the studio's
 * share (InkOS calculate_payroll_run(); PaymentsPayroll in payments/_proto/ScrPayments.tsx).
 * The data's body for this job says the run also totals "what the studio keeps", so the
 * page carries the corrected line until src/lib/data/segments.ts does.
 */
const segment: Segment = {
  ...data,
  jobs: [
    data.jobs[0],
    {
      ...data.jobs[1],
      body: "A payroll run adds up each artist’s commission and tips for the pay period. Review it, approve it and mark it paid, with 1099 forms on the same screen.",
    },
    data.jobs[2],
  ],
};

export const metadata = pageMetadata({
  title: segment.seo.title,
  description: segment.seo.description,
  path: "/for/multi-chair",
});

/*
 * Pro is the sample studio's own plan, so this page shows the whole team: Dev (owner),
 * Mara, Rio on his guest spot, Noor on the front desk and Cam's pending admin invite.
 */
export default function MultiChairPage() {
  return (
    <SegmentPage
      segment={segment}
      headings={{ week: segment.week.title, faq: "Questions busy shops ask" }}
      visuals={{
        hero: <TeamScreen view="roster" />,
        week: [<GuestSpotPhone key="guest" />, <PayrollRunPhone key="payroll" />, <SuggestedReplyPhone key="reply" />],
      }}
      beforeAfter={{
        title: "Each role opens only its own part",
        lead: "Each preset role starts with its own grants. An artist sees their own bookings and the commission rates. The front desk sees every booking and every client, and no rates or billing.",
        visual: {
          before: <RolePhone role="Artist" />,
          after: <RolePhone role="Front desk" />,
          beforeLabel: "Artist",
          afterLabel: "Front desk",
        },
      }}
      inkBand={{ headline: "A full floor on one roster.", italicWord: "roster" }}
    />
  );
}
