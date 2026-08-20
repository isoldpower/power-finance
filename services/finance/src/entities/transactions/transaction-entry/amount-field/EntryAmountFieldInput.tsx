import { cn } from "@internal/ui-library";
import { sanitizeAmountInput } from "@shared/formatting";
import { textClass } from "@shared/pure-components/typography";

import type { FC } from "react";
import type { TransactionEntryType } from "../../types";


interface EntryAmountFieldInputProps {
	type: TransactionEntryType;
	value: string;
	onChange: (value: string) => void;
	placeholder?: string;
}

const EntryAmountFieldInput: FC<EntryAmountFieldInputProps> = ({
	type,
	value,
	onChange,
	placeholder = '0.00',
}) => (
	<input
		value={value}
		onChange={(event) => { onChange(sanitizeAmountInput(event.target.value)); }}
		inputMode="decimal"
		placeholder={placeholder}
		className={cn(
			textClass({ family: 'display', size: '3xl', weight: 'semibold' }),
			"w-full min-w-0 flex-1 border-none bg-transparent p-0 outline-none",
			"placeholder:text-[var(--text-3)]",
			type === 'expense' && 'text-neg',
			type === 'income' && 'text-pos',
			type === 'transfer' && 'text-primary'
		)}
	/>
);

EntryAmountFieldInput.displayName = 'EntryAmountFieldInput';

export { EntryAmountFieldInput };
export type { EntryAmountFieldInputProps };
