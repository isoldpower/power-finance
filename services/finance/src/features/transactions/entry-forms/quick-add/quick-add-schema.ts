import { z } from "zod";
import { categoryRefSchema } from "@feature/categories/category-forms/schemas.ts";

import { isCompleteEntry } from "../entry-fields.ts";
import { entryFieldsShape } from "../entry-fields.ts";


const quickAddSchema = z.object({
	...entryFieldsShape,
	category: categoryRefSchema,
}).refine(isCompleteEntry);

type QuickAddSchema = z.infer<typeof quickAddSchema>;


export { quickAddSchema };
export type { QuickAddSchema };
