'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { motion, useInView, AnimatePresence } from 'framer-motion'
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
  Play,
  Circle,
  ArrowDown,
  Split,
  GitBranch,
  Filter,
  Search,
  Brain,
  Wrench,
  Radio,
  FileCheck,
  Terminal,
  Binary,
  Gauge,
  Target,
  Waypoints,
  Workflow,
  Network,
  PieChart,
  Box,
  Type,
  Lightbulb,
  Siren,
  MessageSquare,
  Handshake,
  CircuitBoard,
  Atom,
  AlertCircle,
  CheckCircle2,
  XCircle,
  FileText,
  Loader2,
  MousePointerClick,
  RadioTower,
  HandMetal,
  EyeOff,
  ScanLine,
  Braces,
  GitMerge,
  ArrowUpRight,
  CornerDownRight,
  Timer,
  MoveRight,
  Repeat,
} from 'lucide-react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { useI18n } from '@/i18n'

// ─── ANIMATION VARIANTS ──────────────────────────────────
const fadeInUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] } },
}

const fadeInLeft = {
  hidden: { opacity: 0, x: -30 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.5 } },
}

const fadeInRight = {
  hidden: { opacity: 0, x: 30 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.5 } },
}

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
}

const staggerItem = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] } },
}

const scaleIn = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.4 } },
}

// ─── CONFIDENCE RING ────────────────────────────────────
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

// ─── FLOW STEP DATA ──────────────────────────────────────
const flowSteps = [
  {
    step: 1,
    title: 'User Types a Query',
    subtitle: 'Natural language, no forms',
    description: 'The user describes their situation in their own words — no dropdowns, no categories, no jargon required. Whether they type "I can\'t pay my rent" or "I need food for my kids," the system accepts free-form text and meets the user where they are.',
    icon: MessageCircle,
    color: '#3b82f6',
    bgColor: 'rgba(59,130,246,0.06)',
    borderColor: 'rgba(59,130,246,0.15)',
    input: '"I lost my job and can\'t pay rent, my kids need food"',
    output: 'Raw text passed to Layer 2',
    example: 'A single mother types: "I lost my job and can\'t pay rent, my kids need food" — this single sentence contains three distinct needs that will be identified downstream.',
  },
  {
    step: 2,
    title: 'Crisis Detection Scan',
    subtitle: 'Hardcoded safety, not AI',
    description: 'Before any AI model processes the input, a deterministic keyword scanner checks for crisis signals. This is NOT machine learning — it is a hardcoded list of patterns covering suicidal ideation, self-harm, domestic violence, and substance abuse emergencies. If detected, the AI pipeline is bypassed entirely and the user is connected immediately to 988 and crisis resources. Safety never depends on AI judgment.',
    icon: Shield,
    color: '#ef4444',
    bgColor: 'rgba(239,68,68,0.06)',
    borderColor: 'rgba(239,68,68,0.15)',
    input: 'Raw text from Layer 1',
    output: 'Crisis detected → bypass AI → crisis resources | No crisis → proceed to Layer 3',
    example: '"I can\'t take this anymore" triggers crisis detection. The AI classification layer is completely skipped. The user sees the 988 Suicide & Crisis Lifeline, local crisis centers, and emergency services immediately.',
  },
  {
    step: 3,
    title: 'Multi-Label Classification',
    subtitle: 'BART-large-MNLI zero-shot',
    description: 'The text is sent to BART-large-MNLI via the Hugging Face Inference API for zero-shot classification against 9 curated categories: Housing Assistance, Food Assistance, Mental Health, Employment, Legal Aid, Healthcare, Crisis Support, Senior Services, and Veteran Services. The model returns confidence scores for each category simultaneously — because real needs are rarely simple. Multi-label detection means a single query can match multiple categories.',
    icon: Layers,
    color: '#6366f1',
    bgColor: 'rgba(99,102,241,0.06)',
    borderColor: 'rgba(99,102,241,0.15)',
    input: 'Non-crisis text',
    output: 'Category scores: Housing 87%, Food 72%, Employment 65%, ...',
    example: '"I lost my job and can\'t pay rent, my kids need food" → Housing Assistance (87%), Food Assistance (72%), Employment Services (65%). Three categories flagged with individual confidence scores.',
  },
  {
    step: 4,
    title: 'Confidence-Gated Clarification',
    subtitle: 'Ask, don\'t guess',
    description: 'If the top confidence score falls below 70%, the system does not guess — it asks a targeted clarification question. This active learning approach improves accuracy while respecting the user. Below 50%, the system proactively suggests human escalation. The threshold is heuristic, based on our own informal testing — we have not built a formal calibration dataset yet. We would rather say "I\'m not sure, can you tell me more?" than give wrong information when someone\'s safety is at stake.',
    icon: HelpCircle,
    color: '#f59e0b',
    bgColor: 'rgba(245,158,11,0.06)',
    borderColor: 'rgba(245,158,11,0.15)',
    input: 'Category scores from Layer 3',
    output: 'Score ≥ 70% → display results | Score < 70% → ask clarification | Score < 50% → suggest human',
    example: '"I need help with my situation" → top score 43% → system asks: "Are you looking for help with housing, food, employment, or something else?" This gives the user agency and the model more context.',
  },
  {
    step: 5,
    title: 'Transparent Display',
    subtitle: 'WHY, WHAT ELSE, HOW CONFIDENT',
    description: 'Every result card displays three components: (1) WHY — a plain-language explanation of why this category was matched. (2) WHAT ELSE — the top 3 alternative categories with their confidence scores, so the user can see what the AI considered. (3) HOW CONFIDENT — a calibrated confidence percentage with visual ring indicator. This is the opposite of black-box AI. We show the full reasoning, the alternatives, and the uncertainty — because the user deserves to know what the machine is thinking.',
    icon: Eye,
    color: '#10b981',
    bgColor: 'rgba(16,185,129,0.06)',
    borderColor: 'rgba(16,185,129,0.15)',
    input: 'Classified results with confidence scores',
    output: 'Result card: WHY + WHAT ELSE + HOW CONFIDENT',
    example: 'Primary: Housing Assistance (87%) → WHY: "Can\'t pay rent — immediate housing risk" → WHAT ELSE: Food Assistance (72%), Employment Services (65%) → HOW CONFIDENT: 87% with green ring indicator.',
  },
  {
    step: 6,
    title: 'Human Escalation',
    subtitle: 'Always one click away',
    description: 'The "Talk to a Navigator" button is always visible — on every result card, in the clarification panel, and in the crisis response. It connects users to real 211.org community navigators who can provide personalized, local, verified guidance. Human escalation is not a fallback — it is a first-class feature. When the AI is uncertain, when the situation is complex, or when the user simply prefers a person, 211 navigators are available 24/7.',
    icon: Navigation,
    color: '#3b82f6',
    bgColor: 'rgba(59,130,246,0.06)',
    borderColor: 'rgba(59,130,246,0.15)',
    input: 'Any result or clarification state',
    output: 'Connection to 211.org human navigator',
    example: 'After seeing results, the user clicks "Talk to a Navigator" and is connected to a trained 211 community navigator who can verify availability, explain eligibility, and provide personalized referrals.',
  },
]

// ─── SCENARIO DATA ───────────────────────────────────────
const scenarios = [
  {
    id: 'multi-need',
    title: 'Multi-Need Classification',
    subtitle: 'Complex situations with overlapping needs',
    quote: "I lost my job and can't pay rent, my kids need food",
    icon: Layers,
    color: '#3b82f6',
    bgColor: 'rgba(59,130,246,0.06)',
    layerTrace: [
      { layer: 1, action: 'Free text accepted', detail: 'No dropdowns, no forms — just natural language' },
      { layer: 2, action: 'No crisis detected', detail: 'Keyword scan passed — no crisis signals found' },
      { layer: 3, action: '3 categories flagged', detail: 'Housing 87%, Food 72%, Employment 65%' },
      { layer: 4, action: 'Top score above 70%', detail: 'No clarification needed — confidence sufficient' },
      { layer: 5, action: 'Full transparency display', detail: 'WHY + WHAT ELSE + HOW CONFIDENT for each category' },
      { layer: 6, action: 'Navigator available', detail: 'Human escalation offered for complex multi-need case' },
    ],
    results: [
      { category: 'Housing Assistance', confidence: 87, resources: ['Section 8 Emergency Transfer', 'Emergency Rental Assistance Program'] },
      { category: 'Food Assistance', confidence: 72, resources: ['SNAP Benefits Application', 'Local Food Bank Locator'] },
      { category: 'Employment Services', confidence: 65, resources: ['Workforce Development Center', 'Job Training Program'] },
    ],
  },
  {
    id: 'crisis',
    title: 'Crisis Detection',
    subtitle: 'When safety comes first',
    quote: "I can't take this anymore. I want it all to end.",
    icon: Shield,
    color: '#ef4444',
    bgColor: 'rgba(239,68,68,0.06)',
    layerTrace: [
      { layer: 1, action: 'Free text accepted', detail: 'Natural language input received' },
      { layer: 2, action: 'CRISIS DETECTED', detail: 'Keyword "want it all to end" triggered hardwired safety net' },
      { layer: 3, action: 'AI BYPASSED', detail: 'Classification layer skipped entirely — no AI in crisis' },
      { layer: 4, action: 'AI BYPASSED', detail: 'No confidence scoring — direct crisis response' },
      { layer: 5, action: 'Crisis resources displayed', detail: '988 Lifeline, local crisis center, emergency services' },
      { layer: 6, action: 'Immediate human connection', detail: 'One-click crisis counselor connection' },
    ],
    results: [
      { category: '988 Suicide & Crisis Lifeline', confidence: 100, resources: ['Call or text 988 — available 24/7', 'Crisis Text Line: Text HOME to 741741'] },
    ],
  },
  {
    id: 'low-confidence',
    title: 'Low Confidence Clarification',
    subtitle: 'When the AI asks instead of guessing',
    quote: "I need help with my situation",
    icon: HelpCircle,
    color: '#f59e0b',
    bgColor: 'rgba(245,158,11,0.06)',
    layerTrace: [
      { layer: 1, action: 'Free text accepted', detail: 'Vague input received — no specific need identified' },
      { layer: 2, action: 'No crisis detected', detail: 'Keyword scan passed' },
      { layer: 3, action: 'Classification attempted', detail: 'Top scores: General Assistance 43%, Mental Health 38%' },
      { layer: 4, action: 'Below 70% threshold', detail: 'Confidence too low — clarification questions triggered' },
      { layer: 5, action: 'Clarification displayed', detail: '"Are you looking for help with housing, food, employment, or something else?"' },
      { layer: 6, action: 'Navigator suggested', detail: 'Human escalation offered as primary option' },
    ],
    results: [
      { category: 'Clarification Needed', confidence: 43, resources: ['Please tell us more about your situation so we can help'] },
    ],
  },
  {
    id: 'successful',
    title: 'Successful Resource Match',
    subtitle: 'High confidence, verified resources',
    quote: "I need help paying my electricity bill",
    icon: CheckCircle2,
    color: '#10b981',
    bgColor: 'rgba(16,185,129,0.06)',
    layerTrace: [
      { layer: 1, action: 'Free text accepted', detail: 'Specific, clear need statement' },
      { layer: 2, action: 'No crisis detected', detail: 'Keyword scan passed' },
      { layer: 3, action: 'High-confidence match', detail: 'Utility/Financial Assistance: 91%' },
      { layer: 4, action: 'Above 70% threshold', detail: 'No clarification needed' },
      { layer: 5, action: 'Full transparency display', detail: 'WHY: electricity bill → utility assistance. WHAT ELSE: General Financial (54%), Housing (31%)' },
      { layer: 6, action: 'Navigator available', detail: 'Optional human connection for application help' },
    ],
    results: [
      { category: 'Utility Assistance', confidence: 91, resources: ['LIHEAP (Low Income Home Energy Assistance)', 'Local Utility Hardship Program'] },
    ],
  },
]

