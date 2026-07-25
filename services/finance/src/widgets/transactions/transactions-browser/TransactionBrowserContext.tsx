import type { FC, ReactNode } from "react";
import {
	useTransactionsFiltersContext,
	TransactionsFiltersContextProvider
} from "@feature/transactions/search-and-filtering/TransactionsFiltersContext.tsx";
import {
	TransactionsPaginationContextProvider
} from "@feature/transactions/search-and-filtering/TransactionsPaginationContext.tsx";
import {
	TransactionsSelectionContextProvider
} from "@feature/transactions/search-and-filtering/TransactionsSelectionContext.tsx";
import {useTransactionsBrowser} from "@feature/transactions/search-and-filtering/use-transactions-browser.ts";


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
