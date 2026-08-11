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
import { useCallback, useRef } from "react";

import type { ChangeEvent } from "react";


const WalletBrowserFilters = () => {
	const types = useRef<string[]>(['all', 'Debit Card', 'Credit Card']);
	const {
		search, setSearch,
		caseSensitive, setCaseSensitive,
		typeFilter, setTypeFilter,
		sortBy, setSortBy,
	} = useWalletsFiltersContext();

	const setSearchCallback = useCallback((event: ChangeEvent<HTMLInputElement>) => {
		setSearch(event.target.value);
	}, [setSearch]);
	
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
						{types.current.map((type) => (
							<FinanceSelectItem key={type} value={type}>
								{type === 'all' ? 'All types' : type}
							</FinanceSelectItem>
						))}
					</FinanceSelectContent>
				</FinanceSelect>
				<FinanceSelect value={sortBy} onValueChange={setSortBy}>
					<FinanceSelectTrigger className="flex-1">
						<FinanceSelectValue />
					</FinanceSelectTrigger>
					<FinanceSelectContent>
						<FinanceSelectItem value="name">
							Name A–Z
						</FinanceSelectItem>
						<FinanceSelectItem value="balance-desc">
							Balance: high → low
						</FinanceSelectItem>
					</FinanceSelectContent>
				</FinanceSelect>
			</div>
		</div>
	);
}

export { WalletBrowserFilters };