import { setRequestLocale } from "next-intl/server";

import {
  LandingPageView,
  type LandingPageFile,
} from "@/components/content/landing-page-view";
import { homePageForLocale } from "@/content";
import { sourcePageMetadata } from "@/lib/page-metadata";

type HomePageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: HomePageProps) {
  const { locale } = await params;
  const file = homePageForLocale(locale) as LandingPageFile;
  return sourcePageMetadata(locale, file);
}

export default async function HomePage({ params }: HomePageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  const file = homePageForLocale(locale) as LandingPageFile;
  return <LandingPageView file={file} />;
}
