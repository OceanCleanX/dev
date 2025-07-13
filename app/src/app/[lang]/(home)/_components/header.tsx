import { CardStackPlusIcon, CaretDownIcon } from "@radix-ui/react-icons";
import * as NavigationMenu from "@radix-ui/react-navigation-menu";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

const navbarStartCls = "inline-flex w-1/2 justify-start items-center";
const navbarEndCls = "inline-flex w-1/2 justify-end items-center";

const Header = () => {
  const t = useTranslations("header");

  return (
    <NavigationMenu.Root className="w-screen p-2 relative">
      <NavigationMenu.List className="w-full flex px-5 py-0.5 sm:py-2 [&_li]:px-2 sm:[&_li]:px-3 [&_li]:py-2 sm:[&_li]:py-1 [&_li]:select-none">
        <div className={navbarStartCls} />
        <div className="inline-flex shrink-0 justify-center items-center space-x-8">
          <NavigationMenu.Item>{t("showcase")}</NavigationMenu.Item>
          <NavigationMenu.Item className="pe-0!">
            <NavigationMenu.Trigger className="group flex items-center justify-between gap-2">
              {`${t("products")} `}
              <CaretDownIcon
                aria-hidden
                className="top-px relative group-data-[state=open]:-rotate-180 transition-transform duration-150 ease-in-out"
              />
            </NavigationMenu.Trigger>
          </NavigationMenu.Item>
          <NavigationMenu.Item>{t("docs")}</NavigationMenu.Item>
          <NavigationMenu.Item>{t("contact")}</NavigationMenu.Item>
        </div>
        <div className={navbarEndCls}>
          <NavigationMenu.Item>
            <NavigationMenu.Link asChild>
              <Link href="/control" aria-label="control panel">
                <CardStackPlusIcon className="size-5" aria-hidden />
              </Link>
            </NavigationMenu.Link>
          </NavigationMenu.Item>
        </div>
      </NavigationMenu.List>

      <div className="-translate-x-8 -translate-y-2 perspective-[2000px] absolute left-0 top-full flex w-full justify-center">
        <NavigationMenu.Viewport className="relative h-[var(--radix-navigation-menu-viewport-height)] w-[var(--radix-navigation-menu-viewport-width)] origin-[top_center]" />
      </div>
    </NavigationMenu.Root>
  );
};

export default Header;
