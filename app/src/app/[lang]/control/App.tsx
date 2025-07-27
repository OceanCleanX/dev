import { Control } from "./_components/controls";
import Camera from "./_components/camera";
import AgoraProvider from "./_components/agora";
import Info from "./_components/info";
import Map from "./_components/map";
import Log from "./_components/log";
import { SIOProvider } from "./_components/sio";
import cn from "@/lib/cn";

const BG_CLS =
  "backdrop-blur-md backdrop-saturate-[180%] [backface-visibility:hidden] backdrop-hue-rotate-15 backdrop-contrast-50 bg-white/30 rounded-lg";
const TEXT_LAYOUT_CLS = "px-4 py-3 overflow-y-auto";

const App = () => (
  <SIOProvider>
    <AgoraProvider>
      <div className="h-screen w-screen relative">
        <div
          className={cn(
            "absolute top-4 right-3 w-60 h-80",
            BG_CLS,
            TEXT_LAYOUT_CLS,
          )}
        >
          <Info />
        </div>
        <Control className="absolute bottom-64 left-40" />
        <div className="absolute top-0 left-0 w-96 h-64 overflow-hidden">
          <Map />
        </div>
        <div
          className={cn(
            "absolute bottom-8 right-3 w-80 h-80",
            BG_CLS,
            TEXT_LAYOUT_CLS,
          )}
        >
          <Log />
        </div>
        <div className="absolute w-screen h-screen top-0 left-0 -z-10">
          <Camera className="w-full h-full" />
        </div>
      </div>
    </AgoraProvider>
  </SIOProvider>
);

export default App;
