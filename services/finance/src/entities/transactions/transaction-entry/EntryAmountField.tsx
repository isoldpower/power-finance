import { cn } from "@internal/ui-library";

import { currencySymbol, sanitizeAmountInput, TRANSACTION_TYPE_TONE } from "@shared/utils";

import { TransferGlyph } from "../icons/DirectionIcons.tsx";

import type { FC } from "react";
import type { TransactionEntryType } from "@shared/utils";


type EntryAmountEmphasis = 'default' | 'accent';

interface EntryAmountFieldProps {
	type: TransactionEntryType;
	currency: string;
	value: string;
	onChange: (value: string) => void;
	label?: string;
	emphasis?: EntryAmountEmphasis;
	className?: string;
}

const BOX_BY_EMPHASIS: Record<EntryAmountEmphasis, string> = {
	default: 'border border-border-strong px-3.5 py-2.5',
	accent: 'border-[1.5px] border-primary px-4 py-3.5 shadow-[0_0_0_3px_var(--accent-soft)]',
};

const GLYPH_SIZE_BY_EMPHASIS: Record<EntryAmountEmphasis, number> = {
	default: 24,
	accent: 26,
};

const EntryAmountField: FC<EntryAmountFieldProps> = ({
	type,
	currency,
	value,
	onChange,
	label,
	emphasis = 'default',
	className,
}) => {
	const signColor = TRANSACTION_TYPE_TONE[type];

	return (
		<div className={className}>
			{label ? (
				<span className="mb-1 block font-numeric text-[10px] uppercase text-text-3">{label}</span>
			) : null}
			<div className={cn("flex items-center gap-2 rounded-[var(--radius-md)]", BOX_BY_EMPHASIS[emphasis])}>
				{type === 'transfer' ? (
					<TransferGlyph className={signColor} size={GLYPH_SIZE_BY_EMPHASIS[emphasis]} />
				) : (
					<span className={cn("font-display text-2xl", signColor)}>{type === 'income' ? '+' : '−'}</span>
				)}
				<span className={cn("font-display text-3xl font-semibold", signColor)}>{currencySymbol(currency)}</span>
				<input
					value={value}
					onChange={(event) => { onChange(sanitizeAmountInput(event.target.value)); }}
					inputMode="decimal"
					placeholder="0.00"
					className={cn(
						"w-full min-w-0 flex-1 border-none bg-transparent p-0 font-display text-3xl font-semibold outline-none placeholder:text-[var(--text-3)]",
						signColor
					)}
				/>
			</div>
		</div>
	);
};

EntryAmountField.displayName = 'EntryAmountField';

export { EntryAmountField };
export type { EntryAmountFieldProps, EntryAmountEmphasis };
