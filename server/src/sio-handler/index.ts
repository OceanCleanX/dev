import net from "net";

import logger from "@/logger";
import boats from "@/config/boats";
import { createPayload, parseResponse } from "@/utils/control-protocol";

import type {
  S2CEv,
  C2SEv,
  ServerSideEvents,
  SocketData,
} from "@/exports/socket-io";
import type { Socket } from "socket.io";
import type { Boat } from "@/config/boats";

const boatsRegistry: [Boat, available: boolean][] = boats.map((b) => [b, true]);

const getAvailableBoat = () => boatsRegistry.find((b) => b[1])?.[0];

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

  // initialize resources

  // control TCP socket server
  const controlSocket = new net.Socket();
  controlSocket.connect(
    boat["control-server-port"],
    boat["control-server-addr"],
    () =>
      logger.info(
        `Connected client ${socket.id} to control server at ${boat["control-server-addr"]}:${boat["control-server-port"]}`,
      ),
  );
  controlSocket.on("data", (data) => {
    const { raw: __, ...res } = parseResponse(data);
    if (!res.valid) return;
    socket.emit("control-info", res);
  });
  controlSocket.on("close", () => logger.info("Control connection closed"));
  controlSocket.on("error", (err) =>
    logger.error(`Control TCP connection error: ${err.message}`),
  );

  // TODO: station WebSocket server

  // handlers
  socket.on("disconnect", () => {
    logger.info(`Client ${socket.id} disconnected`);
    controlSocket.destroy();
  });
  socket.on("error", (err) => logger.error(`Socket error: ${err.message}`));
  socket.on("speed", (left, right) => {
    if (controlSocket.destroyed) {
      socket.emit("error", "Control socket is not connected");
      return;
    }
    controlSocket.write(createPayload(left, right));
  });
};

export default handler;
