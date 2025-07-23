import type { ValidSocketInfo as ControlInfo } from "@/utils/control-protocol";

type AgoraAuth = {
  appid: string;
  token: string;
  channel: string;
  uid: number | string;
};

interface S2CEv {
  "control-info": (info: ControlInfo) => void;
  error: (msg: string) => void;
}

interface C2SEv {
  speed: (left: number, right: number) => void;
  "agora:auth": (callback: (auth: AgoraAuth) => void) => void;
}

interface ServerSideEvents {}

interface SocketData {}

export type { S2CEv, C2SEv, ServerSideEvents, SocketData };
