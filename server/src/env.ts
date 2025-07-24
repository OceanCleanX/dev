import { z } from "zod/v4";

const env = {
  DATABASE_URL: z.string().parse(process.env.DATABASE_URL),
};

export default env;
