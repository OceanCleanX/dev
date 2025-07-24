import boatsData from "@config/boats.json";
import { z } from "zod/v4";

const BoatsSchema = z.array(
  z.object({
    "control-server-addr": z.string(),
    "control-server-port": z.number().int().positive(),
    "agora-app-id": z.string(),
    "agora-app-cert": z.string(),
    "agora-channel-name": z.string(),
    "agora-token-expire": z.number().int().positive(),
  }),
);
type Boats = z.infer<typeof BoatsSchema>;
type Boat = Boats[number];

const boats = BoatsSchema.parse(boatsData);

export default boats;
export type { Boat, Boats };
