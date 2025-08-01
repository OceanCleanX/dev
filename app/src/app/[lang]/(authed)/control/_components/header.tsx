import { GearIcon, HamburgerMenuIcon } from "@radix-ui/react-icons";
import Delay from "./info/delay";

const Header = () => (
  <nav className="w-screen h-16 bg-[#000D16] px-1 *:px-6 border-b border-[#0A1D2B] divide-x-[0.5px] divide-[#0A1D2B] flex *:h-full *:flex *:items-center">
    <div>
      <HamburgerMenuIcon className="text-[#032639] size-6" />
    </div>
    <div className="grow justify-center">
      <h1 className="text-white uppercase text-xl tracking-widest">
        OceanCleanX
      </h1>
    </div>
    <div>
      <span className="inline-flex items-center justify-center space-x-2 font-light">
        <Delay />
      </span>
    </div>
    <div>
      <GearIcon className="text-[#3C9BAF] size-5" />
    </div>
  </nav>
);

export default Header;
