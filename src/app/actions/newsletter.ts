"use server";

import { headers } from "next/headers";
import { z } from "zod";
import { checkRateLimit } from "@/lib/rate-limit";
import { addNewsletterContact, sendEmail } from "@/lib/email";
import { escapeHtml } from "@/lib/html";

const NewsletterSchema = z.object({
  email: z.string().trim().toLowerCase().email("Enter a valid email address").max(254),
});

export interface NewsletterState {
  status: "idle" | "success" | "error";
  message?: string;
}

export async function subscribeToNewsletter(
  _prev: NewsletterState,
  formData: FormData,
): Promise<NewsletterState> {
  // Honeypot: real people never see or fill this field.
  if (formData.get("company")?.toString()) {
    return { status: "success", message: "You're on the list. First issue lands next month." };
  }

  const parsed = NewsletterSchema.safeParse({ email: formData.get("email")?.toString() ?? "" });
  if (!parsed.success) {
    return { status: "error", message: parsed.error.issues[0]?.message ?? "Enter a valid email address" };
  }

  const headerStore = await headers();
  const forwarded = headerStore.get("x-forwarded-for");
  const ip = (forwarded ? forwarded.split(",")[0].trim() : headerStore.get("x-real-ip")) ?? "anonymous";
  const { ok: rateOk } = await checkRateLimit(`newsletter:${ip}`);
  if (!rateOk) {
    return { status: "error", message: "Too many attempts. Try again in a minute." };
  }

  const { email } = parsed.data;
  const added = await addNewsletterContact(email);

  if (!added.configured) {
    // No segment configured yet: send the signup to the team inbox so nobody is lost.
    const inbox = process.env.BOLDTEQ_INBOX ?? "hello@boldteq.com";
    const { ok } = await sendEmail({
      to: inbox,
      subject: "[Newsletter] New Studio notes signup",
      text: `New newsletter signup: ${email}`,
      html: `<p>New newsletter signup: <strong>${escapeHtml(email)}</strong></p>`,
      replyTo: email,
    });
    if (!ok) return { status: "error", message: "Couldn't sign you up. Please try again." };
  } else if (!added.ok) {
    console.error("[NEWSLETTER · contact create failed]", added.error);
    return { status: "error", message: "Couldn't sign you up. Please try again." };
  }

  return { status: "success", message: "You're on the list. First issue lands next month." };
}
