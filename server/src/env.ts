const throwIfMissing = (name: string): never => {
  throw new Error(`No env variable found for ${name}`);
};

export const TCP_REMOTE_ADDR =
  process.env.TCP_REMOTE_ADDR ?? throwIfMissing("TCP_REMOTE_ADDR");
export const TCP_REMOTE_PORT = parseInt(
  process.env.TCP_REMOTE_PORT ?? throwIfMissing("TCP_REMOTE_PORT"),
);
