import z from "zod/v4";

const Speed = z.number().min(0).max(1000);
const SpeedData = z.object({
  type: z.literal("speed"),
  left: Speed,
  right: Speed,
});
const Data = z.discriminatedUnion("type", [SpeedData]);
type DataType = z.infer<typeof Data>;

const validateData = (data: unknown) => Data.safeParse(data);

export default validateData;
export type { DataType as Data };
