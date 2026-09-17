import { useCallback, useEffect, useMemo } from "react";
import { useController } from "react-hook-form";

import { RuleForm } from "@entity/assistance";
import {
	conditionPath,
	defaultOperator,
	resetBelow,
	resolveFilterInput,
	toFieldOptions,
	toOperatorOptions,
} from "@feature/assistance";
import { OPERATOR_LABELS } from "@shared/api";
import { RowDeleteButton } from "@shared/pure-components/collections";
import { RULE_FIELD_WIDTH, RULE_OPERATOR_WIDTH } from "./config.ts";
import { RuleConditionValueField } from "./RuleConditionValueField.tsx";
import { RuleSelectField } from "./RuleSelectField.tsx";

import type { FC } from "react";
import type { Control } from "react-hook-form";
import type { FilterFieldOption } from "@shared/api";
import type {
	ConditionLevel,
	FilterPolicySource,
	RuleConditionSchema,
	RuleFormSchema,
} from "@feature/assistance";


interface RuleConditionRowProps {
	control: Control<RuleFormSchema>;
	index: number;
	filterFields: FilterFieldOption[];
	policySource: FilterPolicySource;
	disabled?: boolean;
	onRemove: (index: number) => void;
}

const RuleConditionRow: FC<RuleConditionRowProps> = ({
	control,
	index,
	filterFields,
	policySource,
	disabled,
	onRemove,
}) => {
	const fieldField = useController({ control, name: conditionPath(index, 'field') }).field;
	const operatorField = useController({ control, name: conditionPath(index, 'operator') }).field;
	const valueField = useController({ control, name: conditionPath(index, 'value') }).field;

	const condition = useMemo(() => ({
		field: fieldField.value,
		operator: operatorField.value,
		value: valueField.value,
	}), [fieldField.value, operatorField.value, valueField.value]);

	const valueInput = useMemo(
		() => resolveFilterInput(policySource, condition.field, condition.operator),
		[condition.field, condition.operator, policySource]
	);
	const fieldOptions = useMemo(() => toFieldOptions(filterFields), [filterFields]);
	const operatorOptions = useMemo(() => {
		return toOperatorOptions(filterFields, condition.field, OPERATOR_LABELS);
	}, [condition.field, filterFields]);

	const operatorAllowed = useMemo(
		() => operatorOptions.some((option) => option.value === condition.operator),
		[condition.operator, operatorOptions]
	);

	useEffect(() => {
		if (operatorAllowed) return;

		operatorField.onChange(defaultOperator(filterFields, condition.field));
	}, [condition.field, filterFields, operatorAllowed, operatorField]);

	const applyLevel = useCallback((next: RuleConditionSchema, level: ConditionLevel) => {
		const settled = resetBelow(next, level, filterFields);

		fieldField.onChange(settled.field);
		operatorField.onChange(settled.operator);
		valueField.onChange(settled.value);
	}, [fieldField, filterFields, operatorField, valueField]);

	const handleFieldChange = useCallback((field: string) => {
		applyLevel({ ...condition, field }, 'field');
	}, [applyLevel, condition]);

	const handleOperatorChange = useCallback((operator: string) => {
		applyLevel(
			{ ...condition, operator: operator as RuleConditionSchema['operator'] },
			'operator',
		);
	}, [applyLevel, condition]);

	const handleRemove = useCallback(() => {
		onRemove(index);
	}, [index, onRemove]);

	return (
		<RuleForm.ConditionRow>
			<RuleSelectField
				value={condition.field}
				options={fieldOptions}
				ariaLabel="Condition field"
				className={RULE_FIELD_WIDTH}
				disabled={disabled}
				onChange={handleFieldChange}
			/>
			<RuleSelectField
				value={condition.operator}
				options={operatorOptions}
				ariaLabel="Condition operator"
				className={RULE_OPERATOR_WIDTH}
				disabled={disabled}
				onChange={handleOperatorChange}
			/>
			<RuleConditionValueField
				input={valueInput}
				value={condition.value}
				disabled={disabled}
				onChange={valueField.onChange}
			/>
			<RowDeleteButton label="Remove condition" disabled={disabled} onClick={handleRemove} />
		</RuleForm.ConditionRow>
	);
};

RuleConditionRow.displayName = 'RuleConditionRow';

export { RuleConditionRow };
export type { RuleConditionRowProps };
