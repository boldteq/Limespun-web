"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, PlayCircle } from "lucide-react";
import { BRAND, FONT, SHADOW, GRADIENT, fadeUp, stagger } from "@/lib/brand";
import { SectionEyebrow } from "@/components/shared/section-eyebrow";
import { MangomintBlobs } from "@/components/brand/mangomint-blobs";
import { LimespunMark } from "@/components/brand/limespun-mark";

interface FAQData {
  q: string;
  a: string;
}

const faqs: FAQData[] = [
  {
    q: "How is Limespun different from DaySmart, Mangomint, or Fresha?",
    a: "Those tools were built for salons and adapted for tattoo. Limespun was built from scratch for the tattoo workflow — multi-session sleeves, deposit pools, allergy flags, EU REACH compliance, and residency scheduling are native concepts, not bolt-ons.",
  },
  {
    q: "Will I lose my client list, deposits, or consent forms when I migrate?",
    a: "No. White-glove migration is included on Studio and above. We carry bookings, client records, deposits, consent forms, and photo histories. You don't go live until you're satisfied.",
  },
  {
    q: "Can guest artists be billed separately or take their own bookings?",
    a: "Yes. Each guest gets a time-boxed residency band with their own booking page, commission split, and payout through Stripe Connect. You control visibility and deposit rules per residency.",
  },
  {
    q: "What happens to deposits when a client reschedules or cancels?",
    a: "Deposits sit in a pool against the project, not the session. When a session moves, the deposit stays with the client. You set the policy — we enforce it automatically across all rescheduling flows.",
  },
  {
    q: "Is Limespun REACH-compliant for studios in the EU?",
    a: "Yes. The inventory module includes the EU REACH 2022 ink registry. Every ink in your cabinet links to a REACH record. Flagged substances surface on the appointment before the session starts.",
  },
  {
    q: "Do you take a transaction fee on bookings or deposits?",
    a: "No. You pay the monthly software fee and Stripe's standard payment processing rate. Limespun takes no additional cut of your bookings, deposits, or sales.",
  },
  {
    q: "Who is behind Limespun?",
    a: "Boldteq, a small team building global-first software for craft industries. We have a waiting list of 1,200+ artists across the US, UK, Canada, and Australia, and we're onboarding studios in cohorts through the private beta.",
  },
];

interface FAQItemProps {
  faq: FAQData;
  index: number;
  isOpen: boolean;
  onToggle: () => void;
}

