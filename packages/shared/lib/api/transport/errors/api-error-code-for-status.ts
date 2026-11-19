import type { ApiErrorCode } from "../../envelope";


const API_ERROR_CODE_BY_STATUS: Record<number, ApiErrorCode> = {
	400: 'bad_request',
	401: 'unauthorized',
	403: 'forbidden',
	404: 'not_found',
	409: 'conflict',
	422: 'validation_failed',
	429: 'rate_limited',
	503: 'service_unavailable',
};

const FALLBACK_API_ERROR_CODE: ApiErrorCode = 'internal_error';

function apiErrorCodeForStatus(responseStatus: number): ApiErrorCode {
	return API_ERROR_CODE_BY_STATUS[responseStatus] ?? FALLBACK_API_ERROR_CODE;
}

export { apiErrorCodeForStatus, FALLBACK_API_ERROR_CODE };
