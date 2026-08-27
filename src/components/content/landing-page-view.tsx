import Image from "next/image";
import { getLocale, getTranslations } from "next-intl/server";
import type { ReactNode } from "react";

import { SourceMarkdown } from "@/components/content/source-markdown";
import { SiteLogo } from "@/components/layout/site-logo";
import { ButtonLink } from "@/components/ui/button-link";
import { getSourcePage, homePageForLocale } from "@/content";
import {
  extractH1,
  splitAtHeadings,
  type ContentChunk,
} from "@/lib/content-sections";
import { siteConfig } from "@/lib/site-config";

const pageVisuals: Record<
  string,
  {
    hero: string;
    heroPosition: string;
    accent: string;
    accentPosition: string;
  }
> = {
  no: {
    hero: "/images/hero-forest-path.jpg",
    heroPosition: "object-center",
    accent: "/images/section-path.jpg",
    accentPosition: "object-[center_40%]",
  },
  en: {
    hero: "/images/language-english.jpg",
    heroPosition: "object-[center_55%]",
    accent: "/images/section-moss.jpg",
    accentPosition: "object-center",
  },
  de: {
    hero: "/images/language-deutsch.jpg",
    heroPosition: "object-center",
    accent: "/images/appointments-forest.jpg",
    accentPosition: "object-center",
  },
  fr: {
    hero: "/images/language-francais.jpg",
    heroPosition: "object-[center_40%]",
    accent: "/images/section-water.jpg",
    accentPosition: "object-center",
  },
};

function splitLandingContent(content: string): ContentChunk[] {
  const { body } = extractH1(content);
  const lines = body.split("\n");
  let i = 0;
  while (i < lines.length && lines[i].trim() === "") i += 1;

  // Drop redundant welcome line already used in the hero.
  if (i < lines.length) {
    const first = lines[i].trim().toLowerCase();
    if (
      first.startsWith("du er velkommen til å ta kontakt") ||
      first.startsWith("you are welcome to get in touch") ||
      first.startsWith("sie sind herzlich eingeladen") ||
      first.startsWith("n’hésitez pas") ||
      first.startsWith("n'hésitez pas")
    ) {
      i += 1;
      while (i < lines.length && lines[i].trim() === "") i += 1;
    }
  }

  return splitAtHeadings(lines.slice(i).join("\n"));
}

function AccentImage({
  src,
  position,
}: {
  src: string;
  position: string;
}) {
  return (
    <figure className="lg:sticky lg:top-28">
      <div className="overflow-hidden rounded-lg">
        <Image
          src={src}
          alt=""
          width={1200}
          height={1500}
          priority
          className={`aspect-[4/5] w-full object-cover ${position}`}
          sizes="(max-width: 1024px) 100vw, 400px"
        />
      </div>
    </figure>
  );
}

export async function LandingPageView() {
  const locale = await getLocale();
  const tNav = await getTranslations("Nav");
  const tHome = await getTranslations("Home");
  const tSite = await getTranslations("Site");
  const file = homePageForLocale(locale);
  const page = getSourcePage(file, locale);
  const visuals = pageVisuals[locale] ?? pageVisuals.no;
  const sections = splitLandingContent(page.content);
  const contentSections = sections.filter((s) => s.kind === "content");
  const primary = contentSections[0];
  const secondary = contentSections.slice(1);
  const contactSections = sections.filter((s) => s.kind === "contact");

  return (
    <div className="flex flex-1 flex-col">
      <section className="relative isolate min-h-[68vh] overflow-hidden sm:min-h-[78vh]">
        <Image
          src={visuals.hero}
          alt=""
          fill
          priority
          className={`animate-hero-zoom object-cover ${visuals.heroPosition}`}
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0b1210]/92 via-[#0b1210]/55 to-[#0b1210]/20" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0b1210]/75 via-transparent to-[#0b1210]/30" />

        <div className="container-site relative flex min-h-[68vh] flex-col justify-end pb-12 pt-24 sm:min-h-[78vh] sm:pb-24 sm:pt-28">
          <div className="animate-fade-up mb-5 text-white sm:mb-6">
            <SiteLogo
              size="md"
              className="sm:[&_.logo-mark]:h-11 sm:[&_.logo-mark]:w-11 sm:[&_.logo-word]:text-[1.5rem]"
            />
          </div>
          <h1 className="type-display animate-fade-up max-w-3xl text-white drop-shadow-[0_2px_20px_rgba(0,0,0,0.4)]">
            {tHome("headlineLine1")}
            <br />
            {tHome("headlineLine2")}
          </h1>
          <p className="type-title animate-fade-up mt-4 text-white/95 sm:mt-5">
            {siteConfig.therapistName}
          </p>
          <p className="type-label animate-fade-up mt-2 text-white/75">
            {tSite("specialty")}
          </p>
          <p className="type-body-lg animate-fade-up mt-5 max-w-xl text-pretty text-white/90 sm:mt-6">
            {tHome("support")}
          </p>
          <div
            className="animate-fade-up mt-8 flex w-full flex-col gap-3 sm:mt-9 sm:w-auto sm:flex-row sm:flex-wrap sm:items-center"
            style={{ animationDelay: "100ms" }}
          >
            <ButtonLink
              href="/timebestilling"
              variant="primary"
              className="w-full sm:w-auto"
            >
              {tNav("book")}
            </ButtonLink>
            <ButtonLink
              href={siteConfig.phoneHref}
              variant="onDark"
              className="w-full sm:w-auto"
            >
              {siteConfig.phone}
            </ButtonLink>
          </div>
        </div>
      </section>

      {primary ? (
        <section className="bg-background">
          <div className="container-site grid grid-cols-1 items-start gap-12 py-16 lg:grid-cols-12 lg:gap-20 lg:py-24">
            <div className="animate-fade-up lg:col-span-7">
              <SourceMarkdown content={primary.markdown} density="reading" />
            </div>
            <aside
              className="animate-fade-up lg:col-span-5"
              style={{ animationDelay: "80ms" }}
            >
              <AccentImage
                src={visuals.accent}
                position={visuals.accentPosition}
              />
            </aside>
          </div>
        </section>
      ) : null}

      {secondary.map((section, index) => (
        <section
          key={`${file}-secondary-${index}`}
          className="border-t border-outline-variant/20 bg-surface-container-low"
        >
          <div className="container-site py-14 lg:py-20">
            <div className="animate-fade-up max-w-3xl">
              <SourceMarkdown content={section.markdown} density="clinical" />
            </div>
          </div>
        </section>
      ))}

      {contactSections.map((section, index) => (
        <section
          key={`${file}-contact-${index}`}
          className="border-t border-outline-variant/20 bg-background"
        >
          <div className="container-site py-14 lg:py-16">
            <div className="animate-fade-up max-w-2xl">
              <SourceMarkdown content={section.markdown} density="clinical" />
            </div>
          </div>
        </section>
      ))}
    </div>
  );
}
