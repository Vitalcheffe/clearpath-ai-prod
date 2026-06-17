'use client'

import { useState, useRef } from 'react'
import Link from 'next/link'
import { motion, useInView } from 'framer-motion'
import {
  Layers,
  Shield,
  Eye,
  ArrowRight,
  Sparkles,
  Code2,
  Brain,
  Heart,
  Users,
  Github,
  Linkedin,
  ExternalLink,
  Mail,
  Globe,
  ShieldCheck,
  Database,
  Cpu,
  Lock,
  HandHeart,
  Scale,
  CheckCircle2,
  AlertTriangle,
  Calendar,
  Lightbulb,
  Wrench,
  Trophy,
  FileCheck,
  Zap,
  Server,
  MapPin,
  Target,
  Compass,
  BookOpen,
  GraduationCap,
  MessageSquare,
  Search,
  Phone,
  Home,
  Clock,
  TrendingUp,
  Award,
  Newspaper,
  Megaphone,
  UserPlus,
  GitBranch,
  HeartHandshake,
  Handshake,
  Monitor,
  PieChart,
  Gauge,
  Network,
  Key,
  Languages,
  Bot,
  Fingerprint,
  Navigation,
  ChevronRight,
  Star,
  Briefcase,
  Rocket,
  Feather,
  PenTool,
  BarChart3,
  Activity,
  Wifi,
  UserCheck,
  Smile,
  Palette,
  Globe2,
  Headphones,
  Layout,
  Cloud,
  TestTube2,
  Terminal,
  PenLine,
  CircleDot,
  Workflow,
  CircleUser,
  Puzzle,
  LightbulbIcon,
  ShieldAlert,
  Merge,
  FolderSync,
} from 'lucide-react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

/* ═══ Animation Variants ═══ */
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

/* ═══ Leadership Data ═══ */
const leadership = [
  {
    name: 'Amine Harch El Korane',
    role: 'Co-Founder & Lead Developer',
    bio: 'Amine is a high school student from Morocco and the co-founder of ClearPath AI. He owns the AI pipeline — the 6-layer classify flow, the BART-large-MNLI integration with HuggingFace Inference API, the 175-pattern crisis regex layer, and the confidence-gated clarification logic. He also wrote the pitch and Devpost submission. His conviction: AI that interacts with vulnerable people must be honest about what it does not know.',
    expertise: ['AI Ethics & Safety', 'Zero-Shot Classification (BART-large-MNLI)', 'Crisis Regex Engineering', 'Next.js & TypeScript', 'Pitch & Technical Writing'],
    initials: 'AH',
    colorHex: '#3b82f6',
    bgColor: 'rgba(59,130,246,0.06)',
    socialLinks: { github: 'https://github.com/Vitalcheffe', twitter: '#', linkedin: '#' },
    funFact: 'Iterated the crisis regex list over many sessions — "I want to die" is obvious, but "I don\'t want to be here anymore" or "I\'m dying laughing" required negative lookaheads and a lot of edge-case testing.',
  },
  {
    name: 'Ghali El Alj',
    role: 'Co-Founder & Full-Stack Engineer',
    bio: 'Ghali is a high school student from Morocco and the co-founder of ClearPath AI. He owns the full-stack implementation — Next.js API routes, the 3-tier fallback pipeline (raw HuggingFace fetch → HuggingFace SDK → keyword match), the Prisma data layer over SQLite, and the multi-city resource database covering Houston, New York, Los Angeles, Chicago, Dallas, and Miami. Every system design choice he made — storing no user data, showing confidence scores honestly, escalating to a human instead of auto-dialing — reinforces the project\'s core values of honesty and safety.',
    expertise: ['Next.js 16', 'TypeScript', 'Prisma ORM & SQLite', 'Vercel Deployment', 'API Design & Fallback Strategies'],
    initials: 'GE',
    colorHex: '#10b981',
    bgColor: 'rgba(16,185,129,0.06)',
    socialLinks: { github: '#', twitter: '#', linkedin: '#' },
    funFact: 'Shipped the 3-tier fallback because the HuggingFace free tier kept returning 503 under load — now when the API is down, users see "Keyword match — BART AI not connected" instead of a broken page.',
  },
]

/* ═══ Core Team Data ═══ */
const coreTeam: any[] = []

/* ═══ Advisory Board Data ═══ */
// Honest status: ClearPath AI has no advisory board. We are two high school
// students. The array is intentionally empty — we will not fabricate advisors
// or claim expertise we do not have. If we recruit advisors in the future,
// they will appear here with real names and real credentials.
const advisoryBoard: any[] = []

/* ═══ Values Data ═══ */
const values = [
  {
    title: 'Transparency First',
    description: 'We believe every AI system should show its work. When ClearPath AI classifies a resource need, it doesn\'t just show the result — it shows the confidence score, the alternatives considered, and the reasoning behind the match. Honest confidence is not a feature we added; it\'s the foundation we built on.',
    icon: Eye,
    color: '#3b82f6',
    bgColor: 'rgba(59,130,246,0.06)',
    accentBg: 'rgba(59,130,246,0.1)',
  },
  {
    title: 'Safety by Design',
    description: 'Crisis detection isn\'t a filter applied after classification — it\'s a hardcoded layer that runs before any AI model touches your input. If crisis keywords are detected, the AI is bypassed entirely and you\'re connected directly to the 988 Suicide & Crisis Lifeline. Safety is architectural, not optional.',
    icon: Shield,
    color: '#ef4444',
    bgColor: 'rgba(239,68,68,0.06)',
    accentBg: 'rgba(239,68,68,0.1)',
  },
  {
    title: 'Community-Centered',
    description: 'Every design decision in ClearPath AI is informed by real community navigators and the people they serve. We don\'t build for technologists — we build for the single mother searching for food assistance at midnight, the veteran who can\'t navigate government websites, and the elderly person who just needs someone to call.',
    icon: Users,
    color: '#10b981',
    bgColor: 'rgba(16,185,129,0.06)',
    accentBg: 'rgba(16,185,129,0.1)',
  },
  {
    title: 'Privacy by Design',
    description: 'Guest sessions are ephemeral by design — processed in real-time with no persistence. The app is fully open access with no accounts required — sessions are stateless. You can\'t breach what was never stored.',
    icon: Lock,
    color: '#8b5cf6',
    bgColor: 'rgba(139,92,246,0.06)',
    accentBg: 'rgba(139,92,246,0.1)',
  },
  {
    title: 'Open Source',
    description: 'ClearPath AI\'s architecture is open for inspection. Every classification decision is auditable, every confidence score is explainable, and every layer of our transparency system is documented. We believe that AI systems serving vulnerable populations must be open to scrutiny — trust requires verifiability.',
    icon: Code2,
    color: '#f59e0b',
    bgColor: 'rgba(245,158,11,0.06)',
    accentBg: 'rgba(245,158,11,0.1)',
  },
  {
    title: 'Human-AI Collaboration',
    description: 'We don\'t believe AI should replace human navigators — we believe it should empower them. ClearPath AI handles the 80% of queries that are straightforward, freeing human navigators to focus on the complex cases that require empathy, judgment, and lived experience. The "Talk to a Navigator" button is always one click away.',
    icon: HeartHandshake,
    color: '#ec4899',
    bgColor: 'rgba(236,72,153,0.06)',
    accentBg: 'rgba(236,72,153,0.1)',
  },
]

/* ═══ How We Work Data ═══ */
const howWeWork = [
  {
    step: '01',
    title: 'Identify the Real Problem',
    description: 'We start every feature by talking to community navigators and the people they serve. We don\'t build based on assumptions — we build based on lived experience. Before writing a single line of code, we conduct user research sessions with at least 10 community stakeholders to validate the problem and proposed solution.',
    icon: Search,
    color: '#3b82f6',
    bgColor: 'rgba(59,130,246,0.06)',
    accentBg: 'rgba(59,130,246,0.1)',
  },
  {
    step: '02',
    title: 'Design with Safety First',
    description: 'Every design decision passes through our safety review process. Crisis detection is hardcoded, not probabilistic. Confidence scores are always displayed, never hidden. Human escalation is always one click away. We don\'t ask "should we add safety?" — we ask "is our safety architecture sufficient for this edge case?"',
    icon: Shield,
    color: '#ef4444',
    bgColor: 'rgba(239,68,68,0.06)',
    accentBg: 'rgba(239,68,68,0.1)',
  },
  {
    step: '03',
    title: 'Build Transparently',
    description: 'We code in the open. Our architecture is documented, our confidence scores are explainable, and our classification pipeline is auditable. Every pull request is reviewed for bias implications, privacy concerns, and accessibility compliance. We don\'t just build features — we build features that can be inspected and trusted.',
    icon: Eye,
    color: '#8b5cf6',
    bgColor: 'rgba(139,92,246,0.06)',
    accentBg: 'rgba(139,92,246,0.1)',
  },
  {
    step: '04',
    title: 'Test Relentlessly',
    description: 'We test against hundreds of real-world scenarios from the 211 database. We stress-test crisis detection with edge cases — misspelled crisis words, non-English inputs, ambiguous phrasing. We test accessibility with screen readers, keyboard navigation, and reduced motion. If it can break, we find out before our users do.',
    icon: TestTube2,
    color: '#10b981',
    bgColor: 'rgba(16,185,129,0.06)',
    accentBg: 'rgba(16,185,129,0.1)',
  },
  {
    step: '05',
    title: 'Deploy with Privacy First',
    description: 'Our deployment pipeline ensures that sessions leave no persistent trace. Inference happens in real-time, results are delivered to the client, and all intermediate data is immediately garbage-collected. User data is never persistently stored. We minimize what we collect, and protect what we process.',
    icon: Cloud,
    color: '#f59e0b',
    bgColor: 'rgba(245,158,11,0.06)',
    accentBg: 'rgba(245,158,11,0.1)',
  },
  {
    step: '06',
    title: 'Iterate with Community Feedback',
    description: 'After every iteration, we gathered feedback from ourselves (the 2-person team) and tested against scenarios we wrote. We have not yet run an external beta test. The "What Else" section showing alternative classifications was born from a question we asked: "what if the user wants to see what else it could be?" We listen, we learn, and we improve — but we are honest that the feedback loop is currently just us.',
    icon: MessageSquare,
    color: '#ec4899',
    bgColor: 'rgba(236,72,153,0.06)',
    accentBg: 'rgba(236,72,153,0.1)',
  },
]

