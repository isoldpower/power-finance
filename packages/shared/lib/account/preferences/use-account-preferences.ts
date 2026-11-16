import { useCallback, useMemo, useState } from "react";

import { useSettingsContext } from "../../settings/index.ts";
import { updateUserPreferences } from "../auth-api/index.ts";
import { useAccountAuthClient } from "./use-account-auth-client.ts";

import type { UserPreferencesPatch } from "../types.ts";


interface UseAccountPreferencesReturn {
	selectLocale: (tag: string) => void;
	selectMainCurrency: (code: string) => void;
	isSaving: boolean;
}

const useAccountPreferences = (): UseAccountPreferencesReturn => {
	const { onUpdateField } = useSettingsContext();
	const client = useAccountAuthClient();
	const [pendingCount, setPendingCount] = useState(0);

	const persist = useCallback((patch: UserPreferencesPatch) => {
		setPendingCount((count) => count + 1);
		updateUserPreferences({ handler: client, patch })
			.catch(() => undefined)
			.finally(() => { setPendingCount((count) => count - 1); });
	}, [client]);

	const selectLocale = useCallback((tag: string) => {
		if (!tag) {
			return;
		}

		onUpdateField('locale', tag);
		persist({ locale: tag });
	}, [onUpdateField, persist]);

	const selectMainCurrency = useCallback((code: string) => {
		if (!code) {
			return;
		}

		onUpdateField('mainCurrency', code);
		persist({ mainCurrency: code });
	}, [onUpdateField, persist]);

	return useMemo(() => ({
		selectLocale,
		selectMainCurrency,
		isSaving: pendingCount > 0,
	}), [selectLocale, selectMainCurrency, pendingCount]);
};

export { useAccountPreferences };
export type { UseAccountPreferencesReturn };
