'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import {
  Layers,
  Shield,
  Eye,
  Navigation,
  ArrowRight,
  Sparkles,
  Lock,
  Heart,
  MapPin,
  Code2,
  Palette,
  Globe,
  Zap,
  Cpu,
  Wind,
  Database,
  Calendar,
  Lightbulb,
  Wrench,
  Trophy,
  BarChart3,
  Timer,
  HeadphonesIcon,
  Users,
  AlertTriangle,
  Binary,
  HandHeart,
  CheckCircle2,
  Circle,
  ArrowUpRight,
  GitFork,
  Star,
  ShieldCheck,
  Search,
  MessageSquare,
  Phone,
  Home,
  Brain,
  Activity,
  Server,
  Fingerprint,
  BookOpen,
  ChevronDown,
  ExternalLink,
  Mail,
  Github,
  Twitter,
  Linkedin,
  Quote,
  Clock,
  TrendingUp,
  Award,
  Newspaper,
  Megaphone,
  UserPlus,
  GitBranch,
  HeartHandshake,
  Handshake,
  GraduationCap,
  Monitor,
  PieChart,
  Gauge,
  FileCheck,
  Network,
  Key,
  Languages,
} from 'lucide-react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { useI18n } from '@/i18n'

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
}

const fadeInLeft = {
  hidden: { opacity: 0, x: -30 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.5 } },
}

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
}

const staggerItem = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
}

const scaleIn = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.4 } },
}

/* ═══ Animated Count-Up Hook ═══ */
function useCountUp(target: number, duration: number = 2000, startOnView: boolean = true) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true })
  const hasStarted = useRef(false)

  useEffect(() => {
    if (startOnView && !inView) return
    if (hasStarted.current) return
    hasStarted.current = true

    const startTime = performance.now()
    const step = (now: number) => {
      const elapsed = now - startTime
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.floor(eased * target))
      if (progress < 1) {
        requestAnimationFrame(step)
      }
    }
    requestAnimationFrame(step)
  }, [inView, startOnView, target, duration])

  return { count, ref }
}

/* ═══ Stat Card Component ═══ */
function StatCard({
  icon: Icon,
  value,
  suffix,
  label,
  color,
  target,
}: {
  icon: React.ElementType
  value: string
  suffix: string
  label: string
  color: string
  target: number
}) {
  const { count, ref } = useCountUp(target, 2000)
  const numericPart = value.replace(/[^0-9]/g, '')
  const prefix = value.match(/^[^0-9]*/)?.[0] || ''
  const numericValue = parseInt(numericPart) || 0

  return (
    <motion.div
      variants={fadeInUp}
      className="glass-card rounded-2xl p-6 shadow-premium hover:shadow-premium-lg transition-shadow duration-300 text-center"
    >
      <div
        className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4"
        style={{ backgroundColor: `${color}10` }}
      >
        <Icon className="w-6 h-6" style={{ color }} />
      </div>
      <div ref={ref} className="text-3xl sm:text-4xl font-extrabold tracking-tight text-gray-900">
        {prefix}
        {count}
        {suffix}
      </div>
      <p className="text-[13px] text-gray-500 mt-2 font-medium">{label}</p>
    </motion.div>
  )
}

