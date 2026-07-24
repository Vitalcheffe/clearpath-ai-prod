// ────────────────────────────────────────────────────────────────────────────
// CLEARPATH AI — FRENCH-SPEAKING COUNTRIES RESOURCES DATABASE
// Verified: July 2026
// ────────────────────────────────────────────────────────────────────────────

export type FrenchCategory =
  | "Logement"
  | "Aide alimentaire"
  | "Santé"
  | "Aide juridique"
  | "Emploi"
  | "Santé mentale"
  | "Addictions"
  | "Personnes âgées";

export interface CountryResource {
  name: string;
  category: FrenchCategory;
  description: string;
  phone: string;
  address: string;
  hours: string;
  eligibility: string;
  website: string;
  verified: string;
}

// ─── SUPPORTED FRENCH-SPEAKING COUNTRIES ────────────────────────────────────
export interface SupportedCountry {
  id: string;
  name: string;
  nameFr: string;
  locale: "fr";
  flag: string;
  isoCodes: string[];
}

export const SUPPORTED_COUNTRIES: SupportedCountry[] = [
  { id: "morocco", name: "Morocco", nameFr: "Maroc", locale: "fr", flag: "🇲🇦", isoCodes: ["MA"] },
  { id: "france", name: "France", nameFr: "France", locale: "fr", flag: "🇫🇷", isoCodes: ["FR"] },
  { id: "belgium", name: "Belgium", nameFr: "Belgique", locale: "fr", flag: "🇧🇪", isoCodes: ["BE"] },
  { id: "switzerland", name: "Switzerland", nameFr: "Suisse", locale: "fr", flag: "🇨🇭", isoCodes: ["CH"] },
  { id: "canada", name: "Canada (Quebec)", nameFr: "Canada (Québec)", locale: "fr", flag: "🇨🇦", isoCodes: ["CA"] },
];

