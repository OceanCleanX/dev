import QueryProvider from "./tanstack-query";
import AgoraProvider from "./agora";

import type { FC, PropsWithChildren } from "react";

const Providers: FC<PropsWithChildren> = ({ children }) => (
  <QueryProvider>
    <AgoraProvider>{children}</AgoraProvider>
  </QueryProvider>
);

export default Providers;
