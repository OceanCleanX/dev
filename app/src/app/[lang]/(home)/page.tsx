import { useTranslations } from "next-intl";
import Image from "next/image";
import { ChevronDownIcon } from "@radix-ui/react-icons";

import InView from "@/components/motion-primitives/in-view";

import WhatIs from "./_components/whatis";
import CoreTechs from "./_components/core-techs";

import type { FC, PropsWithChildren } from "react";

const OnePage: FC<PropsWithChildren> = ({ children }) => (
  <div className="w-screen min-h-[75vh] lg:min-h-screen h-fit py-10">
    {children}
  </div>
);

const Page = () => {
  const t = useTranslations("home");

  return (
    <>
      <div className="w-screen relative">
        <div className="absolute z-10 left-1/2 -translate-x-1/2 sm:translate-x-0 mt-10 sm:mt-0 sm:left-20 sm:top-[13%]">
          <h1 className="font-semibold text-4xl sm:text-6xl lg:text-[5rem] text-white tracking-[0.0375em]">
            OceanCleanX
          </h1>
          <div className="text-sm sm:text-2xl lg:text-[1.7rem] text-[#9FD3E3] pt-2 sm:pt-5 font-light sm:mt-0">
            {t("subtitle")}
          </div>
        </div>
        <Image
          className="-z-10 mask-b-from-20% md:mask-b-to-70% brightness-110 contrast-[110%] sepia-[0.1]"
          src="/bg.jpg"
          alt="OceanCleanX background"
          width={3992}
          height={2992}
          priority
        />
        <div className="hidden absolute bottom-[calc(100%-100vh+4rem+32px)] left-1/2 -translate-x-1/2 md:flex flex-col items-center space-y-3.5">
          <span className="text-sm text-neutral">Scroll to continue...</span>
          <ChevronDownIcon className="i-ph-caret-down size-[18px] motion-safe:animate-bounce" />
        </div>
      </div>
      <InView
        variants={{
          hidden: { opacity: 0, y: 100, filter: "blur(4px)" },
          visible: {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            transition: { staggerChildren: 0.09 },
          },
        }}
        viewOptions={{ margin: "0px 0px -200px 0px" }}
        transition={{ duration: 0.3 }}
      >
        <OnePage>
          <WhatIs />
        </OnePage>
      </InView>
      <InView
        variants={{
          hidden: { opacity: 0, y: 100, filter: "blur(4px)" },
          visible: {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            transition: { staggerChildren: 0.09 },
          },
        }}
        viewOptions={{ margin: "0px 0px -200px 0px" }}
        transition={{ duration: 0.3 }}
      >
        <div className="w-screen min-h-fit h-[75vh] py-10">
          <CoreTechs />
        </div>
      </InView>
    </>
  );
};

export default Page;
