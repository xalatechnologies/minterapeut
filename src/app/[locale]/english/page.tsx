import { setRequestLocale } from "next-intl/server";

import { redirect } from "@/i18n/navigation";

type Props = { params: Promise<{ locale: string }> };

/** Legacy therapy-language URL → English locale home */
export default async function Page({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  redirect({ href: "/", locale: "en" });
}
