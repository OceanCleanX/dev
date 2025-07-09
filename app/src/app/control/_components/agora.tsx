import AgoraRTC, { AgoraRTCProvider, useJoin } from "agora-rtc-react";

import type { FC, PropsWithChildren } from "react";

type AgoraInfo = {
  appid: string;
  token: string;
  channel: string;
  uid: number | string;
};

const apiUrl =
  process.env.NODE_ENV === "production"
    ? `https://${process.env.NEXT_PUBLIC_SERVER_URL}/api/agora`
    : `http://${process.env.NEXT_PUBLIC_SERVER_URL}:${process.env.NEXT_PUBLIC_SERVER_PORT}/api/agora`;

const AutoJoin = () => {
  useJoin(async () => {
    console.log(apiUrl);
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