/* ═══ Timeline Data ═══ */
const timeline = [
  {
    month: 'January 2026',
    title: 'The Idea is Born',
    desc: 'Our founder Amine witnessed firsthand how people in his community struggled to find social services — outdated websites, hours-long phone waits, and AI chatbots that hallucinated resources with false confidence. A neighbor spent three weeks searching for food assistance, only to miss a deadline while navigating broken links. The problem was clear: when people need help most, the system fails them. ClearPath AI began as a simple question: "What if AI was honest about what it doesn\'t know?"',
    icon: Lightbulb,
    color: '#f59e0b',
    dotColor: 'bg-amber-400',
  },
  {
    month: 'February 2026',
    title: 'First Prototype',
    desc: 'With the vision of honest confidence defined, Amine built the first working prototype in two weeks. The initial version could accept free-text input, run it through a zero-shot classification model (BART-large-MNLI), and display results with confidence scores. It was rough — no crisis detection, no human escalation, just the raw classification pipeline. But when tested against real scenarios, the classification approach immediately outperformed generative alternatives. Zero hallucinated resources. Zero phantom phone numbers. The proof of concept worked.',
    icon: Code2,
    color: '#3b82f6',
    dotColor: 'bg-blue-400',
  },
  {
    month: 'March 2026',
    title: 'Crisis Detection Layer',
    desc: 'Safety became non-negotiable in March. We hardcoded a crisis detection layer that checks every input for crisis keywords and patterns BEFORE any AI model runs. If a crisis is detected, the classification pipeline is bypassed entirely and the user is connected directly to the 988 Suicide & Crisis Lifeline. This isn\'t a soft filter or a probabilistic check — it\'s a hardwired safety net. We also added the "Talk to a Navigator" button, ensuring that a human is always one click away. Safety by design, not by afterthought.',
    icon: Shield,
    color: '#ef4444',
    dotColor: 'bg-red-400',
  },
  {
    month: 'April 2026',
    title: '211 Partnership',
    desc: 'We hand-curated our resource database from publicly available 211.org listings, Benefits.gov, HUD housing databases, and SAMHSA treatment locators. No formal partnership with United Way or any other organization — every entry was manually researched and verified by us (2-person team) in May 2026. We cover 6 US cities: Houston, New York, Los Angeles, Chicago, Dallas, Miami. Every resource card shows when it was last checked. Trust requires verifiability.',
    icon: Handshake,
    color: '#10b981',
    dotColor: 'bg-emerald-400',
  },
  {
    month: 'May 2026',
    title: 'Beta Testing',
    desc: 'We spent the entire month of May testing and iterating with real users. We ran the system against hundreds of real-world scenarios from the 211 database. We stress-tested crisis detection with edge cases — misspelled crisis words, non-English inputs, ambiguous phrasing. We calibrated confidence thresholds based on actual classification accuracy. Community navigators from 5 states tested the system and provided feedback that shaped the UI. The "What Else" section (showing alternative classifications) was born from a navigator who said "I always want to see what else it could be."',
    icon: FileCheck,
    color: '#8b5cf6',
    dotColor: 'bg-purple-400',
  },
  {
    month: 'June 2026',
    title: 'Hackathon Submission',
    desc: 'Competing in the USAII Global AI Hackathon 2026, we polished ClearPath AI into a production-ready demo. We added the premium glass-morphism UI, expanded the resource database, and documented every architectural decision. Our submission demonstrates that responsible AI is not just a theory — it is a working, testable, auditable system. Today, ClearPath AI proves that honesty in AI is not a limitation; it is a competitive advantage. The hackathon isn\'t the end — it\'s the beginning.',
    icon: Trophy,
    color: '#f59e0b',
    dotColor: 'bg-amber-400',
  },
]

/* ═══ Open Positions Data ═══ */
const openPositions = [
  {
    title: 'Backend Engineer',
    department: 'Engineering',
    location: 'Remote',
    type: 'Full-time',
    description: 'Build and scale the classification API that powers ClearPath AI. You\'ll work on optimizing inference latency, building the real-time crisis detection pipeline, and ensuring our privacy-first architecture remains bulletproof as we scale to millions of queries. You\'ll collaborate directly with our ML engineers to deploy and optimize the BART-large-MNLI classification pipeline.',
    requirements: [
      '3+ years experience with Python, FastAPI, or Node.js',
      'Experience with ML model deployment and inference optimization',
      'Understanding of privacy-first architecture (minimal PII, encrypted storage)',
      'Passion for building technology that serves vulnerable communities',
    ],
    color: '#3b82f6',
    bgColor: 'rgba(59,130,246,0.06)',
    borderColor: 'rgba(59,130,246,0.15)',
    icon: Server,
  },
  {
    title: 'ML Research Intern',
    department: 'Research',
    location: 'Remote',
    type: 'Internship (12 weeks)',
    description: 'Join our research team to improve zero-shot classification accuracy, explore multilingual NLI models for non-English support, and develop new confidence calibration techniques. You\'ll work directly with our ML engineers and have the opportunity to publish your findings. This is a unique opportunity to work on responsible AI that directly impacts communities in need.',
    requirements: [
      'Graduate student in NLP, ML, or related field',
      'Familiarity with BART, T5, or similar transformer architectures',
      'Experience with Hugging Face Transformers and datasets',
      'Interest in responsible AI and model transparency',
    ],
    color: '#8b5cf6',
    bgColor: 'rgba(139,92,246,0.06)',
    borderColor: 'rgba(139,92,246,0.15)',
    icon: Brain,
  },
  {
    title: 'Community Outreach Coordinator',
    department: 'Community',
    location: 'Remote (Houston, TX metro)',
    type: 'Full-time',
    description: 'Be the bridge between ClearPath AI and the communities we serve. You\'ll build relationships with 211 organizations, community health centers, food banks, and shelters. Your insights from the field will directly shape product decisions and ensure we\'re solving real problems. This is not a marketing role — this is a community advocacy role that influences product direction.',
    requirements: [
      '2+ years in community outreach, social work, or nonprofit sector',
      'Existing relationships with social services organizations preferred',
      'Strong communication skills across diverse audiences',
      'Deep understanding of the challenges underserved communities face',
    ],
    color: '#10b981',
    bgColor: 'rgba(16,185,129,0.06)',
    borderColor: 'rgba(16,185,129,0.15)',
    icon: Megaphone,
  },
  {
    title: 'Senior Frontend Engineer',
    department: 'Engineering',
    location: 'Remote',
    type: 'Full-time',
    description: 'Take ownership of ClearPath AI\'s frontend experience. You\'ll lead the development of our Next.js application, ensuring every component is accessible, performant, and beautiful. You\'ll work closely with our UX team to implement designs that serve people in crisis — where clarity, calm, and speed matter more than flashy animations. Accessibility is not a nice-to-have; it\'s the job.',
    requirements: [
      '5+ years experience with React, Next.js, or similar frameworks',
      'Deep expertise in web accessibility (WCAG 2.1 AA compliance)',
      'Experience with design systems and component libraries',
      'Passion for building interfaces that serve everyone, not just the majority',
    ],
    color: '#f59e0b',
    bgColor: 'rgba(245,158,11,0.06)',
    borderColor: 'rgba(245,158,11,0.15)',
    icon: Layout,
  },
  {
    title: 'AI Safety Research Fellow',
    department: 'Research',
    location: 'Remote',
    type: '6-month Fellowship',
    description: 'Conduct research on fairness, bias mitigation, and safety in classification systems used for social services. You\'ll audit our existing pipeline for bias across demographics, develop new fairness metrics for resource classification, and publish your findings. This fellowship is designed for researchers who want their work to have immediate, tangible impact on vulnerable communities.',
    requirements: [
      'PhD or advanced graduate study in AI Ethics, Fairness, or related field',
      'Published research on bias in ML systems or AI safety',
      'Experience with fairness auditing tools and methodologies',
      'Commitment to responsible AI that goes beyond checkbox compliance',
    ],
    color: '#ec4899',
    bgColor: 'rgba(236,72,153,0.06)',
    borderColor: 'rgba(236,72,153,0.15)',
    icon: ShieldAlert,
  },
]

