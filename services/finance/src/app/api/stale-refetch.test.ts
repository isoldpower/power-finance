import { describe, expect, test } from 'vitest';

import { ApiError } from '@shared/api';
import { staleRefetchInterval, STALE_REFETCH_INTERVAL_MS } from './stale-refetch.ts';


describe('staleRefetchInterval', () => {
	test('keeps polling a search whose projection is behind', () => {
		const stale = new ApiError('internal_error', 'Read model has not caught up', { status: 507 });

		expect(staleRefetchInterval(stale)).toBe(STALE_REFETCH_INTERVAL_MS);
	});

	test('keeps polling a read that landed in a reroute hole', () => {
		const hole = new ApiError('not_found', 'Not Found', { status: 404, enveloped: false });

		expect(staleRefetchInterval(hole)).toBe(STALE_REFETCH_INTERVAL_MS);
	});

	test('stops once the query succeeds', () => {
		expect(staleRefetchInterval(null)).toBe(false);
	});

	test('does not poll a genuinely missing resource', () => {
		const missing = new ApiError('not_found', 'Wallet does not exist', { status: 404 });

		expect(staleRefetchInterval(missing)).toBe(false);
	});

	test('does not poll a validation failure', () => {
		const invalid = new ApiError('validation_failed', 'Bad filter', { status: 422 });

		expect(staleRefetchInterval(invalid)).toBe(false);
	});
});
