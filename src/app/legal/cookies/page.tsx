import { LegalPage, type LegalSection } from "@/components/shared/legal-page";

const sections: LegalSection[] = [
  {
    heading: "What cookies are",
    body: "Cookies are small text files that websites place on your device to remember information between visits. They are common, often essential, and (in our case) used minimally.",
  },
  {
    heading: "Cookies we set",
    body: [
      "Functional cookies (always on): theme preference, dismissed banners, last-visited page (for back-button behaviour). These are first-party cookies set by limespun.com. They contain no personal data.",
      "Application authentication (only on app.limespun.com, not the marketing site): the Supabase Auth session token. This is essential to keep your studio's users logged in. It is HTTP-only, secure, and SameSite=Lax.",
    ],
  },
  {
    heading: "Cookies we do not set",
    body: "We do not use Google Analytics, Facebook Pixel, advertising networks, or cross-site tracking cookies. We do not 'fingerprint' devices. We do not use heatmap or session-replay tools.",
  },
  {
    heading: "Sub-processor cookies",
    body: "Some pages may load content from approved sub-processors (e.g. Stripe checkout iframe on the application). These set their own cookies governed by their privacy policies. None of these load on the marketing site (limespun.com).",
  },
  {
    heading: "Controlling cookies",
    body: [
      "You can disable cookies in your browser settings. Most browsers also offer a 'private browsing' or 'incognito' mode that does not persist cookies.",
      "Disabling functional cookies on limespun.com will not break the site, but you will see a default theme on every visit. Disabling authentication cookies on app.limespun.com will log you out.",
    ],
  },
  {
    heading: "Cookie retention",
    body: "Functional cookies expire after 1 year unless you visit again (in which case they refresh). Authentication cookies expire after 30 days of inactivity.",
  },
  {
    heading: "Changes to this policy",
    body: "We will update this policy if we change which cookies are used. The 'effective' date at the top of this page reflects the latest version. We do not anticipate adding tracking or advertising cookies.",
  },
];

export default function CookiesPage() {
  return (
    <LegalPage
      eyebrow="Legal · Cookies"
      title="Cookie Policy"
      effectiveDate="27 April 2026"
      intro="limespun.com uses a small number of cookies. We do not use advertising cookies. We do not use third-party analytics that track you across the web. This document lists every cookie we set and how you can control them."
      sections={sections}
      contactEmail="privacy@boldteq.com"
    />
  );
}
