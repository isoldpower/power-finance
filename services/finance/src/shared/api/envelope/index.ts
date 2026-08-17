export { ApiError, ERROR_STATUS } from './errors.ts';
export { isApiError, isApiErrorEnvelope, apiErrorFromEnvelope } from './helpers.ts';

export type {
	ApiEnvelope,
	CacheMeta,
	CollectionMeta,
	CollectionResponse,
	EmbeddedMeta,
	MutationMeta,
	MutationResponse,
	PaginationMeta,
	ResourceResponse,
	ResourceTimestamps,
} from './envelope.ts';
export type {
	ApiDetailCode,
	ApiErrorBody,
	ApiErrorCode,
	ApiErrorDetail,
	ApiErrorEnvelope,
	ApiErrorMeta,
} from './errors.ts';
