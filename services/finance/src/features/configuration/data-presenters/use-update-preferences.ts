import { useMutation, useQueryClient } from "@tanstack/react-query";
import { DERIVED_KEYS, useApiContext } from "@app/api";
import { updateUserPreferences } from "../auth-api";
import { CACHE_KEYS } from "./cache-config.ts";

import type { UserPreferences, UserPreferencesPatch } from "@entity/configuration";
import type { GetSessionResponse } from "../auth-api";


const patchedPreferences = (
	preferences: UserPreferences,
	patch: UserPreferencesPatch,
): UserPreferences => ({
	locale: patch.locale ?? preferences.locale,
	mainCurrency: patch.mainCurrency ?? preferences.mainCurrency,
	timezone: patch.timezone ?? preferences.timezone,
});

const useUpdatePreferences = () => {
	const apiContext = useApiContext();
	const queryClient = useQueryClient();
	const sessionKey = [CACHE_KEYS.session, apiContext.authServers.revision];

	return useMutation({
		mutationKey: [CACHE_KEYS.updatePreferences],
		mutationFn: (patch: UserPreferencesPatch) => updateUserPreferences({
			handler: apiContext.authServers.rest,
			patch,
		}),
		onMutate: async (patch: UserPreferencesPatch) => {
			await queryClient.cancelQueries({ queryKey: sessionKey });
			const previous = queryClient.getQueryData<GetSessionResponse>(sessionKey);

			if (previous?.profile) {
				queryClient.setQueryData<GetSessionResponse>(sessionKey, {
					...previous,
					profile: {
						...previous.profile,
						preferences: patchedPreferences(previous.profile.preferences, patch),
					},
				});
			}

			return { previous };
		},
		onError: (_error, _patch, context) => {
			if (context?.previous) {
				queryClient.setQueryData<GetSessionResponse>(sessionKey, context.previous);
			}
		},
		onSettled: () => {
			for (const key of DERIVED_KEYS.onPreferencesChange) {
				void queryClient.invalidateQueries({ queryKey: [key] });
			}
		},
	});
};

export { useUpdatePreferences };
