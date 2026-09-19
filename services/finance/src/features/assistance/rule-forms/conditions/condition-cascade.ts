import { CONDITION_LEVELS, FALLBACK_OPERATOR } from "./constants.ts";
import { firstFieldValue } from "./condition-options.ts";

import type { FilterFieldOption } from "@shared/api";
import type { RuleConditionSchema } from "../schema";
import type { ConditionLevel } from "./types.ts";


function levelsBelow(level: ConditionLevel): ConditionLevel[] {
	return CONDITION_LEVELS.slice(CONDITION_LEVELS.indexOf(level) + 1);
}

function defaultOperator(
	filterFields: FilterFieldOption[],
	field: string,
): RuleConditionSchema['operator'] {
	const operators = filterFields.find((option) => option.field === field)?.operators ?? [];

	return (operators[0] as RuleConditionSchema['operator'] | undefined) ?? FALLBACK_OPERATOR;
}

function blankCondition(filterFields: FilterFieldOption[]): RuleConditionSchema {
	const field = firstFieldValue(filterFields);

	return { field, operator: defaultOperator(filterFields, field), value: '' };
}

function resetBelow(
	condition: RuleConditionSchema,
	level: ConditionLevel,
	filterFields: FilterFieldOption[],
): RuleConditionSchema {
	const wiped = new Set(levelsBelow(level));
	const field = wiped.has('field') ? firstFieldValue(filterFields) : condition.field;
	const operator = wiped.has('operator')
		? defaultOperator(filterFields, field)
		: condition.operator;

	return {
		field,
		operator,
		value: wiped.has('value') ? '' : condition.value,
	};
}

export { blankCondition, defaultOperator, levelsBelow, resetBelow };
