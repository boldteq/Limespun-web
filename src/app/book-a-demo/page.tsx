import type { Metadata } from "next";
import { Nav } from "@/components/layout/nav";
import { Footer } from "@/components/layout/footer";
import { DemoForm } from "@/components/forms/demo-form";
import { StatStrip } from "@/components/shared/stat-strip";
import { CTASection } from "@/components/shared/cta-section";
import { SectionEyebrow } from "@/components/shared/section-eyebrow";
import { BRAND, FONT, SHADOW, GRADIENT } from "@/lib/brand";
import { CheckCircle2 } from "lucide-react";

export const metadata: Metadata = {
  title: "Book a 30-min walkthrough — InkOS",
  description:
    "See how multi-session projects, deposit pools, allergy intelligence, and commission auto-splits work in your studio. 30 minutes, no slide deck.",
  openGraph: {
    title: "Book an InkOS walkthrough",
    description:
      "30 minutes, no slide deck — see InkOS in your studio's shape.",
    type: "website",
  },
  alternates: { canonical: "https://inkos.studio/book-a-demo" },
};

const STAT_ITEMS = [
  { stat: "< 1 day", label: "response time" },
  { stat: "92%", label: "of demos result in a trial" },
  { stat: "0", label: "sales pressure" },
  { stat: "14 days", label: "free trial after demo" },
];

const AGENDA_STEPS = [
  {
    number: "01",
    title: "Your today",
    accent: BRAND.rust,
    body: "Open the app like Monday morning. Schedule, allergy alerts, deposits owed, project pulse — all in one launchpad. The 90-second triage.",
  },
  {
    number: "02",
    title: "A real project",
    accent: BRAND.amber,
    body: "Walk through a multi-session sleeve from reference to healed. Deposit pool. Photo timeline. Consent history. The moat.",
  },
  {
    number: "03",
    title: "Your migration plan",
    accent: BRAND.sage,
    body: "Tell us what you're on. We map a 14-day move with zero downtime. Honest answer on fit, even if the answer is 'not yet.'",
  },
];

const PROOF_ITEMS = [
  "Real product. No screenshots, no mockups.",
  "Migration plan from your current tool.",
  "Honest answer on whether InkOS fits your studio.",
  "Zero pressure. No follow-up unless you ask.",
];

