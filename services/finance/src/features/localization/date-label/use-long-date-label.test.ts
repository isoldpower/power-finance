import { describe, test, expect, vi, Mock, beforeEach } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useLongDateLabel } from './use-long-date-label';
import { useSettingsContext } from '@internal/shared';

const mockedUseSettingsContext = useSettingsContext as unknown as Mock;
vi.mock('@internal/shared', async () => {
	const actual = await vi.importActual<object>('@internal/shared');
	return {
		...actual,
		useSettingsContext: vi.fn(),
	};
});

describe('useLongDateLabel', () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	test('formats the label for en-US', () => {
		mockedUseSettingsContext.mockReturnValue({ locale: 'en-US' });

		const { result } = renderHook(() => useLongDateLabel(new Date('2023-10-15T00:00:00Z')));
		expect(result.current).toBe('SUN · OCT 15 · 2023');
	});

	test('formats the label for de-DE', () => {
		mockedUseSettingsContext.mockReturnValue({ locale: 'de-DE' });

		const { result } = renderHook(() => useLongDateLabel(new Date('2023-10-15T00:00:00Z')));
		expect(result.current).toContain('15');
		expect(result.current).toContain('2023');
	});

	test('falls back instead of throwing for an empty locale', () => {
		mockedUseSettingsContext.mockReturnValue({ locale: '' });

		const { result } = renderHook(() => useLongDateLabel(new Date('2023-10-15T00:00:00Z')));
		expect(result.current).toBe('SUN · OCT 15 · 2023');
	});

	test('falls back instead of throwing for an unsupported locale', () => {
		mockedUseSettingsContext.mockReturnValue({ locale: 'xx-XX' });

		const { result } = renderHook(() => useLongDateLabel(new Date('2023-10-15T00:00:00Z')));
		expect(result.current).toBe('SUN · OCT 15 · 2023');
	});
});
