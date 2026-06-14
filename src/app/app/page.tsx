'use client'

import { useState, useRef, useEffect, useCallback, ReactNode } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Layers,
  Shield,
  HelpCircle,
  Heart,
  Star,
  Check,
  Phone,
  ChevronDown,
  MapPin,
  AlertTriangle,
  ShieldCheck,
  ArrowRight,
  Send,
  RotateCcw,
  User,
  Clock,
} from 'lucide-react'

// ─── TYPES ───────────────────────────────────────────────
interface Resource {
  name: string
  detail: string
  verified?: string
  distance?: string
  phone?: string
  address?: string
  hours?: string
}

interface Category {
  label: string
  confidence: number
  resources: Resource[]
  why: string
  also?: string
  warning?: string
}

interface CrisisLine {
  name: string
  action: string
  call?: string
}

interface DebugInfo {
  keyPresent: boolean
  keyPrefix: string
  keyLength: number
  fetchAttempted: boolean
  fetchUrl: string
  fetchStatus: number | null
  fetchElapsedMs: number | null
  fetchError: string | null
  hfResponseBody: string | null
  fallbackUsed: boolean
  fallbackReason: string | null
}

interface ClassifyResponse {
  isCrisis: boolean
  crisisType?: 'self-harm' | 'violence-others' | 'domestic' | 'medical' | 'general'
  categories: Category[]
  needsClarification: boolean
  clarificationMessage: string | null
  crisisLines?: CrisisLine[]
  model: string
  classificationSource?: 'bart' | 'keyword'
  hasLocation?: boolean
  outsideServiceArea?: boolean
  serviceArea?: string
  cityId?: string
  cityLabel?: string
  debug?: DebugInfo
}

// ─── QUERY HISTORY ENTRY ────────────────────────────────
interface QueryEntry {
  id: number
  query: string
  result: ClassifyResponse
  timestamp: Date
}

// ─── STARTERS ────────────────────────────────────────────
const starters = [
  { id: 'multi', label: 'Multi-Need', description: "I lost my job and can't pay rent. My kids need food.", icon: 'layers' },
  { id: 'crisis', label: 'Crisis', description: "I can't take this anymore. I want it all to end.", icon: 'shield' },
  { id: 'vague', label: 'Unclear Need', description: 'I need help with my situation', icon: 'help' },
  { id: 'senior', label: 'Senior', description: "I'm 78 and need help getting groceries delivered", icon: 'heart' },
  { id: 'veteran', label: 'Complex', description: "I'm a veteran dealing with PTSD and housing issues", icon: 'star' },
]

// ─── UTILITIES ───────────────────────────────────────────
function getConfidenceColor(v: number): string {
  if (v > 70) return '#10b981'
  if (v >= 40) return '#f59e0b'
  return '#ef4444'
}
function getConfidenceBg(v: number): string {
  if (v > 70) return 'rgba(16,185,129,0.06)'
  if (v >= 40) return 'rgba(245,158,11,0.06)'
  return 'rgba(239,68,68,0.06)'
}
function getConfidenceGlow(v: number): string {
  if (v > 70) return '0 0 16px rgba(16,185,129,0.25)'
  if (v >= 40) return '0 0 16px rgba(245,158,11,0.25)'
  return '0 0 16px rgba(239,68,68,0.25)'
}
function getConfidenceLabel(v: number): string {
  if (v > 70) return 'High'
  if (v >= 40) return 'Moderate'
  return 'Low'
}

function formatTime(d: Date): string {
  return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
}

