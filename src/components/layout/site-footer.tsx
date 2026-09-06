"use client";

import { useTranslations } from "next-intl";

import { SiteLogo } from "@/components/layout/site-logo";
import { navItems } from "@/content";
import { Link } from "@/i18n/navigation";
import { siteConfig } from "@/lib/site-config";

const FOOTER_PAGE_KEYS: Record<
  string,
  | "home"
  | "therapy"
  | "whenHelp"
  | "seeingPsychologist"
  | "appointments"
  | "publicCare"
  | "about"
> = {
  "/": "home",
  "/hva": "therapy",
  "/vurdering": "whenHelp",
  "/nederlag": "seeingPsychologist",
  "/timebestilling": "appointments",
  "/offentlig": "publicCare",
  "/hvem": "about",
};

export function SiteFooter() {
  const t = useTranslations("Footer");
  const tPages = useTranslations("Footer.pages");
  const tNav = useTranslations("Nav");
  const tSite = useTranslations("Site");

  const pageLinks = navItems.filter((item) => item.href in FOOTER_PAGE_KEYS);

  return (
    <footer className="mt-auto border-t border-outline-variant/30 bg-surface-container-low">
      <div className="container-site grid gap-10 py-12 md:grid-cols-12 md:gap-8 md:py-14">
        <div className="flex flex-col gap-4 md:col-span-4">
          <Link
            href="/"
            className="w-fit text-sage-deep transition-opacity hover:opacity-80"
            aria-label={siteConfig.brand}
          >
            <SiteLogo size="sm" />
          </Link>
          <div className="space-y-1">
            <p className="type-body text-on-surface">{siteConfig.therapistName}</p>
            <p className="type-label text-secondary">{tSite("specialty")}</p>
          </div>
          <address className="type-label not-italic leading-relaxed text-on-surface-variant">
            {tSite("clinicLine1")}
            <br />
            {siteConfig.clinicLine2}
            <br />
            {siteConfig.clinicLine3}
          </address>
        </div>

        <div className="flex flex-col gap-4 md:col-span-3">
          <h2 className="type-caption text-secondary">{t("contact")}</h2>
          <ul className="flex flex-col gap-2.5 type-label text-on-surface-variant">
            <li>
              <a
                href={siteConfig.phoneHref}
                className="transition hover:text-sage-deep"
              >
                {siteConfig.phone}
              </a>
            </li>
            <li>
              <a
                href={siteConfig.emailHref}
                className="break-all transition hover:text-sage-deep"
              >
                {siteConfig.email}
              </a>
            </li>
            <li className="pt-1">
              <Link
                href="/timebestilling"
                className="font-medium text-sage-deep transition hover:underline"
              >
                {tNav("book")}
              </Link>
            </li>
          </ul>
        </div>

        <nav className="md:col-span-5" aria-label={t("links")}>
          <ul className="flex flex-col gap-2.5">
            {pageLinks.map((item) => {
              const key = FOOTER_PAGE_KEYS[item.href];
              return (
                <li key={item.href}>
                  <Link
                    href={item.href as "/"}
                    className="type-label leading-snug text-on-surface-variant transition hover:text-sage-deep"
                  >
                    {tPages(key)}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>

      <div className="border-t border-outline-variant/25 bg-surface-container/60">
        <div className="container-site flex flex-col gap-2 py-4 type-label font-normal tracking-normal text-secondary sm:flex-row sm:items-center sm:justify-between">
          <p suppressHydrationWarning>
            © {new Date().getFullYear()} {siteConfig.therapistName}
            <span className="mx-2 text-outline-variant">·</span>
            {t("org")} {siteConfig.orgNumber}
          </p>
          <p>
            {t("partner")}{" "}
            <a
              href="https://xala.no"
              target="_blank"
              rel="noopener noreferrer"
              className="transition hover:text-sage-deep"
            >
              Xala technologies
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
