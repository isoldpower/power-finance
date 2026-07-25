import { z } from "zod";

const searchSchema = z.object({
	wallet: z.string().default('all'),
	sort: z.enum(['recent', 'amount']).default('recent'),
});

type ManagementSearch = z.infer<typeof searchSchema>;

export { searchSchema };
export type { ManagementSearch };
