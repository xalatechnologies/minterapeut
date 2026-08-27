import source from "@/content/source-pages.json";

export type SourcePageFile =
  | "index.htm"
  | "hva.htm"
  | "vurdering.htm"
  | "nederlag.htm"
  | "timebestilling.htm"
  | "offentlig.htm"
  | "hvem.htm"
  | "english.htm"
  | "deutsch.htm"
  | "francais.htm";

export const siteMeta = source.meta;

export const navItems = source.meta.nav;

export function getSourcePage(file: SourcePageFile) {
  return source.pages[file];
}

/** Locale home maps to language-specific source pages. */
export function homePageForLocale(locale: string): SourcePageFile {
  switch (locale) {
    case "en":
      return "english.htm";
    case "de":
      return "deutsch.htm";
    case "fr":
      return "francais.htm";
    default:
      return "index.htm";
  }
}
