'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Check,
  X,
  ArrowRight,
  Shield,
  Lock,
  Heart,
  Layers,
  Zap,
  Building2,
  Star,
  Crown,
  ChevronDown,
  Globe,
  Quote,
  BadgeCheck,
  CreditCard,
  XCircle,
  ShieldCheck,
  Sparkles,
  Clock,
  Bookmark,
  MessageSquare,
  FileCheck,
  Code2,
  Palette,
  Calculator,
  Timer,
  Users,
  Award,
  Mail,
  Phone,
  HelpCircle,
  Info,
  TrendingDown,
  ArrowUpRight,
  HandHeart,
  RefreshCw,
  Gift,
  Eye,
  Fingerprint,
  Server,
} from 'lucide-react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

// ─── PRICING TIERS ───────────────────────────────────────
const tiersBase = [
  {
    name: 'Free',
    priceMonthly: '$0',
    priceAnnual: '$0',
    period: '/month',
    description: 'For everyone who needs help finding the right resources.',
    badge: 'Current plan',
    badgeColor: 'bg-blue-50 text-blue-600 border-blue-100/60',
    icon: Layers,
    iconBg: 'bg-blue-50',
    iconColor: 'text-blue-500',
    borderColor: '',
    scale: false,
    features: [
      { text: 'Unlimited resource searches', included: true, desc: 'Search as many times as you need — no daily or monthly caps' },
      { text: 'Crisis detection (always active)', included: true, desc: 'Hardcoded safety layer that bypasses AI entirely when crisis keywords are detected' },
      { text: 'Confidence scores on every result', included: true, desc: 'Honest confidence showing how certain the AI is about each classification' },
      { text: '211 human navigator access', included: true, desc: 'Connect with a real human navigator via the 211 network anytime' },
      { text: 'Community support', included: true, desc: 'Access our community forums and help documentation' },
      { text: 'Priority classification speed', included: false, desc: '' },
      { text: 'Saved conversation history', included: false, desc: '' },
      { text: 'Advanced clarification engine', included: false, desc: '' },
      { text: 'Resource eligibility pre-check', included: false, desc: '' },
      { text: 'Email support', included: false, desc: '' },
    ],
    summary: '5 core features included',
    cta: 'Current Plan',
    ctaDisabled: true,
    ctaVariant: 'disabled' as const,
  },
  {
    name: 'Pro',
    priceMonthly: '$12',
    priceAnnual: '$9',
    period: '/month',
    description: 'For power users who need faster, deeper resource navigation.',
    badge: 'Most Popular',
    badgeColor: 'bg-emerald-50 text-emerald-600 border-emerald-100/60',
    icon: Zap,
    iconBg: 'bg-emerald-50',
    iconColor: 'text-emerald-500',
    borderColor: 'border-2 border-blue-200',
    scale: true,
    features: [
      { text: 'Unlimited resource searches', included: true, desc: 'Search as many times as you need — no daily or monthly caps' },
      { text: 'Crisis detection (always active)', included: true, desc: 'Hardcoded safety layer that bypasses AI entirely when crisis keywords are detected' },
      { text: 'Confidence scores on every result', included: true, desc: 'Honest confidence showing how certain the AI is about each classification' },
      { text: '211 human navigator access', included: true, desc: 'Connect with a real human navigator via the 211 network anytime' },
      { text: 'Community support', included: true, desc: 'Access our community forums and help documentation' },
      { text: 'Priority classification speed', included: true, desc: 'Jump the queue for 2x faster classifications — critical when every second counts' },
      { text: 'Saved conversation history', included: true, desc: 'Resume past conversations and track resource discoveries over time' },
      { text: 'Advanced clarification engine', included: true, desc: 'Deeper multi-turn questions for complex multi-need situations' },
      { text: 'Resource eligibility pre-check', included: true, desc: 'Know if you qualify before applying — saves hours on ineligible applications' },
      { text: 'Email support', included: true, desc: 'Get responses within 24 hours from our support team' },
    ],
    summary: 'All 10 features included',
    cta: 'Upgrade to Pro',
    ctaDisabled: false,
    ctaVariant: 'primary' as const,
  },
  {
    name: 'Enterprise',
    priceMonthly: 'Custom',
    priceAnnual: 'Custom',
    period: '',
    description: 'For organizations that need tailored AI resource navigation.',
    badge: 'Contact us',
    badgeColor: 'bg-gray-50 text-gray-600 border-gray-200/60',
    icon: Building2,
    iconBg: 'bg-gray-50',
    iconColor: 'text-gray-500',
    borderColor: '',
    scale: false,
    features: [
      { text: 'Everything in Pro', included: true, desc: 'All 10 Pro features included at no extra cost' },
      { text: 'API access', included: true, desc: 'RESTful API with authentication, rate limiting, and webhook support' },
      { text: 'Custom resource databases', included: true, desc: 'Import your own verified resource lists and classification taxonomy' },
      { text: 'White-label options', included: true, desc: 'Custom branding, domain, and UI to match your organization\'s identity' },
      { text: 'Dedicated account manager', included: true, desc: 'A named contact who understands your organization\'s unique needs' },
      { text: 'SLA guarantee', included: true, desc: '99.9% uptime SLA with priority incident response' },
      { text: 'Priority classification speed', included: true, desc: 'Fastest possible classification with dedicated compute resources' },
      { text: 'Saved conversation history', included: true, desc: 'Extended retention with org-wide visibility and audit logs' },
      { text: 'Advanced clarification engine', included: true, desc: 'Custom clarification workflows tailored to your intake process' },
      { text: 'Resource eligibility pre-check', included: true, desc: 'Program-specific eligibility rules customized for your services' },
    ],
    summary: 'All features + custom integrations',
    cta: 'Contact Sales',
    ctaDisabled: false,
    ctaVariant: 'secondary' as const,
  },
]

// ─── FAQ DATA ────────────────────────────────────────────
const faqs = [
  {
    question: 'Is ClearPath AI free to use?',
    answer:
      'Yes, ClearPath AI is completely free for individuals. Our core mission is making community resources accessible to everyone. The Free tier gives you unlimited searches, crisis detection, confidence scores, and access to 211 human navigators — forever. Pro and Enterprise plans are for power users and organizations who need advanced features.',
  },
  {
    question: 'What makes ClearPath different from ChatGPT?',
    answer:
      'Unlike generic AI chatbots, ClearPath AI never hallucinates resources. We classify against a verified 211 database using BART-large-MNLI, show honest confidence scores on every result, and bypass AI entirely when crisis keywords are detected. Every result shows WHY it was recommended, WHAT ELSE was considered, and HOW CONFIDENT we are.',
  },
  {
    question: 'How does crisis detection work?',
    answer:
      'Before any AI processing, we check every input against hardcoded crisis keywords. If detected, the AI layer is bypassed entirely and you\'re immediately connected to crisis resources like the 988 Suicide & Crisis Lifeline. This isn\'t a probability — it\'s a deterministic safety layer that always activates, even on the Free plan.',
  },
  {
    question: 'Is my data stored?',
    answer:
      'Guest sessions are processed in-memory and not stored. Your queries are processed in real-time with no persistent storage. Guest sessions are not persisted. We believe that people seeking community resources deserve strong privacy protections across all plans.',
  },
  {
    question: 'Can I switch between plans?',
    answer:
      'Absolutely. You can switch plans at any time. When upgrading, you\'ll get immediate access to Pro features and be charged a prorated amount for the remainder of your billing cycle. When downgrading, your Pro features remain active until the end of your current billing period. There are no cancellation fees.',
  },
  {
    question: 'How does annual billing work?',
    answer:
      'Annual billing gives you 12 months of access at a 25% discount compared to monthly billing. For Pro, that\'s $9/month billed annually ($108/year) instead of $12/month. You can switch between monthly and annual billing at any time. If you switch from annual to monthly, the change takes effect at the end of your current annual period.',
  },
  {
    question: 'Do you offer discounts for nonprofits?',
    answer:
      'Yes! We offer a 50% discount on the Pro plan for verified nonprofit organizations. That means Pro is just $6/month (or $4.50/month on annual billing) for nonprofits. We believe in supporting the people who support communities. Contact our team with proof of your nonprofit status, and we\'ll apply the discount to your account within 24 hours. Enterprise plans for nonprofits also receive special pricing.',
  },
  {
    question: 'What happens to my saved history if I downgrade?',
    answer:
      'If you downgrade from Pro to Free, your saved conversation history remains accessible in read-only mode for 30 days. After that, the saved data is permanently removed. We recommend exporting your history before downgrading. You can always upgrade again to regain the saved history feature.',
  },
  {
    question: 'What are the API rate limits for Enterprise?',
    answer:
      'Enterprise API access starts at 10,000 requests per month with burst capacity up to 100 requests per minute. Higher limits are available upon request. All API requests include classification results, confidence scores, and crisis detection flags. Rate limit monitoring and usage dashboards are included.',
  },
  {
    question: 'What white-label options are available?',
    answer:
      'Enterprise customers can fully customize the ClearPath AI interface: custom logo, brand colors, custom domain (e.g., resources.yourorg.org), tailored onboarding flows, and custom classification categories. We provide a design system and implementation support to ensure the white-labeled experience matches your organization\'s brand guidelines.',
  },
  {
    question: 'Can I use ClearPath AI for my team or organization?',
    answer:
      'Yes! While the Free plan is designed for individual use, Pro accounts can be used by individual practitioners (social workers, counselors, etc.). For teams and organizations, our Enterprise plan includes team management, shared resource databases, centralized billing, and organizational dashboards. Contact our sales team for team-specific pricing.',
  },
  {
    question: 'What is your refund policy?',
    answer:
      'We offer a 30-day money-back guarantee on all paid plans. If ClearPath AI doesn\'t meet your expectations within the first 30 days, we\'ll refund your payment in full — no questions asked. After 30 days, you can cancel anytime and your plan remains active until the end of the current billing period. We do not offer partial refunds for unused time after the 30-day guarantee period.',
  },
  {
    question: 'How do I request a new feature?',
    answer:
      'We love hearing from our users! You can submit feature requests through the feedback button in the app, by emailing team@clearpath-ai.org, or through our community forum. Pro and Enterprise users get priority consideration for feature requests. We review all suggestions monthly and publish a public roadmap of planned features.',
  },
  {
    question: 'Is ClearPath AI HIPAA compliant?',
    answer:
      'ClearPath AI does not collect Protected Health Information (PHI). There is no user account system, no persistent storage of queries, no health data. We do not claim privacy-first architecture (no PII stored) — it does not apply to a tool that collects no health information. There is no Enterprise tier and no sales team — this is a hackathon build by two high school students.'
  },
]