// ─── CONFIDENCE RING ─────────────────────────────────────
function ConfidenceRing({ value, size = 56, strokeWidth = 3.5, delay = 0 }: {
  value: number; size?: number; strokeWidth?: number; delay?: number
}) {
  const r = (size - strokeWidth * 2) / 2
  const circ = 2 * Math.PI * r
  const offset = circ * (1 - value / 100)
  const color = getConfidenceColor(value)
  const [mounted, setMounted] = useState(false)
  const label = getConfidenceLabel(value)

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 100 + delay)
    return () => clearTimeout(t)
  }, [delay])

  return (
    <div className="relative shrink-0" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90 relative">
        <defs>
          <linearGradient id={`ring-${value}-${delay}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={color} />
            <stop offset="100%" stopColor={color} stopOpacity="0.6" />
          </linearGradient>
        </defs>
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="rgba(0,0,0,0.04)" strokeWidth={strokeWidth} />
        <circle
          cx={size / 2} cy={size / 2} r={r} fill="none"
          stroke={`url(#ring-${value}-${delay})`} strokeWidth={strokeWidth} strokeLinecap="round"
          strokeDasharray={circ}
          strokeDashoffset={mounted ? offset : circ}
          style={{ transition: 'stroke-dashoffset 1.4s cubic-bezier(0.4, 0, 0.2, 1)', filter: mounted ? `drop-shadow(${getConfidenceGlow(value)})` : 'none' }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-[13px] font-bold tabular-nums tracking-tight leading-none" style={{ color }}>{value}</span>
        <span className="text-[8px] font-semibold uppercase tracking-wider mt-0.5" style={{ color, opacity: 0.6 }}>{label}</span>
      </div>
    </div>
  )
}

// ─── CATEGORY CARD ───────────────────────────────────────
function CategoryCard({ cat, index }: { cat: Category; index: number }) {
  const [open, setOpen] = useState(false)
  const color = getConfidenceColor(cat.confidence)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: 'spring', stiffness: 350, damping: 25, delay: index * 0.1 }}
      className="rounded-2xl bg-white/60 backdrop-blur-md transition-all duration-300 group relative overflow-hidden"
      style={{
        border: `1px solid rgba(0,0,0,0.04)`,
        boxShadow: '0 2px 8px rgba(0,0,0,0.02), 0 8px 32px rgba(0,0,0,0.03)',
      }}
    >
      <div className="p-6">
        {/* Header row */}
        <div className="flex items-start justify-between gap-4 mb-4">
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2.5 mb-1.5">
              <div className="w-1.5 h-5 rounded-full" style={{ backgroundColor: color }} />
              <h4 className="text-[15px] font-semibold text-gray-900 leading-tight tracking-tight">{cat.label}</h4>
            </div>
            <p className="text-[12px] text-gray-400 leading-relaxed pl-4">{cat.why}</p>
          </div>
          <ConfidenceRing value={cat.confidence} size={56} strokeWidth={3.5} delay={index * 120} />
        </div>

        {/* Warning */}
        {cat.warning && (
          <div className="flex items-start gap-2 text-[12px] text-amber-700 mb-4 leading-relaxed bg-amber-50/50 rounded-xl px-3.5 py-2.5 border border-amber-100/40">
            <AlertTriangle className="w-3.5 h-3.5 shrink-0 mt-0.5 text-amber-500" />
            {cat.warning}
          </div>
        )}

        {/* Resources */}
        {cat.resources.length > 0 && (
          <div className="space-y-3">
            {cat.resources.map((r, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 + index * 0.08 + i * 0.06 }}
                className="flex items-start gap-3"
              >
                <div
                  className="w-6 h-6 rounded-lg flex items-center justify-center shrink-0 mt-0.5"
                  style={{ backgroundColor: getConfidenceBg(cat.confidence), borderLeft: `2px solid ${color}` }}
                >
                  <Check className="w-3 h-3" style={{ color }} strokeWidth={3} />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-[13px] font-medium text-gray-800 leading-tight">{r.name}</p>
                  <p className="text-[12px] text-gray-500 mt-1 leading-relaxed">{r.detail}</p>
                  {r.phone && (
                    <p className="text-[12px] text-blue-600 mt-1">
                      <Phone className="w-3 h-3 inline mr-1" />{r.phone}
                    </p>
                  )}
                  {r.address && (
                    <p className="text-[11px] text-gray-400 mt-0.5">{r.address}</p>
                  )}
                  <div className="flex flex-wrap gap-2 mt-2">
                    {r.verified && r.verified !== 'N/A' && (
                      <span className="inline-flex items-center gap-1 text-[10px] text-emerald-600 font-semibold bg-emerald-50/60 px-2 py-0.5 rounded-md border border-emerald-100/40">
                        <ShieldCheck className="w-2.5 h-2.5" />
                        Verified {r.verified}
                      </span>
                    )}
                    {r.distance && (
                      <span className="inline-flex items-center gap-1 text-[10px] text-blue-600 font-semibold bg-blue-50/60 px-2 py-0.5 rounded-md border border-blue-100/40">
                        <MapPin className="w-2.5 h-2.5" />
                        {r.distance}
                      </span>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Expandable: Also considered */}
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden"
            >
              <div className="mt-4 pt-4 border-t border-gray-100/60">
                {cat.also && (
                  <p className="text-[12px] text-gray-400 leading-relaxed">
                    <span className="text-gray-500 font-semibold">Also considered: </span>{cat.also}
                  </p>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {cat.also && !open && (
          <button onClick={() => setOpen(true)} className="mt-3 flex items-center gap-1 text-[11px] text-gray-300 hover:text-gray-400 transition-colors">
            <ChevronDown className="w-3 h-3" />
            <span>More details</span>
          </button>
        )}
      </div>
    </motion.div>
  )
}

// ─── CRISIS BLOCK ────────────────────────────────────────
function CrisisBlock({ lines, crisisType }: { lines: CrisisLine[]; crisisType?: string }) {
  // Title + subtitle tailored to crisis type
  const crisisHeader = (() => {
    switch (crisisType) {
      case 'violence-others':
        return {
          title: 'Support is available.',
          subtitle: 'If you\'re having thoughts of harming others, help is available right now',
        }
      case 'domestic':
        return {
          title: 'Your safety matters.',
          subtitle: 'Confidential help is available right now — you don\'t have to face this alone',
        }
      case 'medical':
        return {
          title: 'Get help now.',
          subtitle: 'This sounds like a medical emergency — please call for help immediately',
        }
      case 'self-harm':
      default:
        return {
          title: 'You are not alone.',
          subtitle: 'Help is available right now — you don\'t have to face this alone',
        }
    }
  })()

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.97 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: 'spring', stiffness: 350, damping: 25 }}
      className="rounded-2xl border border-red-200/40 bg-white overflow-hidden relative"
      style={{ boxShadow: '0 8px 48px -12px rgba(239,68,68,0.18), 0 0 0 1px rgba(239,68,68,0.06)' }}
    >
      {/* Red header */}
      <div className="relative bg-gradient-to-r from-red-600 via-red-500 to-rose-500 px-6 py-6 overflow-hidden">
        <div className="relative flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-white/15 backdrop-blur-sm flex items-center justify-center">
            <Shield className="w-6 h-6 text-white" />
          </div>
          <div>
            <p className="text-[20px] font-bold text-white tracking-tight leading-tight">{crisisHeader.title}</p>
            <p className="text-[12px] text-red-100/80 mt-1 font-medium">{crisisHeader.subtitle}</p>
          </div>
        </div>
      </div>

      {/* Crisis lines */}
      <div className="p-5 space-y-3">
        {lines.map((l, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.15 + i * 0.1 }}
            className="flex items-center gap-4 bg-red-50/30 rounded-xl p-4 border border-red-100/30"
          >
            <div className="w-12 h-12 rounded-2xl bg-red-100/60 flex items-center justify-center shrink-0">
              <Phone className="w-5 h-5 text-red-600" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[14px] font-semibold text-gray-900 leading-tight">{l.name}</p>
              <p className="text-[12px] text-gray-500 mt-0.5">{l.action}</p>
            </div>
            {l.call && (
              <a href={l.call === '911' || l.call.startsWith('1-800') || l.call === '988' ? `tel:${l.call}` : '#'}
                className="bg-gradient-to-b from-red-500 to-red-600 text-white text-[13px] font-bold px-6 py-3 rounded-xl shrink-0 hover:from-red-600 hover:to-red-700 transition-all shadow-md shadow-red-500/25 active:scale-95"
              >
                {l.call}
              </a>
            )}
          </motion.div>
        ))}
        <div className="flex items-center justify-center gap-2 pt-3 pb-1">
          <p className="text-[11px] text-gray-400 font-medium">Nothing was stored or logged</p>
        </div>
      </div>
    </motion.div>
  )
}

