import { useTranslations } from "next-intl";
import type { FC, PropsWithChildren } from "react";

const Layout: FC<PropsWithChildren> = ({ children }) => {
  const t = useTranslations("auth");

  return (
    <>
      <h1 className="block w-min text-primary font-semibold tracking-wide text-center text-4xl">
        {t("welcome")}
      </h1>
      {children}
    </>
  );
};

export default Layout;
