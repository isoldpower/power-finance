import { z } from "zod";

const WALLET_TYPES = [
	'debit', 'credit'
];

const formSchema = z.object({
	name: z.string().min(1, "Please enter a name"),
	balance: z.coerce.number().min(0, "Please enter a valid balance"),
	currency: z.string().min(1, "Please select a currency"),
	type: z.enum([WALLET_TYPES[0], ...WALLET_TYPES.slice(1)])
});

type FormSchema = z.infer<typeof formSchema>;

const defaultValues: FormSchema = {
	name: '',
	balance: 0,
	currency: '',
	type: 'debit'
};

export { formSchema, defaultValues, WALLET_TYPES };
export type { FormSchema };