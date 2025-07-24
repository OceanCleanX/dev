import { notFound } from "next/navigation";
import { hasLocale } from "next-intl";
import { setRequestLocale } from "next-intl/server";

import { routing } from "@/i18n/routing";
import Providers from "@/components/providers";

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
        <Providers>{children}</Providers>
      </body>
    </html>
  );
};

export default Layout;
export { generateStaticParams, metadata };
