import { cn, FinanceSegmented, FinanceSegmentedItem } from "@internal/ui-library";
import { useCallback, useMemo } from "react";

import type { FC } from "react";
import type { TransactionEntryType } from "../types";


interface EntryTypeOption {
	key: TransactionEntryType;
	label: string;
}

interface EntryTypeSelectorProps {
	value: TransactionEntryType;
	onChange: (value: TransactionEntryType) => void;
	allowTransfer?: boolean;
	className?: string;
}

const TRANSACTION_TYPE_OPTIONS: EntryTypeOption[] = [
	{ key: 'expense', label: 'Expense' },
	{ key: 'income', label: 'Income' },
	{ key: 'transfer', label: 'Transfer' },
];

const EntryTypeSelector: FC<EntryTypeSelectorProps> = ({ value, onChange, allowTransfer = true, className }) => {
	const visibleOptions = useMemo(() => {
		return TRANSACTION_TYPE_OPTIONS.filter((option) => allowTransfer || option.key !== 'transfer');
	}, [allowTransfer]);

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
			{visibleOptions.map((option) => (
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
