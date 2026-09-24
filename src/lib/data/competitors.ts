import { COMPARE_INDEX, type CompareSlug } from "@/lib/site-links";
import { PLANS_SUMMARY } from "./plans";

/**
 * Competitor facts for /compare pages.
 * Every claim comes from the vendor’s own public pages (see `sources`), checked on CHECKED_ON.
 * "unknown" means the vendor doesn’t publish it — shown as "Not published", never as "No".
 */
export const CHECKED_ON = "September 22, 2026";

/**
 * The switching facts (`Competitor.switching`) were read on the vendors' own help pages on this
 * date. Kept apart from CHECKED_ON so the feature table’s date stays true.
 */
export const SWITCHING_CHECKED_ON = "September 24, 2026";

export type FeatureKey =
  | "multiSession"
  | "depositsAcrossSessions"
  | "consentForms"
  | "allergyFlags"
  | "guestArtists"
  | "payoutSplits"
  | "inkInventory"
  | "migrationHelp";

export type Support = "yes" | "partial" | "no" | "unknown";

export interface FeatureCell {
  value: Support;
  note?: string;
}

/** `short` is the label on phones, where the need shares its row with two answers. */
export const FEATURES: { key: FeatureKey; label: string; short?: string; why: string }[] = [
  { key: "multiSession", label: "Multi-session projects", why: "A sleeve or back piece tracked as one project across every sitting." },
  { key: "depositsAcrossSessions", label: "One deposit across sessions", short: "One deposit, many sessions", why: "The deposit follows the project, not a single appointment." },
  { key: "consentForms", label: "Digital consent forms", why: "Clients sign before they sit down." },
  { key: "allergyFlags", label: "Allergy flags on bookings", why: "Health notes surface on the day, not buried in a file." },
  { key: "guestArtists", label: "Guest artist spots", why: "Dates, booking and splits for visiting artists." },
  { key: "payoutSplits", label: "Commission & booth-rent payouts", short: "Commission & booth rent", why: "Artist pay worked out per session." },
  { key: "inkInventory", label: "Ink inventory", why: "Stock tracked by bottle; EU REACH ink records on every Limespun plan." },
  { key: "migrationHelp", label: "Migration help", why: "Someone moves your clients and bookings for you." },
];

/** Limespun’s own column: what the product offers today. */
export const LIMESPUN: Record<FeatureKey, FeatureCell> = {
  multiSession: { value: "yes", note: "Projects with every session, photo and note" },
  depositsAcrossSessions: { value: "yes", note: "Deposit held on the project and applied session by session" },
  consentForms: { value: "yes", note: "Phone or front-desk iPad, stored with the session" },
  allergyFlags: { value: "yes", note: "Shown on every booking after they’re noted" },
  guestArtists: { value: "yes", note: "Own dates, booking link and split (Pro and up)" },
  payoutSplits: { value: "yes", note: "Commission and booth-rent splits (Studio and up); guest splits on Pro and up" },
  inkInventory: { value: "yes", note: "With EU REACH ink records on every plan" },
  migrationHelp: { value: "yes", note: "Done by our team on every plan" },
};

/** Real plan ladder, generated from PLANS so it never drifts from the app. */
export const LIMESPUN_PRICING = `${PLANS_SUMMARY} Multi-Location is one flat price, not per location.`;

/**
 * What a studio needs to know to leave this vendor, only from the vendor’s own pages
 * (`exportSources`, `onboardingSource`). Where we couldn’t read an export page, `exports` says
 * to ask the vendor, and nothing else is claimed.
 */
export interface SwitchingFacts {
  /** How to get your clients out, in the vendor’s own menu words. */
  exports: string;
  /** The same in a few words, for the hub’s "Switching from" cards. */
  exportsShort: string;
  /** What stays with the vendor beyond payment history and saved cards (every vendor keeps those). */
  keeps: string[];
  /** Worth knowing before you export, from the same pages. */
  watchouts: string[];
  /** What the vendor offers studios moving onto it. */
  onboarding: string;
  /** Where `onboarding` is published, when it isn’t one of the comparison’s own `sources`. */
  onboardingSource?: string;
  /**
   * The vendor’s own export help pages that `exports` and `watchouts` come from, checked on
   * SWITCHING_CHECKED_ON. Empty when the vendor publishes none: then `exports` says to ask them.
   */
  exportSources: string[];
}

export interface Competitor {
  slug: CompareSlug;
  name: string;
  site: string;
  category: "Salon & spa booking" | "General booking and payments" | "Tattoo studio software";
  pricingSummary: string;
  strengths: string[];
  features: Record<FeatureKey, FeatureCell>;
  tattooPage?: string;
  switching: SwitchingFacts;
  sources: string[];
}

