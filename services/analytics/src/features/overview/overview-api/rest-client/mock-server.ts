import { delay } from "@internal/shared";
import {
	analyticsMeta,
	categoryKeyOf,
	convertRow,
	DAY_MS,
	iso,
	localDayKey,
	MockLedger,
	moneyDto,
	parseLedgerQuery,
	percentage,
	previousWindow,
	selectFlows,
	sumConverted,
	transactionBriefDto,
} from "@feature/filters/ledger-api";

import type { LedgerQuery, LedgerRow, LedgerWindow } from "@feature/filters/ledger-api";
import type { PeriodSummaryDto, TopCategoryDto } from "../types.ts";
import type { IOverviewRESTApiClient, OverviewRequest, OverviewResponse } from "./types.ts";


const largestOf = (rows: LedgerRow[], currency: string): LedgerRow | null => {
	return rows.reduce<LedgerRow | null>((largest, row) => (
		largest === null || convertRow(row, currency) > convertRow(largest, currency) ? row : largest
	), null);
};

interface CategoryTotal {
	category: LedgerRow['category'];
	amount: number;
}

const topCategoryOf = (rows: LedgerRow[], currency: string): TopCategoryDto | null => {
	const totals = new Map<string, CategoryTotal>();
	rows.forEach((row) => {
		const key = categoryKeyOf(row.category);
		const current = totals.get(key) ?? { category: row.category, amount: 0 };
		totals.set(key, { ...current, amount: current.amount + convertRow(row, currency) });
	});

	const total = sumConverted(rows, currency);
	const top = [...totals.values()].sort((left, right) => right.amount - left.amount).at(0);

	return total === 0 || top === undefined
		? null
		: { category: top.category, amount: moneyDto(top.amount, currency), share: percentage(top.amount, total) };
};

const summarize = (ledger: MockLedger, query: LedgerQuery, window: LedgerWindow): PeriodSummaryDto => {
	const rows = selectFlows(ledger, query, { window });
	const expenses = rows.filter((row) => row.side === 'expense');
	const incomes = rows.filter((row) => row.side === 'income');
	const inflow = sumConverted(incomes, query.currency);
	const outflow = sumConverted(expenses, query.currency);
	const net = inflow - outflow;
	const windowMs = window.until - window.since;
	const days = Math.max(1, Math.round(windowMs / DAY_MS));
	const savingsRate = inflow > 0 ? percentage(net, inflow) : null;
	const activeDays = new Set(rows.map((row) => localDayKey(row.createdAt))).size;
	const largestExpense = largestOf(expenses, query.currency);
	const largestIncome = largestOf(incomes, query.currency);

	return {
		since: iso(window.since),
		until: iso(window.until),
		inflow: moneyDto(inflow, query.currency),
		outflow: moneyDto(outflow, query.currency),
		net: moneyDto(net, query.currency),
		savings_rate: savingsRate,
		transactions_count: rows.length,
		active_days: activeDays,
		average_daily_outflow: moneyDto(outflow / days, query.currency),
		largest_expense: largestExpense ? transactionBriefDto(ledger, largestExpense, query.currency) : null,
		largest_income: largestIncome ? transactionBriefDto(ledger, largestIncome, query.currency) : null,
		top_expense_category: topCategoryOf(expenses, query.currency),
	};
};

class OverviewMockRESTApiClient implements IOverviewRESTApiClient {
	public async getOverview(payload: OverviewRequest): Promise<OverviewResponse> {
		await delay();

		const ledger = new MockLedger();
		const query = parseLedgerQuery(payload.params, ledger);

		return {
			data: {
				current: summarize(ledger, query, query),
				previous: summarize(ledger, query, previousWindow(query)),
			},
			meta: analyticsMeta(query),
		};
	}
}

export { OverviewMockRESTApiClient };
