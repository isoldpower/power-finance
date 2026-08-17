import { FinanceSegmented, FinanceSegmentedItem } from "@internal/ui-library";

import { TRIGGER_TYPE_OPTIONS } from "./config.ts";

import type { FC } from "react";


interface RuleTriggerTypeTabsProps {
	value: string;
	disabled?: boolean;
	onChange: (value: string) => void;
}

const RuleTriggerTypeTabs: FC<RuleTriggerTypeTabsProps> = ({ value, disabled, onChange }) => (
	<FinanceSegmented
		value={value}
		disabled={disabled}
		className="h-10 w-full"
		aria-label="Trigger kind"
		onValueChange={(next) => { if (next) onChange(next); }}
	>
		{TRIGGER_TYPE_OPTIONS.map((option) => (
			<FinanceSegmentedItem key={option.value} value={option.value} accent className="h-full flex-1">
				{option.label}
			</FinanceSegmentedItem>
		))}
	</FinanceSegmented>
);

RuleTriggerTypeTabs.displayName = 'RuleTriggerTypeTabs';

export { RuleTriggerTypeTabs };
export type { RuleTriggerTypeTabsProps };