// ─── CLARIFY PANEL ───────────────────────────────────────
function ClarifyPanel({ confidence, clarificationMessage, onClarify }: {
  confidence: number; clarificationMessage: string | null; onClarify: (text: string) => void
}) {
  const clarifyOptions = [
    'Housing or shelter',
    'Food or basic necessities',
    'Health or mental health support',
    'Legal assistance or immigration',
    'Employment or job training',
    'Senior services or elderly care',
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-2xl p-6 border border-amber-100/30 bg-white/60 backdrop-blur-md"
      style={{ boxShadow: '0 0 40px rgba(245,158,11,0.06), 0 4px 16px rgba(0,0,0,0.04)' }}
    >
      <div className="flex items-center gap-4 mb-5">
        <ConfidenceRing value={confidence} size={56} strokeWidth={4} />
        <div>
          <p className="text-[11px] font-bold text-amber-600 uppercase tracking-wider">Confidence: {confidence}%</p>
          <p className="text-[16px] font-semibold text-gray-900 leading-snug mt-1.5">Which best describes what you need?</p>
          {clarificationMessage && (
            <p className="text-[12px] text-gray-400 mt-1">{clarificationMessage}</p>
          )}
        </div>
      </div>
      <div className="flex flex-col gap-2.5">
        {clarifyOptions.map((opt, i) => (
          <motion.button
            key={i}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 + i * 0.05 }}
            onClick={() => onClarify(opt)}
            className="w-full text-left bg-white/90 border border-gray-100 rounded-xl px-5 py-3.5 text-[14px] font-medium text-gray-700 active:scale-[0.98] transition-all duration-200 hover:bg-white flex items-center justify-between group"
          >
            <span>{opt}</span>
            <ArrowRight className="w-4 h-4 text-gray-300 group-hover:text-amber-500 transition-colors" />
          </motion.button>
        ))}
      </div>
    </motion.div>
  )
}

