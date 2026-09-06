import Image from "next/image";
import { getLocale, getTranslations } from "next-intl/server";

import { ClinicVisitPanel } from "@/components/content/clinic-visit-panel";
import { SourceMarkdown } from "@/components/content/source-markdown";
import { ButtonLink } from "@/components/ui/button-link";
import {
  getSourcePage,
  type SourcePageFile,
} from "@/content";
import { extractH1, splitAtHeadings } from "@/lib/content-sections";
import { siteConfig } from "@/lib/site-config";

type EditorialPageViewProps = {
  file: SourcePageFile;
};

const PORTRAIT_FILES = new Set<SourcePageFile>(["hvem.htm"]);
const MEDIA_HERO_FILES = new Set<SourcePageFile>([
  "timebestilling.htm",
  "hva.htm",
]);
const SHORT_PAGES = new Set<SourcePageFile>(["nederlag.htm", "offentlig.htm"]);
const VISIT_PANEL_FILES = new Set<SourcePageFile>(["timebestilling.htm"]);

/** Prefer atmospheric clinic photography when source image is poorly suited as a wide hero. */
const MEDIA_HERO_OVERRIDES: Partial<Record<SourcePageFile, string>> = {
  "timebestilling.htm": "/images/appointments-forest.jpg",
};

function isCrisisSection(markdown: string) {
  const first = markdown.split("\n")[0]?.toLowerCase() ?? "";
  return (
    first.includes("selvmord") ||
    first.includes("suicid") ||
    first.includes("akut") ||
    first.includes("urgent") ||
    first.includes("krise") ||
    first.includes("crisis") ||
    first.includes("crise") ||
    first.includes("notfall")
  );
}

