import { NextRequest, NextResponse } from "next/server";
import { HOUSTON_RESOURCES, RESOURCES_BY_CATEGORY, findNearestCity, getResourcesByCategoryForCity, SUPPORTED_CITIES, NATIONAL_RESOURCES, type CityMatch, type SupportedCity } from "@/data/resources";
import { FRENCH_CRISIS_PATTERNS, COUNTRY_HOTLINES } from "@/data/frenchCrisisResources";
import { FRENCH_BART_LABELS, COUNTRY_RESOURCES, SUPPORTED_COUNTRIES, getCountryFromIsoCode, type CountryResource } from "@/data/frenchResources";
import { FRENCH_CITIES, FRENCH_CITY_RESOURCES, findNearestFrenchCity, getResourcesForCityByAnyCategory, getCitiesForCountry, type FrenchCity, type FrenchCityResource } from "@/data/frenchCityResources";

// ─── Configuration ─────────────────────────────────────────
const HF_API_KEY = process.env.HUGGINGFACE_API_KEY;
const HF_MODEL = "facebook/bart-large-mnli";                       // English (existing)
const HF_MODEL_MULTILINGUAL = "facebook/xlm-roberta-large-xnli";   // Multilingual (French support)
const HF_API_URL = `https://api-inference.huggingface.co/models/${HF_MODEL}`;
const HF_API_URL_MULTILINGUAL = `https://api-inference.huggingface.co/models/${HF_MODEL_MULTILINGUAL}`;

// ─── French language helpers ──────────────────────────────
function normalizeFrench(s: string): string {
  return s.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
}

function escapeRegex(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

const FRENCH_CRISIS_REGEX_PATTERNS: Record<string, RegExp[]> = Object.fromEntries(
  Object.entries(FRENCH_CRISIS_PATTERNS).map(([cat, phrases]) => [
    cat,
    phrases.map((p) => new RegExp(escapeRegex(normalizeFrench(p)), "i")),
  ])
);

const FRENCH_CANDIDATE_LABELS = FRENCH_BART_LABELS.map((l) => l.label);
const FRENCH_LABEL_TO_CATEGORY: Record<string, string> = Object.fromEntries(
  FRENCH_BART_LABELS.map((l) => [l.label, l.displayKey])
);

function isFrenchInput(text: string): boolean {
  const hasAccents = /[éèêëàâçùûüôîïœæ]/i.test(text);
  if (hasAccents) return true;

  const normalized = normalizeFrench(text);
  const frenchWords = /\b(je|tu|il|elle|nous|vous|ils|elles|mon|ma|mes|notre|votre|leur|le|la|les|une?|des?|du|avec|sans|pour|dans|sur|chez|que|qui|ne|pas|besoin|aide|emploi|logement|nourriture|sante|argent|famille|enfant|merci|bonjour)\b/i.test(normalized);
  const frenchBigrams = /\b(je |j'|qu'|c'|n'|l'|d'|m'|t'|s'|mon |ma |mes |vous |nous |il |elle |est |sont |avec |pour |dans |sur |une |un |le |la |les )/i.test(text);

  return frenchWords && frenchBigrams;
}

// Haversine distance in km (for coordinate-based country detection)
function haversineKmLocal(lat1: number, lng1: number, lat2: number, lng2: number): number {
  const toRad = (deg: number) => deg * (Math.PI / 180);
  const dLat = toRad(lat2 - lat1);
  const dLng = toRad(lng2 - lng1);
  const a = Math.sin(dLat / 2) ** 2 + Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLng / 2) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return 6371 * c;
}

// ─── Boot-time diagnostic (runs once when serverless function cold-starts) ───
console.log(`[classify:boot] HF_API_KEY present: ${!!HF_API_KEY}`);

// ─── Abuse protection ─────────────────────────────────────
// In-memory rate limiter (per Vercel serverless instance — not perfect, but
// raises the bar for bots spamming the public endpoint). For a real production
// app we would use Upstash Redis, but for a hackathon this is enough.
const RATE_LIMIT_WINDOW_MS = 60_000; // 1 minute
const RATE_LIMIT_MAX_REQUESTS = 15;  // 15 requests per minute per IP
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();

// Block obvious bot User-Agents. Real browsers send a UA with "Mozilla" and
// usually "Gecko" or "AppleWebKit" or "Chrome" or "Safari". curl, python-requests,
// scrapy, axios, got, node-fetch — these are bots.
const BLOCKED_UA_PATTERNS = [
  /^curl\//i,
  /^python-requests\//i,
  /^python-httpx\//i,
  /^scrapy\//i,
  /^axios\//i,
  /^got\//i,
  /^node-fetch\//i,
  /^Go-http-client\//i,
  /^Java\//i,
  /^Apache-HttpClient\//i,
  /^okhttp\//i,
  /^PostmanRuntime\//i,
  /^insomnia\//i,
  /^HTTPie\//i,
  /^Wget\//i,
  /^bot\//i,
  /^crawler\//i,
  /^spider\//i,
  /^headless/i,
];

function getClientIp(request: NextRequest): string {
  // Vercel sets these headers — x-forwarded-for is the standard
  const xff = request.headers.get('x-forwarded-for');
  if (xff) return xff.split(',')[0].trim();
  const realIp = request.headers.get('x-real-ip');
  if (realIp) return realIp.trim();
  return 'unknown';
}

function checkRateLimit(ip: string): { allowed: boolean; remaining: number; resetAt: number } {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);
  
  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return { allowed: true, remaining: RATE_LIMIT_MAX_REQUESTS - 1, resetAt: now + RATE_LIMIT_WINDOW_MS };
  }
  
  entry.count += 1;
  if (entry.count > RATE_LIMIT_MAX_REQUESTS) {
    return { allowed: false, remaining: 0, resetAt: entry.resetAt };
  }
  
  return { allowed: true, remaining: RATE_LIMIT_MAX_REQUESTS - entry.count, resetAt: entry.resetAt };
}

// Cleanup old entries every 5 minutes to avoid memory leak in long-lived instances
let lastCleanup = Date.now();
function cleanupRateLimitMap() {
  const now = Date.now();
  if (now - lastCleanup < 5 * 60_000) return;
  lastCleanup = now;
  for (const [ip, entry] of rateLimitMap.entries()) {
    if (now > entry.resetAt) rateLimitMap.delete(ip);
  }
}

