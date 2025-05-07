import { describe, test, expect, vi, Mock, beforeEach } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useLocaleDate, useLocaleDateTransform } from './useLocaleDate';
import { useSettingsContext } from '@internal/shared';

// Mock the useSettingsContext hook to control its return value
const mockedUseSettingsContext = useSettingsContext as unknown as Mock;
vi.mock('@internal/shared', async () => {
	const actual = await vi.importActual<object>('@internal/shared');
	return {
		...actual,
		useSettingsContext: vi.fn(),
	};
});

describe('useLocaleDate', () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	test('formats date correctly for en-US', () => {
		mockedUseSettingsContext.mockReturnValue({ locale: 'en-US' });

		const { result } = renderHook(() => useLocaleDate('2023-10-15'));
		expect(result.current).toBe('Oct 15, 2023');
	});

	test('formats date correctly for de-DE', () => {
		mockedUseSettingsContext.mockReturnValue({ locale: 'de-DE' });

		const { result } = renderHook(() => useLocaleDate('2023-12-01'));
		expect(result.current).toBe('1. Dez. 2023');
	});

	test('returns "Invalid Date" for invalid input', () => {
		mockedUseSettingsContext.mockReturnValue({ locale: 'en-US' });

		const { result } = renderHook(() => useLocaleDate('not-a-date'));
		expect(result.current).toBe('Invalid Date');
	});

	test('handles unknown locale gracefully', () => {
		mockedUseSettingsContext.mockReturnValue({ locale: 'xx-XX' });

		const { result } = renderHook(() => useLocaleDate('2023-05-01'));
		// Check it's a formatted date, not an exception
		expect(typeof result.current).toBe('string');
		expect(result.current).toContain('2023');
	});
});

describe('useLocaleDateTransform', () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	test('formats dynamic date correctly with ja-JP locale', () => {
		mockedUseSettingsContext.mockReturnValue({ locale: 'ja-JP' });

		const { result } = renderHook(() => useLocaleDateTransform());
		const formatted = result.current('2024-04-01');
		expect(typeof formatted).toBe('string');
		expect(formatted).toContain('2024');
	});

	test('returns "Invalid Date" from callback with bad input', () => {
		mockedUseSettingsContext.mockReturnValue({ locale: 'en-US' });

		const { result } = renderHook(() => useLocaleDateTransform());
		const formatted = result.current('hello-world');
		expect(formatted).toBe('Invalid Date');
	});
});
