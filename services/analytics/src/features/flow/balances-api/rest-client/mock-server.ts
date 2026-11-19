import { delay } from "@internal/shared";
import {
	analyticsMeta,
	convertAmount,
	invalid,
	iso,
	MockLedger,
	moneyDto,
	nativeBalancesAt,
	parseLedgerQuery,
	selectedWallets,
	walletOptionDto,
} from "@feature/filters/ledger-api";

import type { WalletBalanceSeriesDto } from "../types.ts";
import type { BalanceHistoryRequest, BalanceHistoryResponse, IBalancesRESTApiClient } from "./types.ts";


const DEFAULT_POINTS = 40;
const MIN_POINTS = 2;
const MAX_POINTS = 120;

const parsePoints = (points: number | undefined): number => {
	if (points === undefined) {
		return DEFAULT_POINTS;
	}
	if (!Number.isInteger(points) || points < MIN_POINTS || points > MAX_POINTS) {
		throw invalid('points', 'points_out_of_range', 'points must be between 2 and 120');
	}

	return points;
};

class BalancesMockRESTApiClient implements IBalancesRESTApiClient {
	public async getBalanceHistory(payload: BalanceHistoryRequest): Promise<BalanceHistoryResponse> {
		await delay();

		const ledger = new MockLedger();
		const query = parseLedgerQuery(payload.params, ledger);
		const points = parsePoints(payload.params.points);
		const step = (query.until - query.since) / (points - 1);
		const instants = Array.from({ length: points }, (_, index) => Math.round(query.since + step * index));
		const wallets: WalletBalanceSeriesDto[] = selectedWallets(ledger, query.walletIds).map((wallet) => {
			const native = nativeBalancesAt(ledger, wallet, instants);

			return {
				wallet: walletOptionDto(wallet),
				balances: native.map((balance) => moneyDto(
					convertAmount(balance, wallet.currency, query.currency),
					query.currency,
				)),
				native_balances: native.map((balance) => moneyDto(balance, wallet.currency)),
			};
		});
		const total = instants.map((_, index) => wallets.reduce(
			(sum, series) => sum + Number.parseFloat(series.balances[index].amount),
			0,
		));

		return {
			data: {
				timestamps: instants.map(iso),
				total: total.map((balance) => moneyDto(balance, query.currency)),
				wallets,
			},
			meta: { ...analyticsMeta(query), points },
		};
	}
}

export { BalancesMockRESTApiClient };
