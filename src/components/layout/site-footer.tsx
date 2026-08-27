"use client";

import { useTranslations } from "next-intl";

import { SiteLogo } from "@/components/layout/site-logo";
import { navItems } from "@/content";
import { Link } from "@/i18n/navigation";
import { navLabel } from "@/lib/nav-labels";
import { siteConfig } from "@/lib/site-config";

export function SiteFooter() {
  const t = useTranslations("Footer");
  const tNav = useTranslations("Nav");
  const tItems = useTranslations("Nav.items");
  const tSite = useTranslations("Site");

  return (
    <footer className="mt-auto border-t border-outline-variant/25 bg-surface-container-low">
      <div className="container-site flex flex-col gap-6 py-8 sm:gap-7 sm:py-10">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between sm:gap-8">
          <div className="flex flex-col gap-2">
            <Link
              href="/"
              className="w-fit text-sage-deep transition-opacity hover:opacity-80"
              aria-label={siteConfig.brand}
            >
              <SiteLogo size="sm" />
            </Link>
            <p className="type-label text-on-surface-variant">
              {siteConfig.therapistName}
              <span className="mx-1.5 text-outline-variant">·</span>
              {tSite("specialty")}
            </p>
            <p className="type-label text-secondary">
              {tSite("clinicLine1")}, {siteConfig.clinicLine3}
            </p>
          </div>

          <div className="flex flex-col gap-2 sm:items-end">
            <a
              href={siteConfig.phoneHref}
              className="type-body text-on-surface-variant transition hover:text-sage-deep"
            >
              {siteConfig.phone}
            </a>
            <a
              href={siteConfig.emailHref}
              className="type-label break-all text-on-surface-variant transition hover:text-sage-deep"
            >
              {siteConfig.email}
            </a>
            <Link
              href="/timebestilling"
              className="type-label text-sage-deep transition hover:underline"
            >
              {tNav("book")}
            </Link>
          </div>
        </div>

        <nav aria-label={t("links")}>
          <ul className="flex flex-wrap gap-x-4 gap-y-2 type-label text-on-surface-variant">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href as "/"}
                  className="transition hover:text-sage-deep"
                >
                  {navLabel(tItems, item.href, item.label)}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div className="border-t border-outline-variant/25">
        <div className="container-site flex flex-col gap-1.5 py-4 type-label font-normal tracking-normal text-secondary sm:flex-row sm:items-center sm:justify-between">
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
