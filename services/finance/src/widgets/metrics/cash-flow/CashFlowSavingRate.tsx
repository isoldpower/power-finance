import { Tooltip } from "@shared/interactions";

import { useMemo } from "react";
import { useConvertMoney } from "@feature/localization";
import type { FC } from "react";
import type { CashFlowInsight } from "@feature/metrics";


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
		<Tooltip content={tooltipContent}>
			<span className="cursor-help text-xs text-text-3">
				Savings rate 
				<span> </span>
				<b className="text-pos">
					{Math.round(cashFlow.savingsRate * 100)}%
				</b>
			</span>
		</Tooltip>
	);
}

export { CashFlowSavingRate };