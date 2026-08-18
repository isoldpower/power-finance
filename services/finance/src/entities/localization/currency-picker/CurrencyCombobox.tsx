import {
	cn,
	FinanceCombobox,
	FinanceComboboxContent,
	FinanceComboboxEmpty,
	FinanceComboboxInput,
	FinanceComboboxItem,
	FinanceComboboxList,
	FinanceComboboxTrigger,
} from "@internal/ui-library";
import { CurrencyPickerLabel } from "./picker/CurrencyPickerLabel.tsx";
import { CurrencyPickerOptionCode } from "./picker/CurrencyPickerOptionCode.tsx";
import { CurrencyPickerOptionSelected } from "./picker/CurrencyPickerOptionSelected.tsx";
import { CurrencyPickerOptionSymbol } from "./picker/CurrencyPickerOptionSymbol.tsx";
import { MetaText } from "@shared/pure-components/typography";

import type { FinanceComboboxPivot } from "@internal/ui-library";
import type { CurrencyPickerVariant } from "./picker/types.ts";
import type { CurrencyMeta } from "../types.ts";
import type { FC, ReactNode } from "react";


interface CurrencyComboboxProps {
	currencies: CurrencyMeta[];
	value?: string;
	onSelected: (code: string) => void;
	variant?: CurrencyPickerVariant;
	pivot?: FinanceComboboxPivot;
	className?: string;
	placeholder?: string;
	notFound?: ReactNode;
}

const CurrencyCombobox: FC<CurrencyComboboxProps> = ({
	currencies,
	value,
	onSelected,
	variant = 'field',
	pivot,
	className,
	placeholder,
	notFound,
}) => {
	return (
		<FinanceCombobox>
			<FinanceComboboxTrigger className={cn("w-full", className)}>
				<CurrencyPickerLabel variant={variant} currencies={currencies} placeholder={placeholder}>
					{value}
				</CurrencyPickerLabel>
			</FinanceComboboxTrigger>
			<FinanceComboboxContent pivot={pivot}>
				<FinanceComboboxInput placeholder="Search currency..." />
				<FinanceComboboxList>
					<FinanceComboboxEmpty>
						{notFound ?? "No currency found."}
					</FinanceComboboxEmpty>
					{currencies.map((currency) => (
						<FinanceComboboxItem
							key={currency.code}
							value={`${currency.code} ${currency.name}`}
							onSelect={() => { onSelected(currency.code); }}
						>
							<CurrencyPickerOptionSymbol>
								{currency.symbol}
							</CurrencyPickerOptionSymbol>
							<CurrencyPickerOptionCode>
								{currency.code}
							</CurrencyPickerOptionCode>
							<MetaText size="10.5">
								{currency.name}
							</MetaText>
							<CurrencyPickerOptionSelected>
								{value === currency.code}
							</CurrencyPickerOptionSelected>
						</FinanceComboboxItem>
					))}
				</FinanceComboboxList>
			</FinanceComboboxContent>
		</FinanceCombobox>
	);
};

CurrencyCombobox.displayName = 'CurrencyCombobox';

export { CurrencyCombobox };
export type { CurrencyComboboxProps };