// ─── MOROCCO RESOURCES (8 organizations — all 8 categories) ─────────────────
export const MOROCCO_RESOURCES: CountryResource[] = [
  {
    name: "Croissant-Rouge Marocain",
    category: "Aide alimentaire",
    description:
      "Le Croissant-Rouge Marocain est la Société nationale de la Croix-Rouge et du Croissant-Rouge au Maroc, reconnue d'utilité publique. Il intervient en secours d'urgence et en action sociale, notamment via la distribution d'aide alimentaire aux populations vulnérables.",
    phone: "+212 5 37 65 35 49",
    address: "Palais Mokri, Takkadoum, B.P. 189, Rabat 10190",
    hours: "Siège ouvert en semaine — horaires sur croissant-rouge.ma",
    eligibility: "Tout public en situation de vulnérabilité ou victime de catastrophe",
    website: "https://croissant-rouge.ma",
    verified: "July 2026",
  },
  {
    name: "Association de Lutte Contre le Sida (ALCS)",
    category: "Santé",
    description:
      "L'ALCS, fondée en 1988, est la plus ancienne association de lutte contre le VIH au Maroc. Elle propose un dépistage anonyme et gratuit du VIH et des IST, des consultations médicales et un accompagnement psychosocial.",
    phone: "+212 5 22 22 31 13",
    address: "Rue Salim Cherkaoui, Quartier des hôpitaux, Casablanca",
    hours: "Permanences de dépistage — horaires sur alcs.ma",
    eligibility: "Tout public ; dépistage anonyme et gratuit du VIH et des IST",
    website: "https://alcs.ma",
    verified: "July 2026",
  },
  {
    name: "Agence Nationale de Promotion de l'Emploi et des Compétences (ANAPEC)",
    category: "Emploi",
    description:
      "L'ANAPEC est l'établissement public marocain chargé de la promotion de l'emploi et des compétences. Elle accompagne les chercheurs d'emploi et les entreprises à travers l'orientation, l'insertion professionnelle et le placement sur le marché du travail.",
    phone: "+212 5 37 77 45 92",
    address: "40, avenue Al Oumam Al Mouttahida (ex-Nations Unies), Rabat",
    hours: "Agences ouvertes en semaine — horaires sur anapec.org",
    eligibility: "Chercheurs d'emploi et entreprises établis au Maroc",
    website: "https://www.anapec.org",
    verified: "July 2026",
  },
  {
    name: "Ligue Pour La Santé Mentale",
    category: "Santé mentale",
    description:
      "La Ligue Pour La Santé Mentale, fondée en 1979, œuvre pour l'amélioration des conditions de soins et d'accueil des personnes atteintes de troubles mentaux au Maroc. Elle sensibilise les familles, les autorités et les professionnels de santé.",
    phone: "+212 5 22 27 39 51",
    address: "Centre psychiatrique universitaire Ibn Rochd, boulevard Tarik Ibn Ziad, Casablanca",
    hours: "Horaires du centre — voir liguesantementle.ma",
    eligibility: "Personnes atteintes de troubles mentaux, leurs familles et professionnels de santé",
    website: "https://liguesantementle.ma",
    verified: "July 2026",
  },
  {
    name: "Groupe Al Omrane",
    category: "Logement",
    description:
      "Le Groupe Al Omrane est le principal opérateur public marocain du logement et de l'aménagement urbain. Il pilote les programmes de logement social et les opérations de relogement des ménages à revenus modestes.",
    phone: "+212 5 37 56 91 91",
    address: "Rue Boundoq, Mail Central, Hay Riad, Rabat",
    hours: "Siège ouvert en semaine — horaires sur alomrane.gov.ma",
    eligibility: "Ménages à revenus modestes éligibles aux programmes de logement social de l'État",
    website: "https://www.alomrane.gov.ma",
    verified: "July 2026",
  },
  {
    name: "Fondation Hassan II pour les Marocains Résidant à l'Étranger (FH2MRE)",
    category: "Aide juridique",
    description:
      "La Fondation Hassan II pour les MRE accompagne les Marocains résidant à l'étranger et leurs familles dans leurs démarches administratives, juridiques et sociales, avec un service d'assistance juridique dédié.",
    phone: "+212 5 37 27 46 50",
    address: "67, boulevard Ibn Sina, Agdal, Rabat",
    hours: "Bureau ouvert en semaine — horaires sur fh2mre.ma",
    eligibility: "Marocains résidant à l'étranger (MRE) et leurs familles",
    website: "https://www.fh2mre.ma",
    verified: "July 2026",
  },
  {
    name: "Fondation Mohammed V pour la Solidarité (FM5)",
    category: "Personnes âgées",
    description:
      "La Fondation Mohammed V pour la Solidarité, reconnue d'utilité publique depuis 1999, lutte contre la pauvreté et la marginalisation sociale au Maroc. Elle gère des centres sociaux et distribue une aide alimentaire et matérielle.",
    phone: "+212 5 37 26 36 37",
    address: "3, rue Arrissani, quartier Hassan, B.P. 4253, Rabat",
    hours: "Siège ouvert en semaine — horaires sur fm5.ma",
    eligibility: "Personnes en situation de précarité, marginalisées et personnes âgées sans ressources",
    website: "https://www.fm5.ma",
    verified: "July 2026",
  },
  {
    name: "Association Marocaine d'Addictologie (AMA)",
    category: "Addictions",
    description:
      "L'AMA, fondée en 2014, est une association scientifique à but non lucratif leader dans le domaine des addictions au Maroc. Elle œuvre pour la prévention, la formation et l'amélioration de la prise en charge des troubles addictifs.",
    phone: "+212 6 65 24 68 23",
    address: "Hôpital Psychiatrique Universitaire Ar-Razi, Salé",
    hours: "Horaires — voir ama-maroc.com",
    eligibility: "Professionnels de santé et public concerné par les troubles addictifs",
    website: "https://ama-maroc.com",
    verified: "July 2026",
  },
];

