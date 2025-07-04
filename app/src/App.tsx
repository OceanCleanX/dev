import useWs from "@/hooks/useWs";
import { Control, ControlModeSwitch } from "@/components/controls";
import Camera from "@/components/camera";
import SocketInfo from "@/components/socket-info";
import useSpeed from "@/components/controls/useSpeed";

const App = () => {
  useWs();
  const speed = useSpeed();

  return (
    <div className="h-screen w-screen grid grid-cols-9 grid-rows-[24] gap-4 p-4">
      <Camera className="border col-span-7 row-span-[17]" />
      <div className="col-span-2 row-span-[17]">
        <SocketInfo />
        <div className="mt-3" />
        <div>
          <span className="font-semibold">Control Mode: </span>
          <ControlModeSwitch />
        </div>
        <div>
          <span className="font-semibold">Speed: </span>
          <span className="font-mono">{`[${speed[0]}, ${speed[1]}]`}</span>
        </div>
      </div>
      <Control className="col-span-9 row-span-7" />
    </div>
  );
};

export default App;
