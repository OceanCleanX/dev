import useWs from "./hooks/useWs";
import { Control, ControlModeSwitch } from "./components/controls";
import Camera from "./components/camera";
import SocketInfo from "./components/socket-info";

const App = () => {
  useWs();

  return (
    <div className="h-screen w-screen grid grid-cols-9 grid-rows-4 gap-4 p-4">
      <Camera className="border col-span-7 row-span-3" />
      <div className="col-span-2 row-span-3">
        <SocketInfo />
        <div className="mt-3" />
        <div>
          <span className="font-semibold">Control Mode: </span>
          <ControlModeSwitch />
        </div>
      </div>
      <Control className="col-span-9 row-span-1" />
    </div>
  );
};

export default App;
