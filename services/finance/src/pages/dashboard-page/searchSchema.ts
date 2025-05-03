import { z } from "zod";

const searchSchema = z.object({
	newTransaction: z.boolean().optional(),
	selectedWallet: z.string().optional()
})

export { searchSchema };