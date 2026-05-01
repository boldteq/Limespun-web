import type React from "react";

export interface NavItem {
  label: string;
  href?: string;
  type: 'link' | 'mega';
  dot?: boolean;
  columns?: NavColumn[];
  footer?: NavFooter;
}

export interface NavColumn {
  title: string;
  items: NavColumnItem[];
}

export interface NavColumnItem {
  icon: React.ComponentType<{ size?: number; strokeWidth?: number; style?: React.CSSProperties }>;
  name: string;
  desc: string;
  href: string;
}

export interface NavFooter {
  title: string;
  desc: string;
  ctaLabel: string;
  ctaHref: string;
}