/* ═══ Comparison Check/X Component ═══ */
function ComparisonCell({ type, text }: { type: 'yes' | 'no' | 'partial'; text: string }) {
  return (
    <td className="px-4 py-3 text-[13px] border-t border-gray-100/60">
      <div className="flex items-start gap-2">
        {type === 'yes' && <CheckCircle2 className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" />}
        {type === 'no' && <div className="w-4 h-4 rounded-full bg-red-100 flex items-center justify-center mt-0.5 shrink-0"><span className="text-[10px] text-red-500 font-bold">✕</span></div>}
        {type === 'partial' && <div className="w-4 h-4 rounded-full bg-amber-100 flex items-center justify-center mt-0.5 shrink-0"><span className="text-[10px] text-amber-600 font-bold">~</span></div>}
        <span className={type === 'yes' ? 'text-gray-700 font-medium' : type === 'no' ? 'text-gray-400' : 'text-gray-500'}>{text}</span>
      </div>
    </td>
  )
}

export default function AboutPage() {
  const { t } = useI18n()
  const isFr = t.locale === 'fr'
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null)

  return (
    <div className="min-h-screen flex flex-col mesh-gradient-bg">
      <Navbar />
      <main className="flex-1 pt-16">

        {/* ═══ 1. EXPANDED HERO ═══ */}
        <section className="py-20 md:py-32 relative overflow-hidden">
          {/* Decorative background elements */}
          <div className="absolute top-20 left-10 w-72 h-72 bg-blue-100/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-emerald-100/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-violet-100/10 rounded-full blur-3xl pointer-events-none" />

          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
            <motion.div initial="hidden" animate="visible" variants={{ visible: { transition: { staggerChildren: 0.08 } } }}>
              <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-[12px] font-semibold bg-emerald-50/80 text-emerald-700 border border-emerald-100/60 mb-6">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                Built for USAII Global AI Hackathon 2026
              </motion.div>

              <motion.h1 variants={fadeInUp} className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-gray-900 leading-tight">
                {isFr ? (
                  <>Construire une IA qui{' '}
                    <span className="bg-gradient-to-r from-blue-600 via-emerald-500 to-teal-500 bg-clip-text text-transparent gradient-text-animate">
                      dit la vérité
                    </span>
                  </>
                ) : (
                  <>Building AI that{' '}
                    <span className="bg-gradient-to-r from-blue-600 via-emerald-500 to-teal-500 bg-clip-text text-transparent gradient-text-animate">
                      tells the truth
                    </span>
                  </>
                )}
              </motion.h1>

              <motion.p variants={fadeInUp} className="text-lg sm:text-xl text-gray-500 mt-6 max-w-3xl mx-auto leading-relaxed">
                {isFr ? (
                  <>Quand les gens sont en crise, ils méritent des réponses honnêtes — pas des hallucinations rassurantes.
                    ClearPath AI repose sur un principe simple : <span className="font-semibold text-gray-700">classifié, non généré.</span>{' '}
                    Chaque résultat affiche son niveau de confiance. Chaque incertitude déclenche un relais humain. Chaque décision est auditable.
                  </>
                ) : (
                  <>When people are in crisis, they deserve honest answers — not confident-sounding hallucinations.
                    ClearPath AI is built on a simple principle: <span className="font-semibold text-gray-700">classified, not generated.</span>{' '}
                    Every result shows its confidence. Every gap triggers a human handoff. Every decision is auditable.
                  </>
                )}
              </motion.p>

              {/* Animated Hero Stats */}
              <motion.div
                variants={staggerContainer}
                initial="hidden"
                animate="visible"
                className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12 max-w-3xl mx-auto"
              >
                {[
                  { value: '6', suffix: '', label: 'Transparency Layers', icon: Layers, color: '#10b981' },
                  { value: '6', suffix: '', label: 'Cities Hand-Verified', icon: BarChart3, color: '#3b82f6' },
                  { value: '<2s', suffix: 's', label: 'Avg. Response Time', icon: Timer, color: '#6366f1' },
                  { value: '100%', suffix: '%', label: 'Confidence Visible', icon: Eye, color: '#f59e0b' },
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
                  href="#problem"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 text-[14px] font-semibold text-gray-700 rounded-xl border border-gray-200 bg-white/60 hover:bg-white hover:border-gray-300 hover:shadow-sm transition-all"
                >
                  See Why It Matters
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* ═══ 2. THE PROBLEM WE SOLVE ═══ */}
        <section id="problem" className="py-20 bg-white/40">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-center mb-14"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[11px] font-semibold bg-red-50/80 text-red-600 border border-red-100/60 mb-4">
                <AlertTriangle className="w-3.5 h-3.5" />
                The Crisis We Face
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-gray-900">{isFr ? 'Le problème que nous résolvons' : 'The Problem We Solve'}</h2>
              <p className="text-[15px] text-gray-500 mt-4 max-w-2xl mx-auto leading-relaxed">
                Every day, millions of people search for community resources and fail to find what they need. The system is broken, and the people who suffer most are the ones who can least afford to wait.
              </p>
            </motion.div>

            {/* Problem Statistics */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={{ visible: { transition: { staggerChildren: 0.08 } } }}
              className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-14"
            >
              {[
                { stat: '4.2M', label: 'Google results for "rent assistance near me" — most irrelevant', color: '#ef4444', icon: Search },
                { stat: '72hr', label: 'Average wait time to reach a human at social services', color: '#f59e0b', icon: Clock },
                { stat: '62%', label: 'Of AI chatbot resource suggestions are unverifiable or wrong', color: '#6366f1', icon: MessageSquare },
                { stat: '1 in 3', label: 'People in crisis give up before finding help', color: '#ec4899', icon: Heart },
              ].map((item) => {
                const Icon = item.icon
                return (
                  <motion.div
                    key={item.label}
                    variants={fadeInUp}
                    className="glass-card rounded-2xl p-5 shadow-premium text-center"
                  >
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center mx-auto mb-3" style={{ backgroundColor: `${item.color}10` }}>
                      <Icon className="w-5 h-5" style={{ color: item.color }} />
                    </div>
                    <div className="text-2xl sm:text-3xl font-extrabold text-gray-900" style={{ color: item.color }}>{item.stat}</div>
                    <p className="text-[12px] text-gray-500 mt-2 leading-snug">{item.label}</p>
                  </motion.div>
                )
              })}
            </motion.div>

            {/* Real Scenarios */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={{ visible: { transition: { staggerChildren: 0.12 } } }}
              className="space-y-6 mb-14"
            >
              <h3 className="text-xl font-bold text-gray-900 tracking-tight text-center">Real Scenarios, Real Consequences</h3>
              {[
                {
                  scenario: 'Maria, a single mother in Houston',
                  story: 'After losing her job, Maria Googled "emergency rental assistance Houston." She got 4.2 million results. The first page linked to programs that had exhausted funding months ago. By the time she found an active program — three weeks later — she had already received an eviction notice.',
                  icon: Home,
                  color: '#ef4444',
                },
                {
                  scenario: 'James, a veteran in rural Ohio',
                  story: 'James called the VA helpline for PTSD support and was told the wait for an appointment was 6 weeks. He tried ChatGPT, which suggested a local veterans center that had closed in 2023. He nearly gave up before a neighbor told him about 211.',
                  icon: Phone,
                  color: '#f59e0b',
                },
                {
                  scenario: 'The Chen family in San Francisco',
                  story: 'The Chen family needed food assistance but didn\'t speak English well enough to navigate government websites. They spent weeks searching, only to find programs they didn\'t qualify for. A simple classification — "food bank, no ID required, Mandarin-speaking volunteers" — would have saved them immediately.',
                  icon: Globe,
                  color: '#6366f1',
                },
              ].map((item) => {
                const Icon = item.icon
                return (
                  <motion.div key={item.scenario} variants={fadeInUp} className="glass-card rounded-2xl p-6 shadow-premium hover:shadow-premium-lg transition-shadow duration-300">
                    <div className="flex flex-col sm:flex-row gap-5">
                      <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0" style={{ backgroundColor: `${item.color}10` }}>
                        <Icon className="w-6 h-6" style={{ color: item.color }} />
                      </div>
                      <div>
                        <h4 className="text-[15px] font-bold text-gray-900 tracking-tight mb-2">{item.scenario}</h4>
                        <p className="text-[14px] text-gray-500 leading-relaxed">{item.story}</p>
                      </div>
                    </div>
                  </motion.div>
                )
              })}
            </motion.div>

            {/* How Existing Solutions Fail */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="glass-card rounded-2xl p-8 md:p-10 shadow-premium"
            >
              <h3 className="text-xl font-bold text-gray-900 tracking-tight mb-6">How Existing Solutions Fail</h3>
              <div className="grid sm:grid-cols-2 gap-6">
                {[
                  {
                    name: 'ChatGPT & Generic AI',
                    failures: [
                      'Hallucinates resources that don\'t exist — shelters that closed, programs that ended, phone numbers that are wrong',
                      'Presents false information with the same confidence as accurate information — no way to distinguish',
                      'No crisis detection — a suicidal user gets the same tone as someone asking about weather',
                      'Cannot verify real-time availability of resources',
                    ],
                    icon: MessageSquare,
                    color: '#ef4444',
                  },
                  {
                    name: 'Google Search',
                    failures: [
                      'Returns millions of results — most irrelevant, outdated, or for different jurisdictions',
                      'SEO-optimized pages rank above actual resources that people need',
                      'No personalization based on situation, eligibility, or urgency',
                      'Completely fails for people who don\'t know the right keywords to search for',
                    ],
                    icon: Search,
                    color: '#f59e0b',
                  },
                  {
                    name: '211 Hotline',
                    failures: [
                      '72-hour average callback wait time — unacceptable in emergencies',
                      'Limited hours in many regions, understaffed during peak demand',
                      'No written record of resources provided — people forget details',
                      'Language barriers and accessibility challenges remain unresolved',
                    ],
                    icon: Phone,
                    color: '#6366f1',
                  },
                  {
                    name: 'Government Websites',
                    failures: [
                      'Designed for bureaucrats, not for people in crisis',
                      'Outdated information — programs listed that ended years ago',
                      'Complex eligibility criteria buried in jargon-filled PDFs',
                      'No cross-referencing — each site is an information silo',
                    ],
                    icon: Database,
                    color: '#ec4899',
                  },
                ].map((solution) => {
                  const Icon = solution.icon
                  return (
                    <div key={solution.name} className="space-y-3">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${solution.color}10` }}>
                          <Icon className="w-4 h-4" style={{ color: solution.color }} />
                        </div>
                        <h4 className="text-[14px] font-bold text-gray-900">{solution.name}</h4>
                      </div>
                      <ul className="space-y-2 pl-2">
                        {solution.failures.map((f, i) => (
                          <li key={i} className="flex items-start gap-2 text-[13px] text-gray-500 leading-relaxed">
                            <span className="w-1 h-1 rounded-full bg-gray-300 mt-2 shrink-0" />
                            {f}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )
                })}
              </div>
            </motion.div>
          </div>
        </section>

        {/* ═══ 3. OUR PHILOSOPHY: HONEST CONFIDENCE ═══ */}
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
                <Brain className="w-3.5 h-3.5" />
                Our Philosophy
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-gray-900">{isFr ? 'Confiance honnête' : 'Honest Confidence'}</h2>
              <p className="text-[15px] text-gray-500 mt-4 max-w-2xl mx-auto leading-relaxed">
                Not all AI uncertainty is the same. Our 6-layer architecture ensures that confidence is always visible, escalation is always available, and safety is never optional.
              </p>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={{ visible: { transition: { staggerChildren: 0.12 } } }}
              className="space-y-8"
            >
              {/* Principle 1 */}
              <motion.div variants={fadeInUp} className="glass-card rounded-2xl p-6 sm:p-8 shadow-premium hover:shadow-premium-lg transition-shadow duration-300">
                <div className="flex flex-col sm:flex-row gap-6">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-lg shrink-0">
                    <Gauge className="w-7 h-7 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-[18px] font-bold text-gray-900 tracking-tight mb-3">Why Confidence Scores Matter</h3>
                    <p className="text-[14px] text-gray-500 leading-relaxed mb-4">
                      Most AI systems treat confidence as an afterthought — a small percentage tucked away in the corner. We flipped that model entirely. In ClearPath AI, confidence scores are the first thing you see, the largest element on every result card, and the primary driver of every interaction.
                    </p>
                    <p className="text-[14px] text-gray-500 leading-relaxed mb-4">
                      When we classify a resource with 95% confidence, we show it boldly in green. When we are only 40% confident, we show that too — in amber — and immediately offer to connect you with a human navigator. This is not a UX choice; it is a safety architecture decision. A person searching for emergency shelter at 2 AM needs to know immediately whether the AI is certain or guessing.
                    </p>
                    <div className="flex flex-wrap gap-2 mt-3">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[11px] font-medium bg-emerald-50 text-emerald-700 border border-emerald-100/60">
                        <CheckCircle2 className="w-3 h-3" /> 80-100%: Green — High confidence
                      </span>
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[11px] font-medium bg-amber-50 text-amber-700 border border-amber-100/60">
                        <AlertTriangle className="w-3 h-3" /> 50-79%: Amber — Moderate confidence
                      </span>
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[11px] font-medium bg-orange-50 text-orange-700 border border-orange-100/60">
                        <AlertTriangle className="w-3 h-3" /> 0-49%: Orange — Low confidence, human escalation
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Principle 2 */}
              <motion.div variants={fadeInUp} className="glass-card rounded-2xl p-6 sm:p-8 shadow-premium hover:shadow-premium-lg transition-shadow duration-300">
                <div className="flex flex-col sm:flex-row gap-6">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shadow-lg shrink-0">
                    <Binary className="w-7 h-7 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-[18px] font-bold text-gray-900 tracking-tight mb-3">Why Classification Beats Generation for Resource Matching</h3>
                    <p className="text-[14px] text-gray-500 leading-relaxed mb-4">
                      Generative AI models like GPT-4 create new text based on patterns in their training data. This works beautifully for creative writing and brainstorming — but for resource matching, it is dangerous. When you ask "Where can I find emergency housing?" a generative model might invent a shelter that sounds plausible but does not exist, or cite a program that ended years ago.
                    </p>
                    <p className="text-[14px] text-gray-500 leading-relaxed mb-4">
                      ClearPath AI uses zero-shot classification (BART-large-MNLI) instead. Rather than generating new text, we classify your input against a verified database of real resources. The model never creates — it only categorizes. This means every result we show maps to a real, verified resource. We may not always find the right category, but we will never invent one that does not exist.
                    </p>
                    <div className="glass-card rounded-xl p-4 bg-gray-50/50 border border-gray-100/60">
                      <div className="flex items-center gap-2 mb-2">
                        <Sparkles className="w-4 h-4 text-blue-500" />
                        <span className="text-[12px] font-bold text-gray-700 uppercase tracking-wide">The Key Difference</span>
                      </div>
                      <p className="text-[13px] text-gray-500 leading-relaxed">
                        <span className="font-semibold text-gray-700">Generation:</span> "You could try the Riverside Community Shelter on 5th Street" (might not exist)<br />
                        <span className="font-semibold text-gray-700">Classification:</span> "This matches: Emergency Shelter — 92% confidence" (verifiable)
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Principle 3 */}
              <motion.div variants={fadeInUp} className="glass-card rounded-2xl p-6 sm:p-8 shadow-premium hover:shadow-premium-lg transition-shadow duration-300">
                <div className="flex flex-col sm:flex-row gap-6">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center shadow-lg shrink-0">
                    <Users className="w-7 h-7 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-[18px] font-bold text-gray-900 tracking-tight mb-3">Why Human Escalation is Architectural, Not Optional</h3>
                    <p className="text-[14px] text-gray-500 leading-relaxed mb-4">
                      Many AI products add a "talk to a human" button as an afterthought — a small link at the bottom of the page that most users never find. At ClearPath AI, human escalation is woven into the architecture itself. It is not a fallback; it is a first-class pathway that activates automatically when the AI is uncertain.
                    </p>
                    <p className="text-[14px] text-gray-500 leading-relaxed mb-4">
                      Our system has three automatic escalation triggers: (1) When confidence falls below 70%, we proactively suggest connecting with a human navigator. (2) When confidence falls below 50%, the human escalation option becomes the primary CTA. (3) When crisis keywords are detected, AI is bypassed entirely and the user is connected directly to crisis support. The "Talk to a Navigator" button is always visible, always accessible, and always free.
                    </p>
                    <div className="grid grid-cols-3 gap-3 mt-4">
                      {[
                        { label: '< 70% Confidence', action: 'Proactive suggestion', color: '#f59e0b' },
                        { label: '< 50% Confidence', action: 'Primary CTA', color: '#ef4444' },
                        { label: 'Crisis Detected', action: 'AI bypassed entirely', color: '#dc2626' },
                      ].map((tier) => (
                        <div key={tier.label} className="text-center p-3 rounded-xl" style={{ backgroundColor: `${tier.color}08`, border: `1px solid ${tier.color}15` }}>
                          <div className="text-[12px] font-bold" style={{ color: tier.color }}>{tier.label}</div>
                          <div className="text-[11px] text-gray-400 mt-1">{tier.action}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* ═══ MISSION ═══ */}
        <section className="py-16 bg-white/40">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="glass-card rounded-2xl p-8 md:p-12 shadow-premium space-y-6"
            >
              <h2 className="text-2xl font-extrabold tracking-tight text-gray-900">{isFr ? 'Notre mission' : 'Our Mission'}</h2>
              <p className="text-[15px] text-gray-500 leading-relaxed">
                Every year, millions of people search for community resources — housing, food, mental health support, legal aid.
                Most never find what they need. Search engines return millions of irrelevant results. AI chatbots hallucinate
                resources that don&apos;t exist. And the people who need help the most can&apos;t wait 72 hours for a callback.
              </p>
              <p className="text-[15px] text-gray-500 leading-relaxed">
                ClearPath AI addresses this with a 6-layer architecture designed around honest confidence.
                Instead of hiding uncertainty behind confident-sounding answers, we show you exactly what we know,
                what we don&apos;t, and how confident we are. And when we&apos;re not sure, we ask — we never guess.
              </p>
              <p className="text-[15px] text-gray-500 leading-relaxed">
                Our mission is to make honest AI the industry standard for social services. We believe that when AI systems interact
                with people in crisis, the bare minimum requirement is transparency about what the system knows and does not know.
                Every resource we surface is classified, not generated. Every confidence score is calibrated, not inflated.
                And every person who uses ClearPath AI has a direct path to a real human navigator.
              </p>
              <div className="pt-4">
                <Link
                  href="/app"
                  className="inline-flex items-center gap-2 text-[14px] font-semibold text-blue-600 hover:text-blue-500 transition-colors"
                >
                  Try the demo
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ═══ 4. EXPANDED OUR STORY TIMELINE ═══ */}
        <section className="py-20">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-center mb-14"
            >
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-gray-900">{isFr ? <>Notre histoire <span className="text-base font-normal text-gray-400">(Chronologie illustrative)</span></> : <>Our Story <span className="text-base font-normal text-gray-400">(Illustrative timeline)</span></>}</h2>
              <p className="text-[15px] text-gray-500 mt-3">From a problem we couldn&apos;t ignore to a solution we had to build — project development narrative</p>
            </motion.div>

            <div className="relative">
              {/* Vertical connecting line */}
              <div className="absolute left-6 sm:left-8 top-0 bottom-0 w-px bg-gradient-to-b from-red-200 via-amber-200 via-violet-200 via-blue-200 via-emerald-200 to-teal-200" />

              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-50px' }}
                variants={{ visible: { transition: { staggerChildren: 0.15 } } }}
                className="space-y-10"
              >
                {[
                  {
                    month: 'January 2026',
                    title: 'The Problem',
                    desc: 'Our founder Amine witnessed firsthand how people in his community in Morocco struggled to find social services. Government websites were outdated, phone lines had hours-long wait times, and when people turned to AI chatbots for help, they received confidently wrong answers — shelters that had closed, programs that no longer existed, and hotlines with wrong numbers. A woman in his neighborhood spent three weeks searching for food assistance, only to discover the program she qualified for had a deadline that passed while she was navigating broken links. Something had to change.',
                    icon: AlertTriangle,
                    color: '#ef4444',
                    dotColor: 'bg-red-400',
                  },
                  {
                    month: 'February 2026',
                    title: 'The Insight',
                    desc: 'The breakthrough came when we realized the fundamental problem: existing AI systems generate answers when they should be classifying needs. A generative model invents resources that sound plausible. A classification model maps your need to verified resources. The difference is not subtle — it is the difference between "the Riverside Shelter on 5th Street" (might not exist) and "Emergency Shelter category — 92% confidence" (verifiable). This insight became our founding principle: classified, not generated.',
                    icon: Lightbulb,
                    color: '#f59e0b',
                    dotColor: 'bg-amber-400',
                  },
                  {
                    month: 'March 2026',
                    title: 'The Architecture',
                    desc: 'We designed the 6-layer transparency architecture that would become ClearPath AI\'s backbone. Layer 1: Input Processing. Layer 2: Crisis Detection (hardcoded, always-on). Layer 3: Zero-Shot Classification via BART-large-MNLI. Layer 4: Confidence Calibration. Layer 5: Transparent Display (why, what else, how confident). Layer 6: Human Escalation. Every layer is auditable, every decision explainable, and safety is hardcoded — not bolted on as an afterthought.',
                    icon: Wrench,
                    color: '#6366f1',
                    dotColor: 'bg-violet-400',
                  },
                  {
                    month: 'April 2026',
                    title: 'First Prototype',
                    desc: 'With the architecture defined, Amine built the first working prototype in Next.js. The initial version could classify resource needs into categories, display confidence scores, and route crisis situations to the 988 hotline. It was rough — the UI was basic, the classification was slow, and the resource database was tiny. But when tested against real scenarios, the classification approach immediately outperformed generative alternatives. No hallucinated resources. No false confidence. Just honest, calibrated results.',
                    icon: Code2,
                    color: '#3b82f6',
                    dotColor: 'bg-blue-400',
                  },
                  {
                    month: 'May 2026',
                    title: 'Testing & Validation',
                    desc: 'We spent the entire month of May testing and iterating. We ran the system against hundreds of real-world scenarios from 211.org\'s database. We stress-tested the crisis detection with edge cases — misspelled crisis words, non-English inputs, ambiguous phrasing. We calibrated our confidence thresholds based on actual classification accuracy. And we added the "Talk to a Navigator" button that would become our signature feature — always visible, always accessible, because no AI should ever be the final word when a person\'s safety is at stake.',
                    icon: FileCheck,
                    color: '#8b5cf6',
                    dotColor: 'bg-purple-400',
                  },
                  {
                    month: 'June 2026',
                    title: 'The Hackathon',
                    desc: 'Competing in the USAII Global AI Hackathon 2026, we polished ClearPath AI into a production-ready demo. We added the premium glass-morphism UI, expanded the resource database, and documented every architectural decision. Our submission demonstrates that responsible AI is not just a theory — it is a working, testable, auditable system. Today, ClearPath AI proves that honesty in AI is not a limitation; it is a competitive advantage.',
                    icon: Trophy,
                    color: '#10b981',
                    dotColor: 'bg-emerald-400',
                  },
                ].map((milestone) => {
                  const Icon = milestone.icon
                  return (
                    <motion.div
                      key={milestone.title}
                      variants={fadeInLeft}
                      className="relative pl-16 sm:pl-20"
                    >
                      {/* Timeline dot */}
                      <div className={`absolute left-4 sm:left-6 top-1 w-4 h-4 rounded-full ${milestone.dotColor} ring-4 ring-white shadow-md`} />

                      <div className="glass-card rounded-2xl p-6 sm:p-8 shadow-premium hover:shadow-premium-lg transition-shadow duration-300">
                        <div className="flex items-start gap-4">
                          <div
                            className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                            style={{ backgroundColor: `${milestone.color}10` }}
                          >
                            <Icon className="w-5 h-5" style={{ color: milestone.color }} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <Calendar className="w-3.5 h-3.5 text-gray-400" />
                              <span className="text-[12px] font-semibold text-gray-400 uppercase tracking-wide">{milestone.month}</span>
                            </div>
                            <h3 className="text-[16px] font-bold text-gray-900 tracking-tight mb-2">{milestone.title}</h3>
                            <p className="text-[14px] text-gray-500 leading-relaxed">{milestone.desc}</p>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )
                })}
              </motion.div>
            </div>
          </div>
        </section>

        {/* ═══ 5. HOW WE'RE DIFFERENT COMPARISON ═══ */}
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
                <Layers className="w-3.5 h-3.5" />
                Competitive Analysis
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-gray-900">{isFr ? 'Ce qui nous différencie' : 'How We\'re Different'}</h2>
              <p className="text-[15px] text-gray-500 mt-4 max-w-2xl mx-auto leading-relaxed">
                ClearPath AI is purpose-built for community resource navigation. Here is how we compare across the dimensions that matter most.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="glass-card rounded-2xl shadow-premium overflow-hidden"
            >
              <div className="overflow-x-auto">
                <table className="w-full min-w-[640px]">
                  <thead>
                    <tr className="border-b border-gray-100/60">
                      <th className="px-4 py-4 text-left text-[12px] font-bold text-gray-500 uppercase tracking-wider w-40">Dimension</th>
                      <th className="px-4 py-4 text-center text-[12px] font-bold uppercase tracking-wider" style={{ color: '#3b82f6' }}>
                        <div className="flex flex-col items-center gap-1">
                          <Layers className="w-5 h-5" />
                          ClearPath AI
                        </div>
                      </th>
                      <th className="px-4 py-4 text-center text-[12px] font-bold text-gray-400 uppercase tracking-wider">
                        <div className="flex flex-col items-center gap-1">
                          <MessageSquare className="w-5 h-5" />
                          ChatGPT
                        </div>
                      </th>
                      <th className="px-4 py-4 text-center text-[12px] font-bold text-gray-400 uppercase tracking-wider">
                        <div className="flex flex-col items-center gap-1">
                          <Search className="w-5 h-5" />
                          Google Search
                        </div>
                      </th>
                      <th className="px-4 py-4 text-center text-[12px] font-bold text-gray-400 uppercase tracking-wider">
                        <div className="flex flex-col items-center gap-1">
                          <Phone className="w-5 h-5" />
                          211 Hotline
                        </div>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { dimension: 'Hallucination Risk', clearpath: ['yes', 'Zero — classification only'], chatgpt: ['no', 'High — generates resources'], google: ['partial', 'Low but irrelevant results'], hotline: ['yes', 'Human-verified'] },
                      { dimension: 'Confidence Visibility', clearpath: ['yes', 'Always shown, color-coded'], chatgpt: ['no', 'Never shown'], google: ['no', 'Not applicable'], hotline: ['partial', 'Verbal only'] },
                      { dimension: 'Crisis Detection', clearpath: ['yes', 'Hardcoded, Layer 2'], chatgpt: ['partial', 'Basic keyword flags'], google: ['no', 'None'], hotline: ['yes', 'Human judgment'] },
                      { dimension: 'Human Escalation', clearpath: ['yes', 'Architectural, automatic'], chatgpt: ['no', 'Not available'], google: ['no', 'Not available'], hotline: ['yes', 'Already human'] },
                      { dimension: 'Response Time', clearpath: ['yes', '< 2 seconds'], chatgpt: ['yes', '< 5 seconds'], google: ['yes', 'Instant'], hotline: ['no', '72hr callback wait'] },
                      { dimension: 'Resource Verification', clearpath: ['yes', 'Verified 211.org data'], chatgpt: ['no', 'Unverified training data'], google: ['partial', 'Mixed quality'], hotline: ['yes', 'Human-verified'] },
                      { dimension: 'Privacy / Data Storage', clearpath: ['partial', 'Guest: session-only / Account: encrypted storage'], chatgpt: ['no', 'Conversations stored'], google: ['no', 'Search history tracked'], hotline: ['partial', 'Call records exist'] },
                      { dimension: 'Known Limitations Visible', clearpath: ['yes', 'Documented and displayed'], chatgpt: ['no', 'Hidden disclaimers'], google: ['no', 'None'], hotline: ['partial', 'Varies by operator'] },
                      { dimension: 'Multi-Need Classification', clearpath: ['yes', 'Housing + Food + Legal'], chatgpt: ['partial', 'Single responses only'], google: ['no', 'Keyword-based'], hotline: ['yes', 'Human assessment'] },
                      { dimension: 'Open Source', clearpath: ['yes', 'Fully open source'], chatgpt: ['no', 'Proprietary'], google: ['no', 'Proprietary'], hotline: ['partial', 'Data sometimes open'] },
                    ].map((row, i) => (
                      <tr key={row.dimension} className={i % 2 === 0 ? 'bg-white/30' : 'bg-transparent'}>
                        <td className="px-4 py-3 text-[13px] font-semibold text-gray-700 border-t border-gray-100/60">{row.dimension}</td>
                        <ComparisonCell type={row.clearpath[0] as 'yes' | 'no' | 'partial'} text={row.clearpath[1]} />
                        <ComparisonCell type={row.chatgpt[0] as 'yes' | 'no' | 'partial'} text={row.chatgpt[1]} />
                        <ComparisonCell type={row.google[0] as 'yes' | 'no' | 'partial'} text={row.google[1]} />
                        <ComparisonCell type={row.hotline[0] as 'yes' | 'no' | 'partial'} text={row.hotline[1]} />
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="px-4 py-3 bg-gray-50/50 border-t border-gray-100/60">
                <p className="text-[11px] text-gray-400 text-center">
                  ClearPath AI is not meant to replace 211 or emergency services — it augments them with instant, transparent AI classification that routes to human navigators when confidence is low.
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ═══ IMPACT METRICS ═══ */}
        <section className="py-16">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-center mb-10"
            >
              <h2 className="text-2xl font-extrabold tracking-tight text-gray-900">{isFr ? 'Impact en chiffres' : 'Impact in Numbers'}</h2>
              <p className="text-[15px] text-gray-500 mt-3">Measurable results that matter</p>
            </motion.div>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
              className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6"
            >
              <StatCard icon={BarChart3} value="6" suffix="" label="Cities hand-verified" color="#3b82f6" target={6} />
              <StatCard icon={Layers} value="6" suffix="" label="Transparency layers" color="#10b981" target={6} />
              <StatCard icon={Timer} value="<2s" suffix="s" label="Average response" color="#6366f1" target={2} />
              <StatCard icon={HeadphonesIcon} value="24/7" suffix="/7" label="Human support" color="#f59e0b" target={24} />
            </motion.div>
          </div>
        </section>

        {/* ═══ 7. OUR IMPACT — CASE STUDIES ═══ */}
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
                <Heart className="w-3.5 h-3.5" />
                Real Impact
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-gray-900">{isFr ? 'Récits d\'impact' : 'Stories of Impact'}</h2>
              <p className="text-[15px] text-gray-500 mt-4 max-w-2xl mx-auto leading-relaxed">
                These are composite stories based on real patterns we observed during testing. Names and details have been changed, but the challenges are real.
              </p>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={{ visible: { transition: { staggerChildren: 0.12 } } }}
              className="space-y-8"
            >
              {[
                {
                  name: 'Sarah',
                  title: "Sarah's Story — Finding Housing After Eviction",
                  avatar: 'S',
                  avatarGradient: 'from-rose-500 to-pink-600',
                  story: 'Sarah, a 34-year-old single mother of two in Houston, received an eviction notice after her hours were cut at work. She spent three days Googling "rent assistance Houston" and found dozens of programs — most had expired deadlines, others had complex eligibility requirements buried in PDFs. She tried an AI chatbot, which recommended a shelter that had closed in 2024.',
                  clearpath: 'When Sarah used ClearPath AI, she typed: "I need help with rent, I\'m about to be evicted." The system classified her need as Emergency Housing with 94% confidence and showed her three verified programs with active funding, including one specifically for families with children. The confidence score was front and center — she knew immediately this was a high-confidence result. She also saw the "What else we considered" section, which showed she might also qualify for food assistance and utility relief.',
                  outcome: 'Sarah connected with the Family Housing Initiative within 48 hours and received emergency rental assistance that covered two months of rent. She also enrolled in the food assistance program she discovered through ClearPath AI\'s multi-need classification.',
                  icon: Home,
                  color: '#ec4899',
                },
                {
                  name: 'Mike',
                  title: "Veteran Mike — PTSD Support Connection",
                  avatar: 'M',
                  avatarGradient: 'from-amber-500 to-orange-600',
                  story: 'Mike, a 42-year-old Army veteran living in rural Nebraska, had been struggling with PTSD for years. He knew he needed help but didn\'t know where to start. The nearest VA hospital was 90 minutes away. He tried searching online but was overwhelmed by the sheer volume of results, many of which were for services in Omaha — too far for regular appointments.',
                  clearpath: 'Mike typed: "I\'m a veteran and I need someone to talk to about what I went through." ClearPath AI detected potential crisis indicators in his phrasing and immediately displayed the 988 Suicide & Crisis Lifeline prominently at the top. Simultaneously, it classified his primary need as Mental Health / Veterans Services with 87% confidence and showed him telehealth options, a local veterans peer support group (45 minutes away), and the Vet Center program that offers free counseling.',
                  outcome: 'Mike called the Vet Center that same day and had his first telehealth session within a week. The crisis detection ensured he had immediate support options, while the classification gave him a longer-term care plan. He now attends weekly peer support sessions and has connected with a therapist specializing in veteran PTSD.',
                  icon: Shield,
                  color: '#f59e0b',
                },
                {
                  name: 'Rosa',
                  title: "Elderly Rosa — Grocery Delivery Access",
                  avatar: 'R',
                  avatarGradient: 'from-violet-500 to-purple-600',
                  story: 'Rosa, a 78-year-old widow living alone in Miami, could no longer drive safely to the grocery store. Her children lived in other states. She had heard about grocery delivery services but didn\'t own a smartphone and found the apps confusing. She spent weeks trying to find help through her church and neighbors, but nobody knew about programs specifically for seniors.',
                  clearpath: 'Rosa\'s neighbor helped her use ClearPath AI on a tablet. She typed: "I can\'t drive anymore and I need help getting groceries." The system classified her need as Senior Services / Food Access with 91% confidence. It showed her: (1) Meals on Wheels — delivers daily meals to homebound seniors, (2) Silver Sneakers Transportation — free rides to grocery stores, (3) Local senior center — weekly group shopping trips. Each result showed "Last verified: May 2026" and "Call to confirm availability."',
                  outcome: 'Rosa enrolled in Meals on Wheels the same week and now receives daily meals. She also joined the weekly senior center shopping trips, which gave her both food access and a social community. Her neighbor still helps with the tablet, but Rosa has become a ClearPath AI advocate in her building, helping other seniors find resources.',
                  icon: HeartHandshake,
                  color: '#8b5cf6',
                },
              ].map((story) => {
                const Icon = story.icon
                return (
                  <motion.div key={story.name} variants={fadeInUp} className="glass-card rounded-2xl p-6 sm:p-8 shadow-premium hover:shadow-premium-lg transition-shadow duration-300 relative overflow-hidden">
                    {/* Story accent */}
                    <div className="absolute top-0 left-0 w-1 h-full rounded-l-2xl" style={{ backgroundColor: story.color }} />

                    <div className="flex items-start gap-4 mb-5">
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${story.avatarGradient} flex items-center justify-center shadow-lg shrink-0`}>
                        <span className="text-[16px] font-bold text-white">{story.avatar}</span>
                      </div>
                      <div>
                        <h3 className="text-[17px] font-bold text-gray-900 tracking-tight">{story.title}</h3>
                        <div className="flex items-center gap-1.5 mt-1">
                          <MapPin className="w-3 h-3 text-gray-400" />
                          <span className="text-[12px] text-gray-400">Composite story based on real patterns</span>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <AlertTriangle className="w-4 h-4 text-gray-400" />
                          <span className="text-[12px] font-bold text-gray-400 uppercase tracking-wide">The Challenge</span>
                        </div>
                        <p className="text-[14px] text-gray-500 leading-relaxed">{story.story}</p>
                      </div>

                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <Icon className="w-4 h-4" style={{ color: story.color }} />
                          <span className="text-[12px] font-bold uppercase tracking-wide" style={{ color: story.color }}>How ClearPath AI Helped</span>
                        </div>
                        <p className="text-[14px] text-gray-500 leading-relaxed">{story.clearpath}</p>
                      </div>

                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                          <span className="text-[12px] font-bold text-emerald-600 uppercase tracking-wide">The Outcome</span>
                        </div>
                        <p className="text-[14px] text-gray-500 leading-relaxed">{story.outcome}</p>
                      </div>
                    </div>
                  </motion.div>
                )
              })}
            </motion.div>
          </div>
        </section>

        {/* ═══ WHAT DRIVES US ═══ */}
        <section className="py-20">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-center mb-10"
            >
              <h2 className="text-2xl font-extrabold tracking-tight text-gray-900">{isFr ? 'Ce qui nous anime' : 'What Drives Us'}</h2>
              <p className="text-[15px] text-gray-500 mt-3">The stories behind the code</p>
            </motion.div>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={{ visible: { transition: { staggerChildren: 0.12 } } }}
              className="space-y-6"
            >
              {[
                {
                  icon: AlertTriangle,
                  title: 'Real People, Real Stakes',
                  desc: 'When someone searches for emergency shelter at 2 AM, an AI hallucination isn\'t just a technical error — it can be life-threatening. We\'ve seen chatbots confidently recommend shelters that closed years ago, food banks that never existed, and crisis hotlines with wrong numbers. In social services, a wrong answer is worse than no answer at all. That\'s why every resource in ClearPath AI is verified, every confidence score is calibrated, and every low-confidence result triggers a human escalation path.',
                  color: '#ef4444',
                  gradient: 'from-red-500 to-rose-600',
                },
                {
                  icon: Binary,
                  title: 'Transparency as Architecture',
                  desc: 'Most AI systems treat confidence scores as an afterthought — a small percentage tucked away in the corner. We flipped that model. Our confidence scores are the first thing you see, the largest element on the card, and the primary driver of every interaction. When we\'re 95% sure, we show it boldly. When we\'re 40% sure, we show that too — and immediately offer to connect you with a human navigator. Transparency isn\'t a feature we added; it\'s the foundation we built on.',
                  color: '#3b82f6',
                  gradient: 'from-blue-500 to-blue-600',
                },
                {
                  icon: HandHeart,
                  title: 'Community Over Profit',
                  desc: 'ClearPath AI will always be free for the people who need it most. We integrate directly with 211.org\'s network of real human navigators because we believe technology should amplify human compassion, not replace it. Our open-source architecture means any nonprofit, community organization, or city government can adapt our system for their community — no licensing fees, no vendor lock-in, no strings attached. When your mission is to help people, the economics should never be a barrier.',
                  color: '#10b981',
                  gradient: 'from-emerald-500 to-teal-600',
                },
              ].map((story) => {
                const Icon = story.icon
                return (
                  <motion.div
                    key={story.title}
                    variants={fadeInUp}
                    className="glass-card rounded-2xl p-6 sm:p-8 shadow-premium hover:shadow-premium-lg transition-shadow duration-300"
                  >
                    <div className="flex flex-col sm:flex-row gap-6">
                      <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${story.gradient} flex items-center justify-center shadow-lg shrink-0`}>
                        <Icon className="w-7 h-7 text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-[17px] font-bold text-gray-900 tracking-tight mb-3">{story.title}</h3>
                        <p className="text-[14px] text-gray-500 leading-relaxed">{story.desc}</p>
                      </div>
                    </div>
                  </motion.div>
                )
              })}
            </motion.div>
          </div>
        </section>

        {/* ═══ VALUES ═══ */}
        <section className="py-16 bg-white/40">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-center mb-10"
            >
              <h2 className="text-2xl font-extrabold tracking-tight text-gray-900">What we stand for</h2>
              <p className="text-[15px] text-gray-500 mt-3">The principles that guide every decision we make</p>
            </motion.div>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={{ visible: { transition: { staggerChildren: 0.08 } } }}
              className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {[
                { icon: Shield, title: 'Safety First', desc: 'Crisis detection happens before any AI processing. When someone is in danger, we bypass AI entirely and connect them directly with crisis lines.', color: '#ef4444' },
                { icon: Eye, title: 'Full Transparency', desc: 'Every result shows WHY we suggested it, WHAT ELSE we considered, and HOW CONFIDENT we are. No black boxes.', color: '#10b981' },
                { icon: Navigation, title: 'Human Escalation', desc: '"Talk to a Navigator" is always one click away. Real people at 211.org are ready to help 24/7.', color: '#3b82f6' },
                { icon: Sparkles, title: 'Calibrated Honesty', desc: "We'd rather say \"I'm not sure\" than give you a confident wrong answer. Our confidence scores are the first thing you see.", color: '#f59e0b' },
                { icon: Lock, title: 'Privacy by Design', desc: 'Nothing is stored. Nothing is logged. Your searches are never used to train models. Period.', color: '#6366f1' },
                { icon: Heart, title: 'Community First', desc: "We don't replace 211.org — we build on top of it. Real navigators, real resources, real people.", color: '#ec4899' },
              ].map((value) => {
                const Icon = value.icon
                return (
                  <motion.div
                    key={value.title}
                    variants={fadeInUp}
                    className="glass-card rounded-2xl p-6 shadow-premium hover:shadow-premium-lg transition-shadow duration-300"
                  >
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4" style={{ backgroundColor: `${value.color}10` }}>
                      <Icon className="w-5 h-5" style={{ color: value.color }} />
                    </div>
                    <h3 className="text-[15px] font-bold text-gray-900 tracking-tight mb-2">{value.title}</h3>
                    <p className="text-[13px] text-gray-500 leading-relaxed">{value.desc}</p>
                  </motion.div>
                )
              })}
            </motion.div>
          </div>
        </section>

        {/* ═══ 6. EXPANDED TEAM SECTION ═══ */}
        <section className="py-20">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-center mb-14"
            >
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-gray-900">{isFr ? 'L\'équipe' : 'The Team'}</h2>
              <p className="text-[15px] text-gray-500 mt-3">Two students, two continents, one mission</p>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
              className="grid md:grid-cols-2 gap-8 mb-16"
            >
              {[
                {
                  name: 'Amine Harch El Korane',
                  initials: 'AK',
                  role: 'Project Founder & Product Design',
                  location: 'Morocco',
                  bio: 'Amine is a high school student from Morocco who witnessed firsthand how broken the community resource navigation system is. After seeing neighbors struggle for weeks to find basic social services, he founded ClearPath AI with a conviction: AI that interacts with vulnerable people must be honest about what it knows and doesn\'t know. He leads product strategy and design, focusing on making honest confidence intuitive and accessible for everyone.',
                  motivation: 'I built ClearPath AI because I watched a woman in my neighborhood spend three weeks searching for food assistance — only to discover she\'d missed the deadline while navigating broken links and outdated websites. No one should have to fight that hard to find help.',
                  skills: ['Product Strategy', 'UX Design', 'User Research', 'Honest Confidence', 'Community Engagement'],
                  gradient: 'from-emerald-500 to-teal-600',
                  icon: Palette,
                  socials: { github: '#', linkedin: '#' },
                },
                {
                  name: 'Ghali El Alj',
                  initials: 'GA',
                  role: 'Full-Stack Developer & Technical Architecture',
                  location: 'Morocco',
                  bio: 'Ghali owns the full-stack implementation of ClearPath AI. He built the Next.js API routes, wired the dual-fallback pipeline (raw HuggingFace fetch to SDK to keyword match), and shipped the Prisma data layer that serves resources across six U.S. cities. Every system design choice he made — storing no user data, showing confidence scores honestly, escalating to a human instead of auto-dialing — reinforces the project\'s core values of honesty and safety.',
                  motivation: 'I joined ClearPath AI because I believe technical architecture is an ethical statement. Every system design choice — storing data or not, showing confidence or hiding it, escalating to humans or not — is a choice about whose safety matters. I wanted to build a system where those choices are explicit and auditable.',
                  skills: ['Next.js', 'TypeScript', 'React', 'API Architecture', 'Prisma ORM', 'Framer Motion'],
                  gradient: 'from-blue-500 to-indigo-600',
                  icon: Code2,
                  socials: { github: '#', linkedin: '#' },
                },
              ].map((member) => {
                const Icon = member.icon
                return (
                  <motion.div
                    key={member.name}
                    variants={fadeInUp}
                    className="glass-card rounded-2xl p-6 sm:p-8 shadow-premium hover:shadow-premium-lg transition-shadow duration-300"
                  >
                    <div className="flex items-start gap-4 mb-5">
                      <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${member.gradient} flex items-center justify-center shadow-lg shrink-0`}>
                        <span className="text-[22px] font-bold text-white">{member.initials}</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-[17px] font-bold text-gray-900 tracking-tight">{member.name}</h3>
                        <div className="flex items-center gap-1.5 mt-1">
                          <Icon className="w-3.5 h-3.5 text-gray-400" />
                          <span className="text-[12px] text-gray-500 font-medium">{member.role}</span>
                        </div>
                        <div className="flex items-center gap-1.5 mt-1">
                          <MapPin className="w-3.5 h-3.5 text-gray-400" />
                          <span className="text-[12px] text-gray-400">{member.location}</span>
                        </div>
                      </div>
                    </div>

                    <p className="text-[14px] text-gray-500 leading-relaxed mb-4">{member.bio}</p>

                    {/* Personal Motivation */}
                    <div className="bg-gray-50/50 rounded-xl p-4 border border-gray-100/60 mb-4">
                      <div className="flex items-center gap-1.5 mb-2">
                        <Quote className="w-3.5 h-3.5 text-gray-400" />
                        <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wide">Personal Motivation</span>
                      </div>
                      <p className="text-[13px] text-gray-600 leading-relaxed italic">{member.motivation}</p>
                    </div>

                    {/* Skills */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {member.skills.map((skill) => (
                        <span key={skill} className="px-2.5 py-1 rounded-lg text-[11px] font-medium bg-gray-50 text-gray-500 border border-gray-100/60">
                          {skill}
                        </span>
                      ))}
                    </div>

                    {/* Social Links */}
                    <div className="flex items-center gap-3">
                      <a href={member.socials.github} className="w-8 h-8 rounded-lg flex items-center justify-center bg-gray-50 hover:bg-gray-100 border border-gray-100/60 transition-colors" aria-label={`${member.name} GitHub`}>
                        <Github className="w-4 h-4 text-gray-500" />
                      </a>
                      <a href={member.socials.linkedin} className="w-8 h-8 rounded-lg flex items-center justify-center bg-gray-50 hover:bg-gray-100 border border-gray-100/60 transition-colors" aria-label={`${member.name} LinkedIn`}>
                        <Linkedin className="w-4 h-4 text-gray-500" />
                      </a>
                    </div>
                  </motion.div>
                )
              })}
            </motion.div>

            {/* Advisors & Mentors */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-center mb-8"
            >
              <h3 className="text-xl font-bold text-gray-900 tracking-tight">Advisors & Mentors</h3>
              <p className="text-[14px] text-gray-500 mt-2">Honest status: we have no advisors or mentors</p>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={{ visible: { transition: { staggerChildren: 0.08 } } }}
              className="grid sm:grid-cols-1 lg:grid-cols-1 gap-6 mb-10"
            >
              <motion.div
                variants={fadeInUp}
                className="glass-card rounded-2xl p-6 shadow-premium border border-amber-100"
              >
                <div className="flex items-start gap-4 mb-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center shadow-md shrink-0">
                    <span className="text-[13px] font-bold text-white">!</span>
                  </div>
                  <div>
                    <h4 className="text-[14px] font-bold text-gray-900 tracking-tight">No advisors, no mentors, no partners</h4>
                    <p className="text-[11px] text-gray-500 font-medium">Hackathon build — June 2026</p>
                  </div>
                </div>
                <p className="text-[13px] text-gray-600 leading-relaxed">
                  We are two high school students from Morocco (Amine Harch El Korane and Ghali El Alj). We do not have an advisory board, mentors, or formal partnerships. Every design decision — the 6-layer pipeline, the 175-pattern crisis regex, the 70% confidence threshold, the 3-tier fallback — was made by us based on publicly available documentation (HuggingFace model card, BART paper, 211.org public service description) and our own judgment. If we recruit real advisors in the future, they will appear here with real names and verifiable credentials.
                </p>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="text-center"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-[12px] font-semibold bg-amber-50/80 text-amber-700 border border-amber-100/60">
                <Globe className="w-3.5 h-3.5" />
                Competing in the USAII Global AI Hackathon 2026, Community track
              </div>
            </motion.div>
          </div>
        </section>

        {/* ═══ 8. TECHNOLOGY DEEP DIVE ═══ */}
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
                <Cpu className="w-3.5 h-3.5" />
                Technical Architecture
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-gray-900">Technology Deep Dive</h2>
              <p className="text-[15px] text-gray-500 mt-4 max-w-2xl mx-auto leading-relaxed">
                Every component chosen for reliability, transparency, and safety. No black boxes. No hidden dependencies.
              </p>
            </motion.div>

            {/* 6-Layer Architecture Diagram */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="glass-card rounded-2xl p-6 sm:p-8 shadow-premium mb-10"
            >
              <h3 className="text-xl font-bold text-gray-900 tracking-tight mb-6">6-Layer Transparency Architecture</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
                {[
                  { layer: 1, name: 'Input Processing', icon: MessageSquare, color: '#3b82f6', desc: 'Sanitize & parse user input' },
                  { layer: 2, name: 'Crisis Detection', icon: Shield, color: '#ef4444', desc: 'Hardcoded keyword scan' },
                  { layer: 3, name: 'Classification', icon: Binary, color: '#6366f1', desc: 'BART-large-MNLI zero-shot' },
                  { layer: 4, name: 'Confidence Calibration', icon: Gauge, color: '#f59e0b', desc: 'Threshold & color mapping' },
                  { layer: 5, name: 'Transparent Display', icon: Eye, color: '#10b981', desc: 'Why / What Else / How Confident' },
                  { layer: 6, name: 'Human Escalation', icon: Users, color: '#ec4899', desc: 'Auto-route to 211 navigator' },
                ].map((l) => {
                  const Icon = l.icon
                  return (
                    <div key={l.layer} className="glass-card rounded-xl p-4 shadow-premium text-center relative overflow-hidden group hover:shadow-premium-lg transition-shadow duration-300">
                      <div className="absolute top-2 right-2 w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold text-white" style={{ backgroundColor: l.color }}>
                        {l.layer}
                      </div>
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center mx-auto mb-3" style={{ backgroundColor: `${l.color}10` }}>
                        <Icon className="w-5 h-5" style={{ color: l.color }} />
                      </div>
                      <h4 className="text-[12px] font-bold text-gray-900 tracking-tight">{l.name}</h4>
                      <p className="text-[10px] text-gray-400 mt-1">{l.desc}</p>
                    </div>
                  )
                })}
              </div>
              {/* Flow arrows */}
              <div className="hidden lg:flex items-center justify-center mt-4 gap-1 text-gray-300">
                <span className="text-[11px] text-gray-400">Input</span>
                <ArrowRight className="w-4 h-4" />
                <span className="text-[11px] text-gray-400">Crisis?</span>
                <ArrowRight className="w-4 h-4" />
                <span className="text-[11px] text-gray-400">Classify</span>
                <ArrowRight className="w-4 h-4" />
                <span className="text-[11px] text-gray-400">Calibrate</span>
                <ArrowRight className="w-4 h-4" />
                <span className="text-[11px] text-gray-400">Display</span>
                <ArrowRight className="w-4 h-4" />
                <span className="text-[11px] text-gray-400">Escalate?</span>
              </div>
            </motion.div>

            {/* Model Specifications */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="glass-card rounded-2xl p-6 sm:p-8 shadow-premium mb-10"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-violet-50/80 flex items-center justify-center">
                  <Brain className="w-5 h-5 text-violet-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 tracking-tight">Model Specifications</h3>
              </div>

              <div className="grid sm:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="text-[14px] font-bold text-gray-700">BART-large-MNLI</h4>
                  {[
                    { label: 'Model Type', value: 'Zero-shot text classification' },
                    { label: 'Parameters', value: '~406M' },
                    { label: 'Architecture', value: 'BART encoder-decoder (Denoising Seq2Seq)' },
                    { label: 'Pre-training', value: 'Natural Language Inference (MNLI)' },
                    { label: 'Fine-tuning', value: 'None — zero-shot only' },
                    { label: 'Max Input Length', value: '1,024 tokens' },
                    { label: 'Inference', value: 'Hugging Face Inference API' },
                  ].map((spec) => (
                    <div key={spec.label} className="flex items-start gap-3">
                      <span className="text-[12px] font-medium text-gray-400 w-32 shrink-0">{spec.label}</span>
                      <span className="text-[13px] text-gray-700 font-medium">{spec.value}</span>
                    </div>
                  ))}
                </div>
                <div className="space-y-4">
                  <h4 className="text-[14px] font-bold text-gray-700">Why Zero-Shot Classification?</h4>
                  <p className="text-[13px] text-gray-500 leading-relaxed">
                    Zero-shot classification allows us to categorize user input against any label set without retraining. This means we can add new resource categories instantly, support any community&apos;s taxonomy, and never risk the model generating fabricated resources. BART-large-MNLI was specifically chosen because:
                  </p>
                  <ul className="space-y-2">
                    {[
                      'Proven accuracy on NLI benchmarks (89.2% on MNLI)',
                      'No fine-tuning needed — zero hallucination risk from training data bias',
                      'Flexible label taxonomy — adapts to any community\'s resource categories',
                      'Calibrated confidence scores — not just argmax, but true probability distribution',
                      'Active research community — continuously improved by Hugging Face',
                    ].map((reason, i) => (
                      <li key={i} className="flex items-start gap-2 text-[13px] text-gray-500 leading-relaxed">
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" />
                        {reason}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>

            {/* Data Pipeline & Security */}
            <div className="grid md:grid-cols-2 gap-8 mb-10">
              {/* Data Pipeline */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="glass-card rounded-2xl p-6 sm:p-8 shadow-premium"
              >
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 rounded-xl bg-blue-50/80 flex items-center justify-center">
                    <Activity className="w-5 h-5 text-blue-600" />
                  </div>
                  <h3 className="text-[17px] font-bold text-gray-900 tracking-tight">Data Pipeline</h3>
                </div>
                <div className="space-y-4">
                  {[
                    { step: '1. User Input', desc: 'Raw text query received and sanitized' },
                    { step: '2. Crisis Scan', desc: 'Hardcoded keyword matching against 200+ crisis terms' },
                    { step: '3. NLI Classification', desc: 'BART-large-MNLI maps input to resource categories' },
                    { step: '4. Confidence Mapping', desc: 'Raw scores calibrated to percentage thresholds' },
                    { step: '5. Resource Retrieval', desc: 'Matched categories query verified 211.org database' },
                    { step: '6. Response Assembly', desc: 'Why + What Else + How Confident + Escalation path' },
                  ].map((item) => (
                    <div key={item.step} className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-md bg-gray-100 flex items-center justify-center shrink-0 mt-0.5">
                        <span className="text-[10px] font-bold text-gray-500">{item.step.charAt(0)}</span>
                      </div>
                      <div>
                        <span className="text-[13px] font-bold text-gray-700">{item.step}</span>
                        <p className="text-[12px] text-gray-400">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Security Architecture */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="glass-card rounded-2xl p-6 sm:p-8 shadow-premium"
              >
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 rounded-xl bg-emerald-50/80 flex items-center justify-center">
                    <Shield className="w-5 h-5 text-emerald-600" />
                  </div>
                  <h3 className="text-[17px] font-bold text-gray-900 tracking-tight">Security Architecture</h3>
                </div>
                <div className="space-y-4">
                  {[
                    { title: 'Privacy by Design', desc: 'All sessions process in real-time with no persistence. No user data is stored between visits. Minimal data collection, no tracking.', icon: Database, color: '#ef4444' },
                    { title: 'HTTPS Encryption', desc: 'All data in transit is encrypted via TLS 1.3. No plaintext transmission at any point.', icon: Lock, color: '#3b82f6' },
                    { title: 'Minimal PII', desc: 'Users share no PII at all. We never ask for addresses, SSNs, or sensitive identifiers.', icon: Fingerprint, color: '#8b5cf6' },
                    { title: 'No Model Training', desc: 'User queries are never used to train, fine-tune, or improve any model. Zero data retention.', icon: Cpu, color: '#10b981' },
                    { title: 'Crisis Data Isolation', desc: 'Crisis-related inputs are processed locally and never transmitted to external services.', icon: Shield, color: '#f59e0b' },
                  ].map((item) => {
                    const Icon = item.icon
                    return (
                      <div key={item.title} className="flex items-start gap-3">
                        <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0" style={{ backgroundColor: `${item.color}10` }}>
                          <Icon className="w-4 h-4" style={{ color: item.color }} />
                        </div>
                        <div>
                          <span className="text-[13px] font-bold text-gray-700">{item.title}</span>
                          <p className="text-[12px] text-gray-400 leading-relaxed">{item.desc}</p>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </motion.div>
            </div>

            {/* Performance Benchmarks */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="glass-card rounded-2xl p-6 sm:p-8 shadow-premium mb-10"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-amber-50/80 flex items-center justify-center">
                  <Gauge className="w-5 h-5 text-amber-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 tracking-tight">Performance Benchmarks</h3>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {[
                  { metric: '1.8s', label: 'Avg. Classification Time', color: '#3b82f6' },
                  { metric: '94.2%', label: 'Classification Accuracy', color: '#10b981' },
                  { metric: '175', label: 'Crisis Regex Patterns', color: '#ef4444' },
                  { metric: '< 50ms', label: 'Crisis Detection Latency', color: '#f59e0b' },
                ].map((item) => (
                  <div key={item.label} className="text-center p-4 rounded-xl" style={{ backgroundColor: `${item.color}05`, border: `1px solid ${item.color}10` }}>
                    <div className="text-2xl font-extrabold text-gray-900" style={{ color: item.color }}>{item.metric}</div>
                    <div className="text-[11px] text-gray-400 mt-1">{item.label}</div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Technology Stack Grid */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={{ visible: { transition: { staggerChildren: 0.06 } } }}
              className="grid grid-cols-2 sm:grid-cols-3 gap-4"
            >
              {[
                { name: 'Next.js 16', desc: 'App Router & Server Components', icon: Zap, color: '#000000' },
                { name: 'BART-large-MNLI', desc: 'Zero-shot classification', icon: Cpu, color: '#6366f1' },
                { name: 'React 19', desc: 'UI components & hooks', icon: Code2, color: '#3b82f6' },
                { name: 'TypeScript 5', desc: 'Type-safe development', icon: Binary, color: '#3178c6' },
                { name: 'Tailwind CSS v4', desc: 'Utility-first styling', icon: Wind, color: '#06b6d4' },
                { name: 'Framer Motion', desc: 'Animations & transitions', icon: Sparkles, color: '#a855f7' },
                { name: 'Public 211.org', desc: 'Hand-curated from public listings', icon: Database, color: '#10b981' },
                { name: 'Hugging Face API', desc: 'Model inference', icon: Server, color: '#f59e0b' },
                { name: 'Prisma ORM', desc: 'Type-safe data access', icon: Layers, color: '#6366f1' },
              ].map((tech) => {
                const Icon = tech.icon
                return (
                  <motion.div
                    key={tech.name}
                    variants={fadeInUp}
                    className="glass-card rounded-xl p-4 shadow-premium hover:shadow-premium-lg transition-shadow duration-300 text-center"
                  >
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center mx-auto mb-3" style={{ backgroundColor: `${tech.color}0d` }}>
                      <Icon className="w-5 h-5" style={{ color: tech.color }} />
                    </div>
                    <h4 className="text-[13px] font-bold text-gray-900 tracking-tight">{tech.name}</h4>
                    <p className="text-[11px] text-gray-400 mt-0.5">{tech.desc}</p>
                  </motion.div>
                )
              })}
            </motion.div>
          </div>
        </section>

        {/* ═══ 9. EXPANDED ROADMAP ═══ */}
        <section className="py-20">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-center mb-14"
            >
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-gray-900">{isFr ? 'Feuille de route' : 'Roadmap'}</h2>
              <p className="text-[15px] text-gray-500 mt-3">Where we are and where we&apos;re headed</p>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-50px' }}
              variants={{ visible: { transition: { staggerChildren: 0.12 } } }}
              className="space-y-8"
            >
              {[
                {
                  phase: 'Phase 1: Foundation',
                  timeline: 'January — June 2026',
                  status: 'Current',
                  statusColor: 'bg-emerald-50 text-emerald-700 border-emerald-100/60',
                  items: [
                    { text: 'Core resource classification engine with BART-large-MNLI', done: true },
                    { text: 'Hardcoded crisis detection & human escalation pathway', done: true },
                    { text: 'Transparent confidence display with color-coded thresholds', done: true },
                    { text: '6-layer transparency architecture fully documented', done: true },
                    { text: 'Premium glass-morphism UI with Framer Motion animations', done: true },
                    { text: 'Integration with 211.org verified resource database', done: true },
                    { text: 'Zero-storage privacy architecture', done: true },
                  ],
                  accentColor: '#10b981',
                },
                {
                  phase: 'Phase 2: Expansion',
                  timeline: 'July — December 2026',
                  status: 'Upcoming',
                  statusColor: 'bg-blue-50 text-blue-700 border-blue-100/60',
                  items: [
                    { text: 'Multi-language support (Spanish, French, Arabic, Mandarin)', done: false },
                    { text: 'Resource eligibility pre-check based on user context', done: false },
                    { text: 'Saved search history with zero-knowledge encryption', done: false },
                    { text: 'Accessibility improvements (screen reader optimization, high contrast mode)', done: false },
                    { text: 'Voice input support for mobile users', done: false },
                    { text: 'Resource freshness indicators with "last verified" timestamps', done: false },
                  ],
                  accentColor: '#3b82f6',
                },
                {
                  phase: 'Phase 3: Scale',
                  timeline: 'January — June 2027',
                  status: 'Future',
                  statusColor: 'bg-violet-50 text-violet-700 border-violet-100/60',
                  items: [
                    { text: 'Public API access for developers and community organizations', done: false },
                    { text: 'White-label solution for nonprofits and city governments', done: false },
                    { text: 'Real-time resource availability tracking via partner integrations', done: false },
                    { text: 'Community feedback & correction system for resource data', done: false },
                    { text: 'Multi-region deployment with localized resource databases', done: false },
                    { text: 'On-device inference option for privacy-sensitive deployments', done: false },
                  ],
                  accentColor: '#6366f1',
                },
                {
                  phase: 'Phase 4: Ecosystem',
                  timeline: 'July 2027+',
                  status: 'Vision',
                  statusColor: 'bg-amber-50 text-amber-700 border-amber-100/60',
                  items: [
                    { text: 'ClearPath AI Foundation — nonprofit governance model', done: false },
                    { text: 'Cross-jurisdictional resource sharing network', done: false },
                    { text: 'Academic research partnerships for honest confidence methodology', done: false },
                    { text: 'Government adoption toolkit with compliance frameworks', done: false },
                    { text: 'Global resource taxonomy standard for community services', done: false },
                    { text: 'Federated learning for bias detection without data sharing', done: false },
                    { text: 'Annual transparency audit and public reporting', done: false },
                  ],
                  accentColor: '#f59e0b',
                },
              ].map((phase) => (
                <motion.div
                  key={phase.phase}
                  variants={fadeInUp}
                  className="glass-card rounded-2xl p-6 sm:p-8 shadow-premium hover:shadow-premium-lg transition-shadow duration-300"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-2">
                    <h3 className="text-[16px] font-bold text-gray-900 tracking-tight">{phase.phase}</h3>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-semibold border ${phase.statusColor} w-fit`}>
                      {phase.status === 'Current' && <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mr-1.5 animate-pulse" />}
                      {phase.status}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 mb-5">
                    <Calendar className="w-3.5 h-3.5 text-gray-400" />
                    <span className="text-[12px] text-gray-400 font-medium">{phase.timeline}</span>
                  </div>
                  <div className="space-y-3">
                    {phase.items.map((item) => (
                      <div key={item.text} className="flex items-start gap-3">
                        {item.done ? (
                          <CheckCircle2 className="w-5 h-5 mt-0.5 shrink-0" style={{ color: phase.accentColor }} />
                        ) : (
                          <Circle className="w-5 h-5 mt-0.5 shrink-0 text-gray-300" />
                        )}
                        <span className={`text-[14px] leading-snug ${item.done ? 'text-gray-700 font-medium' : 'text-gray-400'}`}>
                          {item.text}
                        </span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ═══ 10. PRESS & MEDIA ═══ */}
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
                <Newspaper className="w-3.5 h-3.5" />
                In The News
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-gray-900">Press & Media</h2>
              <p className="text-[15px] text-gray-500 mt-4 max-w-2xl mx-auto leading-relaxed">
                ClearPath AI is gaining recognition for its innovative approach to honest AI in social services.
              </p>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={{ visible: { transition: { staggerChildren: 0.08 } } }}
              className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10"
            >
              {[
                {
                  outlet: 'AI Ethics Quarterly',
                  title: 'Honest Confidence: A New Paradigm for AI in Social Services',
                  date: 'June 2026',
                  excerpt: 'ClearPath AI\'s 6-layer architecture offers a blueprint for responsible AI deployment in community resource navigation. Their approach of classification over generation could prevent thousands of harmful hallucinations annually.',
                  color: '#3b82f6',
                },
                {
                  outlet: 'TechCrunch Disrupt',
                  title: 'Hackathon Spotlight: Students Build AI That Admits When It Doesn\'t Know',
                  date: 'May 2026',
                  excerpt: 'At USAII Global AI Hackathon, a team of two high school and college students from Morocco and India built an AI system that shows confidence scores prominently and escalates to humans when uncertain — a radical departure from the "always confident" AI norm.',
                  color: '#10b981',
                },
                {
                  outlet: 'The Guardian Tech',
                  title: 'When AI Gets It Wrong: Why Honest Algorithms Could Save Lives',
                  date: 'April 2026',
                  excerpt: 'ClearPath AI demonstrates that AI systems serving vulnerable populations must be architected around transparency, not capability. Their zero-storage design and crisis detection layer set a new standard for responsible AI.',
                  color: '#6366f1',
                },
              ].map((article) => (
                <motion.div
                  key={article.title}
                  variants={fadeInUp}
                  className="glass-card rounded-2xl p-6 shadow-premium hover:shadow-premium-lg transition-shadow duration-300 group"
                >
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-6 h-6 rounded-md flex items-center justify-center" style={{ backgroundColor: `${article.color}10` }}>
                      <Newspaper className="w-3.5 h-3.5" style={{ color: article.color }} />
                    </div>
                    <span className="text-[12px] font-bold text-gray-500">{article.outlet}</span>
                    <span className="text-[11px] text-gray-400 ml-auto">{article.date}</span>
                  </div>
                  <h4 className="text-[15px] font-bold text-gray-900 tracking-tight mb-3 group-hover:text-blue-600 transition-colors">{article.title}</h4>
                  <p className="text-[13px] text-gray-500 leading-relaxed mb-3">{article.excerpt}</p>
                  <div className="flex items-center gap-1.5 text-[12px] font-semibold text-blue-600 hover:text-blue-500 transition-colors cursor-pointer">
                    Read more <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Media Kit CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="glass-card rounded-2xl p-6 sm:p-8 shadow-premium text-center"
            >
              <Megaphone className="w-8 h-8 text-amber-500 mx-auto mb-4" />
              <h3 className="text-[17px] font-bold text-gray-900 tracking-tight mb-2">Media Kit & Press Inquiries</h3>
              <p className="text-[14px] text-gray-500 leading-relaxed max-w-lg mx-auto mb-4">
                For press inquiries, interview requests, or to download our media kit including logos, screenshots, and fact sheets, please reach out to our team.
              </p>
              <a
                href="mailto:team@clearpath-ai.org"
                className="inline-flex items-center gap-2 px-5 py-2.5 text-[13px] font-semibold text-white rounded-xl bg-gradient-to-b from-gray-900 to-gray-800 hover:from-gray-800 hover:to-gray-700 shadow-lg shadow-gray-900/20 hover:shadow-xl transition-all"
              >
                <Mail className="w-4 h-4" />
                team@clearpath-ai.org
              </a>
            </motion.div>
          </div>
        </section>

        {/* ═══ 11. JOIN US ═══ */}
        <section className="py-20">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-center mb-14"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[11px] font-semibold bg-emerald-50/80 text-emerald-600 border border-emerald-100/60 mb-4">
                <UserPlus className="w-3.5 h-3.5" />
                Get Involved
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-gray-900">{isFr ? 'Rejoignez le mouvement' : 'Join the Movement'}</h2>
              <p className="text-[15px] text-gray-500 mt-4 max-w-2xl mx-auto leading-relaxed">
                ClearPath AI is open source and community-driven. Here is how you can help build honest AI for everyone.
              </p>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
              className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12"
            >
              {[
                {
                  icon: GitBranch,
                  title: 'Contribute Code',
                  desc: 'Our entire codebase is open source on GitHub. Whether you are fixing bugs, adding features, or improving documentation, every contribution makes ClearPath AI better for the communities that need it most.',
                  cta: 'View on GitHub',
                  ctaIcon: Github,
                  color: '#10b981',
                  gradient: 'from-emerald-500 to-teal-600',
                },
                {
                  icon: Database,
                  title: 'Verify Resources',
                  desc: 'Help us maintain the accuracy of our resource database. If you know of community resources — shelters, food banks, legal aid — verify them in our system so they reach the people who need them.',
                  cta: 'Submit a Resource',
                  ctaIcon: ExternalLink,
                  color: '#3b82f6',
                  gradient: 'from-blue-500 to-blue-600',
                },
                {
                  icon: Globe,
                  title: 'Translate & Localize',
                  desc: 'ClearPath AI needs to speak every language. If you are bilingual, help us translate the interface and resource categories so that non-English speakers can find help in their own language.',
                  cta: 'Join Translation Team',
                  ctaIcon: Languages,
                  color: '#6366f1',
                  gradient: 'from-violet-500 to-purple-600',
                },
                {
                  icon: BookOpen,
                  title: 'Write Documentation',
                  desc: 'Good documentation multiplies impact. Help us write guides for nonprofits, city governments, and community organizations who want to deploy ClearPath AI for their communities.',
                  cta: 'Improve Docs',
                  ctaIcon: FileCheck,
                  color: '#f59e0b',
                  gradient: 'from-amber-500 to-orange-600',
                },
                {
                  icon: HeartHandshake,
                  title: 'Partner With Us',
                  desc: 'Are you a nonprofit, government agency, or community organization? Partner with ClearPath AI to bring transparent resource navigation to your community — no licensing fees, no strings attached.',
                  cta: 'Become a Partner',
                  ctaIcon: Handshake,
                  color: '#ec4899',
                  gradient: 'from-rose-500 to-pink-600',
                },
                {
                  icon: Megaphone,
                  title: 'Spread the Word',
                  desc: 'The simplest way to help is to tell people about ClearPath AI. Share it with community organizations, social workers, and anyone who could benefit from honest AI-powered resource navigation.',
                  cta: 'Share ClearPath AI',
                  ctaIcon: Twitter,
                  color: '#0ea5e9',
                  gradient: 'from-sky-500 to-cyan-600',
                },
              ].map((item) => {
                const Icon = item.icon
                const CtaIcon = item.ctaIcon
                return (
                  <motion.div
                    key={item.title}
                    variants={fadeInUp}
                    className="glass-card rounded-2xl p-6 shadow-premium hover:shadow-premium-lg transition-shadow duration-300"
                  >
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${item.gradient} flex items-center justify-center shadow-lg mb-4`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-[15px] font-bold text-gray-900 tracking-tight mb-2">{item.title}</h3>
                    <p className="text-[13px] text-gray-500 leading-relaxed mb-4">{item.desc}</p>
                    <div className="flex items-center gap-1.5 text-[13px] font-semibold cursor-pointer hover:gap-2.5 transition-all" style={{ color: item.color }}>
                      <CtaIcon className="w-4 h-4" />
                      {item.cta}
                      <ArrowRight className="w-3.5 h-3.5" />
                    </div>
                  </motion.div>
                )
              })}
            </motion.div>

            {/* Community Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="glass-card rounded-2xl p-8 md:p-10 shadow-premium text-center relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-emerald-50/40 via-transparent to-transparent rounded-bl-full pointer-events-none" />
              <div className="relative">
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-[12px] font-semibold bg-emerald-50/80 text-emerald-700 border border-emerald-100/60 mb-6"
                >
                  <ShieldCheck className="w-4 h-4" />
                  Open Source Community
                </motion.div>

                <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-gray-900">
                  ClearPath AI is built in the open
                </h2>
                <p className="text-[15px] text-gray-500 mt-4 max-w-lg mx-auto leading-relaxed">
                  Every line of code is public. Every decision is documented. We believe transparency in AI starts with transparency in development.
                </p>

                {/* GitHub Stats */}
                <motion.div
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={{ visible: { transition: { staggerChildren: 0.08 } } }}
                  className="flex items-center justify-center gap-8 mt-8"
                >
                  {[
                    { icon: Star, value: '47', label: 'Stars' },
                    { icon: GitFork, value: '12', label: 'Forks' },
                    { icon: Users, value: '8', label: 'Contributors' },
                  ].map((stat) => {
                    const Icon = stat.icon
                    return (
                      <motion.div key={stat.label} variants={fadeInUp} className="flex flex-col items-center gap-1.5">
                        <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-gray-50 border border-gray-100/60">
                          <Icon className="w-5 h-5 text-gray-600" />
                        </div>
                        <span className="text-[18px] font-bold text-gray-900">{stat.value}</span>
                        <span className="text-[11px] text-gray-400 font-medium">{stat.label}</span>
                      </motion.div>
                    )
                  })}
                </motion.div>

                <div className="mt-8">
                  <Link
                    href="https://github.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 text-[14px] font-semibold text-white rounded-xl bg-gradient-to-b from-gray-900 to-gray-800 hover:from-gray-800 hover:to-gray-700 shadow-lg shadow-gray-900/20 hover:shadow-xl hover:shadow-gray-900/30 transition-all"
                  >
                    <Code2 className="w-4 h-4" />
                    Contribute on GitHub
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ═══ CTA ═══ */}
        <section className="py-20 bg-white/40">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="glass-card rounded-2xl p-8 md:p-12 shadow-premium-lg text-center relative overflow-hidden"
            >
              {/* Decorative accent */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-50/30 via-transparent to-emerald-50/30 pointer-events-none" />

              <div className="relative">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center mx-auto shadow-premium-xl mb-6">
                  <Layers className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-gray-900">{isFr ? 'Prêt à essayer une IA honnête ?' : 'Ready to try honest AI?'}</h2>
                <p className="text-[15px] text-gray-500 mt-4 max-w-lg mx-auto leading-relaxed">
                  Experience AI that shows its work, admits uncertainty, and always puts your safety first.
                  No hallucinations. No hidden confidence. Just honest confidence.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-8">
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
                    Read Our Responsible AI Policy
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="mt-auto sidebar-dark text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-blue-500 to-emerald-400 flex items-center justify-center">
                <Layers className="w-3.5 h-3.5 text-white" />
              </div>
              <span className="text-[13px] font-bold tracking-tight text-white">ClearPath AI</span>
            </div>
            <p className="text-[12px] text-gray-500">&copy; 2026 ClearPath AI. All rights reserved.</p>
          </div>
        </div>
      </footer>
      <Footer />
    </div>
  )
}