export const competitors: Competitor[] = [
  {
    slug: "square",
    name: "Square Appointments",
    site: "https://squareup.com/us/en/appointments",
    category: "General booking and payments",
    pricingSummary:
      "Free plan; Plus $49/mo and Premium $149/mo per location, plus card processing fees.",
    strengths: [
      "Free plan with booking, payments and point of sale in one ecosystem",
      "Wide set of add-ons: payroll, banking, websites and marketing",
      "Mature hardware and retail-grade inventory tools",
    ],
    features: {
      multiSession: { value: "unknown", note: "Prepaid service packages exist; project tracking not published" },
      depositsAcrossSessions: { value: "unknown", note: "Per-appointment deposits published" },
      consentForms: { value: "partial", note: "Contracts sent at booking" },
      allergyFlags: { value: "unknown" },
      guestArtists: { value: "unknown" },
      payoutSplits: { value: "yes", note: "Commission rates, tip pooling, chair-rent collection" },
      inkInventory: { value: "yes", note: "General retail inventory; no ink or REACH mention" },
      migrationHelp: { value: "partial", note: "Self-serve bulk import" },
    },
    tattooPage: "https://squareup.com/us/en/beauty/tattoo-and-piercing",
    switching: {
      exports:
        "In your Square Dashboard, Customers → Import / Export → Export Customers downloads your client list as a CSV file.",
      exportsShort: "Client list exports as a CSV",
      keeps: [],
      watchouts: ["The export asks which customer groups to include, so tick every group you want to bring."],
      onboarding: "Self-serve bulk import of your client list, and a free plan to start on.",
      onboardingSource: "https://squareup.com/help/us/en/article/6632-import-customers-online",
      // Answered by a Square Community Moderator (Square staff) on Square’s own community site.
      exportSources: ["https://community.squareup.com/t5/Using-Square/How-can-I-export-my-customer-list/m-p/328147"],
    },
    sources: ["https://squareup.com/us/en/appointments/pricing", "https://squareup.com/us/en/beauty/tattoo-and-piercing"],
  },
  {
    slug: "vagaro",
    name: "Vagaro",
    site: "https://www.vagaro.com/pro",
    category: "Salon & spa booking",
    pricingSummary: "From $30/mo per location for one bookable calendar, plus $10 for each extra calendar; 30-day free trial.",
    strengths: [
      "Free listing on the Vagaro consumer marketplace",
      "An onboarding team migrates your data",
      "Built-in payroll, rent collection and booth-renter tools",
    ],
    features: {
      multiSession: { value: "unknown" },
      depositsAcrossSessions: { value: "unknown", note: "Deposits mentioned; cross-session handling not described" },
      consentForms: { value: "yes", note: "Automated intake and liability waivers" },
      allergyFlags: { value: "unknown", note: "Forms and notes exist; surfacing on bookings not described" },
      guestArtists: { value: "unknown" },
      payoutSplits: { value: "yes", note: "Payroll and rent collection" },
      inkInventory: { value: "yes", note: "Inventory tracking; no ink or REACH mention" },
      migrationHelp: { value: "yes", note: "Onboarding team handles migration" },
    },
    tattooPage: "https://www.vagaro.com/pro/tattoo-shop-software",
    switching: {
      exports:
        "More → Reports → Customers opens the Customer List; Export (or the Action menu on the web) saves it as an Excel or PDF file.",
      exportsShort: "Customer list exports to Excel",
      keeps: ["Your Vagaro marketplace listing and its reviews"],
      watchouts: [
        "Only the business owner can export the Customer List.",
        "Filters on the report also filter the export, so clear them first.",
      ],
      onboarding: "An onboarding team migrates your data, with a 30-day free trial.",
      exportSources: ["https://support.vagaro.com/hc/en-us/articles/360006371094-Export-Your-Customer-List"],
    },
    sources: ["https://www.vagaro.com/pro/pricing", "https://www.vagaro.com/pro/tattoo-shop-software"],
  },
  {
    slug: "fresha",
    name: "Fresha",
    site: "https://www.fresha.com/for-business",
    category: "Salon & spa booking",
    pricingSummary:
      "Monthly subscription priced per bookable team member (varies by region), plus a one-time fee on new clients who find you through the Fresha marketplace.",
    strengths: [
      "Large consumer marketplace for discovery",
      "No long-term contract",
      "Import help included, with paid packages for complex moves",
    ],
    features: {
      multiSession: { value: "unknown" },
      depositsAcrossSessions: { value: "unknown", note: "Per-booking deposits published" },
      consentForms: { value: "yes", note: "Consultation forms and signed waivers" },
      allergyFlags: { value: "unknown" },
      guestArtists: { value: "unknown" },
      payoutSplits: { value: "yes", note: "Commissions and pay runs; booth rent not mentioned" },
      inkInventory: { value: "yes", note: "Retail inventory; no ink or REACH mention" },
      migrationHelp: { value: "yes", note: "Import of clients and appointments" },
    },
    tattooPage: "https://www.fresha.com/for-business/tattoo-and-piercing",
    switching: {
      exports:
        "Clients → Clients list → Options exports your client list as Excel or CSV. Appointments export on their own from the Appointments list, as PDF, CSV or Excel.",
      exportsShort: "Clients and appointments export to CSV",
      keeps: ["Your Fresha marketplace profile and its reviews"],
      watchouts: [
        "Your role needs Fresha’s “Can download clients” permission.",
        "Fresha says saved card details can’t be exported, so clients add a card with their next deposit.",
      ],
      onboarding: "Import help for clients and appointments, with paid packages for complex moves.",
      exportSources: ["https://www.fresha.com/help-center/knowledge-base/clients/58-export-your-client-list"],
    },
    sources: [
      "https://www.fresha.com/pricing",
      "https://www.fresha.com/for-business",
      "https://www.fresha.com/for-business/tattoo-and-piercing",
    ],
  },
  {
    slug: "glossgenius",
    name: "GlossGenius",
    site: "https://glossgenius.com",
    category: "Salon & spa booking",
    pricingSummary: "Plans from $24/mo, $48/mo and $148/mo billed annually, with a flat 2.6% card processing rate.",
    strengths: [
      "Simple, flat processing rate and clear plans",
      "Free data transfer from your old system",
      "Polished booking site with no client app to download",
    ],
    features: {
      multiSession: { value: "unknown", note: "Rebooking reminders; project tracking not described" },
      depositsAcrossSessions: { value: "unknown", note: "Deposit and cancellation policies per booking" },
      consentForms: { value: "yes", note: "Forms and waivers built into booking" },
      allergyFlags: { value: "unknown", note: "Client profiles with notes" },
      guestArtists: { value: "partial", note: "Payouts to booth renters and guest artists" },
      payoutSplits: { value: "yes", note: "Commissions and tips; payroll is an add-on" },
      inkInventory: { value: "yes", note: "Barcode inventory; no ink or REACH mention" },
      migrationHelp: { value: "yes", note: "Free data transfer" },
    },
    tattooPage: "https://glossgenius.com/customers/tattoo-studio-software",
    switching: {
      exports: "In a web browser, Clients → Export Clients downloads your client list as a CSV: name, email, phone and date of birth.",
      exportsShort: "Client list exports as a CSV",
      keeps: [],
      watchouts: [
        "Only the account owner can export, and only from a web browser.",
        "Client notes aren’t in the export. GlossGenius says its support team sends them on request.",
      ],
      onboarding:
        "Free data transfer onto GlossGenius: future appointments, client list and notes, services, inventory and team.",
      onboardingSource: "https://glossgenius.com/data-transfer",
      exportSources: ["https://glossgenius.elevio.help/en/articles/792-how-to-export-your-client-list"],
    },
    sources: [
      "https://glossgenius.com/pricing",
      "https://www.glossgenius.com/",
      "https://glossgenius.com/customers/tattoo-studio-software",
    ],
  },
  {
    slug: "tattoogenda",
    name: "TattooGenda",
    site: "https://tattoogenda.com",
    category: "Tattoo studio software",
    pricingSummary:
      "Two flat plans with unlimited users, plus per-SMS fees and a 14-day free trial. See tattoogenda.com/pricing for current rates.",
    strengths: [
      "Built for tattoo: projects, deposits and guest spots are first-class",
      "Unlimited users on every plan",
      "EU ink passport and aftercare emails built in",
    ],
    features: {
      multiSession: { value: "yes", note: "Several appointments per tattoo project" },
      depositsAcrossSessions: { value: "yes", note: "Project deposit applied to any appointment" },
      consentForms: { value: "yes", note: "Digital consent via SMS, email or QR" },
      allergyFlags: { value: "yes", note: "Allergies shown on the client profile" },
      guestArtists: { value: "yes", note: "Guest-spot periods on the calendar" },
      payoutSplits: { value: "partial", note: "Artist share in reports; payroll not published" },
      inkInventory: { value: "no", note: "Inventory listed as not offered; ink passport records inks used" },
      migrationHelp: { value: "unknown" },
    },
    tattooPage: "https://tattoogenda.com/",
    switching: {
      exports: "Ask TattooGenda for a client export.",
      exportsShort: "Ask them for a client export",
      keeps: [],
      watchouts: [],
      onboarding: "Migration help isn’t published; there’s a 14-day free trial.",
      exportSources: [],
    },
    sources: ["https://tattoogenda.com/", "https://tattoogenda.com/pricing/", "https://tattoogenda.com/features/"],
  },
  {
    slug: "daysmart",
    name: "DaySmart Body Art",
    site: "https://www.daysmart.com/body-art/",
    category: "Tattoo studio software",
    pricingSummary: "Plans from $29/mo for one user to $199/mo for six users, $9 per extra user; 14-day free trial.",
    strengths: [
      "Product line focused on tattoo and piercing",
      "Required release forms flag an appointment until they’re done",
      "Payroll with sliding-scale and split commissions",
    ],
    features: {
      multiSession: { value: "unknown", note: "Packages and prepaid services; project tracking not described" },
      depositsAcrossSessions: { value: "unknown", note: "Online deposits on all plans" },
      consentForms: { value: "yes", note: "Form builder with signature capture" },
      allergyFlags: { value: "unknown", note: "Notes and forms stored; surfacing not described" },
      guestArtists: { value: "unknown" },
      payoutSplits: { value: "yes", note: "Split and sliding-scale commissions" },
      inkInventory: { value: "yes", note: "Retail inventory; no ink or REACH mention" },
      migrationHelp: { value: "unknown" },
    },
    tattooPage: "https://www.daysmart.com/body-art/",
    switching: {
      exports:
        "DaySmart’s Data Retrieval Request form gets you a one-time export: clients, client notes, services, products and employees.",
      exportsShort: "One-time export on request",
      keeps: [],
      watchouts: ["DaySmart treats a data retrieval as a one-time courtesy, so request it before you cancel and keep the file."],
      onboarding: "Migration help isn’t published; there’s a 14-day free trial.",
      exportSources: [
        "https://help.daysmartbodyart.com/en/articles/9302079-data-retrieval-request-form",
        "https://www.daysmart.com/bodyart/support/forms/data-retrieval-request/",
      ],
    },
    sources: [
      "https://www.daysmart.com/body-art/",
      "https://www.daysmart.com/bodyart/packages/",
      "https://www.daysmart.com/bodyart/features/",
      "https://www.daysmart.com/bodyart/features/forms/",
    ],
  },
  {
    slug: "mangomint",
    name: "Mangomint",
    site: "https://www.mangomint.com",
    category: "Salon & spa booking",
    pricingSummary: "$120/mo base plus $10 per user and $120/mo per extra location, with optional add-ons.",
    strengths: [
      "Free onboarding with data migration by a specialist",
      "HIPAA-compliant forms for health and allergy details",
      "Strong automation for front-desk flows",
    ],
    features: {
      multiSession: { value: "partial", note: "Multi-session bookings; single-project tracking not described" },
      depositsAcrossSessions: { value: "unknown", note: "Card-on-file collection published" },
      consentForms: { value: "yes", note: "Waiver and consent automation" },
      allergyFlags: { value: "partial", note: "Health details stored via forms; client alerts exist" },
      guestArtists: { value: "unknown" },
      payoutSplits: { value: "yes", note: "Commission and booth-rental models" },
      inkInventory: { value: "yes", note: "Retail inventory; no ink or REACH mention" },
      migrationHelp: { value: "yes", note: "Free migration" },
    },
    tattooPage: "https://www.mangomint.com/solutions/tattoo-piercing-studio-software/",
    switching: {
      exports: "In the Clients app, Options → Download saves your client list as a CSV, with each client’s spend totals.",
      exportsShort: "Client list exports as a CSV",
      keeps: [],
      watchouts: ["Export from the desktop app; the mobile app has no export."],
      onboarding: "Free onboarding, with data migration by a specialist.",
      exportSources: ["https://www.mangomint.com/learn/create-a-client-export-list/"],
    },
    sources: ["https://www.mangomint.com/pricing/", "https://www.mangomint.com/solutions/tattoo-piercing-studio-software/"],
  },
];

/** "Vagaro’s", "Square Appointments’", "GlossGenius’": the possessive, without a stray "’s" after an s. */
export function possessive(name: string): string {
  return name.endsWith("s") ? `${name}’` : `${name}’s`;
}

/** The kind of software, as it reads in a sentence: "general booking and payments software", "tattoo studio software". */
export function categoryPhrase(c: Competitor): string {
  const phrase = c.category.toLowerCase().replace(" & ", " and ");
  return phrase.endsWith("software") ? phrase : `${phrase} software`;
}

/** The short name the nav uses ("Square" for Square Appointments, "DaySmart" for DaySmart Body Art). */
export function shortName(c: Competitor): string {
  return COMPARE_INDEX.find((x) => x.slug === c.slug)?.short ?? c.name;
}

export function getCompetitor(slug: string): Competitor | undefined {
  return competitors.find((c) => c.slug === slug);
}

/** Features where Limespun offers it and the competitor doesn’t publish full support. */
export function differentiators(c: Competitor): typeof FEATURES {
  return FEATURES.filter((f) => LIMESPUN[f.key].value === "yes" && c.features[f.key].value !== "yes");
}
