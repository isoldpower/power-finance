import { useEffect } from 'react';
import { afterEach, describe, expect, test } from 'vitest';
import { cleanup, render, waitFor } from '@testing-library/react';
import { SettingsProvider, useSettingsContext } from '@internal/shared';

import type { SettingsState } from '@internal/shared';


const SETTINGS_STORAGE_KEY = 'app-settings';

function readStoredSettings(): Partial<SettingsState> {
	return JSON.parse(window.localStorage.getItem(SETTINGS_STORAGE_KEY) ?? '{}') as Partial<SettingsState>;
}

function UpdateOnMount({ update }: { update: Partial<SettingsState> }) {
	const { onUpdate } = useSettingsContext();

	useEffect(() => {
		onUpdate(update);
	}, [onUpdate, update]);

	return null;
}

describe('settings persistence across providers', () => {
	afterEach(() => {
		cleanup();
		window.localStorage.clear();
	});

	test('an update on mount keeps the theme another app already saved', async () => {
		window.localStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify({ theme: 'dark', locale: 'en-US' }));

		render(
			<SettingsProvider>
				<UpdateOnMount update={{ locale: 'de-DE' }} />
			</SettingsProvider>
		);

		await waitFor(() => {
			expect(readStoredSettings().locale).toBe('de-DE');
		});
		expect(readStoredSettings().theme).toBe('dark');
	});

	test('an update merges with a value another provider stored after this one mounted', async () => {
		function DeferredUpdate() {
			const { onUpdate } = useSettingsContext();

			useEffect(() => {
				window.localStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify({ theme: 'dark' }));
				onUpdate({ mainCurrency: 'EUR' });
			}, [onUpdate]);

			return null;
		}

		render(
			<SettingsProvider>
				<DeferredUpdate />
			</SettingsProvider>
		);

		await waitFor(() => {
			expect(readStoredSettings().mainCurrency).toBe('EUR');
		});
		expect(readStoredSettings().theme).toBe('dark');
	});
});
