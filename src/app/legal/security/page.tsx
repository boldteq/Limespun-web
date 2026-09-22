import { LegalPage, type LegalSection } from "@/components/shared/legal-page";

/*
 * Every statement here is checked against the Limespun app (InkOS repo) and the live
 * app.limespun.com responses. Don't add claims that aren't true today.
 */
const sections: LegalSection[] = [
  {
    heading: "Encryption",
    body: [
      "All traffic to Limespun is encrypted in transit over HTTPS. The app enforces HTTPS with HSTS (preloaded), so browsers never connect over plain HTTP.",
      "Data is encrypted at rest (AES-256) by our database and storage provider. On top of that, Limespun encrypts some fields itself with AES-256-GCM, including connected-app credentials and consent forms that are still in draft.",
    ],
  },
  {
    heading: "Each studio's data stays separate",
    body: "Every studio's records are separated at the database level with row-level security, scoped to the studio. One studio's account can't read another studio's clients, bookings or forms.",
  },
  {
    heading: "Signing in",
    body: [
      "Accounts use Supabase Auth. Passwords must be at least 8 characters with upper-case, lower-case and a number.",
      "Two-factor authentication with an authenticator app is available on every account, with recovery codes. Sessions use short-lived tokens that refresh automatically.",
    ],
  },
  {
    heading: "Your data, when you want it",
    body: [
      "Studio owners and admins can export the client list as CSV at any time, and every user can download a copy of their own data from settings.",
      "Signed consent forms are stored as PDFs in private storage. They're served through links that expire after an hour, and can be downloaded whenever you need them.",
      "Key actions in your studio are recorded in an activity log that owners can review.",
    ],
  },
  {
    heading: "Web security",
    body: "The app sends a strict Content Security Policy, blocks being embedded in other sites (clickjacking protection), and limits the referrer information shared with other sites.",
  },
  {
    heading: "Where your data lives",
    body: [
      "Your studio's database and file storage are hosted by Supabase on AWS in the United States (Oregon). The application runs on Railway.",
      "We don't offer EU data hosting yet. If your studio needs it, tell us: it's on our list.",
    ],
  },
  {
    heading: "Service providers",
    body: "Limespun relies on a small number of infrastructure providers, including Supabase (database, storage and sign-in), Railway (application hosting), Upstash (rate limiting) and Resend (email). A full list of the providers that process studio data is available on request.",
  },
  {
    heading: "Backups",
    body: "We take regular database snapshots. Automated backups with point-in-time recovery are next on our list, and we'll update this page when they're switched on.",
  },
  {
    heading: "If something goes wrong",
    body: "If we discover a personal data breach affecting your studio, we'll tell you within 72 hours of finding it: what happened, what it likely means for you, and what we're doing about it.",
  },
  {
    heading: "Reporting a security issue",
    body: "Found something? Email security@boldteq.com with the details. We read every report, and we won't take action against anyone researching in good faith who reports responsibly and avoids harming studios or their clients.",
  },
  {
    heading: "What's next",
    body: "Next on our list: automated backups with point-in-time recovery, an option for EU data hosting, and an independent penetration test. We don't hold a SOC 2 report today, and we won't say we do until we have one.",
  },
];

export default function SecurityPage() {
  return (
    <LegalPage
      eyebrow="Legal · Security"
      title="Security"
      effectiveDate="22 September 2026"
      intro="Limespun is new. This page says exactly what we do to protect your studio's data today, and what's still to come. We'd rather be precise than impressive."
      sections={sections}
      contactEmail="security@boldteq.com"
    />
  );
}
