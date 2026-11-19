import { z } from "zod";
import { categoryRefSchema } from "@feature/categories/category-forms/schemas.ts";

import { entryFieldsShape, isCompleteEntry, isValidAdjustment } from "../entry-fields.ts";


const addTransactionSchema = z.object({
	...entryFieldsShape,
	category: categoryRefSchema,
	adjusts: z.string(),
}).refine((entry) => isCompleteEntry(entry) && isValidAdjustment(entry));

type AddTransactionSchema = z.infer<typeof addTransactionSchema>;


export { addTransactionSchema };
export type { AddTransactionSchema };
