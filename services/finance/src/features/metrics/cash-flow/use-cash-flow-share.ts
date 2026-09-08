import { useMemo } from "react";
import { addAmounts, isZeroAmount, parseAmount } from "@shared/api";

import type { CashFlow } from "@entity/metrics";


const useCashFlowShare = (
	cashFlow: CashFlow,
) => {
	return useMemo(() => {
		const total = addAmounts(cashFlow.inflow.amount, cashFlow.outflow.amount);

		if (isZeroAmount(total)) {
			return { inflowShare: 0, outflowShare: 0 };
		}

		const totalValue = parseAmount(total);

		return {
			inflowShare: (parseAmount(cashFlow.inflow.amount) / totalValue) * 100,
			outflowShare: (parseAmount(cashFlow.outflow.amount) / totalValue) * 100,
		};
	}, [cashFlow]);
}

export { useCashFlowShare };
