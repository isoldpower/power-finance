import { FLAT_PADDING_RATIO, MIN_PADDING, RANGE_PADDING_RATIO } from "./config.ts";

import type { CashFlowPoint } from "@entity/flow";


const domainPadding = (min: number, max: number): number => {
	const spread = max - min;

	if (spread > 0) {
		return spread * RANGE_PADDING_RATIO;
	}

	const flatPadding = Math.abs(max) * FLAT_PADDING_RATIO;

	return flatPadding > 0 ? flatPadding : MIN_PADDING;
};

const balanceDomain = (points: CashFlowPoint[]): [number, number] => {
	const balances = points.map((point) => point.balance);
	const min = Math.min(...balances);
	const max = Math.max(...balances);
	const padding = domainPadding(min, max);

	return [min - padding, max + padding];
};

export { balanceDomain };
