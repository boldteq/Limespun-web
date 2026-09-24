import Link from "next/link";
import { LegalPage, type LegalSection } from "@/components/templates/legal-page";
import { CONTACT_EMAIL } from "@/lib/brand";
import { pageMetadata } from "@/lib/seo";
import { DATA_LOCATION, LEGAL_EFFECTIVE_DATE, SUB_PROCESSOR_TABLE, TRANSFERS } from "../legal-facts";

export const metadata = pageMetadata({
  title: "GDPR",
  description:
    "How Limespun handles personal data under the UK and EU GDPR: controller and processor roles, US hosting, transfers, sub-processors and rights.",
  path: "/legal/gdpr",
});

const sections: LegalSection[] = [
  {
    heading: "Roles",
    body: [
      "Your studio is the controller for the data it keeps in Limespun about its clients and team. Boldteq Holdings Ltd is its processor.",
      "For data collected on limespun.com, such as contact form messages and newsletter sign-ups, Boldteq is the controller.",
    ],
  },
  {
    heading: "Our commitments as processor",
    body: "For the data your studio keeps in Limespun, we:",
    list: [
      "process it only to run Limespun for your studio, on your instructions;",
      "use only the sub-processors listed on this page, and update the list when it changes;",
      "help your studio answer requests from its clients to use their rights;",
      "tell you about a personal data breach that affects your studio within 72 hours of finding it;",
      "let you export your data, and delete it after your account closes, except records the law requires us to keep.",
    ],
  },
  {
    heading: "Data processing agreement",
    body: `If your studio needs a signed Data Processing Agreement, email ${CONTACT_EMAIL}.`,
  },
  {
    heading: "Lawful basis",
    body: "Boldteq relies on these lawful bases:",
    list: [
      "Contract: to run the service your studio subscribes to.",
      "Legitimate interests: to keep Limespun secure and to prevent fraud and abuse.",
      "Consent: to send the newsletter to people who signed up for it.",
    ],
  },
  {
    heading: "Where data is stored",
    body: [DATA_LOCATION, "We don't offer EU data hosting yet. If your studio needs it, tell us: it's on our list."],
  },
  {
    heading: "International transfers",
    body: TRANSFERS,
  },
  {
    heading: "Sub-processors",
    body: "These providers process personal data on our behalf to run Limespun:",
    table: SUB_PROCESSOR_TABLE,
  },
  {
    heading: "Data subject rights",
    body: [
      "People in the UK and EU have the right to access, correct and delete their personal data, to restrict or object to how it is used, and to receive it in a portable format.",
      "If you're a client of a studio that uses Limespun, send your request to the studio: it controls your data. We'll help the studio respond within the one month the law allows.",
      <>
        For data on this website, email {CONTACT_EMAIL}. The <Link href="/legal/privacy">Privacy Policy</Link> explains
        what we collect.
      </>,
    ],
  },
  {
    heading: "Complaints",
    body: "You can complain to a data protection authority: the Information Commissioner's Office (ICO) in the UK, or the supervisory authority in your EU country. We'd like the chance to put things right first, so please write to us too.",
  },
];

export default function GdprPage() {
  return (
    <LegalPage
      path="/legal/gdpr"
      title="GDPR"
      effectiveDate={LEGAL_EFFECTIVE_DATE}
      intro="How Limespun handles personal data under the UK and EU GDPR: who is responsible for what, where the data is stored, and how to use your rights."
      sections={sections}
    />
  );
}
