import { useMemo } from "react";
import { autoGranularity } from "@entity/filters";
import { moneyChange } from "@entity/overview";
import { useCashFlow } from "../data-presenters";
import { usePreviousQuery } from "./pace-partials/use-previous-query.ts";

import type { AnalyticsQuery } from "@entity/filters";
import type { CashFlow } from "@entity/flow";


interface SpendingPace {
	current: CashFlow;
	previous: CashFlow;
}

interface UseSpendingPaceReturn {
	pace: SpendingPace | undefined;
	outflowChange: number | null;
	isPending: boolean;
	isError: boolean;
}

const useSpendingPace = (query: AnalyticsQuery): UseSpendingPaceReturn => {
	const previousQuery = usePreviousQuery(query);
	const granularity = useMemo(() => autoGranularity(query.range), [query.range]);
	const current = useCashFlow(query, granularity);
	const previous = useCashFlow(previousQuery, granularity);

	return useMemo(() => {
		const pace = current.cashFlow && previous.cashFlow
			? { current: current.cashFlow, previous: previous.cashFlow }
			: undefined;

		return {
			pace,
			outflowChange: pace ? moneyChange(pace.current.totals.outflow, pace.previous.totals.outflow) : null,
			isPending: current.isPending || previous.isPending,
			isError: current.isError || previous.isError,
		};
	}, [current, previous]);
};

export { useSpendingPace };
export type { SpendingPace, UseSpendingPaceReturn };
