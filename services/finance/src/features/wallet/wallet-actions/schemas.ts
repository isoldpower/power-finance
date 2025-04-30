import { z } from "zod";

const editSchema = z.object({
	name: z.string().min(1, "Name is required"),
	type: z.enum(["debit", "credit"]),
	balance: z.coerce.number().min(0, "Balance must be a positive number"),
	currency: z.string().min(1, "Currency is required"),
});

type EditSchema = z.infer<typeof editSchema>;

export { editSchema };
export type { EditSchema };