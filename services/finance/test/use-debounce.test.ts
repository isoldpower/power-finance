import { act, renderHook } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';

import { useDebounce } from '@internal/shared';


beforeEach(() => { vi.useFakeTimers(); });
afterEach(() => { vi.useRealTimers(); });

const advance = (ms: number): void => { act(() => { vi.advanceTimersByTime(ms); }); };

describe('useDebounce', () => {
	test('hands back the first value immediately', () => {
		const { result } = renderHook(() => useDebounce('coffee'));

		expect(result.current).toBe('coffee');
	});

	test('holds a new value back until the delay elapses', () => {
		const { result, rerender } = renderHook(({ value }) => useDebounce(value, 300), {
			initialProps: { value: 'c' },
		});

		rerender({ value: 'co' });
		expect(result.current).toBe('c');

		advance(299);
		expect(result.current).toBe('c');

		advance(1);
		expect(result.current).toBe('co');
	});

	test('only settles on the last value when typing continues', () => {
		const { result, rerender } = renderHook(({ value }) => useDebounce(value, 300), {
			initialProps: { value: 'c' },
		});

		rerender({ value: 'co' });
		advance(200);
		rerender({ value: 'cof' });
		advance(200);
		rerender({ value: 'coff' });
		advance(200);

		expect(result.current).toBe('c');

		advance(100);
		expect(result.current).toBe('coff');
	});

	test('passes the value straight through when the delay is zero', () => {
		const { result, rerender } = renderHook(({ value }) => useDebounce(value, 0), {
			initialProps: { value: 'c' },
		});

		rerender({ value: 'co' });
		expect(result.current).toBe('co');
	});

	test('debounces values of any type, not just strings', () => {
		const { result, rerender } = renderHook(({ value }) => useDebounce(value, 300), {
			initialProps: { value: { page: 1 } },
		});

		rerender({ value: { page: 2 } });
		expect(result.current).toEqual({ page: 1 });

		advance(300);
		expect(result.current).toEqual({ page: 2 });
	});

	test('drops a pending value when the caller unmounts', () => {
		const { rerender, unmount } = renderHook(({ value }) => useDebounce(value, 300), {
			initialProps: { value: 'c' },
		});

		rerender({ value: 'co' });
		unmount();

		expect(() => { advance(300); }).not.toThrow();
	});
});
