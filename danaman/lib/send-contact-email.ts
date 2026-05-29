import nodemailer from "nodemailer";

const CONTACT_EMAIL_TO = "ghostconfirmed24@gmail.com";

type ContactEmailPayload = {
  name: string;
  phone: string;
  message: string;
};

function getSmtpConfig() {
  const host = process.env.SMTP_HOST;
  const port = Number(process.env.SMTP_PORT ?? "587");
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (!host || !user || !pass) {
    return null;
  }

  return {
    host,
    port,
    secure: process.env.SMTP_SECURE === "true",
    auth: { user, pass },
  };
}

export async function sendContactEmail({ name, phone, message }: ContactEmailPayload) {
  const smtp = getSmtpConfig();
  if (!smtp) {
    throw new Error("SMTP is not configured. Set SMTP_HOST, SMTP_USER, and SMTP_PASS.");
  }

  // Gmail requires "from" to match the authenticated SMTP_USER account.
  const from = process.env.SMTP_USER ?? "noreply@danaman.local";

  const transporter = nodemailer.createTransport(smtp);

  await transporter.sendMail({
    from: `"Danaman" <${from}>`,
    to: CONTACT_EMAIL_TO,
    replyTo: from,
    subject: `[Danaman] Liên hệ mới từ ${name}`,
    text: [
      "Có liên hệ mới từ popup Danaman:",
      "",
      `Họ và tên: ${name}`,
      `Số điện thoại: ${phone}`,
      "",
      "Nội dung:",
      message,
    ].join("\n"),
    html: `
      <h2>Liên hệ mới từ popup Danaman</h2>
      <p><strong>Họ và tên:</strong> ${escapeHtml(name)}</p>
      <p><strong>Số điện thoại:</strong> ${escapeHtml(phone)}</p>
      <p><strong>Nội dung:</strong></p>
      <p>${escapeHtml(message).replace(/\n/g, "<br />")}</p>
    `,
  });
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
