import { MIN_TICK_SPACING } from "../config.ts";

import type { TrendRow } from "@entity/spending";


const rowTicks = (rows: TrendRow[], width: number): number[] => {
	const fittingTicks = Math.max(2, Math.floor(width / MIN_TICK_SPACING));
	const tickStep = Math.max(1, Math.ceil(rows.length / fittingTicks));

	return rows
		.filter((row) => row.index % tickStep === 0)
		.map((row) => row.index);
};

export { rowTicks };
