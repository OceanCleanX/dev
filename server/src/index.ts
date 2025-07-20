import fastify from "fastify";
import fastifySocketIO from "fastify-socket.io";
import { fastifyTRPCPlugin } from "@trpc/server/adapters/fastify";

import { appRouter } from "@/routers";
import { createContext } from "@/trpc/context";
import logger from "@/logger";

import type { FastifyTRPCPluginOptions } from "@trpc/server/adapters/fastify";
import type { Server } from "socket.io";
import type {
  ListenEvents,
  EmitEvents,
  ServerSideEvents,
  SocketData,
} from "@/types/socket-io";
import type { AppRouter } from "@/routers";
import fastifyCors from "@fastify/cors";

const server = fastify({ loggerInstance: logger, maxParamLength: 5000 });

// CORS setup
await server.register(fastifyCors, {
  origin: "*",
});

// TRPC setup
await server.register(fastifyTRPCPlugin, {
  trpcOptions: {
    router: appRouter,
    createContext,
    onError: ({ path, error }) => {
      logger.error(`Error in tRPC handler on path '${path}':`, error);
    },
  } satisfies FastifyTRPCPluginOptions<AppRouter>["trpcOptions"],
});

// socket.io setup
declare module "fastify" {
  interface FastifyInstance {
    io: Server<ListenEvents, EmitEvents, ServerSideEvents, SocketData>;
  }
}
await server.register(fastifySocketIO);
server.ready().then(() => server.io.on("connection", (socket) => {}));

server.listen({ port: 3000 });
