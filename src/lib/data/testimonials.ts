/**
 * Video reviews from real studios. Only add a review a real person recorded and agreed to publish.
 *
 * To add one: put the video and a poster frame in /public/reviews/ and add an entry below.
 */

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  studio: string;
  city: string;
  quote: string;
  /** e.g. "/reviews/asha.mp4". Vertical (4:5 or 9:16) works best. */
  videoSrc?: string;
  /** e.g. "/reviews/asha.jpg" — the frame shown before play. */
  poster?: string;
  /** WebVTT captions, e.g. "/reviews/asha.vtt". Strongly recommended: most people watch muted. */
  captionsSrc?: string;
  /** "1:12" — shown on the poster. */
  duration?: string;
}

/** Real reviews. The homepage section stays hidden while this is empty. */
export const testimonials: Testimonial[] = [];

/**
 * Layout placeholders for local preview only (NEXT_PUBLIC_SHOW_SAMPLE_REVIEWS=true).
 * Never shown in production and always stamped "Sample" on the card.
 */
export const sampleTestimonials: Testimonial[] = [
  {
    id: "sample-owner",
    name: "Studio owner",
    role: "Owner, 4 chairs",
    studio: "Sample studio",
    city: "Austin, TX",
    quote: "Deposits used to live in three places. Now they sit on the project, and nobody asks me where the money went.",
    duration: "1:12",
  },
  {
    id: "sample-resident",
    name: "Resident artist",
    role: "Blackwork and fine line",
    studio: "Sample studio",
    city: "Leeds, UK",
    quote: "My clients sign consent on their phone before they arrive. I start on time, every time.",
    duration: "0:48",
  },
  {
    id: "sample-guest",
    name: "Guest artist",
    role: "On the road 8 months a year",
    studio: "Sample studio",
    city: "Berlin, DE",
    quote: "Every shop I guest at has my dates, my link and my split before I land. Payday is just there.",
    duration: "1:05",
  },
];

export const SHOW_SAMPLE_REVIEWS = process.env.NEXT_PUBLIC_SHOW_SAMPLE_REVIEWS === "true";
