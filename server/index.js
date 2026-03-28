const express  = require('express');
const cors     = require('cors');
const fs       = require('fs');
const path     = require('path');
const nodemailer = require('nodemailer');
require('dotenv').config();

const app  = express();
const PORT = process.env.PORT || 5000;

// ── Middleware ────────────────────────────────────────────────────────────────
app.use(cors());
app.use(express.json());

// ── Nodemailer transporter ────────────────────────────────────────────────────
const transporter = nodemailer.createTransport({
  host:   process.env.SMTP_HOST   || 'smtp.gmail.com',
  port:   Number(process.env.SMTP_PORT) || 587,
  secure: process.env.SMTP_SECURE === 'true', // true = port 465, false = STARTTLS
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

// Verify connection at startup (logs warning if credentials are missing/wrong)
transporter.verify((err) => {
  if (err) {
    console.warn('[Email] SMTP not configured or credentials invalid – emails will be skipped.');
    console.warn('[Email] Set SMTP_USER / SMTP_PASS in server/.env to enable real emails.');
  } else {
    console.log('[Email] SMTP ready ✅ –', process.env.SMTP_USER);
  }
});

// ── Email helpers ─────────────────────────────────────────────────────────────

/** HTML email sent to the site owner when a contact form is submitted */
function buildOwnerEmail(sub) {
  return {
    from: `"${process.env.SMTP_FROM_NAME || 'Prabhu Tech Pro'}" <${process.env.SMTP_USER}>`,
    to:   process.env.CONTACT_RECEIVER || process.env.SMTP_USER,
    subject: `📬 New Contact from ${sub.name} — ${sub.subject}`,
    html: `
      <!DOCTYPE html>
      <html lang="en">
      <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
      <body style="margin:0;padding:0;background:#04040a;font-family:'Segoe UI',Arial,sans-serif;color:#f1f5f9;">
        <table width="100%" cellpadding="0" cellspacing="0" style="background:#04040a;padding:40px 0;">
          <tr><td align="center">
            <table width="600" cellpadding="0" cellspacing="0" style="background:#0b0b16;border-radius:20px;border:1px solid rgba(255,255,255,0.07);overflow:hidden;max-width:600px;width:100%;">

              <!-- Header -->
              <tr><td style="background:linear-gradient(135deg,#5b52f0,#7c75ff);padding:32px 40px;">
                <h1 style="margin:0;font-size:24px;font-weight:800;color:#fff;">
                  📬 New Contact Submission
                </h1>
                <p style="margin:8px 0 0;color:rgba(255,255,255,0.75);font-size:14px;">
                  Submission ID: <strong>${sub.id}</strong>
                </p>
              </td></tr>

              <!-- Body -->
              <tr><td style="padding:36px 40px;">
                <table width="100%" cellpadding="0" cellspacing="0">
                  ${[
                    ['👤 Name',    sub.name],
                    ['📧 Email',   `<a href="mailto:${sub.email}" style="color:#7c75ff;">${sub.email}</a>`],
                    ['📱 Phone',   sub.phone || '—'],
                    ['🏷️ Subject', sub.subject],
                    ['🕐 Date',    new Date(sub.date).toLocaleString()],
                  ].map(([label, value]) => `
                    <tr>
                      <td style="padding:10px 0;border-bottom:1px solid rgba(255,255,255,0.06);width:130px;color:#8892a4;font-size:13px;font-weight:600;vertical-align:top;">${label}</td>
                      <td style="padding:10px 0 10px 16px;border-bottom:1px solid rgba(255,255,255,0.06);color:#f1f5f9;font-size:14px;">${value}</td>
                    </tr>`).join('')}
                </table>

                <!-- Message box -->
                <div style="margin-top:28px;">
                  <p style="margin:0 0 10px;color:#8892a4;font-size:13px;font-weight:600;text-transform:uppercase;letter-spacing:.05em;">💬 Message</p>
                  <div style="background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.07);border-radius:12px;padding:20px;color:#f1f5f9;font-size:15px;line-height:1.7;white-space:pre-wrap;">${sub.message}</div>
                </div>

                <!-- Reply CTA -->
                <div style="margin-top:32px;text-align:center;">
                  <a href="mailto:${sub.email}?subject=Re: ${encodeURIComponent(sub.subject)}"
                     style="display:inline-block;padding:14px 32px;background:linear-gradient(135deg,#5b52f0,#7c75ff);color:#fff;border-radius:12px;font-weight:700;font-size:15px;text-decoration:none;">
                    Reply to ${sub.name}
                  </a>
                </div>
              </td></tr>

              <!-- Footer -->
              <tr><td style="padding:20px 40px;background:rgba(0,0,0,0.2);text-align:center;color:#4b5563;font-size:12px;">
                © ${new Date().getFullYear()} Prabhu Tech Pro Inc. · This email was sent from your website's contact form.
              </td></tr>

            </table>
          </td></tr>
        </table>
      </body>
      </html>`,
  };
}

/** Confirmation email sent back to the person who filled the form */
function buildAutoReplyEmail(sub) {
  return {
    from: `"${process.env.SMTP_FROM_NAME || 'Prabhu Tech Pro'}" <${process.env.SMTP_USER}>`,
    to:   sub.email,
    subject: `✅ We received your message — Prabhu Tech Pro`,
    html: `
      <!DOCTYPE html>
      <html lang="en">
      <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
      <body style="margin:0;padding:0;background:#04040a;font-family:'Segoe UI',Arial,sans-serif;color:#f1f5f9;">
        <table width="100%" cellpadding="0" cellspacing="0" style="background:#04040a;padding:40px 0;">
          <tr><td align="center">
            <table width="600" cellpadding="0" cellspacing="0" style="background:#0b0b16;border-radius:20px;border:1px solid rgba(255,255,255,0.07);overflow:hidden;max-width:600px;width:100%;">

              <!-- Header -->
              <tr><td style="background:linear-gradient(135deg,#5b52f0,#7c75ff);padding:40px;text-align:center;">
                <div style="font-size:48px;margin-bottom:12px;">✅</div>
                <h1 style="margin:0;font-size:26px;font-weight:800;color:#fff;">Message Received!</h1>
                <p style="margin:12px 0 0;color:rgba(255,255,255,0.8);font-size:15px;">
                  Thanks for reaching out, ${sub.name.split(' ')[0]}. We'll get back to you soon.
                </p>
              </td></tr>

              <!-- Body -->
              <tr><td style="padding:40px;">
                <p style="margin:0 0 20px;color:#8892a4;font-size:15px;line-height:1.7;">
                  Hi <strong style="color:#f1f5f9;">${sub.name}</strong>,
                </p>
                <p style="margin:0 0 20px;color:#8892a4;font-size:15px;line-height:1.7;">
                  Thank you for contacting <strong style="color:#7c75ff;">Prabhu Tech Pro</strong>. We've received your message and our team will review it shortly.
                </p>
                <p style="margin:0 0 28px;color:#8892a4;font-size:15px;line-height:1.7;">
                  You can expect a reply within <strong style="color:#f1f5f9;">1–2 business days</strong>.
                </p>

                <!-- Summary card -->
                <div style="background:rgba(91,82,240,0.08);border:1px solid rgba(91,82,240,0.2);border-radius:14px;padding:20px 24px;margin-bottom:32px;">
                  <p style="margin:0 0 12px;color:#7c75ff;font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:.06em;">Your Submission</p>
                  <p style="margin:0 0 6px;color:#f1f5f9;font-size:14px;"><strong>Subject:</strong> ${sub.subject}</p>
                  <p style="margin:0 0 6px;color:#f1f5f9;font-size:14px;"><strong>Reference:</strong> ${sub.id}</p>
                  <p style="margin:0;color:#8892a4;font-size:13px;">${new Date(sub.date).toLocaleString()}</p>
                </div>

                <!-- CTA -->
                <div style="text-align:center;margin-bottom:32px;">
                  <a href="https://prabhutech.pro"
                     style="display:inline-block;padding:14px 32px;background:linear-gradient(135deg,#5b52f0,#7c75ff);color:#fff;border-radius:12px;font-weight:700;font-size:15px;text-decoration:none;">
                    Visit Prabhu Tech Pro
                  </a>
                </div>

                <p style="margin:0;color:#4b5563;font-size:13px;line-height:1.6;">
                  If you didn't submit this form, you can safely ignore this email.
                </p>
              </td></tr>

              <!-- Footer -->
              <tr><td style="padding:20px 40px;background:rgba(0,0,0,0.2);text-align:center;color:#4b5563;font-size:12px;">
                © ${new Date().getFullYear()} Prabhu Tech Pro Inc. · 500 Silicon Ave, San Francisco, CA 94105
              </td></tr>

            </table>
          </td></tr>
        </table>
      </body>
      </html>`,
  };
}

// ── Mock stats ────────────────────────────────────────────────────────────────
let stats = {
  activeUsers:    250420,
  uptimeSla:      99.98,
  automationsRun: 5234120,
  capRaised:      12.5,
};

setInterval(() => {
  stats.activeUsers    += Math.floor(Math.random() * 10);
  stats.automationsRun += Math.floor(Math.random() * 50);
}, 3000);

// ── Routes ────────────────────────────────────────────────────────────────────
app.get('/api/health', (_req, res) => {
  res.json({ status: 'healthy', timestamp: new Date() });
});

app.get('/api/stats', (_req, res) => {
  res.json(stats);
});

// ── POST /api/contact ─────────────────────────────────────────────────────────
app.post('/api/contact', async (req, res) => {
  const { name, email, phone, subject, message } = req.body;

  // Validation
  const errors = [];
  if (!name    || name.trim().length < 2)    errors.push('Name must be at least 2 characters.');
  if (!email   || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.push('Valid email is required.');
  if (!subject || subject.trim().length < 3) errors.push('Subject is required.');
  if (!message || message.trim().length < 10) errors.push('Message must be at least 10 characters.');

  if (errors.length) {
    return res.status(400).json({ success: false, errors });
  }

  const submission = {
    id:      `PBX-${Date.now().toString(36).toUpperCase()}`,
    name:    name.trim(),
    email:   email.trim().toLowerCase(),
    phone:   phone?.trim() || '',
    subject: subject.trim(),
    message: message.trim(),
    date:    new Date().toISOString(),
    ip:      req.ip,
  };

  // 1️⃣  Persist to submissions.json
  try {
    const filePath = path.join(__dirname, 'submissions.json');
    let submissions = [];
    if (fs.existsSync(filePath)) {
      submissions = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    }
    submissions.push(submission);
    fs.writeFileSync(filePath, JSON.stringify(submissions, null, 2));
    console.log(`[Contact] Saved submission ${submission.id} from ${submission.email}`);
  } catch (err) {
    console.error('[Contact] Failed to persist submission:', err.message);
  }

  // 2️⃣  Send emails (non-blocking – failure doesn't break the response)
  let emailSent = false;
  if (process.env.SMTP_USER && process.env.SMTP_PASS &&
      process.env.SMTP_USER !== 'your-email@gmail.com') {
    try {
      await Promise.all([
        transporter.sendMail(buildOwnerEmail(submission)),
        transporter.sendMail(buildAutoReplyEmail(submission)),
      ]);
      emailSent = true;
      console.log(`[Email] Owner notified + auto-reply sent to ${submission.email}`);
    } catch (err) {
      console.error('[Email] Failed to send:', err.message);
    }
  } else {
    console.log('[Email] SMTP not configured – skipping email send (submission still saved).');
  }

  return res.status(200).json({
    success: true,
    submissionId: submission.id,
    emailSent,
    message: emailSent
      ? `Thanks ${submission.name}! Your message was received and a confirmation email has been sent.`
      : `Thanks ${submission.name}! Your message was received. We'll be in touch soon.`,
  });
});

// ── Newsletter subscribe ──────────────────────────────────────────────────────
app.post('/api/newsletter', async (req, res) => {
  const { email } = req.body;
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ success: false, error: 'Valid email required.' });
  }

  // Persist subscriber
  const subscriber = { email, date: new Date().toISOString() };
  try {
    const filePath = path.join(__dirname, 'subscribers.json');
    let subscribers = [];
    if (fs.existsSync(filePath)) {
      subscribers = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    }
    // Deduplicate
    if (!subscribers.find(s => s.email === email)) {
      subscribers.push(subscriber);
      fs.writeFileSync(filePath, JSON.stringify(subscribers, null, 2));
    }
    console.log(`[Newsletter] New subscriber: ${email}`);
  } catch (err) {
    console.error('[Newsletter] Persist error:', err.message);
  }

  // Welcome email
  if (process.env.SMTP_USER && process.env.SMTP_PASS &&
      process.env.SMTP_USER !== 'your-email@gmail.com') {
    try {
      await transporter.sendMail({
        from: `"${process.env.SMTP_FROM_NAME || 'Prabhu Tech Pro'}" <${process.env.SMTP_USER}>`,
        to:   email,
        subject: '🎉 Welcome to the Prabhu Tech Pro community!',
        html: `
          <table width="100%" style="background:#04040a;padding:40px 0;font-family:'Segoe UI',Arial,sans-serif;">
            <tr><td align="center">
              <table width="560" style="background:#0b0b16;border-radius:20px;border:1px solid rgba(255,255,255,0.07);overflow:hidden;max-width:560px;width:100%;">
                <tr><td style="background:linear-gradient(135deg,#5b52f0,#7c75ff);padding:40px;text-align:center;">
                  <h1 style="margin:0;color:#fff;font-size:28px;font-weight:800;">You're in! 🎉</h1>
                  <p style="margin:12px 0 0;color:rgba(255,255,255,0.8);font-size:15px;">Welcome to the Prabhu Tech Pro community.</p>
                </td></tr>
                <tr><td style="padding:40px;color:#8892a4;font-size:15px;line-height:1.7;">
                  <p>Hi there 👋,</p>
                  <p>Thanks for subscribing! You'll now receive the latest product updates, feature launches, and exclusive tips directly to your inbox.</p>
                  <p style="margin-top:24px;"><strong style="color:#f1f5f9;">What to expect:</strong></p>
                  <ul style="padding-left:20px;color:#8892a4;">
                    <li>📦 Monthly product updates</li>
                    <li>🚀 Early access to new features</li>
                    <li>💡 Exclusive tutorials and guides</li>
                    <li>🎁 Special subscriber-only offers</li>
                  </ul>
                  <div style="text-align:center;margin:32px 0;">
                    <a href="https://prabhutech.pro" style="display:inline-block;padding:14px 32px;background:linear-gradient(135deg,#5b52f0,#7c75ff);color:#fff;border-radius:12px;font-weight:700;font-size:15px;text-decoration:none;">
                      Explore Prabhu Tech Pro
                    </a>
                  </div>
                  <p style="font-size:12px;color:#4b5563;text-align:center;">
                    You subscribed with ${email}. <a href="#" style="color:#7c75ff;">Unsubscribe</a>
                  </p>
                </td></tr>
                <tr><td style="padding:20px 40px;background:rgba(0,0,0,0.2);text-align:center;color:#4b5563;font-size:12px;">
                  © ${new Date().getFullYear()} Prabhu Tech Pro Inc.
                </td></tr>
              </table>
            </td></tr>
          </table>`,
      });
    } catch (err) {
      console.error('[Newsletter] Welcome email failed:', err.message);
    }
  }

  return res.json({
    success: true,
    message: '🎉 Subscribed! Check your inbox for a welcome email.',
  });
});

// ── Start server ──────────────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`[Server] Prabhu Tech Pro backend running on http://localhost:${PORT}`);
});
