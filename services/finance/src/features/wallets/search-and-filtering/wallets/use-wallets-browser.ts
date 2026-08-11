import type { WalletsBrowseSetup } from "../types.ts";
import type { WalletSearchLeaf, WalletSearchRoot } from "../../wallets-api/types.ts";
import { useWalletSearch } from "../../data-presenters";
import { useMemo } from "react";


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

const useWalletsBrowser = (setup: WalletsBrowseSetup) => {
	const searchRequest = useMemo(() => buildFiltersFromSetup(setup), [setup]);
	const searchResults = useWalletSearch(searchRequest);
	
	return { searchResults };
}

export { useWalletsBrowser };