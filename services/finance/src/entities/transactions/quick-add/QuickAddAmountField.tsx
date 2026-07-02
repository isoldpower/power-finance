import type { FC } from "react";
import { cn } from "@internal/ui-library";

import { currencySymbol, sanitizeAmountInput, TRANSACTION_TYPE_TONE } from "@shared/utils";
import type { TransactionEntryType } from "@shared/utils";

import { TransferGlyph } from "../direction-icons/DirectionIcons.tsx";

interface QuickAddAmountFieldProps {
	type: TransactionEntryType;
	currency: string;
	value: string;
	onChange: (value: string) => void;
	className?: string;
}

const QuickAddAmountField: FC<QuickAddAmountFieldProps> = ({ type, currency, value, onChange, className }) => {
	const signColor = TRANSACTION_TYPE_TONE[type];
	const isTransfer = type === 'transfer';

	return (
		<div className={cn("flex items-center gap-2 rounded-[var(--radius-md)] border border-border-strong px-3.5 py-2.5", className)}>
			{isTransfer ? (
				<TransferGlyph className={signColor} />
			) : (
				<span className={cn("font-display text-2xl", signColor)}>{type === 'income' ? '+' : '−'}</span>
			)}
			<span className={cn("font-display text-3xl font-semibold", signColor)}>{currencySymbol(currency)}</span>
			<input
				value={value}
				onChange={(event) => { onChange(sanitizeAmountInput(event.target.value)); }}
				inputMode="decimal"
				placeholder="0.00"
				className={cn("w-full min-w-0 flex-1 border-none bg-transparent p-0 font-display text-3xl font-semibold outline-none placeholder:text-[var(--text-3)]", signColor)}
			/>
		</div>
	);
};

QuickAddAmountField.displayName = 'QuickAddAmountField';

export { QuickAddAmountField };
export type { QuickAddAmountFieldProps };
