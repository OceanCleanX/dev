import dynamic from "next/dynamic";

import Header from "./_components/header";
import Footer from "./_components/footer";

import type { FC, PropsWithChildren } from "react";

const Bg = dynamic(() => import("./_components/bg"));

const Layout: FC<PropsWithChildren> = ({ children }) => (
  <>
    <div className="flex flex-col min-h-screen relative">
      <Header />
      {children}
      <Footer />
    </div>
    <div
      className="top-0 left-0 fixed w-screen h-screen -z-[999] brightness-[115%] contrast-125 hue-rotate-15 blur-3xl"
      aria-hidden
    >
      <Bg />
    </div>
  </>
);

export default Layout;
