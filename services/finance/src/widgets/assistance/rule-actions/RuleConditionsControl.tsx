import { RuleCombinatorField } from "./fields/RuleCombinatorField.tsx";
import { RuleConditionRow } from "./fields/RuleConditionRow.tsx";
import { RuleField } from "./fields/RuleField.tsx";
import { List, RowAddButton } from "@shared/pure-components/collections";
import { StackedList } from "@shared/pure-components/layout";
import { Caption } from "@shared/pure-components/typography";

import type { FC } from "react";
import type { Control } from "react-hook-form";
import type { FilterFieldOption } from "@shared/api";
import type { RuleFormSchema } from "@feature/assistance";
import type { SelectOption } from "@shared/forms";


interface RuleConditionsControlProps {
	control: Control<RuleFormSchema>;
	conditionRows: { id: string }[];
	filterFields: FilterFieldOption[];
	combinatorOptions: SelectOption[];
	label: string;
	emptyHint: string;
	addLabel: string;
	disabled?: boolean;
	onAppend: () => void;
	onRemove: (index: number) => void;
}

const RuleConditionsControl: FC<RuleConditionsControlProps> = ({
	control,
	conditionRows,
	filterFields,
	combinatorOptions,
	label,
	emptyHint,
	addLabel,
	disabled,
	onAppend,
	onRemove,
}) => (
	<RuleField
		label={label}
		action={(
			<RowAddButton label={addLabel} disabled={disabled} onClick={onAppend} />
		)}
	>
		{conditionRows.length === 0 ? (
			<Caption size="12">
				{emptyHint}
			</Caption>
		) : (
			<StackedList gap={2}>
				{conditionRows.length > 1 ? (
					<RuleCombinatorField
						control={control}
						options={combinatorOptions}
						disabled={disabled}
					/>
				) : null}
				<List className="flex flex-col gap-2">
					{conditionRows.map((conditionRow, index) => (
						<RuleConditionRow
							key={conditionRow.id}
							control={control}
							index={index}
							filterFields={filterFields}
							disabled={disabled}
							onRemove={onRemove}
						/>
					))}
				</List>
			</StackedList>
		)}
	</RuleField>
);

RuleConditionsControl.displayName = 'RuleConditionsControl';

export { RuleConditionsControl };
export type { RuleConditionsControlProps };