export async function EditorialPageView({ file }: EditorialPageViewProps) {
  const locale = await getLocale();
  const tSite = await getTranslations("Site");
  const tAppointments = await getTranslations("Appointments");
  const page = getSourcePage(file, locale);
  const { title, body } = extractH1(page.content);
  const sections = splitAtHeadings(body);
  const contentSections = sections.filter((s) => s.kind !== "contact");
  const contactSections = sections.filter((s) => s.kind === "contact");
  const overrideSrc = MEDIA_HERO_OVERRIDES[file];
  const imageSrc = overrideSrc
    ? overrideSrc
    : page.image
      ? page.image.startsWith("/")
        ? page.image
        : `/${page.image}`
      : null;
  const isPortrait = PORTRAIT_FILES.has(file);
  const useMediaHero = MEDIA_HERO_FILES.has(file) && Boolean(imageSrc);
  const showVisitPanel = VISIT_PANEL_FILES.has(file);
  const showSideImage =
    Boolean(imageSrc) &&
    !useMediaHero &&
    !SHORT_PAGES.has(file) &&
    !showVisitPanel;
  const pageTitle = title || page.heading;
  const specialty = tSite("specialty");

  const contentBlock = (
    <>
      {contentSections.map((section, index) => {
        const crisis = isCrisisSection(section.markdown);
        const showImage = showSideImage && index === 0;
        const surface = crisis
          ? "border-t border-outline-variant/20 bg-secondary-container/25"
          : showVisitPanel
            ? index === 0
              ? ""
              : "border-t border-outline-variant/15 pt-10 lg:pt-12"
            : index % 2 === 0
              ? "bg-background"
              : "border-t border-outline-variant/15 bg-surface-container-low/70";

        return (
          <section
            key={`${file}-editorial-${index}`}
            className={surface}
          >
            <div
              className={
                showVisitPanel
                  ? ""
                  : showImage
                    ? "container-site grid grid-cols-1 items-start gap-12 py-14 lg:grid-cols-12 lg:gap-16 lg:py-16"
                    : "container-site py-14 lg:py-16"
              }
            >
              <div
                className={
                  showVisitPanel
                    ? "animate-fade-up"
                    : showImage
                      ? "animate-fade-up lg:col-span-7"
                      : "animate-fade-up w-full"
                }
              >
                <SourceMarkdown
                  content={section.markdown}
                  density={crisis ? "clinical" : "reading"}
                  className={
                    showVisitPanel || showImage
                      ? undefined
                      : "max-w-none w-full"
                  }
                />
              </div>

              {showImage && imageSrc ? (
                <aside
                  className="animate-fade-up lg:col-span-5"
                  style={{ animationDelay: "80ms" }}
                >
                  <figure className="lg:sticky lg:top-28">
                    <div className="overflow-hidden rounded-lg">
                      <Image
                        src={imageSrc}
                        alt={isPortrait ? siteConfig.therapistName : pageTitle}
                        width={1600}
                        height={isPortrait ? 2000 : 1200}
                        className={`w-full object-cover ${
                          isPortrait
                            ? "aspect-[4/5] object-[center_22%]"
                            : "aspect-[4/5] object-center"
                        }`}
                        sizes="(max-width: 1024px) 100vw, 400px"
                        priority
                      />
                    </div>
                    {isPortrait ? (
                      <figcaption className="mt-5">
                        <p className="type-caption text-secondary">
                          {siteConfig.therapistName}
                        </p>
                        <p className="type-label mt-1.5 text-on-surface-variant">
                          {specialty}
                        </p>
                      </figcaption>
                    ) : null}
                  </figure>
                </aside>
              ) : null}
            </div>
          </section>
        );
      })}

      {contactSections.map((section, index) => (
        <section
          key={`${file}-contact-${index}`}
          className={
            showVisitPanel
              ? "border-t border-outline-variant/15 pt-10 lg:pt-12"
              : "border-t border-outline-variant/20 bg-background"
          }
        >
          <div className={showVisitPanel ? "" : "container-site py-12 lg:py-16"}>
            <div className={showVisitPanel ? "" : "max-w-2xl"}>
              <SourceMarkdown content={section.markdown} density="clinical" />
            </div>
          </div>
        </section>
      ))}
    </>
  );

  return (
    <div className="flex flex-1 flex-col">
      {useMediaHero && imageSrc ? (
        <section className="relative isolate min-h-[42vh] overflow-hidden sm:min-h-[48vh]">
          <Image
            src={imageSrc}
            alt=""
            fill
            priority
            className="object-cover object-[center_40%]"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0b1210]/88 via-[#0b1210]/50 to-[#0b1210]/20" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0b1210]/65 via-transparent to-[#0b1210]/20" />
          <div className="container-site relative flex min-h-[42vh] flex-col justify-end pb-10 pt-24 sm:min-h-[48vh] sm:pb-16 sm:pt-28">
            <p className="type-caption text-white/70">{siteConfig.brand}</p>
            <h1 className="type-headline mt-3 max-w-3xl text-white drop-shadow-[0_2px_16px_rgba(0,0,0,0.35)]">
              {pageTitle}
            </h1>
            {showVisitPanel ? (
              <div className="mt-6 flex w-full max-w-xl flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
                <ButtonLink
                  href={siteConfig.phoneHref}
                  variant="primary"
                  className="w-full sm:w-auto"
                >
                  {tAppointments("callAction")} {siteConfig.phone}
                </ButtonLink>
                <ButtonLink
                  href={siteConfig.mapsUrl}
                  variant="onDark"
                  className="w-full sm:w-auto"
                >
                  {tAppointments("openMaps")}
                </ButtonLink>
              </div>
            ) : null}
          </div>
        </section>
      ) : (
        <section className="border-b border-outline-variant/20 bg-surface-container-low">
          <div className="container-site py-14 sm:py-16 lg:py-20">
            <p className="type-caption text-secondary">{siteConfig.brand}</p>
            <h1 className="type-headline mt-3 max-w-3xl text-on-surface">
              {pageTitle}
            </h1>
            {isPortrait ? (
              <p className="type-label mt-3 text-on-surface-variant">
                {specialty}
              </p>
            ) : null}
          </div>
        </section>
      )}

      {showVisitPanel ? (
        <section className="bg-background">
          <div className="container-site grid grid-cols-1 items-start gap-10 py-12 lg:grid-cols-12 lg:gap-14 lg:py-16">
            <div className="lg:col-span-7">{contentBlock}</div>
            <div className="animate-fade-up lg:col-span-5" style={{ animationDelay: "60ms" }}>
              <div className="lg:sticky lg:top-28">
                <ClinicVisitPanel />
              </div>
            </div>
          </div>
        </section>
      ) : (
        contentBlock
      )}
    </div>
  );
}

/** @deprecated Use EditorialPageView */
export async function SourcePageView({ file }: EditorialPageViewProps) {
  return <EditorialPageView file={file} />;
}