// ─── Crisis Detection (regex-based, deterministic, AI NEVER trusted for crisis) ───
const CRISIS_PATTERNS = [
  // ─── Suicidal ideation ───
  /suicid/i,
  /kill\s+myself/i,
  /end\s+it\s+all/i,
  /end\s+it\b/i,
  /end\s+my\s+life/i,
  /want\s+to\s+die/i,
  /take\s+my\s+life/i,
  /can'?t\s+take\s+(this|it)/i,
  /want\s+it\s+all\s+to\s+end/i,
  /ending\s+it/i,
  /harm\s+myself/i,
  /self[- ]?harm/i,
  /hurt\s+myself/i,
  /want\s+to\s+hurt\s+myself/i,
  /no\s+(reason|point)\s+to\s+live/i,
  /better\s+off\s+dead/i,
  /don'?t\s+want\s+to\s+live/i,
  /don'?t\s+want\s+to\s+be\s+here/i,
  /don'?t\s+want\s+to\s+be\s+alive/i,
  /overdose/i,
  /took?\s+(a\s+)?(whole\s+)?(bottle|bunch|handful)\s+of\s+pills/i,
  /take\s+pills/i,
  /take\s+all\s+my\s+(pills|medication|medicine)/i,
  /took\s+all\s+my\s+(pills|medication|medicine)/i,
  /going\s+to\s+take\s+all\s+my/i,
  /i\s+(just\s+)?took\s+(all|too\s+many|a\s+bunch\s+of)\s+(my\s+)?(pills|medication|medicine)/i,
  /took\s+(too\s+many|a\s+lot\s+of)\s+(pills|medication|medicine)/i,
  /swallow(ed)?\s+(a\s+)?(bunch|handful|whole)\s+of\s+pills/i,
  /swallow(ed)?\s+pills/i,
  /pills\s+to\s+(end|die|kill)/i,
  /medication\s+at\s+once/i,
  /all\s+my\s+(pills|medication|medicine)\s+at\s+once/i,
  /all\s+my\s+pills\s+if/i,
  /jump\s+off/i,
  /hang\s+myself/i,
  /slit\s+my\s+wrists/i,
  /cutting\s+myself/i,
  /i'?m\s+cutting/i,
  /i\s+cut\s+myself/i,
  /self[- ]?cut/i,
  /not\s+worth\s+living/i,
  /world\s+without\s+me/i,
  /give\s+up\s+on\s+life/i,
  /can'?t\s+go\s+on/i,
  /life\s+(means|has)\s+nothing/i,
  /nothing\s+(to\s+)?live\s+for/i,
  /don'?t\s+want\s+to\s+exist/i,
  /want\s+to\s+disappear/i,
  /want\s+to\s+fall\s+asleep\s+(and\s+)?never/i,
  /no\s+point\s+in\s+living/i,

  // ─── Passive suicidal ideation — phrases that don't say "die" but mean it ───
  /i\s+(just\s+)?want\s+(everything|it|this|all)\s+to\s+(stop|end)/i,
  /i\s+(just\s+)?want\s+(everything|it|this)\s+to\s+go\s+away/i,
  /i\s+can'?t\s+do\s+this\s+(anymore|any\s+longer)/i,
  /i'?m\s+tired\s+of\s+(being\s+alive|living|existing)/i,
  /i\s+don'?t\s+want\s+to\s+wake\s+up/i,
  /i\s+want\s+to\s+fall\s+asleep\s+and\s+never\s+wake/i,
  /i'?m\s+done\s+(with\s+everything|with\s+life|living)/i,
  /no\s+reason\s+to\s+keep\s+(going|trying)/i,
  /i'?ve\s+given\s+up/i,
  /everyone\s+would\s+be\s+better\s+off\s+without\s+me/i,

  // ─── Medical emergency — "I'm dying" only standalone, NOT "I'm dying for a coffee" or "I'm dying laughing" ───
  /i'?m\s+dying\b(?!\s+(for|to|of|from|laughing|laugh))/i,
  /i\s+am\s+dying\b(?!\s+(for|to|of|from|laughing|laugh))/i,
  /i'?m\s+going\s+to\s+die\b(?!\s+(from|of|for))/i,
  /i\s+am\s+going\s+to\s+die\b(?!\s+(from|of|for))/i,
  /help\s+me\s+i'?m\s+dying/i,
  /i\s+can'?t\s+breathe/i,
  /heart\s+attack/i,
  /chest\s+pain/i,
  /i'?m\s+having\s+a\s+heart/i,

  // ─── Domestic violence / abuse ───
  /domestic\s+violen/i,
  /domestic\s+abuse/i,
  /(husband|wife|partner|boyfriend|girlfriend|spouse)\s+(hits?|beats?|hurts?|chokes?|strangles?)/i,
  /being\s+beaten/i,
  /beaten\s+by/i,
  /physical\s+abuse/i,
  /emotional\s+abuse/i,
  /threaten(ing)?\s+me/i,
  /controlling\s+me/i,
  /won'?t\s+let\s+me\s+leave/i,
  /trapped\s+in\s+my\s+relationship/i,
  /afraid\s+of\s+my\s+partner/i,
  /being\s+abused/i,
  /abused\s+by\s+my\s+partner/i,
  /choking\s+me/i,
  /strangling\s+me/i,
  /stalking\s+me/i,
  /threatening\s+to\s+kill/i,

  // ─── Sexual assault / trafficking ───
  /sexual(ly)?\s+assault/i,
  /just\s+sexual(ly)?\s+assault/i,
  /\braped?\b/i,
  /traffick/i,
  /human\s+trafficking/i,
  /forced\s+to\s+work/i,
  /forced\s+into\s+(sex\s+)?work/i,
  /sex\s+work/i,
  /pimp/i,
  /held\s+against\s+(my|their)\s+will/i,
  /held\s+captive/i,
  /someone\s+is\s+traffick/i,
  /sexually\s+abuse/i,
  /touches?\s+me\s+inappropriately/i,
  /molest/i,
  /sexual\s+abuse/i,
  /\bkidnap/i,
  /being\s+exploit/i,
  /keeps?\s+my\s+(passport|documents|id)/i,
  /won'?t\s+let\s+me\s+(leave|go)/i,
  /escape\s+from/i,
  /forced\s+into\s+marriage/i,
  /child\s+abuse/i,
  /elder\s+abuse/i,
  /abuse(s|d)?\s+me/i,
  /abusive\s+relationship/i,
  /hurting\s+me/i,
  /parent\s+hurts?\s+me/i,
  /hurts?\s+me\s+when/i,
  /child.*hurts?/i,

  // ─── More self-harm methods ───
  /step\s+in\s+front\s+of/i,
  /walk\s+into\s+traffic/i,
  /drown\s+myself/i,
  /drown\s+my/i,
  /rope\s+in\s+my/i,
  /swallowed?\s+(bleach|poison|cleaning)/i,
  /burn\s+myself/i,
  /burning\s+myself/i,
  /set\s+(myself|the\s+house)\s+on\s+fire/i,
  /bridge\s+tonight/i,
  /no\s+way\s+out/i,
  /nothing\s+left\s+to\s+live/i,
  /better\s+off\+without\s+me/i,
  /everyone\s+would\s+be\s+better\s+off/i,
  /keep\s+myself\s+safe/i,
  /can'?t\s+keep\s+myself\s+safe/i,
  /intrusive\s+thoughts/i,
  /voices\s+telling\s+me/i,
  /violent\s+thoughts/i,
  /panic\s+attack/i,
  /having\s+a\s+(mental\s+)?crisis/i,
  /postpartum\s+depression/i,
  /afraid\s+i'?m\s+going\s+to\s+hurt/i,
  /going\s+to\s+hurt\s+(my\s+)?baby/i,
  /contemplating\s+suicide/i,
  /suicidal\s+thoughts/i,
  /suicidal\s+ideation/i,
  /slit\s+my/i,
  /starved?\s+(and\s+)?locked/i,
  /bullying\s+me.*want\s+to\s+die/i,
  /bullying.*suicid/i,

  // ─── Weapon threats ───
  /have\s+a\s+gun/i,
  /i\s+have\s+a\s+gun/i,
  /gun\s+and\s+(i'?ll|will)/i,
  /going\s+to\s+shoot/i,
  /i'?ll\s+shoot/i,
  /i\s+have\s+a\s+knife/i,
  /has\s+a\s+weapon/i,
  /broke\s+into\s+my/i,
  /threaten.*kill\s+(me|my\s+family)/i,
  /threatening\s+to\s+kill/i,
  /set.*on\s+fire/i,
  /strangled?\s+me/i,
  /strangling/i,
  /physically\s+attacked/i,
  /being\s+physically/i,
  /physically\s+abused/i,
  /emotionally\s+(and|&)\s+physically\s+abused/i,
  /being\s+emotionally\s+destroyed/i,
  /in\s+immediate\s+(physical\s+)?danger/i,

  // ─── Homicidal ideation / violence towards others ───
  /\b(kill|murder|hurt|harm|shoot|stab)\s+(someone|my|a|him|her|them|people|friend|family|partner|spouse|boss|child|kids?)\b/i,
  /i\s+(wanna|want\s+to|will|am\s+going\s+to)\s+(kill|murder|hurt|harm|shoot|stab)\b/i,
  /gonna\s+(kill|murder|hurt|harm|shoot|stab)\b/i,
];

// ─── Descriptive Labels for BART-large-MNLI ───
// Ultra-specific labels give BART maximum semantic signal for NLI matching.
const CANDIDATE_LABELS = [
  'rent help, emergency shelter, facing eviction, homeless, housing assistance, can\'t afford rent, mortgage help',
  'food pantry, free groceries, SNAP benefits, hunger, food bank, need food, feeding my family',
  'feeling alone, lonely, isolated, no one to talk to, depression, anxiety, PTSD, counseling, emotional support',
  'job search, career training, unemployed, need work, job placement, workforce development',
  'legal aid, immigration help, court assistance, lawyer, legal rights, asylum, citizenship',
  'medical care, health clinic, doctor visit, prescription medication, health insurance, Medicaid, dental care, vision care, prenatal care, immunizations',
  'suicide, self-harm, want to die, end my life, hurting myself, crisis intervention',
  'senior services, elderly care, aging, meals for seniors, caregiver support, adults 60+',
  'veteran services, VA benefits, military veteran, PTSD veteran, veteran housing, GI bill, veteran healthcare',
];

// Map descriptive labels back to short display names
const LABEL_TO_CATEGORY: Record<string, string> = {
  'rent help, emergency shelter, facing eviction, homeless, housing assistance, can\'t afford rent, mortgage help': 'Housing Assistance',
  'food pantry, free groceries, SNAP benefits, hunger, food bank, need food, feeding my family': 'Food Assistance',
  'feeling alone, lonely, isolated, no one to talk to, depression, anxiety, PTSD, counseling, emotional support': 'Mental Health',
  'job search, career training, unemployed, need work, job placement, workforce development': 'Employment Services',
  'legal aid, immigration help, court assistance, lawyer, legal rights, asylum, citizenship': 'Legal Aid',
  'medical care, health clinic, doctor visit, prescription medication, health insurance, Medicaid, dental care, vision care, prenatal care, immunizations': 'Healthcare',
  'suicide, self-harm, want to die, end my life, hurting myself, crisis intervention': 'Crisis Support',
  'senior services, elderly care, aging, meals for seniors, caregiver support, adults 60+': 'Senior Services',
  'veteran services, VA benefits, military veteran, PTSD veteran, veteran housing, GI bill, veteran healthcare': 'Veteran Services',
};

const LABELS = [
  'Housing Assistance',
  'Food Assistance',
  'Mental Health',
  'Employment Services',
  'Legal Aid',
  'Healthcare',
  'Crisis Support',
  'Senior Services',
  'Veteran Services',
];

// ─── Category Colors ───────────────────────────────────────
const CATEGORY_COLORS: Record<string, string> = {
  "Housing Assistance": "#f59e0b",
  "Food Assistance": "#22c55e",
  "Mental Health": "#8b5cf6",
  "Employment Services": "#3b82f6",
  "Legal Aid": "#06b6d4",
  "Healthcare": "#ef4444",
  "Senior Services": "#6366f1",
  "Veteran Services": "#15803d",
  "Crisis": "#dc2626",
  "Crisis Support": "#dc2626",
};

// ─── MULTI-CITY GEOLOCATION ───
// City selection: (1) explicit cityId param, (2) auto-detect from lat/lng, (3) default Houston
// Haversine distance calculation lives in resources.ts — reused here for display logic
const EARTH_RADIUS_MI = 3958.8;

function haversineMi(lat1: number, lng1: number, lat2: number, lng2: number): number {
  const toRad = (deg: number) => deg * (Math.PI / 180);
  const dLat = toRad(lat2 - lat1);
  const dLng = toRad(lng2 - lng1);
  const a = Math.sin(dLat / 2) ** 2 + Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLng / 2) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return EARTH_RADIUS_MI * c;
}

