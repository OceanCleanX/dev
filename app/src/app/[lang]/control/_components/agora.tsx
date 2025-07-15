import AgoraRTC, { AgoraRTCProvider, useJoin } from "agora-rtc-react";
import { useAddLog } from "./log";
import { useTranslations } from "next-intl";

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
  const t = useTranslations("control.log");
  const addLog = useAddLog();

  useJoin(async () => {
    addLog(t("agora-join"));
    try {
      const res = await fetch(apiUrl);
      addLog(t("agora-fetched"));
      return (await res.json()) as AgoraInfo;
    } catch {
      addLog(t("agora-error"));
      return {} as AgoraInfo;
    }
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
