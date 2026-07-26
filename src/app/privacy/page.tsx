'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import {
  Layers,
  Shield,
  Eye,
  Database,
  Cpu,
  Lock,
  Users,
  Baby,
  Server,
  Mail,
  ArrowRight,
  CheckCircle2,
  AlertTriangle,
  Globe,
  Scale,
  FileText,
  Clock,
  Cookie,
  ShieldCheck,
  Building,
  UserCheck,
} from 'lucide-react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { useI18n } from '@/i18n'

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
}

const sections = [
  { id: 'introduction', number: 1, title: 'Introduction', icon: Shield },
  { id: 'information-collected', number: 2, title: 'Information We Collect', icon: Eye },
  { id: 'how-we-use', number: 3, title: 'How We Use Information', icon: Cpu },
  { id: 'data-storage', number: 4, title: 'Data Storage', icon: Database },
  { id: 'crisis-detection', number: 5, title: 'Crisis Detection Data', icon: AlertTriangle },
  { id: 'third-party', number: 6, title: 'Third-Party Services', icon: Server },
  { id: 'your-rights', number: 7, title: 'Your Rights', icon: Users },
  { id: 'childrens-privacy', number: 8, title: "Children's Privacy", icon: Baby },
  { id: 'security', number: 9, title: 'Security Measures', icon: Lock },
  { id: 'legal-basis', number: 10, title: 'Data Processing Legal Basis', icon: Scale },
  { id: 'international-transfers', number: 11, title: 'International Data Transfers', icon: Globe },
  { id: 'automated-decisions', number: 12, title: 'Automated Decision-Making', icon: Cpu },
  { id: 'retention', number: 13, title: 'Data Retention Schedule', icon: Clock },
  { id: 'cookies', number: 14, title: 'Cookie Policy', icon: Cookie },
  { id: 'privacy-by-design', number: 15, title: 'Privacy by Design', icon: ShieldCheck },
  { id: 'contact', number: 16, title: 'Contact Us', icon: Mail },
]

