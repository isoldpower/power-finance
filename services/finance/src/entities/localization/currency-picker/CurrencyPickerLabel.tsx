import { useCallback, useMemo } from "react";

import type { FC } from "react";
import type { CurrencyPickerVariant } from "./types.ts";
import type { CurrencyMeta } from "../types.ts";


interface CurrencyPickerLabelProps {
	variant: CurrencyPickerVariant;
	currencies: CurrencyMeta[];
	children?: string;
	placeholder?: string;
}

const CurrencyPickerLabel: FC<CurrencyPickerLabelProps> = ({
	variant,
	children: value,
	currencies,
	placeholder = "Select currency",
}) => {
	const formatSelected = useCallback((selectedCurrency: CurrencyMeta) => {
		return `${selectedCurrency.code} · ${selectedCurrency.name}`;
	}, []);
	
	const currentLabel = useMemo(() => {
		if (variant === 'pill') {
			return value ?? placeholder;
		}
		
		const selectedCurrency = currencies.find((currency) => (
			currency.code === value
		));
		return selectedCurrency 
			? formatSelected(selectedCurrency) 
			: value ?? placeholder;
	}, [currencies, formatSelected, placeholder, value, variant]);

	return (
		<span className="truncate">
			{currentLabel}
		</span>
	);
};

CurrencyPickerLabel.displayName = 'CurrencyPickerLabel';

export { CurrencyPickerLabel };
export type { CurrencyPickerLabelProps };
