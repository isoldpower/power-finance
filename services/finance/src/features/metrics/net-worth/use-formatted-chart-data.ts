import { useCallback } from "react";
import { useConvertMoney } from "@feature/localization";

import type { ChartPoint } from "./build-sparkline.ts";
import type { Money } from "@entity/localization";


const useFormattedChartData = (netWorthValue: Money) => {
	const { convert } = useConvertMoney();
	
	const formatValue = useCallback((active: ChartPoint) => {
		return convert({
			amount: active.value,
			currency: netWorthValue.currency
		}).formatted;
	}, [convert, netWorthValue.currency]);
	const formatDiff = useCallback((diff: number) => {
		return convert({
			amount: Math.abs(diff),
			currency: netWorthValue.currency,
		}).formatted;
	}, [convert, netWorthValue.currency]);
	
	return {
		formatDiff,
		formatValue,
	};
}

export { useFormattedChartData };