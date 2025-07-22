import { z } from "zod/v4";

const env = {
  agora: {
    APP_ID: z.string().parse(process.env.AGORA_APP_ID),
    APP_CERT: z.string().parse(process.env.AGORA_APP_CERT),
    CHANNEL_NAME: z.string().parse(process.env.AGORA_CHANNEL_NAME),
    TOKEN_EXPIRE: z.coerce.number().parse(process.env.AGORA_TOKEN_EXPIRE),
  },
};

export default env;
