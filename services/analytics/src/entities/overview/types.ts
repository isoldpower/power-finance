import type { CategoryRef } from "@entity/spending";
import type { Money } from "@entity/shell";
import type { TransactionBrief } from "@entity/transactions";


interface TopCategory {
	category: CategoryRef | null;
	amount: Money;
	share: number;
}

interface PeriodSummary {
	since: string;
	until: string;
	inflow: Money;
	outflow: Money;
	net: Money;
	savingsRate: number | null;
	transactionsCount: number;
	activeDays: number;
	averageDailyOutflow: Money;
	largestExpense: TransactionBrief | null;
	largestIncome: TransactionBrief | null;
	topExpenseCategory: TopCategory | null;
}

interface Overview {
	current: PeriodSummary;
	previous: PeriodSummary;
}

type KpiKey = 'inflow' | 'outflow' | 'net' | 'savingsRate' | 'averageDailyOutflow' | 'transactionsCount';

type InsightTone = 'positive' | 'negative' | 'neutral';

interface Insight {
	key: string;
	tone: InsightTone;
	title: string;
	detail: string[];
}

export type { Insight, InsightTone, KpiKey, Overview, PeriodSummary, TopCategory };
