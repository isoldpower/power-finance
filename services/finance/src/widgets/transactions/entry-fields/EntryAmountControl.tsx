import { UiFormField } from "@internal/ui-library";
import { EntryAmountField } from "@entity/transactions";
import { currencySymbol } from "@shared/formatting";

import type { FC } from "react";
import type { Control, FieldValues, Path } from "react-hook-form";
import type { TransactionEntryType } from "@entity/transactions";
import type { EntryAmountEmphasis } from "@entity/transactions";


interface EntryAmountControlProps<TValues extends FieldValues> {
	control: Control<TValues>;
	name: Path<TValues>;
	type: TransactionEntryType;
	currency: string;
	label?: string;
	emphasis?: EntryAmountEmphasis;
	className?: string;
	disabled?: boolean;
	onChange?: (value: string) => void;
}

const EntryAmountControl = <TValues extends FieldValues>({
	control,
	name,
	type,
	currency,
	label,
	emphasis,
	className,
	disabled,
	onChange,
}: EntryAmountControlProps<TValues>) => (
	<UiFormField
		control={control}
		name={name}
		disabled={disabled}
		render={({ field }) => (
			<div className={className}>
				<EntryAmountField>
					{label ? (
						<EntryAmountField.Label>
							{label}
						</EntryAmountField.Label>
					) : null}
					<EntryAmountField.Box emphasis={emphasis}>
						{type === 'transfer' ? (
							<EntryAmountField.Glyph type={type} emphasis={emphasis} />
						) : (
							<EntryAmountField.Sign type={type}>
								{type === 'income' ? '+' : '−'}
							</EntryAmountField.Sign>
						)}
						<EntryAmountField.Symbol type={type}>
							{currencySymbol(currency)}
						</EntryAmountField.Symbol>
						<EntryAmountField.Input
							type={type}
							value={field.value}
							onChange={onChange ?? field.onChange}
						/>
					</EntryAmountField.Box>
				</EntryAmountField>
			</div>
		)}
	/>
);

(EntryAmountControl as FC).displayName = 'EntryAmountControl';

export { EntryAmountControl };
export type { EntryAmountControlProps };
