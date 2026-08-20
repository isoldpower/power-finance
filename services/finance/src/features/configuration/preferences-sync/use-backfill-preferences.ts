import { useEffect, useRef } from "react";
import { resolveTimezone, useSettingsContext } from "@internal/shared";
import { useCurrentUser, useUpdatePreferences } from "../data-presenters";

import type { UserPreferencesPatch } from "@entity/configuration";


const useBackfillPreferences = (): void => {
	const { profile, isSuccess } = useCurrentUser();
	const { locale, mainCurrency, timezone } = useSettingsContext();
	const { mutate } = useUpdatePreferences();
	const attemptedFor = useRef<string | null>(null);

	useEffect(() => {
		if (!isSuccess || !profile || attemptedFor.current === profile.identity.id) {
			return;
		}

		const missing: UserPreferencesPatch = {
			...(profile.preferences.locale === null
				? { locale }
				: {}),
			...(profile.preferences.mainCurrency === null
				? { mainCurrency }
				: {}),
			...(profile.preferences.timezone === null
				? { timezone: resolveTimezone(timezone) }
				: {}),
		};

		if (Object.keys(missing).length === 0) {
			return;
		}

		attemptedFor.current = profile.identity.id;
		mutate(missing);
	}, [isSuccess, profile, locale, mainCurrency, timezone, mutate]);
};

export { useBackfillPreferences };
