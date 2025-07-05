import QueryProvider from "./tanstack-query";
import AgoraProvider from "./agora";

import type { FC, PropsWithChildren } from "react";
import { ToastProvider } from "@radix-ui/react-toast";
import JotaiProvider from "./jotai";

const Providers: FC<PropsWithChildren> = ({ children }) => (
  <QueryProvider>
    <JotaiProvider>
      <AgoraProvider>
        <ToastProvider>{children}</ToastProvider>
      </AgoraProvider>
    </JotaiProvider>
  </QueryProvider>
);

export default Providers;
