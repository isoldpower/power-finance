import { use } from "react";
import { useStore } from "zustand";
import { TransactionsSelectionReactContext } from "./context.ts";

import type { TransactionsSelectionState } from "./types.ts";


function useTransactionsSelection<T>(selector: (state: TransactionsSelectionState) => T) {
	const context = use(TransactionsSelectionReactContext);

	if (!context) {
		throw new Error(
			'TransactionsSelectionReactContext.Provider is missing. ' +
			'useTransactionsSelection<T> must be used within the transactions selection'
		);
	}

	return useStore(context, selector);
}

export { useTransactionsSelection };
