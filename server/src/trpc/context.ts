import { auth } from "@/lib/auth";

import type { CreateFastifyContextOptions } from "@trpc/server/adapters/fastify";

const createContext = async ({ req, res }: CreateFastifyContextOptions) => {
  const headers = new Headers(
    Object.entries(req.headers).map(([key, value]) => [key, String(value)]),
  );
  const session = await auth.api.getSession({ headers });

  return { req, res, session };
};

type Context = Awaited<ReturnType<typeof createContext>>;

export { createContext };
export type { Context };
