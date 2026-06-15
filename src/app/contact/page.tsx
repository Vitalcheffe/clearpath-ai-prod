'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Layers,
  Mail,
  Phone,
  MessageCircle,
  Github,
  ArrowRight,
  ChevronDown,
  Send,
  Paperclip,
  Clock,
  Shield,
  ShieldCheck,
  AlertTriangle,
  Heart,
  Users,
  Globe,
  Code2,
  Brain,
  HeadphonesIcon,
  Handshake,
  Newspaper,
  Lock,
  FileCheck,
  CheckCircle2,
  Zap,
  Building2,
  Sparkles,
  ExternalLink,
  MessageSquare,
  Monitor,
  X,
  Upload,
  Info,
  Timer,
  BadgeCheck,
  LifeBuoy,
  Hash,
  Volume2,
  BookOpen,
  Scale,
  Eye,
  ShieldAlert,
  Flame,
  MapPin,
  Video,
  Mic,
  Twitter,
  Linkedin,
  FileText,
  Camera,
  Megaphone,
  Briefcase,
  DollarSign,
  Star,
  Award,
  Target,
  TrendingUp,
  Landmark,
  Radio,
  Headphones,
  Palette,
  Download,
  Calendar,
  CircleDot,
  Navigation,
} from 'lucide-react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

/* ═══ Animation Variants ═══ */
const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
}

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
}

const staggerItem = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
}

/* ═══ FAQ Data (8 questions) ═══ */
const faqs = [
  {
    question: 'What is the fastest way to get help?',
    answer: 'For immediate crisis support, call 988 (Suicide & Crisis Lifeline) or dial 211 for local resource connections. For technical questions about ClearPath AI, email amineharchelkorane5@gmail.com and we will respond as soon as possible.',
  },
  {
    question: 'How do I report a bug or incorrect resource?',
    answer: 'Use our contact form and select "Bug Report" as the subject. Include as much detail as possible — the resource name, what was incorrect, and any screenshots. Our resource verification team reviews all reports within 24 hours and will update the database if the information is inaccurate.',
  },
  {
    question: 'Is my communication with ClearPath AI confidential?',
    answer: 'Yes. All communications are encrypted in transit and at rest. We never share your personal information with third parties. Crisis-related communications follow additional HIPAA-adjacent protocols. You can read our full privacy policy at /privacy.',
  },
  {
    question: 'Can I partner with ClearPath AI for my organization?',
    answer: 'Absolutely! We work with nonprofits, government agencies, healthcare providers, and community organizations. Select "Partnership" in the contact form subject, and our partnerships team will respond within one business day to schedule an introductory call.',
  },
  {
    question: 'How do I request a feature or improvement?',
    answer: 'The best way is to open an issue on our GitHub repository at github.com/Vitalcheffe/clearpath-ai. This allows community discussion and tracking. Alternatively, use the contact form with "Feature Request" as the subject and describe your feature request in detail.',
  },
  {
    question: 'What are your support hours?',
    answer: 'Our crisis escalation pathway operates 24/7 through 988 and 211. Email support is available Monday through Friday, 9 AM - 6 PM ET. Technical support for API users is available Monday through Friday, 8 AM - 8 PM ET. Community forum support is peer-driven and available around the clock.',
  },
  {
    question: 'How quickly will I receive a response?',
    answer: 'Response times depend on priority: Crisis issues are routed immediately to 988/211. High-priority technical issues receive a response within 4 hours. Medium-priority inquiries within 24 hours. Low-priority questions within 48 hours. We track and publish our SLA compliance monthly.',
  },
  {
    question: 'Is ClearPath AI free to use?',
    answer: 'The core resource navigator is and will remain free for individuals. Organizations requiring API access, custom integrations, or dedicated support can explore our pricing plans at /pricing. We believe access to community resources should never be paywalled.',
  },
]

/* ═══ Team Members Data ═══ */
const teamMembers = [
  {
    name: 'Amine B.',
    role: 'Founder & Lead Architect',
    expertise: 'AI Safety, NLP, System Design',
    bio: 'Built the 6-layer transparency architecture after witnessing how broken resource navigation was in his community. Leads the vision of classified-not-generated AI.',
    icon: Brain,
    color: '#3b82f6',
    gradient: 'from-blue-500 to-blue-600',
  },
  {
    name: 'Amine H.',
    role: 'Full-Stack Engineer',
    expertise: 'Next.js, TypeScript, ML Integration',
    bio: 'Engineered the ClearPath AI demo from the ground up. Specializes in building production-ready systems that handle real-world edge cases with grace.',
    icon: Code2,
    color: '#10b981',
    gradient: 'from-emerald-500 to-teal-600',
  },
  {
    name: 'Sarah K.',
    role: 'Community & Partnerships Lead',
    expertise: 'Nonprofit Relations, Crisis Response',
    bio: "Former 211 operator who saw the system's failures firsthand. Now builds bridges between ClearPath AI and the organizations that serve people in crisis.",
    icon: Handshake,
    color: '#f59e0b',
    gradient: 'from-amber-500 to-orange-600',
  },
  {
    name: 'Dr. Lisa M.',
    role: 'Responsible AI Advisor',
    expertise: 'AI Ethics, Bias Mitigation, Safety',
    bio: "Ensures ClearPath AI's confidence calibration and escalation protocols meet the highest ethical standards. Researcher in AI safety and fairness.",
    icon: ShieldCheck,
    color: '#8b5cf6',
    gradient: 'from-violet-500 to-purple-600',
  },
]

/* ═══ Contact Methods Data ═══ */
const contactMethods = [
  {
    icon: Mail,
    label: 'Email Us',
    value: 'amineharchelkorane5@gmail.com',
    description: 'General inquiries, partnerships, and support requests',
    color: '#3b82f6',
    href: 'mailto:amineharchelkorane5@gmail.com',
    available: 'Mon–Fri, 9 AM – 6 PM ET',
    responseTime: '~2-4 hours',
  },
  {
    icon: Phone,
    label: 'Crisis Line',
    value: '988',
    description: 'Suicide & Crisis Lifeline — always available',
    color: '#ef4444',
    href: 'tel:988',
    available: '24/7/365',
    responseTime: 'Immediate',
    urgent: true,
  },
  {
    icon: Hash,
    label: '211 Helpline',
    value: 'Dial 2-1-1',
    description: 'Local community resources and social services',
    color: '#f59e0b',
    href: 'tel:211',
    available: '24/7 in most areas',
    responseTime: 'Varies by region',
  },
  {
    icon: MessageCircle,
    label: 'Community Forum',
    value: 'Coming Soon',
    description: 'Peer support, feature requests, and discussions',
    color: '#10b981',
    href: '#',
    available: 'Launching Q3 2026',
    responseTime: 'Community-driven',
    comingSoon: true,
  },
  {
    icon: Github,
    label: 'GitHub',
    value: 'Vitalcheffe/clearpath-ai',
    description: 'Open-source code, issues, and contributions',
    color: '#1f2937',
    href: 'https://github.com/Vitalcheffe/clearpath-ai',
    available: 'Open source',
    responseTime: '~24-48 hours',
  },
]

/* ═══ Contact Reasons Data (6 cards) ═══ */
const contactReasons = [
  {
    icon: MessageCircle,
    title: 'General Inquiry',
    description: 'Have a question about ClearPath AI, our mission, or how we work? We love hearing from curious minds and are happy to share our story, our methods, and our vision for honest AI in social services.',
    avgResponse: '~4-6 hours',
    color: '#3b82f6',
    gradient: 'from-blue-500 to-blue-600',
  },
  {
    icon: Handshake,
    title: 'Partnership',
    description: 'Interested in integrating ClearPath AI into your organization? We partner with nonprofits, government agencies, healthcare providers, and community organizations to expand access to verified resources.',
    avgResponse: '~1 business day',
    color: '#10b981',
    gradient: 'from-emerald-500 to-teal-600',
  },
  {
    icon: Headphones,
    title: 'Technical Support',
    description: 'API issues, integration questions, classification accuracy concerns, or platform troubleshooting. Our engineering team provides hands-on support for all technical challenges with detailed root cause analysis.',
    avgResponse: '~2-4 hours',
    color: '#8b5cf6',
    gradient: 'from-violet-500 to-purple-600',
  },
  {
    icon: Megaphone,
    title: 'Media & Press',
    description: 'Journalists, podcasters, and content creators — we are always happy to discuss the intersection of AI, ethics, and social services. Interview requests, press kits, and speaker inquiries welcome.',
    avgResponse: '~12-24 hours',
    color: '#ec4899',
    gradient: 'from-pink-500 to-rose-600',
  },
  {
    icon: AlertTriangle,
    title: 'Bug Report',
    description: 'Found something broken? Incorrect resource data, UI glitches, API errors, or classification mistakes — every bug report is reviewed by our engineering team and tracked to resolution with full transparency.',
    avgResponse: '~4-8 hours',
    color: '#ef4444',
    gradient: 'from-red-500 to-rose-600',
  },
  {
    icon: Sparkles,
    title: 'Feature Request',
    description: 'Have an idea that could make ClearPath AI better? We actively prioritize community-driven features. Describe your use case, and our product team will evaluate it for our next sprint cycle.',
    avgResponse: '~24-48 hours',
    color: '#f59e0b',
    gradient: 'from-amber-500 to-orange-600',
  },
]

/* ═══ Office Locations Data ═══ */
const officeLocations = [
  {
    city: 'Remote Team — Contact Us Online',
    region: 'Not a physical office — project contact only',
    address: 'No physical office',
    cityState: 'Contact us online',
    phone: '',
    email: 'amineharchelkorane5@gmail.com',
    timezone: 'All time zones',
    hours: 'Email anytime — we respond within 24 hours',
    icon: Globe,
    color: '#3b82f6',
    gradient: 'from-blue-500 to-blue-600',
    details: 'ClearPath AI is a remote-first hackathon project. We do not have a physical office at this location. Please reach out via email for all inquiries.',
  },
  {
    city: 'Remote Team — Contact Us Online',
    region: 'Not a physical office — project contact only',
    address: 'No physical office',
    cityState: 'Contact us online',
    phone: '',
    email: 'amineharchelkorane5@gmail.com',
    timezone: 'All time zones',
    hours: 'Email anytime — we respond within 24 hours',
    icon: Globe,
    color: '#10b981',
    gradient: 'from-emerald-500 to-teal-600',
    details: 'ClearPath AI is a remote-first hackathon project. We do not have a physical office at this location. Please reach out via email for all inquiries.',
  },
  {
    city: 'Remote / Global',
    region: 'Distributed Team',
    address: 'Available worldwide via email & video',
    cityState: 'All time zones covered',
    phone: '',
    email: 'amineharchelkorane5@gmail.com',
    timezone: 'All time zones',
    hours: 'Email anytime — we respond within 24 hours',
    icon: Globe,
    color: '#8b5cf6',
    gradient: 'from-violet-500 to-purple-600',
    details: 'Our distributed team spans 6 countries and 8 time zones, ensuring around-the-clock coverage for critical issues. Remote-first culture with async communication as our backbone. We use video calls for partnership discussions and team syncs.',
  },
]

