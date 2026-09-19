import {
	BOOLEAN_FIELDS,
	FALLBACK_EVENT,
	FALLBACK_KIND,
	FILTER_POLICY_INPUTS,
	MULTI_OPERATOR,
	MULTI_SEPARATOR,
} from "./constants.ts";

import type { FilterOperator } from "@shared/api";
import type { AutomationEvent, AutomationTriggerType } from "@entity/assistance";
import type { FilterPolicyInput, FilterPolicySource } from "./types.ts";


function isBooleanField(field: string): boolean {
	return BOOLEAN_FIELDS.has(field);
}

function filterPolicySource(
	triggerType: AutomationTriggerType,
	event: AutomationEvent | '',
): FilterPolicySource {
	if (triggerType === 'schedule') return 'schedule';

	return event === '' ? FALLBACK_EVENT : event;
}

function resolveFilterInput(
	source: FilterPolicySource,
	field: string,
	operator: FilterOperator,
): FilterPolicyInput {
	return {
		kind: FILTER_POLICY_INPUTS[source][field] ?? FALLBACK_KIND,
		multiple: operator === MULTI_OPERATOR,
	};
}

function parseMultiValue(value: string): string[] {
	return value
		.split(MULTI_SEPARATOR)
		.map((entry) => entry.trim())
		.filter((entry) => entry !== '');
}

function formatMultiValue(values: string[]): string {
	return values.join(MULTI_SEPARATOR);
}

export {
	filterPolicySource,
	formatMultiValue,
	isBooleanField,
	parseMultiValue,
	resolveFilterInput,
};
