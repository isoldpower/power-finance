import { z } from "zod";


const TRANSACTION_TYPES = [
	{ label: 'Income', value: 'income' },
	{ label: 'Expense', value: 'expense' },
	{ label: 'Transfer', value: 'transfer' },
	{ label: 'Adjust', value: 'adjust' }
];

const transactionTypes = TRANSACTION_TYPES.map(type => type.value);

const transactionSchema = z.object({
	type: z
		.enum([transactionTypes[0], ...transactionTypes])
		.refine((value) => transactionTypes.includes(value), {
			message: 'Invalid transaction type'
		}),
	amount: z.coerce.number().refine((value) => value !== 0, "Amount can't be 0"),
	from: z.string().optional(),
	to: z.string().optional(),
	category: z.string().optional(),
	description: z.string().optional(),
	date: z.date().optional(),
	targetCurrency: z.string()
}).refine((values) => {
	const { type, amount } = values;
	return !(type !== 'adjust' && amount < 0);
}, {
	message: "Transfer value can't be less than 0 for this type of transaction",
	path: ['amount']
}).refine((values) => {
	const { type, from, to } = values;
	return !(type === 'transfer' && from === to);
}, {
	path: ['to', 'from'],
	message: "Source and Target wallets can't be the same",
}).refine((values) => {
	const { type, from } = values;
	return !(['expense', 'transfer'].includes(type) && !from);
}, {
	path: ['from'],
	message: "Source wallet can't be empty for this type of transaction",
}).refine((values) => {
	const { type, to } = values;
	return !['income', 'transfer', 'adjust'].includes(type) || to;
}, {
	path: ['to'],
	message: "Target wallet can't be empty for this type of transaction",
}).refine((values) => {
	const { type, targetCurrency } = values;
	return !['transfer'].includes(type) || targetCurrency;
}, {
	path: ['targetCurrency'],
	message: "Target currency can't be empty for this type of transaction",
});

type TransactionSchema = z.infer<typeof transactionSchema>;

const defaultValues: TransactionSchema = {
	type: 'income',
	amount: 0,
	from: '',
	to: '',
	category: '',
	description: '',
	date: new Date(),
	targetCurrency: ''
};

export { TRANSACTION_TYPES, transactionSchema, defaultValues };
export type { TransactionSchema };