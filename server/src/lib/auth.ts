import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { admin, username } from "better-auth/plugins";

import prisma from "@/lib/db";
import { trustedOrigins } from "@/lib/cors";

export const auth: ReturnType<typeof betterAuth> = betterAuth({
  database: prismaAdapter(prisma, { provider: "sqlite" }),
  emailAndPassword: { enabled: true },
  plugins: [admin(), username({ minUsernameLength: 6 })],
  trustedOrigins: trustedOrigins,
});
