import { useMemo } from "react";
import { useSettingsContext } from "@internal/shared";


const useLongDateLabel = () => {
	const { locale } = useSettingsContext();

	return useMemo(() => {
		const now = new Date();
		const weekday = now.toLocaleDateString(locale, { weekday: 'short' }).toUpperCase();
		const month = now.toLocaleDateString(locale, { month: 'short' }).toUpperCase();
		return `${weekday} · ${month} ${now.getDate().toString()} · ${now.getFullYear().toString()}`;
	}, [locale]);
};

export { useLongDateLabel };