// ─── EXPANDED COMPARISON TABLE DATA ──────────────────────
const comparisonSections = [
  {
    title: 'Core Features',
    rows: [
      { feature: 'Resource searches', free: 'Unlimited', pro: 'Unlimited', enterprise: 'Unlimited' },
      { feature: 'Crisis detection', free: 'Always on', pro: 'Always on', enterprise: 'Always on' },
      { feature: 'Confidence scores', free: '✓', pro: '✓', enterprise: '✓' },
      { feature: '211 human navigator', free: '✓', pro: '✓', enterprise: '✓' },
    ],
  },
  {
    title: 'Search & Classification',
    rows: [
      { feature: 'Zero-shot classification', free: '✓', pro: '✓', enterprise: '✓' },
      { feature: 'Multi-need detection', free: 'Basic', pro: 'Advanced', enterprise: 'Custom' },
      { feature: 'Response time', free: 'Standard', pro: 'Priority (2x)', enterprise: 'Dedicated (4x)' },
      { feature: 'Classification depth', free: 'Single-label', pro: 'Multi-label', enterprise: 'Custom taxonomy' },
    ],
  },
  {
    title: 'Pro Features',
    rows: [
      { feature: 'Priority speed', free: '—', pro: '✓', enterprise: '✓' },
      { feature: 'Saved history', free: '—', pro: '30 days', enterprise: 'Unlimited' },
      { feature: 'Advanced clarification', free: '—', pro: '✓', enterprise: 'Custom flows' },
      { feature: 'Eligibility pre-check', free: '—', pro: '✓', enterprise: 'Custom rules' },
      { feature: 'Email support', free: '—', pro: '24hr response', enterprise: '4hr response' },
    ],
  },
  {
    title: 'Enterprise Features',
    rows: [
      { feature: 'API access', free: '—', pro: '—', enterprise: '✓' },
      { feature: 'Custom databases', free: '—', pro: '—', enterprise: '✓' },
      { feature: 'White-label', free: '—', pro: '—', enterprise: '✓' },
      { feature: 'Account manager', free: '—', pro: '—', enterprise: 'Dedicated' },
      { feature: 'SLA guarantee', free: '—', pro: '—', enterprise: '99.9%' },
    ],
  },
  {
    title: 'Support & SLA',
    rows: [
      { feature: 'Community support', free: '✓', pro: '✓', enterprise: '✓' },
      { feature: 'Email support', free: '—', pro: '✓', enterprise: 'Priority' },
      { feature: 'Phone support', free: '—', pro: '—', enterprise: '✓' },
      { feature: 'Uptime SLA', free: 'Best effort', pro: '99.5%', enterprise: '99.9%' },
    ],
  },
]

// ─── TESTIMONIALS DATA ───────────────────────────────────
const testimonials = [
  {
    initials: 'LC',
    name: 'Linda Chen',
    role: 'Individual User · Free Plan (Illustrative testimonial for demonstration purposes)',
    quote: 'I was looking for food assistance programs and ClearPath found me three resources I didn\'t even know existed. The confidence scores helped me trust the results.',
    color: 'bg-violet-100 text-violet-700',
    tier: 'Free',
  },
  {
    initials: 'JK',
    name: 'James Kim',
    role: 'Social Worker · Pro Plan (Illustrative testimonial for demonstration purposes)',
    quote: "Pro's saved history means I can follow up with clients across sessions. I don't have to re-explain their situation every time. It saves me at least 30 minutes per client.",
    color: 'bg-blue-100 text-blue-700',
    tier: 'Pro',
  },
  {
    initials: 'MR',
    name: 'Maria Rodriguez',
    role: 'Nonprofit Director · Pro Plan (Illustrative testimonial for demonstration purposes)',
    quote: 'The eligibility pre-check alone saves our team hours per week. We used to send people to programs they didn\'t qualify for — now we know upfront.',
    color: 'bg-emerald-100 text-emerald-700',
    tier: 'Pro',
  },
  {
    initials: 'DW',
    name: 'Dr. David Washington',
    role: 'Hospital Administrator · Enterprise (Illustrative testimonial for demonstration purposes)',
    quote: 'The API integration lets us embed ClearPath directly into our patient intake workflow. Our social workers don\'t have to switch tools anymore.',
    color: 'bg-amber-100 text-amber-700',
    tier: 'Enterprise',
  },
  {
    initials: 'PA',
    name: 'Patricia Adams',
    role: 'Government Agency · Enterprise (Illustrative testimonial for demonstration purposes)',
    quote: 'Having a white-labeled version means our constituents trust the tool immediately. It looks like our website, feels like our services.',
    color: 'bg-rose-100 text-rose-700',
    tier: 'Enterprise',
  },
  {
    initials: 'TN',
    name: 'Tyler Nguyen',
    role: 'Graduate Student · Free Plan (Illustrative testimonial for demonstration purposes)',
    quote: 'As a social work student, ClearPath AI helps me understand what resources exist in my community. The crisis detection feature gives me confidence that it\'s safe to recommend.',
    color: 'bg-cyan-100 text-cyan-700',
    tier: 'Free',
  },
]

// ─── ANIMATION VARIANTS ──────────────────────────────────
const fadeInUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] } },
}

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.12 } },
}

const staggerItem = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] } },
}

