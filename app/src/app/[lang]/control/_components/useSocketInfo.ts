import { useQuery } from "@tanstack/react-query";

type SocketInfoType = {
  type: "socket_info";
  delay: number;
  voltage: number;
  wifi_strength: number;
  gyro_x: number;
  gyro_y: number;
  gyro_z: number;
};

const useSocketInfo = () =>
  useQuery<SocketInfoType>({
    queryKey: ["ws", "socket_info"],
    queryFn: () => null as unknown as SocketInfoType,
  });

export default useSocketInfo;
export type { SocketInfoType };
