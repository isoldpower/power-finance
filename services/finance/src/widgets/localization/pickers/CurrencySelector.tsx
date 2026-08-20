import { CurrencyCombobox } from "@entity/localization";
import { useSettingsContext } from "@internal/shared";
import { CurrencySelectorFx, useCurrencies } from "@feature/localization";
import { useSelectMainCurrency } from "@feature/configuration";

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
	const { currencies, isPending } = useCurrencies();
	const { onSelect, isSaving } = useSelectMainCurrency();

	return (
		<CurrencySelectorFx isPending={isPending} className={className}>
			<CurrencyCombobox
				currencies={currencies}
				value={mainCurrency}
				onSelected={onSelect}
				variant={variant}
				pivot={pivot}
				className={className}
				isSaving={isSaving}
			/>
		</CurrencySelectorFx>
	);
};

CurrencySelector.displayName = 'CurrencySelector';

export { CurrencySelector };
export type { CurrencySelectorProps };
