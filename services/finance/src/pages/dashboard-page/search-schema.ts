import { z } from "zod";


const searchSchema = z.object({
});

type DashboardSearchSchema = z.infer<typeof searchSchema>;

export { searchSchema };
export type { DashboardSearchSchema };