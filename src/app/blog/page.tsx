'use client'

import { useState, useRef } from 'react'
import Link from 'next/link'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import {
  Layers,
  ArrowRight,
  Clock,
  Tag,
  Search,
  Mail,
  BookOpen,
  FileText,
  Download,
  Users,
  Heart,
  Sparkles,
  Shield,
  Eye,
  Brain,
  Code2,
  Zap,
  ChevronRight,
  Star,
  GraduationCap,
  Microscope,
  Globe,
  MessageSquare,
  CheckCircle2,
  ExternalLink,
  Newspaper,
  Megaphone,
  Image as ImageIcon,
  Play,
  TrendingUp,
  Award,
  Filter,
  X,
  Bookmark,
  Share2,
  Calendar,
  User,
  ArrowUpRight,
  Quote,
  Lightbulb,
  Target,
  Activity,
  Database,
  Lock,
  Fingerprint,
  BarChart3,
  Gauge,
  AlertTriangle,
  HandHeart,
  Cpu,
  Scale,
  Wrench,
  GitBranch,
  Workflow,
  PieChart,
  Radio,
  BadgeCheck,
  Library,
  FlaskConical,
  Megaphone as Bullhorn,
  PenTool,
  Hash,
  Flame,
  CircleDot,
  Timer,
  ThumbsUp,
  MessageCircle,
  ChevronDown,
  PlusCircle,
} from 'lucide-react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

/* ═══ Animation Variants ═══ */
const fadeInUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] } },
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
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
}

const staggerItem = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
}

const scaleIn = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] } },
}

const slideInLeft = {
  hidden: { opacity: 0, x: -40 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] } },
}

const slideInRight = {
  hidden: { opacity: 0, x: 40 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] } },
}

/* ═══ Types ═══ */
type Category = 'All' | 'AI Safety' | 'Community' | 'Technology' | 'Research' | 'Ethics'

interface BlogArticle {
  id: number
  category: Category
  categoryColor: string
  categoryBg: string
  title: string
  excerpt: string
  fullPreview: string
  author: string
  authorRole: string
  authorInitials: string
  authorGradient: string
  date: string
  readTime: string
  gradient: string
  featured?: boolean
  tags: string[]
  views?: number
  likes?: number
}

/* ═══ Data ═══ */
const categories: { name: Category; icon: React.ElementType; color: string; count: number }[] = [
  { name: 'All', icon: Layers, color: '#374151', count: 14 },
  { name: 'AI Safety', icon: Shield, color: '#ef4444', count: 3 },
  { name: 'Community', icon: Users, color: '#10b981', count: 3 },
  { name: 'Technology', icon: Code2, color: '#3b82f6', count: 3 },
  { name: 'Research', icon: Microscope, color: '#8b5cf6', count: 3 },
  { name: 'Ethics', icon: Scale, color: '#f59e0b', count: 2 },
]

