import { useSettingsContext } from "@internal/shared";
import { useCallback, useMemo } from "react";


export const useLocaleDate = (date: string) => {
	const { locale } = useSettingsContext();

	return useMemo(() => {
		const dateFormat = new Date(date);

		try {
			return new Intl.DateTimeFormat(locale, {
				month: 'short',
				day: 'numeric',
				year: 'numeric'
			}).format(dateFormat);
		} catch (e) {
			console.error(e);
			return dateFormat.toLocaleDateString();
		}
	}, [locale, date]);
}

export const useLocaleDateTransform = () => {
	const { locale } = useSettingsContext();

	return useCallback((date: string) => {
		const dateFormat = new Date(date);

		try {
			return new Intl.DateTimeFormat(locale, {
				month: 'short',
				day: 'numeric',
				year: 'numeric'
			}).format(dateFormat);
		} catch (e) {
			console.error(e);
			return dateFormat.toLocaleDateString();
		}
	}, [locale]);
}