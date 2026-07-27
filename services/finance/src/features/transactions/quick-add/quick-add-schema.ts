import { z } from "zod";


const quickAddSchema = z.object({
	fromWallet: z.string(),
	toWallet: z.string(),
	amount: z.string(),
	receiveAmount: z.string(),
	type: z.enum(['transfer', 'expense', 'income']),
}).refine((data) => {
	const isPositive = (value: string): boolean => {
		const numeric = parseFloat(value);
		return !Number.isNaN(numeric) && numeric > 0;
	};

	if (!isPositive(data.amount)) return false;

	const typeBasedChecks = {
		'income': () => data.toWallet !== '',
		'expense': () => data.fromWallet !== '',
		'transfer': () => data.fromWallet !== ''
			&& data.toWallet !== ''
			&& data.fromWallet !== data.toWallet
			&& isPositive(data.receiveAmount),
	};

	return typeBasedChecks[data.type]();
});

type QuickAddSchema = z.infer<typeof quickAddSchema>;


export { quickAddSchema };
export type { QuickAddSchema };
