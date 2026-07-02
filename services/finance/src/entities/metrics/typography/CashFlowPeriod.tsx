import type { FC } from "react";

interface CashFlowPeriodProps {
	label: string;
}

const CashFlowPeriod: FC<CashFlowPeriodProps> = ({ label }) => {
	return (
		<span className="text-[13px] text-text-2">
			Net · {label}
		</span>
	);
}

export { CashFlowPeriod };
export type { CashFlowPeriodProps };
