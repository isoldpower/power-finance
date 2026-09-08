import { createContext, use, useCallback, useMemo, useState } from "react";

import type { FC, ReactNode } from "react";


interface TransactionsFiltersContextType {
	walletFilter: string;
	setWalletFilter: (walletFilter: string | null) => void;
	categoryFilter: string;
	setCategoryFilter: (categoryFilter: string | null) => void;
	typeFilter: string;
	setTypeFilter: (typeFilter: string | null) => void;
	search: string;
	setSearch: (search: string) => void;
	caseSensitive: boolean;
	setCaseSensitive: (caseSensitive: boolean) => void;
}

const TransactionsFiltersContext = createContext<TransactionsFiltersContextType | null>(null);


interface TransactionsFiltersContextProviderProps {
	children: ReactNode;
}

const TransactionsFiltersContextProvider: FC<TransactionsFiltersContextProviderProps> = ({
	children,
}) => {
	const [walletFilter, setWalletFilter] = useState<string>('all');
	const [categoryFilter, setCategoryFilter] = useState<string>('all');
	const [typeFilter, setTypeFilter] = useState<string>('all');
	const [search, setSearch] = useState<string>('');
	const [caseSensitive, setCaseSensitive] = useState<boolean>(false);

	const setWalletFilterProtected = useCallback((wallet: string | null) => {
		setWalletFilter(wallet ?? 'all');
	}, []);
	const setCategoryFilterProtected = useCallback((category: string | null) => {
		setCategoryFilter(category ?? 'all');
	}, []);
	const setTypeFilterProtected = useCallback((type: string | null) => {
		setTypeFilter(type ?? 'all');
	}, []);

	const filterValues = useMemo<TransactionsFiltersContextType>(() => ({
		walletFilter,
		categoryFilter,
		typeFilter,
		search,
		caseSensitive,
		setSearch,
		setCaseSensitive,
		setWalletFilter: setWalletFilterProtected,
		setCategoryFilter: setCategoryFilterProtected,
		setTypeFilter: setTypeFilterProtected,
	}), [
		caseSensitive,
		categoryFilter,
		search,
		setCategoryFilterProtected,
		setTypeFilterProtected,
		setWalletFilterProtected,
		typeFilter,
		walletFilter,
	]);

	return (
		<TransactionsFiltersContext value={filterValues}>
			{children}
		</TransactionsFiltersContext>
	);
}

const useTransactionsFiltersContext = () => {
	const context = use(TransactionsFiltersContext);

	if (!context) {
		throw new Error('useTransactionsFiltersContext must be used within the context');
	}

	return context;
}

export { TransactionsFiltersContextProvider, useTransactionsFiltersContext };