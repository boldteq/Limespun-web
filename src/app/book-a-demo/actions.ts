"use server";

import { headers } from "next/headers";
import { z } from "zod";
import { checkRateLimit } from "@/lib/rate-limit";
import { sendEmail } from "@/lib/email";

const DemoRequestSchema = z.object({
  name: z.string().min(2, "Name required"),
  email: z.string().email("Valid email required"),
  studioName: z.string().min(2, "Studio name required"),
  chairs: z.enum(['1', '2-5', '6-10', '11+']),
  currentTool: z.string().min(1, "Tell us what you're using now"),
  preferredTime: z.enum(['weekday-am', 'weekday-pm', 'weekend', 'flexible']),
  notes: z.string().max(500).optional(),
});

export interface DemoFormState {
  status: 'idle' | 'success' | 'error';
  message?: string;
  errors?: Record<string, string>;
}

const PREFERRED_TIME_LABELS: Record<string, string> = {
  "weekday-am": "Weekday morning",
  "weekday-pm": "Weekday afternoon",
  "weekend": "Weekend",
  "flexible": "Flexible",
};

export async function submitDemoRequest(
  prevState: DemoFormState,
  formData: FormData
): Promise<DemoFormState> {
  const raw = {
    name: formData.get('name')?.toString() ?? '',
    email: formData.get('email')?.toString() ?? '',
    studioName: formData.get('studioName')?.toString() ?? '',
    chairs: formData.get('chairs')?.toString() ?? '',
    currentTool: formData.get('currentTool')?.toString() ?? '',
    preferredTime: formData.get('preferredTime')?.toString() ?? '',
    notes: formData.get('notes')?.toString() ?? '',
  };

  const parsed = DemoRequestSchema.safeParse(raw);
  if (!parsed.success) {
    const errors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const path = issue.path[0]?.toString();
      if (path && !errors[path]) errors[path] = issue.message;
    }
    return { status: 'error', message: 'Please fix the errors below', errors };
  }

  const headerStore = await headers();
  const forwarded = headerStore.get("x-forwarded-for");
  const ip = (forwarded ? forwarded.split(",")[0].trim() : headerStore.get("x-real-ip")) ?? "anonymous";

  const { ok: rateLimitOk } = await checkRateLimit(`demo:${ip}`);
  if (!rateLimitOk) {
    return { status: "error", message: "Too many requests. Please try again in a minute." };
  }

  const { data } = parsed;
  const inbox = process.env.BOLDTEQ_INBOX ?? "hello@boldteq.com";
  const subject = `[Demo Request] ${data.studioName} (${data.chairs} chairs)`;

  const text = [
    `Name: ${data.name}`,
    `Email: ${data.email}`,
    `Studio: ${data.studioName}`,
    `Chairs: ${data.chairs}`,
    `Current tool: ${data.currentTool}`,
    `Preferred time: ${PREFERRED_TIME_LABELS[data.preferredTime] ?? data.preferredTime}`,
    data.notes ? `Notes: ${data.notes}` : "",
  ]
    .filter(Boolean)
    .join("\n");

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
            <span style="color:#888888;font-size:14px;margin-left:12px;">Demo Request</span>
          </td>
        </tr>
        <tr>
          <td style="padding:32px;">
            <h2 style="margin:0 0 24px;font-size:20px;font-weight:700;color:#0a0a0a;">New demo request</h2>
            <table width="100%" cellpadding="0" cellspacing="0">
              <tr>
                <td style="padding:10px 0;border-bottom:1px solid #f0f0f0;width:140px;color:#666;font-size:14px;">Name</td>
                <td style="padding:10px 0;border-bottom:1px solid #f0f0f0;color:#0a0a0a;font-size:14px;font-weight:600;">${data.name}</td>
              </tr>
              <tr>
                <td style="padding:10px 0;border-bottom:1px solid #f0f0f0;color:#666;font-size:14px;">Email</td>
                <td style="padding:10px 0;border-bottom:1px solid #f0f0f0;color:#0a0a0a;font-size:14px;font-weight:600;">${data.email}</td>
              </tr>
              <tr>
                <td style="padding:10px 0;border-bottom:1px solid #f0f0f0;color:#666;font-size:14px;">Studio</td>
                <td style="padding:10px 0;border-bottom:1px solid #f0f0f0;color:#0a0a0a;font-size:14px;font-weight:600;">${data.studioName}</td>
              </tr>
              <tr>
                <td style="padding:10px 0;border-bottom:1px solid #f0f0f0;color:#666;font-size:14px;">Chairs</td>
                <td style="padding:10px 0;border-bottom:1px solid #f0f0f0;color:#0a0a0a;font-size:14px;font-weight:600;">${data.chairs}</td>
              </tr>
              <tr>
                <td style="padding:10px 0;border-bottom:1px solid #f0f0f0;color:#666;font-size:14px;">Current tool</td>
                <td style="padding:10px 0;border-bottom:1px solid #f0f0f0;color:#0a0a0a;font-size:14px;font-weight:600;">${data.currentTool}</td>
              </tr>
              <tr>
                <td style="padding:10px 0;${data.notes ? "border-bottom:1px solid #f0f0f0;" : ""}color:#666;font-size:14px;">Preferred time</td>
                <td style="padding:10px 0;${data.notes ? "border-bottom:1px solid #f0f0f0;" : ""}color:#0a0a0a;font-size:14px;font-weight:600;">${PREFERRED_TIME_LABELS[data.preferredTime] ?? data.preferredTime}</td>
              </tr>
              ${data.notes ? `
              <tr>
                <td style="padding:10px 0;color:#666;font-size:14px;vertical-align:top;">Notes</td>
                <td style="padding:10px 0;color:#0a0a0a;font-size:14px;">${data.notes.replace(/</g, "&lt;").replace(/>/g, "&gt;")}</td>
              </tr>` : ""}
            </table>
            <div style="margin-top:28px;padding:16px;background:#f9f9f9;border-radius:6px;">
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
    // Log error server-side (no PII in the log) but show generic message to user
    // eslint-disable-next-line no-console
    console.error("[DEMO REQUEST · email send failed]", emailError);
    return { status: "error", message: "Something went wrong. Please try again or email us directly." };
  }

  return {
    status: 'success',
    message: "We'll be in touch within one business day at the email you gave us.",
  };
}
