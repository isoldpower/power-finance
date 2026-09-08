import { describe, expect, test } from 'vitest';

import { toApiError } from '@shared/api';
import { retryDelay, retryQuery } from './retry-policy.ts';

const MAX_TRANSIENT_ATTEMPTS = 6;


const STALE_SEARCH_BODY = {
	error: {
		code: 'internal_error',
		message: 'Read model has not caught up to the required write version.',
	},
	meta: { request_id: 'req-1', timestamp: '2026-09-08T03:28:25+00:00' },
};

const axiosLikeError = (status: number, data: unknown, headers: Record<string, string> = {}) => ({
	message: `Request failed with status code ${status.toString()}`,
	response: { status, data, headers },
});

describe('a 507 from /search', () => {
	test('keeps the real status even though the envelope says internal_error', () => {
		const error = toApiError(axiosLikeError(507, STALE_SEARCH_BODY));

		expect(error.status).toBe(507);
		expect(error.code).toBe('internal_error');
	});

	test('is retried rather than surfaced', () => {
		const error = toApiError(axiosLikeError(507, STALE_SEARCH_BODY));

		expect(retryQuery(0, error)).toBe(true);
		expect(retryQuery(5, error)).toBe(true);
	});

	test('gives up only after the transient budget', () => {
		const error = toApiError(axiosLikeError(507, STALE_SEARCH_BODY));

		expect(retryQuery(6, error)).toBe(false);
	});

	test('covers a projection that lags for tens of seconds', () => {
		const error = toApiError(axiosLikeError(507, STALE_SEARCH_BODY));
		const budget = Array.from({ length: MAX_TRANSIENT_ATTEMPTS }, (_, attempt) => (
			retryDelay(attempt, error)
		)).reduce((total, delay) => total + delay, 0);

		expect(budget).toBeGreaterThan(20000);
	});

	test('is not confused with a genuine internal error on 500', () => {
		const crash = toApiError(axiosLikeError(500, {
			error: { code: 'internal_error', message: 'boom' },
			meta: {},
		}));

		expect(crash.status).toBe(500);
		expect(retryQuery(2, crash)).toBe(false);
	});
});
