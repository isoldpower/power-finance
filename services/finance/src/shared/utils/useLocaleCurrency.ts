import { useSettingsContext } from "@internal/shared";
import { useCallback } from "react";

export const useLocaleCurrency = () => {
	const { locale } = useSettingsContext();

	return useCallback((
		amount: number,
		currency: string
	) => amount.toLocaleString(locale, {
		style: 'currency',
		currency: currency,
	}), [locale]);
}