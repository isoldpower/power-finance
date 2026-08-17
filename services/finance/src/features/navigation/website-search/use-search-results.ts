import { useMemo } from "react";
import { getFinanceRoute } from "@internal/shared";
import { useWalletsList } from "@feature/wallets";

import type { ResultItem } from "./types.ts";
import type { PageEntry } from "@entity/navigation";


const WALLET_RESULTS_LIMIT = 6;

const useSearchResults = (pages: PageEntry[]) => {
	const { wallets } = useWalletsList();

	const pageResults = useMemo<ResultItem[]>(() => {
		return pages.map((page) => ({
			key: page.route,
			label: page.label,
			meta: page.hint,
			search: `${page.label} ${page.hint}`,
			to: getFinanceRoute(page.route),
		}));
	}, [pages]);

	const walletResults = useMemo<ResultItem[]>(() => {
		return wallets
			.slice(0, WALLET_RESULTS_LIMIT)
			.map((wallet) => {
				const meta = `${wallet.balance.currency}${wallet.category ? ` · ${wallet.category}` : ''}`;

				return {
					key: wallet.id,
					label: wallet.name,
					meta,
					search: `${wallet.name} ${meta}`,
					to: getFinanceRoute('management'),
				};
			});
	}, [wallets]);

	return useMemo(() => ({ pageResults, walletResults }), [pageResults, walletResults]);
};

export { useSearchResults };
