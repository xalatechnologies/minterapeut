import { getTranslations } from "next-intl/server";

import { ButtonLink } from "@/components/ui/button-link";
import { siteConfig } from "@/lib/site-config";

export async function ClinicVisitPanel({ className }: { className?: string }) {
  const t = await getTranslations("Appointments");
  const tSite = await getTranslations("Site");

  return (
    <aside
      className={
        className ??
        "overflow-hidden rounded-2xl border border-outline-variant/30 bg-surface-container-lowest shadow-[var(--shadow-soft)]"
      }
    >
      <div className="border-b border-outline-variant/20 bg-surface-container-low/80 px-5 py-4 sm:px-6">
        <p className="type-caption text-secondary">{t("visitTitle")}</p>
        <p className="type-title mt-1 text-on-surface">{siteConfig.therapistName}</p>
        <p className="type-label mt-1 text-on-surface-variant">
          {tSite("specialty")}
        </p>
      </div>

      <div className="flex flex-col gap-5 px-5 py-5 sm:px-6">
        <div>
          <p className="type-caption text-secondary">{t("call")}</p>
          <a
            href={siteConfig.phoneHref}
            className="mt-1 block type-title text-sage-deep transition hover:underline"
          >
            {siteConfig.phone}
          </a>
        </div>

        <div>
          <p className="type-caption text-secondary">{t("email")}</p>
          <a
            href={siteConfig.emailHref}
            className="mt-1 block type-label break-all text-on-surface-variant transition hover:text-sage-deep"
          >
            {siteConfig.email}
          </a>
        </div>

        <div>
          <p className="type-caption text-secondary">{t("hours")}</p>
          <p className="mt-1 type-label leading-relaxed text-on-surface-variant">
            {t("hoursValue")}
          </p>
        </div>

        <div>
          <p className="type-caption text-secondary">{t("address")}</p>
          <address className="mt-1 type-label not-italic leading-relaxed text-on-surface-variant">
            {tSite("clinicLine1")}
            <br />
            {siteConfig.clinicLine2}
            <br />
            {siteConfig.clinicLine3}
          </address>
        </div>

        <div className="flex flex-col gap-2.5">
          <ButtonLink
            href={siteConfig.phoneHref}
            variant="primary"
            className="w-full"
          >
            {t("callAction")} {siteConfig.phone}
          </ButtonLink>
          <ButtonLink
            href={siteConfig.mapsUrl}
            variant="outline"
            className="w-full"
          >
            {t("openMaps")}
          </ButtonLink>
        </div>
      </div>

      <div className="relative aspect-[4/3] w-full border-t border-outline-variant/20 bg-surface-container">
        <iframe
          title={t("mapTitle")}
          src={siteConfig.mapsEmbedUrl}
          className="absolute inset-0 h-full w-full border-0"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
        />
      </div>
    </aside>
  );
}
