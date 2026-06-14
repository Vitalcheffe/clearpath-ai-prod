import { NextRequest, NextResponse } from "next/server";
import { HfInference } from "@huggingface/inference";
import { HOUSTON_RESOURCES, RESOURCES_BY_CATEGORY, findNearestCity, getResourcesByCategoryForCity, SUPPORTED_CITIES, NATIONAL_RESOURCES, type CityMatch, type SupportedCity } from "@/data/resources";

// ─── Configuration ─────────────────────────────────────────
const HF_API_KEY = process.env.HUGGINGFACE_API_KEY;
const HF_MODEL = "facebook/bart-large-mnli";
const HF_API_URL = `https://api-inference.huggingface.co/models/${HF_MODEL}`;

// ─── Boot-time diagnostic (runs once when serverless function cold-starts) ───
console.log(`[classify:boot] HF_API_KEY present: ${!!HF_API_KEY}`);

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
  /swallow\s+pills/i,
  /pills\s+to\s+(end|die|kill)/i,
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
  /sexual\s+assault/i,
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
  /hurting\s+me/i,

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
  return CRISIS_PATTERNS.some(pattern => pattern.test(text));
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
async function classifyWithBART(text: string): Promise<{ results: ClassificationResult[]; debug: DebugInfo }> {
  // ── Build debug info as we go ──
  const debug: DebugInfo = {
    keyPresent: !!(HF_API_KEY && HF_API_KEY !== "hf_xxxxx"),
    keyPrefix: HF_API_KEY ? HF_API_KEY.substring(0, 6) + '...' : 'NONE',
    keyLength: HF_API_KEY?.length ?? 0,
    fetchAttempted: false,
    fetchUrl: HF_API_URL,
    fetchStatus: null,
    fetchElapsedMs: null,
    fetchError: null,
    hfResponseBody: null,
    fallbackUsed: false,
    fallbackReason: null,
  };

  // ── HONEST GATE: No API key = no BART. Never fake it. ──
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
  console.log(`[classify] Candidate labels count: ${CANDIDATE_LABELS.length}`);

  const requestBody = {
    inputs: text,
    parameters: {
      candidate_labels: CANDIDATE_LABELS,
      multi_label: true,
    },
  };

  // ── ATTEMPT 1: Raw fetch with timeout ──
  const fetchStart = Date.now();
  try {
    // 15s timeout — HuggingFace free tier can be slow on cold start
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 15000);

    const response = await fetch(HF_API_URL, {
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
    console.log(`[classify] HF raw fetch responded in ${elapsed}ms with status ${response.status}`);

    if (response.ok) {
      const result = await response.json();
      debug.hfResponseBody = JSON.stringify(result).substring(0, 500);

      // BART-large-MNLI zero-shot returns { labels: string[], scores: number[] }
      if (result.labels && result.scores) {
        const top3 = result.labels.slice(0, 3).map((l: string, i: number) =>
          `${LABEL_TO_CATEGORY[l] || l}: ${(result.scores[i] * 100).toFixed(1)}%`
        );
        console.log(`[classify] Top 3: ${top3.join(' | ')}`);

        return {
          results: result.labels.map((label: string, i: number) => ({
            label: LABEL_TO_CATEGORY[label] || label,
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
      // Model is loading — retry once after waiting
      const errBody = await response.text();
      debug.hfResponseBody = errBody.substring(0, 500);
      console.log(`[classify] HF model loading (503), waiting 20s and retrying...`);
      await new Promise(resolve => setTimeout(resolve, 20000));
      
      try {
        const controller2 = new AbortController();
        const timeoutId2 = setTimeout(() => controller2.abort(), 15000);
        const retryResponse = await fetch(HF_API_URL, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${HF_API_KEY}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestBody),
          signal: controller2.signal,
        });
        clearTimeout(timeoutId2);

        if (retryResponse.ok) {
          const retryResult = await retryResponse.json();
          if (retryResult.labels && retryResult.scores) {
            console.log(`[classify] Retry succeeded after 503!`);
            return {
              results: retryResult.labels.map((label: string, i: number) => ({
                label: LABEL_TO_CATEGORY[label] || label,
                score: retryResult.scores[i],
                source: 'bart' as const,
              })),
              debug,
            };
          }
        }
        debug.fallbackUsed = true;
        debug.fallbackReason = `HF API 503 retry failed: ${retryResponse.status}`;
      } catch (retryErr) {
        debug.fallbackUsed = true;
        debug.fallbackReason = `HF API 503 retry error: ${retryErr instanceof Error ? retryErr.message : String(retryErr)}`;
      }
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
    const causeInfo = cause ? ` (cause: ${cause.code || cause.message || cause.name || 'unknown'}${cause.hostname ? ` hostname=${cause.hostname}` : ''}${cause.address ? ` address=${cause.address}` : ''})` : '';
    console.error(`[classify] HF raw fetch FAILED after ${elapsed}ms: ${debug.fetchError}${causeInfo}`);
  }

  // ── ATTEMPT 2: HfInference SDK (different HTTP stack) ──
  console.log("[classify] Raw fetch failed or returned bad format — trying HfInference SDK");
  const sdkStart = Date.now();
  try {
    const hf = new HfInference(HF_API_KEY);
    const result = await hf.zeroShotClassification({
      model: HF_MODEL,
      inputs: text,
      parameters: {
        candidate_labels: CANDIDATE_LABELS,
        multi_label: true,
      },
    });

    const elapsed = Date.now() - sdkStart;
    console.log(`[classify] HfInference SDK succeeded in ${elapsed}ms`);

    // SDK returns ZeroShotClassificationOutput — array of { label, score }
    if (result && Array.isArray(result)) {
      const top3 = result.slice(0, 3).map((r: any) =>
        `${LABEL_TO_CATEGORY[r.label] || r.label}: ${(r.score * 100).toFixed(1)}%`
      );
      console.log(`[classify] SDK Top 3: ${top3.join(' | ')}`);

      // Update debug to show SDK was used
      if (!debug.fetchStatus) {
        debug.fetchStatus = 200; // SDK succeeded
      }
      debug.fetchElapsedMs = elapsed;
      debug.fallbackUsed = false;
      debug.fallbackReason = null;

      return {
        results: result.map((r: any) => ({
          label: LABEL_TO_CATEGORY[r.label] || r.label,
          score: r.score,
          source: 'bart' as const,
        })),
        debug,
      };
    }

    debug.fallbackUsed = true;
    debug.fallbackReason = `SDK returned unexpected format: ${typeof result}`;
    console.warn("[classify] SDK returned unexpected format:", typeof result);
  } catch (sdkErr) {
    const elapsed = Date.now() - sdkStart;
    const cause = (sdkErr as any)?.cause;
    const sdkMsg = sdkErr instanceof Error ? sdkErr.message : String(sdkErr);
    const causeInfo = cause ? ` (cause: ${cause.code || cause.message || 'unknown'})` : '';
    console.error(`[classify] HfInference SDK also FAILED after ${elapsed}ms: ${sdkMsg}${causeInfo}`);

    debug.fallbackUsed = true;
    if (!debug.fallbackReason) {
      debug.fallbackReason = `Both raw fetch and SDK failed. Raw: ${debug.fetchError || 'N/A'}. SDK: ${sdkMsg}${causeInfo}`;
    } else {
      debug.fallbackReason += ` | SDK also failed: ${sdkMsg}${causeInfo}`;
    }
  }

  // ── FINAL FALLBACK: Keyword matching (honest) ──
  return { results: keywordClassify(text), debug };
}

// ─── Keyword Classification (HONEST fallback — never pretends to be BART) ───
function keywordClassify(text: string): ClassificationResult[] {
  console.log("[classify] Using KEYWORD matching (BART unavailable or failed)");
  const lower = text.toLowerCase();
  const results: ClassificationResult[] = [];

  const labelKeywords: Record<string, string[]> = {
    "Housing Assistance": ["housing", "rent", "shelter", "homeless", "eviction", "evicted", "apartment", "mortgage", "section 8", "losing my home", "no money for rent", "financial help", "utility"],
    "Food Assistance": ["food", "hungry", "groceries", "snap", "meals", "eat", "feeding", "food bank", "ebt", "starving"],
    "Mental Health": ["mental", "depression", "depressed", "anxiety", "anxious", "therapy", "counseling", "ptsd", "stress", "stressed", "emotional", "overwhelmed", "feelings", "alone", "lonely", "isolated", "no one to talk to", "loneliness"],
    "Employment Services": ["job", "employment", "work", "unemployed", "training", "career", "fired", "laid off", "resume", "need money", "no money", "income"],
    "Legal Aid": ["legal", "lawyer", "immigration", "court", "custody", "divorce", "deportation", "rights"],
    "Healthcare": ["medical", "health", "doctor", "insurance", "prescription", "hospital", "clinic", "sick", "pain", "medication", "insulin", "cancer", "dying of", "illness"],
    "Crisis Support": ["suicidal", "crisis", "self-harm", "kill myself", "emergency", "danger", "overdose", "distress"],
    "Senior Services": ["senior", "elderly", "aging", "medicare", "social security", "retirement", "old age", "grandparent", "elder", "older adult"],
    "Veteran Services": ["veteran", "va ", "military", "gi bill", "vfw", "ptsd veteran", "discharge", "service member", "armed forces", "navy", "army", "marines", "air force", "coast guard"],
  };

  for (const [label, keywords] of Object.entries(labelKeywords)) {
    let score = 0;
    let matchCount = 0;

    for (const keyword of keywords) {
      if (lower.includes(keyword)) {
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

// ─── POST Handler ──────────────────────────────────────────
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { text, lat, lng, cityId: explicitCityId } = body;

    const userLat = typeof lat === 'number' && lat >= -90 && lat <= 90 ? lat : undefined;
    const userLng = typeof lng === 'number' && lng >= -180 && lng <= 180 ? lng : undefined;

    // ─── Multi-city resolution: explicit > geolocation > default ───
    let cityId: string = 'houston';
    let cityMatch: CityMatch | null = null;
    let cityLabel = 'Houston, TX';

    if (explicitCityId && SUPPORTED_CITIES.some(c => c.id === explicitCityId)) {
      // (1) User explicitly selected a city
      cityId = explicitCityId;
      const city = SUPPORTED_CITIES.find(c => c.id === cityId)!;
      cityLabel = city.label;
    } else if (userLat !== undefined && userLng !== undefined) {
      // (2) Auto-detect from geolocation
      cityMatch = findNearestCity(userLat, userLng);
      cityId = cityMatch.city.id;
      cityLabel = cityMatch.city.label;
    }
    // (3) Default: Houston (already set)

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

      // Crisis lines tailored to the type of crisis
      const crisisLines = (() => {
        const base = [
          { name: "988 Suicide & Crisis Lifeline", action: "Free. Confidential. 24/7.", call: "988" },
          { name: "Crisis Text Line", action: "Text HOME to 741741", call: "Text" },
          { name: "911", action: "Immediate danger — call now", call: "911" },
        ];

        if (crisisType === 'violence-others') {
          return [
            { name: "988 Suicide & Crisis Lifeline", action: "If you're having thoughts of harming others, support is available. Free. Confidential. 24/7.", call: "988" },
            { name: "Crisis Text Line", action: "Text HOME to 741741", call: "Text" },
            { name: "911", action: "If someone is in immediate danger — call now", call: "911" },
          ];
        }

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

        return base;
      })();

      // Crisis message tailored to type
      const crisisWhy = (() => {
        switch (crisisType) {
          case 'violence-others': return "If you're having thoughts of harming others, support is available. You don't have to face this alone.";
          case 'domestic': return "Your safety is the top priority right now. Help is available.";
          case 'medical': return "This sounds like a medical emergency. Please get help immediately.";
          case 'self-harm': return "You are not alone. Help is available right now.";
          default: return "Your safety is the top priority right now.";
        }
      })();

      const crisisWarning = crisisType === 'violence-others'
        ? "If someone is in immediate danger, call 911."
        : "If you are in immediate physical danger, call 911.";

      const crisisResources = getResourcesForCategory("Crisis Support", cityId, userLat, userLng);

      return NextResponse.json({
        isCrisis: true,
        crisisType,
        crisisLines,
        categories: [{
          label: "Crisis Support",
          confidence: 99,
          resources: crisisResources,
          why: crisisWhy,
          warning: crisisWarning,
        }],
        hasLocation: userLat !== undefined,
        outsideServiceArea: cityMatch ? !cityMatch.isInServiceArea : false,
        serviceArea: cityLabel + ' metro area',
        cityId,
        cityLabel,
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
    const { results: classifications, debug: classificationDebug } = await classifyWithBART(text);

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

    const categoriesWithResources = significantCategories.map(c => ({
      label: c.label,
      confidence: Math.round(c.score * 100),
      resources: getResourcesForCategory(c.label, cityId, userLat, userLng),
      why: classificationSource === 'bart'
        ? 'Matched by BART-large-MNLI semantic analysis of your description.'
        : 'Matched by keyword analysis. For more accurate results, BART AI classification requires an API key.',
      also: significantCategories.length > 1
        ? `You may also benefit from ${significantCategories.slice(1, 3).map(sc => sc.label).join(" and ")} services.`
        : undefined,
      warning: c.score < CLARIFICATION_THRESHOLD
        ? `${Math.round(c.score * 100)}% confidence — consider providing more detail for a better match`
        : undefined,
    }));

    const noResults = categoriesWithResources.length === 0;

    const modelLabel = classificationSource === 'bart'
      ? "BART-large-MNLI (live)"
      : classificationDebug.fallbackUsed && classificationDebug.fetchAttempted
      ? `Keyword matching (BART call failed: ${classificationDebug.fetchStatus ?? classificationDebug.fetchError ?? 'unknown'})`
      : "Keyword matching (BART API key not configured)";

    return NextResponse.json({
      isCrisis: false,
      categories: categoriesWithResources,
      needsClarification: needsClarification || noResults,
      clarificationMessage: noResults
        ? "We couldn't match your description to a specific category. Could you tell us more about what you need help with?"
        : needsClarification
        ? `Your top match scored below 70% confidence — help us help you by answering a quick question`
        : null,
      clarificationQuestions,
      model: modelLabel,
      classificationSource,
      hasLocation: userLat !== undefined,
      outsideServiceArea: cityMatch ? !cityMatch.isInServiceArea : false,
      serviceArea: cityLabel + ' metro area',
      cityId,
      cityLabel,
      // ── DEBUG: Full transparency into classification pipeline ──
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
    version: "4.0.0",
    model: "facebook/bart-large-mnli",
    bartAvailable: hasApiKey,
    classificationMode: hasApiKey ? "BART-large-MNLI (live)" : "Keyword matching (fallback — set HUGGINGFACE_API_KEY)",
    crisisDetection: "regex-based (deterministic)",
    multiCity: true,
    supportedCities: SUPPORTED_CITIES.map(c => ({ id: c.id, label: c.label })),
    labels: LABELS,
  });
}
