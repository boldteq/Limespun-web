import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Messages — SMS and email in one inbox | Limespun",
  description:
    "Every client conversation in one inbox. SMS and email in one thread per client, with Instagram and WhatsApp coming next. Saved replies, auto-replies and internal notes.",
  openGraph: {
    title: "Limespun Messages — One inbox for client texts and email",
    description: "SMS and email, one thread per client.",
    type: "website",
  },
  alternates: { canonical: "https://limespun.com/product/messages" },
};

export default function MessagesLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
