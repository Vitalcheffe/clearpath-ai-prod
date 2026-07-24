// ────────────────────────────────────────────────────────────────────────────
// CLEARPATH AI — MIDDLEWARE FOR IP-BASED COUNTRY DETECTION
// ────────────────────────────────────────────────────────────────────────────

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { LOCALE_COOKIE } from "@/i18n/server";
import { getCountryFromIsoCode } from "@/data/frenchResources";

const EXCLUDED_PATHS = [
  "/api/",
  "/_next/",
  "/favicon.ico",
  "/robots.txt",
  "/sitemap.xml",
  "/logo.svg",
  "/clearpath-logo.png",
];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (EXCLUDED_PATHS.some((p) => pathname.startsWith(p))) {
    return NextResponse.next();
  }

  const existingLocale = request.cookies.get(LOCALE_COOKIE)?.value;
  if (existingLocale === "en" || existingLocale === "fr") {
    return NextResponse.next();
  }

  const ipCountry = request.headers.get("x-vercel-ip-country");
  let detectedLocale: "en" | "fr" = "en";

  if (ipCountry) {
    const country = getCountryFromIsoCode(ipCountry);
    if (country) {
      detectedLocale = country.locale;
    }
  }

  if (detectedLocale === "en") {
    const acceptLang = request.headers.get("accept-language");
    if (acceptLang) {
      const langs = acceptLang
        .split(",")
        .map((l) => l.trim().split(";")[0].toLowerCase())
        .filter(Boolean);
      if (langs.some((l) => l.startsWith("fr"))) {
        detectedLocale = "fr";
      }
    }
  }

  const response = NextResponse.next();
  response.cookies.set({
    name: LOCALE_COOKIE,
    value: detectedLocale,
    path: "/",
    maxAge: 60 * 60 * 24 * 365,
    sameSite: "lax",
  });

  return response;
}

export const config = {
  matcher: [
    "/((?!api/|_next/|favicon.ico|robots.txt|sitemap.xml|logo.svg|clearpath-logo.png|.*\\.(?:png|jpg|jpeg|gif|webp|svg|ico|css|js|map)).*)",
  ],
};
