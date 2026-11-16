import { useMemo } from "react";
import { useSettingsContext } from "@internal/shared";

import type { CurrencyMeta } from "@internal/shared";


interface MainCurrencyLabel {
	mainCurrency: string;
	labelParts: string[];
}

const useMainCurrencyLabel = (currencies: CurrencyMeta[]): MainCurrencyLabel => {
	const { mainCurrency } = useSettingsContext();

	return useMemo(() => {
		const selected = currencies.find((currency) => currency.code === mainCurrency);

		return {
			mainCurrency,
			labelParts: selected ? [selected.code, selected.name] : [mainCurrency],
		};
	}, [currencies, mainCurrency]);
};

export { useMainCurrencyLabel };
export type { MainCurrencyLabel };
