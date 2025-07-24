import { router } from "@/trpc";

const appRouter = router({});

type AppRouter = typeof appRouter;

export { appRouter };
export type { AppRouter };
