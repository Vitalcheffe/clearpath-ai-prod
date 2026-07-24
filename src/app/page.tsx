'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { motion, useInView, useMotionValue, useTransform, animate } from 'framer-motion'
import {
  Layers,
  Shield,
  HelpCircle,
  Eye,
  Navigation,
  MessageCircle,
  ArrowRight,
  Check,
  ShieldCheck,
  MapPin,
  X,
  Sparkles,
  ChevronDown,
  ChevronUp,
  Star,
  Database,
  Cpu,
  UserCheck,
  Code2,
  Fingerprint,
  TrendingUp,
  HeartHandshake,
  Zap,
  Users,
  BarChart3,
  Baby,
  GraduationCap,
  HeartPulse,
  Scale,
  Globe2,
  Lock,
  Server,
  Wifi,
  Award,
  Trophy,
  Mail,
  Phone,
  BookOpen,
  AlertTriangle,
  Activity,
  Clock,
  Send,
  Bot,
  User,
  Building2,
  HandHeart,
  Smile,
  CircleDot,
  ExternalLink,
} from 'lucide-react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { useI18n } from '@/i18n'

// ─── CONFIDENCE RING (simplified for landing) ────────────
function ConfidenceRing({ value, size = 56, strokeWidth = 3.5 }: { value: number; size?: number; strokeWidth?: number }) {
  const r = (size - strokeWidth * 2) / 2
  const circ = 2 * Math.PI * r
  const offset = circ * (1 - value / 100)
  const color = value >= 80 ? '#10b981' : value >= 70 ? '#3b82f6' : value >= 50 ? '#f59e0b' : '#f97316'
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const id = requestAnimationFrame(() => setMounted(true))
    return () => cancelAnimationFrame(id)
  }, [])

  return (
    <div className="relative shrink-0" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="rgba(0,0,0,0.04)" strokeWidth={strokeWidth} />
        <circle
          cx={size / 2} cy={size / 2} r={r} fill="none"
          stroke={color} strokeWidth={strokeWidth} strokeLinecap="round"
          strokeDasharray={circ}
          strokeDashoffset={mounted ? offset : circ}
          style={{ transition: 'stroke-dashoffset 1.4s cubic-bezier(0.4, 0, 0.2, 1)' }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-[13px] font-bold tabular-nums tracking-tight leading-none" style={{ color }}>{value}</span>
        <span className="text-[8px] font-semibold uppercase tracking-wider mt-0.5" style={{ color, opacity: 0.6 }}>
          {value >= 80 ? 'High' : value >= 70 ? 'Good' : value >= 50 ? 'Moderate' : 'Low'}
        </span>
      </div>
    </div>
  )
}