// ─── Crisis Detection ──────────────────────────────────────
function detectCrisis(text: string): boolean {
  if (CRISIS_PATTERNS.some(pattern => pattern.test(text))) return true;
  const normalized = normalizeFrench(text);
  return Object.values(FRENCH_CRISIS_REGEX_PATTERNS).some(patterns =>
    patterns.some(p => p.test(normalized))
  );
}

// ─── Crisis Type Detection ────────────────────────────────
type CrisisType = 'self-harm' | 'violence-others' | 'domestic' | 'medical' | 'general';

function detectCrisisType(text: string): CrisisType {
  // Self-harm / suicidal MUST be checked FIRST
  // "I want to kill myself" must be self-harm, NOT violence-others
  const selfHarmPatterns = [
    /suicid/i, /kill\s+myself/i, /end\s+it\s+all/i, /end\s+my\s+life/i,
    /want\s+to\s+die/i, /self[- ]?harm/i, /harm\s+myself/i, /hurt\s+myself/i,
    /overdose/i, /hang\s+myself/i, /slit\s+my\s+wrists/i, /slit\s+my/i,
    /better\s+off\s+dead/i, /not\s+worth\s+living/i,
    /take\s+my\s+life/i, /can'?t\s+take\s+(this|it)/i,
    /no\s+(reason|point)\s+to\s+live/i, /don'?t\s+want\s+to\s+live/i,
    /want\s+to\s+disappear/i, /give\s+up\s+on\s+life/i,
    /no\s+way\s+out/i, /nothing\s+left\s+to\s+live/i,
    /everyone\s+would\s+be\s+better\s+off/i,
    /step\s+in\s+front\s+of/i, /walk\s+into\s+traffic/i,
    /drown\s+myself/i, /drown\s+my/i,
    /rope\s+in\s+my/i,
    /swallowed?\s+(bleach|poison|cleaning)/i,
    /burn\s+myself/i, /burning\s+myself/i,
    /intrusive\s+thoughts.*kill/i, /voices\s+telling\s+me.*hurt/i,
    /can'?t\s+keep\s+myself\s+safe/i,
    /afraid\s+i'?m\s+going\s+to\s+hurt/i,
    /contemplating\s+suicide/i,
    /suicidal\s+(thoughts|ideation)/i,
    /want\s+to\s+end\s+(my\s+)?life/i,
    /don'?t\s+want\s+to\s+be\s+alive/i,
  ];
  if (selfHarmPatterns.some(p => p.test(text))) return 'self-harm';

  // Domestic violence
  const domesticPatterns = [
    /domestic\s+violen/i, /domestic\s+abuse/i,
    /(husband|wife|partner|boyfriend|girlfriend|spouse)\s+(hits?|beats?|hurts?|chokes?|strangles?|threatens?)/i,
    /being\s+beaten/i, /beaten\s+by/i, /being\s+abused/i, /abused\s+by\s+my\s+partner/i,
    /choking\s+me/i, /strangling\s+me/i, /strangled?\s+me/i,
    /threatening\s+to\s+kill/i, /threaten.*kill\s+(me|my\s+family)/i,
    /physically\s+abused/i, /emotionally\s+(and|&)\s+physically\s+abused/i,
    /physically\s+attacked/i,
    /abusive\s+relationship/i,
    /in\s+immediate\s+(physical\s+)?danger/i,
    /being\s+emotionally\s+destroyed/i,
    /battered/i,
  ];
  if (domesticPatterns.some(p => p.test(text))) return 'domestic';

  // Violence toward others (checked AFTER self-harm to prevent misclassification)
  const violencePatterns = [
    /\b(kill|murder|hurt|harm|shoot|stab)\s+(someone|him|her|them|people|friend|family|partner|spouse|boss|child|kids?)\b/i,
    /i\s+(wanna|want\s+to|will|am\s+going\s+to)\s+(kill|murder|hurt|harm|shoot|stab)\s+(?!myself)\b/i,
    /gonna\s+(kill|murder|hurt|harm|shoot|stab)\s+(?!myself)\b/i,
  ];
  if (violencePatterns.some(p => p.test(text))) return 'violence-others';

  // Medical emergency
  const medicalPatterns = [
    /i'?m\s+dying\b(?!\s+(for|to|of|from|laughing|laugh))/i,
    /i\s+am\s+dying\b(?!\s+(for|to|of|from|laughing|laugh))/i,
    /i'?m\s+going\s+to\s+die\b(?!\s+(from|of|for))/i,
    /i\s+can'?t\s+breathe/i,
  ];
  if (medicalPatterns.some(p => p.test(text))) return 'medical';

  // ─── French crisis pattern checks (accent-insensitive) ───
  const normalizedFr = normalizeFrench(text);
  const frMatch = (cat: string) => FRENCH_CRISIS_REGEX_PATTERNS[cat]?.some(p => p.test(normalizedFr));

  if (frMatch('suicide') || frMatch('selfHarm') || frMatch('overdose')) return 'self-harm';
  if (frMatch('domesticViolence')) return 'domestic';
  if (frMatch('childAbuse') || frMatch('sexualAssault') || frMatch('humanTrafficking') || frMatch('hateCrime')) return 'violence-others';

  return 'general';
}

