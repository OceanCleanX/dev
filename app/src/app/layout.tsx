import QueryProvider from "@/components/providers/tanstack-query";
import { Provider as JotaiProvider } from "jotai";

import "./globals.css";

import type { Metadata } from "next";
import type { FC, PropsWithChildren } from "react";

const metadata: Metadata = {
  title: "ControlPanel - OceanCleanX",
};

const Layout: FC<PropsWithChildren> = ({ children }) => (
  <html lang="en">
    <head>
      <title>ControlPanel - OceanCleanX</title>
    </head>
    <body>
      <div id="root">
        <QueryProvider>
          <JotaiProvider>{children}</JotaiProvider>
        </QueryProvider>
      </div>
    </body>
  </html>
);

export default Layout;
export { metadata };