// ─── FRANCE RESOURCES (8 organizations — all 8 categories) ──────────────────
export const FRANCE_RESOURCES: CountryResource[] = [
  {
    name: "Les Restos du Cœur",
    category: "Aide alimentaire",
    description:
      "Les Restos du Cœur, fondés par Coluche en 1985, distribuent des repas et des colis alimentaires aux personnes en situation de précarité sur tout le territoire français. L'association propose également un accompagnement social vers l'emploi et le logement.",
    phone: "+33 1 53 32 23 23",
    address: "42, rue de Clichy, 75009 Paris",
    hours: "Siège — voir restosducoeur.org pour les centres locaux",
    eligibility: "Personnes et familles en situation de précarité (sur justificatif de ressources)",
    website: "https://www.restosducoeur.org",
    verified: "July 2026",
  },
  {
    name: "115 — Samusocial de Paris",
    category: "Logement",
    description:
      "Le 115 est le numéro d'urgence sociale national, gratuit et joignable 24h/24 et 7j/7, qui oriente les personnes sans abri vers une solution d'hébergement. À Paris, il est opéré par le Samusocial de Paris.",
    phone: "115",
    address: "35, avenue de Courteline, 75012 Paris",
    hours: "24h/24 et 7j/7 (numéro gratuit)",
    eligibility: "Toute personne sans abri ou sans solution d'hébergement d'urgence",
    website: "https://www.samusocial.paris",
    verified: "July 2026",
  },
  {
    name: "Médecins du Monde",
    category: "Santé",
    description:
      "Médecins du Monde est une ONG d'aide médicale humanitaire qui vient en aide aux populations vulnérables en France et à l'international. En France, ses missions proposent des consultations médicales, sociales et juridiques gratuites.",
    phone: "+33 1 44 92 15 15",
    address: "84, avenue du Président Wilson, 93210 La Plaine-Saint-Denis",
    hours: "Permanences médicales et sociales — horaires sur medecinsdumonde.org",
    eligibility: "Personnes éloignées du système de soins, sans couverture sociale ou en précarité",
    website: "https://www.medecinsdumonde.org",
    verified: "July 2026",
  },
  {
    name: "France Victimes",
    category: "Aide juridique",
    description:
      "France Victimes fédère plus de 130 associations d'aide aux victimes et gère le numéro national d'aide aux victimes. Elle offre une écoute, un accompagnement juridique et psychologique gratuit aux personnes victimes d'infraction.",
    phone: "116 006",
    address: "27, avenue Parmentier, 75011 Paris",
    hours: "Tous les jours de 9h à 20h (appel gratuit)",
    eligibility: "Toute personne victime d'infraction, gratuitement",
    website: "https://www.france-victimes.fr",
    verified: "July 2026",
  },
  {
    name: "Mission Locale de Paris",
    category: "Emploi",
    description:
      "Le réseau des Missions Locales accompagne les jeunes de 16 à 25 ans vers l'emploi, la formation et l'autonomie sociale. Chaque Mission Locale propose un suivi personnalisé et un accès à des dispositifs d'insertion professionnelle.",
    phone: "+33 1 75 43 32 32",
    address: "54, rue de Paradis, 75010 Paris",
    hours: "Lun–jeu 9h15–12h00 / 14h00–16h00 ; ven 9h15–12h00",
    eligibility: "Jeunes de 16 à 25 ans sortis du système scolaire (antennes sur tout le territoire)",
    website: "https://www.missionlocale.paris",
    verified: "July 2026",
  },
  {
    name: "Psycom",
    category: "Santé mentale",
    description:
      "Le Psycom est un centre collaborateur de l'OMS qui informe et sensibilise le public à la santé mentale et à la psychiatrie. Il produit des ressources accessibles pour comprendre les troubles psychiques et oriente vers les structures d'aide.",
    phone: "+33 1 45 65 76 47",
    address: "11, rue Cabanis, 75014 Paris",
    hours: "Bureau ouvert en semaine — voir psycom.org",
    eligibility: "Tout public cherchant information et orientation en santé mentale",
    website: "https://www.psycom.org",
    verified: "July 2026",
  },
  {
    name: "Addictions France (ex-ANPAA)",
    category: "Addictions",
    description:
      "Addictions France prévient et accompagne les conduites addictives : alcool, tabac, drogues et addictions comportementales. Son réseau de professionnels propose des consultations, des groupes de parole et un soutien aux personnes concernées et à leurs proches.",
    phone: "+33 1 42 33 51 04",
    address: "20, rue Saint-Fiacre, 75002 Paris",
    hours: "Lundi–vendredi 9h00–17h00",
    eligibility: "Toute personne confrontée à une addiction et ses proches (consultations gratuites)",
    website: "https://addictions-france.org",
    verified: "July 2026",
  },
  {
    name: "Petits Frères des Pauvres",
    category: "Personnes âgées",
    description:
      "Les Petits Frères des Pauvres luttent depuis 1946 contre l'isolement et la solitude des personnes âgées, en priorité les plus fragiles. L'association propose des visites, un accompagnement et des séjours pour rompre la solitude des seniors.",
    phone: "+33 1 49 23 13 00",
    address: "19, Cité Voltaire, 75011 Paris",
    hours: "Siège ouvert en semaine — voir petitsfreresdespauvres.fr",
    eligibility: "Personnes âgées isolées ou en précarité, dès 50 ans pour certains dispositifs",
    website: "https://www.petitsfreresdespauvres.fr",
    verified: "July 2026",
  },
];

