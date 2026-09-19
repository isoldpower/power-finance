import { ruleFormFields } from "./fields.ts";
import { ruleFormIssues } from "./validation";

import type { z } from "zod";


const ruleFormSchema = ruleFormFields.superRefine((values, context) => {
	for (const issue of ruleFormIssues(values)) {
		context.addIssue({ 
			code: 'custom',
			path: [issue.field],
			message: issue.message,
		});
	}
});

type RuleFormSchema = z.infer<typeof ruleFormSchema>;

export { ruleFormSchema };
export type { RuleFormSchema };
