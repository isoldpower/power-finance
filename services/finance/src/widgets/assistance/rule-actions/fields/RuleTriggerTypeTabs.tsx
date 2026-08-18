import { FinanceSegmented, FinanceSegmentedItem } from "@internal/ui-library";

import type { FC } from "react";
import type { SelectOption } from "@shared/forms";


interface RuleTriggerTypeTabsProps {
	value: string;
	options: SelectOption[];
	disabled?: boolean;
	onChange: (value: string) => void;
}

const RuleTriggerTypeTabs: FC<RuleTriggerTypeTabsProps> = ({ value, options, disabled, onChange }) => (
	<FinanceSegmented
		value={value}
		disabled={disabled}
		className="h-10 w-full"
		aria-label="Trigger kind"
		onValueChange={(next) => { if (next) onChange(next); }}
	>
		{options.map((option) => (
			<FinanceSegmentedItem key={option.value} value={option.value} accent className="h-full flex-1">
				{option.label}
			</FinanceSegmentedItem>
		))}
	</FinanceSegmented>
);

RuleTriggerTypeTabs.displayName = 'RuleTriggerTypeTabs';

export { RuleTriggerTypeTabs };
export type { RuleTriggerTypeTabsProps };
