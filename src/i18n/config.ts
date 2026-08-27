/**
 * Locale configuration — single source of truth for supported languages.
 * BCP-47 codes: en, no (Norwegian), de, fr.
 */
export const locales = ["en", "no", "de", "fr"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "no";

export const localeNames: Record<Locale, string> = {
  en: "English",
  no: "Norsk",
  de: "Deutsch",
  fr: "Français",
};

export const localeHtmlLang: Record<Locale, string> = {
  en: "en",
  no: "nb",
  de: "de",
  fr: "fr",
};

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}
