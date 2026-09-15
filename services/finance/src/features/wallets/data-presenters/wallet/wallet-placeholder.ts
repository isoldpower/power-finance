import { QUERY_KEYS } from "@shared/api";

import { DEFAULT_WALLET_PERIOD } from "../cache-config.ts";

import type { QueryClient } from "@tanstack/react-query";
import type { Page } from "@shared/api";
import type { Transaction } from "@entity/transactions";
import type { Wallet } from "@entity/wallets";
import type { FetchWalletResponse } from "../../wallets-api";


interface WalletPageResponse {
	page: Page<Wallet>;
}

const PAGED_KEYS = [QUERY_KEYS.wallets, QUERY_KEYS.walletsSearch];

const NO_RECENT: Page<Transaction> = {
	items: [],
	limit: 0,
	total: 0,
	nextCursor: null,
	prevCursor: null,
};

const fromPagedWallets = (client: QueryClient, id: string): Wallet | undefined => {
	for (const family of PAGED_KEYS) {
		const entries = client.getQueriesData<WalletPageResponse>({ queryKey: [family] });

		for (const [, response] of entries) {
			const wallet = response?.page.items.find((item) => item.id === id);
			if (wallet) return wallet;
		}
	}

	return undefined;
};

const walletDetailsPlaceholder = (
	client: QueryClient,
	id: string,
): FetchWalletResponse | undefined => {
	const wallet = fromPagedWallets(client, id);
	if (wallet === undefined) return undefined;

	return { wallet, recent: NO_RECENT, period: DEFAULT_WALLET_PERIOD };
};

export { walletDetailsPlaceholder };
