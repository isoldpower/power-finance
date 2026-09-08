import { resolveLocale, useSettingsContext } from "@internal/shared";
import { useCallback } from "react";

import { toDisplayAmount } from "./money";
import { DEFAULT_CURRENCY } from "./money/config.ts";

import type { FormatMoney } from "./money";


type UseLocaleCurrencyReturn = FormatMoney;

const useLocaleCurrency = (): UseLocaleCurrencyReturn => {
	const { locale } = useSettingsContext();

	return useCallback((amount: string, currency: string) => {
		const code = currency.trim() || DEFAULT_CURRENCY;
		const safeLocale = resolveLocale(locale);
		const { value, fractionDigits } = toDisplayAmount(amount, code);

		try {
			return value.toLocaleString(safeLocale, {
				style: 'currency',
				currency: code,
			});
		} catch {
			return value.toLocaleString(safeLocale, {
				minimumFractionDigits: fractionDigits,
				maximumFractionDigits: fractionDigits,
			});
		}
	}, [locale]);
}

export { useLocaleCurrency };
