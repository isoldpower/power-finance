import { resolveLocale, resolveTimezone, useSettingsContext } from "@internal/shared";
import { useCallback, useMemo } from "react";


type UseLocaleDateReturn = string;
type UseLocaleDateTransformReturn = ((date: string) => UseLocaleDateReturn);

const useLocaleDateTransform = (): UseLocaleDateTransformReturn => {
	const { locale, timezone } = useSettingsContext();

	return useCallback((date: string) => {
		const dateFormat = new Date(date);

		try {
			return new Intl.DateTimeFormat(resolveLocale(locale), {
				month: 'short',
				day: 'numeric',
				year: 'numeric',
				timeZone: resolveTimezone(timezone)
			}).format(dateFormat);
		} catch (e) {
			console.error(e);
			return dateFormat.toLocaleDateString();
		}
	}, [locale, timezone]);
}

const useLocaleDate = (date: string): UseLocaleDateReturn => {
	const transform = useLocaleDateTransform();

	return useMemo(() => {
		return transform(date);
	}, [transform, date]);
}


export { useLocaleDate, useLocaleDateTransform };