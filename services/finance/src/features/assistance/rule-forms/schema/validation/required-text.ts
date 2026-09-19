import type { RuleFormValues } from "../fields.ts";
import type { RuleFormField, RuleFormIssue } from "./types.ts";


function requiredText(
	values: RuleFormValues,
	field: RuleFormField,
	message: string,
): RuleFormIssue[] {
	const value = values[field];

	if (typeof value === 'string' && value.trim() !== '') return [];

	return [{ field, message }];
}

export { requiredText };
