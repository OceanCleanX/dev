import { Provider as JotaiProvider } from "jotai";
import { NextIntlClientProvider } from "next-intl";

import Compose from "@/components/compose";
import QueryProvider from "@/components/providers/tanstack-query";
import MotionProvider from "@/components/providers/motion";
import TRPCProvider from "@/components/providers/trpc";

import type { FC, PropsWithChildren } from "react";

const Providers: FC<
  PropsWithChildren<{
    intl: { locale?: string; messages: Record<string, unknown> };
  }>
> = ({ children, intl: { locale, messages } }) => (
  <Compose
    components={[
      [NextIntlClientProvider, { locale, messages }],
      QueryProvider,
      TRPCProvider,
      JotaiProvider,
      MotionProvider,
    ]}
  >
    {children}
  </Compose>
);

export default Providers;
