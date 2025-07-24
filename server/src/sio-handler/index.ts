import logger from "@/lib/logger";
import boats from "@/config/boats";

import registerControlHandler from "./control-server";

import type {
  S2CEv,
  C2SEv,
  ServerSideEvents,
  SocketData,
} from "@/exports/socket-io";
import type { Socket } from "socket.io";
import type { Boat } from "@/config/boats";
import registerAgoraHandler from "./agora";

const boatsRegistry: Map<Boat, string | null> = new Map(
  boats.map((b) => [b, null]),
);

const getAvailableBoat = () => boatsRegistry.entries().find((b) => !b[1])?.[0];
const setBoat = (boat: Boat, socketId: string | null) =>
  boatsRegistry.set(boat, socketId);

// handle each socket.io connection
const handler = (
  socket: Socket<C2SEv, S2CEv, ServerSideEvents, SocketData>,
) => {
  const boat = getAvailableBoat();
  if (!boat) {
    socket.emit("error", "No available boats");
    socket.disconnect(true);
    return;
  }

  logger.info(`Client ${socket.id} connected`);
  setBoat(boat, socket.id);

  // register handlers
  registerControlHandler(socket, boat);
  registerAgoraHandler(socket, boat);

  // TODO: station WebSocket server

  // handlers
  socket.on("disconnect", () => {
    logger.info(`Client ${socket.id} disconnected`);
    setBoat(boat, null);
  });
  socket.on("error", (err) => logger.error(`Socket error: ${err.message}`));
};

export default handler;
