"use client";

import React from "react";
import { Nav } from "@/components/layout/nav";
import { Footer } from "@/components/layout/footer";
import { ProductHero } from "@/components/product/product-hero";
import { ProductPillars } from "@/components/product/product-pillars";
import { ProductAnatomy } from "@/components/product/product-anatomy";
import { ProductItemTypes } from "@/components/product/product-item-types";
import { ProductDayInLife } from "@/components/product/product-day-in-life";
import { ProductRelated } from "@/components/product/product-related";
import { ProductCTA } from "@/components/product/product-cta";
import { MONEY_BACK_DAYS } from "@/lib/data/plans";
import { PaymentsScreen } from "@/components/mockups";
import { BRAND } from "@/lib/brand";
import {
  DollarSign,
  Package,
  BarChart3,
  CreditCard,
  RefreshCw,
  Heart,
  Users,
  Star,
  FileText,
  TrendingUp,
  Tag,
} from "lucide-react";

export default function PaymentsPage() {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: BRAND.bone,
        overflow: "hidden",
      } as React.CSSProperties}
    >
      <Nav />
      <main>
        <ProductHero
          feature="Payments"
          headline="Card payments in, artist splits out."
          italicWord="splits"
          subhead="Take deposits and full payments by card, with no Limespun fee on either. Commission and booth-rent splits are worked out on every paid session (Studio and up), and payroll with 1099s is on Pro. No spreadsheet, no Friday arguments."
          dashboard={<PaymentsScreen />}
        />

        <ProductPillars
          eyebrow="How payments work in Limespun"
          heading="Three rails most studios still do by hand."
          italicWord="still do by hand"
          intro="Commission splits, deposit pools and payroll, worked out as each session is paid. Not at the end of the month."
          pillars={[
            {
              icon: DollarSign,
              accent: BRAND.rust,
              eyebrow: "Commission & booth-rent splits",
              title: "60%, 70/30 or booth rent, per session.",
              desc: "Set each artist's split once: a commission percentage or weekly booth rent. Limespun works out what each artist is owed on every paid session. Studio plan and up.",
              bullets: [
                "Per-artist split set once",
                "Commission or booth rent",
                "Commissions owed, approved, paid",
                "Tips counted in the artist's pay",
              ],
            },
            {
              icon: Package,
              accent: BRAND.amber,
              eyebrow: "Deposit pools",
              title: "Project-level balance, not per-booking.",
              desc: "Deposits sit on the project. Each session draws from the pool, and anything unused can be refunded.",
              bullets: [
                "Deposit assigned to project, not individual session",
                "Balance visible on every booking card",
                "Refundable balance shown on the project",
                "Late-cancel rules from your Booking policies",
              ],
            },
            {
              icon: BarChart3,
              accent: BRAND.sage,
              eyebrow: "Payroll",
              title: "Payroll runs and 1099s, on Pro.",
              desc: "Run payroll for the period from the commissions already worked out, then generate 1099-K forms for your US contractors at year end.",
              bullets: [
                "Payroll runs from approved commissions",
                "Artist tax info in one place",
                "1099-K forms at year end",
                "Pro plan and up",
              ],
            },
          ]}
        />

        <ProductAnatomy
          eyebrow="Inside the payment flow"
          heading="Five things settled at checkout."
          italicWord="Five things settled"
          intro="Commission, deposit and refunds, worked out as each payment lands."
          dashboard={<PaymentsScreen tab="commissions" />}
          callouts={[
            {
              n: 1,
              title: "Split breakdown",
              desc: "Studio share and artist share, line by line, for every paid session.",
              position: { top: "12%", left: "30%" },
            },
            {
              n: 2,
              title: "Deposit balance",
              desc: "The project's pool balance, shown with the payment: how much is applied and how much is left.",
              position: { top: "30%", left: "58%" },
            },
            {
              n: 3,
              title: "Refunds",
              desc: "Refund a payment, or the unused part of a deposit, from the transaction.",
              position: { top: "48%", left: "36%" },
            },
            {
              n: 4,
              title: "Commission status",
              desc: "Each artist's commissions move from owed to approved to paid.",
              position: { top: "64%", left: "62%" },
            },
            {
              n: 5,
              title: "1099-K forms",
              desc: "Generated from payroll for each US contractor at year end. Pro plan.",
              position: { top: "80%", left: "44%" },
            },
          ]}
        />

        <ProductItemTypes
          eyebrow="Money on the rails"
          heading="Eight ways Limespun handles money."
          italicWord="Eight ways"
          intro="Every payment type a studio takes — structured, tracked, and reconciled without a spreadsheet."
          columns={4}
          items={[
            {
              icon: CreditCard,
              accent: BRAND.rust,
              severity: "No Limespun fee",
              title: "Card payments",
              desc: "Deposits and full payments by card. No Limespun fee; the card provider's standard fee applies.",
              example: "$320 session — $192 to Dev at 60%",
            },
            {
              icon: FileText,
              accent: BRAND.amber,
              title: "Transactions",
              desc: "Every payment and refund in one list, with the client and the session it was for.",
              example: "Filter by artist, date or status",
            },
            {
              icon: Package,
              accent: BRAND.sage,
              title: "Deposits",
              desc: "Project-level deposit pool. Draws down per session; unused deposit is refundable.",
              example: "$300 paid in — $60 applied to session 3",
            },
            {
              icon: RefreshCw,
              accent: BRAND.rust,
              title: "Refunds",
              desc: "Refund a payment, or the unused part of a deposit. Late cancels follow your policy.",
              example: "Leo B. late cancel — $150 deposit kept",
            },
            {
              icon: Heart,
              accent: BRAND.amber,
              title: "Tips",
              desc: "Tips recorded on the payment and counted in the artist's pay.",
              example: "$20 tip — on the artist's pay",
            },
            {
              icon: Users,
              accent: BRAND.sage,
              severity: "Studio +",
              title: "Commission split",
              desc: "Set once per artist. Worked out on every paid session, with no month-end calculation.",
              example: "Rio · guest · 70/30",
            },
            {
              icon: Star,
              accent: BRAND.rust,
              severity: "Studio +",
              title: "Booth rent",
              desc: "Weekly booth rent taken off an artist's pay instead of a commission.",
              example: "Mara · $250 a week",
            },
            {
              icon: FileText,
              accent: BRAND.amber,
              severity: "Pro",
              title: "Tax forms",
              desc: "1099-K forms generated from payroll at year end.",
              example: "One form per US contractor",
            },
          ]}
        />

        <ProductDayInLife
          eyebrow="A day in the studio"
          heading="Friday, with the numbers already done."
          italicWord="already done"
          intro="The owner sorts artist pay every Friday. It used to take the morning."
          paragraphs={[
            "Before Limespun it was card reports, a spreadsheet of sessions, splits worked out by hand and a bank transfer per artist.",
            <React.Fragment key="p2">
              Now the <strong>Commissions</strong> tab shows every artist, every session and what each one is owed, already worked out.
            </React.Fragment>,
            "Dev at 60% of $3,420 is $2,052. Mara's $2,910, less $250 booth rent, is $2,660. Rio, the guest, at 70% of $1,300 is $910.",
            <React.Fragment key="p4">
              $7,630 gross, $5,622 to the artists. <strong>Approve, and on Pro it goes into the payroll run.</strong>
            </React.Fragment>,
          ]}
          quote="Splits are worked out on every paid session, so Friday is a quick review instead of a morning of spreadsheets."
          takeawayLabel="The upshot"
        />

        <ProductRelated
          eyebrow="Connects directly to"
          heading="Payments move through the whole studio."
          italicWord="the whole studio"
          modules={[
            {
              icon: Tag,
              label: "Pricing",
              desc: "Flat monthly plans. Splits on Studio and up, payroll on Pro.",
              href: "/pricing",
            },
            {
              icon: Package,
              label: "Projects",
              desc: "Deposit pool lives on the project. Every session draws down from the same balance.",
              href: "/product/projects",
            },
            {
              icon: RefreshCw,
              label: "Inventory",
              desc: "Ink and supplies tracked by bottle and batch, with EU REACH records.",
              href: "/product/inventory",
            },
            {
              icon: TrendingUp,
              label: "Analytics",
              desc: "Revenue by artist and by month, built from the same payment data.",
              href: "/product/analytics",
            },
          ]}
        />

        <ProductCTA
          headline="Artist pay, already worked out."
          italicWord="already"
          subhead={`${MONEY_BACK_DAYS}-day money-back guarantee. Deposit pools on every plan, splits on Studio and up, payroll and 1099s on Pro.`}
        />
      </main>
      <Footer />
    </div>
  );
}
