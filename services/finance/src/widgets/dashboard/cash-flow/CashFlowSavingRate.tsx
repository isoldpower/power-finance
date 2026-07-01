import { FinanceTooltip } from "@internal/ui-library";

import { useMemo } from "react";
import { useConvertMoney } from "@feature/fx";
import type { FC } from "react";
import type { CashFlowInsight } from "@feature/summary";


interface NetWorthSavingRateProps {
	cashFlow: CashFlowInsight;
}

const CashFlowSavingRate: FC<NetWorthSavingRateProps> = ({
	cashFlow,
}) => {
	const { convert } = useConvertMoney();
	const tooltipContent = useMemo(() => {
		const netFormatted = convert(cashFlow.net).formatted;
		const inflowFormatted = convert(cashFlow.in).formatted;
		
		return `Net ${netFormatted} kept of ${inflowFormatted} income`;
	}, [convert, cashFlow]);
	
	return (
		<FinanceTooltip content={tooltipContent}>
			<span className="cursor-help text-xs text-text-3">
				Savings rate 
				<span> </span>
				<b className="text-pos">
					{Math.round(cashFlow.savingsRate * 100)}%
				</b>
			</span>
		</FinanceTooltip>
	);
}

export { CashFlowSavingRate };