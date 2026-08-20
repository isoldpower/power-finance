import { useMemo } from "react";

import type { CashFlow } from "@entity/metrics";


const useCashFlowShare = (
	cashFlow: CashFlow,
) => {
	return useMemo(() => {
		const allFlows = [cashFlow.inflow, cashFlow.outflow];
		const total = allFlows.reduce((total, flow) => {
			return total + flow.amount;
		}, 0);

		return total === 0 ? { inflowShare: 0, outflowShare: 0 } : {
			inflowShare: (cashFlow.inflow.amount / total) * 100,
			outflowShare: (cashFlow.outflow.amount / total) * 100,
		};
	}, [cashFlow]);
}

export { useCashFlowShare };