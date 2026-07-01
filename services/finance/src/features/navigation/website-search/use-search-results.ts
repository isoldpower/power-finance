import { useMemo } from "react";
import { getFinanceRoute } from "@internal/shared";

import { useWalletsList } from "@feature/wallet";

import type { PageEntry, ResultItem } from "./types.ts";


const useSearchResults = (query: string, pages: PageEntry[]) => {
	const { wallets } = useWalletsList();

	const pageResults = useMemo<ResultItem[]>(() => {
		const needle = query.trim().toLowerCase();
		return pages
			.filter((page) => `${page.label} ${page.hint}`.toLowerCase().includes(needle))
			.map((page) => ({ key: page.route, label: page.label, meta: page.hint, to: getFinanceRoute(page.route) }));
	}, [query, pages]);

	const walletResults = useMemo<ResultItem[]>(() => {
		const needle = query.trim().toLowerCase();
		return wallets
			.filter((wallet) => wallet.name.toLowerCase().includes(needle))
			.slice(0, 6)
			.map((wallet) => ({
				key: wallet.id,
				label: wallet.name,
				meta: `${wallet.balance.currency}${wallet.credit ? ' · Credit' : ''}`,
				to: getFinanceRoute('management'),
			}));
	}, [query, wallets]);

	const hasResults = pageResults.length > 0 || walletResults.length > 0;

	return { pageResults, walletResults, hasResults };
};

export { useSearchResults };