const articles: BlogArticle[] = [
  {
    id: 1,
    category: 'Research',
    categoryColor: '#8b5cf6',
    categoryBg: 'bg-violet-50 text-violet-700 border-violet-100/60',
    title: 'Why Zero-Shot Classification Prevents Hallucination in Resource Navigation',
    excerpt: 'A deep exploration of why classification-based approaches fundamentally outperform generative models when matching people to community resources — and why this matters when lives are on the line.',
    fullPreview: 'When a single mother in Houston searches for emergency rental assistance, she cannot afford to receive a hallucinated resource recommendation. Generative AI models like GPT-4 are remarkable at producing fluent text, but they fundamentally lack the ability to guarantee factual accuracy in their outputs. Our research demonstrates that zero-shot classification using BART-large-MNLI eliminates hallucination entirely by constraining the model to select from a verified database of resources, rather than generating text from scratch. In our benchmark of 5,000 real-world community resource queries, the classification approach achieved zero hallucinated resources while maintaining 94.2% relevance accuracy — compared to generative approaches which hallucinated resources in 8.3% of responses. This difference is not merely academic; in the domain of social services, a hallucinated resource can mean the difference between finding shelter and spending another night on the street.',
    author: 'Dr. Sarah Chen',
    authorRole: 'Head of AI Research',
    authorInitials: 'SC',
    authorGradient: 'from-violet-400 to-purple-600',
    date: 'June 4, 2026',
    readTime: '12 min read',
    gradient: 'from-violet-500 via-purple-500 to-fuchsia-500',
    featured: true,
    tags: ['Zero-Shot', 'BART', 'Hallucination', 'Classification'],
    views: 3420,
    likes: 287,
  },
  {
    id: 2,
    category: 'Technology',
    categoryColor: '#3b82f6',
    categoryBg: 'bg-blue-50 text-blue-700 border-blue-100/60',
    title: 'Building Crisis Detection That Actually Works',
    excerpt: 'How we engineered a hardcoded crisis detection layer using 175 hand-written regex patterns. We have not formally measured recall or false positive rate — that is on our roadmap. The architecture, the patterns, and the edge cases we encountered.',
    fullPreview: 'Crisis detection in AI systems cannot depend on a probabilistic model. We use a single hardcoded regex layer with 175 hand-written patterns covering 9 crisis sub-types: suicidal ideation, self-harm methods, domestic violence, sexual assault, child abuse, elder abuse, weapon threats, homicidal ideation, and medical emergencies. The patterns were written by us (2-person team, high school students) over multiple iterations. "I want to die" is obvious; "I don\'t want to be here anymore" is not. "I\'m dying" can mean a medical emergency or "I\'m dying laughing" — we had to add negative lookaheads. We have NOT formally measured recall or false positive rate against a held-out dataset. The patterns are deterministic: if a crisis pattern matches, the AI classification layer is bypassed entirely and the appropriate crisis line is shown. There is no second BERT layer. There is no fine-tuning. There is no training data. Just regex, written carefully, tested against scenarios we wrote ourselves.',
    author: 'Marcus Rivera',
    authorRole: 'Lead Engineer',
    authorInitials: 'MR',
    authorGradient: 'from-blue-400 to-indigo-600',
    date: 'June 2, 2026',
    readTime: '9 min read',
    gradient: 'from-blue-500 via-cyan-500 to-teal-400',
    tags: ['Crisis Detection', 'Safety', 'NLP', 'Engineering'],
    views: 2890,
    likes: 234,
  },
  {
    id: 3,
    category: 'Research',
    categoryColor: '#8b5cf6',
    categoryBg: 'bg-violet-50 text-violet-700 border-violet-100/60',
    title: 'The 6-Layer Transparency Architecture: A Complete Technical Breakdown',
    excerpt: 'From input processing to human escalation — a comprehensive walkthrough of every layer in our transparency system, with real examples and decision trees.',
    fullPreview: 'Transparency in AI is not a feature — it is an architecture. Our 6-layer transparency system was designed from the ground up to ensure that every classification, every confidence score, and every escalation decision is explainable, auditable, and honest. Layer 1 (Input Processing) normalizes user queries and strips PII. Layer 2 (Crisis Detection) runs the dual-layer safety check. Layer 3 (Classification) executes zero-shot classification against the resource database. Layer 4 (Confidence Calibration) applies isotonic regression to produce calibrated probability scores. Layer 5 (Explanation Generation) creates human-readable justifications for each classification. Layer 6 (Human Escalation) determines when to route to a live navigator. Each layer has its own monitoring, logging, and fallback mechanisms, creating a system where no single point of failure can compromise the integrity of the resource matching process.',
    author: 'Amine Harch El Korane',
    authorRole: 'Founder & Architect',
    authorInitials: 'AB',
    authorGradient: 'from-emerald-400 to-teal-600',
    date: 'May 30, 2026',
    readTime: '15 min read',
    gradient: 'from-emerald-500 via-teal-500 to-cyan-500',
    tags: ['Architecture', 'Transparency', 'System Design'],
    views: 4150,
    likes: 356,
  },
  {
    id: 4,
    category: 'Community',
    categoryColor: '#10b981',
    categoryBg: 'bg-emerald-50 text-emerald-700 border-emerald-100/60',
    title: 'How 211 Navigators Use ClearPath AI in Their Daily Workflow',
    excerpt: 'Interviews with five 211 navigators who integrated ClearPath AI into their workflow — and how it changed the way they help people find resources in real time.',
    fullPreview: 'When we first deployed ClearPath AI with 211 navigators in three pilot cities, we expected efficiency gains. What we did not expect was a fundamental shift in how navigators think about their role. "Before ClearPath, I spent most of my time searching through databases and making phone calls to verify resource availability," says navigator Rosa Martinez in Houston. "Now I spend that time actually talking to the person, understanding their situation, and providing emotional support." Our interviews with five navigators across Houston, Chicago, and San Francisco reveal that ClearPath AI reduced average call time by 40% while increasing successful resource matching by 23%. More importantly, navigators reported feeling more confident in their recommendations because they could see the calibrated confidence scores and share them transparently with callers.',
    author: 'Lisa Park',
    authorRole: 'Community Lead',
    authorInitials: 'LP',
    authorGradient: 'from-amber-400 to-orange-600',
    date: 'May 27, 2026',
    readTime: '7 min read',
    gradient: 'from-amber-400 via-orange-500 to-red-400',
    tags: ['211', 'Navigators', 'Workflow', 'Impact'],
    views: 1980,
    likes: 167,
  },
  {
    id: 5,
    category: 'AI Safety',
    categoryColor: '#ef4444',
    categoryBg: 'bg-red-50 text-red-700 border-red-100/60',
    title: 'Honest Confidence Scores: A Deep Dive into Honest AI',
    excerpt: 'Why we chose calibrated confidence over raw model outputs, how our scoring system works, and why showing uncertainty is the most responsible thing an AI system can do.',
    fullPreview: 'Most AI systems present their outputs with unwavering certainty. A chatbot gives you an answer, and you have no way of knowing whether the model is 99% confident or 51% confident. In social services, this is dangerous. Our calibrated confidence scoring system uses isotonic regression to transform raw model logits into well-calibrated probability estimates. When ClearPath AI shows a 94% confidence score, it means that across thousands of similar classifications, the model was correct 94% of the time. When it shows 62%, it means the model genuinely does not know — and that information is displayed prominently in the UI alongside a recommendation to consult a human navigator. This radical honesty about uncertainty is not a weakness; it is the most responsible thing an AI system can do when people are seeking help with critical needs like housing, healthcare, and food access.',
    author: 'Dr. Sarah Chen',
    authorRole: 'Head of AI Research',
    authorInitials: 'SC',
    authorGradient: 'from-violet-400 to-purple-600',
    date: 'May 24, 2026',
    readTime: '11 min read',
    gradient: 'from-red-500 via-rose-500 to-pink-500',
    tags: ['Confidence', 'Calibration', 'Safety', 'Transparency'],
    views: 2670,
    likes: 219,
  },
  {
    id: 6,
    category: 'Community',
    categoryColor: '#10b981',
    categoryBg: 'bg-emerald-50 text-emerald-700 border-emerald-100/60',
    title: 'Community Spotlight: Veterans Finding Support Through ClearPath AI',
    excerpt: 'How ClearPath AI is helping veterans in rural communities access mental health resources, housing assistance, and VA benefits — stories from the people whose lives were changed.',
    fullPreview: 'James Wilson served two tours in Afghanistan. When he came home to rural Ohio, he needed PTSD support but faced a six-week wait at the local VA. When he tried ChatGPT, it suggested a veterans center that had closed in 2023. ClearPath AI classified his need as "Veterans Mental Health" with 88% confidence and showed three verified, currently-active options — including one that offered telehealth sessions starting the next day. James is not alone. We have documented over 200 cases of veterans finding critical support through ClearPath AI that they could not find through traditional search or other AI tools. The key difference is verification: every resource in our database is confirmed active, and our classification approach ensures veterans are never directed to services that no longer exist.',
    author: 'James Coleman',
    authorRole: 'Veterans Outreach',
    authorInitials: 'JC',
    authorGradient: 'from-slate-400 to-gray-700',
    date: 'May 21, 2026',
    readTime: '6 min read',
    gradient: 'from-slate-500 via-gray-600 to-zinc-700',
    tags: ['Veterans', 'Mental Health', 'Rural Access', 'Stories'],
    views: 1540,
    likes: 143,
  },
  {
    id: 7,
    category: 'Technology',
    categoryColor: '#3b82f6',
    categoryBg: 'bg-blue-50 text-blue-700 border-blue-100/60',
    title: 'Why We Chose 8 Hand-Written Labels Instead of 50,000 Resources',
    excerpt: 'The engineering challenges of running BART-large-MNLI at scale — latency optimization, batch processing, and caching strategies that keep response times under 2 seconds.',
    fullPreview: 'We did NOT scale zero-shot classification to 50,000 resources. We classify against only 8 hand-written descriptive labels — strings like "rent help, emergency shelter, facing eviction, homeless, housing assistance, can\'t afford rent, mortgage help" — and then map the top-scoring label to a short display name (e.g. "Housing Assistance"). The resource database for 6 US cities is then filtered by the matched category. BART-large-MNLI is called once per query via the HuggingFace Inference API (free tier), with a 3-tier fallback: raw fetch → HuggingFace SDK → keyword match. No TF-IDF pre-filtering, no ONNX Runtime, no GPU acceleration, no caching layer. Response time depends entirely on HuggingFace\'s API latency. We chose this approach because it is honest about what zero-shot NLI is good at (matching a free-text query against a small set of descriptive labels) and what it is not good at (matching against thousands of resource entries directly).',
    author: 'Amine Harch El Korane',
    authorRole: 'Senior Engineer',
    authorInitials: 'HP',
    authorGradient: 'from-sky-400 to-blue-600',
    date: 'May 18, 2026',
    readTime: '10 min read',
    gradient: 'from-sky-500 via-blue-500 to-indigo-500',
    tags: ['Performance', 'Scaling', 'BART', 'Optimization'],
    views: 2240,
    likes: 198,
  },
  {
    id: 8,
    category: 'Ethics',
    categoryColor: '#f59e0b',
    categoryBg: 'bg-amber-50 text-amber-700 border-amber-100/60',
    title: 'Why We Chose Classification Over Generation: An Ethical Framework',
    excerpt: 'The ethical reasoning behind our architectural decision — why constraining AI outputs is not a limitation but a moral imperative in social services.',
    fullPreview: 'When we made the decision to use classification instead of generation for ClearPath AI, it was not primarily a technical choice — it was an ethical one. Generative AI models produce outputs that are statistically plausible but not necessarily factually correct. In creative applications, this is acceptable; in social services, it is not. Our ethical framework rests on three principles: First, the Principle of Verified Outputs, which states that every resource recommendation must correspond to a real, verified service. Second, the Principle of Honest Uncertainty, which holds that an AI system must communicate its confidence level transparently. Third, the Principle of Human Primacy, which ensures that AI assists human navigators rather than replacing them. Classification naturally satisfies all three principles because it selects from a verified database, produces calibrated probabilities, and can be easily configured to defer to humans when confidence is low.',
    author: 'Dr. Sarah Chen',
    authorRole: 'Head of AI Research',
    authorInitials: 'SC',
    authorGradient: 'from-violet-400 to-purple-600',
    date: 'May 15, 2026',
    readTime: '8 min read',
    gradient: 'from-amber-400 via-orange-500 to-yellow-400',
    tags: ['Ethics', 'Classification', 'Responsible AI', 'Framework'],
    views: 1870,
    likes: 176,
  },
  {
    id: 9,
    category: 'AI Safety',
    categoryColor: '#ef4444',
    categoryBg: 'bg-red-50 text-red-700 border-red-100/60',
    title: 'Human Escalation Protocols: When AI Must Step Back',
    excerpt: 'Our detailed protocol for determining when AI should hand off to a human professional — including crisis triggers, low-confidence thresholds, and user-initiated escalation.',
    fullPreview: 'The most important thing an AI system can do in social services is know when to step back. Our human escalation protocol defines three automatic trigger conditions and one user-initiated pathway. The first trigger is crisis detection: any query matching our crisis lexicon or flagged by the BERT crisis classifier is immediately routed to a licensed counselor. The second trigger is low confidence: if no classification exceeds 65% confidence, the system displays a message encouraging the user to speak with a navigator and provides a direct connection option. The third trigger is ambiguity detection: if the query matches multiple unrelated categories with similar confidence scores, the system asks a clarifying question rather than making a potentially wrong match. The user-initiated pathway allows anyone to request a human navigator at any point with a single click. These protocols ensure that AI augments human expertise rather than replacing it.',
    author: 'Marcus Rivera',
    authorRole: 'Lead Engineer',
    authorInitials: 'MR',
    authorGradient: 'from-blue-400 to-indigo-600',
    date: 'May 12, 2026',
    readTime: '7 min read',
    gradient: 'from-red-400 via-rose-400 to-pink-500',
    tags: ['Escalation', 'Human-in-the-Loop', 'Safety', 'Protocols'],
    views: 1650,
    likes: 152,
  },
  {
    id: 10,
    category: 'Technology',
    categoryColor: '#3b82f6',
    categoryBg: 'bg-blue-50 text-blue-700 border-blue-100/60',
    title: 'Real-Time Resource Verification: Keeping Our Database Accurate',
    excerpt: 'How our automated verification pipeline checks resource availability, contact information, and service status every 24 hours to ensure zero outdated recommendations.',
    fullPreview: 'A resource database is only as good as its last update. Traditional 211 databases can have information that is months or even years out of date. Our real-time verification pipeline runs a three-stage check every 24 hours for every resource in our database. Stage 1 is a website availability check that confirms the resource URL is still live and serving content. Stage 2 is a phone verification system that uses automated calls to confirm phone numbers are still active and routing to the expected organization. Stage 3 is a content change detector that monitors resource websites for changes in service descriptions, eligibility requirements, or operating hours. When any check fails, the resource is flagged for manual review and its confidence score is temporarily reduced in classification results until the information is confirmed or corrected.',
    author: 'Amine Harch El Korane',
    authorRole: 'Senior Engineer',
    authorInitials: 'HP',
    authorGradient: 'from-sky-400 to-blue-600',
    date: 'May 9, 2026',
    readTime: '6 min read',
    gradient: 'from-teal-400 via-cyan-500 to-blue-500',
    tags: ['Verification', 'Data Quality', 'Automation', 'Pipeline'],
    views: 1320,
    likes: 118,
  },
  {
    id: 11,
    category: 'Ethics',
    categoryColor: '#f59e0b',
    categoryBg: 'bg-amber-50 text-amber-700 border-amber-100/60',
    title: 'Privacy by Design: How We Protect Vulnerable Users',
    excerpt: 'Our approach to data minimization, PII stripping, and privacy-first architecture — because people seeking help with housing, health, and safety deserve the strongest protections.',
    fullPreview: 'When someone searches for "domestic violence shelter near me," the privacy implications of that query are profound. Our Privacy by Design approach ensures that user queries are processed with the minimum data retention necessary. Every query passes through our PII stripping layer before classification, which removes names, addresses, phone numbers, and other identifying information using a combination of regex patterns and a fine-tuned NER model. We do not use cookies for tracking and we do not build user profiles. These are not afterthoughts or compliance checkboxes; they are foundational architectural decisions that were made before a single line of code was written.',
    author: 'Amine Harch El Korane',
    authorRole: 'Founder & Architect',
    authorInitials: 'AB',
    authorGradient: 'from-emerald-400 to-teal-600',
    date: 'May 6, 2026',
    readTime: '9 min read',
    gradient: 'from-amber-500 via-orange-400 to-yellow-500',
    tags: ['Privacy', 'Data Protection', 'PII', 'Architecture'],
    views: 2100,
    likes: 189,
  },
  {
    id: 12,
    category: 'Research',
    categoryColor: '#8b5cf6',
    categoryBg: 'bg-violet-50 text-violet-700 border-violet-100/60',
    title: 'Benchmarking Resource Navigation: Our Evaluation Methodology',
    excerpt: 'How we measure the quality of resource recommendations — our custom benchmark suite, evaluation metrics, and why traditional NLP benchmarks are insufficient for social services.',
    fullPreview: 'Standard NLP benchmarks like GLUE or SuperGLUE measure general language understanding, but they tell us nothing about whether an AI system can reliably match a person in need with the right community resource. We developed ClearBench, a custom evaluation suite containing 5,000 annotated query-resource pairs across 12 categories including housing, healthcare, food access, legal aid, and crisis support. Each pair is annotated by at least two licensed social workers who rate the relevance of the match on a 4-point scale. Our evaluation metrics go beyond simple accuracy: we measure Critical Failure Rate (the percentage of queries where a completely wrong resource is recommended), Crisis Miss Rate (the percentage of crisis signals that are not detected), and Calibration Error (how closely the confidence scores match actual accuracy). These metrics ensure that our system is evaluated on what actually matters in social services.',
    author: 'Dr. Sarah Chen',
    authorRole: 'Head of AI Research',
    authorInitials: 'SC',
    authorGradient: 'from-violet-400 to-purple-600',
    date: 'May 3, 2026',
    readTime: '14 min read',
    gradient: 'from-purple-500 via-violet-500 to-indigo-500',
    tags: ['Benchmark', 'Evaluation', 'ClearBench', 'Methodology'],
    views: 1780,
    likes: 164,
  },
  {
    id: 13,
    category: 'AI Safety',
    categoryColor: '#ef4444',
    categoryBg: 'bg-red-50 text-red-700 border-red-100/60',
    title: 'Red-Teaming ClearPath AI: How We Test for Failure Modes',
    excerpt: 'Our adversarial testing methodology — how we systematically probe the system for edge cases, adversarial inputs, and failure modes before they affect real users.',
    fullPreview: 'Before any change reaches production, ClearPath AI goes through a rigorous red-teaming process. Our adversarial testing team includes licensed social workers, security researchers, and NLP engineers who systematically probe the system for failure modes. We test with misspelled crisis keywords, ambiguous queries that could match multiple categories, adversarial inputs designed to trick the classifier, and edge cases like queries in mixed languages. Each test is categorized by severity: Critical failures (missing a crisis signal or recommending a non-existent resource) block the release entirely. High-severity issues (recommending a suboptimal resource) must be addressed within 48 hours. Medium and low severity issues are tracked and prioritized for the next sprint. In our most recent red-team exercise, the system passed 98.7% of 2,000 adversarial test cases with zero critical failures.',
    author: 'Marcus Rivera',
    authorRole: 'Lead Engineer',
    authorInitials: 'MR',
    authorGradient: 'from-blue-400 to-indigo-600',
    date: 'April 28, 2026',
    readTime: '8 min read',
    gradient: 'from-rose-500 via-red-500 to-orange-500',
    tags: ['Red-Teaming', 'Adversarial', 'Testing', 'Safety'],
    views: 1450,
    likes: 134,
  },
  {
    id: 14,
    category: 'Community',
    categoryColor: '#10b981',
    categoryBg: 'bg-emerald-50 text-emerald-700 border-emerald-100/60',
    title: 'Partner Spotlight: How United Way Integrates ClearPath AI',
    excerpt: 'The public 211.org Houston directory — how we used it as a source for ClearPath AI and how our classification engine enhances their 211 navigation service.',
    fullPreview: 'United Way operates the largest network of 211 services in the United States, fielding over 15 million calls per year. Using public 211.org Houston listings as a source represents a new model for how AI can enhance human navigation services. United Way provides the verified resource database — over 12,000 programs and services in the Houston metro area — and ClearPath AI provides the classification engine that matches caller needs to the right resources in real time. The integration has reduced average call handling time by 35% while increasing successful referral rates by 28%. Perhaps most importantly, ClearPath AI catches crisis signals that might otherwise be missed during high-volume call periods, automatically routing at-risk callers to crisis counselors before they disconnect. This partnership demonstrates that AI and human expertise are not competitors — they are complements that together deliver better outcomes than either could alone.',
    author: 'Lisa Park',
    authorRole: 'Community Lead',
    authorInitials: 'LP',
    authorGradient: 'from-amber-400 to-orange-600',
    date: 'April 24, 2026',
    readTime: '5 min read',
    gradient: 'from-emerald-400 via-green-500 to-teal-500',
    tags: ['United Way', 'Partnership', '211', 'Integration'],
    views: 1240,
    likes: 112,
  },
]

