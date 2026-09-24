import { LegalPage, type LegalSection } from "@/components/templates/legal-page";
import { pageMetadata } from "@/lib/seo";
import { LEGAL_EFFECTIVE_DATE } from "../legal-facts";

export const metadata = pageMetadata({
  title: "Cookie Policy",
  description:
    "limespun.com sets no cookies and runs no analytics. The Limespun app uses a few first-party cookies, only to keep you signed in.",
  path: "/legal/cookies",
});

/*
 * Checked against the code on 23 September 2026. limespun.com: no cookies, no analytics,
 * no middleware; forms are server actions rate-limited by IP (src/lib/rate-limit.ts).
 * App (InkOS): first-party sign-in cookies only (Supabase session, lib/auth/mfa.ts step-up,
 * lib/auth/signin-preference.ts, lib/invite/cookie.ts, lib/portal/sessions.ts).
 */
const sections: LegalSection[] = [
  {
    heading: "Cookies on this website",
    body: [
      "limespun.com doesn't set any cookies, and it has no analytics, advertising or tracking code. Nothing here needs your consent, which is why there's no cookie banner.",
      "The contact and newsletter forms don't use cookies. To stop abuse, we limit how often a form can be sent from one IP address.",
    ],
  },
  {
    heading: "Cookies in the app",
    body: "The Limespun app (app.limespun.com) and the client portal set their own first-party cookies. They are used only for signing in:",
    table: {
      head: ["Cookie", "Why it's set"],
      rows: [
        ["Session", "Keeps you signed in"],
        ["Two-factor check", "Confirms you passed two-factor sign-in before a sensitive action"],
        ["Sign-in method", "Opens the sign-in page on the method you used last"],
        ["Team invite", "Carries an invitation through sign-up"],
        ["Client portal", "Keeps a studio's client signed in to their portal"],
      ],
    },
  },
  {
    heading: "Payment pages",
    body: "When you or a client pays by card, the payment provider's checkout page may set its own cookies, under its own policy.",
  },
  {
    heading: "What we don't use",
    body: "No advertising cookies, no analytics cookies, no cross-site tracking, and no session recording or heatmaps, on the website or in the app.",
  },
  {
    heading: "Managing cookies",
    body: "You can block or delete cookies in your browser settings. Blocking them for app.limespun.com signs you out, and you won't be able to sign in again until you allow them.",
  },
  {
    heading: "Changes",
    body: "If we add analytics or any other cookie to this website, this page changes first.",
  },
];

export default function CookiesPage() {
  return (
    <LegalPage
      path="/legal/cookies"
      title="Cookie Policy"
      effectiveDate={LEGAL_EFFECTIVE_DATE}
      intro="limespun.com sets no cookies. The Limespun app uses a few, only to keep you signed in. None are for analytics or advertising."
      sections={sections}
    />
  );
}
