'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Layers,
  Github,
  Twitter,
  Linkedin,
  Mail,
  Shield,
  ShieldCheck,
  Heart,
  ArrowRight,
  Code2,
  AlertTriangle,
  Phone,
  Check,
  Trophy,
  Send,
  Lock,
  BookOpen,
  Users,
  Building2,
  FileText,
  Scale,
  DollarSign,
  Cpu,
  Eye,
  Globe2,
  Sparkles,
  ExternalLink,
  MessageSquare,
} from 'lucide-react'
import Image from 'next/image'

// ─── CUSTOM ICON: Shield Alert ══════════════════════════
function ShieldAlertIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <line x1="12" y1="8" x2="12" y2="12" />
      <line x1="12" y1="16" x2="12.01" y2="16" />
    </svg>
  )
}

// ─── FOOTER LINK DATA ────────────────────────────────────
const productLinks = [
  { label: 'How It Works', href: '/how-it-works', icon: Cpu, desc: 'Our 6-layer pipeline' },
  { label: 'Pricing', href: '/pricing', icon: DollarSign, desc: 'Free, no paid tier' },
  { label: 'Blog', href: '/blog', icon: BookOpen, desc: 'Responsible AI insights' },
  { label: 'Verification', href: '/verification', icon: ShieldCheck, desc: 'How we verify resources' },
]

const companyLinks = [
  { label: 'About', href: '/about', icon: Building2, desc: 'Our mission & story' },
  { label: 'Team', href: '/team', icon: Users, desc: 'The people behind ClearPath' },
  { label: 'Contact', href: '/contact', icon: Mail, desc: 'Get in touch' },
]

const legalLinks = [
  { label: 'Privacy Policy', href: '/privacy', icon: Lock, desc: 'How we handle data' },
  { label: 'Terms of Service', href: '/terms', icon: FileText, desc: 'Usage guidelines' },
  { label: 'Responsible AI', href: '/responsible-ai', icon: Scale, desc: 'Our AI ethics framework' },
  { label: 'Security', href: '/privacy', icon: Shield, desc: 'Security practices' },
]

const socialLinks = [
  { label: 'GitHub', href: 'https://github.com/Vitalcheffe/clearpath-ai', icon: Github, handle: '@Vitalcheffe' },
  { label: 'Twitter / X', href: '#', icon: Twitter, handle: 'Coming soon' },
  { label: 'LinkedIn', href: '#', icon: Linkedin, handle: 'Coming soon' },
]

const trustBadges = [
  {
    label: 'Privacy by design',
    icon: Lock,
    color: '#10b981',
    bgColor: 'rgba(16, 185, 129, 0.08)',
    borderColor: 'rgba(16, 185, 129, 0.15)',
    desc: 'Privacy-first architecture',
    detail: 'All sessions process queries in real-time with no persistent data storage. Your privacy is protected by design.'
  },
  {
    label: 'Crisis detection',
    icon: ShieldAlertIcon,
    color: '#ef4444',
    bgColor: 'rgba(239, 68, 68, 0.08)',
    borderColor: 'rgba(239, 68, 68, 0.15)',
    desc: 'Hardcoded safety layer',
    detail: 'Crisis keywords bypass AI entirely — connecting you to 988 instantly.',
  },
  {
    label: '211.org partner',
    icon: Phone,
    color: '#3b82f6',
    bgColor: 'rgba(59, 130, 246, 0.08)',
    borderColor: 'rgba(59, 130, 246, 0.15)',
    desc: 'Verified resources',
    detail: 'Resources hand-curated from public 211.org listings — no formal partnership.',
  },
  {
    label: 'Open source',
    icon: Code2,
    color: '#f59e0b',
    bgColor: 'rgba(245, 158, 11, 0.08)',
    borderColor: 'rgba(245, 158, 11, 0.15)',
    desc: 'Transparent architecture',
    detail: 'Our classification pipeline is open for audit and community review.',
  },
]

// ─── ANIMATION VARIANTS ──────────────────────────────────
const fadeInUp = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] } },
}

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
}

const staggerItem = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] } },
}

