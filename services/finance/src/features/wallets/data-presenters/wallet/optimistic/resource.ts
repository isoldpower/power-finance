import { matchesWalletQuery } from "../../../filtration";
import { WALLETS_CACHE_KEYS } from "../../cache-config.ts";

import type { QueryKey } from "@tanstack/react-query";
import type { OptimisticResource } from "@shared/data";
import type { Wallet, WalletDetails, WalletQuery } from "@entity/wallets";
import type { FetchWalletResponse } from "../../../wallets-api";


const MATCH_ALL: WalletQuery = {};

const searchQueryOf = (key: QueryKey): WalletQuery => {
	const [, query] = key;

	return typeof query === 'object' && query !== null ? query as WalletQuery : MATCH_ALL;
};

const WALLET_RESOURCE: OptimisticResource<Wallet, WalletDetails, FetchWalletResponse> = {
	paged: [
		{ key: WALLETS_CACHE_KEYS.list },
		{
			key: WALLETS_CACHE_KEYS.search,
			accepts: (key, wallet) => matchesWalletQuery(wallet, searchQueryOf(key)),
		},
	],
	details: [
		{
			key: WALLETS_CACHE_KEYS.fetch,
			read: (response) => response.wallet,
			write: (response, wallet) => ({ ...response, wallet }),
		},
	],
};

export { WALLET_RESOURCE };
