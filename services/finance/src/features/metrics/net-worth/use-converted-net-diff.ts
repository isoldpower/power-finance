import {useMemo} from "react";
import { useConvertMoney } from "@feature/localization";

import type { NetWorth } from "@entity/metrics";
import type { ConvertedMoney } from "@entity/localization";


type NetDiffSign = '+' | '-';

interface ConvertedNetDiff {
	netDiffConverted: ConvertedMoney
	netDiffSign: NetDiffSign
}

const useConvertedNetDiff = (
	netWorth: NetWorth
): ConvertedNetDiff => {
	const { convert } = useConvertMoney();

	return useMemo(() => ({
		netDiffConverted: convert({
			amount: Math.abs((netWorth.money.amount * netWorth.netDiff.percentage) / 100),
			currency: netWorth.money.currency
		}),
		netDiffSign: (netWorth.netDiff.direction === 'up' ? '+' : '−') as NetDiffSign,
	}), [convert, netWorth]);
}

export { useConvertedNetDiff };