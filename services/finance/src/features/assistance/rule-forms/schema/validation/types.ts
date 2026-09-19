import type { RuleFormValues } from "../fields.ts";


type RuleFormField = keyof RuleFormValues;

interface RuleFormIssue {
	field: RuleFormField;
	message: string;
}

interface RuleFormValidator {
	issues: (values: RuleFormValues) => RuleFormIssue[];
}

export type { RuleFormField, RuleFormIssue, RuleFormValidator };