// ─── COUNTRY → RESOURCES MAPPING ────────────────────────────────────────────
export const COUNTRY_RESOURCES: Record<string, CountryResource[]> = {
  morocco: MOROCCO_RESOURCES,
  france: FRANCE_RESOURCES,
  belgium: FRANCE_RESOURCES,
  switzerland: FRANCE_RESOURCES,
  canada: FRANCE_RESOURCES,
};

// ─── COUNTRY DETECTION FROM ISO CODE ────────────────────────────────────────
export function getCountryFromIsoCode(isoCode: string): SupportedCountry | null {
  const code = isoCode.toUpperCase();
  return SUPPORTED_COUNTRIES.find((c) => c.isoCodes.includes(code)) ?? null;
}

// ─── GET RESOURCES BY COUNTRY + CATEGORY ────────────────────────────────────
export function getResourcesByCategoryForCountry(
  countryId: string,
  category: string
): CountryResource[] {
  const resources = COUNTRY_RESOURCES[countryId] ?? [];
  return resources.filter((r) => r.category === category);
}

// ─── FRENCH BART CATEGORY LABELS ────────────────────────────────────────────
export const FRENCH_BART_LABELS: { label: string; displayKey: string }[] = [
  {
    label: "logement, aide au logement, hébergement d'urgence, expulsion, sans-abri, logement social, loyer impayé",
    displayKey: "Logement",
  },
  {
    label: "aide alimentaire, repas, colis alimentaire, faim, banque alimentaire, nourriture, insécurité alimentaire",
    displayKey: "Aide alimentaire",
  },
  {
    label: "santé, soins médicaux, médecin, hôpital, consultation gratuite, accès aux soins, couverture maladie",
    displayKey: "Santé",
  },
  {
    label: "aide juridique, avocat, procédure, tribunal, droit, justice, assistance juridique, conseil juridique",
    displayKey: "Aide juridique",
  },
  {
    label: "emploi, recherche d'emploi, formation professionnelle, chômage, insertion professionnelle, recrutement",
    displayKey: "Emploi",
  },
  {
    label: "santé mentale, dépression, anxiété, troubles psychiques, souffrance psychologique, soutien psychologique",
    displayKey: "Santé mentale",
  },
  {
    label: "addictions, alcool, drogue, dépendance, sevrage, toxicomanie, conduites addictives",
    displayKey: "Addictions",
  },
  {
    label: "personnes âgées, seniors, isolation, perte d'autonomie, maison de retraite, accompagnement seniors",
    displayKey: "Personnes âgées",
  },
];