// ─── FEATURE SPOTLIGHT DATA ──────────────────────────────
const featureSpotlights = [
  {
    id: 'priority-speed',
    icon: Zap,
    title: 'Priority Speed',
    subtitle: '2x faster classifications when every second matters',
    color: '#3b82f6',
    proOnly: true,
    content: (
      <div className="space-y-4">
        <p className="text-[14px] text-gray-600 leading-relaxed">
          When someone is in crisis or urgently needs resources, waiting even a few extra seconds can feel like an eternity. Priority Speed moves your requests to the front of the classification queue.
        </p>
        <div className="glass-card rounded-2xl p-4 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-[12px] font-semibold text-gray-500 uppercase tracking-wider">Response Time Comparison</span>
          </div>
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <span className="text-[12px] font-medium text-gray-500 w-16 shrink-0">Free</span>
              <div className="flex-1 h-8 rounded-lg bg-gray-100 relative overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: '100%' }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.5, ease: 'easeOut' }}
                  className="h-full bg-gray-300 rounded-lg flex items-center justify-end pr-2"
                >
                  <span className="text-[10px] font-bold text-gray-600">~2.1s</span>
                </motion.div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-[12px] font-medium text-blue-600 w-16 shrink-0 font-bold">Pro</span>
              <div className="flex-1 h-8 rounded-lg bg-blue-50 relative overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: '50%' }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, ease: 'easeOut', delay: 0.3 }}
                  className="h-full bg-gradient-to-r from-blue-400 to-blue-500 rounded-lg flex items-center justify-end pr-2"
                >
                  <span className="text-[10px] font-bold text-white">~1.0s</span>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: 'saved-history',
    icon: Bookmark,
    title: 'Saved History',
    subtitle: 'Resume conversations and track resources over time',
    color: '#8b5cf6',
    proOnly: true,
    content: (
      <div className="space-y-4">
        <p className="text-[14px] text-gray-600 leading-relaxed">
          Never lose track of a resource again. Saved History lets you pick up where you left off, review past classifications, and track which resources you&apos;ve explored or applied to.
        </p>
        <div className="glass-card rounded-2xl p-4 space-y-2.5">
          <div className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-2">Your Recent Searches</div>
          <div className="flex items-center gap-3 p-2.5 rounded-xl bg-white/60 border border-gray-100/60">
            <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center shrink-0">
              <Layers className="w-4 h-4 text-blue-500" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[13px] font-semibold text-gray-900 truncate">Housing assistance near 30318</p>
              <p className="text-[11px] text-gray-400">3 results · 87% confidence · 2 hrs ago</p>
            </div>
            <ArrowRight className="w-4 h-4 text-gray-300 shrink-0" />
          </div>
          <div className="flex items-center gap-3 p-2.5 rounded-xl bg-white/60 border border-gray-100/60">
            <div className="w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center shrink-0">
              <Heart className="w-4 h-4 text-emerald-500" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[13px] font-semibold text-gray-900 truncate">Mental health counseling options</p>
              <p className="text-[11px] text-gray-400">5 results · 92% confidence · Yesterday</p>
            </div>
            <ArrowRight className="w-4 h-4 text-gray-300 shrink-0" />
          </div>
        </div>
      </div>
    ),
  },
  {
    id: 'advanced-clarification',
    icon: MessageSquare,
    title: 'Advanced Clarification',
    subtitle: 'Smarter follow-up questions for complex situations',
    color: '#10b981',
    proOnly: true,
    content: (
      <div className="space-y-4">
        <p className="text-[14px] text-gray-600 leading-relaxed">
          Real needs are rarely simple. Advanced Clarification goes deeper with multi-turn questioning that uncovers co-occurring needs, eligibility nuances, and the full picture of your situation.
        </p>
        <div className="glass-card rounded-2xl p-4 space-y-3">
          <div className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-1">Example Conversation</div>
          <div className="space-y-2">
            <div className="flex gap-2">
              <div className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center shrink-0 mt-0.5">
                <span className="text-[10px] font-bold text-gray-500">Y</span>
              </div>
              <div className="bg-white/80 rounded-2xl rounded-tl-sm p-3 border border-gray-100/60 max-w-[85%]">
                <p className="text-[12px] text-gray-700">&quot;I need help with rent&quot;</p>
              </div>
            </div>
            <div className="flex gap-2 justify-end">
              <div className="bg-emerald-50 rounded-2xl rounded-tr-sm p-3 border border-emerald-100/60 max-w-[85%]">
                <p className="text-[12px] text-emerald-800">I found 4 housing resources. Are you also looking for food assistance or utility help? Many rent assistance programs require proof of income — shall I pre-check your eligibility?</p>
              </div>
              <div className="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center shrink-0 mt-0.5">
                <Zap className="w-3 h-3 text-emerald-600" />
              </div>
            </div>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: 'eligibility-precheck',
    icon: FileCheck,
    title: 'Eligibility Pre-Check',
    subtitle: 'Know if you qualify before you apply',
    color: '#f59e0b',
    proOnly: true,
    content: (
      <div className="space-y-4">
        <p className="text-[14px] text-gray-600 leading-relaxed">
          Applying for programs you don&apos;t qualify for wastes time and adds frustration. Eligibility Pre-Check uses known program requirements to screen your situation before you start an application.
        </p>
        <div className="grid grid-cols-2 gap-3">
          <div className="glass-card rounded-2xl p-4 border-l-4 border-l-red-400">
            <div className="text-[11px] font-bold text-red-500 uppercase tracking-wider mb-2">Before</div>
            <p className="text-[12px] text-gray-500 leading-relaxed">Apply to 5 programs. Get rejected by 3. Weeks of waiting. Re-start the process.</p>
          </div>
          <div className="glass-card rounded-2xl p-4 border-l-4 border-l-emerald-400">
            <div className="text-[11px] font-bold text-emerald-500 uppercase tracking-wider mb-2">After</div>
            <p className="text-[12px] text-gray-500 leading-relaxed">Pre-check eligibility. Apply to 2 qualified programs. Higher acceptance rate. Faster results.</p>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: 'api-access',
    icon: Code2,
    title: 'API Access',
    subtitle: 'Integrate ClearPath AI into your existing workflows',
    color: '#6366f1',
    proOnly: false,
    enterpriseOnly: true,
    content: (
      <div className="space-y-4">
        <p className="text-[14px] text-gray-600 leading-relaxed">
          Build resource navigation directly into your intake forms, patient portals, or community platforms. Our RESTful API returns structured classification results with confidence scores.
        </p>
        <div className="bg-gray-900 rounded-2xl p-4 font-mono text-[11px] leading-relaxed overflow-x-auto">
          <div className="text-gray-500">{'// Classify a resource need'}</div>
          <div className="text-emerald-400">const</div>
          <span className="text-white"> response </span>
          <span className="text-emerald-400">= await</span>
          <span className="text-amber-300"> fetch</span>
          <span className="text-gray-300">{'('}</span>
          <span className="text-emerald-300">&apos;http://localhost:3000/api/classify&apos;</span>
          <span className="text-gray-300">{', {'}</span>
          <br />
          <span className="text-gray-300">{'  '}</span>
          <span className="text-blue-300">method</span>
          <span className="text-gray-300">: </span>
          <span className="text-emerald-300">&apos;POST&apos;</span>
          <span className="text-gray-300">,</span>
          <br />
          <span className="text-gray-300">{'  '}</span>
          <span className="text-blue-300">headers</span>
          <span className="text-gray-300">: {'{'} </span>
          <span className="text-emerald-300">&apos;Authorization&apos;</span>
          <span className="text-gray-300">: </span>
          <span className="text-emerald-300">&apos;Bearer YOUR_API_KEY&apos;</span>
          <span className="text-gray-300"> {'}'},</span>
          <br />
          <span className="text-gray-300">{'  '}</span>
          <span className="text-blue-300">body</span>
          <span className="text-gray-300">: </span>
          <span className="text-amber-300">JSON</span>
          <span className="text-gray-300">.</span>
          <span className="text-amber-300">stringify</span>
          <span className="text-gray-300">({'{'}</span>
          <br />
          <span className="text-gray-300">{'    '}</span>
          <span className="text-blue-300">query</span>
          <span className="text-gray-300">: </span>
          <span className="text-emerald-300">&apos;need help with rent&apos;</span>
          <span className="text-gray-300">,</span>
          <br />
          <span className="text-gray-300">{'    '}</span>
          <span className="text-blue-300">location</span>
          <span className="text-gray-300">: </span>
          <span className="text-emerald-300">&apos;30318&apos;</span>
          <br />
          <span className="text-gray-300">{`  })`}</span>
          <br />
          <span className="text-gray-300">{');'}</span>
          <br />
          <br />
          <span className="text-gray-500">{`// { classification: "Housing", confidence: 0.87 }`}</span>
        </div>
      </div>
    ),
  },
  {
    id: 'white-label',
    icon: Palette,
    title: 'White-Label Options',
    subtitle: 'Your brand, your domain, your community',
    color: '#ec4899',
    proOnly: false,
    enterpriseOnly: true,
    content: (
      <div className="space-y-4">
        <p className="text-[14px] text-gray-600 leading-relaxed">
          Deploy ClearPath AI under your own brand with full customization. Your constituents interact with a tool that looks and feels like it was built by your organization.
        </p>
        <div className="glass-card rounded-2xl p-4 space-y-3">
          <div className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider">Customization Preview</div>
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-2">
              {[
                { label: 'Logo & Favicon', status: '✓' },
                { label: 'Brand Colors', status: '✓' },
                { label: 'Custom Domain', status: '✓' },
              ].map((item) => (
                <div key={item.label} className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-500" />
                  <span className="text-[12px] text-gray-600">{item.label}</span>
                </div>
              ))}
            </div>
            <div className="space-y-2">
              {[
                { label: 'Custom Onboarding', status: '✓' },
                { label: 'Tailored Categories', status: '✓' },
                { label: 'Email Templates', status: '✓' },
              ].map((item) => (
                <div key={item.label} className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-500" />
                  <span className="text-[12px] text-gray-600">{item.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    ),
  },
]

// ─── FAQ ITEM ────────────────────────────────────────────
function FAQItem({ question, answer, index }: { question: string; answer: string; index: number }) {
  const [open, setOpen] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-20px' }}
      transition={{ duration: 0.4, delay: index * 0.06 }}
      className="glass-card rounded-2xl shadow-premium overflow-hidden"
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between p-6 text-left hover:bg-white/40 transition-colors"
        aria-expanded={open}
      >
        <span className="text-[15px] font-semibold text-gray-900 pr-4">{question}</span>
        <motion.div
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.25, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="shrink-0"
        >
          <ChevronDown className="w-5 h-5 text-gray-400" />
        </motion.div>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <div className="px-6 pb-6 pt-0">
              <div className="border-t border-gray-100/60 pt-4">
                <p className="text-[14px] text-gray-500 leading-relaxed">{answer}</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

// ─── TOOLTIP INFO COMPONENT ──────────────────────────────
function InfoTooltip({ text }: { text: string }) {
  const [show, setShow] = useState(false)
  return (
    <span className="relative inline-flex ml-1" onMouseEnter={() => setShow(true)} onMouseLeave={() => setShow(false)}>
      <Info className="w-3.5 h-3.5 text-gray-300 cursor-help" />
      <AnimatePresence>
        {show && (
          <motion.div
            initial={{ opacity: 0, y: 4, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 4, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-56 p-3 rounded-xl bg-gray-900 text-white text-[11px] leading-relaxed shadow-xl z-50 pointer-events-none"
          >
            {text}
            <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-px w-2 h-2 bg-gray-900 rotate-45" />
          </motion.div>
        )}
      </AnimatePresence>
    </span>
  )
}

// ─── PRICING PAGE ────────────────────────────────────────
export default function PricingPage() {
  const [isAnnual, setIsAnnual] = useState(false)
  const [activeSpotlight, setActiveSpotlight] = useState<string | null>(null)

  return (
    <div className="min-h-screen flex flex-col mesh-gradient-bg">
      <Navbar />

      {/* ═══════════ EXPANDED HERO ═══════════ */}
      <section className="pt-28 pb-8 md:pt-36 md:pb-12 relative overflow-hidden">
        {/* Decorative background orbs */}
        <div
          className="absolute top-20 -left-40 w-80 h-80 rounded-full opacity-[0.04] pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(59,130,246,0.4), transparent 60%)' }}
        />
        <div
          className="absolute bottom-0 -right-40 w-96 h-96 rounded-full opacity-[0.03] pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(16,185,129,0.4), transparent 60%)' }}
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-[12px] font-semibold bg-emerald-50/80 text-emerald-700 border border-emerald-100/60 backdrop-blur-sm">
              <Star className="w-3.5 h-3.5" />
              Simple, transparent pricing
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-gray-900 mt-6 leading-[1.1]"
          >
            The right help, at the{' '}
            <span className="bg-gradient-to-r from-blue-600 via-emerald-500 to-blue-600 bg-clip-text text-transparent gradient-text-animate bg-[length:200%_200%]">
              right price.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-lg sm:text-xl text-gray-500 mt-6 max-w-2xl mx-auto leading-relaxed"
          >
            Start free forever. Upgrade when you need more speed, history, and advanced features.
            <span className="font-semibold text-gray-700"> Crisis detection is always on.</span>
          </motion.p>

          {/* Trust Badges Row */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.45 }}
            className="flex flex-wrap items-center justify-center gap-3 mt-8"
          >
            {[
              { icon: Shield, text: 'Crisis detection always on', color: '#ef4444' },
              { icon: Lock, text: 'Privacy by design', color: '#3b82f6' },
              { icon: BadgeCheck, text: 'No credit card required', color: '#10b981' },
              { icon: Heart, text: 'Free forever', color: '#f59e0b' },
            ].map((badge) => {
              const BIcon = badge.icon
              return (
                <div
                  key={badge.text}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/60 border border-gray-100/60 backdrop-blur-sm"
                >
                  <BIcon className="w-3.5 h-3.5" style={{ color: badge.color }} />
                  <span className="text-[11px] font-semibold text-gray-600">{badge.text}</span>
                </div>
              )
            })}
          </motion.div>
        </div>
      </section>

      {/* ═══════════ BILLING TOGGLE + PRICING CARDS ═══════════ */}
      <section className="py-8 md:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Billing Toggle */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex items-center justify-center gap-4 mb-10"
          >
            <span
              className={`text-[14px] font-semibold transition-colors duration-300 ${
                !isAnnual ? 'text-gray-900' : 'text-gray-400'
              }`}
            >
              Monthly
            </span>
            <button
              onClick={() => setIsAnnual(!isAnnual)}
              className="relative w-14 h-7 rounded-full transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-400/50 focus:ring-offset-2 focus:ring-offset-transparent"
              style={{
                backgroundColor: isAnnual ? '#10b981' : '#e5e7eb',
              }}
              aria-label={`Switch to ${isAnnual ? 'monthly' : 'annual'} billing`}
              role="switch"
              aria-checked={isAnnual}
            >
              <motion.div
                className="absolute top-0.5 left-0.5 w-6 h-6 bg-white rounded-full shadow-md"
                animate={{ x: isAnnual ? 28 : 0 }}
                transition={{ type: 'spring', stiffness: 500, damping: 30 }}
              />
            </button>
            <span
              className={`text-[14px] font-semibold transition-colors duration-300 ${
                isAnnual ? 'text-gray-900' : 'text-gray-400'
              }`}
            >
              Annual
            </span>
            <AnimatePresence>
              {isAnnual && (
                <motion.span
                  initial={{ opacity: 0, scale: 0.8, x: -8 }}
                  animate={{ opacity: 1, scale: 1, x: 0 }}
                  exit={{ opacity: 0, scale: 0.8, x: -8 }}
                  transition={{ duration: 0.25 }}
                  className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-[11px] font-bold bg-emerald-50 text-emerald-600 border border-emerald-200/60"
                >
                  <Sparkles className="w-3 h-3" />
                  Save 25%
                </motion.span>
              )}
            </AnimatePresence>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            variants={staggerContainer}
            className="grid lg:grid-cols-3 gap-6 lg:gap-8 items-start max-w-6xl mx-auto"
          >
            {tiersBase.map((tier, i) => {
              const Icon = tier.icon
              const isPro = tier.scale
              const displayPrice = isAnnual ? tier.priceAnnual : tier.priceMonthly

              return (
                <motion.div
                  key={tier.name}
                  variants={staggerItem}
                  className={`relative ${isPro ? 'lg:-mt-4 lg:mb-4' : ''}`}
                >
                  {/* Pro card glow effect */}
                  {isPro && (
                    <div
                      className="absolute -inset-px rounded-3xl opacity-40 pointer-events-none"
                      style={{
                        background: 'linear-gradient(135deg, rgba(59,130,246,0.15), rgba(16,185,129,0.1), rgba(59,130,246,0.08))',
                      }}
                    />
                  )}

                  <div
                    className={`relative glass-card rounded-3xl p-8 overflow-hidden transition-all duration-300 ${
                      isPro
                        ? `shadow-premium-xl ${tier.borderColor}`
                        : 'shadow-premium hover:shadow-premium-lg'
                    }`}
                  >
                    {/* Pro gradient accent top */}
                    {isPro && (
                      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-emerald-400 to-blue-500" />
                    )}

                    {/* Enterprise gradient accent */}
                    {tier.name === 'Enterprise' && (
                      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-gray-300 via-gray-400 to-gray-300" />
                    )}

                    {/* Background glow */}
                    {isPro && (
                      <div
                        className="absolute -top-24 -right-24 w-48 h-48 rounded-full opacity-20 pointer-events-none"
                        style={{
                          background: 'radial-gradient(circle, rgba(59,130,246,0.3), transparent 70%)',
                        }}
                      />
                    )}

                    {/* "Most Popular" animated badge for Pro */}
                    {isPro && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        className="absolute -top-0 right-6"
                      >
                        <div className="bg-gradient-to-r from-blue-600 to-emerald-500 text-white text-[9px] font-bold uppercase tracking-wider px-3 py-1 rounded-b-lg shadow-lg">
                          <Crown className="w-3 h-3 inline mr-1" />
                          Most Popular
                        </div>
                      </motion.div>
                    )}

                    <div className="relative z-10 space-y-6">
                      {/* Badge + Icon row */}
                      <div className="flex items-center justify-between">
                        <div className={`w-11 h-11 rounded-xl ${tier.iconBg} flex items-center justify-center`}>
                          <Icon className={`w-5 h-5 ${tier.iconColor}`} />
                        </div>
                        <span
                          className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold border backdrop-blur-sm ${tier.badgeColor}`}
                        >
                          {tier.name === 'Pro' && <Crown className="w-3 h-3" />}
                          {tier.name === 'Enterprise' && <Globe className="w-3 h-3" />}
                          {tier.badge}
                        </span>
                      </div>

                      {/* Tier name */}
                      <div>
                        <h3 className="text-xl font-bold text-gray-900 tracking-tight">{tier.name}</h3>
                        <p className="text-[14px] text-gray-500 mt-1.5 leading-relaxed">{tier.description}</p>
                      </div>

                      {/* Price */}
                      <div className="flex items-baseline gap-1 h-[60px]">
                        {displayPrice !== 'Custom' ? (
                          <AnimatePresence mode="wait">
                            <motion.span
                              key={displayPrice}
                              initial={{ opacity: 0, y: 10, filter: 'blur(4px)' }}
                              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                              exit={{ opacity: 0, y: -10, filter: 'blur(4px)' }}
                              transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
                              className="text-5xl font-extrabold bg-gradient-to-r from-blue-600 via-emerald-500 to-blue-600 bg-clip-text text-transparent gradient-text-animate bg-[length:200%_200%]"
                            >
                              {displayPrice}
                            </motion.span>
                          </AnimatePresence>
                        ) : (
                          <span className="text-5xl font-extrabold bg-gradient-to-r from-gray-500 via-gray-600 to-gray-500 bg-clip-text text-transparent gradient-text-animate bg-[length:200%_200%]">
                            Custom
                          </span>
                        )}
                        {tier.period && (
                          <span className="text-[15px] text-gray-400 font-medium">{tier.period}</span>
                        )}
                        {isAnnual && tier.name === 'Pro' && (
                          <motion.span
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="text-[12px] text-gray-400 font-medium line-through ml-1"
                          >
                            $12
                          </motion.span>
                        )}
                      </div>

                      {/* CTA Button */}
                      <Link
                        href={tier.ctaDisabled ? '#' : tier.name === 'Enterprise' ? '/about' : '/app'}
                        className={`block w-full text-center px-6 py-3.5 rounded-2xl text-[14px] font-semibold transition-all active:scale-[0.97] ${
                          tier.ctaVariant === 'disabled'
                            ? 'bg-gray-100 text-gray-400 cursor-not-allowed border border-gray-200/60'
                            : tier.ctaVariant === 'primary'
                            ? 'bg-gradient-to-b from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/30'
                            : 'bg-gray-900 hover:bg-gray-800 text-white shadow-md shadow-gray-900/20 hover:shadow-lg hover:shadow-gray-900/30'
                        }`}
                        onClick={(e) => tier.ctaDisabled && e.preventDefault()}
                        aria-disabled={tier.ctaDisabled}
                      >
                        <span className="flex items-center justify-center gap-2">
                          {tier.cta}
                          {!tier.ctaDisabled && <ArrowRight className="w-4 h-4" />}
                        </span>
                      </Link>

                      {/* Divider */}
                      <div className="border-t border-gray-100/60" />

                      {/* Features list with descriptions and tooltips */}
                      <div className="space-y-3.5">
                        {tier.features.map((feature) => (
                          <div key={feature.text} className="flex items-start gap-3">
                            {feature.included ? (
                              <div className="w-5 h-5 rounded-full bg-emerald-50 flex items-center justify-center shrink-0 mt-0.5">
                                <Check className="w-3 h-3 text-emerald-600" strokeWidth={3} />
                              </div>
                            ) : (
                              <div className="w-5 h-5 rounded-full bg-gray-50 flex items-center justify-center shrink-0 mt-0.5">
                                <span className="text-[10px] text-gray-300 font-bold">—</span>
                              </div>
                            )}
                            <span
                              className={`text-[13px] leading-snug ${
                                feature.included ? 'text-gray-700' : 'text-gray-400'
                              }`}
                            >
                              {feature.text}
                              {feature.included && feature.desc && (
                                <InfoTooltip text={feature.desc} />
                              )}
                            </span>
                          </div>
                        ))}
                      </div>

                      {/* What's included summary */}
                      <div className="bg-gray-50/60 rounded-xl p-3 text-center">
                        <span className="text-[12px] font-semibold text-gray-500">{tier.summary}</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </motion.div>
        </div>
      </section>

      {/* ═══════════ WHY WE'RE FREE SECTION ═══════════ */}
      <section className="py-16 md:py-24 bg-white/40">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-[12px] font-semibold bg-emerald-50/80 text-emerald-700 border border-emerald-100/60 backdrop-blur-sm">
              <Heart className="w-3.5 h-3.5" />
              Our commitment
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-gray-900 mt-6">
              Why we&apos;re{' '}
              <span className="bg-gradient-to-r from-blue-600 via-emerald-500 to-blue-600 bg-clip-text text-transparent gradient-text-animate bg-[length:200%_200%]">
                free
              </span>
            </h2>
            <p className="text-[16px] text-gray-500 mt-4 max-w-2xl mx-auto leading-relaxed">
              Access to community resources shouldn&apos;t require a credit card. That&apos;s not a temporary promotion — it&apos;s our architecture.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: Heart,
                title: 'Our Mission',
                desc: 'ClearPath AI exists to make community resources accessible to everyone. When someone needs housing, food, or crisis support, the last thing they should face is a paywall. Our free tier is the product, not the sample.',
                color: '#ef4444',
                bg: 'rgba(239,68,68,0.06)',
              },
              {
                icon: TrendingDown,
                title: 'How We Sustain It',
                desc: 'Pro and Enterprise subscriptions fund the free tier. Power users and organizations pay for advanced features — priority speed, saved history, API access — while the core experience remains free for everyone who needs it.',
                color: '#3b82f6',
                bg: 'rgba(59,130,246,0.06)',
              },
              {
                icon: Shield,
                title: 'Free Forever, Not Free For Now',
                desc: 'This isn\'t a trial or a freemium upsell. The free tier will always include unlimited searches, crisis detection, confidence scores, and 211 navigator access. We will never move core features behind a paywall.',
                color: '#10b981',
                bg: 'rgba(16,185,129,0.06)',
              },
            ].map((item, i) => {
              const FIcon = item.icon
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.12 }}
                  className="glass-card rounded-3xl p-8 shadow-premium hover:shadow-premium-lg transition-shadow duration-300"
                >
                  <div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6"
                    style={{ backgroundColor: item.bg }}
                  >
                    <FIcon className="w-6 h-6" style={{ color: item.color }} />
                  </div>
                  <h3 className="text-[17px] font-bold text-gray-900 tracking-tight mb-3">{item.title}</h3>
                  <p className="text-[14px] text-gray-500 leading-relaxed">{item.desc}</p>
                </motion.div>
              )
            })}
          </div>

          {/* Commitment banner */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mt-10 glass-card rounded-2xl p-6 text-center border-l-4 border-l-emerald-400"
          >
            <p className="text-[15px] font-semibold text-gray-800">
              &ldquo;Free forever, not free for now&rdquo; is not a marketing slogan. It&apos;s architectural.
            </p>
            <p className="text-[13px] text-gray-500 mt-1">
              Crisis detection and unlimited searches are hardcoded into our system — they can&apos;t be turned off, even if we wanted to.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ═══════════ FEATURE SPOTLIGHT SECTIONS ═══════════ */}
      <section className="py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-gray-900">
              Feature{' '}
              <span className="bg-gradient-to-r from-blue-600 via-emerald-500 to-blue-600 bg-clip-text text-transparent gradient-text-animate bg-[length:200%_200%]">
                spotlights
              </span>
            </h2>
            <p className="text-[16px] text-gray-500 mt-4 max-w-2xl mx-auto leading-relaxed">
              A deeper look at what makes Pro and Enterprise worth the upgrade.
            </p>
          </motion.div>

          <div className="space-y-6">
            {featureSpotlights.map((spotlight, i) => {
              const SIcon = spotlight.icon
              const isActive = activeSpotlight === spotlight.id
              return (
                <motion.div
                  key={spotlight.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                  className="glass-card rounded-3xl shadow-premium overflow-hidden"
                >
                  <button
                    onClick={() => setActiveSpotlight(isActive ? null : spotlight.id)}
                    className="w-full flex items-center justify-between p-6 md:p-8 text-left hover:bg-white/30 transition-colors"
                    aria-expanded={isActive}
                  >
                    <div className="flex items-center gap-4">
                      <div
                        className="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0"
                        style={{ backgroundColor: `${spotlight.color}10` }}
                      >
                        <SIcon className="w-5 h-5" style={{ color: spotlight.color }} />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="text-[17px] font-bold text-gray-900 tracking-tight">{spotlight.title}</h3>
                          {spotlight.proOnly && (
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-50 text-blue-600 border border-blue-100/60">
                              <Crown className="w-2.5 h-2.5" /> Pro
                            </span>
                          )}
                          {spotlight.enterpriseOnly && (
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-gray-100 text-gray-600 border border-gray-200/60">
                              <Globe className="w-2.5 h-2.5" /> Enterprise
                            </span>
                          )}
                        </div>
                        <p className="text-[14px] text-gray-500 mt-0.5">{spotlight.subtitle}</p>
                      </div>
                    </div>
                    <motion.div
                      animate={{ rotate: isActive ? 180 : 0 }}
                      transition={{ duration: 0.25 }}
                      className="shrink-0 ml-4"
                    >
                      <ChevronDown className="w-5 h-5 text-gray-400" />
                    </motion.div>
                  </button>
                  <AnimatePresence initial={false}>
                    {isActive && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
                      >
                        <div className="px-6 md:px-8 pb-6 md:pb-8 pt-0">
                          <div className="border-t border-gray-100/60 pt-6">
                            {spotlight.content}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ═══════════ ROI CALCULATOR SECTION ═══════════ */}
      <section className="py-16 md:py-24 bg-white/40">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-[12px] font-semibold bg-amber-50/80 text-amber-700 border border-amber-100/60 backdrop-blur-sm">
              <Calculator className="w-3.5 h-3.5" />
              ROI Calculator
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-gray-900 mt-6">
              How much time does your team spend{' '}
              <span className="bg-gradient-to-r from-blue-600 via-emerald-500 to-blue-600 bg-clip-text text-transparent gradient-text-animate bg-[length:200%_200%]">
                finding resources?
              </span>
            </h2>
            <p className="text-[16px] text-gray-500 mt-4 max-w-xl mx-auto">
              See the estimated time and cost savings with ClearPath AI.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="glass-card rounded-3xl p-8 md:p-12 shadow-premium"
          >
            {/* Comparison: Manual vs ClearPath */}
            <div className="grid md:grid-cols-2 gap-8 mb-10">
              <div className="space-y-6">
                <div className="text-center">
                  <h3 className="text-[17px] font-bold text-gray-900">Manual Search</h3>
                  <p className="text-[13px] text-gray-500 mt-1">Without ClearPath AI</p>
                </div>
                <div className="space-y-4">
                  {[
                    { label: 'Avg time per search', value: '45 min', icon: Timer },
                    { label: 'Resources found per search', value: '2-3', icon: Layers },
                    { label: 'Eligibility match rate', value: '~40%', icon: FileCheck },
                    { label: 'Weekly hours per social worker', value: '12+ hrs', icon: Clock },
                  ].map((item) => {
                    const MIcon = item.icon
                    return (
                      <div key={item.label} className="flex items-center gap-3 p-3 rounded-xl bg-red-50/50 border border-red-100/40">
                        <MIcon className="w-4 h-4 text-red-400 shrink-0" />
                        <span className="text-[13px] text-gray-600 flex-1">{item.label}</span>
                        <span className="text-[14px] font-bold text-red-600">{item.value}</span>
                      </div>
                    )
                  })}
                </div>
              </div>

              <div className="space-y-6">
                <div className="text-center">
                  <h3 className="text-[17px] font-bold text-gray-900">With ClearPath AI</h3>
                  <p className="text-[13px] text-gray-500 mt-1">Pro or Enterprise plan</p>
                </div>
                <div className="space-y-4">
                  {[
                    { label: 'Avg time per search', value: '~2 min', icon: Timer },
                    { label: 'Resources found per search', value: '5-8', icon: Layers },
                    { label: 'Eligibility match rate', value: '~85%', icon: FileCheck },
                    { label: 'Weekly hours per social worker', value: '2 hrs', icon: Clock },
                  ].map((item) => {
                    const MIcon = item.icon
                    return (
                      <div key={item.label} className="flex items-center gap-3 p-3 rounded-xl bg-emerald-50/50 border border-emerald-100/40">
                        <MIcon className="w-4 h-4 text-emerald-500 shrink-0" />
                        <span className="text-[13px] text-gray-600 flex-1">{item.label}</span>
                        <span className="text-[14px] font-bold text-emerald-600">{item.value}</span>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>

            {/* Savings highlight */}
            <div className="bg-gradient-to-r from-blue-50 via-emerald-50 to-blue-50 rounded-2xl p-6 text-center border border-blue-100/40">
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8">
                {[
                  { value: '87%', label: 'Time saved per search' },
                  { value: '3x', label: 'More resources found' },
                  { value: '~$4,200', label: 'Saved per worker/year' },
                ].map((stat) => (
                  <div key={stat.label} className="text-center">
                    <div className="text-2xl sm:text-3xl font-extrabold bg-gradient-to-r from-blue-600 via-emerald-500 to-blue-600 bg-clip-text text-transparent gradient-text-animate bg-[length:200%_200%]">
                      {stat.value}
                    </div>
                    <div className="text-[12px] font-semibold text-gray-500 mt-1">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══════════ EXPANDED COMPARISON TABLE ═══════════ */}
      <section className="py-16 md:py-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.6 }}
          >
            <div className="text-center mb-10">
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-gray-900">
                Compare every feature
              </h2>
              <p className="text-[16px] text-gray-500 mt-3 max-w-xl mx-auto">
                A detailed breakdown of what&apos;s included in each plan.
              </p>
            </div>

            <div className="glass-card rounded-3xl shadow-premium overflow-hidden">
              {/* Table Header */}
              <div className="grid grid-cols-4 gap-0 border-b border-gray-100/60 bg-white/60">
                <div className="p-5 md:p-6">
                  <span className="text-[13px] font-semibold text-gray-400 uppercase tracking-wider">Features</span>
                </div>
                <div className="p-5 md:p-6 text-center">
                  <span className="text-[14px] font-bold text-gray-900">Free</span>
                </div>
                <div className="p-5 md:p-6 text-center relative">
                  <span className="text-[14px] font-bold text-blue-600">Pro</span>
                  <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500 via-emerald-400 to-blue-500" />
                </div>
                <div className="p-5 md:p-6 text-center">
                  <span className="text-[14px] font-bold text-gray-900">Enterprise</span>
                </div>
              </div>

              {/* Table Body */}
              {comparisonSections.map((section, sIdx) => (
                <motion.div
                  key={section.title}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: sIdx * 0.1 }}
                >
                  {/* Section Header */}
                  <div className="grid grid-cols-4 gap-0 bg-gray-50/80 border-b border-gray-100/40">
                    <div className="col-span-4 px-5 md:px-6 py-3">
                      <span className="text-[12px] font-bold text-gray-500 uppercase tracking-wider">
                        {section.title}
                      </span>
                    </div>
                  </div>

                  {/* Section Rows */}
                  {section.rows.map((row, rIdx) => (
                    <div
                      key={row.feature}
                      className={`grid grid-cols-4 gap-0 border-b border-gray-50/80 hover:bg-white/60 transition-colors ${
                        rIdx === section.rows.length - 1 ? 'border-b-0' : ''
                      }`}
                    >
                      <div className="p-4 md:p-5 flex items-center">
                        <span className="text-[13px] font-medium text-gray-700">{row.feature}</span>
                      </div>
                      <div className="p-4 md:p-5 flex items-center justify-center">
                        {row.free === '✓' ? (
                          <div className="w-5 h-5 rounded-full bg-emerald-50 flex items-center justify-center">
                            <Check className="w-3 h-3 text-emerald-600" strokeWidth={3} />
                          </div>
                        ) : row.free === '—' ? (
                          <span className="text-[14px] text-gray-300">—</span>
                        ) : (
                          <span className="text-[13px] font-medium text-gray-600">{row.free}</span>
                        )}
                      </div>
                      <div className="p-4 md:p-5 flex items-center justify-center bg-blue-50/20">
                        {row.pro === '✓' ? (
                          <div className="w-5 h-5 rounded-full bg-emerald-50 flex items-center justify-center">
                            <Check className="w-3 h-3 text-emerald-600" strokeWidth={3} />
                          </div>
                        ) : row.pro === '—' ? (
                          <span className="text-[14px] text-gray-300">—</span>
                        ) : (
                          <span className="text-[13px] font-medium text-gray-600">{row.pro}</span>
                        )}
                      </div>
                      <div className="p-4 md:p-5 flex items-center justify-center">
                        {row.enterprise === '✓' ? (
                          <div className="w-5 h-5 rounded-full bg-emerald-50 flex items-center justify-center">
                            <Check className="w-3 h-3 text-emerald-600" strokeWidth={3} />
                          </div>
                        ) : row.enterprise === '—' ? (
                          <span className="text-[14px] text-gray-300">—</span>
                        ) : (
                          <span className="text-[13px] font-medium text-gray-600">{row.enterprise}</span>
                        )}
                      </div>
                    </div>
                  ))}
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══════════ TESTIMONIALS ═══════════ */}
      <section className="py-16 md:py-24 bg-white/40">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-gray-900">
              Trusted by people who{' '}
              <span className="bg-gradient-to-r from-blue-600 via-emerald-500 to-blue-600 bg-clip-text text-transparent gradient-text-animate bg-[length:200%_200%]">
                make a difference
              </span>
            </h2>
            <p className="text-[16px] text-gray-500 mt-3 max-w-xl mx-auto">
              Hear from the individuals, social workers, and organizations using ClearPath AI.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.map((testimonial, i) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="glass-card rounded-3xl p-6 md:p-8 shadow-premium hover:shadow-premium-lg transition-shadow duration-300 relative overflow-hidden"
              >
                {/* Decorative quote */}
                <div className="absolute top-4 right-4 opacity-[0.06] pointer-events-none">
                  <Quote className="w-16 h-16" />
                </div>

                <div className="relative z-10 space-y-5">
                  {/* Tier badge */}
                  <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold ${
                    testimonial.tier === 'Enterprise'
                      ? 'bg-gray-100 text-gray-600 border border-gray-200/60'
                      : testimonial.tier === 'Pro'
                      ? 'bg-blue-50 text-blue-600 border border-blue-100/60'
                      : 'bg-emerald-50 text-emerald-600 border border-emerald-100/60'
                  }`}>
                    {testimonial.tier} Plan
                  </span>

                  {/* Quote text */}
                  <p className="text-[15px] text-gray-700 leading-relaxed font-medium">
                    &ldquo;{testimonial.quote}&rdquo;
                  </p>

                  {/* Divider */}
                  <div className="border-t border-gray-100/60" />

                  {/* Author */}
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-10 h-10 rounded-full ${testimonial.color} flex items-center justify-center shrink-0`}
                    >
                      <span className="text-[12px] font-bold">{testimonial.initials}</span>
                    </div>
                    <div>
                      <p className="text-[14px] font-semibold text-gray-900 tracking-tight">
                        {testimonial.name}
                      </p>
                      <p className="text-[12px] text-gray-500">{testimonial.role}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ NONPROFIT DISCOUNT SECTION ═══════════ */}
      <section className="py-16 md:py-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.6 }}
            className="glass-card rounded-3xl shadow-premium-lg overflow-hidden relative"
          >
            {/* Top accent bar */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-400 via-blue-400 to-emerald-400" />

            {/* Background accent */}
            <div
              className="absolute -bottom-20 -right-20 w-80 h-80 rounded-full opacity-[0.06] pointer-events-none"
              style={{ background: 'radial-gradient(circle, rgba(16,185,129,0.4), transparent 60%)' }}
            />

            <div className="relative z-10 p-8 md:p-12">
              <div className="flex flex-col md:flex-row items-start gap-8">
                <div className="flex-1 space-y-6">
                  <div>
                    <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-[12px] font-semibold bg-emerald-50/80 text-emerald-700 border border-emerald-100/60 backdrop-blur-sm">
                      <Gift className="w-3.5 h-3.5" />
                      Nonprofit Discount
                    </span>
                  </div>

                  <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-gray-900">
                    50% off Pro for{' '}
                    <span className="bg-gradient-to-r from-blue-600 via-emerald-500 to-blue-600 bg-clip-text text-transparent gradient-text-animate bg-[length:200%_200%]">
                      verified nonprofits
                    </span>
                  </h2>

                  <p className="text-[15px] text-gray-500 leading-relaxed">
                    We believe in supporting the people who support communities. If your organization is a registered 501(c)(3) nonprofit, you qualify for half-price Pro access — just $6/month or $54/year.
                  </p>

                  <div className="space-y-3">
                    {[
                      '50% discount on Pro monthly or annual billing',
                      'Special Enterprise pricing for large nonprofits',
                      'Dedicated onboarding support for nonprofit teams',
                      'Priority feature requests from nonprofit users',
                    ].map((item) => (
                      <div key={item} className="flex items-center gap-2.5">
                        <div className="w-5 h-5 rounded-full bg-emerald-50 flex items-center justify-center shrink-0">
                          <Check className="w-3 h-3 text-emerald-600" strokeWidth={3} />
                        </div>
                        <span className="text-[14px] text-gray-600">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="w-full md:w-80 space-y-4">
                  {/* Success story mini-card */}
                  <div className="bg-emerald-50/60 rounded-2xl p-5 border border-emerald-100/60">
                    <div className="flex items-center gap-2 mb-3">
                      <HandHeart className="w-4 h-4 text-emerald-600" />
                      <span className="text-[12px] font-bold text-emerald-700 uppercase tracking-wider">Success Story</span>
                    </div>
                    <p className="text-[13px] text-gray-600 leading-relaxed italic">
                      &ldquo;With the nonprofit discount, our entire team of 12 social workers uses Pro for less than a single generic AI subscription. ClearPath pays for itself in time saved on the very first case.&rdquo;
                    </p>
                    <div className="flex items-center gap-2 mt-3">
                      <div className="w-7 h-7 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center">
                        <span className="text-[10px] font-bold">MR</span>
                      </div>
                      <div>
                        <p className="text-[12px] font-semibold text-gray-900">Maria Rodriguez</p>
                        <p className="text-[10px] text-gray-500">Community Housing Alliance</p>
                      </div>
                    </div>
                  </div>

                  {/* Apply CTA */}
                  <div className="glass-card rounded-2xl p-5 space-y-4">
                    <h4 className="text-[14px] font-bold text-gray-900">Apply for nonprofit pricing</h4>
                    <p className="text-[12px] text-gray-500">Provide your organization&apos;s EIN and website. We verify within 24 hours.</p>
                    <Link
                      href="/about"
                      className="block w-full text-center px-5 py-3 rounded-xl text-[13px] font-semibold bg-gradient-to-b from-emerald-600 to-emerald-700 hover:from-emerald-500 hover:to-emerald-600 text-white shadow-md shadow-emerald-500/20 hover:shadow-lg hover:shadow-emerald-500/30 transition-all active:scale-[0.97]"
                    >
                      <span className="flex items-center justify-center gap-2">
                        Apply Now
                        <ArrowRight className="w-4 h-4" />
                      </span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══════════ ENTERPRISE CUSTOM SECTION ═══════════ */}
      <section className="py-16 md:py-24 bg-white/40">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-[12px] font-semibold bg-gray-100/80 text-gray-600 border border-gray-200/60 backdrop-blur-sm">
              <Building2 className="w-3.5 h-3.5" />
              Enterprise
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-gray-900 mt-6">
              Built for{' '}
              <span className="bg-gradient-to-r from-gray-600 via-gray-800 to-gray-600 bg-clip-text text-transparent gradient-text-animate bg-[length:200%_200%]">
                organizations
              </span>
            </h2>
            <p className="text-[16px] text-gray-500 mt-4 max-w-xl mx-auto">
              Custom integrations, dedicated support, and enterprise-grade reliability.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
            {[
              {
                icon: Code2,
                title: 'Custom Integrations',
                desc: 'API access with webhooks, SSO/SAML authentication, and custom data imports. We work with your existing tech stack — EHRs, CRMs, and case management systems.',
                color: '#6366f1',
              },
              {
                icon: Users,
                title: 'Dedicated Support',
                desc: 'A named account manager who understands your organization. Priority email and phone support with 4-hour response SLA. Quarterly business reviews and custom training.',
                color: '#3b82f6',
              },
              {
                icon: Shield,
                title: 'SLA Guarantees',
                desc: '99.9% uptime SLA with service credits. Priority incident response with root cause analysis. Scheduled maintenance windows and advance notifications.',
                color: '#10b981',
              },
              {
                icon: Fingerprint,
                title: 'Security Certifications',
                desc: 'SOC 2 Type II compliance roadmap. Data processing agreements available. Annual security assessments and penetration testing. GDPR and CCPA compliant architecture.',
                color: '#f59e0b',
              },
              {
                icon: Server,
                title: 'Dedicated Infrastructure',
                desc: 'Isolated compute environments for sensitive workloads. Custom retention policies and data residency options. On-premise deployment available for government agencies.',
                color: '#ec4899',
              },
              {
                icon: Eye,
                title: 'Audit & Compliance',
                desc: 'Comprehensive audit logs for all classifications. Conversation-level tracking with confidence score history. Exportable reports for compliance documentation.',
                color: '#8b5cf6',
              },
            ].map((item, i) => {
              const EIcon = item.icon
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                  className="glass-card rounded-3xl p-6 shadow-premium hover:shadow-premium-lg transition-shadow duration-300"
                >
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center mb-4"
                    style={{ backgroundColor: `${item.color}10` }}
                  >
                    <EIcon className="w-5 h-5" style={{ color: item.color }} />
                  </div>
                  <h3 className="text-[15px] font-bold text-gray-900 tracking-tight mb-2">{item.title}</h3>
                  <p className="text-[13px] text-gray-500 leading-relaxed">{item.desc}</p>
                </motion.div>
              )
            })}
          </div>

          {/* Contact Sales Form Mockup */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="glass-card rounded-3xl p-8 md:p-12 shadow-premium-lg max-w-2xl mx-auto"
          >
            <div className="text-center mb-8">
              <h3 className="text-2xl font-extrabold tracking-tight text-gray-900">Talk to our team</h3>
              <p className="text-[14px] text-gray-500 mt-2">Tell us about your organization and we&apos;ll be in touch within 24 hours.</p>
            </div>

            <div className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[12px] font-semibold text-gray-700 mb-1.5">First Name</label>
                  <input
                    type="text"
                    placeholder="Jane"
                    className="w-full px-4 py-2.5 rounded-xl bg-white/60 border border-gray-200/60 text-[14px] text-gray-900 placeholder:text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400/30 focus:border-blue-200 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-[12px] font-semibold text-gray-700 mb-1.5">Last Name</label>
                  <input
                    type="text"
                    placeholder="Smith"
                    className="w-full px-4 py-2.5 rounded-xl bg-white/60 border border-gray-200/60 text-[14px] text-gray-900 placeholder:text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400/30 focus:border-blue-200 transition-all"
                  />
                </div>
              </div>
              <div>
                <label className="block text-[12px] font-semibold text-gray-700 mb-1.5">Work Email</label>
                <input
                  type="email"
                  placeholder="jane@organization.org"
                  className="w-full px-4 py-2.5 rounded-xl bg-white/60 border border-gray-200/60 text-[14px] text-gray-900 placeholder:text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400/30 focus:border-blue-200 transition-all"
                />
              </div>
              <div>
                <label className="block text-[12px] font-semibold text-gray-700 mb-1.5">Organization</label>
                <input
                  type="text"
                  placeholder="Community Health Center"
                  className="w-full px-4 py-2.5 rounded-xl bg-white/60 border border-gray-200/60 text-[14px] text-gray-900 placeholder:text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400/30 focus:border-blue-200 transition-all"
                />
              </div>
              <div>
                <label className="block text-[12px] font-semibold text-gray-700 mb-1.5">How can we help?</label>
                <textarea
                  rows={3}
                  placeholder="Tell us about your use case..."
                  className="w-full px-4 py-2.5 rounded-xl bg-white/60 border border-gray-200/60 text-[14px] text-gray-900 placeholder:text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400/30 focus:border-blue-200 transition-all resize-none"
                />
              </div>
              <button className="w-full px-6 py-3.5 rounded-2xl text-[14px] font-semibold bg-gray-900 hover:bg-gray-800 text-white shadow-md shadow-gray-900/20 hover:shadow-lg hover:shadow-gray-900/30 transition-all active:scale-[0.97]">
                <span className="flex items-center justify-center gap-2">
                  Contact Sales
                  <ArrowRight className="w-4 h-4" />
                </span>
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══════════ MONEY-BACK GUARANTEE BANNER ═══════════ */}
      <section className="py-12 md:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.6 }}
            className="glass-card rounded-3xl shadow-premium p-8 md:p-12 relative overflow-hidden"
          >
            {/* Background accent */}
            <div
              className="absolute -top-20 -left-20 w-60 h-60 rounded-full opacity-10 pointer-events-none"
              style={{
                background: 'radial-gradient(circle, rgba(16,185,129,0.3), transparent 70%)',
              }}
            />

            <div className="relative z-10 text-center space-y-6">
              {/* Shield Icon */}
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="mx-auto"
              >
                <div className="w-20 h-20 rounded-3xl bg-emerald-50 border border-emerald-100/60 flex items-center justify-center mx-auto shadow-lg shadow-emerald-500/10">
                  <ShieldCheck className="w-10 h-10 text-emerald-600" />
                </div>
              </motion.div>

              <div className="space-y-3">
                <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-gray-900">
                  30-Day Money-Back Guarantee
                </h2>
                <p className="text-[15px] text-gray-500 max-w-lg mx-auto leading-relaxed">
                  If ClearPath Pro doesn&apos;t meet your expectations within the first 30 days, we&apos;ll
                  refund your payment — no questions asked.
                </p>
              </div>

              {/* Trust Badges */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 pt-4">
                {[
                  { icon: CreditCard, text: 'No credit card required to start', color: '#3b82f6' },
                  { icon: XCircle, text: 'Cancel anytime', color: '#ef4444' },
                  { icon: BadgeCheck, text: 'Zero risk', color: '#10b981' },
                ].map((badge) => {
                  const BIcon = badge.icon
                  return (
                    <motion.div
                      key={badge.text}
                      initial={{ opacity: 0, y: 8 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4 }}
                      className="flex items-center gap-2.5"
                    >
                      <div
                        className="w-8 h-8 rounded-lg flex items-center justify-center"
                        style={{ backgroundColor: `${badge.color}10` }}
                      >
                        <BIcon className="w-4 h-4" style={{ color: badge.color }} />
                      </div>
                      <span className="text-[13px] font-semibold text-gray-700">{badge.text}</span>
                    </motion.div>
                  )
                })}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══════════ FAQ ═══════════ */}
      <section className="py-16 md:py-24 bg-white/40">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            variants={staggerContainer}
            className="text-center mb-12"
          >
            <motion.h2
              variants={staggerItem}
              className="text-3xl sm:text-4xl font-extrabold tracking-tight text-gray-900"
            >
              Frequently asked questions
            </motion.h2>
            <motion.p variants={staggerItem} className="text-[16px] text-gray-500 mt-4">
              Everything you need to know about ClearPath AI pricing and plans.
            </motion.p>
          </motion.div>

          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <FAQItem key={i} question={faq.question} answer={faq.answer} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ STILL HAVE QUESTIONS ═══════════ */}
      <section className="py-16 md:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.6 }}
            className="glass-card rounded-3xl shadow-premium p-8 md:p-10"
          >
            <div className="text-center mb-8">
              <div className="w-14 h-14 rounded-2xl bg-blue-50 flex items-center justify-center mx-auto mb-4">
                <HelpCircle className="w-7 h-7 text-blue-500" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-gray-900">
                Still have questions?
              </h2>
              <p className="text-[15px] text-gray-500 mt-2 max-w-md mx-auto">
                We&apos;re here to help you find the right plan for your needs.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-6">
              <Link
                href="/about"
                className="glass-card rounded-2xl p-6 hover:shadow-premium-lg transition-all group"
              >
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center shrink-0">
                    <Mail className="w-5 h-5 text-blue-500" />
                  </div>
                  <div>
                    <h3 className="text-[15px] font-bold text-gray-900 tracking-tight group-hover:text-blue-600 transition-colors">
                      Contact Sales
                    </h3>
                    <p className="text-[13px] text-gray-500 mt-1 leading-relaxed">
                      Talk to our team about Enterprise plans, custom integrations, and volume pricing.
                    </p>
                    <span className="inline-flex items-center gap-1 text-[13px] font-semibold text-blue-600 mt-2">
                      Get in touch <ArrowUpRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              </Link>

              <Link
                href="/app"
                className="glass-card rounded-2xl p-6 hover:shadow-premium-lg transition-all group"
              >
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center shrink-0">
                    <RefreshCw className="w-5 h-5 text-emerald-500" />
                  </div>
                  <div>
                    <h3 className="text-[15px] font-bold text-gray-900 tracking-tight group-hover:text-emerald-600 transition-colors">
                      Try the Demo
                    </h3>
                    <p className="text-[13px] text-gray-500 mt-1 leading-relaxed">
                      Experience ClearPath AI free with no sign-up required. See how honest confidence works.
                    </p>
                    <span className="inline-flex items-center gap-1 text-[13px] font-semibold text-emerald-600 mt-2">
                      Launch demo <ArrowUpRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══════════ TRUST BANNER ═══════════ */}
      <section className="py-12 md:py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.6 }}
            className="glass-card rounded-3xl shadow-premium p-8 md:p-10"
          >
            <div className="grid sm:grid-cols-3 gap-8 md:gap-12">
              {[
                {
                  icon: Lock,
                  title: 'Privacy-first by design.',
                  desc: 'All sessions process in real-time with no persistence. No user data is stored between visits.',
                  color: '#3b82f6',
                  bg: 'rgba(59,130,246,0.06)',
                },
                {
                  icon: Shield,
                  title: 'Crisis detection always active',
                  desc: 'Hardcoded safety layer that bypasses AI entirely. Active on every plan, no exceptions.',
                  color: '#ef4444',
                  bg: 'rgba(239,68,68,0.06)',
                },
                {
                  icon: Heart,
                  title: 'Built for the community',
                  desc: 'Free forever for individuals. Making resources accessible is our mission, not our upsell.',
                  color: '#10b981',
                  bg: 'rgba(16,185,129,0.06)',
                },
              ].map((item) => {
                const TIcon = item.icon
                return (
                  <div key={item.title} className="flex flex-col items-center text-center space-y-3">
                    <div
                      className="w-14 h-14 rounded-2xl flex items-center justify-center"
                      style={{ backgroundColor: item.bg }}
                    >
                      <TIcon className="w-6 h-6" style={{ color: item.color }} />
                    </div>
                    <h3 className="text-[15px] font-bold text-gray-900 tracking-tight">{item.title}</h3>
                    <p className="text-[13px] text-gray-500 leading-relaxed max-w-xs">{item.desc}</p>
                  </div>
                )
              })}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══════════ CTA ═══════════ */}
      <section className="py-12 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6 }}
          >
            <div
              className="relative rounded-3xl overflow-hidden p-12 md:p-20 text-center"
              style={{
                background: 'linear-gradient(135deg, #2563EB 0%, #1e40af 40%, #312e81 100%)',
              }}
            >
              {/* Decorative glows */}
              <div
                className="absolute top-0 right-0 w-80 h-80 rounded-full opacity-20 pointer-events-none"
                style={{ background: 'radial-gradient(circle, rgba(255,255,255,0.2), transparent 60%)' }}
              />
              <div
                className="absolute bottom-0 left-0 w-60 h-60 rounded-full opacity-15 pointer-events-none"
                style={{ background: 'radial-gradient(circle, rgba(16,185,129,0.3), transparent 60%)' }}
              />

              <div className="relative z-10 space-y-8">
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
                  Start navigating with confidence
                </h2>
                <p className="text-[16px] sm:text-lg text-white/70 max-w-xl mx-auto">
                  Free forever. No credit card required. Crisis detection always on.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <Link
                    href="/app"
                    className="inline-flex items-center justify-center gap-2 px-8 py-4 text-[15px] font-semibold text-blue-700 rounded-2xl bg-white hover:bg-gray-50 shadow-lg shadow-blue-900/20 hover:shadow-xl transition-all active:scale-[0.97]"
                  >
                    Try the Demo
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                  <Link
                    href="/about"
                    className="inline-flex items-center justify-center gap-2 px-8 py-4 text-[15px] font-semibold text-white/90 rounded-2xl border border-white/20 hover:bg-white/10 hover:border-white/30 transition-all"
                  >
                    Learn More
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══════════ FOOTER ═══════════ */}
      <footer className="mt-auto sidebar-dark text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-12">
            {/* Brand */}
            <div className="space-y-4">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-blue-500 to-emerald-400 flex items-center justify-center shadow-lg shadow-blue-500/20">
                  <Layers className="w-4 h-4 text-white" />
                </div>
                <span className="text-[15px] font-bold tracking-tight text-white">ClearPath AI</span>
              </div>
              <p className="text-[13px] text-gray-400 leading-relaxed">
                When it matters most, honesty is the safest answer.
              </p>
              <p className="text-[11px] text-gray-500 font-medium">
                Built for USAII Global AI Hackathon 2026
              </p>
            </div>

            {/* Product */}
            <div className="space-y-4">
              <h4 className="text-[12px] font-bold uppercase tracking-wider text-gray-400">Product</h4>
              <nav className="space-y-3">
                <Link href="/#how-it-works" className="block text-[14px] text-gray-400 hover:text-white transition-colors">How It Works</Link>
                <Link href="/pricing" className="block text-[14px] text-white font-medium">Pricing</Link>
                <Link href="/app" className="block text-[14px] text-gray-400 hover:text-white transition-colors">Demo</Link>
                <Link href="/responsible-ai" className="block text-[14px] text-gray-400 hover:text-white transition-colors">Responsible AI</Link>
              </nav>
            </div>

            {/* Company */}
            <div className="space-y-4">
              <h4 className="text-[12px] font-bold uppercase tracking-wider text-gray-400">Company</h4>
              <nav className="space-y-3">
                <Link href="/about" className="block text-[14px] text-gray-400 hover:text-white transition-colors">About</Link>
                <Link href="/api-docs" className="block text-[14px] text-gray-400 hover:text-white transition-colors">API Docs</Link>
                <Link href="/how-it-works" className="block text-[14px] text-gray-400 hover:text-white transition-colors">How It Works</Link>
                <Link href="/blog" className="block text-[14px] text-gray-400 hover:text-white transition-colors">Blog</Link>
              </nav>
            </div>

            {/* Legal */}
            <div className="space-y-4">
              <h4 className="text-[12px] font-bold uppercase tracking-wider text-gray-400">Legal</h4>
              <nav className="space-y-3">
                <Link href="/privacy" className="block text-[14px] text-gray-400 hover:text-white transition-colors">Privacy Policy</Link>
                <Link href="/terms" className="block text-[14px] text-gray-400 hover:text-white transition-colors">Terms of Service</Link>
                <span className="block text-[14px] text-gray-600 cursor-default">No PII stored</span>
              </nav>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="mt-16 pt-8 border-t border-white/5">
            <p className="text-[12px] text-gray-500 text-center">
              &copy; 2026 ClearPath AI. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
      <Footer />
    </div>
  )
}