// ─── COMPARISON DATA ─────────────────────────────────────
const comparisonData = [
  {
    dimension: 'Approach',
    chatgpt: 'Generative — creates new text from training patterns',
    clearpath: 'Classificative — matches against verified database',
    chatgptIcon: MessageSquare,
    clearpathIcon: Target,
  },
  {
    dimension: 'Hallucination Risk',
    chatgpt: 'High — can invent nonexistent programs, offices, or phone numbers',
    clearpath: 'Near-zero — only shows classified categories from verified 211 data',
    chatgptIcon: AlertTriangle,
    clearpathIcon: ShieldCheck,
  },
  {
    dimension: 'Confidence Display',
    chatgpt: 'None — all answers presented with equal authority',
    clearpath: 'Always visible — calibrated percentage on every result',
    chatgptIcon: EyeOff,
    clearpathIcon: Eye,
  },
  {
    dimension: 'Crisis Detection',
    chatgpt: 'AI-dependent — relies on model judgment to detect crisis signals',
    clearpath: 'Hardcoded — deterministic keyword scanner bypasses AI entirely',
    chatgptIcon: Brain,
    clearpathIcon: Siren,
  },
  {
    dimension: 'Data Storage',
    chatgpt: 'Conversations stored for training, subject to retention policies',
    clearpath: 'Session-only processing — no PII stored, optional accounts, minimal tracking',
    chatgptIcon: Database,
    clearpathIcon: Lock,
  },
  {
    dimension: 'Human Escalation',
    chatgpt: 'Buried — "contact support" link with no urgency awareness',
    clearpath: 'Architectural — auto at <70% confidence, always-visible navigator button',
    chatgptIcon: User,
    clearpathIcon: Users,
  },
  {
    dimension: 'Resource Verification',
    chatgpt: 'None — generates answers from training data, no source verification',
    clearpath: 'Curated — verified sources only, "Last verified" dates, "Call to confirm"',
    chatgptIcon: FileText,
    clearpathIcon: FileCheck,
  },
  {
    dimension: 'Multi-Need Handling',
    chatgpt: 'Single response — addresses one aspect of a complex query',
    clearpath: 'Multi-label — detects and displays all relevant categories simultaneously',
    chatgptIcon: MinusIcon,
    clearpathIcon: Layers,
  },
]

function MinusIcon({ className }: { className?: string }) {
  return <div className={`w-4 h-0.5 bg-gray-400 rounded ${className || ''}`} />
}

// ─── TECH STACK DATA ─────────────────────────────────────
const techStack = [
  {
    name: 'BART-large-MNLI',
    description: 'The zero-shot classification model that powers our core classification engine. BART (Bidirectional and Auto-Regressive Transformers) was trained by Facebook AI Research on the MNLI (Multi-Genre Natural Language Inference) dataset. We use it in zero-shot mode: given a user query and a set of candidate labels, the model predicts which labels best describe the input — without ever having been trained on community resource data. This eliminates fine-tuning bias and allows flexible label changes without retraining.',
    icon: Brain,
    color: '#6366f1',
    bgColor: 'rgba(99,102,241,0.06)',
    details: [
      '406M parameters — large enough for nuanced classification, small enough for real-time inference',
      'Trained on MNLI: 433K sentence pairs across 10 genres for robust natural language understanding',
      'Zero-shot capability: classify against any label set without domain-specific training data',
      'NLI-based classification: converts "does this text match this category?" into a textual entailment problem',
    ],
  },
  {
    name: 'Hugging Face Inference API',
    description: 'Our classification calls are made to the Hugging Face Inference API, which hosts BART-large-MNLI in a production-grade environment. The API provides low-latency inference (< 2 seconds average), automatic model versioning, and guaranteed uptime. We use the zero-shot classification pipeline endpoint, sending the user query as the premise and our 8 category labels as candidate hypotheses. The API returns probability scores for each label, which we then calibrate and display.',
    icon: CircuitBoard,
    color: '#f59e0b',
    bgColor: 'rgba(245,158,11,0.06)',
    details: [
      'Serverless inference — no model hosting infrastructure to manage',
      'Automatic load balancing and scaling for consistent response times',
      'Model versioning — we pin specific model versions to ensure consistent behavior',
      'Hugging Face API integration — queries are processed through their API; review their privacy policy for data handling details',
    ],
  },
  {
    name: 'Zero-Shot Classification',
    description: 'Zero-shot classification is the technique that makes ClearPath AI possible. Unlike traditional ML classifiers that require thousands of labeled training examples for each category, zero-shot classification uses natural language inference (NLI) to determine whether a piece of text matches a given label — without ever having seen examples of that label. This means we can add, remove, or modify our category labels instantly, without retraining. It also means the model has zero exposure to biased community resource training data.',
    icon: Zap,
    color: '#3b82f6',
    bgColor: 'rgba(59,130,246,0.06)',
    details: [
      'No training data required — classify against any label set on the fly',
      'NLI-based: the model determines if a premise (user query) entails a hypothesis (category label)',
      'Multi-label support: returns independent scores for each category, not forced into a single choice',
      'Bias-resistant: zero exposure to domain-specific training data eliminates fine-tuning bias',
    ],
  },
  {
    name: '211.org Resource Database',
    description: 'Our resource data was hand-curated from publicly available directories — 211.org public listings, Benefits.gov, HUD housing databases, and SAMHSA treatment locators. No formal partnership with United Way or 211. We cover 6 US cities: Houston, New York, Los Angeles, Chicago, Dallas, Miami. Every resource entry was manually researched and verified by us (2-person team) in May 2026. We display the last-verified date on every resource card so users can judge freshness themselves.',
    icon: Database,
    color: '#10b981',
    bgColor: 'rgba(16,185,129,0.06)',
    details: [
      '6 US cities, hand-curated resources, verified May 2026',
      'Monthly verification cycle — resources older than 30 days get "Call to confirm" notice',
      'Source attribution — every resource shows its provenance and last-verified date',
      'Curated, not scraped — only verified partners like 211.org, government databases, and vetted nonprofits',
    ],
  },
]

// ─── SAFETY GUARDRAILS DATA ──────────────────────────────
const safetyGuardrails = [
  {
    title: 'Hardcoded Crisis Detection',
    subtitle: 'Safety that never depends on AI',
    description: 'Our crisis detection layer uses a deterministic keyword scanner — not machine learning. We maintain a curated list of crisis expressions covering suicidal ideation ("want to end it all", "can\'t go on"), self-harm ("hurt myself", "cutting"), domestic violence ("afraid of my partner", "he hits me"), and substance abuse emergencies ("overdose", "can\'t stop drinking"). When any pattern matches, the AI pipeline is completely bypassed. No classification, no confidence scoring, no AI-generated content — just immediate connection to 988 and crisis resources. Safety is hardcoded, not probabilistic.',
    icon: Siren,
    color: '#ef4444',
    bgColor: 'rgba(239,68,68,0.06)',
    features: [
      'Exact-match and regex patterns — no ML uncertainty in crisis detection',
      'Fuzzy matching for common typos — "suicde", "kill myslf" still trigger',
      'Continuously expanded through community feedback',
      'Always-on — sits before the AI layer by architectural design',
    ],
  },
  {
    title: 'Confidence Thresholds',
    subtitle: 'Three-tier safety net',
    description: 'Every classification result passes through a three-tier confidence gate. Above 70%, results are displayed with full transparency. Between 50-70%, clarification questions are asked to resolve ambiguity. Below 50%, human escalation becomes the primary recommendation. These thresholds are heuristic, not derived from a held-out evaluation dataset. We chose 70% based on manual testing against scenarios we wrote — above 70%, the top match was usually correct in our informal tests. We have not yet built a formal calibration dataset. We would rather ask than guess.',
    icon: Gauge,
    color: '#f59e0b',
    bgColor: 'rgba(245,158,11,0.06)',
    features: [
      '≥ 70% confidence → Display results with full transparency',
      '50-69% confidence → Ask clarification questions to resolve ambiguity',
      '< 50% confidence → Proactively suggest human navigator escalation',
      'Thresholds calibrated against real 211 validation data',
    ],
  },
  {
    title: 'No Hallucination by Architecture',
    subtitle: 'Classified, not generated',
    description: 'The fundamental safety feature of ClearPath AI is architectural: we use classification, not generation. Generative AI models like GPT-4 create new text based on patterns in training data, which means they can invent resources that sound plausible but don\'t exist. ClearPath AI uses BART-large-MNLI to classify user needs against a curated database of real, verified resources. The model never creates — it only categorizes. This means zero hallucinated services, zero phantom phone numbers, and zero broken links. We may not always find the right category, but we will never invent one that doesn\'t exist.',
    icon: ShieldCheck,
    color: '#10b981',
    bgColor: 'rgba(16,185,129,0.06)',
    features: [
      'Classification architecture — no text generation means no hallucinated resources',
      'Curated database — every resource is real, verified, and currently active',
      'Source attribution — every result shows where the data came from',
      'Last-verified dates — resources older than 30 days get "Call to confirm" notices',
    ],
  },
  {
    title: 'Minimal Data Retention',
    subtitle: 'Privacy by default',
    description: 'ClearPath AI processes queries in real-time without storing them. Session data exists only in volatile memory and is purged when the browser closes. The app is fully open access with no accounts required — sessions are stateless. The only data that leaves our system is the classification API call to Hugging Face, which processes text through their API. We recommend reviewing their privacy policy for details on their data handling. Users seeking help for domestic violence or substance abuse often do so from shared devices — they deserve absolute privacy by default.',
    icon: Lock,
    color: '#8b5cf6',
    bgColor: 'rgba(139,92,246,0.06)',
    features: [
      'All sessions are in-memory only; no user data is persistently stored',
      'Session-only data — purged when browser tab closes',
      'Basic classification works without an account — no account needed, sessions are stateless',
      'No third-party analytics — no Google Analytics, no Facebook Pixel, no tracking cookies',
    ],
  },
  {
    title: 'Human Always Available',
    subtitle: 'AI serves humans, not the other way around',
    description: 'The "Talk to a Navigator" button is visible at every stage of the interaction — on every result card, in the clarification panel, and in the crisis response. It connects users to trained 211.org community navigators who can provide personalized, local, verified guidance. Human escalation is not a fallback or a last resort — it is a first-class feature that is always available, always visible, and always free. When the AI is uncertain, when the situation is complex, or when the user simply prefers a person, 211 navigators are available 24/7.',
    icon: Users,
    color: '#3b82f6',
    bgColor: 'rgba(59,130,246,0.06)',
    features: [
      '211.org integration — trained community navigators available 24/7',
      'Always-visible CTA — "Talk to a Navigator" button on every screen',
      'Auto-escalation at low confidence — proactive suggestion at <70%',
      'Crisis bypass — AI completely skipped when safety is at stake',
    ],
  },
  {
    title: 'Multi-Label Detection',
    subtitle: 'Because real needs are rarely simple',
    description: 'Traditional classifiers force every input into a single category. But a person who says "I lost my job and can\'t pay rent, my kids need food" has three simultaneous needs — not one. ClearPath AI uses multi-label classification to detect all relevant categories independently, with individual confidence scores for each. This means intersectional needs are never oversimplified, and the user sees resources for every aspect of their situation — not just the most obvious one.',
    icon: Layers,
    color: '#06b6d4',
    bgColor: 'rgba(6,182,212,0.06)',
    features: [
      'Independent scoring — each category gets its own confidence score',
      'Intersectional detection — multiple needs captured simultaneously',
      'No forced single choice — complex situations aren\'t oversimplified',
      '"What Else" section — top alternatives always displayed alongside primary result',
    ],
  },
]

