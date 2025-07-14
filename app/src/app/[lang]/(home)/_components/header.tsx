import * as NavigationMenu from "@radix-ui/react-navigation-menu";
import { useTranslations } from "next-intl";
import HeaderUser from "./header-user";

const linkCls = "px-1 py-2 text-[#666] text-[0.9rem]";

const Header = () => {
  const t = useTranslations("header");

  return (
    <NavigationMenu.Root className="w-screen bg-white px-8 py-2 shadow-sm">
      <NavigationMenu.List className="flex items-center space-x-4">
        <NavigationMenu.Item className={linkCls}>
          Ocean CleanX
        </NavigationMenu.Item>
        <NavigationMenu.Item className={linkCls}>
          {t("about")}
        </NavigationMenu.Item>
        <NavigationMenu.Item className={linkCls}>
          {t("models")}
        </NavigationMenu.Item>
        <NavigationMenu.Item className={linkCls}>
          {t("support")}
        </NavigationMenu.Item>
        <div className="flex-1" />
        <NavigationMenu.Item>
          <HeaderUser />
        </NavigationMenu.Item>
      </NavigationMenu.List>
    </NavigationMenu.Root>
  );
};

export default Header;
