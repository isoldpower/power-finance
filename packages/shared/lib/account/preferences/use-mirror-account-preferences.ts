import { useEffect, useRef } from "react";

import { useSettingsContext } from "../../settings/index.ts";
import { useAccountProfile } from "./use-account-profile.ts";

import type { SettingsState } from "../../settings/index.ts";


const useMirrorAccountPreferences = (): void => {
	const { profile } = useAccountProfile();
	const { onUpdate } = useSettingsContext();
	const mirroredSignature = useRef<string | null>(null);
	const preferences = profile?.preferences;

	useEffect(() => {
		if (!preferences) {
			return;
		}

		const signature = [preferences.locale, preferences.mainCurrency, preferences.timezone].join('|');

		if (mirroredSignature.current === signature) {
			return;
		}

		mirroredSignature.current = signature;

		const mirrored: Partial<SettingsState> = {
			...(preferences.locale === null ? {} : { locale: preferences.locale }),
			...(preferences.mainCurrency === null ? {} : { mainCurrency: preferences.mainCurrency }),
			...(preferences.timezone === null ? {} : { timezone: preferences.timezone }),
		};

		if (Object.keys(mirrored).length > 0) {
			onUpdate(mirrored);
		}
	}, [preferences, onUpdate]);
};

export { useMirrorAccountPreferences };
