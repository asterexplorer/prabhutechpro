// ── Central content store ──────────────────────────────────────────────
// All static copy lives here – easy to localise or CMS-swap later.

export const COMPANY = {
  name: 'Prabhu Tech Pro',
  tagline: 'The Ultimate Platform for Future-Ready Enterprises',
  description:
    'Prabhu Tech Pro unifies AI automation, real-time collaboration, and enterprise-grade security — so your teams ship faster and scale smarter.',
  email: 'hello@prabhutech.pro',
  phone: '+1 (888) 777-TECH',
  address: '500 Silicon Ave, San Francisco, CA 94105',
  founded: '2021',
  copyright: `© ${new Date().getFullYear()} Prabhu Tech Pro Inc. All rights reserved.`,
};

export const NAV_LINKS = [
  { label: 'Features',   href: '#features' },
  { label: 'Solutions',  href: '#solutions' },
  { label: 'Pricing',    href: '#pricing' },
  { label: 'Contact',    href: '#contact' },
];

export const STATS_FALLBACK = [
  { label: 'Active Users',    value: '250K+', color: 'var(--primary-light)' },
  { label: 'Uptime SLA',      value: '99.9%', color: 'var(--secondary)' },
  { label: 'Automations Run', value: '5M+',   color: 'var(--accent)' },
  { label: 'Capital Raised',  value: '$12M+', color: 'var(--success)' },
];

export const FEATURES = [
  {
    icon: 'Cpu',
    title: 'AI Orchestration',
    description:
      'Leverage hyper-intelligent algorithms to automate complex workflows and eliminate repetitive tasks at scale.',
    color: '79, 70, 229',
  },
  {
    icon: 'ShieldCheck',
    title: 'Enterprise Security',
    description:
      'Bank-grade AES-256 encryption, SSO, RBAC, and SOC 2 Type II compliance—your data is always protected.',
    color: '6, 182, 212',
  },
  {
    icon: 'CloudLightning',
    title: 'Cloud Integration',
    description:
      'Connect seamlessly with 100+ platforms including AWS, Azure, GCP, Slack, Salesforce, and more.',
    color: '217, 70, 239',
  },
  {
    icon: 'Users',
    title: 'Global Collaboration',
    description:
      'Work with your team in real-time across continents with zero-latency syncing and live presence indicators.',
    color: '249, 115, 22',
  },
  {
    icon: 'BarChart3',
    title: 'Advanced Analytics',
    description:
      'Deep-dive into performance metrics with interactive dashboards and AI-driven forecasting.',
    color: '34, 197, 94',
  },
  {
    icon: 'Globe',
    title: 'Edge Performance',
    description:
      'Lightning-fast delivery from 300+ edge nodes worldwide—sub-100ms latency guaranteed.',
    color: '239, 68, 68',
  },
];

export const SOLUTIONS = [
  {
    icon: 'Rocket',
    title: 'For Startups',
    description:
      'Go from zero to production in hours. Our startup kit gives you authentication, billing, CI/CD pipelines, and monitoring out-of-the-box.',
    badge: 'Popular',
  },
  {
    icon: 'Building2',
    title: 'For Enterprises',
    description:
      'Dedicated infrastructure, white-glove onboarding, custom SLAs, and a dedicated success manager to drive adoption across your org.',
    badge: null,
  },
  {
    icon: 'GraduationCap',
    title: 'For Agencies',
    description:
      'Multi-tenant workspaces, white-label options, and client billing tools so you can scale your agency without scaling headcount.',
    badge: null,
  },
];

