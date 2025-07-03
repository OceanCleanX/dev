import AgoraRTC, { AgoraRTCProvider, useJoin } from "agora-rtc-react";

import type { FC, PropsWithChildren } from "react";

type AgoraInfo = {
  appid: string;
  token: string;
  channel: string;
  uid: number | string;
};

const apiUrl = import.meta.env.PROD
  ? `https://${import.meta.env.VITE_SERVER_URL}/api/agora`
  : `http://${import.meta.env.VITE_SERVER_URL}:${import.meta.env.VITE_SERVER_PORT}/api/agora`;

const AutoJoin = () => {
  useJoin(async () => {
    const res = await fetch(apiUrl);
    return (await res.json()) as AgoraInfo;
  });

  return null;
};

const AgoraProvider: FC<PropsWithChildren> = ({ children }) => {
  const client = AgoraRTC.createClient({ mode: "rtc", codec: "h265" });

  return (
    <AgoraRTCProvider client={client}>
      <AutoJoin />
      {children}
    </AgoraRTCProvider>
  );
};

export default AgoraProvider;
