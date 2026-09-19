import type { RuleTriggerType } from "../fields.ts";
import type { RuleFormIssue, RuleFormValidator } from "./types.ts";


const eventTrigger: RuleFormValidator = {
	issues(values): RuleFormIssue[] {
		if (values.eventName !== '') return [];

		return [{ field: 'eventName', message: 'Select an event' }];
	},
};

const scheduleTrigger: RuleFormValidator = {
	issues(): RuleFormIssue[] {
		return [];
	},
};

const TRIGGER_VALIDATORS: Record<RuleTriggerType, RuleFormValidator> = {
	event: eventTrigger,
	schedule: scheduleTrigger,
};

export { TRIGGER_VALIDATORS };
