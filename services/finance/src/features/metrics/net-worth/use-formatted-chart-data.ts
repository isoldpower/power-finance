import { useCallback } from "react";
import { useConvertMoney } from "@feature/localization";
import { absoluteAmount } from "@shared/api";

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
	const formatDiff = useCallback((diff: string) => {
		return convert({
			amount: absoluteAmount(diff),
			currency: netWorthValue.currency,
		}).formatted;
	}, [convert, netWorthValue.currency]);
	
	return {
		formatDiff,
		formatValue,
	};
}

export { useFormattedChartData };