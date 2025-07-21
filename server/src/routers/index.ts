import { router } from "@/trpc";

import agora from "./agora";

const appRouter = router({ agora });

type AppRouter = typeof appRouter;

export { appRouter };
export type { AppRouter };
