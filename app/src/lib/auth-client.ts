import { createAuthClient } from "better-auth/react";
import { adminClient, usernameClient } from "better-auth/client/plugins";

const baseURL =
  process.env.NODE_ENV === "production"
    ? `https://${process.env.NEXT_PUBLIC_SERVER_URL}`
    : `http://${process.env.NEXT_PUBLIC_SERVER_URL}:${process.env.NEXT_PUBLIC_SERVER_PORT}`;

export const authClient = createAuthClient({
  baseURL,
  plugins: [adminClient(), usernameClient()],
});
export const { signIn, signUp, signOut, useSession } = authClient;
