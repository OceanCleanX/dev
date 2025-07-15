import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

import type { NextConfig } from "next";

const middleware = createMiddleware(routing);

export const config: NextConfig = {
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};

export default middleware;
