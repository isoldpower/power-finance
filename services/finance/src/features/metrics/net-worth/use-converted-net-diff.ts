import { useMemo } from "react";
import { useConvertMoney } from "@feature/localization";

import { netDiffChange } from "./net-diff-amount.ts";

import type { NetDiffSign, NetWorth } from "@entity/metrics";
import type { ConvertedMoney } from "@entity/localization";


interface ConvertedNetDiff {
	netDiffConverted: ConvertedMoney
	netDiffSign: NetDiffSign
}

const useConvertedNetDiff = (
	netWorth: NetWorth
): ConvertedNetDiff => {
	const { convert } = useConvertMoney();

	return useMemo(() => {
		const change = netDiffChange(netWorth);

		return {
			netDiffConverted: convert({
				amount: change.amount,
				currency: netWorth.money.currency,
			}),
			netDiffSign: change.sign,
		};
	}, [convert, netWorth]);
}

export { useConvertedNetDiff };
export type { ConvertedNetDiff };
