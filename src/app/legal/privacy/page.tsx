import { LegalPage, type LegalSection } from "@/components/shared/legal-page";

const sections: LegalSection[] = [
  {
    heading: "Who we are",
    body: "InkOS is a product of Boldteq Holdings Ltd, a company registered in the United Kingdom (registration number forthcoming). We are the data controller for personal data processed through this website (inkos.studio). For data processed inside the InkOS application by your studio, your studio is the data controller and Boldteq acts as a data processor under a Data Processing Agreement.",
  },
  {
    heading: "What we collect on this website",
    body: [
      "When you visit inkos.studio, we automatically collect basic technical data: IP address, browser type, pages visited, timestamps, and referrer URL. This is standard server log data and is retained for 30 days for security and analytics purposes.",
      "When you submit a form (contact, demo request, newsletter), we collect the data you provide: name, email, studio details, and your message. This data is sent to our team's email inbox via Resend (a transactional email provider) and retained until the inquiry is closed.",
      "We do not use third-party analytics that track you across the web. We do not use advertising cookies. The site uses only first-party functional cookies (e.g. for theme preferences).",
    ],
  },
  {
    heading: "What InkOS the application collects",
    body: [
      "Inside the application (app.inkos.studio), your studio enters data about its operations: clients, bookings, deposits, photos, consent forms, inventory, and communications. Boldteq processes this data on your studio's behalf as instructed in the Data Processing Agreement.",
      "We do not access your studio's data except: (a) to provide the service, (b) to perform legally required compliance, (c) at your studio's explicit request (e.g. for support investigation), or (d) under court order. Every internal access is logged and auditable.",
    ],
  },
  {
    heading: "How we use your data",
    body: [
      "Marketing data (this website): to respond to your inquiry, send the requested content, and (with explicit consent) send infrequent product updates.",
      "Application data: to operate the InkOS service for your studio. This includes processing payments via Stripe, sending communications via Twilio (SMS) and Resend (email), and syncing real-time data via Supabase.",
      "We do not sell, trade, or rent personal data. We do not use your studio's client data to train AI models. We do not share data with advertising networks.",
    ],
  },
  {
    heading: "Where data is stored",
    body: "Application data is stored on Supabase infrastructure (PostgreSQL + S3-compatible storage) in EU regions for studios in the EU/UK and in US regions for studios elsewhere. Data is encrypted at rest (AES-256) and in transit (TLS 1.3). Backups are encrypted and retained for 30 days.",
  },
  {
    heading: "Your rights (GDPR / CCPA)",
    body: [
      "Under GDPR (EU/UK) and CCPA (California), you have the right to: access your data, correct inaccurate data, request deletion, restrict processing, port your data to another service, and object to processing.",
      "To exercise any of these rights, email privacy@boldteq.com. We respond within 30 days as required by law (usually within 5 business days).",
      "If you are not satisfied with our response, you have the right to lodge a complaint with your local supervisory authority (e.g. the ICO in the UK, the CNIL in France, the AEPD in Spain).",
    ],
  },
  {
    heading: "Sub-processors",
    body: "We use a small number of carefully vetted sub-processors: Supabase (database + storage), Stripe (payments), Twilio (SMS), Resend (email), Railway (hosting). Each is bound by a Data Processing Agreement that meets GDPR Article 28 standards. The full list with their purposes is at /legal/security.",
  },
  {
    heading: "International transfers",
    body: "Where data is transferred outside the EU/UK (e.g. to a US-based sub-processor), we rely on the EU Standard Contractual Clauses and (where applicable) the UK International Data Transfer Addendum. We do not transfer data to countries that lack adequate protection without explicit safeguards.",
  },
  {
    heading: "Children",
    body: "InkOS is not directed to children under 16. We do not knowingly collect personal data from children. If you believe a child has provided us with data, please email privacy@boldteq.com and we will delete it promptly.",
  },
  {
    heading: "Changes to this policy",
    body: "We will notify you of material changes to this policy by email (for application customers) and via a banner on inkos.studio for at least 30 days before the change takes effect. The 'effective' date at the top of this page reflects the latest version.",
  },
];

export default function PrivacyPage() {
  return (
    <LegalPage
      eyebrow="Legal · Privacy"
      title="Privacy Policy"
      effectiveDate="27 April 2026"
      intro="This Privacy Policy describes how Boldteq Holdings Ltd ('Boldteq', 'we', 'us', 'our') collects, uses, and protects personal data on our website inkos.studio and inside the InkOS application. We have written this in plain English where the law allows. If you have questions, email privacy@boldteq.com — a real human reads every email."
      sections={sections}
      contactEmail="privacy@boldteq.com"
    />
  );
}
