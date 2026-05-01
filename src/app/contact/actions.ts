"use server";

import { headers } from "next/headers";
import { z } from "zod";
import { checkRateLimit } from "@/lib/rate-limit";
import { sendEmail } from "@/lib/email";

const ContactSchema = z.object({
  name: z.string().min(2, "Name required"),
  email: z.string().email("Valid email required"),
  topic: z.enum(["sales", "support", "press", "partnership", "feature-request", "other"]),
  message: z.string().min(10, "Tell us a bit more").max(2000),
});

export interface ContactFormState {
  status: "idle" | "success" | "error";
  message?: string;
  errors?: Record<string, string>;
}

const TOPIC_LABELS: Record<string, string> = {
  sales: "Sales",
  support: "Support",
  press: "Press",
  partnership: "Partnership",
  "feature-request": "Feature request",
  other: "Other",
};

export async function submitContact(
  _prev: ContactFormState,
  formData: FormData,
): Promise<ContactFormState> {
  const raw = {
    name: formData.get("name")?.toString() ?? "",
    email: formData.get("email")?.toString() ?? "",
    topic: formData.get("topic")?.toString() ?? "",
    message: formData.get("message")?.toString() ?? "",
  };

  const parsed = ContactSchema.safeParse(raw);
  if (!parsed.success) {
    const errors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const path = issue.path[0]?.toString();
      if (path && !errors[path]) errors[path] = issue.message;
    }
    return { status: "error", message: "Please fix the errors below", errors };
  }

  const headerStore = await headers();
  const forwarded = headerStore.get("x-forwarded-for");
  const ip = (forwarded ? forwarded.split(",")[0].trim() : headerStore.get("x-real-ip")) ?? "anonymous";

  const { ok: rateLimitOk } = await checkRateLimit(`contact:${ip}`);
  if (!rateLimitOk) {
    return { status: "error", message: "Too many requests. Please try again in a minute." };
  }

  const { data } = parsed;
  const inbox = process.env.BOLDTEQ_INBOX ?? "hello@boldteq.com";
  const topicLabel = TOPIC_LABELS[data.topic] ?? data.topic;
  const subject = `[Contact · ${topicLabel}] ${data.name}`;

  const text = [
    `Name: ${data.name}`,
    `Email: ${data.email}`,
    `Topic: ${topicLabel}`,
    `Message:\n${data.message}`,
  ].join("\n\n");

  const html = `
<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8" /><meta name="viewport" content="width=device-width,initial-scale=1" /></head>
<body style="margin:0;padding:0;background:#f5f5f5;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="padding:40px 0;">
    <tr><td align="center">
      <table width="560" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:8px;overflow:hidden;box-shadow:0 1px 4px rgba(0,0,0,.08);">
        <tr>
          <td style="background:#0a0a0a;padding:24px 32px;">
            <span style="color:#ffffff;font-size:18px;font-weight:700;letter-spacing:-0.3px;">InkOS</span>
            <span style="color:#888888;font-size:14px;margin-left:12px;">Contact Form</span>
          </td>
        </tr>
        <tr>
          <td style="padding:32px;">
            <h2 style="margin:0 0 24px;font-size:20px;font-weight:700;color:#0a0a0a;">New contact message</h2>
            <table width="100%" cellpadding="0" cellspacing="0">
              <tr>
                <td style="padding:10px 0;border-bottom:1px solid #f0f0f0;width:100px;color:#666;font-size:14px;">Name</td>
                <td style="padding:10px 0;border-bottom:1px solid #f0f0f0;color:#0a0a0a;font-size:14px;font-weight:600;">${data.name}</td>
              </tr>
              <tr>
                <td style="padding:10px 0;border-bottom:1px solid #f0f0f0;color:#666;font-size:14px;">Email</td>
                <td style="padding:10px 0;border-bottom:1px solid #f0f0f0;color:#0a0a0a;font-size:14px;font-weight:600;">${data.email}</td>
              </tr>
              <tr>
                <td style="padding:10px 0;border-bottom:1px solid #f0f0f0;color:#666;font-size:14px;">Topic</td>
                <td style="padding:10px 0;border-bottom:1px solid #f0f0f0;">
                  <span style="display:inline-block;padding:2px 10px;background:#f0f0f0;border-radius:20px;font-size:12px;font-weight:600;color:#0a0a0a;">${topicLabel}</span>
                </td>
              </tr>
            </table>
            <div style="margin-top:24px;">
              <p style="margin:0 0 8px;font-size:12px;font-weight:600;color:#666;text-transform:uppercase;letter-spacing:0.5px;">Message</p>
              <div style="padding:16px;background:#f9f9f9;border-radius:6px;font-size:14px;color:#0a0a0a;line-height:1.6;white-space:pre-wrap;">${data.message.replace(/</g, "&lt;").replace(/>/g, "&gt;")}</div>
            </div>
            <div style="margin-top:24px;">
              <a href="mailto:${data.email}" style="display:inline-block;background:#0a0a0a;color:#ffffff;text-decoration:none;padding:10px 20px;border-radius:5px;font-size:14px;font-weight:600;">Reply to ${data.name}</a>
            </div>
          </td>
        </tr>
        <tr>
          <td style="padding:16px 32px;background:#f9f9f9;border-top:1px solid #f0f0f0;">
            <p style="margin:0;font-size:12px;color:#999;">InkOS &mdash; Tattoo Studio Management</p>
          </td>
        </tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;

  const { ok: emailOk, error: emailError } = await sendEmail({
    to: inbox,
    subject,
    text,
    html,
    replyTo: data.email,
  });

  if (!emailOk) {
    // eslint-disable-next-line no-console
    console.error("[CONTACT · email send failed]", emailError);
    return { status: "error", message: "Something went wrong. Please try again or email us directly." };
  }

  return {
    status: "success",
    message: "We'll get back to you within one business day.",
  };
}
