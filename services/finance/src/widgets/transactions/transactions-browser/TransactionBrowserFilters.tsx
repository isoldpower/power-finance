import { useCallback, useMemo } from "react";
import { FilterChip, TransactionSearchInput } from "@entity/transactions";
import { useTransactionCategories, useTransactionsFiltersContext } from "@feature/transactions";
import { useWalletsList } from "@feature/wallets";
import { Caption } from "@shared/pure-components/typography";

import { TRANSACTION_ORDER_LABEL, TRANSACTION_TYPE_FILTER_OPTIONS } from "./config.ts";


const TransactionBrowserFilters = () => {
	const { wallets } = useWalletsList();
	const { categories } = useTransactionCategories();
	const {
		search, setSearch,
		walletFilter, setWalletFilter,
		categoryFilter, setCategoryFilter,
		typeFilter, setTypeFilter,
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

	const clearSearch = useCallback(() => {
		setSearch('');
	}, [setSearch]);

	return (
		<div className="relative z-10 flex flex-wrap items-center gap-2 border-b border-border px-4 py-3">
			<TransactionSearchInput>
				<TransactionSearchInput.Icon />
				<TransactionSearchInput.Field
					value={search}
					onValueChange={setSearch}
					placeholder="Search description, amount, note…"
				/>
				{search ? (
					<TransactionSearchInput.Clear onClick={clearSearch}>
						✕
					</TransactionSearchInput.Clear>
				) : null}
			</TransactionSearchInput>
			<FilterChip>
				<FilterChip.Trigger active={walletFilter !== 'all'}>
					{walletFilter === 'all' ? 'Wallet' : walletLabel}
					<FilterChip.Caret />
				</FilterChip.Trigger>
				<FilterChip.Options>
					{walletOptions.map((option) => (
						<FilterChip.Option
							key={option.value}
							onSelect={() => { setWalletFilter(option.value); }}
						>
							{option.label}
						</FilterChip.Option>
					))}
				</FilterChip.Options>
			</FilterChip>
			<FilterChip>
				<FilterChip.Trigger active={categoryFilter !== 'all'}>
					{categoryFilter === 'all' ? 'Category' : categoryFilter}
					<FilterChip.Caret />
				</FilterChip.Trigger>
				<FilterChip.Options>
					{categoryOptions.map((option) => (
						<FilterChip.Option
							key={option.value}
							onSelect={() => { setCategoryFilter(option.value); }}
						>
							{option.label}
						</FilterChip.Option>
					))}
				</FilterChip.Options>
			</FilterChip>
			<FilterChip>
				<FilterChip.Trigger active={typeFilter !== 'all'}>
					{typeFilter === 'all' ? 'Type' : typeLabel}
					<FilterChip.Caret />
				</FilterChip.Trigger>
				<FilterChip.Options>
					{TRANSACTION_TYPE_FILTER_OPTIONS.map((option) => (
						<FilterChip.Option
							key={option.value}
							onSelect={() => { setTypeFilter(option.value); }}
						>
							{option.label}
						</FilterChip.Option>
					))}
				</FilterChip.Options>
			</FilterChip>
			<Caption size="11">{TRANSACTION_ORDER_LABEL}</Caption>
		</div>
	);
};

TransactionBrowserFilters.displayName = 'TransactionBrowserFilters';

export { TransactionBrowserFilters };
