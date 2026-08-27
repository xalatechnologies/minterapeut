"use client";

import { useLocale, useTranslations } from "next-intl";
import { useEffect, useId, useRef, useState } from "react";

import { LanguageSwitcher } from "@/components/layout/language-switcher";
import { SiteLogo } from "@/components/layout/site-logo";
import { ButtonLink } from "@/components/ui/button-link";
import { IconChevron, IconClose, IconMenu } from "@/components/ui/icons";
import { navItems } from "@/content";
import { Link, usePathname } from "@/i18n/navigation";
import { navLabel } from "@/lib/nav-labels";
import { siteConfig } from "@/lib/site-config";
import { cn } from "@/lib/utils";

const PRIMARY_HREFS = new Set(["/", "/hva", "/timebestilling", "/hvem"]);
const MORE_HREFS = new Set(["/vurdering", "/nederlag", "/offentlig"]);
const LANGUAGE_HREFS = new Set(["/english", "/deutsch", "/francais"]);

function isActivePath(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function SiteHeader() {
  const t = useTranslations("Nav");
  const tItems = useTranslations("Nav.items");
  const pathname = usePathname();
  const locale = useLocale();
  const [menuOpen, setMenuOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const moreRef = useRef<HTMLDivElement>(null);
  const moreButtonId = useId();
  const moreMenuId = useId();

  const primaryItems = navItems.filter((item) => PRIMARY_HREFS.has(item.href));
  const moreItems = navItems.filter((item) => MORE_HREFS.has(item.href));
  const languageItems = navItems.filter((item) => LANGUAGE_HREFS.has(item.href));
  const moreActive = moreItems.some((item) => isActivePath(pathname, item.href));

  useEffect(() => {
    setMoreOpen(false);
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!moreOpen) return;

    function onPointerDown(event: MouseEvent) {
      if (!moreRef.current?.contains(event.target as Node)) {
        setMoreOpen(false);
      }
    }

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setMoreOpen(false);
    }

    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [moreOpen]);

  return (
    <header className="sticky top-0 z-50 border-b border-outline-variant/25 bg-surface/90 backdrop-blur-md">
      <div className="container-site flex h-[4.25rem] items-center justify-between gap-6">
        <Link
          href="/"
          className="shrink-0 text-sage-deep transition-opacity hover:opacity-80"
          onClick={() => setMenuOpen(false)}
          aria-label={siteConfig.brand}
        >
          <SiteLogo size="md" />
        </Link>

        <nav
          className="hidden items-center gap-0.5 lg:flex"
          aria-label={t("main")}
        >
          {primaryItems
            .filter((item) => item.href === "/" || item.href === "/hva")
            .map((item) => {
              const active = isActivePath(pathname, item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href as "/"}
                  className={cn(
                    "type-label relative px-3 py-2 transition-colors",
                    active
                      ? "text-sage-deep"
                      : "text-on-surface-variant hover:text-sage-deep",
                  )}
                >
                  {navLabel(tItems, item.href, item.label)}
                  <span
                    aria-hidden
                    className={cn(
                      "absolute inset-x-3 -bottom-px h-px transition-opacity",
                      active ? "bg-sage-deep opacity-100" : "opacity-0",
                    )}
                  />
                </Link>
              );
            })}

          <div className="relative" ref={moreRef}>
            <button
              type="button"
              id={moreButtonId}
              aria-expanded={moreOpen}
              aria-controls={moreMenuId}
              aria-haspopup="menu"
              className={cn(
                "type-label relative inline-flex items-center gap-1 px-3 py-2 transition-colors",
                moreActive || moreOpen
                  ? "text-sage-deep"
                  : "text-on-surface-variant hover:text-sage-deep",
              )}
              onClick={() => setMoreOpen((value) => !value)}
            >
              {t("more")}
              <IconChevron open={moreOpen} />
              <span
                aria-hidden
                className={cn(
                  "absolute inset-x-3 -bottom-px h-px transition-opacity",
                  moreActive ? "bg-sage-deep opacity-100" : "opacity-0",
                )}
              />
            </button>

            {moreOpen ? (
              <div
                id={moreMenuId}
                role="menu"
                aria-labelledby={moreButtonId}
                className="absolute left-0 top-full z-50 mt-2 min-w-[14rem] rounded-xl border border-outline-variant/30 bg-surface-container-lowest py-2 shadow-[var(--shadow-soft)]"
              >
                {moreItems.map((item) => {
                  const active = isActivePath(pathname, item.href);
                  return (
                    <Link
                      key={item.href}
                      href={item.href as "/"}
                      role="menuitem"
                      className={cn(
                        "type-label block px-4 py-2.5 transition-colors",
                        active
                          ? "bg-surface-container text-sage-deep"
                          : "text-on-surface-variant hover:bg-surface-container hover:text-sage-deep",
                      )}
                      onClick={() => setMoreOpen(false)}
                    >
                      {navLabel(tItems, item.href, item.label)}
                    </Link>
                  );
                })}
              </div>
            ) : null}
          </div>

          {primaryItems
            .filter(
              (item) => item.href === "/timebestilling" || item.href === "/hvem",
            )
            .map((item) => {
              const active = isActivePath(pathname, item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href as "/"}
                  className={cn(
                    "type-label relative px-3 py-2 transition-colors",
                    active
                      ? "text-sage-deep"
                      : "text-on-surface-variant hover:text-sage-deep",
                  )}
                >
                  {navLabel(tItems, item.href, item.label)}
                  <span
                    aria-hidden
                    className={cn(
                      "absolute inset-x-3 -bottom-px h-px transition-opacity",
                      active ? "bg-sage-deep opacity-100" : "opacity-0",
                    )}
                  />
                </Link>
              );
            })}
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <div className="hidden sm:block">
            <LanguageSwitcher compact />
          </div>
          <ButtonLink
            href="/timebestilling"
            variant="book"
            size="sm"
            className="shrink-0"
          >
            {t("book")}
          </ButtonLink>
          <button
            type="button"
            className="inline-flex h-9 w-9 items-center justify-center rounded-lg text-on-surface transition hover:bg-surface-variant lg:hidden"
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
            aria-label={menuOpen ? t("closeMenu") : t("openMenu")}
            onClick={() => setMenuOpen((value) => !value)}
          >
            {menuOpen ? <IconClose /> : <IconMenu />}
          </button>
        </div>
      </div>

      <div
        id="mobile-nav"
        className={cn(
          "max-h-[70vh] overflow-y-auto border-t border-outline-variant/30 bg-surface-container-lowest lg:hidden",
          menuOpen ? "block" : "hidden",
        )}
      >
        <div className="container-site flex flex-col py-3">
          {primaryItems.map((item) => (
            <Link
              key={item.href}
              href={item.href as "/"}
              className={cn(
                "type-label rounded-lg px-3 py-3 transition",
                isActivePath(pathname, item.href)
                  ? "bg-surface-container text-sage-deep"
                  : "text-on-surface-variant hover:bg-surface-container hover:text-sage-deep",
              )}
              onClick={() => setMenuOpen(false)}
            >
              {navLabel(tItems, item.href, item.label)}
            </Link>
          ))}

          <p className="type-caption mt-3 px-3 text-secondary">{t("more")}</p>
          {moreItems.map((item) => (
            <Link
              key={item.href}
              href={item.href as "/"}
              className={cn(
                "type-label rounded-lg px-3 py-3 transition",
                isActivePath(pathname, item.href)
                  ? "bg-surface-container text-sage-deep"
                  : "text-on-surface-variant hover:bg-surface-container hover:text-sage-deep",
              )}
              onClick={() => setMenuOpen(false)}
            >
              {navLabel(tItems, item.href, item.label)}
            </Link>
          ))}

          <p className="type-caption mt-3 px-3 text-secondary">
            {t("languages")}
          </p>
          {languageItems.map((item) => (
            <Link
              key={item.href}
              href={item.href as "/"}
              className="type-label rounded-lg px-3 py-3 text-on-surface-variant transition hover:bg-surface-container hover:text-sage-deep"
              onClick={() => setMenuOpen(false)}
            >
              {navLabel(tItems, item.href, item.label)}
            </Link>
          ))}

          <div className="mt-2 border-t border-outline-variant/30 pt-3 sm:hidden">
            <p className="type-caption mb-2 px-3 text-secondary">
              {t("language")} ({locale.toUpperCase()})
            </p>
            <LanguageSwitcher className="px-3" />
          </div>
        </div>
      </div>
    </header>
  );
}
