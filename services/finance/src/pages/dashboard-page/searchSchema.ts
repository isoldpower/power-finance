import { z } from "zod";


const searchSchema = z.object({
	wallet: z.string().default('all'),
});

type DashboardSearchSchema = z.infer<typeof searchSchema>;

export { searchSchema };
export type { DashboardSearchSchema };