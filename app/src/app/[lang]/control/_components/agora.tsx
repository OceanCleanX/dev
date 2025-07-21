import AgoraRTC, { AgoraRTCProvider, useJoin } from "agora-rtc-react";
import { useQuery } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { useEffect } from "react";

import { useTRPC } from "@/lib/trpc";

import { useAddLog } from "./log";

import type { FC, PropsWithChildren } from "react";

const AutoJoin = () => {
  const t = useTranslations("control.log");
  const addLog = useAddLog();

  const trpc = useTRPC();
  const { data, isFetched, isError } = useQuery(trpc.agora.auth.queryOptions());

  useEffect(() => {
    addLog(t("agora-join"));
  }, [addLog, t]);

  useEffect(() => {
    if (isFetched) addLog(t("agora-fetched"));
  }, [addLog, isFetched, t]);

  useEffect(() => {
    if (isError) addLog(t("agora-error"));
  }, [addLog, isError, t]);

  useJoin(data!, isFetched);

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
