"use client";

import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { createTRPCClient, httpBatchLink } from "@trpc/client";

import { _TRPCProvider } from "@/lib/trpc";

import type { AppRouter } from "@server/router";
import type { FC, PropsWithChildren } from "react";

const url =
  process.env.NODE_ENV === "production"
    ? `https://${process.env.NEXT_PUBLIC_SERVER_URL}`
    : `http://${process.env.NEXT_PUBLIC_SERVER_URL}:${process.env.NEXT_PUBLIC_SERVER_PORT}`;

const TRPCProvider: FC<PropsWithChildren> = ({ children }) => {
  const queryClient = useQueryClient();
  const [trpcClient] = useState(() =>
    createTRPCClient<AppRouter>({
      links: [httpBatchLink({ url })],
    }),
  );

  return (
    <_TRPCProvider trpcClient={trpcClient} queryClient={queryClient}>
      {children}
    </_TRPCProvider>
  );
};

export default TRPCProvider;
