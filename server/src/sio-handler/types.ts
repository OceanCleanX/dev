import type {
  S2CEv,
  C2SEv,
  ServerSideEvents,
  SocketData,
} from "@/exports/socket-io";
import type { Socket } from "socket.io";
import type { Boat } from "@/config/boats";

type registerHandler = (
  socket: Socket<C2SEv, S2CEv, ServerSideEvents, SocketData>,
  boat: Boat,
) => void;

export type { registerHandler };
