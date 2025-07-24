import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { admin, username } from "better-auth/plugins";

import prisma from "@/lib/db";

export const auth: ReturnType<typeof betterAuth> = betterAuth({
  database: prismaAdapter(prisma, { provider: "sqlite" }),
  emailAndPassword: { enabled: true },
  plugins: [admin(), username({ minUsernameLength: 6 })],
  trustedOrigins: [
    "http://localhost:3001",
    "https://preview.oceancleanx.org",
    "https://oceancleanx.org",
  ],
});
