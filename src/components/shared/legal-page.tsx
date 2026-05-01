import React from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Nav } from "@/components/layout/nav";
import { Footer } from "@/components/layout/footer";
import { BRAND, FONT } from "@/lib/brand";
import { SectionEyebrow } from "@/components/shared/section-eyebrow";

export interface LegalSection {
  heading: string;
  body: string | string[];
}

export interface LegalPageProps {
  eyebrow: string;
  title: string;
  effectiveDate: string;
  intro: string;
  sections: LegalSection[];
  contactEmail?: string;
}

export function LegalPage({
  eyebrow,
  title,
  effectiveDate,
  intro,
  sections,
  contactEmail = "hello@boldteq.com",
}: LegalPageProps) {
  return (
    <div
      style={
        {
          minHeight: "100vh",
          background: BRAND.bone,
          overflow: "hidden",
        } as React.CSSProperties
      }
    >
      <Nav />
      <main>
        {/* Header */}
        <section
          style={
            {
              paddingTop: 100,
              paddingBottom: 60,
              background: BRAND.bone,
              borderBottom: `1px solid ${BRAND.borderSoft}`,
            } as React.CSSProperties
          }
        >
          <div
            style={
              {
                maxWidth: 920,
                margin: "0 auto",
                padding: "0 32px",
              } as React.CSSProperties
            }
          >
            {/* Back link */}
            <Link
              href="/"
              style={
                {
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 6,
                  fontFamily: FONT.sans,
                  fontSize: 13,
                  color: BRAND.stoneDark,
                  textDecoration: "none",
                  marginBottom: 24,
                } as React.CSSProperties
              }
            >
              <ArrowLeft size={14} /> Back to home
            </Link>

            <SectionEyebrow label={eyebrow} accent="rust" />
            <h1
              style={
                {
                  fontFamily: FONT.serif,
                  fontSize: "clamp(40px, 5.5vw, 72px)",
                  lineHeight: 1.05,
                  letterSpacing: "-0.025em",
                  color: BRAND.onyx,
                  fontWeight: 400,
                  marginBottom: 16,
                } as React.CSSProperties
              }
            >
              {title}
            </h1>

            <div
              style={
                {
                  fontFamily: FONT.mono,
                  fontSize: 12,
                  color: BRAND.stoneFaint,
                  letterSpacing: "0.04em",
                  marginBottom: 24,
                } as React.CSSProperties
              }
            >
              Effective {effectiveDate}
            </div>

            <p
              style={
                {
                  fontFamily: FONT.sans,
                  fontSize: 17,
                  lineHeight: 1.7,
                  color: BRAND.stoneDark,
                  maxWidth: 720,
                } as React.CSSProperties
              }
            >
              {intro}
            </p>
          </div>
        </section>

        {/* Sections */}
        <section
          style={
            {
              paddingTop: 60,
              paddingBottom: 80,
              background: BRAND.bone,
            } as React.CSSProperties
          }
        >
          <div
            style={
              {
                maxWidth: 760,
                margin: "0 auto",
                padding: "0 32px",
              } as React.CSSProperties
            }
          >
            {sections.map((s, i) => (
              <article
                key={i}
                style={{ marginBottom: 40 } as React.CSSProperties}
              >
                <h2
                  style={
                    {
                      fontFamily: FONT.sans,
                      fontSize: 22,
                      fontWeight: 700,
                      color: BRAND.onyx,
                      letterSpacing: "-0.015em",
                      marginBottom: 14,
                    } as React.CSSProperties
                  }
                >
                  {`${String(i + 1).padStart(2, "0")}. ${s.heading}`}
                </h2>
                {Array.isArray(s.body) ? (
                  s.body.map((p, pi) => (
                    <p
                      key={pi}
                      style={
                        {
                          fontFamily: FONT.sans,
                          fontSize: 15,
                          lineHeight: 1.75,
                          color: BRAND.stoneDark,
                          marginBottom: 12,
                        } as React.CSSProperties
                      }
                    >
                      {p}
                    </p>
                  ))
                ) : (
                  <p
                    style={
                      {
                        fontFamily: FONT.sans,
                        fontSize: 15,
                        lineHeight: 1.75,
                        color: BRAND.stoneDark,
                      } as React.CSSProperties
                    }
                  >
                    {s.body}
                  </p>
                )}
              </article>
            ))}
          </div>
        </section>

        {/* Contact footer */}
        <section
          style={
            {
              paddingTop: 40,
              paddingBottom: 80,
              background: BRAND.boneCream,
              borderTop: `1px solid ${BRAND.border}`,
            } as React.CSSProperties
          }
        >
          <div
            style={
              {
                maxWidth: 760,
                margin: "0 auto",
                padding: "0 32px",
              } as React.CSSProperties
            }
          >
            <h3
              style={
                {
                  fontFamily: FONT.sans,
                  fontSize: 17,
                  fontWeight: 700,
                  color: BRAND.onyx,
                  marginBottom: 8,
                } as React.CSSProperties
              }
            >
              Questions about this document?
            </h3>
            <p
              style={
                {
                  fontFamily: FONT.sans,
                  fontSize: 14,
                  lineHeight: 1.6,
                  color: BRAND.stoneDark,
                } as React.CSSProperties
              }
            >
              Email{" "}
              <a
                href={`mailto:${contactEmail}`}
                style={
                  { color: BRAND.rust, fontWeight: 600 } as React.CSSProperties
                }
              >
                {contactEmail}
              </a>{" "}
              — a real human will read it and respond within one business day.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
