import { TriangleLeftIcon } from "@radix-ui/react-icons";
import { useTranslations } from "next-intl";

import { Link } from "@/i18n/navigation";

import type { FC, PropsWithChildren } from "react";

const Layout: FC<PropsWithChildren> = ({ children }) => {
  const t = useTranslations("auth");

  return (
    <div className="w-screen h-screen flex flex-row">
      <div className="grow relative">
        <Link
          href="/"
          className="absolute top-3 left-3 inline-flex items-center space-x-1 text-[#A5A5A5]"
        >
          <TriangleLeftIcon className="size-7" />
          <span className="text-sm">{t("back")}</span>
        </Link>
        <div className="h-full mx-auto px-4 py-20 w-fit flex flex-col items-center">
          {children}
        </div>
      </div>
      <div className="hidden md:block basis-sm bg-gray-300"></div>
    </div>
  );
};

export default Layout;
