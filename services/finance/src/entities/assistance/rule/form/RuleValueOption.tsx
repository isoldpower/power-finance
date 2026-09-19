import { FinanceComboboxItem } from "@internal/ui-library";
import { CheckIcon } from "@shared/pure-components/icons";

import type { FC } from "react";


interface RuleValueOptionProps {
	value: string;
	label: string;
	selected?: boolean;
	onSelect: (value: string) => void;
}

const RuleValueOption: FC<RuleValueOptionProps> = ({
	value,
	label,
	selected = false,
	onSelect,
}) => (
	<FinanceComboboxItem
		value={value}
		keywords={[label]}
		onSelect={() => { onSelect(value); }}
	>
		{selected ? (
			<CheckIcon size={14} className="flex-none text-primary" />
		) : (
			<span aria-hidden className="size-3.5 flex-none" />
		)}
		<span className="min-w-0 truncate">{label}</span>
	</FinanceComboboxItem>
);

RuleValueOption.displayName = 'RuleValueOption';

export { RuleValueOption };
export type { RuleValueOptionProps };
