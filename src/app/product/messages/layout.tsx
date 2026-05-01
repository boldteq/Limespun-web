import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Messages — Omnichannel inbox: SMS, email, IG, WhatsApp | InkOS",
  description:
    "Every conversation, every channel, one inbox. SMS, email, Instagram, WhatsApp, in-app — all routed to one thread per client. Auto-replies. Templates. Internal notes.",
  openGraph: {
    title: "InkOS Messages — Omnichannel inbox built for studios",
    description: "Every conversation, every channel, one inbox.",
    type: "website",
  },
  alternates: { canonical: "https://inkos.studio/product/messages" },
};

export default function MessagesLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
