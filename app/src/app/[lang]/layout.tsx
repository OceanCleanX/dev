import { Provider as JotaiProvider } from "jotai";
import { notFound } from "next/navigation";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { setRequestLocale } from "next-intl/server";

import { routing } from "@/i18n/routing";
import QueryProvider from "@/components/providers/tanstack-query";
import MotionProvider from "@/components/providers/motion";

import "./globals.css";

import type { Metadata } from "next";
import type { FC, PropsWithChildren } from "react";

const metadata: Metadata = {
  title: "OceanCleanX",
};

const generateStaticParams = () => routing.locales.map((lang) => ({ lang }));

const Layout: FC<
  PropsWithChildren<{
    params: Promise<{ lang: string }>;
  }>
> = async ({ children, params }) => {
  const { lang } = await params;
  if (!hasLocale(routing.locales, lang)) notFound();
  setRequestLocale(lang);

  return (
    <html lang="en">
      <body>
        <div id="root">
          <NextIntlClientProvider>
            <QueryProvider>
              <JotaiProvider>
                <MotionProvider>{children}</MotionProvider>
              </JotaiProvider>
            </QueryProvider>
          </NextIntlClientProvider>
        </div>
      </body>
    </html>
  );
};

export default Layout;
export { generateStaticParams, metadata };
