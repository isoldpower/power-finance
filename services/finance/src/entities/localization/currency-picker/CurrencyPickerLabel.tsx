import { useMemo } from "react";

import type { CurrencyPickerVariant } from "./types.ts";
import type { FC } from "react";
import type { CurrencyMeta } from "@entity/localization";


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
	const currentLabel = useMemo(() => {
		const selected = currencies.find((currency) => currency.code === value);
		
		return variant === 'pill'
			? value ?? placeholder
			: selected ? `${selected.code} · ${selected.name}` : value ?? placeholder;
	}, [currencies, placeholder, value, variant]);
		
	return (
		<span className="truncate">
			{currentLabel}
		</span>
	);
}

export { CurrencyPickerLabel };
export type { CurrencyPickerLabelProps };