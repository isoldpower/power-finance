import { QUERY_KEYS } from "@shared/api";

import type { QueryClient } from "@tanstack/react-query";
import type { Page } from "@shared/api";
import type { TransactionWalletRef } from "@entity/transactions";


interface NamedWallet {
	id: string;
	name: string;
}

interface WalletPageLike {
	page: Page<NamedWallet>;
}

interface WalletDetailLike {
	wallet: NamedWallet;
}

const WALLET_PAGE_KEYS = [QUERY_KEYS.wallets, QUERY_KEYS.walletsSearch];
const UNRESOLVED_NAME = '';

const fromPagedWallets = (
	client: QueryClient,
	walletId: string,
): NamedWallet | undefined => {
	for (const family of WALLET_PAGE_KEYS) {
		const entries = client.getQueriesData<WalletPageLike>({ queryKey: [family] });

		for (const [, response] of entries) {
			const wallet = response?.page.items.find((item) => item.id === walletId);
			if (wallet) return wallet;
		}
	}

	return undefined;
};

const fromWalletDetails = (client: QueryClient, walletId: string): NamedWallet | undefined => (
	client.getQueryData<WalletDetailLike>([QUERY_KEYS.wallet, walletId])?.wallet
);

const readWalletRef = (client: QueryClient, walletId: string): TransactionWalletRef => {
	const wallet = fromPagedWallets(client, walletId) ?? fromWalletDetails(client, walletId);

	return { id: walletId, name: wallet?.name ?? UNRESOLVED_NAME };
};

export { readWalletRef };
