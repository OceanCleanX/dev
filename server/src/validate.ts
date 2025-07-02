import z from "zod/v4";
import zu from "zod_utilz";

const Speed = z.number().min(0).max(1000);
const SpeedData = z.object({
  type: z.literal("speed"),
  left: Speed,
  right: Speed,
});
const Heartbeat = z.object({ type: z.literal("heartbeat") });
const Data = z.discriminatedUnion("type", [SpeedData, Heartbeat]);
type DataType = z.infer<typeof Data>;

const validateData = (data: unknown) => {
  try {
    const obj = zu.stringToJSON().parse(data);
    return Data.safeParse(obj);
  } catch (e) {
    return Data.safeParse("");
  }
};

export default validateData;
export type { DataType as Data };
