import { z } from "zod";

const addTransactionSchema = z.object({
	type: z.enum(['expense', 'income', 'transfer']),
	amount: z.string(),
	fromId: z.string(),
	toId: z.string(),
	category: z.string(),
});

const transferSchema = z.object({
	fromId: z.string(),
	toId: z.string(),
	amount: z.string(),
});

type AddTransactionSchema = z.infer<typeof addTransactionSchema>;
type TransferSchema = z.infer<typeof transferSchema>;

export { addTransactionSchema, transferSchema };
export type { AddTransactionSchema, TransferSchema };
