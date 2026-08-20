import type { FilterFieldOption } from "@shared/api";
import type { SelectOption } from "@shared/forms";


type ConditionKey = 'field' | 'operator' | 'value';
type ConditionPath = `conditions.${number}.${ConditionKey}`;


const conditionPath = (index: number, key: ConditionKey): ConditionPath => {
	return `conditions.${index.toString()}.${key}` as ConditionPath;
};

const toFieldOptions = (filterFields: FilterFieldOption[]): SelectOption[] => {
	return filterFields.map((filterField) => ({ 
		value: filterField.field,
		label: filterField.label,
	}));
};

const toOperatorOptions = (
	filterFields: FilterFieldOption[],
	fieldName: string,
	operatorLabels: Record<string, string>,
): SelectOption[] => {
	const operators = filterFields.find((filterField) => {
		return filterField.field === fieldName;
	})?.operators ?? [];

	return operators.map((operator) => ({
		value: operator,
		label: operatorLabels[operator] ?? operator,
	}));
};

const firstFieldValue = (fieldOptions: FilterFieldOption[]): string => {
	return fieldOptions[0]?.field ?? 'name';
};

export { conditionPath, firstFieldValue, toFieldOptions, toOperatorOptions };
export type { ConditionKey, ConditionPath };
