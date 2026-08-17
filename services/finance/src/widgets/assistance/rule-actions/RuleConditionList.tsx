import { useCallback, useMemo } from "react";
import { Controller, useFieldArray, useWatch } from "react-hook-form";
import { cn, FinanceInput } from "@internal/ui-library";

import { RuleForm } from "@entity/assistance";
import { List, RowAddButton, RowDeleteButton } from "@shared/pure-components/collections";
import { StackedList } from "@shared/pure-components/layout";
import { Caption } from "@shared/pure-components/typography";
import { COMBINATOR_OPTIONS, OPERATOR_LABELS, RULE_FIELD_TEXT } from "./config.ts";
import { RuleField } from "./RuleField.tsx";
import { RuleSelectField } from "./RuleSelectField.tsx";

import type { FC } from "react";
import type { Control } from "react-hook-form";
import type { FilterFieldOption } from "@shared/api";
import type { RuleFormSchema } from "@feature/assistance";
import type { SelectOption } from "./config.ts";


interface RuleConditionListProps {
	control: Control<RuleFormSchema>;
	resolveFields: (triggerType: RuleFormSchema['triggerType']) => FilterFieldOption[];
	disabled?: boolean;
}

const toFieldOptions = (fields: FilterFieldOption[]): SelectOption[] => {
	return fields.map((option) => ({ value: option.field, label: option.label }));
};

const firstField = (options: SelectOption[]): string => options[0]?.value ?? 'name';

type ConditionKey = 'field' | 'operator' | 'value';
type ConditionPath = `conditions.${number}.${ConditionKey}`;

const conditionPath = (index: number, key: ConditionKey): ConditionPath => {
	return `conditions.${index.toString()}.${key}` as ConditionPath;
};

const toOperatorOptions = (fields: FilterFieldOption[], field: string): SelectOption[] => {
	const operators = fields.find((option) => option.field === field)?.operators ?? [];

	return operators.map((operator) => ({ value: operator, label: OPERATOR_LABELS[operator] ?? operator }));
};

const RuleConditionList: FC<RuleConditionListProps> = ({ control, resolveFields, disabled }) => {
	const { fields, append, remove } = useFieldArray({ control, name: 'conditions' });
	const triggerType = useWatch({ control, name: 'triggerType' });
	const conditions = useWatch({ control, name: 'conditions' });
	const filterFields = useMemo(() => resolveFields(triggerType), [resolveFields, triggerType]);
	const fieldOptions = useMemo(() => toFieldOptions(filterFields), [filterFields]);

	const handleAppend = useCallback(() => {
		append({ field: firstField(fieldOptions), operator: 'eq', value: '' });
	}, [append, fieldOptions]);

	const handleRemove = useCallback((index: number) => () => {
		remove(index);
	}, [remove]);

	return (
		<RuleField
			label="Only run when"
			action={(
				<RowAddButton label="Add condition" disabled={disabled} onClick={handleAppend} />
			)}
		>
			{fields.length === 0 ? (
				<Caption size="12">
					No conditions yet — the rule runs every time the trigger fires.
				</Caption>
			) : (
				<StackedList gap={2}>
					{fields.length > 1 ? (
						<Controller
							control={control}
							name="combinator"
							render={({ field }) => (
								<RuleSelectField
									value={field.value}
									options={COMBINATOR_OPTIONS}
									ariaLabel="Combine conditions"
									className="w-full"
									disabled={disabled}
									onChange={field.onChange}
								/>
							)}
						/>
					) : null}
					<List className="flex flex-col gap-2">
						{fields.map((entry, index) => (
							<RuleForm.ConditionRow key={entry.id}>
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
											options={toOperatorOptions(filterFields, conditions[index]?.field ?? '')}
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
											disabled={disabled}
											placeholder="Value to match"
											aria-label="Condition value"
											className={cn("flex-1", RULE_FIELD_TEXT)}
											onChange={field.onChange}
										/>
									)}
								/>
								<RowDeleteButton
									label="Remove condition"
									disabled={disabled}
									onClick={handleRemove(index)}
								/>
							</RuleForm.ConditionRow>
						))}
					</List>
				</StackedList>
			)}
		</RuleField>
	);
};

RuleConditionList.displayName = 'RuleConditionList';

export { RuleConditionList };
export type { RuleConditionListProps };
