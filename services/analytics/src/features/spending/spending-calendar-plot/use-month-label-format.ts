import { useCallback } from "react";
import { resolveLocale, useSettingsContext } from "@internal/shared";


const useMonthLabelFormat = (): ((date: Date) => string) => {
	const { locale } = useSettingsContext();

	return useCallback((date: Date) => {
		return date.toLocaleDateString(resolveLocale(locale), { month: 'short' });
	}, [locale]);
};

export { useMonthLabelFormat };
