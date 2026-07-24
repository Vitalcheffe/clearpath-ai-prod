// ────────────────────────────────────────────────────────────────────────────
// CLEARPATH AI — SERVER-SIDE LOCALE DETECTION
// ────────────────────────────────────────────────────────────────────────────
// IMPORTANT: LOCALE_COOKIE is defined HERE (not imported from index.tsx)
// because index.tsx is a "use client" module. Importing a constant from a
// client module into middleware (edge runtime) causes the value to become
// a client reference instead of the actual string, breaking the middleware.
// ────────────────────────────────────────────────────────────────────────────

import { getCountryFromIsoCode } from "@/data/frenchResources";

// Define the cookie name as a server-side constant (NOT imported from client)
export const LOCALE_COOKIE = "clearpath-locale";

export type Locale = "en" | "fr";

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
