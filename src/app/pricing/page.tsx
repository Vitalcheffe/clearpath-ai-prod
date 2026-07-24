'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
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
  Globe,
  Quote,
  ShieldCheck,
  Code2,
  Users,
  Mail,
  HelpCircle,
  Info,
  HandHeart,
  Gift,
  Eye,
  Fingerprint,
  Server,
} from 'lucide-react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { useI18n } from '@/i18n'

// ─── ANIMATION VARIANTS ──────────────────────────────────
const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
}

const staggerItem = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] as const } },
}

const fadeInUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] as const } },
}

// ─── FAQ DATA ────────────────────────────────────────────
const faqs = [
  {
    question: 'Is ClearPath AI free to use?',
    answer: 'Yes. There is no paid tier, no API access to sell, no enterprise plan, no sales team. The codebase is open source on GitHub. Anyone can fork it, self-host it, or extend it for their own community. We built this for the USAII Global AI Hackathon 2026, not as a commercial product.',
  },
  {
    question: 'Why does this page exist if there are no paid plans?',
    answer: 'Honest answer: this page is here to be transparent about what does and does not exist. We replaced the previous (fabricated) pricing page — which listed Pro plans at $11/month and Enterprise tiers — with this honest version. The previous page was placeholder content for a hypothetical future product. We removed it because claiming paid plans exist when they do not would be dishonest, and dishonesty is exactly what ClearPath AI is built against.',
  },
  {
    question: 'Will you add paid plans in the future?',
    answer: 'Maybe. If ClearPath AI becomes a real product after the hackathon, we would need a sustainability model — but it would be designed so the core resource navigation remains free for individuals forever. For now: no paid plans, no API tier, no enterprise features. Just the open-source tool you can use right now.',
  },
  {
    question: 'Can my organization use ClearPath AI internally?',
    answer: 'Yes — fork the GitHub repo and self-host it. The README has deployment instructions. We do not offer hosted enterprise plans, custom integrations, white-label versions, or dedicated support. If you need those, this is not the right tool for you yet.',
  },
  {
    question: 'Is ClearPath AI HIPAA compliant?',
    answer: 'No. ClearPath AI does not collect Protected Health Information (PHI). There is no user account system, no persistent storage of queries, no health data. HIPAA does not apply to a tool that collects no health information — so we do not claim compliance with it. We are a hackathon build by two high school students, not a covered entity or business associate.',
  },
  {
    question: 'How can organizations integrate ClearPath AI?',
    answer: 'There is no API, no embed widget, no SDK. The codebase is open source on GitHub — fork it, inspect it, self-host it. The /api/classify endpoint is internal and undocumented. If you want to extend it for your community, the README has setup instructions.',
  },
]

// ─── TRUTHFUL FEATURE LIST ───────────────────────────────
const realFeatures = [
  {
    icon: Shield,
    title: '6-Layer Pipeline',
    desc: 'Crisis regex → vague input check → injection check → BART classification → confidence gate → human escalation',
    color: '#3b82f6',
  },
  {
    icon: Eye,
    title: 'Honest Confidence Scores',
    desc: 'We show the raw softmax probability BART returned — not inflated, not smoothed, not post-processed.',
    color: '#10b981',
  },
  {
    icon: Lock,
    title: 'No Accounts, No PII',
    desc: 'No email, no profile, no tracking, no cookies beyond what the browser needs. Your session is stateless.',
    color: '#8b5cf6',
  },
  {
    icon: HandHeart,
    title: 'Never Auto-Dials',
    desc: 'The user always clicks. The user always calls. A real person on the other end of the line has to be the one helping.',
    color: '#f59e0b',
  },
  {
    icon: Server,
    title: '3-Tier Fallback',
    desc: 'Raw HuggingFace fetch → HuggingFace SDK → keyword match. When the API is down, the UI says so honestly.',
    color: '#06b6d4',
  },
  {
    icon: Globe,
    title: '6 US Cities, Hand-Verified',
    desc: 'Houston, New York, Los Angeles, Chicago, Dallas, Miami. Every resource was manually researched in May 2026.',
    color: '#ec4899',
  },
]

