import { initTRPC } from "@trpc/server";

import type { Context } from "./context";

const t = initTRPC.context<Context>().create();

const router = t.router;
const publicProcedure = t.procedure;

const authedProcedure = t.procedure.use((opts) => {
  const { ctx } = opts;

  if (!ctx.session) throw new Error("Unauthorized");

  return opts.next({ ctx });
});

export { router, publicProcedure, authedProcedure };
