import { setRequestLocale } from "next-intl/server";

import { EditorialPageView } from "@/components/content/source-page-view";
import { sourcePageMetadata } from "@/lib/page-metadata";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  return sourcePageMetadata(locale, "nederlag.htm");
}

export default async function Page({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <EditorialPageView file="nederlag.htm" />;
}
