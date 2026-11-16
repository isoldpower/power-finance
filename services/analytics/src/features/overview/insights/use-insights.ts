import { useMemo } from "react";
import { formatPercent, useDateFormat, useMoneyFormat } from "@shared/formatting";
import { buildInsights } from "./insight-partials/build-insights.ts";

import type { Insight, Overview } from "@entity/overview";
import type { CategoryBreakdown } from "@entity/spending";


const formatWholePercent = (value: number): string => formatPercent(value, 0);

const useInsights = (overview: Overview, breakdown: CategoryBreakdown): Insight[] => {
	const formatMoney = useMoneyFormat();
	const { formatDay } = useDateFormat();

	return useMemo(() => {
		return buildInsights(overview, breakdown, {
			money: formatMoney,
			percent: formatWholePercent,
			date: formatDay,
		});
	}, [overview, breakdown, formatMoney, formatDay]);
};

export { useInsights };
