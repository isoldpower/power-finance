import { delay } from "@internal/shared";
import {
	analyticsMeta,
	categoryKeyOf,
	convertRow,
	iso,
	MockLedger,
	moneyDto,
	parseLedgerQuery,
	parseLimit,
	percentage,
	selectFlows,
	sumConverted,
	transactionBriefDto,
} from "@feature/filters/ledger-api";

import type { LedgerRow } from "@feature/filters/ledger-api";
import type { CounterpartyDto } from "../types.ts";
import type {
	CounterpartiesRequest,
	CounterpartiesResponse,
	ITransactionsRESTApiClient,
	TransactionsRequest,
	TransactionsResponse,
} from "./types.ts";


interface CounterpartyTally {
	spellings: Map<string, number>;
	categories: Map<string, number>;
	amount: number;
	count: number;
	lastSeenAt: number;
}

const DEFAULT_COUNTERPARTIES = 10;
const MAX_COUNTERPARTIES = 25;
const DEFAULT_TRANSACTIONS = 20;
const MAX_TRANSACTIONS = 50;

const normalizeName = (name: string): string => name.trim().toLowerCase();

const mostFrequent = <T>(counts: Map<T, number>, fallback: T): T => {
	const ranked = [...counts.entries()].sort((left, right) => right[1] - left[1]);
	const top = ranked.at(0);

	return top?.[0] ?? fallback;
};

const increment = <T>(counts: Map<T, number>, key: T): void => {
	const current = counts.get(key) ?? 0;

	counts.set(key, current + 1);
};

const tallyCounterparties = (rows: LedgerRow[], currency: string): CounterpartyTally[] => {
	const tallies = new Map<string, CounterpartyTally>();

	rows.forEach((row) => {
		const key = normalizeName(row.name);
		const tally = tallies.get(key) ?? {
			spellings: new Map<string, number>(),
			categories: new Map<string, number>(),
			amount: 0,
			count: 0,
			lastSeenAt: 0,
		};

		increment(tally.spellings, row.name.trim());
		increment(tally.categories, categoryKeyOf(row.category));
		tally.amount += convertRow(row, currency);
		tally.count += 1;
		tally.lastSeenAt = Math.max(tally.lastSeenAt, row.createdAt);
		tallies.set(key, tally);
	});

	return [...tallies.values()].sort((left, right) => right.amount - left.amount);
};

class TransactionsMockRESTApiClient implements ITransactionsRESTApiClient {
	public async getCounterparties(payload: CounterpartiesRequest): Promise<CounterpartiesResponse> {
		await delay();

		const ledger = new MockLedger();
		const query = parseLedgerQuery(payload.params, ledger);
		const limit = parseLimit(payload.params.limit, DEFAULT_COUNTERPARTIES, MAX_COUNTERPARTIES);
		const rows = selectFlows(ledger, query, { side: payload.params.type ?? 'expense' });
		const total = sumConverted(rows, query.currency);
		const tallies = tallyCounterparties(rows, query.currency);
		const data: CounterpartyDto[] = tallies.slice(0, limit).map((tally) => ({
			name: mostFrequent(tally.spellings, ''),
			category: ledger.category(mostFrequent(tally.categories, '')) ?? null,
			amount: moneyDto(tally.amount, query.currency),
			share: percentage(tally.amount, total),
			transactions_count: tally.count,
			average: moneyDto(tally.amount / tally.count, query.currency),
			last_seen_at: iso(tally.lastSeenAt),
		}));

		return {
			data,
			meta: { ...analyticsMeta(query), total_counterparties: tallies.length },
		};
	}

	public async getTransactions(payload: TransactionsRequest): Promise<TransactionsResponse> {
		await delay();

		const ledger = new MockLedger();
		const query = parseLedgerQuery(payload.params, ledger);
		const limit = parseLimit(payload.params.limit, DEFAULT_TRANSACTIONS, MAX_TRANSACTIONS);
		const order = payload.params.order ?? 'amount_desc';

		const name = payload.params.name === undefined ? null : normalizeName(payload.params.name);
		const rows = selectFlows(ledger, query, { side: payload.params.type })
			.filter((row) => name === null || normalizeName(row.name) === name);
		const sorted = [...rows].sort((left, right) => (
			order === 'amount_desc'
				? convertRow(right, query.currency) - convertRow(left, query.currency)
				: right.createdAt - left.createdAt
		));

		return {
			data: sorted.slice(0, limit).map((row) => transactionBriefDto(ledger, row, query.currency)),
			meta: {
				...analyticsMeta(query),
				total: rows.length,
				total_inflow: moneyDto(sumConverted(rows, query.currency, 'income'), query.currency),
				total_outflow: moneyDto(sumConverted(rows, query.currency, 'expense'), query.currency),
			},
		};
	}
}

export { TransactionsMockRESTApiClient };
