import { TransferGlyph } from "@shared/pure-components/icons";
import { cn } from "@internal/ui-library";

import { TRANSACTION_TYPE_TONE, currencySymbol, sanitizeAmountInput } from "@shared/formatting";
import { DisplayText, Overline, Text, textClass } from "@shared/pure-components/typography";


import type { FC } from "react";
import type { TransactionEntryType } from "@shared/formatting";


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
				<Overline as="span" size="10" tracking="normal" className="mb-1 block">{label}</Overline>
			) : null}
			<div className={cn("flex items-center gap-2 rounded-[var(--radius-md)]", BOX_BY_EMPHASIS[emphasis])}>
				{type === 'transfer' ? (
					<TransferGlyph className={signColor} size={GLYPH_SIZE_BY_EMPHASIS[emphasis]} />
				) : (
					<Text as="span" family="display" size="2xl" className={signColor}>{type === 'income' ? '+' : '−'}</Text>
				)}
				<DisplayText as="span" className={signColor}>{currencySymbol(currency)}</DisplayText>
				<input
					value={value}
					onChange={(event) => { onChange(sanitizeAmountInput(event.target.value)); }}
					inputMode="decimal"
					placeholder="0.00"
					className={cn(
						textClass({ family: 'display', size: '3xl', weight: 'semibold' }),
						"w-full min-w-0 flex-1 border-none bg-transparent p-0 outline-none placeholder:text-[var(--text-3)]",
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
