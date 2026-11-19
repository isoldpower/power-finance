import { useCallback } from "react";
import { formatPercent, useMoneyFormat } from "@shared/formatting";

import type { KpiKey, PeriodSummary } from "@entity/overview";


type FormatKpi = (key: KpiKey, summary: PeriodSummary) => string;

const useKpiValueFormat = (): FormatKpi => {
	const formatMoney = useMoneyFormat();

	return useCallback((key: KpiKey, summary: PeriodSummary) => {
		switch (key) {
			case 'inflow': return formatMoney(summary.inflow);
			case 'outflow': return formatMoney(summary.outflow);
			case 'net': return formatMoney(summary.net);
			case 'averageDailyOutflow': return formatMoney(summary.averageDailyOutflow);
			case 'savingsRate': return summary.savingsRate === null ? '—' : formatPercent(summary.savingsRate);
			case 'transactionsCount': return summary.transactionsCount.toLocaleString();
		}
	}, [formatMoney]);
};

export { useKpiValueFormat };
export type { FormatKpi };
