import type { ReactNode } from "react";

import "./globals.css";

type RootLayoutProps = {
  children: ReactNode;
};

/**
 * Root layout is a passthrough so locale-aware <html lang> lives in [locale].
 * Required by the App Router; next-intl owns document shell per locale.
 */
export default function RootLayout({ children }: RootLayoutProps) {
  return children;
}
