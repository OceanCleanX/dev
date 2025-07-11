import Header from "./_components/header";
import Bg from "./_components/bg";

import type { FC, PropsWithChildren } from "react";

const Layout: FC<PropsWithChildren> = ({ children }) => (
  <div className="flex flex-col min-h-screen relative">
    <Header />
    {children}
    <div className="absolute w-screen h-screen -z-10" aria-hidden>
      <Bg />
    </div>
  </div>
);

export default Layout;
