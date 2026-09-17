import { firstFieldValue } from "./condition-options.ts";

import type { FilterFieldOption } from "@shared/api";
import type { RuleConditionSchema } from "./rule-form-schema.ts";


type ConditionLevel = 'eventCategory' | 'event' | 'field' | 'operator' | 'value';

const CONDITION_LEVELS: ConditionLevel[] = ['eventCategory', 'event', 'field', 'operator', 'value'];

const FALLBACK_OPERATOR: RuleConditionSchema['operator'] = 'eq';

const levelsBelow = (level: ConditionLevel): ConditionLevel[] => (
	CONDITION_LEVELS.slice(CONDITION_LEVELS.indexOf(level) + 1)
);

const defaultOperator = (
	filterFields: FilterFieldOption[],
	field: string,
): RuleConditionSchema['operator'] => {
	const operators = filterFields.find((option) => option.field === field)?.operators ?? [];

	return (operators[0] as RuleConditionSchema['operator'] | undefined) ?? FALLBACK_OPERATOR;
};

const blankCondition = (filterFields: FilterFieldOption[]): RuleConditionSchema => {
	const field = firstFieldValue(filterFields);

	return { field, operator: defaultOperator(filterFields, field), value: '' };
};

const resetBelow = (
	condition: RuleConditionSchema,
	level: ConditionLevel,
	filterFields: FilterFieldOption[],
): RuleConditionSchema => {
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
};

export { blankCondition, defaultOperator, levelsBelow, resetBelow, CONDITION_LEVELS };
export type { ConditionLevel };
