import { TOP_HEADROOM } from "../config.ts";

import type { BalanceLine } from "../types.ts";


const historyDomain = (lines: BalanceLine[], [start, end]: [number, number]): [number, number] => {
	const visibleValues = lines.flatMap((line) => line.values.slice(start, end + 1));
	const lowest = Math.min(0, ...visibleValues);
	const highest = Math.max(1, ...visibleValues);

	return [lowest, highest * TOP_HEADROOM];
};

export { historyDomain };
