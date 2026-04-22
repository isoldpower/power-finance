import { z } from "zod";


const transactionSchema = z.object({
	source_wallet_id: z.string().min(1, "Please select a wallet"),
	amount: z.coerce.number().refine((value) => value !== 0, "Amount can't be 0"),
	description: z.string().optional(),
});

type TransactionSchema = z.infer<typeof transactionSchema>;

const defaultValues: TransactionSchema = {
	source_wallet_id: '',
	amount: 0,
	description: '',
};

export { transactionSchema, defaultValues };
export type { TransactionSchema };
