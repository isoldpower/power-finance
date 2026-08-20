import { useEffect } from "react";
import { useSettingsContext } from "@internal/shared";
import { useUserPreferences } from "../data-presenters";

import type { SettingsState } from "@internal/shared";


const useMirrorPreferences = (): void => {
	const { preferences } = useUserPreferences();
	const { locale, mainCurrency, timezone, onUpdate } = useSettingsContext();

	useEffect(() => {
		const mirrored: Partial<SettingsState> = {
			...(preferences.locale === null || preferences.locale === locale
				? {}
				: { locale: preferences.locale }),
			...(preferences.mainCurrency === null || preferences.mainCurrency === mainCurrency
				? {}
				: { mainCurrency: preferences.mainCurrency }),
			...(preferences.timezone === null || preferences.timezone === timezone
				? {}
				: { timezone: preferences.timezone }),
		};

		if (Object.keys(mirrored).length > 0) {
			onUpdate(mirrored);
		}
	}, [preferences, locale, mainCurrency, timezone, onUpdate]);
};

export { useMirrorPreferences };
