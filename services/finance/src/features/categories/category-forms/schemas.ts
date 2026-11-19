import { z } from "zod";

import { CATEGORY_NAME_MAX_LENGTH } from "../categories-api/types.ts";


const categoryRefSchema = z.object({
	id: z.string(),
	name: z.string(),
	isGlobal: z.boolean(),
}).nullable();

const categoryNameSchema = z.object({
	name: z.string()
		.trim()
		.min(1, "Enter a category name")
		.max(
			CATEGORY_NAME_MAX_LENGTH,
			`Keep the name under ${String(CATEGORY_NAME_MAX_LENGTH)} characters`
		),
});

type CategoryRefSchema = z.infer<typeof categoryRefSchema>;
type CategoryNameSchema = z.infer<typeof categoryNameSchema>;

export { categoryNameSchema, categoryRefSchema };
export type { CategoryNameSchema, CategoryRefSchema };
