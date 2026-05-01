"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus } from "lucide-react";
import { BRAND, FONT, SHADOW, ACCENT_MAP } from "@/lib/brand";
import type { AccentKey } from "@/lib/brand";

interface FAQItem {
  q: string;
  a: string;
}

interface FAQAccordionProps {
  items: FAQItem[];
  defaultOpenIndex?: number;
  accent?: AccentKey;
}

interface FAQRowProps {
  item: FAQItem;
  index: number;
  isOpen: boolean;
  onToggle: () => void;
  accentColor: string;
}

function FAQRow({ item, index, isOpen, onToggle, accentColor }: FAQRowProps) {
  return (
    <div
      style={{
        borderBottom: `1px solid ${BRAND.borderSoft}`,
      } as React.CSSProperties}
    >
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
        <span
          style={{
            fontFamily: FONT.mono,
            fontSize: 12,
            fontWeight: 600,
            color: accentColor,
            minWidth: 20,
            flexShrink: 0,
          } as React.CSSProperties}
        >
          {String(index + 1).padStart(2, "0")}
        </span>

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
          {item.q}
        </span>

        <div
          style={{
            width: 32,
            height: 32,
            borderRadius: "50%",
            background: isOpen ? accentColor : BRAND.boneDeep,
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
              {item.a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function FAQAccordion({
  items,
  defaultOpenIndex = 0,
  accent = "rust",
}: FAQAccordionProps) {
  const [openIdx, setOpenIdx] = useState<number | null>(defaultOpenIndex);
  const accentColor = ACCENT_MAP[accent].color;

  return (
    <div
      style={{
        background: BRAND.white,
        borderRadius: 20,
        boxShadow: SHADOW.soft,
        maxWidth: 920,
        overflow: "hidden",
        width: "100%",
      } as React.CSSProperties}
    >
      {items.map((item, i) => (
        <div
          key={i}
          style={
            i === items.length - 1
              ? ({ borderBottom: "none" } as React.CSSProperties)
              : undefined
          }
        >
          <FAQRow
            item={item}
            index={i}
            isOpen={openIdx === i}
            onToggle={() => setOpenIdx(openIdx === i ? null : i)}
            accentColor={accentColor}
          />
        </div>
      ))}
    </div>
  );
}
