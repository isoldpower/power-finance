import { useMemo } from "react";
import { useConvertMoney } from "@feature/localization";

import type { NetDiff, NetWorth, NetWorthPoint } from "@entity/metrics";
import type { ConvertedMoney, Money } from "@entity/localization";


interface ConvertedNetWorthInsight {
	netWorthValue: Money;
	netWorthDiff: NetDiff;
	convertedNetWorth: ConvertedMoney;
	netWorthSeries: NetWorthPoint[];
}

const useConvertedNetWorth = (
	netWorth: NetWorth
): ConvertedNetWorthInsight => {
	const { convert } = useConvertMoney();
	
	return useMemo(() => ({
		netWorthValue: netWorth.money,
		netWorthDiff: netWorth.netDiff,
		netWorthSeries: netWorth.series,
		convertedNetWorth: convert(netWorth.money),
	}), [netWorth, convert]);
}

export { useConvertedNetWorth };