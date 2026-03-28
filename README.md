# 🚀 Prabhu Tech Pro — Premium SaaS Platform

<p align="center">
  <img src="https://img.shields.io/badge/React-19-61dafb?logo=react&logoColor=white&style=for-the-badge" />
  <img src="https://img.shields.io/badge/Vite-8-646cff?logo=vite&logoColor=white&style=for-the-badge" />
  <img src="https://img.shields.io/badge/Node.js-Express-68a063?logo=node.js&logoColor=white&style=for-the-badge" />
  <img src="https://img.shields.io/badge/Nodemailer-Email-22d3a3?style=for-the-badge" />
  <img src="https://img.shields.io/badge/License-MIT-yellow?style=for-the-badge" />
</p>

<p align="center">
  A production-ready, full-stack SaaS landing page with a glassmorphic dark UI, real-time backend stats, and a fully functional email contact system.
</p>

---

## ✨ Features

| Feature | Details |
|---|---|
| 🎨 **Premium UI** | Glassmorphism, animated orbs, scroll-reveal, micro-animations |
| 📊 **Live Stats** | Polls Node.js backend every 5s for real-time metrics |
| 📬 **Email System** | Contact form sends owner notification + auto-reply via Nodemailer |
| 📰 **Newsletter** | Subscriber list with welcome email |
| 📱 **Responsive** | Fully mobile-optimized with slide-in mobile drawer |
| ♿ **Accessible** | Semantic HTML, ARIA roles, keyboard navigation |
| 🔒 **Secure** | Input validation on both client + server |

---

## 🗂 Folder Structure

```
saas/
├── public/                    # Static assets
├── src/
│   ├── data/
│   │   └── content.js         # ← All site copy & data (CMS-ready)
│   ├── hooks/
│   │   ├── useStats.js        # Live stats polling hook
│   │   └── useScrollReveal.js # Intersection observer hook
│   ├── components/
│   │   ├── ui/
│   │   │   └── index.jsx      # Reusable atoms (Badge, BtnPrimary, etc.)
│   │   ├── layout/
│   │   │   ├── Navbar.jsx     # Sticky navbar + mobile drawer
│   │   │   └── Footer.jsx     # Multi-column footer + newsletter form
│   │   └── sections/
│   │       ├── Hero.jsx       # Hero + announcement + dashboard mock
│   │       ├── Stats.jsx      # Live statistics
│   │       ├── Features.jsx   # Feature grid cards
│   │       ├── Skills.jsx     # Tech stack with skill bars
│   │       ├── Solutions.jsx  # Use-case cards
│   │       ├── About.jsx      # Company story + milestone timeline
│   │       ├── Pricing.jsx    # Pricing with annual/monthly toggle
│   │       ├── Testimonials.jsx
│   │       ├── FAQ.jsx
│   │       ├── Contact.jsx    # ← Full contact form + email
│   │       └── CTA.jsx
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css              # Design system (CSS custom properties)
└── server/
    ├── index.js               # Express backend + Nodemailer
    ├── package.json
    ├── .env.example           # Copy to .env and fill credentials
    ├── submissions.json       # (auto-created, gitignored)
    └── subscribers.json       # (auto-created, gitignored)
```

---

## 🛠 Tech Stack

**Frontend**
- [React 19](https://react.dev) + [Vite 8](https://vitejs.dev)
- Vanilla CSS with CSS Custom Properties (design tokens)
- [Lucide React](https://lucide.dev) icons
- Google Fonts — Outfit + Plus Jakarta Sans

**Backend**
- [Node.js](https://nodejs.org) + [Express 5](https://expressjs.com)
- [Nodemailer](https://nodemailer.com) — SMTP email sending
- JSON file persistence (zero-database setup)

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm 9+

### 1. Clone the repo
```bash
git clone https://github.com/asterexplorer/prabhutechpro.git
cd prabhutechpro
```

### 2. Install frontend dependencies
```bash
npm install
```

### 3. Install backend dependencies
```bash
cd server
npm install
```

### 4. Configure environment variables
```bash
# In the /server directory
cp .env.example .env
```

Edit `server/.env`:
```env
PORT=5000
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your-gmail@gmail.com
SMTP_PASS=your-16-char-app-password
CONTACT_RECEIVER=your-gmail@gmail.com
SMTP_FROM_NAME=Prabhu Tech Pro
```

> **Gmail Setup**: Go to Google Account → Security → 2-Step Verification → App Passwords → Generate one for "Mail".

### 5. Run the development servers

**Frontend** (in root):
```bash
npm run dev
# → http://localhost:5173
```

**Backend** (in `/server`):
```bash
node index.js
# → http://localhost:5000
```

---

## 📧 Email System

| Trigger | Recipient | Email Sent |
|---|---|---|
| Contact form submitted | Site owner | Full details + Reply CTA |
| Contact form submitted | Sender | Auto-reply with reference ID |
| Newsletter subscribed | Subscriber | Welcome email |

> If SMTP is not configured, form submissions are still saved locally — emails are silently skipped.

---

## 🔌 API Endpoints

| Method | Route | Description |
|---|---|---|
| `GET` | `/api/health` | Server health check |
| `GET` | `/api/stats` | Live company stats |
| `POST` | `/api/contact` | Contact form + email |
| `POST` | `/api/newsletter` | Newsletter subscribe + welcome email |

---

## 🏗 Build for Production

```bash
# At the project root
npm run build
# Output in /dist
```

---

## 📄 License

MIT © 2026 Prabhu Tech Pro Inc.

---

<p align="center">Built with ❤️ by <a href="https://github.com/asterexplorer">@asterexplorer</a></p>
