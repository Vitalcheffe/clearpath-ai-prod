'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import {
  Layers,
  FileText,
  CheckCircle2,
  AlertTriangle,
  Shield,
  Phone,
  BarChart3,
  Scale,
  Code2,
  ArrowRight,
  Ban,
  BookOpen,
  RefreshCw,
  Mail,
  Heart,
  Users,
  Clock,
  Gavel,
  Handshake,
  Zap,
  Database,
  Accessibility,
  Globe,
  ShieldCheck,
  Server,
  UserCheck,
  FileCheck,
  Eye,
  Lock,
} from 'lucide-react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { useI18n } from '@/i18n'

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
}

const sections = [
  { id: 'acceptance', number: 1, title: 'Acceptance of Terms', icon: FileText },
  { id: 'description', number: 2, title: 'Description of Service', icon: Layers },
  { id: 'not-professional-advice', number: 3, title: 'Not Professional Advice', icon: Shield },
  { id: 'crisis-situations', number: 4, title: 'Crisis Situations', icon: Phone },
  { id: 'accuracy-disclaimer', number: 5, title: 'Accuracy Disclaimer', icon: BarChart3 },
  { id: 'user-conduct', number: 6, title: 'User Conduct', icon: Ban },
  { id: 'intellectual-property', number: 7, title: 'Intellectual Property', icon: Code2 },
  { id: 'limitation-of-liability', number: 8, title: 'Limitation of Liability', icon: Scale },
  { id: 'dispute-resolution', number: 9, title: 'Dispute Resolution', icon: Gavel },
  { id: 'indemnification', number: 10, title: 'Indemnification', icon: Handshake },
  { id: 'sla', number: 11, title: 'Service Level Agreement', icon: Zap },
  { id: 'open-source', number: 12, title: 'Open Source Components', icon: Code2 },
  { id: 'dpa', number: 13, title: 'Data Processing Addendum', icon: Database },
  { id: 'accessibility', number: 14, title: 'Accessibility Statement', icon: Accessibility },
  { id: 'modifications', number: 15, title: 'Modifications to Terms', icon: RefreshCw },
  { id: 'contact-info', number: 16, title: 'Contact Information', icon: Mail },
]

