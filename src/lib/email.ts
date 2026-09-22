import { Resend } from "resend";

let _client: Resend | null = null;

function getClient(): Resend | null {
  const key = process.env.RESEND_API_KEY;
  if (!key) return null;
  if (!_client) _client = new Resend(key);
  return _client;
}

export interface EmailPayload {
  to: string | string[];
  subject: string;
  text?: string;
  html?: string;
  replyTo?: string;
}

const FROM = process.env.RESEND_FROM ?? "Limespun <hello@boldteq.com>";

export async function sendEmail(
  payload: EmailPayload,
): Promise<{ ok: boolean; error?: string }> {
  const client = getClient();
  if (!client) {
    if (process.env.NODE_ENV === "production") {
      return { ok: false, error: "RESEND_API_KEY is not configured" };
    }
    console.log("[EMAIL · resend not configured · would send]", {
      to: payload.to,
      subject: payload.subject,
    });
    return { ok: true };
  }

  try {
    const { error } = await client.emails.send({
      from: FROM,
      to: payload.to,
      subject: payload.subject,
      text: payload.text ?? "",
      html: payload.html,
      replyTo: payload.replyTo,
    });
    if (error) return { ok: false, error: error.message };
    return { ok: true };
  } catch (err) {
    return {
      ok: false,
      error: err instanceof Error ? err.message : "send failed",
    };
  }
}

/**
 * Adds an email to the newsletter segment in Resend.
 * Returns ok when the contact exists already, so a repeat signup still succeeds.
 */
export async function addNewsletterContact(
  email: string,
): Promise<{ ok: boolean; configured: boolean; error?: string }> {
  const client = getClient();
  const segmentId = process.env.RESEND_NEWSLETTER_SEGMENT_ID;
  if (!client || !segmentId) return { ok: false, configured: false };

  try {
    const { error } = await client.contacts.create({
      email,
      unsubscribed: false,
      segments: [{ id: segmentId }],
    });
    if (error && !/already exists/i.test(error.message)) {
      return { ok: false, configured: true, error: error.message };
    }
    return { ok: true, configured: true };
  } catch (err) {
    return {
      ok: false,
      configured: true,
      error: err instanceof Error ? err.message : "contact create failed",
    };
  }
}
