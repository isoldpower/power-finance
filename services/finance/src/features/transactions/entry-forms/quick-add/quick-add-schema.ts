import { z } from "zod";

import { isCompleteEntry } from "../entry-fields.ts";
import { entryFieldsShape } from "../entry-fields.ts";


const quickAddSchema = z.object(entryFieldsShape).refine(isCompleteEntry);

type QuickAddSchema = z.infer<typeof quickAddSchema>;


export { quickAddSchema };
export type { QuickAddSchema };