export default function PrivacyPage() {
  const { t } = useI18n()
  const isFr = t.locale === 'fr'
  return (
    <div className="min-h-screen flex flex-col mesh-gradient-bg">
      <Navbar />
      <main className="flex-1 pt-16">
        {/* Hero */}
        <section className="py-16 md:py-24">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={{ visible: { transition: { staggerChildren: 0.08 } } }}
            >
              <motion.div
                variants={fadeInUp}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-[12px] font-semibold bg-emerald-50/80 text-emerald-700 border border-emerald-100/60 mb-6"
              >
                <Shield className="w-3.5 h-3.5" />
                Your privacy matters
              </motion.div>
              <motion.h1
                variants={fadeInUp}
                className="text-4xl sm:text-5xl font-extrabold tracking-tight text-gray-900 leading-tight"
              >
                {isFr ? 'Politique de Confidentialité' : 'Privacy Policy'}
              </motion.h1>
              <motion.p
                variants={fadeInUp}
                className="text-lg text-gray-700 mt-4 max-w-2xl mx-auto leading-relaxed"
              >
                {isFr ? 'Dernière mise à jour : Juin 2026' : 'Last updated: June 2026'}
              </motion.p>
              <motion.p
                variants={fadeInUp}
                className="text-[15px] text-gray-600 mt-2 max-w-xl mx-auto"
              >
                {isFr
                  ? "ClearPath AI respecte votre vie privée. Cette politique explique quelles données nous collectons, comment nous les utilisons et les mesures que nous prenons pour les protéger."
                  : 'ClearPath AI respects your privacy. This policy explains what data we collect, how we use it, and the steps we take to protect it.'}
              </motion.p>
            </motion.div>
          </div>
        </section>

        {/* Table of Contents */}
        <section className="pb-12">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="glass-card rounded-2xl p-6 md:p-8 shadow-premium"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-gray-900 to-gray-700 flex items-center justify-center shadow-md">
                  <Layers className="w-4 h-4 text-white" />
                </div>
                <h2 className="text-lg font-bold text-gray-900 tracking-tight">Table of Contents</h2>
              </div>
              <nav className="grid sm:grid-cols-2 gap-2">
                {sections.map((section) => {
                  const Icon = section.icon
                  return (
                    <a
                      key={section.id}
                      href={`#${section.id}`}
                      className="flex items-center gap-3 px-4 py-3 rounded-xl text-[13px] font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50/80 transition-all group"
                    >
                      <span className="w-7 h-7 rounded-lg bg-gray-100 group-hover:bg-blue-50 flex items-center justify-center text-[11px] font-bold text-gray-400 group-hover:text-blue-600 transition-colors shrink-0">
                        {section.number}
                      </span>
                      <Icon className="w-3.5 h-3.5 text-gray-400 group-hover:text-blue-500 transition-colors shrink-0" />
                      <span>{section.title}</span>
                    </a>
                  )
                })}
              </nav>
            </motion.div>
          </div>
        </section>

        {/* Section 1: Introduction */}
        <section id="introduction" className="py-6">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="glass-card rounded-2xl p-6 md:p-8 shadow-premium"
            >
              <div className="flex items-start gap-4 mb-4">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center shrink-0">
                  <Shield className="w-5 h-5 text-emerald-600" />
                </div>
                <div>
                  <span className="text-[11px] font-bold text-emerald-600 tracking-wider uppercase">Section 1</span>
                  <h2 className="text-xl font-extrabold text-gray-900 tracking-tight mt-0.5">Introduction</h2>
                </div>
              </div>
              <div className="space-y-4 text-[15px] text-gray-500 leading-relaxed pl-0 md:pl-14">
                <p>
                  ClearPath AI respects your privacy and is committed to protecting your personal information.
                  This Privacy Policy describes how we handle data when you use our AI-powered community resource
                  navigator.
                </p>
                <p>
                  We built ClearPath AI with a <span className="font-semibold text-gray-700">privacy-first approach</span>.
                  We do not train models on your data, and we do not share your information with advertisers. Guest sessions
                  are ephemeral by design. For authenticated users, we store only what is needed to provide cross-session
                  functionality. Our architecture was designed from the ground up to minimize data collection and maximize
                  your control.
                </p>
                <p>
                  By using ClearPath AI, you agree to the practices described in this policy. If you have any
                  questions, please contact us at{' '}
                  <a href="mailto:team@clearpath-ai.org" className="text-blue-600 hover:text-blue-500 font-medium transition-colors">
                    team@clearpath-ai.org
                  </a>.
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Section 2: Information We Collect */}
        <section id="information-collected" className="py-6">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="glass-card rounded-2xl p-6 md:p-8 shadow-premium"
            >
              <div className="flex items-start gap-4 mb-4">
                <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center shrink-0">
                  <Eye className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <span className="text-[11px] font-bold text-blue-600 tracking-wider uppercase">Section 2</span>
                  <h2 className="text-xl font-extrabold text-gray-900 tracking-tight mt-0.5">Information We Collect</h2>
                </div>
              </div>
              <div className="space-y-4 text-[15px] text-gray-500 leading-relaxed pl-0 md:pl-14">
                <p>
                  We collect <span className="font-semibold text-gray-700">the absolute minimum</span> amount of
                  data necessary to provide our service. Here&apos;s what we process:
                </p>
                <div className="space-y-3">
                  <div className="flex items-start gap-3 p-4 rounded-xl bg-gray-50/60 border border-gray-100">
                    <CheckCircle2 className="w-4.5 h-4.5 text-emerald-500 mt-0.5 shrink-0" />
                    <div>
                      <p className="font-semibold text-gray-800 text-[14px]">What you type</p>
                      <p className="text-[13px] text-gray-400 mt-0.5">
                        Your search queries and conversation inputs are processed to classify
                        your needs and find relevant resources. Processing is in-memory only and nothing is written to disk. Sessions are stateless — no personal data is retained between visits.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-4 rounded-xl bg-gray-50/60 border border-gray-100">
                    <CheckCircle2 className="w-4.5 h-4.5 text-emerald-500 mt-0.5 shrink-0" />
                    <div>
                      <p className="font-semibold text-gray-800 text-[14px]">Classification results</p>
                      <p className="text-[13px] text-gray-400 mt-0.5">
                        The AI-generated category labels and confidence scores are generated in real-time
                        and displayed to you. For guests, they are not stored after your session ends. For account holders, they are saved as part of conversation history.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="mt-4 p-4 rounded-xl bg-amber-50/60 border border-amber-100/60">
                  <div className="flex items-start gap-2">
                    <AlertTriangle className="w-4 h-4 text-amber-600 mt-0.5 shrink-0" />
                    <p className="text-[13px] text-amber-700">
                      <span className="font-semibold">What we do NOT collect:</span> Personal identifiers,
                      location data, browsing history, device information, cookies for tracking, or any
                      data for advertising purposes.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Section 3: How We Use Information */}
        <section id="how-we-use" className="py-6">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="glass-card rounded-2xl p-6 md:p-8 shadow-premium"
            >
              <div className="flex items-start gap-4 mb-4">
                <div className="w-10 h-10 rounded-xl bg-violet-50 flex items-center justify-center shrink-0">
                  <Cpu className="w-5 h-5 text-violet-600" />
                </div>
                <div>
                  <span className="text-[11px] font-bold text-violet-600 tracking-wider uppercase">Section 3</span>
                  <h2 className="text-xl font-extrabold text-gray-900 tracking-tight mt-0.5">How We Use Information</h2>
                </div>
              </div>
              <div className="space-y-4 text-[15px] text-gray-500 leading-relaxed pl-0 md:pl-14">
                <p>
                  Your input is used for exactly <span className="font-semibold text-gray-700">one purpose</span>:
                  to classify your needs and find the most relevant community resources for you.
                </p>
                <ul className="space-y-2.5">
                  {[
                    'Classify your query into categories like housing, food assistance, mental health, legal aid, etc.',
                    'Calculate confidence scores so you know how certain the AI is about each result',
                    'Detect crisis situations so we can prioritize emergency resources and hotlines',
                    'Present resource recommendations from verified databases like 211.org',
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="w-5 h-5 rounded-full bg-violet-100 flex items-center justify-center shrink-0 mt-0.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-violet-500" />
                      </span>
                      <span className="text-[14px]">{item}</span>
                    </li>
                  ))}
                </ul>
                <p className="mt-4 text-[14px]">
                  We <span className="font-semibold text-gray-700">never</span> use your data for:
                </p>
                <ul className="space-y-2">
                  {[
                    'Training machine learning models',
                    'Targeted advertising or marketing',
                    'Selling or sharing with third parties',
                    'Building user profiles or behavioral tracking',
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="w-5 h-5 rounded-full bg-red-50 flex items-center justify-center shrink-0 mt-0.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-red-400" />
                      </span>
                      <span className="text-[14px] text-gray-400 line-through decoration-red-300">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Section 4: Data Storage — Emphasized */}
        <section id="data-storage" className="py-6">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="glass-card rounded-2xl p-6 md:p-8 shadow-premium-lg border-2 border-emerald-100/60 relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-400 via-teal-400 to-emerald-500" />
              <div className="flex items-start gap-4 mb-4">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center shrink-0">
                  <Database className="w-5 h-5 text-emerald-600" />
                </div>
                <div>
                  <span className="text-[11px] font-bold text-emerald-600 tracking-wider uppercase">Section 4</span>
                  <h2 className="text-xl font-extrabold text-gray-900 tracking-tight mt-0.5">Data Storage</h2>
                </div>
              </div>
              <div className="space-y-4 text-[15px] text-gray-500 leading-relaxed pl-0 md:pl-14">
                <div className="p-5 rounded-xl bg-emerald-50/50 border border-emerald-100">
                  <p className="text-2xl sm:text-3xl font-black text-emerald-700 tracking-tight">
                    Queries are processed in real-time and not persistently stored. No personal data is retained between visits.
                  </p>
                </div>
                <p>
                  ClearPath AI uses an <span className="font-semibold text-gray-700">in-memory processing architecture</span>.
                  This means:
                </p>
                <ul className="space-y-2.5">
                  {[
                    'Guest sessions are processed in-memory with no persistent storage. Queries are processed in real-time and not persistently stored',
                    'Queries are processed in real-time and not persistently stored — no personal data is retained between visits',
                    'No session data can be retrieved after the browser tab is closed',
                    'All sessions are stateless — no personal data persists beyond the current visit',
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 mt-1 shrink-0" />
                      <span className="text-[14px]">{item}</span>
                    </li>
                  ))}
                </ul>
                <div className="flex items-center gap-2 px-4 py-3 rounded-xl bg-gray-50/60 border border-gray-100 mt-4">
                  <Lock className="w-4 h-4 text-gray-400" />
                  <span className="text-[13px] text-gray-400">
                    Guest sessions leave no trace; no user data is persistently stored
                  </span>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Section 5: Crisis Detection Data */}
        <section id="crisis-detection" className="py-6">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="glass-card rounded-2xl p-6 md:p-8 shadow-premium relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-red-400 via-orange-400 to-red-400" />
              <div className="flex items-start gap-4 mb-4">
                <div className="w-10 h-10 rounded-xl bg-red-50 flex items-center justify-center shrink-0">
                  <AlertTriangle className="w-5 h-5 text-red-600" />
                </div>
                <div>
                  <span className="text-[11px] font-bold text-red-600 tracking-wider uppercase">Section 5</span>
                  <h2 className="text-xl font-extrabold text-gray-900 tracking-tight mt-0.5">Crisis Detection Data</h2>
                </div>
              </div>
              <div className="space-y-4 text-[15px] text-gray-500 leading-relaxed pl-0 md:pl-14">
                <p>
                  ClearPath AI includes a crisis detection layer that identifies when someone may be in danger.
                  This is a <span className="font-semibold text-gray-700">safety-critical feature</span> designed
                  to connect people in crisis with immediate help.
                </p>
                <div className="space-y-3">
                  <div className="flex items-start gap-3 p-4 rounded-xl bg-red-50/30 border border-red-100/60">
                    <Shield className="w-4 h-4 text-red-500 mt-0.5 shrink-0" />
                    <div>
                      <p className="font-semibold text-gray-800 text-[14px]">Crisis keywords are processed locally</p>
                      <p className="text-[13px] text-gray-400 mt-0.5">
                        Detection happens entirely in-memory. Crisis-related keywords trigger immediate
                        resource recommendations (988 Suicide & Crisis Lifeline, 911, etc.) without
                        any data being logged or stored.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-4 rounded-xl bg-red-50/30 border border-red-100/60">
                    <Eye className="w-4 h-4 text-red-500 mt-0.5 shrink-0" />
                    <div>
                      <p className="font-semibold text-gray-800 text-[14px]">Never logged, never stored</p>
                      <p className="text-[13px] text-gray-400 mt-0.5">
                        We never record which crisis keywords were detected, when they were detected,
                        or who triggered them. The detection result is used only to display emergency
                        resources and then it&apos;s gone.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Section 6: Third-Party Services */}
        <section id="third-party" className="py-6">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="glass-card rounded-2xl p-6 md:p-8 shadow-premium"
            >
              <div className="flex items-start gap-4 mb-4">
                <div className="w-10 h-10 rounded-xl bg-cyan-50 flex items-center justify-center shrink-0">
                  <Server className="w-5 h-5 text-cyan-600" />
                </div>
                <div>
                  <span className="text-[11px] font-bold text-cyan-600 tracking-wider uppercase">Section 6</span>
                  <h2 className="text-xl font-extrabold text-gray-900 tracking-tight mt-0.5">Third-Party Services</h2>
                </div>
              </div>
              <div className="space-y-4 text-[15px] text-gray-500 leading-relaxed pl-0 md:pl-14">
                <p>
                  ClearPath AI integrates with the following third-party services to deliver its functionality:
                </p>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl bg-gray-50/60 border border-gray-100">
                    <div className="flex items-center gap-2 mb-2">
                      <Cpu className="w-4 h-4 text-violet-500" />
                      <h4 className="font-bold text-gray-900 text-[14px]">Hugging Face API</h4>
                    </div>
                    <p className="text-[13px] text-gray-400 leading-relaxed">
                      Used for AI classification (BART-large-MNLI). Your query is sent to the API
                      for classification, and only the category label and confidence score are returned.
                      Hugging Face&apos;s own privacy policy applies to data in transit.
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-gray-50/60 border border-gray-100">
                    <div className="flex items-center gap-2 mb-2">
                      <Database className="w-4 h-4 text-emerald-500" />
                      <h4 className="font-bold text-gray-900 text-[14px]">211.org</h4>
                    </div>
                    <p className="text-[13px] text-gray-400 leading-relaxed">
                      Used for verified community resource data. We query 211.org&apos;s database for
                      resource listings. No personal information is sent to 211.org — only category
                      and location filters.
                    </p>
                  </div>
                </div>
                <p className="mt-2">
                  We do not integrate with any advertising networks, analytics platforms that track
                  users, or data brokers. Period.
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Section 7: Your Rights */}
        <section id="your-rights" className="py-6">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="glass-card rounded-2xl p-6 md:p-8 shadow-premium"
            >
              <div className="flex items-start gap-4 mb-4">
                <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center shrink-0">
                  <Users className="w-5 h-5 text-amber-600" />
                </div>
                <div>
                  <span className="text-[11px] font-bold text-amber-600 tracking-wider uppercase">Section 7</span>
                  <h2 className="text-xl font-extrabold text-gray-900 tracking-tight mt-0.5">Your Rights</h2>
                </div>
              </div>
              <div className="space-y-4 text-[15px] text-gray-500 leading-relaxed pl-0 md:pl-14">
                <p>
                  You have the following rights regarding your data:
                </p>
                <div className="space-y-3">
                  {[
                    {
                      title: 'Right to Know',
                      desc: 'You have the right to know what data we process. Guest sessions are processed in real-time with no persistence. For account holders, we store conversation history and saved resources — you can view and request a copy of your data at any time.',
                    },
                    {
                      title: 'Right to Delete',
                      desc: 'You have the right to request deletion of your data. Guest sessions have no persistent data to delete. Account holders can request full data deletion at any time through our contact page — we will remove all stored data within 30 days.',
                    },
                    {
                      title: 'Right to Opt Out',
                      desc: 'You can stop using the service at any time. Guest sessions leave no trace when you close the tab. Account holders can delete their account and all associated data at any time.',
                    },
                  ].map((right, i) => (
                    <div key={i} className="flex items-start gap-3 p-4 rounded-xl bg-gray-50/60 border border-gray-100">
                      <div className="w-7 h-7 rounded-lg bg-amber-100 flex items-center justify-center shrink-0">
                        <span className="text-[11px] font-bold text-amber-700">{i + 1}</span>
                      </div>
                      <div>
                        <p className="font-semibold text-gray-800 text-[14px]">{right.title}</p>
                        <p className="text-[13px] text-gray-400 mt-0.5">{right.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Section 8: Children's Privacy */}
        <section id="childrens-privacy" className="py-6">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="glass-card rounded-2xl p-6 md:p-8 shadow-premium"
            >
              <div className="flex items-start gap-4 mb-4">
                <div className="w-10 h-10 rounded-xl bg-pink-50 flex items-center justify-center shrink-0">
                  <Baby className="w-5 h-5 text-pink-600" />
                </div>
                <div>
                  <span className="text-[11px] font-bold text-pink-600 tracking-wider uppercase">Section 8</span>
                  <h2 className="text-xl font-extrabold text-gray-900 tracking-tight mt-0.5">Children&apos;s Privacy</h2>
                </div>
              </div>
              <div className="space-y-4 text-[15px] text-gray-500 leading-relaxed pl-0 md:pl-14">
                <p>
                  ClearPath AI is designed with <span className="font-semibold text-gray-700">privacy-first principles (no personal data collected from anyone)</span> for
                  users of all ages, including children and teenagers who may need community resources. No formal compliance certification — this is a hackathon build.
                </p>
                <ul className="space-y-2.5">
                  {[
                    'We do not knowingly collect personal information from children under 13',
                    'Account creation is optional — guests need no names, emails, or birthdays; accounts require minimal information',
                    'There is no authentication system. No personal data is collected from anyone — adult or minor.',
                    'Crisis detection works the same way for all users, including children, ensuring immediate access to help',
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <CheckCircle2 className="w-4 h-4 text-pink-500 mt-0.5 shrink-0" />
                      <span className="text-[14px]">{item}</span>
                    </li>
                  ))}
                </ul>
                <p>
                  If you are a parent or guardian and believe your child has interacted with our service
                  and have concerns, please contact us. Guest sessions leave no persistent data to remove.
                  For account holders, we can delete all stored data upon request — and we take all concerns seriously.
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Section 9: Security Measures */}
        <section id="security" className="py-6">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="glass-card rounded-2xl p-6 md:p-8 shadow-premium"
            >
              <div className="flex items-start gap-4 mb-4">
                <div className="w-10 h-10 rounded-xl bg-teal-50 flex items-center justify-center shrink-0">
                  <Lock className="w-5 h-5 text-teal-600" />
                </div>
                <div>
                  <span className="text-[11px] font-bold text-teal-600 tracking-wider uppercase">Section 9</span>
                  <h2 className="text-xl font-extrabold text-gray-900 tracking-tight mt-0.5">Security Measures</h2>
                </div>
              </div>
              <div className="space-y-4 text-[15px] text-gray-500 leading-relaxed pl-0 md:pl-14">
                <p>
                  We take security seriously. Our architecture was designed to minimize risk:
                </p>
                <div className="grid sm:grid-cols-3 gap-3">
                  {[
                    {
                      icon: Cpu,
                      title: 'In-Memory Guest Processing',
                      desc: 'Guest data processed in RAM, never persisted to disk. No user data is persistently stored',
                      color: '#10b981',
                    },
                    {
                      icon: Database,
                      title: 'Encrypted Storage',
                      desc: 'No user data is persistently stored; guest sessions never touch disk',
                      color: '#3b82f6',
                    },
                    {
                      icon: Lock,
                      title: 'HTTPS Encryption',
                      desc: 'All data in transit is encrypted using TLS 1.3',
                      color: '#6366f1',
                    },
                  ].map((measure) => {
                    const Icon = measure.icon
                    return (
                      <div key={measure.title} className="p-4 rounded-xl bg-gray-50/60 border border-gray-100 text-center">
                        <div className="w-9 h-9 rounded-lg flex items-center justify-center mx-auto mb-2" style={{ backgroundColor: `${measure.color}0d` }}>
                          <Icon className="w-4 h-4" style={{ color: measure.color }} />
                        </div>
                        <p className="font-semibold text-gray-800 text-[13px]">{measure.title}</p>
                        <p className="text-[11px] text-gray-400 mt-0.5">{measure.desc}</p>
                      </div>
                    )
                  })}
                </div>
                <p>
                  While no system is 100% secure, our approach minimizes data exposure. Guest sessions leave no trace,
                  and no user data is persistently stored. You can&apos;t breach what was never stored.
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Section 10: Data Processing Legal Basis (GDPR Article 6) */}
        <section id="legal-basis" className="py-6">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="glass-card rounded-2xl p-6 md:p-8 shadow-premium relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-400 via-indigo-400 to-blue-400" />
              <div className="flex items-start gap-4 mb-4">
                <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center shrink-0">
                  <Scale className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <span className="text-[11px] font-bold text-blue-600 tracking-wider uppercase">Section 10</span>
                  <h2 className="text-xl font-extrabold text-gray-900 tracking-tight mt-0.5">Data Processing Legal Basis</h2>
                </div>
              </div>
              <div className="space-y-4 text-[15px] text-gray-500 leading-relaxed pl-0 md:pl-14">
                <p>
                  Under GDPR Article 6, all data processing must have a lawful basis. ClearPath AI processes
                  data under the following legal bases:
                </p>
                <div className="space-y-3">
                  {[
                    {
                      basis: 'Legitimate Interest',
                      description: 'Processing your query text to classify your needs and present relevant community resources. This is the core functionality you expect when using our service. Our legitimate interest is providing the AI navigation service you requested.',
                      dataTypes: 'Query text, classification results, confidence scores',
                    },
                    {
                      basis: 'Vital Interest',
                      description: 'Crisis keyword detection is processed under the vital interest legal basis. When someone may be in danger, processing their input to detect crisis signals and connect them with emergency services is necessary to protect their vital interests — their life and safety.',
                      dataTypes: 'Crisis keyword matching (in-memory only)',
                    },
                    {
                      basis: 'Consent',
                      description: 'If you voluntarily provide location information to improve resource relevance, this is processed based on your explicit consent. You can withdraw this consent at any time by clearing your location in the interface. No consequences for refusing.',
                      dataTypes: 'Opt-in location data (ZIP code only)',
                    },
                  ].map((item, i) => (
                    <div key={i} className="p-4 rounded-xl bg-blue-50/20 border border-blue-100/40">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-6 h-6 rounded-md bg-blue-100 flex items-center justify-center">
                          <span className="text-[10px] font-bold text-blue-600">{i + 1}</span>
                        </div>
                        <p className="font-semibold text-gray-800 text-[14px]">{item.basis}</p>
                      </div>
                      <p className="text-[13px] text-gray-500 leading-relaxed">{item.description}</p>
                      <p className="text-[11px] text-gray-400 mt-2"><span className="font-semibold text-gray-500">Data types:</span> {item.dataTypes}</p>
                    </div>
                  ))}
                </div>

                <div className="p-4 rounded-xl bg-gray-50/60 border border-gray-100 mt-4">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center shrink-0">
                      <Building className="w-4 h-4 text-gray-500" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-700 text-[13px]">Data Controller Information</p>
                      <p className="text-[12px] text-gray-400 mt-1">
                        ClearPath AI is the data controller for all processing described in this policy.
                        For privacy inquiries, contact us through our <a href="/contact" className="text-blue-500 hover:text-blue-400 font-medium">contact page</a>.
                        We use the Hugging Face Inference API for text classification. Hugging Face may process your text temporarily as part of their API service. We do not send personal identifiers to Hugging Face.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Section 11: International Data Transfers */}
        <section id="international-transfers" className="py-6">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="glass-card rounded-2xl p-6 md:p-8 shadow-premium"
            >
              <div className="flex items-start gap-4 mb-4">
                <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center shrink-0">
                  <Globe className="w-5 h-5 text-indigo-600" />
                </div>
                <div>
                  <span className="text-[11px] font-bold text-indigo-600 tracking-wider uppercase">Section 11</span>
                  <h2 className="text-xl font-extrabold text-gray-900 tracking-tight mt-0.5">International Data Transfers</h2>
                </div>
              </div>
              <div className="space-y-4 text-[15px] text-gray-500 leading-relaxed pl-0 md:pl-14">
                <p>
                  ClearPath AI&apos;s architecture minimizes international data transfer concerns. Here is how
                  cross-border data handling works in our system:
                </p>
                <div className="space-y-3">
                  {[
                    {
                      title: 'Countries where data may be processed',
                      description: 'Our application servers are hosted in the United States. The Hugging Face API (used for AI classification) may process queries in US-based data centers. 211.org resource queries are routed to their US-based servers. No other international transfers occur.',
                    },
                    {
                      title: 'Safeguards in place',
                      description: 'Guest session data is not stored, so the risk from international transfers is minimal for guests. For authenticated users, data is stored in an encrypted database. Query text is processed in real-time via the Hugging Face API. All data in transit is encrypted using TLS 1.3 regardless of destination.',
                    },
                    {
                      title: 'Standard contractual clauses',
                      description: 'Where our third-party service providers (Hugging Face) may process data outside the EEA, they operate under Standard Contractual Clauses (SCCs) approved by the European Commission. For guest sessions, all processing is ephemeral. For account data, we apply appropriate safeguards for cross-border transfers.',
                    },
                  ].map((item, i) => (
                    <div key={i} className="p-4 rounded-xl bg-gray-50/60 border border-gray-100">
                      <p className="font-semibold text-gray-800 text-[14px] mb-1">{item.title}</p>
                      <p className="text-[13px] text-gray-400 leading-relaxed">{item.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Section 12: Automated Decision-Making */}
        <section id="automated-decisions" className="py-6">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="glass-card rounded-2xl p-6 md:p-8 shadow-premium relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-violet-400 via-purple-400 to-violet-400" />
              <div className="flex items-start gap-4 mb-4">
                <div className="w-10 h-10 rounded-xl bg-violet-50 flex items-center justify-center shrink-0">
                  <Cpu className="w-5 h-5 text-violet-600" />
                </div>
                <div>
                  <span className="text-[11px] font-bold text-violet-600 tracking-wider uppercase">Section 12</span>
                  <h2 className="text-xl font-extrabold text-gray-900 tracking-tight mt-0.5">Automated Decision-Making</h2>
                </div>
              </div>
              <div className="space-y-4 text-[15px] text-gray-500 leading-relaxed pl-0 md:pl-14">
                <p>
                  ClearPath AI uses automated processing to classify your queries and present resource recommendations.
                  Under GDPR Article 22, you have specific rights regarding automated decision-making. Here is what
                  our system does and does not do:
                </p>
                <div className="space-y-3">
                  <div className="p-4 rounded-xl bg-gray-50/60 border border-gray-100">
                    <p className="font-semibold text-gray-800 text-[14px] mb-1">What automated decisions are made</p>
                    <ul className="space-y-1.5 mt-2">
                      {[
                        'Query classification into resource categories (e.g., housing, food assistance, mental health)',
                        'Confidence score calculation indicating the model\'s certainty about its classification',
                        'Crisis keyword detection triggering immediate emergency resource display',
                        'Clarification question generation when confidence is below 70%',
                      ].map((item, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-violet-400 mt-1.5 shrink-0" />
                          <span className="text-[13px] text-gray-400">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="p-4 rounded-xl bg-emerald-50/30 border border-emerald-100/40">
                    <p className="font-semibold text-gray-800 text-[14px] mb-1">Right to human review</p>
                    <p className="text-[13px] text-gray-400 leading-relaxed">
                      You always have the right to request human review of any AI-generated recommendation.
                      Our &ldquo;Talk to a Navigator&rdquo; button connects you to a trained 211.org professional
                      who can provide human-verified guidance. This is not a hidden option — it is prominently
                      displayed on every result and at every stage of the interaction.
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-amber-50/30 border border-amber-100/40">
                    <p className="font-semibold text-gray-800 text-[14px] mb-1">How to opt out of automated processing</p>
                    <p className="text-[13px] text-gray-400 leading-relaxed">
                      You can bypass AI classification entirely by contacting a 211 navigator directly. Call
                      2-1-1 or use the &ldquo;Talk to a Navigator&rdquo; button to speak with a human. You can
                      also simply close the browser tab — no automated decisions persist after your session ends.
                    </p>
                  </div>
                </div>
                <div className="p-4 rounded-xl bg-violet-50/30 border border-violet-100/40">
                  <div className="flex items-start gap-2">
                    <ShieldCheck className="w-4 h-4 text-violet-500 mt-0.5 shrink-0" />
                    <p className="text-[13px] text-violet-700">
                      <span className="font-semibold">Important:</span> Our automated decisions do not produce
                      legal effects or similarly significant effects on you. We recommend resources — we do not
                      determine eligibility, approve applications, or make decisions about your access to services.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Section 13: Data Retention Schedule */}
        <section id="retention" className="py-6">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="glass-card rounded-2xl p-6 md:p-8 shadow-premium"
            >
              <div className="flex items-start gap-4 mb-4">
                <div className="w-10 h-10 rounded-xl bg-teal-50 flex items-center justify-center shrink-0">
                  <Clock className="w-5 h-5 text-teal-600" />
                </div>
                <div>
                  <span className="text-[11px] font-bold text-teal-600 tracking-wider uppercase">Section 13</span>
                  <h2 className="text-xl font-extrabold text-gray-900 tracking-tight mt-0.5">Data Retention Schedule</h2>
                </div>
              </div>
              <div className="space-y-4 text-[15px] text-gray-500 leading-relaxed pl-0 md:pl-14">
                <p>
                  Our data retention is simple: <span className="font-semibold text-gray-700">we don&apos;t retain guest data; account data is kept only as long as needed</span>.
                  Here is the complete schedule showing what happens to each type of data:
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-gray-50/60 border-b border-gray-100/60">
                        <th className="text-left p-3 text-[11px] font-bold text-gray-400 uppercase tracking-wider">Data Type</th>
                        <th className="text-left p-3 text-[11px] font-bold text-gray-400 uppercase tracking-wider">Retention Period</th>
                        <th className="text-left p-3 text-[11px] font-bold text-gray-400 uppercase tracking-wider hidden sm:table-cell">Reason</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        { type: 'Query text (guest)', period: 'Session only (seconds)', reason: 'Processed in-memory for classification, discarded immediately after' },
                        { type: 'Query text (account)', period: 'Until account deletion', reason: 'Stored for conversation history and cross-session access in encrypted database' },
                        { type: 'Classification results (guest)', period: 'Session only (seconds)', reason: 'Displayed to user, then purged from memory' },
                        { type: 'Classification results (account)', period: 'Until account deletion', reason: 'Saved as part of conversation history for authenticated users' },
                        { type: 'Confidence scores', period: 'Session only (guest) / Until deletion (account)', reason: 'Guest sessions: never persisted. Accounts: saved with conversation history' },
                        { type: 'Crisis keyword matches', period: 'Not stored at all', reason: 'Detection triggers response, no record of detection is kept' },
                        { type: 'Location data (ZIP)', period: 'Session only (if provided)', reason: 'Opt-in only, used for resource filtering, cleared on session end' },
                        { type: 'Session metadata', period: 'Session only', reason: 'Browser session token, no personal identifiers, cleared on close' },
                        { type: 'Anonymous feedback', period: '1 year', reason: 'Thumbs up/down ratings used for system improvement, no user association' },
                        { type: 'Server logs', period: '7 days', reason: 'Standard error logging for debugging, no user query content logged' },
                        { type: 'API call metadata', period: 'Not stored', reason: 'Hugging Face API calls are stateless; no logs on our end' },
                        { type: 'Resource database cache', period: '24 hours', reason: 'Cached 211.org data for performance, contains no user information' },
                      ].map((row, i) => (
                        <tr key={i} className="border-b border-gray-50/60 last:border-b-0 hover:bg-white/40 transition-colors">
                          <td className="p-3"><span className="text-[13px] font-medium text-gray-900">{row.type}</span></td>
                          <td className="p-3"><span className="text-[12px] font-semibold text-emerald-600">{row.period}</span></td>
                          <td className="p-3 hidden sm:table-cell"><span className="text-[12px] text-gray-400">{row.reason}</span></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Section 14: Cookie Policy */}
        <section id="cookies" className="py-6">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="glass-card rounded-2xl p-6 md:p-8 shadow-premium"
            >
              <div className="flex items-start gap-4 mb-4">
                <div className="w-10 h-10 rounded-xl bg-orange-50 flex items-center justify-center shrink-0">
                  <Cookie className="w-5 h-5 text-orange-600" />
                </div>
                <div>
                  <span className="text-[11px] font-bold text-orange-600 tracking-wider uppercase">Section 14</span>
                  <h2 className="text-xl font-extrabold text-gray-900 tracking-tight mt-0.5">Cookie Policy</h2>
                </div>
              </div>
              <div className="space-y-4 text-[15px] text-gray-500 leading-relaxed pl-0 md:pl-14">
                <p>
                  ClearPath AI uses <span className="font-semibold text-gray-700">minimal cookies</span>. We do not
                  use cookies for advertising, tracking, or analytics. Here is the complete list:
                </p>

                {/* Essential Cookies */}
                <div>
                  <h4 className="text-[14px] font-bold text-gray-800 mb-3">Essential Cookies</h4>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="bg-gray-50/60 border-b border-gray-100/60">
                          <th className="text-left p-3 text-[11px] font-bold text-gray-400 uppercase tracking-wider">Cookie</th>
                          <th className="text-left p-3 text-[11px] font-bold text-gray-400 uppercase tracking-wider">Purpose</th>
                          <th className="text-left p-3 text-[11px] font-bold text-gray-400 uppercase tracking-wider hidden sm:table-cell">Duration</th>
                        </tr>
                      </thead>
                      <tbody>
                        {[
                          { name: 'session_id', purpose: 'Maintains your current browser session for conversation continuity', duration: 'Session (deleted on close)' },
                          { name: 'csrf_token', purpose: 'Protects against cross-site request forgery attacks', duration: 'Session (deleted on close)' },
                          { name: 'theme_preference', purpose: 'Stores your light/dark mode preference', duration: '1 year' },
                        ].map((cookie, i) => (
                          <tr key={i} className="border-b border-gray-50/60 last:border-b-0">
                            <td className="p-3"><code className="text-[12px] font-mono text-gray-700 bg-gray-50 px-1.5 py-0.5 rounded">{cookie.name}</code></td>
                            <td className="p-3"><span className="text-[12px] text-gray-400">{cookie.purpose}</span></td>
                            <td className="p-3 hidden sm:table-cell"><span className="text-[12px] text-gray-500 font-medium">{cookie.duration}</span></td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Analytics Cookies */}
                <div className="p-4 rounded-xl bg-emerald-50/30 border border-emerald-100/40">
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" />
                    <div>
                      <p className="font-semibold text-gray-800 text-[14px]">No Analytics Cookies</p>
                      <p className="text-[13px] text-gray-400 mt-0.5">
                        We do not use Google Analytics, Facebook Pixel, or any third-party analytics cookies.
                        We do not track your browsing behavior, page views, or interaction patterns across sessions.
                      </p>
                    </div>
                  </div>
                </div>

                {/* How to Manage */}
                <div className="p-4 rounded-xl bg-gray-50/60 border border-gray-100">
                  <p className="font-semibold text-gray-800 text-[14px] mb-2">How to manage cookies</p>
                  <p className="text-[13px] text-gray-400 leading-relaxed">
                    You can control cookies through your browser settings. Most browsers allow you to block
                    or delete cookies. However, blocking essential cookies may affect the functionality of
                    ClearPath AI (for example, your conversation context may not persist within a session).
                    Since we use so few cookies and none for tracking, we do not provide a separate cookie
                    consent banner — our essential cookies fall under the &ldquo;strictly necessary&rdquo; exemption
                    in most privacy regulations.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Section 15: Privacy by Design */}
        <section id="privacy-by-design" className="py-6">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="glass-card rounded-2xl p-6 md:p-8 shadow-premium relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400" />
              <div className="flex items-start gap-4 mb-4">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-5 h-5 text-emerald-600" />
                </div>
                <div>
                  <span className="text-[11px] font-bold text-emerald-600 tracking-wider uppercase">Section 15</span>
                  <h2 className="text-xl font-extrabold text-gray-900 tracking-tight mt-0.5">Privacy by Design</h2>
                </div>
              </div>
              <div className="space-y-4 text-[15px] text-gray-500 leading-relaxed pl-0 md:pl-14">
                <p>
                  Privacy by Design is not a feature we added — it is the foundation we built on. Our architecture
                  decisions were made with privacy as the primary constraint, not as a compliance afterthought.
                </p>

                {/* Architecture Decisions */}
                <div>
                  <h4 className="text-[14px] font-bold text-gray-800 mb-3">Architecture Decisions for Privacy</h4>
                  <div className="space-y-2.5">
                    {[
                      { decision: 'In-memory processing for guests', rationale: 'Guest sessions eliminate entire categories of data breach risk. You cannot exfiltrate data that was never stored.' },
                      { decision: 'Optional user accounts', rationale: 'Accounts are optional — guests can use the service with no identifiers. No personal data is retained between visits, and all processing is stateless.' },
                      { decision: 'Zero-shot classification', rationale: 'We use a pre-trained model without fine-tuning on user data. Your queries improve nothing about the model.' },
                      { decision: 'Session-based architecture', rationale: 'All state is ephemeral. When you close the tab, every trace of your interaction is gone from our servers. No data persists beyond the current session.' },
                      { decision: 'Opt-in location sharing', rationale: 'Location is never requested automatically. If you choose to share a ZIP code for better results, it stays in your session only.' },
                    ].map((item, i) => (
                      <div key={i} className="flex items-start gap-3 p-3 rounded-xl bg-gray-50/60 border border-gray-100">
                        <div className="w-5 h-5 rounded-full bg-emerald-50 flex items-center justify-center shrink-0 mt-0.5">
                          <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                        </div>
                        <div>
                          <p className="font-semibold text-gray-800 text-[13px]">{item.decision}</p>
                          <p className="text-[12px] text-gray-400 mt-0.5 leading-relaxed">{item.rationale}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Privacy Impact Assessment */}
                <div className="mt-4">
                  <h4 className="text-[14px] font-bold text-gray-800 mb-3">Privacy Impact Assessment Results</h4>
                  <div className="p-4 rounded-xl bg-emerald-50/30 border border-emerald-100/40">
                    <p className="text-[13px] text-gray-500 leading-relaxed">
                      We conducted a Privacy Impact Assessment (PIA) prior to launch. Key findings: (1) Guest sessions collect no personal
                      data; authenticated accounts collect minimal data; (2) In-memory processing for guests reduces
                      data breach risk; encrypted storage for accounts protects data at rest; (3) Crisis detection operates
                      without storing sensitive health information; (4) Hugging Face API processes text temporarily
                      as a data processor; we do not send personal identifiers; (5) Overall privacy risk rating: <span className="font-bold text-emerald-600">Low</span>.
                    </p>
                  </div>
                </div>

                {/* Technical Safeguards */}
                <div className="mt-4">
                  <h4 className="text-[14px] font-bold text-gray-800 mb-3">Technical Safeguards</h4>
                  <div className="grid sm:grid-cols-2 gap-3">
                    {[
                      { icon: Lock, title: 'TLS 1.3 Encryption', desc: 'All data in transit encrypted end-to-end', color: '#3b82f6' },
                      { icon: Cpu, title: 'In-Memory for Guests', desc: 'Guest sessions use RAM processing with no disk persistence', color: '#10b981' },
                      { icon: Shield, title: 'Input Sanitization', desc: 'All user inputs sanitized before processing', color: '#8b5cf6' },
                      { icon: Database, title: 'No Persistent Storage', desc: 'No user data is persistently stored; all sessions are ephemeral', color: '#f59e0b' },
                      { icon: Eye, title: 'No Tracking', desc: 'No analytics, pixels, or behavioral tracking', color: '#ef4444' },
                      { icon: UserCheck, title: 'Optional Accounts', desc: 'Guests need no identifiers; accounts are optional', color: '#06b6d4' },
                    ].map((safeguard) => {
                      const SIcon = safeguard.icon
                      return (
                        <div key={safeguard.title} className="flex items-start gap-3 p-3 rounded-xl bg-gray-50/60 border border-gray-100">
                          <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0" style={{ backgroundColor: `${safeguard.color}0d` }}>
                            <SIcon className="w-4 h-4" style={{ color: safeguard.color }} />
                          </div>
                          <div>
                            <p className="font-semibold text-gray-800 text-[13px]">{safeguard.title}</p>
                            <p className="text-[11px] text-gray-400 mt-0.5">{safeguard.desc}</p>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Section 16: Contact */}
        <section id="contact" className="py-6">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="glass-card rounded-2xl p-6 md:p-8 shadow-premium-lg text-center"
            >
              <div className="flex items-start gap-4 mb-4 justify-center">
                <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <span className="text-[11px] font-bold text-blue-600 tracking-wider uppercase">Section 16</span>
                  <h2 className="text-xl font-extrabold text-gray-900 tracking-tight mt-0.5">Contact Us</h2>
                </div>
              </div>
              <div className="space-y-4 text-[15px] text-gray-500 leading-relaxed max-w-lg mx-auto">
                <p>
                  If you have questions, concerns, or requests regarding this Privacy Policy
                  or your data, please reach out:
                </p>
                <div className="space-y-2">
                  <div className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-blue-50/60 border border-blue-100">
                    <Mail className="w-4 h-4 text-blue-500" />
                    <a
                      href="mailto:team@clearpath-ai.org"
                      className="text-[14px] font-semibold text-blue-600 hover:text-blue-500 transition-colors"
                    >
                      team@clearpath-ai.org
                    </a>
                  </div>
                  <div className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-emerald-50/60 border border-emerald-100">
                    <Shield className="w-4 h-4 text-emerald-500" />
                    <Link
                      href="/contact"
                      className="text-[14px] font-semibold text-emerald-600 hover:text-emerald-500 transition-colors"
                    >
                      Contact us for privacy inquiries
                    </Link>
                  </div>
                </div>
                <p className="text-[13px] text-gray-400 mt-4">
                  We aim to respond to all privacy-related inquiries within 48 hours. For GDPR-related
                  requests (data access, deletion, portability), we respond within 30 days as required by law.
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="glass-card rounded-2xl p-8 md:p-12 shadow-premium-lg text-center"
            >
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center mx-auto shadow-premium-xl mb-6">
                <Layers className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-gray-900">Privacy is a feature, not a trade-off</h2>
              <p className="text-[15px] text-gray-500 mt-4 max-w-lg mx-auto leading-relaxed">
                Experience AI that respects your privacy by default. Minimal data collection, optional accounts, no compromises.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-8">
                <Link
                  href="/app"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 text-[14px] font-semibold text-white rounded-xl bg-gradient-to-b from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 shadow-lg shadow-blue-500/20 hover:shadow-xl hover:shadow-blue-500/30 transition-all"
                >
                  Try the Demo
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/terms"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 text-[14px] font-semibold text-gray-700 rounded-xl border border-gray-200 bg-white/60 hover:bg-white hover:border-gray-300 hover:shadow-sm transition-all"
                >
                  Terms of Service
                </Link>
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
