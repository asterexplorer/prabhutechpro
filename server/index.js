const express  = require('express');
const http     = require('http');
const { Server } = require('socket.io');
const cors     = require('cors');
const path     = require('path');
const nodemailer = require('nodemailer');
const db       = require('./database');
require('dotenv').config();

const app  = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: '*', methods: ['GET', 'POST'] }
});

const PORT = process.env.PORT || 5000;

// ── Middleware ────────────────────────────────────────────────────────────────
app.use(cors());
app.use(express.json());

// ── Nodemailer transporter ────────────────────────────────────────────────────
const transporter = nodemailer.createTransport({
  host:   process.env.SMTP_HOST   || 'smtp.gmail.com',
  port:   Number(process.env.SMTP_PORT) || 587,
  secure: process.env.SMTP_SECURE === 'true',
  auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
});

// ── Realtime Stats Logic ──────────────────────────────────────────────────────
let stats = { 
  activeUsers: 250420, 
  uptimeSla: 99.98, 
  automationsRun: 5234120, 
  capRaised: 12.5 
};

// Update stats randomly and push to all clients
setInterval(() => {
  stats.activeUsers += Math.floor(Math.random() * 5);
  stats.automationsRun += Math.floor(Math.random() * 10);
  io.emit('stats-update', stats);
}, 4000);

io.on('connection', (socket) => {
  console.log(`[Realtime] 🚀 Client connected: ${socket.id}`);
  socket.emit('stats-initial', stats); // Push state immediately
  socket.on('disconnect', () => console.log(`[Realtime] 👋 Client disconnected: ${socket.id}`));
});

// ── Routes ────────────────────────────────────────────────────────────────────
app.get('/api/health', (_req, res) => res.json({ status: 'healthy', realtime: 'active' }));
app.get('/api/stats', (_req, res) => res.json(stats));

// ── POST /api/contact ─────────────────────────────────────────────────────────
app.post('/api/contact', async (req, res) => {
  const { name, email, phone, subject, message } = req.body;
  if (!name || !email || !message) return res.status(400).json({ success: false, error: 'Missing fields' });

  const submission = {
    id: `PBX-${Date.now().toString(36).toUpperCase()}`,
    name, email, phone: phone || '', subject, message,
    date: new Date().toISOString(), ip: req.ip
  };

  try {
    const stmt = db.prepare(`INSERT INTO submissions (id, name, email, phone, subject, message, date, ip) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`);
    stmt.run(submission.id, submission.name, submission.email, submission.phone, submission.subject, submission.message, submission.date, submission.ip);
    
    // 🔥 LIVE UPDATE: Tell all clients a new lead just came in
    io.emit('notification', { 
      type: 'contact', 
      user: name.split(' ')[0], 
      time: 'Just now',
      message: 'New project inquiry!'
    });
    
    // Bump stats live
    stats.activeUsers += 1;
    io.emit('stats-update', stats);

  } catch (err) { console.error('[DB] Error:', err.message); }

  res.json({ success: true, submissionId: submission.id });
});

// ── POST /api/newsletter ──────────────────────────────────────────────────────
app.post('/api/newsletter', async (req, res) => {
  const { email } = req.body;
  if (!email || !email.includes('@')) return res.status(400).json({ success: false, error: 'Invalid email' });

  try {
    const stmt = db.prepare(`INSERT OR IGNORE INTO subscribers (email) VALUES (?)`);
    stmt.run(email);
    
    // 🔥 LIVE UPDATE: Toast for everyone!
    io.emit('notification', { 
      type: 'newsletter', 
      user: 'Anonymous',
      time: 'Just now',
      message: 'New newsletter subscriber!'
    });

  } catch (err) { console.error('[DB] Error:', err.message); }

  res.json({ success: true, message: 'Subscribed live!' });
});

server.listen(PORT, () => {
  console.log(`[Realtime Server] backend running on http://localhost:${PORT}`);
});
