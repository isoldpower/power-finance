import { describe, test, expect, vi, Mock, beforeEach } from 'vitest';
import { renderHook } from '@testing-library/react';

import { useSettingsContext } from '@internal/shared';
import { useCurrentUser, useUpdatePreferences } from '../data-presenters';
import { useBackfillPreferences } from './use-backfill-preferences.ts';

import type { UserPreferences, UserProfile } from '@entity/configuration';

vi.mock('@internal/shared', async (importOriginal) => ({
	...await importOriginal<object>(),
	useSettingsContext: vi.fn(),
}));

vi.mock('../data-presenters', () => ({
	useCurrentUser: vi.fn(),
	useUpdatePreferences: vi.fn(),
}));

const mockedUseSettingsContext = useSettingsContext as unknown as Mock;
const mockedUseCurrentUser = useCurrentUser as unknown as Mock;
const mockedUseUpdatePreferences = useUpdatePreferences as unknown as Mock;

const mutate = vi.fn();

const profileWith = (preferences: UserPreferences): UserProfile => ({
	identity: {
		id: 'user_1',
		firstName: 'Ada',
		lastName: 'Lovelace',
		fullName: 'Ada Lovelace',
		email: 'ada@example.com',
		imageUrl: 'https://img.clerk.com/ada',
		createdAt: null,
		updatedAt: null,
	},
	preferences,
});

const signedInWith = (preferences: UserPreferences) => {
	mockedUseCurrentUser.mockReturnValue({ profile: profileWith(preferences), isSuccess: true });
};

beforeEach(() => {
	vi.clearAllMocks();
	mockedUseSettingsContext.mockReturnValue({ locale: 'de-DE', mainCurrency: 'EUR', timezone: 'Europe/Berlin' });
	mockedUseUpdatePreferences.mockReturnValue({ mutate });
});

describe('useBackfillPreferences', () => {
	test('writes the stored values when the metadata holds no preferences', () => {
		signedInWith({ locale: null, mainCurrency: null, timezone: null });

		renderHook(() => { useBackfillPreferences(); });

		expect(mutate).toHaveBeenCalledWith({ locale: 'de-DE', mainCurrency: 'EUR', timezone: 'Europe/Berlin' });
	});

	test('writes only the field that is missing', () => {
		signedInWith({ locale: 'fr-FR', mainCurrency: null, timezone: 'Europe/Paris' });

		renderHook(() => { useBackfillPreferences(); });

		expect(mutate).toHaveBeenCalledWith({ mainCurrency: 'EUR' });
	});

	test('leaves a fully populated metadata alone', () => {
		signedInWith({ locale: 'fr-FR', mainCurrency: 'GBP', timezone: 'Europe/Paris' });

		renderHook(() => { useBackfillPreferences(); });

		expect(mutate).not.toHaveBeenCalled();
	});

	test('waits for the session before writing anything', () => {
		mockedUseCurrentUser.mockReturnValue({ profile: null, isSuccess: false });

		renderHook(() => { useBackfillPreferences(); });

		expect(mutate).not.toHaveBeenCalled();
	});

	test('leaves an anonymous session alone', () => {
		mockedUseCurrentUser.mockReturnValue({ profile: null, isSuccess: true });

		renderHook(() => { useBackfillPreferences(); });

		expect(mutate).not.toHaveBeenCalled();
	});

	test('backfills a user once even when the write does not land', () => {
		signedInWith({ locale: null, mainCurrency: null, timezone: null });

		const { rerender } = renderHook(() => { useBackfillPreferences(); });
		rerender();
		rerender();

		expect(mutate).toHaveBeenCalledTimes(1);
	});
});