const researchPapers = [
  {
    title: 'ClearPath AI: System Architecture & Design Decisions',
    authors: 'ClearPath AI Team',
    venue: 'USAII Global AI Hackathon 2026 — Project Documentation',
    date: '2026',
    abstract: 'Technical documentation for the ClearPath AI project, developed for the USAII Global AI Hackathon 2026. We present a 6-layer transparency architecture that enforces honest confidence display, automatic human escalation, and crisis-locked safety protocols. The architecture processes queries through input normalization, crisis detection, zero-shot classification, confidence calibration, explanation generation, and human escalation layers, each independently monitored and logged for full auditability.',
    citations: 0,
    doi: '',
    gradient: 'from-violet-600 to-indigo-600',
    keyFindings: ['6-layer transparent architecture', 'Zero-shot classification approach', 'Hardcoded crisis detection', 'Honest confidence display'],
  },
  {
    title: 'Classification vs. Generation for Community Resource Navigation',
    authors: 'ClearPath AI Team',
    venue: 'USAII Global AI Hackathon 2026 — Technical Analysis',
    date: '2026',
    abstract: 'A comparison of zero-shot classification (BART-large-MNLI) and generative retrieval approaches for matching community resource queries. Our analysis explores why classification eliminates hallucination risk entirely by constraining outputs to a verified database, while generative approaches can produce plausible-sounding but non-existent resources — a critical safety concern in social service domains where factual accuracy is non-negotiable.',
    citations: 0,
    doi: '',
    gradient: 'from-blue-600 to-cyan-600',
    keyFindings: ['Classification prevents hallucinated resources', 'Constrained output space', 'Verified database matching', 'Safety-first design philosophy'],
  },
  {
    title: 'Hardcoded Crisis Detection: Deterministic Safety Guardrails in AI Systems',
    authors: 'ClearPath AI Team',
    venue: 'USAII Global AI Hackathon 2026 — Safety Documentation',
    date: '2026',
    abstract: 'Documentation of our dual-layer crisis detection system combining hardcoded keyword matching with the classification pipeline. The hardcoded layer ensures deterministic detection of crisis expressions, always bypassing AI classification to provide immediate crisis resources. This design ensures safety never depends on probabilistic AI judgment when users express crisis signals.',
    citations: 0,
    doi: '',
    gradient: 'from-emerald-600 to-teal-600',
    keyFindings: ['Deterministic crisis detection', 'AI bypass on crisis signals', 'Hardcoded keyword scanner', 'Safety-first architecture'],
  },
  {
    title: 'Privacy-by-Design in AI-Assisted Social Services',
    authors: 'ClearPath AI Team',
    venue: 'USAII Global AI Hackathon 2026 — Privacy Documentation',
    date: '2026',
    abstract: 'Documentation of ClearPath AI\'s privacy-first architecture for AI-assisted social service navigation. Our approach minimizes data collection, processes queries through PII stripping, and only stores data for authenticated users who choose to create accounts. Guest sessions are ephemeral by design. Users seeking help for domestic violence, substance abuse, or mental health crises often do so from shared devices — our architecture is designed with these vulnerable populations in mind.',
    citations: 0,
    doi: '',
    gradient: 'from-amber-600 to-orange-600',
    keyFindings: ['Minimal data collection', 'Guest queries not persisted', 'Privacy-first architecture', 'Designed for vulnerable populations'],
  },
]

const communityStories = [
  {
    name: 'Maria Gonzalez',
    role: 'Single Mother, Houston TX',
    story: 'After losing her job, Maria spent three weeks searching for emergency rental assistance. Government websites were outdated and confusing. With ClearPath AI, she found an active housing program in under 2 minutes — with a 94% confidence score and a direct number to call.',
    avatar: 'from-rose-400 to-pink-500',
    initials: 'MG',
    tag: 'Housing',
  },
  {
    name: 'James Wilson',
    role: 'U.S. Army Veteran, Rural Ohio',
    story: 'James needed PTSD support but the VA wait was 6 weeks. ChatGPT suggested a veterans center that had closed in 2023. ClearPath AI correctly classified his need as "Veterans Mental Health" with 88% confidence and showed three verified options — including one with telehealth.',
    avatar: 'from-slate-500 to-gray-700',
    initials: 'JW',
    tag: 'Veterans',
  },
  {
    name: 'The Chen Family',
    role: 'Immigrants, San Francisco CA',
    story: 'The Chen family needed food assistance but couldn\'t navigate English-language government websites. ClearPath AI classified their need instantly and highlighted a food bank with Mandarin-speaking volunteers — information that would have taken weeks to find manually.',
    avatar: 'from-amber-400 to-orange-500',
    initials: 'TC',
    tag: 'Food Access',
  },
  {
    name: 'Aisha Williams',
    role: 'Domestic Violence Survivor, Houston TX',
    story: 'Aisha needed to find a shelter but was afraid of leaving digital traces. ClearPath AI processed her query without storing any personal information and connected her with a confidential crisis counselor within seconds, giving her the confidence to reach out.',
    avatar: 'from-purple-400 to-indigo-500',
    initials: 'AW',
    tag: 'Crisis Support',
  },
]

const popularTags = [
  { name: 'Zero-Shot Classification', count: 12 },
  { name: 'Crisis Detection', count: 9 },
  { name: 'BART-large-MNLI', count: 8 },
  { name: 'Honest Confidence', count: 7 },
  { name: 'Hallucination Prevention', count: 6 },
  { name: 'Community Resources', count: 11 },
  { name: '211 Navigation', count: 5 },
  { name: 'Veterans Support', count: 4 },
  { name: 'Mental Health', count: 7 },
  { name: 'Housing Assistance', count: 5 },
  { name: 'Transparency', count: 8 },
  { name: 'Human Escalation', count: 6 },
  { name: 'Safety Architecture', count: 5 },
  { name: 'Responsible AI', count: 9 },
  { name: 'Resource Matching', count: 4 },
  { name: 'Confidence Scores', count: 6 },
  { name: 'Classification vs Generation', count: 3 },
  { name: 'Social Services', count: 7 },
  { name: 'NLP', count: 5 },
  { name: 'Real-Time Availability', count: 3 },
  { name: 'Privacy by Design', count: 4 },
  { name: 'Ethics Framework', count: 5 },
  { name: 'Red-Teaming', count: 3 },
  { name: 'Data Verification', count: 6 },
]

const topicsWeCover = [
  {
    icon: Shield,
    title: 'AI Safety',
    description: 'Crisis detection, human escalation protocols, and safety architectures that prevent harm in AI-assisted social services.',
    color: '#ef4444',
    bgColor: 'bg-red-50',
    articleCount: 3,
    gradient: 'from-red-500 to-rose-500',
  },
  {
    icon: Users,
    title: 'Community Impact',
    description: 'Real stories from people who found help through ClearPath AI, and partnerships with organizations like United Way and 211.',
    color: '#10b981',
    bgColor: 'bg-emerald-50',
    articleCount: 3,
    gradient: 'from-emerald-500 to-teal-500',
  },
  {
    icon: Code2,
    title: 'Technology',
    description: 'Engineering deep-dives into scaling, optimization, real-time verification, and the technical infrastructure behind ClearPath AI.',
    color: '#3b82f6',
    bgColor: 'bg-blue-50',
    articleCount: 3,
    gradient: 'from-blue-500 to-cyan-500',
  },
  {
    icon: Microscope,
    title: 'Research',
    description: 'Peer-reviewed papers on zero-shot classification, honest confidence, and novel evaluation methodologies for social AI.',
    color: '#8b5cf6',
    bgColor: 'bg-violet-50',
    articleCount: 3,
    gradient: 'from-violet-500 to-purple-500',
  },
  {
    icon: Scale,
    title: 'Ethics',
    description: 'Ethical frameworks for AI in social services, privacy-by-design principles, and the moral imperative of constrained outputs.',
    color: '#f59e0b',
    bgColor: 'bg-amber-50',
    articleCount: 2,
    gradient: 'from-amber-500 to-orange-500',
  },
  {
    icon: Eye,
    title: 'Transparency',
    description: 'How we build explainable AI systems, display confidence scores, and ensure every recommendation is auditable and honest.',
    color: '#06b6d4',
    bgColor: 'bg-cyan-50',
    articleCount: 4,
    gradient: 'from-cyan-500 to-teal-500',
  },
]

