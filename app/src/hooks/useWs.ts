import { useQueryClient } from "@tanstack/react-query";
import useWebSocket from "react-use-websocket";

import type { SocketInfoType } from "./useSocketInfo";

type ResponseData = SocketInfoType;
type ServerResponse =
  | { success: true; data: ResponseData }
  | { success: false; msg: string };

const WS_URL = `${import.meta.env.PROD ? "wss" : "ws"}://${import.meta.env.VITE_SERVER_URL}:${import.meta.env.VITE_SERVER_PORT}/ws`;

const useWs = () => {
  const client = useQueryClient();

  return useWebSocket(WS_URL, {
    share: true,
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
