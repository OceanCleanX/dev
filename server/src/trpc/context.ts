import type { CreateFastifyContextOptions } from "@trpc/server/adapters/fastify";

const createContext = ({ req, res }: CreateFastifyContextOptions) => ({
  req,
  res,
});

type Context = Awaited<ReturnType<typeof createContext>>;

export { createContext };
export type { Context };
