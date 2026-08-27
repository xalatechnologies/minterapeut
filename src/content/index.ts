import source from "@/content/source-pages.json";
import localized from "@/content/localized-pages.json";
import { extractH1 } from "@/lib/content-sections";

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

export type ContentLocale = "no" | "en" | "de" | "fr";

export const siteMeta = source.meta;

/** Main site navigation — excludes legacy /english|/deutsch|/francais routes. */
export const navItems = source.meta.nav.filter(
  (item) =>
    !["/english", "/deutsch", "/francais"].includes(item.href),
);

type LocalizedPageKey = keyof typeof localized;

function isLocalizedPage(file: string): file is LocalizedPageKey {
  return file in localized;
}

export function getSourcePage(file: SourcePageFile, locale: string = "no") {
  const base = source.pages[file];
  if (!base) {
    throw new Error(`Unknown source page: ${file}`);
  }

  if (
    locale !== "no" &&
    isLocalizedPage(file) &&
    locale in localized[file]
  ) {
    const content =
      localized[file][locale as Exclude<ContentLocale, "no">];
    const { title } = extractH1(content);
    return {
      ...base,
      content,
      heading: title || base.heading,
    };
  }

  return base;
}

/** Home always uses the main welcome page, localized by UI language. */
export function homePageForLocale(_locale: string): SourcePageFile {
  return "index.htm";
}
