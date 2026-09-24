export const SITE_URL = "https://limespun.com";

/** Homepage system (mirrors the --color-* tokens in globals.css). One ember orange = the logo colour. */
export const HOME = {
  canvas:       '#FAF6F1',
  canvasDeep:   '#F3ECE3',
  white:        '#FFFFFF',
  graphite:     '#1D1E1C',
  graphiteSoft: '#4A4845',
  mute:         '#6B6762',
  hair:         '#E7DFD5',
  hairStrong:   '#CFC6BB',
  ember:        '#EC5C2D',
  emberDeep:    '#B8431C',
  emberMid:     '#F48A63',
  emberLight:   '#F7A585',
  emberSoft:    '#FDE8DD',
  flag:         '#C7382E',
  flagSoft:     '#FCE7E4',
  paid:         '#2E7650',
  paidSoft:     '#E3F1E8',
} as const;

/** The product app. Override per environment with NEXT_PUBLIC_APP_URL. */
export const APP_URL = (process.env.NEXT_PUBLIC_APP_URL ?? "https://app.limespun.com").replace(/\/$/, "");

/** Account actions in the header — real pages on the app (verified: /login "Sign in", /signup "Create your account"). */
export const ACCOUNT = {
  signInLabel: "Sign in",
  signInHref:  `${APP_URL}/login`,
  signUpLabel: "Create account",
  signUpHref:  `${APP_URL}/signup`,
} as const;

/** Public social profiles. Confirm the handles are live before launch. */
export const SOCIAL = {
  instagram: "https://www.instagram.com/limespun",
  linkedin:  "https://www.linkedin.com/company/limespun",
  x:         "https://x.com/limespun",
  youtube:   "https://www.youtube.com/@limespun",
} as const;

/** Public status page with uptime history (e.g. BetterStack / Instatus). Leave unset to hide the link. */
export const STATUS_PAGE_URL = process.env.NEXT_PUBLIC_STATUS_URL ?? "";

/** Public contact address used across the site. */
export const CONTACT_EMAIL = "hello@boldteq.com";

/** One funnel: create an account (primary) or check the plans (secondary). No call booking. */
export const CTA = {
  primaryLabel:   'Create account',
  primaryHref:    ACCOUNT.signUpHref,
  secondaryLabel: 'See pricing',
  secondaryHref:  '/pricing',
} as const;
