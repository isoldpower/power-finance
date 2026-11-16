import { parseAmount } from "@internal/shared";

import type { CashFlow } from "../types.ts";
import type { CashFlowPoint, CumulativePoint, PacePoint } from "./types.ts";


const toCashFlowSeries = (cashFlow: CashFlow): CashFlowPoint[] => cashFlow.buckets.map((bucket) => ({
	start: bucket.start,
	end: bucket.end,
	inflow: parseAmount(bucket.inflow.amount),
	outflow: parseAmount(bucket.outflow.amount),
	net: parseAmount(bucket.net.amount),
	balance: parseAmount(bucket.closingBalance.amount),
	count: bucket.transactionsCount,
}));

const toCumulativeSeries = (
	cashFlow: CashFlow
): CumulativePoint[] => {
	let inflow = 0;
	let outflow = 0;

	return cashFlow.buckets.map((bucket) => {
		inflow += parseAmount(bucket.inflow.amount);
		outflow += parseAmount(bucket.outflow.amount);

		return { 
			start: bucket.start,
			inflow,
			outflow
		};
	});
};

const toPaceSeries = (
	current: CashFlow,
	previous: CashFlow
): PacePoint[] => {
	const cumulate = (cashFlow: CashFlow): number[] => {
		let total = 0;

		return cashFlow.buckets.map((bucket) => {
			total += parseAmount(bucket.outflow.amount);

			return total;
		});
	};
	
	const length = Math.max(current.buckets.length, previous.buckets.length);
	const currentTotals = cumulate(current);
	const previousTotals = cumulate(previous);

	return Array.from({ length }, (_, index) => ({
		index,
		start: current.buckets[index]?.start ?? previous.buckets[index].start,
		current: index < currentTotals.length ? currentTotals[index] : null,
		previous: index < previousTotals.length ? previousTotals[index] : null,
	}));
};

export { toCashFlowSeries, toCumulativeSeries, toPaceSeries };
