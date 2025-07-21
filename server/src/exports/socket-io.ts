import type { ValidSocketInfo as ControlInfo } from "@/utils/control-protocol";

interface S2CEv {
  "control-info": (info: ControlInfo) => void;
  error: (msg: string) => void;
}

interface C2SEv {
  speed: (left: number, right: number) => void;
}

interface ServerSideEvents {}

interface SocketData {}

export type { S2CEv, C2SEv, ServerSideEvents, SocketData };
