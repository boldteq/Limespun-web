import Link from "next/link";
import { LegalPage, SECURITY_EMAIL, type LegalSection } from "@/components/templates/legal-page";
import type { StatItem } from "@/components/system";
import { pageMetadata } from "@/lib/seo";
import { DATA_LOCATION, LEGAL_EFFECTIVE_DATE, SUB_PROCESSOR_TABLE } from "../legal-facts";

export const metadata = pageMetadata({
  title: "Security",
  description:
    "How Limespun protects studio data today: encryption, per-studio data separation, two-factor sign-in, data export and where your data is hosted.",
  path: "/legal/security",
});

/*
 * Every statement here is checked against the Limespun app (InkOS repo) and the live
 * app.limespun.com responses. Don't add claims that aren't true today.
 */
/* Headline values are the outcome a studio gets; the mechanism (HSTS, AES-256, RLS) sits in the label and the body. */
const highlights: StatItem[] = [
  { value: "Encrypted", label: "In transit and at rest, with AES-256" },
  { value: "Separate", label: "Each studio’s data walled off from every other" },
  { value: "2FA", label: "Two-factor sign-in, available on every account" },
  { value: "72 hours", label: "To tell you about a breach we find" },
];

const sections: LegalSection[] = [
  {
    heading: "Encryption",
    body: [
      "All traffic to Limespun is encrypted in transit (HTTPS with HSTS). The HSTS header is set for preloading, so browsers never connect to the app over plain HTTP.",
      "Data is encrypted at rest (AES-256) by our database and storage provider. On top of that, Limespun encrypts some fields itself with AES-256-GCM, including connected-app credentials and consent forms that are still in draft.",
    ],
  },
  {
    heading: "Separation between studios",
    body: "Every studio's records are separated at the database level with row-level security, scoped to the studio. One studio's account can't read another studio's clients, bookings or forms.",
  },
  {
    heading: "Sign-in",
    body: [
      "Accounts use Supabase Auth. Passwords must be at least 8 characters with upper-case, lower-case and a number.",
      "Two-factor authentication with an authenticator app is available on every account, with recovery codes. Sessions use short-lived tokens that refresh automatically.",
    ],
  },
  {
    heading: "Export and activity log",
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
    heading: "Hosting",
    body: [DATA_LOCATION, "We don't offer EU data hosting yet. If your studio needs it, tell us: it's on our list."],
  },
  {
    heading: "Sub-processors",
    body: (
      <>
        These providers process studio data on our behalf, each for the purpose listed. The{" "}
        <Link href="/legal/privacy">Privacy Policy</Link> covers how we use personal data.
      </>
    ),
    table: SUB_PROCESSOR_TABLE,
  },
  {
    heading: "Backups",
    body: "We take regular database snapshots. Automated backups with point-in-time recovery are next on our list, and we'll update this page when they're switched on.",
  },
  {
    heading: "Breach notification",
    body: "If we discover a personal data breach affecting your studio, we'll tell you within 72 hours of finding it: what happened, what it likely means for you, and what we're doing about it.",
  },
  {
    heading: "Reporting a vulnerability",
    body: `Found something? Email ${SECURITY_EMAIL} with the details. We read every report, and we won't take action against anyone researching in good faith who reports responsibly and avoids harming studios or their clients.`,
  },
  {
    heading: "Planned work",
    body: "Next on our list: automated backups with point-in-time recovery, an option for EU data hosting, and an independent penetration test. We don't hold a SOC 2 report today, and we won't say we do until we have one.",
  },
];

export default function SecurityPage() {
  return (
    <LegalPage
      path="/legal/security"
      title="Security"
      effectiveDate={LEGAL_EFFECTIVE_DATE}
      intro="Limespun is new. This page says exactly what we do to protect your studio's data today, and what's still to come. We'd rather be precise than impressive."
      sections={sections}
      highlights={highlights}
      contactEmail={SECURITY_EMAIL}
      contactNote="Report a vulnerability or ask about how we protect studio data. Please don't include client personal data in your email."
    />
  );
}
