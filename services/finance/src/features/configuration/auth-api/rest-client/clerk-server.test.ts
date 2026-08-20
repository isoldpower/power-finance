import { describe, test, expect, vi } from 'vitest';

import { isApiError } from '@shared/api';
import { AuthClerkRESTApiClient } from './clerk-server.ts';

import type { types } from '@internal/shared';
import type { UnsafeMetadata } from './metadata.ts';

interface FakeUserOptions {
	unsafeMetadata?: UnsafeMetadata;
	update?: types.UserResource['update'];
	reload?: types.UserResource['reload'];
}

const fakeUser = (options: FakeUserOptions = {}): types.UserResource => {
	const user = {
		id: 'user_1',
		firstName: 'Ada',
		lastName: 'Lovelace',
		fullName: 'Ada Lovelace',
		imageUrl: 'https://img.clerk.com/ada',
		primaryEmailAddress: { emailAddress: 'ada@example.com' },
		createdAt: new Date('2026-01-01T00:00:00.000Z'),
		updatedAt: new Date('2026-02-01T00:00:00.000Z'),
		unsafeMetadata: options.unsafeMetadata ?? {},
		update: options.update ?? vi.fn(),
		reload: options.reload ?? vi.fn(),
	};

	return user as unknown as types.UserResource;
};

const withPreferences = (metadata: UnsafeMetadata) => {
	return new AuthClerkRESTApiClient(() => fakeUser({ unsafeMetadata: metadata }));
};

describe('AuthClerkRESTApiClient', () => {
	test('reads the preferences stored in unsafe metadata', async () => {
		const client = withPreferences({ preferences: { locale: 'fr-FR', main_currency: 'EUR' } });

		const session = await client.session({});

		expect(session.data.authenticated).toBe(true);
		expect(session.data.user?.preferences).toEqual({ locale: 'fr-FR', main_currency: 'EUR', timezone: null });
		expect(session.data.user?.email).toBe('ada@example.com');
	});

	test('reports unset preferences instead of inventing defaults', async () => {
		const missing = await withPreferences({}).session({});
		const malformed = await withPreferences({ preferences: 'en-US' }).session({});
		const blank = await withPreferences({ preferences: { locale: '   ', main_currency: 7 } }).session({});

		expect(missing.data.user?.preferences).toEqual({ locale: null, main_currency: null, timezone: null });
		expect(malformed.data.user?.preferences).toEqual({ locale: null, main_currency: null, timezone: null });
		expect(blank.data.user?.preferences).toEqual({ locale: null, main_currency: null, timezone: null });
	});

	test('survives a user whose metadata is null', async () => {
		const update = vi.fn();
		const user = fakeUser({
			unsafeMetadata: null as unknown as UnsafeMetadata,
			update: update as types.UserResource['update'],
		});
		update.mockImplementation((params: { unsafeMetadata: UnsafeMetadata }) => {
			return Promise.resolve(fakeUser({ unsafeMetadata: params.unsafeMetadata }));
		});
		const client = new AuthClerkRESTApiClient(() => user);

		const session = await client.session({});
		const written = await client.patchPreferences({ data: { locale: 'en-GB' } });

		expect(session.data.user?.preferences).toEqual({ locale: null, main_currency: null, timezone: null });
		expect(written.data.preferences).toEqual({ locale: 'en-GB', main_currency: null, timezone: null });
	});

	test('reports an anonymous session when no user is signed in', async () => {
		const client = new AuthClerkRESTApiClient(() => null);

		const session = await client.session({});

		expect(session.data).toEqual({ authenticated: false, user: null });
	});

	test('reloads the resource only when the request asks for it', async () => {
		const reload = vi.fn();
		const user = fakeUser({ unsafeMetadata: {} });
		const reloading = fakeUser({ reload: reload.mockResolvedValue(user) as types.UserResource['reload'] });
		const client = new AuthClerkRESTApiClient(() => reloading);

		await client.session({});
		expect(reload).not.toHaveBeenCalled();

		await client.session({ reload: true });
		expect(reload).toHaveBeenCalledTimes(1);
	});

	test('merges a partial patch into the preferences already stored', async () => {
		const update = vi.fn();
		const user = fakeUser({
			unsafeMetadata: { theme: 'dark', preferences: { locale: 'fr-FR', main_currency: 'EUR', timezone: 'Europe/Paris' } },
			update: update as types.UserResource['update'],
		});
		update.mockImplementation((params: { unsafeMetadata: UnsafeMetadata }) => {
			return Promise.resolve(fakeUser({ unsafeMetadata: params.unsafeMetadata }));
		});
		const client = new AuthClerkRESTApiClient(() => user);

		const updated = await client.patchPreferences({ data: { main_currency: 'GBP' } });

		expect(update).toHaveBeenCalledWith({
			unsafeMetadata: { theme: 'dark', preferences: { locale: 'fr-FR', main_currency: 'GBP', timezone: 'Europe/Paris' } },
		});
		expect(updated.data.preferences).toEqual({ locale: 'fr-FR', main_currency: 'GBP', timezone: 'Europe/Paris' });
	});

	test('refuses to write preferences without a signed in user', async () => {
		const client = new AuthClerkRESTApiClient(() => null);

		await expect(client.patchPreferences({ data: { locale: 'en-GB' } })).rejects.toSatisfy(
			(error: unknown) => isApiError(error) && error.code === 'unauthorized',
		);
	});

	test('surfaces a clerk rejection as an api error', async () => {
		const update = vi.fn().mockRejectedValue(new Error('Clerk is unreachable'));
		const client = new AuthClerkRESTApiClient(() => fakeUser({
			update: update as types.UserResource['update'],
		}));

		await expect(client.patchPreferences({ data: { locale: 'en-GB' } })).rejects.toSatisfy(
			(error: unknown) => isApiError(error) && error.code === 'internal_error',
		);
	});
});
