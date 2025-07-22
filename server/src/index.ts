import fastify from "fastify";
import fastifySocketIO from "fastify-socket.io";
import { fastifyTRPCPlugin } from "@trpc/server/adapters/fastify";
import fastifyCors from "@fastify/cors";

import { appRouter } from "@/routers";
import { createContext } from "@/trpc/context";
import logger from "@/logger";
import handler from "@/sio-handler";
import fastifyPrisma from "@/fastify-plugins/prisma";

import type { FastifyTRPCPluginOptions } from "@trpc/server/adapters/fastify";
import type { Server } from "socket.io";
import type { AppRouter } from "@/routers";
import type {
  S2CEv,
  C2SEv,
  ServerSideEvents,
  SocketData,
} from "@/exports/socket-io";

const server = fastify({ loggerInstance: logger, maxParamLength: 5000 });

// CORS setup
await server.register(fastifyCors, {
  origin: "*",
  methods: "GET,POST,PUT,PATCH,DELETE",
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
    io: Server<C2SEv, S2CEv, ServerSideEvents, SocketData>;
  }
}
await server.register(fastifySocketIO, {
  cors: {
    origin: "*",
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  },
});
server.ready().then(() => server.io.on("connection", handler));

// prisma setup
await server.register(fastifyPrisma);

server.listen({ port: 3000 });
