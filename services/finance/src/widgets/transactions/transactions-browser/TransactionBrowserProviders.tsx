import { useCallback, useEffect, useState } from "react";
import { useShallow } from "zustand/react/shallow";
import {
	TransactionsFiltersContextProvider,
	TransactionsPaginationContextProvider,
	useTransactionsBrowser,
	useTransactionsFiltersContext,
	useTransactionsSelection,
	ResetTransactionOnBrowse,
} from "@feature/transactions";
import { useOnValuesChange } from "@shared/data";

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
	const [cursors, setCursors] = useState<(string | null)[]>([null]);

	const resetToFirstPage = useCallback(() => { setCursors([null]); }, []);

	useOnValuesChange(
		[search, caseSensitive, walletFilter, categoryFilter, typeFilter, sortBy, sortDirection],
		resetToFirstPage
	);

	const { searchResults: { transactions, total, nextCursor, prevCursor } } = useTransactionsBrowser({
		search: { search, caseSensitive },
		filters: { walletFilter, categoryFilter, typeFilter },
		ordering: { direction: sortDirection },
		page: { pageSize: TRANSACTIONS_PAGE_SIZE, cursor: cursors[cursors.length - 1] },
	});

	const handleNext = useCallback(() => {
		if (nextCursor) setCursors((visited) => [...visited, nextCursor]);
	}, [nextCursor]);

	const handlePrev = useCallback(() => {
		setCursors((visited) => visited.length > 1 ? visited.slice(0, -1) : visited);
	}, []);

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
			pageNumber={cursors.length}
			total={total}
			transactions={transactions}
			hasNext={nextCursor !== null}
			hasPrev={prevCursor !== null && cursors.length > 1}
			onNext={handleNext}
			onPrev={handlePrev}
		>
			<ResetTransactionOnBrowse />
			{children}
		</TransactionsPaginationContextProvider>
	);
}

export { TransactionBrowserProvider };
