import { EFFECT_VALIDATORS } from "./effect-validators.ts";
import { TRIGGER_VALIDATORS } from "./trigger-validators.ts";

import type { RuleFormValues } from "../fields.ts";
import type { RuleFormIssue } from "./types.ts";


function ruleFormIssues(values: RuleFormValues): RuleFormIssue[] {
	return [
		...TRIGGER_VALIDATORS[values.triggerType].issues(values),
		...EFFECT_VALIDATORS[values.effectType].issues(values),
	];
}

export { ruleFormIssues };
export type { RuleFormIssue, RuleFormValidator } from "./types.ts";
