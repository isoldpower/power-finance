import { useMemo } from "react";
import { resolveLocale, useSettingsContext } from "@internal/shared";


const useLongDateLabel = (date: Date) => {
	const { locale } = useSettingsContext();

	return useMemo(() => {
		const safeLocale = resolveLocale(locale);
		const weekday = date.toLocaleDateString(safeLocale, { weekday: 'short' }).toUpperCase();
		const month = date.toLocaleDateString(safeLocale, { month: 'short' }).toUpperCase();
		return `${weekday} · ${month} ${date.getDate().toString()} · ${date.getFullYear().toString()}`;
	}, [date, locale]);
};

export { useLongDateLabel };
