import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { Resend } from "resend";

// Route Handlers must live under `app/` — this file is served at POST /api/contact.
// It runs on the Node.js runtime so the RESEND_API_KEY stays server-side only.
export const runtime = "nodejs";

// Resend needs a verified sender domain in production. Until one is set up you can
// send from Resend's shared `onboarding@resend.dev` address (test mode).
const FROM_ADDRESS =
  process.env.CONTACT_FROM ?? "Portfolio Contact <onboarding@resend.dev>";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type ContactPayload = {
  name?: unknown;
  email?: unknown;
  message?: unknown;
};

export async function POST(request: NextRequest) {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_EMAIL;

  if (!apiKey || !to) {
    // Misconfiguration is our fault, not the visitor's — don't leak which key is missing.
    console.error("Contact form is missing RESEND_API_KEY or CONTACT_EMAIL.");
    return NextResponse.json(
      { error: "Email is not configured on the server." },
      { status: 500 }
    );
  }

  let body: ContactPayload;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Expected a JSON body." },
      { status: 400 }
    );
  }

  const name = typeof body.name === "string" ? body.name.trim() : "";
  const email = typeof body.email === "string" ? body.email.trim() : "";
  const message = typeof body.message === "string" ? body.message.trim() : "";

  if (!name || !email || !message) {
    return NextResponse.json(
      { error: "Name, email, and message are all required." },
      { status: 400 }
    );
  }
  if (!EMAIL_RE.test(email)) {
    return NextResponse.json(
      { error: "That email address looks invalid." },
      { status: 400 }
    );
  }
  if (message.length > 5000) {
    return NextResponse.json(
      { error: "Message is too long (5000 characters max)." },
      { status: 400 }
    );
  }

  const resend = new Resend(apiKey);

  const { data, error } = await resend.emails.send({
    from: FROM_ADDRESS,
    to,
    replyTo: email, // hitting "reply" goes straight to the visitor
    subject: `Portfolio contact from ${name}`,
    text: `From: ${name} <${email}>\n\n${message}`,
    html: buildHtml(name, email, message),
  });

  if (error) {
    console.error("Resend failed to send contact email:", error);
    return NextResponse.json(
      { error: "Could not send your message. Please try again later." },
      { status: 502 }
    );
  }

  return NextResponse.json({ id: data?.id }, { status: 200 });
}

function buildHtml(name: string, email: string, message: string) {
  // Escape everything that came from the visitor before it lands in an HTML email.
  const esc = (s: string) =>
    s
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");

  return `
    <div style="font-family: system-ui, sans-serif; line-height: 1.5;">
      <p><strong>From:</strong> ${esc(name)} &lt;${esc(email)}&gt;</p>
      <hr />
      <p style="white-space: pre-wrap;">${esc(message)}</p>
    </div>
  `;
}
