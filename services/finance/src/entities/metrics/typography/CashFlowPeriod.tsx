import {FC, useMemo} from "react";


interface CashFlowPeriodProps {
	period: string;
}

const CASH_FLOW_RANGE_LABELS: Record<string, string> = {
	'1W': 'This week',
	'1M': 'This month',
	'3M': 'This quarter',
	'1Y': 'This year',
};

const CashFlowPeriod: FC<CashFlowPeriodProps> = ({ period }) => {
	const verbosePeriod = useMemo(() => {
		return (CASH_FLOW_RANGE_LABELS[period] ?? 'This month').toLowerCase();
	}, [period]);
	
	return (
		<span className="text-[13px] text-text-2">
			Net · {verbosePeriod}
		</span>
	);
}

export { CashFlowPeriod };
export type { CashFlowPeriodProps };
