import { z } from "zod";

const searchSchema = z.object({
	selectedWallet: z.string().default('all')
});

export { searchSchema };