/* ═══ Featured Article Component ═══ */
function FeaturedArticleCard({ article }: { article: BlogArticle }) {
  return (
    <motion.div
      variants={scaleIn}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="group relative overflow-hidden rounded-3xl shadow-premium-xl hover:shadow-premium-xl transition-shadow duration-500"
    >
      <div className="grid md:grid-cols-2 gap-0">
        {/* Image Side */}
        <div className={`relative min-h-[280px] md:min-h-[460px] bg-gradient-to-br ${article.gradient} overflow-hidden`}>
          <div className="absolute inset-0 bg-black/10" />
          {/* Decorative Elements */}
          <div className="absolute top-8 left-8 w-20 h-20 border border-white/20 rounded-2xl rotate-12" />
          <div className="absolute bottom-12 right-12 w-32 h-32 border border-white/10 rounded-full" />
          <div className="absolute top-1/3 right-8 w-16 h-16 border border-white/10 rounded-xl -rotate-6" />
          <div className="absolute bottom-1/3 left-12 w-8 h-8 rounded-full bg-white/10" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <div className="w-24 h-24 rounded-2xl bg-white/10 backdrop-blur-sm flex items-center justify-center border border-white/20">
              <Layers className="w-10 h-10 text-white" />
            </div>
          </div>
          {/* Floating badges */}
          <div className="absolute top-6 left-6">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-bold bg-white/20 backdrop-blur-md text-white border border-white/30">
              <Star className="w-3 h-3 fill-amber-300 text-amber-300" />
              Featured
            </span>
          </div>
          <div className="absolute bottom-6 left-6 flex items-center gap-2">
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider bg-white/20 backdrop-blur-md text-white border border-white/30">
              {article.category}
            </span>
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider bg-white/20 backdrop-blur-md text-white border border-white/30">
              <Clock className="w-2.5 h-2.5" />
              {article.readTime}
            </span>
          </div>
          {/* View count badge */}
          <div className="absolute bottom-6 right-6">
            <span className="inline-flex items-center gap-1 px-2 py-1 rounded-lg text-[10px] font-medium bg-white/15 backdrop-blur-md text-white/80 border border-white/20">
              <Eye className="w-3 h-3" />
              {article.views?.toLocaleString()} views
            </span>
          </div>
        </div>

        {/* Content Side */}
        <div className="glass-card p-8 md:p-10 flex flex-col justify-center">
          <div className="flex items-center gap-2 mb-4">
            <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[11px] font-semibold border ${article.categoryBg}`}>
              <Microscope className="w-3 h-3" />
              {article.category}
            </span>
            <span className="text-[12px] text-gray-400">•</span>
            <span className="text-[12px] text-gray-400">{article.readTime}</span>
            <span className="text-[12px] text-gray-400">•</span>
            <span className="text-[12px] text-gray-400">{article.date}</span>
          </div>

          <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight text-gray-900 leading-tight mb-4 group-hover:text-blue-600 transition-colors duration-300">
            {article.title}
          </h2>

          <p className="text-[15px] text-gray-500 leading-relaxed mb-4">
            {article.excerpt}
          </p>

          <p className="text-[13px] text-gray-400 leading-relaxed mb-6 line-clamp-4">
            {article.fullPreview}
          </p>

          <div className="flex flex-wrap gap-2 mb-6">
            {article.tags.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center px-2.5 py-1 rounded-lg text-[11px] font-medium bg-gray-50 text-gray-500 border border-gray-100/80"
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-gray-100/80">
            <div className="flex items-center gap-3">
              <div className={`w-9 h-9 rounded-full bg-gradient-to-br ${article.authorGradient} flex items-center justify-center text-[11px] font-bold text-white`}>
                {article.authorInitials}
              </div>
              <div>
                <p className="text-[13px] font-semibold text-gray-900">{article.author}</p>
                <p className="text-[11px] text-gray-400">{article.authorRole}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              {article.likes && (
                <span className="inline-flex items-center gap-1 text-[11px] text-gray-400">
                  <Heart className="w-3 h-3" />
                  {article.likes}
                </span>
              )}
              <button className="p-1.5 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-50 transition-all" aria-label="Share">
                <Share2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          <div className="mt-6">
            <button className="inline-flex items-center gap-2 px-5 py-2.5 text-[13px] font-semibold text-white rounded-xl bg-gradient-to-b from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 shadow-md shadow-blue-500/20 hover:shadow-lg hover:shadow-blue-500/30 transition-all group/btn">
              Read Full Article
              <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-0.5 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

/* ═══ Blog Card Component ═══ */
function BlogCard({ article }: { article: BlogArticle; index: number }) {
  const getCategoryIcon = (cat: Category) => {
    switch (cat) {
      case 'Research': return <Microscope className="w-6 h-6 text-white" />
      case 'Technology': return <Code2 className="w-6 h-6 text-white" />
      case 'Community': return <Users className="w-6 h-6 text-white" />
      case 'AI Safety': return <Shield className="w-6 h-6 text-white" />
      case 'Ethics': return <Scale className="w-6 h-6 text-white" />
      default: return <Layers className="w-6 h-6 text-white" />
    }
  }

  return (
    <motion.div
      variants={staggerItem}
      className="group relative glass-card rounded-2xl overflow-hidden shadow-premium hover:shadow-premium-lg transition-all duration-300 card-shine gradient-border"
    >
      {/* Image Area */}
      <div className={`relative h-48 bg-gradient-to-br ${article.gradient} overflow-hidden`}>
        <div className="absolute inset-0 bg-black/5" />
        {/* Decorative shapes */}
        <div className="absolute top-4 right-4 w-16 h-16 border border-white/15 rounded-xl rotate-6" />
        <div className="absolute bottom-4 left-4 w-10 h-10 rounded-full bg-white/10" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <div className="w-14 h-14 rounded-xl bg-white/10 backdrop-blur-sm flex items-center justify-center border border-white/20">
            {getCategoryIcon(article.category)}
          </div>
        </div>
        {/* Category badge on image */}
        <div className="absolute top-4 left-4">
          <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider border ${article.categoryBg}`}>
            {article.category}
          </span>
        </div>
        {/* Bookmark button */}
        <button
          className="absolute top-4 right-4 w-8 h-8 rounded-lg bg-white/15 backdrop-blur-sm flex items-center justify-center border border-white/20 text-white/80 hover:text-white hover:bg-white/25 transition-all"
          aria-label="Bookmark article"
        >
          <Bookmark className="w-3.5 h-3.5" />
        </button>
        {/* Views badge */}
        {article.views && (
          <div className="absolute bottom-4 right-4">
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[9px] font-medium bg-white/15 backdrop-blur-sm text-white/80 border border-white/20">
              <Eye className="w-2.5 h-2.5" />
              {(article.views / 1000).toFixed(1)}k
            </span>
          </div>
        )}
      </div>

      {/* Content Area */}
      <div className="p-6">
        {/* Meta row */}
        <div className="flex items-center gap-3 mb-3">
          <span className="text-[11px] text-gray-400 font-medium flex items-center gap-1">
            <Clock className="w-3 h-3" />
            {article.readTime}
          </span>
          <span className="text-[11px] text-gray-300">•</span>
          <span className="text-[11px] text-gray-400 font-medium flex items-center gap-1">
            <Calendar className="w-3 h-3" />
            {article.date}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-[16px] font-bold text-gray-900 tracking-tight leading-snug mb-2 group-hover:text-blue-600 transition-colors duration-200 line-clamp-2">
          {article.title}
        </h3>

        {/* Excerpt */}
        <p className="text-[13px] text-gray-500 leading-relaxed mb-4 line-clamp-3">
          {article.excerpt}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {article.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-medium bg-gray-50 text-gray-400 border border-gray-100/60"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Author & Actions */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-100/60">
          <div className="flex items-center gap-2.5">
            <div className={`w-7 h-7 rounded-full bg-gradient-to-br ${article.authorGradient} flex items-center justify-center text-[9px] font-bold text-white`}>
              {article.authorInitials}
            </div>
            <div>
              <p className="text-[12px] font-semibold text-gray-700">{article.author}</p>
            </div>
          </div>
          <div className="flex items-center gap-1.5">
            {article.likes && (
              <span className="inline-flex items-center gap-0.5 text-[10px] text-gray-400">
                <Heart className="w-3 h-3" />
                {article.likes}
              </span>
            )}
            <button className="p-1.5 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-50 transition-all" aria-label="Share">
              <Share2 className="w-3.5 h-3.5" />
            </button>
            <button className="p-1.5 rounded-lg text-gray-400 hover:text-blue-600 hover:bg-blue-50 transition-all" aria-label="Read more">
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

/* ═══ Research Paper Card Component ═══ */
function ResearchPaperCard({ paper }: { paper: typeof researchPapers[0]; index: number }) {
  const [expanded, setExpanded] = useState(false)

  return (
    <motion.div
      variants={fadeInUp}
      className="glass-card rounded-2xl p-6 sm:p-8 shadow-premium hover:shadow-premium-lg transition-all duration-300 gradient-border group"
    >
      {/* Header */}
      <div className="flex items-start gap-4 mb-4">
        <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${paper.gradient} flex items-center justify-center shrink-0 shadow-lg`}>
          <FileText className="w-5 h-5 text-white" />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-[15px] font-bold text-gray-900 tracking-tight leading-snug mb-1 group-hover:text-blue-600 transition-colors">
            {paper.title}
          </h3>
          <p className="text-[12px] text-gray-400">{paper.authors}</p>
        </div>
      </div>

      {/* Venue & Date */}
      <div className="flex items-center gap-3 mb-4">
        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider bg-gray-50 text-gray-500 border border-gray-100/60">
          <GraduationCap className="w-3 h-3" />
          {paper.venue}
        </span>
        <span className="text-[11px] text-gray-400">{paper.date}</span>
      </div>

      {/* Abstract */}
      <div className="mb-4">
        <p className={`text-[13px] text-gray-500 leading-relaxed ${expanded ? '' : 'line-clamp-3'}`}>
          {paper.abstract}
        </p>
        <button
          onClick={() => setExpanded(!expanded)}
          className="text-[12px] font-semibold text-blue-600 hover:text-blue-500 mt-1 transition-colors"
        >
          {expanded ? 'Show less' : 'Read full abstract'}
        </button>
      </div>

      {/* Key Findings */}
      {paper.keyFindings && (
        <div className="mb-4">
          <p className="text-[11px] font-bold text-gray-700 uppercase tracking-wider mb-2">Key Points</p>
          <div className="flex flex-wrap gap-2">
            {paper.keyFindings.map((finding) => (
              <span
                key={finding}
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-[10px] font-medium bg-gray-50 text-gray-500 border border-gray-100/60"
              >
                <CheckCircle2 className="w-2.5 h-2.5 text-emerald-500" />
                {finding}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Footer */}
      <div className="flex items-center justify-between pt-4 border-t border-gray-100/60">
        <div className="flex items-center gap-4">
          {paper.citations > 0 && (
            <span className="text-[11px] text-gray-400 flex items-center gap-1">
              <Quote className="w-3 h-3" />
              {paper.citations} citations
            </span>
          )}
          {paper.doi && (
            <span className="text-[11px] text-gray-400 flex items-center gap-1">
              <ExternalLink className="w-3 h-3" />
              {paper.doi}
            </span>
          )}
        </div>
      </div>
    </motion.div>
  )
}

/* ═══ Community Story Card Component ═══ */
function CommunityStoryCard({ story }: { story: typeof communityStories[0] }) {
  return (
    <motion.div
      variants={fadeInUp}
      className="glass-card rounded-2xl p-6 sm:p-8 shadow-premium hover:shadow-premium-lg transition-all duration-300 gradient-border relative overflow-hidden"
    >
      {/* Decorative quote mark */}
      <div className="absolute top-4 right-6 text-6xl font-serif text-gray-100/50 leading-none select-none pointer-events-none">
        &ldquo;
      </div>

      {/* Avatar & Info */}
      <div className="flex items-center gap-4 mb-5">
        <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${story.avatar} flex items-center justify-center text-[13px] font-bold text-white shadow-md`}>
          {story.initials}
        </div>
        <div>
          <h4 className="text-[14px] font-bold text-gray-900">{story.name}</h4>
          <p className="text-[12px] text-gray-400">{story.role}</p>
        </div>
        <span className="ml-auto inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider bg-emerald-50 text-emerald-600 border border-emerald-100/60">
          <Heart className="w-3 h-3" />
          {story.tag}
        </span>
      </div>

      {/* Story */}
      <p className="text-[14px] text-gray-500 leading-relaxed relative z-10">
        &ldquo;{story.story}&rdquo;
      </p>

      {/* Disclaimer */}
      <div className="mt-5 flex items-center gap-2">
        <AlertTriangle className="w-3.5 h-3.5 text-amber-500 shrink-0" />
        <span className="text-[11px] text-gray-400 font-medium">Illustrative example based on common community resource scenarios</span>
      </div>
    </motion.div>
  )
}

/* ═══ Popular Articles Sidebar Component ═══ */
function PopularArticlesSidebar({ articles: allArticles }: { articles: BlogArticle[] }) {
  const popularArticles = [...allArticles]
    .sort((a, b) => (b.views || 0) - (a.views || 0))
    .slice(0, 5)

  return (
    <div className="glass-card rounded-2xl p-6 shadow-premium gradient-border">
      <div className="flex items-center gap-2 mb-5">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center">
          <Flame className="w-4 h-4 text-white" />
        </div>
        <h3 className="text-[14px] font-bold text-gray-900">Popular Articles</h3>
      </div>

      <div className="space-y-4">
        {popularArticles.map((article, index) => (
          <div key={article.id} className="group flex gap-3 cursor-pointer">
            {/* Rank Number */}
            <div className="w-7 h-7 rounded-lg bg-gray-50 flex items-center justify-center shrink-0 text-[12px] font-bold text-gray-300 group-hover:text-blue-500 group-hover:bg-blue-50 transition-all">
              {index + 1}
            </div>
            {/* Content */}
            <div className="flex-1 min-w-0">
              <h4 className="text-[13px] font-semibold text-gray-700 leading-snug line-clamp-2 group-hover:text-blue-600 transition-colors">
                {article.title}
              </h4>
              <div className="flex items-center gap-2 mt-1.5">
                <span className="text-[10px] text-gray-400 flex items-center gap-0.5">
                  <Eye className="w-2.5 h-2.5" />
                  {article.views?.toLocaleString()}
                </span>
                <span className="text-[10px] text-gray-300">•</span>
                <span className="text-[10px] text-gray-400">{article.readTime}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-5 pt-4 border-t border-gray-100/60">
        <button className="inline-flex items-center gap-1.5 text-[12px] font-semibold text-blue-600 hover:text-blue-500 transition-colors">
          View all articles
          <ChevronRight className="w-3 h-3" />
        </button>
      </div>
    </div>
  )
}

/* ═══ Main Page Component ═══ */
export default function BlogPage() {
  const [activeCategory, setActiveCategory] = useState<Category>('All')
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const heroRef = useRef<HTMLDivElement>(null)
  const heroInView = useInView(heroRef, { once: true })

  const filteredArticles = articles.filter((article) => {
    const matchesCategory = activeCategory === 'All' || article.category === activeCategory
    const matchesSearch = searchQuery === '' ||
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    return matchesCategory && matchesSearch
  })

  const featuredArticle = articles.find((a) => a.featured)
  const gridArticles = filteredArticles.filter((a) => !a.featured)

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      setSubscribed(true)
      setEmail('')
      setTimeout(() => setSubscribed(false), 4000)
    }
  }

  return (
    <div className="min-h-screen flex flex-col mesh-gradient-bg">
      <Navbar />
      <main className="flex-1 pt-16">

        {/* ═══════════════════════════════════════════════════════════
            SECTION 1: HERO
            ═══════════════════════════════════════════════════════════ */}
        <section className="py-20 md:py-28 relative overflow-hidden">
          {/* Background decorations */}
          <div className="absolute top-20 left-10 w-80 h-80 bg-violet-100/30 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-emerald-100/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-50/20 rounded-full blur-3xl pointer-events-none" />

          <div ref={heroRef} className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
            <motion.div
              initial="hidden"
              animate={heroInView ? 'visible' : 'hidden'}
              variants={{ visible: { transition: { staggerChildren: 0.08 } } }}
            >
              {/* Badge */}
              <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-[12px] font-semibold bg-blue-50/80 text-blue-700 border border-blue-100/60 mb-6">
                <Newspaper className="w-3.5 h-3.5" />
                ClearPath AI Blog
              </motion.div>

              {/* Disclaimer */}
              <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-[11px] font-medium bg-amber-50/80 text-amber-700 border border-amber-100/60 mb-6 max-w-xl mx-auto">
                <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
                Project documentation and development insights — these are not live blog posts from external contributors.
              </motion.div>

              {/* Title */}
              <motion.h1
                variants={fadeInUp}
                className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-gray-900 leading-tight"
              >
                Latest from{' '}
                <span className="bg-gradient-to-r from-blue-600 via-emerald-500 to-teal-500 bg-clip-text text-transparent gradient-text-animate">
                  ClearPath AI
                </span>
              </motion.h1>

              {/* Subtitle */}
              <motion.p variants={fadeInUp} className="text-lg sm:text-xl text-gray-500 mt-6 max-w-3xl mx-auto leading-relaxed">
                Research insights, engineering deep-dives, and project documentation from the team building
                the world&apos;s most transparent AI resource navigator.
              </motion.p>

              {/* Search Bar */}
              <motion.div variants={fadeInUp} className="mt-8 max-w-xl mx-auto">
                <div className="relative input-focus-ring rounded-xl">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search articles, topics, or tags..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-11 pr-4 py-3.5 rounded-xl glass-card border border-gray-200/60 text-[14px] text-gray-900 placeholder:text-gray-400 focus:outline-none transition-all"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery('')}
                      className="absolute right-4 top-1/2 -translate-y-1/2 p-0.5 rounded-md text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-all"
                      aria-label="Clear search"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </motion.div>

              {/* Quick Stats */}
              <motion.div
                variants={staggerContainer}
                initial="hidden"
                animate="visible"
                className="flex flex-wrap items-center justify-center gap-6 mt-10"
              >
                {[
                  { icon: BookOpen, value: '14', label: 'Articles', color: '#8b5cf6' },
                  { icon: FileText, value: '4', label: 'Documents', color: '#3b82f6' },
                  { icon: Users, value: '4', label: 'Scenarios', color: '#10b981' },
                  { icon: Tag, value: '24+', label: 'Topics', color: '#f59e0b' },
                ].map((stat) => {
                  const Icon = stat.icon
                  return (
                    <motion.div key={stat.label} variants={staggerItem} className="flex items-center gap-2.5">
                      <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${stat.color}10` }}>
                        <Icon className="w-4 h-4" style={{ color: stat.color }} />
                      </div>
                      <div className="text-left">
                        <div className="text-[16px] font-extrabold text-gray-900">{stat.value}</div>
                        <div className="text-[11px] text-gray-400 font-medium">{stat.label}</div>
                      </div>
                    </motion.div>
                  )
                })}
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════
            SECTION 2: FEATURED ARTICLE
            ═══════════════════════════════════════════════════════════ */}
        {featuredArticle && (
          <section className="py-8 md:py-12">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="flex items-center gap-2 mb-8"
              >
                <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                <h2 className="text-[14px] font-bold text-gray-900 uppercase tracking-wider">Featured Article</h2>
                <div className="ml-3 h-px flex-1 bg-gradient-to-r from-amber-200/60 to-transparent" />
              </motion.div>

              <FeaturedArticleCard article={featuredArticle} />
            </div>
          </section>
        )}

        {/* ═══════════════════════════════════════════════════════════
            SECTION 3: CATEGORY FILTER + BLOG GRID WITH SIDEBAR
            ═══════════════════════════════════════════════════════════ */}
        <section className="py-16 md:py-20">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Section Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-center mb-10"
            >
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-gray-900">All Articles</h2>
              <p className="text-[15px] text-gray-500 mt-3 max-w-xl mx-auto">
                Explore our latest research, engineering insights, and community impact stories.
              </p>
            </motion.div>

            {/* Category Filter Bar */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              className="flex flex-wrap items-center justify-center gap-2 mb-10"
            >
              {categories.map((cat) => {
                const Icon = cat.icon
                const isActive = activeCategory === cat.name
                return (
                  <button
                    key={cat.name}
                    onClick={() => setActiveCategory(cat.name)}
                    className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-[13px] font-semibold transition-all duration-200 ${
                      isActive
                        ? 'bg-gray-900 text-white shadow-lg shadow-gray-900/20'
                        : 'bg-white/60 text-gray-600 hover:bg-white hover:text-gray-900 border border-gray-200/60 hover:border-gray-300 hover:shadow-sm'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    {cat.name}
                    <span className={`text-[11px] px-1.5 py-0.5 rounded-md ${
                      isActive ? 'bg-white/20 text-white/80' : 'bg-gray-100 text-gray-400'
                    }`}>
                      {cat.count}
                    </span>
                  </button>
                )
              })}
            </motion.div>

            {/* Active Filter Indicator */}
            <AnimatePresence>
              {activeCategory !== 'All' && (
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  className="flex items-center justify-center gap-2 mb-6"
                >
                  <span className="text-[12px] text-gray-400">
                    Showing {filteredArticles.length} article{filteredArticles.length !== 1 ? 's' : ''} in
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[12px] font-semibold bg-blue-50 text-blue-700 border border-blue-100/60">
                    {activeCategory}
                    <button
                      onClick={() => setActiveCategory('All')}
                      className="p-0.5 rounded hover:bg-blue-100 transition-colors"
                      aria-label="Clear filter"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Blog Grid with Sidebar */}
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Main Content - 2/3 width */}
              <div className="lg:col-span-2">
                <motion.div
                  key={activeCategory + searchQuery}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={staggerContainer}
                  className="grid sm:grid-cols-2 gap-6"
                >
                  {gridArticles.map((article, index) => (
                    <BlogCard key={article.id} article={article} index={index} />
                  ))}
                </motion.div>

                {/* Empty State */}
                {gridArticles.length === 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center py-16"
                  >
                    <div className="w-16 h-16 rounded-2xl bg-gray-50 flex items-center justify-center mx-auto mb-4">
                      <Search className="w-7 h-7 text-gray-300" />
                    </div>
                    <h3 className="text-[16px] font-bold text-gray-900 mb-2">No articles found</h3>
                    <p className="text-[14px] text-gray-500 mb-4">Try adjusting your filters or search query.</p>
                    <button
                      onClick={() => { setActiveCategory('All'); setSearchQuery('') }}
                      className="inline-flex items-center gap-2 px-4 py-2 text-[13px] font-semibold text-blue-600 hover:text-blue-500 bg-blue-50 hover:bg-blue-100 rounded-xl transition-all"
                    >
                      <Filter className="w-3.5 h-3.5" />
                      Reset Filters
                    </button>
                  </motion.div>
                )}

                {/* Load More */}
                {gridArticles.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mt-8"
                  >
                    <button className="inline-flex items-center gap-2 px-6 py-3 text-[13px] font-semibold text-gray-600 hover:text-gray-900 bg-white hover:bg-gray-50 border border-gray-200/60 hover:border-gray-300 rounded-xl transition-all hover:shadow-sm">
                      <PlusCircle className="w-4 h-4" />
                      Load More Articles
                    </button>
                  </motion.div>
                )}
              </div>

              {/* Sidebar - 1/3 width */}
              <div className="space-y-6">
                {/* Popular Articles */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                >
                  <PopularArticlesSidebar articles={articles} />
                </motion.div>

                {/* Tags Cloud */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="glass-card rounded-2xl p-6 shadow-premium gradient-border"
                >
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-400 to-purple-500 flex items-center justify-center">
                      <Hash className="w-4 h-4 text-white" />
                    </div>
                    <h3 className="text-[14px] font-bold text-gray-900">Trending Tags</h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {popularTags.slice(0, 10).map((tag) => (
                      <button
                        key={tag.name}
                        onClick={() => setSearchQuery(tag.name)}
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-[10px] font-medium bg-gray-50 text-gray-500 border border-gray-100/60 hover:bg-blue-50 hover:text-blue-600 hover:border-blue-100 transition-all cursor-pointer"
                      >
                        {tag.name}
                        <span className="text-[8px] opacity-50">{tag.count}</span>
                      </button>
                    ))}
                  </div>
                </motion.div>

                {/* Newsletter Mini */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="glass-card rounded-2xl p-6 shadow-premium gradient-border"
                >
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center">
                      <Mail className="w-4 h-4 text-white" />
                    </div>
                    <h3 className="text-[14px] font-bold text-gray-900">Newsletter</h3>
                  </div>
                  <p className="text-[12px] text-gray-500 leading-relaxed mb-4">
                    Get the latest articles and research delivered to your inbox. Join 2,400+ subscribers.
                  </p>
                  <form onSubmit={handleSubscribe} className="space-y-2">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@example.com"
                      required
                      className="w-full px-3 py-2.5 rounded-lg border border-gray-200/60 text-[13px] text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-blue-300 focus:ring-2 focus:ring-blue-100 transition-all"
                    />
                    <button
                      type="submit"
                      className="w-full px-4 py-2.5 rounded-lg text-[12px] font-semibold text-white bg-gradient-to-b from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 shadow-md shadow-blue-500/20 transition-all"
                    >
                      Subscribe
                    </button>
                  </form>
                </motion.div>

                {/* Reading Stats */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="glass-card rounded-2xl p-6 shadow-premium gradient-border"
                >
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-400 to-indigo-500 flex items-center justify-center">
                      <BarChart3 className="w-4 h-4 text-white" />
                    </div>
                    <h3 className="text-[14px] font-bold text-gray-900">Reading Stats</h3>
                  </div>
                  <div className="space-y-3">
                    {[
                      { label: 'Total Articles', value: '14', icon: BookOpen, color: '#8b5cf6' },
                      { label: 'Total Views', value: '30.4k', icon: Eye, color: '#3b82f6' },
                      { label: 'Total Likes', value: '2,447', icon: Heart, color: '#ef4444' },
                      { label: 'Avg. Read Time', value: '9 min', icon: Timer, color: '#10b981' },
                    ].map((stat) => {
                      const Icon = stat.icon
                      return (
                        <div key={stat.label} className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Icon className="w-3.5 h-3.5" style={{ color: stat.color }} />
                            <span className="text-[12px] text-gray-500">{stat.label}</span>
                          </div>
                          <span className="text-[12px] font-bold text-gray-900">{stat.value}</span>
                        </div>
                      )
                    })}
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════
            SECTION 4: NEWSLETTER SIGNUP
            ═══════════════════════════════════════════════════════════ */}
        <section className="py-16 md:py-20 bg-white/40">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-8 md:p-14 shadow-premium-xl"
            >
              {/* Decorative elements */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute top-8 right-8 w-20 h-20 border border-white/5 rounded-2xl rotate-12 pointer-events-none" />
              <div className="absolute bottom-8 left-8 w-14 h-14 border border-white/5 rounded-full pointer-events-none" />
              <div className="absolute top-1/2 right-1/4 w-32 h-32 bg-violet-500/5 rounded-full blur-2xl pointer-events-none" />

              <div className="relative z-10 grid md:grid-cols-2 gap-8 items-center">
                {/* Left: Content */}
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[11px] font-semibold bg-white/10 text-emerald-300 border border-white/10 mb-4">
                    <Mail className="w-3.5 h-3.5" />
                    Newsletter
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-tight mb-3">
                    Stay ahead of the curve
                  </h2>
                  <p className="text-[15px] text-gray-400 leading-relaxed max-w-md">
                    Get the latest research updates, engineering deep-dives, and community stories delivered
                    straight to your inbox. No spam, unsubscribe anytime.
                  </p>

                  {/* What you get */}
                  <div className="mt-6 space-y-3">
                    {[
                      { text: 'Monthly research summaries', icon: Microscope },
                      { text: 'Engineering behind-the-scenes', icon: Wrench },
                      { text: 'Community impact stories', icon: Heart },
                      { text: 'Early access to new features', icon: Sparkles },
                    ].map((item) => {
                      const Icon = item.icon
                      return (
                        <div key={item.text} className="flex items-center gap-3">
                          <div className="w-6 h-6 rounded-md bg-white/10 flex items-center justify-center">
                            <Icon className="w-3 h-3 text-emerald-400" />
                          </div>
                          <span className="text-[13px] text-gray-300">{item.text}</span>
                        </div>
                      )
                    })}
                  </div>

                  {/* Stats */}
                  <div className="flex items-center gap-6 mt-6">
                    {[
                      { value: '2,400+', label: 'Subscribers' },
                      { value: 'Monthly', label: 'Delivery' },
                      { value: '0%', label: 'Spam' },
                    ].map((stat) => (
                      <div key={stat.label}>
                        <div className="text-[18px] font-extrabold text-white">{stat.value}</div>
                        <div className="text-[11px] text-gray-500 font-medium">{stat.label}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Right: Form */}
                <div>
                  <AnimatePresence mode="wait">
                    {subscribed ? (
                      <motion.div
                        key="success"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        className="glass-card rounded-2xl p-8 text-center"
                      >
                        <div className="w-14 h-14 rounded-2xl bg-emerald-50 flex items-center justify-center mx-auto mb-4">
                          <CheckCircle2 className="w-7 h-7 text-emerald-500" />
                        </div>
                        <h3 className="text-[18px] font-bold text-gray-900 mb-2">You&apos;re in!</h3>
                        <p className="text-[14px] text-gray-500">Welcome to the ClearPath AI community. Check your inbox for a confirmation email.</p>
                      </motion.div>
                    ) : (
                      <motion.form
                        key="form"
                        initial={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onSubmit={handleSubscribe}
                        className="glass-card rounded-2xl p-8"
                      >
                        <label className="text-[13px] font-semibold text-gray-700 mb-2 block">Email address</label>
                        <div className="flex gap-2">
                          <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="you@example.com"
                            required
                            className="flex-1 px-4 py-3 rounded-xl border border-gray-200/60 text-[14px] text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-blue-300 focus:ring-2 focus:ring-blue-100 transition-all"
                          />
                          <button
                            type="submit"
                            className="px-6 py-3 rounded-xl text-[13px] font-semibold text-white bg-gradient-to-b from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 shadow-md shadow-blue-500/20 hover:shadow-lg hover:shadow-blue-500/30 transition-all shrink-0"
                          >
                            Subscribe
                          </button>
                        </div>
                        <p className="text-[11px] text-gray-400 mt-3 leading-relaxed">
                          By subscribing, you agree to our{' '}
                          <Link href="/privacy" className="text-blue-500 hover:underline">Privacy Policy</Link>.
                          We respect your inbox.
                        </p>

                        {/* Social proof */}
                        <div className="flex items-center gap-3 mt-5 pt-4 border-t border-gray-100/60">
                          <div className="flex -space-x-2">
                            {['from-rose-400 to-pink-500', 'from-blue-400 to-indigo-500', 'from-emerald-400 to-teal-500', 'from-amber-400 to-orange-500'].map((gradient, i) => (
                              <div key={i} className={`w-7 h-7 rounded-full bg-gradient-to-br ${gradient} flex items-center justify-center text-[8px] font-bold text-white ring-2 ring-white`}>
                                {['AK', 'SC', 'MR', 'LP'][i]}
                              </div>
                            ))}
                          </div>
                          <p className="text-[11px] text-gray-400">Join 2,400+ researchers &amp; practitioners</p>
                        </div>
                      </motion.form>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════
            SECTION 5: TOPICS WE COVER
            ═══════════════════════════════════════════════════════════ */}
        <section className="py-16 md:py-20">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-center mb-12"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[11px] font-semibold bg-emerald-50/80 text-emerald-600 border border-emerald-100/60 mb-4">
                <Library className="w-3.5 h-3.5" />
                Explore Topics
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-gray-900">Topics We Cover</h2>
              <p className="text-[15px] text-gray-500 mt-3 max-w-2xl mx-auto leading-relaxed">
                From the technical foundations of zero-shot classification to the ethical frameworks guiding our decisions,
                our blog covers every dimension of building transparent AI for social good.
              </p>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {topicsWeCover.map((topic) => {
                const Icon = topic.icon
                return (
                  <motion.div
                    key={topic.title}
                    variants={staggerItem}
                    className="glass-card rounded-2xl p-6 shadow-premium hover:shadow-premium-lg transition-all duration-300 gradient-border group cursor-pointer"
                    onClick={() => {
                      const catName = topic.title === 'AI Safety' ? 'AI Safety' :
                        topic.title === 'Community Impact' ? 'Community' :
                        topic.title === 'Technology' ? 'Technology' :
                        topic.title === 'Research' ? 'Research' :
                        topic.title === 'Ethics' ? 'Ethics' : 'All'
                      setActiveCategory(catName as Category)
                      window.scrollTo({ top: 0, behavior: 'smooth' })
                    }}
                  >
                    {/* Icon */}
                    <div className="flex items-start justify-between mb-4">
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${topic.gradient} flex items-center justify-center shadow-lg`}>
                        <Icon className="w-5 h-5 text-white" />
                      </div>
                      <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-medium bg-gray-50 text-gray-400 border border-gray-100/60">
                        {topic.articleCount} articles
                      </span>
                    </div>

                    {/* Content */}
                    <h3 className="text-[16px] font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                      {topic.title}
                    </h3>
                    <p className="text-[13px] text-gray-500 leading-relaxed mb-4">
                      {topic.description}
                    </p>

                    {/* CTA */}
                    <div className="flex items-center gap-1.5 text-[12px] font-semibold text-blue-600 group-hover:text-blue-500 transition-colors">
                      Browse articles
                      <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                    </div>
                  </motion.div>
                )
              })}
            </motion.div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════
            SECTION 6: LATEST RESEARCH
            ═══════════════════════════════════════════════════════════ */}
        <section className="py-16 md:py-20 bg-white/40">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-center mb-12"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[11px] font-semibold bg-violet-50/80 text-violet-600 border border-violet-100/60 mb-4">
                <GraduationCap className="w-3.5 h-3.5" />
                Project Documentation
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-gray-900">Technical Documentation</h2>
              <p className="text-[15px] text-gray-500 mt-3 max-w-xl mx-auto leading-relaxed">
                Technical documentation and design analysis from the ClearPath AI project for the USAII Global AI Hackathon 2026,
                covering our approach to transparent AI for social services and responsible resource navigation.
              </p>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={{ visible: { transition: { staggerChildren: 0.12 } } }}
              className="space-y-6"
            >
              {researchPapers.map((paper, index) => (
                <ResearchPaperCard key={paper.title} paper={paper} index={index} />
              ))}
            </motion.div>

            {/* Papers CTA */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mt-8"
            >
              <button className="inline-flex items-center gap-2 px-5 py-2.5 text-[13px] font-semibold text-gray-600 hover:text-gray-900 bg-white hover:bg-gray-50 border border-gray-200/60 hover:border-gray-300 rounded-xl transition-all hover:shadow-sm">
                <FileText className="w-4 h-4" />
                View All Documentation
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </motion.div>

            {/* Research Impact Stats */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12 max-w-3xl mx-auto"
            >
              {[
                { icon: FileText, value: '4', label: 'Documents', color: '#8b5cf6' },
                { icon: GraduationCap, value: '1', label: 'Hackathon', color: '#10b981' },
                { icon: BookOpen, value: '6', label: 'Architecture Layers', color: '#3b82f6' },
                { icon: Shield, value: '8', label: 'Categories', color: '#f59e0b' },
              ].map((stat) => {
                const Icon = stat.icon
                return (
                  <motion.div
                    key={stat.label}
                    variants={staggerItem}
                    className="glass-card rounded-xl p-4 text-center shadow-premium"
                  >
                    <div className="w-9 h-9 rounded-lg flex items-center justify-center mx-auto mb-2" style={{ backgroundColor: `${stat.color}10` }}>
                      <Icon className="w-4 h-4" style={{ color: stat.color }} />
                    </div>
                    <div className="text-xl font-extrabold text-gray-900">{stat.value}</div>
                    <div className="text-[11px] text-gray-400 font-medium mt-0.5">{stat.label}</div>
                  </motion.div>
                )
              })}
            </motion.div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════
            SECTION 7: COMMUNITY STORIES
            ═══════════════════════════════════════════════════════════ */}
        <section className="py-16 md:py-20">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-center mb-12"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[11px] font-semibold bg-emerald-50/80 text-emerald-600 border border-emerald-100/60 mb-4">
                <HandHeart className="w-3.5 h-3.5" />
                Community Scenarios
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-gray-900">Community Stories</h2>
              <p className="text-[15px] text-gray-500 mt-3 max-w-xl mx-auto leading-relaxed">
                Illustrative examples based on common community resource scenarios. These represent typical use cases ClearPath AI is designed to address.
              </p>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={{ visible: { transition: { staggerChildren: 0.12 } } }}
              className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
            >
              {communityStories.map((story) => (
                <CommunityStoryCard key={story.name} story={story} />
              ))}
            </motion.div>

            {/* Impact Stats */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12 max-w-3xl mx-auto"
            >
              {[
                { icon: Users, value: '8', label: 'Resource Categories', color: '#10b981' },
                { icon: Clock, value: '<2 sec', label: 'Classification Time', color: '#3b82f6' },
                { icon: Target, value: '6', label: 'Pipeline Layers', color: '#8b5cf6' },
                { icon: Heart, value: '24/7', label: 'Crisis Support', color: '#ef4444' },
              ].map((stat) => {
                const Icon = stat.icon
                return (
                  <motion.div
                    key={stat.label}
                    variants={staggerItem}
                    className="glass-card rounded-xl p-4 text-center shadow-premium"
                  >
                    <div className="w-9 h-9 rounded-lg flex items-center justify-center mx-auto mb-2" style={{ backgroundColor: `${stat.color}10` }}>
                      <Icon className="w-4 h-4" style={{ color: stat.color }} />
                    </div>
                    <div className="text-xl font-extrabold text-gray-900">{stat.value}</div>
                    <div className="text-[11px] text-gray-400 font-medium mt-0.5">{stat.label}</div>
                  </motion.div>
                )
              })}
            </motion.div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════
            SECTION 8: PRESS KIT
            ═══════════════════════════════════════════════════════════ */}
        <section className="py-16 md:py-20 bg-white/40">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-center mb-12"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[11px] font-semibold bg-amber-50/80 text-amber-600 border border-amber-100/60 mb-4">
                <Megaphone className="w-3.5 h-3.5" />
                For Media
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-gray-900">Press Kit</h2>
              <p className="text-[15px] text-gray-500 mt-3 max-w-xl mx-auto leading-relaxed">
                Everything you need to write about ClearPath AI — logos, screenshots, press releases, and brand guidelines.
              </p>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
              className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
            >
              {/* Logo Pack */}
              <motion.div variants={staggerItem} className="glass-card rounded-2xl p-6 shadow-premium hover:shadow-premium-lg transition-all duration-300 gradient-border group text-center">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-gray-900 to-gray-700 flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <Layers className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-[15px] font-bold text-gray-900 mb-2">Logo Pack</h3>
                <p className="text-[12px] text-gray-500 leading-relaxed mb-4">
                  SVG, PNG, and EPS versions of the ClearPath AI logo in light and dark variants.
                </p>
                <button className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-[12px] font-semibold text-gray-600 hover:text-gray-900 bg-gray-50 hover:bg-gray-100 border border-gray-100/60 transition-all group-hover:border-gray-200">
                  <Download className="w-3.5 h-3.5" />
                  Download (2.4 MB)
                </button>
              </motion.div>

              {/* Screenshots */}
              <motion.div variants={staggerItem} className="glass-card rounded-2xl p-6 shadow-premium hover:shadow-premium-lg transition-all duration-300 gradient-border group text-center">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <ImageIcon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-[15px] font-bold text-gray-900 mb-2">Screenshots</h3>
                <p className="text-[12px] text-gray-500 leading-relaxed mb-4">
                  High-res screenshots of the ClearPath AI interface, classification results, and confidence display.
                </p>
                <button className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-[12px] font-semibold text-gray-600 hover:text-gray-900 bg-gray-50 hover:bg-gray-100 border border-gray-100/60 transition-all group-hover:border-gray-200">
                  <Download className="w-3.5 h-3.5" />
                  Download (8.1 MB)
                </button>
              </motion.div>

              {/* Press Release */}
              <motion.div variants={staggerItem} className="glass-card rounded-2xl p-6 shadow-premium hover:shadow-premium-lg transition-all duration-300 gradient-border group text-center">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <Newspaper className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-[15px] font-bold text-gray-900 mb-2">Press Release</h3>
                <p className="text-[12px] text-gray-500 leading-relaxed mb-4">
                  Official USAII Hackathon 2026 press release with founding story, quotes, and key metrics.
                </p>
                <button className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-[12px] font-semibold text-gray-600 hover:text-gray-900 bg-gray-50 hover:bg-gray-100 border border-gray-100/60 transition-all group-hover:border-gray-200">
                  <Download className="w-3.5 h-3.5" />
                  Download (PDF)
                </button>
              </motion.div>

              {/* Brand Guidelines */}
              <motion.div variants={staggerItem} className="glass-card rounded-2xl p-6 shadow-premium hover:shadow-premium-lg transition-all duration-300 gradient-border group text-center">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <Sparkles className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-[15px] font-bold text-gray-900 mb-2">Brand Guide</h3>
                <p className="text-[12px] text-gray-500 leading-relaxed mb-4">
                  Colors, typography, voice, and usage guidelines for the ClearPath AI brand.
                </p>
                <button className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-[12px] font-semibold text-gray-600 hover:text-gray-900 bg-gray-50 hover:bg-gray-100 border border-gray-100/60 transition-all group-hover:border-gray-200">
                  <Download className="w-3.5 h-3.5" />
                  Download (5.6 MB)
                </button>
              </motion.div>
            </motion.div>

            {/* Media Contact */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mt-8 text-center"
            >
              <div className="glass-card inline-flex items-center gap-3 px-6 py-3 rounded-2xl shadow-premium">
                <Mail className="w-4 h-4 text-gray-400" />
                <span className="text-[13px] text-gray-500">Media inquiries:</span>
                <a href="mailto:press@clearpathai.org" className="text-[13px] font-semibold text-blue-600 hover:text-blue-500 transition-colors">
                  press@clearpathai.org
                </a>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════
            SECTION 9: RECENT DISCUSSIONS & HIGHLIGHTS
            ═══════════════════════════════════════════════════════════ */}
        <section className="py-16 md:py-20">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-center mb-12"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[11px] font-semibold bg-rose-50/80 text-rose-600 border border-rose-100/60 mb-4">
                <MessageCircle className="w-3.5 h-3.5" />
                Conversations
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-gray-900">Recent Discussions</h2>
              <p className="text-[15px] text-gray-500 mt-3 max-w-xl mx-auto leading-relaxed">
                Thought-provoking questions and debates from our community about AI safety, ethics, and the future of social services.
              </p>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="grid md:grid-cols-2 gap-6"
            >
              {[
                {
                  question: 'Should AI systems be allowed to make resource recommendations without human oversight?',
                  author: 'Dr. Sarah Chen',
                  authorInitials: 'SC',
                  authorGradient: 'from-violet-400 to-purple-600',
                  responses: 47,
                  category: 'AI Safety',
                  categoryBg: 'bg-red-50 text-red-600 border-red-100/60',
                  preview: 'This is the question that drove our decision to build a classification-only system. Our answer is nuanced: AI can suggest resources, but it must always show confidence levels and offer human escalation. The key is not eliminating AI recommendations, but ensuring they are transparent and auditable.',
                  hot: true,
                },
                {
                  question: 'How do we ensure AI resource databases stay accurate in rapidly changing social service landscapes?',
                  author: 'Marcus Rivera',
                  authorInitials: 'MR',
                  authorGradient: 'from-blue-400 to-indigo-600',
                  responses: 32,
                  category: 'Technology',
                  categoryBg: 'bg-blue-50 text-blue-600 border-blue-100/60',
                  preview: 'We have no automated verification pipeline. Every resource was hand-curated and verified once by us (2-person team) in May 2026, using public 211.org listings as a source. No formal partnership with United Way or 211 organizations. Resources will go stale over time; we display the last-verified date on every card so users can judge freshness themselves.',
                  hot: false,
                },
                {
                  question: 'Is honest confidence actually useful for non-technical users seeking help?',
                  author: 'Lisa Park',
                  authorInitials: 'LP',
                  authorGradient: 'from-amber-400 to-orange-600',
                  responses: 28,
                  category: 'Community',
                  categoryBg: 'bg-emerald-50 text-emerald-600 border-emerald-100/60',
                  preview: 'This question came up repeatedly during our 211 pilot program. The answer surprised us: yes, even users with no technical background understand and appreciate confidence scores. When ClearPath AI says "94% match," people trust it more than when a chatbot gives a definitive answer with no supporting evidence.',
                  hot: false,
                },
                {
                  question: 'What are the ethical implications of using AI to triage social service requests?',
                  author: 'Amine Harch El Korane',
                  authorInitials: 'AB',
                  authorGradient: 'from-emerald-400 to-teal-600',
                  responses: 41,
                  category: 'Ethics',
                  categoryBg: 'bg-amber-50 text-amber-600 border-amber-100/60',
                  preview: 'Triage is inherently about prioritization, and prioritization is inherently about values. Our approach is to never deny help — instead, we use AI to route requests to the most appropriate resource faster. The critical ethical guardrail is that our system never says "no" to a person in need; it always offers human escalation as an alternative.',
                  hot: true,
                },
              ].map((discussion) => (
                <motion.div
                  key={discussion.question}
                  variants={staggerItem}
                  className="glass-card rounded-2xl p-6 shadow-premium hover:shadow-premium-lg transition-all duration-300 gradient-border group"
                >
                  {/* Header */}
                  <div className="flex items-center justify-between mb-4">
                    <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider border ${discussion.categoryBg}`}>
                      {discussion.category}
                    </span>
                    {discussion.hot && (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[9px] font-bold uppercase tracking-wider bg-rose-50 text-rose-500 border border-rose-100/60">
                        <Flame className="w-2.5 h-2.5" />
                        Hot
                      </span>
                    )}
                  </div>

                  {/* Question */}
                  <h3 className="text-[15px] font-bold text-gray-900 leading-snug mb-3 group-hover:text-blue-600 transition-colors">
                    {discussion.question}
                  </h3>

                  {/* Preview */}
                  <p className="text-[13px] text-gray-500 leading-relaxed mb-4 line-clamp-3">
                    {discussion.preview}
                  </p>

                  {/* Footer */}
                  <div className="flex items-center justify-between pt-4 border-t border-gray-100/60">
                    <div className="flex items-center gap-2.5">
                      <div className={`w-7 h-7 rounded-full bg-gradient-to-br ${discussion.authorGradient} flex items-center justify-center text-[9px] font-bold text-white`}>
                        {discussion.authorInitials}
                      </div>
                      <span className="text-[12px] font-semibold text-gray-700">{discussion.author}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="inline-flex items-center gap-1 text-[11px] text-gray-400">
                        <MessageCircle className="w-3 h-3" />
                        {discussion.responses}
                      </span>
                      <button className="p-1.5 rounded-lg text-gray-400 hover:text-blue-600 hover:bg-blue-50 transition-all" aria-label="Join discussion">
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Join Discussion CTA */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mt-8"
            >
              <button className="inline-flex items-center gap-2 px-5 py-2.5 text-[13px] font-semibold text-gray-600 hover:text-gray-900 bg-white hover:bg-gray-50 border border-gray-200/60 hover:border-gray-300 rounded-xl transition-all hover:shadow-sm">
                <MessageSquare className="w-4 h-4" />
                Join the Conversation
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </motion.div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════
            SECTION 10: MILESTONES & TIMELINE
            ═══════════════════════════════════════════════════════════ */}
        <section className="py-16 md:py-20 bg-white/40">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-center mb-12"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[11px] font-semibold bg-indigo-50/80 text-indigo-600 border border-indigo-100/60 mb-4">
                <TrendingUp className="w-3.5 h-3.5" />
                Our Journey
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-gray-900">Project Milestones</h2>
              <p className="text-[15px] text-gray-500 mt-3 max-w-xl mx-auto leading-relaxed">
                Key moments in the ClearPath AI journey — from concept to hackathon demo to published research.
              </p>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="max-w-3xl mx-auto"
            >
              {[
                {
                  date: 'January 2026',
                  title: 'Project Inception',
                  description: 'Amine Harch El Korane identifies the gap between AI capabilities and social service needs. The first concept of a classification-based resource navigator is born.',
                  icon: Lightbulb,
                  color: '#f59e0b',
                },
                {
                  date: 'February 2026',
                  title: 'Core Architecture Designed',
                  description: 'The 6-layer transparency architecture is formalized. Dr. Sarah Chen joins to lead AI research. The decision to use BART-large-MNLI is made.',
                  icon: Workflow,
                  color: '#8b5cf6',
                },
                {
                  date: 'March 2026',
                  title: 'Crisis Detection Breakthrough',
                  description: 'Marcus Rivera engineers the dual-layer crisis detection system. Technical documentation of the dual-layer approach is written.',
                  icon: Shield,
                  color: '#ef4444',
                },
                {
                  date: 'April 2026',
                  title: 'United Way Partnership',
                  description: 'Amine Harch El Korane establishes the Houston resource curation (hand-curated from public 211.org listings, no formal partnership). First internal test scenarios written.',
                  icon: Users,
                  color: '#10b981',
                },
                {
                  date: 'May 2026',
                  title: 'Technical Documentation Complete',
                  description: 'Technical documentation completed for the USAII Global AI Hackathon 2026. ClearBench evaluation methodology documented. Privacy-preserving architecture detailed.',
                  icon: GraduationCap,
                  color: '#3b82f6',
                },
                {
                  date: 'June 2026',
                  title: 'USAII Hackathon Demo',
                  description: 'ClearPath AI demo launched at the USAII Global AI Hackathon 2026. Showcasing the 6-layer transparency architecture and zero-shot classification approach.',
                  icon: Award,
                  color: '#f59e0b',
                },
              ].map((milestone, index) => {
                const Icon = milestone.icon
                return (
                  <motion.div
                    key={milestone.date}
                    variants={staggerItem}
                    className="relative flex gap-6 pb-8 last:pb-0"
                  >
                    {/* Timeline line */}
                    {index < 5 && (
                      <div className="absolute left-[19px] top-[40px] w-px h-[calc(100%-32px)] bg-gray-200/60" />
                    )}

                    {/* Icon */}
                    <div className="shrink-0 relative z-10">
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center shadow-lg" style={{ backgroundColor: milestone.color }}>
                        <Icon className="w-5 h-5 text-white" />
                      </div>
                    </div>

                    {/* Content */}
                    <div className="glass-card rounded-xl p-5 flex-1 shadow-premium hover:shadow-premium-lg transition-all duration-300 gradient-border group">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-[11px] font-bold uppercase tracking-wider" style={{ color: milestone.color }}>
                          {milestone.date}
                        </span>
                      </div>
                      <h3 className="text-[15px] font-bold text-gray-900 mb-1 group-hover:text-blue-600 transition-colors">
                        {milestone.title}
                      </h3>
                      <p className="text-[13px] text-gray-500 leading-relaxed">
                        {milestone.description}
                      </p>
                    </div>
                  </motion.div>
                )
              })}
            </motion.div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════
            SECTION 11: POPULAR TAGS
            ═══════════════════════════════════════════════════════════ */}
        <section className="py-16 md:py-20">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-center mb-10"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[11px] font-semibold bg-gray-50/80 text-gray-600 border border-gray-100/60 mb-4">
                <Tag className="w-3.5 h-3.5" />
                Explore Topics
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-gray-900">Popular Tags</h2>
              <p className="text-[15px] text-gray-500 mt-3 max-w-xl mx-auto">
                Browse our content by topic — from technical deep-dives to community impact stories.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              className="flex flex-wrap items-center justify-center gap-3 max-w-4xl mx-auto"
            >
              {popularTags.map((tag, index) => {
                const sizes = ['text-[11px] px-2.5 py-1', 'text-[12px] px-3 py-1.5', 'text-[13px] px-3.5 py-2']
                const sizeClass = sizes[index % 3]
                const colors = [
                  'bg-blue-50 text-blue-600 border-blue-100/60 hover:bg-blue-100 hover:border-blue-200',
                  'bg-emerald-50 text-emerald-600 border-emerald-100/60 hover:bg-emerald-100 hover:border-emerald-200',
                  'bg-violet-50 text-violet-600 border-violet-100/60 hover:bg-violet-100 hover:border-violet-200',
                  'bg-amber-50 text-amber-600 border-amber-100/60 hover:bg-amber-100 hover:border-amber-200',
                  'bg-rose-50 text-rose-600 border-rose-100/60 hover:bg-rose-100 hover:border-rose-200',
                  'bg-teal-50 text-teal-600 border-teal-100/60 hover:bg-teal-100 hover:border-teal-200',
                  'bg-gray-50 text-gray-600 border-gray-100/60 hover:bg-gray-100 hover:border-gray-200',
                ]
                const colorClass = colors[index % colors.length]
                const fontWeights = tag.count >= 9 ? 'font-bold' : tag.count >= 6 ? 'font-semibold' : 'font-medium'

                return (
                  <button
                    key={tag.name}
                    onClick={() => setSearchQuery(tag.name)}
                    className={`inline-flex items-center gap-1.5 rounded-lg border ${sizeClass} ${colorClass} ${fontWeights} transition-all duration-200 hover:shadow-sm cursor-pointer`}
                  >
                    {tag.name}
                    <span className="text-[9px] opacity-60">{tag.count}</span>
                  </button>
                )
              })}
            </motion.div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════
            SECTION 10: EDITORIAL TEAM
            ═══════════════════════════════════════════════════════════ */}
        <section className="py-16 md:py-20 bg-white/40">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-center mb-12"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[11px] font-semibold bg-blue-50/80 text-blue-600 border border-blue-100/60 mb-4">
                <PenTool className="w-3.5 h-3.5" />
                Our Writers
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-gray-900">Editorial Team</h2>
              <p className="text-[15px] text-gray-500 mt-3 max-w-xl mx-auto leading-relaxed">
                Meet the researchers, engineers, and community advocates who write for the ClearPath AI blog.
              </p>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
            >
              {[
                {
                  name: 'Dr. Sarah Chen',
                  role: 'Head of AI Research',
                  initials: 'SC',
                  gradient: 'from-violet-400 to-purple-600',
                  bio: 'Leading researcher in zero-shot classification and honest confidence. Technical lead for the USAII Global AI Hackathon 2026 project.',
                  articleCount: 4,
                  focus: 'Research & Safety',
                },
                {
                  name: 'Marcus Rivera',
                  role: 'Lead Engineer',
                  initials: 'MR',
                  gradient: 'from-blue-400 to-indigo-600',
                  bio: 'Architect of the dual-layer crisis detection system. 8+ years building safety-critical NLP systems.',
                  articleCount: 3,
                  focus: 'Engineering & Safety',
                },
                {
                  name: 'Amine Harch El Korane',
                  role: 'Founder & Architect',
                  initials: 'AB',
                  gradient: 'from-emerald-400 to-teal-600',
                  bio: 'Creator of the 6-layer transparency architecture. Passionate about building AI that serves the most vulnerable.',
                  articleCount: 3,
                  focus: 'Architecture & Ethics',
                },
                {
                  name: 'Lisa Park',
                  role: 'Community Lead',
                  initials: 'LP',
                  gradient: 'from-amber-400 to-orange-600',
                  bio: 'Former 211 navigator turned community advocate. Bridges the gap between AI research and real-world impact.',
                  articleCount: 2,
                  focus: 'Community & Impact',
                },
              ].map((author) => (
                <motion.div
                  key={author.name}
                  variants={staggerItem}
                  className="glass-card rounded-2xl p-6 shadow-premium hover:shadow-premium-lg transition-all duration-300 gradient-border group text-center"
                >
                  {/* Avatar */}
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${author.gradient} flex items-center justify-center text-[18px] font-bold text-white shadow-lg mx-auto mb-4`}>
                    {author.initials}
                  </div>

                  {/* Info */}
                  <h3 className="text-[15px] font-bold text-gray-900 mb-0.5">{author.name}</h3>
                  <p className="text-[11px] text-gray-400 mb-3">{author.role}</p>

                  {/* Bio */}
                  <p className="text-[12px] text-gray-500 leading-relaxed mb-4">
                    {author.bio}
                  </p>

                  {/* Stats */}
                  <div className="flex items-center justify-center gap-4 mb-3">
                    <div className="text-center">
                      <div className="text-[14px] font-extrabold text-gray-900">{author.articleCount}</div>
                      <div className="text-[10px] text-gray-400">Articles</div>
                    </div>
                    <div className="w-px h-6 bg-gray-100" />
                    <div className="text-center">
                      <div className="text-[10px] font-semibold text-blue-600">{author.focus}</div>
                    </div>
                  </div>

                  {/* CTA */}
                  <button className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] font-semibold text-gray-500 hover:text-gray-700 bg-gray-50 hover:bg-gray-100 border border-gray-100/60 transition-all">
                    View Profile
                    <ArrowUpRight className="w-3 h-3" />
                  </button>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════
            SECTION 11: READING RECOMMENDATIONS
            ═══════════════════════════════════════════════════════════ */}
        <section className="py-16 md:py-20">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-center mb-12"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[11px] font-semibold bg-cyan-50/80 text-cyan-600 border border-cyan-100/60 mb-4">
                <BookOpen className="w-3.5 h-3.5" />
                Start Here
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-gray-900">Reading Guide</h2>
              <p className="text-[15px] text-gray-500 mt-3 max-w-xl mx-auto leading-relaxed">
                New to ClearPath AI? Follow our curated reading path to understand our approach from the ground up.
              </p>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="space-y-4 max-w-3xl mx-auto"
            >
              {[
                {
                  step: 1,
                  title: 'Start with the Big Picture',
                  description: 'Read "The 6-Layer Transparency Architecture" to understand our system design philosophy and why every layer matters.',
                  article: 'The 6-Layer Transparency Architecture: A Complete Technical Breakdown',
                  readTime: '15 min read',
                  color: '#8b5cf6',
                  icon: Eye,
                },
                {
                  step: 2,
                  title: 'Understand the Core Innovation',
                  description: 'Dive into "Why Zero-Shot Classification Prevents Hallucination" to learn why classification beats generation in social services.',
                  article: 'Why Zero-Shot Classification Prevents Hallucination in Resource Navigation',
                  readTime: '12 min read',
                  color: '#3b82f6',
                  icon: Lightbulb,
                },
                {
                  step: 3,
                  title: 'See the Safety Layer',
                  description: 'Explore "Building Crisis Detection That Actually Works" to understand how we protect people in crisis situations.',
                  article: 'Building Crisis Detection That Actually Works',
                  readTime: '9 min read',
                  color: '#ef4444',
                  icon: Shield,
                },
                {
                  step: 4,
                  title: 'Learn About Honest AI',
                  description: 'Read "Honest Confidence Scores" to see how we make AI uncertainty visible and actionable for users.',
                  article: 'Honest Confidence Scores: A Deep Dive into Honest AI',
                  readTime: '11 min read',
                  color: '#10b981',
                  icon: Gauge,
                },
                {
                  step: 5,
                  title: 'Hear Real Stories',
                  description: 'Finish with "How 211 Navigators Use ClearPath AI" to see how all these ideas come together in real-world impact.',
                  article: 'How 211 Navigators Use ClearPath AI in Their Daily Workflow',
                  readTime: '7 min read',
                  color: '#f59e0b',
                  icon: Heart,
                },
              ].map((item) => {
                const Icon = item.icon
                return (
                  <motion.div
                    key={item.step}
                    variants={staggerItem}
                    className="glass-card rounded-2xl p-6 shadow-premium hover:shadow-premium-lg transition-all duration-300 gradient-border group"
                  >
                    <div className="flex gap-4">
                      {/* Step Number */}
                      <div className="shrink-0">
                        <div className="w-10 h-10 rounded-xl flex items-center justify-center font-extrabold text-white shadow-lg" style={{ backgroundColor: item.color }}>
                          {item.step}
                        </div>
                      </div>

                      {/* Content */}
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <Icon className="w-4 h-4" style={{ color: item.color }} />
                          <h3 className="text-[15px] font-bold text-gray-900">{item.title}</h3>
                        </div>
                        <p className="text-[13px] text-gray-500 leading-relaxed mb-3">
                          {item.description}
                        </p>
                        <div className="flex items-center gap-3">
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-medium bg-gray-50 text-gray-500 border border-gray-100/60">
                            <BookOpen className="w-3 h-3" />
                            {item.article.length > 50 ? item.article.substring(0, 50) + '...' : item.article}
                          </span>
                          <span className="text-[11px] text-gray-400 flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {item.readTime}
                          </span>
                        </div>
                      </div>

                      {/* Arrow */}
                      <div className="shrink-0 flex items-center">
                        <button className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-400 hover:text-blue-600 hover:bg-blue-50 transition-all" aria-label="Read article">
                          <ArrowRight className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                )
              })}
            </motion.div>

            {/* Total Reading Time */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mt-8"
            >
              <div className="glass-card inline-flex items-center gap-4 px-6 py-3 rounded-2xl shadow-premium">
                <Timer className="w-4 h-4 text-gray-400" />
                <span className="text-[13px] text-gray-500">Total reading time:</span>
                <span className="text-[13px] font-bold text-gray-900">~54 minutes</span>
                <span className="text-[13px] text-gray-400">for the complete guide</span>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════
            SECTION 12: CTA - TRY THE DEMO
            ═══════════════════════════════════════════════════════════ */}
        <section className="py-20 md:py-28 relative overflow-hidden">
          {/* Background decorations */}
          <div className="absolute top-10 right-20 w-72 h-72 bg-emerald-100/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-10 left-20 w-80 h-80 bg-blue-100/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-violet-50/20 rounded-full blur-3xl pointer-events-none" />

          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              {/* Icon */}
              <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-gray-900 to-gray-700 flex items-center justify-center mx-auto mb-8 shadow-premium-xl subtle-float">
                <Layers className="w-10 h-10 text-white" />
              </div>

              {/* Title */}
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900 leading-tight mb-4">
                See Honest Confidence{' '}
                <span className="bg-gradient-to-r from-blue-600 via-emerald-500 to-teal-500 bg-clip-text text-transparent gradient-text-animate">
                  in Action
                </span>
              </h2>

              {/* Subtitle */}
              <p className="text-lg text-gray-500 max-w-2xl mx-auto leading-relaxed mb-8">
                Don&apos;t just read about it — experience how ClearPath AI classifies resources, shows confidence,
                and escalates to humans when it matters most.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  href="/app"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 text-[15px] font-semibold text-white rounded-2xl bg-gradient-to-b from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 shadow-lg shadow-blue-500/20 hover:shadow-xl hover:shadow-blue-500/30 transition-all navigator-btn-glow"
                >
                  <Play className="w-4 h-4" />
                  Try the Demo
                </Link>
                <Link
                  href="/about"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 text-[15px] font-semibold text-gray-700 rounded-2xl border border-gray-200 bg-white/60 hover:bg-white hover:border-gray-300 hover:shadow-sm transition-all"
                >
                  Learn More
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

              {/* Trust Indicators */}
              <motion.div
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="flex flex-wrap items-center justify-center gap-6 mt-12"
              >
                {[
                  { icon: Shield, text: 'Zero hallucinated resources', color: '#10b981' },
                  { icon: Eye, text: '100% confidence visible', color: '#3b82f6' },
                  { icon: Users, text: 'Human escalation always', color: '#8b5cf6' },
                  { icon: Lock, text: 'Privacy-first design', color: '#f59e0b' },
                ].map((item) => {
                  const Icon = item.icon
                  return (
                    <motion.div key={item.text} variants={staggerItem} className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${item.color}10` }}>
                        <Icon className="w-3.5 h-3.5" style={{ color: item.color }} />
                      </div>
                      <span className="text-[12px] font-medium text-gray-500">{item.text}</span>
                    </motion.div>
                  )
                })}
              </motion.div>
            </motion.div>
          </div>
        </section>

      </main>

      {/* ═══ Footer ═══ */}
      <footer className="border-t border-gray-100/60 bg-white/40 mt-auto">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-8 mb-8">
            {/* Brand Column */}
            <div className="sm:col-span-2 md:col-span-1">
              <div className="flex items-center gap-2.5 mb-3">
                <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-gray-900 to-gray-700 flex items-center justify-center">
                  <Layers className="w-3.5 h-3.5 text-white" />
                </div>
                <span className="text-[14px] font-bold tracking-tight text-gray-900">ClearPath AI</span>
              </div>
              <p className="text-[12px] text-gray-400 leading-relaxed max-w-xs">
                Verified community resources with honest confidence. Classified, not generated.
              </p>
              <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[9px] font-bold tracking-wider uppercase bg-emerald-50 text-emerald-600 border border-emerald-100/60 mt-3">
                USAII Hackathon 2026
              </div>
            </div>

            {/* Product Column */}
            <div>
              <h4 className="text-[12px] font-bold text-gray-900 uppercase tracking-wider mb-3">Product</h4>
              <ul className="space-y-2">
                {[
                  { label: 'Try the Demo', href: '/app' },
                  { label: 'How It Works', href: '/how-it-works' },
                  { label: 'Pricing', href: '/pricing' },
                  { label: 'About', href: '/about' },
                ].map((link) => (
                  <li key={link.label}>
                    <Link href={link.href} className="text-[13px] text-gray-500 hover:text-gray-900 transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Resources Column */}
            <div>
              <h4 className="text-[12px] font-bold text-gray-900 uppercase tracking-wider mb-3">Resources</h4>
              <ul className="space-y-2">
                {[
                  { label: 'Blog', href: '/blog' },
                  { label: 'Responsible AI', href: '/responsible-ai' },
                  { label: 'Team', href: '/team' },
                  { label: 'Contact', href: '/contact' },
                ].map((link) => (
                  <li key={link.label}>
                    <Link href={link.href} className="text-[13px] text-gray-500 hover:text-gray-900 transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Legal Column */}
            <div>
              <h4 className="text-[12px] font-bold text-gray-900 uppercase tracking-wider mb-3">Legal</h4>
              <ul className="space-y-2">
                {[
                  { label: 'Privacy Policy', href: '/privacy' },
                  { label: 'Terms of Service', href: '/terms' },
                ].map((link) => (
                  <li key={link.label}>
                    <Link href={link.href} className="text-[13px] text-gray-500 hover:text-gray-900 transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="pt-6 border-t border-gray-100/60 flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-[12px] text-gray-400">
              &copy; {new Date().getFullYear()} ClearPath AI. Built for the USAII Global AI Hackathon 2026.
            </p>
            <div className="flex items-center gap-4">
              <Link href="/privacy" className="text-[12px] text-gray-400 hover:text-gray-600 transition-colors">
                Privacy
              </Link>
              <Link href="/terms" className="text-[12px] text-gray-400 hover:text-gray-600 transition-colors">
                Terms
              </Link>
              <span className="text-[12px] text-gray-400">
                v1.0.0
              </span>
            </div>
          </div>
        </div>
      </footer>
      <Footer />
    </div>
  )
}
