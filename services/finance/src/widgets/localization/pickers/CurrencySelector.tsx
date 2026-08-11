import { useSettingsContext } from "@internal/shared";
import { useCurrencies, useSelectMainCurrency } from "@feature/localization";

import { CurrencyCombobox } from "./CurrencyCombobox.tsx";

import type { FinanceComboboxPivot } from "@internal/ui-library";
import type { CurrencyPickerVariant } from "@entity/localization";
import type { FC } from "react";


interface CurrencySelectorProps {
	variant?: CurrencyPickerVariant;
	pivot?: FinanceComboboxPivot;
	className?: string;
}

const CurrencySelector: FC<CurrencySelectorProps> = ({ variant = 'pill', pivot, className }) => {
	const { mainCurrency } = useSettingsContext();
	const { currencies } = useCurrencies();
	const onSelectMainCurrency = useSelectMainCurrency();

	return (
		<CurrencyCombobox
			currencies={currencies}
			value={mainCurrency}
			onSelected={onSelectMainCurrency}
			variant={variant}
			pivot={pivot}
			className={className}
		/>
	);
};

CurrencySelector.displayName = 'CurrencySelector';

export { CurrencySelector };
export type { CurrencySelectorProps };
