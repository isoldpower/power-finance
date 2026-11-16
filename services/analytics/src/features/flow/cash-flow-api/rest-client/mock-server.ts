import { delay } from "@internal/shared";
import {
	analyticsMeta,
	bucketIndexOf,
	buildBuckets,
	convertRow,
	iso,
	MockLedger,
	moneyDto,
	parseLedgerQuery,
	resolveGranularity,
	selectedWallets,
	selectFlows,
	totalBalancesAt,
} from "@feature/filters/ledger-api";

import type { CashFlowBucketDto } from "../types.ts";
import type { CashFlowRequest, CashFlowResponse, ICashFlowRESTApiClient } from "./types.ts";


interface BucketTally {
	inflow: number;
	outflow: number;
	count: number;
}

class CashFlowMockRESTApiClient implements ICashFlowRESTApiClient {
	public async getCashFlow(payload: CashFlowRequest): Promise<CashFlowResponse> {
		await delay();

		const ledger = new MockLedger();
		const query = parseLedgerQuery(payload.params, ledger);
		const granularity = resolveGranularity(payload.params.granularity, query);
		const buckets = buildBuckets(query, granularity);
		const tallies: BucketTally[] = buckets.map(() => ({ inflow: 0, outflow: 0, count: 0 }));

		selectFlows(ledger, query).forEach((row) => {
			const tally = tallies[bucketIndexOf(buckets, row.createdAt)] as BucketTally | undefined;
			if (!tally) {
				return;
			}

			const amount = convertRow(row, query.currency);
			if (row.side === 'income') {
				tally.inflow += amount;
			}
			else {
				tally.outflow += amount;
			}
			tally.count += 1;
		});

		const wallets = selectedWallets(ledger, query.walletIds);
		const closing = totalBalancesAt(ledger, wallets, buckets.map((bucket) => bucket.end - 1), query.currency);
		const money = (amount: number) => moneyDto(amount, query.currency);
		const rows: CashFlowBucketDto[] = buckets.map((bucket, index) => ({
			start: iso(bucket.start),
			end: iso(bucket.end),
			inflow: money(tallies[index].inflow),
			outflow: money(tallies[index].outflow),
			net: money(tallies[index].inflow - tallies[index].outflow),
			transactions_count: tallies[index].count,
			closing_balance: money(closing[index]),
		}));
		const inflow = tallies.reduce((sum, tally) => sum + tally.inflow, 0);
		const outflow = tallies.reduce((sum, tally) => sum + tally.outflow, 0);

		return {
			data: {
				buckets: rows,
				totals: { inflow: money(inflow), outflow: money(outflow), net: money(inflow - outflow) },
			},
			meta: { ...analyticsMeta(query), granularity },
		};
	}
}

export { CashFlowMockRESTApiClient };
