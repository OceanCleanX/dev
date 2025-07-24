import AgoraRTC, { AgoraRTCProvider, useJoin } from "agora-rtc-react";
import { useTranslations } from "next-intl";

import { useAddLog } from "./log";
import { useSIO } from "./sio";

import type { FC, PropsWithChildren } from "react";

const AutoJoin = () => {
  const t = useTranslations("control.log");
  const addLog = useAddLog();
  const sio = useSIO();

  useJoin(async () => {
    addLog(t("agora-join"));
    try {
      const auth = await sio.timeout(5000).emitWithAck("agora:auth");
      addLog(t("agora-fetched"));
      return auth;
    } catch {
      addLog(t("agora-error"));
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
