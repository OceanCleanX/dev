import QueryProvider from "@/components/providers/tanstack-query";
import { Provider as JotaiProvider } from "jotai";
import { notFound } from "next/navigation";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { routing } from "@/i18n/routing";

import "./globals.css";

import type { Metadata } from "next";
import type { FC, PropsWithChildren } from "react";

const metadata: Metadata = {
  title: "ControlPanel - OceanCleanX",
};

const Layout: FC<
  PropsWithChildren<{
    params: Promise<{ lang: string }>;
  }>
> = async ({ children, params }) => {
  const { lang } = await params;
  if (!hasLocale(routing.locales, lang)) {
    notFound();
  }
  return (
    <html lang="en">
      <head>
        <title>ControlPanel - OceanCleanX</title>
      </head>
      <body>
        <div id="root">
          <NextIntlClientProvider>
            <QueryProvider>
              <JotaiProvider>{children}</JotaiProvider>
            </QueryProvider>
          </NextIntlClientProvider>
        </div>
      </body>
    </html>
  );
};

export default Layout;
export { metadata };
