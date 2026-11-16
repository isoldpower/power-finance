import { parseAmount } from "@internal/shared";

import type { WalletOption } from "@entity/filters";
import type { BalanceHistory } from "../types.ts";


interface BalanceSeriesView {
	key: string;
	wallet: WalletOption;
	values: number[];
}

interface BalanceHistoryView {
	timestamps: string[];
	total: number[];
	wallets: BalanceSeriesView[];
}

const toBalanceHistoryView = (history: BalanceHistory): BalanceHistoryView => ({
	timestamps: history.timestamps,
	total: history.total.map((money) => parseAmount(money.amount)),
	wallets: history.wallets.map((series) => ({
		key: series.wallet.id,
		wallet: series.wallet,
		values: series.balances.map((money) => parseAmount(money.amount)),
	})),
});

export { toBalanceHistoryView };
export type { BalanceHistoryView, BalanceSeriesView };
