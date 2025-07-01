import { TCP_REMOTE_ADDR, TCP_REMOTE_PORT } from "./env";
import validateData from "./validate";
import { createPayload, parseResponse } from "./protocol";

import type { ServerWebSocket, Socket } from "bun";
import type { SocketInfo } from "./protocol";

type ServerResponse<T> =
  | { success: true; data: T }
  | { success: false; msg: string };

const sendResponse = <T, U = unknown>(
  ws: ServerWebSocket<U>,
  res: ServerResponse<T>,
) => ws.send(JSON.stringify(res));

type ResponseData = {
  type: "socket_info";
} & Omit<SocketInfo, "raw">;

const sendSuccess = <T extends ResponseData, U = unknown>(
  ws: ServerWebSocket<U>,
  response: T,
) => sendResponse(ws, { success: true, data: response });

const sendError = <U = unknown>(ws: ServerWebSocket<U>, message: string) =>
  sendResponse(ws, { success: false, msg: message });

let occupied = false;
let socket: Socket<undefined> | null = null;

const server = Bun.serve({
  fetch: (req, server) => {
    if (server.upgrade(req)) return undefined;

    return new Response();
  },
  websocket: {
    open: async (ws) => {
      if (occupied) {
        sendError(ws, "Server is occupied by another client");
        ws.close();
      }
      occupied = true;
      socket = await Bun.connect({
        hostname: TCP_REMOTE_ADDR,
        port: TCP_REMOTE_PORT,
        socket: {
          data: (_, data) => {
            const { raw: __, ...res } = parseResponse(data);
            if (!res.valid) return;
            sendSuccess(ws, { type: "socket_info", ...res });
          },
        },
      });
    },
    message: async (ws, message) => {
      const result = validateData(message);
      if (!result.success) {
        sendError(ws, "Invalid data format");
        return;
      }

      if (!socket) {
        sendError(ws, "Server is not connected");
        return;
      }

      const data = result.data;

      switch (data.type) {
        case "speed":
          const { left, right } = data;
          socket.write(createPayload(left, right));
          break;
      }
    },
    close: async (_) => {
      occupied = false;
      socket?.close();
      socket = null;
    },
  },
});

console.log(`Websocket server started on ${server.hostname}:${server.port}`);
console.log("Press ctrl+c to stop the server");
