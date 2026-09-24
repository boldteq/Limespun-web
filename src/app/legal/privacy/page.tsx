import Link from "next/link";
import { LegalPage, type LegalSection } from "@/components/templates/legal-page";
import { CONTACT_EMAIL } from "@/lib/brand";
import { pageMetadata } from "@/lib/seo";
import { DATA_LOCATION, LEGAL_EFFECTIVE_DATE, SUB_PROCESSOR_TABLE, TRANSFERS } from "../legal-facts";

export const metadata = pageMetadata({
  title: "Privacy Policy",
  description:
    "How Limespun collects, uses and protects personal data on limespun.com and in the app: where it is stored, who processes it, and your rights.",
  path: "/legal/privacy",
});

const sections: LegalSection[] = [
  {
    heading: "Our role",
    body: [
      "Limespun is a product of Boldteq Holdings Ltd, a company registered in the United Kingdom (“Boldteq”, “we”, “us”). We decide how personal data is used on this website, so for that data we are the controller.",
      "Inside the app, your studio decides what it records about its clients and team. For that data your studio is the controller and we are its processor: we handle it only to run Limespun for your studio.",
    ],
  },
  {
    heading: "Data from this website",
    body: [
      <>
        limespun.com has no analytics, advertising or tracking code, and it sets no cookies. The{" "}
        <Link href="/legal/cookies">Cookie Policy</Link> has the detail.
      </>,
      "Like any website, our hosting provider records basic request data: IP address, browser type, the page requested and the time. We use it to keep the site running and secure.",
      "When you send the contact form, we receive your name, email address, topic and message. When you join the newsletter, we receive your email address. To stop abuse, each form checks how often it has been sent from your IP address.",
    ],
  },
  {
    heading: "Data in the app",
    body: [
      "Your studio adds data about its clients and its work: bookings, deposits, photos, consent forms, inventory and messages. We process it on your studio's instructions to run the service.",
      "We look at a studio's data only to provide the service, when your studio asks us to (for example, to help with a support question), or when the law requires it.",
    ],
  },
  {
    heading: "How we use data",
    body: "We use personal data for these purposes only:",
    list: [
      "Website data: to answer your message and to send the newsletter you asked for. You can ask us to take you off the list at any time.",
      "App data: to run Limespun for your studio. That includes storing its records, sending the texts and emails it sends, taking card and subscription payments, and preparing the AI drafts and summaries your team asks for.",
    ],
  },
  {
    heading: "Sharing",
    body: [
      "We don't sell personal data, and we don't share it with advertising networks.",
      "We share it with the providers listed under Sub-processors, so they can do their part of running Limespun, and with authorities when the law requires it.",
    ],
  },
  {
    heading: "Storage and security",
    body: [
      DATA_LOCATION,
      <>
        Data is encrypted in transit (HTTPS with HSTS) and at rest. Our <Link href="/legal/security">Security page</Link>{" "}
        describes what we do today and what&apos;s still to come.
      </>,
    ],
  },
  {
    heading: "Sub-processors",
    body: "These providers process personal data on our behalf to run Limespun. If we add or replace one, we'll update this list.",
    table: SUB_PROCESSOR_TABLE,
  },
  {
    heading: "International transfers",
    body: ["Your studio's data is stored in the United States.", TRANSFERS],
  },
  {
    heading: "Retention",
    body: [
      "We keep messages sent through this website for as long as we need to answer them and follow up. Newsletter addresses stay on the list until you ask to be removed.",
      "Studio data is kept while the studio's account is open. After an account closes, we delete the studio's data, except records the law requires us to keep, such as invoices.",
    ],
  },
  {
    heading: "Your rights",
    body: [
      "You can ask us to access, correct, delete or export your personal data, to restrict or object to how we use it, and to withdraw consent you gave, such as for the newsletter. The UK and EU GDPR and the California Consumer Privacy Act (CCPA) make these legal rights.",
      "If you're a client of a studio that uses Limespun, send your request to the studio first. It controls your data, and we'll help it respond.",
      `To make a request, email ${CONTACT_EMAIL}. We answer within one month, as the law requires.`,
      "You can also complain to a data protection authority: the Information Commissioner's Office (ICO) in the UK, or the authority in your EU country.",
    ],
  },
  {
    heading: "Children",
    body: `This website and Limespun accounts are not meant for children under 16, and we don't knowingly collect their data here. If you think a child has sent us personal data, email ${CONTACT_EMAIL} and we'll delete it.`,
  },
  {
    heading: "Changes",
    body: "When we change this policy, we update the effective date at the top of this page. For changes that affect how we handle your studio's data, we'll email the account owner before they take effect.",
  },
];

export default function PrivacyPage() {
  return (
    <LegalPage
      path="/legal/privacy"
      title="Privacy Policy"
      effectiveDate={LEGAL_EFFECTIVE_DATE}
      intro="How Boldteq collects, uses and protects personal data on limespun.com and in the Limespun app. Written in plain English; where the law needs a precise term, we use it."
      sections={sections}
    />
  );
}