export default function TermsPage() {
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
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-[12px] font-semibold bg-blue-50/80 text-blue-700 border border-blue-100/60 mb-6"
              >
                <FileText className="w-3.5 h-3.5" />
                Legal agreement
              </motion.div>
              <motion.h1
                variants={fadeInUp}
                className="text-4xl sm:text-5xl font-extrabold tracking-tight text-gray-900 leading-tight"
              >
                {isFr ? "Conditions d'utilisation" : 'Terms of Service'}
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
                  ? "En utilisant ClearPath AI, vous acceptez ces conditions. Veuillez les lire attentivement — elles sont rédigées en langage clair volontairement."
                  : "By using ClearPath AI, you agree to these terms. Please read them carefully — they're written in plain language on purpose."}
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
                  <BookOpen className="w-4 h-4 text-white" />
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

        {/* Section 1: Acceptance of Terms */}
        <section id="acceptance" className="py-6">
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
                  <FileText className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <span className="text-[11px] font-bold text-blue-600 tracking-wider uppercase">Section 1</span>
                  <h2 className="text-xl font-extrabold text-gray-900 tracking-tight mt-0.5">Acceptance of Terms</h2>
                </div>
              </div>
              <div className="space-y-4 text-[15px] text-gray-500 leading-relaxed pl-0 md:pl-14">
                <p>
                  By accessing or using ClearPath AI (&ldquo;the Service&rdquo;), you agree to be bound by these
                  Terms of Service (&ldquo;Terms&rdquo;). If you do not agree to these Terms, please do not use
                  the Service.
                </p>
                <p>
                  These Terms constitute a legally binding agreement between you and ClearPath AI.
                  We&apos;ve written them in plain language because we believe you should understand what
                  you&apos;re agreeing to — not just click &ldquo;I agree&rdquo; on legal jargon.
                </p>
                <p>
                  Your continued use of the Service following the posting of any changes to these Terms
                  constitutes acceptance of those changes.
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Section 2: Description of Service */}
        <section id="description" className="py-6">
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
                  <Layers className="w-5 h-5 text-emerald-600" />
                </div>
                <div>
                  <span className="text-[11px] font-bold text-emerald-600 tracking-wider uppercase">Section 2</span>
                  <h2 className="text-xl font-extrabold text-gray-900 tracking-tight mt-0.5">Description of Service</h2>
                </div>
              </div>
              <div className="space-y-4 text-[15px] text-gray-500 leading-relaxed pl-0 md:pl-14">
                <p>
                  ClearPath AI is an <span className="font-semibold text-gray-700">AI-powered community resource
                  navigator</span> designed to help people find relevant social services and community resources
                  in their area.
                </p>
                <div className="space-y-3">
                  {[
                    {
                      title: 'What it does',
                      desc: 'Classifies your needs using AI (BART-large-MNLI), searches verified resource databases (211.org), and presents results with confidence scores so you can make informed decisions.',
                    },
                    {
                      title: 'What it doesn\'t do',
                      desc: 'It does not provide professional advice, diagnose conditions, make decisions for you, or replace human professionals. It suggests — never prescribes.',
                    },
                    {
                      title: 'How it works',
                      desc: 'Your input is processed in-memory through a 6-layer architecture: Input → Crisis Detection → Classification → Confidence Scoring → Display → Human Escalation. Nothing is stored.',
                    },
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-3 p-4 rounded-xl bg-gray-50/60 border border-gray-100">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" />
                      <div>
                        <p className="font-semibold text-gray-800 text-[14px]">{item.title}</p>
                        <p className="text-[13px] text-gray-400 mt-0.5">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Section 3: Not Professional Advice — Emphasized */}
        <section id="not-professional-advice" className="py-6">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="glass-card rounded-2xl p-6 md:p-8 shadow-premium-lg border-2 border-amber-100/60 relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-400 via-orange-400 to-amber-400" />
              <div className="flex items-start gap-4 mb-4">
                <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center shrink-0">
                  <Shield className="w-5 h-5 text-amber-600" />
                </div>
                <div>
                  <span className="text-[11px] font-bold text-amber-600 tracking-wider uppercase">Section 3</span>
                  <h2 className="text-xl font-extrabold text-gray-900 tracking-tight mt-0.5">Not Professional Advice</h2>
                </div>
              </div>
              <div className="space-y-4 text-[15px] text-gray-500 leading-relaxed pl-0 md:pl-14">
                <div className="p-5 rounded-xl bg-amber-50/50 border border-amber-100">
                  <p className="text-xl sm:text-2xl font-black text-amber-700 tracking-tight">
                    ClearPath AI suggests. It never advises.
                  </p>
                </div>
                <p>
                  The information provided by ClearPath AI is for <span className="font-semibold text-gray-700">informational
                  purposes only</span> and should not be considered:
                </p>
                <ul className="space-y-2.5">
                  {[
                    'Medical or health advice — consult a healthcare professional',
                    'Legal advice — consult an attorney',
                    'Financial advice — consult a financial advisor',
                    'Crisis counseling — contact a licensed counselor or crisis line',
                    'A substitute for professional judgment in any field',
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="w-5 h-5 rounded-full bg-amber-100 flex items-center justify-center shrink-0 mt-0.5">
                        <AlertTriangle className="w-3 h-3 text-amber-600" />
                      </span>
                      <span className="text-[14px]">{item}</span>
                    </li>
                  ))}
                </ul>
                <p>
                  Always verify resource information independently before taking action. Resource availability
                  and eligibility requirements may change.
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Section 4: Crisis Situations — Emphasized */}
        <section id="crisis-situations" className="py-6">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="glass-card rounded-2xl p-6 md:p-8 shadow-premium-lg border-2 border-red-100/60 relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-red-400 via-red-500 to-red-400" />
              <div className="flex items-start gap-4 mb-4">
                <div className="w-10 h-10 rounded-xl bg-red-50 flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5 text-red-600" />
                </div>
                <div>
                  <span className="text-[11px] font-bold text-red-600 tracking-wider uppercase">Section 4</span>
                  <h2 className="text-xl font-extrabold text-gray-900 tracking-tight mt-0.5">Crisis Situations</h2>
                </div>
              </div>
              <div className="space-y-4 text-[15px] text-gray-500 leading-relaxed pl-0 md:pl-14">
                <div className="p-5 rounded-xl bg-red-50/50 border border-red-100">
                  <div className="flex items-center gap-2 mb-2">
                    <Phone className="w-5 h-5 text-red-600" />
                    <p className="text-xl sm:text-2xl font-black text-red-700 tracking-tight">
                      In an emergency, always call 911.
                    </p>
                  </div>
                  <p className="text-[14px] text-red-600/70 mt-1">
                    AI is never a substitute for emergency services.
                  </p>
                </div>
                <p>
                  While ClearPath AI includes crisis detection to surface emergency resources, it is
                  <span className="font-semibold text-gray-700"> NOT a crisis intervention service</span>.
                  It cannot:
                </p>
                <ul className="space-y-2.5">
                  {[
                    'Provide real-time crisis counseling',
                    'Guarantee immediate response from emergency services',
                    'Replace trained crisis counselors or hotlines',
                    'Assess the severity of a crisis with certainty',
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="w-5 h-5 rounded-full bg-red-50 flex items-center justify-center shrink-0 mt-0.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
                      </span>
                      <span className="text-[14px]">{item}</span>
                    </li>
                  ))}
                </ul>
                <div className="grid sm:grid-cols-2 gap-3 mt-4">
                  <div className="p-3 rounded-xl bg-red-50/40 border border-red-100/60 text-center">
                    <p className="text-[11px] font-bold text-red-500 uppercase tracking-wider">Emergency</p>
                    <p className="text-2xl font-black text-red-700 mt-1">911</p>
                  </div>
                  <div className="p-3 rounded-xl bg-red-50/40 border border-red-100/60 text-center">
                    <p className="text-[11px] font-bold text-red-500 uppercase tracking-wider">Suicide & Crisis Lifeline</p>
                    <p className="text-2xl font-black text-red-700 mt-1">988</p>
                  </div>
                </div>
                <p className="text-[13px] text-gray-400 mt-2">
                  If you or someone you know is in crisis, please contact these services directly.
                  Do not wait for an AI response.
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Section 5: Accuracy Disclaimer */}
        <section id="accuracy-disclaimer" className="py-6">
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
                  <BarChart3 className="w-5 h-5 text-violet-600" />
                </div>
                <div>
                  <span className="text-[11px] font-bold text-violet-600 tracking-wider uppercase">Section 5</span>
                  <h2 className="text-xl font-extrabold text-gray-900 tracking-tight mt-0.5">Accuracy Disclaimer</h2>
                </div>
              </div>
              <div className="space-y-4 text-[15px] text-gray-500 leading-relaxed pl-0 md:pl-14">
                <p>
                  ClearPath AI displays <span className="font-semibold text-gray-700">confidence scores</span> with
                  every result. These scores represent how certain the AI is about its classification —
                  <span className="font-semibold text-gray-700"> not guarantees of accuracy</span>.
                </p>
                <div className="grid grid-cols-3 gap-3 my-4">
                  {[
                    { label: 'High', range: '80-100%', color: '#10b981', bg: '#ecfdf5' },
                    { label: 'Medium', range: '50-79%', color: '#f59e0b', bg: '#fffbeb' },
                    { label: 'Low', range: '0-49%', color: '#ef4444', bg: '#fef2f2' },
                  ].map((tier) => (
                    <div key={tier.label} className="p-3 rounded-xl text-center border" style={{ backgroundColor: tier.bg, borderColor: `${tier.color}20` }}>
                      <p className="text-[11px] font-bold uppercase tracking-wider" style={{ color: tier.color }}>{tier.label}</p>
                      <p className="text-[16px] font-black mt-1" style={{ color: tier.color }}>{tier.range}</p>
                    </div>
                  ))}
                </div>
                <p>
                  A high confidence score means the AI is certain of its classification, not that the
                  underlying resource data is correct. Resource availability, eligibility requirements,
                  and contact information may change without our knowledge.
                </p>
                <div className="p-4 rounded-xl bg-violet-50/30 border border-violet-100/60">
                  <div className="flex items-start gap-2">
                    <BarChart3 className="w-4 h-4 text-violet-500 mt-0.5 shrink-0" />
                    <p className="text-[13px] text-violet-700">
                      <span className="font-semibold">Always verify</span> resource information independently
                      before relying on it. Use our results as a starting point, not a final answer.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Section 6: User Conduct */}
        <section id="user-conduct" className="py-6">
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
                  <Ban className="w-5 h-5 text-orange-600" />
                </div>
                <div>
                  <span className="text-[11px] font-bold text-orange-600 tracking-wider uppercase">Section 6</span>
                  <h2 className="text-xl font-extrabold text-gray-900 tracking-tight mt-0.5">User Conduct</h2>
                </div>
              </div>
              <div className="space-y-4 text-[15px] text-gray-500 leading-relaxed pl-0 md:pl-14">
                <p>
                  By using ClearPath AI, you agree not to:
                </p>
                <ul className="space-y-2.5">
                  {[
                    {
                      title: 'Abuse the service',
                      desc: 'Do not submit malicious, harmful, or deliberately misleading content designed to exploit or break the system.',
                    },
                    {
                      title: 'Game the system',
                      desc: 'Do not attempt to manipulate confidence scores, circumvent crisis detection, or exploit the service for purposes other than finding community resources.',
                    },
                    {
                      title: 'Impersonate others',
                      desc: 'Do not use the service while misrepresenting your identity or situation in a way that could harm others.',
                    },
                    {
                      title: 'Reverse engineer',
                      desc: 'Do not attempt to reverse engineer, decompile, or extract the AI model or resource database.',
                    },
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3 p-4 rounded-xl bg-orange-50/20 border border-orange-100/40">
                      <Ban className="w-4 h-4 text-orange-400 mt-0.5 shrink-0" />
                      <div>
                        <p className="font-semibold text-gray-800 text-[14px]">{item.title}</p>
                        <p className="text-[13px] text-gray-400 mt-0.5">{item.desc}</p>
                      </div>
                    </li>
                  ))}
                </ul>
                <p>
                  Violation of these conduct rules may result in access being restricted without notice.
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Section 7: Intellectual Property */}
        <section id="intellectual-property" className="py-6">
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
                  <Code2 className="w-5 h-5 text-cyan-600" />
                </div>
                <div>
                  <span className="text-[11px] font-bold text-cyan-600 tracking-wider uppercase">Section 7</span>
                  <h2 className="text-xl font-extrabold text-gray-900 tracking-tight mt-0.5">Intellectual Property</h2>
                </div>
              </div>
              <div className="space-y-4 text-[15px] text-gray-500 leading-relaxed pl-0 md:pl-14">
                <p>
                  ClearPath AI is developed as part of the <span className="font-semibold text-gray-700">USAII
                  Global AI Hackathon 2026</span> and is open source.
                </p>
                <div className="space-y-3">
                  <div className="flex items-start gap-3 p-4 rounded-xl bg-gray-50/60 border border-gray-100">
                    <Code2 className="w-4 h-4 text-cyan-500 mt-0.5 shrink-0" />
                    <div>
                      <p className="font-semibold text-gray-800 text-[14px]">Open source for hackathon</p>
                      <p className="text-[13px] text-gray-400 mt-0.5">
                        The source code is available for review and educational purposes as part of
                        the hackathon submission. We believe in transparency — you can see exactly
                        how our service works.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-4 rounded-xl bg-gray-50/60 border border-gray-100">
                    <Users className="w-4 h-4 text-cyan-500 mt-0.5 shrink-0" />
                    <div>
                      <p className="font-semibold text-gray-800 text-[14px]">Third-party resources</p>
                      <p className="text-[13px] text-gray-400 mt-0.5">
                        Resource data from 211.org and AI models from Hugging Face are subject to
                        their respective licenses and terms of use. ClearPath AI does not claim
                        ownership of third-party data.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Section 8: Limitation of Liability */}
        <section id="limitation-of-liability" className="py-6">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="glass-card rounded-2xl p-6 md:p-8 shadow-premium"
            >
              <div className="flex items-start gap-4 mb-4">
                <div className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center shrink-0">
                  <Scale className="w-5 h-5 text-gray-600" />
                </div>
                <div>
                  <span className="text-[11px] font-bold text-gray-600 tracking-wider uppercase">Section 8</span>
                  <h2 className="text-xl font-extrabold text-gray-900 tracking-tight mt-0.5">Limitation of Liability</h2>
                </div>
              </div>
              <div className="space-y-4 text-[15px] text-gray-500 leading-relaxed pl-0 md:pl-14">
                <p>
                  ClearPath AI is provided <span className="font-semibold text-gray-700">&ldquo;as is&rdquo; and
                  &ldquo;as available&rdquo;</span> without warranties of any kind, either express or implied.
                </p>
                <p>
                  To the fullest extent permitted by law, ClearPath AI and its team shall not be liable for:
                </p>
                <ul className="space-y-2.5">
                  {[
                    'Any inaccuracies in resource information or classification results',
                    'Any decisions made based on information provided by the Service',
                    'Any failure of crisis detection to identify a crisis situation',
                    'Any harm resulting from reliance on AI-generated suggestions',
                    'Any interruption, errors, or bugs in the Service',
                    'Any third-party resource being unavailable, incorrect, or harmful',
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="w-5 h-5 rounded-full bg-gray-100 flex items-center justify-center shrink-0 mt-0.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-gray-400" />
                      </span>
                      <span className="text-[14px]">{item}</span>
                    </li>
                  ))}
                </ul>
                <div className="p-4 rounded-xl bg-gray-50/60 border border-gray-100 mt-2">
                  <div className="flex items-start gap-2">
                    <Heart className="w-4 h-4 text-gray-400 mt-0.5 shrink-0" />
                    <p className="text-[13px] text-gray-500">
                      We built ClearPath AI to help people. But we&apos;re students at a hackathon, not
                      a professional services firm. Our service is a tool — use it wisely, verify
                      independently, and always seek professional help when needed.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Section 9: Dispute Resolution */}
        <section id="dispute-resolution" className="py-6">
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
                  <Gavel className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <span className="text-[11px] font-bold text-blue-600 tracking-wider uppercase">Section 9</span>
                  <h2 className="text-xl font-extrabold text-gray-900 tracking-tight mt-0.5">Dispute Resolution</h2>
                </div>
              </div>
              <div className="space-y-4 text-[15px] text-gray-500 leading-relaxed pl-0 md:pl-14">
                <p>
                  We prefer to resolve disputes informally and quickly. Here is our tiered approach to
                  resolving any disagreements:
                </p>
                <div className="space-y-3">
                  <div className="p-4 rounded-xl bg-blue-50/20 border border-blue-100/40">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-6 h-6 rounded-md bg-blue-100 flex items-center justify-center">
                        <span className="text-[10px] font-bold text-blue-600">1</span>
                      </div>
                      <p className="font-semibold text-gray-800 text-[14px]">Informal Resolution</p>
                    </div>
                    <p className="text-[13px] text-gray-500 leading-relaxed">
                      Before filing any formal claim, you agree to first contact us at{' '}
                      <a href="mailto:legal@clearpath-ai.org" className="text-blue-600 hover:text-blue-500 font-medium">legal@clearpath-ai.org</a>{' '}
                      with a detailed description of the dispute. We will attempt to resolve the issue
                      within 30 days. Most issues can be resolved through direct communication, and we
                      commit to taking every concern seriously.
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-blue-50/20 border border-blue-100/40">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-6 h-6 rounded-md bg-blue-100 flex items-center justify-center">
                        <span className="text-[10px] font-bold text-blue-600">2</span>
                      </div>
                      <p className="font-semibold text-gray-800 text-[14px]">Mediation</p>
                    </div>
                    <p className="text-[13px] text-gray-500 leading-relaxed">
                      If informal resolution fails, either party may request mediation through a mutually
                      agreed-upon mediator. We will split the cost of mediation equally. Mediation is
                      confidential, non-binding, and designed to find a mutually acceptable solution
                      without the expense and formality of arbitration or litigation.
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-blue-50/20 border border-blue-100/40">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-6 h-6 rounded-md bg-blue-100 flex items-center justify-center">
                        <span className="text-[10px] font-bold text-blue-600">3</span>
                      </div>
                      <p className="font-semibold text-gray-800 text-[14px]">Binding Arbitration</p>
                    </div>
                    <p className="text-[13px] text-gray-500 leading-relaxed">
                      If mediation is unsuccessful, disputes will be resolved by binding arbitration
                      administered by the American Arbitration Association (AAA) under its Consumer
                      Arbitration Rules. The arbitration will be conducted in English, and the
                      arbitrator&apos;s decision will be final and binding. You retain the right to
                      seek relief in small claims court as an alternative to arbitration.
                    </p>
                  </div>
                </div>
                <div className="p-4 rounded-xl bg-gray-50/60 border border-gray-100 mt-2">
                  <p className="text-[13px] text-gray-500">
                    <span className="font-semibold text-gray-700">Governing Law:</span> These Terms and any disputes
                    arising from them are governed by the laws of the State of Texas, United States,
                    without regard to conflict of law principles. For any claims not subject to arbitration,
                    you consent to the exclusive jurisdiction of the state and federal courts located in
                    Houston, Texas.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Section 10: Indemnification */}
        <section id="indemnification" className="py-6">
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
                  <Handshake className="w-5 h-5 text-teal-600" />
                </div>
                <div>
                  <span className="text-[11px] font-bold text-teal-600 tracking-wider uppercase">Section 10</span>
                  <h2 className="text-xl font-extrabold text-gray-900 tracking-tight mt-0.5">Indemnification</h2>
                </div>
              </div>
              <div className="space-y-4 text-[15px] text-gray-500 leading-relaxed pl-0 md:pl-14">
                <div className="space-y-3">
                  <div className="p-4 rounded-xl bg-gray-50/60 border border-gray-100">
                    <p className="font-semibold text-gray-800 text-[14px] mb-1">User Indemnification of ClearPath AI</p>
                    <p className="text-[13px] text-gray-400 leading-relaxed">
                      You agree to indemnify, defend, and hold harmless ClearPath AI and its team members,
                      affiliates, and agents from and against any claims, liabilities, damages, losses,
                      and expenses (including reasonable attorneys&apos; fees) arising out of or in any way
                      connected with: (a) your violation of these Terms, (b) your misuse of the Service,
                      (c) your violation of any applicable law or regulation, or (d) your submission of
                      content that infringes or violates any third-party rights.
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-gray-50/60 border border-gray-100">
                    <p className="font-semibold text-gray-800 text-[14px] mb-1">ClearPath AI Indemnification of Users</p>
                    <p className="text-[13px] text-gray-400 leading-relaxed">
                      ClearPath AI will indemnify you against any third-party claim that the Service (as
                      provided, unmodified) directly infringes a valid patent, copyright, or trademark.
                      This indemnification is conditioned on you providing prompt written notice of the claim,
                      granting us control of the defense, and cooperating reasonably in the defense.
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-amber-50/30 border border-amber-100/40">
                    <p className="font-semibold text-gray-800 text-[14px] mb-1">Exceptions and Limitations</p>
                    <p className="text-[13px] text-gray-400 leading-relaxed">
                      Neither party&apos;s indemnification obligation applies to claims arising from: (a) modifications
                      of the Service not made by the indemnifying party; (b) combination of the Service with
                      third-party products or services; (c) use of the Service in a manner not permitted by these
                      Terms; or (d) failure to implement updates or fixes provided by ClearPath AI. Our total
                      indemnification liability shall not exceed $100 USD.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Section 11: Service Level Agreement */}
        <section id="sla" className="py-6">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="glass-card rounded-2xl p-6 md:p-8 shadow-premium relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-400 via-orange-400 to-amber-400" />
              <div className="flex items-start gap-4 mb-4">
                <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center shrink-0">
                  <Zap className="w-5 h-5 text-amber-600" />
                </div>
                <div>
                  <span className="text-[11px] font-bold text-amber-600 tracking-wider uppercase">Section 11</span>
                  <h2 className="text-xl font-extrabold text-gray-900 tracking-tight mt-0.5">Service Level Agreement</h2>
                </div>
              </div>
              <div className="space-y-4 text-[15px] text-gray-500 leading-relaxed pl-0 md:pl-14">
                <p>
                  For enterprise users, ClearPath AI provides the following service level commitments:
                </p>
                <div className="grid sm:grid-cols-3 gap-3 my-4">
                  {[
                    { label: 'Uptime Guarantee', value: '99.9%', desc: 'Measured monthly, excluding scheduled maintenance', color: '#10b981' },
                    { label: 'Response Time', value: '<2s', desc: '95th percentile for classification requests', color: '#3b82f6' },
                    { label: 'Crisis Response', value: '100%', desc: 'Crisis detection must always function', color: '#ef4444' },
                  ].map((item) => (
                    <div key={item.label} className="p-4 rounded-xl text-center border bg-gray-50/60 border-gray-100">
                      <p className="text-[20px] font-black" style={{ color: item.color }}>{item.value}</p>
                      <p className="font-semibold text-gray-800 text-[13px] mt-1">{item.label}</p>
                      <p className="text-[11px] text-gray-400 mt-0.5">{item.desc}</p>
                    </div>
                  ))}
                </div>
                <div className="space-y-3">
                  <div className="p-4 rounded-xl bg-gray-50/60 border border-gray-100">
                    <p className="font-semibold text-gray-800 text-[14px] mb-1">Credit for Downtime</p>
                    <p className="text-[13px] text-gray-400 leading-relaxed">
                      If uptime falls below 99.9% in a calendar month, enterprise customers are entitled to a
                      service credit equal to 10x the duration of unplanned downtime applied to their next
                      billing cycle. For example, 1 hour of downtime results in 10 hours of credit. Credits
                      are the sole remedy for SLA violations and must be requested within 30 days.
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-gray-50/60 border border-gray-100">
                    <p className="font-semibold text-gray-800 text-[14px] mb-1">SLA Exclusions</p>
                    <p className="text-[13px] text-gray-400 leading-relaxed">
                      Scheduled maintenance windows (announced 48 hours in advance), force majeure events,
                      internet backbone failures, issues caused by third-party API providers (Hugging Face,
                      211.org), and issues resulting from customer&apos;s own infrastructure or configuration
                      are excluded from SLA calculations.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Section 12: Open Source Components */}
        <section id="open-source" className="py-6">
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
                  <Code2 className="w-5 h-5 text-violet-600" />
                </div>
                <div>
                  <span className="text-[11px] font-bold text-violet-600 tracking-wider uppercase">Section 12</span>
                  <h2 className="text-xl font-extrabold text-gray-900 tracking-tight mt-0.5">Open Source Components</h2>
                </div>
              </div>
              <div className="space-y-4 text-[15px] text-gray-500 leading-relaxed pl-0 md:pl-14">
                <p>
                  ClearPath AI is built on open source software. We acknowledge and comply with the
                  licenses of all third-party components. Here is a summary of key dependencies:
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-gray-50/60 border-b border-gray-100/60">
                        <th className="text-left p-3 text-[11px] font-bold text-gray-400 uppercase tracking-wider">Component</th>
                        <th className="text-left p-3 text-[11px] font-bold text-gray-400 uppercase tracking-wider">License</th>
                        <th className="text-left p-3 text-[11px] font-bold text-gray-400 uppercase tracking-wider hidden sm:table-cell">Purpose</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        { component: 'Next.js', license: 'MIT', purpose: 'Web application framework' },
                        { component: 'React', license: 'MIT', purpose: 'UI component library' },
                        { component: 'Tailwind CSS', license: 'MIT', purpose: 'Utility-first CSS framework' },
                        { component: 'BART-large-MNLI (via Hugging Face)', license: 'Apache 2.0', purpose: 'Zero-shot text classification model' },
                        { component: 'Framer Motion', license: 'MIT', purpose: 'Animation library' },
                        { component: 'Lucide React', license: 'ISC', purpose: 'Icon library' },
                        { component: 'TypeScript', license: 'Apache 2.0', purpose: 'Programming language' },
                        { component: 'Node.js', license: 'MIT', purpose: 'Server runtime' },
                      ].map((row, i) => (
                        <tr key={i} className="border-b border-gray-50/60 last:border-b-0 hover:bg-white/40 transition-colors">
                          <td className="p-3"><span className="text-[13px] font-medium text-gray-900">{row.component}</span></td>
                          <td className="p-3"><span className="inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-semibold bg-emerald-50 text-emerald-600 border border-emerald-100/60">{row.license}</span></td>
                          <td className="p-3 hidden sm:table-cell"><span className="text-[12px] text-gray-400">{row.purpose}</span></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p className="text-[13px] text-gray-400">
                  All open source components are used in accordance with their respective license terms.
                  No modifications have been made that would alter the licensing obligations. Full license
                  texts are available in our GitHub repository.
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Section 13: Data Processing Addendum */}
        <section id="dpa" className="py-6">
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
                  <Database className="w-5 h-5 text-emerald-600" />
                </div>
                <div>
                  <span className="text-[11px] font-bold text-emerald-600 tracking-wider uppercase">Section 13</span>
                  <h2 className="text-xl font-extrabold text-gray-900 tracking-tight mt-0.5">Data Processing Addendum</h2>
                </div>
              </div>
              <div className="space-y-4 text-[15px] text-gray-500 leading-relaxed pl-0 md:pl-14">
                <p>
                  This Data Processing Addendum (&ldquo;DPA&rdquo;) supplements the Terms of Service and forms part
                  of the agreement between you and ClearPath AI regarding the processing of personal data.
                </p>
                <div className="space-y-3">
                  <div className="p-4 rounded-xl bg-gray-50/60 border border-gray-100">
                    <div className="flex items-center gap-2 mb-2">
                      <Server className="w-4 h-4 text-emerald-500" />
                      <p className="font-semibold text-gray-800 text-[14px]">Data Processor Responsibilities</p>
                    </div>
                    <p className="text-[13px] text-gray-400 leading-relaxed">
                      ClearPath AI acts as both data controller and processor. As a processor, we: (a) process
                      data only as necessary to provide the Service; (b) do not process data for any secondary
                      purpose; (c) implement appropriate technical and organizational security measures; (d)
                      ensure that all personnel with access to data are bound by confidentiality obligations;
                      (e) assist in responding to data subject requests where technically feasible.
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-gray-50/60 border border-gray-100">
                    <div className="flex items-center gap-2 mb-2">
                      <Users className="w-4 h-4 text-emerald-500" />
                      <p className="font-semibold text-gray-800 text-[14px]">Subprocessor List</p>
                    </div>
                    <p className="text-[13px] text-gray-400 leading-relaxed">
                      ClearPath AI uses the following subprocessors: (1) Hugging Face, Inc. — AI model inference
                      (classification API), US-based processing; (2) Vercel, Inc. — Application hosting and
                      deployment, US-based processing. No other subprocessors are engaged. We will notify you
                      of any changes to subprocessors with 30 days&apos; advance notice.
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-gray-50/60 border border-gray-100">
                    <div className="flex items-center gap-2 mb-2">
                      <AlertTriangle className="w-4 h-4 text-amber-500" />
                      <p className="font-semibold text-gray-800 text-[14px]">Data Breach Notification</p>
                    </div>
                    <p className="text-[13px] text-gray-400 leading-relaxed">
                      In the unlikely event of a personal data breach, ClearPath AI will notify affected users
                      and relevant supervisory authorities within 72 hours of becoming aware of the breach, as
                      required by GDPR Article 33. However, given our zero-storage architecture, the risk of
                      a data breach involving personal data is extremely low — you cannot breach what was never
                      stored.
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-gray-50/60 border border-gray-100">
                    <div className="flex items-center gap-2 mb-2">
                      <Eye className="w-4 h-4 text-emerald-500" />
                      <p className="font-semibold text-gray-800 text-[14px]">Audit Rights</p>
                    </div>
                    <p className="text-[13px] text-gray-400 leading-relaxed">
                      Enterprise users may conduct audits of our data processing practices, subject to reasonable
                      notice (30 days) and confidentiality requirements. Our open-source codebase provides
                      continuous transparency — you can review our data handling code at any time without a
                      formal audit. We also engage independent third-party security assessments annually.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Section 14: Accessibility Statement */}
        <section id="accessibility" className="py-6">
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
                  <Accessibility className="w-5 h-5 text-pink-600" />
                </div>
                <div>
                  <span className="text-[11px] font-bold text-pink-600 tracking-wider uppercase">Section 14</span>
                  <h2 className="text-xl font-extrabold text-gray-900 tracking-tight mt-0.5">Accessibility Statement</h2>
                </div>
              </div>
              <div className="space-y-4 text-[15px] text-gray-500 leading-relaxed pl-0 md:pl-14">
                <p>
                  ClearPath AI is committed to ensuring digital accessibility for people with disabilities.
                  We believe that community resources should be accessible to everyone, including those
                  who rely on assistive technologies.
                </p>
                <div className="space-y-3">
                  <div className="p-4 rounded-xl bg-gray-50/60 border border-gray-100">
                    <div className="flex items-center gap-2 mb-2">
                      <ShieldCheck className="w-4 h-4 text-emerald-500" />
                      <p className="font-semibold text-gray-800 text-[14px]">WCAG Compliance Level</p>
                    </div>
                    <p className="text-[13px] text-gray-400 leading-relaxed">
                      We aim to conform to the Web Content Accessibility Guidelines (WCAG) 2.1 Level AA.
                      Our interface is designed with semantic HTML, ARIA labels, keyboard navigation support,
                      and sufficient color contrast ratios. Confidence badges use both color and text labels
                      (not color alone) to ensure accessibility for users with color vision deficiencies.
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-amber-50/30 border border-amber-100/40">
                    <div className="flex items-center gap-2 mb-2">
                      <AlertTriangle className="w-4 h-4 text-amber-500" />
                      <p className="font-semibold text-gray-800 text-[14px]">Known Accessibility Limitations</p>
                    </div>
                    <ul className="space-y-1.5 mt-2">
                      {[
                        'Some interactive animations may not respect prefers-reduced-motion settings in all browsers',
                        'Crisis detection animations (pulsing elements) may be distracting for some users',
                        'Third-party resource links may not meet our accessibility standards',
                        'Screen reader support for real-time confidence score updates needs improvement',
                        'Mobile touch targets on some interactive elements may be smaller than 44px in certain views',
                      ].map((item, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-1.5 shrink-0" />
                          <span className="text-[13px] text-gray-400">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="p-4 rounded-xl bg-gray-50/60 border border-gray-100">
                    <p className="font-semibold text-gray-800 text-[14px] mb-1">Remediation Timeline</p>
                    <p className="text-[13px] text-gray-400 leading-relaxed">
                      Honest status: we are two high school students who built this for a hackathon in June 2026. We have not yet committed to specific remediation dates for prefers-reduced-motion support, screen reader compatibility, or WCAG 2.1 AA conformance. We know these matter. If ClearPath AI becomes a real product after the hackathon, accessibility will be a priority. For now, we cannot promise specific dates.
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-blue-50/30 border border-blue-100/40">
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4 text-blue-500" />
                      <div>
                        <p className="font-semibold text-gray-800 text-[14px]">Contact for Accessibility Issues</p>
                        <p className="text-[13px] text-gray-400 mt-0.5">
                          If you encounter accessibility barriers while using ClearPath AI, please contact us at{' '}
                          <a href="mailto:accessibility@clearpath-ai.org" className="text-blue-600 hover:text-blue-500 font-medium">accessibility@clearpath-ai.org</a>.
                          We take accessibility feedback seriously and aim to respond within 2 business days.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Section 15: Modifications to Terms */}
        <section id="modifications" className="py-6">
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
                  <RefreshCw className="w-5 h-5 text-teal-600" />
                </div>
                <div>
                  <span className="text-[11px] font-bold text-teal-600 tracking-wider uppercase">Section 15</span>
                  <h2 className="text-xl font-extrabold text-gray-900 tracking-tight mt-0.5">Modifications to Terms</h2>
                </div>
              </div>
              <div className="space-y-4 text-[15px] text-gray-500 leading-relaxed pl-0 md:pl-14">
                <p>
                  We reserve the right to modify these Terms at any time. When we make changes:
                </p>
                <ul className="space-y-2.5">
                  {[
                    'We will update the "Last updated" date at the top of this page',
                    'Material changes will be highlighted with a notice on the Service',
                    'Continued use after changes constitutes acceptance of the new Terms',
                    'We will never retroactively apply terms that reduce your privacy protections',
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <CheckCircle2 className="w-4 h-4 text-teal-500 mt-0.5 shrink-0" />
                      <span className="text-[14px]">{item}</span>
                    </li>
                  ))}
                </ul>
                <p>
                  We encourage you to review these Terms periodically to stay informed of any updates.
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Section 16: Contact Information */}
        <section id="contact-info" className="py-6">
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
                  <h2 className="text-xl font-extrabold text-gray-900 tracking-tight mt-0.5">Contact Information</h2>
                </div>
              </div>
              <div className="space-y-3 text-[15px] text-gray-500 leading-relaxed max-w-lg mx-auto">
                <p>
                  For questions about these Terms, please contact us:
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
                  <div className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-violet-50/60 border border-violet-100">
                    <Gavel className="w-4 h-4 text-violet-500" />
                    <a
                      href="mailto:legal@clearpath-ai.org"
                      className="text-[14px] font-semibold text-violet-600 hover:text-violet-500 transition-colors"
                    >
                      legal@clearpath-ai.org
                    </a>
                    <span className="text-[11px] text-gray-400">(Legal)</span>
                  </div>
                </div>
                <p className="text-[13px] text-gray-400 mt-4">
                  For privacy-related inquiries, please also review our{' '}
                  <Link href="/privacy" className="text-blue-500 hover:text-blue-400 font-medium transition-colors">
                    Privacy Policy
                  </Link>.
                  For accessibility concerns, contact{' '}
                  <a href="mailto:accessibility@clearpath-ai.org" className="text-blue-500 hover:text-blue-400 font-medium">accessibility@clearpath-ai.org</a>.
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
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-gray-900">Honest AI, transparent terms</h2>
              <p className="text-[15px] text-gray-500 mt-4 max-w-lg mx-auto leading-relaxed">
                We wrote these terms in plain language because trust starts with transparency.
                Try ClearPath AI and see the difference.
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
                  href="/privacy"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 text-[14px] font-semibold text-gray-700 rounded-xl border border-gray-200 bg-white/60 hover:bg-white hover:border-gray-300 hover:shadow-sm transition-all"
                >
                  Privacy Policy
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
