import {
	FinanceSearchInput,
	FinanceSearchInputField,
	FinanceSelect,
	FinanceSelectContent,
	FinanceSelectItem,
	FinanceSelectTrigger,
	FinanceSelectValue,
	FinanceToggle,
} from "@internal/ui-library";

import { SearchIcon } from "@shared/pure-components/icons";
import { useWalletsList } from "@feature/wallets";
import { useTransactionsFiltersContext } from "@feature/transactions";
import { useCallback, useMemo } from "react";

import type { ChangeEvent } from "react";


const TransactionBrowserFilters = () => {
	const { wallets } = useWalletsList();
	const {
		search, setSearch,
		caseSensitive, setCaseSensitive,
		walletFilter, setWalletFilter,
		sortBy, setSortBy,
	} = useTransactionsFiltersContext();

	const walletOptions = useMemo(() => ([
		{ value: 'all', label: 'All wallets' },
		...wallets.map((wallet) => ({ value: wallet.id, label: wallet.name })),
	]), [wallets]);

	const setSearchCallback = useCallback((event: ChangeEvent<HTMLInputElement>) => {
		setSearch(event.target.value);
	}, [setSearch]);

	return (
		<div className="border-b border-border px-3 pb-2 pt-2.5">
			<FinanceSearchInput
				value={search}
				onChange={setSearchCallback}
				placeholder="Search wallet, amount…"
				className="mb-2"
			>
				<SearchIcon />
				<FinanceSearchInputField />
				<FinanceToggle
					pressed={caseSensitive}
					onPressedChange={setCaseSensitive}
					title="Match case"
				>
					Aa
				</FinanceToggle>
			</FinanceSearchInput>
			<div className="flex gap-2">
				<FinanceSelect value={walletFilter} onValueChange={setWalletFilter}>
					<FinanceSelectTrigger className="flex-1">
						<FinanceSelectValue />
					</FinanceSelectTrigger>
					<FinanceSelectContent>
						{walletOptions.map((option) => (
							<FinanceSelectItem key={option.value} value={option.value}>
								{option.label}
							</FinanceSelectItem>
						))}
					</FinanceSelectContent>
				</FinanceSelect>
				<FinanceSelect value={sortBy} onValueChange={setSortBy}>
					<FinanceSelectTrigger className="flex-1">
						<FinanceSelectValue />
					</FinanceSelectTrigger>
					<FinanceSelectContent>
						<FinanceSelectItem value="created_at">
							Newest first
						</FinanceSelectItem>
						<FinanceSelectItem value="amount">
							Amount: high → low
						</FinanceSelectItem>
					</FinanceSelectContent>
				</FinanceSelect>
			</div>
		</div>
	);
}

export { TransactionBrowserFilters };
