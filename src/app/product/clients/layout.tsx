import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Clients — CRM with allergy intelligence and photo histories | Limespun",
  description:
    "Every client. Every session. Every contraindication. Photos, consent, allergy, comms — one record, surfaced when it matters.",
  openGraph: {
    title: "Limespun Clients — The CRM tattoo studios actually need",
    description: "Photos, consent, allergy, comms — one record.",
    type: "website",
  },
  alternates: { canonical: "https://limespun.com/product/clients" },
};

export default function ClientsLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
