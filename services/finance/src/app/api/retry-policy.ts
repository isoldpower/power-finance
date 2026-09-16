import { isApiError, isQuotaExhausted, STALE_READ_STATUS } from "@shared/api";

import type { ApiError } from "@shared/api";


const MAX_TRANSIENT_RETRIES = 6;
const MAX_SERVER_RETRIES = 2;

const BASE_RETRY_DELAY_MS = 400;
const MAX_RETRY_DELAY_MS = 8000;
const MILLISECONDS_IN_SECOND = 1000;

const RATE_LIMITED_STATUS = 429;
const NOT_FOUND_STATUS = 404;
const SERVER_ERROR_STATUS = 500;

function isStaleProjection(error: ApiError): boolean {
	return error.status === STALE_READ_STATUS;
}

function isRerouteHole(error: ApiError): boolean {
	return error.status === NOT_FOUND_STATUS && !error.enveloped;
}

function isRateLimited(error: ApiError): boolean {
	return error.status === RATE_LIMITED_STATUS;
}

function retryQuery(failureCount: number, error: Error): boolean {
	if (!isApiError(error)) {
		return failureCount < MAX_SERVER_RETRIES;
	}

	if (isQuotaExhausted(error)) {
		return false;
	}

	if (isStaleProjection(error) || isRerouteHole(error) || isRateLimited(error)) {
		return failureCount < MAX_TRANSIENT_RETRIES;
	}

	return error.status >= SERVER_ERROR_STATUS && failureCount < MAX_SERVER_RETRIES;
}

function retryDelay(failureCount: number, error: Error): number {
	if (isApiError(error) && error.retryAfterSeconds !== null) {
		return error.retryAfterSeconds * MILLISECONDS_IN_SECOND;
	}

	return Math.min(BASE_RETRY_DELAY_MS * 2 ** failureCount, MAX_RETRY_DELAY_MS);
}

export { isRerouteHole, isStaleProjection, retryDelay, retryQuery };
