import { formatPercent } from "@shared/formatting";

import type { BreakdownSlice } from "./types.ts";


interface DonutCenterText {
	label: string;
	value: number;
	caption: string;
}

interface DonutTotals {
	totalLabel: string;
	total: number;
	categoryCount: number;
}

const donutCenterText = (active: BreakdownSlice | undefined, totals: DonutTotals): DonutCenterText => {
	if (!active) {
		return {
			label: totals.totalLabel,
			value: totals.total,
			caption: `${totals.categoryCount.toString()} categories`,
		};
	}

	const share = formatPercent(active.share);
	const transactions = active.transactionsCount.toString();

	return { label: active.label, value: active.value, caption: `${share} · ${transactions} txns` };
};

export { donutCenterText };
export type { DonutCenterText, DonutTotals };
