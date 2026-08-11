import { useEffect } from "react";
import { useShallow } from "zustand/react/shallow";

import {
	TransactionsFiltersContextProvider,
	TransactionsPaginationContextProvider,
	useTransactionsBrowser,
	useTransactionsFiltersContext,
	useTransactionsSelection,
	ResetTransactionOnBrowse,
} from "@feature/transactions";

import { TRANSACTIONS_PAGE_SIZE } from "./config.ts";

import type { FC, ReactNode } from "react";


interface TransactionBrowserContextProviderProps {
	children: ReactNode;
}

const TransactionBrowserProvider: FC<TransactionBrowserContextProviderProps> = ({ children }) => {
	return (
		<TransactionsFiltersContextProvider>
			<TransactionBrowserInternalContext>
				{ children }
			</TransactionBrowserInternalContext>
		</TransactionsFiltersContextProvider>
	);
}

interface TransactionBrowserInternalContextProps {
	children: ReactNode;
}

const TransactionBrowserInternalContext: FC<TransactionBrowserInternalContextProps> = ({ children }) => {
	const {
		sortBy,
		sortDirection,
		walletFilter,
		categoryFilter,
		typeFilter,
		search,
		caseSensitive,
	} = useTransactionsFiltersContext();
	const { selectedTransactionId, selectTransaction } = useTransactionsSelection(
		useShallow((state) => ({
			selectedTransactionId: state.selectedTransactionId,
			selectTransaction: state.selectTransaction,
		}))
	);
	const { searchResults: { transactions, total } } = useTransactionsBrowser({
		search: { search, caseSensitive },
		filters: { walletFilter, categoryFilter, typeFilter },
		ordering: { field: sortBy, direction: sortDirection },
	});

	useEffect(() => {
		if (!selectedTransactionId || transactions.length === 0) {
			return;
		}

		if (!transactions.some((transaction) => transaction.id === selectedTransactionId)) {
			selectTransaction(null);
		}
	}, [selectTransaction, selectedTransactionId, transactions]);

	return (
		<TransactionsPaginationContextProvider
			pageSize={TRANSACTIONS_PAGE_SIZE}
			total={total}
			transactions={transactions}
		>
			<ResetTransactionOnBrowse />
			{children}
		</TransactionsPaginationContextProvider>
	);
}

export { TransactionBrowserProvider };