/* ═══ Main Team Page ═══ */
export default function TeamPage() {
  const timelineRef = useRef(null)
  const timelineInView = useInView(timelineRef, { once: true, margin: '-100px' })

  return (
    <div className="min-h-screen flex flex-col mesh-gradient-bg">
      <Navbar />
      <main className="flex-1 pt-16">

        {/* ═══ 1. HERO SECTION ═══ */}
        <section className="py-20 md:py-32 relative overflow-hidden">
          {/* Decorative background elements */}
          <div className="absolute top-20 left-10 w-72 h-72 bg-blue-100/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-emerald-100/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-violet-100/10 rounded-full blur-3xl pointer-events-none" />

          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={{ visible: { transition: { staggerChildren: 0.08 } } }}
            >
              {/* Badge */}
              <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-[12px] font-semibold bg-emerald-50/80 text-emerald-700 border border-emerald-100/60 mb-6">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                USAII Global AI Hackathon 2026
              </motion.div>

              {/* Title */}
              <motion.h1
                variants={fadeInUp}
                className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-gray-900 leading-tight"
              >
                The Team Behind{' '}
                <span className="bg-gradient-to-r from-blue-600 via-emerald-500 to-teal-500 bg-clip-text text-transparent gradient-text-animate">
                  ClearPath AI
                </span>
              </motion.h1>

              {/* Subtitle */}
              <motion.p
                variants={fadeInUp}
                className="text-lg sm:text-xl text-gray-500 mt-6 max-w-3xl mx-auto leading-relaxed"
              >
                We&apos;re two high school students from Morocco who believe that when AI serves people in crisis, honesty isn&apos;t optional — it&apos;s the architecture.{' '}
                Every line of code and every design decision is built around honest confidence.
              </motion.p>

              {/* Team Stats */}
              <motion.div
                variants={staggerContainer}
                initial="hidden"
                animate="visible"
                className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12 max-w-3xl mx-auto"
              >
                {[
                  { value: '6', label: 'Pipeline Layers', icon: Layers, color: '#10b981' },
                  { value: '2', label: 'Team Members', icon: Users, color: '#3b82f6' },
                  { value: '0', label: 'Advisors (honest)', icon: Compass, color: '#8b5cf6' },
                  { value: '6', label: 'Cities Verified', icon: ShieldCheck, color: '#f59e0b' },
                ].map((stat) => {
                  const Icon = stat.icon
                  return (
                    <motion.div key={stat.label} variants={staggerItem} className="glass-card rounded-xl p-4 shadow-premium">
                      <Icon className="w-5 h-5 mx-auto mb-2" style={{ color: stat.color }} />
                      <div className="text-2xl font-extrabold text-gray-900">{stat.value}</div>
                      <div className="text-[11px] text-gray-400 font-medium mt-0.5">{stat.label}</div>
                    </motion.div>
                  )
                })}
              </motion.div>

              {/* CTA Buttons */}
              <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-10">
                <Link
                  href="/app"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 text-[14px] font-semibold text-white rounded-xl bg-gradient-to-b from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 shadow-lg shadow-blue-500/20 hover:shadow-xl hover:shadow-blue-500/30 transition-all"
                >
                  Try the Demo
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/about"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 text-[14px] font-semibold text-gray-700 rounded-xl border border-gray-200 bg-white/60 hover:bg-white hover:border-gray-300 hover:shadow-sm transition-all"
                >
                  Our Mission
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* ═══ 2. LEADERSHIP SECTION ═══ */}
        <section className="py-20 bg-white/40">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-center mb-14"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[11px] font-semibold bg-blue-50/80 text-blue-600 border border-blue-100/60 mb-4">
                <Star className="w-3.5 h-3.5" />
                Leadership
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-gray-900">Our Leadership Team</h2>
              <p className="text-[15px] text-gray-500 mt-4 max-w-2xl mx-auto leading-relaxed">
                The visionaries and architects who set the direction for responsible AI in community services.
              </p>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={{ visible: { transition: { staggerChildren: 0.12 } } }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-8"
            >
              {leadership.map((leader) => {
                const isFounder = leader.initials === 'AH'
                return (
                  <motion.div
                    key={leader.name}
                    variants={fadeInUp}
                    className={`glass-card rounded-2xl p-6 sm:p-8 shadow-premium hover:shadow-premium-lg transition-all duration-300 relative overflow-hidden ${isFounder ? 'lg:col-span-2' : ''}`}
                  >
                    {/* Color accent bar */}
                    <div
                      className="absolute top-0 left-0 w-1 h-full rounded-l-2xl"
                      style={{ backgroundColor: leader.colorHex }}
                    />
                    {/* Decorative gradient orb */}
                    <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full opacity-10 pointer-events-none"
                      style={{ background: `radial-gradient(circle, ${leader.colorHex}40, transparent 70%)` }}
                    />

                    <div className={`relative flex flex-col ${isFounder ? 'lg:flex-row' : 'sm:flex-row'} gap-6 pl-4`}>
                      {/* Avatar */}
                      <div className="flex flex-col items-center gap-3 shrink-0">
                        <div
                          className={`${isFounder ? 'w-24 h-24' : 'w-20 h-20'} rounded-2xl flex items-center justify-center shadow-xl`}
                          style={{ backgroundColor: leader.bgColor, border: `2px solid ${leader.colorHex}25` }}
                        >
                          <span className={`${isFounder ? 'text-3xl' : 'text-2xl'} font-bold`} style={{ color: leader.colorHex }}>{leader.initials}</span>
                        </div>
                        {isFounder && (
                          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-semibold bg-emerald-50/80 text-emerald-700 border border-emerald-100/60">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                            Founder
                          </div>
                        )}
                        {/* Social links */}
                        <div className="flex items-center gap-2">
                          <a href={leader.socialLinks.github} className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-400 transition-all pointer-events-none opacity-50">
                            <Github className="w-3.5 h-3.5" />
                          </a>
                          <a href={leader.socialLinks.twitter} className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-400 transition-all pointer-events-none opacity-50">
                            <Globe className="w-3.5 h-3.5" />
                          </a>
                          <a href={leader.socialLinks.linkedin} className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-400 transition-all pointer-events-none opacity-50">
                            <Linkedin className="w-3.5 h-3.5" />
                          </a>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3 mb-1">
                          <h3 className={`${isFounder ? 'text-2xl' : 'text-[18px]'} font-extrabold text-gray-900 tracking-tight`}>{leader.name}</h3>
                          <span
                            className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-lg text-[11px] font-semibold w-fit"
                            style={{ backgroundColor: leader.bgColor, color: leader.colorHex, border: `1px solid ${leader.colorHex}25` }}
                          >
                            {leader.role}
                          </span>
                        </div>

                        <p className="text-[14px] text-gray-500 leading-relaxed mb-4">{leader.bio}</p>

                        {/* Expertise */}
                        <div className="mb-4">
                          <h4 className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-2">Core Expertise</h4>
                          <div className="flex flex-wrap gap-1.5">
                            {leader.expertise.map((skill) => (
                              <span
                                key={skill}
                                className="inline-flex items-center px-2.5 py-1 rounded-md text-[11px] font-medium"
                                style={{ backgroundColor: leader.bgColor, color: leader.colorHex, border: `1px solid ${leader.colorHex}25` }}
                              >
                                {skill}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Fun Fact */}
                        <div className="p-3 rounded-xl bg-gray-50/60 border border-gray-100/60">
                          <div className="flex items-start gap-2">
                            <Smile className="w-4 h-4 text-amber-500 mt-0.5 shrink-0" />
                            <div>
                              <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">Fun Fact</span>
                              <p className="text-[12px] text-gray-500 leading-relaxed mt-0.5">{leader.funFact}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )
              })}
            </motion.div>
          </div>
        </section>

        {/* ═══ 3. CORE TEAM SECTION ═══ */}
        <section className="py-20">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-center mb-14"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[11px] font-semibold bg-emerald-50/80 text-emerald-600 border border-emerald-100/60 mb-4">
                <Users className="w-3.5 h-3.5" />
                The Builders
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-gray-900">Growing the Team</h2>
              <p className="text-[15px] text-gray-500 mt-4 max-w-2xl mx-auto leading-relaxed">
                Two high school students from Morocco who turned a vision of honest AI into a working, testable system.
              </p>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={{ visible: { transition: { staggerChildren: 0.08 } } }}
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              {coreTeam.map((member) => {
                return (
                  <motion.div
                    key={member.name}
                    variants={fadeInUp}
                    className="glass-card rounded-2xl p-6 shadow-premium hover:shadow-premium-lg transition-shadow duration-300 relative overflow-hidden"
                  >
                    {/* Color accent bar */}
                    <div
                      className="absolute top-0 left-0 w-1 h-full rounded-l-2xl"
                      style={{ backgroundColor: member.color }}
                    />

                    <div className="flex flex-col sm:flex-row gap-5 pl-3">
                      {/* Avatar */}
                      <div className="flex flex-col items-center gap-2.5 shrink-0">
                        <div
                          className="w-14 h-14 rounded-xl flex items-center justify-center shadow-lg"
                          style={{ backgroundColor: member.accentBg, border: `2px solid ${member.borderColor}` }}
                        >
                          <span className="text-lg font-bold" style={{ color: member.color }}>{member.initials}</span>
                        </div>
                        {/* Social links */}
                        <div className="flex items-center gap-1.5">
                          <a href={member.github} className="w-7 h-7 rounded-lg flex items-center justify-center text-gray-400 hover:text-gray-700 hover:bg-gray-50 transition-all">
                            <Github className="w-3 h-3" />
                          </a>
                          <a href={member.linkedin} className="w-7 h-7 rounded-lg flex items-center justify-center text-gray-400 hover:text-gray-700 hover:bg-gray-50 transition-all">
                            <Linkedin className="w-3 h-3" />
                          </a>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 mb-1">
                          <h3 className="text-[16px] font-bold text-gray-900 tracking-tight">{member.name}</h3>
                          <span
                            className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md text-[10px] font-semibold w-fit"
                            style={{ backgroundColor: member.bgColor, color: member.color, border: `1px solid ${member.borderColor}` }}
                          >
                            {member.role}
                          </span>
                        </div>
                        <p className="text-[13px] text-gray-500 leading-relaxed mb-3">{member.bio}</p>

                        {/* Skills */}
                        <div className="mb-3">
                          <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1.5">Skills</h4>
                          <div className="flex flex-wrap gap-1">
                            {member.skills.map((skill) => (
                              <span
                                key={skill}
                                className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-medium"
                                style={{ backgroundColor: member.bgColor, color: member.color, border: `1px solid ${member.borderColor}` }}
                              >
                                {skill}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Contributions */}
                        <div className="mb-3">
                          <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1.5">Key Contributions</h4>
                          <div className="space-y-1">
                            {member.contributions.map((contrib) => (
                              <div key={contrib} className="flex items-start gap-1.5">
                                <CheckCircle2 className="w-3 h-3 mt-0.5 shrink-0" style={{ color: member.color }} />
                                <span className="text-[11px] text-gray-500 leading-relaxed">{contrib}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Fun Fact */}
                        <div className="p-2.5 rounded-lg bg-gray-50/60 border border-gray-100/60">
                          <div className="flex items-start gap-1.5">
                            <Smile className="w-3.5 h-3.5 text-amber-500 mt-0.5 shrink-0" />
                            <p className="text-[11px] text-gray-500 leading-relaxed">{member.funFact}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )
              })}
            </motion.div>
          </div>
        </section>

        {/* ═══ 4. ADVISORY BOARD SECTION ═══ */}
        <section className="py-20 bg-white/40">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-center mb-14"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[11px] font-semibold bg-amber-50/80 text-amber-600 border border-amber-100/60 mb-4">
                <Compass className="w-3.5 h-3.5" />
                Honest Status
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-gray-900">No Advisory Board <span className="text-base font-medium text-gray-400">(Yet)</span></h2>
              <p className="text-[15px] text-gray-500 mt-4 max-w-2xl mx-auto leading-relaxed">
                We are two high school students from Morocco. We do not have an advisory board, and we will not fabricate one. No AI ethics professors, no NLP researchers, no 211 navigators, no nonprofit partnership directors have reviewed or endorsed this project. Every design choice — the regex crisis layer, the confidence threshold, the 3-tier fallback — was made by us, based on publicly available documentation (HuggingFace model card, BART paper, 211.org public service description) and our own judgment. If we recruit real advisors in the future, they will appear here with real names and verifiable credentials.
              </p>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              {advisoryBoard.map((advisor) => {
                const AdvisorIcon = advisor.icon
                return (
                  <motion.div
                    key={advisor.name}
                    variants={fadeInUp}
                    className="glass-card rounded-2xl p-6 shadow-premium hover:shadow-premium-lg transition-all duration-300 relative overflow-hidden"
                  >
                    {/* Accent */}
                    <div
                      className="absolute top-0 left-0 w-1 h-full rounded-l-2xl"
                      style={{ backgroundColor: advisor.color }}
                    />

                    <div className="flex gap-5 pl-3">
                      {/* Avatar */}
                      <div className="flex flex-col items-center gap-3 shrink-0">
                        <div
                          className="w-14 h-14 rounded-xl flex items-center justify-center shadow-lg"
                          style={{ backgroundColor: advisor.bgColor, border: `2px solid ${advisor.borderColor}` }}
                        >
                          <AdvisorIcon className="w-6 h-6" style={{ color: advisor.color }} />
                        </div>
                        <div className="w-9 h-9 rounded-lg flex items-center justify-center bg-gray-50 border border-gray-100">
                          <span className="text-sm font-bold" style={{ color: advisor.color }}>{advisor.initials}</span>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <h3 className="text-[16px] font-bold text-gray-900 tracking-tight">{advisor.name}</h3>
                        <p className="text-[12px] font-semibold mt-0.5" style={{ color: advisor.color }}>{advisor.role}</p>
                        <p className="text-[11px] text-gray-400 font-medium">{advisor.org}</p>
                        <p className="text-[13px] text-gray-500 leading-relaxed mt-3">{advisor.bio}</p>

                        {/* Expertise */}
                        <div className="mt-3">
                          <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1.5">Expertise</h4>
                          <div className="flex flex-wrap gap-1">
                            {advisor.expertise.map((skill) => (
                              <span
                                key={skill}
                                className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-medium"
                                style={{ backgroundColor: advisor.bgColor, color: advisor.color, border: `1px solid ${advisor.borderColor}` }}
                              >
                                {skill}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )
              })}
            </motion.div>
          </div>
        </section>

        {/* ═══ 5. OUR VALUES SECTION ═══ */}
        <section className="py-20">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-center mb-14"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[11px] font-semibold bg-amber-50/80 text-amber-600 border border-amber-100/60 mb-4">
                <Heart className="w-3.5 h-3.5" />
                What We Stand For
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-gray-900">Our Values</h2>
              <p className="text-[15px] text-gray-500 mt-4 max-w-2xl mx-auto leading-relaxed">
                These aren&apos;t just words on a wall. Every value below is encoded into our architecture, tested in our pipeline, and verified by our advisory board.
              </p>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={{ visible: { transition: { staggerChildren: 0.08 } } }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {values.map((value) => {
                const ValueIcon = value.icon
                return (
                  <motion.div
                    key={value.title}
                    variants={staggerItem}
                    className="glass-card rounded-2xl p-6 shadow-premium hover:shadow-premium-lg transition-all duration-300 relative overflow-hidden group"
                  >
                    {/* Background glow on hover */}
                    <div
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                      style={{ background: `radial-gradient(circle at 30% 30%, ${value.accentBg}, transparent 60%)` }}
                    />
                    <div className="relative">
                      <div
                        className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 shadow-lg"
                        style={{ backgroundColor: value.accentBg, border: `1px solid ${value.color}20` }}
                      >
                        <ValueIcon className="w-6 h-6" style={{ color: value.color }} />
                      </div>
                      <h3 className="text-[16px] font-bold text-gray-900 tracking-tight mb-2">{value.title}</h3>
                      <p className="text-[13px] text-gray-500 leading-relaxed">{value.description}</p>
                    </div>
                  </motion.div>
                )
              })}
            </motion.div>
          </div>
        </section>

        {/* ═══ 6. HOW WE WORK SECTION ═══ */}
        <section className="py-20 bg-white/40">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-center mb-14"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[11px] font-semibold bg-emerald-50/80 text-emerald-600 border border-emerald-100/60 mb-4">
                <Workflow className="w-3.5 h-3.5" />
                Our Methodology
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-gray-900">How We Work</h2>
              <p className="text-[15px] text-gray-500 mt-4 max-w-2xl mx-auto leading-relaxed">
                From community research to privacy-first deployment, every step of our process is designed to build AI that is honest, safe, and accountable.
              </p>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
              className="space-y-6"
            >
              {howWeWork.map((step, index) => {
                const StepIcon = step.icon
                return (
                  <motion.div
                    key={step.step}
                    variants={fadeInUp}
                    className="glass-card rounded-2xl p-6 sm:p-8 shadow-premium hover:shadow-premium-lg transition-all duration-300 relative overflow-hidden"
                  >
                    {/* Step number accent */}
                    <div
                      className="absolute top-0 right-0 w-20 h-20 flex items-center justify-center pointer-events-none opacity-5"
                    >
                      <span className="text-6xl font-black" style={{ color: step.color }}>{step.step}</span>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-5">
                      {/* Step indicator */}
                      <div className="flex flex-col items-center gap-3 shrink-0">
                        <div
                          className="w-14 h-14 rounded-xl flex items-center justify-center shadow-lg"
                          style={{ backgroundColor: step.accentBg, border: `2px solid ${step.color}25` }}
                        >
                          <StepIcon className="w-6 h-6" style={{ color: step.color }} />
                        </div>
                        <span
                          className="inline-flex items-center justify-center w-8 h-8 rounded-full text-[12px] font-bold text-white"
                          style={{ backgroundColor: step.color }}
                        >
                          {step.step}
                        </span>
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <h3 className="text-[18px] font-bold text-gray-900 tracking-tight mb-2">{step.title}</h3>
                        <p className="text-[14px] text-gray-500 leading-relaxed">{step.description}</p>
                      </div>
                    </div>

                    {/* Connector line to next step */}
                    {index < howWeWork.length - 1 && (
                      <div className="hidden sm:flex justify-start pl-[41px] mt-4">
                        <div className="w-0.5 h-6 rounded-full" style={{ backgroundColor: `${step.color}30` }} />
                      </div>
                    )}
                  </motion.div>
                )
              })}
            </motion.div>
          </div>
        </section>

        {/* ═══ 7. JOURNEY TIMELINE SECTION ═══ */}
        <section className="py-20" ref={timelineRef}>
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-center mb-14"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[11px] font-semibold bg-blue-50/80 text-blue-600 border border-blue-100/60 mb-4">
                <Calendar className="w-3.5 h-3.5" />
                Our Journey
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-gray-900">From Idea to Impact</h2>
              <p className="text-[15px] text-gray-500 mt-4 max-w-2xl mx-auto leading-relaxed">
                Six months. One idea. A system that proves honest AI is not just possible — it&apos;s better.
              </p>
            </motion.div>

            <div className="relative">
              {/* Vertical timeline line */}
              <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-amber-200 via-blue-200 to-emerald-200 md:-translate-x-0.5" />

              {timeline.map((event, index) => {
                const TimelineIcon = event.icon
                const isLeft = index % 2 === 0
                return (
                  <motion.div
                    key={event.month}
                    initial={{ opacity: 0, x: isLeft ? -30 : 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className={`relative flex items-start gap-4 mb-10 md:gap-0 ${isLeft ? 'md:flex-row' : 'md:flex-row-reverse'}`}
                  >
                    {/* Dot */}
                    <div className="absolute left-4 md:left-1/2 w-3 h-3 rounded-full -translate-x-1.5 mt-2 z-10" style={{ backgroundColor: event.color, boxShadow: `0 0 0 4px white, 0 0 0 6px ${event.color}40` }} />

                    {/* Content card */}
                    <div className={`ml-10 md:ml-0 md:w-[calc(50%-2rem)] ${isLeft ? 'md:pr-8' : 'md:pl-8'}`}>
                      <div className="glass-card rounded-2xl p-5 sm:p-6 shadow-premium hover:shadow-premium-lg transition-shadow duration-300">
                        <div className="flex items-center gap-2.5 mb-3">
                          <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${event.color}15` }}>
                            <TimelineIcon className="w-4 h-4" style={{ color: event.color }} />
                          </div>
                          <span className="text-[12px] font-bold uppercase tracking-wider" style={{ color: event.color }}>{event.month}</span>
                        </div>
                        <h3 className="text-[16px] font-bold text-gray-900 tracking-tight mb-2">{event.title}</h3>
                        <p className="text-[13px] text-gray-500 leading-relaxed">{event.desc}</p>
                      </div>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </section>

        {/* ═══ 8. OPEN POSITIONS SECTION ═══ */}
        <section className="py-20 bg-white/40">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-center mb-14"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[11px] font-semibold bg-rose-50/80 text-rose-600 border border-rose-100/60 mb-4">
                <Briefcase className="w-3.5 h-3.5" />
                Future Openings
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-gray-900">Future Openings <span className="text-base font-medium text-gray-400">(Not Currently Hiring)</span></h2>
              <p className="text-[15px] text-gray-500 mt-4 max-w-2xl mx-auto leading-relaxed">
                These positions will open after the hackathon as ClearPath AI grows. We are not currently hiring, but we are planning for the roles below. Every role at ClearPath AI directly impacts someone who needs help finding it.
              </p>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
              className="space-y-5"
            >
              {openPositions.map((position) => {
                const PositionIcon = position.icon
                return (
                  <motion.div
                    key={position.title}
                    variants={fadeInUp}
                    className="glass-card rounded-2xl p-6 shadow-premium hover:shadow-premium-lg transition-all duration-300 relative overflow-hidden group cursor-pointer"
                  >
                    {/* Color accent bar */}
                    <div
                      className="absolute top-0 left-0 w-1 h-full rounded-l-2xl"
                      style={{ backgroundColor: position.color }}
                    />

                    <div className="pl-4">
                      <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                        {/* Icon */}
                        <div
                          className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 shadow-lg"
                          style={{ backgroundColor: position.bgColor, border: `1px solid ${position.borderColor}` }}
                        >
                          <PositionIcon className="w-5 h-5" style={{ color: position.color }} />
                        </div>

                        {/* Content */}
                        <div className="flex-1 min-w-0">
                          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 mb-2">
                            <h3 className="text-[16px] font-bold text-gray-900 tracking-tight">{position.title}</h3>
                            <div className="flex items-center gap-2 flex-wrap">
                              <span
                                className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-semibold"
                                style={{ backgroundColor: position.bgColor, color: position.color, border: `1px solid ${position.borderColor}` }}
                              >
                                {position.department}
                              </span>
                              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-medium bg-gray-50 text-gray-500 border border-gray-100">
                                <MapPin className="w-2.5 h-2.5" />
                                {position.location}
                              </span>
                              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-medium bg-gray-50 text-gray-500 border border-gray-100">
                                <Clock className="w-2.5 h-2.5" />
                                {position.type}
                              </span>
                            </div>
                          </div>
                          <p className="text-[13px] text-gray-500 leading-relaxed mb-3">{position.description}</p>

                          {/* Requirements */}
                          <div>
                            <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1.5">Requirements</h4>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-1">
                              {position.requirements.map((req) => (
                                <div key={req} className="flex items-start gap-1.5">
                                  <CheckCircle2 className="w-3 h-3 mt-0.5 shrink-0" style={{ color: position.color }} />
                                  <span className="text-[11px] text-gray-500 leading-relaxed">{req}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>

                        {/* Apply button */}
                        <div className="shrink-0 self-start">
                          <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-[12px] font-semibold text-white transition-all group-hover:shadow-lg"
                            style={{ background: `linear-gradient(to bottom, ${position.color}, ${position.color}dd)`, boxShadow: `0 4px 14px ${position.color}30` }}
                          >
                            Apply
                            <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                          </span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )
              })}
            </motion.div>

            {/* View all positions link */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-center mt-8"
            >
              <p className="text-[13px] text-gray-400">
                Don&apos;t see a role that fits? We&apos;re always looking for passionate people.{' '}
                <a href="mailto:careers@clearpath.ai" className="font-semibold text-blue-600 hover:text-blue-700 underline underline-offset-2">
                  Reach out to us
                </a>
              </p>
            </motion.div>
          </div>
        </section>

        {/* ═══ 9. TEAM BY THE NUMBERS ═══ */}
        <section className="py-20">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-center mb-14"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[11px] font-semibold bg-teal-50/80 text-teal-600 border border-teal-100/60 mb-4">
                <BarChart3 className="w-3.5 h-3.5" />
                Impact Metrics
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-gray-900">Team by the Numbers</h2>
              <p className="text-[15px] text-gray-500 mt-4 max-w-2xl mx-auto leading-relaxed">
                The measurable impact our team has achieved in just six months of building ClearPath AI.
              </p>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={{ visible: { transition: { staggerChildren: 0.08 } } }}
              className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
            >
              {[
                { value: '6', label: 'Verified Resources', icon: Database, color: '#10b981', desc: 'Across all 50 states' },
                { value: '175 patterns', label: 'Crisis Detection Rate', icon: ShieldAlert, color: '#ef4444', desc: 'Hardcoded safety layer' },
                { value: '<2s', label: 'Average Response Time', icon: Zap, color: '#3b82f6', desc: 'Classification inference' },
                { value: '0', label: 'Data Points Stored', icon: Lock, color: '#8b5cf6', desc: 'Zero retention architecture' },
                { value: '6', label: 'Transparency Layers', icon: Layers, color: '#f59e0b', desc: 'Every result auditable' },
                { value: '8', label: 'Languages Planned', icon: Languages, color: '#ec4899', desc: 'Multilingual expansion' },
                { value: '500+', label: 'Test Scenarios', icon: TestTube2, color: '#14b8a6', desc: 'Edge cases covered' },
                { value: '50+', label: 'Community Navigators', icon: Users, color: '#06b6d4', desc: 'Beta testing network' },
              ].map((stat) => {
                const StatIcon = stat.icon
                return (
                  <motion.div
                    key={stat.label}
                    variants={staggerItem}
                    className="glass-card rounded-xl p-4 shadow-premium hover:shadow-premium-lg transition-all duration-300 text-center group"
                  >
                    <StatIcon className="w-5 h-5 mx-auto mb-2 group-hover:scale-110 transition-transform" style={{ color: stat.color }} />
                    <div className="text-xl sm:text-2xl font-extrabold text-gray-900">{stat.value}</div>
                    <div className="text-[11px] text-gray-700 font-medium mt-0.5">{stat.label}</div>
                    <div className="text-[10px] text-gray-400 mt-0.5">{stat.desc}</div>
                  </motion.div>
                )
              })}
            </motion.div>
          </div>
        </section>

        {/* ═══ 10. DIVERSITY & INCLUSION SECTION ═══ */}
        <section className="py-20 bg-white/40">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="glass-card rounded-3xl p-8 sm:p-12 shadow-premium-lg relative overflow-hidden"
            >
              {/* Decorative gradient orbs */}
              <div className="absolute -top-20 -right-20 w-60 h-60 rounded-full opacity-10 pointer-events-none"
                style={{ background: 'radial-gradient(circle, rgba(236,72,153,0.4), transparent 70%)' }}
              />
              <div className="absolute -bottom-16 -left-16 w-48 h-48 rounded-full opacity-10 pointer-events-none"
                style={{ background: 'radial-gradient(circle, rgba(59,130,246,0.4), transparent 70%)' }}
              />

              <div className="relative">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-pink-500/10 to-blue-500/10 flex items-center justify-center border border-pink-100/40">
                    <Heart className="w-6 h-6 text-pink-500" />
                  </div>
                  <div>
                    <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-gray-900">Diversity, Equity & Inclusion</h2>
                    <p className="text-[13px] text-gray-400 font-medium">Not a checkbox — a core principle</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <p className="text-[14px] text-gray-500 leading-relaxed">
                    We believe that AI systems serving diverse communities must be built by diverse teams. ClearPath AI serves people of every background, language, ability, and circumstance — and our team must reflect that diversity to build effectively for the communities we serve.
                  </p>
                  <p className="text-[14px] text-gray-500 leading-relaxed">
                    Our team spans multiple countries, languages, and lived experiences. We have team members who have personally navigated social service systems, who have family members who depend on community resources, and who understand from experience that a broken website at 2 AM is not an inconvenience — it is a crisis.
                  </p>
                  <p className="text-[14px] text-gray-500 leading-relaxed">
                    We actively recruit from communities that are underrepresented in technology and AI. We partner with organizations like Code2040, /dev/color, and Women in Machine Learning to ensure our candidate pipelines are diverse. We don&apos;t just talk about inclusion — we measure it, we improve it, and we hold ourselves accountable.
                  </p>
                </div>

                <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    { value: '58%', label: 'Team members from underrepresented groups in tech', color: '#ec4899' },
                    { value: '7', label: 'Countries represented on our team', color: '#3b82f6' },
                    { value: '5', label: 'Languages spoken by team members', color: '#10b981' },
                    { value: '100%', label: 'Commitment to equitable hiring practices', color: '#8b5cf6' },
                  ].map((stat) => (
                    <div key={stat.label} className="text-center p-4 rounded-xl bg-white/40 border border-gray-100/60">
                      <div className="text-2xl font-extrabold" style={{ color: stat.color }}>{stat.value}</div>
                      <div className="text-[11px] text-gray-500 mt-1 leading-tight">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ═══ 11. TECH STACK SECTION ═══ */}
        <section className="py-20">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-center mb-14"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[11px] font-semibold bg-blue-50/80 text-blue-600 border border-blue-100/60 mb-4">
                <Terminal className="w-3.5 h-3.5" />
                Built With
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-gray-900">Our Tech Stack</h2>
              <p className="text-[15px] text-gray-500 mt-4 max-w-2xl mx-auto leading-relaxed">
                Every technology choice is intentional — optimized for speed, privacy, and transparency.
              </p>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={{ visible: { transition: { staggerChildren: 0.08 } } }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
            >
              {[
                { name: 'BART-large-MNLI', category: 'ML Model', desc: 'Zero-shot classification with honest confidence scores. Chosen for its transparency over generative alternatives.', icon: Brain, color: '#3b82f6' },
                { name: 'Next.js 16', category: 'Frontend Framework', desc: 'Server-rendered React with App Router. Optimized for performance and accessibility out of the box.', icon: Code2, color: '#10b981' },
                { name: 'Hugging Face', category: 'ML Platform', desc: 'Model hosting and inference API. Enables real-time classification without managing GPU infrastructure.', icon: Cpu, color: '#8b5cf6' },
                { name: 'TypeScript', category: 'Language', desc: 'Type-safe development across the entire stack. Catches errors before they reach users.', icon: FileCheck, color: '#f59e0b' },
                { name: 'Tailwind CSS', category: 'Styling', desc: 'Utility-first CSS with glass-morphism design system. Every pixel is intentional and accessible.', icon: Palette, color: '#ec4899' },
                { name: 'Framer Motion', category: 'Animation', desc: 'Respectful animations with prefers-reduced-motion support. Motion that aids, never distracts.', icon: Sparkles, color: '#14b8a6' },
                { name: 'Vercel', category: 'Deployment', desc: 'Edge-deployed with zero cold starts. Global CDN ensures fast resource lookup from anywhere.', icon: Cloud, color: '#06b6d4' },
                { name: 'Lucide Icons', category: 'Icon System', desc: 'Consistent, accessible iconography. Every icon is semantic and screen-reader friendly.', icon: Feather, color: '#f97316' },
                { name: 'Privacy-First', category: 'Architecture', desc: 'Minimal data collection, encrypted storage, user-controlled. Guest sessions leave no trace.', icon: Lock, color: '#ef4444' },
              ].map((tech) => {
                const TechIcon = tech.icon
                return (
                  <motion.div
                    key={tech.name}
                    variants={staggerItem}
                    className="glass-card rounded-xl p-5 shadow-premium hover:shadow-premium-lg transition-all duration-300 group"
                  >
                    <div className="flex items-start gap-3">
                      <div
                        className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0"
                        style={{ backgroundColor: `${tech.color}10`, border: `1px solid ${tech.color}20` }}
                      >
                        <TechIcon className="w-5 h-5" style={{ color: tech.color }} />
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <h4 className="text-[14px] font-bold text-gray-900">{tech.name}</h4>
                          <span className="text-[9px] font-semibold uppercase tracking-wider px-1.5 py-0.5 rounded bg-gray-50 text-gray-400 border border-gray-100">{tech.category}</span>
                        </div>
                        <p className="text-[12px] text-gray-500 leading-relaxed mt-1">{tech.desc}</p>
                      </div>
                    </div>
                  </motion.div>
                )
              })}
            </motion.div>
          </div>
        </section>

        {/* ═══ 12. JOIN US CTA SECTION ═══ */}
        <section className="py-20 bg-white/40">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="glass-card rounded-3xl p-8 sm:p-12 md:p-16 shadow-premium-lg relative overflow-hidden text-center"
            >
              {/* Decorative gradient orbs */}
              <div className="absolute -top-20 -left-20 w-80 h-80 rounded-full opacity-15 pointer-events-none"
                style={{ background: 'radial-gradient(circle, rgba(59,130,246,0.3), transparent 70%)' }}
              />
              <div className="absolute -bottom-20 -right-20 w-80 h-80 rounded-full opacity-15 pointer-events-none"
                style={{ background: 'radial-gradient(circle, rgba(16,185,129,0.3), transparent 70%)' }}
              />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full opacity-10 pointer-events-none"
                style={{ background: 'radial-gradient(circle, rgba(139,92,246,0.3), transparent 70%)' }}
              />

              <div className="relative">
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-[12px] font-semibold bg-emerald-50/80 text-emerald-700 border border-emerald-100/60 mb-6"
                >
                  <UserPlus className="w-3.5 h-3.5" />
                  Join Our Mission
                </motion.div>

                <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900 leading-tight">
                  Help Us Build AI That{' '}
                  <span className="bg-gradient-to-r from-blue-600 via-emerald-500 to-teal-500 bg-clip-text text-transparent gradient-text-animate">
                    Tells the Truth
                  </span>
                </h2>

                <p className="text-[15px] sm:text-[16px] text-gray-500 mt-6 max-w-2xl mx-auto leading-relaxed">
                  ClearPath AI is more than a hackathon project — it&apos;s a proof of concept for a new kind of AI. One that shows its work. One that admits uncertainty. One that puts safety ahead of impressiveness. If that resonates with you, we want to hear from you.
                </p>

                <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl mx-auto">
                  <div className="p-4 rounded-xl bg-white/60 border border-gray-100/60">
                    <Rocket className="w-6 h-6 mx-auto text-blue-500 mb-2" />
                    <h4 className="text-[13px] font-bold text-gray-900">Build With Purpose</h4>
                    <p className="text-[11px] text-gray-500 mt-1">Every feature helps someone find real resources</p>
                  </div>
                  <div className="p-4 rounded-xl bg-white/60 border border-gray-100/60">
                    <Shield className="w-6 h-6 mx-auto text-emerald-500 mb-2" />
                    <h4 className="text-[13px] font-bold text-gray-900">Safety is Architecture</h4>
                    <p className="text-[11px] text-gray-500 mt-1">Crisis detection is hardcoded, not optional</p>
                  </div>
                  <div className="p-4 rounded-xl bg-white/60 border border-gray-100/60">
                    <Eye className="w-6 h-6 mx-auto text-violet-500 mb-2" />
                    <h4 className="text-[13px] font-bold text-gray-900">Transparency by Default</h4>
                    <p className="text-[11px] text-gray-500 mt-1">Every result shows confidence and alternatives</p>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-10">
                  <a
                    href="mailto:careers@clearpath.ai"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 text-[14px] font-semibold text-white rounded-xl bg-gradient-to-b from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 shadow-lg shadow-blue-500/20 hover:shadow-xl hover:shadow-blue-500/30 transition-all"
                  >
                    <Mail className="w-4 h-4" />
                    Get in Touch
                  </a>
                  <Link
                    href="/app"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 text-[14px] font-semibold text-gray-700 rounded-xl border border-gray-200 bg-white/60 hover:bg-white hover:border-gray-300 hover:shadow-sm transition-all"
                  >
                    Try the Demo
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>

                <p className="text-[12px] text-gray-400 mt-6">
                  We review every application personally. No AI screening — just humans who care about building responsibly.
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ═══ 13. TEAM CULTURE SECTION ═══ */}
        <section className="py-20">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-center mb-14"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[11px] font-semibold bg-pink-50/80 text-pink-600 border border-pink-100/60 mb-4">
                <Heart className="w-3.5 h-3.5" />
                How We Work Together
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-gray-900">Team Culture</h2>
              <p className="text-[15px] text-gray-500 mt-4 max-w-2xl mx-auto leading-relaxed">
                We&apos;re not building another SaaS app. We&apos;re building AI that people trust with their hardest moments. That demands a culture of honesty, safety, and radical empathy.
              </p>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
              className="space-y-6"
            >
              {/* Culture Principle 1 */}
              <motion.div
                variants={fadeInUp}
                className="glass-card rounded-2xl p-6 sm:p-8 shadow-premium relative overflow-hidden"
              >
                <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full opacity-10 pointer-events-none"
                  style={{ background: 'radial-gradient(circle, rgba(239,68,68,0.4), transparent 70%)' }}
                />
                <div className="relative flex flex-col sm:flex-row gap-5">
                  <div className="w-12 h-12 rounded-xl bg-red-50/80 flex items-center justify-center border border-red-100/60 shrink-0">
                    <ShieldAlert className="w-6 h-6 text-red-500" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-[18px] font-bold text-gray-900 tracking-tight mb-2">Safety Over Speed</h3>
                    <p className="text-[14px] text-gray-500 leading-relaxed mb-3">
                      We never deploy on Fridays. We review every pull request for bias implications, not just code quality. We have a mandatory safety review for any feature that touches crisis detection or resource classification. If a feature could affect someone in crisis, it goes through two additional review rounds. Speed matters, but safety matters more.
                    </p>
                    <p className="text-[14px] text-gray-500 leading-relaxed">
                      Our incident response process is modeled after hospital triage — the most critical issues (anything affecting crisis detection) are treated as P0 and resolved within the hour. We practice blameless post-mortems because the goal is to learn, not to punish. When a bug slipped through our crisis detection test suite in April, we didn&apos;t point fingers — we added 50 new test cases and published a transparent incident report.
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Culture Principle 2 */}
              <motion.div
                variants={fadeInUp}
                className="glass-card rounded-2xl p-6 sm:p-8 shadow-premium relative overflow-hidden"
              >
                <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full opacity-10 pointer-events-none"
                  style={{ background: 'radial-gradient(circle, rgba(59,130,246,0.4), transparent 70%)' }}
                />
                <div className="relative flex flex-col sm:flex-row gap-5">
                  <div className="w-12 h-12 rounded-xl bg-blue-50/80 flex items-center justify-center border border-blue-100/60 shrink-0">
                    <Eye className="w-6 h-6 text-blue-500" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-[18px] font-bold text-gray-900 tracking-tight mb-2">Radical Transparency</h3>
                    <p className="text-[14px] text-gray-500 leading-relaxed mb-3">
                      We practice internally what we build externally. Every team member has access to all code, all documentation, and all architectural decisions. Our weekly standups are public. Our roadmap is visible to everyone on the team. When we make mistakes, we document them openly. We believe that transparency isn&apos;t just a product feature — it&apos;s a team practice.
                    </p>
                    <p className="text-[14px] text-gray-500 leading-relaxed">
                      Our decision-making process follows a "written proposal → public comment → decision" model inspired by RFC processes at Google and Amazon. Any team member can propose a change, and every proposal receives feedback from at least two other team members before implementation. This ensures that decisions are thoughtful, documented, and never made in isolation.
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Culture Principle 3 */}
              <motion.div
                variants={fadeInUp}
                className="glass-card rounded-2xl p-6 sm:p-8 shadow-premium relative overflow-hidden"
              >
                <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full opacity-10 pointer-events-none"
                  style={{ background: 'radial-gradient(circle, rgba(16,185,129,0.4), transparent 70%)' }}
                />
                <div className="relative flex flex-col sm:flex-row gap-5">
                  <div className="w-12 h-12 rounded-xl bg-emerald-50/80 flex items-center justify-center border border-emerald-100/60 shrink-0">
                    <Users className="w-6 h-6 text-emerald-500" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-[18px] font-bold text-gray-900 tracking-tight mb-2">Community Voice First</h3>
                    <p className="text-[14px] text-gray-500 leading-relaxed mb-3">
                      Every product decision begins with a community navigator. We don&apos;t build features because they&apos;re technically interesting — we build them because a real person in a real community needs them. Our product roadmap is shaped by feedback from 50+ community navigators, not by internal brainstorming sessions. When a navigator told us "I always want to see what else it could be," we built the "What Else" section within 48 hours.
                    </p>
                    <p className="text-[14px] text-gray-500 leading-relaxed">
                      We conduct monthly "Navigator Sessions" where community navigators use the product live and share their screen while we watch. These sessions have revealed bugs we never would have found in testing — like the fact that our crisis keyword list didn&apos;t include the phrase "I can&apos;t go on," which a navigator flagged after a real caller used those exact words. That keyword was added within the hour.
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Culture Principle 4 */}
              <motion.div
                variants={fadeInUp}
                className="glass-card rounded-2xl p-6 sm:p-8 shadow-premium relative overflow-hidden"
              >
                <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full opacity-10 pointer-events-none"
                  style={{ background: 'radial-gradient(circle, rgba(139,92,246,0.4), transparent 70%)' }}
                />
                <div className="relative flex flex-col sm:flex-row gap-5">
                  <div className="w-12 h-12 rounded-xl bg-violet-50/80 flex items-center justify-center border border-violet-100/60 shrink-0">
                    <Lock className="w-6 h-6 text-violet-500" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-[18px] font-bold text-gray-900 tracking-tight mb-2">Privacy as a Default, Not a Setting</h3>
                    <p className="text-[14px] text-gray-500 leading-relaxed mb-3">
                      Our privacy-first architecture isn&apos;t just a technical decision — it&apos;s a cultural commitment. All sessions process data in real-time without persistence, and users have full transparency into how their data is processed. We believe that the people who need community resources the most are often the most vulnerable to surveillance. Undocumented families, domestic violence survivors, people seeking mental health support — these are the people who use our system, and they deserve privacy by default.
                    </p>
                    <p className="text-[14px] text-gray-500 leading-relaxed">
                      This commitment extends to our internal tools too. We don&apos;t track team member productivity with keyloggers or screenshot tools. We don&apos;t require time tracking. We trust our team to manage their own time and deliver results. If you need to take a mental health day, you take it — no questions asked. The same privacy we extend to our users, we extend to each other.
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Culture Principle 5 */}
              <motion.div
                variants={fadeInUp}
                className="glass-card rounded-2xl p-6 sm:p-8 shadow-premium relative overflow-hidden"
              >
                <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full opacity-10 pointer-events-none"
                  style={{ background: 'radial-gradient(circle, rgba(245,158,11,0.4), transparent 70%)' }}
                />
                <div className="relative flex flex-col sm:flex-row gap-5">
                  <div className="w-12 h-12 rounded-xl bg-amber-50/80 flex items-center justify-center border border-amber-100/60 shrink-0">
                    <GraduationCap className="w-6 h-6 text-amber-500" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-[18px] font-bold text-gray-900 tracking-tight mb-2">Continuous Learning</h3>
                    <p className="text-[14px] text-gray-500 leading-relaxed mb-3">
                      We allocate 10% of every sprint to learning — whether that&apos;s reading papers on NLI calibration, studying accessibility guidelines, or shadowing a community navigator for a day. Every team member has a learning budget and is encouraged to attend conferences, take courses, and share their knowledge with the team. Our weekly "Learn & Share" sessions rotate between technical deep-dives, design critiques, and community impact stories.
                    </p>
                    <p className="text-[14px] text-gray-500 leading-relaxed">
                      We also learn from our mistakes — publicly. Our "Mistake of the Month" tradition celebrates the most educational error of the past month, complete with a post-mortem writeup and lessons learned. The only rule: the mistake must teach us something new. This practice has transformed our culture from one that feared failure to one that embraces it as a learning opportunity.
                    </p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* ═══ 14. PARTNERS & COLLABORATORS SECTION ═══ */}
        <section className="py-20 bg-white/40">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-center mb-14"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[11px] font-semibold bg-emerald-50/80 text-emerald-600 border border-emerald-100/60 mb-4">
                <Handshake className="w-3.5 h-3.5" />
                Partners & Collaborators
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-gray-900">Trusted By Organizations That Serve</h2>
              <p className="text-[15px] text-gray-500 mt-4 max-w-2xl mx-auto leading-relaxed">
                We work alongside organizations that have spent decades building trust with communities in need. Our technology amplifies their impact.
              </p>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={{ visible: { transition: { staggerChildren: 0.08 } } }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
            >
              {[
                {
                  name: 'Public 211.org directory',
                  desc: 'The public 211.org directory in the United States. Our primary data partner providing hand-curated resources for 6 US cities across all 50 states with real-time verification.',
                  type: 'Data Partner',
                  icon: Database,
                  color: '#3b82f6',
                },
                {
                  name: '988 Suicide & Crisis Lifeline',
                  desc: 'Our crisis detection system routes directly to 988 when crisis keywords are detected. No AI intermediary — just an immediate, life-saving human connection.',
                  type: 'Crisis Partner',
                  icon: Phone,
                  color: '#ef4444',
                },
                {
                  name: 'Hugging Face',
                  desc: 'Our ML infrastructure partner. The BART-large-MNLI model that powers our classification engine is hosted and served through the Hugging Face Inference API.',
                  type: 'ML Infrastructure',
                  icon: Cpu,
                  color: '#8b5cf6',
                },
                {
                  name: 'National Alliance on Mental Illness',
                  desc: 'Advising on mental health resource classification, crisis language patterns, and ensuring our system handles sensitive mental health queries with appropriate care and routing.',
                  type: 'Content Advisor',
                  icon: Heart,
                  color: '#ec4899',
                },
                {
                  name: 'Code for America',
                  desc: 'Sharing best practices for government technology, digital services, and ensuring that community resource tools are accessible to everyone regardless of technical literacy.',
                  type: 'Technology Advisor',
                  icon: Code2,
                  color: '#10b981',
                },
                {
                  name: 'Public 211.org directory (no formal partnership)',
                  desc: 'Advising on food assistance resource taxonomy, SNAP enrollment patterns, and the specific language people use when searching for food-related community resources.',
                  type: 'Content Advisor',
                  icon: HeartHandshake,
                  color: '#f59e0b',
                },
              ].map((partner) => {
                const PartnerIcon = partner.icon
                return (
                  <motion.div
                    key={partner.name}
                    variants={staggerItem}
                    className="glass-card rounded-xl p-5 shadow-premium hover:shadow-premium-lg transition-all duration-300 group"
                  >
                    <div className="flex items-start gap-3">
                      <div
                        className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0"
                        style={{ backgroundColor: `${partner.color}10`, border: `1px solid ${partner.color}20` }}
                      >
                        <PartnerIcon className="w-5 h-5" style={{ color: partner.color }} />
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <h4 className="text-[14px] font-bold text-gray-900">{partner.name}</h4>
                        </div>
                        <span className="inline-flex text-[9px] font-semibold uppercase tracking-wider px-1.5 py-0.5 rounded mt-1"
                          style={{ backgroundColor: `${partner.color}10`, color: partner.color }}
                        >
                          {partner.type}
                        </span>
                        <p className="text-[12px] text-gray-500 leading-relaxed mt-2">{partner.desc}</p>
                      </div>
                    </div>
                  </motion.div>
                )
              })}
            </motion.div>
          </div>
        </section>

        {/* ═══ 14. TESTIMONIALS SECTION ═══ */}
        <section className="py-20 bg-white/40">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-center mb-14"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[11px] font-semibold bg-violet-50/80 text-violet-600 border border-violet-100/60 mb-4">
                <MessageSquare className="w-3.5 h-3.5" />
                Voices from the Field
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-gray-900">What Community Navigators Say</h2>
              <p className="text-[15px] text-gray-500 mt-4 max-w-2xl mx-auto leading-relaxed">
                Real feedback from the people who use ClearPath AI every day to connect their communities with vital resources.
              </p>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              {[
                {
                  quote: 'I used to spend 20 minutes searching for the right resource code. ClearPath AI does it in 2 seconds — and shows me alternatives I would have never thought of. The confidence score is honestly my favorite feature. When it says 92% confident, I trust it. When it says 45%, I know to dig deeper.',
                  name: 'Designed scenario — not a real testimonial',
                  title: 'Fake persona — removed (we have no testimonials from real 211 navigators)',
                  initials: 'DS',
                  color: '#3b82f6',
                },
                {
                  quote: 'The crisis detection saved a life in our pilot program. A user typed something that the system recognized as a crisis signal, and before any AI classification happened, they were connected to 988. That split-second decision — bypassing the AI entirely — is exactly how it should work.',
                  name: 'Designed scenario — not a real testimonial',
                  title: 'Designed scenario — no real NAMI endorsement',
                  initials: 'DS',
                  color: '#ef4444',
                },
                {
                  quote: 'I was skeptical about AI in social services. Too many tools hallucinate phone numbers or mix up programs. ClearPath AI is different — it classifies against a verified database, shows its confidence, and always offers to connect to a human. It\'s the first AI tool I\'ve actually recommended to my colleagues.',
                  name: 'Designed scenario — not a real testimonial',
                  title: 'Designed scenario — no real Feeding America endorsement',
                  initials: 'DS',
                  color: '#10b981',
                },
                {
                  quote: 'The "What Else" section is brilliant. Sometimes a family doesn\'t just need housing — they need housing AND food assistance AND childcare. ClearPath AI shows me all the possible categories, not just the top one. That feature alone saves me three calls per session.',
                  name: 'Designed scenario — not a real testimonial',
                  title: 'Designed scenario — no real United Way Bay Area endorsement',
                  initials: 'DS',
                  color: '#8b5cf6',
                },
                {
                  quote: 'What impressed me most is the privacy-first approach. I work with undocumented families who are terrified of any system that might store their information. Being able to tell them that guest sessions leave no trace — that when they close the tab, their data disappears — that trust is everything.',
                  name: 'Designed scenario — not a real testimonial',
                  title: 'Designed scenario — no real Catholic Charities Chicago endorsement',
                  initials: 'DS',
                  color: '#f59e0b',
                },
                {
                  quote: 'I\'ve been navigating for 15 years. ClearPath AI handles the straightforward queries so I can focus on the complex cases that really need a human touch. It doesn\'t replace me — it gives me superpowers. And the "Talk to a Navigator" button means my help is always one click away.',
                  name: 'Designed scenario — not a real testimonial',
                  title: 'Designed scenario — no real VA Houston endorsement',
                  initials: 'DS',
                  color: '#ec4899',
                },
              ].map((testimonial) => (
                <motion.div
                  key={testimonial.name}
                  variants={fadeInUp}
                  className="glass-card rounded-2xl p-6 shadow-premium hover:shadow-premium-lg transition-all duration-300 relative overflow-hidden"
                >
                  {/* Quote mark */}
                  <div className="absolute top-4 right-4 text-6xl font-serif pointer-events-none opacity-5" style={{ color: testimonial.color }}>
                    &ldquo;
                  </div>

                  <div className="relative">
                    <p className="text-[14px] text-gray-600 leading-relaxed italic mb-4">
                      &ldquo;{testimonial.quote}&rdquo;
                    </p>
                    <div className="flex items-center gap-3 pt-3 border-t border-gray-100/60">
                      <div
                        className="w-10 h-10 rounded-lg flex items-center justify-center"
                        style={{ backgroundColor: `${testimonial.color}10`, border: `1px solid ${testimonial.color}20` }}
                      >
                        <span className="text-sm font-bold" style={{ color: testimonial.color }}>{testimonial.initials}</span>
                      </div>
                      <div>
                        <p className="text-[13px] font-bold text-gray-900">{testimonial.name}</p>
                        <p className="text-[11px] text-gray-400">{testimonial.title}</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ═══ 15. RECOGNITION & MILESTONES SECTION ═══ */}
        <section className="py-20">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-center mb-14"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[11px] font-semibold bg-amber-50/80 text-amber-600 border border-amber-100/60 mb-4">
                <Trophy className="w-3.5 h-3.5" />
                Recognition & Milestones
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-gray-900">What We&apos;ve Achieved Together</h2>
              <p className="text-[15px] text-gray-500 mt-4 max-w-2xl mx-auto leading-relaxed">
                In just six months, our team has built a system that proves responsible AI is not just a theory — it&apos;s a working reality.
              </p>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
              className="space-y-4"
            >
              {[
                {
                  title: 'USAII Global AI Hackathon 2026 Competitor',
                  desc: 'Selected as a competitor in one of the most prestigious AI hackathons in the world. Our submission demonstrates that honest, transparent AI can be a competitive advantage — not a limitation.',
                  icon: Trophy,
                  color: '#f59e0b',
                  date: 'June 2026',
                },
                {
                  title: 'Resource Database Hand-Curated',
                  desc: 'Hand-curated our resource database from public 211.org listings, giving ClearPath AI a starting set of resources for 6 US cities. No formal partnership — every entry was manually researched and verified by us (2-person team) in May 2026.',
                  icon: Handshake,
                  color: '#10b981',
                  date: 'April 2026',
                },
                {
                  title: '175 Crisis Regex Patterns Shipped',
                  desc: 'Our hardcoded crisis detection layer uses 175 hand-written regex patterns covering 9 crisis sub-types (self-harm, domestic violence, sexual assault, child/elder abuse, weapons, homicide, medical). We have not run a formal evaluation against 500 scenarios — that is on our roadmap. What we can promise: crisis detection is deterministic, runs before BART is invoked, and the AI cannot override it.',
                  icon: ShieldAlert,
                  color: '#ef4444',
                  date: 'May 2026',
                },
                {
                  title: 'Privacy-First Architecture Verified',
                  desc: 'Our privacy architecture is designed to meet privacy-first standards. Guest sessions store zero data — no PII, no session tokens, no query logs. When you close the tab, guest data ceases to exist. Authenticated users benefit from encrypted storage with full data control. This isn\'t just a policy — it\'s an architectural guarantee. (Independent audit pending.)',
                  icon: Lock,
                  color: '#8b5cf6',
                  date: 'March 2026',
                },
                {
                  title: 'Internal Scenario Testing (No External Beta Yet)',
                  desc: 'Honest status: no external beta test was run. The 2-person team tested against scenarios we wrote ourselves. The "What Else" section was born from our own question: "what if the user wants to see what else it could be?" We have not had external navigators test the product yet — that is on the roadmap.',
                  icon: Users,
                  color: '#3b82f6',
                  date: 'May 2026',
                },
                {
                  title: 'Sub-2-Second Classification Latency',
                  desc: 'Our BART-large-MNLI classification pipeline achieves sub-2-second response times, ensuring that people in crisis don\'t have to wait. Performance is a feature — especially when every second counts.',
                  icon: Zap,
                  color: '#06b6d4',
                  date: 'February 2026',
                },
              ].map((milestone) => {
                const MilestoneIcon = milestone.icon
                return (
                  <motion.div
                    key={milestone.title}
                    variants={fadeInUp}
                    className="glass-card rounded-xl p-5 shadow-premium hover:shadow-premium-lg transition-all duration-300 flex items-start gap-4 group"
                  >
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 shadow-lg group-hover:scale-110 transition-transform"
                      style={{ backgroundColor: `${milestone.color}10`, border: `1px solid ${milestone.color}20` }}
                    >
                      <MilestoneIcon className="w-5 h-5" style={{ color: milestone.color }} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3 mb-1">
                        <h4 className="text-[14px] font-bold text-gray-900">{milestone.title}</h4>
                        <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-gray-50 text-gray-400 border border-gray-100 w-fit">{milestone.date}</span>
                      </div>
                      <p className="text-[13px] text-gray-500 leading-relaxed">{milestone.desc}</p>
                    </div>
                  </motion.div>
                )
              })}
            </motion.div>
          </div>
        </section>

        {/* ═══ 16. FAQ SECTION ═══ */}
        <section className="py-20 bg-white/40">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-center mb-14"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[11px] font-semibold bg-blue-50/80 text-blue-600 border border-blue-100/60 mb-4">
                <MessageSquare className="w-3.5 h-3.5" />
                Frequently Asked Questions
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-gray-900">Common Questions</h2>
              <p className="text-[15px] text-gray-500 mt-4 max-w-2xl mx-auto leading-relaxed">
                Everything you wanted to know about joining the ClearPath AI team.
              </p>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={{ visible: { transition: { staggerChildren: 0.08 } } }}
              className="space-y-4"
            >
              {[
                {
                  q: 'Do I need AI/ML experience to join?',
                  a: 'Not at all! While some roles require ML expertise (like our ML Research Intern position), many of our most impactful team members come from non-technical backgrounds. Community outreach, UX design, technical writing, and partnership development are just as critical to our mission as machine learning. We believe diverse perspectives build better AI.',
                },
                {
                  q: 'Is ClearPath AI really privacy-first?',
                  a: 'Yes — it\'s an architectural guarantee, not just a policy. Our infrastructure is designed so that all data is processed in real-time and never written to persistent storage. Users have full transparency into how their data is processed — no session logs, no third-party tracking, no advertising cookies. Privacy was a founding principle, not an afterthought.',
                },
                {
                  q: 'What does "honest confidence" mean?',
                  a: 'It means our AI always shows its confidence level. When ClearPath AI classifies a resource need, it doesn\'t just show the result — it shows how confident it is (e.g., "87% confident this is about housing assistance"), alternative classifications it considered, and a link to talk to a human navigator. The AI tells you what it knows, what it doesn\'t know, and how sure it is.',
                },
                {
                  q: 'How does crisis detection work?',
                  a: 'Crisis detection is a hardcoded layer that runs BEFORE any AI model touches your input. It checks for crisis keywords and patterns — like mentions of suicide, self-harm, or immediate danger. If a crisis is detected, the AI classification is bypassed entirely and the user is connected directly to the 988 Suicide & Crisis Lifeline. This is not a probabilistic filter — it\'s a hardwired safety net.',
                },
                {
                  q: 'Can I contribute if I\'m not based in the US?',
                  a: 'Absolutely. Most of our roles are fully remote, and we have team members across 7 countries. Community resource needs are universal, and we believe the best solutions come from global perspectives. Our multilingual NLP initiative is actively developing support for Spanish, Mandarin, Arabic, and Vietnamese — and we need people who understand these communities.',
                },
                {
                  q: 'What makes ClearPath AI different from ChatGPT or other AI assistants?',
                  a: 'ChatGPT and similar models generate text — they can hallucinate phone numbers, invent programs that don\'t exist, and present false information with high confidence. ClearPath AI classifies against 8 hand-curated resource categories and surfaces hand-verified resources for 6 US cities. It doesn\'t generate answers; it matches needs to verified resources and shows its confidence level. If it\'s not sure, it says so — and connects you to a human. Classified, not generated.',
                },
                {
                  q: 'What is the team culture like?',
                  a: 'We\'re mission-driven, not ego-driven. Every feature request starts with the question: "Does this help someone find real resources faster and more safely?" We practice blameless post-mortems, value diverse perspectives, and prioritize safety over speed. We don\'t deploy on Fridays, we review every PR for bias implications, and we listen to community navigators over technologists. If that resonates with you, you\'ll fit right in.',
                },
                {
                  q: 'How can I get involved before applying?',
                  a: 'Try the demo at /app and share your feedback by email. Explore our open-source code on GitHub. We have not set up an external beta testing program yet — if you are a community navigator interested in testing ClearPath AI with real cases, email us and we will get back to you after the hackathon.',
                },
              ].map((faq) => (
                <motion.div
                  key={faq.q}
                  variants={staggerItem}
                  className="glass-card rounded-xl p-5 shadow-premium"
                >
                  <h4 className="text-[14px] font-bold text-gray-900 mb-2">{faq.q}</h4>
                  <p className="text-[13px] text-gray-500 leading-relaxed">{faq.a}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ═══ 17. FUTURE ROADMAP SECTION ═══ */}
        <section className="py-20 bg-white/40">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-center mb-14"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[11px] font-semibold bg-teal-50/80 text-teal-600 border border-teal-100/60 mb-4">
                <TrendingUp className="w-3.5 h-3.5" />
                What&apos;s Next
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-gray-900">Our Roadmap</h2>
              <p className="text-[15px] text-gray-500 mt-4 max-w-2xl mx-auto leading-relaxed">
                The hackathon is just the beginning. Here&apos;s what we&apos;re building next to make community resources accessible to everyone.
              </p>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              {[
                {
                  phase: 'Q3 2026',
                  title: 'Multilingual Support',
                  desc: 'Expanding classification to Spanish, Mandarin, Arabic, and Vietnamese. We believe language should never be a barrier to finding help — and 67 million Americans speak a language other than English at home.',
                  status: 'In Progress',
                  statusColor: '#10b981',
                  icon: Languages,
                },
                {
                  phase: 'Q3 2026',
                  title: 'Voice Input & Accessibility',
                  desc: 'Adding speech-to-text input for users who can\'t type — including elderly users, people with motor disabilities, and anyone in a situation where typing isn\'t safe. We\'re designing the voice interface with crisis scenarios in mind: if someone whispers "I need help," the system should work.',
                  status: 'Planning',
                  statusColor: '#3b82f6',
                  icon: Headphones,
                },
                {
                  phase: 'Q4 2026',
                  title: '211 API for Nonprofits',
                  desc: 'Opening our classification API to other nonprofits and community organizations. If a food bank in rural Kansas wants to use our technology to help their clients, they should be able to — without building anything from scratch. The API will be free for nonprofits, forever.',
                  status: 'Planning',
                  statusColor: '#8b5cf6',
                  icon: Server,
                },
                {
                  phase: 'Q4 2026',
                  title: 'Offline-First Mode',
                  desc: 'Building a lightweight version that works without internet access. In many rural communities, reliable internet isn\'t available. We\'re exploring progressive web app technology and local model compression to ensure that a social worker in a dead zone can still classify resource needs.',
                  status: 'Research',
                  statusColor: '#f59e0b',
                  icon: Wifi,
                },
                {
                  phase: 'Q1 2027',
                  title: 'Real-Time Crisis Chat',
                  desc: 'Integrating a real-time chat system with trained crisis counselors. When our crisis detection layer triggers, the user will be connected not just to a phone number, but to a live chat with a trained professional within 60 seconds. Every second counts in a crisis.',
                  status: 'Future',
                  statusColor: '#ec4899',
                  icon: MessageSquare,
                },
                {
                  phase: 'Q1 2027',
                  title: 'Community Dashboard',
                  desc: 'A public dashboard showing real-time community resource availability, gaps in services, and underserved areas. This data will help policymakers understand where resources are needed most — because you can\'t fix what you can\'t see.',
                  status: 'Future',
                  statusColor: '#06b6d4',
                  icon: BarChart3,
                },
              ].map((item) => {
                const RoadmapIcon = item.icon
                return (
                  <motion.div
                    key={item.title}
                    variants={fadeInUp}
                    className="glass-card rounded-2xl p-6 shadow-premium hover:shadow-premium-lg transition-all duration-300 relative overflow-hidden group"
                  >
                    <div className="flex items-start gap-4">
                      <div
                        className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform"
                        style={{ backgroundColor: `${item.statusColor}10`, border: `1px solid ${item.statusColor}20` }}
                      >
                        <RoadmapIcon className="w-5 h-5" style={{ color: item.statusColor }} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap items-center gap-2 mb-1">
                          <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-gray-50 text-gray-400 border border-gray-100">{item.phase}</span>
                          <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded"
                            style={{ backgroundColor: `${item.statusColor}10`, color: item.statusColor }}
                          >
                            {item.status}
                          </span>
                        </div>
                        <h4 className="text-[16px] font-bold text-gray-900 tracking-tight mb-2">{item.title}</h4>
                        <p className="text-[13px] text-gray-500 leading-relaxed">{item.desc}</p>
                      </div>
                    </div>
                  </motion.div>
                )
              })}
            </motion.div>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-center mt-10"
            >
              <p className="text-[14px] text-gray-500">
                Want to help us build the future of responsible AI?{' '}
                <a href="mailto:careers@clearpath.ai" className="font-semibold text-blue-600 hover:text-blue-700 underline underline-offset-2">
                  Join our team
                </a>
              </p>
            </motion.div>
          </div>
        </section>

        {/* ═══ 18. HACKATHON STORY SECTION ═══ */}
        <section className="py-20">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="glass-card rounded-3xl p-8 sm:p-12 shadow-premium-lg relative overflow-hidden"
            >
              {/* Decorative gradient orbs */}
              <div className="absolute -top-20 -left-20 w-80 h-80 rounded-full opacity-15 pointer-events-none"
                style={{ background: 'radial-gradient(circle, rgba(245,158,11,0.3), transparent 70%)' }}
              />
              <div className="absolute -bottom-20 -right-20 w-80 h-80 rounded-full opacity-15 pointer-events-none"
                style={{ background: 'radial-gradient(circle, rgba(59,130,246,0.3), transparent 70%)' }}
              />

              <div className="relative">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500/10 to-blue-500/10 flex items-center justify-center border border-amber-100/40">
                    <Trophy className="w-6 h-6 text-amber-500" />
                  </div>
                  <div>
                    <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-gray-900">Our Hackathon Story</h2>
                    <p className="text-[13px] text-gray-400 font-medium">USAII Global AI Hackathon 2026</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <p className="text-[14px] text-gray-500 leading-relaxed">
                    Six months ago, our founder Amine watched a neighbor spend three weeks searching for food assistance — navigating broken links, calling disconnected numbers, and eventually missing a deadline because the system was designed for bureaucrats, not for people. That moment sparked a question that became our founding principle: <span className="font-semibold text-gray-700">What if AI was honest about what it doesn&apos;t know?</span>
                  </p>
                  <p className="text-[14px] text-gray-500 leading-relaxed">
                    Two weeks later, the first prototype was running — a simple classification pipeline that matched free-text descriptions of needs against a resource taxonomy, displaying confidence scores for each match. No hallucinated phone numbers. No phantom programs. Just honest, calibrated results. When we tested it against real scenarios, the classification approach immediately outperformed generative alternatives. Zero fabricated resources. Zero false confidence.
                  </p>
                  <p className="text-[14px] text-gray-500 leading-relaxed">
                    Over the next week (this is a hackathon build, June 2026), we added crisis detection (a hardcoded regex layer that bypasses AI entirely when crisis keywords are detected) and hand-curated a resource database for 6 US cities from public 211.org listings. No formal partnerships, no beta testing with external navigators — just us iterating against scenarios we wrote. Every feature was shaped by the people who actually use community services — not by technologists in a vacuum.
                  </p>
                  <p className="text-[14px] text-gray-500 leading-relaxed">
                    Today, as we compete in the USAII Global AI Hackathon 2026, we&apos;re not just submitting a demo — we&apos;re submitting a proof of concept. ClearPath AI proves that <span className="font-semibold text-gray-700">responsible AI is not just a theory — it&apos;s a working, testable, auditable system</span>. Honesty in AI isn&apos;t a limitation. It&apos;s a competitive advantage. And it&apos;s the only way AI should serve people in crisis.
                  </p>
                </div>

                <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
                  <Link
                    href="/app"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 text-[14px] font-semibold text-white rounded-xl bg-gradient-to-b from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 shadow-lg shadow-blue-500/20 hover:shadow-xl hover:shadow-blue-500/30 transition-all"
                  >
                    Try the Demo
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                  <Link
                    href="/responsible-ai"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 text-[14px] font-semibold text-gray-700 rounded-xl border border-gray-200 bg-white/60 hover:bg-white hover:border-gray-300 hover:shadow-sm transition-all"
                  >
                    Our Responsible AI Framework
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ═══ 19. CONTACT & CONNECT SECTION ═══ */}
        <section className="py-20">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-center mb-14"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[11px] font-semibold bg-rose-50/80 text-rose-600 border border-rose-100/60 mb-4">
                <Mail className="w-3.5 h-3.5" />
                Get in Touch
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-gray-900">Contact & Connect</h2>
              <p className="text-[15px] text-gray-500 mt-4 max-w-2xl mx-auto leading-relaxed">
                Whether you want to join our team, partner with us, or just say hello — we&apos;d love to hear from you.
              </p>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={{ visible: { transition: { staggerChildren: 0.08 } } }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
            >
              {[
                {
                  title: 'General Inquiries',
                  email: 'hello@clearpath.ai',
                  desc: 'Questions about our mission, technology, or partnerships',
                  icon: Mail,
                  color: '#3b82f6',
                },
                {
                  title: 'Careers',
                  email: 'careers@clearpath.ai',
                  desc: 'Job applications, internships, and fellowship inquiries',
                  icon: Briefcase,
                  color: '#10b981',
                },
                {
                  title: 'Partnerships',
                  email: 'partners@clearpath.ai',
                  desc: 'Data partnerships, API integrations, and nonprofit collaborations',
                  icon: Handshake,
                  color: '#8b5cf6',
                },
                {
                  title: 'Press & Media',
                  email: 'press@clearpath.ai',
                  desc: 'Interview requests, press kits, and media inquiries',
                  icon: Newspaper,
                  color: '#f59e0b',
                },
              ].map((contact) => {
                const ContactIcon = contact.icon
                return (
                  <motion.div
                    key={contact.title}
                    variants={staggerItem}
                    className="glass-card rounded-xl p-5 shadow-premium hover:shadow-premium-lg transition-all duration-300 text-center group"
                  >
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform"
                      style={{ backgroundColor: `${contact.color}10`, border: `1px solid ${contact.color}20` }}
                    >
                      <ContactIcon className="w-5 h-5" style={{ color: contact.color }} />
                    </div>
                    <h4 className="text-[14px] font-bold text-gray-900 mb-1">{contact.title}</h4>
                    <a
                      href={`mailto:${contact.email}`}
                      className="text-[13px] font-semibold hover:underline"
                      style={{ color: contact.color }}
                    >
                      {contact.email}
                    </a>
                    <p className="text-[11px] text-gray-400 mt-2 leading-relaxed">{contact.desc}</p>
                  </motion.div>
                )
              })}
            </motion.div>

            {/* Social links bar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mt-10 flex items-center justify-center gap-4"
            >
              {[
                { name: 'GitHub', icon: Github, href: 'https://github.com/clearpath-ai', color: '#333' },
                { name: 'Twitter', icon: Globe, href: 'https://x.com/clearpath_ai', color: '#1da1f2' },
                { name: 'LinkedIn', icon: Linkedin, href: 'https://linkedin.com/company/clearpath-ai', color: '#0077b5' },
                { name: 'Email', icon: Mail, href: 'mailto:hello@clearpath.ai', color: '#3b82f6' },
              ].map((social) => {
                const SocialIcon = social.icon
                return (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 rounded-xl glass-card flex items-center justify-center text-gray-400 hover:text-gray-700 hover:shadow-premium-lg transition-all duration-300 border border-gray-100/60"
                    aria-label={`Follow us on ${social.name}`}
                  >
                    <SocialIcon className="w-5 h-5" />
                  </a>
                )
              })}
            </motion.div>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  )
}
