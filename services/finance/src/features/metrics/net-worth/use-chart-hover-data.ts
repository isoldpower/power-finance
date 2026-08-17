import { useMemo } from "react";

import type { NetWorthPoint } from "@entity/metrics";
import type { ChartPoint } from "./build-sparkline.ts";
import type { Money } from "@entity/localization";


interface HoverStateParams {
	hover: number | null,
	pointsCount: number,
	active: ChartPoint | null,
}

interface NetWorthData {
	netWorthValue: Money;
	netWorthSeries: NetWorthPoint[];
}

const useChartHoverData = (
	{ netWorthValue, netWorthSeries }: NetWorthData,
	{ active, hover, pointsCount }: HoverStateParams,
) => {
	const currentValue = useMemo(() => {
		return netWorthSeries.length > 0
			? netWorthSeries[netWorthSeries.length - 1].money.amount
			: netWorthValue.amount;
	}, [netWorthSeries, netWorthValue]);
	
	return useMemo(() => ({
		currentDiff: active ? active.value - currentValue : 0,
		isDiffPositive: (active ? active.value - currentValue : 0) >= 0,
		isCurrentNow: active
			? (hover === pointsCount - 1 || Math.abs(active.value - currentValue) < 0.5)
			: false
	}), [active, currentValue, hover, pointsCount]);
}

export { useChartHoverData };