// ─── Classification result with source tracking ────────────
interface ClassificationResult {
  label: string;
  score: number;
  source: 'bart' | 'keyword';
}

// ─── Debug info for transparency ────────────────────────────
interface DebugInfo {
  keyPresent: boolean;
  keyPrefix: string;
  keyLength: number;
  fetchAttempted: boolean;
  fetchUrl: string;
  fetchStatus: number | null;
  fetchElapsedMs: number | null;
  fetchError: string | null;
  hfResponseBody: string | null;
  fallbackUsed: boolean;
  fallbackReason: string | null;
}

// ─── Classification via HuggingFace BART-large-MNLI ────────
async function classifyWithBART(text: string, useFrench: boolean = false): Promise<{ results: ClassificationResult[]; debug: DebugInfo }> {
  // ── Build debug info as we go ──
  const apiUrl = useFrench ? HF_API_URL_MULTILINGUAL : HF_API_URL;
  const model = useFrench ? HF_MODEL_MULTILINGUAL : HF_MODEL;
  const labels = useFrench ? FRENCH_CANDIDATE_LABELS : CANDIDATE_LABELS;
  const labelToCategory = useFrench ? FRENCH_LABEL_TO_CATEGORY : LABEL_TO_CATEGORY;

  const debug: DebugInfo = {
    keyPresent: !!(HF_API_KEY && HF_API_KEY !== "hf_xxxxx"),
    keyPrefix: HF_API_KEY ? HF_API_KEY.substring(0, 6) + '...' : 'NONE',
    keyLength: HF_API_KEY?.length ?? 0,
    fetchAttempted: false,
    fetchUrl: apiUrl,
    fetchStatus: null,
    fetchElapsedMs: null,
    fetchError: null,
    hfResponseBody: null,
    fallbackUsed: false,
    fallbackReason: null,
  };

  // ── HONEST GATE: No API key = fallback to keyword classification. ──
  if (!HF_API_KEY || HF_API_KEY === "hf_xxxxx") {
    console.warn("[classify] No HUGGINGFACE_API_KEY configured — using keyword matching");
    debug.fallbackUsed = true;
    debug.fallbackReason = 'No HUGGINGFACE_API_KEY configured';
    return { results: keywordClassify(text), debug };
  }

  // ── CALLING HF API — with full diagnostic logging ──
  debug.fetchAttempted = true;
  console.log(`[classify] Calling HF API`);
  console.log(`[classify] Input text: "${text.substring(0, 80)}${text.length > 80 ? '...' : ''}"`);
  console.log(`[classify] Candidate labels count: ${labels.length} (model: ${model})`);

  const requestBody = {
    inputs: text,
    parameters: {
      candidate_labels: labels,
      multi_label: true,
    },
  };

  // ── SINGLE ATTEMPT: Raw fetch with aggressive timeout ──
  // 6s timeout — Vercel free tier kills functions at 10s, so we keep margin
  // No retry, no SDK attempt — if it fails, fall back to keyword matching immediately
  const fetchStart = Date.now();
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 6000);

    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${HF_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
      signal: controller.signal,
    });
    clearTimeout(timeoutId);

    const elapsed = Date.now() - fetchStart;
    debug.fetchStatus = response.status;
    debug.fetchElapsedMs = elapsed;
    console.log(`[classify] HF fetch responded in ${elapsed}ms with status ${response.status}`);

    if (response.ok) {
      const result = await response.json();
      debug.hfResponseBody = JSON.stringify(result).substring(0, 500);

      // BART-large-MNLI zero-shot returns { labels: string[], scores: number[] }
      if (result.labels && result.scores) {
        const top3 = result.labels.slice(0, 3).map((l: string, i: number) =>
          `${labelToCategory[l] || l}: ${(result.scores[i] * 100).toFixed(1)}%`
        );
        console.log(`[classify] Top 3: ${top3.join(' | ')}`);

        return {
          results: result.labels.map((label: string, i: number) => ({
            label: labelToCategory[label] || label,
            score: result.scores[i],
            source: 'bart' as const,
          })),
          debug,
        };
      }

      // Unexpected format
      debug.fallbackUsed = true;
      debug.fallbackReason = `Unexpected HF response format: keys=${Object.keys(result).join(',')}`;
      console.warn("[classify] Unexpected HF response format:", debug.fallbackReason);
    } else if (response.status === 503) {
      // Model is loading — don't retry (would exceed Vercel timeout). Fall back to keyword.
      const errBody = await response.text();
      debug.hfResponseBody = errBody.substring(0, 500);
      debug.fallbackUsed = true;
      debug.fallbackReason = `HF model loading (503) — fell back to keyword matching to stay under Vercel timeout`;
      console.warn("[classify] HF model loading (503) — falling back to keyword matching");
    } else {
      const errBody = await response.text();
      debug.hfResponseBody = errBody.substring(0, 500);
      debug.fallbackUsed = true;
      debug.fallbackReason = `HF API returned ${response.status}: ${errBody.substring(0, 100)}`;
      console.error(`[classify] HF API error ${response.status}: ${errBody}`);
    }
  } catch (fetchErr) {
    const elapsed = Date.now() - fetchStart;
    debug.fetchElapsedMs = elapsed;
    const cause = (fetchErr as any)?.cause;
    debug.fetchError = fetchErr instanceof Error ? fetchErr.message : String(fetchErr);
    const causeInfo = cause ? ` (cause: ${cause.code || cause.message || cause.name || 'unknown'}${cause.hostname ? ` hostname=${cause.hostname}` : ''})` : '';
    console.error(`[classify] HF fetch FAILED after ${elapsed}ms: ${debug.fetchError}${causeInfo}`);
    debug.fallbackUsed = true;
    debug.fallbackReason = `HF fetch failed after ${elapsed}ms: ${debug.fetchError}${causeInfo}`;
  }

  // ── FINAL FALLBACK: Keyword matching (honest, instant) ──
  // No SDK retry — it doubles the time and Vercel kills at 10s
  return { results: keywordClassify(text), debug };
}

