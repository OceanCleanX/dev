import useWs from "./_components/useWs";
import { Control } from "./_components/controls";
import Camera from "./_components/camera";
import AgoraProvider from "./_components/agora";
import Info from "./_components/info";
import Map from "./_components/map";
import Log from "./_components/log";

const App = () => {
  useWs();

  return (
    <AgoraProvider>
      <div className="h-screen w-screen relative">
        <div className="absolute top-4 right-3 w-60 h-80 md:h-96 overflow-y-auto p-4 backdrop-blur-md backdrop-saturate-[180%] [backface-visibility:hidden]">
          <Info />
        </div>
        <Control className="absolute bottom-64 left-40" />
        <div className="absolute top-0 left-0 w-96 h-64 overflow-hidden">
          <Map />
        </div>
        <div className="pl-1.5 absolute bottom-6 right-3 w-80 h-80 overflow-y-auto backdrop-blur-md backdrop-saturate-[180%] [backface-visibility:hidden]">
          <Log />
        </div>
        <div className="absolute w-screen h-screen top-0 left-0 -z-10">
          <Camera className="w-full h-full" />
        </div>
      </div>
    </AgoraProvider>
  );
};

export default App;
