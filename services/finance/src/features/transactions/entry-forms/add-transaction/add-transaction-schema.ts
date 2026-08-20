import { z } from "zod";

import { isCompleteEntry } from "../entry-fields.ts";
import { entryFieldsShape } from "../entry-fields.ts";


const addTransactionSchema = z.object({
	...entryFieldsShape,
	category: z.string(),
}).refine(isCompleteEntry);

type AddTransactionSchema = z.infer<typeof addTransactionSchema>;


export { addTransactionSchema };
export type { AddTransactionSchema };
