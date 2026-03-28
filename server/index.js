const express  = require('express');
const cors     = require('cors');
const path     = require('path');
const nodemailer = require('nodemailer');
const db       = require('./database'); // SQLite DB
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
  secure: process.env.SMTP_SECURE === 'true',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

transporter.verify((err) => {
  if (err) {
    console.warn('[Email] SMTP not configured – real emails will be skipped.');
  } else {
    console.log('[Email] SMTP ready ✅ –', process.env.SMTP_USER);
  }
});

// ── Email helpers ─────────────────────────────────────────────────────────────

function buildOwnerEmail(sub) {
  return {
    from: `"${process.env.SMTP_FROM_NAME || 'Prabhu Tech Pro'}" <${process.env.SMTP_USER}>`,
    to:   process.env.CONTACT_RECEIVER || process.env.SMTP_USER,
    subject: `📬 New Contact from ${sub.name} — ${sub.subject}`,
    html: `
      <div style="background:#04040a;padding:40px;color:#f1f5f9;font-family:sans-serif;max-width:600px;margin:auto;border-radius:20px;">
        <h2 style="color:#635bff;">New Submission</h2>
        <p><strong>Name:</strong> ${sub.name}</p>
        <p><strong>Email:</strong> ${sub.email}</p>
        <p><strong>Subject:</strong> ${sub.subject}</p>
        <div style="background:rgba(255,255,255,0.05);padding:20px;border-radius:10px;margin-top:20px;">
          ${sub.message}
        </div>
        <p style="font-size:12px;color:#4b5563;margin-top:30px;">ID: ${sub.id} | Date: ${new Date(sub.date).toLocaleString()}</p>
      </div>
    `,
  };
}

function buildAutoReplyEmail(sub) {
  return {
    from: `"${process.env.SMTP_FROM_NAME || 'Prabhu Tech Pro'}" <${process.env.SMTP_USER}>`,
    to:   sub.email,
    subject: `✅ We received your message — Prabhu Tech Pro`,
    html: `<div style="background:#04040a;padding:40px;color:#f1f5f9;font-family:sans-serif;"><h2>Hi ${sub.name},</h2><p>Thanks for reaching out! We've received your inquiry regarding <strong>${sub.subject}</strong> and will get back to you within 24 hours.</p></div>`,
  };
}

// ── Mock stats ────────────────────────────────────────────────────────────────
let stats = { activeUsers: 250420, uptimeSla: 99.98, automationsRun: 5234120, capRaised: 12.5 };
setInterval(() => {
  stats.activeUsers += Math.floor(Math.random() * 5);
  stats.automationsRun += Math.floor(Math.random() * 10);
}, 5000);

// ── Routes ────────────────────────────────────────────────────────────────────
app.get('/api/health', (_req, res) => res.json({ status: 'healthy', database: 'sqlite3' }));
app.get('/api/stats', (_req, res) => res.json(stats));

// ── POST /api/contact ─────────────────────────────────────────────────────────
app.post('/api/contact', async (req, res) => {
  const { name, email, phone, subject, message } = req.body;

  // Validation
  const errors = [];
  if (!name || name.trim().length < 2) errors.push('Name is too short.');
  if (!email || !email.includes('@')) errors.push('Invalid email.');
  if (!message || message.length < 10) errors.push('Message is too short.');

  if (errors.length) return res.status(400).json({ success: false, errors });

  const submission = {
    id: `PBX-${Date.now().toString(36).toUpperCase()}`,
    name, email, phone: phone || '', subject, message,
    date: new Date().toISOString(), ip: req.ip
  };

  // 1️⃣ Database Persistence
  try {
    const stmt = db.prepare(`
      INSERT INTO submissions (id, name, email, phone, subject, message, date, ip)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `);
    stmt.run(submission.id, submission.name, submission.email, submission.phone, submission.subject, submission.message, submission.date, submission.ip);
    console.log(`[DB] Saved submission ${submission.id}`);
  } catch (err) {
    console.error('[DB] Insert error:', err.message);
  }

  // 2️⃣ Email Sending
  if (process.env.SMTP_USER && process.env.SMTP_PASS && process.env.SMTP_USER !== 'your-email@gmail.com') {
    try {
      await Promise.all([
        transporter.sendMail(buildOwnerEmail(submission)),
        transporter.sendMail(buildAutoReplyEmail(submission)),
      ]);
    } catch (err) { console.error('[Email] Failed:', err.message); }
  }

  res.json({ success: true, submissionId: submission.id, message: 'Message received and stored in database.' });
});

// ── POST /api/newsletter ──────────────────────────────────────────────────────
app.post('/api/newsletter', async (req, res) => {
  const { email } = req.body;
  if (!email || !email.includes('@')) return res.status(400).json({ success: false, error: 'Invalid email.' });

  try {
    const stmt = db.prepare(`INSERT OR IGNORE INTO subscribers (email) VALUES (?)`);
    stmt.run(email);
    console.log(`[DB] New subscriber: ${email}`);
    res.json({ success: true, message: 'Subscribed successfully!' });
  } catch (err) {
    console.error('[DB] Newsletter error:', err.message);
    res.status(500).json({ success: false, error: 'Database error' });
  }
});

// ── ADMIN: Get all submissions (For demonstration) ───────────────────────────
app.get('/api/admin/submissions', (req, res) => {
  try {
    const rows = db.prepare('SELECT * FROM submissions ORDER BY date DESC').all();
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`[Server] Prabhu Tech Pro with SQLite DB running on http://localhost:${PORT}`);
});
