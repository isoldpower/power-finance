import { z } from "zod";

const transactionFiltersSchema = z.object({
	selectedWallet: z.string().optional()
})

type TransactionFiltersSchema = z.infer<typeof transactionFiltersSchema>;

const filterDefaultValues: TransactionFiltersSchema = {
	selectedWallet: 'all'
}

export { transactionFiltersSchema, filterDefaultValues };
export type { TransactionFiltersSchema };