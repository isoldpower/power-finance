import { useMemo } from "react";
import { useConvertMoney } from "@feature/localization";

import type { CashFlowInsight } from "../metrics-api/types.ts";


const useConvertedCashFlow = (
	cashFlow: CashFlowInsight
) => {
	const { convert } = useConvertMoney();
	
	return useMemo(() => ({
		convertedInflow: convert(cashFlow.in),
		convertedOutflow: convert(cashFlow.out),
	}), [cashFlow, convert]);
}

export { useConvertedCashFlow };