// ─── Keyword Classification (HONEST fallback — never pretends to be BART) ───
function keywordClassify(text: string): ClassificationResult[] {
  console.log("[classify] Using KEYWORD matching (BART unavailable or failed)");
  const lower = text.toLowerCase();
  const normalized = normalizeFrench(text); // accent-insensitive for French keywords
  const results: ClassificationResult[] = [];

  // Bilingual keyword map — English + French keywords for each category
  // French keywords are matched against the normalized (accent-stripped) text
  const labelKeywords: Record<string, { en: string[]; fr: string[] }> = {
    "Housing Assistance": {
      en: ["housing", "rent", "shelter", "homeless", "eviction", "evicted", "apartment", "mortgage", "section 8", "losing my home", "no money for rent", "financial help", "utility"],
      fr: ["logement", "loyer", "hebergement", "sans-abri", "sans abri", "expulsion", "expulse", "appartement", "hypothek", "perdu mon logement", "pas dargent pour le loyer", "aide financiere", "sdf", "a la rue"]
    },
    "Food Assistance": {
      en: ["food", "hungry", "groceries", "snap", "meals", "eat", "feeding", "food bank", "ebt", "starving"],
      fr: ["nourriture", "faim", "courses", "repas", "manger", "alimentaire", "banque alimentaire", "affame", "aide alimentaire", "colis alimentaire"]
    },
    "Mental Health": {
      en: ["mental", "depression", "depressed", "anxiety", "anxious", "therapy", "counseling", "ptsd", "stress", "stressed", "emotional", "overwhelmed", "feelings", "alone", "lonely", "isolated", "no one to talk to", "loneliness"],
      fr: ["mental", "depression", "deprime", "anxiete", "anxieux", "anxieuse", "therapie", "consultation", "stress", "stresse", "emotionnel", "debord", "sentiments", "seul", "solitude", "isole", "personne a qui parler", "sante mentale"]
    },
    "Employment Services": {
      en: ["job", "employment", "work", "unemployed", "training", "career", "fired", "laid off", "resume", "need money", "no money", "income"],
      fr: ["emploi", "travail", "chomage", "chomeur", "formation", "carriere", "licencie", "licencie", "cv", "besoin dargent", "pas dargent", "revenu", "recherche demploi", "insertion professionnelle"]
    },
    "Legal Aid": {
      en: ["legal", "lawyer", "immigration", "court", "custody", "divorce", "deportation", "rights"],
      fr: ["juridique", "avocat", "immigration", "tribunal", "garde", "divorce", "expulsion", "droits", "justice", "procedure"]
    },
    "Healthcare": {
      en: ["medical", "health", "doctor", "insurance", "prescription", "hospital", "clinic", "sick", "pain", "medication", "insulin", "cancer", "dying of", "illness"],
      fr: ["medical", "sante", "medecin", "assurance", "ordonnance", "hopital", "clinique", "malade", "douleur", "medicament", "insuline", "cancer", "maladie", "soins"]
    },
    "Crisis Support": {
      en: ["suicidal", "crisis", "self-harm", "kill myself", "emergency", "danger", "overdose", "distress"],
      fr: ["suicidaire", "crise", "automutilation", "urgence", "danger", "overdose", "detresse"]
    },
    "Substance Use": {
      en: ["addiction", "alcohol", "alcoholic", "drug", "drugs", "substance", "sober", "sobriety", "rehab", "recovery", "withdrawal", "drinking", "using", "high", "opioid", "heroin", "cocaine", "meth"],
      fr: ["addiction", "alcool", "alcoolique", "drogue", "drogues", "substance", "dependance", "sevrage", "retraite", "recuperation", "consommation", "ivresse", "opioide", "heroine", "cocaïne"]
    },
    "Senior Services": {
      en: ["senior", "elderly", "aging", "medicare", "social security", "retirement", "old age", "grandparent", "elder", "older adult"],
      fr: ["senior", "personnes agees", "vieillissement", "retraite", "vieux", "grand-parent", "aine", "perte dautonomie", "maison de retraite"]
    },
    "Veteran Services": {
      en: ["veteran", "va ", "military", "gi bill", "vfw", "ptsd veteran", "discharge", "service member", "armed forces", "navy", "army", "marines", "air force", "coast guard"],
      fr: ["ancien combattant", "militaire", "armee", "veteran"]
    },
  };

  for (const [label, { en: enKw, fr: frKw }] of Object.entries(labelKeywords)) {
    let score = 0;
    let matchCount = 0;

    // Check English keywords against lowercased text
    for (const keyword of enKw) {
      if (lower.includes(keyword)) {
        matchCount++;
        score += 0.3;
      }
    }

    // Check French keywords against normalized (accent-stripped) text
    for (const keyword of frKw) {
      if (normalized.includes(keyword)) {
        matchCount++;
        score += 0.3;
      }
    }

    if (matchCount > 0) {
      score = Math.min(0.95, 0.5 + score);
      if (label === "Mental Health" && matchCount <= 1) {
        score *= 0.7;
      }
    } else {
      score = 0.05;
    }

    results.push({ label, score: Math.round(score * 100) / 100, source: 'keyword' });
  }

  results.sort((a, b) => b.score - a.score);
  return results.filter((r) => r.score > 0.3);
}

// ─── Build resources for a category (multi-city) ───
// Set of national resource names for fast lookup
const NATIONAL_NAMES = new Set(NATIONAL_RESOURCES.map(r => r.name))

function getResourcesForCategory(category: string, cityId: string, userLat?: number, userLng?: number) {
  const cityCategories = getResourcesByCategoryForCity(cityId);
  const dbResources = cityCategories[category] || [];
  const city = SUPPORTED_CITIES.find(c => c.id === cityId);
  const cityLabel = city?.label || cityId;

  return dbResources.map(r => {
    let distance: string | null = null;
    if (userLat !== undefined && userLng !== undefined && city) {
      const miles = haversineMi(userLat, userLng, city.lat, city.lng);
      if (miles <= city.metroRadiusMi) {
        distance = `${miles.toFixed(1)} mi`;
      } else if (miles <= 100) {
        distance = `${Math.round(miles)} mi (outside ${city.name} metro)`;
      } else {
        distance = `📍 ${cityLabel}`;
      }
    } else {
      distance = `📍 ${cityLabel}`;
    }

    const isNational = NATIONAL_NAMES.has(r.name);

    return {
      name: r.name + (isNational ? ' (National)' : ''),
      detail: r.description + (r.phone ? ` Call ${r.phone}` : '') + (r.hours ? ` Hours: ${r.hours}` : ''),
      phone: r.phone || undefined,
      address: r.address || undefined,
      hours: r.hours || undefined,
      eligibility: r.eligibility || undefined,
      verified: r.verified,
      distance,
    };
  });
}

// ─── COUNTRY-AWARE CRISIS LINES ────────────────────────────
function getCrisisLinesForCountry(
  country: string | null,
  crisisType: CrisisType,
  isFrench: boolean
): { name: string; action: string; call: string }[] {
  if (!country || !COUNTRY_HOTLINES[country]) {
    if (crisisType === 'domestic') {
      return [
        { name: "National Domestic Violence Hotline", action: "1-800-799-7233 — Confidential, 24/7", call: "1-800-799-7233" },
        { name: "988 Suicide & Crisis Lifeline", action: "Free. Confidential. 24/7.", call: "988" },
        { name: "Crisis Text Line", action: "Text HOME to 741741", call: "Text" },
        { name: "911", action: "If you are in immediate danger — call now", call: "911" },
      ];
    }
    if (crisisType === 'medical') {
      return [
        { name: "911", action: "Medical emergency — call now", call: "911" },
        { name: "988 Suicide & Crisis Lifeline", action: "Free. Confidential. 24/7.", call: "988" },
        { name: "Crisis Text Line", action: "Text HOME to 741741", call: "Text" },
      ];
    }
    if (crisisType === 'violence-others') {
      return [
        { name: "988 Suicide & Crisis Lifeline", action: "If you're having thoughts of harming others, support is available. Free. Confidential. 24/7.", call: "988" },
        { name: "Crisis Text Line", action: "Text HOME to 741741", call: "Text" },
        { name: "911", action: "If someone is in immediate danger — call now", call: "911" },
      ];
    }
    return [
      { name: "988 Suicide & Crisis Lifeline", action: "Free. Confidential. 24/7.", call: "988" },
      { name: "Crisis Text Line", action: "Text HOME to 741741", call: "Text" },
      { name: "911", action: "Immediate danger — call now", call: "911" },
    ];
  }

  const h = COUNTRY_HOTLINES[country];
  const countryInfo = SUPPORTED_COUNTRIES.find(c => c.id === country);
  const countryName = countryInfo?.nameFr ?? countryInfo?.name ?? country;

  const labels = isFrench ? {
    suicide: `Prévention suicide (${countryName})`,
    suicideAction: `Gratuit • Confidentiel • 24h/24 et 7j/7`,
    dv: `Violences conjugales (${countryName})`,
    dvAction: `Écoute confidentielle 24h/24`,
    medical: `Urgence médicale (${countryName})`,
    medicalAction: `Appelez maintenant`,
    police: `Police (${countryName})`,
    policeAction: `Danger immédiat — appelez maintenant`,
    general: `Numéro d'urgence (${countryName})`,
    generalAction: `Appelez maintenant`,
  } : {
    suicide: `Suicide Prevention (${countryName})`,
    suicideAction: `Free • Confidential • 24/7`,
    dv: `Domestic Violence Hotline (${countryName})`,
    dvAction: `Confidential support 24/7`,
    medical: `Medical Emergency (${countryName})`,
    medicalAction: `Call now`,
    police: `Police (${countryName})`,
    policeAction: `Immediate danger — call now`,
    general: `Emergency Number (${countryName})`,
    generalAction: `Call now`,
  };

  if (crisisType === 'domestic') {
    return [
      { name: labels.dv, action: labels.dvAction, call: h.domesticViolence },
      { name: labels.suicide, action: labels.suicideAction, call: h.suicidePrevention },
      { name: labels.police, action: labels.policeAction, call: h.police },
    ];
  }
  if (crisisType === 'medical') {
    return [
      { name: labels.medical, action: labels.medicalAction, call: h.medicalEmergency },
      { name: labels.suicide, action: labels.suicideAction, call: h.suicidePrevention },
    ];
  }
  if (crisisType === 'violence-others') {
    return [
      { name: labels.suicide, action: labels.suicideAction, call: h.suicidePrevention },
      { name: labels.police, action: labels.policeAction, call: h.police },
    ];
  }
  return [
    { name: labels.suicide, action: labels.suicideAction, call: h.suicidePrevention },
    { name: labels.general, action: labels.generalAction, call: h.general },
    { name: labels.police, action: labels.policeAction, call: h.police },
  ];
}

