import { randomBytes } from "crypto";
import { RtcRole, RtcTokenBuilder } from "agora-token";

import { publicProcedure, router } from "@/trpc";
import env from "@/env";

type AgoraAuth = {
  appid: string;
  token: string;
  channel: string;
  uid: number | string;
};

const { agora: agoraEnv } = env;

const agora = router({
  auth: publicProcedure.query(() => {
    const uid = parseInt(randomBytes(4).toString("hex"), 16) % 1000000000;
    const token = RtcTokenBuilder.buildTokenWithUid(
      agoraEnv.APP_ID,
      agoraEnv.APP_CERT,
      agoraEnv.CHANNEL_NAME,
      uid,
      RtcRole.PUBLISHER,
      agoraEnv.TOKEN_EXPIRE,
      agoraEnv.TOKEN_EXPIRE,
    );

    return {
      appid: agoraEnv.APP_ID,
      channel: agoraEnv.CHANNEL_NAME,
      token,
      uid,
    } satisfies AgoraAuth;
  }),
});

export default agora;
