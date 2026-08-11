import { useMemo } from "react";

import type { CashFlowInsight } from "../metrics-api/types.ts";


const useCashFlowShare = (
	cashFlow: CashFlowInsight,
) => {
	return useMemo(() => {
		const allFlows = [cashFlow.in, cashFlow.out];
		const total = allFlows.reduce((total, flow) => total + flow.amount, 0);

		return {
			inflowShare: (cashFlow.in.amount / total) * 100,
			outflowShare: (cashFlow.out.amount / total) * 100,
		};
	}, [cashFlow]);
}

export { useCashFlowShare };