// ─── FRENCH RESOURCES FETCHER (city-level, country-isolated) ──────────
// CRITICAL: This function fetches resources for a SPECIFIC CITY within a SPECIFIC COUNTRY.
// A French user will NEVER see Casablanca resources — country isolation is enforced
// by findNearestFrenchCity() which only searches within the user's country.
function getFrenchResourcesForCategory(
  category: string,
  countryId: string,
  userLat?: number,
  userLng?: number
): Array<{
  name: string;
  detail: string;
  phone?: string;
  address?: string;
  hours?: string;
  eligibility?: string;
  verified: string;
  distance: string;
}> {
  const countryInfo = SUPPORTED_COUNTRIES.find(c => c.id === countryId);
  const countryFlag = countryInfo?.flag ?? '📍';

  // Determine which city to use
  let cityId: string | null = null;
  let cityLabel: string = countryInfo?.nameFr ?? countryId;

  if (userLat !== undefined && userLng !== undefined) {
    // Find nearest city WITHIN this country (country isolation)
    const match = findNearestFrenchCity(userLat, userLng, countryId);
    if (match) {
      cityId = match.city.id;
      cityLabel = match.city.nameFr;
    }
  }

  // If no geolocation, use the first city in the country as fallback
  if (!cityId) {
    const cities = getCitiesForCountry(countryId);
    if (cities.length > 0) {
      cityId = cities[0].id;
      cityLabel = cities[0].nameFr;
    }
  }

  if (!cityId) return [];

  // Get resources for this city + category (accepts EN or FR category names)
  const resources = getResourcesForCityByAnyCategory(cityId, category);

  if (resources.length === 0) return [];

  return resources.map(r => ({
    name: r.name,
    detail: r.description + (r.phone ? ` Appelez le ${r.phone}` : '') + (r.hours ? ` Horaires: ${r.hours}` : ''),
    phone: r.phone,
    address: r.address,
    hours: r.hours,
    eligibility: r.eligibility,
    verified: r.verified,
    distance: `${countryFlag} ${cityLabel}`,
  }));
}

