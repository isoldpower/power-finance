import {
	useTransactionsFiltersContext,
	TransactionsFiltersContextProvider,
	TransactionsPaginationContextProvider,
	TransactionsSelectionContextProvider,
	useTransactionsBrowser,
} from "@feature/transactions";

import type { FC, ReactNode } from "react";


interface TransactionBrowserContextProviderProps {
	children: ReactNode;
}

const TransactionBrowserContextProvider: FC<TransactionBrowserContextProviderProps> = ({ children }) => {
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
	const { sortBy, sortDirection, walletFilter, search, caseSensitive } = useTransactionsFiltersContext();
	const { searchResults: { transactions, total } } = useTransactionsBrowser({
		search: { search, caseSensitive },
		filters: { walletFilter },
		ordering: { field: sortBy, direction: sortDirection },
	});

	return (
		<TransactionsSelectionContextProvider transactionsRegistry={transactions}>
			<TransactionsPaginationContextProvider
				pageSize={5}
				total={total}
				transactions={transactions}
			>
				{children}
			</TransactionsPaginationContextProvider>
		</TransactionsSelectionContextProvider>
	);
}

export { TransactionBrowserContextProvider };