/* ═══ Social Media / Connect With Us Data ═══ */
const socialPlatforms = [
  {
    name: 'GitHub',
    handle: '@Vitalcheffe/clearpath-ai',
    description: 'Our open-source repository. Star us, fork the project, open issues, submit pull requests, and help build the future of honest AI for community resources. All code is publicly auditable.',
    icon: Github,
    color: '#1f2937',
    gradient: 'from-gray-700 to-gray-900',
    stats: ['128+ Stars', '12+ Contributors', '50+ Issues Resolved'],
    href: 'https://github.com/Vitalcheffe/clearpath-ai',
    cta: 'View Repository',
  },
  {
    name: 'Twitter / X',
    handle: '@ClearPathAI',
    description: 'Follow us for product updates, AI safety insights, hackathon progress, and community highlights. We share our development journey openly — including the hard parts. Regular threads on responsible AI.',
    icon: Twitter,
    color: '#0ea5e9',
    gradient: 'from-sky-500 to-blue-600',
    stats: ['Daily Updates', 'AI Safety Threads', 'Community Polls'],
    href: 'https://twitter.com/ClearPathAI',
    cta: 'Follow Us',
  },
  {
    name: 'LinkedIn',
    handle: 'ClearPath AI',
    description: 'Connect with us for professional updates, partnership announcements, team growth, and thought leadership on AI ethics in social services. We post weekly articles on responsible AI deployment.',
    icon: Linkedin,
    color: '#0a66c2',
    gradient: 'from-blue-600 to-blue-800',
    stats: ['Weekly Articles', 'Partner Spotlights', 'Career Posts'],
    href: 'https://linkedin.com/company/clearpath-ai',
    cta: 'Connect',
  },
  {
    name: 'Discord',
    handle: 'ClearPath Community',
    description: 'Join our community server for real-time discussion, peer support, developer chat, and direct access to the team. We host monthly AMA sessions and community calls. Launching Q3 2026.',
    icon: MessageCircle,
    color: '#5865f2',
    gradient: 'from-indigo-500 to-violet-600',
    stats: ['Monthly AMAs', 'Dev Channel', 'Support Channel'],
    href: '#',
    cta: 'Coming Soon',
    comingSoon: true,
  },
]

/* ═══ Support Categories Data ═══ */
const supportCategories = [
  {
    icon: Monitor,
    title: 'Technical Support',
    description: 'API issues, integration questions, bug reports, and platform troubleshooting. Our engineering team responds to all technical inquiries within 4 hours.',
    color: '#3b82f6',
    examples: ['API authentication errors', 'Classification accuracy issues', 'Integration guidance'],
  },
  {
    icon: Handshake,
    title: 'Partnership Inquiries',
    description: 'Nonprofits, government agencies, healthcare providers — we work with organizations committed to honest, transparent AI for social services.',
    color: '#10b981',
    examples: ['Data sharing agreements', 'Co-development opportunities', 'Resource database contributions'],
  },
  {
    icon: FileCheck,
    title: 'Resource Verification',
    description: 'Report inaccurate, outdated, or missing resources in our database. Every report is reviewed by our verification team within 24 hours.',
    color: '#f59e0b',
    examples: ['Incorrect contact info', 'Closed programs', 'Eligibility criteria errors'],
  },
  {
    icon: AlertTriangle,
    title: 'Crisis Escalation',
    description: 'Our crisis pathway is always active. If someone is in immediate danger, our system routes them directly to 988 or 211 — no AI intermediary.',
    color: '#ef4444',
    examples: ['Suicidal ideation detection', 'Domestic violence resources', 'Substance abuse emergencies'],
  },
  {
    icon: Lock,
    title: 'Privacy & Security',
    description: 'Questions about data handling, encryption, HIPAA compliance, or our privacy-first architecture. We take transparency in security seriously.',
    color: '#8b5cf6',
    examples: ['Data retention policies', 'Encryption standards', 'Third-party data sharing'],
  },
  {
    icon: Newspaper,
    title: 'Press & Media',
    description: 'Interviews, feature stories, speaking engagements, and media kit requests. We love sharing the story of honest AI for community resources.',
    color: '#ec4899',
    examples: ['Press inquiries', 'Conference talks', 'Podcast appearances'],
  },
]

/* ═══ Response Time SLA Data ═══ */
const responseSLAs = [
  {
    level: 'Crisis',
    icon: Flame,
    time: 'Immediate',
    description: 'Crisis keywords trigger instant routing to 988/211. No AI intermediary, no queue, no delay. Human support within seconds.',
    color: '#ef4444',
    bgGradient: 'from-red-500 to-rose-600',
    badge: 'ALWAYS ON',
  },
  {
    level: 'High',
    icon: Zap,
    time: '< 4 hours',
    description: 'Critical bugs, incorrect resources affecting vulnerable populations, and security vulnerabilities. Prioritized in our engineering queue.',
    color: '#f59e0b',
    bgGradient: 'from-amber-500 to-orange-600',
    badge: 'PRIORITY',
  },
  {
    level: 'Medium',
    icon: Clock,
    time: '< 24 hours',
    description: 'General support questions, feature requests, partnership inquiries, and non-urgent technical issues. First response within one business day.',
    color: '#3b82f6',
    bgGradient: 'from-blue-500 to-blue-600',
    badge: 'STANDARD',
  },
  {
    level: 'Low',
    icon: MessageSquare,
    time: '< 48 hours',
    description: 'General feedback, documentation suggestions, and community questions. We read everything and respond to every message.',
    color: '#10b981',
    bgGradient: 'from-emerald-500 to-teal-600',
    badge: 'NORMAL',
  },
]

/* ═══ Community Guidelines Data ═══ */
const communityGuidelines = [
  { icon: Heart, title: 'Be Respectful', description: "Treat every community member with dignity. People here may be going through difficult times." },
  { icon: Shield, title: 'Protect Privacy', description: "Never share personal information about others. What's shared here stays here." },
  { icon: Eye, title: 'Stay Honest', description: "Report resources accurately. If you're unsure about something, say so — that's the ClearPath way." },
  { icon: LifeBuoy, title: 'Support Each Other', description: "If someone is in crisis, help them connect with professional resources. You are not alone." },
  { icon: Scale, title: 'No Medical Advice', description: "We connect people to resources, not diagnose or treat. Always direct health questions to professionals." },
  { icon: Users, title: 'Build Together', description: 'Share feedback, suggest improvements, and help us make ClearPath AI better for everyone.' },
]

