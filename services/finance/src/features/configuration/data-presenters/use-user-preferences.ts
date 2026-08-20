import { useMemo } from "react";
import { useCurrentUser } from "./use-current-user.ts";

import type { UserPreferences } from "@entity/configuration";


interface UseUserPreferencesReturn {
	preferences: UserPreferences;
	isPending: boolean;
	isError: boolean;
}

const UNSET_PREFERENCES: UserPreferences = {
	locale: null,
	mainCurrency: null,
	timezone: null,
};

const useUserPreferences = (): UseUserPreferencesReturn => {
	const { profile, isPending, isError } = useCurrentUser();

	return useMemo(() => ({
		preferences: profile?.preferences ?? UNSET_PREFERENCES,
		isPending,
		isError,
	}), [profile, isPending, isError]);
};

export { useUserPreferences };
export type { UseUserPreferencesReturn };