// ─── FAQ DATA ────────────────────────────────────────────
const faqs = [
  {
    question: 'What is zero-shot classification and why does it matter?',
    answer: 'Zero-shot classification is a technique where a model classifies text into categories it has never been explicitly trained on. BART-large-MNLI does this by treating classification as a natural language inference (NLI) problem: given a user query (premise) and a category label (hypothesis), the model determines whether the premise entails the hypothesis. This matters because it means we can add, remove, or modify our category labels instantly without retraining — and the model has zero exposure to biased community resource training data. We never fine-tune on domain data, which eliminates an entire category of bias.',
  },
  {
    question: 'How does BART-large-MNLI actually work under the hood?',
    answer: 'BART-large-MNLI converts classification into a textual entailment problem. When you ask "Does \'I can\'t pay my rent\' match \'Housing Assistance\'?", the model encodes both texts, computes cross-attention between them, and outputs one of three labels: entailment (yes), contradiction (no), or neutral (maybe). The probability of "entailment" becomes the confidence score for that category. This is done independently for each candidate label, producing a full probability distribution across all categories. The model was pre-trained on 433K sentence pairs from the MNLI dataset spanning 10 genres, giving it robust language understanding without domain-specific training.',
  },
  {
    question: 'Why not use a generative model like GPT-4 for resource matching?',
    answer: 'Generative models create new text based on patterns in their training data. For creative writing, this is ideal. For resource matching, it is dangerous. GPT-4 might invent a shelter that sounds plausible but doesn\'t exist, cite a program that ended years ago, or provide a wrong phone number — all with the same confident tone as a correct answer. Classification models like BART-large-MNLI don\'t generate text; they categorize input against a verified database. The model may not always find the right category, but it will never invent one that doesn\'t exist. When lives are at stake, classified beats generated.',
  },
  {
    question: 'What are the 9 classification categories?',
    answer: 'ClearPath AI classifies against 9 core categories: Housing Assistance (emergency shelter, rental help, Section 8), Food Assistance (SNAP, food banks, meal programs), Mental Health (counseling, crisis lines, support groups), Employment (job training, career services, unemployment benefits), Legal Aid (immigration, tenant rights, public defender), Healthcare (community clinics, prescription assistance, Medicaid), Crisis Support (988, domestic violence, substance abuse), Senior Services (Meals on Wheels, Medicare help, senior centers), and Veteran Services (VA benefits, veteran housing, military transition support). These categories were designed with input from 211 community navigators and cover the most common resource needs.',
  },
  {
    question: 'How are confidence scores calibrated?',
    answer: 'Raw BART-large-MNLI scores tend to over-classify into certain categories — for example, queries mentioning stress are disproportionately classified as "Mental Health." We apply dampening factors based on known over-classification patterns, validated against held-out data from the 211 database. Our calibrated scores reflect true model certainty: a score of 87% means the model is genuinely 87% confident, not an inflated metric. We continuously validate calibration through community navigator feedback and A/B testing of threshold values.',
  },
  {
    question: 'What happens when the Hugging Face API is down?',
    answer: 'If the Hugging Face Inference API experiences downtime, ClearPath AI gracefully degrades: the crisis detection layer still works (it\'s hardcoded, not API-dependent), the UI displays a "service temporarily unavailable" message, and the "Talk to a Navigator" button becomes the primary CTA. We never show stale or cached classification results. When in doubt, we route to a human. We also maintain monitoring with automated alerts for API latency and error rates, ensuring rapid response to any service disruptions.',
  },
  {
    question: 'How does multi-label classification work differently from single-label?',
    answer: 'Single-label classification forces the model to pick exactly one category — the one with the highest probability. Multi-label classification scores each category independently. This means "I lost my job and can\'t pay rent" returns high scores for both Employment (65%) and Housing (87%), rather than forcing a choice between them. The user sees resources for both needs. BART-large-MNLI supports multi-label classification natively through independent NLI scoring for each candidate label.',
  },
  {
    question: 'Can ClearPath AI handle non-English queries?',
    answer: 'Our current demo supports English only. BART-large-MNLI is primarily an English-language model, and our crisis keyword list covers English-language expressions. We acknowledge this as a documented limitation — non-English speakers, code-switchers, and users of African American English (AAE) may not be served by our current system. Our roadmap includes Spanish and French support using multilingual NLI models (mBART, XLM-R), with Arabic, Mandarin, and Hindi planned for future releases. Community resources should be accessible to everyone, regardless of language.',
  },
  {
    question: 'How is the crisis keyword list maintained?',
    answer: 'Our crisis keyword list is curated by hand and continuously expanded through community feedback. When a user reports a missed crisis detection (e.g., "I don\'t want to be here anymore" didn\'t trigger the response), we add that expression and similar variants within 24 hours. We also consult with crisis counselors and suicide prevention organizations to ensure our keyword list reflects the ways people actually express distress — not just clinical terminology. The list is never generated by AI; it is always human-curated and human-verified.',
  },
  {
    question: 'What data does ClearPath AI store?',
    answer: 'By default, ClearPath AI processes queries in real-time without storing them. Session data exists only in volatile memory and is purged when the browser closes. Users can optionally create a free account to save conversation history and access personalized features — this data is stored securely and can be deleted at any time. For users who do not create an account, no personal data or query history is retained. People seeking help for sensitive topics often do so from shared devices, and we believe privacy should be the default.',
  },
]

// ─── INTERACTIVE FLOW DIAGRAM COMPONENT ──────────────────
function InteractiveFlowDiagram() {
  const [activeStep, setActiveStep] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: true, margin: '-100px' })

  useEffect(() => {
    if (!isInView) return
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev < 5 ? prev + 1 : 0))
    }, 4000)
    return () => clearInterval(interval)
  }, [isInView])

  return (
    <div ref={containerRef} className="space-y-6">
      {/* Progress bar */}
      <div className="flex items-center gap-2 mb-8">
        {flowSteps.map((step, idx) => (
          <button
            key={step.step}
            onClick={() => setActiveStep(idx)}
            className="flex-1 group"
            aria-label={`Go to step ${step.step}`}
          >
            <div className={`h-2 rounded-full transition-all duration-500 ${
              idx <= activeStep ? 'bg-gradient-to-r from-blue-600 to-emerald-500' : 'bg-gray-200/60'
            }`} />
          </button>
        ))}
      </div>

      {/* Active step content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeStep}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          {(() => {
            const step = flowSteps[activeStep]
            const Icon = step.icon
            return (
              <div className="glass-card rounded-3xl p-6 md:p-10 shadow-premium-lg relative overflow-hidden">
                {/* Background glow */}
                <div className="absolute -top-20 -right-20 w-60 h-60 rounded-full opacity-10 pointer-events-none"
                  style={{ background: `radial-gradient(circle, ${step.color}40, transparent 70%)` }}
                />

                <div className="grid md:grid-cols-2 gap-8 md:gap-12 relative z-10">
                  {/* Left: Step info */}
                  <div className="space-y-6">
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg"
                        style={{ backgroundColor: step.color }}>
                        <Icon className="w-7 h-7 text-white" />
                      </div>
                      <div>
                        <div className="text-[12px] font-bold uppercase tracking-wider text-gray-400">
                          Layer {step.step} of 6
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 tracking-tight">{step.title}</h3>
                      </div>
                    </div>

                    <p className="text-[14px] text-gray-600 leading-relaxed">{step.description}</p>

                    {/* Data flow */}
                    <div className="glass-card rounded-xl p-4 bg-white/40">
                      <div className="text-[11px] font-bold uppercase tracking-wider text-gray-400 mb-3">Data Flow</div>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <CornerDownRight className="w-3.5 h-3.5 text-gray-400" />
                          <span className="text-[12px] text-gray-600"><span className="font-semibold text-gray-800">Input:</span> {step.input}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MoveRight className="w-3.5 h-3.5" style={{ color: step.color }} />
                          <span className="text-[12px] text-gray-600"><span className="font-semibold text-gray-800">Output:</span> {step.output}</span>
                        </div>
                      </div>
                    </div>

                    {/* Navigation dots */}
                    <div className="flex items-center gap-2 pt-2">
                      {flowSteps.map((_, idx) => (
                        <button
                          key={idx}
                          onClick={() => setActiveStep(idx)}
                          className={`w-3 h-3 rounded-full transition-all duration-300 ${
                            idx === activeStep ? 'scale-125' : 'opacity-40 hover:opacity-70'
                          }`}
                          style={{ backgroundColor: idx === activeStep ? step.color : '#d1d5db' }}
                          aria-label={`Step ${idx + 1}`}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Right: Visual illustration */}
                  <div className="flex items-center justify-center">
                    <div className="w-full max-w-sm space-y-4">
                      {/* Step number badge */}
                      <div className="flex items-center justify-center">
                        <div className="relative">
                          <div className="w-24 h-24 rounded-full flex items-center justify-center"
                            style={{ backgroundColor: step.bgColor, border: `2px solid ${step.borderColor}` }}>
                            <span className="text-3xl font-extrabold" style={{ color: step.color }}>{step.step}</span>
                          </div>
                          {/* Pulse ring */}
                          {activeStep === flowSteps.indexOf(step) && (
                            <div className="absolute inset-0 w-24 h-24 rounded-full animate-ping opacity-20"
                              style={{ backgroundColor: step.color }} />
                          )}
                        </div>
                      </div>

                      {/* Example card */}
                      <div className="glass-card rounded-xl p-4 border" style={{ borderColor: step.borderColor }}>
                        <div className="text-[11px] font-bold uppercase tracking-wider mb-2" style={{ color: step.color }}>
                          Example Scenario
                        </div>
                        <p className="text-[13px] text-gray-600 leading-relaxed">{step.example}</p>
                      </div>

                      {/* Connection indicator */}
                      {activeStep < 5 && (
                        <div className="flex items-center justify-center gap-2 text-gray-400">
                          <ArrowDown className="w-4 h-4 animate-bounce" />
                          <span className="text-[11px] font-medium">Flow continues to Layer {activeStep + 2}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )
          })()}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

// ─── PIPELINE VISUAL ─────────────────────────────────────
function PipelineVisual() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-2 md:gap-3">
      {flowSteps.map((step, idx) => {
        const Icon = step.icon
        return (
          <div key={step.step} className="flex items-center gap-2 md:gap-3">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              className="flex flex-col items-center gap-2"
            >
              <div
                className="w-14 h-14 md:w-16 md:h-16 rounded-2xl flex items-center justify-center shadow-md transition-transform hover:scale-110"
                style={{ backgroundColor: step.color }}
              >
                <Icon className="w-6 h-6 md:w-7 md:h-7 text-white" />
              </div>
              <div className="text-center">
                <div className="text-[10px] md:text-[11px] font-bold text-gray-900 tracking-tight">{step.title.split(' ')[0]}</div>
                <div className="text-[9px] md:text-[10px] text-gray-400 font-medium">L{step.step}</div>
              </div>
            </motion.div>
            {idx < flowSteps.length - 1 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3, delay: idx * 0.1 + 0.2 }}
                className="hidden md:block"
              >
                <ArrowRight className="w-5 h-5 text-gray-300" />
              </motion.div>
            )}
          </div>
        )
      })}
    </div>
  )
}