// ─── NEWSLETTER FORM ─────────────────────────────────────
function NewsletterForm() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [focused, setFocused] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!email || !email.includes('@')) {
      setStatus('error')
      return
    }
    // Simulate success — in production this would call an API
    setStatus('success')
    setEmail('')
    setTimeout(() => setStatus('idle'), 4000)
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <Sparkles className="w-3.5 h-3.5 text-blue-400" />
        <h4 className="text-[13px] font-semibold text-gray-200 tracking-tight">
          Stay updated
        </h4>
      </div>
      <p className="text-[12px] text-gray-400 leading-relaxed">
        Product updates and responsible AI insights. No spam — we don&apos;t even store your email after sending.
      </p>
      <form onSubmit={handleSubmit} className="space-y-2.5">
        <div
          className={`relative flex items-center rounded-xl transition-all duration-200 ${
            focused
              ? 'ring-2 ring-blue-500/40 bg-gray-800/80'
              : 'bg-gray-800/50'
          }`}
        >
          <Mail className="absolute left-3.5 w-4 h-4 text-gray-500 pointer-events-none" />
          <input
            type="email"
            placeholder="your@email.com"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value)
              if (status === 'error') setStatus('idle')
            }}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            className="w-full bg-transparent pl-10 pr-3 py-2.5 text-[13px] text-gray-200 placeholder:text-gray-500 outline-none"
            aria-label="Email address for newsletter"
          />
        </div>
        <motion.button
          type="submit"
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.98 }}
          disabled={status === 'success'}
          className={`w-full flex items-center justify-center gap-2 px-4 py-2.5 text-[13px] font-semibold rounded-xl transition-all ${
            status === 'success'
              ? 'bg-emerald-600/80 text-emerald-100 cursor-default'
              : 'text-white bg-gradient-to-b from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 shadow-md shadow-blue-500/20 hover:shadow-lg hover:shadow-blue-500/30'
          }`}
        >
          {status === 'success' ? (
            <>
              <Check className="w-3.5 h-3.5" />
              Subscribed!
            </>
          ) : (
            <>
              <Send className="w-3.5 h-3.5" />
              Subscribe
            </>
          )}
        </motion.button>
      </form>
      <AnimatePresence>
        {status === 'error' && (
          <motion.p
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            className="text-[12px] text-red-400"
          >
            Please enter a valid email address.
          </motion.p>
        )}
      </AnimatePresence>
      <p className="text-[10px] text-gray-500 leading-relaxed">
        We respect your privacy. Unsubscribe anytime. We don&apos;t store subscriber lists.
      </p>
    </div>
  )
}

