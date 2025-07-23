import net from "net";

import logger from "@/lib/logger";
import { createPayload, parseResponse } from "@/lib/control-protocol";

import type { RegisterHandler } from "./types";

const registerControlHandler: RegisterHandler = (socket, boat) => {
  // Initialize TCP socket to control server
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

  // register handlers
  socket.on("speed", (left, right) => {
    if (controlSocket.destroyed)
      // TODO: more proper error handling, perhaps close the socket
      // socket.emit("error", "Control socket is not connected");
      return;

    controlSocket.write(createPayload(left, right));
  });
  socket.on("disconnect", () => controlSocket.destroy());
};

export default registerControlHandler;
