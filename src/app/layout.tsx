import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { cookies, headers } from "next/headers";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { I18nProvider, type Locale } from "@/i18n";
import { LOCALE_COOKIE, type Locale as ServerLocale } from "@/i18n/server";
import { getCountryFromIsoCode } from "@/data/frenchResources";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://clearpath-ai-prod.vercel.app"),
  title: "ClearPath AI — Community Resource Navigator",
  description:
    "Verified community resources with honest confidence. Classified, not generated. Every result shows confidence, reasoning, and alternatives.",
  keywords: [
    "ClearPath AI",
    "community resources",
    "211",
    "social services",
    "crisis support",
    "honest confidence",
    "zero-shot classification",
    "BART-large-MNLI",
    "responsible AI",
    "ressources communautaires",
    "aide sociale",
    "Maroc",
    "France",
  ],
  authors: [{ name: "ClearPath AI Team" }, { name: "Amine Harch El Korane" }],
  icons: {
    icon: [
      { url: "/logo.svg", type: "image/svg+xml" },
      { url: "/clearpath-logo.png", type: "image/png", sizes: "1024x1024" },
    ],
    apple: "/clearpath-logo.png",
  },
  openGraph: {
    title: "ClearPath AI — Community Resource Navigator",
    description: "Verified community resources with honest confidence. Classified, not generated.",
    type: "website",
    images: [{ url: "/clearpath-logo.png", width: 1024, height: 1024, alt: "ClearPath AI Logo" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "ClearPath AI — Community Resource Navigator",
    description: "Verified community resources with honest confidence. Classified, not generated.",
    images: ["/clearpath-logo.png"],
  },
};

async function detectInitialLocale(): Promise<Locale> {
  const cookieStore = await cookies();
  const cookieLocale = cookieStore.get(LOCALE_COOKIE)?.value;
  if (cookieLocale === "en" || cookieLocale === "fr") {
    return cookieLocale;
  }

  const headerStore = await headers();
  const ipCountry = headerStore.get("x-vercel-ip-country");
  if (ipCountry) {
    const country = getCountryFromIsoCode(ipCountry);
    if (country) return country.locale;
  }

  const acceptLang = headerStore.get("accept-language");
  if (acceptLang) {
    const langs = acceptLang
      .split(",")
      .map((l) => l.trim().split(";")[0].toLowerCase())
      .filter(Boolean);
    if (langs.some((l) => l.startsWith("fr"))) {
      return "fr";
    }
  }

  return "en";
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const initialLocale = await detectInitialLocale();

  return (
    <html lang={initialLocale} suppressHydrationWarning>
      <body
        className={`${inter.variable} antialiased bg-background text-foreground`}
        style={{
          fontFamily:
            "'Inter', -apple-system, BlinkMacSystemFont, 'SF Pro Text', 'SF Pro Display', system-ui, sans-serif",
        }}
      >
        <I18nProvider initialLocale={initialLocale}>{children}</I18nProvider>
        <Toaster />
      </body>
    </html>
  );
}
