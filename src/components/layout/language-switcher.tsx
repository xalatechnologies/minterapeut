"use client";

import { useLocale, useTranslations } from "next-intl";
import { useId } from "react";

import { locales, type Locale } from "@/i18n/config";
import { usePathname, useRouter } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

const localeCodes: Record<Locale, string> = {
  no: "NO",
  en: "EN",
  de: "DE",
  fr: "FR",
};

export function LanguageSwitcher({
  className,
  compact = false,
}: {
  className?: string;
  compact?: boolean;
}) {
  const t = useTranslations("LanguageSwitcher");
  const locale = useLocale() as Locale;
  const pathname = usePathname();
  const router = useRouter();
  const selectId = useId();

  return (
    <div className={cn("flex flex-wrap items-center gap-1", className)}>
      <label htmlFor={selectId} className="sr-only">
        {t("label")}
      </label>
      <select
        id={selectId}
        name="language"
        value={locale}
        onChange={(event) => {
          router.replace(pathname, { locale: event.target.value as Locale });
        }}
        className={cn(
          "rounded-md border border-outline-variant/35 bg-transparent text-on-surface-variant outline-none transition hover:border-outline-variant hover:text-sage-deep focus-visible:ring-2 focus-visible:ring-secondary-container",
          compact
            ? "type-label h-9 min-w-0 appearance-none px-2.5 pr-7 font-semibold tracking-wider"
            : "type-label min-h-11 min-w-[9.5rem] px-3",
        )}
        aria-label={t("label")}
      >
        {locales.map((code) => (
          <option key={code} value={code}>
            {compact ? localeCodes[code] : t(code)}
          </option>
        ))}
      </select>
    </div>
  );
}
