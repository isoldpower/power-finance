import { useMemo } from "react";
import { compareAmounts, parseAmount, subtractAmounts, ZERO_AMOUNT } from "@shared/api";

import type { NetWorthPoint } from "@entity/metrics";
import type { ChartPoint } from "./build-sparkline.ts";
import type { Money } from "@entity/localization";


const NEAR_CURRENT_THRESHOLD = 0.5;

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
	
	return useMemo(() => {
		const currentDiff = active ? subtractAmounts(active.value, currentValue) : ZERO_AMOUNT;

		return {
			currentDiff,
			isDiffPositive: compareAmounts(currentDiff, ZERO_AMOUNT) >= 0,
			isCurrentNow: active
				? (hover === pointsCount - 1 || Math.abs(parseAmount(currentDiff)) < NEAR_CURRENT_THRESHOLD)
				: false
		};
	}, [active, currentValue, hover, pointsCount]);
}

export { useChartHoverData };