import { RtcRole, RtcTokenBuilder } from "agora-token";
import { randomBytes } from "crypto";

import type { RegisterHandler } from "./types";

const registerAgoraHandler: RegisterHandler = (socket, boat) => {
  socket.on("agora:auth", (callback) => {
    const uid = parseInt(randomBytes(4).toString("hex"), 16) % 1000000000;
    const token = RtcTokenBuilder.buildTokenWithUid(
      boat["agora-app-id"],
      boat["agora-app-cert"],
      boat["agora-channel-name"],
      uid,
      RtcRole.PUBLISHER,
      boat["agora-token-expire"],
      boat["agora-token-expire"],
    );

    callback({
      appid: boat["agora-app-id"],
      channel: boat["agora-channel-name"],
      token,
      uid,
    });
  });
};

export default registerAgoraHandler;
