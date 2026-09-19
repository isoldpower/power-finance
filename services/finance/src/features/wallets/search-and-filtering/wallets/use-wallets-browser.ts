import { useMemo } from "react";
import { useDebounce } from "@internal/shared";
import { compareAmounts } from "@shared/api";

import { walletTypeLabel } from "@entity/wallets";

import { useWalletSearch } from "../../data-presenters";

import type { Wallet, WalletQuery } from "@entity/wallets";
import type { WalletsBrowseSetup } from "../types.ts";


function matchesType(wallet: Wallet, typeFilter: string): boolean {
	return typeFilter === 'all' || walletTypeLabel(wallet) === typeFilter;
}

function compareBy(field: string, first: Wallet, second: Wallet): number {
	if (field === 'balance') {
		return compareAmounts(first.balance.amount, second.balance.amount);
	}

	if (field === 'updatedAt') {
		return (first.updatedAt ?? '').localeCompare(second.updatedAt ?? '');
	}

	return first.name.localeCompare(second.name);
}

const useWalletsBrowser = (setup: WalletsBrowseSetup) => {
	const needle = useDebounce(setup.search.search?.trim() ?? '');
	const query = useMemo<WalletQuery>(
		() => ({ name: needle === '' ? undefined : needle }),
		[needle]
	);
	const searchResults = useWalletSearch(query);

	const browsedResults = useMemo(() => {
		const filtered = searchResults.wallets.filter((wallet) => {
			return matchesType(wallet, setup.filters.typeFilter);
		});
		const ordered = [...filtered].sort((first, second) => {
			const byFavorite = Number(second.favorite) - Number(first.favorite);
			if (byFavorite !== 0) return byFavorite;

			const comparison = compareBy(setup.ordering.field, first, second);

			return setup.ordering.direction === 'ASC' ? comparison : -comparison;
		});

		return { 
			...searchResults,
			wallets: ordered,
			total: filtered.length,
		};
	}, [searchResults, setup.filters.typeFilter, setup.ordering.direction, setup.ordering.field]);

	return { searchResults: browsedResults };
}

export { useWalletsBrowser };
