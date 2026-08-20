import type { types } from "@internal/shared";
import type { PreferencesPatchBody, UserPreferencesDto } from "../types.ts";


type UnsafeMetadata = types.UserResource['unsafeMetadata'];

const PREFERENCES_KEY = 'preferences';
const EMPTY_PREFERENCES: UserPreferencesDto = {
	locale: null,
	main_currency: null,
	timezone: null,
};

const readText = (value: unknown): string | null => {
	return typeof value === 'string' && value.trim() !== '' ? value : null;
};

const readPreferences = (metadata: UnsafeMetadata | null): UserPreferencesDto => {
	const scope: unknown = metadata?.[PREFERENCES_KEY];

	if (typeof scope !== 'object' || scope === null) {
		return EMPTY_PREFERENCES;
	}

	const record = scope as Record<string, unknown>;

	return {
		locale: readText(record.locale),
		main_currency: readText(record.main_currency),
		timezone: readText(record.timezone),
	};
};

const mergePreferences = (
	metadata: UnsafeMetadata | null,
	patch: PreferencesPatchBody,
): UnsafeMetadata => {
	const current = readPreferences(metadata);

	return {
		...(metadata ?? {}),
		[PREFERENCES_KEY]: {
			locale: patch.locale ?? current.locale,
			main_currency: patch.main_currency ?? current.main_currency,
			timezone: patch.timezone ?? current.timezone,
		},
	};
};

export { mergePreferences, PREFERENCES_KEY, readPreferences };
export type { UnsafeMetadata };
