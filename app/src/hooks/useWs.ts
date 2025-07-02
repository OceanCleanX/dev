import { useQueryClient } from "@tanstack/react-query";
import useWebSocket from "react-use-websocket";

type ResponseData = {
  type: "socket_info";
  delay: number;
  voltage: number;
  wifi_strength: number;
  gyro_x: number;
  gyro_y: number;
  gyro_z: number;
};

type ServerResponse =
  | { success: true; data: ResponseData }
  | { success: false; msg: string };

const WS_URL = `ws://${import.meta.env.VITE_SERVER_URL}:${import.meta.env.VITE_SERVER_PORT}/ws`;
const HEARTBEAT_MSG = JSON.stringify({ type: "heartbeat" });

const useWs = () => {
  const client = useQueryClient();

  return useWebSocket(WS_URL, {
    share: true,
    heartbeat: { message: HEARTBEAT_MSG, interval: 50 },
    onMessage: (ev) => {
      const data = JSON.parse(ev.data) as ServerResponse;

      if (!data.success) {
        console.error("WebSocket error:", data.msg);
        return;
      }

      const { type, ...rest } = data.data;
      client.setQueryData(["ws", type], rest);
    },
  });
};

export default useWs;
