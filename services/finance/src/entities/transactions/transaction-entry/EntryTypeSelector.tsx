import { cn, FinanceSegmented, FinanceSegmentedItem } from "@internal/ui-library";
import { TRANSACTION_TYPE_OPTIONS } from "@shared/formatting";

import type { FC } from "react";
import type { TransactionEntryType } from "@shared/formatting";


interface EntryTypeSelectorProps {
	value: TransactionEntryType;
	onChange: (value: TransactionEntryType) => void;
	className?: string;
}

const EntryTypeSelector: FC<EntryTypeSelectorProps> = ({ value, onChange, className }) => (
	<FinanceSegmented
		value={value}
		onValueChange={(next) => { if (next) onChange(next as TransactionEntryType); }}
		className={cn("w-full", className)}
	>
		{TRANSACTION_TYPE_OPTIONS.map((option) => (
			<FinanceSegmentedItem key={option.key} value={option.key} accent className="flex-1">
				{option.label}
			</FinanceSegmentedItem>
		))}
	</FinanceSegmented>
);

EntryTypeSelector.displayName = 'EntryTypeSelector';

export { EntryTypeSelector };
export type { EntryTypeSelectorProps };
