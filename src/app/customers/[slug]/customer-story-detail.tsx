"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, MapPin } from "lucide-react";
import { Nav } from "@/components/layout/nav";
import { Footer } from "@/components/layout/footer";
import { CTASection } from "@/components/shared/cta-section";
import { TestimonialCard } from "@/components/shared/testimonial-card";
import { SectionEyebrow } from "@/components/shared/section-eyebrow";
import { BRAND, FONT, SHADOW, GRADIENT, fadeUp, stagger } from "@/lib/brand";
import type { CustomerStory } from "@/lib/data/customer-stories";

interface Props {
  story: CustomerStory;
  related: CustomerStory[];
}

export function CustomerStoryDetail({ story, related }: Props) {
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
              position: "relative",
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
            <Link
              href="/customers"
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
              <ArrowLeft size={14} /> All customers
            </Link>

            <SectionEyebrow label="Customer story" accent="rust" />

            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
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
              {story.name}
            </motion.h1>

            <div
              style={
                {
                  display: "flex",
                  flexWrap: "wrap",
                  gap: 14,
                  fontFamily: FONT.sans,
                  fontSize: 14,
                  color: BRAND.stoneDark,
                  marginBottom: 32,
                } as React.CSSProperties
              }
            >
              <span
                style={
                  {
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 5,
                  } as React.CSSProperties
                }
              >
                <MapPin size={13} /> {story.city}
              </span>
              <span>·</span>
              <span>{story.role}</span>
              <span>·</span>
              <span>{story.chairs}</span>
            </div>

            {/* Portrait band */}
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
              style={
                {
                  height: 280,
                  borderRadius: 20,
                  position: "relative",
                  overflow: "hidden",
                  background: story.gradient,
                  marginBottom: 40,
                  boxShadow: SHADOW.card,
                } as React.CSSProperties
              }
            >
              <div
                aria-hidden="true"
                style={
                  {
                    position: "absolute",
                    inset: 0,
                    backgroundImage: `url("data:image/svg+xml;charset=utf-8,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.4'/%3E%3C/svg%3E")`,
                    opacity: 0.2,
                    mixBlendMode: "multiply",
                  } as React.CSSProperties
                }
              />
              <div
                aria-hidden="true"
                style={
                  {
                    position: "absolute",
                    inset: 0,
                    background:
                      "linear-gradient(180deg, transparent 40%, rgba(15,15,15,0.35) 100%)",
                  } as React.CSSProperties
                }
              />
              <div
                style={
                  {
                    position: "absolute",
                    inset: 0,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontFamily: FONT.serif,
                    fontSize: 140,
                    color: "rgba(247,247,245,0.25)",
                    letterSpacing: "-0.04em",
                    userSelect: "none",
                  } as React.CSSProperties
                }
              >
                {story.initials}
              </div>
            </motion.div>

            {/* Stats row */}
            <motion.div
              variants={stagger}
              initial="hidden"
              animate="visible"
              style={
                {
                  display: "grid",
                  gridTemplateColumns: "repeat(3, 1fr)",
                  gap: 14,
                  padding: "24px 0",
                  borderTop: `1px solid ${BRAND.border}`,
                  borderBottom: `1px solid ${BRAND.border}`,
                } as React.CSSProperties
              }
            >
              {story.stats.map((s, i) => (
                <motion.div key={i} variants={fadeUp}>
                  <div
                    style={
                      {
                        fontFamily: FONT.serif,
                        fontSize: "clamp(28px, 3.5vw, 40px)",
                        color: BRAND.onyx,
                        marginBottom: 4,
                        letterSpacing: "-0.02em",
                      } as React.CSSProperties
                    }
                  >
                    {s.v}
                  </div>
                  <div
                    style={
                      {
                        fontFamily: FONT.sans,
                        fontSize: 12,
                        color: BRAND.stoneLight,
                        fontWeight: 600,
                        letterSpacing: "0.04em",
                        textTransform: "uppercase",
                      } as React.CSSProperties
                    }
                  >
                    {s.l}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Body */}
        <section
          style={
            { paddingTop: 60, paddingBottom: 80 } as React.CSSProperties
          }
        >
          <div
            style={
              {
                maxWidth: 720,
                margin: "0 auto",
                padding: "0 32px",
              } as React.CSSProperties
            }
          >
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              style={
                {
                  fontFamily: FONT.serif,
                  fontSize: 22,
                  lineHeight: 1.55,
                  color: BRAND.onyx,
                  marginBottom: 40,
                } as React.CSSProperties
              }
            >
              {story.intro}
            </motion.p>

            <p
              style={
                {
                  fontFamily: FONT.sans,
                  fontSize: 16,
                  lineHeight: 1.75,
                  color: BRAND.stoneDark,
                  marginBottom: 40,
                } as React.CSSProperties
              }
            >
              {story.studioBackground}
            </p>

            {[story.preLimespun, story.migration, story.workflowToday].map(
              (section, i) => (
                <div
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
                    {section.heading}
                  </h2>
                  <p
                    style={
                      {
                        fontFamily: FONT.sans,
                        fontSize: 16,
                        lineHeight: 1.75,
                        color: BRAND.stoneDark,
                      } as React.CSSProperties
                    }
                  >
                    {section.body}
                  </p>
                </div>
              )
            )}

            {/* Pull quote */}
            <blockquote
              style={
                {
                  borderLeft: `3px solid ${BRAND.rust}`,
                  paddingLeft: 28,
                  marginTop: 60,
                  marginBottom: 60,
                  marginLeft: 0,
                  marginRight: 0,
                } as React.CSSProperties
              }
            >
              <p
                style={
                  {
                    fontFamily: FONT.serif,
                    fontSize: "clamp(22px, 3vw, 30px)",
                    fontStyle: "italic",
                    lineHeight: 1.4,
                    color: BRAND.onyx,
                    letterSpacing: "-0.01em",
                  } as React.CSSProperties
                }
              >
                &ldquo;{story.fullQuote}&rdquo;
              </p>
            </blockquote>

            {/* Metrics callout */}
            <div
              style={
                {
                  padding: 24,
                  borderRadius: 14,
                  background: GRADIENT.cardRust,
                  border: `1px solid ${BRAND.rust}30`,
                  fontFamily: FONT.sans,
                  fontSize: 16,
                  fontWeight: 600,
                  color: BRAND.onyx,
                  lineHeight: 1.5,
                } as React.CSSProperties
              }
            >
              {story.metricsCallout}
            </div>
          </div>
        </section>

        {/* Related stories */}
        {related.length > 0 && (
          <section
            style={
              {
                background: BRAND.boneCream,
                paddingTop: 80,
                paddingBottom: 80,
                borderTop: `1px solid ${BRAND.border}`,
              } as React.CSSProperties
            }
          >
            <div
              style={
                {
                  maxWidth: 1120,
                  margin: "0 auto",
                  padding: "0 32px",
                } as React.CSSProperties
              }
            >
              <SectionEyebrow label="More studios" accent="amber" />
              <h2
                style={
                  {
                    fontFamily: FONT.serif,
                    fontSize: "clamp(30px, 4vw, 46px)",
                    color: BRAND.onyx,
                    marginBottom: 32,
                    letterSpacing: "-0.02em",
                    fontWeight: 400,
                  } as React.CSSProperties
                }
              >
                Studios like {story.name.split(" ")[0]}&apos;s.
              </h2>
              <div
                style={
                  {
                    display: "grid",
                    gridTemplateColumns: `repeat(${related.length}, 1fr)`,
                    gap: 20,
                  } as React.CSSProperties
                }
              >
                {related.map((r) => (
                  <Link
                    key={r.slug}
                    href={`/customers/${r.slug}`}
                    style={{ textDecoration: "none" } as React.CSSProperties}
                  >
                    <TestimonialCard
                      name={r.name}
                      role={r.role}
                      city={r.city}
                      chairs={r.chairs}
                      quote={r.shortQuote}
                      stats={r.stats}
                      gradient={r.gradient}
                      initials={r.initials}
                    />
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        <CTASection
          badge="Run on Limespun"
          headline="Add your studio to the wall."
          italicWord="Add your studio"
          subhead="14-day trial. No card. White-glove migration above Solo."
          primaryCTA={{
            label: "Start a 14-day trial",
            href: "https://app.limespun.com/signup",
          }}
          secondaryCTA={{
            label: "Book a walkthrough",
            href: "/book-a-demo",
            icon: "play",
          }}
        />
      </main>
      <Footer />
    </div>
  );
}