export default function BookADemoPage() {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: BRAND.bone,
        overflow: "hidden",
      }}
    >
      <Nav />
      <main>
        {/* ─── Section 1: Hero ────────────────────────────────────────────── */}
        <section
          style={{
            background: BRAND.bone,
            paddingTop: 100,
            paddingBottom: 80,
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* Corner glow */}
          <div
            aria-hidden="true"
            style={{
              position: "absolute",
              top: 0,
              right: 0,
              width: 600,
              height: 600,
              background: GRADIENT.cornerRust,
              transform: "translate(30%, -30%)",
              pointerEvents: "none",
            }}
          />

          <div
            style={{
              maxWidth: 1280,
              margin: "0 auto",
              padding: "0 32px",
              position: "relative",
              zIndex: 2,
            }}
          >
            <div
              className="demo-hero-grid"
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 480px",
                gap: 64,
                alignItems: "start",
              }}
            >
              {/* Left column */}
              <div>
                <SectionEyebrow label="The walkthrough" accent="rust" />
                <h1
                  style={{
                    fontFamily: FONT.serif,
                    fontSize: "clamp(40px, 5.5vw, 72px)",
                    lineHeight: 1.05,
                    letterSpacing: "-0.025em",
                    color: BRAND.onyx,
                    fontWeight: 400,
                    marginBottom: 24,
                  }}
                >
                  30 minutes. No slide deck.{" "}
                  <em
                    style={{
                      fontStyle: "italic",
                      color: BRAND.rust,
                    }}
                  >
                    Your
                  </em>{" "}
                  studio&rsquo;s data.
                </h1>
                <p
                  style={{
                    fontFamily: FONT.sans,
                    fontSize: 18,
                    lineHeight: 1.6,
                    color: BRAND.stoneDark,
                    marginBottom: 28,
                    maxWidth: 540,
                  }}
                >
                  Tell us your studio&rsquo;s shape, what you&rsquo;re using
                  now, and what&rsquo;s broken. We&rsquo;ll show you the relief
                  — live, in your browser, with a sample studio configured to
                  match your size.
                </p>
                <ul
                  style={{
                    listStyle: "none",
                    padding: 0,
                    margin: 0,
                    display: "flex",
                    flexDirection: "column",
                    gap: 12,
                  }}
                >
                  {PROOF_ITEMS.map((item) => (
                    <li
                      key={item}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 10,
                      }}
                    >
                      <CheckCircle2
                        size={18}
                        color={BRAND.sage}
                        strokeWidth={2}
                        aria-hidden="true"
                        style={{ flexShrink: 0 }}
                      />
                      <span
                        style={{
                          fontFamily: FONT.sans,
                          fontSize: 15,
                          color: BRAND.stoneDark,
                        }}
                      >
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Right column: Form */}
              <div>
                <DemoForm />
              </div>
            </div>
          </div>
        </section>

        {/* ─── Section 2: Agenda ──────────────────────────────────────────── */}
        <section
          style={{
            background: GRADIENT.sectionWarm,
            paddingTop: 100,
            paddingBottom: 100,
            overflow: "hidden",
            position: "relative",
          }}
        >
          <div
            style={{
              maxWidth: 1120,
              margin: "0 auto",
              padding: "0 32px",
            }}
          >
            {/* Header */}
            <div style={{ marginBottom: 48, maxWidth: 720 }}>
              <SectionEyebrow label="The agenda" accent="amber" />
              <h2
                style={{
                  fontFamily: FONT.sans,
                  fontSize: "clamp(30px, 4vw, 50px)",
                  lineHeight: 1.1,
                  letterSpacing: "-0.025em",
                  color: BRAND.onyx,
                  fontWeight: 600,
                  marginBottom: 16,
                }}
              >
                What you&rsquo;ll see in 30 minutes.
              </h2>
              <p
                style={{
                  fontFamily: FONT.sans,
                  fontSize: 17,
                  lineHeight: 1.6,
                  color: BRAND.stoneDark,
                  maxWidth: 580,
                }}
              >
                A real walkthrough of the studio you&rsquo;d run if you
                switched today. Three blocks, ten minutes each.
              </p>
            </div>

            {/* Step cards */}
            <div
              className="demo-agenda-grid"
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: 18,
              }}
            >
              {AGENDA_STEPS.map((step) => (
                <div
                  key={step.number}
                  style={{
                    background: BRAND.white,
                    borderRadius: 16,
                    padding: 28,
                    boxShadow: SHADOW.soft,
                    position: "relative",
                    overflow: "hidden",
                    borderTop: `3px solid ${step.accent}`,
                  }}
                >
                  <div
                    style={{
                      fontFamily: FONT.mono,
                      fontSize: 14,
                      fontWeight: 700,
                      letterSpacing: "0.06em",
                      color: step.accent,
                      marginBottom: 12,
                    }}
                  >
                    {step.number}
                  </div>
                  <h3
                    style={{
                      fontFamily: FONT.sans,
                      fontSize: 19,
                      fontWeight: 600,
                      color: BRAND.onyx,
                      letterSpacing: "-0.01em",
                      marginBottom: 10,
                    }}
                  >
                    {step.title}
                  </h3>
                  <p
                    style={{
                      fontFamily: FONT.sans,
                      fontSize: 14,
                      lineHeight: 1.6,
                      color: BRAND.stoneDark,
                      margin: 0,
                    }}
                  >
                    {step.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── Section 3: Stat Strip ──────────────────────────────────────── */}
        <section
          style={{
            background: BRAND.bone,
            paddingTop: 64,
            paddingBottom: 64,
          }}
        >
          <div
            style={{
              maxWidth: 1280,
              margin: "0 auto",
              padding: "0 32px",
            }}
          >
            <StatStrip items={STAT_ITEMS} />
          </div>
        </section>

        {/* ─── Section 4: Closing CTA ─────────────────────────────────────── */}
        <CTASection
          badge="Or jump straight in"
          headline="Skip the demo, start the trial."
          italicWord="trial"
          subhead="If you're the kind of studio owner who'd rather poke around for ten minutes alone, the 14-day trial is open. No card. No call."
          primaryCTA={{
            label: "Start a 14-day trial",
            href: "https://inkos.up.railway.app/signup",
          }}
        />
      </main>
      <Footer />
      <style>{`
        @media (max-width: 1024px) {
          .demo-hero-grid { grid-template-columns: 1fr !important; }
          .demo-agenda-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
