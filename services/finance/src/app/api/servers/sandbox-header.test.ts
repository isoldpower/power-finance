import { describe, expect, test } from 'vitest';
import { createAxiosInstance } from '@internal/shared';

import type { AxiosInstance, AxiosRequestConfig } from 'axios';


const noToken = (): Promise<string | null> => Promise.resolve(null);

const captureHeaders = async (
	instance: AxiosInstance,
	send: (client: AxiosInstance, options: AxiosRequestConfig) => Promise<{ config: AxiosRequestConfig }>
): Promise<Record<string, unknown>> => {
	const options: AxiosRequestConfig = {
		adapter: (config) => Promise.resolve({
			data: null,
			status: 200,
			statusText: 'OK',
			headers: {},
			config,
		}),
	};
	const response = await send(instance, options);

	return Object.assign({}, response.config.headers) as Record<string, unknown>;
};

describe('the sandbox header', () => {
	test('rides along on a GET', async () => {
		const instance = createAxiosInstance({ baseUrl: 'http://api.test', getToken: noToken, sandbox: 'nikita' });
		const headers = await captureHeaders(instance, (client, options) => client.get('/wallets', options));

		expect(headers['X-Sandbox']).toBe('nikita');
	});

	test('rides along on a POST as well', async () => {
		const instance = createAxiosInstance({ baseUrl: 'http://api.test', getToken: noToken, sandbox: 'nikita' });
		const headers = await captureHeaders(
			instance,
			(client, options) => client.post('/wallets/search', { filter_body: {} }, options)
		);

		expect(headers['X-Sandbox']).toBe('nikita');
	});

	test('is absent when the env leaves it unset', async () => {
		const instance = createAxiosInstance({ baseUrl: 'http://api.test', getToken: noToken });
		const headers = await captureHeaders(instance, (client, options) => client.get('/wallets', options));

		expect(headers['X-Sandbox']).toBeUndefined();
	});

	test('is absent when the env sets it empty', async () => {
		const instance = createAxiosInstance({ baseUrl: 'http://api.test', getToken: noToken, sandbox: '' });
		const headers = await captureHeaders(instance, (client, options) => client.get('/wallets', options));

		expect(headers['X-Sandbox']).toBeUndefined();
	});

	test('sits alongside the correlation id and the bearer token', async () => {
		const instance = createAxiosInstance({
			baseUrl: 'http://api.test',
			getToken: () => Promise.resolve('jwt-token'),
			sandbox: 'nikita',
		});
		const headers = await captureHeaders(instance, (client, options) => client.get('/wallets', options));

		expect(headers['X-Sandbox']).toBe('nikita');
		expect(headers.Authorization).toBe('Bearer jwt-token');
		expect(headers['X-Correlation-ID']).toEqual(expect.any(String));
	});
});
