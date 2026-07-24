// ────────────────────────────────────────────────────────────────────────────
// CLEARPATH AI — FRENCH TRANSLATIONS (FRANÇAIS)
// ────────────────────────────────────────────────────────────────────────────

import type { Translations } from "./en";

export const fr: Translations = {
  // ─── Locale metadata ──────────────────────────────────────────────────────
  locale: "fr",
  label: "Français",
  flag: "🇫🇷",

  // ─── Navigation ───────────────────────────────────────────────────────────
  nav: {
    howItWorks: "Comment ça marche",
    about: "À propos",
    responsibleAI: "IA Responsable",
    blog: "Blog",
    team: "Équipe",
    contact: "Contact",
    more: "Plus",
    tryClearPath: "Essayer ClearPath AI",
    menu: "Menu",
    closeMenu: "Fermer le menu",
    toggleMenu: "Ouvrir le menu",
    privacy: "Confidentialité",
    terms: "Conditions",
  },

  // ─── Hero ─────────────────────────────────────────────────────────────────
  hero: {
    tagline: "Quand ça compte le plus, l'honnêteté est la réponse la plus sûre.",
    title: "Trouvez une aide à laquelle vous pouvez vraiment faire confiance.",
    subtitle:
      "Ressources communautaires vérifiées avec un niveau de confiance calibré. Classifiées, non générées. Chaque résultat explique pourquoi il correspond, ce que nous avons aussi envisagé, et à quel point nous sommes sûrs.",
    cta: "Obtenir de l'aide maintenant",
    secondaryCta: "Voir comment ça marche",
    badge: "Gratuit • Anonyme • 24h/24 et 7j/7",
  },

  // ─── Navigator (the main app) ─────────────────────────────────────────────
  navigator: {
    title: "Décrivez votre situation",
    subtitle: "Dans vos propres mots. Nous trouverons les ressources adaptées — et nous vous dirons à quel point nous sommes confiants.",
    inputLabel: "Que se passe-t-il ?",
    placeholder: "J'ai perdu mon emploi et je ne peux plus payer mon loyer. Mes enfants ont besoin de nourriture...",
    submit: "Trouver des ressources",
    analyzing: "Analyse en cours...",
    changeCity: "Changer de ville",
    changeCountry: "Changer de pays",
    detectedCity: "Détecté : {city}",
    detectedCountry: "Détecté : {country}",
    clear: "Effacer",
    tryExample: "Essayez un exemple :",
    examples: {
      multiNeed: "J'ai perdu mon emploi et je ne peux plus payer mon loyer. Mes enfants ont besoin de nourriture.",
      crisis: "Je n'en peux plus. Je veux que ça s'arrête.",
      senior: "J'ai 78 ans et j'ai besoin qu'on me livre des courses.",
      veteran: "Je suis un ancien combattant avec un SSPT et des problèmes de logement.",
    },
  },

  // ─── Results ──────────────────────────────────────────────────────────────
  results: {
    title: "Ressources pour vous",
    subtitle: "D'après ce que vous avez décrit, voici ce que nous avons trouvé.",
    confidence: "Confiance de l'IA",
    why: "Pourquoi cette correspondance",
    alsoConsidered: "Ce que nous avons aussi envisagé",
    callNow: "Appeler maintenant",
    visitWebsite: "Visiter le site",
    hours: "Horaires",
    eligibility: "Éligibilité",
    address: "Adresse",
    phone: "Téléphone",
    verified: "Vérifié",
    noResults: "Aucune ressource trouvée pour cette catégorie.",
    talkToNavigator: "Parler à un conseiller",
    notConfident: "Je ne suis pas assez sûr — clarifions",
    clarifQuestion: "Pouvez-vous m'en dire un peu plus ?",
    clarifSubtitle: "Votre réponse nous aide à cibler les bonnes ressources.",
    clarifSubmit: "Trouver des ressources",
    clarifSkip: "Passer et montrer ce que vous avez",
    backToInput: "Décrire une autre situation",
    highConfidence: "Forte confiance",
    mediumConfidence: "Confiance moyenne — lisez attentivement",
    lowConfidence: "Confiance faible — envisagez de clarifier",
    multiMatch: "Plusieurs besoins détectés",
    multiMatchDesc: "Votre situation couvre plusieurs catégories. Nous avons affiché des ressources pour chacune.",
    categories: {
      housing: "Aide au logement",
      food: "Aide alimentaire",
      healthcare: "Santé",
      legal: "Aide juridique",
      employment: "Emploi",
      senior: "Personnes âgées",
      veteran: "Anciens combattants",
      mental: "Santé mentale",
      substance: "Addictions",
      crisis: "Soutien de crise",
      logement: "Logement",
      "aide alimentaire": "Aide alimentaire",
      santé: "Santé",
      "aide juridique": "Aide juridique",
      emploi: "Emploi",
      "santé mentale": "Santé mentale",
      addictions: "Addictions",
      "personnes âgées": "Personnes âgées",
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
    title: "Vous comptez.",
    subtitle: "Si vous êtes en danger immédiat, contactez-nous tout de suite. Vous n'êtes pas seul(e).",
    callNow: "Appeler maintenant",
    textLine: "Ligne texto",
    dismiss: "Je comprends — montrez-moi les ressources quand même",
    warning: "S'il s'agit d'une urgence vitale, appelez le {number} immédiatement.",
    resources: {
      suicide: {
        title: "Ligne de prévention du suicide",
        desc: "Soutien gratuit et confidentiel 24h/24 et 7j/7 pour les personnes en détresse.",
        number: "3114",
      },
      dv: {
        title: "Violences Femmes Infos",
        desc: "Soutien confidentiel 24h/24 pour toute personne victime de violences.",
        number: "3919",
      },
      crisisText: {
        title: "SAMU Social",
        desc: "Numéro d'urgence sociale gratuit 24h/24 pour les personnes sans abri.",
        number: "115",
      },
    },
  },

  // ─── Countries & Regions ──────────────────────────────────────────────────
  countries: {
    selectCountry: "Sélectionnez votre pays",
    us: "États-Unis",
    morocco: "Maroc",
    france: "France",
    belgium: "Belgique",
    switzerland: "Suisse",
    canada: "Canada (Québec)",
    detected: "Détecté automatiquement depuis votre position",
    notSupported: "Hors de notre zone de couverture — affichage des ressources nationales",
  },

  // ─── Language Toggle ──────────────────────────────────────────────────────
  language: {
    toggle: "Changer de langue",
    en: "English",
    fr: "Français",
    detected: "Détecté depuis votre position",
  },

  // ─── Misc / Footer ────────────────────────────────────────────────────────
  misc: {
    loading: "Chargement...",
    error: "Une erreur s'est produite. Veuillez réessayer.",
    retry: "Réessayer",
    back: "Retour",
    close: "Fermer",
    poweredBy: "Propulsé par une IA calibrée",
  },
};
