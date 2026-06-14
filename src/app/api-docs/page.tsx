'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import { useRef } from 'react'
import {
  Code2,
  ChevronDown,
  ChevronUp,
  Copy,
  Check,
  ArrowRight,
  Terminal,
  Globe,
  BookOpen,
  AlertTriangle,
  CheckCircle2,
  Info,
  Send,
  Sparkles,
  Shield,
  Server,
  Activity,
  Cpu,
  Database,
  Braces,
  Zap,
  MapPin,
  Heart,
  Search,
  MessageSquare,
  FileText,
} from 'lucide-react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

// ═══════════════════════════════════════════════════════════
// ANIMATION VARIANTS
// ═══════════════════════════════════════════════════════════
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

// ═══════════════════════════════════════════════════════════
// SECTION WRAPPER
// ═══════════════════════════════════════════════════════════
function Section({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-60px' })
  return (
    <motion.section
      ref={ref}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={staggerContainer}
      className={className}
    >
      {children}
    </motion.section>
  )
}

// ═══════════════════════════════════════════════════════════
// COPY BUTTON
// ═══════════════════════════════════════════════════════════
function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false)
  const handleCopy = () => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }
  return (
    <button
      onClick={handleCopy}
      className="absolute top-2 right-2 p-1.5 rounded-md bg-white/80 hover:bg-white border border-gray-200 text-gray-500 hover:text-gray-700 transition-all"
      aria-label="Copy to clipboard"
    >
      {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
    </button>
  )
}

// ═══════════════════════════════════════════════════════════
// CODE BLOCK
// ═══════════════════════════════════════════════════════════
function CodeBlock({ code, language = 'json' }: { code: string; language?: string }) {
  return (
    <div className="relative group">
      <div className="bg-gray-900 rounded-xl overflow-hidden border border-gray-800">
        <div className="flex items-center gap-2 px-4 py-2 bg-gray-800/50 border-b border-gray-700/50">
          <div className="flex gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
            <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/70" />
            <div className="w-2.5 h-2.5 rounded-full bg-green-500/70" />
          </div>
          <span className="text-xs text-gray-500 ml-2 font-mono">{language}</span>
        </div>
        <pre className="p-4 overflow-x-auto text-sm">
          <code className="text-gray-300 font-mono whitespace-pre">{code}</code>
        </pre>
      </div>
      <CopyButton text={code} />
    </div>
  )
}

// ═══════════════════════════════════════════════════════════
// METHOD BADGE
// ═══════════════════════════════════════════════════════════
function MethodBadge({ method }: { method: 'GET' | 'POST' }) {
  const colors = {
    GET: 'bg-emerald-100 text-emerald-700 border-emerald-200',
    POST: 'bg-amber-100 text-amber-700 border-amber-200',
  }
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-bold font-mono border ${colors[method]}`}>
      {method}
    </span>
  )
}

// ═══════════════════════════════════════════════════════════
// COLLAPSIBLE SECTION
// ═══════════════════════════════════════════════════════════
function Collapsible({ title, children, defaultOpen = false, icon }: { title: string; children: React.ReactNode; defaultOpen?: boolean; icon?: React.ReactNode }) {
  const [open, setOpen] = useState(defaultOpen)
  return (
    <div className="border border-gray-200 rounded-xl overflow-hidden bg-white">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-5 py-4 hover:bg-gray-50 transition-colors text-left"
      >
        <div className="flex items-center gap-3">
          {icon}
          <span className="font-semibold text-gray-900">{title}</span>
        </div>
        {open ? <ChevronUp className="w-4 h-4 text-gray-400" /> : <ChevronDown className="w-4 h-4 text-gray-400" />}
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <div className="px-5 pb-5 pt-1 border-t border-gray-100">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// ═══════════════════════════════════════════════════════════
// PARAMETER TABLE ROW
// ═══════════════════════════════════════════════════════════
function ParamRow({ name, type, required, description }: { name: string; type: string; required: boolean; description: string }) {
  return (
    <tr className="border-b border-gray-100 last:border-0">
      <td className="py-2.5 pr-4 font-mono text-sm text-violet-600 whitespace-nowrap">{name}</td>
      <td className="py-2.5 pr-4 text-sm text-gray-500">{type}</td>
      <td className="py-2.5 pr-4">
        {required ? (
          <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-red-50 text-red-600 border border-red-100">
            Required
          </span>
        ) : (
          <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-50 text-gray-500 border border-gray-100">
            Optional
          </span>
        )}
      </td>
      <td className="py-2.5 text-sm text-gray-700">{description}</td>
    </tr>
  )
}

// ═══════════════════════════════════════════════════════════
// RESPONSE FIELD
// ═══════════════════════════════════════════════════════════
function ResponseField({ name, type, description }: { name: string; type: string; description: string }) {
  return (
    <div className="flex items-start gap-3 py-2 border-b border-gray-50 last:border-0">
      <code className="text-sm font-mono text-violet-600 whitespace-nowrap min-w-fit">{name}</code>
      <span className="text-xs text-gray-400 mt-0.5 whitespace-nowrap">{type}</span>
      <span className="text-sm text-gray-600">{description}</span>
    </div>
  )
}

// ═══════════════════════════════════════════════════════════
// STATUS BADGE
// ═══════════════════════════════════════════════════════════
function StatusBadge({ status, label }: { status: 'success' | 'warning' | 'error'; label: string }) {
  const colors = {
    success: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    warning: 'bg-amber-50 text-amber-700 border-amber-200',
    error: 'bg-red-50 text-red-700 border-red-200',
  }
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium border ${colors[status]}`}>
      {label}
    </span>
  )
}