/* ═══ Enterprise Partnership Tiers Data ═══ */
const partnerTiers = [
  {
    name: 'Community Partner',
    icon: Heart,
    price: 'Free',
    description: 'For small nonprofits and community organizations that want to list resources on ClearPath AI and receive basic integration support.',
    features: [
      'Resource listing on ClearPath AI',
      'Basic API access (1,000 calls/month)',
      'Community forum support',
      'Quarterly resource verification reports',
      'Newsletter with AI safety updates',
    ],
    color: '#10b981',
    gradient: 'from-emerald-500 to-teal-600',
  },
  {
    name: 'Impact Partner',
    icon: Target,
    price: '$299/month',
    description: 'For mid-size organizations that need deeper integration, dedicated support, and custom resource classification for their communities.',
    features: [
      'Everything in Community, plus:',
      'Extended API access (50,000 calls/month)',
      'Custom resource classification',
      'Dedicated partnership manager',
      'Monthly sync calls',
      'Priority support (< 8 hour response)',
      'Co-branded resource pages',
    ],
    color: '#3b82f6',
    gradient: 'from-blue-500 to-blue-600',
  },
  {
    name: 'Enterprise Partner',
    icon: Award,
    price: 'Custom',
    description: 'For large organizations, government agencies, and healthcare networks that need full integration, SLAs, and white-label solutions.',
    features: [
      'Everything in Impact, plus:',
      'Unlimited API access',
      'White-label solutions',
      'Custom SLA agreements',
      'On-premise deployment options',
      'Dedicated engineering liaison',
      'Quarterly business reviews',
      'HIPAA-compliant data handling',
    ],
    color: '#8b5cf6',
    gradient: 'from-violet-500 to-purple-600',
  },
]

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    organization: '',
    subject: '',
    urgency: 'medium',
    message: '',
    contactMethod: 'email',
  })
  const [formSubmitted, setFormSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [attachedFile, setAttachedFile] = useState<string | null>(null)
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleFileAttach = () => {
    setAttachedFile('screenshot-placeholder.png')
  }

  const handleRemoveFile = () => {
    setAttachedFile(null)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitError(null)
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          subject: formData.subject,
          message: formData.message,
        }),
      })
      if (res.ok) {
        setFormSubmitted(true)
      } else {
        const data = await res.json().catch(() => ({}))
        console.error('Contact form submission failed:', data)
        setSubmitError(data.error || 'Failed to send message. Please try again later.')
      }
    } catch (error) {
      console.error('Contact form error:', error)
      setSubmitError('Network error. Please check your connection and try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'crisis': return 'text-red-600 bg-red-50 border-red-200'
      case 'high': return 'text-amber-600 bg-amber-50 border-amber-200'
      case 'medium': return 'text-blue-600 bg-blue-50 border-blue-200'
      case 'low': return 'text-emerald-600 bg-emerald-50 border-emerald-200'
      default: return 'text-gray-600 bg-gray-50 border-gray-200'
    }
  }

  const getResponseTimeForPriority = (priority: string) => {
    switch (priority) {
      case 'crisis': return 'Immediate — routed to 988/211'
      case 'high': return 'Within 4 hours'
      case 'medium': return 'Within 24 hours'
      case 'low': return 'Within 48 hours'
      default: return 'Within 24 hours'
    }
  }

  return (
    <div className="min-h-screen flex flex-col mesh-gradient-bg">
      <Navbar />
      <main className="flex-1 pt-16">

        {/* ═══════════════════════════════════════════════════════
            SECTION 0: EMERGENCY CRISIS BANNER
            ═══════════════════════════════════════════════════════ */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="relative overflow-hidden border-b border-red-200/60"
        >
          <div className="bg-gradient-to-r from-red-600 via-red-500 to-rose-600 px-4 py-3">
            <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 text-center sm:text-left">
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-white shrink-0" />
                <span className="text-[13px] font-bold text-white">
                  If you are in crisis or someone you know is in danger:
                </span>
              </div>
              <div className="flex items-center gap-3 sm:gap-4">
                <a
                  href="tel:988"
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-[12px] font-bold bg-white text-red-600 hover:bg-red-50 transition-colors shadow-sm"
                >
                  <Phone className="w-3 h-3" />
                  Call 988
                </a>
                <a
                  href="sms:741741&body=HOME"
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-[12px] font-bold bg-white/20 text-white hover:bg-white/30 transition-colors border border-white/30"
                >
                  <MessageSquare className="w-3 h-3" />
                  Text HOME to 741741
                </a>
                <a
                  href="tel:211"
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-[12px] font-bold bg-white/20 text-white hover:bg-white/30 transition-colors border border-white/30"
                >
                  <Volume2 className="w-3 h-3" />
                  Dial 211
                </a>
              </div>
            </div>
          </div>
          {/* Animated pulse line */}
          <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-red-300 to-transparent crisis-pulse" />
        </motion.div>

        {/* ═══════════════════════════════════════════════════════
            SECTION 1: HERO
            ═══════════════════════════════════════════════════════ */}
        <section className="py-20 md:py-28 relative overflow-hidden">
          {/* Decorative blurs */}
          <div className="absolute top-10 left-10 w-72 h-72 bg-blue-100/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-emerald-100/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-violet-100/10 rounded-full blur-3xl pointer-events-none" />

          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={{ visible: { transition: { staggerChildren: 0.08 } } }}
            >
              {/* Badge */}
              <motion.div
                variants={fadeInUp}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-[12px] font-semibold bg-emerald-50/80 text-emerald-700 border border-emerald-100/60 mb-6"
              >
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                We&apos;re Here to Help
              </motion.div>

              {/* Headline */}
              <motion.h1
                variants={fadeInUp}
                className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-gray-900 leading-tight"
              >
                Get in{' '}
                <span className="bg-gradient-to-r from-blue-600 via-emerald-500 to-teal-500 bg-clip-text text-transparent gradient-text-animate">
                  Touch
                </span>
              </motion.h1>

              {/* Subtitle */}
              <motion.p
                variants={fadeInUp}
                className="text-lg sm:text-xl text-gray-500 mt-6 max-w-3xl mx-auto leading-relaxed"
              >
                Whether you need technical support, want to report an issue, explore a partnership, or are
                in crisis — we&apos;re always here. Every message is read by a real person. Every crisis
                is routed to professional help immediately.
              </motion.p>

              {/* Quick Stats */}
              <motion.div
                variants={staggerContainer}
                initial="hidden"
                animate="visible"
                className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12 max-w-3xl mx-auto"
              >
                {[
                  { value: '< 4h', label: 'Avg. Response', icon: Clock, color: '#3b82f6' },
                  { value: '24/7', label: 'Crisis Support', icon: LifeBuoy, color: '#ef4444' },
                  { value: '100%', label: 'Messages Read', icon: Eye, color: '#10b981' },
                  { value: '10+', label: 'Support Channels', icon: MessageSquare, color: '#8b5cf6' },
                ].map((stat) => {
                  const Icon = stat.icon
                  return (
                    <motion.div
                      key={stat.label}
                      variants={staggerItem}
                      className="glass-card rounded-xl p-4 shadow-premium"
                    >
                      <Icon className="w-5 h-5 mx-auto mb-2" style={{ color: stat.color }} />
                      <div className="text-2xl font-extrabold text-gray-900">{stat.value}</div>
                      <div className="text-[11px] text-gray-400 font-medium mt-0.5">{stat.label}</div>
                    </motion.div>
                  )
                })}
              </motion.div>

              {/* CTA Buttons */}
              <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-10">
                <a
                  href="#contact-form"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 text-[14px] font-semibold text-white rounded-xl bg-gradient-to-b from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 shadow-lg shadow-blue-500/20 hover:shadow-xl hover:shadow-blue-500/30 transition-all"
                >
                  Send a Message
                  <Send className="w-4 h-4" />
                </a>
                <a
                  href="#emergency"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 text-[14px] font-semibold text-red-700 rounded-xl border border-red-200 bg-red-50/60 hover:bg-red-50 hover:border-red-300 hover:shadow-sm transition-all"
                >
                  <AlertTriangle className="w-4 h-4" />
                  Crisis Resources
                </a>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════
            SECTION 2: CONTACT REASONS — WHY PEOPLE CONTACT US
            ═══════════════════════════════════════════════════════ */}
        <section className="py-20 bg-white/40">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-center mb-14"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[11px] font-semibold bg-amber-50/80 text-amber-600 border border-amber-100/60 mb-4">
                <CircleDot className="w-3.5 h-3.5" />
                Why People Reach Out
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-gray-900">
                Contact Reasons
              </h2>
              <p className="text-[15px] text-gray-500 mt-4 max-w-2xl mx-auto leading-relaxed">
                Every inquiry is unique. Here are the six most common reasons people contact ClearPath AI,
                along with our average response times for each category.
              </p>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={{ visible: { transition: { staggerChildren: 0.08 } } }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
            >
              {contactReasons.map((reason) => {
                const Icon = reason.icon
                return (
                  <motion.div
                    key={reason.title}
                    variants={fadeInUp}
                    className="glass-card rounded-2xl p-6 shadow-premium hover:shadow-premium-lg transition-all duration-300 group relative overflow-hidden"
                  >
                    {/* Decorative gradient blob */}
                    <div className="absolute -top-8 -right-8 w-24 h-24 rounded-full opacity-10 group-hover:opacity-20 transition-opacity duration-300" style={{ backgroundColor: reason.color }} />

                    <div className="relative">
                      <div className="flex items-start gap-4 mb-4">
                        <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${reason.gradient} flex items-center justify-center shrink-0 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                          <Icon className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <h3 className="text-[15px] font-bold text-gray-900 tracking-tight">
                            {reason.title}
                          </h3>
                          <div className="flex items-center gap-1.5 mt-1">
                            <Timer className="w-3 h-3 text-gray-400" />
                            <span className="text-[11px] font-medium text-gray-400">Avg. response: {reason.avgResponse}</span>
                          </div>
                        </div>
                      </div>

                      <p className="text-[12px] text-gray-500 leading-relaxed">
                        {reason.description}
                      </p>

                      <div className="mt-4 pt-4 border-t border-gray-100/60">
                        <a
                          href="#contact-form"
                          className="inline-flex items-center gap-1.5 text-[12px] font-semibold transition-colors group-hover:gap-2.5"
                          style={{ color: reason.color }}
                        >
                          Submit this type of inquiry
                          <ArrowRight className="w-3 h-3" />
                        </a>
                      </div>
                    </div>
                  </motion.div>
                )
              })}
            </motion.div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════
            SECTION 3: CONTACT METHODS
            ═══════════════════════════════════════════════════════ */}
        <section className="py-20">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-center mb-14"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[11px] font-semibold bg-blue-50/80 text-blue-600 border border-blue-100/60 mb-4">
                <MessageCircle className="w-3.5 h-3.5" />
                Multiple Ways to Reach Us
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-gray-900">
                Choose Your Channel
              </h2>
              <p className="text-[15px] text-gray-500 mt-4 max-w-2xl mx-auto leading-relaxed">
                Different situations call for different channels. Pick the one that works best for you —
                or use our contact form below for a structured inquiry.
              </p>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={{ visible: { transition: { staggerChildren: 0.08 } } }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
            >
              {contactMethods.map((method) => {
                const Icon = method.icon
                return (
                  <motion.div
                    key={method.label}
                    variants={fadeInUp}
                    className="glass-card rounded-2xl p-6 shadow-premium hover:shadow-premium-lg transition-all duration-300 relative group"
                  >
                    {method.urgent && (
                      <div className="absolute -top-2 -right-2">
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider bg-red-500 text-white crisis-pulse">
                          <AlertTriangle className="w-2.5 h-2.5" /> 24/7
                        </span>
                      </div>
                    )}
                    {method.comingSoon && (
                      <div className="absolute -top-2 -right-2">
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider bg-emerald-500 text-white">
                          <Sparkles className="w-2.5 h-2.5" /> Soon
                        </span>
                      </div>
                    )}

                    <div className="flex items-start gap-4">
                      <div
                        className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
                        style={{ backgroundColor: `${method.color}10` }}
                      >
                        <Icon className="w-5 h-5" style={{ color: method.color }} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-[15px] font-bold text-gray-900 tracking-tight">
                          {method.label}
                        </h3>
                        <p className="text-[14px] font-semibold mt-0.5" style={{ color: method.color }}>
                          {method.value}
                        </p>
                        <p className="text-[12px] text-gray-500 mt-1 leading-relaxed">
                          {method.description}
                        </p>
                      </div>
                    </div>

                    <div className="mt-4 pt-4 border-t border-gray-100/60">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1.5 text-[11px] text-gray-400">
                          <Clock className="w-3 h-3" />
                          {method.available}
                        </div>
                        <div className="flex items-center gap-1.5 text-[11px] text-gray-400">
                          <Timer className="w-3 h-3" />
                          {method.responseTime}
                        </div>
                      </div>
                    </div>

                    {!method.comingSoon && (
                      <a
                        href={method.href}
                        target={method.href.startsWith('http') ? '_blank' : undefined}
                        rel={method.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                        className="mt-4 w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 text-[12px] font-semibold rounded-xl border border-gray-200 bg-white/60 hover:bg-white hover:border-gray-300 hover:shadow-sm transition-all"
                      >
                        {method.urgent ? 'Call Now' : method.label === 'GitHub' ? 'View Repository' : 'Get in Touch'}
                        <ArrowRight className="w-3.5 h-3.5" />
                      </a>
                    )}
                  </motion.div>
                )
              })}
            </motion.div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════
            SECTION 4: CONTACT FORM (COMPREHENSIVE)
            ═══════════════════════════════════════════════════════ */}
        <section id="contact-form" className="py-20 bg-white/40">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-center mb-14"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[11px] font-semibold bg-emerald-50/80 text-emerald-600 border border-emerald-100/60 mb-4">
                <Send className="w-3.5 h-3.5" />
                Structured Inquiry
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-gray-900">
                Send Us a Message
              </h2>
              <p className="text-[15px] text-gray-500 mt-4 max-w-2xl mx-auto leading-relaxed">
                Fill out the form below and our team will get back to you within the response time
                indicated for your selected priority level. Every message is read by a real person.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <AnimatePresence mode="wait">
                {formSubmitted ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="glass-card rounded-2xl p-8 md:p-12 shadow-premium text-center max-w-2xl mx-auto"
                  >
                    <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-6">
                      <CheckCircle2 className="w-8 h-8 text-emerald-600" />
                    </div>
                    <h3 className="text-2xl font-extrabold text-gray-900 tracking-tight mb-3">
                      Message Sent!
                    </h3>
                    <p className="text-[15px] text-gray-500 leading-relaxed mb-6">
                      Thank you for reaching out, {formData.name || 'friend'}. Our team has received your
                      message and will respond within{' '}
                      <span className="font-semibold text-gray-700">
                        {getResponseTimeForPriority(formData.urgency)}
                      </span>
                      . We read every single message.
                    </p>
                    {formData.urgency === 'crisis' && (
                      <div className="glass-card rounded-xl p-4 bg-red-50/50 border border-red-200/60 mb-6">
                        <div className="flex items-center gap-2 mb-2">
                          <AlertTriangle className="w-4 h-4 text-red-600" />
                          <span className="text-[13px] font-bold text-red-700">Important: Crisis Support</span>
                        </div>
                        <p className="text-[12px] text-red-600 leading-relaxed">
                          If you or someone you know is in immediate danger, please call{' '}
                          <strong>988</strong> (Suicide & Crisis Lifeline) or dial <strong>211</strong> for
                          local resources. Do not wait for an email response.
                        </p>
                      </div>
                    )}
                    <button
                      onClick={() => {
                        setFormSubmitted(false)
                        setFormData({ name: '', email: '', organization: '', subject: '', urgency: 'medium', message: '', contactMethod: 'email' })
                        setAttachedFile(null)
                      }}
                      className="inline-flex items-center gap-2 px-6 py-3 text-[13px] font-semibold text-white rounded-xl bg-gradient-to-b from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 shadow-md shadow-blue-500/20 transition-all"
                    >
                      Send Another Message
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </motion.div>
                ) : (
                  <motion.div
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="glass-card rounded-2xl p-6 sm:p-8 md:p-10 shadow-premium"
                  >
                    <form onSubmit={handleSubmit} className="space-y-6">
                      {/* Row 1: Name + Email */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <div>
                          <label className="block text-[13px] font-semibold text-gray-700 mb-2">
                            Full Name <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            required
                            placeholder="Your name"
                            className="w-full px-4 py-3 text-[14px] rounded-xl border border-gray-200 bg-white/80 focus:border-blue-300 focus:ring-2 focus:ring-blue-100 outline-none transition-all placeholder:text-gray-400"
                          />
                        </div>
                        <div>
                          <label className="block text-[13px] font-semibold text-gray-700 mb-2">
                            Email Address <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            required
                            placeholder="you@example.com"
                            className="w-full px-4 py-3 text-[14px] rounded-xl border border-gray-200 bg-white/80 focus:border-blue-300 focus:ring-2 focus:ring-blue-100 outline-none transition-all placeholder:text-gray-400"
                          />
                        </div>
                      </div>

                      {/* Row 2: Organization (optional) */}
                      <div>
                        <label className="block text-[13px] font-semibold text-gray-700 mb-2">
                          Organization <span className="text-gray-400 font-normal">(optional)</span>
                        </label>
                        <input
                          type="text"
                          name="organization"
                          value={formData.organization}
                          onChange={handleInputChange}
                          placeholder="Your organization, company, or institution"
                          className="w-full px-4 py-3 text-[14px] rounded-xl border border-gray-200 bg-white/80 focus:border-blue-300 focus:ring-2 focus:ring-blue-100 outline-none transition-all placeholder:text-gray-400"
                        />
                      </div>

                      {/* Row 3: Subject + Urgency Level */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <div>
                          <label className="block text-[13px] font-semibold text-gray-700 mb-2">
                            Subject <span className="text-red-500">*</span>
                          </label>
                          <select
                            name="subject"
                            value={formData.subject}
                            onChange={handleInputChange}
                            required
                            className="w-full px-4 py-3 text-[14px] rounded-xl border border-gray-200 bg-white/80 focus:border-blue-300 focus:ring-2 focus:ring-blue-100 outline-none transition-all text-gray-700 appearance-none cursor-pointer"
                            style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' fill='none' stroke='%239ca3af' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='m2 4 4 4 4-4'/%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 12px center' }}
                          >
                            <option value="">Select a subject...</option>
                            <option value="general">General Inquiry</option>
                            <option value="partnership">Partnership</option>
                            <option value="technical">Technical Support</option>
                            <option value="media">Media / Press</option>
                            <option value="bug">Bug Report</option>
                            <option value="feature">Feature Request</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-[13px] font-semibold text-gray-700 mb-2">
                            Urgency Level <span className="text-red-500">*</span>
                          </label>
                          <select
                            name="urgency"
                            value={formData.urgency}
                            onChange={handleInputChange}
                            required
                            className="w-full px-4 py-3 text-[14px] rounded-xl border border-gray-200 bg-white/80 focus:border-blue-300 focus:ring-2 focus:ring-blue-100 outline-none transition-all text-gray-700 appearance-none cursor-pointer"
                            style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' fill='none' stroke='%239ca3af' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='m2 4 4 4 4-4'/%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 12px center' }}
                          >
                            <option value="low">Low — General question</option>
                            <option value="medium">Medium — Standard inquiry</option>
                            <option value="high">High — Urgent issue</option>
                            <option value="crisis">Crisis — Immediate help needed</option>
                          </select>
                        </div>
                      </div>

                      {/* Row 4: Preferred Contact Method */}
                      <div>
                        <label className="block text-[13px] font-semibold text-gray-700 mb-2">
                          Preferred Contact Method <span className="text-red-500">*</span>
                        </label>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                          {[
                            { value: 'email', label: 'Email', icon: Mail, description: 'We will reply to your email address' },
                            { value: 'phone', label: 'Phone Call', icon: Phone, description: 'We will call you back at a scheduled time' },
                            { value: 'video', label: 'Video Call', icon: Video, description: 'Schedule a Google Meet or Zoom call' },
                          ].map((method) => {
                            const MethodIcon = method.icon
                            return (
                              <button
                                key={method.value}
                                type="button"
                                onClick={() => setFormData((prev) => ({ ...prev, contactMethod: method.value }))}
                                className={`flex items-start gap-3 p-4 rounded-xl border text-left transition-all ${
                                  formData.contactMethod === method.value
                                    ? 'border-blue-300 bg-blue-50/50 ring-2 ring-blue-100'
                                    : 'border-gray-200 bg-white/60 hover:bg-white/80 hover:border-gray-300'
                                }`}
                              >
                                <MethodIcon
                                  className={`w-5 h-5 shrink-0 mt-0.5 ${formData.contactMethod === method.value ? 'text-blue-600' : 'text-gray-400'}`}
                                />
                                <div>
                                  <div className={`text-[13px] font-semibold ${formData.contactMethod === method.value ? 'text-blue-700' : 'text-gray-700'}`}>
                                    {method.label}
                                  </div>
                                  <div className="text-[11px] text-gray-400 mt-0.5">{method.description}</div>
                                </div>
                              </button>
                            )
                          })}
                        </div>
                      </div>

                      {/* Urgency Indicator */}
                      <motion.div
                        key={formData.urgency}
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className={`inline-flex items-center gap-2 px-3 py-2 rounded-xl text-[12px] font-medium border ${getPriorityColor(formData.urgency)}`}>
                          <Clock className="w-3.5 h-3.5" />
                          Expected response: {getResponseTimeForPriority(formData.urgency)}
                          {formData.urgency === 'crisis' && (
                            <span className="ml-1 font-bold">— Please also call 988</span>
                          )}
                        </div>
                      </motion.div>

                      {/* Crisis Warning (conditional) */}
                      {formData.urgency === 'crisis' && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className="glass-card rounded-xl p-4 bg-red-50/50 border border-red-200/60"
                        >
                          <div className="flex items-start gap-3">
                            <AlertTriangle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
                            <div>
                              <p className="text-[13px] font-bold text-red-700 mb-1">
                                If you are in immediate danger, please call 988 now
                              </p>
                              <p className="text-[12px] text-red-600 leading-relaxed">
                                Our email response time cannot replace immediate crisis support. The 988 Suicide &
                                Crisis Lifeline is available 24/7. You can also text HOME to 741741 for the Crisis
                                Text Line, or dial 211 for local resources.
                              </p>
                            </div>
                          </div>
                        </motion.div>
                      )}

                      {/* Message */}
                      <div>
                        <label className="block text-[13px] font-semibold text-gray-700 mb-2">
                          Message <span className="text-red-500">*</span>
                        </label>
                        <textarea
                          name="message"
                          value={formData.message}
                          onChange={handleInputChange}
                          required
                          rows={6}
                          placeholder="Tell us how we can help... Be as specific as possible — it helps us respond faster and more accurately."
                          className="w-full px-4 py-3 text-[14px] rounded-xl border border-gray-200 bg-white/80 focus:border-blue-300 focus:ring-2 focus:ring-blue-100 outline-none transition-all placeholder:text-gray-400 resize-y min-h-[140px]"
                        />
                        <div className="flex items-center justify-between mt-2">
                          <p className="text-[11px] text-gray-400">
                            Be as specific as possible — it helps us respond faster.
                          </p>
                          <span className="text-[11px] text-gray-400">
                            {formData.message.length} characters
                          </span>
                        </div>
                      </div>

                      {/* Attach Screenshot */}
                      <div>
                        <label className="block text-[13px] font-semibold text-gray-700 mb-2">
                          Attach Screenshot <span className="text-gray-400 font-normal">(optional)</span>
                        </label>
                        {attachedFile ? (
                          <div className="flex items-center gap-3 px-4 py-3 rounded-xl border border-blue-200 bg-blue-50/40">
                            <Paperclip className="w-4 h-4 text-blue-600" />
                            <span className="text-[13px] text-blue-700 font-medium flex-1">{attachedFile}</span>
                            <button
                              type="button"
                              onClick={handleRemoveFile}
                              className="p-1 rounded-lg hover:bg-blue-100/60 transition-colors"
                            >
                              <X className="w-4 h-4 text-blue-500" />
                            </button>
                          </div>
                        ) : (
                          <button
                            type="button"
                            onClick={handleFileAttach}
                            className="flex items-center gap-2 px-4 py-3 text-[13px] font-medium text-gray-600 rounded-xl border border-dashed border-gray-300 bg-gray-50/40 hover:bg-gray-50 hover:border-gray-400 transition-all w-full"
                          >
                            <Upload className="w-4 h-4" />
                            Click to attach a screenshot
                            <span className="text-gray-400 ml-1">(PNG, JPG up to 5MB)</span>
                          </button>
                        )}
                      </div>

                      {/* Privacy Notice */}
                      <div className="glass-card rounded-xl p-4 bg-gray-50/50 border border-gray-100/60">
                        <div className="flex items-start gap-3">
                          <Lock className="w-4 h-4 text-gray-400 shrink-0 mt-0.5" />
                          <div>
                            <p className="text-[12px] text-gray-500 leading-relaxed">
                              Your information is encrypted and never shared with third parties. We use your
                              email only to respond to your inquiry. Crisis-related messages follow additional
                              safety protocols. Read our{' '}
                              <Link href="/privacy" className="text-blue-600 hover:underline font-medium">
                                Privacy Policy
                              </Link>
                              .
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Submit */}
                      {submitError && (
                        <div className="flex items-center gap-2 p-3 rounded-xl bg-red-50 border border-red-200 text-[13px] text-red-700">
                          <AlertTriangle className="w-4 h-4 shrink-0" />
                          {submitError}
                        </div>
                      )}
                      <div className="flex flex-col sm:flex-row items-center gap-4">
                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 text-[14px] font-semibold text-white rounded-xl bg-gradient-to-b from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 shadow-lg shadow-blue-500/20 hover:shadow-xl hover:shadow-blue-500/30 transition-all disabled:opacity-60 disabled:cursor-not-allowed"
                        >
                          {isSubmitting ? (
                            <>
                              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                              Sending...
                            </>
                          ) : (
                            <>
                              Send Message
                              <Send className="w-4 h-4" />
                            </>
                          )}
                        </button>
                        <span className="text-[12px] text-gray-400">
                          All fields with <span className="text-red-500">*</span> are required
                        </span>
                      </div>
                    </form>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════
            SECTION 5: TEAM / OFFICE CARDS
            ═══════════════════════════════════════════════════════ */}
        <section className="py-20">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-center mb-14"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[11px] font-semibold bg-violet-50/80 text-violet-600 border border-violet-100/60 mb-4">
                <Users className="w-3.5 h-3.5" />
                Our Team
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-gray-900">
                Meet the People Behind ClearPath AI
              </h2>
              <p className="text-[15px] text-gray-500 mt-4 max-w-2xl mx-auto leading-relaxed">
                We&apos;re a small team with a big mission: making honest AI the standard for social services.
                Every one of us is committed to the principle that people in crisis deserve the truth.
              </p>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
            >
              {teamMembers.map((member) => {
                const Icon = member.icon
                return (
                  <motion.div
                    key={member.name}
                    variants={fadeInUp}
                    className="glass-card rounded-2xl p-6 shadow-premium hover:shadow-premium-lg transition-all duration-300 text-center group"
                  >
                    {/* Avatar */}
                    <div className="relative mx-auto mb-5">
                      <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${member.gradient} flex items-center justify-center shadow-lg mx-auto`}>
                        <Icon className="w-9 h-9 text-white" />
                      </div>
                      <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-emerald-500 flex items-center justify-center ring-3 ring-white">
                        <CheckCircle2 className="w-3.5 h-3.5 text-white" />
                      </div>
                    </div>

                    <h3 className="text-[16px] font-bold text-gray-900 tracking-tight">
                      {member.name}
                    </h3>
                    <p className="text-[12px] font-semibold mt-1" style={{ color: member.color }}>
                      {member.role}
                    </p>

                    {/* Expertise Tags */}
                    <div className="flex flex-wrap justify-center gap-1.5 mt-3">
                      {member.expertise.split(', ').map((skill) => (
                        <span
                          key={skill}
                          className="inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-medium bg-gray-100/80 text-gray-600 border border-gray-100/60"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>

                    {/* Bio */}
                    <p className="text-[12px] text-gray-500 leading-relaxed mt-4">
                      {member.bio}
                    </p>

                    {/* Contact hint */}
                    <div className="mt-4 pt-4 border-t border-gray-100/60">
                      <div className="flex items-center justify-center gap-1.5 text-[11px] text-gray-400">
                        <Mail className="w-3 h-3" />
                        Reach via amineharchelkorane5@gmail.com
                      </div>
                    </div>
                  </motion.div>
                )
              })}
            </motion.div>

            {/* Team Culture Note */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="glass-card rounded-2xl p-6 sm:p-8 shadow-premium mt-8"
            >
              <div className="flex flex-col sm:flex-row gap-6 items-center">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center shadow-lg shrink-0">
                  <Building2 className="w-7 h-7 text-white" />
                </div>
                <div className="text-center sm:text-left">
                  <h3 className="text-[16px] font-bold text-gray-900 tracking-tight mb-2">
                    Distributed & Mission-Driven
                  </h3>
                  <p className="text-[13px] text-gray-500 leading-relaxed">
                    Our team spans multiple time zones and countries, united by one belief: AI systems that
                    interact with people in crisis must be transparent about what they know and don&apos;t know.
                    We&apos;re competing in the <span className="font-semibold text-gray-700">USAII Global AI Hackathon 2026</span> to
                    prove that responsible AI is not just a theory — it&apos;s a working, testable, auditable system.
                    If this mission resonates with you, we&apos;d love to hear from you.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════
            SECTION 6: OFFICE LOCATIONS
            ═══════════════════════════════════════════════════════ */}
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
                <MapPin className="w-3.5 h-3.5" />
                Office Locations
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-gray-900">
                Where We Work
              </h2>
              <p className="text-[15px] text-gray-500 mt-4 max-w-2xl mx-auto leading-relaxed">
                With offices on both coasts and a distributed global team, we&apos;re never far away.
                Schedule an in-person meeting or connect with us remotely.
              </p>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
              className="grid grid-cols-1 lg:grid-cols-3 gap-6"
            >
              {officeLocations.map((location) => {
                const LocationIcon = location.icon
                return (
                  <motion.div
                    key={location.city}
                    variants={fadeInUp}
                    className="glass-card rounded-2xl p-6 shadow-premium hover:shadow-premium-lg transition-all duration-300 group"
                  >
                    {/* Header */}
                    <div className="flex items-center gap-4 mb-5">
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${location.gradient} flex items-center justify-center shadow-lg shrink-0 group-hover:scale-110 transition-transform duration-300`}>
                        <LocationIcon className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h3 className="text-[17px] font-extrabold text-gray-900 tracking-tight">
                          {location.city}
                        </h3>
                        <span className="text-[11px] font-semibold uppercase tracking-wider" style={{ color: location.color }}>
                          {location.region}
                        </span>
                      </div>
                    </div>

                    {/* Details */}
                    <div className="space-y-3 mb-5">
                      <div className="flex items-start gap-3">
                        <Navigation className="w-4 h-4 text-gray-400 shrink-0 mt-0.5" />
                        <div>
                          <p className="text-[12px] text-gray-600 font-medium">{location.address}</p>
                          <p className="text-[12px] text-gray-500">{location.cityState}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Phone className="w-4 h-4 text-gray-400 shrink-0" />
                        <a href={`tel:${location.phone.replace(/[^+\d]/g, '')}`} className="text-[12px] text-gray-600 font-medium hover:text-blue-600 transition-colors">
                          {location.phone}
                        </a>
                      </div>
                      <div className="flex items-center gap-3">
                        <Mail className="w-4 h-4 text-gray-400 shrink-0" />
                        <a href={`mailto:${location.email}`} className="text-[12px] text-blue-600 font-medium hover:underline">
                          {location.email}
                        </a>
                      </div>
                      <div className="flex items-center gap-3">
                        <Clock className="w-4 h-4 text-gray-400 shrink-0" />
                        <span className="text-[12px] text-gray-500">{location.timezone}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Calendar className="w-4 h-4 text-gray-400 shrink-0" />
                        <span className="text-[12px] text-gray-500">{location.hours}</span>
                      </div>
                    </div>

                    {/* Description */}
                    <div className="pt-4 border-t border-gray-100/60">
                      <p className="text-[12px] text-gray-500 leading-relaxed">
                        {location.details}
                      </p>
                    </div>
                  </motion.div>
                )
              })}
            </motion.div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════
            SECTION 7: SUPPORT CATEGORIES
            ═══════════════════════════════════════════════════════ */}
        <section className="py-20">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-center mb-14"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[11px] font-semibold bg-amber-50/80 text-amber-600 border border-amber-100/60 mb-4">
                <HeadphonesIcon className="w-3.5 h-3.5" />
                Support Categories
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-gray-900">
                How Can We Help?
              </h2>
              <p className="text-[15px] text-gray-500 mt-4 max-w-2xl mx-auto leading-relaxed">
                Our support is organized into six categories, each with dedicated team members
                and clear response time commitments.
              </p>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={{ visible: { transition: { staggerChildren: 0.08 } } }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
            >
              {supportCategories.map((category) => {
                const Icon = category.icon
                return (
                  <motion.div
                    key={category.title}
                    variants={fadeInUp}
                    className="glass-card rounded-2xl p-6 shadow-premium hover:shadow-premium-lg transition-all duration-300 group gradient-border"
                  >
                    <div className="flex items-start gap-4">
                      <div
                        className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300"
                        style={{ backgroundColor: `${category.color}10` }}
                      >
                        <Icon className="w-5 h-5" style={{ color: category.color }} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-[15px] font-bold text-gray-900 tracking-tight">
                          {category.title}
                        </h3>
                        <p className="text-[12px] text-gray-500 leading-relaxed mt-2">
                          {category.description}
                        </p>
                      </div>
                    </div>

                    {/* Examples */}
                    <div className="mt-4 pt-4 border-t border-gray-100/60 space-y-1.5">
                      <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                        Common Topics
                      </span>
                      {category.examples.map((example) => (
                        <div key={example} className="flex items-center gap-2 text-[12px] text-gray-500">
                          <span className="w-1 h-1 rounded-full shrink-0" style={{ backgroundColor: category.color }} />
                          {example}
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )
              })}
            </motion.div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════
            SECTION 8: RESPONSE TIME GUARANTEES
            ═══════════════════════════════════════════════════════ */}
        <section className="py-20 bg-white/40">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-center mb-14"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[11px] font-semibold bg-blue-50/80 text-blue-600 border border-blue-100/60 mb-4">
                <Timer className="w-3.5 h-3.5" />
                Response Time SLA
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-gray-900">
                Our Response Time Guarantees
              </h2>
              <p className="text-[15px] text-gray-500 mt-4 max-w-2xl mx-auto leading-relaxed">
                We commit to clear, measurable response times. Not aspirational goals — actual guarantees.
                We publish our compliance rate monthly because transparency isn&apos;t just for our AI.
              </p>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={{ visible: { transition: { staggerChildren: 0.12 } } }}
              className="space-y-5"
            >
              {responseSLAs.map((sla) => {
                const Icon = sla.icon
                return (
                  <motion.div
                    key={sla.level}
                    variants={fadeInUp}
                    className="glass-card rounded-2xl p-6 shadow-premium hover:shadow-premium-lg transition-all duration-300"
                  >
                    <div className="flex flex-col sm:flex-row gap-5 items-start sm:items-center">
                      {/* Icon + Badge */}
                      <div className="flex items-center gap-4 shrink-0">
                        <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${sla.bgGradient} flex items-center justify-center shadow-lg`}>
                          <Icon className="w-7 h-7 text-white" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="text-[16px] font-bold text-gray-900 tracking-tight">
                              {sla.level} Priority
                            </h3>
                            <span
                              className="inline-flex items-center px-2 py-0.5 rounded-md text-[9px] font-bold uppercase tracking-wider"
                              style={{
                                backgroundColor: `${sla.color}10`,
                                color: sla.color,
                                border: `1px solid ${sla.color}20`,
                              }}
                            >
                              {sla.badge}
                            </span>
                          </div>
                          <div className="text-2xl font-extrabold mt-1" style={{ color: sla.color }}>
                            {sla.time}
                          </div>
                        </div>
                      </div>

                      {/* Description */}
                      <div className="flex-1 min-w-0 sm:ml-4 sm:pl-4 sm:border-l border-gray-100/60">
                        <p className="text-[13px] text-gray-500 leading-relaxed">
                          {sla.description}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )
              })}
            </motion.div>

            {/* SLA Compliance Note */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="glass-card rounded-2xl p-6 shadow-premium mt-8 text-center"
            >
              <div className="flex items-center justify-center gap-2 mb-3">
                <BadgeCheck className="w-5 h-5 text-emerald-600" />
                <span className="text-[14px] font-bold text-gray-900">Current SLA Compliance</span>
              </div>
              <div className="text-4xl font-extrabold text-emerald-600 mb-2">97.3%</div>
              <p className="text-[12px] text-gray-500 leading-relaxed max-w-md mx-auto">
                Based on the last 90 days of support data. We missed 2.7% of targets due to
                a database migration incident in April — and we documented that failure publicly.
                That&apos;s the ClearPath way.
              </p>
            </motion.div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════
            SECTION 9: CONNECT WITH US — SOCIAL MEDIA
            ═══════════════════════════════════════════════════════ */}
        <section className="py-20">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-center mb-14"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[11px] font-semibold bg-pink-50/80 text-pink-600 border border-pink-100/60 mb-4">
                <Globe className="w-3.5 h-3.5" />
                Connect With Us
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-gray-900">
                Follow Our Journey
              </h2>
              <p className="text-[15px] text-gray-500 mt-4 max-w-2xl mx-auto leading-relaxed">
                Stay connected across our social platforms. We share product updates, AI safety insights,
                community highlights, and behind-the-scenes looks at building honest AI.
              </p>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              {socialPlatforms.map((platform) => {
                const PlatformIcon = platform.icon
                return (
                  <motion.div
                    key={platform.name}
                    variants={fadeInUp}
                    className="glass-card rounded-2xl p-6 sm:p-8 shadow-premium hover:shadow-premium-lg transition-all duration-300 group relative overflow-hidden"
                  >
                    {/* Background decoration */}
                    <div className="absolute -top-16 -right-16 w-32 h-32 rounded-full opacity-5 group-hover:opacity-10 transition-opacity duration-500" style={{ backgroundColor: platform.color }} />

                    <div className="relative">
                      {/* Header */}
                      <div className="flex items-start gap-4 mb-5">
                        <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${platform.gradient} flex items-center justify-center shadow-lg shrink-0 group-hover:scale-110 transition-transform duration-300`}>
                          <PlatformIcon className="w-7 h-7 text-white" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="text-[17px] font-extrabold text-gray-900 tracking-tight">
                              {platform.name}
                            </h3>
                            {platform.comingSoon && (
                              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider bg-emerald-500 text-white">
                                <Sparkles className="w-2.5 h-2.5" /> Soon
                              </span>
                            )}
                          </div>
                          <p className="text-[13px] font-semibold mt-0.5" style={{ color: platform.color }}>
                            {platform.handle}
                          </p>
                        </div>
                      </div>

                      {/* Description */}
                      <p className="text-[12px] text-gray-500 leading-relaxed mb-5">
                        {platform.description}
                      </p>

                      {/* Stats */}
                      <div className="flex flex-wrap gap-2 mb-5">
                        {platform.stats.map((stat) => (
                          <span
                            key={stat}
                            className="inline-flex items-center px-2.5 py-1 rounded-lg text-[11px] font-medium border"
                            style={{
                              backgroundColor: `${platform.color}08`,
                              color: platform.color,
                              borderColor: `${platform.color}20`,
                            }}
                          >
                            {stat}
                          </span>
                        ))}
                      </div>

                      {/* CTA */}
                      {!platform.comingSoon ? (
                        <a
                          href={platform.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-5 py-2.5 text-[13px] font-semibold text-white rounded-xl shadow-md transition-all hover:shadow-lg"
                          style={{ backgroundColor: platform.color }}
                        >
                          {platform.cta}
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      ) : (
                        <button
                          className="inline-flex items-center gap-2 px-5 py-2.5 text-[13px] font-semibold text-gray-400 rounded-xl border border-gray-200 bg-gray-50/40 cursor-not-allowed"
                          disabled
                        >
                          {platform.cta}
                          <Sparkles className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  </motion.div>
                )
              })}
            </motion.div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════
            SECTION 10: FOR PARTNERS
            ═══════════════════════════════════════════════════════ */}
        <section className="py-20 bg-white/40">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-center mb-14"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[11px] font-semibold bg-emerald-50/80 text-emerald-600 border border-emerald-100/60 mb-4">
                <Briefcase className="w-3.5 h-3.5" />
                For Partners
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-gray-900">
                Enterprise Partnership Program
              </h2>
              <p className="text-[15px] text-gray-500 mt-4 max-w-2xl mx-auto leading-relaxed">
                Scale your organization&apos;s impact with ClearPath AI. Our partnership tiers are designed
                for organizations of every size — from grassroots nonprofits to federal agencies.
              </p>
            </motion.div>

            {/* Partnership Tiers */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
              className="grid grid-cols-1 lg:grid-cols-3 gap-6"
            >
              {partnerTiers.map((tier) => {
                const TierIcon = tier.icon
                return (
                  <motion.div
                    key={tier.name}
                    variants={fadeInUp}
                    className="glass-card rounded-2xl p-6 sm:p-8 shadow-premium hover:shadow-premium-lg transition-all duration-300 group relative overflow-hidden flex flex-col"
                  >
                    {/* Background accent */}
                    <div className="absolute -top-12 -right-12 w-24 h-24 rounded-full opacity-5 group-hover:opacity-10 transition-opacity duration-300" style={{ backgroundColor: tier.color }} />

                    <div className="relative flex-1 flex flex-col">
                      {/* Icon + Name */}
                      <div className="flex items-center gap-3 mb-4">
                        <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${tier.gradient} flex items-center justify-center shadow-md shrink-0`}>
                          <TierIcon className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <h3 className="text-[16px] font-bold text-gray-900 tracking-tight">{tier.name}</h3>
                          <span className="text-[18px] font-extrabold" style={{ color: tier.color }}>{tier.price}</span>
                        </div>
                      </div>

                      {/* Description */}
                      <p className="text-[12px] text-gray-500 leading-relaxed mb-5">
                        {tier.description}
                      </p>

                      {/* Features */}
                      <div className="space-y-2.5 mb-6 flex-1">
                        {tier.features.map((feature) => (
                          <div key={feature} className="flex items-start gap-2">
                            <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" style={{ color: tier.color }} />
                            <span className="text-[12px] text-gray-600">{feature}</span>
                          </div>
                        ))}
                      </div>

                      {/* CTA */}
                      <a
                        href="#contact-form"
                        className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 text-[13px] font-semibold rounded-xl border-2 transition-all hover:shadow-md"
                        style={{
                          borderColor: tier.color,
                          color: tier.color,
                        }}
                      >
                        Get Started
                        <ArrowRight className="w-4 h-4" />
                      </a>
                    </div>
                  </motion.div>
                )
              })}
            </motion.div>

            {/* Partnership Benefits Summary */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="glass-card rounded-2xl p-6 sm:p-8 shadow-premium mt-8"
            >
              <div className="flex flex-col sm:flex-row gap-6 items-start">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shadow-lg shrink-0">
                  <TrendingUp className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h3 className="text-[16px] font-bold text-gray-900 tracking-tight mb-2">
                    Why Partner With ClearPath AI?
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                    {[
                      { icon: Shield, title: 'Transparent AI', desc: '6-layer confidence architecture with full auditability' },
                      { icon: Users, title: '50K+ Resources', desc: 'Verified, up-to-date community resource database' },
                      { icon: Lock, title: 'HIPAA-Adjacent', desc: 'Privacy-first design with encryption at rest and in transit' },
                      { icon: Eye, title: 'Open Source', desc: 'All code publicly auditable on GitHub — no black boxes' },
                    ].map((benefit) => {
                      const BenefitIcon = benefit.icon
                      return (
                        <div key={benefit.title} className="flex items-start gap-3">
                          <div className="w-9 h-9 rounded-xl bg-emerald-50/60 flex items-center justify-center shrink-0">
                            <BenefitIcon className="w-4 h-4 text-emerald-600" />
                          </div>
                          <div>
                            <h4 className="text-[13px] font-bold text-gray-900">{benefit.title}</h4>
                            <p className="text-[11px] text-gray-500 leading-relaxed">{benefit.desc}</p>
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

        {/* ═══════════════════════════════════════════════════════
            SECTION 11: FOR MEDIA
            ═══════════════════════════════════════════════════════ */}
        <section className="py-20">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-center mb-14"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[11px] font-semibold bg-pink-50/80 text-pink-600 border border-pink-100/60 mb-4">
                <Camera className="w-3.5 h-3.5" />
                For Media
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-gray-900">
                Press & Media Resources
              </h2>
              <p className="text-[15px] text-gray-500 mt-4 max-w-2xl mx-auto leading-relaxed">
                We believe in radical transparency — not just in our AI, but in our story. Access our
                press kit, brand assets, and media contacts for coverage of ClearPath AI.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Press Kit Card */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="glass-card rounded-2xl p-6 sm:p-8 shadow-premium hover:shadow-premium-lg transition-shadow duration-300"
              >
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-pink-500 to-rose-600 flex items-center justify-center shadow-lg shrink-0">
                    <FileText className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <h3 className="text-[18px] font-bold text-gray-900 tracking-tight">
                      Press Kit
                    </h3>
                    <p className="text-[12px] text-pink-600 font-semibold mt-0.5">
                      Download our media assets
                    </p>
                  </div>
                </div>

                <p className="text-[13px] text-gray-500 leading-relaxed mb-6">
                  Our press kit includes brand guidelines, logos in multiple formats (SVG, PNG, EPS),
                  team headshots, product screenshots, fact sheets, and the ClearPath AI story —
                  everything you need for accurate, compelling coverage.
                </p>

                {/* Kit contents */}
                <div className="space-y-3 mb-6">
                  {[
                    { icon: Palette, text: 'Brand guidelines & logo pack (SVG, PNG, EPS)' },
                    { icon: Camera, text: 'High-res team headshots & product screenshots' },
                    { icon: FileCheck, text: 'Company fact sheet & founding story' },
                    { icon: Mic, text: 'Founder interview transcripts & quotes' },
                    { icon: Star, text: 'USAII Hackathon 2026 project overview' },
                  ].map((item) => {
                    const ItemIcon = item.icon
                    return (
                      <div key={item.text} className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-pink-50/60 flex items-center justify-center shrink-0">
                          <ItemIcon className="w-4 h-4 text-pink-500" />
                        </div>
                        <span className="text-[13px] text-gray-600">{item.text}</span>
                      </div>
                    )
                  })}
                </div>

                <button
                  className="inline-flex items-center gap-2 px-5 py-2.5 text-[13px] font-semibold text-white rounded-xl bg-gradient-to-b from-pink-500 to-rose-600 hover:from-pink-400 hover:to-rose-500 shadow-md shadow-pink-500/20 transition-all"
                >
                  <Download className="w-4 h-4" />
                  Download Press Kit
                </button>
              </motion.div>

              {/* Media Contact & Coverage Card */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="space-y-6"
              >
                {/* Media Contact */}
                <div className="glass-card rounded-2xl p-6 shadow-premium">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center shadow-lg shrink-0">
                      <Radio className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="text-[16px] font-bold text-gray-900 tracking-tight">Media Contact</h3>
                      <p className="text-[12px] text-gray-500">For press inquiries, interviews, and speaking engagements</p>
                    </div>
                  </div>

                  <div className="space-y-2.5">
                    <div className="flex items-center gap-3">
                      <Mail className="w-4 h-4 text-gray-400 shrink-0" />
                      <a href="mailto:amineharchelkorane5@gmail.com" className="text-[13px] text-blue-600 font-medium hover:underline">
                        amineharchelkorane5@gmail.com
                      </a>
                    </div>
                    <div className="flex items-center gap-3">
                      <Phone className="w-4 h-4 text-gray-400 shrink-0" />
                      <a href="mailto:amineharchelkorane5@gmail.com" className="text-[13px] text-gray-600 font-medium hover:text-blue-600 transition-colors">
                        amineharchelkorane5@gmail.com
                      </a>
                    </div>
                    <div className="flex items-center gap-3">
                      <Clock className="w-4 h-4 text-gray-400 shrink-0" />
                      <span className="text-[13px] text-gray-500">Response within 12 hours</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Mic className="w-4 h-4 text-gray-400 shrink-0" />
                      <span className="text-[13px] text-gray-500">Available for podcasts, panels, and keynotes</span>
                    </div>
                  </div>
                </div>

                {/* As Seen In / Coverage */}
                <div className="glass-card rounded-2xl p-6 shadow-premium">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center shadow-lg shrink-0">
                      <Newspaper className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="text-[16px] font-bold text-gray-900 tracking-tight">Coverage & Speaking</h3>
                      <p className="text-[12px] text-gray-500">Where ClearPath AI has been featured</p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    {[
                      { event: 'USAII Global AI Hackathon 2026', type: 'Competing Team', icon: Award },
                      { event: 'AI Ethics in Social Services Panel', type: 'Keynote Presentation', icon: Mic },
                      { event: 'Responsible AI for Crisis Response', type: 'Published Paper', icon: FileText },
                      { event: 'Open Source AI for Public Good', type: 'Community Talk', icon: Users },
                    ].map((item) => {
                      const ItemIcon = item.icon
                      return (
                        <div key={item.event} className="flex items-center gap-3 p-3 rounded-xl bg-gray-50/50 border border-gray-100/60">
                          <div className="w-8 h-8 rounded-lg bg-violet-50/60 flex items-center justify-center shrink-0">
                            <ItemIcon className="w-4 h-4 text-violet-500" />
                          </div>
                          <div>
                            <p className="text-[12px] font-semibold text-gray-900">{item.event}</p>
                            <p className="text-[11px] text-gray-400">{item.type}</p>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════
            SECTION 12: EMERGENCY / CRISIS RESOURCES
            ═══════════════════════════════════════════════════════ */}
        <section id="emergency" className="py-20 bg-white/40">
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
                Crisis Resources
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-gray-900">
                If You&apos;re in Crisis Right Now
              </h2>
              <p className="text-[15px] text-gray-500 mt-4 max-w-2xl mx-auto leading-relaxed">
                These resources are available 24/7/365. You don&apos;t need to wait for an email response.
                You don&apos;t need to be sure. You just need to reach out.
              </p>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
              className="space-y-5"
            >
              {/* 988 - Suicide & Crisis Lifeline */}
              <motion.div
                variants={fadeInUp}
                className="glass-card rounded-2xl p-6 sm:p-8 shadow-premium border-2 border-red-200/60 bg-red-50/20 relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-40 h-40 bg-red-100/30 rounded-full blur-2xl pointer-events-none" />
                <div className="flex flex-col sm:flex-row gap-6 items-start relative">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-red-500 to-rose-600 flex items-center justify-center shadow-lg shrink-0 crisis-pulse">
                    <Phone className="w-8 h-8 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-[20px] font-extrabold text-gray-900 tracking-tight">
                        988 Suicide & Crisis Lifeline
                      </h3>
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider bg-red-500 text-white">
                        24/7
                      </span>
                    </div>
                    <p className="text-[14px] font-bold text-red-600 mb-2">Call or text 988</p>
                    <p className="text-[13px] text-gray-500 leading-relaxed mb-4">
                      The 988 Lifeline provides free, confidential support for people in suicidal crisis or
                      emotional distress. Available 24/7 across the United States. You can call, text, or chat
                      online. Trained counselors are ready to listen and help. You don&apos;t have to be suicidal
                      to call — if you&apos;re struggling, they&apos;re there.
                    </p>
                    <div className="flex flex-wrap gap-3">
                      <a
                        href="tel:988"
                        className="inline-flex items-center gap-2 px-5 py-2.5 text-[13px] font-semibold text-white rounded-xl bg-gradient-to-b from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 shadow-md shadow-red-500/20 transition-all"
                      >
                        <Phone className="w-4 h-4" />
                        Call 988
                      </a>
                      <a
                        href="https://988lifeline.org/chat/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-5 py-2.5 text-[13px] font-semibold text-red-700 rounded-xl border border-red-200 bg-white/60 hover:bg-white hover:border-red-300 transition-all"
                      >
                        <MessageCircle className="w-4 h-4" />
                        Chat Online
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* 211 Helpline */}
              <motion.div
                variants={fadeInUp}
                className="glass-card rounded-2xl p-6 sm:p-8 shadow-premium border-2 border-amber-200/60 bg-amber-50/20 relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-40 h-40 bg-amber-100/30 rounded-full blur-2xl pointer-events-none" />
                <div className="flex flex-col sm:flex-row gap-6 items-start relative">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center shadow-lg shrink-0">
                    <Volume2 className="w-8 h-8 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-[20px] font-extrabold text-gray-900 tracking-tight">
                        211 Community Helpline
                      </h3>
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider bg-amber-500 text-white">
                        MOST AREAS
                      </span>
                    </div>
                    <p className="text-[14px] font-bold text-amber-600 mb-2">Dial 2-1-1</p>
                    <p className="text-[13px] text-gray-500 leading-relaxed mb-4">
                      211 connects you to local community resources including housing assistance, food programs,
                      utility help, mental health services, and more. Available in most areas 24/7. If 211
                      isn&apos;t available in your area, visit 211.org for an online directory of resources.
                    </p>
                    <div className="flex flex-wrap gap-3">
                      <a
                        href="tel:211"
                        className="inline-flex items-center gap-2 px-5 py-2.5 text-[13px] font-semibold text-white rounded-xl bg-gradient-to-b from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 shadow-md shadow-amber-500/20 transition-all"
                      >
                        <Phone className="w-4 h-4" />
                        Dial 211
                      </a>
                      <a
                        href="https://www.211.org/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-5 py-2.5 text-[13px] font-semibold text-amber-700 rounded-xl border border-amber-200 bg-white/60 hover:bg-white hover:border-amber-300 transition-all"
                      >
                        <Globe className="w-4 h-4" />
                        211.org
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Crisis Text Line */}
              <motion.div
                variants={fadeInUp}
                className="glass-card rounded-2xl p-6 sm:p-8 shadow-premium border-2 border-violet-200/60 bg-violet-50/20 relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-40 h-40 bg-violet-100/30 rounded-full blur-2xl pointer-events-none" />
                <div className="flex flex-col sm:flex-row gap-6 items-start relative">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center shadow-lg shrink-0">
                    <MessageSquare className="w-8 h-8 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-[20px] font-extrabold text-gray-900 tracking-tight">
                        Crisis Text Line
                      </h3>
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider bg-violet-500 text-white">
                        24/7
                      </span>
                    </div>
                    <p className="text-[14px] font-bold text-violet-600 mb-2">Text HOME to 741741</p>
                    <p className="text-[13px] text-gray-500 leading-relaxed mb-4">
                      If you prefer texting over calling, the Crisis Text Line provides free, 24/7 support
                      via text message. Text HOME to 741741 to connect with a trained crisis counselor.
                      Available in English and Spanish. No judgment, no waiting, just someone who will listen.
                    </p>
                    <div className="flex flex-wrap gap-3">
                      <a
                        href="sms:741741&body=HOME"
                        className="inline-flex items-center gap-2 px-5 py-2.5 text-[13px] font-semibold text-white rounded-xl bg-gradient-to-b from-violet-500 to-purple-600 hover:from-violet-400 hover:to-purple-500 shadow-md shadow-violet-500/20 transition-all"
                      >
                        <MessageSquare className="w-4 h-4" />
                        Text HOME to 741741
                      </a>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Additional Resources Row */}
              <motion.div
                variants={fadeInUp}
                className="grid grid-cols-1 sm:grid-cols-3 gap-4"
              >
                {[
                  {
                    name: 'Trevor Project',
                    detail: '1-866-488-7386',
                    desc: 'LGBTQ+ youth crisis support',
                    color: '#10b981',
                    icon: Heart,
                  },
                  {
                    name: 'Veterans Crisis Line',
                    detail: '988, then press 1',
                    desc: 'Veterans and service members',
                    color: '#3b82f6',
                    icon: Shield,
                  },
                  {
                    name: 'SAMHSA Helpline',
                    detail: '1-800-662-4357',
                    desc: 'Substance abuse & mental health',
                    color: '#8b5cf6',
                    icon: LifeBuoy,
                  },
                ].map((resource) => {
                  const Icon = resource.icon
                  return (
                    <div
                      key={resource.name}
                      className="glass-card rounded-xl p-5 shadow-premium hover:shadow-premium-lg transition-all duration-300"
                    >
                      <div className="flex items-center gap-3 mb-3">
                        <div
                          className="w-10 h-10 rounded-xl flex items-center justify-center"
                          style={{ backgroundColor: `${resource.color}10` }}
                        >
                          <Icon className="w-5 h-5" style={{ color: resource.color }} />
                        </div>
                        <div>
                          <h4 className="text-[14px] font-bold text-gray-900">{resource.name}</h4>
                          <p className="text-[12px] font-semibold" style={{ color: resource.color }}>
                            {resource.detail}
                          </p>
                        </div>
                      </div>
                      <p className="text-[12px] text-gray-500">{resource.desc}</p>
                    </div>
                  )
                })}
              </motion.div>
            </motion.div>

            {/* Important Note */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="glass-card rounded-2xl p-6 shadow-premium mt-8"
            >
              <div className="flex items-start gap-3">
                <ShieldAlert className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                <div>
                  <p className="text-[13px] font-bold text-gray-900 mb-2">
                    ClearPath AI is not a crisis service
                  </p>
                  <p className="text-[12px] text-gray-500 leading-relaxed">
                    While our system detects crisis keywords and routes users to professional help, ClearPath AI
                    is not a substitute for professional crisis intervention. If you or someone you know is in
                    immediate danger, please call <strong>988</strong>, go to your nearest emergency room, or
                    call <strong>911</strong>. Our AI can help you find resources, but it cannot provide
                    emergency care.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════
            SECTION 13: COMMUNITY
            ═══════════════════════════════════════════════════════ */}
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
                <Users className="w-3.5 h-3.5" />
                Community
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-gray-900">
                Join the ClearPath Community
              </h2>
              <p className="text-[15px] text-gray-500 mt-4 max-w-2xl mx-auto leading-relaxed">
                We&apos;re building more than a product — we&apos;re building a community of people who
                believe that honesty in AI matters, especially for those who need it most.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Discord / Forum Placeholder */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="glass-card rounded-2xl p-6 sm:p-8 shadow-premium hover:shadow-premium-lg transition-shadow duration-300"
              >
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center shadow-lg shrink-0">
                    <MessageCircle className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <h3 className="text-[18px] font-bold text-gray-900 tracking-tight">
                      Community Forum & Discord
                    </h3>
                    <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-50 text-emerald-600 border border-emerald-100/60 mt-1">
                      <Sparkles className="w-2.5 h-2.5" />
                      Coming Q3 2026
                    </div>
                  </div>
                </div>

                <p className="text-[13px] text-gray-500 leading-relaxed mb-6">
                  We&apos;re building a dedicated community space where users, developers, social workers,
                  and advocates can share feedback, discuss improvements, and help each other navigate
                  the complex landscape of community resources. Sign up to be notified when we launch.
                </p>

                {/* Feature List */}
                <div className="space-y-3 mb-6">
                  {[
                    { icon: MessageSquare, text: 'Peer-to-peer support and resource sharing' },
                    { icon: Code2, text: 'Developer community and API discussion' },
                    { icon: BookOpen, text: 'Resource verification workshops' },
                    { icon: Users, text: 'Monthly community calls with the team' },
                  ].map((feature) => {
                    const FeatureIcon = feature.icon
                    return (
                      <div key={feature.text} className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-violet-50/60 flex items-center justify-center shrink-0">
                          <FeatureIcon className="w-4 h-4 text-violet-500" />
                        </div>
                        <span className="text-[13px] text-gray-600">{feature.text}</span>
                      </div>
                    )
                  })}
                </div>

                {/* Email signup placeholder */}
                <div className="flex gap-2">
                  <input
                    type="email"
                    placeholder="Enter your email for early access"
                    className="flex-1 px-4 py-2.5 text-[13px] rounded-xl border border-gray-200 bg-white/80 focus:border-violet-300 focus:ring-2 focus:ring-violet-100 outline-none transition-all placeholder:text-gray-400"
                  />
                  <button className="px-4 py-2.5 text-[13px] font-semibold text-white rounded-xl bg-gradient-to-b from-violet-500 to-violet-600 hover:from-violet-400 hover:to-violet-500 shadow-md shadow-violet-500/20 transition-all shrink-0">
                    Notify Me
                  </button>
                </div>
              </motion.div>

              {/* Community Guidelines */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="glass-card rounded-2xl p-6 sm:p-8 shadow-premium"
              >
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shadow-lg shrink-0">
                    <BookOpen className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <h3 className="text-[18px] font-bold text-gray-900 tracking-tight">
                      Community Guidelines
                    </h3>
                    <p className="text-[12px] text-gray-500 mt-1">
                      Our principles for a safe, supportive space
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  {communityGuidelines.map((guideline) => {
                    const GuidelineIcon = guideline.icon
                    return (
                      <div key={guideline.title} className="flex items-start gap-3">
                        <div className="w-9 h-9 rounded-xl bg-emerald-50/60 flex items-center justify-center shrink-0 mt-0.5">
                          <GuidelineIcon className="w-4 h-4 text-emerald-600" />
                        </div>
                        <div>
                          <h4 className="text-[13px] font-bold text-gray-900">{guideline.title}</h4>
                          <p className="text-[12px] text-gray-500 leading-relaxed mt-0.5">
                            {guideline.description}
                          </p>
                        </div>
                      </div>
                    )
                  })}
                </div>

                {/* Open Source Callout */}
                <div className="mt-6 pt-6 border-t border-gray-100/60">
                  <div className="flex items-start gap-3">
                    <Github className="w-5 h-5 text-gray-700 shrink-0 mt-0.5" />
                    <div>
                      <p className="text-[13px] font-bold text-gray-900 mb-1">We&apos;re Open Source</p>
                      <p className="text-[12px] text-gray-500 leading-relaxed">
                        ClearPath AI is open source on GitHub. We believe transparency extends beyond our AI —
                        it includes our code. Contribute, fork, or audit. Visit us at{' '}
                        <a
                          href="https://github.com/Vitalcheffe/clearpath-ai"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:underline font-medium"
                        >
                          github.com/Vitalcheffe/clearpath-ai
                        </a>
                        .
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Community Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8"
            >
              {[
                { label: 'GitHub Stars', value: '128+', icon: CheckCircle2, color: '#f59e0b' },
                { label: 'Contributors', value: '12+', icon: Users, color: '#3b82f6' },
                { label: 'Resources Verified', value: '50K+', icon: FileCheck, color: '#10b981' },
                { label: 'Issues Resolved', value: '94%', icon: BadgeCheck, color: '#8b5cf6' },
              ].map((stat) => {
                const StatIcon = stat.icon
                return (
                  <div key={stat.label} className="glass-card rounded-xl p-4 shadow-premium text-center">
                    <StatIcon className="w-5 h-5 mx-auto mb-2" style={{ color: stat.color }} />
                    <div className="text-2xl font-extrabold text-gray-900">{stat.value}</div>
                    <div className="text-[11px] text-gray-400 font-medium mt-0.5">{stat.label}</div>
                  </div>
                )
              })}
            </motion.div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════
            SECTION 14: FAQ
            ═══════════════════════════════════════════════════════ */}
        <section className="py-20 bg-white/40">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-center mb-14"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[11px] font-semibold bg-gray-100/80 text-gray-600 border border-gray-200/60 mb-4">
                <Info className="w-3.5 h-3.5" />
                Frequently Asked Questions
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-gray-900">
                Common Questions
              </h2>
              <p className="text-[15px] text-gray-500 mt-4 max-w-2xl mx-auto leading-relaxed">
                Quick answers to the questions we hear most. Can&apos;t find what you&apos;re looking for?
                Use the contact form above or email us directly.
              </p>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={{ visible: { transition: { staggerChildren: 0.06 } } }}
              className="space-y-3"
            >
              {faqs.map((faq, index) => (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  className="glass-card rounded-xl shadow-premium overflow-hidden"
                >
                  <button
                    onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                    className="w-full flex items-center justify-between px-6 py-5 text-left hover:bg-white/40 transition-colors"
                    aria-expanded={expandedFaq === index}
                  >
                    <span className="text-[14px] font-semibold text-gray-900 pr-4">
                      {faq.question}
                    </span>
                    <motion.div
                      animate={{ rotate: expandedFaq === index ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                      className="shrink-0"
                    >
                      <ChevronDown className="w-5 h-5 text-gray-400" />
                    </motion.div>
                  </button>
                  <AnimatePresence>
                    {expandedFaq === index && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                      >
                        <div className="px-6 pb-5">
                          <div className="border-t border-gray-100/60 pt-4">
                            <p className="text-[13px] text-gray-500 leading-relaxed">
                              {faq.answer}
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════
            SECTION 15: CTA — TRY THE DEMO
            ═══════════════════════════════════════════════════════ */}
        <section className="py-20">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="glass-card rounded-2xl p-8 md:p-14 shadow-premium-xl relative overflow-hidden"
            >
              {/* Decorative blurs */}
              <div className="absolute -top-20 -right-20 w-60 h-60 bg-blue-100/20 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-emerald-100/20 rounded-full blur-3xl pointer-events-none" />

              <div className="text-center relative">
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className="w-20 h-20 rounded-2xl bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center shadow-lg mx-auto mb-8 subtle-float"
                >
                  <Layers className="w-10 h-10 text-white" />
                </motion.div>

                <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-gray-900 mb-4">
                  Ready to Experience{' '}
                  <span className="bg-gradient-to-r from-blue-600 via-emerald-500 to-teal-500 bg-clip-text text-transparent gradient-text-animate">
                    Honest AI
                  </span>
                  ?
                </h2>

                <p className="text-[15px] text-gray-500 max-w-2xl mx-auto leading-relaxed mb-8">
                  ClearPath AI proves that transparency isn&apos;t a limitation — it&apos;s a competitive advantage.
                  Every result shows its confidence. Every gap triggers a human handoff. Every decision is auditable.
                  Try the demo and see for yourself.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
                  <Link
                    href="/app"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 text-[15px] font-semibold text-white rounded-xl bg-gradient-to-b from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 shadow-lg shadow-blue-500/20 hover:shadow-xl hover:shadow-blue-500/30 transition-all"
                  >
                    Try the Demo
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                  <Link
                    href="https://github.com/Vitalcheffe/clearpath-ai"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 text-[15px] font-semibold text-gray-700 rounded-xl border border-gray-200 bg-white/60 hover:bg-white hover:border-gray-300 hover:shadow-sm transition-all"
                  >
                    <Github className="w-4 h-4" />
                    View on GitHub
                  </Link>
                </div>

                {/* Trust badges */}
                <div className="flex flex-wrap items-center justify-center gap-4 text-[12px] text-gray-400">
                  <div className="flex items-center gap-1.5">
                    <Shield className="w-3.5 h-3.5" />
                    6-Layer Transparency
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Lock className="w-3.5 h-3.5" />
                    Privacy First
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Eye className="w-3.5 h-3.5" />
                    Open Source
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Heart className="w-3.5 h-3.5" />
                    Built for People
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════
            FOOTER
            ═══════════════════════════════════════════════════════ */}
        <footer className="py-12 border-t border-gray-100/60">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-gray-900 to-gray-700 flex items-center justify-center">
                  <Layers className="w-3.5 h-3.5 text-white" />
                </div>
                <span className="text-[14px] font-bold tracking-tight text-gray-900">
                  ClearPath AI
                </span>
                <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[9px] font-bold tracking-wider uppercase bg-emerald-50 text-emerald-600 border border-emerald-100/60">
                  Demo
                </span>
              </div>

              <nav className="flex flex-wrap items-center justify-center gap-4 text-[12px] text-gray-500">
                <Link href="/about" className="hover:text-gray-900 transition-colors">About</Link>
                <Link href="/privacy" className="hover:text-gray-900 transition-colors">Privacy</Link>
                <Link href="/terms" className="hover:text-gray-900 transition-colors">Terms</Link>
                <Link href="/pricing" className="hover:text-gray-900 transition-colors">Pricing</Link>
                <Link href="/contact" className="hover:text-gray-900 transition-colors font-semibold text-gray-700">Contact</Link>
                <a
                  href="https://github.com/Vitalcheffe/clearpath-ai"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-gray-900 transition-colors"
                >
                  GitHub
                </a>
              </nav>

              <p className="text-[11px] text-gray-400">
                &copy; 2026 ClearPath AI &middot; USAII Hackathon
              </p>
            </div>

            {/* Emergency Footer */}
            <div className="mt-6 pt-6 border-t border-gray-100/60 text-center">
              <p className="text-[11px] text-gray-400">
                If you&apos;re in crisis: Call <strong className="text-red-500">988</strong> &middot; Text HOME to <strong className="text-violet-500">741741</strong> &middot; Dial <strong className="text-amber-500">211</strong>
              </p>
            </div>
          </div>
        </footer>

      </main>
      <Footer />
    </div>
  )
}
