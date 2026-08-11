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
import { useWalletsFiltersContext } from "@feature/wallets";
import { useCallback } from "react";

import { WALLET_SORT_OPTIONS, WALLET_TYPE_OPTIONS, fromSortKey, toSortKey } from "./config.ts";

import type { ChangeEvent } from "react";


const WalletBrowserFilters = () => {
	const {
		search, setSearch,
		caseSensitive, setCaseSensitive,
		typeFilter, setTypeFilter,
		sortBy, setSortBy,
		sortDirection, setSortDirection,
	} = useWalletsFiltersContext();

	const setSearchCallback = useCallback((event: ChangeEvent<HTMLInputElement>) => {
		setSearch(event.target.value);
	}, [setSearch]);
	const setSortCallback = useCallback((key: string) => {
		const { field, direction } = fromSortKey(key);

		setSortBy(field);
		setSortDirection(direction);
	}, [setSortBy, setSortDirection]);

	return (
		<div className="border-b border-border px-3 pb-2 pt-2.5">
			<FinanceSearchInput
				value={search}
				onChange={setSearchCallback}
				placeholder="Search wallets…"
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
				<FinanceSelect value={typeFilter} onValueChange={setTypeFilter}>
					<FinanceSelectTrigger className="flex-1">
						<FinanceSelectValue />
					</FinanceSelectTrigger>
					<FinanceSelectContent>
						{WALLET_TYPE_OPTIONS.map((option) => (
							<FinanceSelectItem key={option.value} value={option.value}>
								{option.label}
							</FinanceSelectItem>
						))}
					</FinanceSelectContent>
				</FinanceSelect>
				<FinanceSelect value={toSortKey(sortBy, sortDirection)} onValueChange={setSortCallback}>
					<FinanceSelectTrigger className="flex-1">
						<FinanceSelectValue />
					</FinanceSelectTrigger>
					<FinanceSelectContent>
						{WALLET_SORT_OPTIONS.map((option) => (
							<FinanceSelectItem key={option.value} value={option.value}>
								{option.label}
							</FinanceSelectItem>
						))}
					</FinanceSelectContent>
				</FinanceSelect>
			</div>
		</div>
	);
}

export { WalletBrowserFilters };
