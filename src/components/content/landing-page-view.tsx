import Image from "next/image";
import { getTranslations } from "next-intl/server";
import type { ReactNode } from "react";

import { SourceMarkdown } from "@/components/content/source-markdown";
import { SiteLogo } from "@/components/layout/site-logo";
import { ButtonLink } from "@/components/ui/button-link";
import {
  getSourcePage,
  type SourcePageFile,
} from "@/content";
import {
  extractH1,
  splitAtHeadings,
  type ContentChunk,
} from "@/lib/content-sections";
import { siteConfig } from "@/lib/site-config";

export type LandingPageFile = Extract<
  SourcePageFile,
  "index.htm" | "english.htm" | "deutsch.htm" | "francais.htm"
>;

const pageVisuals: Record<
  LandingPageFile,
  {
    hero: string;
    heroPosition: string;
    accent: string;
    accentPosition: string;
  }
> = {
  "index.htm": {
    hero: "/images/hero-forest-path.jpg",
    heroPosition: "object-center",
    accent: "/images/section-path.jpg",
    accentPosition: "object-[center_40%]",
  },
  "english.htm": {
    hero: "/images/language-english.jpg",
    heroPosition: "object-[center_55%]",
    accent: "/images/section-moss.jpg",
    accentPosition: "object-center",
  },
  "deutsch.htm": {
    hero: "/images/language-deutsch.jpg",
    heroPosition: "object-center",
    accent: "/images/appointments-forest.jpg",
    accentPosition: "object-center",
  },
  "francais.htm": {
    hero: "/images/language-francais.jpg",
    heroPosition: "object-[center_40%]",
    accent: "/images/section-water.jpg",
    accentPosition: "object-center",
  },
};

const heroCopy: Record<
  LandingPageFile,
  { headline: string; name: string; support: string }
> = {
  "index.htm": {
    headline: `Velkommen til ${siteConfig.brand}`,
    name: siteConfig.therapistName,
    support:
      "Du er velkommen til å ta kontakt hvis du føler at du har det vanskelig psykisk og ønsker å gjøre noe med det.",
  },
  "english.htm": {
    headline: "Therapy in English",
    name: siteConfig.therapistName,
    support: `Welcome to ${siteConfig.brand}.`,
  },
  "deutsch.htm": {
    headline: "Therapie auf Deutsch",
    name: siteConfig.therapistName,
    support: `Herzlich willkommen zu ${siteConfig.brand}.`,
  },
  "francais.htm": {
    headline: "Thérapie en français",
    name: siteConfig.therapistName,
    support: `Bienvenue à ${siteConfig.brand}.`,
  },
};

function splitLandingContent(
  content: string,
  file: LandingPageFile,
): ContentChunk[] {
  const { body } = extractH1(content);
  const lines = body.split("\n");
  let i = 0;
  while (i < lines.length && lines[i].trim() === "") i += 1;

  if (file !== "index.htm" && i < lines.length) {
    const first = lines[i].trim().toLowerCase();
    if (
      first.startsWith("welcome to") ||
      first.startsWith("herzlich willkommen") ||
      first.startsWith("bienvenue")
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
  caption,
}: {
  src: string;
  position: string;
  caption?: ReactNode;
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
      {caption ? <figcaption className="mt-5">{caption}</figcaption> : null}
    </figure>
  );
}

function ClinicCaption() {
  return (
    <>
      <p className="type-caption text-secondary">{siteConfig.clinicLine1}</p>
      <p className="type-label mt-1.5 text-on-surface-variant">
        {siteConfig.clinicLine2}, {siteConfig.clinicLine3}
      </p>
    </>
  );
}

export async function LandingPageView({ file }: { file: LandingPageFile }) {
  const t = await getTranslations("Nav");
  const page = getSourcePage(file);
  const visuals = pageVisuals[file];
  const hero = heroCopy[file];
  const sections = splitLandingContent(page.content, file);
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

        <div className="container-site relative flex min-h-[68vh] flex-col justify-end pb-16 pt-28 sm:min-h-[78vh] sm:pb-24">
          <div className="animate-fade-up mb-6 text-white">
            <SiteLogo size="lg" />
          </div>
          <h1 className="type-display animate-fade-up max-w-3xl text-white drop-shadow-[0_2px_20px_rgba(0,0,0,0.4)]">
            {hero.headline}
          </h1>
          <p className="type-title animate-fade-up mt-5 text-white/95">
            {hero.name}
          </p>
          <p className="type-label animate-fade-up mt-2 text-white/75">
            {siteConfig.specialty}
          </p>
          <p className="type-body-lg animate-fade-up mt-6 max-w-xl text-white/90">
            {hero.support}
          </p>
          <div
            className="animate-fade-up mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center"
            style={{ animationDelay: "100ms" }}
          >
            <ButtonLink href="/timebestilling" variant="primary">
              {t("book")}
            </ButtonLink>
            <ButtonLink href={siteConfig.phoneHref} variant="onDark">
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
                caption={<ClinicCaption />}
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