function FAQItem({ faq, index, isOpen, onToggle }: FAQItemProps) {
  return (
    <div
      style={{
        borderBottom: `1px solid ${BRAND.borderSoft}`,
      } as React.CSSProperties}
    >
      {/* Question row */}
      <button
        type="button"
        onClick={onToggle}
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          gap: 16,
          padding: "20px 24px",
          background: "none",
          border: "none",
          cursor: "pointer",
          textAlign: "left",
        } as React.CSSProperties}
      >
        {/* Mono index */}
        <span
          style={{
            fontFamily: FONT.mono,
            fontSize: 12,
            fontWeight: 600,
            color: BRAND.rust,
            minWidth: 20,
            flexShrink: 0,
          } as React.CSSProperties}
        >
          {String(index + 1).padStart(2, "0")}
        </span>

        {/* Question */}
        <span
          style={{
            fontFamily: FONT.sans,
            fontSize: 17,
            fontWeight: 700,
            color: BRAND.onyx,
            lineHeight: 1.3,
            letterSpacing: "-0.01em",
            flex: 1,
          } as React.CSSProperties}
        >
          {faq.q}
        </span>

        {/* Toggle icon */}
        <div
          style={{
            width: 32,
            height: 32,
            borderRadius: "50%",
            background: isOpen ? BRAND.rust : BRAND.boneDeep,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
            transition: "background 0.2s ease",
          } as React.CSSProperties}
        >
          <motion.div
            animate={{ rotate: isOpen ? 45 : 0 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <Plus
              size={16}
              color={isOpen ? BRAND.bone : BRAND.stoneDark}
              strokeWidth={2.2}
            />
          </motion.div>
        </div>
      </button>

      {/* Answer */}
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="answer"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            style={{ overflow: "hidden" } as React.CSSProperties}
          >
            <p
              style={{
                fontFamily: FONT.sans,
                fontSize: 15,
                lineHeight: 1.65,
                color: BRAND.stoneDark,
                padding: "0 24px 26px 44px",
                margin: 0,
              } as React.CSSProperties}
            >
              {faq.a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function Close() {
  const [openIdx, setOpenIdx] = useState<number>(0);

  return (
    <>
      {/* ── FAQ Section ── */}
      <section
        style={{
          background: GRADIENT.sectionCool,
          paddingTop: 100,
          paddingBottom: 100,
          overflow: "hidden",
        } as React.CSSProperties}
      >
        <div
          style={{
            maxWidth: 1120,
            margin: "0 auto",
            padding: "0 24px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          } as React.CSSProperties}
        >
          {/* Header */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
          >
            <SectionEyebrow label="Questions you'll ask" accent="sage" />
          </motion.div>

          <motion.h2
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            style={{
              fontFamily: FONT.sans,
              fontSize: "clamp(28px, 3.8vw, 48px)",
              lineHeight: 1.08,
              letterSpacing: "-0.025em",
              color: BRAND.onyx,
              fontWeight: 600,
              marginBottom: 52,
              maxWidth: 640,
              textAlign: "center",
            } as React.CSSProperties}
          >
            Built for the tattoo, never the spreadsheet.
          </motion.h2>

          {/* FAQ card */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            style={{
              width: "100%",
              maxWidth: 920,
              background: BRAND.white,
              borderRadius: 20,
              boxShadow: SHADOW.soft,
              overflow: "hidden",
            } as React.CSSProperties}
          >
            {faqs.map((faq, i) => (
              <FAQItem
                key={i}
                faq={faq}
                index={i}
                isOpen={openIdx === i}
                onToggle={() => setOpenIdx(openIdx === i ? -1 : i)}
              />
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Closing CTA Section ── */}
      <section
        style={{
          position: "relative",
          background: BRAND.onyx,
          paddingTop: 100,
          paddingBottom: 100,
          overflow: "hidden",
        } as React.CSSProperties}
      >
        <MangomintBlobs variant="cta" />

        {/* Rust gradient atmospheres */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            top: "20%",
            left: "10%",
            width: 600,
            height: 600,
            background: `radial-gradient(circle, rgba(200,53,31,0.20) 0%, transparent 65%)`,
            filter: "blur(80px)",
            pointerEvents: "none",
          } as React.CSSProperties}
        />
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            bottom: "10%",
            right: "10%",
            width: 500,
            height: 500,
            background: `radial-gradient(circle, rgba(200,53,31,0.15) 0%, transparent 65%)`,
            filter: "blur(80px)",
            pointerEvents: "none",
          } as React.CSSProperties}
        />

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          style={{
            position: "relative",
            maxWidth: 720,
            margin: "0 auto",
            padding: "0 24px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
          } as React.CSSProperties}
        >
          {/* LimespunMark + badge */}
          <motion.div
            variants={fadeUp}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 16,
              marginBottom: 32,
            } as React.CSSProperties}
          >
            <LimespunMark size={56} />
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                padding: "6px 16px",
                borderRadius: 100,
                background: "rgba(247,247,245,0.08)",
                fontFamily: FONT.sans,
                fontSize: 12,
                fontWeight: 500,
                color: BRAND.stoneLight,
                letterSpacing: "0.02em",
              } as React.CSSProperties}
            >
              The next sleeve starts in Limespun
            </div>
          </motion.div>

          {/* Heading */}
          <motion.h2
            variants={fadeUp}
            style={{
              fontFamily: FONT.serif,
              fontSize: "clamp(42px, 6vw, 80px)",
              lineHeight: 1.02,
              letterSpacing: "-0.02em",
              color: BRAND.bone,
              fontWeight: 400,
              marginBottom: 20,
            } as React.CSSProperties}
          >
            Plan it like a{" "}
            <em
              style={{
                color: BRAND.rustBright,
                fontStyle: "italic",
                fontFamily: FONT.serif,
              } as React.CSSProperties}
            >
              tattoo.
            </em>
          </motion.h2>

          {/* Subhead */}
          <motion.p
            variants={fadeUp}
            style={{
              fontFamily: FONT.sans,
              fontSize: 17,
              lineHeight: 1.6,
              color: BRAND.stoneLight,
              maxWidth: 520,
              marginBottom: 40,
            } as React.CSSProperties}
          >
            14-day trial. No card. Free white-glove migration above Solo. Cancel any time — your data exports in full.
          </motion.p>

          {/* CTAs */}
          <motion.div
            variants={fadeUp}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              flexWrap: "wrap",
              justifyContent: "center",
            } as React.CSSProperties}
          >
            <a
              href="https://app.limespun.com/signup"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                padding: "14px 28px",
                borderRadius: 100,
                background: BRAND.bone,
                color: BRAND.onyx,
                fontFamily: FONT.sans,
                fontSize: 15,
                fontWeight: 600,
                textDecoration: "none",
                letterSpacing: "-0.005em",
                boxShadow: SHADOW.card,
              } as React.CSSProperties}
            >
              Start a 14-day trial
            </a>

            <a
              href="https://app.limespun.com/signup"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                padding: "14px 28px",
                borderRadius: 100,
                background: "transparent",
                color: BRAND.stoneLight,
                fontFamily: FONT.sans,
                fontSize: 15,
                fontWeight: 600,
                border: `1.5px solid ${BRAND.borderInk}`,
                textDecoration: "none",
                letterSpacing: "-0.005em",
              } as React.CSSProperties}
            >
              <PlayCircle size={16} strokeWidth={1.8} />
              Book a 30-min walkthrough
            </a>
          </motion.div>
        </motion.div>
      </section>
    </>
  );
}
