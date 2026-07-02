import type { FC } from "react";
import { cn, FinanceSegmented, FinanceSegmentedItem } from "@internal/ui-library";

import { TRANSACTION_TYPE_OPTIONS } from "@shared/utils";
import type { TransactionEntryType } from "@shared/utils";

interface QuickAddTypeSelectorProps {
	value: TransactionEntryType;
	onChange: (value: TransactionEntryType) => void;
	className?: string;
}

const QuickAddTypeSelector: FC<QuickAddTypeSelectorProps> = ({ value, onChange, className }) => (
	<FinanceSegmented value={value} onValueChange={(next) => { if (next) onChange(next as TransactionEntryType); }} className={cn("w-full", className)}>
		{TRANSACTION_TYPE_OPTIONS.map((option) => (
			<FinanceSegmentedItem key={option.key} value={option.key} accent className="flex-1">
				{option.label}
			</FinanceSegmentedItem>
		))}
	</FinanceSegmented>
);

QuickAddTypeSelector.displayName = 'QuickAddTypeSelector';

export { QuickAddTypeSelector };
export type { QuickAddTypeSelectorProps };
