import { useMemo } from "react";
import type { Period } from "@entity/dashboard";


interface CashFlowPeriodProps {
	period: Period;
	periodLabels: Record<string, string>;
}

const CashFlowPeriod = ({ 
	period,
	periodLabels,
}: CashFlowPeriodProps) => {
	const displayedPeriod = useMemo(() => {
		return (periodLabels[period] ?? 'This month').toLowerCase();
	}, [period, periodLabels]);

	return (
		<span className="text-[13px] text-text-2">
			Net · {displayedPeriod}
		</span>
	);
}

export { CashFlowPeriod };
export type { CashFlowPeriodProps };