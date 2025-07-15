import { useQueryClient } from "@tanstack/react-query";
import useWebSocket from "react-use-websocket";
import { useAddLog } from "./log";
import { useTranslations } from "next-intl";

import type { SocketInfoType } from "./useSocketInfo";

type ResponseData = SocketInfoType;
type ServerResponse =
  | { success: true; data: ResponseData }
  | { success: false; msg: string };

const WS_URL =
  process.env.NODE_ENV === "production"
    ? `wss://${process.env.NEXT_PUBLIC_SERVER_URL}/ws`
    : `ws://${process.env.NEXT_PUBLIC_SERVER_URL}:${process.env.NEXT_PUBLIC_SERVER_PORT}/ws`;

const useWs = () => {
  const client = useQueryClient();
  const addLog = useAddLog();
  const t = useTranslations("control.log");

  return useWebSocket(WS_URL, {
    share: true,
    onMessage: (ev) => {
      const data = JSON.parse(ev.data) as ServerResponse;

      if (!data.success) {
        addLog(t("ws-server-error"), data.msg);
        return;
      }

      const { type, ...rest } = data.data;
      client.setQueryData(["ws", type], rest);
    },
    onError: () => addLog(t("ws-error")),
  });
};

export default useWs;
