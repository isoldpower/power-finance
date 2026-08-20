export { AuthClerkRESTApiClient } from './clerk-server.ts';
export { mergePreferences, PREFERENCES_KEY, readPreferences } from './metadata.ts';

export type { ClerkUserSource } from './clerk-server.ts';
export type { UnsafeMetadata } from './metadata.ts';
export type {
	IAuthRESTApiClient,
	PreferencesPatchRequest,
	PreferencesPatchResponse,
	SessionRequest,
	SessionResponse,
} from './types.ts';
