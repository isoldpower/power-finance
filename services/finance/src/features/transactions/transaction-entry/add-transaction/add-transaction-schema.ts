import { z } from "zod";

import { entryFieldsShape, isCompleteEntry } from "../../entry-forms";


const addTransactionSchema = z.object({
	...entryFieldsShape,
	category: z.string(),
}).refine(isCompleteEntry);

type AddTransactionSchema = z.infer<typeof addTransactionSchema>;


export { addTransactionSchema };
export type { AddTransactionSchema };