// ═══════════════════════════════════════════════════════════
// MAIN PAGE
// ═══════════════════════════════════════════════════════════
export default function ApiDocsPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-white via-gray-50/30 to-white">
      <Navbar />

      <main className="flex-1">
        {/* ─── HERO ─── */}
        <Section className="pt-32 pb-16 px-4 sm:px-6">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div variants={staggerItem} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-sm font-medium mb-6">
              <Code2 className="w-4 h-4" />
              API Reference
            </motion.div>
            <motion.h1 variants={staggerItem} className="text-4xl sm:text-5xl font-bold text-gray-900 tracking-tight mb-4">
              ClearPath AI API Docs
            </motion.h1>
            <motion.p variants={staggerItem} className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
              Integrate ClearPath AI into your application. Classify user needs, detect crisis situations, and retrieve community resources across 6 major U.S. cities.
            </motion.p>
            <motion.div variants={staggerItem} className="flex flex-wrap justify-center gap-3 text-sm">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-gray-100 text-gray-700">
                <Zap className="w-4 h-4 text-amber-500" />
                No API key required
              </div>
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-gray-100 text-gray-700">
                <Globe className="w-4 h-4 text-blue-500" />
                RESTful JSON
              </div>
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-gray-100 text-gray-700">
                <Shield className="w-4 h-4 text-emerald-500" />
                Built-in crisis detection
              </div>
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-gray-100 text-gray-700">
                <MapPin className="w-4 h-4 text-rose-500" />
                6 Cities Supported
              </div>
            </motion.div>
          </div>
        </Section>

        {/* ─── QUICK OVERVIEW ─── */}
        <Section className="pb-12 px-4 sm:px-6">
          <div className="max-w-4xl mx-auto">
            <motion.div variants={staggerItem}>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
                {[
                  { method: 'POST' as const, path: '/api/classify', desc: 'Classify needs', icon: <Sparkles className="w-4 h-4" /> },
                  { method: 'GET' as const, path: '/api/classify', desc: 'Health check', icon: <Activity className="w-4 h-4" /> },
                  { method: 'GET' as const, path: '/api/community-resources', desc: 'List resources', icon: <Database className="w-4 h-4" /> },
                  { method: 'POST' as const, path: '/api/contact', desc: 'Contact form', icon: <Send className="w-4 h-4" /> },
                  { method: 'GET' as const, path: '/api', desc: 'Service status', icon: <Server className="w-4 h-4" /> },
                ].map((ep) => (
                  <div
                    key={ep.path + ep.method}
                    className="flex items-start gap-3 p-3 rounded-xl border border-gray-200 bg-white hover:shadow-md transition-shadow"
                  >
                    <div className="mt-0.5">{ep.icon}</div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 mb-0.5">
                        <MethodBadge method={ep.method} />
                      </div>
                      <code className="text-xs font-mono text-gray-700 break-all">{ep.path}</code>
                      <p className="text-xs text-gray-500 mt-0.5">{ep.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </Section>

        {/* ─── ENDPOINT DETAILS ─── */}
        <Section className="pb-16 px-4 sm:px-6">
          <div className="max-w-4xl mx-auto space-y-8">

            {/* ═══════════════════════════════════════════════════
                1. POST /api/classify
            ═══════════════════════════════════════════════════ */}
            <motion.div variants={staggerItem}>
              <div className="rounded-2xl border border-gray-200 bg-white overflow-hidden shadow-sm">
                {/* Header */}
                <div className="px-6 py-5 border-b border-gray-100 bg-gradient-to-r from-amber-50/50 to-orange-50/50">
                  <div className="flex items-center gap-3 mb-2">
                    <MethodBadge method="POST" />
                    <code className="text-lg font-mono font-semibold text-gray-900">/api/classify</code>
                  </div>
                  <p className="text-gray-600 text-sm">
                    The core endpoint. Send a user&apos;s description of their situation and receive classified needs with matched community resources. Crisis detection is built-in and always active — it runs before AI classification and is never delegated to the model.
                  </p>
                </div>

                <div className="p-6 space-y-6">
                  {/* Request Body */}
                  <div>
                    <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-3">Request Body</h3>
                    <div className="overflow-x-auto">
                      <table className="w-full text-left">
                        <thead>
                          <tr className="border-b border-gray-200">
                            <th className="py-2 pr-4 text-xs font-semibold text-gray-500 uppercase">Parameter</th>
                            <th className="py-2 pr-4 text-xs font-semibold text-gray-500 uppercase">Type</th>
                            <th className="py-2 pr-4 text-xs font-semibold text-gray-500 uppercase">Required</th>
                            <th className="py-2 text-xs font-semibold text-gray-500 uppercase">Description</th>
                          </tr>
                        </thead>
                        <tbody>
                          <ParamRow name="text" type="string" required description="The user's description of their situation. Minimum 1 character." />
                          <ParamRow name="cityId" type="string" required={false} description='City to use for resource matching. Values: "houston", "newyork", "losangeles", "chicago", "dallas", "miami". If omitted, the city is auto-detected from lat/lng.' />
                          <ParamRow name="lat" type="number" required={false} description="User's latitude (-90 to 90). Used for distance calculations and city auto-detection." />
                          <ParamRow name="lng" type="number" required={false} description="User's longitude (-180 to 180). Used for distance calculations and city auto-detection." />
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* Example Request */}
                  <div>
                    <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-3">Example Request</h3>
                    <CodeBlock
                      language="bash"
                      code={`curl -X POST https://your-domain.com/api/classify \\
  -H "Content-Type: application/json" \\
  -d '{
    "text": "I lost my job and I can not afford rent this month",
    "cityId": "houston",
    "lat": 29.7604,
    "lng": -95.3698
  }'`}
                    />
                  </div>

                  {/* Crisis Response */}
                  <Collapsible
                    title="Crisis Response (isCrisis: true)"
                    icon={<AlertTriangle className="w-5 h-5 text-red-500" />}
                    defaultOpen={false}
                  >
                    <div className="space-y-4">
                      <div className="flex items-start gap-2 p-3 rounded-lg bg-red-50 border border-red-100">
                        <AlertTriangle className="w-5 h-5 text-red-500 mt-0.5 shrink-0" />
                        <p className="text-sm text-red-800">
                          Crisis detection uses deterministic regex patterns and <strong>always</strong> runs first. The AI model is never trusted for crisis detection. If a crisis is detected, the response short-circuits to provide immediate help.
                        </p>
                      </div>
                      <CodeBlock
                        language="json"
                        code={`{
  "isCrisis": true,
  "crisisType": "self-harm",
  "crisisLines": [
    { "name": "988 Suicide & Crisis Lifeline", "action": "Free. Confidential. 24/7.", "call": "988" },
    { "name": "Crisis Text Line", "action": "Text HOME to 741741", "call": "Text" },
    { "name": "911", "action": "Immediate danger — call now", "call": "911" }
  ],
  "categories": [
    {
      "label": "Crisis Support",
      "confidence": 99,
      "resources": [ /* crisis resources */ ],
      "why": "You are not alone. Help is available right now.",
      "warning": "If you are in immediate physical danger, call 911."
    }
  ],
  "hasLocation": true,
  "cityId": "houston",
  "cityLabel": "Houston, TX",
  "outsideServiceArea": false,
  "serviceArea": "Houston, TX"
}`}
                      />
                      <div>
                        <h4 className="text-xs font-semibold text-gray-500 uppercase mb-2">Crisis Types</h4>
                        <div className="flex flex-wrap gap-2">
                          {[
                            { type: 'self-harm', desc: 'Suicidal ideation, self-injury' },
                            { type: 'violence-others', desc: 'Homicidal ideation, threats' },
                            { type: 'domestic', desc: 'Domestic violence, abuse' },
                            { type: 'medical', desc: 'Medical emergency' },
                            { type: 'general', desc: 'Other crisis indicators' },
                          ].map(ct => (
                            <span key={ct.type} className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-red-50 border border-red-100 text-xs text-red-700">
                              <code className="font-mono font-bold">{ct.type}</code>
                              <span className="text-red-400">—</span>
                              {ct.desc}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </Collapsible>

                  {/* Standard Response */}
                  <Collapsible
                    title="Standard Response (isCrisis: false)"
                    icon={<CheckCircle2 className="w-5 h-5 text-emerald-500" />}
                    defaultOpen={true}
                  >
                    <div className="space-y-4">
                      <CodeBlock
                        language="json"
                        code={`{
  "isCrisis": false,
  "categories": [
    {
      "label": "Housing Assistance",
      "confidence": 87,
      "resources": [
        {
          "name": "Houston Housing Authority",
          "detail": "Emergency housing assistance...",
          "phone": "713-260-0600",
          "address": "2640 Fountain View Dr, Houston, TX",
          "hours": "Mon-Fri 8am-5pm",
          "eligibility": "Low-income Houston residents",
          "verified": true,
          "distance": "3.2 mi",
          "isNational": false
        }
      ],
      "why": "Matched by BART-large-MNLI semantic analysis of your description.",
      "also": "You may also benefit from Food Assistance and Employment Services.",
      "warning": "87% confidence — consider providing more detail for a better match"
    }
  ],
  "needsClarification": false,
  "clarificationMessage": null,
  "clarificationQuestions": null,
  "model": "BART-large-MNLI (live)",
  "classificationSource": "bart",
  "hasLocation": true,
  "cityId": "houston",
  "cityLabel": "Houston, TX",
  "outsideServiceArea": false,
  "serviceArea": "Houston, TX",
  "debug": { /* diagnostic info */ }
}`}
                      />

                      {/* Response fields */}
                      <div>
                        <h4 className="text-xs font-semibold text-gray-500 uppercase mb-2">Response Fields</h4>
                        <div className="space-y-0">
                          <ResponseField name="isCrisis" type="boolean" description="Whether crisis language was detected." />
                          <ResponseField name="categories" type="array" description="Matched categories with resources, confidence scores, and explanations." />
                          <ResponseField name="categories[].label" type="string" description="One of 9 categories (see below)." />
                          <ResponseField name="categories[].confidence" type="number" description="0–100 confidence score." />
                          <ResponseField name="categories[].resources" type="array" description="Matched community resources with name, phone, address, hours, distance, isNational flag." />
                          <ResponseField name="categories[].why" type="string" description="Human-readable explanation of why this category was matched." />
                          <ResponseField name="categories[].also" type="string?" description="Suggestion of other potentially relevant categories." />
                          <ResponseField name="categories[].warning" type="string?" description="Shown when confidence is below 70%." />
                          <ResponseField name="needsClarification" type="boolean" description="True when top confidence is below 70% or no categories matched." />
                          <ResponseField name="clarificationQuestions" type="array?" description="Follow-up questions to help narrow down the user's needs." />
                          <ResponseField name="model" type="string" description="Which model was used (BART-large-MNLI or keyword matching)." />
                          <ResponseField name="classificationSource" type="string" description='"bart" or "keyword" — always honest about the source.' />
                          <ResponseField name="hasLocation" type="boolean" description="Whether lat/lng were provided." />
                          <ResponseField name="cityId" type="string" description='The detected or selected city ID (e.g., "houston", "newyork").' />
                          <ResponseField name="cityLabel" type="string" description='Human-readable city name (e.g., "Houston, TX", "New York, NY").' />
                          <ResponseField name="outsideServiceArea" type="boolean" description="Whether the user is more than 100 miles from ANY supported city." />
                          <ResponseField name="serviceArea" type="string" description='The detected or selected city name (e.g., "Houston, TX").' />
                          <ResponseField name="debug" type="object" description="Diagnostic info about the classification pipeline (API key status, fetch results, etc.)." />
                        </div>
                      </div>
                    </div>
                  </Collapsible>

                  {/* 9 Categories */}
                  <div>
                    <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-3">Classification Categories</h3>
                    <p className="text-sm text-gray-600 mb-3">
                      Text is classified against these 9 categories using BART-large-MNLI zero-shot classification (or keyword matching as a fallback):
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                      {[
                        { label: 'Housing Assistance', color: 'bg-amber-100 text-amber-800 border-amber-200', icon: '🏠' },
                        { label: 'Food Assistance', color: 'bg-green-100 text-green-800 border-green-200', icon: '🍲' },
                        { label: 'Mental Health', color: 'bg-purple-100 text-purple-800 border-purple-200', icon: '🧠' },
                        { label: 'Employment Services', color: 'bg-sky-100 text-sky-800 border-sky-200', icon: '💼' },
                        { label: 'Legal Aid', color: 'bg-cyan-100 text-cyan-800 border-cyan-200', icon: '⚖️' },
                        { label: 'Healthcare', color: 'bg-red-100 text-red-800 border-red-200', icon: '🏥' },
                        { label: 'Crisis Support', color: 'bg-rose-100 text-rose-800 border-rose-200', icon: '🆘' },
                        { label: 'Senior Services', color: 'bg-indigo-100 text-indigo-800 border-indigo-200', icon: '👴' },
                        { label: 'Veteran Services', color: 'bg-emerald-100 text-emerald-800 border-emerald-200', icon: '🎖️' },
                      ].map(cat => (
                        <div
                          key={cat.label}
                          className={`flex items-center gap-2 px-3 py-2 rounded-lg border ${cat.color} text-sm font-medium`}
                        >
                          <span>{cat.icon}</span>
                          {cat.label}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Clarification Questions */}
                  <Collapsible
                    title="Clarification Questions (when confidence < 70%)"
                    icon={<Info className="w-5 h-5 text-blue-500" />}
                    defaultOpen={false}
                  >
                    <p className="text-sm text-gray-600 mb-3">
                      When the top category confidence is below 70%, the API returns follow-up questions to help narrow down the user&apos;s needs. Each question includes an ID for tracking and pre-defined options.
                    </p>
                    <CodeBlock
                      language="json"
                      code={`"clarificationQuestions": [
  {
    "question": "Are you currently facing eviction, or at risk of losing housing?",
    "options": ["Facing eviction", "At risk", "Currently homeless", "Need affordable housing"],
    "id": "housing_urgency"
  }
]`}
                    />
                    <p className="text-xs text-gray-500 mt-2">
                      Clarification questions are available for all categories except Crisis Support (which short-circuits to crisis response).
                    </p>
                  </Collapsible>

                  {/* Classification Pipeline */}
                  <Collapsible
                    title="Classification Pipeline (how it works)"
                    icon={<Cpu className="w-5 h-5 text-violet-500" />}
                    defaultOpen={false}
                  >
                    <div className="space-y-4">
                      <div className="space-y-3">
                        {[
                          { step: 1, title: 'Crisis Detection', desc: 'Regex-based pattern matching runs first. If crisis language is found, the response short-circuits with immediate help resources. The AI is never trusted for crisis detection.', status: 'always' as const },
                          { step: 2, title: 'BART-large-MNLI Classification', desc: 'If HUGGINGFACE_API_KEY is configured, the text is sent to Facebook\'s BART-large-MNLI model for zero-shot classification against 9 categories using descriptive labels for maximum semantic signal.', status: 'conditional' as const },
                          { step: 3, title: 'Keyword Fallback', desc: 'If no API key is set or BART fails, keyword matching is used honestly — results are always labeled with their source ("bart" or "keyword").', status: 'fallback' as const },
                          { step: 4, title: 'Confidence Gating', desc: 'Categories below 10% confidence are filtered out. If the top category is below 70%, clarification questions are returned to help the user provide more detail.', status: 'always' as const },
                          { step: 5, title: 'Resource Matching', desc: 'City-specific community resources are matched to each category based on the detected or selected city. National resources are included regardless of location. If lat/lng are provided, distance calculations use the city\'s center coordinates.', status: 'always' as const },
                        ].map(s => (
                          <div key={s.step} className="flex gap-3">
                            <div className="flex flex-col items-center">
                              <div className="w-7 h-7 rounded-full bg-gray-900 text-white text-xs font-bold flex items-center justify-center">
                                {s.step}
                              </div>
                              {s.step < 5 && <div className="w-px h-full bg-gray-200 mt-1" />}
                            </div>
                            <div className="pb-3">
                              <div className="flex items-center gap-2">
                                <span className="font-medium text-gray-900 text-sm">{s.title}</span>
                                {s.status === 'conditional' && <StatusBadge status="warning" label="Requires API key" />}
                                {s.status === 'fallback' && <StatusBadge status="warning" label="Fallback" />}
                                {s.status === 'always' && <StatusBadge status="success" label="Always runs" />}
                              </div>
                              <p className="text-sm text-gray-600 mt-0.5">{s.desc}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </Collapsible>

                  {/* Location & Distance */}
                  <Collapsible
                    title="Location & Distance Calculation"
                    icon={<MapPin className="w-5 h-5 text-rose-500" />}
                    defaultOpen={false}
                  >
                    <div className="space-y-3">
                      <p className="text-sm text-gray-600">
                        When <code className="text-violet-600 font-mono text-xs">lat</code> and <code className="text-violet-600 font-mono text-xs">lng</code> are provided, the API auto-detects the nearest city and calculates haversine distance from that city's center to each resource. You can override auto-detection by providing <code className="text-violet-600 font-mono text-xs">cityId</code>.
                      </p>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-sm">
                          <div className="w-2 h-2 rounded-full bg-emerald-500" />
                          <span className="text-gray-700"><strong>Within 25 mi</strong> — Distance shown in miles (e.g., &quot;3.2 mi&quot;)</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <div className="w-2 h-2 rounded-full bg-amber-500" />
                          <span className="text-gray-700"><strong>25–100 mi</strong> — Distance shown with &quot;outside metro area&quot; note</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <div className="w-2 h-2 rounded-full bg-red-500" />
                          <span className="text-gray-700"><strong>Over 100 mi from ANY city</strong> — <code className="font-mono text-xs">outsideServiceArea: true</code>, national resources + nearest city resources shown</span>
                        </div>
                      </div>
                      <div className="mt-3 p-3 rounded-lg bg-gray-50 border border-gray-200">
                        <p className="text-xs font-semibold text-gray-500 uppercase mb-2">Supported City Centers</p>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5">
                          {[
                            { id: 'houston', label: 'Houston, TX', coords: '29.7604, -95.3698' },
                            { id: 'newyork', label: 'New York, NY', coords: '40.7128, -74.0060' },
                            { id: 'losangeles', label: 'Los Angeles, CA', coords: '34.0522, -118.2437' },
                            { id: 'chicago', label: 'Chicago, IL', coords: '41.8781, -87.6298' },
                            { id: 'dallas', label: 'Dallas, TX', coords: '32.7767, -96.7970' },
                            { id: 'miami', label: 'Miami, FL', coords: '25.7617, -80.1918' },
                          ].map(city => (
                            <div key={city.id} className="flex items-center gap-2 text-xs">
                              <MapPin className="w-3 h-3 text-gray-400 shrink-0" />
                              <span className="text-gray-700"><strong>{city.label}</strong></span>
                              <span className="text-gray-400 font-mono">({city.coords})</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      <p className="text-xs text-gray-500 mt-2">
                        If no coordinates are provided and no <code className="font-mono">cityId</code> is specified, the default city is Houston, TX. Resources tagged as national (isNational: true) are always included regardless of location.
                      </p>
                    </div>
                  </Collapsible>

                  {/* Error Responses */}
                  <div>
                    <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-3">Error Responses</h3>
                    <div className="space-y-2">
                      <div className="flex items-start gap-3 p-3 rounded-lg bg-red-50/50 border border-red-100">
                        <StatusBadge status="error" label="400" />
                        <div>
                          <code className="text-sm font-mono text-gray-800">{`{ "error": "Text input is required" }`}</code>
                          <p className="text-xs text-gray-500 mt-1">Returned when <code className="font-mono">text</code> is missing, empty, or not a string.</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3 p-3 rounded-lg bg-red-50/50 border border-red-100">
                        <StatusBadge status="error" label="500" />
                        <div>
                          <code className="text-sm font-mono text-gray-800">{`{ "error": "Internal server error" }`}</code>
                          <p className="text-xs text-gray-500 mt-1">Unexpected server error.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* ═══════════════════════════════════════════════════
                2. GET /api/classify
            ═══════════════════════════════════════════════════ */}
            <motion.div variants={staggerItem}>
              <div className="rounded-2xl border border-gray-200 bg-white overflow-hidden shadow-sm">
                <div className="px-6 py-5 border-b border-gray-100 bg-gradient-to-r from-emerald-50/50 to-teal-50/50">
                  <div className="flex items-center gap-3 mb-2">
                    <MethodBadge method="GET" />
                    <code className="text-lg font-mono font-semibold text-gray-900">/api/classify</code>
                  </div>
                  <p className="text-gray-600 text-sm">
                    Health check and diagnostics endpoint. Returns the current status of the classification service, including whether the BART model is available.
                  </p>
                </div>
                <div className="p-6 space-y-6">
                  <CodeBlock
                    language="json"
                    code={`{
  "status": "ok",
  "service": "ClearPath AI Classification API",
  "version": "4.0.0",
  "model": "facebook/bart-large-mnli",
  "bartAvailable": true,
  "apiKeyPrefix": "hf_xxxx...",
  "apiKeyLength": 40,
  "classificationMode": "BART-large-MNLI (live)",
  "crisisDetection": "regex-based (deterministic)",
  "multiCity": true,
  "supportedCities": [
    { "id": "houston", "label": "Houston, TX", "lat": 29.7604, "lng": -95.3698 },
    { "id": "newyork", "label": "New York, NY", "lat": 40.7128, "lng": -74.0060 },
    { "id": "losangeles", "label": "Los Angeles, CA", "lat": 34.0522, "lng": -118.2437 },
    { "id": "chicago", "label": "Chicago, IL", "lat": 41.8781, "lng": -87.6298 },
    { "id": "dallas", "label": "Dallas, TX", "lat": 32.7767, "lng": -96.7970 },
    { "id": "miami", "label": "Miami, FL", "lat": 25.7617, "lng": -80.1918 }
  ],
  "labels": [
    "Housing Assistance",
    "Food Assistance",
    "Mental Health",
    "Employment Services",
    "Legal Aid",
    "Healthcare",
    "Crisis Support",
    "Senior Services",
    "Veteran Services"
  ],
  "resourceCount": 42
}`}
                  />
                  <div>
                    <h4 className="text-xs font-semibold text-gray-500 uppercase mb-2">Key Fields</h4>
                    <div className="space-y-0">
                      <ResponseField name="bartAvailable" type="boolean" description="Whether HUGGINGFACE_API_KEY is configured and BART classification is active." />
                      <ResponseField name="classificationMode" type="string" description='Descriptive label: "BART-large-MNLI (live)" or "Keyword matching (fallback)".' />
                      <ResponseField name="crisisDetection" type="string" description='Always "regex-based (deterministic)" — crisis detection never uses AI.' />
                      <ResponseField name="multiCity" type="boolean" description="Whether multi-city support is enabled. Always true in v4.0.0+." />
                      <ResponseField name="supportedCities" type="array" description="Array of supported city objects with id, label, and center coordinates." />
                      <ResponseField name="labels" type="string[]" description="The 9 classification categories." />
                      <ResponseField name="resourceCount" type="number" description="Total number of community resources in the database." />
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* ═══════════════════════════════════════════════════
                3. GET /api/community-resources
            ═══════════════════════════════════════════════════ */}
            <motion.div variants={staggerItem}>
              <div className="rounded-2xl border border-gray-200 bg-white overflow-hidden shadow-sm">
                <div className="px-6 py-5 border-b border-gray-100 bg-gradient-to-r from-blue-50/50 to-indigo-50/50">
                  <div className="flex items-center gap-3 mb-2">
                    <MethodBadge method="GET" />
                    <code className="text-lg font-mono font-semibold text-gray-900">/api/community-resources</code>
                  </div>
                  <p className="text-gray-600 text-sm">
                    List community resources from the database. Optionally filter by category, city, or search by keyword across name, description, and services.
                  </p>
                </div>
                <div className="p-6 space-y-6">
                  {/* Query Parameters */}
                  <div>
                    <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-3">Query Parameters</h3>
                    <div className="overflow-x-auto">
                      <table className="w-full text-left">
                        <thead>
                          <tr className="border-b border-gray-200">
                            <th className="py-2 pr-4 text-xs font-semibold text-gray-500 uppercase">Parameter</th>
                            <th className="py-2 pr-4 text-xs font-semibold text-gray-500 uppercase">Type</th>
                            <th className="py-2 pr-4 text-xs font-semibold text-gray-500 uppercase">Required</th>
                            <th className="py-2 text-xs font-semibold text-gray-500 uppercase">Description</th>
                          </tr>
                        </thead>
                        <tbody>
                          <ParamRow name="category" type="string" required={false} description='Filter by category (e.g., "Housing Assistance", "Food Assistance"). Pass "All" or omit for all categories.' />
                          <ParamRow name="cityId" type="string" required={false} description='Filter by city. Values: "houston", "newyork", "losangeles", "chicago", "dallas", "miami". Omit for all cities.' />
                          <ParamRow name="search" type="string" required={false} description='Search across resource name, description, and services fields.' />
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* Example Requests */}
                  <div>
                    <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-3">Example Requests</h3>
                    <div className="space-y-3">
                      <div>
                        <p className="text-xs text-gray-500 mb-1 font-medium">All resources:</p>
                        <CodeBlock language="bash" code={`curl https://your-domain.com/api/community-resources`} />
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 mb-1 font-medium">Filter by category:</p>
                        <CodeBlock language="bash" code={`curl "https://your-domain.com/api/community-resources?category=Food%20Assistance"`} />
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 mb-1 font-medium">Filter by city:</p>
                        <CodeBlock language="bash" code={`curl "https://your-domain.com/api/community-resources?cityId=newyork"`} />
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 mb-1 font-medium">Search resources:</p>
                        <CodeBlock language="bash" code={`curl "https://your-domain.com/api/community-resources?search=snap"`} />
                      </div>
                    </div>
                  </div>

                  {/* Response */}
                  <div>
                    <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-3">Response</h3>
                    <CodeBlock
                      language="json"
                      code={`{
  "resources": [
    {
      "id": 1,
      "name": "Houston Food Bank",
      "description": "Distributes food to families in need across Houston.",
      "services": "Food distribution, SNAP application assistance",
      "category": "Food Assistance",
      "phone": "832-369-9390",
      "address": "535 Portwall St, Houston, TX 77029",
      "hours": "Mon-Fri 8am-5pm",
      "eligibility": "Open to all Houston residents",
      "verified": true,
      "cityId": "houston",
      "isNational": false
    }
  ],
  "categories": [
    "Crisis Support",
    "Employment Services",
    "Food Assistance",
    "Healthcare",
    "Housing Assistance",
    "Legal Aid",
    "Mental Health",
    "Senior Services",
    "Veteran Services"
  ]
}`}
                    />
                    <div className="mt-3">
                      <h4 className="text-xs font-semibold text-gray-500 uppercase mb-2">Response Fields</h4>
                      <div className="space-y-0">
                        <ResponseField name="resources" type="array" description="Array of resource objects from the database, sorted alphabetically by name. Includes cityId and isNational fields for multi-city filtering." />
                        <ResponseField name="categories" type="string[]" description="Distinct category values available for filtering. Useful for building filter UIs." />
                      </div>
                    </div>
                  </div>

                  {/* Database note */}
                  <div className="flex items-start gap-2 p-3 rounded-lg bg-blue-50 border border-blue-100">
                    <Info className="w-5 h-5 text-blue-500 mt-0.5 shrink-0" />
                    <p className="text-sm text-blue-800">
                      Resources are stored in a SQLite database via Prisma ORM. If the database is unavailable, the endpoint returns empty arrays instead of crashing.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* ═══════════════════════════════════════════════════
                4. POST /api/contact
            ═══════════════════════════════════════════════════ */}
            <motion.div variants={staggerItem}>
              <div className="rounded-2xl border border-gray-200 bg-white overflow-hidden shadow-sm">
                <div className="px-6 py-5 border-b border-gray-100 bg-gradient-to-r from-violet-50/50 to-purple-50/50">
                  <div className="flex items-center gap-3 mb-2">
                    <MethodBadge method="POST" />
                    <code className="text-lg font-mono font-semibold text-gray-900">/api/contact</code>
                  </div>
                  <p className="text-gray-600 text-sm">
                    Submit a contact form message. Currently logs messages to the server console — email notification is planned for a future release.
                  </p>
                </div>
                <div className="p-6 space-y-6">
                  {/* Request Body */}
                  <div>
                    <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-3">Request Body</h3>
                    <div className="overflow-x-auto">
                      <table className="w-full text-left">
                        <thead>
                          <tr className="border-b border-gray-200">
                            <th className="py-2 pr-4 text-xs font-semibold text-gray-500 uppercase">Parameter</th>
                            <th className="py-2 pr-4 text-xs font-semibold text-gray-500 uppercase">Type</th>
                            <th className="py-2 pr-4 text-xs font-semibold text-gray-500 uppercase">Required</th>
                            <th className="py-2 text-xs font-semibold text-gray-500 uppercase">Description</th>
                          </tr>
                        </thead>
                        <tbody>
                          <ParamRow name="name" type="string" required description="Contact's full name." />
                          <ParamRow name="email" type="string" required description="Contact's email address." />
                          <ParamRow name="subject" type="string" required={false} description="Message subject." />
                          <ParamRow name="message" type="string" required description="The message body." />
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* Example Request */}
                  <div>
                    <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-3">Example Request</h3>
                    <CodeBlock
                      language="bash"
                      code={`curl -X POST https://your-domain.com/api/contact \\
  -H "Content-Type: application/json" \\
  -d '{
    "name": "Jane Doe",
    "email": "jane@example.com",
    "subject": "Partnership inquiry",
    "message": "We would love to partner with ClearPath AI..."
  }'`}
                    />
                  </div>

                  {/* Success Response */}
                  <div>
                    <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-3">Success Response (200)</h3>
                    <CodeBlock
                      language="json"
                      code={`{
  "success": true,
  "message": "Thank you for your message. We'll get back to you soon."
}`}
                    />
                  </div>

                  {/* Error Responses */}
                  <div>
                    <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-3">Error Responses</h3>
                    <div className="space-y-2">
                      <div className="flex items-start gap-3 p-3 rounded-lg bg-red-50/50 border border-red-100">
                        <StatusBadge status="error" label="400" />
                        <div>
                          <code className="text-sm font-mono text-gray-800">{`{ "error": "Name, email, and message are required" }`}</code>
                          <p className="text-xs text-gray-500 mt-1">Returned when any required field is missing.</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3 p-3 rounded-lg bg-red-50/50 border border-red-100">
                        <StatusBadge status="error" label="500" />
                        <div>
                          <code className="text-sm font-mono text-gray-800">{`{ "error": "Failed to process your message" }`}</code>
                          <p className="text-xs text-gray-500 mt-1">Unexpected server error.</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Note */}
                  <div className="flex items-start gap-2 p-3 rounded-lg bg-amber-50 border border-amber-100">
                    <Info className="w-5 h-5 text-amber-500 mt-0.5 shrink-0" />
                    <p className="text-sm text-amber-800">
                      <strong>Current status:</strong> Messages are logged to the server console. Email notification via SendGrid/Resend is planned. No data is persisted to the database yet.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* ═══════════════════════════════════════════════════
                5. GET /api
            ═══════════════════════════════════════════════════ */}
            <motion.div variants={staggerItem}>
              <div className="rounded-2xl border border-gray-200 bg-white overflow-hidden shadow-sm">
                <div className="px-6 py-5 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-slate-50">
                  <div className="flex items-center gap-3 mb-2">
                    <MethodBadge method="GET" />
                    <code className="text-lg font-mono font-semibold text-gray-900">/api</code>
                  </div>
                  <p className="text-gray-600 text-sm">
                    Basic health check endpoint. Returns the service status and version — useful for uptime monitoring.
                  </p>
                </div>
                <div className="p-6 space-y-6">
                  <CodeBlock
                    language="json"
                    code={`{
  "status": "ok",
  "service": "ClearPath AI",
  "version": "4.0.0"
}`}
                  />
                  <div>
                    <h4 className="text-xs font-semibold text-gray-500 uppercase mb-2">Response Fields</h4>
                    <div className="space-y-0">
                      <ResponseField name="status" type="string" description='Always "ok" when the service is running.' />
                      <ResponseField name="service" type="string" description='Service name: "ClearPath AI".' />
                      <ResponseField name="version" type="string" description='API version: "4.0.0".' />
                    </div>
                  </div>
                  <div className="flex items-start gap-2 p-3 rounded-lg bg-gray-50 border border-gray-200">
                    <Activity className="w-5 h-5 text-gray-400 mt-0.5 shrink-0" />
                    <p className="text-sm text-gray-600">
                      For more detailed diagnostics (BART availability, API key status, resource count), use <code className="font-mono text-xs text-violet-600">GET /api/classify</code> instead.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </Section>

        {/* ─── HONESTY & TRANSPARENCY ─── */}
        <Section className="pb-16 px-4 sm:px-6">
          <div className="max-w-4xl mx-auto">
            <motion.div variants={staggerItem}>
              <div className="rounded-2xl border border-gray-200 bg-white p-6 sm:p-8 shadow-sm">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center">
                    <Shield className="w-5 h-5 text-emerald-600" />
                  </div>
                  <h2 className="text-xl font-bold text-gray-900">Our Commitment to Honesty</h2>
                </div>
                <p className="text-gray-600 mb-4">
                  ClearPath AI is built on a foundation of transparency. Here&apos;s what that means for the API:
                </p>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-500 mt-0.5 shrink-0" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">Honest classification source</p>
                      <p className="text-xs text-gray-500">Every response tells you whether it used BART AI or keyword matching. We never pretend keyword results are AI-generated.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-500 mt-0.5 shrink-0" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">Deterministic crisis detection</p>
                      <p className="text-xs text-gray-500">Crisis detection uses regex patterns, not AI. The model is never trusted for crisis situations — it&apos;s too important to leave to probability.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-500 mt-0.5 shrink-0" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">Confidence-aware responses</p>
                      <p className="text-xs text-gray-500">When we&apos;re not sure, we say so — and ask follow-up questions instead of guessing.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-500 mt-0.5 shrink-0" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">Full debug transparency</p>
                      <p className="text-xs text-gray-500">The <code className="font-mono text-xs">debug</code> field in classify responses exposes the full classification pipeline — API key status, fetch results, fallback reasons.</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </Section>

        {/* ─── SERVICE AREA ─── */}
        <Section className="pb-16 px-4 sm:px-6">
          <div className="max-w-4xl mx-auto">
            <motion.div variants={staggerItem}>
              <div className="rounded-2xl border border-gray-200 bg-white p-6 sm:p-8 shadow-sm">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-rose-100 flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-rose-600" />
                  </div>
                  <h2 className="text-xl font-bold text-gray-900">Service Area</h2>
                </div>
                <p className="text-gray-600 mb-4">
                  ClearPath AI serves <strong>6 major U.S. cities</strong>: Houston, New York, Los Angeles, Chicago, Dallas, and Miami. Each city has its own set of community resources, and national resources are available everywhere.
                </p>
                <div className="grid gap-3 sm:grid-cols-3">
                  <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-100 text-center">
                    <div className="text-2xl font-bold text-emerald-700">25 mi</div>
                    <div className="text-xs text-emerald-600 font-medium mt-1">City Metro Core</div>
                    <div className="text-xs text-emerald-500 mt-0.5">Exact distance shown</div>
                  </div>
                  <div className="p-4 rounded-xl bg-amber-50 border border-amber-100 text-center">
                    <div className="text-2xl font-bold text-amber-700">100 mi</div>
                    <div className="text-xs text-amber-600 font-medium mt-1">Extended Service Area</div>
                    <div className="text-xs text-amber-500 mt-0.5">&quot;Outside metro area&quot; note</div>
                  </div>
                  <div className="p-4 rounded-xl bg-gray-50 border border-gray-200 text-center">
                    <div className="text-2xl font-bold text-gray-700">100+ mi</div>
                    <div className="text-xs text-gray-600 font-medium mt-1">Outside All Service Areas</div>
                    <div className="text-xs text-gray-500 mt-0.5">National + nearest city</div>
                  </div>
                </div>
                <p className="text-xs text-gray-500 mt-4">
                  Users outside all service areas still receive national resources and resources from the nearest supported city. Use the <code className="font-mono">cityId</code> parameter to explicitly select a city.
                </p>
              </div>
            </motion.div>
          </div>
        </Section>

        {/* ─── QUICK START ─── */}
        <Section className="pb-16 px-4 sm:px-6">
          <div className="max-w-4xl mx-auto">
            <motion.div variants={staggerItem}>
              <div className="rounded-2xl border border-gray-200 bg-white p-6 sm:p-8 shadow-sm">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-violet-100 flex items-center justify-center">
                    <Terminal className="w-5 h-5 text-violet-600" />
                  </div>
                  <h2 className="text-xl font-bold text-gray-900">Quick Start</h2>
                </div>

                <div className="space-y-6">
                  {/* Step 1 */}
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-6 h-6 rounded-full bg-gray-900 text-white text-xs font-bold flex items-center justify-center">1</div>
                      <h3 className="font-semibold text-gray-900">Check the API status</h3>
                    </div>
                    <CodeBlock
                      language="bash"
                      code={`curl https://your-domain.com/api/classify`}
                    />
                  </div>

                  {/* Step 2 */}
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-6 h-6 rounded-full bg-gray-900 text-white text-xs font-bold flex items-center justify-center">2</div>
                      <h3 className="font-semibold text-gray-900">Classify a user&apos;s needs</h3>
                    </div>
                    <CodeBlock
                      language="javascript"
                      code={`const response = await fetch('/api/classify', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    text: 'I need help finding affordable housing in Houston',
    cityId: 'houston',
    lat: 29.7604,
    lng: -95.3698
  })
});

const data = await response.json();

console.log('City:', data.cityLabel); // "Houston, TX"

if (data.isCrisis) {
  // Show crisis resources immediately
  console.log('Crisis detected:', data.crisisLines);
} else {
  // Show classified categories with resources
  data.categories.forEach(cat => {
    console.log(\`\${cat.label} (\${cat.confidence}%)\`);
    cat.resources.forEach(r => console.log(\`  - \${r.name}\${r.isNational ? ' (National)' : ''}\`));
  });
}`}
                    />
                  </div>

                  {/* Step 3 */}
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-6 h-6 rounded-full bg-gray-900 text-white text-xs font-bold flex items-center justify-center">3</div>
                      <h3 className="font-semibold text-gray-900">Browse community resources</h3>
                    </div>
                    <CodeBlock
                      language="javascript"
                      code={`// Get all resources
const res = await fetch('/api/community-resources');
const { resources, categories } = await res.json();

// Filter by category
const foodRes = await fetch('/api/community-resources?category=Food%20Assistance');
const { resources: foodResources } = await foodRes.json();

// Filter by city
const nyRes = await fetch('/api/community-resources?cityId=newyork');
const { resources: nyResources } = await nyRes.json();

// Search by keyword
const searchRes = await fetch('/api/community-resources?search=veteran');
const { resources: veteranResources } = await searchRes.json();`}
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </Section>

        {/* ─── FAQ ─── */}
        <Section className="pb-16 px-4 sm:px-6">
          <div className="max-w-4xl mx-auto">
            <motion.div variants={staggerItem} className="text-center mb-8">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Frequently Asked Questions</h2>
            </motion.div>

            <motion.div variants={staggerItem} className="space-y-3">
              <Collapsible title="Do I need an API key?" icon={<BookOpen className="w-5 h-5 text-gray-400" />}>
                <p className="text-sm text-gray-600">
                  No. All endpoints are publicly accessible without authentication. However, for AI-powered classification via BART-large-MNLI, the server must have a <code className="font-mono text-xs text-violet-600">HUGGINGFACE_API_KEY</code> environment variable configured. If it&apos;s not set, the API falls back to keyword matching — and tells you honestly in the response.
                </p>
              </Collapsible>

              <Collapsible title="How accurate is the classification?" icon={<BookOpen className="w-5 h-5 text-gray-400" />}>
                <p className="text-sm text-gray-600">
                  With BART-large-MNLI, classification typically achieves 70–95% confidence for clear descriptions. The API is transparent about confidence levels — if confidence is below 70%, it returns clarification questions instead of guessing. When BART is unavailable, keyword matching provides reasonable but less nuanced results, and every response is labeled with its source.
                </p>
              </Collapsible>

              <Collapsible title="What happens when crisis language is detected?" icon={<BookOpen className="w-5 h-5 text-gray-400" />}>
                <p className="text-sm text-gray-600">
                  Crisis detection short-circuits the entire classification pipeline. The API immediately returns crisis hotlines (988, Crisis Text Line, 911) and local crisis resources. The type of crisis (self-harm, domestic violence, medical emergency, violence toward others, or general) determines which hotlines are prioritized. Crisis detection uses deterministic regex patterns — the AI model is never trusted for this critical function.
                </p>
              </Collapsible>

              <Collapsible title="Which cities are supported?" icon={<BookOpen className="w-5 h-5 text-gray-400" />}>
                <p className="text-sm text-gray-600">
                  ClearPath AI currently supports <strong>6 cities</strong>: Houston, TX; New York, NY; Los Angeles, CA; Chicago, IL; Dallas, TX; and Miami, FL. You can specify a city using the <code className="font-mono text-xs text-violet-600">cityId</code> parameter (e.g., <code className="font-mono text-xs">"houston"</code>, <code className="font-mono text-xs">"newyork"</code>), or the API will auto-detect the nearest city from your lat/lng coordinates. Users outside all service areas still receive national resources and resources from the nearest city. National resources are tagged with <code className="font-mono text-xs">(National)</code> in their name.
                </p>
              </Collapsible>

              <Collapsible title="Where does the resource data come from?" icon={<BookOpen className="w-5 h-5 text-gray-400" />}>
                <p className="text-sm text-gray-600">
                  Community resources are stored in a SQLite database managed via Prisma ORM. Resources include city-specific organizations with name, description, services, contact information, hours, and eligibility requirements. Each resource has a <code className="font-mono text-xs text-violet-600">cityId</code> and <code className="font-mono text-xs text-violet-600">isNational</code> flag. National resources (tagged with &quot;(National)&quot; in the name) are available across all cities. The <code className="font-mono text-xs text-violet-600">/api/community-resources</code> endpoint reads directly from this database and supports filtering by city.
                </p>
              </Collapsible>

              <Collapsible title="Is the contact endpoint production-ready?" icon={<BookOpen className="w-5 h-5 text-gray-400" />}>
                <p className="text-sm text-gray-600">
                  Not yet. The <code className="font-mono text-xs text-violet-600">POST /api/contact</code> endpoint currently logs messages to the server console. Email notification via SendGrid or Resend, and database persistence, are planned for a future release. The endpoint is functional for testing but should not be relied upon for critical communications yet.
                </p>
              </Collapsible>
            </motion.div>
          </div>
        </Section>

        {/* ─── CTA ─── */}
        <Section className="pb-20 px-4 sm:px-6">
          <div className="max-w-4xl mx-auto">
            <motion.div variants={staggerItem} className="text-center">
              <div className="rounded-2xl bg-gradient-to-br from-gray-900 to-gray-800 p-8 sm:p-12 text-white">
                <h2 className="text-2xl sm:text-3xl font-bold mb-3">Ready to integrate?</h2>
                <p className="text-gray-300 mb-6 max-w-xl mx-auto">
                  Start classifying user needs and connecting people to community resources in minutes. No API key required.
                </p>
                <div className="flex flex-wrap justify-center gap-3">
                  <Link
                    href="/"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white text-gray-900 font-semibold hover:bg-gray-100 transition-colors"
                  >
                    Try ClearPath AI
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                  <Link
                    href="/how-it-works"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white/10 text-white font-semibold hover:bg-white/20 transition-colors border border-white/20"
                  >
                    <BookOpen className="w-4 h-4" />
                    How It Works
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        </Section>
      </main>

      <Footer />
    </div>
  )
}
