import { LegalPage, type LegalSection } from "@/components/shared/legal-page";

const sections: LegalSection[] = [
  {
    heading: "Roles",
    body: "When your studio operates InkOS, your studio is the data controller for client and operational data. Boldteq is the data processor. The relationship is governed by our Data Processing Agreement (DPA), which is auto-applied on all paid plans.",
  },
  {
    heading: "Data Processing Agreement (DPA)",
    body: [
      "The DPA is incorporated by reference into your subscription Terms. It includes the processing details (Annex I), security measures (Annex II), sub-processors (Annex III), and the EU Standard Contractual Clauses (where data leaves the EU).",
      "A signed copy is available on request from privacy@boldteq.com. We can countersign within 5 business days for any paying studio.",
    ],
  },
  {
    heading: "Lawful basis",
    body: "Boldteq processes personal data on the lawful basis of contract (your studio's subscription) and legitimate interests (security, fraud prevention, service operation). For website marketing communications, we rely on consent (opt-in).",
  },
  {
    heading: "Data subject rights",
    body: [
      "EU/UK data subjects have the right to: access, rectification, erasure ('right to be forgotten'), restriction of processing, portability, and to object to processing.",
      "Requests from your studio's clients should be sent to your studio first (your studio is the data controller). We will support your studio in responding within 30 days. For requests directly to Boldteq about our website, email privacy@boldteq.com.",
    ],
  },
  {
    heading: "Data residency",
    body: "EU/UK studios have their primary database in EU regions (Frankfurt) by default. Backups and disaster recovery copies remain in EU. Sub-processors that may transfer data outside the EU are bound by Standard Contractual Clauses; the list is in Annex III of the DPA.",
  },
  {
    heading: "EU representative",
    body: "Boldteq's EU representative under GDPR Article 27 is reachable at eu-rep@boldteq.com. The EU representative handles inquiries from EU data subjects and supervisory authorities on our behalf.",
  },
  {
    heading: "International data transfers",
    body: "Where data is transferred outside the EU (e.g. to a US-based sub-processor for an EU studio), we rely on Standard Contractual Clauses (Module 2: Controller-to-Processor) plus, where applicable, the UK International Data Transfer Addendum (IDTA). We do not transfer data to jurisdictions without adequate safeguards.",
  },
  {
    heading: "Records of processing (Article 30)",
    body: "Boldteq maintains a Records of Processing Activities (RoPA) for every processing activity. Studios at any plan can request a summary at privacy@boldteq.com.",
  },
  {
    heading: "Data Protection Impact Assessments (DPIA)",
    body: "When we introduce a new processing activity that requires a DPIA, we complete one before launch. We share the DPIA with affected enterprise customers under NDA.",
  },
  {
    heading: "Complaints and supervisory authorities",
    body: "If you believe Boldteq has violated GDPR, you have the right to complain to your local supervisory authority. Common contacts: ICO (United Kingdom), CNIL (France), AEPD (Spain), Garante (Italy), Datenschutzbehörde (Austria), DPC (Ireland).",
  },
];

export default function GdprPage() {
  return (
    <LegalPage
      eyebrow="Legal · GDPR"
      title="GDPR & DPA"
      effectiveDate="27 April 2026"
      intro="InkOS is built for global studios, including those in the EU/UK. This document summarises our GDPR compliance posture, our Data Processing Agreement (DPA), and the rights of EU/UK data subjects. The full DPA is available on request to any paying studio at any plan."
      sections={sections}
      contactEmail="privacy@boldteq.com"
    />
  );
}
