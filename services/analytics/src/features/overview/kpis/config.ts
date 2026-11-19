import { moneyChange, valueChange } from "@entity/overview";
import { ACCENT_COLOR, INFLOW_COLOR, OUTFLOW_COLOR, seriesColor } from "@shared/charts";

import type { CashFlowPoint } from "@entity/flow";
import type { ChangePreference, KpiKey, Overview, PeriodSummary } from "@entity/overview";


interface KpiDefinition {
	key: KpiKey;
	label: string;
	color: string;
	preference: ChangePreference;
	change: (overview: Overview) => number | null;
	changeUnit: 'percent' | 'points';
	spark: (point: CashFlowPoint) => number;
}

const savingsRateOf = (summary: PeriodSummary): number => summary.savingsRate ?? 0;

const KPI_DEFINITIONS: KpiDefinition[] = [
	{
		key: 'inflow',
		label: 'Income',
		color: INFLOW_COLOR,
		preference: 'higher',
		change: ({ current, previous }) => moneyChange(current.inflow, previous.inflow),
		changeUnit: 'percent',
		spark: (point) => point.inflow,
	},
	{
		key: 'outflow',
		label: 'Expenses',
		color: OUTFLOW_COLOR,
		preference: 'lower',
		change: ({ current, previous }) => moneyChange(current.outflow, previous.outflow),
		changeUnit: 'percent',
		spark: (point) => point.outflow,
	},
	{
		key: 'net',
		label: 'Net cash flow',
		color: ACCENT_COLOR,
		preference: 'higher',
		change: ({ current, previous }) => moneyChange(current.net, previous.net),
		changeUnit: 'percent',
		spark: (point) => point.net,
	},
	{
		key: 'savingsRate',
		label: 'Savings rate',
		color: seriesColor(6),
		preference: 'higher',
		change: ({ current, previous }) => (
			current.savingsRate === null || previous.savingsRate === null
				? null
				: savingsRateOf(current) - savingsRateOf(previous)
		),
		changeUnit: 'points',
		spark: (point) => (point.inflow > 0 ? (point.net / point.inflow) * 100 : 0),
	},
	{
		key: 'averageDailyOutflow',
		label: 'Daily spend',
		color: seriesColor(1),
		preference: 'lower',
		change: ({ current, previous }) => moneyChange(current.averageDailyOutflow, previous.averageDailyOutflow),
		changeUnit: 'percent',
		spark: (point) => point.outflow,
	},
	{
		key: 'transactionsCount',
		label: 'Transactions',
		color: seriesColor(3),
		preference: 'neutral',
		change: ({ current, previous }) => valueChange(current.transactionsCount, previous.transactionsCount),
		changeUnit: 'percent',
		spark: (point) => point.count,
	},
];

export { KPI_DEFINITIONS };
export type { KpiDefinition };
