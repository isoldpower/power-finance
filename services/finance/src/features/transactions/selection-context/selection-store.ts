import { createStore } from "zustand";
import { persist } from 'zustand/middleware';

import type { StoreApi } from "zustand";
import type { PersistOptions } from 'zustand/middleware';
import type { TransactionsSelection, TransactionsSelectionState } from "./types.ts";


const initialState: TransactionsSelection = {
	selectedTransactionId: null,
	checkedTransactionIds: [],
};

const persistenceStorageConfig: PersistOptions<TransactionsSelectionState> = {
	name: "transactions-selection",
	version: 1,
	migrate: (_, version) => {
		throw new Error(`Obsolete persisted state configuration (version: ${version.toString()})`);
	}
};

const createTransactionsSelectionStore = (
	initialValues: Partial<TransactionsSelection>
): StoreApi<TransactionsSelectionState> => {
	return createStore<TransactionsSelectionState>()(persist((setState) => ({
		...initialState,
		...initialValues,
		selectTransaction: (transactionId: string | null) => {
			setState(() => ({ selectedTransactionId: transactionId }));
		},
		toggleChecked: (transactionId: string) => {
			setState((state) => ({
				checkedTransactionIds: state.checkedTransactionIds.includes(transactionId)
					? state.checkedTransactionIds.filter((id) => id !== transactionId)
					: [...state.checkedTransactionIds, transactionId],
			}));
		},
		clearChecked: () => {
			setState(() => ({ checkedTransactionIds: [] }));
		},
	}), persistenceStorageConfig));
}

export { createTransactionsSelectionStore };