// ─── POST Handler ──────────────────────────────────────────
export async function POST(request: NextRequest) {
  try {
    // ─── Abuse protection: bot detection ───
    const userAgent = request.headers.get('user-agent') || '';
    if (!userAgent) {
      return NextResponse.json(
        { error: 'User-Agent header required' },
        { status: 400 }
      );
    }
    if (BLOCKED_UA_PATTERNS.some(p => p.test(userAgent))) {
      console.warn(`[classify] Blocked bot User-Agent: ${userAgent.substring(0, 100)}`);
      return NextResponse.json(
        { error: 'Automated requests are not allowed. Please use the web interface.' },
        { status: 403 }
      );
    }

    // ─── Abuse protection: rate limiting ───
    cleanupRateLimitMap();
    const clientIp = getClientIp(request);
    const rateLimit = checkRateLimit(clientIp);
    if (!rateLimit.allowed) {
      const retryAfterSec = Math.ceil((rateLimit.resetAt - Date.now()) / 1000);
      console.warn(`[classify] Rate limit exceeded for IP ${clientIp}`);
      return NextResponse.json(
        { error: 'Too many requests. Please slow down.' },
        {
          status: 429,
          headers: {
            'Retry-After': String(retryAfterSec),
            'X-RateLimit-Limit': String(RATE_LIMIT_MAX_REQUESTS),
            'X-RateLimit-Remaining': '0',
            'X-RateLimit-Reset': String(Math.floor(rateLimit.resetAt / 1000)),
          },
        }
      );
    }

    const body = await request.json();
    const { text, lat, lng, cityId: explicitCityId, country: explicitCountry, locale: clientLocale } = body;

    // ─── Input validation ───
    if (typeof text !== 'string' || text.length > 2000) {
      return NextResponse.json(
        { error: 'Text input must be a string of 2000 characters or fewer.' },
        { status: 400 }
      );
    }

    const userLat = typeof lat === 'number' && lat >= -90 && lat <= 90 ? lat : undefined;
    const userLng = typeof lng === 'number' && lng >= -180 && lng <= 180 ? lng : undefined;

    // ─── Language detection: client locale > input heuristic ───
    const isFrench = clientLocale === 'fr' || (!clientLocale && isFrenchInput(text));

    // ─── Country detection (multi-layer): ───
    //   1. Explicit country param from client
    //   2. Vercel x-vercel-ip-country header (production)
    //   3. Coordinate-based detection (lat/lng near a French city → that country)
    //   4. If isFrench and still unknown → default to "france" (largest FR population)
    //   5. null = US default
    const ipCountry = request.headers.get('x-vercel-ip-country');
    let country: string | null = null;
    if (explicitCountry && SUPPORTED_COUNTRIES.some(c => c.id === explicitCountry)) {
      country = explicitCountry;
    } else if (ipCountry) {
      const detected = getCountryFromIsoCode(ipCountry);
      if (detected) country = detected.id;
    }

    // Coordinate-based country detection: find the NEAREST French city (within 150km)
    // and assign that city's country. We use nearest (not first-within-threshold)
    // to handle border cases like Geneva/Lyon (108km apart) correctly.
    if (!country && userLat !== undefined && userLng !== undefined) {
      let nearestDist = Infinity;
      let nearestCountry: string | null = null;
      for (const city of FRENCH_CITIES) {
        const dist = haversineKmLocal(userLat, userLng, city.lat, city.lng);
        if (dist < nearestDist) {
          nearestDist = dist;
          nearestCountry = city.countryId;
        }
      }
      // Only assign if within 150km of a French city (avoids false positives for US users)
      if (nearestCountry && nearestDist <= 150) {
        country = nearestCountry;
      }
    }

    // If input is French but country still unknown, default to France
    if (!country && isFrench) {
      country = 'france';
    }

    // ─── Multi-city resolution ───
    // For French countries: use findNearestFrenchCity (country-isolated)
    // For US/null: use existing city logic
    let cityId: string = 'houston';
    let cityMatch: CityMatch | null = null;
    let cityLabel = 'Houston, TX';

    if (country) {
      // French-speaking country — use French city resolution (country-isolated)
      if (userLat !== undefined && userLng !== undefined) {
        const frMatch = findNearestFrenchCity(userLat, userLng, country);
        if (frMatch) {
          cityId = frMatch.city.id;
          cityLabel = frMatch.city.nameFr;
          cityMatch = { city: frMatch.city as any, isInServiceArea: frMatch.isInServiceArea, distanceMi: frMatch.distanceKm * 0.621371 } as any;
        } else {
          // No geolocation match — use first city in country
          const cities = getCitiesForCountry(country);
          if (cities.length > 0) {
            cityId = cities[0].id;
            cityLabel = cities[0].nameFr;
          }
        }
      } else {
        // No geolocation — use first city in country
        const cities = getCitiesForCountry(country);
        if (cities.length > 0) {
          cityId = cities[0].id;
          cityLabel = cities[0].nameFr;
        }
      }
    } else if (explicitCityId && SUPPORTED_CITIES.some(c => c.id === explicitCityId)) {
      // US: user explicitly selected a city
      cityId = explicitCityId;
      const city = SUPPORTED_CITIES.find(c => c.id === cityId)!;
      cityLabel = city.label;
    } else if (userLat !== undefined && userLng !== undefined) {
      // US: auto-detect from geolocation
      cityMatch = findNearestCity(userLat, userLng);
      cityId = cityMatch.city.id;
      cityLabel = cityMatch.city.label;
    }
    // Default: Houston (already set)

    if (!text || typeof text !== "string" || text.trim().length === 0) {
      return NextResponse.json(
        { error: "Text input is required" },
        { status: 400 }
      );
    }

    // Layer 1: Crisis Detection FIRST (hardcoded, deterministic, ALWAYS runs)
    // This must run before vague detection so "help I'm suicidal" triggers crisis, not vague
    const isCrisis = detectCrisis(text);

    if (isCrisis) {
      const crisisType = detectCrisisType(text);

      // Country-aware crisis lines (US default, French countries use verified national hotlines)
      const crisisLines = getCrisisLinesForCountry(country, crisisType, isFrench);

      // Crisis message tailored to type (localized)
      const crisisWhy = (() => {
        if (isFrench) {
          switch (crisisType) {
            case 'violence-others': return "Si vous avez des pensées de faire du mal à quelqu'un, du soutien est disponible. Vous n'êtes pas seul(e).";
            case 'domestic': return "Votre sécurité est la priorité absolue en ce moment. De l'aide est disponible.";
            case 'medical': return "Cela ressemble à une urgence médicale. Veuillez obtenir de l'aide immédiatement.";
            case 'self-harm': return "Vous n'êtes pas seul(e). De l'aide est disponible maintenant.";
            default: return "Votre sécurité est la priorité absolue en ce moment.";
          }
        }
        switch (crisisType) {
          case 'violence-others': return "If you're having thoughts of harming others, support is available. You don't have to face this alone.";
          case 'domestic': return "Your safety is the top priority right now. Help is available.";
          case 'medical': return "This sounds like a medical emergency. Please get help immediately.";
          case 'self-harm': return "You are not alone. Help is available right now.";
          default: return "Your safety is the top priority right now.";
        }
      })();

      // Country-aware crisis warning
      const emergencyNumber = country && COUNTRY_HOTLINES[country]
        ? COUNTRY_HOTLINES[country].police
        : '911';
      const crisisWarning = isFrench
        ? (crisisType === 'violence-others'
            ? `Si quelqu'un est en danger immédiat, appelez le ${emergencyNumber}.`
            : `Si vous êtes en danger physique immédiat, appelez le ${emergencyNumber}.`)
        : (crisisType === 'violence-others'
            ? `If someone is in immediate danger, call ${emergencyNumber}.`
            : `If you are in immediate physical danger, call ${emergencyNumber}.`);

      // For French countries, return French crisis resources; for US, return US crisis resources
      const crisisResources = country
        ? getFrenchResourcesForCategory("Crisis Support", country, userLat, userLng).length > 0
          ? getFrenchResourcesForCategory("Crisis Support", country, userLat, userLng)
          : getResourcesForCategory("Crisis Support", cityId, userLat, userLng)
        : getResourcesForCategory("Crisis Support", cityId, userLat, userLng);

      // For French countries, determine the French city label
      let frenchCityLabel: string | null = null;
      if (country && userLat !== undefined && userLng !== undefined) {
        const frMatch = findNearestFrenchCity(userLat, userLng, country);
        if (frMatch) frenchCityLabel = frMatch.city.nameFr;
      }

      return NextResponse.json({
        isCrisis: true,
        crisisType,
        crisisLines,
        categories: [{
          label: isFrench ? "Crise" : "Crisis Support",
          confidence: 99,
          resources: crisisResources,
          why: crisisWhy,
          warning: crisisWarning,
        }],
        hasLocation: userLat !== undefined,
        outsideServiceArea: country
          ? (frenchCityLabel === null)
          : (cityMatch ? !cityMatch.isInServiceArea : false),
        serviceArea: country
          ? (frenchCityLabel
            ? `${frenchCityLabel}, ${SUPPORTED_COUNTRIES.find(c => c.id === country)?.nameFr ?? country}`
            : (SUPPORTED_COUNTRIES.find(c => c.id === country)?.nameFr ?? country))
          : cityLabel + ' metro area',
        cityId: country ? null : cityId,
        cityLabel: country ? frenchCityLabel : cityLabel,
        country,
        locale: isFrench ? 'fr' : 'en',
      });
    }

    // ── Layer 2: Vague / greeting input detection ──
    // BART zero-shot always returns high scores even on meaningless input.
    // We intercept vague input BEFORE calling BART to avoid false confidence.
    // Crisis detection already ran above, so "help I'm suicidal" → crisis, not vague.
    const VAGUE_PATTERNS = [
      /^(hey|hi|hello|yo|sup|what'?s up|hola|coucou|bonjour|salut)[\s!.?]*$/i,
      /^(test|testing|asdf|qwerty|abc|123|aaa+|lol|ok|yes|no|maybe|idk|something|stuff|things|whatever|dunno|sad|hungry|cold|tired|lost|scared|alone|bad|upset|angry|confused|sick|broke|down|bored|sleepy|nice|cool|good|true|false|right|same|interesting|weird|strange|uh|um|ugh|meh|eh|huh|oh|wow|ah|mmm)[\s!.?]*$/i,
      /^(when|where|what|how|why|who|which|whom)$/i,  // Single question words — no context
      /^.{0,3}$/,  // 3 chars or less — too short for meaningful classification
      /^(help|need help|i need help|please help|urgent|emergency|can you help|i need|i want|thanks|thx|pls|plz)[\s!.?]*$/i,
      /^(so what|what even|how come|how about|and then|is this real|how does this work|what is this|anyone there)[\s!.?]*$/i,
      /^[.?!]+$/,  // Only punctuation like "....." or "???" or "!!!"
      /^(good morning|good evening|hi there)[\s!.?]*$/i,
    ];
    const isVague = VAGUE_PATTERNS.some(p => p.test(text.trim()));

    // ── Layer 2b: Injection / adversarial input detection ──
    // SQL injection, XSS, prompt injection — should never reach BART
    const INJECTION_PATTERNS = [
      /(<script|<\/script|javascript:|on\w+=)/i,  // XSS
      /('|;)\s*(DROP|DELETE|INSERT|UPDATE|SELECT|UNION)\s/i,  // SQL injection
      /IGNORE\s+(ALL\s+)?PREVIOUS\s+INSTRUCTIONS/i,  // Prompt injection
      /^(.)\1{19,}$/,  // Repeated character 20+ times (spam)
    ];
    const isInjection = INJECTION_PATTERNS.some(p => p.test(text.trim()));

    if (isVague || isInjection) {
      console.log("[classify] Vague input detected — skipping BART to avoid false confidence");
      return NextResponse.json({
        isCrisis: false,
        isVague: true,
        categories: [],
        needsClarification: true,
        clarificationMessage: "Could you tell us more about your situation? For example: I lost my job and need help with rent, or I need food assistance for my family.",
        model: "Vague input detected - skipped BART to avoid false confidence",
        classificationSource: "vague-detection",
        hasLocation: userLat !== undefined,
        outsideServiceArea: cityMatch ? !cityMatch.isInServiceArea : false,
        serviceArea: cityLabel + " metro area",
        cityId,
        cityLabel,
      });
    }

    // Layer 3: AI Classification (BART if available, keyword if not — ALWAYS HONEST)
    const { results: classifications, debug: classificationDebug } = await classifyWithBART(text, isFrench);

    const classificationSource = classifications.length > 0 ? classifications[0].source : 'keyword';

    // Layer 4: Confidence-gated response
    const MULTI_NEED_THRESHOLD = 0.10;
    const MAX_CATEGORIES = 5;
    let significantCategories = classifications
      .filter(c => c.score >= MULTI_NEED_THRESHOLD)
      .slice(0, MAX_CATEGORIES);

    if (significantCategories.length === 0 && classifications.length > 0) {
      significantCategories = [classifications[0]];
    }

    const CLARIFICATION_THRESHOLD = 0.70;
    const needsClarification = significantCategories.length > 0 && significantCategories[0].score < CLARIFICATION_THRESHOLD;

    // ─── Clarification Questions (Layer 4: When confidence < 70%, ask don't guess) ───
    const CLARIFICATION_QUESTIONS: Record<string, { question: string; options: string[]; id: string }[]> = {
      'Housing Assistance': [
        { question: 'Are you currently facing eviction, or at risk of losing housing?', options: ['Facing eviction', 'At risk', 'Currently homeless', 'Need affordable housing'], id: 'housing_urgency' },
      ],
      'Food Assistance': [
        { question: 'Do you need food for yourself, your family, or both?', options: ['Just myself', 'My family', 'Both', 'Need baby formula/food'], id: 'food_who' },
      ],
      'Mental Health': [
        { question: 'What kind of support are you looking for?', options: ['Counseling/therapy', 'Crisis support now', 'Ongoing treatment', 'Support group'], id: 'mental_type' },
      ],
      'Employment Services': [
        { question: 'What is your employment situation?', options: ['Recently laid off', 'Long-term unemployed', 'Need career change', 'Need training/education'], id: 'employment_status' },
      ],
      'Legal Aid': [
        { question: 'What type of legal help do you need?', options: ['Housing/eviction', 'Immigration', 'Family/custody', 'Criminal defense'], id: 'legal_type' },
      ],
      'Healthcare': [
        { question: 'Is this an urgent medical need or ongoing care?', options: ['Urgent — need care now', 'Ongoing prescription/treatment', 'Need insurance', 'Preventive care'], id: 'health_urgency' },
      ],
      'Veteran Services': [
        { question: 'What kind of veteran support do you need?', options: ['Housing/homelessness', 'Healthcare/PTSD', 'Benefits/VA claims', 'Employment/training'], id: 'veteran_type' },
      ],
      'Senior Services': [
        { question: 'What kind of senior support do you need?', options: ['Meals/food delivery', 'Caregiver support', 'Transportation', 'Benefits counseling'], id: 'senior_type' },
      ],
    };

    // Generate clarification questions for the top category when below threshold
    const clarificationQuestions = needsClarification && significantCategories.length > 0
      ? CLARIFICATION_QUESTIONS[significantCategories[0].label] || null
      : null;

    const categoriesWithResources = significantCategories.map(c => {
      let resources;
      if (country) {
        const frenchResources = getFrenchResourcesForCategory(c.label, country, userLat, userLng);
        resources = frenchResources.length > 0
          ? frenchResources
          : getResourcesForCategory(c.label, cityId, userLat, userLng);
      } else {
        resources = getResourcesForCategory(c.label, cityId, userLat, userLng);
      }

      return {
        label: c.label,
        confidence: Math.round(c.score * 100),
        resources,
        why: isFrench
          ? (classificationSource === 'bart'
            ? `Correspondance par analyse sémantique XLM-RoBERTa de votre description.`
            : `Correspondance par analyse de mots-clés. Pour des résultats plus précis, la classification IA nécessite une clé API.`)
          : (classificationSource === 'bart'
            ? 'Matched by BART-large-MNLI semantic analysis of your description.'
            : 'Matched by keyword analysis. For more accurate results, BART AI classification requires an API key.'),
        also: significantCategories.length > 1
          ? (isFrench
            ? `Vous pourriez aussi bénéficier des services : ${significantCategories.slice(1, 3).map(sc => sc.label).join(" et ")}.`
            : `You may also benefit from ${significantCategories.slice(1, 3).map(sc => sc.label).join(" and ")} services.`)
          : undefined,
        warning: c.score < CLARIFICATION_THRESHOLD
          ? (isFrench
            ? `${Math.round(c.score * 100)}% de confiance — envisagez de donner plus de détails pour une meilleure correspondance`
            : `${Math.round(c.score * 100)}% confidence — consider providing more detail for a better match`)
          : undefined,
      };
    });

    const noResults = categoriesWithResources.length === 0;

    const modelLabel = isFrench
      ? (classificationSource === 'bart'
        ? "XLM-RoBERTa-large-XNLI (live, multilingue)"
        : classificationDebug.fallbackUsed && classificationDebug.fetchAttempted
        ? `Correspondance par mots-clés (échec de l'IA: ${classificationDebug.fetchStatus ?? classificationDebug.fetchError ?? 'inconnu'})`
        : "Correspondance par mots-clés (clé API non configurée)")
      : (classificationSource === 'bart'
        ? "BART-large-MNLI (live)"
        : classificationDebug.fallbackUsed && classificationDebug.fetchAttempted
        ? `Keyword matching (BART call failed: ${classificationDebug.fetchStatus ?? classificationDebug.fetchError ?? 'unknown'})`
        : "Keyword matching (BART API key not configured)");

    // For French countries, determine the French city label
    let frenchCityLabel: string | null = null;
    if (country && userLat !== undefined && userLng !== undefined) {
      const frMatch = findNearestFrenchCity(userLat, userLng, country);
      if (frMatch) frenchCityLabel = frMatch.city.nameFr;
    }

    const serviceAreaLabel = country
      ? (frenchCityLabel
        ? `${frenchCityLabel}, ${SUPPORTED_COUNTRIES.find(c => c.id === country)?.nameFr ?? country}`
        : (SUPPORTED_COUNTRIES.find(c => c.id === country)?.nameFr ?? country))
      : cityLabel + ' metro area';

    return NextResponse.json({
      isCrisis: false,
      categories: categoriesWithResources,
      needsClarification: needsClarification || noResults,
      clarificationMessage: isFrench
        ? (noResults
          ? "Nous n'avons pas pu correspondre votre description à une catégorie spécifique. Pouvez-vous nous en dire plus sur ce dont vous avez besoin ?"
          : needsClarification
          ? `Votre meilleure correspondance est en dessous de 70% de confiance — aidez-nous en répondant à une question rapide`
          : null)
        : (noResults
          ? "We couldn't match your description to a specific category. Could you tell us more about what you need help with?"
          : needsClarification
          ? `Your top match scored below 70% confidence — help us help you by answering a quick question`
          : null),
      clarificationQuestions,
      model: modelLabel,
      classificationSource,
      hasLocation: userLat !== undefined,
      outsideServiceArea: country
        ? (frenchCityLabel === null)
        : (cityMatch ? !cityMatch.isInServiceArea : false),
      serviceArea: serviceAreaLabel,
      cityId: country ? null : cityId,
      cityLabel: country ? frenchCityLabel : cityLabel,
      country,
      locale: isFrench ? 'fr' : 'en',
      debug: process.env.NODE_ENV === 'development' ? classificationDebug : undefined,
    });
  } catch (error) {
    console.error("Classification API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// ─── GET Handler (health check with HONEST diagnostics) ────
export async function GET() {
  const hasApiKey = !!(HF_API_KEY && HF_API_KEY !== "hf_xxxxx");
  return NextResponse.json({
    status: "ok",
    service: "ClearPath AI Classification API",
    version: "5.0.0",
    model: hasApiKey ? "BART-large-MNLI (en) + XLM-RoBERTa-large-XNLI (fr, multilingue)" : "Keyword matching (fallback)",
    bartAvailable: hasApiKey,
    classificationMode: hasApiKey ? "BART-large-MNLI (en) + XLM-RoBERTa (fr)" : "Keyword matching (fallback — set HUGGINGFACE_API_KEY)",
    crisisDetection: "regex-based (deterministic) — English + French (accent-insensitive)",
    multiCity: true,
    multiCountry: true,
    supportedCities: SUPPORTED_CITIES.map(c => ({ id: c.id, label: c.label })),
    supportedCountries: SUPPORTED_COUNTRIES.map(c => ({ id: c.id, name: c.name, nameFr: c.nameFr, flag: c.flag })),
    supportedFrenchCities: FRENCH_CITIES.map(c => ({ id: c.id, name: c.name, nameFr: c.nameFr, countryId: c.countryId })),
    labels: LABELS,
    frenchLabels: FRENCH_BART_LABELS.map(l => l.displayKey),
    cityLevelResources: FRENCH_CITY_RESOURCES.length,
  });
}
