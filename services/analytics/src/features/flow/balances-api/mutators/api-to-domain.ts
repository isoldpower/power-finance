import { moneyFromApi, walletOptionFromApi } from "@feature/filters/ledger-api";

import type { BalanceHistory, WalletBalanceSeries } from "@entity/flow";
import type { BalanceHistoryDto, WalletBalanceSeriesDto } from "../types.ts";


const walletBalanceSeriesFromApi = (dto: WalletBalanceSeriesDto): WalletBalanceSeries => ({
	wallet: walletOptionFromApi(dto.wallet),
	balances: dto.balances.map(moneyFromApi),
	nativeBalances: dto.native_balances.map(moneyFromApi),
});

const balanceHistoryFromApi = (dto: BalanceHistoryDto): BalanceHistory => ({
	timestamps: [...dto.timestamps],
	total: dto.total.map(moneyFromApi),
	wallets: dto.wallets.map(walletBalanceSeriesFromApi),
});

export { balanceHistoryFromApi, walletBalanceSeriesFromApi };
