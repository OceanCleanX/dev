import { createTRPCContext } from "@trpc/tanstack-react-query";
import type { AppRouter } from "@server/router";

export const {
  TRPCProvider: _TRPCProvider,
  useTRPC,
  useTRPCClient,
} = createTRPCContext<AppRouter>();
