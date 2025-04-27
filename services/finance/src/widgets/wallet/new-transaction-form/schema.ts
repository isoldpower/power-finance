import {z} from "zod";

const TRANSACTION_TYPES = [
	{ label: 'Income', value: 'income' },
	{ label: 'Expense', value: 'expense' },
	{ label: 'Transfer', value: 'transfer' },
	{ label: 'Adjust', value: 'adjust' }
];

const formSchema = z.object({
	type: z
		.string()
		.refine((value) => TRANSACTION_TYPES.some(type => type.value === value, {
			message: 'Invalid transaction type'
		})),
	amount: z.coerce.number().min(1, "Invalid amount"),
	from: z.string().min(1, "Please select a wallet"),
	to: z.string().optional(),
	category: z.string().optional(),
	description: z.string().optional(),
	date: z.date().optional(),
});

type FormSchema = z.infer<typeof formSchema>;

const defaultValues: FormSchema = {
	type: 'income',
	amount: 0,
	from: '',
	to: '',
	category: '',
	description: '',
	date: new Date(),
};

export { TRANSACTION_TYPES, formSchema, defaultValues };
export type { FormSchema };