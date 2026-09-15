import { useCallback, useMemo } from "react";
import {
	FilterChip,
	FilterCombobox,
	SortDirectionButton,
	TransactionSearchInput,
} from "@entity/transactions";
import { useTransactionCategories, useTransactionsFiltersContext } from "@feature/transactions";
import { useWalletsList } from "@feature/wallets";

import { TRANSACTION_TYPE_FILTER_OPTIONS } from "./config.ts";


const TransactionBrowserFilters = () => {
	const { wallets } = useWalletsList();
	const { categories } = useTransactionCategories();
	const {
		search, setSearch,
		walletFilter, setWalletFilter,
		categoryFilter, setCategoryFilter,
		typeFilter, setTypeFilter,
		sortDirection, toggleSortDirection,
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
		<div className="relative z-10 flex flex-wrap items-stretch gap-2 border-b border-border px-4 py-3">
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
			<FilterCombobox>
				<FilterCombobox.Trigger active={walletFilter !== 'all'}>
					{walletFilter === 'all' ? 'Wallet' : walletLabel}
				</FilterCombobox.Trigger>
				<FilterCombobox.Options>
					<FilterCombobox.Search placeholder="Search wallets…" />
					<FilterCombobox.List emptyLabel="No wallets match.">
						{walletOptions.map((option) => (
							<FilterCombobox.Option
								key={option.value}
								value={option.value}
								keywords={[option.label]}
								onSelect={() => { setWalletFilter(option.value); }}
							>
								{option.label}
							</FilterCombobox.Option>
						))}
					</FilterCombobox.List>
				</FilterCombobox.Options>
			</FilterCombobox>
			<FilterCombobox>
				<FilterCombobox.Trigger active={categoryFilter !== 'all'}>
					{categoryFilter === 'all' ? 'Category' : categoryFilter}
				</FilterCombobox.Trigger>
				<FilterCombobox.Options>
					<FilterCombobox.Search placeholder="Search categories…" />
					<FilterCombobox.List emptyLabel="No categories match.">
						{categoryOptions.map((option) => (
							<FilterCombobox.Option
								key={option.value}
								value={option.value}
								keywords={[option.label]}
								onSelect={() => { setCategoryFilter(option.value); }}
							>
								{option.label}
							</FilterCombobox.Option>
						))}
					</FilterCombobox.List>
				</FilterCombobox.Options>
			</FilterCombobox>
			<FilterChip>
				<FilterChip.Trigger active={typeFilter !== 'all'}>
					{typeFilter === 'all' ? 'Type' : typeLabel}
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
			<SortDirectionButton direction={sortDirection} onToggle={toggleSortDirection} />
		</div>
	);
};

TransactionBrowserFilters.displayName = 'TransactionBrowserFilters';

export { TransactionBrowserFilters };
