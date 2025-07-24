import fastifyPlugin from "fastify-plugin";

import prisma from "@/lib/db";

declare module "fastify" {
  interface FastifyInstance {
    prisma: typeof prisma;
  }
}
const fastifyPrisma = fastifyPlugin(
  async (fastify, _) => {
    if (fastify.prisma) return;

    fastify.decorate("prisma", prisma);
    fastify.addHook("onClose", (instance, done) => {
      if (instance.prisma == prisma)
        instance.prisma.$disconnect().then(() => done());
    });
  },
  { name: "prisma-plugin" },
);

export default fastifyPrisma;
