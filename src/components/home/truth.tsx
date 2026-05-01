"use client";

import React from "react";
import { motion } from "framer-motion";
import { Clock } from "lucide-react";
import { BRAND, FONT, SHADOW, GRADIENT, fadeUp, stagger } from "@/lib/brand";
import { SectionEyebrow } from "@/components/shared/section-eyebrow";
import { SectionHeading } from "@/components/shared/section-heading";
import { SectionSubhead } from "@/components/shared/section-subhead";

const logEntries = [
  { time: "09:04", action: "Refreshed the booking page" },
  { time: "09:11", action: "Opened the Square reader for a deposit" },
  { time: "09:19", action: "Updated Asha's red-ink allergy in Notes" },
  { time: "09:32", action: "Checked Nina's residency in the calendar app" },
  { time: "09:48", action: "Pulled up last quarter's commission spreadsheet" },
  { time: "10:06", action: "Replied to four IG DMs" },
  { time: "10:21", action: "Saw a Stripe dispute open and didn't click it" },
];

export function Truth() {
  return (
    <section
      style={{
        background: GRADIENT.sectionWarm,
        position: "relative",
        overflow: "hidden",
        paddingTop: 100,
        paddingBottom: 100,
      } as React.CSSProperties}
    >
      {/* Corner glow accent */}
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
        } as React.CSSProperties}
      />

      <div
        style={{
          maxWidth: 1280,
          margin: "0 auto",
          padding: "0 32px",
          position: "relative",
          zIndex: 2,
        } as React.CSSProperties}
      >
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          style={{ marginBottom: 48, maxWidth: 760 } as React.CSSProperties}
        >
          <SectionEyebrow label="The morning before InkOS" />
          <SectionHeading>
            You opened the shop at 9. By 10:30, you&apos;d opened seven apps.
          </SectionHeading>
          <SectionSubhead>
            None of them talked to each other. All of them needed your password.
            And the one piece of information that mattered most &mdash; the allergy
            update from Tuesday &mdash; was sitting in a Notes app, two phones away.
          </SectionSubhead>
        </motion.div>

        {/* Morning log card */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          style={{
            background: BRAND.white,
            borderRadius: 20,
            boxShadow: SHADOW.card,
            maxWidth: 720,
            overflow: "hidden",
            position: "relative",
          } as React.CSSProperties}
        >
          {/* Top accent strip */}
          <div
            style={{
              height: 4,
              background: `linear-gradient(90deg, ${BRAND.rust} 0%, ${BRAND.rustGlow} 50%, ${BRAND.amber} 100%)`,
            } as React.CSSProperties}
          />

          <div style={{ padding: 32 } as React.CSSProperties}>
            {/* Card header */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: 20,
                paddingBottom: 16,
                borderBottom: `1px solid ${BRAND.borderSoft}`,
              } as React.CSSProperties}
            >
              <div
                style={{ display: "flex", alignItems: "center", gap: 10 } as React.CSSProperties}
              >
                <div
                  style={{
                    width: 32,
                    height: 32,
                    borderRadius: 8,
                    background: BRAND.rustSoft,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  } as React.CSSProperties}
                >
                  <Clock size={15} color={BRAND.rust} strokeWidth={2.2} />
                </div>
                <div>
                  <div
                    style={{
                      fontFamily: FONT.sans,
                      fontSize: 14,
                      fontWeight: 600,
                      color: BRAND.onyx,
                    } as React.CSSProperties}
                  >
                    Morning of 24 April
                  </div>
                  <div
                    style={{
                      fontFamily: FONT.sans,
                      fontSize: 12,
                      color: BRAND.stoneFaint,
                    } as React.CSSProperties}
                  >
                    Sable &amp; Sparrow, Brooklyn
                  </div>
                </div>
              </div>
              <div
                style={{
                  fontFamily: FONT.mono,
                  fontSize: 11,
                  color: BRAND.stoneFaint,
                  fontWeight: 500,
                  padding: "4px 10px",
                  borderRadius: 100,
                  background: BRAND.boneCream,
                } as React.CSSProperties}
              >
                7 apps &middot; 90 min
              </div>
            </div>

            {/* Log entries */}
            <motion.div
              variants={stagger}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-40px" }}
            >
              {logEntries.map((entry, i) => (
                <motion.div
                  key={i}
                  variants={fadeUp}
                  style={{
                    display: "flex",
                    alignItems: "baseline",
                    gap: 16,
                    padding: "11px 0",
                    borderBottom:
                      i < logEntries.length - 1
                        ? `1px solid ${BRAND.borderSoft}`
                        : "none",
                  } as React.CSSProperties}
                >
                  <span
                    style={{
                      fontFamily: FONT.mono,
                      fontSize: 12,
                      color: BRAND.stoneFaint,
                      fontWeight: 500,
                      letterSpacing: "0.02em",
                      minWidth: 50,
                    } as React.CSSProperties}
                  >
                    {entry.time}
                  </span>
                  <span
                    style={{
                      fontFamily: FONT.sans,
                      fontSize: 14,
                      fontWeight: 400,
                      color: BRAND.stoneDark,
                      lineHeight: 1.5,
                    } as React.CSSProperties}
                  >
                    {entry.action}
                  </span>
                </motion.div>
              ))}
            </motion.div>

            {/* Footer punchline */}
            <div
              style={{
                marginTop: 18,
                paddingTop: 16,
                borderTop: `1px dashed ${BRAND.border}`,
                fontFamily: FONT.sans,
                fontSize: 14,
                fontWeight: 600,
                color: BRAND.onyx,
                lineHeight: 1.5,
                display: "flex",
                alignItems: "center",
                gap: 10,
              } as React.CSSProperties}
            >
              <span
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: 100,
                  background: BRAND.rust,
                } as React.CSSProperties}
              />
              That was before your first client sat in the chair.
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
