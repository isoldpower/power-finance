import { useMemo } from "react";
import { useConvertMoney } from "@feature/localization";

import type { CashFlow } from "@entity/metrics";


const useConvertedCashFlow = (
	cashFlow: CashFlow
) => {
	const { convert } = useConvertMoney();
	
	return useMemo(() => ({
		convertedInflow: convert(cashFlow.inflow),
		convertedOutflow: convert(cashFlow.outflow),
	}), [cashFlow, convert]);
}

export { useConvertedCashFlow };