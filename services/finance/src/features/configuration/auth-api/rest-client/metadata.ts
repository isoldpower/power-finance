import type { types } from "@internal/shared";
import type { PreferencesPatchBody, UserPreferencesDto } from "../types.ts";


type UnsafeMetadata = types.UserResource['unsafeMetadata'];

const CURRENCY_CLAIM = 'currency';
const TIMEZONE_CLAIM = 'timezone';
const LANGUAGE_CLAIM = 'language';

const LEGACY_SCOPE = 'preferences';

const EMPTY_PREFERENCES: UserPreferencesDto = {
	locale: null,
	main_currency: null,
	timezone: null,
};

const readText = (value: unknown): string | null => {
	return typeof value === 'string' && value.trim() !== '' ? value : null;
};

const asRecord = (value: unknown): Record<string, unknown> | null => {
	return typeof value === 'object' && value !== null ? value as Record<string, unknown> : null;
};

const readLegacyPreferences = (metadata: UnsafeMetadata | null): UserPreferencesDto => {
	const scope = asRecord(metadata?.[LEGACY_SCOPE]);

	if (!scope) {
		return EMPTY_PREFERENCES;
	}

	return {
		locale: readText(scope.locale),
		main_currency: readText(scope.main_currency),
		timezone: readText(scope.timezone),
	};
};

const readPreferences = (metadata: UnsafeMetadata | null): UserPreferencesDto => {
	const claims = asRecord(metadata);
	const legacy = readLegacyPreferences(metadata);

	return {
		locale: readText(claims?.[LANGUAGE_CLAIM]) ?? legacy.locale,
		main_currency: readText(claims?.[CURRENCY_CLAIM]) ?? legacy.main_currency,
		timezone: readText(claims?.[TIMEZONE_CLAIM]) ?? legacy.timezone,
	};
};

const mergePreferences = (
	metadata: UnsafeMetadata | null,
	patch: PreferencesPatchBody,
): UnsafeMetadata => {
	const current = readPreferences(metadata);
	const { [LEGACY_SCOPE]: _legacy, ...rest } = metadata ?? {};

	return {
		...rest,
		[LANGUAGE_CLAIM]: patch.locale ?? current.locale,
		[CURRENCY_CLAIM]: patch.main_currency ?? current.main_currency,
		[TIMEZONE_CLAIM]: patch.timezone ?? current.timezone,
	};
};

export {
	CURRENCY_CLAIM,
	LANGUAGE_CLAIM,
	mergePreferences,
	readPreferences,
	TIMEZONE_CLAIM,
};
export type { UnsafeMetadata };
