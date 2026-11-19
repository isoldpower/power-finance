import { moneyFromApi } from "@feature/filters/ledger-api";

import type { CashFlow, CashFlowBucket } from "@entity/flow";
import type { CashFlowBucketDto, CashFlowDto, CashFlowMetaDto } from "../types.ts";


const cashFlowBucketFromApi = (dto: CashFlowBucketDto): CashFlowBucket => ({
	start: dto.start,
	end: dto.end,
	inflow: moneyFromApi(dto.inflow),
	outflow: moneyFromApi(dto.outflow),
	net: moneyFromApi(dto.net),
	transactionsCount: dto.transactions_count,
	closingBalance: moneyFromApi(dto.closing_balance),
});

const cashFlowFromApi = (dto: CashFlowDto, meta: CashFlowMetaDto): CashFlow => ({
	buckets: dto.buckets.map(cashFlowBucketFromApi),
	totals: {
		inflow: moneyFromApi(dto.totals.inflow),
		outflow: moneyFromApi(dto.totals.outflow),
		net: moneyFromApi(dto.totals.net),
	},
	granularity: meta.granularity,
});

export { cashFlowBucketFromApi, cashFlowFromApi };
