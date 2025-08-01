import Compose from "@/components/compose";

import { SIOProvider } from "./_components/sio";
import AgoraProvider from "./_components/agora-wrapper";

import type { FC, PropsWithChildren } from "react";

const Layout: FC<PropsWithChildren> = ({ children }) => (
  <Compose components={[SIOProvider, AgoraProvider as FC<PropsWithChildren>]}>
    {children}
  </Compose>
);

export default Layout;
