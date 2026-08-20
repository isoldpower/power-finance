import { createStore } from "zustand";
import { persist } from 'zustand/middleware';

import type { StoreApi } from "zustand";
import type { PersistOptions } from 'zustand/middleware';
import type { WalletsSelection, WalletsSelectionState } from "./types.ts";


const initialState: WalletsSelection = {
	selectedWalletId: null,
};

const persistenceStorageConfig: PersistOptions<WalletsSelectionState> = {
	name: "wallets-selection",
	version: 1,
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
			setState(() => ({ selectedWalletId: walletId }));
		},
	}), persistenceStorageConfig));
}

export { createWalletsSelectionStore };
