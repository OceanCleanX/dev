import { useQuery } from "@tanstack/react-query";
import AgoraRTC, { AgoraRTCProvider } from "agora-rtc-react";

import type { FC, PropsWithChildren } from "react";

type AgoraInfo = {
  appId: string;
  token: string;
  channel: string;
  uid: number;
};

const AgoraProvider: FC<PropsWithChildren> = ({ children }) => {
  const client = AgoraRTC.createClient({ mode: "rtc", codec: "h264" });

  const { data: agoraInfo } = useQuery({
    queryKey: ["agora"],
    queryFn: async () => {
      const res = await fetch(
        `http://${import.meta.env.VITE_SERVER_URL}:${import.meta.env.VITE_SERVER_PORT}/api/agora`,
      );
      return (await res.json()) as AgoraInfo;
    },
    staleTime: parseInt(import.meta.env.VITE_AGORA_TOKEN_EXPIRE) * 1000,
  });

  useQuery({
    queryKey: ["agora", "join"],
    queryFn: () => {
      const { appId, token, channel, uid } = agoraInfo!;
      client.join(appId, channel, token, uid);
      return "something";
    },
    enabled: !!agoraInfo,
  });

  return <AgoraRTCProvider client={client}>{children}</AgoraRTCProvider>;
};

export default AgoraProvider;
