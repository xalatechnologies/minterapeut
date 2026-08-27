"use client";

import { useTranslations } from "next-intl";
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
  const [menuOpen, setMenuOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const moreRef = useRef<HTMLDivElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const mobileNavRef = useRef<HTMLElement>(null);
  const moreButtonId = useId();
  const moreMenuId = useId();
  const mobileNavId = useId();

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

  useEffect(() => {
    if (!menuOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setMenuOpen(false);
        menuButtonRef.current?.focus();
      }
    }

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [menuOpen]);

  return (
    <header className="sticky top-0 z-50 border-b border-outline-variant/25 bg-surface/95 backdrop-blur-md supports-[backdrop-filter]:bg-surface/90">
      <div className="container-site flex h-14 items-center justify-between gap-3 sm:h-[4.25rem] sm:gap-6">
        <Link
          href="/"
          className="min-w-0 shrink text-sage-deep transition-opacity hover:opacity-80"
          onClick={() => setMenuOpen(false)}
          aria-label={siteConfig.brand}
        >
          <SiteLogo size="sm" className="sm:[&_.logo-mark]:h-9 sm:[&_.logo-mark]:w-9 sm:[&_.logo-word]:text-[1.35rem]" />
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

        <div className="flex shrink-0 items-center gap-1.5 sm:gap-3">
          <div className="hidden sm:block">
            <LanguageSwitcher compact />
          </div>
          <ButtonLink
            href="/timebestilling"
            variant="book"
            size="sm"
            className="hidden min-[380px]:inline-flex shrink-0 px-3.5 sm:px-5"
          >
            {t("book")}
          </ButtonLink>
          <button
            ref={menuButtonRef}
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center rounded-xl text-on-surface transition hover:bg-surface-variant active:bg-surface-container lg:hidden"
            aria-expanded={menuOpen}
            aria-controls={mobileNavId}
            aria-label={menuOpen ? t("closeMenu") : t("openMenu")}
            onClick={() => setMenuOpen((value) => !value)}
          >
            {menuOpen ? <IconClose /> : <IconMenu />}
          </button>
        </div>
      </div>

      {/* Backdrop */}
      {menuOpen ? (
        <div
          aria-hidden
          className="fixed inset-0 top-14 z-40 bg-[#0b1210]/55 backdrop-blur-[2px] sm:top-[4.25rem] lg:hidden"
          onClick={() => setMenuOpen(false)}
        />
      ) : null}

      {/* Mobile panel */}
      {menuOpen ? (
        <nav
          ref={mobileNavRef}
          id={mobileNavId}
          aria-label={t("main")}
          className="absolute inset-x-0 top-full z-50 w-full max-h-[min(78dvh,36rem)] animate-fade-up overflow-y-auto overscroll-contain border-b border-outline-variant/25 bg-surface-container-lowest shadow-[var(--shadow-soft)] lg:hidden"
          style={{ animationDuration: "280ms" }}
        >
          <div className="container-site flex flex-col gap-1 py-4 pb-[max(1.25rem,env(safe-area-inset-bottom))]">
            {primaryItems.map((item) => (
              <Link
                key={item.href}
                href={item.href as "/"}
                className={cn(
                  "type-label rounded-xl px-3.5 py-3.5 transition active:scale-[0.99]",
                  isActivePath(pathname, item.href)
                    ? "bg-surface-container text-sage-deep"
                    : "text-on-surface-variant hover:bg-surface-container hover:text-sage-deep",
                )}
                onClick={() => setMenuOpen(false)}
              >
                {navLabel(tItems, item.href, item.label)}
              </Link>
            ))}

            <div className="my-2 border-t border-outline-variant/25" />

            <p className="type-caption px-3.5 pb-1 pt-1 text-secondary">
              {t("more")}
            </p>
            {moreItems.map((item) => (
              <Link
                key={item.href}
                href={item.href as "/"}
                className={cn(
                  "type-label rounded-xl px-3.5 py-3.5 transition active:scale-[0.99]",
                  isActivePath(pathname, item.href)
                    ? "bg-surface-container text-sage-deep"
                    : "text-on-surface-variant hover:bg-surface-container hover:text-sage-deep",
                )}
                onClick={() => setMenuOpen(false)}
              >
                {navLabel(tItems, item.href, item.label)}
              </Link>
            ))}

            <div className="my-2 border-t border-outline-variant/25" />

            <p className="type-caption px-3.5 pb-1 pt-1 text-secondary">
              {t("languages")}
            </p>
            <div className="flex flex-wrap gap-2 px-2 pb-2">
              {languageItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href as "/"}
                  className="type-label rounded-full border border-outline-variant/35 px-4 py-2.5 text-on-surface-variant transition hover:border-sage-deep hover:text-sage-deep active:scale-[0.98]"
                  onClick={() => setMenuOpen(false)}
                >
                  {navLabel(tItems, item.href, item.label)}
                </Link>
              ))}
            </div>

            <div className="mt-2 border-t border-outline-variant/25 px-2 pt-4 sm:hidden">
              <p className="type-caption mb-2 px-1.5 text-secondary">
                {t("language")}
              </p>
              <LanguageSwitcher className="w-full [&_select]:w-full" />
            </div>

            <div className="mt-4 px-2 min-[380px]:hidden">
              <ButtonLink
                href="/timebestilling"
                variant="book"
                className="w-full"
                onClick={() => setMenuOpen(false)}
              >
                {t("book")}
              </ButtonLink>
            </div>
          </div>
        </nav>
      ) : null}
    </header>
  );
}
