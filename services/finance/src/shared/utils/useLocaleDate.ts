import { useSettingsContext } from "@internal/shared";
import { useMemo } from "react";

export const useLocaleDate = (date: string) => {
	const { locale } = useSettingsContext();

	return useMemo(() => {
		const dateFormat = new Date(date);

		return new Intl.DateTimeFormat(locale, {
			month: 'short',
			day: 'numeric',
			year: 'numeric'
		}).format(dateFormat);
	}, [locale, date]);
}