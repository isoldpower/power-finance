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
import { CurrencyPicker } from "@entity/localization";
import { MetaText } from "@shared/pure-components/typography";

import type { FinanceComboboxPivot } from "@internal/ui-library";
import type { CurrencyPickerVariant } from "@entity/localization";
import type { CurrencyMeta } from "@entity/localization";
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
				<CurrencyPicker.Label variant={variant} currencies={currencies} placeholder={placeholder}>
					{value}
				</CurrencyPicker.Label>
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
							<CurrencyPicker.OptionSymbol>
								{currency.symbol}
							</CurrencyPicker.OptionSymbol>
							<CurrencyPicker.OptionCode>
								{currency.code}
							</CurrencyPicker.OptionCode>
							<MetaText size="10.5">
								{currency.name}
							</MetaText>
							<CurrencyPicker.OptionSelected>
								{value === currency.code}
							</CurrencyPicker.OptionSelected>
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
