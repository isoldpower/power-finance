import { describe, expect, test } from 'vitest';
import axios from 'axios';

import { serializeParams } from './query.ts';


const RESOURCE_BASE = 'http://localhost:8080/api/v1/notifications';

const uriFor = (config: { url: string; params?: Record<string, unknown> }): string => {
	return axios
		.create({ baseURL: RESOURCE_BASE })
		.getUri({ ...config, paramsSerializer: { serialize: serializeParams } });
};

describe('resource request urls', () => {
	test('a filtered collection keeps no slash before the query', () => {
		expect(uriFor({ url: '', params: { limit: 8 } }))
			.toBe('http://localhost:8080/api/v1/notifications?limit=8');
	});

	test('an unfiltered collection stays on the bare resource path', () => {
		expect(uriFor({ url: '' })).toBe(RESOURCE_BASE);
	});

	test('a sub-resource keeps its own segment', () => {
		expect(uriFor({ url: '/count' }))
			.toBe('http://localhost:8080/api/v1/notifications/count');
	});

	test('a filtered sub-resource carries both segment and query', () => {
		expect(uriFor({ url: '/abc', params: { limit: 8 } }))
			.toBe('http://localhost:8080/api/v1/notifications/abc?limit=8');
	});
});

describe('serializeParams', () => {
	test('joins arrays with a comma rather than repeating the key', () => {
		expect(serializeParams({ target: ['RUB', 'EUR'] })).toBe('target=RUB%2CEUR');
	});

	test('drops absent values instead of sending empty ones', () => {
		expect(serializeParams({ limit: 8, cursor: undefined, severity: null })).toBe('limit=8');
	});

	test('drops an empty array rather than sending a blank key', () => {
		expect(serializeParams({ target: [] })).toBe('');
	});

	test('keeps a false boolean, which a metrics selector relies on', () => {
		expect(serializeParams({ 'net-worth': false })).toBe('net-worth=false');
	});
});
