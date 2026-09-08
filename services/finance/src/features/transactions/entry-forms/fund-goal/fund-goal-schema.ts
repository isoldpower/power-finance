import { z } from "zod";

import { entryFieldsShape, isCompleteEntry } from "../entry-fields.ts";


const fundGoalSchema = z.object({
	...entryFieldsShape,
	name: z.string(),
}).refine(isCompleteEntry);

type FundGoalSchema = z.infer<typeof fundGoalSchema>;


export { fundGoalSchema };
export type { FundGoalSchema };