export const PRICING_TIERS = [
  {
    tier: 'Starter',
    price: '29',
    period: 'mo',
    description: 'Perfect for small teams and early-stage startups.',
    features: [
      'Up to 5 team members',
      '10 GB secure storage',
      'Basic AI Assistant',
      'Email support (48h SLA)',
      '20 workflow automations/month',
    ],
    cta: 'Start Free Trial',
    isPopular: false,
  },
  {
    tier: 'Pro',
    price: '99',
    period: 'mo',
    description: 'Ideal for scaling businesses with complex needs.',
    features: [
      'Up to 25 team members',
      '100 GB secure storage',
      'Advanced AI Insights',
      'Priority support (4h SLA)',
      'Unlimited automations',
      'Custom integrations & API',
      'Advanced analytics dashboard',
    ],
    cta: 'Start Free Trial',
    isPopular: true,
  },
  {
    tier: 'Enterprise',
    price: 'Custom',
    period: null,
    description: 'Dedicated resources and white-glove service for global enterprises.',
    features: [
      'Unlimited team members',
      'Unlimited storage',
      'Dedicated AI model fine-tuning',
      '24/7 phone support & SLA',
      'Custom integrations & SOC 2',
      'SSO, SAML & RBAC',
      'Dedicated success manager',
    ],
    cta: 'Talk to Sales',
    isPopular: false,
  },
];

export const TESTIMONIALS = [
  {
    author: 'Sarah Jenkins',
    role: 'CEO at Scaleify',
    rating: 5,
    quote:
      'Prabhu Tech Pro helped us automate 70% of our manual processes. The efficiency gains are incredible — we shipped 3× more features last quarter.',
    avatar: 'SJ',
    gradient: '79, 70, 229',
  },
  {
    author: 'David Chen',
    role: 'CTO at CloudBase',
    rating: 5,
    quote:
      'The most stable and developer-friendly platform I have ever used. Our uptime went from 99.5% to 99.99% within a month of switching.',
    avatar: 'DC',
    gradient: '0, 212, 255',
  },
  {
    author: 'Elena Petrova',
    role: 'Head of Growth at VentureX',
    rating: 5,
    quote:
      'Excellent toolkit for growth teams. The AI-driven insights have completely transformed the way we make product decisions.',
    avatar: 'EP',
    gradient: '224, 64, 251',
  },
  {
    author: 'Marcus Williams',
    role: 'VP Engineering at NexaLabs',
    rating: 5,
    quote:
      'Migration was painless and their support team is world-class. We saved $40K/month by consolidating 6 tools into Prabhu Tech Pro.',
    avatar: 'MW',
    gradient: '34, 197, 94',
  },
];

export const FAQS = [
  {
    q: 'How does the 14-day free trial work?',
    a: 'You get full access to all Pro features for 14 days — no credit card required. At the end, choose a plan that fits, or continue on the free tier with limited features.',
  },
  {
    q: 'Can I migrate from another platform?',
    a: 'Absolutely. We provide a guided import wizard supporting CSV, JSON, and direct API connections from Notion, Airtable, Asana, and more. Enterprise plans include full white-glove migration.',
  },
  {
    q: 'What integrations do you support?',
    a: 'Prabhu Tech Pro natively connects with 100+ tools including Slack, Google Workspace, GitHub, Salesforce, AWS, Stripe, HubSpot, and Zapier bridge for everything else.',
  },
  {
    q: 'Is my data secure?',
    a: 'Yes. We are SOC 2 Type II certified, use AES-256 encryption at rest, TLS 1.3 in transit, and offer SAML SSO, RBAC, and full audit logs on Enterprise plans.',
  },
  {
    q: 'Can I cancel anytime?',
    a: 'Yes — cancel at any time with a single click. No penalties, no hidden fees. If you cancel mid-cycle, you retain access until the billing period ends.',
  },
  {
    q: 'Do you offer discounts for startups or NGOs?',
    a: 'We offer a 50% startup discount for companies under 2 years old with fewer than 20 employees, and special pricing for verified nonprofits. Contact our sales team to apply.',
  },
];

export const LOGOS = [
  'Stripe', 'Slack', 'GitHub', 'Salesforce', 'AWS', 'Google', 'HubSpot', 'Notion',
];

export const FOOTER_LINKS = {
  Product: ['Features', 'Integrations', 'Pricing', 'Changelog', 'Roadmap'],
  Company: ['Careers', 'Blog', 'Press', 'Legal'],
  Support: ['Documentation', 'API Reference', 'Community', 'Status Page', 'Contact'],
  Legal: ['Privacy Policy', 'Terms of Service', 'Cookie Policy', 'GDPR'],
};
