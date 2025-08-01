import cn from "@/lib/cn";

import Camera from "./_components/camera";
import Header from "./_components/header";
import SystemInfo from "./_components/info/system";
import ControlInfo from "./_components/info/control";
import Map from "./_components/map";
import { Control } from "./_components/controls";
import DisplayLog from "./_components/display-log";
import ControlStatus from "./_components/controls/display-status";

const FIRST_COL = "col-span-5 lg:col-span-6";
const SECOND_COL = "col-span-9 lg:col-span-15";
const THIRD_COL = "col-span-4 lg:col-span-5";

const Page = () => (
  <div className="w-screen h-screen bg-[#000D16] flex flex-col">
    <Header />
    <div className="grow grid grid-cols-[repeat(18,minmax(0,1fr))] lg:grid-cols-[repeat(26,minmax(0,1fr))] grid-rows-[repeat(24,minmax(0,1fr))] gap-[1.125rem] p-[1.125rem] *:overflow-hidden *:border *:border-[#0A1D2B] *:rounded-xl">
      {/* Map */}
      <div className={cn(FIRST_COL, "row-span-[14]")}>
        <Map />
      </div>
      {/* Camera */}
      <div className={cn(SECOND_COL, "row-span-[14]")}>
        <Camera className="size-full hue-rotate-15" />
      </div>
      {/* System info */}
      <div className={cn(THIRD_COL, "row-span-7 bg-[#00121E]")}>
        <SystemInfo />
      </div>
      {/* Control info */}
      <div className={cn(THIRD_COL, "row-span-7 bg-[#00121E]")}>
        <ControlInfo />
      </div>
      {/* Control & log */}
      <div
        className={cn(
          FIRST_COL,
          "row-span-10 bg-[#00121E] border-none px-6 py-4 flex flex-col",
        )}
      >
        <div className="mx-auto w-fit *:w-fit scale-[85%]">
          <Control />
        </div>
        <div className="flex-1 basis-1">
          <DisplayLog />
        </div>
      </div>
      {/* Motor & speed info */}
      <div
        className={cn(
          "col-span-3 lg:col-span-5",
          "row-span-10 border-none px-2.5 pt-4 pb-2",
        )}
      >
        <ControlStatus />
      </div>
      {/* Radar & trash freq */}
      <div className={cn("col-span-6 lg:col-span-10", "row-span-10")}></div>
      {/* Trash status */}
      <div className={cn(THIRD_COL, "row-span-10")}></div>
    </div>
  </div>
);

export default Page;
