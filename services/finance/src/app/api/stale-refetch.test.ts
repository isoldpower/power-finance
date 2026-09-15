import { describe, expect, test } from 'vitest';

import { ApiError } from '@shared/api';
import {
	hasStaleRecovery,
	staleRefetchInterval,
	MAX_STALE_REFETCHES,
	STALE_REFETCH_INTERVAL_MS,
} from './stale-refetch.ts';


const staleError = (): ApiError =>
	new ApiError('internal_error', 'Read model has not caught up', { status: 507 });

const holeError = (): ApiError =>
	new ApiError('not_found', 'Not Found', { status: 404, enveloped: false });

describe('staleRefetchInterval', () => {
	test('keeps polling a read whose projection is behind', () => {
		expect(staleRefetchInterval(staleError(), 1)).toBe(STALE_REFETCH_INTERVAL_MS);
	});

	test('keeps polling a read that landed in a reroute hole', () => {
		expect(staleRefetchInterval(holeError(), 1)).toBe(STALE_REFETCH_INTERVAL_MS);
	});

	test('stops once the query succeeds', () => {
		expect(staleRefetchInterval(null, 0)).toBe(false);
	});

	test('does not poll a genuinely missing resource', () => {
		const missing = new ApiError('not_found', 'Wallet does not exist', { status: 404 });

		expect(staleRefetchInterval(missing, 1)).toBe(false);
	});

	test('does not poll a validation failure', () => {
		const invalid = new ApiError('validation_failed', 'Bad filter', { status: 422 });

		expect(staleRefetchInterval(invalid, 1)).toBe(false);
	});

	test('gives up once the projection has stayed behind for the whole budget', () => {
		expect(staleRefetchInterval(staleError(), MAX_STALE_REFETCHES)).toBe(false);
	});
});

describe('hasStaleRecovery', () => {
	test('reports recovery while attempts remain', () => {
		expect(hasStaleRecovery(staleError(), MAX_STALE_REFETCHES - 1)).toBe(true);
	});

	test('reports no recovery on the final attempt', () => {
		expect(hasStaleRecovery(staleError(), MAX_STALE_REFETCHES)).toBe(false);
	});

	test('reports no recovery for an error that never self-heals', () => {
		const invalid = new ApiError('validation_failed', 'Bad filter', { status: 422 });

		expect(hasStaleRecovery(invalid, 0)).toBe(false);
	});
});
