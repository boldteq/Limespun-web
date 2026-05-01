import { LegalPage, type LegalSection } from "@/components/shared/legal-page";

const sections: LegalSection[] = [
  {
    heading: "What InkOS is",
    body: "InkOS is a software-as-a-service application for tattoo studios. We provide the software; you operate your studio. We do not employ your artists, set your prices, take a cut of your bookings, or appear in front of your clients except as your branded software.",
  },
  {
    heading: "Subscription and billing",
    body: [
      "Subscriptions renew monthly on the date you started. Annual plans renew annually. All fees are payable in advance.",
      "You can cancel any time from inside the app — no phone call required. Cancellation takes effect at the end of the current billing period; we do not pro-rate refunds for partial months.",
      "If your payment fails, we will retry twice over 7 days. If still unpaid, your account will be suspended (data preserved) until payment resolves. After 60 days of non-payment, the account is closed and data deleted per the Privacy Policy.",
    ],
  },
  {
    heading: "Acceptable use",
    body: "You may use InkOS for any lawful tattoo studio operation. You may not: (a) use it to operate or facilitate illegal activity, (b) reverse engineer the software, (c) resell access without our written permission, (d) attempt to circumvent security or rate limits, (e) use the application to send unsolicited communications (spam) to clients or third parties.",
  },
  {
    heading: "Your studio's data",
    body: [
      "You retain all rights, title, and interest in the data your studio enters into InkOS.",
      "We are a data processor for your studio's customer data. We process it only as instructed by you and as described in the Data Processing Agreement.",
      "On account closure, you can export all your data via the in-app export tool. We retain backups for 30 days post-closure for technical purposes; after that, all data is permanently deleted.",
    ],
  },
  {
    heading: "Intellectual property",
    body: "InkOS software, its design, brand, and underlying technology are owned by Boldteq Holdings Ltd. You receive a non-exclusive, non-transferable licence to use the software as described in your subscription. You do not receive any rights to the source code, trademarks, or trade secrets.",
  },
  {
    heading: "Service availability",
    body: "We target 99.9% monthly uptime. Status is published at status.inkos.studio. Scheduled maintenance is announced at least 7 days in advance via email and the in-app banner. Unscheduled downtime is communicated as quickly as we can; we issue service credits per our SLA when uptime falls below the target.",
  },
  {
    heading: "Warranty disclaimer",
    body: "InkOS is provided 'as is' and 'as available'. We make no warranty that the service will be uninterrupted, error-free, or fit for any particular purpose beyond what these Terms describe. We use industry-standard security practices but cannot guarantee against every conceivable threat.",
  },
  {
    heading: "Limitation of liability",
    body: "To the maximum extent permitted by law, Boldteq's total liability under these Terms is limited to the amount you paid us in the 12 months preceding the event giving rise to the claim. We are not liable for indirect, incidental, consequential, or punitive damages.",
  },
  {
    heading: "Indemnification",
    body: "You agree to indemnify Boldteq against claims arising from your studio's use of InkOS in violation of these Terms, including but not limited to claims by your clients, your artists, or third parties about your studio's operations.",
  },
  {
    heading: "Governing law and disputes",
    body: "These Terms are governed by the laws of England and Wales. Disputes will be resolved in the courts of London, except that Boldteq may seek injunctive relief in any court of competent jurisdiction. We will attempt to resolve disputes informally before litigation.",
  },
];

export default function TermsPage() {
  return (
    <LegalPage
      eyebrow="Legal · Terms"
      title="Terms of Service"
      effectiveDate="27 April 2026"
      intro="These Terms govern your use of InkOS, the studio operating system for tattoo, provided by Boldteq Holdings Ltd. By using InkOS, your studio accepts these Terms. We've kept the legalese minimal; where we use it, we've explained why."
      sections={sections}
      contactEmail="legal@boldteq.com"
    />
  );
}
