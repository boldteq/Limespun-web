"use server";

import { headers } from "next/headers";
import { z } from "zod";
import { CONTACT_EMAIL } from "@/lib/brand";
import { checkRateLimit } from "@/lib/rate-limit";
import { sendEmail } from "@/lib/email";
import { escapeHtml } from "@/lib/html";
import { CONTACT_TOPIC_VALUES, topicSubject } from "./topics";

const MESSAGE_MAX = 2000;

const ContactSchema = z.object({
  name: z.string().trim().min(2, "Add your name.").max(100, "Keep your name under 100 characters."),
  email: z
    .string()
    .trim()
    .max(254, "That email address is too long.")
    .pipe(z.email("Enter an email address we can reply to.")),
  topic: z.enum(CONTACT_TOPIC_VALUES, { error: "Pick a topic." }),
  message: z
    .string()
    .trim()
    .min(10, "Add a line or two so we know how to help.")
    .max(MESSAGE_MAX, `Keep it under ${MESSAGE_MAX.toLocaleString("en-US")} characters.`),
});

type ContactField = keyof z.infer<typeof ContactSchema>;

export interface ContactFormValues {
  name: string;
  email: string;
  topic: string;
  message: string;
}

export interface ContactFormState {
  status: "idle" | "success" | "error";
  message?: string;
  errors?: Partial<Record<ContactField, string>>;
  /** What was sent, so a failed submit keeps everything the person typed. */
  values?: ContactFormValues;
  /** The address we'll reply to, shown on the success card. */
  email?: string;
}

function readValues(formData: FormData): ContactFormValues {
  const get = (key: string) => formData.get(key)?.toString() ?? "";
  return { name: get("name"), email: get("email"), topic: get("topic"), message: get("message") };
}

export async function submitContact(_prev: ContactFormState, formData: FormData): Promise<ContactFormState> {
  const values = readValues(formData);

  // Honeypot: hidden from people and screen readers, so only bots fill it. Look sent, send nothing.
  if (formData.get("website")?.toString()) {
    return { status: "success", email: values.email };
  }

  const parsed = ContactSchema.safeParse(values);
  if (!parsed.success) {
    const errors: Partial<Record<ContactField, string>> = {};
    for (const issue of parsed.error.issues) {
      const path = issue.path[0];
      if (typeof path === "string" && path in ContactSchema.shape && !errors[path as ContactField]) {
        errors[path as ContactField] = issue.message;
      }
    }
    return { status: "error", message: "Check the fields marked below.", errors, values };
  }

  const headerStore = await headers();
  const forwarded = headerStore.get("x-forwarded-for");
  const ip = (forwarded ? forwarded.split(",")[0].trim() : headerStore.get("x-real-ip")) ?? "anonymous";

  const { ok: rateLimitOk } = await checkRateLimit(`contact:${ip}`);
  if (!rateLimitOk) {
    return {
      status: "error",
      message: `Too many messages from this connection. Try again in a minute, or email ${CONTACT_EMAIL}.`,
      values,
    };
  }

  const { data } = parsed;
  const inbox = process.env.BOLDTEQ_INBOX ?? CONTACT_EMAIL;
  const topicLabel = topicSubject(data.topic);
  const safe = {
    name: escapeHtml(data.name),
    email: escapeHtml(data.email),
    message: escapeHtml(data.message),
    topic: escapeHtml(topicLabel),
  };
  const subject = `[Contact · ${topicLabel}] ${data.name.replace(/[\r\n]+/g, " ")}`;

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
            <span style="color:#ffffff;font-size:18px;font-weight:700;letter-spacing:-0.3px;">Limespun</span>
            <span style="color:#888888;font-size:14px;margin-left:12px;">Contact form</span>
          </td>
        </tr>
        <tr>
          <td style="padding:32px;">
            <h2 style="margin:0 0 24px;font-size:20px;font-weight:700;color:#0a0a0a;">New contact message</h2>
            <table width="100%" cellpadding="0" cellspacing="0">
              <tr>
                <td style="padding:10px 0;border-bottom:1px solid #f0f0f0;width:100px;color:#666;font-size:14px;">Name</td>
                <td style="padding:10px 0;border-bottom:1px solid #f0f0f0;color:#0a0a0a;font-size:14px;font-weight:600;">${safe.name}</td>
              </tr>
              <tr>
                <td style="padding:10px 0;border-bottom:1px solid #f0f0f0;color:#666;font-size:14px;">Email</td>
                <td style="padding:10px 0;border-bottom:1px solid #f0f0f0;color:#0a0a0a;font-size:14px;font-weight:600;">${safe.email}</td>
              </tr>
              <tr>
                <td style="padding:10px 0;border-bottom:1px solid #f0f0f0;color:#666;font-size:14px;">Topic</td>
                <td style="padding:10px 0;border-bottom:1px solid #f0f0f0;">
                  <span style="display:inline-block;padding:2px 10px;background:#f0f0f0;border-radius:20px;font-size:12px;font-weight:600;color:#0a0a0a;">${safe.topic}</span>
                </td>
              </tr>
            </table>
            <div style="margin-top:24px;">
              <p style="margin:0 0 8px;font-size:12px;font-weight:600;color:#666;text-transform:uppercase;letter-spacing:0.5px;">Message</p>
              <div style="padding:16px;background:#f9f9f9;border-radius:6px;font-size:14px;color:#0a0a0a;line-height:1.6;white-space:pre-wrap;">${safe.message}</div>
            </div>
            <div style="margin-top:24px;">
              <a href="mailto:${safe.email}" style="display:inline-block;background:#0a0a0a;color:#ffffff;text-decoration:none;padding:10px 20px;border-radius:5px;font-size:14px;font-weight:600;">Reply to ${safe.name}</a>
            </div>
          </td>
        </tr>
        <tr>
          <td style="padding:16px 32px;background:#f9f9f9;border-top:1px solid #f0f0f0;">
            <p style="margin:0;font-size:12px;color:#999;">Limespun &mdash; studio software for tattoo</p>
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
    console.error("[CONTACT · email send failed]", emailError);
    return {
      status: "error",
      message: `Your message didn't send. Try again, or email ${CONTACT_EMAIL}.`,
      values,
    };
  }

  return { status: "success", email: data.email };
}
