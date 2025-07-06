import { randomBytes } from "crypto";
import { RtcRole, RtcTokenBuilder } from "agora-token";

import { publicProcedure, router } from "@/trpc";
import {
  AGORA_APP_CERT,
  AGORA_APP_ID,
  AGORA_CHANNEL_NAME,
  AGORA_TOKEN_EXPIRE,
} from "@/env";

type AgoraAuth = {
  appid: string;
  token: string;
  channel: string;
  uid: number | string;
};

const agora = router({
  auth: publicProcedure.query(() => {
    const uid = parseInt(randomBytes(4).toString("hex"), 16) % 1000000000;
    const token = RtcTokenBuilder.buildTokenWithUid(
      AGORA_APP_ID,
      AGORA_APP_CERT,
      AGORA_CHANNEL_NAME,
      uid,
      RtcRole.PUBLISHER,
      AGORA_TOKEN_EXPIRE,
      AGORA_TOKEN_EXPIRE,
    );

    return {
      appid: AGORA_APP_ID,
      channel: AGORA_CHANNEL_NAME,
      token,
      uid,
    } satisfies AgoraAuth;
  }),
});

export default agora;
