import { LegalPage, type LegalSection } from "@/components/shared/legal-page";

const sections: LegalSection[] = [
  {
    heading: "Encryption",
    body: "Data is encrypted at rest (AES-256) and in transit (TLS 1.3 minimum). Sensitive fields (payment tokens, government IDs, MSDS attachments) receive an additional encryption layer with rotated keys.",
  },
  {
    heading: "Access controls",
    body: [
      "Inside Boldteq, access to production data is restricted to a small number of senior engineers with multi-factor authentication required.",
      "Every production access is logged with the actor, action, target, and reason. Logs are retained for 7 years.",
      "We use the principle of least privilege: customer support has no production database access; engineers requiring production access for debugging must request it per-incident.",
    ],
  },
  {
    heading: "Authentication for your studio",
    body: "Your studio's users authenticate via Supabase Auth (passwordless email magic links by default; password + TOTP 2FA available). On Enterprise plans, SSO via Google, Microsoft, or SAML is supported, with SCIM provisioning for SCIM-aware identity providers.",
  },
  {
    heading: "Network security",
    body: "Application traffic terminates at Railway's edge. Database is in a private network, not accessible from the public internet. Outbound traffic to Stripe, Twilio, etc. uses pinned TLS certificates and dedicated egress IPs.",
  },
  {
    heading: "Sub-processors",
    body: [
      "We use the following sub-processors. Each is bound by a Data Processing Agreement and ISO 27001 / SOC 2 compliant.",
      "Supabase (database + storage; data residency: EU or US per studio location). Stripe (payments; PCI DSS Level 1). Twilio (SMS; SOC 2 Type II). Resend (transactional email; SOC 2 Type II). Railway (hosting; SOC 2 Type II in progress).",
    ],
  },
  {
    heading: "Breach response",
    body: [
      "If we discover a personal data breach affecting your studio, we will notify you within 72 hours of discovery, provide a description of the breach, the likely consequences, and the measures taken to address it.",
      "Internal incident response runs on a documented runbook. Post-mortems for material incidents are shared with affected customers and (in summary form) on status.inkos.studio.",
    ],
  },
  {
    heading: "Backups and disaster recovery",
    body: "Production database is backed up every 6 hours; point-in-time recovery available for 7 days. Full snapshots retained for 30 days. We test disaster recovery quarterly with a documented RTO of 4 hours and RPO of 6 hours.",
  },
  {
    heading: "SOC 2 path",
    body: "We are working toward SOC 2 Type II. Type I report expected Q4 2026; Type II expected Q3 2027. Our security advisor is a Big-4 firm; full timeline available under NDA.",
  },
  {
    heading: "Bug bounty / responsible disclosure",
    body: "We accept security reports at security@boldteq.com. PGP key available on request. We do not currently run a public bug bounty programme but pay reasonable rewards for legitimate, non-DoS findings reported responsibly. We do not pursue researchers acting in good faith under our disclosure policy.",
  },
  {
    heading: "Penetration testing",
    body: "Annual third-party penetration test by a CREST-accredited firm. Most recent test: March 2026; report available under NDA to enterprise customers.",
  },
];

export default function SecurityPage() {
  return (
    <LegalPage
      eyebrow="Legal · Security"
      title="Security"
      effectiveDate="27 April 2026"
      intro="Security is non-negotiable for studio software. Below is an honest snapshot of our security posture, sub-processors, and the path to SOC 2 Type II. Updated quarterly. Last security review: April 2026."
      sections={sections}
      contactEmail="security@boldteq.com"
    />
  );
}
