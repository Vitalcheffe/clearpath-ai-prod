// ────────────────────────────────────────────────────────────────────────────
// CLEARPATH AI — SERVER-SIDE LOCALE DETECTION
// ────────────────────────────────────────────────────────────────────────────

import type { Locale } from "./index";
import { LOCALE_COOKIE } from "./index";
import { getCountryFromIsoCode } from "@/data/frenchResources";

const FRENCH_COUNTRY_CODES = ["MA", "FR", "BE", "CH", "CA"];

export function detectLocaleFromRequest(request: {
  cookies?: { get: (name: string) => { value: string } | undefined };
  headers?: { get: (name: string) => string | null };
}): Locale {
  const cookieLocale = request.cookies?.get(LOCALE_COOKIE)?.value;
  if (cookieLocale === "en" || cookieLocale === "fr") {
    return cookieLocale;
  }

  const ipCountry = request.headers?.get("x-vercel-ip-country");
  if (ipCountry) {
    const country = getCountryFromIsoCode(ipCountry);
    if (country) {
      return country.locale;
    }
  }

  const acceptLang = request.headers?.get("accept-language");
  if (acceptLang) {
    const langs = acceptLang
      .split(",")
      .map((l) => l.trim().split(";")[0].toLowerCase())
      .filter(Boolean);

    for (const lang of langs) {
      if (lang.startsWith("fr")) return "fr";
      if (lang.startsWith("en")) return "en";
    }
  }

  return "en";
}

export function detectCountryFromRequest(request: {
  headers?: { get: (name: string) => string | null };
}): string | null {
  const ipCountry = request.headers?.get("x-vercel-ip-country");
  if (ipCountry) {
    const country = getCountryFromIsoCode(ipCountry);
    if (country) return country.id;
  }
  return null;
}

export function getFrenchCountryCodes(): string[] {
  return FRENCH_COUNTRY_CODES;
}

export { LOCALE_COOKIE };
export type { Locale };