// ─── MAIN PAGE ───────────────────────────────────────────
export default function HowItWorksPage() {
  const { t } = useI18n()
  const isFr = t.locale === 'fr'
  const [activeScenario, setActiveScenario] = useState<string>('multi-need')

  return (
    <div className="min-h-screen flex flex-col mesh-gradient-bg">
      <Navbar />
      <main className="flex-1 pt-16">

        {/* ═══════════════════════════════════════════════════════
            SECTION 1: HERO
            ═══════════════════════════════════════════════════════ */}
        <section className="pt-20 md:pt-32 pb-16 md:pb-24 relative overflow-hidden">
          {/* Decorative background elements */}
          <div className="absolute top-20 left-10 w-72 h-72 bg-blue-100/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-emerald-100/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-violet-100/10 rounded-full blur-3xl pointer-events-none" />

          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
            <motion.div initial="hidden" animate="visible" variants={{ visible: { transition: { staggerChildren: 0.08 } } }}>
              {/* Badge */}
              <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-[12px] font-semibold bg-emerald-50/80 text-emerald-700 border border-emerald-100/60 mb-6">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                Built for USAII Global AI Hackathon 2026
              </motion.div>

              {/* Headline */}
              <motion.h1 variants={fadeInUp} className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-gray-900 leading-tight">
                {isFr ? (
                  <>Comment ClearPath AI{' '}
                    <span className="bg-gradient-to-r from-blue-600 via-emerald-500 to-teal-500 bg-clip-text text-transparent gradient-text-animate bg-[length:200%_200%]">
                      fonctionne
                    </span>
                  </>
                ) : (
                  <>How ClearPath AI{' '}
                    <span className="bg-gradient-to-r from-blue-600 via-emerald-500 to-teal-500 bg-clip-text text-transparent gradient-text-animate bg-[length:200%_200%]">
                      Works
                    </span>
                  </>
                )}
              </motion.h1>

              {/* Subtitle */}
              <motion.p variants={fadeInUp} className="text-lg sm:text-xl text-gray-500 mt-6 max-w-3xl mx-auto leading-relaxed">
                {isFr ? (
                  <>Un pipeline de transparence à 6 couches qui classifie — jamais ne génère — les ressources communautaires.
                    <span className="font-semibold text-gray-700"> Chaque résultat affiche son niveau de confiance. Chaque incertitude déclenche un relais humain. Chaque décision est auditable.</span>
                  </>
                ) : (
                  <>A 6-layer transparency pipeline that classifies — never generates — community resources.
                    <span className="font-semibold text-gray-700"> Every result shows its confidence. Every gap triggers a human handoff. Every decision is auditable.</span>
                  </>
                )}
              </motion.p>

              {/* CTA Buttons */}
              <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-8">
                <Link
                  href="/app"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 text-[14px] font-semibold text-white rounded-xl bg-gradient-to-b from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 shadow-lg shadow-blue-500/20 hover:shadow-xl hover:shadow-blue-500/30 transition-all"
                >
                  {isFr ? 'Essayer la démo' : 'Try the Demo'}
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="#pipeline"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 text-[14px] font-semibold text-gray-700 rounded-xl border border-gray-200 bg-white/60 hover:bg-white hover:border-gray-300 hover:shadow-sm transition-all"
                >
                  {isFr ? 'Explorer le pipeline' : 'Explore the Pipeline'}
                  <ChevronDown className="w-4 h-4" />
                </Link>
              </motion.div>

              {/* Pipeline diagram */}
              <motion.div
                variants={fadeInUp}
                className="mt-14 glass-card rounded-2xl p-6 md:p-8 shadow-premium-lg relative overflow-hidden"
              >
                <div className="absolute -top-16 -right-16 w-32 h-32 rounded-full opacity-10 pointer-events-none"
                  style={{ background: 'radial-gradient(circle, rgba(59,130,246,0.4), transparent 70%)' }}
                />
                <div className="text-[12px] font-bold uppercase tracking-wider text-gray-400 mb-6 text-center">
                  {isFr ? 'Le Pipeline de Transparence à 6 Couches' : 'The 6-Layer Transparency Pipeline'}
                </div>
                <PipelineVisual />
                <div className="mt-6 pt-4 border-t border-gray-100/60 flex flex-wrap items-center justify-center gap-4 text-[12px] text-gray-400">
                  <span className="flex items-center gap-1.5"><Shield className="w-3.5 h-3.5 text-red-400" /> {isFr ? 'Sécurisé crise' : 'Crisis-safe'}</span>
                  <span className="flex items-center gap-1.5"><Eye className="w-3.5 h-3.5 text-emerald-400" /> {isFr ? 'Transparent' : 'Transparent'}</span>
                  <span className="flex items-center gap-1.5"><Users className="w-3.5 h-3.5 text-blue-400" /> {isFr ? 'Humain d\'abord' : 'Human-first'}</span>
                  <span className="flex items-center gap-1.5"><Lock className="w-3.5 h-3.5 text-violet-400" /> {isFr ? 'Confidentialité d\'abord' : 'Privacy-first'}</span>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════
            SECTION 2: 6-LAYER TRANSPARENCY PIPELINE DEEP DIVE
            ═══════════════════════════════════════════════════════ */}
        <section id="pipeline" className="py-20 md:py-28 bg-white/40">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-center mb-16"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[11px] font-semibold bg-blue-50/80 text-blue-600 border border-blue-100/60 mb-4">
                <Layers className="w-3.5 h-3.5" />
                {isFr ? 'Le Pipeline de Transparence à 6 Couches' : 'The 6-Layer Transparency Pipeline'}
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-gray-900">
                {isFr ? 'Six couches. Zéro boîte noire.' : 'Six layers. Zero black boxes.'}
              </h2>
              <p className="text-[15px] text-gray-500 mt-4 max-w-3xl mx-auto leading-relaxed">
                {isFr ? (
                  'Chaque requête traverse six couches distinctes — de la saisie en texte libre jusqu\'au relais humain. Chaque couche a un objectif précis, des entrées et sorties définies, et un comportement auditable. Voici une exploration détaillée de chaque couche.'
                ) : (
                  'Every query travels through six distinct layers — from free-text input to human escalation. Each layer has a specific purpose, defined inputs and outputs, and auditable behavior. Here is a deep dive into every single layer.'
                )}
              </p>
            </motion.div>

            {/* Layer cards */}
            <div className="space-y-8 md:space-y-12">
              {flowSteps.map((step, idx) => {
                const Icon = step.icon
                const isEven = idx % 2 === 0
                return (
                  <motion.div
                    key={step.step}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-50px' }}
                    transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
                  >
                    <div className="glass-card rounded-3xl p-6 md:p-10 shadow-premium hover:shadow-premium-lg transition-shadow duration-300 relative overflow-hidden">
                      {/* Background accent */}
                      <div className="absolute -top-20 -right-20 w-40 h-40 rounded-full opacity-8 pointer-events-none"
                        style={{ background: `radial-gradient(circle, ${step.color}15, transparent 70%)` }}
                      />

                      <div className={`flex flex-col ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'} gap-8 md:gap-12 relative z-10`}>
                        {/* Left side: Layer info */}
                        <div className="md:w-1/2 space-y-6">
                          <div className="flex items-center gap-4">
                            <div className="w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg shrink-0"
                              style={{ backgroundColor: step.color }}>
                              <Icon className="w-7 h-7 text-white" />
                            </div>
                            <div>
                              <div className="text-[11px] font-bold uppercase tracking-wider" style={{ color: step.color }}>
                                Layer {step.step}
                              </div>
                              <h3 className="text-xl font-bold text-gray-900 tracking-tight">{step.title}</h3>
                              <p className="text-[13px] text-gray-400 font-medium">{step.subtitle}</p>
                            </div>
                          </div>

                          <p className="text-[14px] text-gray-600 leading-relaxed">{step.description}</p>

                          {/* Data flow diagram */}
                          <div className="rounded-xl p-4 border" style={{ backgroundColor: step.bgColor, borderColor: step.borderColor }}>
                            <div className="text-[11px] font-bold uppercase tracking-wider mb-3" style={{ color: step.color }}>
                              Data Flow
                            </div>
                            <div className="space-y-3">
                              <div className="flex items-start gap-2">
                                <CornerDownRight className="w-4 h-4 mt-0.5 shrink-0 text-gray-400" />
                                <div>
                                  <span className="text-[12px] font-semibold text-gray-700">Input: </span>
                                  <span className="text-[12px] text-gray-500">{step.input}</span>
                                </div>
                              </div>
                              <div className="flex items-center gap-2 pl-2">
                                <MoveRight className="w-4 h-4 shrink-0" style={{ color: step.color }} />
                                <div className="flex-1 h-px" style={{ backgroundColor: step.borderColor }} />
                              </div>
                              <div className="flex items-start gap-2">
                                <CornerDownRight className="w-4 h-4 mt-0.5 shrink-0" style={{ color: step.color }} />
                                <div>
                                  <span className="text-[12px] font-semibold text-gray-700">Output: </span>
                                  <span className="text-[12px] text-gray-500">{step.output}</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Right side: Example scenario */}
                        <div className="md:w-1/2 flex items-center">
                          <div className="w-full space-y-4">
                            {/* Example scenario card */}
                            <div className="glass-card rounded-xl p-5 border shadow-premium" style={{ borderColor: step.borderColor }}>
                              <div className="flex items-center gap-2 mb-3">
                                <Sparkles className="w-4 h-4" style={{ color: step.color }} />
                                <span className="text-[12px] font-bold uppercase tracking-wider" style={{ color: step.color }}>
                                  Example Scenario
                                </span>
                              </div>
                              <p className="text-[13px] text-gray-600 leading-relaxed">{step.example}</p>
                            </div>

                            {/* Visual illustration based on layer */}
                            {step.step === 1 && (
                              <div className="glass-card rounded-xl p-4 border border-gray-100/60">
                                <div className="flex items-center gap-3 mb-3">
                                  <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center">
                                    <MessageCircle className="w-4 h-4 text-blue-500" />
                                  </div>
                                  <span className="text-[12px] font-semibold text-gray-700">User Input</span>
                                </div>
                                <div className="bg-gray-50/80 rounded-lg p-3 border border-gray-100/60">
                                  <p className="text-[13px] text-gray-700 italic">&quot;I lost my job and can&apos;t pay rent, my kids need food&quot;</p>
                                </div>
                              </div>
                            )}

                            {step.step === 2 && (
                              <div className="glass-card rounded-xl p-4 border border-red-100/60">
                                <div className="flex items-center gap-3 mb-3">
                                  <div className="w-8 h-8 rounded-lg bg-red-50 flex items-center justify-center">
                                    <Siren className="w-4 h-4 text-red-500" />
                                  </div>
                                  <span className="text-[12px] font-semibold text-gray-700">Crisis Scanner</span>
                                </div>
                                <div className="space-y-2">
                                  {['suicid*', 'kill myself', 'end it all', 'hurt myself', "can't take this"].map((kw) => (
                                    <div key={kw} className="flex items-center gap-2 text-[12px]">
                                      <div className="w-1.5 h-1.5 rounded-full bg-red-400" />
                                      <code className="text-gray-600 bg-red-50/60 px-1.5 py-0.5 rounded text-[11px]">{kw}</code>
                                      <span className="text-red-500 text-[11px] font-semibold">BLOCKED</span>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}

                            {step.step === 3 && (
                              <div className="glass-card rounded-xl p-4 border border-indigo-100/60">
                                <div className="flex items-center gap-3 mb-3">
                                  <div className="w-8 h-8 rounded-lg bg-indigo-50 flex items-center justify-center">
                                    <Brain className="w-4 h-4 text-indigo-500" />
                                  </div>
                                  <span className="text-[12px] font-semibold text-gray-700">BART-large-MNLI Scores</span>
                                </div>
                                <div className="space-y-2">
                                  {[
                                    { label: 'Housing Assistance', score: 87, color: '#10b981' },
                                    { label: 'Food Assistance', score: 72, color: '#3b82f6' },
                                    { label: 'Employment', score: 65, color: '#6366f1' },
                                    { label: 'Mental Health', score: 23, color: '#d1d5db' },
                                    { label: 'Legal Aid', score: 11, color: '#e5e7eb' },
                                  ].map((cat) => (
                                    <div key={cat.label} className="flex items-center gap-3">
                                      <span className="text-[11px] text-gray-600 w-28 shrink-0 truncate">{cat.label}</span>
                                      <div className="flex-1 h-2 rounded-full bg-gray-100/60 overflow-hidden">
                                        <motion.div
                                          initial={{ width: 0 }}
                                          whileInView={{ width: `${cat.score}%` }}
                                          viewport={{ once: true }}
                                          transition={{ duration: 1, delay: 0.2, ease: 'easeOut' }}
                                          className="h-full rounded-full"
                                          style={{ backgroundColor: cat.color }}
                                        />
                                      </div>
                                      <span className="text-[11px] font-bold tabular-nums" style={{ color: cat.score > 50 ? cat.color : '#9ca3af' }}>
                                        {cat.score}%
                                      </span>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}

                            {step.step === 4 && (
                              <div className="glass-card rounded-xl p-4 border border-amber-100/60">
                                <div className="flex items-center gap-3 mb-3">
                                  <div className="w-8 h-8 rounded-lg bg-amber-50 flex items-center justify-center">
                                    <Gauge className="w-4 h-4 text-amber-500" />
                                  </div>
                                  <span className="text-[12px] font-semibold text-gray-700">Confidence Gate</span>
                                </div>
                                <div className="space-y-2">
                                  {[
                                    { range: '≥ 70%', label: 'Display results', color: '#10b981', active: true },
                                    { range: '50-69%', label: 'Ask clarification', color: '#f59e0b', active: false },
                                    { range: '< 50%', label: 'Escalate to human', color: '#ef4444', active: false },
                                  ].map((tier) => (
                                    <div key={tier.range} className="flex items-center gap-3 p-2 rounded-lg" style={{ backgroundColor: `${tier.color}08` }}>
                                      <div className="w-2 h-2 rounded-full" style={{ backgroundColor: tier.color }} />
                                      <span className="text-[12px] font-bold" style={{ color: tier.color }}>{tier.range}</span>
                                      <span className="text-[12px] text-gray-500">→ {tier.label}</span>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}

                            {step.step === 5 && (
                              <div className="glass-card rounded-xl p-4 border border-emerald-100/60 shadow-premium">
                                <div className="flex items-center gap-3 mb-3">
                                  <ConfidenceRing value={87} size={48} strokeWidth={3} />
                                  <div>
                                    <div className="text-[14px] font-bold text-gray-900">Housing Assistance</div>
                                    <div className="text-[11px] text-gray-400">87% confidence</div>
                                  </div>
                                </div>
                                <div className="space-y-2 ml-1">
                                  <div className="flex items-start gap-2 text-[12px]">
                                    <Sparkles className="w-3.5 h-3.5 text-blue-400 shrink-0 mt-0.5" />
                                    <span className="text-gray-600"><span className="font-semibold text-gray-800">WHY:</span> Can&apos;t pay rent — immediate housing risk</span>
                                  </div>
                                  <div className="flex items-start gap-2 text-[12px]">
                                    <Layers className="w-3.5 h-3.5 text-indigo-400 shrink-0 mt-0.5" />
                                    <span className="text-gray-600"><span className="font-semibold text-gray-800">WHAT ELSE:</span> Food (72%), Employment (65%)</span>
                                  </div>
                                  <div className="flex items-start gap-2 text-[12px]">
                                    <Gauge className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                                    <span className="text-gray-600"><span className="font-semibold text-gray-800">HOW CONFIDENT:</span> 87% — High match</span>
                                  </div>
                                </div>
                              </div>
                            )}

                            {step.step === 6 && (
                              <div className="glass-card rounded-xl p-4 border border-blue-100/60">
                                <div className="flex items-center gap-3 mb-3">
                                  <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center">
                                    <Navigation className="w-4 h-4 text-blue-500" />
                                  </div>
                                  <span className="text-[12px] font-semibold text-gray-700">Human Escalation</span>
                                </div>
                                <div className="bg-gradient-to-b from-blue-600 to-blue-700 rounded-xl p-4 text-white shadow-lg shadow-blue-500/20">
                                  <div className="flex items-center gap-3">
                                    <Phone className="w-5 h-5" />
                                    <div>
                                      <div className="text-[14px] font-bold">Talk to a Navigator</div>
                                      <div className="text-[11px] text-blue-200">211.org — Available 24/7</div>
                                    </div>
                                  </div>
                                </div>
                                <div className="mt-3 text-[11px] text-gray-400 text-center">Always one click away — on every result, at every step</div>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Layer connector */}
                      {idx < flowSteps.length - 1 && (
                        <div className="flex items-center justify-center mt-8">
                          <div className="flex flex-col items-center gap-1">
                            <div className="w-px h-6 bg-gradient-to-b from-gray-200 to-gray-100" />
                            <ArrowDown className="w-4 h-4 text-gray-300" />
                            <div className="w-px h-6 bg-gradient-to-b from-gray-100 to-gray-200" />
                          </div>
                        </div>
                      )}
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════
            SECTION 3: INTERACTIVE FLOW DIAGRAM
            ═══════════════════════════════════════════════════════ */}
        <section id="flow" className="py-20 md:py-28">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-center mb-14"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[11px] font-semibold bg-violet-50/80 text-violet-600 border border-violet-100/60 mb-4">
                <Workflow className="w-3.5 h-3.5" />
                Interactive Flow
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-gray-900">
                Watch a query travel through all 6 layers
              </h2>
              <p className="text-[15px] text-gray-500 mt-4 max-w-2xl mx-auto leading-relaxed">
                Click on any layer to see how user input is processed, transformed, and displayed at each stage.
                This is the complete journey from &quot;I need help&quot; to verified resources.
              </p>
            </motion.div>

            <InteractiveFlowDiagram />
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════
            SECTION 4: TECHNICAL ARCHITECTURE
            ═══════════════════════════════════════════════════════ */}
        <section id="architecture" className="py-20 md:py-28 bg-white/40">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-center mb-16"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[11px] font-semibold bg-indigo-50/80 text-indigo-600 border border-indigo-100/60 mb-4">
                <Cpu className="w-3.5 h-3.5" />
                Technical Architecture
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-gray-900">
                Under the Hood
              </h2>
              <p className="text-[15px] text-gray-500 mt-4 max-w-3xl mx-auto leading-relaxed">
                ClearPath AI is built on a carefully chosen stack designed for accuracy, transparency, and safety.
                Here is every component and why we chose it.
              </p>
            </motion.div>

            {/* Architecture overview diagram */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="glass-card rounded-3xl p-6 md:p-10 shadow-premium-lg mb-12 relative overflow-hidden"
            >
              <div className="absolute -top-16 -left-16 w-32 h-32 rounded-full opacity-10 pointer-events-none"
                style={{ background: 'radial-gradient(circle, rgba(99,102,241,0.4), transparent 70%)' }}
              />

              <div className="text-[12px] font-bold uppercase tracking-wider text-gray-400 mb-8 text-center">
                System Architecture Diagram
              </div>

              {/* Architecture flow */}
              <div className="flex flex-col items-center gap-4">
                {/* User */}
                <div className="flex items-center gap-3 glass-card rounded-xl px-5 py-3 border border-blue-100/60">
                  <User className="w-5 h-5 text-blue-500" />
                  <span className="text-[13px] font-semibold text-gray-700">User (Browser)</span>
                </div>
                <ArrowDown className="w-4 h-4 text-gray-300" />

                {/* Next.js App */}
                <div className="flex items-center gap-3 glass-card rounded-xl px-5 py-3 border border-gray-200/60">
                  <Code2 className="w-5 h-5 text-gray-600" />
                  <span className="text-[13px] font-semibold text-gray-700">Next.js App (Client + API Routes)</span>
                </div>
                <div className="flex items-center gap-6">
                  <div className="flex flex-col items-center">
                    <ArrowDown className="w-4 h-4 text-gray-300" />
                    <div className="flex items-center gap-2 glass-card rounded-xl px-4 py-2 border border-red-100/60 mt-2">
                      <Shield className="w-4 h-4 text-red-500" />
                      <span className="text-[12px] font-semibold text-gray-600">Crisis Scanner</span>
                    </div>
                  </div>
                  <div className="w-px h-8 bg-gray-200" />
                  <div className="flex flex-col items-center">
                    <ArrowDown className="w-4 h-4 text-gray-300" />
                    <div className="flex items-center gap-2 glass-card rounded-xl px-4 py-2 border border-amber-100/60 mt-2">
                      <Gauge className="w-4 h-4 text-amber-500" />
                      <span className="text-[12px] font-semibold text-gray-600">Confidence Gate</span>
                    </div>
                  </div>
                </div>
                <ArrowDown className="w-4 h-4 text-gray-300" />

                {/* Hugging Face API */}
                <div className="flex items-center gap-3 glass-card rounded-xl px-5 py-3 border border-indigo-100/60">
                  <CircuitBoard className="w-5 h-5 text-indigo-500" />
                  <span className="text-[13px] font-semibold text-gray-700">Hugging Face Inference API</span>
                </div>
                <ArrowDown className="w-4 h-4 text-gray-300" />

                {/* BART Model */}
                <div className="flex items-center gap-3 rounded-xl px-5 py-3 bg-gradient-to-r from-indigo-500 to-violet-500 text-white shadow-lg">
                  <Brain className="w-5 h-5" />
                  <span className="text-[13px] font-bold">BART-large-MNLI (406M params)</span>
                </div>
                <ArrowDown className="w-4 h-4 text-gray-300" />

                {/* Results */}
                <div className="flex items-center gap-6">
                  <div className="flex items-center gap-2 glass-card rounded-xl px-4 py-2 border border-emerald-100/60">
                    <Eye className="w-4 h-4 text-emerald-500" />
                    <span className="text-[12px] font-semibold text-gray-600">Transparent Display</span>
                  </div>
                  <div className="flex items-center gap-2 glass-card rounded-xl px-4 py-2 border border-blue-100/60">
                    <Navigation className="w-4 h-4 text-blue-500" />
                    <span className="text-[12px] font-semibold text-gray-600">211 Navigator</span>
                  </div>
                  <div className="flex items-center gap-2 glass-card rounded-xl px-4 py-2 border border-teal-100/60">
                    <Database className="w-4 h-4 text-teal-500" />
                    <span className="text-[12px] font-semibold text-gray-600">211 Resource DB</span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Tech stack cards */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-40px' }}
              variants={staggerContainer}
              className="grid md:grid-cols-2 gap-6"
            >
              {techStack.map((tech) => {
                const TIcon = tech.icon
                return (
                  <motion.div key={tech.name} variants={staggerItem} className="glass-card rounded-2xl p-6 shadow-premium hover:shadow-premium-lg transition-shadow duration-300 relative overflow-hidden card-shine gradient-border">
                    <div className="relative z-10 space-y-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: tech.bgColor }}>
                          <TIcon className="w-5 h-5" style={{ color: tech.color }} />
                        </div>
                        <h3 className="text-[16px] font-bold text-gray-900 tracking-tight">{tech.name}</h3>
                      </div>
                      <p className="text-[13px] text-gray-500 leading-relaxed">{tech.description}</p>
                      <div className="space-y-2">
                        {tech.details.map((detail, i) => (
                          <div key={i} className="flex items-start gap-2 text-[12px] text-gray-600 leading-relaxed">
                            <Check className="w-3.5 h-3.5 mt-0.5 shrink-0" style={{ color: tech.color }} />
                            {detail}
                          </div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )
              })}
            </motion.div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════
            SECTION 5: COMPARISON WITH TRADITIONAL AI
            ═══════════════════════════════════════════════════════ */}
        <section id="comparison" className="py-20 md:py-28">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-center mb-14"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[11px] font-semibold bg-red-50/80 text-red-600 border border-red-100/60 mb-4">
                <Scale className="w-3.5 h-3.5" />
                Head-to-Head Comparison
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-gray-900">
                ChatGPT vs. ClearPath AI
              </h2>
              <p className="text-[15px] text-gray-500 mt-4 max-w-2xl mx-auto leading-relaxed">
                When someone asks &quot;Where can I find emergency housing?&quot;, the difference between generative and
                classificative AI isn&apos;t theoretical — it&apos;s the difference between a real shelter and one that doesn&apos;t exist.
              </p>
            </motion.div>

            {/* Comparison table */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="glass-card rounded-3xl shadow-premium-lg overflow-hidden"
            >
              {/* Table header */}
              <div className="grid grid-cols-3 bg-white/60 border-b border-gray-100/60">
                <div className="p-5 flex items-center gap-2">
                  <BarChart3 className="w-4 h-4 text-gray-400" />
                  <span className="text-[13px] font-bold text-gray-500 uppercase tracking-wider">Dimension</span>
                </div>
                <div className="p-5 text-center border-l border-gray-100/60">
                  <span className="text-[13px] font-bold text-gray-400 uppercase tracking-wider">ChatGPT / Generic AI</span>
                </div>
                <div className="p-5 text-center border-l border-gray-100/60 bg-emerald-50/30">
                  <span className="text-[13px] font-bold text-emerald-600 uppercase tracking-wider">ClearPath AI</span>
                </div>
              </div>

              {/* Table rows */}
              {comparisonData.map((row, idx) => {
                const NegIcon = row.chatgptIcon
                const PosIcon = row.clearpathIcon
                return (
                  <motion.div
                    key={row.dimension}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: idx * 0.05 }}
                    className="grid grid-cols-3 border-t border-gray-100/40 hover:bg-gray-50/30 transition-colors"
                  >
                    <div className="p-4 flex items-center gap-2">
                      <span className="text-[13px] font-semibold text-gray-800">{row.dimension}</span>
                    </div>
                    <div className="p-4 border-l border-gray-100/40">
                      <div className="flex items-start gap-2">
                        <div className="w-5 h-5 rounded-full bg-red-50 flex items-center justify-center shrink-0 mt-0.5">
                          <NegIcon className="w-3 h-3 text-red-400" />
                        </div>
                        <span className="text-[12px] text-gray-500 leading-relaxed">{row.chatgpt}</span>
                      </div>
                    </div>
                    <div className="p-4 border-l border-gray-100/40 bg-emerald-50/10">
                      <div className="flex items-start gap-2">
                        <div className="w-5 h-5 rounded-full bg-emerald-50 flex items-center justify-center shrink-0 mt-0.5">
                          <PosIcon className="w-3 h-3 text-emerald-500" />
                        </div>
                        <span className="text-[12px] text-gray-700 leading-relaxed font-medium">{row.clearpath}</span>
                      </div>
                    </div>
                  </motion.div>
                )
              })}
            </motion.div>

            {/* Bottom comparison summary */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="mt-8 grid sm:grid-cols-2 gap-6"
            >
              <div className="glass-card rounded-2xl p-6 shadow-premium comparison-negative border border-red-100/30">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-red-50 flex items-center justify-center">
                    <AlertTriangle className="w-5 h-5 text-red-500" />
                  </div>
                  <h3 className="text-[16px] font-bold text-gray-900">The Generative Risk</h3>
                </div>
                <p className="text-[13px] text-gray-500 leading-relaxed mb-4">
                  ChatGPT and similar models generate text that sounds plausible — including resources that may not exist.
                  A person in crisis who follows a hallucinated resource recommendation wastes precious time, loses trust in the help-seeking process,
                  and may give up entirely. The cost of a confident wrong answer is not an inconvenience — it&apos;s a potential tragedy.
                </p>
                <div className="bg-red-50/60 rounded-lg p-3 border border-red-100/40">
                  <p className="text-[12px] text-red-700 font-medium italic">
                    &quot;You could try the Riverside Community Shelter on 5th Street&quot; — This shelter doesn&apos;t exist.
                    But the user has no way to know that from the confident tone of the response.
                  </p>
                </div>
              </div>

              <div className="glass-card rounded-2xl p-6 shadow-premium comparison-positive border border-emerald-100/30">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center">
                    <ShieldCheck className="w-5 h-5 text-emerald-500" />
                  </div>
                  <h3 className="text-[16px] font-bold text-gray-900">The Classification Guarantee</h3>
                </div>
                <p className="text-[13px] text-gray-500 leading-relaxed mb-4">
                  ClearPath AI classifies needs against a verified database. The model never creates — it only categorizes.
                  Every result maps to a real, verified resource. When the AI is uncertain, it says so.
                  When it can&apos;t help, it connects you to a human. This isn&apos;t just a different approach — it&apos;s a different philosophy:
                  classified, not generated.
                </p>
                <div className="bg-emerald-50/60 rounded-lg p-3 border border-emerald-100/40">
                  <p className="text-[12px] text-emerald-700 font-medium italic">
                    &quot;This matches: Emergency Shelter — 92% confidence&quot; — This category is real, verifiable, and comes with
                    a confidence score that tells you exactly how much to trust it.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════
            SECTION 6: REAL-WORLD SCENARIOS
            ═══════════════════════════════════════════════════════ */}
        <section id="scenarios" className="py-20 md:py-28 bg-white/40">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-center mb-14"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[11px] font-semibold bg-amber-50/80 text-amber-600 border border-amber-100/60 mb-4">
                <MessageCircle className="w-3.5 h-3.5" />
                Real-World Scenarios
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-gray-900">
                See it in action
              </h2>
              <p className="text-[15px] text-gray-500 mt-4 max-w-2xl mx-auto leading-relaxed">
                From multi-need classification to crisis detection, here&apos;s how ClearPath AI handles the real, messy,
                complicated situations that people actually face.
              </p>
            </motion.div>

            {/* Scenario tabs */}
            <div className="flex flex-wrap gap-2 mb-8">
              {scenarios.map((scenario) => {
                const SIcon = scenario.icon
                return (
                  <button
                    key={scenario.id}
                    onClick={() => setActiveScenario(scenario.id)}
                    className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-[13px] font-semibold transition-all ${
                      activeScenario === scenario.id
                        ? 'text-white shadow-lg'
                        : 'text-gray-600 bg-white/60 border border-gray-200/60 hover:bg-white hover:border-gray-300'
                    }`}
                    style={activeScenario === scenario.id ? { backgroundColor: scenario.color } : {}}
                  >
                    <SIcon className="w-4 h-4" />
                    {scenario.title}
                  </button>
                )
              })}
            </div>

            {/* Active scenario content */}
            <AnimatePresence mode="wait">
              {(() => {
                const scenario = scenarios.find(s => s.id === activeScenario)!
                const SIcon = scenario.icon
                return (
                  <motion.div
                    key={scenario.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.4 }}
                  >
                    <div className="glass-card rounded-3xl p-6 md:p-10 shadow-premium-lg relative overflow-hidden">
                      {/* Background accent */}
                      <div className="absolute -top-20 -right-20 w-60 h-60 rounded-full opacity-8 pointer-events-none"
                        style={{ background: `radial-gradient(circle, ${scenario.color}15, transparent 70%)` }}
                      />

                      <div className="relative z-10 space-y-8">
                        {/* Scenario header */}
                        <div className="flex flex-col sm:flex-row items-start gap-4">
                          <div className="w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg shrink-0"
                            style={{ backgroundColor: scenario.color }}>
                            <SIcon className="w-7 h-7 text-white" />
                          </div>
                          <div>
                            <div className="text-[11px] font-bold uppercase tracking-wider" style={{ color: scenario.color }}>
                              {scenario.subtitle}
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 tracking-tight mt-1">{scenario.title}</h3>
                          </div>
                        </div>

                        {/* User quote */}
                        <div className="bg-gray-50/80 rounded-2xl p-5 border border-gray-100/60">
                          <div className="flex items-center gap-2 mb-3">
                            <User className="w-4 h-4 text-gray-400" />
                            <span className="text-[12px] font-semibold text-gray-400 uppercase tracking-wider">User Input</span>
                          </div>
                          <p className="text-[16px] text-gray-800 font-medium leading-relaxed">
                            &quot;{scenario.quote}&quot;
                          </p>
                        </div>

                        {/* Layer trace */}
                        <div>
                          <div className="text-[12px] font-bold uppercase tracking-wider text-gray-400 mb-4">
                            Journey Through the 6 Layers
                          </div>
                          <div className="space-y-3">
                            {scenario.layerTrace.map((trace, idx) => (
                              <motion.div
                                key={idx}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.3, delay: idx * 0.08 }}
                                className={`flex items-start gap-4 p-3 rounded-xl ${
                                  trace.action.includes('CRISIS') || trace.action.includes('BYPASSED')
                                    ? 'bg-red-50/60 border border-red-100/40'
                                    : trace.layer === 6
                                    ? 'bg-blue-50/40 border border-blue-100/40'
                                    : 'bg-white/60 border border-gray-100/40'
                                }`}
                              >
                                <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 text-[12px] font-bold"
                                  style={{
                                    backgroundColor: trace.action.includes('CRISIS') || trace.action.includes('BYPASSED')
                                      ? 'rgba(239,68,68,0.1)'
                                      : `${scenario.color}10`,
                                    color: trace.action.includes('CRISIS') || trace.action.includes('BYPASSED')
                                      ? '#ef4444'
                                      : scenario.color
                                  }}>
                                  L{trace.layer}
                                </div>
                                <div className="flex-1 min-w-0">
                                  <div className="text-[13px] font-semibold text-gray-800">{trace.action}</div>
                                  <div className="text-[12px] text-gray-500 mt-0.5">{trace.detail}</div>
                                </div>
                                {trace.action.includes('CRISIS') && (
                                  <Siren className="w-5 h-5 text-red-500 shrink-0 animate-pulse" />
                                )}
                              </motion.div>
                            ))}
                          </div>
                        </div>

                        {/* Results */}
                        <div>
                          <div className="text-[12px] font-bold uppercase tracking-wider text-gray-400 mb-4">
                            Classification Results
                          </div>
                          <div className="space-y-4">
                            {scenario.results.map((result, idx) => (
                              <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.3, delay: 0.3 + idx * 0.1 }}
                                className="glass-card rounded-xl p-5 shadow-premium border"
                                style={{ borderColor: `${scenario.color}20` }}
                              >
                                <div className="flex items-center gap-4 mb-3">
                                  <ConfidenceRing value={result.confidence} size={48} strokeWidth={3} />
                                  <div>
                                    <div className="text-[15px] font-bold text-gray-900">{result.category}</div>
                                    <div className="text-[12px] text-gray-400 mt-0.5">
                                      {result.confidence}% confidence — {result.confidence >= 80 ? 'High' : result.confidence >= 70 ? 'Good' : result.confidence >= 50 ? 'Moderate' : 'Low'} match
                                    </div>
                                  </div>
                                </div>
                                {result.resources.length > 0 && result.resources[0] !== 'Please tell us more about your situation so we can help' && (
                                  <div className="space-y-2 ml-1">
                                    {result.resources.map((resource, ri) => (
                                      <div key={ri} className="flex items-center gap-2 text-[12px] text-gray-600">
                                        <Check className="w-3.5 h-3.5 shrink-0" style={{ color: scenario.color }} />
                                        {resource}
                                      </div>
                                    ))}
                                  </div>
                                )}
                                {result.resources[0] === 'Please tell us more about your situation so we can help' && (
                                  <div className="bg-amber-50/60 rounded-lg p-3 border border-amber-100/40">
                                    <p className="text-[12px] text-amber-700 font-medium">
                                      🤔 Clarification needed — {result.resources[0]}
                                    </p>
                                  </div>
                                )}
                              </motion.div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )
              })()}
            </AnimatePresence>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════
            SECTION 7: THE MODEL — BART-large-MNLI DEEP DIVE
            ═══════════════════════════════════════════════════════ */}
        <section id="model" className="py-20 md:py-28">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-center mb-14"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[11px] font-semibold bg-indigo-50/80 text-indigo-600 border border-indigo-100/60 mb-4">
                <Brain className="w-3.5 h-3.5" />
                The Model
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-gray-900">
                How BART-large-MNLI Powers ClearPath AI
              </h2>
              <p className="text-[15px] text-gray-500 mt-4 max-w-3xl mx-auto leading-relaxed">
                A deep dive into the NLI-based zero-shot classification model that makes honest confidence possible —
                and why it fundamentally cannot hallucinate.
              </p>
            </motion.div>

            {/* What is BART */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="glass-card rounded-2xl p-6 sm:p-8 shadow-premium hover:shadow-premium-lg transition-shadow duration-300 mb-8"
            >
              <div className="flex flex-col sm:flex-row gap-6">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center shadow-lg shrink-0">
                  <Binary className="w-7 h-7 text-white" />
                </div>
                <div className="flex-1 min-w-0 space-y-4">
                  <h3 className="text-[18px] font-bold text-gray-900 tracking-tight">What is BART-large-MNLI?</h3>
                  <p className="text-[14px] text-gray-500 leading-relaxed">
                    BART (Bidirectional and Auto-Regressive Transformers) is a transformer-based model developed by Facebook AI Research.
                    It combines a bidirectional encoder (like BERT) with an autoregressive decoder (like GPT), giving it the ability to both
                    understand and generate text. The &quot;large&quot; variant has 406 million parameters, providing sufficient capacity for nuanced
                    natural language understanding without requiring enterprise-grade GPU infrastructure.
                  </p>
                  <p className="text-[14px] text-gray-500 leading-relaxed">
                    BART-large-MNLI is BART fine-tuned on the Multi-Genre Natural Language Inference (MNLI) corpus — a dataset of 433,000
                    sentence pairs annotated with entailment relationships across 10 distinct genres (from government reports to fiction).
                    This fine-tuning teaches the model to determine whether one sentence (the hypothesis) is entailed by, contradicted by,
                    or neutral with respect to another sentence (the premise). This NLI capability is the foundation of zero-shot classification.
                  </p>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4">
                    {[
                      { label: 'Parameters', value: '406M', icon: Cpu },
                      { label: 'Training Data', value: '433K pairs', icon: Database },
                      { label: 'Genres', value: '10', icon: BookOpen },
                      { label: 'Inference', value: '<2s', icon: Timer },
                    ].map((stat) => {
                      const SIcon = stat.icon
                      return (
                        <div key={stat.label} className="text-center p-3 rounded-xl bg-indigo-50/40 border border-indigo-100/40">
                          <SIcon className="w-4 h-4 text-indigo-400 mx-auto mb-1" />
                          <div className="text-[14px] font-bold text-gray-900">{stat.value}</div>
                          <div className="text-[10px] text-gray-400 font-medium">{stat.label}</div>
                        </div>
                      )
                    })}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* How Zero-Shot Classification Works */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="glass-card rounded-2xl p-6 sm:p-8 shadow-premium hover:shadow-premium-lg transition-shadow duration-300 mb-8"
            >
              <div className="flex flex-col sm:flex-row gap-6">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-600 flex items-center justify-center shadow-lg shrink-0">
                  <Target className="w-7 h-7 text-white" />
                </div>
                <div className="flex-1 min-w-0 space-y-4">
                  <h3 className="text-[18px] font-bold text-gray-900 tracking-tight">How Zero-Shot Classification Works</h3>
                  <p className="text-[14px] text-gray-500 leading-relaxed">
                    Zero-shot classification converts the question &quot;Does this text belong to this category?&quot; into a natural language
                    inference (NLI) problem. Here&apos;s the exact process:
                  </p>
                  <div className="space-y-4">
                    {[
                      {
                        step: 1,
                        title: 'Frame as Entailment',
                        desc: 'The user query becomes the "premise" and each category label becomes a "hypothesis". For example: Premise: "I can\'t pay my rent" → Hypothesis: "This text is about Housing Assistance"',
                      },
                      {
                        step: 2,
                        title: 'Encode Both Texts',
                        desc: 'BART encodes the premise and hypothesis using its bidirectional encoder, capturing the full context of both texts independently before computing cross-attention.',
                      },
                      {
                        step: 3,
                        title: 'Compute Cross-Attention',
                        desc: 'The decoder attends to both encoded representations simultaneously, computing how the premise and hypothesis relate across all attention heads and layers.',
                      },
                      {
                        step: 4,
                        title: 'Predict Entailment',
                        desc: 'The model outputs one of three labels: entailment (yes, the premise supports the hypothesis), contradiction (no, they\'re incompatible), or neutral (uncertain relationship).',
                      },
                      {
                        step: 5,
                        title: 'Extract Probability',
                        desc: 'The probability of "entailment" becomes the confidence score for that category. This is done independently for each candidate label, producing a full probability distribution.',
                      },
                    ].map((s) => (
                      <div key={s.step} className="flex items-start gap-3">
                        <div className="w-7 h-7 rounded-full bg-blue-50 flex items-center justify-center shrink-0 mt-0.5">
                          <span className="text-[12px] font-bold text-blue-600">{s.step}</span>
                        </div>
                        <div>
                          <div className="text-[14px] font-semibold text-gray-800">{s.title}</div>
                          <p className="text-[13px] text-gray-500 leading-relaxed mt-0.5">{s.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Example transformation */}
                  <div className="rounded-xl p-4 bg-blue-50/40 border border-blue-100/40 mt-4">
                    <div className="text-[11px] font-bold uppercase tracking-wider text-blue-600 mb-3">Example: NLI Transformation</div>
                    <div className="space-y-2 text-[12px]">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-gray-700 w-20 shrink-0">Premise:</span>
                        <span className="text-gray-600">&quot;I can&apos;t pay my rent&quot;</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-gray-700 w-20 shrink-0">Hypothesis:</span>
                        <span className="text-gray-600">&quot;This text is about Housing Assistance&quot;</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-gray-700 w-20 shrink-0">Prediction:</span>
                        <span className="text-emerald-600 font-bold">Entailment (87%)</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Why It Cannot Hallucinate */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="glass-card rounded-2xl p-6 sm:p-8 shadow-premium hover:shadow-premium-lg transition-shadow duration-300 mb-8"
            >
              <div className="flex flex-col sm:flex-row gap-6">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shadow-lg shrink-0">
                  <ShieldCheck className="w-7 h-7 text-white" />
                </div>
                <div className="flex-1 min-w-0 space-y-4">
                  <h3 className="text-[18px] font-bold text-gray-900 tracking-tight">{isFr ? "Pourquoi BART-large-MNLI ne peut pas halluciner" : 'Why BART-large-MNLI Cannot Hallucinate'}</h3>
                  <p className="text-[14px] text-gray-500 leading-relaxed">
                    The key insight is that BART-large-MNLI is a <span className="font-semibold text-gray-700">classification model, not a generative model</span>.
                    It does not produce new text — it only assigns probabilities to predefined labels. This is a fundamental architectural difference:
                  </p>
                  <div className="grid sm:grid-cols-2 gap-4 mt-4">
                    <div className="rounded-xl p-4 bg-red-50/40 border border-red-100/40">
                      <div className="text-[12px] font-bold uppercase tracking-wider text-red-600 mb-2">Generative (ChatGPT)</div>
                      <p className="text-[13px] text-gray-600 leading-relaxed">
                        Generates new text token by token. Can invent shelter names, phone numbers, program details that sound plausible but don&apos;t exist.
                        The model is optimized for fluency, not factual accuracy.
                      </p>
                    </div>
                    <div className="rounded-xl p-4 bg-emerald-50/40 border border-emerald-100/40">
                      <div className="text-[12px] font-bold uppercase tracking-wider text-emerald-600 mb-2">Classificative (ClearPath AI)</div>
                      <p className="text-[13px] text-gray-600 leading-relaxed">
                        Assigns probabilities to predefined categories. Cannot create new information — only categorize existing input.
                        The output is always one of the 8 known categories, each mapped to verified resources.
                      </p>
                    </div>
                  </div>
                  <div className="rounded-xl p-4 bg-gray-50/60 border border-gray-100/60 mt-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Sparkles className="w-4 h-4 text-blue-500" />
                      <span className="text-[12px] font-bold uppercase tracking-wider text-gray-700">The Guarantee</span>
                    </div>
                    <p className="text-[13px] text-gray-600 leading-relaxed">
                      A classification model can misclassify (say &quot;Housing&quot; when the user means &quot;Food&quot;) — but it can never invent a category
                      that doesn&apos;t exist. It can assign a low confidence score (telling you it&apos;s uncertain) — but it can never fabricate a
                      resource with a confident tone. The architectural constraint of classification is the safety feature.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* NLI Explained */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="glass-card rounded-2xl p-6 sm:p-8 shadow-premium hover:shadow-premium-lg transition-shadow duration-300"
            >
              <div className="flex flex-col sm:flex-row gap-6">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center shadow-lg shrink-0">
                  <Atom className="w-7 h-7 text-white" />
                </div>
                <div className="flex-1 min-w-0 space-y-4">
                  <h3 className="text-[18px] font-bold text-gray-900 tracking-tight">Natural Language Inference (NLI) Explained</h3>
                  <p className="text-[14px] text-gray-500 leading-relaxed">
                    NLI is the task of determining the logical relationship between two sentences: a premise and a hypothesis.
                    The relationship falls into one of three categories:
                  </p>
                  <div className="space-y-3 mt-4">
                    {[
                      {
                        label: 'Entailment',
                        desc: 'The hypothesis is necessarily true given the premise. Example: Premise "I can\'t afford groceries" → Hypothesis "This person needs food assistance" → Entailment ✓',
                        color: '#10b981',
                        bg: 'rgba(16,185,129,0.06)',
                      },
                      {
                        label: 'Contradiction',
                        desc: 'The hypothesis is necessarily false given the premise. Example: Premise "I just got promoted" → Hypothesis "This person needs employment services" → Contradiction ✕',
                        color: '#ef4444',
                        bg: 'rgba(239,68,68,0.06)',
                      },
                      {
                        label: 'Neutral',
                        desc: 'The hypothesis may or may not be true given the premise — there\'s not enough information. Example: Premise "I\'m having a hard time" → Hypothesis "This person needs mental health support" → Neutral ~',
                        color: '#f59e0b',
                        bg: 'rgba(245,158,11,0.06)',
                      },
                    ].map((rel) => (
                      <div key={rel.label} className="rounded-xl p-4 border" style={{ backgroundColor: rel.bg, borderColor: `${rel.color}20` }}>
                        <div className="text-[13px] font-bold mb-1" style={{ color: rel.color }}>{rel.label}</div>
                        <p className="text-[12px] text-gray-600 leading-relaxed">{rel.desc}</p>
                      </div>
                    ))}
                  </div>
                  <p className="text-[14px] text-gray-500 leading-relaxed mt-4">
                    By converting classification into NLI, BART-large-MNLI can determine whether a user&apos;s description &quot;entails&quot; a
                    particular resource category — without ever having seen examples of that category during training. This is what makes
                    zero-shot classification possible: the model applies general language understanding to new categorization tasks on the fly.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════
            SECTION 8: SAFETY GUARDRAILS
            ═══════════════════════════════════════════════════════ */}
        <section id="safety" className="py-20 md:py-28 bg-white/40">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-center mb-16"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[11px] font-semibold bg-red-50/80 text-red-600 border border-red-100/60 mb-4">
                <Shield className="w-3.5 h-3.5" />
                Safety Guardrails
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-gray-900">
                Built to protect, not just perform
              </h2>
              <p className="text-[15px] text-gray-500 mt-4 max-w-3xl mx-auto leading-relaxed">
                Every safety feature in ClearPath AI is architectural — enforced in code, not just in documentation.
                These are not optional settings or afterthought features. They are the foundation.
              </p>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-40px' }}
              variants={staggerContainer}
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {safetyGuardrails.map((guardrail) => {
                const GIcon = guardrail.icon
                return (
                  <motion.div
                    key={guardrail.title}
                    variants={staggerItem}
                    className="glass-card rounded-2xl p-6 shadow-premium hover:shadow-premium-lg transition-shadow duration-300 relative overflow-hidden card-shine gradient-border"
                  >
                    <div className="relative z-10 space-y-4">
                      <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ backgroundColor: guardrail.bgColor }}>
                        <GIcon className="w-5 h-5" style={{ color: guardrail.color }} />
                      </div>
                      <div>
                        <h3 className="text-[15px] font-bold text-gray-900 tracking-tight">{guardrail.title}</h3>
                        <p className="text-[12px] text-gray-400 font-medium mt-0.5">{guardrail.subtitle}</p>
                      </div>
                      <p className="text-[13px] text-gray-500 leading-relaxed">{guardrail.description}</p>
                      <div className="space-y-2 pt-2 border-t border-gray-100/60">
                        {guardrail.features.map((feature, i) => (
                          <div key={i} className="flex items-start gap-2 text-[12px] text-gray-600">
                            <Check className="w-3.5 h-3.5 mt-0.5 shrink-0" style={{ color: guardrail.color }} />
                            {feature}
                          </div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )
              })}
            </motion.div>

            {/* Safety architecture summary */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="mt-12 glass-card rounded-2xl p-6 sm:p-8 shadow-premium"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-red-50 flex items-center justify-center">
                  <ShieldCheck className="w-5 h-5 text-red-500" />
                </div>
                <h3 className="text-[16px] font-bold text-gray-900 tracking-tight">Safety by Design, Not by Default</h3>
              </div>
              <p className="text-[14px] text-gray-500 leading-relaxed mb-4">
                Many AI products add safety features as an afterthought — a &quot;report&quot; button, a buried &quot;contact support&quot; link,
                a vague disclaimer. ClearPath AI takes the opposite approach: safety is woven into the architecture from Layer 1.
                The crisis scanner is hardcoded, not AI-dependent. The confidence gate is calibrated, not arbitrary. The human
                escalation is architectural, not optional. Every safety feature is enforced in code and cannot be disabled.
              </p>
              <div className="grid grid-cols-3 gap-3 mt-4">
                {[
                  { label: 'Hardcoded safety', desc: 'Crisis detection never depends on AI', color: '#ef4444' },
                  { label: 'Calibrated honesty', desc: 'Confidence reflects true certainty', color: '#f59e0b' },
                  { label: 'Architectural escalation', desc: 'Human always available, never hidden', color: '#3b82f6' },
                ].map((item) => (
                  <div key={item.label} className="text-center p-3 rounded-xl" style={{ backgroundColor: `${item.color}08`, border: `1px solid ${item.color}15` }}>
                    <div className="text-[12px] font-bold" style={{ color: item.color }}>{item.label}</div>
                    <div className="text-[11px] text-gray-400 mt-1">{item.desc}</div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════
            SECTION 9: FAQ
            ═══════════════════════════════════════════════════════ */}
        <section id="faq" className="py-20 md:py-28">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-center mb-14"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[11px] font-semibold bg-blue-50/80 text-blue-600 border border-blue-100/60 mb-4">
                <HelpCircle className="w-3.5 h-3.5" />
                Technical FAQ
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-gray-900">
                Questions about how it works?
              </h2>
              <p className="text-[15px] text-gray-500 mt-4 max-w-2xl mx-auto leading-relaxed">
                Deep technical answers about the architecture, the model, and the decisions behind ClearPath AI.
              </p>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-40px' }}
              variants={staggerContainer}
              className="space-y-4"
            >
              {faqs.map((faq) => (
                <motion.div key={faq.question} variants={staggerItem}>
                  <FAQItem question={faq.question} answer={faq.answer} />
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════
            SECTION 10: CTA
            ═══════════════════════════════════════════════════════ */}
        <section className="py-20 md:py-28 bg-white/40">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="glass-card rounded-3xl p-8 md:p-14 shadow-premium-xl text-center relative overflow-hidden"
            >
              {/* Background glow */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full opacity-20 pointer-events-none"
                style={{ background: 'radial-gradient(circle, rgba(59,130,246,0.15), rgba(16,185,129,0.08), transparent 70%)' }}
              />

              <div className="relative z-10 space-y-6">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-600 to-emerald-500 flex items-center justify-center mx-auto shadow-lg shadow-blue-500/20">
                  <Sparkles className="w-8 h-8 text-white" />
                </div>

                <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-gray-900">
                  See it for yourself.
                </h2>

                <p className="text-[16px] text-gray-500 max-w-xl mx-auto leading-relaxed">
                  Try the ClearPath AI demo and experience honest confidence firsthand. Basic classification works without an account. Create a free account to save your history.
                  Free forever. Type a real need and see how the 6-layer pipeline responds.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                  <Link
                    href="/app"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 text-[15px] font-semibold text-white rounded-2xl bg-gradient-to-b from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/30 transition-all active:scale-[0.97]"
                  >
                    Try the Demo
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                  <Link
                    href="/about"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 text-[15px] font-semibold text-gray-700 rounded-2xl border border-gray-200 bg-white/60 hover:bg-white hover:border-gray-300 hover:shadow-md transition-all"
                  >
                    Learn About Our Mission
                    <ArrowUpRight className="w-4 h-4" />
                  </Link>
                </div>

                {/* Trust indicators */}
                <div className="flex flex-wrap items-center justify-center gap-6 pt-6">
                  {[
                    { text: 'Privacy by design', icon: Shield },
                    { text: 'Crisis detection', icon: ShieldCheck },
                    { text: 'Human escalation', icon: Navigation },
                    { text: 'Zero hallucination', icon: Eye },
                  ].map((item) => (
                    <div key={item.text} className="flex items-center gap-2 text-[13px] text-gray-500 font-medium">
                      <Check className="w-4 h-4 text-emerald-500" strokeWidth={3} />
                      {item.text}
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </section>

      </main>

      {/* ═══════════ FOOTER ═══════════ */}
      <footer className="py-8 border-t border-gray-100/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-gray-900 to-gray-700 flex items-center justify-center">
                <Layers className="w-3 h-3 text-white" />
              </div>
              <span className="text-[13px] font-bold tracking-tight text-gray-700">ClearPath AI</span>
              <span className="inline-flex items-center px-1.5 py-0.5 rounded-md text-[8px] font-bold tracking-wider uppercase bg-emerald-50 text-emerald-600 border border-emerald-100/60">
                Demo
              </span>
            </div>
            <div className="flex items-center gap-6 text-[12px] text-gray-400">
              <Link href="/about" className="hover:text-gray-600 transition-colors">About</Link>
              <Link href="/responsible-ai" className="hover:text-gray-600 transition-colors">Responsible AI</Link>
              <Link href="/privacy" className="hover:text-gray-600 transition-colors">Privacy</Link>
              <Link href="/terms" className="hover:text-gray-600 transition-colors">Terms</Link>
            </div>
            <div className="text-[12px] text-gray-400">
              Built for USAII Global AI Hackathon 2026
            </div>
          </div>
        </div>
      </footer>
      <Footer />
    </div>
  )
}
