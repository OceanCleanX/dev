const throwIfMissing = (name: string): never => {
  throw new Error(`No env variable found for ${name}`);
};

export const AGORA_APP_ID =
  process.env.AGORA_APP_ID ?? throwIfMissing("AGORA_APP_ID");
export const AGORA_APP_CERT =
  process.env.AGORA_APP_CERT ?? throwIfMissing("AGORA_APP_CERT");
export const AGORA_CHANNEL_NAME =
  process.env.AGORA_CHANNEL_NAME ?? throwIfMissing("AGORA_CHANNEL_NAME");
export const AGORA_TOKEN_EXPIRE = parseInt(
  process.env.AGORA_TOKEN_EXPIRE ?? throwIfMissing("AGORA_TOKEN"),
);
