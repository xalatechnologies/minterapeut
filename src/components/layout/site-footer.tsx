"use client";

import { useTranslations } from "next-intl";

import { SiteLogo } from "@/components/layout/site-logo";
import { navItems } from "@/content";
import { Link } from "@/i18n/navigation";
import { navLabel } from "@/lib/nav-labels";
import { siteConfig } from "@/lib/site-config";

const PRIMARY_HREFS = new Set(["/", "/hva", "/timebestilling", "/hvem"]);
const INFO_HREFS = new Set(["/vurdering", "/nederlag", "/offentlig"]);

export function SiteFooter() {
  const t = useTranslations("Footer");
  const tNav = useTranslations("Nav");
  const tItems = useTranslations("Nav.items");
  const tSite = useTranslations("Site");
  const primaryLinks = navItems.filter((item) => PRIMARY_HREFS.has(item.href));
  const infoLinks = navItems.filter((item) => INFO_HREFS.has(item.href));

  return (
    <footer className="mt-auto border-t border-outline-variant/25 bg-surface-container-low">
      <div className="container-site grid grid-cols-1 gap-10 py-12 md:grid-cols-12 md:gap-8 md:py-16">
        <div className="flex flex-col gap-3 md:col-span-4">
          <Link
            href="/"
            className="w-fit text-sage-deep transition-opacity hover:opacity-80"
            aria-label={siteConfig.brand}
          >
            <SiteLogo size="sm" />
          </Link>
          <p className="type-body max-w-sm text-on-surface-variant">
            {siteConfig.therapistName}
          </p>
          <p className="type-label max-w-sm text-secondary">
            {tSite("specialty")}
          </p>
          <p className="type-label mt-3 max-w-xs text-secondary">
            {tSite("clinicLine1")}
            <br />
            {siteConfig.clinicLine2}, {siteConfig.clinicLine3}
          </p>
        </div>

        <div className="flex flex-col gap-4 md:col-span-3">
          <h2 className="type-caption text-secondary">{t("contact")}</h2>
          <ul className="flex flex-col gap-2.5 type-body text-on-surface-variant">
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
                className="break-words transition hover:text-sage-deep"
              >
                {siteConfig.email}
              </a>
            </li>
            <li className="pt-1">
              <Link
                href="/timebestilling"
                className="type-label text-sage-deep transition hover:underline"
              >
                {tNav("book")}
              </Link>
            </li>
          </ul>
        </div>

        <div className="flex flex-col gap-8 md:col-span-5 sm:flex-row sm:gap-12">
          <div className="flex flex-col gap-4">
            <h2 className="type-caption text-secondary">{t("links")}</h2>
            <ul className="flex flex-col gap-0.5 type-body text-on-surface-variant">
              {primaryLinks.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href as "/"}
                    className="block rounded-lg py-2.5 transition hover:text-sage-deep"
                  >
                    {navLabel(tItems, item.href, item.label)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col gap-4">
            <h2 className="type-caption text-secondary">{tNav("more")}</h2>
            <ul className="flex flex-col gap-0.5 type-body text-on-surface-variant">
              {infoLinks.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href as "/"}
                    className="block rounded-lg py-2.5 transition hover:text-sage-deep"
                  >
                    {navLabel(tItems, item.href, item.label)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-outline-variant/25">
        <div className="container-site flex flex-col gap-2 py-5 type-label font-normal tracking-normal text-secondary sm:flex-row sm:items-center sm:justify-between">
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