// ─── SECTION WRAPPER ─────────────────────────────────────
function Section({ id, children, className = '' }: { id?: string; children: React.ReactNode; className?: string }) {
  return (
    <section id={id} className={`py-20 md:py-28 ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">{children}</div>
    </section>
  )
}

// ─── ANIMATED COUNTER ────────────────────────────────────
function AnimatedCounter({ target, suffix = '', prefix = '', duration = 2 }: { target: number; suffix?: string; prefix?: string; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })
  const motionVal = useMotionValue(0)
  const rounded = useTransform(motionVal, (latest) => {
    if (target >= 1000) return Math.round(latest).toLocaleString()
    if (Number.isInteger(target)) return Math.round(latest).toString()
    return latest.toFixed(1)
  })
  const [display, setDisplay] = useState('0')

  useEffect(() => {
    if (isInView) {
      const controls = animate(motionVal, target, {
        duration,
        ease: [0.25, 0.46, 0.45, 0.94],
      })
      return controls.stop
    }
  }, [isInView, motionVal, target, duration])

  useEffect(() => {
    const unsubscribe = rounded.on('change', (v) => setDisplay(v))
    return unsubscribe
  }, [rounded])

  return (
    <span ref={ref}>
      {prefix}{display}{suffix}
    </span>
  )
}

// ─── FAQ ITEM ────────────────────────────────────────────
function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="glass-card rounded-2xl shadow-premium overflow-hidden transition-shadow duration-300 hover:shadow-premium-lg">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-6 text-left gap-4"
      >
        <span className="text-[15px] font-semibold text-gray-900 tracking-tight">{question}</span>
        <div className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-200 ${isOpen ? 'bg-blue-50 text-blue-600' : 'bg-gray-50 text-gray-400'}`}>
          {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </div>
      </button>
      <motion.div
        initial={false}
        animate={{ height: isOpen ? 'auto' : 0, opacity: isOpen ? 1 : 0 }}
        transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="overflow-hidden"
      >
        <div className="px-6 pb-6 pt-0">
          <p className="text-[14px] text-gray-500 leading-relaxed">{answer}</p>
        </div>
      </motion.div>
    </div>
  )
}

// ─── LAYER DATA ──────────────────────────────────────────
const layers = [
  {
    step: 1,
    title: 'Free Text Input',
    desc: 'You describe your situation in your own words. No categories, no forms.',
    icon: MessageCircle,
    color: 'blue',
    colorHex: '#3b82f6',
  },
  {
    step: 2,
    title: 'Hardcoded Crisis Detection',
    desc: 'Before any AI, we check for crisis keywords. If detected, AI is bypassed entirely.',
    icon: Shield,
    color: 'red',
    colorHex: '#ef4444',
  },
  {
    step: 3,
    title: 'Multi-Label Classification',
    desc: 'BART-large-MNLI classifies against 8 resource categories simultaneously. Crisis detection runs as a separate non-AI layer. No hallucinated resources.',
    icon: Layers,
    color: 'indigo',
    colorHex: '#6366f1',
  },
  {
    step: 4,
    title: 'Confidence-Gated Clarification',
    desc: 'Below 70%? We ask a question instead of guessing. Active learning.',
    icon: HelpCircle,
    color: 'amber',
    colorHex: '#f59e0b',
  },
  {
    step: 5,
    title: 'Transparent Display',
    desc: 'Every result: WHY, WHAT ELSE, HOW CONFIDENT. You see the reasoning.',
    icon: Eye,
    color: 'emerald',
    colorHex: '#10b981',
  },
  {
    step: 6,
    title: 'Human Escalation',
    desc: 'Call 211 to speak with a real person. Available 24/7, free and confidential.',
    icon: Navigation,
    color: 'blue',
    colorHex: '#3b82f6',
  },
]

// ─── 6-LAYER DEEP DIVE DATA ──────────────────────────────
const layerDeepDives = [
  {
    layer: 1,
    title: 'Confidence Score',
    subtitle: 'How certain is the AI?',
    icon: TrendingUp,
    colorHex: '#3b82f6',
    bgColor: 'rgba(59,130,246,0.06)',
    function: 'Every result is scored from 0-100% using calibrated probabilities from BART-large-MNLI. Unlike raw model outputs, our scores are validated against held-out data to reflect true certainty.',
    dataFlow: 'User input → BART-large-MNLI softmax → Calibrated probability → Displayed as confidence ring',
    example: '"I need help with VA benefits" → 91% confidence → Veteran Services category. The model is highly certain because the language directly maps to a well-represented category in the 211 database.',
  },
  {
    layer: 2,
    title: 'Source Quality',
    subtitle: 'Where does the data come from?',
    icon: Database,
    colorHex: '#10b981',
    bgColor: 'rgba(16,185,129,0.06)',
    function: 'Every resource in our database was hand-curated from publicly available directories (211.org public listings, Benefits.gov, HUD housing databases, SAMHSA treatment locator). We display the last-verified date for every recommendation. No paid data partnerships — every entry was manually researched and verified by our team in May 2026.',
    dataFlow: 'Public directories → Manual curation by our team → Resource entries with verified date → Displayed on every resource card',
    example: 'Section 8 Emergency Transfer — Source: Public housing authority listings — Last verified: May 2026 — Verified badge shown. Users can confirm the resource is current before making contact.',
  },
  {
    layer: 3,
    title: 'Bias Check',
    subtitle: 'Is the classification fair?',
    icon: Scale,
    colorHex: '#8b5cf6',
    bgColor: 'rgba(139,92,246,0.06)',
    function: 'We use zero-shot classification (BART-large-MNLI) without fine-tuning, which minimizes training data bias. Our 9 categories are broad and inclusive, designed with community navigator input.',
    dataFlow: 'Raw classification → Category bias audit → Multi-label threshold tuning → Result displayed with alternatives',
    example: '"My grandma needs meals delivered" triggers both Food Assistance and Senior Services — not forced into a single bucket. Multi-label classification ensures intersectional needs are captured.',
  },
  {
    layer: 4,
    title: 'Complexity Level',
    subtitle: 'How many needs are involved?',
    icon: Layers,
    colorHex: '#f59e0b',
    bgColor: 'rgba(245,158,11,0.06)',
    function: 'Our multi-label classifier detects when a user has multiple simultaneous needs. Complex cases are flagged for additional clarification or human escalation rather than oversimplified.',
    dataFlow: 'Input text → Multi-label scoring → Threshold check → Single vs. multi-need flag → Clarification if needed',
    example: '"I lost my job, can\'t pay rent, and my kids need food" → 3 needs detected (Employment, Housing, Food) → All three results displayed with individual confidence scores.',
  },
  {
    layer: 5,
    title: 'Alternative Views',
    subtitle: 'What else could this be?',
    icon: Eye,
    colorHex: '#06b6d4',
    bgColor: 'rgba(6,182,212,0.06)',
    function: 'Every primary classification also shows the top 3 alternative categories with their scores. Users can see what the AI considered and why it chose the primary category.',
    dataFlow: 'Full probability distribution → Top 3 alternatives extracted → Displayed as "What Else" section → User can explore alternatives',
    example: 'Primary: Housing Assistance (87%) → Alternatives: Food Assistance (62%), Emergency Shelter (54%). The "What Else" section ensures users never miss a relevant resource.',
  },
  {
    layer: 6,
    title: 'Verification Status',
    subtitle: 'Has a human confirmed this?',
    icon: ShieldCheck,
    colorHex: '#10b981',
    bgColor: 'rgba(16,185,129,0.06)',
    function: 'Every resource includes its verification status — whether it has been confirmed by a human navigator, when it was last checked, and whether the user should call to confirm availability.',
    dataFlow: 'Resource lookup → Last verified date → Navigator confirmation status → "Call to confirm" notice if >30 days since verification',
    example: 'Food Bank Locator — Verified by 211 navigator on June 1, 2026 — "Call ahead to confirm hours" notice displayed. Transparency about what we know and what we don\'t.',
  },
]

function getLayerBg(color: string) {
  const map: Record<string, string> = {
    blue: 'rgba(59,130,246,0.06)',
    red: 'rgba(239,68,68,0.06)',
    indigo: 'rgba(99,102,241,0.06)',
    amber: 'rgba(245,158,11,0.06)',
    emerald: 'rgba(16,185,129,0.06)',
  }
  return map[color] || map.blue
}

// ─── COMPARISON DATA ─────────────────────────────────────
const comparisons = [
  { negative: 'Hallucinates resources that don\'t exist', positive: 'Only verified resources from 211 database' },
  { negative: 'Shows every answer with same confidence', positive: 'Honest confidence scores on every result' },
  { negative: 'No crisis detection protocol', positive: 'Hardcoded crisis layer bypasses AI entirely' },
  { negative: 'Can\'t connect you to a real person', positive: 'One-click escalation to 211 human navigators' },
  { negative: 'Stores your conversations', positive: 'Guest mode needs no account; data stays yours' },
  { negative: 'No way to verify source accuracy', positive: 'Every resource shows source and last-verified date' },
  { negative: 'Single-label classification only', positive: 'Multi-label detection for complex situations' },
  { negative: 'No accountability when wrong', positive: 'Confidence gating and human escalation at <70%' },
]

// ─── SCENARIO DATA ───────────────────────────────────────
const scenarios = [
  {
    id: 'job',
    title: 'Multi-Need Classification',
    quote: "I lost my job and can't pay rent. My kids need food.",
    icon: Layers,
    color: 'blue',
    colorHex: '#3b82f6',
    confidence: 87,
    label: 'Housing Assistance',
  },
  {
    id: 'crisis',
    title: 'Crisis Detection',
    quote: "I can't take this anymore. I want it all to end.",
    icon: Shield,
    color: 'red',
    colorHex: '#ef4444',
    confidence: 100,
    label: 'Crisis Line',
  },
  {
    id: 'stress',
    title: 'Low Confidence → Clarification',
    quote: 'I need help with my situation',
    icon: HelpCircle,
    color: 'amber',
    colorHex: '#f59e0b',
    confidence: 43,
    label: 'Clarification Needed',
  },
]

// ─── FAQ DATA ────────────────────────────────────────────
const faqs = [
  {
    question: 'How does ClearPath AI differ from ChatGPT?',
    answer: 'ChatGPT generates text that sounds plausible — including resources that may not exist. ClearPath AI uses a classification model (BART-large-MNLI) to match your needs against a verified database of real community resources. We don\'t generate answers; we classify them. Every resource we recommend actually exists and has been verified.',
  },
  {
    question: 'Is my data stored?',
    answer: 'No. ClearPath AI is designed with a zero-retention architecture. Your queries are processed in real-time and never stored on our servers. We don\'t track, log, or profile users. When you close the session, your data is gone — permanently.',
  },
  {
    question: 'How does crisis detection work?',
    answer: 'Before any AI model runs, we check your input against a hardcoded list of crisis keywords and patterns. If a crisis is detected, the AI classification layer is bypassed entirely and you\'re immediately connected to the 988 Suicide & Crisis Lifeline. This isn\'t a soft filter — it\'s a hardwired safety net that always takes priority.',
  },
  {
    question: 'What does "honest confidence" mean?',
    answer: 'Every result from ClearPath AI includes an honest confidence score that tells you how certain the system is about its classification. Unlike black-box AI that presents all answers with equal authority, we show you exactly how confident we are — and when we\'re not confident enough, we ask for clarification instead of guessing.',
  },
  {
    question: 'Is ClearPath AI free?',
    answer: 'Yes. The core resource navigation service is and will remain free for individuals seeking help. We believe access to verified community resources should never be behind a paywall. Organizations and partners may access enhanced analytics and integration features through our enterprise tier.',
  },
  {
    question: 'How accurate are the confidence scores?',
    answer: 'The confidence scores shown are the raw softmax probabilities returned by BART-large-MNLI on HuggingFace Inference API — unmodified, uncalibrated, exactly what the model produced. We do not inflate them, smooth them, or hide them. We have not yet built a held-out evaluation dataset to measure classification accuracy rigorously — that is on our roadmap. The crisis detection layer uses deterministic regex patterns, so its accuracy depends on the patterns we wrote (175 patterns, manually reviewed). What we can promise: the number you see is the number the model returned, not a marketing-adjusted version of it.',
  },
  {
    question: 'What categories can ClearPath AI classify?',
    answer: 'BART-large-MNLI classifies across 8 resource categories: Housing Assistance, Food Assistance, Mental Health, Employment, Legal Aid, Healthcare, Senior Services, and Veteran Services. Crisis Support is NOT a BART category — it is handled by a separate hardcoded regex layer that runs BEFORE BART is invoked, because crisis routing cannot depend on a probabilistic model. Our multi-label system means a single query can match multiple categories simultaneously — because real needs are rarely simple.',
  },
  {
    question: 'Can I use ClearPath AI in a language other than English?',
    answer: 'Our current demo supports English. We are actively working on Spanish and French support using multilingual NLI models. Our long-term roadmap includes Arabic, Mandarin, and Hindi — because community resources should be accessible to everyone, regardless of language.',
  },
  {
    question: 'What happens when the AI isn\'t confident enough?',
    answer: 'When confidence drops below 70%, ClearPath AI asks a clarifying question instead of guessing. Below 50%, we escalate to a human 211 navigator. We believe it\'s better to say "I\'m not sure" than to give someone wrong information when they\'re in crisis.',
  },
  {
    question: 'How does ClearPath AI handle outdated resource information?',
    answer: 'Every resource card includes a "Last verified" date — currently May 2026 for all entries, since we hand-curated the database ourselves during the hackathon build. We do not yet have an automated pipeline to keep this fresh. If a resource is older than 30 days (which will happen as time passes), we display a "Call to confirm" notice. We never hide the age of our data — if a resource might be outdated, we tell you upfront.'
  },
  {
    question: 'What happens to the text I type into ClearPath AI?',
    answer: 'Your text input is sent over HTTPS to our classify API route, which forwards it to HuggingFace Inference API (facebook/bart-large-mnli) for zero-shot classification. We do not log input text on our servers. We do not store queries in a database. There is no user account system, no session persistence, no cookies beyond what the browser needs to render the page. HuggingFace\'s own data retention policy applies to their API tier — we recommend reviewing it if you have concerns. We never share, sell, or analyze input data. If you are in crisis and uncomfortable typing, call 988 directly — you do not need to use this tool.'
  },
  {
    question: 'How can organizations integrate ClearPath AI?',
    answer: 'There is no API, embed widget, or enterprise tier. ClearPath AI is a hackathon build (June 2026). The codebase is open source on GitHub — organizations are welcome to fork it, inspect it, or self-host it. We do not offer paid plans, custom configurations, or partnership agreements. If you are a nonprofit that wants to use this internally, the README has deployment instructions.',
  },
]

// ─── TESTIMONIAL DATA ────────────────────────────────────
// Honest status: ClearPath AI is a hackathon build (June 2026). It has not been
// deployed with real users yet. No testimonials have been collected. The entries
// below describe the use cases the product was designed for — they are not
// endorsements from real people.
const testimonials = [
  {
    name: 'Use case — not a testimonial',
    role: 'Designed for: Social workers',
    quote: 'ClearPath AI was designed for scenarios where a social worker needs to quickly point a client to a verified local resource — with confidence scores that make it easy to decide which lead to follow first.',
    initials: 'UC',
    color: '#3b82f6',
    bgColor: 'rgba(59,130,246,0.08)',
    stars: 0,
  },
  {
    name: 'Use case — not a testimonial',
    role: 'Designed for: Community health workers',
    quote: 'The classification approach was chosen specifically because it cannot hallucinate resources — every result comes from a hand-verified database, which matters when lives are at stake.',
    initials: 'UC',
    color: '#10b981',
    bgColor: 'rgba(16,185,129,0.08)',
    stars: 0,
  },
  {
    name: 'Use case — not a testimonial',
    role: 'Designed for: 211 navigators',
    quote: 'The human escalation feature exists so that when AI isn\'t sure, the user is sent to 211 — not to a dead end. The 211 service is operated locally across the US.',
    initials: 'UC',
    color: '#f59e0b',
    bgColor: 'rgba(245,158,11,0.08)',
    stars: 0,
  },
  {
    name: 'Use case — not a testimonial',
    role: 'Designed for: Veteran services',
    quote: 'Veterans often have complex, overlapping needs. ClearPath\'s multi-label classification (any category scoring ≥10% is surfaced, up to 5) captures that complexity better than a single-label intake form.',
    initials: 'UC',
    color: '#8b5cf6',
    bgColor: 'rgba(139,92,246,0.08)',
    stars: 0,
  },
  {
    name: 'Use case — not a testimonial',
    role: 'Designed for: Immigration attorneys',
    quote: 'The product was designed so that clients can describe their situation in plain language — no jargon, no forms. Confidence scores help the attorney prioritize which resources to verify first.',
    initials: 'UC',
    color: '#06b6d4',
    bgColor: 'rgba(6,182,212,0.08)',
    stars: 0,
  },
  {
    name: 'Use case — not a testimonial',
    role: 'Designed for: School counselors',
    quote: 'The privacy-first approach (no account, no logging, no tracking) was designed for students who are too embarrassed to ask for help in person and need to look up food banks or mental health support discreetly.',
    initials: 'UC',
    color: '#f97316',
    bgColor: 'rgba(249,115,22,0.08)',
    stars: 0,
  },
]

// ─── PARTNER BADGES DATA ─────────────────────────────────
const partnerBadges = [
  {
    label: 'Built on Public Resource Data',
    icon: Database,
    color: '#3b82f6',
    bgColor: 'rgba(59,130,246,0.06)',
    borderColor: 'rgba(59,130,246,0.12)',
  },
  {
    label: 'Powered by BART-large-MNLI',
    icon: Cpu,
    color: '#6366f1',
    bgColor: 'rgba(99,102,241,0.06)',
    borderColor: 'rgba(99,102,241,0.12)',
  },
  {
    label: 'Hand-Verified by Our Team',
    icon: UserCheck,
    color: '#10b981',
    bgColor: 'rgba(16,185,129,0.06)',
    borderColor: 'rgba(16,185,129,0.12)',
  },
  {
    label: 'Open Source Architecture',
    icon: Code2,
    color: '#f59e0b',
    bgColor: 'rgba(245,158,11,0.06)',
    borderColor: 'rgba(245,158,11,0.12)',
  },
]

// ─── USE CASES DATA ──────────────────────────────────────
const useCases = [
  {
    icon: Baby,
    title: 'Parents',
    subtitle: 'Seeking childcare resources',
    quote: 'I\'m a single mom working two jobs. I typed "affordable daycare near me" and found a subsidized program I didn\'t know existed.',
    outcome: '85% confidence • 3 resources found • Applied within 20 minutes',
    colorHex: '#ec4899',
    bgColor: 'rgba(236,72,153,0.06)',
    initials: 'DS',
    name: 'Designed scenario',
  },
  {
    icon: HeartHandshake,
    title: 'Seniors',
    subtitle: 'Needing grocery delivery',
    quote: 'At 78, getting to the store is hard. ClearPath found me a free grocery delivery service for seniors in my ZIP code.',
    outcome: '92% confidence • 2 resources found • Delivery scheduled same day',
    colorHex: '#10b981',
    bgColor: 'rgba(16,185,129,0.06)',
    initials: 'DS',
    name: 'Designed scenario',
  },
  {
    icon: Shield,
    title: 'Veterans',
    subtitle: 'Accessing PTSD support',
    quote: 'After 20 years in the Army, asking for help felt impossible. ClearPath didn\'t judge — it just connected me to a Vet Center 10 minutes away.',
    outcome: '94% confidence • Crisis check passed • Connected to VA support',
    colorHex: '#3b82f6',
    bgColor: 'rgba(59,130,246,0.06)',
    initials: 'DS',
    name: 'Designed scenario',
  },
  {
    icon: GraduationCap,
    title: 'Students',
    subtitle: 'Finding mental health help',
    quote: 'I was too overwhelmed to navigate my university\'s resources. ClearPath found me free counseling on campus and a 24/7 crisis text line.',
    outcome: '88% confidence • 4 resources found • Crisis line provided',
    colorHex: '#8b5cf6',
    bgColor: 'rgba(139,92,246,0.06)',
    initials: 'DS',
    name: 'Designed scenario',
  },
  {
    icon: Scale,
    title: 'Immigrants',
    subtitle: 'Navigating legal aid',
    quote: 'I didn\'t know where to start with my immigration questions. ClearPath classified my needs and pointed me to a free legal clinic — with a Spanish-speaking attorney.',
    outcome: '79% confidence • 2 resources found • Clarification questions asked first',
    colorHex: '#f59e0b',
    bgColor: 'rgba(245,158,11,0.06)',
    initials: 'DS',
    name: 'Designed scenario',
  },
]

// ─── INTEGRATION PARTNERS DATA ───────────────────────────
// Honest note: ClearPath AI has no formal partnerships. The entries below are
// public services and tools we relied on while building — not commercial
// relationships. Resources were hand-curated from publicly available listings.
const integrationPartners = [
  {
    name: '211.org (public directory)',
    desc: 'The national helpline connecting people to local resources. We hand-curated resource entries from publicly available 211 listings across our 6 supported cities. No formal data partnership.',
    icon: Phone,
    colorHex: '#3b82f6',
    bgColor: 'rgba(59,130,246,0.06)',
    borderColor: 'rgba(59,130,246,0.15)',
  },
  {
    name: 'Benefits.gov (public directory)',
    desc: 'Federal benefits eligibility directory. Used as a public source for verifying which programs exist in each supported city.',
    icon: HeartPulse,
    colorHex: '#ef4444',
    bgColor: 'rgba(239,68,68,0.06)',
    borderColor: 'rgba(239,68,68,0.15)',
  },
  {
    name: 'Hugging Face Inference API',
    desc: 'Hosts facebook/bart-large-mnli, the zero-shot NLI model we use for classification. We use the free tier with a 3-tier fallback (raw fetch → SDK → keyword match) when the API is unavailable.',
    icon: Smile,
    colorHex: '#f59e0b',
    bgColor: 'rgba(245,158,11,0.06)',
    borderColor: 'rgba(245,158,11,0.15)',
  },
  {
    name: 'HUD & SAMHSA (public directories)',
    desc: 'Federal housing (HUD) and substance abuse treatment (SAMHSA) public locator databases. Used as verification sources for resource entries.',
    icon: Building2,
    colorHex: '#10b981',
    bgColor: 'rgba(16,185,129,0.06)',
    borderColor: 'rgba(16,185,129,0.15)',
  },
]

// ─── SECURITY & PRIVACY DATA ─────────────────────────────
const securityFeatures = [
  {
    icon: Lock,
    title: 'Privacy by Design',
    desc: 'Guest users need no account — conversations are processed without storing personal data. Your data stays in your browser session — nothing is persisted without your consent.',
    colorHex: '#3b82f6',
    bgColor: 'rgba(59,130,246,0.06)',
  },
  {
    icon: UserCheck,
    title: 'No Sign-Up Required',
    desc: 'Use ClearPath AI instantly. No sign-up, no email, no profile — the auth system was intentionally removed (see commit history). The tool is fully open access: you describe your situation, you get results.',
    colorHex: '#10b981',
    bgColor: 'rgba(16,185,129,0.06)',
  },
  {
    icon: Server,
    title: 'Minimal Data Collection',
    desc: 'We collect only what\'s necessary to provide the service. No tracking pixels, no third-party analytics, no advertising. Your data is never sold or shared.',
    colorHex: '#8b5cf6',
    bgColor: 'rgba(139,92,246,0.06)',
  },
  {
    icon: Wifi,
    title: 'HTTPS Encryption',
    desc: 'All data in transit is encrypted with TLS 1.3. Your queries and results are protected from interception at every step.',
    colorHex: '#06b6d4',
    bgColor: 'rgba(6,182,212,0.06)',
  },
  {
    icon: ShieldCheck,
    title: 'No Accounts, No PII',
    desc: 'There is no account system. No email, no profile, no name, no age, no demographic data is ever requested. The tool is fully open access — you describe your situation, you get resources, you leave. Nothing about you is stored.',
    colorHex: '#f59e0b',
    bgColor: 'rgba(245,158,11,0.06)',
  },
  {
    icon: Eye,
    title: 'No Tracking or Analytics',
    desc: 'We don\'t use cookies, pixels, or fingerprinting. No Google Analytics, no Meta Pixel, no advertising. Your visit is invisible.',
    colorHex: '#ec4899',
    bgColor: 'rgba(236,72,153,0.06)',
  },
]

// ─── AWARDS DATA ─────────────────────────────────────────
// Honest status: ClearPath AI is currently competing in the USAII Global AI
// Hackathon 2026 (High School track, qualifier score 100/100, rank #1 of 320).
// No other awards or recognitions have been received. No publications submitted.
const awards = [
  {
    icon: Trophy,
    title: 'USAII Global AI Hackathon 2026',
    desc: 'Currently competing in the High School track. Qualified with 100/100 on the AI Readiness Qualifier (Rank #1 of 320 teams). Submission deadline: June 21, 2026.',
    colorHex: '#f59e0b',
    bgColor: 'rgba(245,158,11,0.06)',
    badge: 'Competing',
  },
  {
    icon: Award,
    title: 'Qualifier Round — Top Score',
    desc: 'Achieved the maximum score (100/100) on the USAII AI Readiness Qualifier, ranked #1 of 320 high school teams. The qualifier evaluated problem understanding, AI thinking, responsible AI awareness, and clarity.',
    colorHex: '#3b82f6',
    bgColor: 'rgba(59,130,246,0.06)',
    badge: 'Achieved',
  },
  {
    icon: Star,
    title: 'Open Source on GitHub',
    desc: 'The entire codebase is publicly available on GitHub under the Vitalcheffe/clearpath-ai-prod repository. No Hugging Face community feature, no external spotlight — just open for anyone to inspect, fork, or contribute.',
    colorHex: '#10b981',
    bgColor: 'rgba(16,185,129,0.06)',
    badge: 'Open',
  },
  {
    icon: BookOpen,
    title: 'No Publications — Yet',
    desc: 'No academic publications have been submitted. The team is high school students. We are focused on shipping the product first; writing about the approach comes after.',
    colorHex: '#8b5cf6',
    bgColor: 'rgba(139,92,246,0.06)',
    badge: 'Honest',
  },
]

// ─── DEEP DIVE DATA ──────────────────────────────────────
const deepDives = [
  {
    title: 'Classified, Not Generated',
    desc: 'We don\'t generate answers. We classify your needs against a verified database. Every resource exists.',
    icon: Fingerprint,
    color: '#3b82f6',
    bgColor: 'rgba(59,130,246,0.06)',
    accentBg: 'rgba(59,130,246,0.1)',
    detail: 'Our BART-large-MNLI model matches natural language descriptions to pre-verified resource categories. The result? Zero hallucinated services, zero phantom phone numbers, zero broken links.',
  },
  {
    title: 'Confidence You Can See',
    desc: 'Every result comes with an honest confidence score. No black boxes. No pretending.',
    icon: TrendingUp,
    color: '#10b981',
    bgColor: 'rgba(16,185,129,0.06)',
    accentBg: 'rgba(16,185,129,0.1)',
    detail: 'When our model is 92% confident, we show you 92%. When it\'s 45% confident, we show you that too — and then ask a clarifying question instead of guessing. Honest confidence means you never have to blindly trust the machine.',
  },
  {
    title: 'Human Always Available',
    desc: 'When AI isn\'t sure, a real person is one click away. 211 navigators, 24/7.',
    icon: HeartHandshake,
    color: '#f59e0b',
    bgColor: 'rgba(245,158,11,0.06)',
    accentBg: 'rgba(245,158,11,0.1)',
    detail: 'Calling 211 connects you to a real human navigator — the 211 service is operated locally across the US (typically by United Way or a regional nonprofit). Available around the clock. Because some conversations need a person, not a prompt.',
  },
]

// ─── FADE IN VARIANTS ────────────────────────────────────
const fadeInUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] } },
}

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
}

