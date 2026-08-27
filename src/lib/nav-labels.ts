import type { useTranslations } from "next-intl";

const NAV_LABEL_KEYS: Record<
  string,
  | "home"
  | "therapy"
  | "whenHelp"
  | "seeingPsychologist"
  | "appointments"
  | "publicCare"
  | "about"
  | "english"
  | "deutsch"
  | "francais"
> = {
  "/": "home",
  "/hva": "therapy",
  "/vurdering": "whenHelp",
  "/nederlag": "seeingPsychologist",
  "/timebestilling": "appointments",
  "/offentlig": "publicCare",
  "/hvem": "about",
  "/english": "english",
  "/deutsch": "deutsch",
  "/francais": "francais",
};

type NavItemsTranslate = ReturnType<typeof useTranslations<"Nav.items">>;

export function navLabel(
  tItems: NavItemsTranslate,
  href: string,
  fallback: string,
) {
  const key = NAV_LABEL_KEYS[href];
  if (!key) return fallback;
  return tItems(key);
}
