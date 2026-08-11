import { useMemo } from "react";

import { walletTypeLabel } from "@entity/wallets";

import { useWalletSearch } from "../../data-presenters";

import type { Wallet } from "@entity/wallets";
import type { WalletsBrowseSetup } from "../types.ts";
import type { WalletSearchLeaf, WalletSearchRoot } from "../../wallets-api/types.ts";


function buildFiltersFromSetup(setup: WalletsBrowseSetup): WalletSearchRoot  {
	const conditions: WalletSearchLeaf[] = [];

	if (setup.search.search) {
		conditions.push({
			field_name: 'name',
			operator: setup.search.caseSensitive ? 'contains' : 'icontains',
			value: setup.search.search,
		});
	}

	return { 'AND': conditions } satisfies WalletSearchRoot;
}

function matchesType(wallet: Wallet, typeFilter: string): boolean {
	return typeFilter === 'all' || walletTypeLabel(wallet) === typeFilter;
}

function compareBy(field: string, first: Wallet, second: Wallet): number {
	if (field === 'balance') {
		return first.balance.amount - second.balance.amount;
	}

	if (field === 'updatedAt') {
		return (first.updatedAt ?? '').localeCompare(second.updatedAt ?? '');
	}

	return first.name.localeCompare(second.name);
}

const useWalletsBrowser = (setup: WalletsBrowseSetup) => {
	const searchRequest = useMemo(() => buildFiltersFromSetup(setup), [setup]);
	const searchResults = useWalletSearch(searchRequest);

	const browsedResults = useMemo(() => {
		const filtered = searchResults.wallets.filter((wallet) => matchesType(wallet, setup.filters.typeFilter));
		const ordered = [...filtered].sort((first, second) => {
			const comparison = compareBy(setup.ordering.field, first, second);
			return setup.ordering.direction === 'ASC' ? comparison : -comparison;
		});

		return { ...searchResults, wallets: ordered, total: filtered.length };
	}, [searchResults, setup.filters.typeFilter, setup.ordering.direction, setup.ordering.field]);

	return { searchResults: browsedResults };
}

export { useWalletsBrowser };
