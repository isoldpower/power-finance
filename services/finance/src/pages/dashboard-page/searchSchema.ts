import { z } from "zod";

const searchSchema = z.object({
	newTransaction: z.boolean().default(false),
	selectedWallet: z.string().optional()
})

export { searchSchema };