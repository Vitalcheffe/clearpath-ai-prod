"use client";

import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from "react";
import { en, type Translations } from "./locales/en";
import { fr } from "./locales/fr";

// ─── Types ──────────────────────────────────────────────────────────────────
export type Locale = "en" | "fr";

const LOCALES: Record<Locale, Translations> = { en, fr };

interface I18nContextValue {
  locale: Locale;
  t: Translations;
  setLocale: (locale: Locale) => void;
  toggleLocale: () => void;
}

const I18nContext = createContext<I18nContextValue>({
  locale: "en",
  t: en,
  setLocale: () => {},
  toggleLocale: () => {},
});

// ─── Cookie helpers ─────────────────────────────────────────────────────────
const LOCALE_COOKIE = "clearpath-locale";
const LOCALE_COOKIE_MAX_AGE = 60 * 60 * 24 * 365; // 1 year

function setLocaleCookie(locale: Locale) {
  if (typeof document === "undefined") return;
  document.cookie = `${LOCALE_COOKIE}=${locale}; path=/; max-age=${LOCALE_COOKIE_MAX_AGE}; SameSite=Lax`;
}

function getLocaleFromCookie(): Locale | null {
  if (typeof document === "undefined") return null;
  const match = document.cookie.match(new RegExp(`(?:^|; )${LOCALE_COOKIE}=([^;]*)`));
  if (!match) return null;
  const value = match[1] as Locale;
  return value === "en" || value === "fr" ? value : null;
}

// ─── Provider ───────────────────────────────────────────────────────────────
export function I18nProvider({
  children,
  initialLocale = "en",
}: {
  children: ReactNode;
  initialLocale?: Locale;
}) {
  const [locale, setLocaleState] = useState<Locale>(initialLocale);

  useEffect(() => {
    const cookieLocale = getLocaleFromCookie();
    if (cookieLocale && cookieLocale !== locale) {
      setLocaleState(cookieLocale);
    }
    if (typeof document !== "undefined") {
      document.documentElement.lang = locale;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.lang = locale;
    }
  }, [locale]);

  const setLocale = useCallback((newLocale: Locale) => {
    setLocaleState(newLocale);
    setLocaleCookie(newLocale);
  }, []);

  const toggleLocale = useCallback(() => {
    setLocaleState((prev) => {
      const next = prev === "en" ? "fr" : "en";
      setLocaleCookie(next);
      return next;
    });
  }, []);

  const value: I18nContextValue = {
    locale,
    t: LOCALES[locale],
    setLocale,
    toggleLocale,
  };

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

// ─── Hook ───────────────────────────────────────────────────────────────────
export function useI18n(): I18nContextValue {
  return useContext(I18nContext);
}

// ─── Export dictionary access for non-component use ─────────────────────────
export function getTranslations(locale: Locale): Translations {
  return LOCALES[locale] ?? en;
}

export { LOCALE_COOKIE };
export type { Translations };
