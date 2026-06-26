import { useSettingsContext } from "@internal/shared";
import { useCallback } from "react";

export const useLocaleCurrency = () => {
	const { locale } = useSettingsContext();

	return useCallback((
		amount: number,
		currency: string
	) => {
		const code = currency.trim() || 'USD';
		try {
			return amount.toLocaleString(locale, {
				style: 'currency',
				currency: code,
			});
		} catch {
			return amount.toLocaleString(locale, {
				minimumFractionDigits: 2,
				maximumFractionDigits: 2,
			});
		}
	}, [locale]);
}