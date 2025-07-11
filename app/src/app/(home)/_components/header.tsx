import { CardStackPlusIcon, CaretDownIcon } from "@radix-ui/react-icons";
import * as NavigationMenu from "@radix-ui/react-navigation-menu";
import Link from "next/link";

const navbarStartCls = "inline-flex w-1/2 justify-start items-center";
const navbarEndCls = "inline-flex w-1/2 justify-end items-center";

const Header = () => (
  <NavigationMenu.Root className="w-screen p-2 relative">
    <NavigationMenu.List className="w-full flex px-5 py-0.5 sm:py-2 [&_li]:px-2 sm:[&_li]:px-3 [&_li]:py-2 sm:[&_li]:py-1 [&_li]:select-none">
      <div className={navbarStartCls} />
      <div className="inline-flex shrink-0 justify-center items-center space-x-8">
        <NavigationMenu.Item>Showcase</NavigationMenu.Item>
        <NavigationMenu.Item className="pe-0!">
          <NavigationMenu.Trigger className="group flex items-center justify-between gap-2">
            Products{" "}
            <CaretDownIcon
              aria-hidden
              className="top-px relative group-data-[state=open]:-rotate-180 transition-transform duration-150 ease-in-out"
            />
          </NavigationMenu.Trigger>
          <NavigationMenu.Content className="absolute left-0 top-0 w-36 p-2 bg-white drop-shadow-lg">
            Those are the products we offer:
          </NavigationMenu.Content>
        </NavigationMenu.Item>
        <NavigationMenu.Item>Docs</NavigationMenu.Item>
        <NavigationMenu.Item>Contact</NavigationMenu.Item>
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

export default Header;
