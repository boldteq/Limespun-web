import Link from "next/link";
import { LegalPage, type LegalSection } from "@/components/templates/legal-page";
import { STATUS_PAGE_URL } from "@/lib/brand";
import { MONEY_BACK_DAYS } from "@/lib/data/plans";
import { pageMetadata } from "@/lib/seo";
import { LEGAL_EFFECTIVE_DATE } from "../legal-facts";

export const metadata = pageMetadata({
  title: "Terms of Service",
  description:
    "The terms for using Limespun: plans and billing, the 30-day money-back guarantee, cancellation, acceptable use and your studio's data.",
  path: "/legal/terms",
});

const sections: LegalSection[] = [
  {
    heading: "The service",
    body: [
      "Limespun is software for running a tattoo studio: bookings, deposits, consent forms, client records, messages and artist payouts. We provide the software; you run your studio.",
      "We don't employ your artists, set your prices or take a cut of your bookings or deposits. Card payments carry the payment provider's standard processing fee.",
    ],
  },
  {
    heading: "Accounts",
    body: [
      "The person who creates a studio's account is its owner and accepts these terms for the studio. The owner decides who joins the team.",
      "Keep sign-in details private. Your studio is responsible for what happens under its team's accounts.",
    ],
  },
  {
    heading: "Plans and billing",
    body: [
      "Monthly plans renew each month and annual plans each year, on the date you started. Fees are paid in advance.",
      "The account owner can change plans at any time. An upgrade applies straight away and the prorated difference is charged then; on a downgrade, the difference is credited to your next renewal.",
      "A founding lifetime plan is paid once. You keep that plan without a monthly bill.",
      "If a payment fails, paid features may be paused until it goes through. Your studio's data stays in place in the meantime.",
    ],
  },
  {
    heading: "Refunds and cancellation",
    body: [
      `Every plan comes with a ${MONEY_BACK_DAYS}-day money-back guarantee on your first payment. After that you can cancel any time; access continues until the end of the paid period.`,
      "The account owner can cancel from Billing in the app's settings. No phone call needed.",
    ],
  },
  {
    heading: "Acceptable use",
    body: "Use Limespun for the lawful running of your studio. Don't use it to:",
    list: [
      "break the law, or help anyone else to;",
      "send texts or emails your clients haven't agreed to receive;",
      "get around security measures, rate limits or plan limits;",
      "copy, resell or reverse engineer the software without our written permission.",
    ],
  },
  {
    heading: "Your responsibilities",
    body: "Your studio is responsible for:",
    list: [
      "having its clients' permission to contact them by text and email;",
      "the forms, aftercare notes and messages it sends;",
      "following the laws that apply to it, including health, licensing and tattoo-ink rules;",
      "checking anything the AI features draft before it is used. Drafts are suggestions for your team to edit.",
    ],
  },
  {
    heading: "Your studio's data",
    body: [
      <>
        Your studio owns the data it puts into Limespun. We process it only to provide the service, as described in
        the <Link href="/legal/privacy">Privacy Policy</Link>.
      </>,
      "Owners and admins can export the client list as CSV at any time, and every user can download a copy of their own data from settings.",
    ],
  },
  {
    heading: "Intellectual property",
    body: "Boldteq Holdings Ltd owns the Limespun software, design and brand. Your subscription gives your studio a non-exclusive, non-transferable license to use the software. It gives no rights to the source code or trademarks.",
  },
  {
    heading: "Availability",
    body: [
      "We work to keep Limespun available and, where we can, announce planned maintenance in advance. We don't promise the service will be uninterrupted.",
      ...(STATUS_PAGE_URL
        ? [
            <>
              Current status and incident history are on <a href={STATUS_PAGE_URL}>our status page</a>.
            </>,
          ]
        : []),
    ],
  },
  {
    heading: "Warranty",
    body: "Limespun is provided “as is” and “as available”. Beyond what these terms say, we give no warranty that it will be uninterrupted, error-free or fit for a particular purpose.",
  },
  {
    heading: "Limitation of liability",
    body: "As far as the law allows, Boldteq's total liability under these terms is limited to the amount your studio paid us in the 12 months before the event that led to the claim. We are not liable for indirect, incidental, consequential or punitive damages.",
  },
  {
    heading: "Indemnity",
    body: "Your studio agrees to cover Boldteq against claims that arise from using Limespun in breach of these terms, including claims by your clients, your artists or other third parties about how your studio operates.",
  },
  {
    heading: "Suspension and closure",
    body: [
      "Your studio can close its account at any time. Export anything you want to keep first.",
      "We may suspend or close an account that breaks these terms.",
    ],
  },
  {
    heading: "Changes",
    body: "When we change these terms, we update the effective date at the top of this page. For material changes, we'll email the account owner before they take effect.",
  },
  {
    heading: "Governing law",
    body: "These terms are governed by the laws of England and Wales. Disputes are resolved in the courts of London, except that Boldteq may seek an injunction in any court with jurisdiction. We'll try to settle any disagreement informally first.",
  },
];

export default function TermsPage() {
  return (
    <LegalPage
      path="/legal/terms"
      title="Terms of Service"
      effectiveDate={LEGAL_EFFECTIVE_DATE}
      intro="The agreement between your studio and Boldteq Holdings Ltd for using Limespun. By creating an account, your studio accepts these terms."
      sections={sections}
    />
  );
}
