import { z } from "zod";
import { PERIODS } from "@widget/metrics";

const searchSchema = z.object({
	selectedWallet: z.string().default('all'),
	period: z.enum(PERIODS).default('1M'),
});

type DashboardSearchSchema = z.infer<typeof searchSchema>;

export { searchSchema };
export type { DashboardSearchSchema };