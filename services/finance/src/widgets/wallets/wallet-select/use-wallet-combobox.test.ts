import { describe, expect, test, vi } from 'vitest';
import { act, renderHook } from '@testing-library/react';

import { useWalletCombobox } from './use-wallet-combobox.ts';

import type { KeyboardEvent } from 'react';
import type { WalletSelectItem } from '@entity/wallets';


const OPTIONS: WalletSelectItem[] = [
	{ id: 'w1', name: 'Main Checking', currency: 'USD', gradient: 'a' },
	{ id: 'w2', name: 'Travel Fund', currency: 'EUR', gradient: 'b' },
	{ id: 'w3', name: 'Emergency', currency: 'USD', gradient: 'c' },
];

const keyEvent = (key: string) => ({
	key,
	preventDefault: vi.fn(),
}) as unknown as KeyboardEvent<HTMLInputElement>;

const renderCombobox = (onSelect = vi.fn()) => {
	const view = renderHook(() => useWalletCombobox({ options: OPTIONS, onSelect }));

	return { ...view, onSelect };
};

describe('useWalletCombobox', () => {
	test('filters by name', () => {
		const { result } = renderCombobox();

		act(() => { result.current.setQuery('travel'); });

		expect(result.current.matches.map((option) => option.id)).toEqual(['w2']);
	});

	test('filters by currency so a code finds every wallet holding it', () => {
		const { result } = renderCombobox();

		act(() => { result.current.setQuery('usd'); });

		expect(result.current.matches.map((option) => option.id)).toEqual(['w1', 'w3']);
	});

	test('highlights the first match as the query narrows', () => {
		const { result } = renderCombobox();

		act(() => { result.current.setQuery('emerg'); });

		expect(result.current.highlighted).toBe(0);
	});

	test('reports no highlight when nothing matches', () => {
		const { result } = renderCombobox();

		act(() => { result.current.setQuery('nothing here'); });

		expect(result.current.matches).toEqual([]);
		expect(result.current.highlighted).toBe(-1);
	});

	test('moves the highlight with the arrow keys and wraps around', () => {
		const { result } = renderCombobox();

		act(() => { result.current.onKeyDown(keyEvent('ArrowDown')); });
		expect(result.current.highlighted).toBe(1);

		act(() => { result.current.onKeyDown(keyEvent('ArrowUp')); });
		expect(result.current.highlighted).toBe(0);

		act(() => { result.current.onKeyDown(keyEvent('ArrowUp')); });
		expect(result.current.highlighted).toBe(2);
	});

	test('chooses the highlighted wallet on Enter and closes', () => {
		const { result, onSelect } = renderCombobox();

		act(() => { result.current.setOpen(true); });
		act(() => { result.current.onKeyDown(keyEvent('ArrowDown')); });
		act(() => { result.current.onKeyDown(keyEvent('Enter')); });

		expect(onSelect).toHaveBeenCalledWith('w2');
		expect(result.current.open).toBe(false);
	});

	test('does nothing on Enter when nothing matches', () => {
		const { result, onSelect } = renderCombobox();

		act(() => { result.current.setQuery('nothing here'); });
		act(() => { result.current.onKeyDown(keyEvent('Enter')); });

		expect(onSelect).not.toHaveBeenCalled();
	});

	test('clears the query when the popover closes', () => {
		const { result } = renderCombobox();

		act(() => { result.current.setOpen(true); });
		act(() => { result.current.setQuery('travel'); });
		act(() => { result.current.setOpen(false); });

		expect(result.current.query).toBe('');
		expect(result.current.matches).toHaveLength(OPTIONS.length);
	});
});
