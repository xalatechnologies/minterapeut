import { setRequestLocale } from "next-intl/server";

import { LandingPageView } from "@/components/content/landing-page-view";
import { sourcePageMetadata } from "@/lib/page-metadata";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  return sourcePageMetadata(locale, "english.htm");
}

export default async function Page({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <LandingPageView file="english.htm" />;
}
