import { RtcRole, RtcTokenBuilder } from "agora-token";

import {
  AGORA_APP_CERT,
  AGORA_APP_ID,
  AGORA_CHANNEL_NAME,
  AGORA_TOKEN_EXPIRE,
  TCP_REMOTE_ADDR,
  TCP_REMOTE_PORT,
} from "./env";
import validateData from "./validate";
import { createPayload, parseResponse } from "./protocol";

import { ArrayBufferSink, type ServerWebSocket, type Socket } from "bun";
import type { SocketInfo } from "./protocol";
import logger from "./logger";

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
  fetch: () => new Response("good"),
  routes: {
    "/api/agora": () => {
      const uid = Math.floor(Math.random() * 1000000000);
      return new Response(
        JSON.stringify({
          appid: AGORA_APP_ID,
          channel: AGORA_CHANNEL_NAME,
          token: RtcTokenBuilder.buildTokenWithUid(
            AGORA_APP_ID,
            AGORA_APP_CERT,
            AGORA_CHANNEL_NAME,
            uid,
            RtcRole.PUBLISHER,
            AGORA_TOKEN_EXPIRE,
            AGORA_TOKEN_EXPIRE,
          ),
          uid,
        }),
        {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET",
          },
        },
      );
    },
    "/ws": (req, server) => {
      if (server.upgrade(req)) return undefined;
      return new Response("WebSocket not supported");
    },
  },
  websocket: {
    open: async (ws) => {
      if (occupied) {
        sendError(ws, "Server is occupied by another client");
        ws.close();
      }
      occupied = true;

      logger.info("New client connected");

      socket = await Bun.connect({
        hostname: TCP_REMOTE_ADDR,
        port: TCP_REMOTE_PORT,
        socket: {
          data: (_, data) => {
            const { raw: __, ...res } = parseResponse(data);
            if (!res.valid) return;
            logger.debug(
              `Received data from TCP server: ${JSON.stringify(res)}`,
            );
            sendSuccess(ws, { type: "socket_info", ...res });
          },
          close: () => logger.info("TCP connection closed"),
        },
      });
      logger.info("Connected to TCP server");
    },
    message: async (ws, message) => {
      logger.debug(`Received data: ${message}`);

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
          socket.write(createPayload(left, right), 0, 15);
          break;
      }
    },
    close: async (_) => {
      occupied = false;
      socket?.close?.();
      socket = null;
      logger.info("Client disconnected");
    },
  },
});

logger.info(`Websocket server started on ${server.hostname}:${server.port}`);
logger.info("Press ctrl+c to stop the server");
