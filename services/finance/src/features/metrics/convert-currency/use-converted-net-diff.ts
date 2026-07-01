import {useMemo} from "react";
import { useConvertMoney } from "@feature/localization";

import type { NetWorthInsight } from "../metrics-api";
import type { ConvertedMoney } from "@feature/localization";


type NetDiffSign = '+' | '-';

interface ConvertedNetWorthInsight {
	netDiffConverted: ConvertedMoney
	netDiffSign: NetDiffSign
}

const useConvertedNetDiff = (
	netWorth: NetWorthInsight
): ConvertedNetWorthInsight => {
	const { convert } = useConvertMoney();

	return useMemo(() => ({
		netDiffConverted: convert({
			amount: Math.abs((netWorth.value.amount * netWorth.change.pct) / 100),
			currency: netWorth.value.currency
		}),
		netDiffSign: (netWorth.change.direction === 'up' ? '+' : '−') as NetDiffSign,
	}), [convert, netWorth]);
}

export { useConvertedNetDiff };