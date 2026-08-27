import { getTranslations } from "next-intl/server";

import { getSourcePage, type SourcePageFile } from "@/content";
import { extractH1 } from "@/lib/content-sections";

export async function sourcePageMetadata(
  locale: string,
  file: SourcePageFile,
) {
  const t = await getTranslations({ locale, namespace: "Metadata" });
  const page = getSourcePage(file);
  const { title } = extractH1(page.content);
  const pageTitle = title || page.heading;

  return {
    title: pageTitle,
    description: t("description"),
  };
}
