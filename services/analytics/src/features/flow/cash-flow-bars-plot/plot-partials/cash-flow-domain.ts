import type { CashFlowPoint } from "@entity/flow";


const cashFlowDomain = (points: CashFlowPoint[]): [number, number] => {
	const nets = points.map((point) => point.net);
	const flows = points.flatMap((point) => [point.inflow, point.outflow]);
	const lowest = Math.min(0, ...nets);
	const highest = Math.max(1, ...flows);

	return [lowest, highest];
};

export { cashFlowDomain };
