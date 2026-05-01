"use client";

import React from "react";
import { motion } from "framer-motion";
import { BRAND, FONT } from "@/lib/brand";

interface ProductBreadcrumbProps {
  feature: string;
}

export function ProductBreadcrumb({ feature }: ProductBreadcrumbProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      style={{
        display: "flex",
        alignItems: "center",
        gap: 12,
        marginBottom: 28,
      } as React.CSSProperties}
    >
      <a
        href="/"
        style={{
          fontFamily: FONT.sans,
          fontSize: 11,
          fontWeight: 600,
          color: BRAND.stoneLight,
          letterSpacing: "0.18em",
          textTransform: "uppercase",
          textDecoration: "none",
        } as React.CSSProperties}
      >
        InkOS
      </a>

      <span
        style={{
          fontFamily: FONT.sans,
          fontSize: 11,
          color: BRAND.stoneLight,
        } as React.CSSProperties}
      >
        /
      </span>

      <a
        href="/product"
        style={{
          fontFamily: FONT.sans,
          fontSize: 11,
          fontWeight: 600,
          color: BRAND.stoneLight,
          letterSpacing: "0.18em",
          textTransform: "uppercase",
          textDecoration: "none",
        } as React.CSSProperties}
      >
        Product
      </a>

      <span
        style={{
          fontFamily: FONT.sans,
          fontSize: 11,
          color: BRAND.stoneLight,
        } as React.CSSProperties}
      >
        /
      </span>

      <span
        style={{
          fontFamily: FONT.sans,
          fontSize: 11,
          fontWeight: 700,
          color: BRAND.onyx,
          letterSpacing: "0.18em",
          textTransform: "uppercase",
        } as React.CSSProperties}
      >
        {feature}
      </span>
    </motion.div>
  );
}
