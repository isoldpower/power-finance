import { moneyFromApi, optionalCategoryRefFromApi, transactionBriefFromApi } from "@feature/filters/ledger-api";

import type { Overview, PeriodSummary } from "@entity/overview";
import type { OverviewDto, PeriodSummaryDto } from "../types.ts";


const periodSummaryFromApi = (dto: PeriodSummaryDto): PeriodSummary => ({
	since: dto.since,
	until: dto.until,
	inflow: moneyFromApi(dto.inflow),
	outflow: moneyFromApi(dto.outflow),
	net: moneyFromApi(dto.net),
	savingsRate: dto.savings_rate,
	transactionsCount: dto.transactions_count,
	activeDays: dto.active_days,
	averageDailyOutflow: moneyFromApi(dto.average_daily_outflow),
	largestExpense: dto.largest_expense === null ? null : transactionBriefFromApi(dto.largest_expense),
	largestIncome: dto.largest_income === null ? null : transactionBriefFromApi(dto.largest_income),
	topExpenseCategory: dto.top_expense_category === null
		? null
		: {
			category: optionalCategoryRefFromApi(dto.top_expense_category.category),
			amount: moneyFromApi(dto.top_expense_category.amount),
			share: dto.top_expense_category.share,
		},
});

const overviewFromApi = (dto: OverviewDto): Overview => ({
	current: periodSummaryFromApi(dto.current),
	previous: periodSummaryFromApi(dto.previous),
});

export { overviewFromApi, periodSummaryFromApi };
