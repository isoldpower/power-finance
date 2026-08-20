import { cn, FinanceSegmented, FinanceSegmentedItem } from "@internal/ui-library";
import { useCallback, useRef } from "react";

import type { FC } from "react";
import type { TransactionEntryType } from "../types";


interface EntryTypeSelectorProps {
	value: TransactionEntryType;
	onChange: (value: TransactionEntryType) => void;
	className?: string;
}

const EntryTypeSelector: FC<EntryTypeSelectorProps> = ({ value, onChange, className }) => {
	const TRANSACTION_TYPE_OPTIONS = useRef<{ key: TransactionEntryType; label: string }[]>([
		{ key: 'expense', label: 'Expense' },
		{ key: 'income', label: 'Income' },
		{ key: 'transfer', label: 'Transfer' },
	]);
	
	const handleValueChange = useCallback((nextEntry: string) => {
		if (nextEntry) {
			onChange(nextEntry as TransactionEntryType);
		}
	}, [onChange]);
	
	return (
		<FinanceSegmented
			value={value}
			onValueChange={handleValueChange}
			className={cn("w-full", className)}
		>
			{TRANSACTION_TYPE_OPTIONS.current.map((option) => (
				<FinanceSegmentedItem key={option.key} value={option.key} accent className="flex-1">
					{option.label}
				</FinanceSegmentedItem>
			))}
		</FinanceSegmented>
	);
};

EntryTypeSelector.displayName = 'EntryTypeSelector';

export { EntryTypeSelector };
export type { EntryTypeSelectorProps };