// ─── FOOTER LINK COLUMN ──────────────────────────────────
function FooterLinkColumn({
  title,
  links,
  accentColor,
}: {
  title: string
  links: { label: string; href: string; icon: React.ComponentType<{ className?: string }>; desc: string }[]
  accentColor: string
}) {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <div
          className="w-1 h-4 rounded-full"
          style={{ backgroundColor: accentColor }}
        />
        <h4 className="text-[12px] font-bold text-gray-300 uppercase tracking-wider">
          {title}
        </h4>
      </div>
      <ul className="space-y-1">
        {links.map((link) => {
          const IconComp = link.icon
          return (
            <li key={link.label}>
              <Link
                href={link.href}
                className="group flex items-center gap-2.5 py-1.5 text-[13px] text-gray-400 hover:text-white transition-colors duration-200 rounded-lg hover:bg-white/[0.03] px-1.5 -mx-1.5"
              >
                <IconComp className="w-3.5 h-3.5 text-gray-600 group-hover:text-blue-400 transition-colors duration-200 shrink-0" />
                <div className="min-w-0">
                  <span className="group-hover:translate-x-0.5 transition-transform duration-200 block truncate">
                    {link.label}
                  </span>
                </div>
              </Link>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

// ─── SOCIAL LINK BUTTON ──────────────────────────────────
function SocialButton({ social }: { social: typeof socialLinks[0] }) {
  const SocialIcon = social.icon
  return (
    <a
      href={social.href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Follow us on ${social.label}`}
      className="group flex items-center gap-2.5 py-2 px-2.5 -mx-2.5 rounded-lg hover:bg-white/[0.03] transition-all duration-200"
    >
      <div className="w-8 h-8 rounded-lg bg-gray-800/60 border border-gray-700/40 flex items-center justify-center group-hover:bg-gray-700/60 group-hover:border-gray-600/60 group-hover:shadow-lg group-hover:shadow-blue-500/5 transition-all duration-200">
        <SocialIcon className="w-3.5 h-3.5 text-gray-400 group-hover:text-blue-400 transition-colors duration-200" />
      </div>
      <div className="min-w-0">
        <span className="text-[12px] font-medium text-gray-300 group-hover:text-white transition-colors block truncate">
          {social.label}
        </span>
        <span className="text-[10px] text-gray-500 block truncate">{social.handle}</span>
      </div>
    </a>
  )
}

// ─── MAIN FOOTER COMPONENT ───────────────────────────────
export default function Footer() {
  const [hoveredBadge, setHoveredBadge] = useState<number | null>(null)

  return (
    <footer className="relative bg-gray-950 text-gray-300 overflow-hidden">
      {/* ═══ Subtle gradient overlay ═══ */}
      <div
        className="absolute inset-0 pointer-events-none opacity-40"
        style={{
          background:
            'radial-gradient(ellipse at 20% 0%, rgba(59,130,246,0.06) 0%, transparent 50%), radial-gradient(ellipse at 80% 100%, rgba(16,185,129,0.04) 0%, transparent 50%)',
        }}
      />

      {/* ═══ Noise texture ═══ */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03]">
        <div
          className="w-full h-full"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E")`,
            backgroundRepeat: 'repeat',
          }}
        />
      </div>

      {/* ═══════════════════════════════════════════════════
          CRISIS BANNER
          ═══════════════════════════════════════════════════ */}
      <div className="relative z-10 border-b border-red-500/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-3.5 flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3 bg-gradient-to-r from-red-950/40 via-red-900/20 to-red-950/40 -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-2">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500" />
              </span>
              <AlertTriangle className="w-4 h-4 text-red-400 shrink-0" />
            </div>
            <p className="text-[13px] text-red-200 font-medium text-center sm:text-left">
              If you&apos;re in crisis:{' '}
              <a
                href="tel:988"
                className="font-bold text-red-100 hover:text-white underline underline-offset-2 decoration-red-400/50 hover:decoration-red-300 transition-colors"
              >
                Call 988
              </a>{' '}
              or text{' '}
              <span className="font-bold text-red-100">HOME</span>{' '}
              to{' '}
              <span className="font-bold text-red-100">741741</span>
            </p>
            <a
              href="tel:988"
              className="inline-flex items-center gap-1.5 px-3 py-1 text-[11px] font-bold text-red-100 rounded-lg bg-red-500/20 border border-red-500/30 hover:bg-red-500/30 transition-colors shrink-0"
            >
              <Phone className="w-3 h-3" />
              Call Now
            </a>
          </div>
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════
          MAIN FOOTER CONTENT
          ═══════════════════════════════════════════════════ */}
      <div className="relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            variants={staggerContainer}
          >
            {/* ─── Main Grid: 4 columns ─── */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 mb-14">
              {/* ─── Column 1 — Brand + Social + Newsletter ─── */}
              <motion.div variants={staggerItem} className="sm:col-span-2 lg:col-span-4 space-y-8">
                {/* Logo + Tagline */}
                <div className="space-y-4">
                  <Link href="/" className="inline-flex items-center gap-2.5 group">
                    <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-gray-700 to-gray-800 flex items-center justify-center shadow-lg shadow-black/30 group-hover:shadow-blue-500/10 transition-shadow border border-gray-700/50 overflow-hidden">
                      <Image src="/logo.svg" alt="CP" width={22} height={22} className="w-[22px] h-[22px]" />
                    </div>
                    <div>
                      <span className="text-[16px] font-bold tracking-tight text-white block leading-tight">
                        ClearPath AI
                      </span>
                      <span className="block text-[11px] text-gray-500 font-medium -mt-0.5">
                        Classified, not generated.
                      </span>
                    </div>
                  </Link>
                  <p className="text-[13px] text-gray-400 leading-relaxed max-w-xs">
                    Connecting people with verified community resources through honest confidence and responsible AI. Every result shows confidence, reasoning, and alternatives.
                  </p>
                </div>

                {/* Social Links */}
                <div className="space-y-2">
                  <h4 className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2">
                    Connect with us
                  </h4>
                  {socialLinks.map((social) => (
                    <SocialButton key={social.label} social={social} />
                  ))}
                </div>

                {/* Newsletter */}
                <div className="border-t border-gray-800/60 pt-6">
                  <NewsletterForm />
                </div>
              </motion.div>

              {/* ─── Column 2 — Product ─── */}
              <motion.div variants={staggerItem} className="lg:col-span-2 lg:pl-4">
                <FooterLinkColumn
                  title="Product"
                  links={productLinks}
                  accentColor="#3b82f6"
                />
              </motion.div>

              {/* ─── Column 3 — Company ─── */}
              <motion.div variants={staggerItem} className="lg:col-span-2">
                <FooterLinkColumn
                  title="Company"
                  links={companyLinks}
                  accentColor="#10b981"
                />
              </motion.div>

              {/* ─── Column 4 — Legal + Trust ─── */}
              <motion.div variants={staggerItem} className="lg:col-span-4 lg:pl-4 space-y-6">
                <FooterLinkColumn
                  title="Legal & Trust"
                  links={legalLinks}
                  accentColor="#8b5cf6"
                />

                {/* Transparency pledge card */}
                <div className="p-4 rounded-xl bg-gray-800/30 border border-gray-800/50 space-y-3">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-md bg-emerald-500/10 flex items-center justify-center">
                      <Eye className="w-3.5 h-3.5 text-emerald-400" />
                    </div>
                    <span className="text-[12px] font-semibold text-gray-300">Transparency Pledge</span>
                  </div>
                  <p className="text-[11px] text-gray-500 leading-relaxed">
                    We minimize data collection, never track your behavior, and never hide our confidence scores. What you see is exactly what the model returns — no post-processing, no filtering.
                  </p>
                  <div className="flex items-center gap-3 pt-1">
                    <div className="flex items-center gap-1.5 text-[10px] text-gray-500">
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-500/60" />
                      Privacy-first design
                    </div>
                    <div className="flex items-center gap-1.5 text-[10px] text-gray-500">
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-500/60" />
                      Open architecture
                    </div>
                  </div>
                </div>

                {/* Quick stats */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 rounded-lg bg-gray-800/20 border border-gray-800/40">
                    <div className="text-[18px] font-bold text-white leading-none">6</div>
                    <div className="text-[10px] text-gray-500 mt-1">Verified resources</div>
                  </div>
                  <div className="p-3 rounded-lg bg-gray-800/20 border border-gray-800/40">
                    <div className="text-[18px] font-bold text-white leading-none">175</div>
                    <div className="text-[10px] text-gray-500 mt-1">Crisis detection</div>
                  </div>
                  <div className="p-3 rounded-lg bg-gray-800/20 border border-gray-800/40">
                    <div className="text-[18px] font-bold text-white leading-none">100%</div>
                    <div className="text-[10px] text-gray-500 mt-1">No data stored</div>
                  </div>
                  <div className="p-3 rounded-lg bg-gray-800/20 border border-gray-800/40">
                    <div className="text-[18px] font-bold text-white leading-none">24/7</div>
                    <div className="text-[10px] text-gray-500 mt-1">Human escalation</div>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* ─── Trust Badges Row ─── */}
            <motion.div
              variants={staggerItem}
              className="border-t border-gray-800/60 pt-10 pb-10"
            >
              <div className="flex items-center gap-2 mb-6">
                <ShieldCheck className="w-4 h-4 text-emerald-400/60" />
                <h3 className="text-[12px] font-bold text-gray-400 uppercase tracking-wider">
                  Trust & Safety
                </h3>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {trustBadges.map((badge, idx) => {
                  const BadgeIcon = badge.icon
                  return (
                    <motion.div
                      key={badge.label}
                      onHoverStart={() => setHoveredBadge(idx)}
                      onHoverEnd={() => setHoveredBadge(null)}
                      whileHover={{ y: -2 }}
                      className="relative group rounded-xl p-4 border transition-all duration-300 cursor-default overflow-hidden"
                      style={{
                        backgroundColor: hoveredBadge === idx ? badge.bgColor : 'rgba(17, 24, 39, 0.4)',
                        borderColor: hoveredBadge === idx ? badge.borderColor : 'rgba(55, 65, 81, 0.4)',
                      }}
                    >
                      {/* Glow effect on hover */}
                      <div
                        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                        style={{
                          background: `radial-gradient(circle at 50% 50%, ${badge.bgColor}, transparent 70%)`,
                        }}
                      />
                      <div className="relative space-y-3">
                        <div className="flex items-center gap-3">
                          <div
                            className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0 transition-colors duration-300"
                            style={{
                              backgroundColor: hoveredBadge === idx ? badge.bgColor : 'rgba(55, 65, 81, 0.3)',
                            }}
                          >
                            <BadgeIcon
                              className="w-4 h-4 transition-colors duration-300"
                              style={{ color: hoveredBadge === idx ? badge.color : '#9ca3af' }}
                            />
                          </div>
                          <div className="min-w-0">
                            <h5
                              className="text-[12px] font-semibold transition-colors duration-300 truncate"
                              style={{ color: hoveredBadge === idx ? badge.color : '#e5e7eb' }}
                            >
                              {badge.label}
                            </h5>
                            <p className="text-[10px] text-gray-500 truncate">{badge.desc}</p>
                          </div>
                        </div>
                        <AnimatePresence>
                          {hoveredBadge === idx && (
                            <motion.p
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.2 }}
                              className="text-[10px] text-gray-400 leading-relaxed overflow-hidden"
                            >
                              {badge.detail}
                            </motion.p>
                          )}
                        </AnimatePresence>
                      </div>
                    </motion.div>
                  )
                })}
              </div>
            </motion.div>

            {/* ─── Hackathon Badge + Bottom Bar ─── */}
            <motion.div variants={staggerItem} className="border-t border-gray-800/60 pt-8">
              <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
                {/* Left: Copyright + Taglines */}
                <div className="flex flex-col items-center lg:items-start gap-2.5 text-center lg:text-left">
                  <div className="flex items-center gap-2 text-[13px] text-gray-400">
                    <span>&copy; 2026 ClearPath AI</span>
                    <span className="text-gray-600">·</span>
                    <span className="text-gray-500">All rights reserved</span>
                  </div>
                  <div className="flex flex-col sm:flex-row items-center gap-1.5 sm:gap-3">
                    <span className="inline-flex items-center gap-1.5 text-[11px] text-gray-500">
                      <Trophy className="w-3 h-3 text-amber-500/70" />
                      Built for USAII Global AI Hackathon 2026
                    </span>
                    <span className="hidden sm:inline text-gray-700">·</span>
                    <span className="inline-flex items-center gap-1 text-[11px] text-gray-500">
                      Made with <Heart className="w-3 h-3 text-red-400/70 inline" /> and purpose
                    </span>
                  </div>
                  <p className="text-[10px] text-gray-600 mt-1">
                    ClearPath AI is not a substitute for professional medical or legal advice. Always consult qualified professionals for critical decisions.
                  </p>
                </div>

                {/* Right: Hackathon Competitor Badge */}
                <div className="relative group shrink-0">
                  {/* Glow behind badge */}
                  <div className="absolute -inset-1 rounded-xl bg-gradient-to-r from-amber-500/20 via-blue-500/20 to-emerald-500/20 opacity-0 group-hover:opacity-100 blur-sm transition-opacity duration-500" />
                  <div className="relative flex items-center gap-3 px-5 py-3 rounded-xl bg-gray-900/80 border border-gray-700/50 backdrop-blur-sm">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-amber-500/20 to-amber-600/10 border border-amber-500/20 flex items-center justify-center shrink-0">
                      <Trophy className="w-5 h-5 text-amber-400" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-[12px] font-bold text-white tracking-tight">
                          Hackathon Competitor
                        </span>
                        <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[8px] font-bold uppercase tracking-wider bg-emerald-500/20 text-emerald-400 border border-emerald-500/20">
                          <span className="w-1 h-1 rounded-full bg-emerald-400 mr-1 animate-pulse" />
                          Live
                        </span>
                      </div>
                      <span className="text-[10px] text-gray-500 block">
                        USAII Global AI Hackathon 2026
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* ═══ Bottom accent gradient line ═══ */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-blue-500/20 to-transparent" />

      {/* ═══ Compact mobile crisis footer ═══ */}
      <div className="relative z-10 lg:hidden border-t border-red-500/10">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-center gap-2">
          <AlertTriangle className="w-3.5 h-3.5 text-red-400/70" />
          <p className="text-[11px] text-red-300/70 font-medium">
            Crisis? Call <span className="font-bold">988</span> or text <span className="font-bold">HOME</span> to{' '}
            <span className="font-bold">741741</span>
          </p>
        </div>
      </div>
    </footer>
  )
}
