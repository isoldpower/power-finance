import { useCallback, useMemo } from "react";
import { Controller, useWatch } from "react-hook-form";
import { cn, FinanceInput } from "@internal/ui-library";

import { RuleForm } from "@entity/assistance";
import { conditionPath, toFieldOptions, toOperatorOptions } from "@feature/assistance";
import { OPERATOR_LABELS } from "@shared/api";
import { RowDeleteButton } from "@shared/pure-components/collections";
import { RULE_FIELD_TEXT } from "./config.ts";
import { RuleSelectField } from "./RuleSelectField.tsx";

import type { FC } from "react";
import type { Control } from "react-hook-form";
import type { FilterFieldOption } from "@shared/api";
import type { RuleFormSchema } from "@feature/assistance";


interface RuleConditionRowProps {
	control: Control<RuleFormSchema>;
	index: number;
	filterFields: FilterFieldOption[];
	disabled?: boolean;
	onRemove: (index: number) => void;
}

const RuleConditionRow: FC<RuleConditionRowProps> = ({
	control,
	index,
	filterFields,
	disabled,
	onRemove,
}) => {
	const selectedField = useWatch({ control, name: conditionPath(index, 'field') });
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
					<FinanceInput
						value={field.value}
						placeholder="Value to match"
						aria-label="Condition value"
						className={cn("flex-1", RULE_FIELD_TEXT)}
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
