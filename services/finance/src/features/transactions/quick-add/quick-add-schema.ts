import { z } from "zod";

import { entryFieldsShape, isCompleteEntry } from "../entry-forms";


const quickAddSchema = z.object(entryFieldsShape).refine(isCompleteEntry);

type QuickAddSchema = z.infer<typeof quickAddSchema>;


export { quickAddSchema };
export type { QuickAddSchema };
