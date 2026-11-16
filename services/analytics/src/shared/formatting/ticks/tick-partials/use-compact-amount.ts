import { useCallback } from "react";
import { resolveLocale, useSettingsContext } from "@internal/shared";


type FormatCompactAmount = (value: number, currency: string) => string;

const useCompactAmount = (): FormatCompactAmount => {
	const { locale } = useSettingsContext();

	return useCallback((value: number, currency: string) => {
		const safeLocale = resolveLocale(locale);

		try {
			return new Intl.NumberFormat(safeLocale, {
				style: 'currency',
				currency,
				notation: 'compact',
				maximumFractionDigits: 1,
			}).format(value);
		} catch {
			return new Intl.NumberFormat(safeLocale, { notation: 'compact', maximumFractionDigits: 1 }).format(value);
		}
	}, [locale]);
};

export { useCompactAmount };
export type { FormatCompactAmount };
