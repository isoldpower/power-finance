import { describe, test, expect, vi, Mock, beforeEach } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useLocaleCurrency } from './useLocaleCurrency';
import { useSettingsContext } from '@internal/shared';

// Mock the useSettingsContext to provide specific locale values
const mockedUseSettingsContext = useSettingsContext as unknown as Mock;
vi.mock('@internal/shared', async () => {
	const actual = await vi.importActual<object>('@internal/shared');
	return {
		...actual,
		useSettingsContext: vi.fn(),
	};
});

describe('useLocaleCurrency', () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	test('formats currency correctly for en-US', () => {
		mockedUseSettingsContext.mockReturnValue({ locale: 'en-US' });

		const { result } = renderHook(() => useLocaleCurrency());

		const format = result.current;
		const formatted = format(1234.56, 'USD');

		expect(formatted).toBe('$1,234.56');
	});

	test('formats currency correctly for de-DE', () => {
		mockedUseSettingsContext.mockReturnValue({ locale: 'de-DE' });

		const { result } = renderHook(() => useLocaleCurrency());

		const format = result.current;
		const formatted = format(1234.56, 'EUR');

		expect(formatted).toBe('1.234,56 €');
	});

	test('formats currency correctly for ja-JP with JPY', () => {
		mockedUseSettingsContext.mockReturnValue({ locale: 'ja-JP' });

		const { result } = renderHook(() => useLocaleCurrency());

		const format = result.current;
		const formatted = format(1234, 'JPY');

		expect(formatted).toBe('￥1,234');
	});

	test('formats negative currency values correctly (en-US)', () => {
		mockedUseSettingsContext.mockReturnValue({ locale: 'en-US' });

		const { result } = renderHook(() => useLocaleCurrency());
		const formatted = result.current(-1500.75, 'USD');

		expect(formatted).toBe('-$1,500.75');
	});

	test('formats zero correctly (en-US)', () => {
		mockedUseSettingsContext.mockReturnValue({ locale: 'en-US' });

		const { result } = renderHook(() => useLocaleCurrency());
		const formatted = result.current(0, 'USD');

		expect(formatted).toBe('$0.00');
	});

	test('falls back gracefully for unknown/invalid locale', () => {
		mockedUseSettingsContext.mockReturnValue({ locale: 'INVALID' });

		const { result } = renderHook(() => useLocaleCurrency());
		const formatted = result.current(1000, 'USD');

		expect(typeof formatted).toBe('string');
		expect(formatted).toContain('$');
		expect(formatted).toContain('1,000');
	});
});
