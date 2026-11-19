export { ApiError, FALLBACK_STATUS, STALE_READ_STATUS, statusForCode } from './errors.ts';
export { isApiError, isApiErrorEnvelope, isQuotaExhausted, apiErrorFromEnvelope } from './helpers.ts';

export type {
	ApiEnvelope,
	CollectionResponse,
	MutationResponse,
	ResourceResponse,
	ResourceTimestamps,
} from './envelope.ts';
export type {
	CacheMeta,
	CollectionMeta,
	EmbeddedMeta,
	MutationMeta,
	PaginationMeta,
} from './meta.ts';
export type {
	ApiDetailCode,
	ApiErrorBody,
	ApiErrorCode,
	ApiErrorDetail,
	ApiErrorEnvelope,
	ApiErrorMeta,
	ApiErrorOptions,
	KnownApiDetailCode,
	KnownApiErrorCode,
} from './errors.ts';
