import { setRequestLocale } from "next-intl/server";

import { LandingPageView } from "@/components/content/landing-page-view";
import { homePageForLocale } from "@/content";
import { sourcePageMetadata } from "@/lib/page-metadata";

type HomePageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: HomePageProps) {
  const { locale } = await params;
  return sourcePageMetadata(locale, homePageForLocale(locale));
}

export default async function HomePage({ params }: HomePageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <LandingPageView />;
}
