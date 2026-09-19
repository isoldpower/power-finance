import { useMemo } from "react";
import { CurrencyCombobox } from "@entity/localization";

import type { FinanceComboboxPivot } from "@internal/ui-library";
import type { CurrencyMeta, CurrencyPickerVariant } from "@entity/localization";
import type { FC, ReactNode } from "react";


interface CurrencyPickerProps {
	currencies: CurrencyMeta[];
	value?: string;
	onSelected: (code: string) => void;
	variant?: CurrencyPickerVariant;
	pivot?: FinanceComboboxPivot;
	className?: string;
	placeholder?: string;
	notFound?: ReactNode;
	isSaving?: boolean;
}

const CurrencyPicker: FC<CurrencyPickerProps> = ({
	currencies,
	value,
	onSelected,
	variant = 'field',
	pivot,
	className,
	placeholder = "Select currency",
	notFound,
	isSaving = false,
}) => {
	const label = useMemo(() => {
		if (variant === 'pill') {
			return value ?? placeholder;
		}
		
		const selected = currencies.find((currency) => {
			return currency.code === value;
		});
		return selected 
			? `${selected.code} · ${selected.name}` 
			: value ?? placeholder;
	}, [currencies, placeholder, value, variant]);

	return (
		<CurrencyCombobox>
			<CurrencyCombobox.Trigger className={className} isSaving={isSaving}>
				<CurrencyCombobox.Label>
					{label}
				</CurrencyCombobox.Label>
			</CurrencyCombobox.Trigger>
			<CurrencyCombobox.Content pivot={pivot}>
				<CurrencyCombobox.Search />
				<CurrencyCombobox.List>
					<CurrencyCombobox.Empty>
						{notFound ?? "No currency found."}
					</CurrencyCombobox.Empty>
					{currencies.map((currency) => (
						<CurrencyCombobox.Option
							key={currency.code}
							value={`${currency.code} ${currency.name}`}
							onSelect={() => { onSelected(currency.code); }}
						>
							<CurrencyCombobox.OptionSymbol>
								{currency.symbol}
							</CurrencyCombobox.OptionSymbol>
							<CurrencyCombobox.OptionCode>
								{currency.code}
							</CurrencyCombobox.OptionCode>
							<CurrencyCombobox.OptionName>
								{currency.name}
							</CurrencyCombobox.OptionName>
							<CurrencyCombobox.OptionSelected>
								{value === currency.code}
							</CurrencyCombobox.OptionSelected>
						</CurrencyCombobox.Option>
					))}
				</CurrencyCombobox.List>
			</CurrencyCombobox.Content>
		</CurrencyCombobox>
	);
};

CurrencyPicker.displayName = 'CurrencyPicker';

export { CurrencyPicker };
export type { CurrencyPickerProps };
