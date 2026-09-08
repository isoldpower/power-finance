export { AuthClerkRESTApiClient } from './clerk-server.ts';
export {
	CURRENCY_CLAIM,
	LANGUAGE_CLAIM,
	mergePreferences,
	readPreferences,
	TIMEZONE_CLAIM,
} from './metadata.ts';

export type { ClerkUserSource } from './clerk-server.ts';
export type { UnsafeMetadata } from './metadata.ts';
export type {
	IAuthRESTApiClient,
	PreferencesPatchRequest,
	PreferencesPatchResponse,
	SessionRequest,
	SessionResponse,
} from './types.ts';
