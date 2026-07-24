// ────────────────────────────────────────────────────────────────────────────
// CLEARPATH AI — SWISS (ROMANDY) CITIES COMMUNITY RESOURCES DATABASE
// Verified: July 2026
// All phone numbers and addresses were web-verified (July 2026) via the
// organizations' official .ch sites (hug.ch, chuv.ch, caritas-regio.ch,
// croix-rouge-ge.ch, croixrougevaudoise.ch, fva.ch, colisducoeur.ch,
// lausanne.ch, ge.ch) and cross-checked on local.ch / search.ch.
// Swiss national emergency numbers: 144 (medical), 117 (police),
// 118 (fire), 143 (main sociale), 147 (Pro Juventute youth), 0848 133 133
// (non-vital medical emergencies CHUV).
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

export interface FrenchCity {
  id: string;
  name: string;
  nameFr: string;
  countryId: string;
  lat: number;
  lng: number;
  metroRadiusKm: number;
}

export interface FrenchCityResource {
  city: "Paris" | "Marseille" | "Lyon" | "Toulouse" | "Geneva" | "Lausanne";
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

// ─── SUPPORTED SWISS (ROMANDY) CITIES ───────────────────────────────────────
export const SWISS_CITIES: FrenchCity[] = [
  { id: "geneva", name: "Geneva", nameFr: "Genève", countryId: "switzerland", lat: 46.2044, lng: 6.1432, metroRadiusKm: 20 },
  { id: "lausanne", name: "Lausanne", nameFr: "Lausanne", countryId: "switzerland", lat: 46.5197, lng: 6.6323, metroRadiusKm: 20 },
];

// ─── SWISS CITY RESOURCES (6 per city × 2 cities = 12 total) ─────────────────
export const SWISS_CITY_RESOURCES: FrenchCityResource[] = [
  // ═══════════════════════════════════════════════════════════════════════════
  // GENEVA (GENÈVE) — Canton de Genève (6 resources)
  // ═══════════════════════════════════════════════════════════════════════════
  {
    city: "Geneva",
    name: "Hôpitaux Universitaires de Genève (HUG) — Urgences",
    category: "Santé",
    description:
      "Les HUG sont le principal établissement hospitalier du canton de Genève et accueillent les urgences médicales adultes et pédiatriques 24h/24. En cas d'urgence vitale, le 144 (ambulance sanitaire) joignable gratuitement mobilise les secours immédiatement.",
    phone: "022 372 33 11",
    address: "Rue Gabrielle-Perret-Gentil 4, 1205 Genève",
    hours: "Urgences 24h/24 et 7j/7 ; centrale téléphonique Lu–Ve (urgences vitales : 144)",
    eligibility: "Toute personne présente sur le territoire genevois ; urgences ouvertes à tous",
    website: "https://www.hug.ch",
    verified: "July 2026",
  },
  {
    city: "Geneva",
    name: "Service des spécialités psychiatriques — HUG",
    category: "Santé mentale",
    description:
      "Le Service des spécialités psychiatriques des HUG assure les consultations ambulatoires et les hospitalisations en psychiatrie pour les adultes du canton de Genève. Les urgences psychiatriques sont joignables 24h/24 au 022 372 38 62.",
    phone: "022 305 45 11",
    address: "Rue de Lausanne 20 bis, 1201 Genève",
    hours: "Consultations sur rendez-vous Lu–Ve ; urgences psychiatriques 24h/24 au 022 372 38 62",
    eligibility: "Adultes résidant dans le canton de Genève (consultation sur rendez-vous)",
    website: "https://www.hug.ch/specialites-psychiatriques",
    verified: "July 2026",
  },
  {
    city: "Geneva",
    name: "Service d'addictologie — HUG (CAAP)",
    category: "Addictions",
    description:
      "Le Centre ambulatoire d'addictologie psychiatrique (CAAP) du Service d'addictologie des HUG propose des consultations et un suivi spécialisé pour les personnes concernées par les addictions (alcool, substances, comportements). Il accueille également les proches dans une démarche d'accompagnement.",
    phone: "022 372 57 50",
    address: "Rue du Grand-Pré 70C, 1202 Genève",
    hours: "Lundi à vendredi, 8h30–18h00",
    eligibility: "Personnes concernées par une addiction et leurs proches (canton de Genève)",
    website: "https://www.hug.ch/addictologie",
    verified: "July 2026",
  },
  {
    city: "Geneva",
    name: "Fondation Colis du Cœur — Genève",
    category: "Aide alimentaire",
    description:
      "La Fondation Colis du Cœur distribue des denrées alimentaires aux personnes en situation de précarité dans le canton de Genève, depuis ses locaux de Carouge. L'inscription préalable permet de bénéficier d'une distribution régulière de colis.",
    phone: "022 300 27 59",
    address: "Rue Blavignac 16, 1227 Carouge",
    hours: "Accueil téléphonique lundi 9h00–12h00 ; distributions sur inscription (voir site)",
    eligibility: "Personnes en situation de précarité domiciliées dans le canton de Genève",
    website: "https://colisducoeur.ch",
    verified: "July 2026",
  },
  {
    city: "Geneva",
    name: "Caritas Genève",
    category: "Aide juridique",
    description:
      "Caritas Genève lutte contre la pauvreté et l'exclusion en proposant un accompagnement social, des conseils juridiques et un accès aux droits aux personnes en difficulté du canton. Elle anime également des programmes d'insertion et de soutien aux aîné·e·s.",
    phone: "022 708 04 44",
    address: "Rue de Carouge 53, 1205 Genève",
    hours: "Lundi à vendredi 8h00–12h00 ; standard téléphonique 9h00–12h00 et 13h30–17h00",
    eligibility: "Personnes en difficulté résidant dans le canton de Genève",
    website: "https://www.caritas-geneve.ch",
    verified: "July 2026",
  },
  {
    city: "Geneva",
    name: "Croix-Rouge genevoise",
    category: "Personnes âgées",
    description:
      "La Croix-Rouge genevoise déploie des services d'aide et de soins à domicile, de transport et de lutte contre l'isolement au bénéfice des personnes âgées du canton. Elle propose aussi un accompagnement des proches aidants et des activités de maintien à domicile.",
    phone: "022 304 04 04",
    address: "Route des Acacias 9, 1227 Les Acacias (1211 Genève 4)",
    hours: "Lundi à jeudi 8h30–12h15 et 13h30–17h30 ; vendredi 8h30–12h15 et 13h30–17h00",
    eligibility: "Personnes âgées et leurs proches aidants dans le canton de Genève",
    website: "https://www.croix-rouge-ge.ch",
    verified: "July 2026",
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // LAUSANNE — Canton de Vaud (6 resources)
  // ═══════════════════════════════════════════════════════════════════════════
  {
    city: "Lausanne",
    name: "CHUV — Service des urgences",
    category: "Santé",
    description:
      "Le Centre Hospitalier Universitaire Vaudois (CHUV) est l'hôpital cantonal de référence du canton de Vaud et assure les urgences vitales et non vitales pour adultes et enfants. Le 144 (urgences vitales) et le 0848 133 133 (urgences non vitales) sont joignables 24h/24.",
    phone: "021 314 11 11",
    address: "Rue du Bugnon 46, 1011 Lausanne",
    hours: "Urgences 24h/24 et 7j/7 ; centrale téléphonique Lu–Ve (urgences vitales : 144)",
    eligibility: "Toute personne présente sur le territoire vaudois ; urgences ouvertes à tous",
    website: "https://www.chuv.ch",
    verified: "July 2026",
  },
  {
    city: "Lausanne",
    name: "Département de psychiatrie du CHUV — Site de Cery",
    category: "Santé mentale",
    description:
      "Le Département de psychiatrie du CHUV, situé sur le site de Cery à Prilly (région lausannoise), assure les soins psychiatriques publics du canton de Vaud : consultations, hospitalisations et urgences. Les urgences psychiatriques sont joignables 24h/24 au 0848 133 133 ou au 144.",
    phone: "021 314 31 11",
    address: "Route de Cery 60, 1008 Prilly",
    hours: "Urgences psychiatriques 24h/24 ; consultations sur rendez-vous Lu–Ve",
    eligibility: "Adultes du canton de Vaud (consultations sur rendez-vous ; urgences pour tous)",
    website: "https://www.chuv.ch/psychiatrie",
    verified: "July 2026",
  },
  {
    city: "Lausanne",
    name: "Fondation vaudoise contre l'alcoolisme (FVA)",
    category: "Addictions",
    description:
      "La FVA accompagne les personnes confrontées à des problèmes liés à l'alcool, ainsi que leurs proches, par des consultations individuelles et des groupes de parole. Elle mène également des actions de prévention et de formation sur tout le canton de Vaud.",
    phone: "021 623 84 84",
    address: "Avenue de Provence 4, 1007 Lausanne",
    hours: "Lundi à jeudi 8h30–12h00 et 13h30–17h00 ; vendredi 8h30–12h00",
    eligibility: "Personnes concernées par l'alcool et leurs proches (canton de Vaud)",
    website: "https://www.fva.ch",
    verified: "July 2026",
  },
  {
    city: "Lausanne",
    name: "Cartons du Cœur — Lausanne",
    category: "Aide alimentaire",
    description:
      "Les Cartons du Cœur Lausanne distribuent des denrées alimentaires aux personnes en situation de précarité domiciliées à Lausanne, dans le cadre de la Fédération vaudoise des Cartons du Cœur. L'inscription préalable et un justificatif de domicile permettent l'accès aux distributions hebdomadaires.",
    phone: "021 616 02 18",
    address: "Rue de Genève 77, 1004 Lausanne",
    hours: "Distributions hebdomadaires ; appeler pour connaître les horaires et s'inscrire",
    eligibility: "Personnes dans le besoin domiciliées à Lausanne (sauf code postal 1012, rattaché à Pully)",
    website: "https://www.lausanne.ch/vie-pratique/aides-assurances-sociales/prestations-sociales/cartons-du-coeur-aide-alimentaire.html",
    verified: "July 2026",
  },
  {
    city: "Lausanne",
    name: "Service social Lausanne — Centre social régional (CSR)",
    category: "Logement",
    description:
      "Le Service social Lausanne, via son Centre social régional, accompagne les habitants en difficulté sociale et financière, notamment pour l'accès au logement, au revenu d'insertion (RI) et aux assurances sociales. Des assistant·e·s sociaux·ales proposent un suivi individualisé.",
    phone: "021 315 75 11",
    address: "Place Chauderon 4, 1001 Lausanne",
    hours: "Lundi à vendredi 8h30–11h45 et 13h00–16h30 (fermé jeudi matin)",
    eligibility: "Habitants de Lausanne en difficulté sociale et financière",
    website: "https://www.lausanne.ch/officiel/administration/sport-et-cohesion-sociale/social.html",
    verified: "July 2026",
  },
  {
    city: "Lausanne",
    name: "Croix-Rouge vaudoise",
    category: "Personnes âgées",
    description:
      "La Croix-Rouge vaudoise propose des services d'aide et de soins à domicile, de repas et de transport au bénéfice des personnes âgées du canton de Vaud. Elle développe aussi des programmes de lutte contre l'isolement et de soutien aux proches aidants.",
    phone: "021 340 00 70",
    address: "Rue Beau-Séjour 9–13, 1003 Lausanne",
    hours: "Lundi à vendredi ; consulter le site web pour les horaires détaillés des services",
    eligibility: "Personnes âgées et leurs proches aidants dans le canton de Vaud",
    website: "https://croixrougevaudoise.ch",
    verified: "July 2026",
  },
];

// ─── HELPER: GET RESOURCES BY SWISS CITY ────────────────────────────────────
export function getResourcesForSwissCity(cityId: string): FrenchCityResource[] {
  const city = SWISS_CITIES.find((c) => c.id === cityId);
  if (!city) return [];
  return SWISS_CITY_RESOURCES.filter((r) => r.city === city.name);
}

// ─── HELPER: GET RESOURCES BY SWISS CITY + CATEGORY ─────────────────────────
export function getResourcesForSwissCityByCategory(
  cityId: string,
  category: FrenchCategory
): FrenchCityResource[] {
  return getResourcesForSwissCity(cityId).filter((r) => r.category === category);
}
