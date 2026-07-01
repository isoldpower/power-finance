import { useMemo } from "react";
import { useConvertMoney } from "@feature/localization";

import type { InsightChange, NetWorthInsight, SeriesPoint } from "../metrics-api";
import type { ConvertedMoney, Money } from "@feature/localization";


interface ConvertedNetWorthInsight {
	netWorthValue: Money;
	netWorthDiff: InsightChange;
	convertedNetWorth: ConvertedMoney;
	netWorthSeries: SeriesPoint[];
}

const useConvertedNetWorth = (
	netWorth: NetWorthInsight
): ConvertedNetWorthInsight => {
	const { convert } = useConvertMoney();
	
	return useMemo(() => ({
		netWorthValue: netWorth.value,
		netWorthDiff: netWorth.change,
		netWorthSeries: netWorth.series,
		convertedNetWorth: convert(netWorth.value),
	}), [netWorth, convert]);
}

export { useConvertedNetWorth };