// ─── HONEST COMPARISON ───────────────────────────────────
const comparison = [
  { feature: 'Resource navigation', clearpath: 'Free, forever', others: 'Often paywalled' },
  { feature: 'Crisis detection', clearpath: 'Hardcoded regex (175 patterns)', others: 'Usually absent' },
  { feature: 'Confidence scores', clearpath: 'Raw BART probabilities', others: 'Hidden or absent' },
  { feature: 'Hallucinated resources', clearpath: 'Impossible — classified, not generated', others: 'Common with LLM chatbots' },
  { feature: 'Auto-dial crisis lines', clearpath: 'Never', others: 'Varies' },
  { feature: 'User data storage', clearpath: 'None', others: 'Usually stores queries' },
  { feature: 'Source code', clearpath: 'Open source on GitHub', others: 'Usually closed' },
  { feature: 'Cost', clearpath: 'Free', others: 'Free–$299/month' },
]

export default function PricingPage() {
  const { t } = useI18n()
  const isFr = t.locale === 'fr'
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/30">
      <Navbar />

      <main className="pt-20">
        {/* ─── HERO ─── */}
        <section className="py-20 md:py-28">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-50 border border-emerald-100 mb-6"
            >
              <Gift className="w-4 h-4 text-emerald-600" />
              <span className="text-[12px] font-bold text-emerald-700 uppercase tracking-wider">{isFr ? 'Gratuit, pour toujours' : 'Free, forever'}</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-gray-900"
            >
              {isFr ? "Il n'y a pas de page de tarifs." : 'There is no pricing page.'}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg sm:text-xl text-gray-500 mt-6 max-w-2xl mx-auto leading-relaxed"
            >
              {isFr ? (
                'ClearPath AI est gratuit. Il n\'y a pas de formule Pro, pas de plan Entreprise, pas d\'abonnement API, pas d\'équipe commerciale. Nous sommes deux lycéens qui construisons ce projet pour le USAII Global AI Hackathon 2026 — pas un produit commercial.'
              ) : (
                'ClearPath AI is free. There is no Pro tier, no Enterprise plan, no API subscription, no sales team. We are two high school students building this for the USAII Global AI Hackathon 2026 — not a commercial product.'
              )}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <Link
                href="/app"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 text-[14px] font-semibold text-white rounded-xl bg-gradient-to-b from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 shadow-md shadow-blue-500/20 hover:shadow-lg hover:shadow-blue-500/30 transition-all active:scale-[0.97] shrink-0"
              >
                Try ClearPath AI
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="https://github.com/Vitalcheffe/clearpath-ai-prod"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 text-[14px] font-semibold text-gray-700 rounded-xl bg-white border border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-all"
              >
                <Code2 className="w-4 h-4" />
                View on GitHub
              </Link>
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-[12px] text-gray-400 mt-6 italic"
            >
              Note: this page replaced a fabricated pricing page that listed Pro plans at $11/month and Enterprise tiers. We removed it because claiming paid plans exist when they do not would be dishonest — and dishonesty is what ClearPath AI is built against.
            </motion.p>
          </div>
        </section>

        {/* ─── REAL FEATURES ─── */}
        <section className="py-20 bg-white/40">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-80px' }}
              variants={staggerContainer}
              className="text-center mb-16"
            >
              <motion.h2 variants={staggerItem} className="text-3xl sm:text-4xl font-extrabold tracking-tight text-gray-900">
                What you actually get
              </motion.h2>
              <motion.p variants={staggerItem} className="text-lg text-gray-500 mt-4 max-w-2xl mx-auto">
                Every feature below is real, working right now, and free. No &ldquo;coming soon&rdquo;, no premium tier, no locked features.
              </motion.p>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-60px' }}
              variants={staggerContainer}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {realFeatures.map((feature, i) => {
                const Icon = feature.icon
                return (
                  <motion.div
                    key={i}
                    variants={staggerItem}
                    className="glass-card rounded-2xl p-6 shadow-premium hover:shadow-premium-lg transition-shadow duration-300"
                  >
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                      style={{ backgroundColor: `${feature.color}10` }}
                    >
                      <Icon className="w-6 h-6" style={{ color: feature.color }} />
                    </div>
                    <h3 className="text-[16px] font-bold text-gray-900 tracking-tight mb-2">{feature.title}</h3>
                    <p className="text-[13px] text-gray-500 leading-relaxed">{feature.desc}</p>
                  </motion.div>
                )
              })}
            </motion.div>
          </div>
        </section>

        {/* ─── COMPARISON TABLE ─── */}
        <section className="py-20">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-80px' }}
              variants={staggerContainer}
              className="text-center mb-12"
            >
              <motion.h2 variants={staggerItem} className="text-3xl sm:text-4xl font-extrabold tracking-tight text-gray-900">
                How ClearPath AI compares
              </motion.h2>
              <motion.p variants={staggerItem} className="text-lg text-gray-500 mt-4">
                To other AI tools that help people find community resources.
              </motion.p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="glass-card rounded-2xl overflow-hidden shadow-premium"
            >
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-100 bg-gray-50/50">
                    <th className="text-left p-5 text-[12px] font-bold uppercase tracking-wider text-gray-400">Feature</th>
                    <th className="text-left p-5 text-[12px] font-bold uppercase tracking-wider text-blue-600">ClearPath AI</th>
                    <th className="text-left p-5 text-[12px] font-bold uppercase tracking-wider text-gray-400">Typical alternatives</th>
                  </tr>
                </thead>
                <tbody>
                  {comparison.map((row, i) => (
                    <tr key={i} className="border-b border-gray-50 last:border-0 hover:bg-blue-50/30 transition-colors">
                      <td className="p-5 text-[14px] font-semibold text-gray-700">{row.feature}</td>
                      <td className="p-5 text-[14px] text-gray-900 font-medium">
                        <span className="inline-flex items-center gap-2">
                          <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                          {row.clearpath}
                        </span>
                      </td>
                      <td className="p-5 text-[14px] text-gray-500">{row.others}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </motion.div>
          </div>
        </section>

        {/* ─── FAQ ─── */}
        <section className="py-20 bg-white/40">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-80px' }}
              variants={staggerContainer}
              className="text-center mb-12"
            >
              <motion.h2 variants={staggerItem} className="text-3xl sm:text-4xl font-extrabold tracking-tight text-gray-900">
                Honest answers
              </motion.h2>
              <motion.p variants={staggerItem} className="text-lg text-gray-500 mt-4">
                Questions about pricing, plans, and what ClearPath AI is (and is not).
              </motion.p>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-60px' }}
              variants={staggerContainer}
              className="space-y-4"
            >
              {faqs.map((faq, i) => (
                <motion.div
                  key={i}
                  variants={staggerItem}
                  className="glass-card rounded-2xl p-6 shadow-premium"
                >
                  <h3 className="text-[15px] font-bold text-gray-900 mb-3 flex items-start gap-2">
                    <HelpCircle className="w-4 h-4 text-blue-500 mt-1 shrink-0" />
                    {faq.question}
                  </h3>
                  <p className="text-[14px] text-gray-500 leading-relaxed pl-6">{faq.answer}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ─── CTA ─── */}
        <section className="py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="glass-card rounded-3xl p-10 md:p-14 text-center shadow-premium-lg relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-emerald-500 to-blue-500" />

              <Heart className="w-10 h-10 text-emerald-500 mx-auto mb-4" />
              <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight mb-3">
                Free, open source, no catch
              </h2>
              <p className="text-[15px] text-gray-500 max-w-2xl mx-auto leading-relaxed mb-8">
                ClearPath AI was built by two high school students for the USAII Global AI Hackathon 2026. There is no upsell, no free trial that expires, no &ldquo;contact sales&rdquo; button. Just an open-source tool you can use right now.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  href="/app"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 text-[14px] font-semibold text-white rounded-xl bg-gradient-to-b from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 shadow-md shadow-blue-500/20 hover:shadow-lg transition-all active:scale-[0.97]"
                >
                  Try it now
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/responsible-ai"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 text-[14px] font-semibold text-gray-700 rounded-xl bg-white border border-gray-200 hover:border-gray-300 transition-all"
                >
                  <Shield className="w-4 h-4" />
                  Read our Responsible AI framework
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
