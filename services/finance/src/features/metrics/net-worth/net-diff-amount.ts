import { absoluteAmount, isNegativeAmount, subtractAmounts, ZERO_AMOUNT } from "@shared/api";

import type { NetDiffSign, NetWorth } from "@entity/metrics";


interface NetDiffChange {
	amount: string;
	sign: NetDiffSign;
}

const signedNetDiff = (netWorth: NetWorth): string => {
	const { series } = netWorth;

	if (series.length < 2) {
		return ZERO_AMOUNT;
	}

	const opening = series[0].money.amount;
	const closing = series[series.length - 1].money.amount;

	return subtractAmounts(closing, opening);
};

const netDiffChange = (netWorth: NetWorth): NetDiffChange => {
	const signed = signedNetDiff(netWorth);

	return {
		amount: absoluteAmount(signed),
		sign: isNegativeAmount(signed) ? '−' : '+',
	};
};

export { netDiffChange, signedNetDiff };
export type { NetDiffChange };
