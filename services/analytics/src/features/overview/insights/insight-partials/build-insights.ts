import { parseAmount } from "@internal/shared";
import { categoryLabel } from "@entity/spending";
import { moneyChange } from "@entity/overview";

import type { CategoryBreakdown, CategoryShare } from "@entity/spending";
import type { Money } from "@entity/shell";
import type { Insight, InsightTone, Overview } from "@entity/overview";


interface InsightFormatters {
	money: (money: Money) => string;
	percent: (value: number) => string;
	date: (iso: string) => string;
}

type ChangedShare = CategoryShare & { changePercentage: number };

const MAX_INSIGHTS = 4;
const HEALTHY_SAVINGS_RATE = 20;
const MOVER_MIN_SHARE = 3;

const savingsTone = (rate: number): InsightTone => {
	if (rate >= HEALTHY_SAVINGS_RATE) {
		return 'positive';
	}

	return rate < 0 ? 'negative' : 'neutral';
};

const savingsInsight = (overview: Overview, format: InsightFormatters): Insight | null => {
	const rate = overview.current.savingsRate;
	if (rate === null) {
		return null;
	}

	const netAmount = format.money(overview.current.net);
	const activeDays = overview.current.activeDays.toString();

	return {
		key: 'savings',
		tone: savingsTone(rate),
		title: rate >= 0 ? `You kept ${format.percent(rate)} of your income` : 'You spent more than you earned',
		detail: [`Net ${netAmount} across ${activeDays} active days`],
	};
};

const spendingTrendInsight = (overview: Overview, format: InsightFormatters): Insight | null => {
	const change = moneyChange(overview.current.outflow, overview.previous.outflow);
	if (change === null) {
		return null;
	}

	return {
		key: 'spending-trend',
		tone: change > 0 ? 'negative' : 'positive',
		title: `Spending ${change > 0 ? 'up' : 'down'} ${format.percent(Math.abs(change))}`,
		detail: [`${format.money(overview.current.outflow)} vs ${format.money(overview.previous.outflow)} before`],
	};
};

const moverInsight = (breakdown: CategoryBreakdown, format: InsightFormatters): Insight | null => {
	const mover = breakdown.categories
		.filter((share): share is ChangedShare => share.changePercentage !== null && share.share >= MOVER_MIN_SHARE)
		.sort((left, right) => Math.abs(right.changePercentage) - Math.abs(left.changePercentage))
		.at(0);
	if (!mover) {
		return null;
	}

	const grew = mover.changePercentage > 0;

	return {
		key: 'mover',
		tone: grew ? 'negative' : 'positive',
		title: [
			categoryLabel(mover.category),
			grew ? 'jumped' : 'dropped',
			format.percent(Math.abs(mover.changePercentage)),
		].join(' '),
		detail: [`${format.money(mover.amount)} this period, ${format.money(mover.previousAmount)} before`],
	};
};

const largestExpenseInsight = (overview: Overview, format: InsightFormatters): Insight | null => {
	const expense = overview.current.largestExpense;
	if (!expense) {
		return null;
	}

	return {
		key: 'largest-expense',
		tone: 'neutral',
		title: `Biggest expense: ${expense.name}`,
		detail: [
			`${format.money(expense.converted)} on ${format.date(expense.createdAt)}`,
			categoryLabel(expense.category),
		],
	};
};

const topCategoryInsight = (overview: Overview, format: InsightFormatters): Insight | null => {
	const top = overview.current.topExpenseCategory;
	if (!top || parseAmount(top.amount.amount) === 0) {
		return null;
	}

	return {
		key: 'top-category',
		tone: 'neutral',
		title: `${categoryLabel(top.category)} takes ${format.percent(top.share)} of spending`,
		detail: [`${format.money(top.amount)} in total`],
	};
};

const buildInsights = (overview: Overview, breakdown: CategoryBreakdown, format: InsightFormatters): Insight[] => {
	return [
		savingsInsight(overview, format),
		spendingTrendInsight(overview, format),
		moverInsight(breakdown, format),
		largestExpenseInsight(overview, format),
		topCategoryInsight(overview, format),
	]
		.filter((insight): insight is Insight => insight !== null)
		.slice(0, MAX_INSIGHTS);
};

export { buildInsights };
export type { InsightFormatters };
