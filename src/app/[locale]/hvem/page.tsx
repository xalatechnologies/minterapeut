import { setRequestLocale } from "next-intl/server";

import { EditorialPageView } from "@/components/content/source-page-view";
import { sourcePageMetadata } from "@/lib/page-metadata";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  return sourcePageMetadata(locale, "hvem.htm");
}

export default async function Page({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <EditorialPageView file="hvem.htm" />;
}
