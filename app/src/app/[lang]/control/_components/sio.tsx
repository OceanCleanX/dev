import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
} from "react";
import { io } from "socket.io-client";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useTranslations } from "next-intl";

import { useAddLog } from "./log";

import type { FC, PropsWithChildren } from "react";
import type { Socket } from "socket.io-client";
import type { S2CEv, C2SEv } from "@server/socket-io";

const SIO_URL =
  process.env.NODE_ENV === "production"
    ? `https://${process.env.NEXT_PUBLIC_SERVER_URL}`
    : `http://${process.env.NEXT_PUBLIC_SERVER_URL}:${process.env.NEXT_PUBLIC_SERVER_PORT}`;

type SIOWrapper = Socket<S2CEv, C2SEv>;

const SIOCtx = createContext<SIOWrapper | null>(null);
const RegSIOCbCtx = createContext<((key: keyof S2CEv) => void) | null>(null);

const SIOProvider: FC<PropsWithChildren> = ({ children }) => {
  const client = useQueryClient();
  const socketRef = useRef<SIOWrapper>(io(SIO_URL, { autoConnect: false }));
  const registeredCbs = useRef<Set<keyof S2CEv>>(new Set());
  const addLog = useAddLog();
  const t = useTranslations("control.log");

  const registerSIOCb = useCallback(
    (key: keyof S2CEv) => {
      if (registeredCbs.current.has(key)) return;

      registeredCbs.current.add(key);
      socketRef.current.on(key, (...data: Parameters<S2CEv[typeof key]>) =>
        client.setQueryData(["sio", key], data),
      );
    },
    [client],
  );

  useEffect(() => {
    const { current: socket } = socketRef;
    const { current: registered } = registeredCbs;
    socket.connect();

    socket.on("connect", () => addLog(t("sio-connected")));
    socket.on("connect_error", () => addLog(t("sio-connect-error")));
    socket.on("error", (msg) => addLog(t("sio-error", { error: msg })));
    registered.forEach((key) =>
      socket.on(key, (...data: Parameters<S2CEv[typeof key]>) =>
        client.setQueryData(["sio", key], data),
      ),
    );

    return () => {
      socket.off("error");
      registered.forEach((key) => socket.off(key));
      socket.disconnect();
    };
  }, [addLog, client, t]);

  return (
    <SIOCtx.Provider value={socketRef.current}>
      <RegSIOCbCtx.Provider value={registerSIOCb}>
        {children}
      </RegSIOCbCtx.Provider>
    </SIOCtx.Provider>
  );
};

const useSIO = (): SIOWrapper => {
  const sio = useContext(SIOCtx);
  if (!sio) throw new Error("useSIO must be used within SIOProvider");
  return sio;
};

const useSIOEvData = <T extends keyof Omit<S2CEv, "error">>(
  key: keyof S2CEv,
) => {
  const registerSIOCb = useContext(RegSIOCbCtx);
  if (!registerSIOCb)
    throw new Error("useSIOData must be used within SIOProvider");

  useEffect(() => registerSIOCb(key), [key, registerSIOCb]);

  return useQuery({
    queryKey: ["sio", key],
    queryFn: () => null as unknown as Parameters<S2CEv[T]>,
  });
};

export { SIOProvider, useSIO, useSIOEvData };
