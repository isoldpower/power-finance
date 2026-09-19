import { FALLBACK_FIELD } from "./constants.ts";

import type { FilterFieldOption } from "@shared/api";
import type { SelectOption } from "@shared/forms";
import type { ConditionKey } from "./types.ts";


function conditionPath<TKey extends ConditionKey>(
	index: number,
	key: TKey,
): `conditions.${number}.${TKey}` {
	return `conditions.${index.toString()}.${key}` as `conditions.${number}.${TKey}`;
}

function toFieldOptions(filterFields: FilterFieldOption[]): SelectOption[] {
	return filterFields.map((filterField) => ({
		value: filterField.field,
		label: filterField.label,
	}));
}

function toOperatorOptions(
	filterFields: FilterFieldOption[],
	fieldName: string,
	operatorLabels: Record<string, string>,
): SelectOption[] {
	const operators = filterFields.find((filterField) => {
		return filterField.field === fieldName;
	})?.operators ?? [];

	return operators.map((operator) => ({
		value: operator,
		label: operatorLabels[operator] ?? operator,
	}));
}

function firstFieldValue(fieldOptions: FilterFieldOption[]): string {
	return fieldOptions[0]?.field ?? FALLBACK_FIELD;
}

export { conditionPath, firstFieldValue, toFieldOptions, toOperatorOptions };
