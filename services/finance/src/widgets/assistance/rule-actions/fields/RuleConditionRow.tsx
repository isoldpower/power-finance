import { useCallback, useMemo } from "react";
import { Controller, useWatch } from "react-hook-form";

import { RuleForm } from "@entity/assistance";
import {
	conditionPath,
	resolveFilterInput,
	toFieldOptions,
	toOperatorOptions,
} from "@feature/assistance";
import { OPERATOR_LABELS } from "@shared/api";
import { RowDeleteButton } from "@shared/pure-components/collections";
import { RuleConditionValueField } from "./RuleConditionValueField.tsx";
import { RuleSelectField } from "./RuleSelectField.tsx";

import type { FC } from "react";
import type { Control } from "react-hook-form";
import type { FilterFieldOption } from "@shared/api";
import type { FilterPolicySource, RuleFormSchema } from "@feature/assistance";


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
	const selectedField = useWatch({ control, name: conditionPath(index, 'field') });
	const selectedOperator = useWatch({ control, name: conditionPath(index, 'operator') });
	const valueInput = useMemo(
		() => resolveFilterInput(policySource, selectedField, selectedOperator),
		[policySource, selectedField, selectedOperator]
	);
	const fieldOptions = useMemo(() => toFieldOptions(filterFields), [filterFields]);
	const operatorOptions = useMemo(() => {
		return toOperatorOptions(filterFields, selectedField, OPERATOR_LABELS);
	}, [filterFields, selectedField]);

	const handleRemove = useCallback(() => {
		onRemove(index);
	}, [index, onRemove]);

	return (
		<RuleForm.ConditionRow>
			<Controller
				control={control}
				name={conditionPath(index, 'field')}
				render={({ field }) => (
					<RuleSelectField
						value={field.value}
						options={fieldOptions}
						ariaLabel="Condition field"
						className="flex-1"
						disabled={disabled}
						onChange={field.onChange}
					/>
				)}
			/>
			<Controller
				control={control}
				name={conditionPath(index, 'operator')}
				render={({ field }) => (
					<RuleSelectField
						value={field.value}
						options={operatorOptions}
						ariaLabel="Condition operator"
						className="flex-1"
						disabled={disabled}
						onChange={field.onChange}
					/>
				)}
			/>
			<Controller
				control={control}
				name={conditionPath(index, 'value')}
				render={({ field }) => (
					<RuleConditionValueField
						input={valueInput}
						value={field.value}
						disabled={disabled}
						onChange={field.onChange}
					/>
				)}
			/>
			<RowDeleteButton label="Remove condition" disabled={disabled} onClick={handleRemove} />
		</RuleForm.ConditionRow>
	);
};

RuleConditionRow.displayName = 'RuleConditionRow';

export { RuleConditionRow };
export type { RuleConditionRowProps };
