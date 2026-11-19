import { moneyFromApi, optionalCategoryRefFromApi, transactionBriefFromApi } from "@feature/filters/ledger-api";

import type { Counterparty, CounterpartyRanking, DrillTransactions } from "@entity/transactions";
import type {
	CounterpartiesMetaDto,
	CounterpartyDto,
	TransactionBriefDto,
	TransactionsMetaDto,
} from "../types.ts";


const counterpartyFromApi = (dto: CounterpartyDto): Counterparty => ({
	name: dto.name,
	category: optionalCategoryRefFromApi(dto.category),
	amount: moneyFromApi(dto.amount),
	share: dto.share,
	transactionsCount: dto.transactions_count,
	average: moneyFromApi(dto.average),
	lastSeenAt: dto.last_seen_at,
});

const counterpartyRankingFromApi = (dto: CounterpartyDto[], meta: CounterpartiesMetaDto): CounterpartyRanking => ({
	counterparties: dto.map(counterpartyFromApi),
	totalCounterparties: meta.total_counterparties,
});

const drillTransactionsFromApi = (dto: TransactionBriefDto[], meta: TransactionsMetaDto): DrillTransactions => ({
	transactions: dto.map(transactionBriefFromApi),
	total: meta.total,
	totalInflow: moneyFromApi(meta.total_inflow),
	totalOutflow: moneyFromApi(meta.total_outflow),
});

export { counterpartyFromApi, counterpartyRankingFromApi, drillTransactionsFromApi };
