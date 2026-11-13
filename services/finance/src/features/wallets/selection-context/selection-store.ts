import { createStore } from "zustand";
import { persist } from 'zustand/middleware';

import type { StoreApi } from "zustand";
import type { PersistOptions } from 'zustand/middleware';
import type { WalletsSelection, WalletsSelectionState } from "./types.ts";


type PersistedWalletsSelection = Pick<WalletsSelection, 'selectedWalletId'>;

const initialState: WalletsSelection = {
	selectedWalletId: null,
	selectionConfirmed: false,
};

const persistenceStorageConfig: PersistOptions<WalletsSelectionState, PersistedWalletsSelection> = {
	name: "wallets-selection",
	version: 1,
	partialize: (state) => ({
		selectedWalletId: state.selectedWalletId,
	}),
	migrate: (_, version) => {
		throw new Error(`Obsolete persisted state configuration (version: ${version.toString()})`);
	}
};

const createWalletsSelectionStore = (
	initialValues: Partial<WalletsSelection>
): StoreApi<WalletsSelectionState> => {
	return createStore<WalletsSelectionState>()(persist((setState) => ({
		...initialState,
		...initialValues,
		selectWallet: (walletId: string) => {
			setState(() => ({
				selectedWalletId: walletId,
				selectionConfirmed: true,
			}));
		},
		confirmSelection: () => {
			setState(() => ({
				selectionConfirmed: true,
			}));
		},
		clearSelection: () => {
			setState(() => ({
				selectedWalletId: null,
				selectionConfirmed: false,
			}));
		},
	}), persistenceStorageConfig));
}

export { createWalletsSelectionStore };
