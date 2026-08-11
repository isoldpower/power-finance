import { useCallback, useMemo } from "react";

import { FilterChip, TransactionSearchInput } from "@entity/transactions";
import { useTransactionCategories, useTransactionsFiltersContext } from "@feature/transactions";
import { useWalletsList } from "@feature/wallets";

import { TRANSACTION_SORT_OPTIONS, TRANSACTION_TYPE_FILTER_OPTIONS, fromSortKey, toSortKey } from "./config.ts";


const TransactionBrowserFilters = () => {
	const { wallets } = useWalletsList();
	const { categories } = useTransactionCategories();
	const {
		search, setSearch,
		walletFilter, setWalletFilter,
		categoryFilter, setCategoryFilter,
		typeFilter, setTypeFilter,
		sortBy, setSortBy,
		sortDirection, setSortDirection,
	} = useTransactionsFiltersContext();

	const walletOptions = useMemo(() => ([
		{ value: 'all', label: 'All wallets' },
		...wallets.map((wallet) => ({ value: wallet.id, label: wallet.name })),
	]), [wallets]);
	const categoryOptions = useMemo(() => ([
		{ value: 'all', label: 'All categories' },
		...categories.map((category) => ({ value: category.label, label: category.label })),
	]), [categories]);

	const walletLabel = useMemo(() => {
		return walletOptions.find((option) => option.value === walletFilter)?.label ?? 'Wallet';
	}, [walletFilter, walletOptions]);
	const typeLabel = useMemo(() => {
		return TRANSACTION_TYPE_FILTER_OPTIONS.find((option) => option.value === typeFilter)?.label ?? 'Type';
	}, [typeFilter]);
	const sortKey = useMemo(() => toSortKey(sortBy, sortDirection), [sortBy, sortDirection]);
	const sortLabel = useMemo(() => {
		return TRANSACTION_SORT_OPTIONS.find((option) => option.value === sortKey)?.label ?? 'Newest first';
	}, [sortKey]);

	const clearSearch = useCallback(() => {
		setSearch('');
	}, [setSearch]);
	const selectSort = useCallback((key: string) => {
		const { field, direction } = fromSortKey(key);

		setSortBy(field);
		setSortDirection(direction);
	}, [setSortBy, setSortDirection]);

	return (
		<div className="relative z-10 flex flex-wrap items-center gap-2 border-b border-border px-4 py-3">
			<TransactionSearchInput
				value={search}
				onValueChange={setSearch}
				onClear={clearSearch}
			/>
			<FilterChip
				label={walletFilter === 'all' ? 'Wallet' : walletLabel}
				active={walletFilter !== 'all'}
				options={walletOptions}
				onSelect={setWalletFilter}
			/>
			<FilterChip
				label={categoryFilter === 'all' ? 'Category' : categoryFilter}
				active={categoryFilter !== 'all'}
				options={categoryOptions}
				onSelect={setCategoryFilter}
			/>
			<FilterChip
				label={typeFilter === 'all' ? 'Type' : typeLabel}
				active={typeFilter !== 'all'}
				options={TRANSACTION_TYPE_FILTER_OPTIONS}
				onSelect={setTypeFilter}
			/>
			<FilterChip
				label={`Sort: ${sortLabel}`}
				active={false}
				options={TRANSACTION_SORT_OPTIONS}
				onSelect={selectSort}
			/>
		</div>
	);
};

TransactionBrowserFilters.displayName = 'TransactionBrowserFilters';

export { TransactionBrowserFilters };
