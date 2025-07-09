import useWs from "./_components/useWs";
import useSpeed from "./_components/controls/useSpeed";
import { Control, ControlModeSwitch } from "./_components/controls";
import Camera from "./_components/camera";
import SocketInfo from "./_components/socket-info";
import AgoraProvider from "./_components/agora";

const App = () => {
  useWs();
  const speed = useSpeed();

  return (
    <AgoraProvider>
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
    </AgoraProvider>
  );
};

export default App;
