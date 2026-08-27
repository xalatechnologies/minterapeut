import { useTranslations } from "next-intl";

import { ButtonLink } from "@/components/ui/button-link";

export default function NotFoundPage() {
  const t = useTranslations("NotFound");

  return (
    <section className="container-site flex flex-1 flex-col justify-center py-20">
      <p className="type-caption text-secondary">404</p>
      <h1 className="type-headline mt-3 text-on-surface">{t("title")}</h1>
      <p className="type-body-lg mt-4 max-w-lg text-on-surface-variant">
        {t("body")}
      </p>
      <div className="mt-8">
        <ButtonLink href="/" variant="primary">
          {t("home")}
        </ButtonLink>
      </div>
    </section>
  );
}
