import z from "zod/v4";
import zu from "zod_utilz";

const Speed = z.number().min(0).max(1000);
const SpeedData = z.object({
  type: z.literal("speed"),
  left: Speed,
  right: Speed,
});
const JetsonData = z.object({
  type: z.literal("jetson"),
  data: z.object({
    // TODO: stricter check for data
    type: z.string(),
    data: z.any(),
  }),
});
const Data = z.discriminatedUnion("type", [SpeedData, JetsonData]);
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
