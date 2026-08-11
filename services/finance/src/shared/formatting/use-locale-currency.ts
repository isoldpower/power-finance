import { resolveLocale, useSettingsContext } from "@internal/shared";
import { useCallback } from "react";

export const useLocaleCurrency = () => {
	const { locale } = useSettingsContext();

	return useCallback((
		amount: number,
		currency: string
	) => {
		const code = currency.trim() || 'USD';
		const safeLocale = resolveLocale(locale);
		try {
			return amount.toLocaleString(safeLocale, {
				style: 'currency',
				currency: code,
			});
		} catch {
			return amount.toLocaleString(safeLocale, {
				minimumFractionDigits: 2,
				maximumFractionDigits: 2,
			});
		}
	}, [locale]);
}