// ────────────────────────────────────────────────────────────────────────────
// CLEARPATH AI — ENGLISH TRANSLATIONS (DEFAULT)
// ────────────────────────────────────────────────────────────────────────────

export const en = {
  // ─── Locale metadata ──────────────────────────────────────────────────────
  locale: "en" as "en" | "fr",
  label: "English",
  flag: "🇺🇸",

  // ─── Navigation ───────────────────────────────────────────────────────────
  nav: {
    howItWorks: "How It Works",
    about: "About",
    responsibleAI: "Responsible AI",
    blog: "Blog",
    team: "Team",
    contact: "Contact",
    more: "More",
    tryClearPath: "Try ClearPath AI",
    menu: "Menu",
    closeMenu: "Close menu",
    toggleMenu: "Toggle menu",
    privacy: "Privacy",
    terms: "Terms",
  },

  // ─── Hero ─────────────────────────────────────────────────────────────────
  hero: {
    tagline: "When it matters most, honesty is the safest answer.",
    title: "Find help you can actually trust.",
    subtitle:
      "Verified community resources with calibrated confidence. Classified, not generated. Every result shows why it matched, what else we considered, and how sure we are.",
    cta: "Get help now",
    secondaryCta: "See how it works",
    badge: "Free • Anonymous • 24/7",
  },

  // ─── Navigator (the main app) ─────────────────────────────────────────────
  navigator: {
    title: "Describe your situation",
    subtitle: "In your own words. We'll find the right resources — and tell you how confident we are.",
    inputLabel: "What's going on?",
    placeholder: "I lost my job and can't pay rent. My kids need food...",
    submit: "Find resources",
    analyzing: "Analyzing...",
    changeCity: "Change city",
    changeCountry: "Change country",
    detectedCity: "Detected: {city}",
    detectedCountry: "Detected: {country}",
    clear: "Clear",
    tryExample: "Try an example:",
    examples: {
      multiNeed: "I lost my job and can't pay rent. My kids need food.",
      crisis: "I can't take this anymore. I want it all to end.",
      senior: "I'm 78 and need groceries delivered.",
      veteran: "I'm a veteran with PTSD and housing issues.",
    },
  },

  // ─── Results ──────────────────────────────────────────────────────────────
  results: {
    title: "Resources for you",
    subtitle: "Based on what you described, here's what we found.",
    confidence: "AI Confidence",
    why: "Why this match",
    alsoConsidered: "What else we considered",
    callNow: "Call now",
    visitWebsite: "Visit website",
    hours: "Hours",
    eligibility: "Eligibility",
    address: "Address",
    phone: "Phone",
    verified: "Verified",
    noResults: "No resources found for this category.",
    talkToNavigator: "Talk to a navigator",
    notConfident: "I'm not confident enough — let's clarify",
    clarifQuestion: "Can you tell me a little more?",
    clarifSubtitle: "Your answer helps us narrow down the right resources.",
    clarifSubmit: "Find resources",
    clarifSkip: "Skip and show me what you have",
    backToInput: "Describe a different situation",
    highConfidence: "High confidence",
    mediumConfidence: "Medium confidence — read carefully",
    lowConfidence: "Low confidence — consider clarifying",
    multiMatch: "Multiple needs detected",
    multiMatchDesc: "Your situation spans multiple categories. We've surfaced resources for each.",
    categories: {
      housing: "Housing Assistance",
      food: "Food Assistance",
      healthcare: "Healthcare",
      legal: "Legal Aid",
      employment: "Employment",
      senior: "Senior Support",
      veteran: "Veteran Support",
      mental: "Mental Health",
      substance: "Substance Use",
      crisis: "Crisis Support",
      logement: "Housing Assistance",
      "aide alimentaire": "Food Assistance",
      santé: "Healthcare",
      "aide juridique": "Legal Aid",
      emploi: "Employment",
      "santé mentale": "Mental Health",
      addictions: "Substance Use",
      "personnes âgées": "Senior Support",
    },
    categoryColors: {
      housing: "#3b82f6",
      food: "#10b981",
      healthcare: "#ef4444",
      legal: "#8b5cf6",
      employment: "#f59e0b",
      senior: "#6366f1",
      veteran: "#0ea5e9",
      mental: "#ec4899",
      substance: "#f97316",
      crisis: "#dc2626",
    },
  },

  // ─── Crisis Overlay ───────────────────────────────────────────────────────
  crisis: {
    title: "You matter.",
    subtitle: "If you are in immediate danger, please reach out right now. You are not alone.",
    callNow: "Call now",
    textLine: "Text line",
    dismiss: "I understand — show me resources anyway",
    warning: "If this is a life-threatening emergency, call {number} immediately.",
    resources: {
      suicide: {
        title: "Suicide & Crisis Lifeline",
        desc: "24/7 free and confidential support for people in distress.",
        number: "988",
      },
      dv: {
        title: "Domestic Violence Hotline",
        desc: "24/7 confidential support for anyone affected by domestic violence.",
        number: "1-800-799-7233",
      },
      crisisText: {
        title: "Crisis Text Line",
        desc: "Text HOME to 741741 from anywhere in the US, anytime, about any type of crisis.",
        number: "Text HOME to 741741",
      },
    },
  },

  // ─── Countries & Regions ──────────────────────────────────────────────────
  countries: {
    selectCountry: "Select your country",
    us: "United States",
    morocco: "Morocco",
    france: "France",
    belgium: "Belgium",
    switzerland: "Switzerland",
    canada: "Canada (Quebec)",
    detected: "Auto-detected from your location",
    notSupported: "Outside our service area — showing national resources",
  },

  // ─── Language Toggle ──────────────────────────────────────────────────────
  language: {
    toggle: "Switch language",
    en: "English",
    fr: "Français",
    detected: "Detected from your location",
  },

  // ─── Misc / Footer ────────────────────────────────────────────────────────
  misc: {
    loading: "Loading...",
    error: "Something went wrong. Please try again.",
    retry: "Try again",
    back: "Back",
    close: "Close",
    poweredBy: "Powered by calibrated AI",
  },
};

export type Translations = typeof en;
