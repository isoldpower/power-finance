import { describe, expect, test } from 'vitest';

import { ApiError } from '@shared/api';
import { retryDelay, retryQuery } from './retry-policy.ts';


describe('retryQuery', () => {
	test('retries the reroute hole that answers 404 without an envelope', () => {
		const hole = new ApiError('not_found', 'Not Found', { status: 404, enveloped: false });

		expect(retryQuery(0, hole)).toBe(true);
		expect(retryQuery(5, hole)).toBe(true);
		expect(retryQuery(6, hole)).toBe(false);
	});

	test('does not retry a genuinely missing resource', () => {
		const missing = new ApiError('not_found', 'Wallet does not exist', { status: 404 });

		expect(retryQuery(0, missing)).toBe(false);
	});

	test('retries a search whose projection has not caught up', () => {
		const stale = new ApiError('internal_error', 'Read model has not caught up', { status: 507 });

		expect(retryQuery(0, stale)).toBe(true);
	});

	test('retries a rate limited request', () => {
		const limited = new ApiError('rate_limited', 'Too many requests', { status: 429 });

		expect(retryQuery(0, limited)).toBe(true);
	});

	test('does not retry an ordinary client error', () => {
		const invalid = new ApiError('validation_failed', 'Bad field', { status: 422 });

		expect(retryQuery(0, invalid)).toBe(false);
	});

	test('retries a dependency outage a couple of times', () => {
		const unavailable = new ApiError('service_unavailable', 'Dependency down', { status: 503 });

		expect(retryQuery(1, unavailable)).toBe(true);
		expect(retryQuery(2, unavailable)).toBe(false);
	});
});

describe('retryDelay', () => {
	test('never retries a spent assistant quota, though it maps to 429', () => {
		const error = new ApiError('assistant_quota_exhausted', 'No messages left', { enveloped: true });

		expect(error.status).toBe(429);
		expect(retryQuery(0, error)).toBe(false);
	});

	test('honours Retry-After when the gateway sends one', () => {
		const limited = new ApiError('rate_limited', 'Too many requests', {
			status: 429,
			retryAfterSeconds: 12,
		});

		expect(retryDelay(0, limited)).toBe(12000);
	});

	test('backs off exponentially up to a ceiling', () => {
		const stale = new ApiError('internal_error', 'Read model has not caught up', { status: 507 });

		expect(retryDelay(0, stale)).toBe(400);
		expect(retryDelay(2, stale)).toBe(1600);
		expect(retryDelay(10, stale)).toBe(8000);
	});
});