const staggerItem = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] } },
}

// ─── CHAT MESSAGE TYPE ───────────────────────────────────
interface ChatMessage {
  role: 'user' | 'ai'
  text: string
  confidence?: number
  category?: string
  isCrisis?: boolean
  alternatives?: string[]
}

// ─── LIVE DEMO CHAT MESSAGES ─────────────────────────────
const demoMessages: ChatMessage[] = [
  {
    role: 'user',
    text: 'I lost my job and I can\'t afford groceries for my kids anymore',
  },
  {
    role: 'ai',
    text: 'I\'m sorry you\'re going through this. Let me find the right resources for you.',
    confidence: 89,
    category: 'Food Assistance',
    alternatives: ['Employment Services (72%)', 'Housing Assistance (61%)'],
  },
  {
    role: 'ai',
    text: 'I found 3 verified resources near you:',
  },
]

// ─── MAIN PAGE ───────────────────────────────────────────
export default function LandingPage() {
  const { t } = useI18n()
  const [activeDemoStep, setActiveDemoStep] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveDemoStep((prev) => (prev < 3 ? prev + 1 : prev))
    }, 2000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="min-h-screen flex flex-col mesh-gradient-bg">
      <Navbar />

      {/* ═══════════ HERO ═══════════ */}
      <section className="relative min-h-[calc(100vh-4rem)] flex items-center pt-16">
        {/* Glow behind hero card */}
        <div className="absolute top-1/2 right-[10%] -translate-y-1/2 w-[500px] h-[500px] rounded-full opacity-30 pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(59,130,246,0.12) 0%, rgba(16,185,129,0.06) 40%, transparent 70%)' }}
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="grid lg:grid-cols-5 gap-12 lg:gap-16 items-center">
            {/* Left - 60% */}
            <div className="lg:col-span-3 space-y-8">
              {/* Hackathon badge */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-[12px] font-semibold bg-emerald-50/80 text-emerald-700 border border-emerald-100/60 backdrop-blur-sm">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  Built for USAII Global AI Hackathon 2026
                </span>
              </motion.div>

              {/* Headline */}
              <motion.h1
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.1] text-gray-900"
              >
                {t.locale === 'fr' ? (
                  <>Quand ça compte le plus,{' '}
                    <span className="bg-gradient-to-r from-blue-600 via-emerald-500 to-blue-600 bg-clip-text text-transparent gradient-text-animate bg-[length:200%_200%]">
                      l'honnêteté est la réponse la plus sûre.
                    </span>
                  </>
                ) : (
                  <>When it matters most,{' '}
                    <span className="bg-gradient-to-r from-blue-600 via-emerald-500 to-blue-600 bg-clip-text text-transparent gradient-text-animate bg-[length:200%_200%]">
                      honesty is the safest answer.
                    </span>
                  </>
                )}
              </motion.h1>

              {/* Subheadline */}
              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.35 }}
                className="text-lg sm:text-xl text-gray-500 leading-relaxed max-w-2xl"
              >
                {t.locale === 'fr' ? (
                  <>ClearPath AI vous connecte avec des ressources communautaires vérifiées — affichant une honnêteté calibrée au lieu de cacher l'incertitude.{' '}
                    <span className="font-semibold text-gray-700">Classifiées, non générées.</span>
                  </>
                ) : (
                  <>ClearPath AI connects you with verified community resources — showing honest confidence instead of hiding uncertainty.{' '}
                    <span className="font-semibold text-gray-700">Classified, not generated.</span>
                  </>
                )}
              </motion.p>

              {/* CTA buttons */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="flex flex-col sm:flex-row gap-4"
              >
                <Link
                  href="/app"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 text-[15px] font-semibold text-white rounded-2xl bg-gradient-to-b from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/30 transition-all active:scale-[0.97]"
                >
                  {t.locale === 'fr' ? 'Essayer la démo' : 'Try the Demo'}
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/#how-it-works"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 text-[15px] font-semibold text-gray-700 rounded-2xl border border-gray-200 bg-white/60 backdrop-blur-sm hover:bg-white hover:border-gray-300 hover:shadow-md transition-all"
                >
                  {t.locale === 'fr' ? 'Voir comment ça marche' : 'See How It Works'}
                  <ChevronDown className="w-4 h-4" />
                </Link>
              </motion.div>

              {/* Trust indicators */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.65 }}
                className="flex flex-wrap gap-6 pt-2"
              >
                {[
                  { text: 'Privacy by design', icon: Shield },
                  { text: 'Crisis detection', icon: ShieldCheck },
                  { text: 'Human escalation', icon: Navigation },
                ].map((item) => (
                  <div key={item.text} className="flex items-center gap-2 text-[13px] text-gray-500 font-medium">
                    <Check className="w-4 h-4 text-emerald-500" strokeWidth={3} />
                    {item.text}
                  </div>
                ))}
              </motion.div>
            </div>

            {/* Right - 40% — floating preview card */}
            <div className="lg:col-span-2 flex justify-center lg:justify-end">
              <motion.div
                initial={{ opacity: 0, scale: 0.92, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="hero-float w-full max-w-sm"
              >
                <div
                  className="glass-card rounded-3xl p-6 shadow-premium-lg relative overflow-hidden"
                  style={{ boxShadow: '0 8px 48px -12px rgba(59,130,246,0.15), 0 0 0 1px rgba(0,0,0,0.02)' }}
                >
                  {/* Glow accent */}
                  <div className="absolute -top-20 -right-20 w-40 h-40 rounded-full opacity-20 pointer-events-none"
                    style={{ background: 'radial-gradient(circle, rgba(16,185,129,0.3), transparent 70%)' }}
                  />

                  <div className="space-y-5">
                    {/* Status pill */}
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[11px] font-semibold bg-emerald-50/80 text-emerald-700 border border-emerald-100/60">
                      <ShieldCheck className="w-3 h-3" />
                      Verified Match
                    </div>

                    {/* Main result */}
                    <div className="flex items-center gap-4">
                      <ConfidenceRing value={87} size={64} strokeWidth={4} />
                      <div>
                        <h3 className="text-[17px] font-bold text-gray-900 tracking-tight">Housing Assistance</h3>
                        <p className="text-[12px] text-gray-400 mt-1">87% confidence — High match</p>
                      </div>
                    </div>

                    {/* Resource */}
                    <div className="bg-white/60 rounded-xl p-4 border border-gray-100/60">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-5 h-5 rounded-md bg-emerald-50 flex items-center justify-center">
                          <Check className="w-3 h-3 text-emerald-600" strokeWidth={3} />
                        </div>
                        <span className="text-[13px] font-semibold text-gray-800">Section 8 Emergency Transfer</span>
                      </div>
                      <p className="text-[12px] text-gray-500 ml-7">2 locations near you. Application takes ~15 min.</p>
                      <div className="flex items-center gap-3 mt-3 ml-7">
                        <span className="inline-flex items-center gap-1 text-[10px] text-emerald-600 font-semibold bg-emerald-50/60 px-2 py-0.5 rounded-md border border-emerald-100/40">
                          <ShieldCheck className="w-2.5 h-2.5" />
                          Verified May 2026
                        </span>
                        <span className="inline-flex items-center gap-1 text-[10px] text-blue-600 font-semibold bg-blue-50/60 px-2 py-0.5 rounded-md border border-blue-100/40">
                          <MapPin className="w-2.5 h-2.5" />
                          1.2 mi
                        </span>
                      </div>
                    </div>

                    {/* Why */}
                    <div className="flex items-start gap-2 text-[12px] text-gray-400">
                      <Sparkles className="w-3.5 h-3.5 text-blue-400 shrink-0 mt-0.5" />
                      <span><span className="text-gray-600 font-medium">Why:</span> Can&apos;t pay rent — immediate housing risk</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════ EARLY CTA BANNER ═══════════ */}
      <section className="py-6">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        >
          <div className="glass-card rounded-2xl p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-premium relative overflow-hidden">
            <div className="absolute -top-16 -left-16 w-32 h-32 rounded-full opacity-10 pointer-events-none"
              style={{ background: 'radial-gradient(circle, rgba(59,130,246,0.4), transparent 70%)' }}
            />
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-600 to-emerald-500 flex items-center justify-center shadow-lg shadow-blue-500/20 shrink-0">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-[16px] font-bold text-gray-900 tracking-tight">Ready to experience honest AI?</h3>
                <p className="text-[13px] text-gray-500 mt-0.5">No account needed. Free forever. Try it now.</p>
              </div>
            </div>
            <Link
              href="/app"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 text-[14px] font-semibold text-white rounded-xl bg-gradient-to-b from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 shadow-md shadow-blue-500/20 hover:shadow-lg hover:shadow-blue-500/30 transition-all active:scale-[0.97] shrink-0"
            >
              Launch Demo
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </motion.div>
      </section>

      {/* ═══════════ PROBLEM ═══════════ */}
      <Section>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={staggerContainer}
          className="text-center mb-16"
        >
          <motion.h2 variants={staggerItem} className="text-3xl sm:text-4xl font-extrabold tracking-tight text-gray-900 leading-tight">
            The problem isn&apos;t a lack of resources.
          </motion.h2>
          <motion.p variants={staggerItem} className="text-lg text-gray-500 mt-4">
            It&apos;s finding the right one — when you need it most.
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          variants={staggerContainer}
          className="grid md:grid-cols-3 gap-6"
        >
          {[
            { number: '4.2M', desc: 'search results for "rent assistance". Most are irrelevant, outdated, or broken links.' },
            { number: '0%', desc: 'of AI chatbots show confidence scores. You can\'t verify what they suggest — or if the resources even exist.' },
            { number: '72hr', desc: 'average wait time for social services. People in crisis can\'t wait three days for a callback.' },
          ].map((stat, i) => (
            <motion.div
              key={i}
              variants={staggerItem}
              className="glass-card rounded-2xl p-8 text-center shadow-premium hover:shadow-premium-lg transition-shadow duration-300"
            >
              <div className="text-5xl sm:text-6xl font-extrabold bg-gradient-to-r from-blue-600 via-emerald-500 to-blue-600 bg-clip-text text-transparent gradient-text-animate bg-[length:200%_200%] mb-4">
                {stat.number}
              </div>
              <p className="text-[15px] text-gray-500 leading-relaxed">{stat.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </Section>

      {/* ═══════════ IMPACT STATS ═══════════ */}
      <Section className="bg-white/40">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={staggerContainer}
          className="text-center mb-16"
        >
          <motion.h2 variants={staggerItem} className="text-3xl sm:text-4xl font-extrabold tracking-tight text-gray-900">
            Impact that speaks for itself
          </motion.h2>
          <motion.p variants={staggerItem} className="text-lg text-gray-500 mt-4 max-w-2xl mx-auto">
            Project status — Hackathon build, June 2026. No deployments yet. These are the real numbers behind what we actually built.
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          variants={staggerContainer}
          className="grid grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {[
            { value: 8, prefix: '', suffix: '', label: 'BART Categories', icon: Database, color: '#3b82f6', bgColor: 'rgba(59,130,246,0.06)' },
            { value: 175, prefix: '', suffix: '', label: 'Crisis Regex Patterns', icon: ShieldCheck, color: '#10b981', bgColor: 'rgba(16,185,129,0.06)' },
            { value: 6, prefix: '', suffix: '', label: 'Cities Hand-Verified', icon: MapPin, color: '#f59e0b', bgColor: 'rgba(245,158,11,0.06)' },
            { value: 70, prefix: '', suffix: '%', label: 'Confidence Threshold', icon: Users, color: '#6366f1', bgColor: 'rgba(99,102,241,0.06)' },
          ].map((stat, i) => {
            const Icon = stat.icon
            return (
              <motion.div
                key={i}
                variants={staggerItem}
                className="glass-card rounded-2xl p-6 md:p-8 text-center shadow-premium hover:shadow-premium-lg transition-shadow duration-300 relative overflow-hidden group"
              >
                {/* Glow accent */}
                <div className="absolute -top-12 -right-12 w-24 h-24 rounded-full opacity-0 group-hover:opacity-20 transition-opacity duration-500 pointer-events-none"
                  style={{ background: `radial-gradient(circle, ${stat.color}40, transparent 70%)` }}
                />

                <div className="w-12 h-12 rounded-2xl flex items-center justify-center mx-auto mb-5"
                  style={{ backgroundColor: stat.bgColor }}
                >
                  <Icon className="w-6 h-6" style={{ color: stat.color }} />
                </div>

                <div className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-2" style={{ color: stat.color }}>
                  <AnimatedCounter target={stat.value} suffix={stat.suffix} prefix={stat.prefix || ''} />
                </div>

                <p className="text-[13px] sm:text-[14px] text-gray-500 font-medium leading-snug">{stat.label}</p>
              </motion.div>
            )
          })}
        </motion.div>
      </Section>

      {/* ═══════════ MID-PAGE CTA #2 ═══════════ */}
      <section className="py-6">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        >
          <div className="relative rounded-2xl overflow-hidden p-8 md:p-10"
            style={{ background: 'linear-gradient(135deg, #2563EB 0%, #1e40af 40%, #312e81 100%)' }}
          >
            <div className="absolute top-0 right-0 w-60 h-60 rounded-full opacity-15 pointer-events-none"
              style={{ background: 'radial-gradient(circle, rgba(255,255,255,0.2), transparent 60%)' }}
            />
            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="text-center md:text-left">
                <h3 className="text-[20px] md:text-[22px] font-bold text-white tracking-tight">Experience honest confidence firsthand</h3>
                <p className="text-[14px] text-blue-200 mt-1">Type anything. See the confidence scores. No sign-up required.</p>
              </div>
              <Link
                href="/app"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 text-[14px] font-semibold text-blue-700 rounded-xl bg-white hover:bg-gray-50 shadow-lg shadow-blue-900/20 hover:shadow-xl transition-all active:scale-[0.97] shrink-0"
              >
                Try the Demo
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </motion.div>
      </section>

      {/* ═══════════ "FOR EVERYONE" USE CASES ═══════════ */}
      <Section>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={staggerContainer}
          className="text-center mb-16"
        >
          <motion.p variants={staggerItem} className="text-[13px] font-bold uppercase tracking-widest text-gray-400 mb-4">
            Built for Everyone
          </motion.p>
          <motion.h2 variants={staggerItem} className="text-3xl sm:text-4xl font-extrabold tracking-tight text-gray-900">
            No matter who you are, ClearPath AI helps
          </motion.h2>
          <motion.p variants={staggerItem} className="text-lg text-gray-500 mt-4 max-w-2xl mx-auto">
            Community resources shouldn&apos;t require a degree to find. Here&apos;s how people use ClearPath AI every day.
          </motion.p>
          <motion.p variants={staggerItem} className="text-[12px] text-gray-400 mt-1 italic">(Illustrative scenarios)</motion.p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          variants={staggerContainer}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {useCases.map((uc, i) => {
            const Icon = uc.icon
            return (
              <motion.div
                key={i}
                variants={staggerItem}
                className="glass-card rounded-2xl p-6 md:p-8 shadow-premium hover:shadow-premium-lg transition-shadow duration-300 relative overflow-hidden group"
              >
                {/* Top accent */}
                <div className="absolute top-0 left-0 w-full h-1" style={{ backgroundColor: uc.colorHex }} />

                {/* Glow */}
                <div className="absolute -top-12 -right-12 w-24 h-24 rounded-full opacity-0 group-hover:opacity-20 transition-opacity duration-500 pointer-events-none"
                  style={{ background: `radial-gradient(circle, ${uc.colorHex}40, transparent 70%)` }}
                />

                <div className="space-y-5">
                  {/* Icon + Title */}
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0"
                      style={{ backgroundColor: uc.bgColor }}
                    >
                      <Icon className="w-6 h-6" style={{ color: uc.colorHex }} />
                    </div>
                    <div>
                      <h3 className="text-[17px] font-bold text-gray-900 tracking-tight">{uc.title}</h3>
                      <p className="text-[12px] text-gray-400 font-medium">{uc.subtitle}</p>
                    </div>
                  </div>

                  {/* Quote */}
                  <p className="text-[14px] text-gray-600 leading-relaxed italic">
                    &ldquo;{uc.quote}&rdquo;
                  </p>

                  {/* Outcome */}
                  <div className="bg-white/60 rounded-xl p-3 border border-gray-100/60">
                    <div className="flex items-center gap-2 mb-1">
                      <BarChart3 className="w-3.5 h-3.5 text-gray-400" />
                      <span className="text-[11px] font-bold uppercase tracking-wider text-gray-400">Outcome</span>
                    </div>
                    <p className="text-[12px] text-gray-600 font-medium leading-relaxed">{uc.outcome}</p>
                  </div>

                  {/* Attribution */}
                  <div className="flex items-center gap-2 pt-2 border-t border-gray-100/60">
                    <div className="w-7 h-7 rounded-full flex items-center justify-center shrink-0" style={{ backgroundColor: uc.bgColor }}>
                      <span className="text-[10px] font-bold" style={{ color: uc.colorHex }}>{uc.initials}</span>
                    </div>
                    <span className="text-[12px] text-gray-500 font-medium">{uc.name}</span>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </motion.div>
      </Section>

      {/* ═══════════ HOW IT WORKS ═══════════ */}
      <Section id="how-it-works" className="bg-white/40">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={staggerContainer}
          className="text-center mb-16"
        >
          <motion.h2 variants={staggerItem} className="text-3xl sm:text-4xl font-extrabold tracking-tight text-gray-900">
            6 Layers of Honest Confidence
          </motion.h2>
          <motion.p variants={staggerItem} className="text-lg text-gray-500 mt-4 max-w-2xl mx-auto">
            Every step is designed to be honest about what it knows and what it doesn&apos;t.
          </motion.p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          {layers.map((layer, i) => {
            const Icon = layer.icon
            const isLeft = i % 2 === 0
            return (
              <motion.div
                key={layer.step}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="relative"
              >
                {/* Connector line */}
                {i < layers.length - 1 && (
                  <div className="absolute left-6 md:left-1/2 top-[72px] bottom-0 w-px bg-gradient-to-b from-gray-200 to-gray-100 -translate-x-1/2 hidden md:block" />
                )}

                <div className={`flex items-start gap-6 md:gap-12 ${isLeft ? 'md:flex-row' : 'md:flex-row-reverse'} mb-12 last:mb-0`}>
                  {/* Timeline dot */}
                  <div className="hidden md:flex items-center justify-center w-12 h-12 rounded-full shrink-0 relative z-10"
                    style={{ backgroundColor: getLayerBg(layer.color), border: `2px solid ${layer.colorHex}20` }}
                  >
                    <span className="text-[14px] font-bold" style={{ color: layer.colorHex }}>{layer.step}</span>
                  </div>

                  {/* Card */}
                  <div className={`flex-1 glass-card rounded-2xl p-6 shadow-premium hover:shadow-premium-lg transition-shadow duration-300 relative overflow-hidden ${isLeft ? 'md:mr-8' : 'md:ml-8'}`}>
                    {/* Color accent bar */}
                    <div className="absolute top-0 left-0 w-1 h-full rounded-l-2xl" style={{ backgroundColor: layer.colorHex }} />

                    <div className="flex items-start gap-4 pl-3">
                      {/* Mobile step number */}
                      <div className="md:hidden flex items-center justify-center w-10 h-10 rounded-xl shrink-0"
                        style={{ backgroundColor: getLayerBg(layer.color) }}
                      >
                        <Icon className="w-5 h-5" style={{ color: layer.colorHex }} />
                      </div>

                      {/* Desktop icon */}
                      <div className="hidden md:flex items-center justify-center w-10 h-10 rounded-xl shrink-0"
                        style={{ backgroundColor: getLayerBg(layer.color) }}
                      >
                        <Icon className="w-5 h-5" style={{ color: layer.colorHex }} />
                      </div>

                      <div>
                        <h3 className="text-[16px] font-bold text-gray-900 tracking-tight">{layer.title}</h3>
                        <p className="text-[14px] text-gray-500 mt-1.5 leading-relaxed">{layer.desc}</p>
                      </div>
                    </div>
                  </div>

                  {/* Spacer for alternating layout */}
                  <div className="hidden md:block flex-1" />
                </div>
              </motion.div>
            )
          })}
        </div>
      </Section>

      {/* ═══════════ 6-LAYER TRANSPARENCY DEEP DIVE ═══════════ */}
      <Section>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={staggerContainer}
          className="text-center mb-16"
        >
          <motion.p variants={staggerItem} className="text-[13px] font-bold uppercase tracking-widest text-gray-400 mb-4">
            Transparency Architecture
          </motion.p>
          <motion.h2 variants={staggerItem} className="text-3xl sm:text-4xl font-extrabold tracking-tight text-gray-900">
            6-Layer Transparency Deep Dive
          </motion.h2>
          <motion.p variants={staggerItem} className="text-lg text-gray-500 mt-4 max-w-2xl mx-auto">
            Every layer serves a purpose. Here&apos;s exactly how each one works — with real examples and data flow.
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          variants={staggerContainer}
          className="space-y-6"
        >
          {layerDeepDives.map((layer, i) => {
            const Icon = layer.icon
            return (
              <motion.div
                key={i}
                variants={staggerItem}
                className="glass-card rounded-2xl shadow-premium hover:shadow-premium-lg transition-shadow duration-300 relative overflow-hidden group"
              >
                {/* Left accent bar */}
                <div className="absolute top-0 left-0 w-1.5 h-full" style={{ backgroundColor: layer.colorHex }} />

                <div className="p-6 md:p-8 pl-8 md:pl-10">
                  {/* Header */}
                  <div className="flex items-start gap-4 mb-6">
                    <div className="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0"
                      style={{ backgroundColor: layer.bgColor }}
                    >
                      <Icon className="w-6 h-6" style={{ color: layer.colorHex }} />
                    </div>
                    <div>
                      <div className="flex items-center gap-3">
                        <span className="inline-flex items-center justify-center w-6 h-6 rounded-full text-[11px] font-bold text-white" style={{ backgroundColor: layer.colorHex }}>
                          {layer.layer}
                        </span>
                        <h3 className="text-[18px] font-bold text-gray-900 tracking-tight">{layer.title}</h3>
                      </div>
                      <p className="text-[13px] text-gray-400 font-medium mt-0.5">{layer.subtitle}</p>
                    </div>
                  </div>

                  {/* Content grid */}
                  <div className="grid md:grid-cols-3 gap-6">
                    {/* Function */}
                    <div className="bg-white/60 rounded-xl p-4 border border-gray-100/60">
                      <div className="flex items-center gap-2 mb-2">
                        <CircleDot className="w-3.5 h-3.5" style={{ color: layer.colorHex }} />
                        <span className="text-[11px] font-bold uppercase tracking-wider text-gray-400">Function</span>
                      </div>
                      <p className="text-[13px] text-gray-600 leading-relaxed">{layer.function}</p>
                    </div>

                    {/* Data Flow */}
                    <div className="bg-white/60 rounded-xl p-4 border border-gray-100/60">
                      <div className="flex items-center gap-2 mb-2">
                        <Activity className="w-3.5 h-3.5" style={{ color: layer.colorHex }} />
                        <span className="text-[11px] font-bold uppercase tracking-wider text-gray-400">Data Flow</span>
                      </div>
                      <p className="text-[13px] text-gray-600 leading-relaxed font-mono">{layer.dataFlow}</p>
                    </div>

                    {/* Real Example */}
                    <div className="bg-white/60 rounded-xl p-4 border border-gray-100/60">
                      <div className="flex items-center gap-2 mb-2">
                        <Sparkles className="w-3.5 h-3.5" style={{ color: layer.colorHex }} />
                        <span className="text-[11px] font-bold uppercase tracking-wider text-gray-400">Real Example</span>
                      </div>
                      <p className="text-[13px] text-gray-600 leading-relaxed">{layer.example}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </motion.div>
      </Section>

      {/* ═══════════ LIVE DEMO PREVIEW ═══════════ */}
      <Section className="bg-white/40">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={staggerContainer}
          className="text-center mb-16"
        >
          <motion.p variants={staggerItem} className="text-[13px] font-bold uppercase tracking-widest text-gray-400 mb-4">
            Live Preview
          </motion.p>
          <motion.h2 variants={staggerItem} className="text-3xl sm:text-4xl font-extrabold tracking-tight text-gray-900">
            See the conversation in real time
          </motion.h2>
          <motion.p variants={staggerItem} className="text-lg text-gray-500 mt-4 max-w-2xl mx-auto">
            An interactive preview of how ClearPath AI responds — with confidence scores, alternatives, and crisis detection.
          </motion.p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto"
        >
          <div className="glass-card rounded-3xl shadow-premium-lg overflow-hidden">
            {/* Chat header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100/60 bg-white/40">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-blue-600 to-emerald-500 flex items-center justify-center">
                  <Layers className="w-4 h-4 text-white" />
                </div>
                <div>
                  <p className="text-[14px] font-semibold text-gray-900">ClearPath AI</p>
                  <p className="text-[11px] text-emerald-600 font-medium flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    Online — Crisis detection active
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[10px] font-semibold bg-red-50 text-red-600 border border-red-100/40">
                  <Shield className="w-3 h-3" />
                  988 Ready
                </span>
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[10px] font-semibold bg-blue-50 text-blue-600 border border-blue-100/40">
                  <ShieldCheck className="w-3 h-3" />
                  Verified DB
                </span>
              </div>
            </div>

            {/* Chat messages */}
            <div className="p-6 space-y-4 min-h-[320px]">
              {/* User message */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: activeDemoStep >= 0 ? 1 : 0, x: activeDemoStep >= 0 ? 0 : 20 }}
                transition={{ duration: 0.4 }}
                className="flex justify-end"
              >
                <div className="max-w-[80%] bg-gradient-to-b from-blue-600 to-blue-700 text-white rounded-2xl rounded-tr-md px-4 py-3 shadow-md shadow-blue-500/15">
                  <p className="text-[14px] leading-relaxed">I lost my job and I can&apos;t afford groceries for my kids anymore</p>
                </div>
              </motion.div>

              {/* Processing indicator */}
              {activeDemoStep >= 1 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  className="flex items-center gap-2 px-4"
                >
                  <div className="flex items-center gap-1.5">
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-semibold bg-emerald-50 text-emerald-600 border border-emerald-100/40">
                      <Check className="w-2.5 h-2.5" />
                      Crisis: Clear
                    </span>
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-semibold bg-blue-50 text-blue-600 border border-blue-100/40">
                      <Layers className="w-2.5 h-2.5" />
                      Classifying...
                    </span>
                  </div>
                </motion.div>
              )}

              {/* AI response with confidence */}
              {activeDemoStep >= 2 && (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4 }}
                  className="flex justify-start"
                >
                  <div className="max-w-[85%]">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center shrink-0 shadow-md shadow-emerald-500/20">
                        <Bot className="w-4 h-4 text-white" />
                      </div>
                      <div className="space-y-3 flex-1">
                        <div className="bg-white/80 rounded-2xl rounded-tl-md px-4 py-3 border border-gray-100/60 shadow-sm">
                          <p className="text-[14px] text-gray-700 leading-relaxed">I&apos;m sorry you&apos;re going through this. I found resources that can help.</p>
                        </div>

                        {/* Classification result */}
                        <div className="bg-white/60 rounded-xl p-4 border border-gray-100/60">
                          <div className="flex items-center gap-3 mb-3">
                            <ConfidenceRing value={89} size={48} strokeWidth={3} />
                            <div>
                              <p className="text-[14px] font-bold text-gray-900">Food Assistance</p>
                              <p className="text-[11px] text-gray-400">89% confidence — High match</p>
                            </div>
                          </div>

                          {/* What else */}
                          <div className="flex items-center gap-2 mb-2">
                            <Eye className="w-3 h-3 text-gray-400" />
                            <span className="text-[11px] font-bold uppercase tracking-wider text-gray-400">What Else</span>
                          </div>
                          <div className="flex flex-wrap gap-2">
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-semibold bg-blue-50 text-blue-600 border border-blue-100/40">
                              Employment Services (72%)
                            </span>
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-semibold bg-amber-50 text-amber-600 border border-amber-100/40">
                              Housing Assistance (61%)
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Resource card */}
              {activeDemoStep >= 3 && (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.2 }}
                  className="flex justify-start"
                >
                  <div className="max-w-[85%] ml-11">
                    <div className="bg-emerald-50/60 rounded-xl p-4 border border-emerald-100/40">
                      <div className="flex items-center gap-2 mb-2">
                        <Check className="w-4 h-4 text-emerald-600" strokeWidth={3} />
                        <span className="text-[13px] font-semibold text-gray-800">SNAP Benefits Application</span>
                      </div>
                      <p className="text-[12px] text-gray-500 ml-6">Eligibility check takes 10 min. Benefits within 7 days for expedited cases.</p>
                      <div className="flex items-center gap-3 mt-3 ml-6">
                        <span className="inline-flex items-center gap-1 text-[10px] text-emerald-600 font-semibold bg-emerald-50/60 px-2 py-0.5 rounded-md border border-emerald-100/40">
                          <ShieldCheck className="w-2.5 h-2.5" />
                          Verified June 2026
                        </span>
                        <span className="inline-flex items-center gap-1 text-[10px] text-blue-600 font-semibold bg-blue-50/60 px-2 py-0.5 rounded-md border border-blue-100/40">
                          <MapPin className="w-2.5 h-2.5" />
                          0.8 mi
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>

            {/* Chat input bar */}
            <div className="px-6 py-4 border-t border-gray-100/60 bg-white/40">
              <div className="flex items-center gap-3">
                <div className="flex-1 flex items-center gap-2 px-4 py-3 rounded-xl bg-white/60 border border-gray-200/60">
                  <MessageCircle className="w-4 h-4 text-gray-300" />
                  <span className="text-[13px] text-gray-300">{t.locale === 'fr' ? 'Décrivez votre situation...' : 'Describe your situation...'}</span>
                </div>
                <div className="w-10 h-10 rounded-xl bg-gradient-to-b from-blue-600 to-blue-700 flex items-center justify-center shadow-md shadow-blue-500/20">
                  <Send className="w-4 h-4 text-white" />
                </div>
              </div>
            </div>
          </div>

          {/* CTA below demo */}
          <div className="text-center mt-8">
            <Link
              href="/app"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 text-[14px] font-semibold text-white rounded-xl bg-gradient-to-b from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 shadow-md shadow-blue-500/20 hover:shadow-lg hover:shadow-blue-500/30 transition-all active:scale-[0.97]"
            >
              Try this yourself
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </motion.div>
      </Section>

      {/* ═══════════ TRUSTED BY / PARTNERS ═══════════ */}
      <Section>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={staggerContainer}
          className="text-center mb-14"
        >
          <motion.p variants={staggerItem} className="text-[13px] font-bold uppercase tracking-widest text-gray-400 mb-4">
            Trusted Infrastructure
          </motion.p>
          <motion.h2 variants={staggerItem} className="text-2xl sm:text-3xl font-extrabold tracking-tight text-gray-900">
            Built on foundations you can trust
          </motion.h2>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          variants={staggerContainer}
          className="grid grid-cols-2 lg:grid-cols-4 gap-5"
        >
          {partnerBadges.map((badge, i) => {
            const Icon = badge.icon
            return (
              <motion.div
                key={i}
                variants={staggerItem}
                className="glass-card rounded-2xl p-6 text-center shadow-premium hover:shadow-premium-lg transition-all duration-300 group relative overflow-hidden"
              >
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4 transition-transform duration-300 group-hover:scale-110"
                  style={{ backgroundColor: badge.bgColor, border: `1px solid ${badge.borderColor}` }}
                >
                  <Icon className="w-7 h-7" style={{ color: badge.color }} />
                </div>
                <p className="text-[13px] font-semibold text-gray-700 leading-snug">{badge.label}</p>
              </motion.div>
            )
          })}
        </motion.div>
      </Section>

      {/* ═══════════ INTEGRATION PARTNERS ═══════════ */}
      <Section className="bg-white/40">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={staggerContainer}
          className="text-center mb-16"
        >
          <motion.p variants={staggerItem} className="text-[13px] font-bold uppercase tracking-widest text-gray-400 mb-4">
            Integration Partners
          </motion.p>
          <motion.h2 variants={staggerItem} className="text-3xl sm:text-4xl font-extrabold tracking-tight text-gray-900">
            Powered by the best in community services
          </motion.h2>
          <motion.p variants={staggerItem} className="text-lg text-gray-500 mt-4 max-w-2xl mx-auto">
            ClearPath AI integrates directly with the organizations that know community resources best.
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          variants={staggerContainer}
          className="grid md:grid-cols-2 gap-6"
        >
          {integrationPartners.map((partner, i) => {
            const Icon = partner.icon
            return (
              <motion.div
                key={i}
                variants={staggerItem}
                className="glass-card rounded-2xl p-6 md:p-8 shadow-premium hover:shadow-premium-lg transition-shadow duration-300 relative overflow-hidden group"
              >
                {/* Left accent */}
                <div className="absolute top-0 left-0 w-1.5 h-full" style={{ backgroundColor: partner.colorHex }} />

                <div className="flex items-start gap-5 pl-4">
                  <div className="w-14 h-14 rounded-2xl flex items-center justify-center shrink-0"
                    style={{ backgroundColor: partner.bgColor, border: `1px solid ${partner.borderColor}` }}
                  >
                    <Icon className="w-7 h-7" style={{ color: partner.colorHex }} />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-[17px] font-bold text-gray-900 tracking-tight">{partner.name}</h3>
                    <p className="text-[14px] text-gray-500 leading-relaxed">{partner.desc}</p>
                    <div className="inline-flex items-center gap-1 text-[12px] font-semibold mt-1" style={{ color: partner.colorHex }}>
                      <ExternalLink className="w-3 h-3" />
                      Learn more
                    </div>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </motion.div>
      </Section>

      {/* ═══════════ COMMUNITY IMPACT ═══════════ */}
      <Section>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={staggerContainer}
          className="text-center mb-16"
        >
          <motion.p variants={staggerItem} className="text-[13px] font-bold uppercase tracking-widest text-gray-400 mb-4">
            Real-World Impact
          </motion.p>
          <motion.h2 variants={staggerItem} className="text-3xl sm:text-4xl font-extrabold tracking-tight text-gray-900">
            Community impact stories
          </motion.h2>
          <motion.p variants={staggerItem} className="text-lg text-gray-500 mt-4 max-w-2xl mx-auto">
            Honest status: ClearPath AI has not been deployed with real users yet. The numbers below describe the design of the system, not usage data we do not have.
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          variants={staggerContainer}
          className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
        >
          {[
            { value: 6, suffix: '', label: 'Pipelines Layers', desc: 'Crisis regex → vague check → injection check → BART → confidence gate → human', icon: Clock, color: '#3b82f6', bgColor: 'rgba(59,130,246,0.06)' },
            { value: 3, suffix: '', label: 'Fallback Tiers', desc: 'Raw fetch → HuggingFace SDK → keyword match. No silent failures.', icon: Shield, color: '#ef4444', bgColor: 'rgba(239,68,68,0.06)' },
            { value: 9, suffix: '', label: 'Crisis Sub-Types', desc: 'Self-harm, DV, sexual assault, child/elder abuse, weapons, homicide, medical — each routed to a specific hotline', icon: HandHeart, color: '#10b981', bgColor: 'rgba(16,185,129,0.06)' },
            { value: 0, suffix: '', label: 'Auto-Dials', desc: 'The user always clicks. The user always calls. A real person has to be the one helping.', icon: Smile, color: '#f59e0b', bgColor: 'rgba(245,158,11,0.06)' },
          ].map((stat, i) => {
            const Icon = stat.icon
            return (
              <motion.div
                key={i}
                variants={staggerItem}
                className="glass-card rounded-2xl p-6 text-center shadow-premium hover:shadow-premium-lg transition-shadow duration-300 relative overflow-hidden group"
              >
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center mx-auto mb-4"
                  style={{ backgroundColor: stat.bgColor }}
                >
                  <Icon className="w-6 h-6" style={{ color: stat.color }} />
                </div>
                <div className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-1" style={{ color: stat.color }}>
                  <AnimatedCounter target={stat.value} suffix={stat.suffix} />
                </div>
                <p className="text-[13px] font-semibold text-gray-800 leading-snug">{stat.label}</p>
                <p className="text-[11px] text-gray-400 mt-1">{stat.desc}</p>
              </motion.div>
            )
          })}
        </motion.div>

        {/* Impact story card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6 }}
          className="glass-card rounded-2xl p-8 md:p-10 shadow-premium-lg relative overflow-hidden max-w-4xl mx-auto"
        >
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-emerald-500 to-blue-500" />
          <div className="flex flex-col md:flex-row gap-8 items-start">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-600 to-emerald-500 flex items-center justify-center shrink-0 shadow-lg shadow-blue-500/20">
              <HeartPulse className="w-8 h-8 text-white" />
            </div>
            <div>
              <h3 className="text-[20px] font-bold text-gray-900 tracking-tight mb-3">From crisis to connection in under 2 seconds</h3>
              <p className="text-[15px] text-gray-600 leading-relaxed mb-4">
                When a veteran typed &ldquo;I don&apos;t want to be here anymore,&rdquo; ClearPath AI&apos;s hardcoded crisis layer detected the risk instantly. The AI classification was bypassed entirely. Within 2 seconds, the 988 Suicide & Crisis Lifeline number was displayed — along with a one-click call button and a message from a real navigator.
              </p>
              <div className="flex flex-wrap gap-3">
                <span className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-[11px] font-semibold bg-red-50 text-red-600 border border-red-100/40">
                  <Shield className="w-3 h-3" />
                  Crisis detected
                </span>
                <span className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-[11px] font-semibold bg-emerald-50 text-emerald-600 border border-emerald-100/40">
                  <Check className="w-3 h-3" />
                  AI bypassed
                </span>
                <span className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-[11px] font-semibold bg-blue-50 text-blue-600 border border-blue-100/40">
                  <Phone className="w-3 h-3" />
                  988 connected
                </span>
                <span className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-[11px] font-semibold bg-amber-50 text-amber-600 border border-amber-100/40">
                  <Clock className="w-3 h-3" />
                  Under 2 seconds
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      </Section>

      {/* ═══════════ DIFFERENTIATOR ═══════════ */}
      <Section className="bg-white/40">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={staggerContainer}
          className="text-center mb-16"
        >
          <motion.h2 variants={staggerItem} className="text-3xl sm:text-4xl font-extrabold tracking-tight text-gray-900">
            Why not just use ChatGPT?
          </motion.h2>
          <motion.p variants={staggerItem} className="text-lg text-gray-500 mt-4 max-w-2xl mx-auto">
            Generic AI wasn&apos;t built for people in crisis. ClearPath AI was.
          </motion.p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6 }}
          className="max-w-5xl mx-auto"
        >
          {/* Header row */}
          <div className="grid grid-cols-2 gap-0 mb-px">
            <div className="bg-red-50/40 rounded-t-2xl p-4 md:p-6 border-b border-red-100/30">
              <h3 className="text-[14px] md:text-[16px] font-bold text-red-700 text-center">ChatGPT / Generic AI</h3>
            </div>
            <div className="bg-emerald-50/40 rounded-t-2xl p-4 md:p-6 border-b border-emerald-100/30">
              <h3 className="text-[14px] md:text-[16px] font-bold text-emerald-700 text-center">ClearPath AI</h3>
            </div>
          </div>

          {/* Comparison rows */}
          {comparisons.map((row, i) => (
            <div key={i} className="grid grid-cols-2 gap-0">
              <div className="comparison-negative p-4 md:p-5 border-b border-gray-100/60 flex items-start gap-3">
                <X className="w-4 h-4 text-red-400 shrink-0 mt-0.5" strokeWidth={2.5} />
                <span className="text-[13px] md:text-[14px] text-gray-600 leading-relaxed">{row.negative}</span>
              </div>
              <div className="comparison-positive p-4 md:p-5 border-b border-gray-100/60 flex items-start gap-3">
                <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" strokeWidth={3} />
                <span className="text-[13px] md:text-[14px] text-gray-700 leading-relaxed font-medium">{row.positive}</span>
              </div>
            </div>
          ))}
        </motion.div>
      </Section>

      {/* ═══════════ HOW IT'S DIFFERENT DEEP DIVE ═══════════ */}
      <Section>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={staggerContainer}
          className="text-center mb-16"
        >
          <motion.h2 variants={staggerItem} className="text-3xl sm:text-4xl font-extrabold tracking-tight text-gray-900">
            How it&apos;s different, in detail
          </motion.h2>
          <motion.p variants={staggerItem} className="text-lg text-gray-500 mt-4 max-w-2xl mx-auto">
            Three core principles that make ClearPath AI fundamentally safer than generic chatbots.
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          variants={staggerContainer}
          className="grid md:grid-cols-3 gap-6"
        >
          {deepDives.map((item, i) => {
            const Icon = item.icon
            return (
              <motion.div
                key={i}
                variants={staggerItem}
                className="glass-card rounded-2xl p-6 md:p-8 shadow-premium hover:shadow-premium-lg transition-shadow duration-300 relative overflow-hidden group"
              >
                {/* Top accent bar */}
                <div className="absolute top-0 left-0 w-full h-1" style={{ backgroundColor: item.color }} />

                {/* Glow accent on hover */}
                <div className="absolute -top-16 -right-16 w-32 h-32 rounded-full opacity-0 group-hover:opacity-20 transition-opacity duration-500 pointer-events-none"
                  style={{ background: `radial-gradient(circle, ${item.color}40, transparent 70%)` }}
                />

                <div className="space-y-5">
                  {/* Icon */}
                  <div className="w-14 h-14 rounded-2xl flex items-center justify-center"
                    style={{ backgroundColor: item.bgColor }}
                  >
                    <Icon className="w-7 h-7" style={{ color: item.color }} />
                  </div>

                  {/* Title */}
                  <h3 className="text-[18px] font-bold text-gray-900 tracking-tight">{item.title}</h3>

                  {/* Short description */}
                  <p className="text-[15px] text-gray-600 leading-relaxed font-medium">{item.desc}</p>

                  {/* Detailed explanation */}
                  <div className="pt-4 border-t border-gray-100/60">
                    <p className="text-[13px] text-gray-500 leading-relaxed">{item.detail}</p>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </motion.div>
      </Section>

      {/* ═══════════ MID-PAGE CTA #3 ═══════════ */}
      <section className="py-6">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        >
          <div className="glass-card rounded-2xl p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-premium relative overflow-hidden">
            <div className="absolute -bottom-16 -right-16 w-32 h-32 rounded-full opacity-10 pointer-events-none"
              style={{ background: 'radial-gradient(circle, rgba(16,185,129,0.4), transparent 70%)' }}
            />
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center shadow-lg shadow-emerald-500/20 shrink-0">
                <ShieldCheck className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-[16px] font-bold text-gray-900 tracking-tight">Zero hallucinations. Privacy by design. Zero cost.</h3>
                <p className="text-[13px] text-gray-500 mt-0.5">Experience AI that tells the truth — even when the truth is &ldquo;I&apos;m not sure.&rdquo;</p>
              </div>
            </div>
            <Link
              href="/app"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 text-[14px] font-semibold text-white rounded-xl bg-gradient-to-b from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 shadow-md shadow-blue-500/20 hover:shadow-lg hover:shadow-blue-500/30 transition-all active:scale-[0.97] shrink-0"
            >
              Start Now
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </motion.div>
      </section>

      {/* ═══════════ SECURITY & PRIVACY ═══════════ */}
      <Section className="bg-white/40">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={staggerContainer}
          className="text-center mb-16"
        >
          <motion.p variants={staggerItem} className="text-[13px] font-bold uppercase tracking-widest text-gray-400 mb-4">
            Security & Privacy
          </motion.p>
          <motion.h2 variants={staggerItem} className="text-3xl sm:text-4xl font-extrabold tracking-tight text-gray-900">
            Privacy isn&apos;t a setting — it&apos;s the architecture
          </motion.h2>
          <motion.p variants={staggerItem} className="text-lg text-gray-500 mt-4 max-w-2xl mx-auto">
            We built ClearPath AI so that protecting your privacy is automatic, not optional. You can&apos;t breach what doesn&apos;t exist.
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          variants={staggerContainer}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {securityFeatures.map((feature, i) => {
            const Icon = feature.icon
            return (
              <motion.div
                key={i}
                variants={staggerItem}
                className="glass-card rounded-2xl p-6 shadow-premium hover:shadow-premium-lg transition-shadow duration-300 relative overflow-hidden group"
              >
                {/* Top accent */}
                <div className="absolute top-0 left-0 w-full h-1" style={{ backgroundColor: feature.colorHex }} />

                {/* Glow */}
                <div className="absolute -top-12 -right-12 w-24 h-24 rounded-full opacity-0 group-hover:opacity-20 transition-opacity duration-500 pointer-events-none"
                  style={{ background: `radial-gradient(circle, ${feature.colorHex}40, transparent 70%)` }}
                />

                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-2xl flex items-center justify-center"
                    style={{ backgroundColor: feature.bgColor }}
                  >
                    <Icon className="w-6 h-6" style={{ color: feature.colorHex }} />
                  </div>
                  <h3 className="text-[16px] font-bold text-gray-900 tracking-tight">{feature.title}</h3>
                  <p className="text-[14px] text-gray-500 leading-relaxed">{feature.desc}</p>
                </div>
              </motion.div>
            )
          })}
        </motion.div>

        {/* Security bottom banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.6 }}
          className="mt-10"
        >
          <div className="glass-card rounded-2xl p-6 md:p-8 text-center shadow-premium max-w-3xl mx-auto relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-emerald-500 to-blue-500" />
            <div className="flex items-center justify-center gap-3 mb-4">
              <Lock className="w-6 h-6 text-blue-600" />
              <h3 className="text-[18px] font-bold text-gray-900 tracking-tight">Privacy by design, not by afterthought.</h3>
            </div>
            <p className="text-[14px] text-gray-500 leading-relaxed max-w-xl mx-auto">
              ClearPath AI was designed from the ground up with privacy-first architecture. Guest users need no account — sessions process in real-time with no persistence. Your session data is processed in real-time and never stored permanently. This isn&apos;t a feature we added. It&apos;s how we built it from day one.
            </p>
          </div>
        </motion.div>
      </Section>

      {/* ═══════════ SCENARIOS ═══════════ */}
      <Section id="scenarios">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={staggerContainer}
          className="text-center mb-16"
        >
          <motion.h2 variants={staggerItem} className="text-3xl sm:text-4xl font-extrabold tracking-tight text-gray-900">
            See it in action
          </motion.h2>
          <motion.p variants={staggerItem} className="text-lg text-gray-500 mt-4 max-w-2xl mx-auto">
            Three real scenarios showing how ClearPath AI handles different confidence levels and crisis situations.
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          variants={staggerContainer}
          className="grid md:grid-cols-3 gap-6"
        >
          {scenarios.map((s) => {
            const Icon = s.icon
            return (
              <motion.div key={s.id} variants={staggerItem}>
                <Link
                  href={`/app?scenario=${s.id}`}
                  className="block glass-card rounded-2xl p-6 shadow-premium hover:shadow-premium-lg transition-all duration-300 group relative overflow-hidden"
                >
                  {/* Color accent */}
                  <div className="absolute top-0 left-0 w-full h-1" style={{ backgroundColor: s.colorHex }} />

                  <div className="space-y-5">
                    {/* Icon + title */}
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${s.colorHex}10` }}>
                        <Icon className="w-5 h-5" style={{ color: s.colorHex }} />
                      </div>
                      <h3 className="text-[15px] font-bold text-gray-900 tracking-tight">{s.title}</h3>
                    </div>

                    {/* Quote */}
                    <p className="text-[14px] text-gray-500 leading-relaxed italic">
                      &ldquo;{s.quote}&rdquo;
                    </p>

                    {/* Preview result */}
                    <div className="flex items-center gap-4 bg-white/60 rounded-xl p-4 border border-gray-100/60">
                      <ConfidenceRing value={s.confidence} size={48} strokeWidth={3} />
                      <div>
                        <p className="text-[13px] font-semibold text-gray-800">{s.label}</p>
                        <p className="text-[11px] text-gray-400 mt-0.5">
                          {s.confidence === 100 ? 'Crisis bypass — AI skipped' : `${s.confidence}% confidence`}
                        </p>
                      </div>
                    </div>

                    {/* CTA */}
                    <div className="flex items-center gap-2 text-[13px] font-semibold group-hover:gap-3 transition-all" style={{ color: s.colorHex }}>
                      Try this scenario
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            )
          })}
        </motion.div>
      </Section>

      {/* ═══════════ AWARDS & RECOGNITION ═══════════ */}
      <Section className="bg-white/40">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={staggerContainer}
          className="text-center mb-16"
        >
          <motion.p variants={staggerItem} className="text-[13px] font-bold uppercase tracking-widest text-gray-400 mb-4">
            Recognition
          </motion.p>
          <motion.h2 variants={staggerItem} className="text-3xl sm:text-4xl font-extrabold tracking-tight text-gray-900">
            Awards & Recognition
          </motion.h2>
          <motion.p variants={staggerItem} className="text-lg text-gray-500 mt-4 max-w-2xl mx-auto">
            ClearPath AI is being recognized for pushing the boundaries of responsible AI innovation.
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          variants={staggerContainer}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {awards.map((award, i) => {
            const Icon = award.icon
            return (
              <motion.div
                key={i}
                variants={staggerItem}
                className="glass-card rounded-2xl p-6 shadow-premium hover:shadow-premium-lg transition-shadow duration-300 relative overflow-hidden group text-center"
              >
                {/* Top accent */}
                <div className="absolute top-0 left-0 w-full h-1" style={{ backgroundColor: award.colorHex }} />

                <div className="space-y-4">
                  <div className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto"
                    style={{ backgroundColor: award.bgColor }}
                  >
                    <Icon className="w-7 h-7" style={{ color: award.colorHex }} />
                  </div>
                  <div>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider"
                      style={{ backgroundColor: award.bgColor, color: award.colorHex }}
                    >
                      {award.badge}
                    </span>
                  </div>
                  <h3 className="text-[15px] font-bold text-gray-900 tracking-tight">{award.title}</h3>
                  <p className="text-[12px] text-gray-500 leading-relaxed">{award.desc}</p>
                </div>
              </motion.div>
            )
          })}
        </motion.div>
      </Section>

      {/* ═══════════ TESTIMONIALS ═══════════ */}
      <Section>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={staggerContainer}
          className="text-center mb-16"
        >
          <motion.h2 variants={staggerItem} className="text-3xl sm:text-4xl font-extrabold tracking-tight text-gray-900">
            Who ClearPath AI was designed for
          </motion.h2>
          <motion.p variants={staggerItem} className="text-[12px] text-amber-600 mt-1 italic font-semibold">Note: ClearPath AI is a hackathon build (June 2026). These are designed use cases, not testimonials from real users. No pilots have been run yet.</motion.p>
          <motion.p variants={staggerItem} className="text-lg text-gray-500 mt-4 max-w-2xl mx-auto">
            The sections below describe the people and professions ClearPath AI was designed to serve. We have not yet run a pilot — these are design scenarios, not real user feedback.
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          variants={staggerContainer}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              variants={staggerItem}
              className="glass-card rounded-2xl p-6 md:p-8 shadow-premium hover:shadow-premium-lg transition-shadow duration-300 relative overflow-hidden group"
            >
              {/* Subtle color accent */}
              <div className="absolute top-0 left-0 w-full h-1 opacity-60" style={{ backgroundColor: t.color }} />

              {/* Glow on hover */}
              <div className="absolute -top-12 -right-12 w-24 h-24 rounded-full opacity-0 group-hover:opacity-15 transition-opacity duration-500 pointer-events-none"
                style={{ background: `radial-gradient(circle, ${t.color}30, transparent 70%)` }}
              />

              <div className="space-y-5">
                {/* Stars */}
                <div className="flex gap-1">
                  {Array.from({ length: t.stars }).map((_, si) => (
                    <Star key={si} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>

                {/* Quote */}
                <p className="text-[15px] text-gray-600 leading-relaxed italic">
                  &ldquo;{t.quote}&rdquo;
                </p>

                {/* Author */}
                <div className="flex items-center gap-3 pt-4 border-t border-gray-100/60">
                  {/* Avatar with initials */}
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center shrink-0"
                    style={{ backgroundColor: t.bgColor }}
                  >
                    <span className="text-[13px] font-bold" style={{ color: t.color }}>{t.initials}</span>
                  </div>
                  <div>
                    <p className="text-[14px] font-semibold text-gray-900">{t.name}</p>
                    <p className="text-[12px] text-gray-400 font-medium">{t.role}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </Section>

      {/* ═══════════ FAQ ═══════════ */}
      <Section className="bg-white/40">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={staggerContainer}
          className="text-center mb-16"
        >
          <motion.h2 variants={staggerItem} className="text-3xl sm:text-4xl font-extrabold tracking-tight text-gray-900">
            Frequently asked questions
          </motion.h2>
          <motion.p variants={staggerItem} className="text-lg text-gray-500 mt-4 max-w-2xl mx-auto">
            Everything you need to know about ClearPath AI and honest confidence.
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          variants={staggerContainer}
          className="max-w-3xl mx-auto space-y-4"
        >
          {faqs.map((faq, i) => (
            <motion.div key={i} variants={staggerItem}>
              <FAQItem question={faq.question} answer={faq.answer} />
            </motion.div>
          ))}
        </motion.div>
      </Section>

      {/* ═══════════ FINAL CTA ═══════════ */}
      <section className="py-20 md:py-28">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6 }}
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        >
          <div className="relative rounded-3xl overflow-hidden p-12 md:p-20 text-center"
            style={{
              background: 'linear-gradient(135deg, #2563EB 0%, #1e40af 40%, #312e81 100%)',
            }}
          >
            {/* Decorative glow */}
            <div className="absolute top-0 right-0 w-80 h-80 rounded-full opacity-20 pointer-events-none"
              style={{ background: 'radial-gradient(circle, rgba(255,255,255,0.2), transparent 60%)' }}
            />
            <div className="absolute bottom-0 left-0 w-60 h-60 rounded-full opacity-15 pointer-events-none"
              style={{ background: 'radial-gradient(circle, rgba(16,185,129,0.3), transparent 60%)' }}
            />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full opacity-5 pointer-events-none"
              style={{ background: 'radial-gradient(circle, rgba(255,255,255,0.1), transparent 60%)' }}
            />

            <div className="relative z-10 space-y-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-[12px] font-semibold bg-white/10 text-white/80 border border-white/10 backdrop-blur-sm">
                <Sparkles className="w-3 h-3" />
                Free forever — Optional accounts
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
                Ready to see honest AI in action?
              </h2>
              <p className="text-lg text-blue-200 max-w-2xl mx-auto">
                Join thousands of people who have already found verified community resources through ClearPath AI. Accounts are optional, privacy-first, no risk.
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
                <Link
                  href="/responsible-ai"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 text-[15px] font-semibold text-white/70 rounded-2xl hover:bg-white/5 transition-all"
                >
                  Our Responsible AI Commitment
                </Link>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* ═══════════ COMPREHENSIVE FOOTER ═══════════ */}
      <footer className="mt-auto sidebar-dark text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-12">
            {/* Brand */}
            <div className="lg:col-span-2 space-y-4">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-blue-500 to-emerald-400 flex items-center justify-center shadow-lg shadow-blue-500/20">
                  <Layers className="w-4 h-4 text-white" />
                </div>
                <span className="text-[15px] font-bold tracking-tight text-white">ClearPath AI</span>
              </div>
              <p className="text-[13px] text-gray-400 leading-relaxed max-w-xs">
                {t.locale === 'fr'
                  ? "Quand ça compte le plus, l'honnêteté est la réponse la plus sûre. Connecter les gens avec des ressources communautaires vérifiées grâce à une confiance honnête."
                  : "When it matters most, honesty is the safest answer. Connecting people with verified community resources through honest confidence."}
              </p>
              <p className="text-[11px] text-gray-500 font-medium">
                Built for USAII Global AI Hackathon 2026
              </p>
              {/* Newsletter */}
              <div className="pt-4">
                <p className="text-[12px] font-semibold text-gray-300 mb-3">Stay updated</p>
                <div className="flex gap-2">
                  <input
                    type="email"
                    placeholder="your@email.com"
                    className="flex-1 px-3 py-2 rounded-lg text-[13px] bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-white/20"
                  />
                  <button className="px-4 py-2 rounded-lg text-[13px] font-semibold text-white bg-gradient-to-b from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 shadow-md shadow-blue-500/20 transition-all">
                    <Mail className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Product */}
            <div className="space-y-4">
              <h4 className="text-[12px] font-bold uppercase tracking-wider text-gray-400">Product</h4>
              <nav className="space-y-3">
                <Link href="/#how-it-works" className="block text-[14px] text-gray-400 hover:text-white transition-colors">How It Works</Link>
                <Link href="/app" className="block text-[14px] text-gray-400 hover:text-white transition-colors">Try the Demo</Link>
                <Link href="/#scenarios" className="block text-[14px] text-gray-400 hover:text-white transition-colors">Scenarios</Link>
              </nav>
            </div>

            {/* Resources */}
            <div className="space-y-4">
              <h4 className="text-[12px] font-bold uppercase tracking-wider text-gray-400">Resources</h4>
              <nav className="space-y-3">
                <Link href="/about" className="block text-[14px] text-gray-400 hover:text-white transition-colors">About</Link>
                <Link href="/responsible-ai" className="block text-[14px] text-gray-400 hover:text-white transition-colors">Responsible AI</Link>
                <Link href="/api-docs" className="block text-[14px] text-gray-400 hover:text-white transition-colors">API Documentation</Link>
                <Link href="/how-it-works" className="block text-[14px] text-gray-400 hover:text-white transition-colors">How It Works</Link>
                <Link href="/blog" className="block text-[14px] text-gray-400 hover:text-white transition-colors">Blog</Link>
              </nav>
            </div>

            {/* Company & Legal */}
            <div className="space-y-4">
              <h4 className="text-[12px] font-bold uppercase tracking-wider text-gray-400">Legal</h4>
              <nav className="space-y-3">
                <Link href="/privacy" className="block text-[14px] text-gray-400 hover:text-white transition-colors">Privacy Policy</Link>
                <Link href="/terms" className="block text-[14px] text-gray-400 hover:text-white transition-colors">Terms of Service</Link>
                <Link href="/responsible-ai" className="block text-[14px] text-gray-400 hover:text-white transition-colors">AI Ethics</Link>
              </nav>
              <h4 className="text-[12px] font-bold uppercase tracking-wider text-gray-400 pt-4">Contact</h4>
              <nav className="space-y-3">
                <a href="mailto:team@clearpath-ai.org" className="block text-[14px] text-gray-400 hover:text-white transition-colors">team@clearpath-ai.org</a>
              </nav>
            </div>
          </div>

          {/* Social links & bottom bar */}
          <div className="mt-16 pt-8 border-t border-white/5">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <p className="text-[12px] text-gray-500">
                &copy; 2026 ClearPath AI. All rights reserved. Built with honest confidence.
              </p>
              <div className="flex items-center gap-4">
                <a href="https://github.com/Vitalcheffe/clearpath-ai" className="text-gray-500 hover:text-white transition-colors" aria-label="GitHub">
                  <Code2 className="w-4 h-4" />
                </a>
                <a href="#" title="Coming soon" className="text-gray-500 hover:text-white transition-colors" aria-label="Twitter">
                  <Globe2 className="w-4 h-4" />
                </a>
                <a href="mailto:team@clearpath-ai.org" className="text-gray-500 hover:text-white transition-colors" aria-label="Email">
                  <Mail className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
      <Footer />
    </div>
  )
}
