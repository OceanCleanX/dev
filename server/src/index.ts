import { RtcRole, RtcTokenBuilder } from "agora-token";
import http from "http";
import { WebSocketServer, WebSocket } from "ws";
import net from "net";

import { createPayload, parseResponse } from "./protocol";
import logger from "./logger";
import validateData from "./validate";
import {
  AGORA_APP_CERT,
  AGORA_APP_ID,
  AGORA_CHANNEL_NAME,
  AGORA_TOKEN_EXPIRE,
  TCP_REMOTE_ADDR,
  TCP_REMOTE_PORT,
} from "./env";

const app = http.createServer((req, res) => {
  if (req.url === "/api/agora" && req.method === "GET") {
    const uid = Math.floor(Math.random() * 1000000000);
    const token = RtcTokenBuilder.buildTokenWithUid(
      AGORA_APP_ID,
      AGORA_APP_CERT,
      AGORA_CHANNEL_NAME,
      uid,
      RtcRole.PUBLISHER,
      AGORA_TOKEN_EXPIRE,
      AGORA_TOKEN_EXPIRE,
    );

    res.writeHead(200, {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET",
    });
    res.end(
      JSON.stringify({
        appid: AGORA_APP_ID,
        channel: AGORA_CHANNEL_NAME,
        token,
        uid,
      }),
    );
  } else if (req.url === "/") {
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end("good");
  } else {
    res.writeHead(404);
    res.end();
  }
});

const wss = new WebSocketServer({ noServer: true });

app.on("upgrade", (request, socket, head) => {
  if (request.url === "/ws") {
    wss.handleUpgrade(request, socket, head, (ws) => {
      wss.emit("connection", ws, request);
    });
  } else {
    socket.destroy();
  }
});

let occupied = false;
let tcpSocket: net.Socket | null = null;
let remoteWs: WebSocket | null = null;

const sendResponse = (ws: WebSocket, res: any) => ws.send(JSON.stringify(res));
const sendSuccess = (ws: WebSocket, response: any) =>
  sendResponse(ws, { success: true, data: response });
const sendError = (ws: WebSocket, message: string) =>
  sendResponse(ws, { success: false, msg: message });

wss.on("connection", (ws) => {
  if (occupied) {
    sendError(ws, "Server is occupied by another client");
    ws.close();
    return;
  }
  occupied = true;
  logger.info("New client connected");

  tcpSocket = new net.Socket();
  tcpSocket.connect(TCP_REMOTE_PORT, TCP_REMOTE_ADDR, () => {
    logger.info("Connected to TCP server");
  });

  tcpSocket.on("data", (data) => {
    const { raw: __, ...res } = parseResponse(data);
    if (!res.valid) return;
    logger.debug(`Received data from TCP server: ${JSON.stringify(res)}`);
    sendSuccess(ws, { type: "socket_info", ...res });
  });

  tcpSocket.on("close", () => {
    logger.info("TCP connection closed");
  });

  tcpSocket.on("error", (err) => {
    logger.error(`TCP connection error: ${err.message}`);
    // TODO: consider closing the main websocket connection as well
  });

  // TODO: enable remote WebSocket connection
  // remoteWs = new WebSocket(`ws://${WS_REMOTE_ADDR}:${WS_REMOTE_PORT}`);
  // remoteWs.on("message", (ev) => ws.send(ev));

  ws.on("message", (message) => {
    logger.debug(`Received data: ${message}`);
    const result = validateData(message.toString());

    if (!result.success) {
      sendError(ws, "Invalid data format");
      return;
    }

    if (!tcpSocket || tcpSocket.destroyed) {
      sendError(ws, "Server is not connected to TCP");
      return;
    }

    if (!remoteWs || remoteWs.readyState !== WebSocket.OPEN) {
      sendError(ws, "Remote WebSocket is not connected");
      return;
    }

    const data = result.data;
    switch (data.type) {
      case "speed":
        const { left, right } = data;
        tcpSocket.write(createPayload(left, right));
        break;
      case "jetson":
        remoteWs.send(JSON.stringify(data.data));
        break;
    }
  });

  ws.on("close", () => {
    logger.info("Client disconnected");
    occupied = false;
    tcpSocket?.destroy();
    tcpSocket = null;
    remoteWs?.close();
    remoteWs = null;
  });
});

const port = 3000;
app.listen(port, () => {
  logger.info(`Server started on port ${port}`);
  logger.info("Press ctrl+c to stop the server");
});
