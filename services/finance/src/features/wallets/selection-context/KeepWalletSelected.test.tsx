import { beforeEach, describe, expect, test } from 'vitest';
import { render, renderHook, waitFor } from '@testing-library/react';
import { useShallow } from 'zustand/react/shallow';

import { WalletsFiltersContextProvider } from '../search-and-filtering';
import { KeepWalletSelected } from './KeepWalletSelected.tsx';
import { WalletsSelectionProvider } from './WalletsSelectionProvider.tsx';
import { useWalletsSelection } from './use-wallets-selection.ts';

import type { FC, ReactNode } from 'react';
import type { Wallet } from '@entity/wallets';


const STORAGE_KEY = 'wallets-selection';

const buildWallet = (overrides: Partial<Wallet> = {}): Wallet => ({
	id: 'w1',
	name: 'Everyday',
	createdAt: '2026-03-01T00:00:00.000Z',
	updatedAt: null,
	deletedAt: null,
	category: 'checking',
	currency: 'USD',
	balance: { amount: '120.00', currency: 'USD' },
	zeroBalance: { amount: '0.00', currency: 'USD' },
	favorite: false,
	color: '#112233',
	...overrides,
});

const persistSelection = (selectedWalletId: string): void => {
	localStorage.setItem(STORAGE_KEY, JSON.stringify({ state: { selectedWalletId }, version: 1 }));
};

interface HarnessProps {
	wallets: Wallet[];
	loaded: boolean;
	children?: ReactNode;
}

const renderSelection = (props: HarnessProps) => {
	let wrapperProps = props;

	const Wrapper: FC<{ children: ReactNode }> = ({ children }) => (
		<WalletsSelectionProvider>
			<WalletsFiltersContextProvider>
				<KeepWalletSelected wallets={wrapperProps.wallets} loaded={wrapperProps.loaded} />
				{children}
			</WalletsFiltersContextProvider>
		</WalletsSelectionProvider>
	);

	const hook = renderHook(() => useWalletsSelection(useShallow((state) => ({
		selectedWalletId: state.selectedWalletId,
		selectionConfirmed: state.selectionConfirmed,
	}))), { wrapper: Wrapper });

	return {
		...hook,
		update: (next: HarnessProps) => {
			wrapperProps = next;
			hook.rerender();
		},
	};
};

describe('KeepWalletSelected', () => {
	beforeEach(() => {
		localStorage.clear();
	});

	test('keeps a restored selection unconfirmed until the wallet list loads', () => {
		persistSelection('stale');

		const { result } = renderSelection({ wallets: [], loaded: false });

		expect(result.current).toEqual({ selectedWalletId: 'stale', selectionConfirmed: false });
	});

	test('replaces a restored selection that is missing from the loaded list', async () => {
		persistSelection('stale');

		const { result, update } = renderSelection({ wallets: [], loaded: false });
		update({ wallets: [buildWallet({ id: 'w1' })], loaded: true });

		await waitFor(() => {
			expect(result.current).toEqual({ selectedWalletId: 'w1', selectionConfirmed: true });
		});
	});

	test('confirms a restored selection that exists in the loaded list', async () => {
		persistSelection('w2');

		const { result, update } = renderSelection({ wallets: [], loaded: false });
		update({ wallets: [buildWallet({ id: 'w1' }), buildWallet({ id: 'w2' })], loaded: true });

		await waitFor(() => {
			expect(result.current).toEqual({ selectedWalletId: 'w2', selectionConfirmed: true });
		});
	});

	test('clears a restored selection when the loaded list is empty', async () => {
		persistSelection('stale');

		const { result, update } = renderSelection({ wallets: [], loaded: false });
		update({ wallets: [], loaded: true });

		await waitFor(() => {
			expect(result.current).toEqual({ selectedWalletId: null, selectionConfirmed: false });
		});
	});

	test('never persists the confirmation flag', () => {
		render(
			<WalletsSelectionProvider>
				<WalletsFiltersContextProvider>
					<KeepWalletSelected wallets={[buildWallet({ id: 'w1' })]} loaded={true} />
				</WalletsFiltersContextProvider>
			</WalletsSelectionProvider>
		);

		const stored = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '{}') as { state?: object };

		expect(stored.state).toEqual({ selectedWalletId: 'w1' });
	});
});