// ─── SUGGESTION CARD ──────────────────────────────────────
function SuggestionCard({ s, index, onSelect }: {
  s: typeof starters[0]; index: number; onSelect: (id: string, label: string) => void
}) {
  const iconMap: Record<string, { icon: ReactNode; gradient: string; color: string }> = {
    layers: { icon: <Layers className="w-5 h-5" />, gradient: 'from-blue-500/10 to-indigo-500/10', color: 'text-blue-600' },
    shield: { icon: <Shield className="w-5 h-5" />, gradient: 'from-red-500/10 to-rose-500/10', color: 'text-red-600' },
    help: { icon: <HelpCircle className="w-5 h-5" />, gradient: 'from-amber-500/10 to-orange-500/10', color: 'text-amber-600' },
    heart: { icon: <Heart className="w-5 h-5" />, gradient: 'from-pink-500/10 to-rose-500/10', color: 'text-pink-600' },
    star: { icon: <Star className="w-5 h-5" />, gradient: 'from-emerald-500/10 to-teal-500/10', color: 'text-emerald-600' },
  }
  const { icon, gradient, color } = iconMap[s.icon] || iconMap.help

  return (
    <motion.button
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: 'spring', stiffness: 350, damping: 25, delay: index * 0.08 }}
      onClick={() => onSelect(s.id, s.label)}
      whileHover={{ scale: 1.01, y: -2 }}
      whileTap={{ scale: 0.995 }}
      className="w-full text-left rounded-2xl px-5 py-5 border border-gray-100/40 bg-white/60 backdrop-blur-md"
      style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.02), 0 8px 32px rgba(0,0,0,0.04)' }}
    >
      <div className="flex items-center gap-3.5 mb-2.5">
        <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center ${color}`}>
          {icon}
        </div>
        <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">{s.label}</p>
      </div>
      <p className="text-[14px] text-gray-700 font-medium leading-relaxed pl-[52px]">&ldquo;{s.description}&rdquo;</p>
    </motion.button>
  )
}

// ─── LOADING INDICATOR ───────────────────────────────────
function LoadingIndicator() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -4 }}
      className="flex items-center gap-3 p-4"
    >
      <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center shrink-0">
        <Layers className="w-4 h-4 text-white" />
      </div>
      <div className="flex items-center gap-2">
        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
        <span className="text-[12px] text-gray-400 ml-2 font-medium">Classifying your request...</span>
      </div>
    </motion.div>
  )
}

// ─── QUERY RESULT BLOCK ──────────────────────────────────
// Renders one query + its classification result
function QueryResultBlock({ entry, onClarify }: { entry: QueryEntry; onClarify: (text: string) => void }) {
  const { query, result, timestamp } = entry

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: 'spring', stiffness: 350, damping: 25 }}
      className="space-y-4"
    >
      {/* User query bubble */}
      <div className="flex items-start gap-3">
        <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shrink-0 shadow-sm">
          <User className="w-4 h-4 text-white" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[12px] font-semibold text-gray-700">You</span>
            <span className="text-[10px] text-gray-300 flex items-center gap-1">
              <Clock className="w-2.5 h-2.5" />
              {formatTime(timestamp)}
            </span>
          </div>
          <div className="rounded-2xl rounded-tl-md bg-white border border-gray-100/60 px-4 py-3 shadow-sm">
            <p className="text-[14px] text-gray-800 font-medium leading-relaxed">{query}</p>
          </div>
        </div>
      </div>

      {/* Result */}
      <div className="ml-11 space-y-4">
        {/* Classification source badge — HONEST CONFIDENCE */}
        {!result.isCrisis && result.classificationSource && (
          <div className="space-y-2 mb-1">
            <div className="flex items-center gap-2">
              {result.classificationSource === 'bart' ? (
                <span className="inline-flex items-center gap-1.5 text-[10px] font-semibold text-emerald-600 bg-emerald-50/60 px-2.5 py-1 rounded-lg border border-emerald-100/40">
                  <Layers className="w-3 h-3" />
                  Classified by BART-large-MNLI
                </span>
              ) : (
                <span className="inline-flex items-center gap-1.5 text-[10px] font-semibold text-amber-600 bg-amber-50/60 px-2.5 py-1 rounded-lg border border-amber-100/40">
                  <HelpCircle className="w-3 h-3" />
                  Keyword match — BART AI not connected
                </span>
              )}
            </div>
            {/* Debug info — always visible for transparency */}
            {result.debug && (
              <details className="text-[10px] font-mono text-gray-400 bg-gray-50/50 border border-gray-100/40 rounded-lg px-3 py-2">
                <summary className="cursor-pointer font-sans font-semibold text-gray-400 hover:text-gray-600">
                  Classification debug info
                </summary>
                <div className="mt-2 space-y-0.5">
                  <div>Key present: <span className={result.debug.keyPresent ? 'text-emerald-500' : 'text-red-500'}>{String(result.debug.keyPresent)}</span> (prefix: {result.debug.keyPrefix}, len: {result.debug.keyLength})</div>
                  <div>Fetch attempted: <span className={result.debug.fetchAttempted ? 'text-blue-500' : 'text-gray-400'}>{String(result.debug.fetchAttempted)}</span></div>
                  {result.debug.fetchAttempted && (
                    <>
                      <div>URL: {result.debug.fetchUrl}</div>
                      <div>Status: <span className={result.debug.fetchStatus && result.debug.fetchStatus < 300 ? 'text-emerald-500' : 'text-red-500'}>{result.debug.fetchStatus ?? 'N/A'}</span></div>
                      <div>Elapsed: {result.debug.fetchElapsedMs ?? 'N/A'}ms</div>
                    </>
                  )}
                  {result.debug.fetchError && <div className="text-red-400">Error: {result.debug.fetchError}</div>}
                  {result.debug.fallbackUsed && <div className="text-amber-500">Fallback: {result.debug.fallbackReason}</div>}
                  {result.debug.hfResponseBody && (
                    <div className="mt-1 text-gray-300 break-all max-h-20 overflow-auto">
                      HF response: {result.debug.hfResponseBody}
                    </div>
                  )}
                </div>
              </details>
            )}
          </div>
        )}

        {/* Crisis */}
        {result.isCrisis && result.crisisLines && (
          <CrisisBlock lines={result.crisisLines} crisisType={result.crisisType} />
        )}

        {/* Clarification needed */}
        {!result.isCrisis && result.needsClarification && (
          <ClarifyPanel
            confidence={result.categories[0]?.confidence || 0}
            clarificationMessage={result.clarificationMessage}
            onClarify={onClarify}
          />
        )}

        {/* Categories */}
        {!result.isCrisis && result.categories.length > 0 && !result.needsClarification && (
          <div className="space-y-3">
            {result.categories.map((cat, i) => (
              <CategoryCard key={i} cat={cat} index={i} />
            ))}
          </div>
        )}

        {/* Low confidence categories still shown */}
        {!result.isCrisis && result.categories.length > 0 && result.needsClarification && (
          <div className="space-y-3">
            <p className="text-[12px] text-gray-400 font-medium">Preliminary matches:</p>
            {result.categories.map((cat, i) => (
              <CategoryCard key={i} cat={cat} index={i} />
            ))}
          </div>
        )}

        {/* Outside service area warning */}
        {result.outsideServiceArea && !result.isCrisis && (
          <div className="flex items-start gap-2.5 px-4 py-3 rounded-xl bg-amber-50/60 border border-amber-100/40">
            <MapPin className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
            <div>
              <p className="text-[12px] text-amber-800 font-semibold leading-snug">You appear to be outside our service area ({result.cityLabel || result.serviceArea || 'supported cities'}).</p>
              <p className="text-[11px] text-amber-600 mt-1 leading-relaxed">Showing national resources and resources from the nearest supported city. For local help, dial 211.</p>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  )
}

// ─── MAIN ─────────────────────────────────────────────────
export default function Home() {
  // History of queries + results
  const [queries, setQueries] = useState<QueryEntry[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [inputText, setInputText] = useState('')
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const scrollRef = useRef<HTMLDivElement>(null)
  const nextId = useRef(1)

  // Geolocation
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null)
  const [locationStatus, setLocationStatus] = useState<'idle' | 'requesting' | 'granted' | 'denied'>('idle')

  // Multi-city selection
  const [selectedCityId, setSelectedCityId] = useState<string | null>(null)
  const [detectedCityLabel, setDetectedCityLabel] = useState<string>('Houston, TX')
  const [cityDropdownOpen, setCityDropdownOpen] = useState(false)

  const SUPPORTED_CITIES = [
    { id: 'houston', label: 'Houston, TX' },
    { id: 'newyork', label: 'New York, NY' },
    { id: 'losangeles', label: 'Los Angeles, CA' },
    { id: 'chicago', label: 'Chicago, IL' },
    { id: 'dallas', label: 'Dallas, TX' },
    { id: 'miami', label: 'Miami, FL' },
  ]

  const currentCityLabel = selectedCityId
    ? SUPPORTED_CITIES.find(c => c.id === selectedCityId)?.label || detectedCityLabel
    : detectedCityLabel

  const requestLocation = useCallback(() => {
    if (!navigator.geolocation) {
      setLocationStatus('denied')
      return
    }
    setLocationStatus('requesting')
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setUserLocation({ lat: position.coords.latitude, lng: position.coords.longitude })
        setLocationStatus('granted')
        // Auto-detect city from coordinates (simple bounding — server does the real work)
        const lat = position.coords.latitude
        const lng = position.coords.longitude
        // Rough city detection for display; server uses findNearestCity() for accuracy
        if (lat > 40 && lat < 41 && lng > -75 && lng < -73) setDetectedCityLabel('New York, NY')
        else if (lat > 33 && lat < 35 && lng > -119 && lng < -117) setDetectedCityLabel('Los Angeles, CA')
        else if (lat > 41 && lat < 42.5 && lng > -88 && lng < -87) setDetectedCityLabel('Chicago, IL')
        else if (lat > 32 && lat < 33.5 && lng > -97.5 && lng < -96) setDetectedCityLabel('Dallas, TX')
        else if (lat > 25 && lat < 26.5 && lng > -81 && lng < -79.5) setDetectedCityLabel('Miami, FL')
        else if (lat > 29 && lat < 30.5 && lng > -96 && lng < -94.5) setDetectedCityLabel('Houston, TX')
        else setDetectedCityLabel('Nearest supported city')
      },
      () => setLocationStatus('denied'),
      { enableHighAccuracy: false, timeout: 10000, maximumAge: 300000 }
    )
  }, [])

  // Auto-scroll to bottom when new results arrive
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [queries, isLoading])

  // Close city dropdown on outside click
  useEffect(() => {
    if (!cityDropdownOpen) return
    const handleClick = () => setCityDropdownOpen(false)
    document.addEventListener('click', handleClick)
    return () => document.removeEventListener('click', handleClick)
  }, [cityDropdownOpen])

  // Main handler: send text to /api/classify
  const handleSend = useCallback(async (text: string) => {
    if (!text.trim() || isLoading) return

    const userText = text.trim()
    setInputText('')
    setIsLoading(true)

    try {
      const requestBody: Record<string, string | number> = { text: userText }
      if (userLocation) {
        requestBody.lat = userLocation.lat
        requestBody.lng = userLocation.lng
      }
      if (selectedCityId) {
        requestBody.cityId = selectedCityId
      }

      const res = await fetch('/api/classify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestBody),
      })

      if (!res.ok) {
        setIsLoading(false)
        setQueries(prev => [...prev, {
          id: nextId.current++,
          query: userText,
          result: {
            isCrisis: false,
            categories: [],
            needsClarification: true,
            clarificationMessage: 'Something went wrong. Please try again.',
            model: 'error',
          },
          timestamp: new Date(),
        }])
        return
      }

      const data: ClassifyResponse = await res.json()
      setIsLoading(false)
      // Update city info from server response (auto-detected via geolocation)
      if (data.cityId && !selectedCityId) {
        setSelectedCityId(data.cityId)
      }
      if (data.cityLabel && !selectedCityId) {
        setDetectedCityLabel(data.cityLabel)
      }
      setQueries(prev => [...prev, {
        id: nextId.current++,
        query: userText,
        result: data,
        timestamp: new Date(),
      }])
    } catch {
      setIsLoading(false)
      setQueries(prev => [...prev, {
        id: nextId.current++,
        query: userText,
        result: {
          isCrisis: false,
          categories: [],
          needsClarification: true,
          clarificationMessage: 'A network error occurred. Please try again.',
          model: 'error',
        },
        timestamp: new Date(),
      }])
    }
  }, [isLoading, userLocation])

  const handleSubmit = useCallback(() => {
    if (inputText.trim()) handleSend(inputText)
  }, [inputText, handleSend])

  const handleSelectStarter = useCallback((id: string, _label: string) => {
    const starter = starters.find(s => s.id === id)
    if (starter) handleSend(starter.description)
  }, [handleSend])

  const handleClarifySelect = useCallback((optionText: string) => {
    handleSend(optionText)
  }, [handleSend])

  const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSubmit()
    }
  }, [handleSubmit])

  const handleTextareaInput = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputText(e.target.value)
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'
      textareaRef.current.style.height = Math.min(textareaRef.current.scrollHeight, 120) + 'px'
    }
  }, [])

  const clearHistory = () => {
    setQueries([])
    setInputText('')
  }

  const hasQueries = queries.length > 0

  return (
    <div className="min-h-screen flex flex-col bg-gray-50/50">
      {/* ─── HEADER ─── */}
      <header className="shrink-0 border-b border-gray-200/40 bg-white/80 backdrop-blur-md z-10">
        <div className="max-w-[720px] mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center shadow-sm">
              <Layers className="w-3.5 h-3.5 text-white" />
            </div>
            <span className="text-[15px] font-bold text-gray-900 tracking-tight">ClearPath AI</span>
            <span className="text-[10px] font-semibold text-amber-600 bg-amber-50/80 px-2 py-0.5 rounded-md border border-amber-200/40">LIVE</span>
          </div>
          {hasQueries && (
            <button
              onClick={clearHistory}
              className="flex items-center gap-1.5 text-[12px] font-medium text-gray-400 hover:text-gray-600 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Clear
            </button>
          )}
        </div>
      </header>

      {/* ─── SERVICE AREA BANNER WITH CITY SELECTOR ─── */}
      <div className="shrink-0">
        <div className="max-w-[720px] mx-auto px-4 sm:px-6 pt-3">
          <div className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-blue-50/60 border border-blue-100/40 flex-wrap">
            <MapPin className="w-3.5 h-3.5 text-blue-500 shrink-0" />
            <span className="text-[12px] text-blue-700 font-medium">Serving the <span className="font-bold">{currentCityLabel}</span> metro area</span>
            
            {/* City selector dropdown */}
            <div className="relative ml-1">
              <button 
                onClick={(e) => { e.stopPropagation(); setCityDropdownOpen(!cityDropdownOpen) }}
                className="inline-flex items-center gap-1 px-2.5 py-1 text-[10px] font-bold text-blue-600 bg-blue-100/60 rounded-md hover:bg-blue-100 transition-colors"
              >
                Change city
                <ChevronDown className="w-3 h-3" />
              </button>
              {cityDropdownOpen && (
                <div className="absolute top-full left-0 mt-1 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-50 py-1">
                  {SUPPORTED_CITIES.map(city => (
                    <button
                      key={city.id}
                      onClick={() => {
                        setSelectedCityId(city.id)
                        setDetectedCityLabel(city.label)
                        setCityDropdownOpen(false)
                      }}
                      className={`w-full text-left px-3 py-2 text-[12px] hover:bg-blue-50 transition-colors ${
                        (selectedCityId === city.id || (!selectedCityId && city.id === 'houston')) ? 'text-blue-700 font-semibold bg-blue-50/50' : 'text-gray-700'
                      }`}
                    >
                      {city.label}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {locationStatus === 'idle' && !userLocation && (
              <button onClick={requestLocation} className="ml-1 inline-flex items-center gap-1 px-2.5 py-1 text-[10px] font-bold text-blue-600 bg-blue-100/60 rounded-md hover:bg-blue-100 transition-colors">
                Use my location
              </button>
            )}
            {locationStatus === 'granted' && (
              <span className="ml-1 text-[10px] text-emerald-500 font-semibold">Location detected</span>
            )}
            {locationStatus === 'requesting' && (
              <span className="ml-1 text-[10px] text-blue-500 font-semibold animate-pulse">Detecting...</span>
            )}
          </div>
        </div>
      </div>

      {/* ─── SCROLLABLE CONTENT AREA ─── */}
      <main ref={scrollRef} className="flex-1 overflow-y-auto max-w-[720px] w-full mx-auto px-4 sm:px-6 py-6">

        {/* Empty state: show starters */}
        {!hasQueries && !isLoading && (
          <div className="space-y-3">
            <div className="text-center mb-6">
              <h1 className="text-[24px] font-bold text-gray-900 tracking-tight">What do you need help with?</h1>
              <p className="text-[14px] text-gray-400 mt-2">Describe your situation and we&apos;ll match you with verified community resources in {currentCityLabel}.</p>
            </div>
            {starters.map((s, i) => (
              <SuggestionCard key={s.id} s={s} index={i} onSelect={handleSelectStarter} />
            ))}
          </div>
        )}

        {/* Query history */}
        {hasQueries && (
          <div className="space-y-8">
            {queries.map((entry) => (
              <QueryResultBlock key={entry.id} entry={entry} onClarify={handleClarifySelect} />
            ))}
          </div>
        )}

        {/* Loading indicator at the bottom */}
        <AnimatePresence>
          {isLoading && <div className="mt-6"><LoadingIndicator /></div>}
        </AnimatePresence>
      </main>

      {/* ─── INPUT BAR (sticky bottom) ─── */}
      <div className="shrink-0 border-t border-gray-200/40 bg-white/80 backdrop-blur-md">
        <div className="max-w-[720px] mx-auto px-4 sm:px-6 py-3">
          <div className="rounded-2xl border border-gray-200/60 focus-within:border-gray-300/80 bg-white transition-all duration-300 overflow-hidden">
            <div className="flex items-end gap-2 px-4 pt-3 pb-2">
              <textarea
                ref={textareaRef}
                value={inputText}
                onChange={handleTextareaInput}
                onKeyDown={handleKeyDown}
                placeholder="Describe what you need help with..."
                className="flex-1 bg-transparent text-[14px] outline-none text-gray-900 placeholder:text-gray-300 font-medium resize-none min-h-[24px] max-h-[120px] leading-relaxed"
                rows={1}
              />
              <button
                onClick={handleSubmit}
                disabled={!inputText.trim() || isLoading}
                className="w-8 h-8 rounded-xl bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center shrink-0 shadow-sm cursor-pointer hover:shadow-md transition-shadow mb-0.5 disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <Send className="w-3.5 h-3.5 text-white" />
              </button>
            </div>
            <div className="flex items-center justify-between px-4 pb-2.5">
              <p className="text-[10px] text-gray-300 font-medium">
                <kbd className="px-1 py-0.5 rounded bg-gray-100/60 text-gray-400 text-[9px] font-semibold">Shift</kbd>
                {' + '}
                <kbd className="px-1 py-0.5 rounded bg-gray-100/60 text-gray-400 text-[9px] font-semibold">Enter</kbd>
                {' for new line'}
              </p>
            </div>
          </div>

          {/* Quick chips */}
          <div className="flex flex-wrap gap-2 mt-3 justify-center">
            {['I need housing help', 'Mental health support', 'Food assistance', 'Legal aid', 'Senior services'].map((chip, i) => (
              <button
                key={i}
                onClick={() => handleSend(chip)}
                disabled={isLoading}
                className="px-3.5 py-1.5 rounded-full text-[12px] font-medium text-gray-500 bg-white/60 border border-gray-100/40 hover:text-gray-700 hover:bg-white/80 transition-all duration-200 disabled:opacity-40"
              >
                {chip}
              </button>
            ))}
          </div>

          <p className="text-[10px] text-gray-300 text-center mt-2 font-medium">
            ClearPath AI · Verified Houston resources · Honest confidence
          </p>
        </div>
      </div>
    </div>
  )
}
